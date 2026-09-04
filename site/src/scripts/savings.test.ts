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
  /**
   * ⚠️ CORRECTION DU 2026-09-04, sur la note explicative de la CWaPE
   * (« Tarif prosumer », mise à jour du 23/06/2025). Ces tests affirmaient
   * l'inverse, et le commentaire d'alors disait « c'est le résultat, pas un
   * bug ». C'ÉTAIT un bug, et la source le tranche en trois phrases :
   *
   *  §2  — le tarif prosumer est facturé « lorsque les coûts de réseau qui leur
   *        sont facturés sont établis sur la base de leurs prélèvements annuels
   *        NETS » ;
   *  §4.4 — depuis le 01/01/2024, un prosumer sans compensation voit
   *        « l'ensemble de sa facture établi sur la base de ses prélèvements
   *        BRUTS » ;
   *  §7  — depuis le 01/01/2024, toute nouvelle installation ≤ 10 kVA reçoit
   *        systématiquement un compteur communicant.
   *
   * Une installation posée aujourd'hui est donc facturée sur ses prélèvements
   * bruts. Il n'y a plus rien à compenser, et le tarif prosumer NE S'APPLIQUE
   * PAS. Le modèle facturait 87 €/kWc/an à un public qui ne les paiera jamais.
   */
  it('amortit une installation wallonne dans l’horizon, au taux de référence', () => {
    const roi = paybackYear(POWER_DEFAULT, { region: 'wallonie' });
    expect(roi).not.toBeNull();
    expect(roi!).toBeLessThanOrEqual(HORIZON_YEARS);
  });

  /* Contrôle de vraisemblance face au marché : les sources belges annoncent 6 à
     13 ans. On ne vise pas leur chiffre — on vérifie qu'on n'est plus l'outlier
     que le modèle produisait, sans devenir optimiste pour autant. */
  it('tombe dans la fourchette annoncée par le marché belge', () => {
    const roi = paybackYear(POWER_DEFAULT, { region: 'wallonie' })!;
    expect(roi).toBeGreaterThanOrEqual(6);
    expect(roi).toBeLessThanOrEqual(15);
  });

  it('n’impute plus AUCUNE charge annuelle à la Wallonie', () => {
    expect(yearSavings(POWER_DEFAULT, { region: 'wallonie' }).charge).toBe(0);
  });

  /* Bruxelles garde une longueur d'avance : ses certificats verts portent sur
     la production TOTALE pendant dix ans, là où les deux autres régions ne
     valorisent que le surplus injecté. */
  it('place Bruxelles devant, les deux autres régions à égalité', () => {
    const roi = (region: Region) => paybackYear(POWER_DEFAULT, { region, rate: 0.7 })!;
    expect(roi('bruxelles')).toBeLessThan(roi('flandre'));
    expect(roi('wallonie')).toBe(roi('flandre'));
  });

  /* Le tarif prosumer est ce qui creuse l'écart : sans lui, la Wallonie et la
     Flandre seraient identiques, puisqu'elles valorisent le surplus pareil. */
  /**
   * ⚠️ WALLONIE ET FLANDRE SONT DÉSORMAIS IDENTIQUES dans le modèle, et ce
   * n'est pas un raccourci : depuis 2024 les deux régions facturent une
   * nouvelle installation sur ses prélèvements bruts et rachètent le surplus au
   * tarif d'injection du marché. Ce qui les séparait dans ce fichier était une
   * charge que la Wallonie ne prélève pas sur ce public.
   *
   * Si un jour elles divergent à nouveau, c'est ce test qui le dira.
   */
  it('aligne la Wallonie sur la Flandre, faute de charge qui les sépare', () => {
    const wal = yearSavings(POWER_DEFAULT, { region: 'wallonie' });
    const vl = yearSavings(POWER_DEFAULT, { region: 'flandre' });
    expect(wal.net).toBeCloseTo(vl.net);
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

  /* Plus AUCUNE région ne porte de charge annuelle : la Wallonie était la seule,
     et le tarif prosumer ne s'applique pas à une installation posée aujourd'hui
     (voir la note de `RULES.wallonie` dans `savings.ts`). Le champ reste dans le
     modèle : le jour où une région réintroduit une redevance, il l'accueille. */
  it('ne décompte plus de charge annuelle dans aucune région', () => {
    for (const region of REGIONS) {
      expect(yearSavings(POWER_DEFAULT, { region }).charge).toBe(0);
    }
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
   * ⚠️ RÉÉCRIT LE 2026-09-04. Ce test figeait « la Wallonie dépasse l'horizon »,
   * et son commentaire demandait qu'on le voie si ça basculait. Ça a basculé :
   * la charge qui produisait ce constat n'existe pas pour le public du site.
   */
  it('amortit la Wallonie dans l’horizon, au taux de référence', () => {
    const roi = paybackYear(POWER_DEFAULT, { region: 'wallonie' });
    expect(roi).not.toBeNull();
    expect(roi!).toBeLessThan(HORIZON_YEARS);
  });

  it('reste rentable sur l’horizon hors Wallonie, pour toute la gamme', () => {
    for (const region of ['bruxelles', 'flandre'] as Region[]) {
      for (const kwc of [POWER_MIN, POWER_DEFAULT, POWER_MAX]) {
        expect(netGain(kwc, { region })).toBeGreaterThan(0);
      }
    }
  });

  /* Le contraire exact de ce que ce fichier affirmait la veille. Le gain wallon
     à 25 ans passe d'environ −3 200 € à plus de 11 000 €, et l'écart tient
     entièrement au forfait prosumer qu'on facturait à tort. */
  it('sort un gain nettement positif en Wallonie au taux de référence', () => {
    expect(netGain(POWER_DEFAULT, { region: 'wallonie' })).toBeGreaterThan(0);
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
  /**
   * ⚠️ CE SEUIL A PERDU SON SUJET, le 2026-09-04. Il valait 45 % en Wallonie et
   * les pages « Amortissement » et « Autoconsommation » l'affichaient comme LE
   * chiffre wallon à battre. Il n'existait que parce qu'on facturait un forfait
   * prosumer de 522 €/an : sans lui, l'installation est bénéficiaire dès une
   * autoconsommation dérisoire, et le seuil tombe à quelques pour cent.
   *
   * On garde `breakEvenRate` : c'est une grandeur juste, elle sert encore à dire
   * « à partir de quand ça vaut le coup », et elle redeviendra intéressante si
   * une région réintroduit une redevance. Ce sont les TEXTES qui changent.
   */
  it('tombe très bas en Wallonie, faute de charge à couvrir', () => {
    const seuil = breakEvenRate(POWER_DEFAULT, { region: 'wallonie' })!;
    expect(seuil).toBeLessThan(15);
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

  /* Il n'est plus « propre à la Wallonie » : la Flandre a exactement le même,
     puisque les deux régions sont désormais traitées à l'identique. */
  it('vaut le même en Wallonie et en Flandre', () => {
    expect(breakEvenRate(POWER_DEFAULT, { region: 'wallonie' })).toBe(
      breakEvenRate(POWER_DEFAULT, { region: 'flandre' }),
    );
  });

  /* Au taux de référence du site, les TROIS régions sont largement au-dessus. */
  it('laisse les trois régions bénéficiaires au taux de référence', () => {
    for (const region of REGIONS) {
      expect(netGain(POWER_DEFAULT, { region, rate: SELF_CONSUMPTION_RATE })).toBeGreaterThan(0);
    }
  });
});
