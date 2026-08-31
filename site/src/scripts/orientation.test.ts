import { describe, expect, it } from 'vitest';
import {
  ORIENTATIONS,
  ORIENTATION_DEFAULT,
  orientationFactor,
  orientationPercent,
  orientationSpread,
} from './orientation';

describe('orientation', () => {
  it('couvre les quatre orientations du cahier, dans l’ordre décroissant', () => {
    expect(ORIENTATIONS.map((o) => o.value)).toEqual(['sud', 'sud-est-ouest', 'est-ouest', 'nord']);
    const factors = ORIENTATIONS.map((o) => o.factor);
    expect(factors).toEqual([...factors].sort((a, b) => b - a));
  });

  it('prend le sud comme référence à 100 %', () => {
    expect(orientationFactor(ORIENTATION_DEFAULT)).toBe(1);
  });

  /* La page « Rendement & production » annonce « 35 points d'écart entre le sud
     et le nord ». Le chiffre est dérivé des coefficients : si l'un bouge, le
     texte doit bouger aussi, et ce test le signale. */
  it('retrouve les 35 points d’écart annoncés par la page Rendement', () => {
    expect(orientationSpread()).toBe(35);
  });

  it('retombe sur le sud pour une valeur inconnue', () => {
    expect(orientationFactor('plein-ouest-nord-nord')).toBe(1);
  });
});

describe('orientationPercent', () => {
  /* ⚠️ Le pourcentage est RELATIF au meilleur cas, pas au productible absolu :
     « 85 % » veut dire « 85 % de ce que donnerait un plein sud ». C'est ce que
     le module de la page « Rendement & production » affiche. */
  it('rapporte au meilleur cas, pas au productible absolu', () => {
    expect(orientationPercent('sud')).toBe(100);
    expect(orientationPercent('sud-est-ouest')).toBe(95);
    expect(orientationPercent('est-ouest')).toBe(85);
    expect(orientationPercent('nord')).toBe(65);
  });

  it('couvre les quatre tuiles du module, sans trou', () => {
    for (const o of ORIENTATIONS) {
      expect(orientationPercent(o.value)).toBeGreaterThan(0);
      expect(orientationPercent(o.value)).toBeLessThanOrEqual(100);
    }
  });

  /* Même repli que `orientationFactor` : une valeur hors modèle retombe sur le
     cas de référence plutôt que de rendre `NaN` dans le HTML. */
  it('retombe sur le cas de référence pour une valeur inconnue', () => {
    expect(orientationPercent('plein-ouest-nord-nord')).toBe(100);
  });
});
