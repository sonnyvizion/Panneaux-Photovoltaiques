/**
 * Rendement d'une installation selon l'orientation du pan de toiture.
 *
 * Ces coefficients sont ceux du cahier du simulateur. Ils alimentent le
 * simulateur, et ils alimenteront les trois pages qui attendent encore leur
 * texte — « Orientation & inclinaison », « Toit incliné » et « Jardin / au
 * sol » — dont le module partagé est justement celui-ci.
 *
 * ⚠️ Coefficients de RÉFÉRENCE, ajustables. Ils décrivent le pan sur lequel les
 * panneaux sont posés, pas la maison : une toiture est-ouest peut porter deux
 * pans exploités, ce que le simulateur ne modélise pas — il raisonne sur un
 * seul pan, comme le fait le cahier.
 *
 * ⚠️ L'INCLINAISON VIT ICI AUSSI. Ses coefficients étaient nés dans
 * `simulator.ts` faute de source au moment du brief ; les deux jeux qui
 * décrivent un pan de toiture se lisent au même endroit, sinon le simulateur
 * devient la source de l'un d'eux. Ils restent des hypothèses de référence, dans
 * la liste « à fournir par Belgreen ». Ils se MULTIPLIENT au facteur d'azimut.
 */

export interface Orientation {
  value: string;
  label: string;
  /** Part du productible optimal, entre 0 et 1. */
  factor: number;
}

export const ORIENTATIONS: Orientation[] = [
  { value: 'sud', label: 'Sud', factor: 1 },
  { value: 'sud-est-ouest', label: 'Sud-Est / Sud-Ouest', factor: 0.95 },
  { value: 'est-ouest', label: 'Est / Ouest', factor: 0.85 },
  { value: 'nord', label: 'Nord', factor: 0.65 },
];

/** L'orientation la plus favorable — celle qui sert de référence au reste du site. */
export const ORIENTATION_DEFAULT = 'sud';

export function orientationFactor(value: string): number {
  return ORIENTATIONS.find((o) => o.value === value)?.factor ?? 1;
}

export function orientationLabel(value: string): string {
  return ORIENTATIONS.find((o) => o.value === value)?.label ?? ORIENTATIONS[0].label;
}

/**
 * L'écart entre la meilleure et la pire orientation, en points de rendement.
 *
 * Dérivé, jamais écrit à la main : la page « Rendement & production » annonce
 * « 35 points d'écart entre le sud et le nord », et ce chiffre doit rester
 * solidaire des coefficients ci-dessus.
 */
export function orientationSpread(): number {
  const factors = ORIENTATIONS.map((o) => o.factor);
  return Math.round((Math.max(...factors) - Math.min(...factors)) * 100);
}

/**
 * Le rendement affiché, en pourcentage entier.
 *
 * ⚠️ Le pourcentage est RELATIF à la meilleure orientation, pas au productible
 * absolu : « 85 % » veut dire « 85 % de ce que donnerait le meilleur cas », ce
 * que le libellé qui l'accompagne doit dire. Rapporté au maximum du tableau et
 * non figé à 1, pour qu'un ajustement des coefficients garde 100 % en tête.
 */
export function orientationPercent(value: string): number {
  const best = Math.max(...ORIENTATIONS.map((o) => o.factor));
  return Math.round((orientationFactor(value) / best) * 100);
}

/* ------------------------------------------------------------- inclinaison */

/**
 * ⚠️ Coefficients d'INCLINAISON — hypothèses de référence, ajustables, à faire
 * valider par Belgreen. Ils se multiplient au facteur d'azimut.
 *
 * « Je ne sais pas » vaut 0,95 et non 1 : une hypothèse prudente, jamais le cas
 * optimal — le même parti que pour l'orientation inconnue.
 */
export const TILTS: Orientation[] = [
  { value: 'faible', label: 'Faible', factor: 0.9 },
  { value: 'moyenne', label: 'Moyenne', factor: 1 },
  { value: 'forte', label: 'Forte', factor: 0.92 },
  { value: 'inconnue', label: 'Je ne sais pas', factor: 0.95 },
];

export function tiltFactor(value: string): number {
  return TILTS.find((t) => t.value === value)?.factor ?? 1;
}
