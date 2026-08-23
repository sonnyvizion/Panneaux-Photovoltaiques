import { KWH_PER_KWC_YEAR, estimate } from './powerEstimate';
import { PROSUMER_RATE } from './calculators/prosumer';
import { CERT_YEARS, CV_PER_MWH, CV_PRICE } from './calculators/greenCert';

/**
 * Économies d'une installation photovoltaïque, et point d'amortissement.
 *
 * Socle commun aux pages « Autoconsommation & revente » (3.4) et
 * « Amortissement / ROI » (3.3), et destiné au simulateur le jour où il sera
 * codé. C'est le premier module du site qui modélise le côté RECETTES : jusqu'ici
 * le code ne connaissait que des coûts (prix d'installation, tarif prosumer) et
 * un revenu isolé (certificats verts bruxellois).
 *
 * ⚠️ AUCUNE CONSTANTE N'EST RECOPIÉE. Le productible vient de `powerEstimate`,
 * le tarif prosumer de `calculators/prosumer`, les certificats verts de
 * `calculators/greenCert`. Trois pages du pilier Aides & primes affichent déjà
 * ces chiffres : ils ne peuvent pas diverger de ceux du ROI.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * HYPOTHÈSES DE RÉFÉRENCE, AJUSTABLES.
 *
 * Ces trois valeurs ne sont pas des trous de contenu : elles circulaient déjà
 * dans le projet sans être centralisées. Elles le sont ici, une fois.
 *
 *  — prix du kWh acheté : 0,32 € (marché belge 2026, tout compris — voir la
 *    constante elle-même, c'est la seule à porter une date de péremption)
 *  — tarif d'injection : 4 ct/kWh (Wallonie et Flandre, marché non régulé)
 *  — taux d'autoconsommation : 37,76 % (CWaPE, déjà utilisé pour le calcul du
 *    tarif prosumer wallon)
 *
 * Les ajuster ici met à jour toutes les pages qui en dépendent, d'un coup.
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * Prix d'achat de l'électricité au réseau, en euros par kWh, tout compris.
 *
 * ⚠️⚠️ CONSTANTE À REVALIDER PÉRIODIQUEMENT — dernière vérification : 2026-08-18.
 *
 * C'est la seule hypothèse de ce fichier qui porte sur un MARCHÉ NON RÉGULÉ. Le
 * tarif prosumer est fixé par la CWaPE et le coefficient de certificats verts par
 * Brugel : ils changent par décision publique, annoncée. Le prix de l'électricité,
 * lui, dérive en continu au gré des contrats de fourniture — et personne ne
 * préviendra que la valeur d'ici a vieilli.
 *
 * Ce n'est pas théorique : la version précédente valait 0,28 €, héritée du
 * curseur par défaut de `simulateur.md`. Devenue obsolète, elle produisait à elle
 * seule un amortissement wallon infini, alors que le marché belge 2026 se situe
 * entre 0,30 et 0,35 € tout compris (7 sources concordantes). Une constante
 * périmée avait donc rendu toute une région artificiellement non rentable.
 *
 * ⚠️ À revoir au moins une fois par an, et à chaque refonte tarifaire. Le jour où
 * elle bouge, TOUT le pilier Rentabilité bouge avec elle — c'est le but.
 *
 * ⚠️ `simulateur.md` annonce encore ~0,28 € comme défaut de son curseur : à
 * aligner sur cette valeur quand le simulateur sera codé, sinon les deux
 * repartiront chacun de leur côté.
 */
export const ELECTRICITY_PRICE = 0.32;

/**
 * Tarif d'injection, en euros par kWh de surplus.
 *
 * S'applique EN FLANDRE ET EN WALLONIE. Dans les deux régions le surplus est
 * racheté par le fournisseur, à un tarif de marché non régulé — de l'ordre de
 * 1 à 8 c€/kWh selon le contrat, et qui peut même devenir négatif. 4 c€ est
 * retenu comme référence médiane.
 */
export const INJECTION_PRICE = 0.04;

/** Part de la production consommée sur place, sans adaptation particulière. */
export const SELF_CONSUMPTION_RATE = 0.3776;

/**
 * Dégradation annuelle des panneaux.
 *
 * Ce n'est pas une hypothèse de plus : les pages « Longévité » et « Rendement »
 * l'annoncent toutes les deux (« environ 0,5 % par an »). L'ignorer donnerait un
 * amortissement légèrement trop optimiste, et surtout un chiffre que le texte du
 * site contredirait.
 */
export const ANNUAL_DEGRADATION = 0.005;

/** Horizon d'étude, en années — la durée de vie basse annoncée par le site. */
export const HORIZON_YEARS = 25;

export type Region = 'wallonie' | 'bruxelles' | 'flandre';

