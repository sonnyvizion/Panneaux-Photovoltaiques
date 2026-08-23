import { describe, expect, it } from 'vitest';
import {
  POWER_DEFAULT,
  POWER_MAX,
  POWER_MIN,
  POWER_STEP,
  clampPower,
  estimate,
  monthlyProduction,
  formatPower,
  powerRatio,
} from './powerEstimate';

/** Toutes les puissances réellement atteignables au curseur. */
function everyStep(): number[] {
  const steps: number[] = [];
  const count = Math.round((POWER_MAX - POWER_MIN) / POWER_STEP);
  for (let i = 0; i <= count; i += 1) {
    steps.push(POWER_MIN + i * POWER_STEP);
  }
  return steps;
}

describe('clampPower', () => {
  it('keeps a value inside the range', () => {
    expect(clampPower(5)).toBe(5);
  });

  it('clamps outside the range', () => {
    expect(clampPower(0)).toBe(POWER_MIN);
    expect(clampPower(99)).toBe(POWER_MAX);
  });

  /* Le curseur est un `<input>` : sa valeur est une chaîne, et `Number('')`
     vaut NaN. Sans ce garde-fou, un champ vidé propagerait NaN dans tout
     l'affichage. */
  it('falls back to the default on a non-finite value', () => {
    expect(clampPower(Number.NaN)).toBe(POWER_DEFAULT);
  });
});

describe('estimate', () => {
  /* Les trois repères que la page affiche ailleurs qu'ici : les bornes du
     curseur et les cartes de « L'essentiel ». Si le modèle change, ce sont ces
     valeurs-là qu'il faut regarder — la page se contredirait sinon. */
  it('matches the price anchors published elsewhere on the page', () => {
    expect(estimate(POWER_MIN).price).toBe(4500);
    expect(estimate(POWER_DEFAULT).price).toBe(7500);
    expect(estimate(POWER_MAX).price).toBe(11500);
  });

  it('matches the panel and production anchors at the default power', () => {
    expect(estimate(POWER_DEFAULT).panels).toBe(14);
    expect(estimate(POWER_DEFAULT).production).toBe(5400);
  });

  /* Au pas réel et non par kWc entier : c'est le balayage fin qui a révélé le
     défaut de virgule flottante ci-dessous, invisible sur les entiers. */
  it('never quotes a price to the euro — always a bracket, at every reachable step', () => {
    for (const kwc of everyStep()) {
      expect(estimate(kwc).price % 500).toBe(0);
    }
  });

  /**
   * Non-régression d'un défaut de virgule flottante.
   *
   * `4.3 * 1000` vaut `4300.000000000001`, et `Math.ceil` de ce quotient
   * renvoyait 11 panneaux là où 10 suffisent. Invisible tant que le curseur
   * avait un pas entier ; systématique avec un pas de 0,1.
   */
  it('does not add a phantom panel on a decimal power', () => {
    expect(estimate(4.3).panels).toBe(10);
    expect(estimate(8.6).panels).toBe(20);
  });

  /* Un nombre de panneaux qui redescend quand la puissance monte serait
     absurde à l'écran — et c'est exactement ce que produisait le défaut. */
  it('never lowers the panel count as power rises', () => {
    let previous = 0;
    for (const kwc of everyStep()) {
      const { panels } = estimate(kwc);
      expect(panels).toBeGreaterThanOrEqual(previous);
      previous = panels;
    }
  });

  /* Le cœur de l'argument de la page : « doubler la puissance ne double pas le
     prix ». Le prix monte, le prix au Wc descend. */
  it('increases the price but lowers the price per Wc', () => {
    for (let kwc = POWER_MIN; kwc < POWER_MAX; kwc += 1) {
      const low = estimate(kwc);
      const high = estimate(kwc + 1);
      expect(high.price).toBeGreaterThan(low.price);
      expect(high.price / (kwc + 1)).toBeLessThan(low.price / kwc);
    }
  });

  it('rounds panels up — a partial panel cannot be installed', () => {
    expect(estimate(3).panels).toBe(7);
    expect(estimate(POWER_MAX).panels).toBe(24);
  });

  it('clamps its input rather than extrapolating', () => {
    expect(estimate(0)).toEqual(estimate(POWER_MIN));
    expect(estimate(99)).toEqual(estimate(POWER_MAX));
  });
});

describe('formatPower', () => {
  /* Le zéro de fin donnerait au chiffre une précision qu'il n'a pas, et ferait
     sautiller la largeur du libellé au passage de 5,9 à 6. */
  it('drops the trailing zero on a whole power', () => {
    expect(formatPower(6)).toBe('6\u202FkWc');
  });

  it('writes the decimal with a comma, in French', () => {
    expect(formatPower(6.4)).toBe('6,4\u202FkWc');
  });

  it('clamps rather than printing an out-of-range power', () => {
    expect(formatPower(99)).toBe(`${POWER_MAX}\u202FkWc`);
  });

  /* Espace fine insécable (U+202F) entre le nombre et l'unité : la même que
     celle du rendu serveur. Un caractère différent des deux côtés décalerait la
     valeur au premier déplacement du curseur. */
  it('separates value and unit with a narrow no-break space', () => {
    expect(formatPower(6)).toContain('\u202F');
    expect(formatPower(6)).not.toContain('\u0020');
  });
});

describe('powerRatio', () => {
  it('spans the full range from 0 to 100', () => {
    expect(powerRatio(POWER_MIN)).toBe(0);
    expect(powerRatio(POWER_MAX)).toBe(100);
  });

  it('places the default power inside the range', () => {
    const ratio = powerRatio(POWER_DEFAULT);
    expect(ratio).toBeGreaterThan(0);
    expect(ratio).toBeLessThan(100);
  });
});

describe('monthlyProduction', () => {
  it('somme exactement à la production annuelle', () => {
    for (const kwc of [POWER_MIN, POWER_DEFAULT, POWER_MAX]) {
      const total = monthlyProduction(kwc).reduce((s, m) => s + m, 0);
      expect(total).toBeCloseTo(estimate(kwc).production, 6);
    }
  });

  it('rend douze mois, tous positifs', () => {
    const months = monthlyProduction(POWER_DEFAULT);
    expect(months).toHaveLength(12);
    for (const m of months) expect(m).toBeGreaterThan(0);
  });

  /* Le repère sur lequel la courbe est calibrée : la page « Rendement &
     production » annonce « 5 à 6 fois plus faible en décembre qu'en juillet ». */
  it('respecte le rapport été/hiver publié par la page', () => {
    const months = monthlyProduction(POWER_DEFAULT);
    const ratio = months[6] / months[11];
    expect(ratio).toBeGreaterThanOrEqual(5);
    expect(ratio).toBeLessThanOrEqual(6);
  });

  it('culmine en été et creuse en hiver', () => {
    const months = monthlyProduction(POWER_DEFAULT);
    const peak = months.indexOf(Math.max(...months));
    const trough = months.indexOf(Math.min(...months));
    expect([5, 6]).toContain(peak);
    expect([11, 0]).toContain(trough);
  });
});
