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
 * ⚠️ L'INCLINAISON VIT ICI AUSSI, depuis que la brique du catalogue sert les
 * deux axes. Ses coefficients étaient nés dans `simulator.ts` faute de source au
 * moment du brief ; une brique qui pilote azimut ET pente doit trouver ses deux
 * jeux au même endroit, sinon elle en importe un de l'outil qu'elle est censée
 * servir. Ils restent des hypothèses de référence, dans la liste « à fournir par
 * Belgreen ». Ils se MULTIPLIENT au facteur d'azimut.
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

/* --------------------------------------------------- la brique à deux axes */

export type DialAxis = 'orientation' | 'tilt';

export interface DialModel {
  /** Les crans du curseur, dans l'ordre où on les balaie. */
  steps: Orientation[];
  /** Ce que vaut « je ne sais pas » — jamais un cran, toujours une échappatoire. */
  unknown: string;
  legend: string;
  /** Les deux extrémités, pour légender la course. */
  bounds: [string, string];
}

/**
 * Le modèle du curseur, par axe.
 *
 * ⚠️ L'ORDRE DES CRANS N'EST PAS CELUI DES TABLEAUX. L'azimut se balaie du pire
 * au meilleur — nord, est/ouest, sud-est/sud-ouest, sud — pour que déplacer le
 * soleil vers le sud fasse MONTER le pourcentage : un curseur dont la valeur
 * baisse quand on avance ment sur ce qu'il représente.
 *
 * ⚠️ La pente, elle, se balaie par ANGLE et non par rendement : faible, moyenne,
 * forte. Son optimum est au milieu (un toit trop plat comme un toit trop pentu
 * perdent quelques pourcents), et c'est précisément ce que le visiteur doit
 * voir. Trier par facteur y aurait produit un ordre absurde.
 *
 * ⚠️ « Je ne sais pas » ne figure JAMAIS parmi les crans : ce n'est pas une
 * position intermédiaire, c'est un refus de répondre. Il vit en bouton à côté.
 */
export function dialModel(axis: DialAxis): DialModel {
  if (axis === 'tilt') {
    return {
      steps: TILTS.filter((t) => t.value !== 'inconnue'),
      unknown: 'inconnue',
      legend: 'Inclinaison du toit',
      bounds: ['Presque plat', 'Très pentu'],
    };
  }
  return {
    steps: [...ORIENTATIONS].reverse(),
    unknown: 'sud-est-ouest',
    legend: 'Orientation du toit',
    bounds: ['Nord', 'Sud'],
  };
}

/** Le cran désigné par la position du curseur, borné à la course. */
export function dialStep(axis: DialAxis, index: number): Orientation {
  const { steps } = dialModel(axis);
  return steps[Math.min(Math.max(Math.round(index), 0), steps.length - 1)];
}

/** La position du curseur qui désigne cette valeur, `null` si elle n'est pas un cran. */
export function dialIndex(axis: DialAxis, value: string): number | null {
  const found = dialModel(axis).steps.findIndex((s) => s.value === value);
  return found < 0 ? null : found;
}

/**
 * Le rendement affiché, en pourcentage entier.
 *
 * ⚠️ Le pourcentage est RELATIF au meilleur cran de l'axe, pas au productible
 * absolu : « 85 % » veut dire « 85 % de ce que donnerait le meilleur cas », ce
 * que le libellé doit dire. Divisé par le maximum de l'axe et non figé à 1, pour
 * que la pente — dont l'optimum est « moyenne » — affiche bien 100 % au milieu.
 */
export function dialPercent(axis: DialAxis, value: string): number {
  const { steps } = dialModel(axis);
  const best = Math.max(...steps.map((s) => s.factor));
  const factor = steps.find((s) => s.value === value)?.factor
    ?? (axis === 'tilt' ? tiltFactor(value) : orientationFactor(value));
  return Math.round((factor / best) * 100);
}