/**
 * Région retenue pour les modules affichés aujourd'hui.
 *
 * ⚠️ Un seul cas est branché pour l'instant — règle d'or #3, un seul
 * simulateur : les pages illustrent, elles ne calculent pas le projet du
 * visiteur. Mais toute la mécanique ci-dessous prend déjà `region` en
 * paramètre, pour qu'un futur sélecteur régional soit un BRANCHEMENT et non une
 * réécriture.
 */
export const REGION_DEFAULT: Region = 'wallonie';

/**
 * Ce qu'une région fait du surplus, et ce qu'elle facture en plus.
 *
 * ⚠️ CORRECTION DU 2026-08-18, sur recherche documentée (6 sources
 * concordantes) : la Wallonie NE COMPENSE PAS le surplus au prix d'achat.
 *
 * Une première version de ce fichier le supposait, parce que c'était la seule
 * lecture compatible avec les « 7 à 12 ans » que publiaient les pages. C'était
 * une erreur : la compensation venait de l'ancien COMPTEUR INVERSÉ, disparu.
 * Depuis 2024, deux mécanismes wallons coexistent SÉPARÉMENT :
 *
 *  — le tarif prosumer, un coût fixe annuel (voir `prosumer.ts`) ;
 *  — le tarif d'injection, un revenu distinct et modeste, au tarif de marché.
 *
 * La Wallonie valorise donc son surplus comme la Flandre, tout en supportant en
 * plus la charge prosumer. Conséquence assumée : l'amortissement wallon
 * s'allonge très nettement, et les textes qui annonçaient « 7 à 12 ans » sont à
 * réécrire — le modèle n'a pas été ajusté pour les préserver.
 *
 * Bruxelles n'a pas de compensation non plus : elle valorise la production par
 * des certificats verts, pendant dix ans.
 */
interface RegionRules {
  label: string;
  /** Valeur du surplus injecté, en euros, pour une année donnée. */
  surplusValue(surplusKwh: number, productionKwh: number, year: number): number;
  /** Charge annuelle propre à la région, en euros. */
  annualCharge(kwc: number): number;
}

const RULES: Record<Region, RegionRules> = {
  wallonie: {
    label: 'Wallonie',
    /* Tarif d'injection, comme en Flandre — et NON le prix d'achat : le compteur
       inversé n'existe plus. La charge prosumer vient s'y ajouter, elle. */
    surplusValue: (surplus) => surplus * INJECTION_PRICE,
    annualCharge: (kwc) => kwc * PROSUMER_RATE,
  },
  bruxelles: {
    label: 'Bruxelles',
    /* Les certificats verts portent sur la production TOTALE, pas sur le seul
       surplus — et seulement pendant la période d'octroi. */
    surplusValue: (_surplus, production, year) =>
      year <= CERT_YEARS ? (production / 1000) * CV_PER_MWH * CV_PRICE : 0,
    annualCharge: () => 0,
  },
  flandre: {
    label: 'Flandre',
    surplusValue: (surplus) => surplus * INJECTION_PRICE,
    annualCharge: () => 0,
  },
};

export function regionLabel(region: Region): string {
  return RULES[region].label;
}

/**
 * Production d'une année donnée, dégradation comprise.
 *
 * `base` permet de partir d'une production DÉJÀ corrigée — de l'orientation, par
 * exemple. Le simulateur en a besoin : une toiture est-ouest ne produit pas le
 * productible de référence. Sans ce paramètre, il aurait fallu recopier la
 * dégradation ailleurs, et c'est exactement ce qu'on évite.
 */
export function productionInYear(kwc: number, year: number, base?: number): number {
  const yearly = base ?? estimate(kwc).production;
  return yearly * (1 - ANNUAL_DEGRADATION) ** (year - 1);
}

/**
 * Ce qu'on peut surcharger dans le calcul.
 *
 * ⚠️ `price` et `production` existent POUR LE SIMULATEUR, qui les fait varier :
 * le visiteur bouge le prix du kWh, et l'orientation de son toit corrige le
 * productible. Les pages de contenu, elles, n'en passent aucun et retombent sur
 * les hypothèses de référence — d'où les valeurs par défaut.
 */
export interface SavingsOptions {
  region?: Region;
  rate?: number;
  /** Prix d'achat du kWh, si différent de l'hypothèse de référence. */
  price?: number;
  /** Production annuelle déjà corrigée (orientation, ombrage…), en kWh. */
  production?: number;
  years?: number;
}

export interface YearSavings {
  /** Économies sur l'électricité non achetée. */
  direct: number;
  /** Valorisation du surplus : injection, certificats verts, compensation. */
  surplus: number;
  /** Charges annuelles régionales, en positif. */
  charge: number;
  /** Ce que l'année rapporte réellement. */
  net: number;
}

