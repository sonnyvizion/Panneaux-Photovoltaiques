import { describe, expect, it } from 'vitest';
import { POWER_DEFAULT, POWER_MAX, POWER_MIN, estimate } from './powerEstimate';
import {
  ELECTRICITY_PRICE,
  breakEvenLabel,
  breakEvenRate,
  HORIZON_YEARS,
  REGION_DEFAULT,
  SELF_CONSUMPTION_RATE,
  cumulativeSavings,
  netGain,
  paybackYear,
  productionInYear,
  yearSavings,
  type Region,
} from './savings';

const REGIONS: Region[] = ['wallonie', 'bruxelles', 'flandre'];

/**
 * Ce que le modèle produit RÉELLEMENT, après la correction de l'hypothèse
 * wallonne du 2026-08-18.
 *
 * ⚠️ CES TESTS NE PROTÈGENT PLUS LE TEXTE DES PAGES — ils le contredisent, et
 * c'est voulu. La version précédente verrouillait « 7 à 12 ans » ; cette
 * fourchette reposait sur une compensation du surplus wallon qui n'existe plus
 * depuis 2024. Les textes concernés sont à réécrire (pages 3.3, 3.4 et
 * Wallonie-aides) ; le modèle, lui, dit ce qu'il calcule.
 */
describe('ce que le modèle calcule vraiment', () => {
  /* ⚠️ Au taux de référence, une installation wallonne ne se rembourse PAS sur
     l'horizon de 25 ans : la charge prosumer absorbe l'essentiel des économies,
     et le surplus n'est plus compensé qu'au tarif d'injection. C'est le
     résultat, pas un bug — la page doit pouvoir le dire. */
  it('ne trouve pas d’amortissement wallon sur l’horizon, au taux de référence', () => {
    expect(paybackYear(POWER_DEFAULT, { region: 'wallonie' })).toBeNull();
  });

  it('en trouve un dès que l’autoconsommation monte fortement', () => {
    const roi = paybackYear(POWER_DEFAULT, { region: 'wallonie', rate: 0.7 });
    expect(roi).not.toBeNull();
    expect(roi!).toBeLessThanOrEqual(HORIZON_YEARS);
  });

  /* L'ordre a changé avec la correction : la Wallonie n'est plus « légèrement »
     derrière Bruxelles, elle est DERNIÈRE, loin derrière la Flandre — elle
     supporte la même valorisation du surplus, plus une charge annuelle. */
  it('classe désormais Bruxelles, puis la Flandre, puis la Wallonie', () => {
    const roi = (region: Region) =>
      paybackYear(POWER_DEFAULT, { region, rate: 0.7 })!;
    expect(roi('bruxelles')).toBeLessThan(roi('flandre'));
    expect(roi('flandre')).toBeLessThan(roi('wallonie'));
  });

  /* Le tarif prosumer est ce qui creuse l'écart : sans lui, la Wallonie et la
     Flandre seraient identiques, puisqu'elles valorisent le surplus pareil. */
  it('impute tout l’écart Wallonie/Flandre à la seule charge prosumer', () => {
    const wal = yearSavings(POWER_DEFAULT, { region: 'wallonie' });
    const vl = yearSavings(POWER_DEFAULT, { region: 'flandre' });
    expect(wal.direct + wal.surplus).toBeCloseTo(vl.direct + vl.surplus);
    expect(vl.net - wal.net).toBeCloseTo(wal.charge);
  });

  /* Le taux de référence est celui du tarif prosumer wallon (CWaPE), et la page
     3.4 annonce « environ 30 à 40 % pour un foyer standard ». */
  it('garde le taux de référence dans la fourchette annoncée par la page 3.4', () => {
    expect(SELF_CONSUMPTION_RATE).toBeGreaterThanOrEqual(0.3);
    expect(SELF_CONSUMPTION_RATE).toBeLessThanOrEqual(0.4);
  });
});

