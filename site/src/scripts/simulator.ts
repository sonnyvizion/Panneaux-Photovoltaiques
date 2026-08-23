import {
  KWH_PER_KWC_YEAR,
  M2_PER_PANEL,
  POWER_MAX,
  POWER_MIN,
  WC_PER_PANEL,
  estimate,
  monthlyProduction,
} from './powerEstimate';
import { avoidedCo2Kg } from './co2';
import { TILTS, orientationFactor, tiltFactor } from './orientation';
import {
  ELECTRICITY_PRICE,
  SELF_CONSUMPTION_RATE,
  paybackYear,
  yearSavings,
  type Region,
} from './savings';

/**
 * Le calcul du simulateur — écrans B, C et D du brief fonctionnel.
 *
 * ⚠️ ZÉRO LOGIQUE NOUVELLE, c'est la règle absolue du cahier. Ce fichier
 * ORCHESTRE les modules construits pour les pages de contenu — il ne recalcule
 * rien qu'ils sachent déjà faire :
 *
 *   `powerEstimate`  puissance → panneaux, production, prix, courbe mensuelle
 *   `orientation`    correction d'azimut
 *   `savings`        économies nettes, ROI, par région
 *   `co2`            CO₂ évité, dérivé de la même production
 *   `greenCert` / `prosumer`  consommés indirectement, via `savings`
 *
 * Les seules choses qui naissent ici sont des CONVERSIONS que personne d'autre
 * n'avait à faire : surface de toiture → puissance installable, facture → kWh,
 * et réponses qualitatives de l'affinage → facteurs de correction.
 *
 * ⚠️ RÉSULTATS EN FOURCHETTE, jamais au chiffre près (brief, écran C :
 * « tout en fourchettes »). C'est aussi le positionnement validé de CLAUDE.md,
 * « Option A ». L'affinage RESSERRE la fourchette au lieu de l'élargir — c'est
 * sa raison d'être.
 *
 * ⚠️ Pur et testable : aucune fonction ici ne touche au DOM.
 */

/* ------------------------------------------------------------------ écran B */

/** Type de bien — question 1 du mode rapide. */
export interface PropertyType {
  value: string;
  label: string;
  /**
   * Consommation annuelle de référence, en kWh, quand le visiteur répond
   * « je ne sais pas ». `null` quand aucune moyenne n'est disponible.
   */
  defaultConsumption: number | null;
  /**
   * Ce profil sort du modèle résidentiel et doit être orienté vers un contact
   * humain plutôt que chiffré (voir `outOfScope`).
   */
  outOfScope?: boolean;
}

/**
 * ⚠️ Seule la maison a une consommation de référence : 3 800 kWh, le repère que
 * publie la page « Nombre de panneaux ». Le brief prévoit « moyenne selon le
 * type de bien » pour les deux autres, mais aucune source du projet ne les
 * chiffre — elles figurent dans la liste « à fournir par Belgreen ». En
 * attendant, ces profils doivent saisir leur facture.
 *
 * ⚠️ Le bâtiment professionnel est HORS MODÈLE : `POWER_MIN`/`POWER_MAX` bornent
 * le résidentiel à 3-10 kWc, et la page « Guide entreprises » renvoie déjà ces
 * visiteurs vers `/contact`. Produire un chiffre pour eux serait faux.
 */
export const PROPERTY_TYPES: PropertyType[] = [
  { value: 'maison', label: 'Maison', defaultConsumption: 3800 },
  { value: 'copropriete', label: 'Copropriété (immeuble)', defaultConsumption: null },
  {
    value: 'professionnel',
    label: 'Bâtiment professionnel',
    defaultConsumption: null,
    outOfScope: true,
  },
];

export function propertyType(value: string): PropertyType {
  return PROPERTY_TYPES.find((p) => p.value === value) ?? PROPERTY_TYPES[0];
}

/** Type de toit — question 2. Deux choix seulement, comme le brief. */
export interface RoofType {
  value: string;
  label: string;
  /** Part de la surface réellement couvrable de panneaux. */
  density: number;
  /** Le toit plat masque la question d'inclinaison à l'affinage. */
  tilted: boolean;
}

/**
 * ⚠️ Densités de RÉFÉRENCE, ajustables. Le toit plat est pénalisé pour une
 * raison publiée par le site : « l'espacement obligatoire entre rangées pour
 * éviter les ombres portées réduit la densité effective ».
 */
export const ROOF_TYPES: RoofType[] = [
  { value: 'inclinee', label: 'Incliné', density: 1, tilted: true },
  { value: 'plate', label: 'Plat', density: 0.6, tilted: false },
];

export function roofType(value: string): RoofType {
  return ROOF_TYPES.find((r) => r.value === value) ?? ROOF_TYPES[0];
}

/** Tranches de facture mensuelle — question 5, mode « facture ». */
export interface BillBand {
  value: string;
  label: string;
  /** Milieu de tranche, en euros par mois. */
  monthly: number;
}

