import { describe, expect, it } from 'vitest';
import { CHART_H, CHART_W, paybackGeometry, paybackLabel } from './payback';
import { POWER_DEFAULT, estimate } from './powerEstimate';
import { paybackYear } from './savings';

describe('paybackGeometry', () => {
  /* ⚠️ L'intérêt de la brique unique : la page de contenu et le simulateur
     doivent produire EXACTEMENT le même amortissement à entrées égales. Si ce
     test tombe, c'est que deux arithmétiques ont recommencé à cohabiter. */
  it('donne le même amortissement que `savings.ts`', () => {
    for (const region of ['wallonie', 'bruxelles', 'flandre'] as const) {
      const g = paybackGeometry(POWER_DEFAULT, { region });
      expect(g.payback).toBe(paybackYear(POWER_DEFAULT, { region }));
    }
  });

  it('n’invente pas le coût : il vient de `estimate()`', () => {
    expect(paybackGeometry(6).cost).toBe(estimate(6).price);
  });

  it('trace une courbe qui reste dans le cadre', () => {
    const g = paybackGeometry(POWER_DEFAULT, { region: 'bruxelles' });
    const points = g.curve
      .replace('M ', '')
      .split(' L ')
      .map((p) => p.split(',').map(Number));
    expect(points).toHaveLength(25);
    for (const [x, y] of points) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(CHART_W);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(CHART_H);
    }
  });

  /* En Wallonie, le tarif prosumer empêche l'amortissement sur 25 ans : il n'y a
     alors pas de bénéfice à colorier, et pas de point de croisement. */
  it('n’affiche ni aire ni croisement quand l’amortissement n’arrive jamais', () => {
    const g = paybackGeometry(POWER_DEFAULT, { region: 'wallonie' });
    expect(g.payback).toBeNull();
    expect(g.benefit).toBe('');
    expect(g.crossX).toBeNull();
    expect(g.marks).toEqual([1, 25]);
  });

  it('pose un croisement et une aire dès que l’installation s’amortit', () => {
    const g = paybackGeometry(POWER_DEFAULT, { region: 'bruxelles' });
    expect(g.payback).not.toBeNull();
    expect(g.benefit.startsWith('M ')).toBe(true);
    expect(g.crossX).toBeGreaterThan(0);
    expect(g.marks).toHaveLength(3);
  });

  /* La courbe monte : les économies s'accumulent, elles ne se perdent pas. En
     coordonnées SVG l'axe Y descend, donc « monter » veut dire y décroissant. */
  it('trace une courbe monotone', () => {
    const ys = paybackGeometry(POWER_DEFAULT, { region: 'flandre' })
      .curve.replace('M ', '')
      .split(' L ')
      .map((p) => Number(p.split(',')[1]));
    for (let i = 1; i < ys.length; i += 1) expect(ys[i]).toBeLessThanOrEqual(ys[i - 1]);
  });
});

describe('paybackLabel', () => {
  it('dit la vérité quand il n’y a pas d’amortissement', () => {
    expect(paybackLabel(null)).toBe('au-delà de 25 ans');
    /* ⚠️ ESPACE INSÉCABLE entre le nombre et l'unité — c'est ce qui empêche
       « 8 ans » de se couper en deux lignes dans une tuile en display 44px.
       La phrase, elle, garde des espaces ordinaires : elle DOIT pouvoir se
       replier, sinon elle déborde de sa tuile sur la page Amortissement. */
    expect(paybackLabel(8)).toBe('8\u00a0ans');
    expect(paybackLabel(null)).not.toContain('\u00a0');
  });
});