describe('yearSavings', () => {
  it('valorise l’autoconsommation au prix d’achat plein', () => {
    const { direct } = yearSavings(POWER_DEFAULT, { rate: 1, year: 1 });
    expect(direct).toBeCloseTo(estimate(POWER_DEFAULT).production * ELECTRICITY_PRICE);
  });

  /* L'argument central de la page 3.4 : un kWh autoconsommé vaut plus qu'un kWh
     injecté. Vrai partout sauf en compensation intégrale, où les deux s'égalent. */
  it('ne valorise jamais le surplus au-dessus du prix d’achat', () => {
    for (const region of REGIONS) {
      const all = yearSavings(POWER_DEFAULT, { region, rate: 1 });
      const none = yearSavings(POWER_DEFAULT, { region, rate: 0 });
      expect(none.direct + none.surplus).toBeLessThanOrEqual(all.direct + all.surplus + 1e-9);
    }
  });

  it('décompte la charge régionale, en Wallonie seulement', () => {
    expect(yearSavings(POWER_DEFAULT, { region: 'wallonie' }).charge).toBeGreaterThan(0);
    expect(yearSavings(POWER_DEFAULT, { region: 'bruxelles' }).charge).toBe(0);
    expect(yearSavings(POWER_DEFAULT, { region: 'flandre' }).charge).toBe(0);
  });

  it('ne produit jamais de NaN, quel que soit le taux', () => {
    for (const rate of [-1, 0, 0.5, 1, 2]) {
      for (const region of REGIONS) {
        expect(Number.isFinite(yearSavings(POWER_DEFAULT, { region, rate }).net)).toBe(true);
      }
    }
  });
});

describe('dégradation', () => {
  it('fait baisser la production d’année en année', () => {
    expect(productionInYear(POWER_DEFAULT, 25)).toBeLessThan(productionInYear(POWER_DEFAULT, 1));
  });

  /* Les pages « Longévité » et « Rendement » annoncent « plus de 80 % après
     25 ans ». Le modèle doit rester du bon côté de cette affirmation. */
  it('laisse plus de 80 % de la capacité après 25 ans, comme l’annoncent les pages', () => {
    const ratio = productionInYear(POWER_DEFAULT, 25) / productionInYear(POWER_DEFAULT, 1);
    expect(ratio).toBeGreaterThan(0.8);
  });
});