export const BILL_BANDS: BillBand[] = [
  { value: 'moins-100', label: 'Moins de 100 €/mois', monthly: 80 },
  { value: '100-200', label: '100 – 200 €/mois', monthly: 150 },
  { value: '200-350', label: '200 – 350 €/mois', monthly: 275 },
  { value: 'plus-350', label: 'Plus de 350 €/mois', monthly: 420 },
];

export const AREA_MIN = 10;
export const AREA_MAX = 120;
export const AREA_STEP = 5;
export const AREA_DEFAULT = 40;

export const CONSUMPTION_MIN = 1000;
export const CONSUMPTION_MAX = 12000;
export const CONSUMPTION_STEP = 100;
export const CONSUMPTION_DEFAULT = 3800;

/* ------------------------------------------------------------------ écran D */

/* Les coefficients d'inclinaison ont rejoint `orientation.ts` : la brique du
   catalogue pilote les deux axes, ses deux jeux vivent donc ensemble. */
export { TILTS, tiltFactor };

/**
 * ⚠️ Facteurs d'OMBRAGE — hypothèses de référence, ajustables.
 *
 * La page « Ombrage » explique qu'une ombre partielle pénalise fortement une
 * chaîne de panneaux, sans jamais la chiffrer.
 */
export const SHADINGS = [
  { value: 'aucun', label: 'Aucun', factor: 1 },
  { value: 'partiel', label: 'Partiel', factor: 0.85 },
  { value: 'important', label: 'Important', factor: 0.65 },
];

export function shadingFactor(value: string): number {
  return SHADINGS.find((s) => s.value === value)?.factor ?? 1;
}

export const YES_NO_SOON = [
  { value: 'non', label: 'Non' },
  { value: 'oui', label: 'Oui' },
  { value: 'projet', label: 'En projet' },
];

/**
 * ⚠️ Effet des équipements sur l'AUTOCONSOMMATION — hypothèses de référence.
 *
 * Les pages « Pompe à chaleur » et « Voiture électrique » les présentent comme
 * « les leviers les plus efficaces pour augmenter l'autoconsommation », sans
 * donner de points. « En projet » compte pour moitié : l'équipement n'est pas là
 * aujourd'hui, mais il pèsera sur la durée de vie de l'installation.
 */
export const EQUIPMENT_BONUS = 0.08;

/**
 * Taux atteint avec une batterie domestique.
 *
 * ⚠️ Son SURCOÛT n'est pas modélisé — aucune source du projet ne le chiffre, et
 * la page « Batterie domestique » dit seulement qu'il est « important ». Le
 * toggle montre donc l'effet sur l'autoconsommation, pas sur le budget, et
 * l'écran doit le dire.
 */
export const BATTERY_RATE = 0.7;

/** Plafond hors batterie : viser 100 % n'a pas de sens (page Autoconsommation). */
export const EQUIPMENT_RATE_CAP = 0.6;

export interface RefineInputs {
  tilt: string;
  shading: string;
  heatPump: string;
  car: string;
  battery: boolean;
}

export const REFINE_DEFAULT: RefineInputs = {
  tilt: 'inconnue',
  shading: 'aucun',
  heatPump: 'non',
  car: 'non',
  battery: false,
};

/** Le taux d'autoconsommation retenu, relevé par les équipements déclarés. */
export function rateFromRefine(refine: RefineInputs): number {
  if (refine.battery) return BATTERY_RATE;
  const weight = (answer: string) => (answer === 'oui' ? 1 : answer === 'projet' ? 0.5 : 0);
  const bonus = (weight(refine.heatPump) + weight(refine.car)) * EQUIPMENT_BONUS;
  return Math.min(SELF_CONSUMPTION_RATE + bonus, EQUIPMENT_RATE_CAP);
}

/* ------------------------------------------------------------- fourchettes */

export interface Range {
  low: number;
  high: number;
}

/**
 * Largeur de la fourchette, avant et après affinage.
 *
 * ⚠️ L'affinage RESSERRE — c'est sa promesse au brief (« un affinage 100 %
 * optionnel qui resserre les fourchettes »). Si les deux valeurs étaient égales,
 * le visiteur ne verrait aucun bénéfice à répondre à cinq questions de plus.
 */
export const SPREAD_QUICK = 0.2;
export const SPREAD_REFINED = 0.1;

function spread(value: number, width: number): Range {
  return { low: value * (1 - width), high: value * (1 + width) };
}

/* --------------------------------------------------------------- le calcul */

export interface SimulatorInputs {
  region: Region;
  property: string;
  roof: string;
  orientation: string;
  area: number;
  /** `facture` · `kwh` · `inconnue` */
  consumptionMode: string;
  bill: string;
  consumption: number;
  /** Absent tant que le visiteur n'a pas affiné. */
  refine?: RefineInputs;
}

export interface SimulatorResults {
  kwc: Range;
  production: Range;
  savings: Range;
  cost: Range;
  roi: Range | null;
  monthly: number[];
  co2Kg: number;
  rate: number;
  consumption: number;
  /** `true` dès que le visiteur a affiné : les fourchettes sont resserrées. */
  refined: boolean;
  /** Le profil sort du modèle résidentiel — orienter vers un contact humain. */
  outOfScope: boolean;
  /** Aucune moyenne disponible : il faut saisir la facture. */
  needsBill: boolean;
}

