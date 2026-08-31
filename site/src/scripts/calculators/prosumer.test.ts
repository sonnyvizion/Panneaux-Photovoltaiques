import { describe, expect, it } from 'vitest';
import {
  PROSUMER_DEFAULT,
  PROSUMER_MAX,
  PROSUMER_MIN,
  PROSUMER_RATE,
  PROSUMER_STEP,
  clampPower,
  costRatio,
  formatPower,
  yearlyCost,
} from './prosumer';

describe('bornes du module', () => {
  it('démarre sur une puissance atteignable au curseur', () => {
    expect(PROSUMER_DEFAULT).toBeGreaterThanOrEqual(PROSUMER_MIN);
    expect(PROSUMER_DEFAULT).toBeLessThanOrEqual(PROSUMER_MAX);
    /* Sinon la poignée se pose entre deux crans : le premier déplacement la
       ferait sauter, et le chiffre rendu en HTML ne serait plus atteignable. */
    expect(Math.round((PROSUMER_DEFAULT - PROSUMER_MIN) / PROSUMER_STEP)).toBeCloseTo(
      (PROSUMER_DEFAULT - PROSUMER_MIN) / PROSUMER_STEP,
      6,
    );
  });
});

describe('clampPower', () => {
  it('laisse passer une valeur dans la plage', () => {
    expect(clampPower(5)).toBe(5);
  });

  it('ramène dans la plage ce qui en sort', () => {
    expect(clampPower(0)).toBe(PROSUMER_MIN);
    expect(clampPower(99)).toBe(PROSUMER_MAX);
  });

  it('retombe sur le défaut pour une saisie qui n’est pas un nombre', () => {
    expect(clampPower(Number.NaN)).toBe(PROSUMER_DEFAULT);
  });
});

describe('yearlyCost', () => {
  /* Le repère que la page annonce en toutes lettres dans sa réponse :
     « ~435 €/an pour une installation de 5 kWe ». Si cette assertion tombe,
     c'est le texte de la page qu'il faut corriger en même temps. */
  it('retrouve le chiffre annoncé par la page pour 5 kWc', () => {
    expect(yearlyCost(5)).toBeCloseTo(435);
  });

  it('est strictement proportionnel à la puissance', () => {
    expect(yearlyCost(2)).toBeCloseTo(yearlyCost(1) * 2);
    expect(yearlyCost(PROSUMER_MAX)).toBeCloseTo(PROSUMER_MAX * PROSUMER_RATE);
  });

  it('reste positif sur toute la plage', () => {
    for (let kwc = PROSUMER_MIN; kwc <= PROSUMER_MAX; kwc += PROSUMER_STEP) {
      expect(yearlyCost(kwc)).toBeGreaterThan(0);
    }
  });
});

describe('costRatio', () => {
  it('remplit la jauge au maximum de la plage', () => {
    expect(costRatio(PROSUMER_MAX)).toBeCloseTo(100);
  });

  it('progresse avec la puissance', () => {
    expect(costRatio(8)).toBeGreaterThan(costRatio(3));
  });

  it('reste entre 0 et 100 même hors plage', () => {
    expect(costRatio(-50)).toBeGreaterThanOrEqual(0);
    expect(costRatio(9999)).toBeLessThanOrEqual(100);
  });
});

describe('formatPower', () => {
  it('n’écrit pas de décimale inutile sur une puissance ronde', () => {
    expect(formatPower(5)).toBe('5 kWc');
  });

  it('garde une décimale quand elle existe', () => {
    expect(formatPower(5.4)).toBe('5,4 kWc');
  });
});
