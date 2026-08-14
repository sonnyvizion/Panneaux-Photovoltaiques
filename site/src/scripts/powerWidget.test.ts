import { describe, expect, it } from 'vitest';
import { CHASE_DURATION, chase, gaugeRatio } from './powerWidget';
import { POWER_MAX, POWER_MIN, estimate } from './powerEstimate';

describe('chase', () => {
  /* Les deux extrémités décident de tout : partir d'ailleurs que de la valeur
     affichée produit un saut visible, et ne pas atteindre exactement la cible
     laisse un reliquat qui s'accumule d'une poursuite à l'autre. */
  it('starts at the current value and lands exactly on the target', () => {
    expect(chase(7500, 8000, 0)).toBe(7500);
    expect(chase(7500, 8000, 1)).toBe(8000);
  });

  it('decelerates: more than half the distance is covered at mid-course', () => {
    expect(chase(0, 100, 0.5)).toBeGreaterThan(50);
  });

  /* Une image peut arriver après la fin de la course (onglet en arrière-plan,
     horloge qui saute). Sans bornes, la valeur dépasserait la cible. */
  it('clamps a progress outside the range', () => {
    expect(chase(7500, 8000, -1)).toBe(7500);
    expect(chase(7500, 8000, 2)).toBe(8000);
  });

  it('runs backwards just as well', () => {
    expect(chase(8000, 7500, 1)).toBe(7500);
    expect(chase(8000, 7500, 0.5)).toBeLessThan(7750);
  });

  it('is short enough to follow the finger rather than lag behind it', () => {
    expect(CHASE_DURATION).toBeLessThanOrEqual(500);
  });
});

describe('gaugeRatio', () => {
  const low = estimate(POWER_MIN).price;
  const high = estimate(POWER_MAX).price;

  it('spans the full range between the two published bounds', () => {
    expect(gaugeRatio(low, low, high)).toBe(0);
    expect(gaugeRatio(high, low, high)).toBe(100);
  });

  /* La jauge reçoit des valeurs INTERPOLÉES, qui peuvent momentanément sortir
     de la fourchette si une poursuite dépasse. Le remplissage doit rester dans
     sa barre. */
  it('clamps a price outside the bounds', () => {
    expect(gaugeRatio(0, low, high)).toBe(0);
    expect(gaugeRatio(99999, low, high)).toBe(100);
  });

  /* Garde-fou contre une division par zéro le jour où le modèle rendrait les
     deux bornes égales. */
  it('returns zero rather than NaN on a degenerate range', () => {
    expect(gaugeRatio(5000, 5000, 5000)).toBe(0);
  });

  it('places the middle of the range around the middle of the gauge', () => {
    const ratio = gaugeRatio((low + high) / 2, low, high);
    expect(ratio).toBeCloseTo(50, 5);
  });
});