/** La consommation retenue, quel que soit le mode de saisie. */
export function resolveConsumption(inputs: SimulatorInputs): number {
  if (inputs.consumptionMode === 'kwh') return inputs.consumption;
  if (inputs.consumptionMode === 'facture') {
    const band = BILL_BANDS.find((b) => b.value === inputs.bill) ?? BILL_BANDS[1];
    return (band.monthly * 12) / ELECTRICITY_PRICE;
  }
  return propertyType(inputs.property).defaultConsumption ?? CONSUMPTION_DEFAULT;
}

/** La puissance qu'autorise une surface, compte tenu du support. */
export function powerFromArea(area: number, roof: string): number {
  const panels = Math.floor((area * roofType(roof).density) / M2_PER_PANEL);
  return (panels * WC_PER_PANEL) / 1000;
}

/** La puissance qu'appelle une consommation, à orientation donnée. */
export function powerFromConsumption(consumption: number, orientation: string): number {
  return consumption / (KWH_PER_KWC_YEAR * orientationFactor(orientation));
}

/**
 * Le dimensionnement retenu : le MINIMUM des deux contraintes, borné à la gamme
 * résidentielle. On ne pose ni plus que la toiture ne porte, ni plus que la
 * consommation ne justifie — le site répète que le surplus est faiblement
 * valorisé.
 */
export function sizedPower(inputs: SimulatorInputs): number {
  const byArea = powerFromArea(inputs.area, inputs.roof);
  const byNeed = powerFromConsumption(resolveConsumption(inputs), inputs.orientation);
  return Math.min(POWER_MAX, Math.max(POWER_MIN, Math.min(byArea, byNeed)));
}

/**
 * Le facteur de production : azimut × pente × ombrage.
 *
 * ⚠️ Le mode rapide applique les MÊMES hypothèses par défaut que l'affinage
 * (`REFINE_DEFAULT`) — il ne les ignore pas. Sans cela, ouvrir l'affinage et ne
 * rien répondre ferait chuter l'estimation de 5 % (la pente « je ne sais pas »),
 * et le visiteur serait puni d'avoir cliqué. L'invariant, verrouillé par un
 * test : affiner sans rien changer ne déplace pas le chiffre, cela ne fait que
 * resserrer la fourchette.
 */
export function productionFactor(inputs: SimulatorInputs): number {
  const refine = inputs.refine ?? REFINE_DEFAULT;
  const tilt = roofType(inputs.roof).tilted ? tiltFactor(refine.tilt) : 1;
  return orientationFactor(inputs.orientation) * tilt * shadingFactor(refine.shading);
}

/**
 * Le mécanisme régional nommé sous le budget.
 *
 * ⚠️ Le brief demande « budget avant et après primes ». Nos pages établissent
 * qu'il n'existe plus de prime DIRECTE en Wallonie ni en Flandre, et que les
 * certificats verts bruxellois sont un revenu étalé sur dix ans — pas une
 * déduction du budget. Afficher une seconde ligne « après primes » serait donc
 * faux. On nomme le mécanisme réel à la place.
 */
export function aidesLabel(region: Region): string {
  if (region === 'bruxelles') {
    return 'À Bruxelles, les certificats verts s’ajoutent en revenu pendant 10 ans — ils ne réduisent pas le budget de départ.';
  }
  if (region === 'wallonie') {
    return 'En Wallonie, plus de prime directe : le Rénoprêt à 0 % étale le budget, et le tarif prosumer est déjà déduit des économies.';
  }
  return 'En Flandre, plus de prime depuis 2023 : le tarif d’injection est déjà intégré aux économies.';
}

export function simulate(inputs: SimulatorInputs): SimulatorResults {
  const property = propertyType(inputs.property);
  const consumption = resolveConsumption(inputs);
  const kwc = sizedPower(inputs);
  const base = estimate(kwc);
  const factor = productionFactor(inputs);
  const production = base.production * factor;

  const refined = Boolean(inputs.refine);
  const width = refined ? SPREAD_REFINED : SPREAD_QUICK;
  const rate = inputs.refine ? rateFromRefine(inputs.refine) : SELF_CONSUMPTION_RATE;

  const options = { region: inputs.region, rate, production };
  const yearly = yearSavings(kwc, options).net;
  const payback = paybackYear(kwc, options);

  return {
    kwc: spread(kwc, width),
    production: spread(production, width),
    savings: spread(yearly, width),
    cost: spread(base.price, width),
    /* La fourchette de retour s'arrondit à l'année : un « 8,3 à 11,2 ans »
       donnerait une précision que l'estimation n'a pas. */
    roi:
      payback === null
        ? null
        : { low: Math.max(1, Math.floor(payback * (1 - width))), high: Math.ceil(payback * (1 + width)) },
    monthly: monthlyProduction(kwc).map((m) => m * factor),
    co2Kg: avoidedCo2Kg(kwc) * factor,
    rate,
    consumption,
    refined,
    outOfScope: Boolean(property.outOfScope),
    needsBill: inputs.consumptionMode === 'inconnue' && property.defaultConsumption === null,
  };
}