/**
 * Le bilan d'une année.
 *
 * `rate` est le taux d'autoconsommation, entre 0 et 1 — c'est la variable que le
 * module de la page 3.4 fait bouger.
 */
export function yearSavings(
  kwc: number,
  {
    region = REGION_DEFAULT,
    rate = SELF_CONSUMPTION_RATE,
    year = 1,
    price = ELECTRICITY_PRICE,
    production: base,
  }: SavingsOptions & { year?: number } = {},
): YearSavings {
  const rules = RULES[region];
  const production = productionInYear(kwc, year, base);
  const bounded = Math.min(Math.max(rate, 0), 1);
  const selfConsumed = production * bounded;
  const surplusKwh = production - selfConsumed;

  const direct = selfConsumed * price;
  const surplus = rules.surplusValue(surplusKwh, production, year);
  const charge = rules.annualCharge(kwc);

  return { direct, surplus, charge, net: direct + surplus - charge };
}

/**
 * Les économies cumulées année par année, en euros.
 *
 * Index 0 = année 1. C'est la série que trace la courbe de la timeline
 * d'amortissement.
 */
export function cumulativeSavings(
  kwc: number,
  { region = REGION_DEFAULT, rate = SELF_CONSUMPTION_RATE, years = HORIZON_YEARS, price, production }: SavingsOptions = {},
): number[] {
  const series: number[] = [];
  let total = 0;
  for (let year = 1; year <= years; year += 1) {
    total += yearSavings(kwc, { region, rate, year, price, production }).net;
    series.push(total);
  }
  return series;
}

/**
 * L'année où les économies cumulées dépassent le coût de l'installation.
 *
 * `null` si le seuil n'est jamais atteint sur l'horizon — un cas que l'appelant
 * doit gérer plutôt que d'afficher un chiffre faux. C'est ce qui arrive avec un
 * taux d'autoconsommation très bas dans une région qui ne valorise pas le
 * surplus, et la page 3.4 doit pouvoir le dire.
 */
export function paybackYear(
  kwc: number,
  { region = REGION_DEFAULT, rate = SELF_CONSUMPTION_RATE, years = HORIZON_YEARS, price, production }: SavingsOptions = {},
): number | null {
  const cost = estimate(kwc).price;
  const series = cumulativeSavings(kwc, { region, rate, years, price, production });
  const index = series.findIndex((total) => total >= cost);
  return index === -1 ? null : index + 1;
}

/** Le gain net au bout de l'horizon : cumulé moins l'investissement. */
export function netGain(
  kwc: number,
  { region = REGION_DEFAULT, rate = SELF_CONSUMPTION_RATE, years = HORIZON_YEARS, price, production }: SavingsOptions = {},
): number {
  const series = cumulativeSavings(kwc, { region, rate, years, price, production });
  return series[series.length - 1] - estimate(kwc).price;
}

/**
 * Le taux d'autoconsommation à partir duquel l'installation redevient positive
 * sur l'horizon, en pourcentage — ou `null` si elle l'est déjà à 0 %.
 *
 * ⚠️ CALCULÉ, JAMAIS ÉCRIT À LA MAIN. Deux pages l'affichent — « Amortissement »
 * et « Autoconsommation » — et le cahier de correction insiste : ce doit être le
 * MÊME chiffre, pas deux constantes recopiées qui divergeraient à la première
 * révision du prix du kWh. Même règle que pour le CO₂ et le productible.
 *
 * Le balayage se fait au dixième de point puis s'arrondit à l'affichage : la
 * précision réelle du modèle ne justifie pas mieux, et un « seuil de 43,7 % »
 * donnerait à une hypothèse la tenue d'une mesure.
 */
export function breakEvenRate(
  kwc: number,
  { region = REGION_DEFAULT, years = HORIZON_YEARS } = {},
): number | null {
  if (netGain(kwc, { region, rate: 0, years }) > 0) return null;
  for (let percent = 0; percent <= 100; percent += 0.1) {
    if (netGain(kwc, { region, rate: percent / 100, years }) > 0) return percent;
  }
  return null;
}

/**
 * Le seuil arrondi au multiple de 5 le plus proche, tel qu'il s'affiche.
 *
 * C'est un repère à retenir, pas une consigne au dixième : « autour de 45 % » se
 * mémorise et se vérifie, « 43,7 % » ne se retient pas et promet une précision
 * que le modèle n'a pas.
 */
export function breakEvenLabel(
  kwc: number,
  { region = REGION_DEFAULT, years = HORIZON_YEARS } = {},
): string | null {
  const exact = breakEvenRate(kwc, { region, years });
  return exact === null ? null : `${Math.round(exact / 5) * 5} %`;
}

/** Le productible de référence, ré-exporté pour les légendes d'hypothèses. */
export { KWH_PER_KWC_YEAR };
