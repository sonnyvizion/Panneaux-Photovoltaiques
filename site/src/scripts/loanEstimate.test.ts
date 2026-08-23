import { describe, expect, it } from 'vitest';
import {
  LOAN_DEFAULT,
  LOAN_MAX,
  LOAN_MIN,
  LOAN_STEP,
  LOAN_TERMS,
  LOAN_TERM_DEFAULT,
  MONTHLY_MAX,
  amountRatio,
  clampAmount,
  clampTerm,
  monthly,
  monthlyRatio,
} from './loanEstimate';

/** Tous les montants réellement atteignables au curseur. */
function everyStep(): number[] {
  const steps: number[] = [];
  const count = Math.round((LOAN_MAX - LOAN_MIN) / LOAN_STEP);
  for (let i = 0; i <= count; i += 1) {
    steps.push(LOAN_MIN + i * LOAN_STEP);
  }
  return steps;
}

describe('bornes du module', () => {
  it('démarre sur un montant atteignable au curseur', () => {
    expect(LOAN_DEFAULT).toBeGreaterThanOrEqual(LOAN_MIN);
    expect(LOAN_DEFAULT).toBeLessThanOrEqual(LOAN_MAX);
    /* Sinon la poignée se pose entre deux crans : le premier déplacement la
       ferait sauter, et le chiffre rendu en HTML ne serait plus atteignable. */
    expect((LOAN_DEFAULT - LOAN_MIN) % LOAN_STEP).toBe(0);
  });

  it('propose une durée par défaut qui fait partie du groupe', () => {
    expect(LOAN_TERMS).toContain(LOAN_TERM_DEFAULT);
  });
});

describe('clampAmount', () => {
  it('laisse passer une valeur dans la plage', () => {
    expect(clampAmount(20000)).toBe(20000);
  });

  it('ramène dans la plage ce qui en sort', () => {
    expect(clampAmount(0)).toBe(LOAN_MIN);
    expect(clampAmount(999999)).toBe(LOAN_MAX);
  });

  it('retombe sur le défaut pour une saisie qui n’est pas un nombre', () => {
    expect(clampAmount(Number.NaN)).toBe(LOAN_DEFAULT);
  });
});

describe('clampTerm', () => {
  it('accepte les durées du groupe', () => {
    for (const term of LOAN_TERMS) {
      expect(clampTerm(term)).toBe(term);
    }
  });

  it('retombe sur le défaut pour une durée inconnue', () => {
    /* Le sélecteur vient du DOM : une valeur trafiquée ne doit pas produire une
       mensualité fantaisiste, ni une division par zéro. */
    expect(clampTerm(15)).toBe(LOAN_TERM_DEFAULT);
    expect(clampTerm(0)).toBe(LOAN_TERM_DEFAULT);
  });
});

describe('monthly', () => {
  it('divise le montant par le nombre de mois, sans intérêts', () => {
    expect(monthly(12000, 10)).toBe(100);
    expect(monthly(60000, 30)).toBe(167);
  });

  it('baisse quand la durée s’allonge, à montant égal', () => {
    /* L'argument central du module : c'est la durée qui fait la mensualité. */
    const [short, mid, long] = LOAN_TERMS.map((term) => monthly(LOAN_DEFAULT, term));
    expect(short).toBeGreaterThan(mid);
    expect(mid).toBeGreaterThan(long);
  });

  it('reste positive et sous le plafond de la jauge partout', () => {
    for (const amount of everyStep()) {
      for (const term of LOAN_TERMS) {
        const value = monthly(amount, term);
        expect(value).toBeGreaterThan(0);
        expect(value).toBeLessThanOrEqual(MONTHLY_MAX);
      }
    }
  });

  it('rembourse exactement le capital emprunté', () => {
    /* Ce que la page promet : à 0 %, le total remboursé EST le montant. La
       vérification tolère l'arrondi à l'euro de la mensualité, réparti sur
       toutes les échéances. */
    for (const term of LOAN_TERMS) {
      const months = term * 12;
      const total = monthly(30000, term) * months;
      expect(Math.abs(total - 30000)).toBeLessThanOrEqual(months / 2);
    }
  });
});

describe('monthlyRatio', () => {
  it('remplit la jauge au pire cas : le maximum sur la durée la plus courte', () => {
    expect(monthlyRatio(LOAN_MAX, Math.min(...LOAN_TERMS))).toBeCloseTo(100);
  });

  it('rétrécit la jauge quand la durée s’allonge, à montant égal', () => {
    expect(monthlyRatio(LOAN_DEFAULT, 30)).toBeLessThan(monthlyRatio(LOAN_DEFAULT, 10));
  });

  it('reste entre 0 et 100 même hors plage', () => {
    expect(monthlyRatio(-5000, 10)).toBeGreaterThanOrEqual(0);
    expect(monthlyRatio(999999, 10)).toBeLessThanOrEqual(100);
  });
});

describe('amountRatio', () => {
  it('va de 0 à 100 sur la plage du curseur', () => {
    expect(amountRatio(LOAN_MIN)).toBe(0);
    expect(amountRatio(LOAN_MAX)).toBe(100);
  });

  it('progresse avec le montant', () => {
    expect(amountRatio(20000)).toBeGreaterThan(amountRatio(10000));
  });
});