describe('cumulativeSavings et paybackYear', () => {
  it('produit une série croissante sur tout l’horizon', () => {
    const series = cumulativeSavings(POWER_DEFAULT);
    expect(series).toHaveLength(HORIZON_YEARS);
    for (let i = 1; i < series.length; i += 1) {
      expect(series[i]).toBeGreaterThan(series[i - 1]);
    }
  });

  /* ⚠️ Testé sur la FLANDRE et non sur la région par défaut : depuis la
     correction de l'hypothèse wallonne, le cas par défaut n'atteint plus le
     seuil, et ce test-ci porte sur la mécanique du seuil, pas sur la Wallonie. */
  it('situe le seuil là où le cumul dépasse le prix, et pas avant', () => {
    const region: Region = 'flandre';
    const roi = paybackYear(POWER_DEFAULT, { region })!;
    const series = cumulativeSavings(POWER_DEFAULT, { region });
    const cost = estimate(POWER_DEFAULT).price;
    expect(series[roi - 1]).toBeGreaterThanOrEqual(cost);
    expect(series[roi - 2]).toBeLessThan(cost);
  });

  /* ⚠️ Le cas que la page 3.4 doit pouvoir dire : sans autoconsommation et sans
     valorisation du surplus, il n'y a pas d'amortissement. Le modèle renvoie
     `null` plutôt qu'un chiffre inventé. */
  it('renvoie null quand le seuil n’est jamais atteint', () => {
    expect(paybackYear(POWER_MAX, { region: 'flandre', rate: 0 })).toBeNull();
  });

  it('amortit plus vite quand on autoconsomme davantage', () => {
    const bas = paybackYear(POWER_DEFAULT, { region: 'flandre', rate: 0.2 })!;
    const haut = paybackYear(POWER_DEFAULT, { region: 'flandre', rate: 0.8 })!;
    expect(haut).toBeLessThan(bas);
  });

  /**
   * ⚠️ Le prix de l'électricité est LA constante décisive côté wallon, bien
   * avant le prix de l'installation : à 0,28 € l'amortissement n'existait pas du
   * tout, à 0,32 € il tombe à 39 ans, et il passe sous l'horizon dès que
   * l'autoconsommation monte.
   *
   * Ce test fige la FORME du constat, pas le chiffre : la Wallonie dépasse
   * l'horizon au taux de référence, mais reste amortissable sur une vie plus
   * longue. Si une révision du prix fait basculer l'un ou l'autre, il faut le
   * voir — et réécrire les textes en conséquence.
   */
  it('garde l’amortissement wallon au-delà de l’horizon au taux de référence', () => {
    expect(paybackYear(POWER_DEFAULT, { region: 'wallonie' })).toBeNull();
    expect(paybackYear(POWER_DEFAULT, { region: 'wallonie', years: 60 })).not.toBeNull();
  });

  /* ⚠️ Vérifié sur BRUXELLES et la FLANDRE seulement. En Wallonie le gain à 25
     ans est NÉGATIF au taux de référence — c'est précisément ce que la
     correction a révélé, et ce qu'il ne faut pas masquer par un test complaisant. */
  it('reste rentable sur l’horizon hors Wallonie, pour toute la gamme', () => {
    for (const region of ['bruxelles', 'flandre'] as Region[]) {
      for (const kwc of [POWER_MIN, POWER_DEFAULT, POWER_MAX]) {
        expect(netGain(kwc, { region })).toBeGreaterThan(0);
      }
    }
  });

  it('sort un gain négatif en Wallonie au taux de référence', () => {
    expect(netGain(POWER_DEFAULT, { region: 'wallonie' })).toBeLessThan(0);
  });
});

/**
 * Le seuil de bascule wallon — affiché sur DEUX pages.
 *
 * C'est la raison d'être de `breakEvenRate` : le cahier de correction impose que
 * « Amortissement » et « Autoconsommation » montrent le même chiffre. Le seul
 * moyen de le garantir est de le calculer, et ces tests vérifient que le calcul
 * dit bien ce que les textes racontent.
 */
describe('seuil de rentabilité', () => {
  it('situe le seuil wallon autour de 45 %, comme l’annoncent les deux pages', () => {
    expect(breakEvenLabel(POWER_DEFAULT, { region: 'wallonie' })).toBe('45 %');
  });

  it('n’en trouve aucun à Bruxelles, rentable dès le premier point', () => {
    expect(breakEvenRate(POWER_DEFAULT, { region: 'bruxelles' })).toBeNull();
  });

  /* La définition même du seuil : négatif juste en dessous, positif au-dessus. */
  it('encadre bien le basculement du bilan à 25 ans', () => {
    const seuil = breakEvenRate(POWER_DEFAULT, { region: 'wallonie' })!;
    expect(netGain(POWER_DEFAULT, { region: 'wallonie', rate: seuil / 100 })).toBeGreaterThan(0);
    expect(netGain(POWER_DEFAULT, { region: 'wallonie', rate: (seuil - 1) / 100 })).toBeLessThan(0);
  });

  /* Le texte de 3.4 affirme que le seuil est SPÉCIFIQUEMENT wallon : ailleurs la
     rentabilité tient déjà au taux standard. */
  it('confirme que le seuil est propre à la Wallonie', () => {
    for (const region of ['bruxelles', 'flandre'] as Region[]) {
      expect(netGain(POWER_DEFAULT, { region, rate: SELF_CONSUMPTION_RATE })).toBeGreaterThan(0);
    }
    expect(netGain(POWER_DEFAULT, { region: 'wallonie', rate: SELF_CONSUMPTION_RATE })).toBeLessThan(0);
  });
});
