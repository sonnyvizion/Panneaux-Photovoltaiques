import { formatEuro, formatNumber } from '../format';
import { KWH_PER_KWC_YEAR } from '../powerEstimate';
import { boundedRatio, type CalculatorModel } from './types';

/**
 * Modèle « Certificats verts » — page Aides & primes Bruxelles.
 *
 * ⚠️ CE N'EST PAS LE SIMULATEUR (règle d'or #3) : le module montre ce qu'un
 * mécanisme rapporte selon la puissance, il ne calcule pas le projet du
 * visiteur. Il se termine sur un pont vers `/simulateur`.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ CONSTANTES À VALIDER PAR LE CLIENT (CLAUDE.md § « À compléter »).
 * Le coefficient d'octroi est révisé par Brugel et le prix du certificat suit
 * un marché — la page le dit elle-même. Aucun chiffre d'ici n'est un revenu
 * garanti.
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * Bornes du curseur, en kWc.
 *
 * ⚠️ VOLONTAIREMENT ÉTROITES, et c'est une consigne explicite de la rédaction :
 * « au-delà, le coefficient de CV change et n'est pas confirmé dans nos sources
 * actuelles — ne pas extrapoler sans vérification ». Élargir la plage sans
 * vérifier le coefficient produirait des revenus faux.
 */
export const CERT_MIN = 3;
export const CERT_MAX = 5;

/** Pas fin, comme les autres curseurs du site : le pouce doit suivre le doigt. */
export const CERT_STEP = 0.1;

/** Le cas de référence de la page (« 700 à 1 000 €/an pour 5 kWc »). */
export const CERT_DEFAULT = 5;

/** Coefficient d'octroi 2026 pour les installations ≤ 5 kWc, en CV par MWh. */
export const CV_PER_MWH = 2.055;

/**
 * Prix de revente d'un certificat, en euros.
 *
 * La page annonce une fourchette de 65 à 90 € ; le module en prend la MOYENNE.
 * Un module qui afficherait lui-même une fourchette de fourchettes deviendrait
 * illisible — et le positionnement validé (CLAUDE.md, « Option A ») réserve le
 * détail précis à l'étude personnalisée.
 */
export const CV_PRICE = 77;

/** Durée d'octroi, en années. */
export const CERT_YEARS = 10;

export function clampPower(kwc: number): number {
  if (!Number.isFinite(kwc)) return CERT_DEFAULT;
  return Math.min(CERT_MAX, Math.max(CERT_MIN, kwc));
}

/** Nombre de certificats octroyés par an. */
export function certsPerYear(kwc: number): number {
  const mwh = (clampPower(kwc) * KWH_PER_KWC_YEAR) / 1000;
  return mwh * CV_PER_MWH;
}

/** Revenu annuel tiré de la revente, en euros. */
export function yearlyRevenue(kwc: number): number {
  return certsPerYear(kwc) * CV_PRICE;
}

/* Une décimale : « 9,2 CV ». Un certificat entier n'aurait pas de sens — le
   décompte se fait sur la production réelle, qui n'est pas ronde. */
const certFormat = new Intl.NumberFormat('fr-BE', { maximumFractionDigits: 1 });

/* ⚠️ Le coefficient passe par un formateur, jamais par une interpolation nue :
   `${2.055}` écrit « 2.055 » avec un point anglo-saxon, au milieu d'une page
   française qui écrit « 9,2 CV » deux lignes plus haut. */
const coefficientFormat = new Intl.NumberFormat('fr-BE', { maximumFractionDigits: 3 });

/** Le coefficient d'octroi, écrit à la française : « 2,055 ». */
export function formatCoefficient(): string {
  return coefficientFormat.format(CV_PER_MWH);
}

/* `maximumFractionDigits: 1` sans minimum : « 5 kWc » et non « 5,0 kWc ». */
const powerFormat = new Intl.NumberFormat('fr-BE', { maximumFractionDigits: 1 });

export function formatPower(kwc: number): string {
  return `${powerFormat.format(clampPower(kwc))} kWc`;
}

export const greenCertModel: CalculatorModel = {
  clamp: clampPower,

  values(slider) {
    const yearly = yearlyRevenue(slider);
    return [certsPerYear(slider), yearly, yearly * CERT_YEARS];
  },

  format([certs, yearly, total]) {
    return [
      `${certFormat.format(certs)} CV`,
      formatEuro(Math.round(yearly)),
      formatEuro(Math.round(total / 100) * 100),
    ];
  },

  inputLabel: formatPower,

  /* ⚠️ Les hypothèses de calcul sont AFFICHÉES, sur consigne de la rédaction :
     « transparence = crédibilité », dans l'esprit du bloc « Hypothèses » du
     simulateur. Elles sont dérivées des constantes ci-dessus, jamais réécrites
     à la main — une correction du modèle se propage donc à la légende. */
  caption: () =>
    `${formatNumber(KWH_PER_KWC_YEAR)} kWh/kWc/an × ${formatCoefficient()} CV/MWh × ${CV_PRICE} € par certificat`,

  sliderRatio(slider) {
    return ((clampPower(slider) - CERT_MIN) / (CERT_MAX - CERT_MIN)) * 100;
  },

  gaugeRatio([, yearly]) {
    return boundedRatio(yearly, yearlyRevenue(CERT_MIN), yearlyRevenue(CERT_MAX));
  },

  announce(slider) {
    return (
      `${formatPower(slider)} : environ ${certFormat.format(certsPerYear(slider))} certificats verts par an, ` +
      `soit ${formatEuro(Math.round(yearlyRevenue(slider)))} de revenu annuel pendant ${CERT_YEARS} ans.`
    );
  },
};
