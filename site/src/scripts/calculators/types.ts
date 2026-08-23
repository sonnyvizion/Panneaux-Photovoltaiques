/**
 * Contrat des modèles de la famille A du registre — « calculateur à slider(s) ».
 *
 * Six pages du site partagent le même objet : un curseur, parfois un groupe de
 * boutons, et une à trois valeurs qui se recalculent en direct. Seule la formule
 * change. Ce fichier est ce qui permet de coder l'objet UNE fois
 * (`SliderCalculator.astro` + `sliderCalculator.ts`) et de n'écrire ensuite que
 * la formule, dans un module pur et testable.
 *
 * ⚠️ Un modèle ne touche JAMAIS au DOM et ne connaît pas le composant. C'est ce
 * qui permet de le tester sans navigateur — le projet n'a pas de jsdom, et tous
 * les tests actuels sont des tests de fonctions pures. Un modèle qui lirait un
 * nœud sortirait de cette garantie.
 *
 * ⚠️ Le découpage `values` / `format` n'est pas décoratif : la poursuite
 * (`chase`) interpole des NOMBRES image par image, puis les met en forme. Un
 * modèle qui ne renverrait que des chaînes rendrait l'animation impossible.
 */

/** Le calcul d'une page, réduit à ce dont le composant a besoin. */
export interface CalculatorModel {
  /** Ramène une valeur de curseur dans sa plage. Le DOM n'est pas fiable. */
  clamp(slider: number): number;

  /**
   * Les nombres dérivés, dans l'ordre d'affichage des tuiles.
   *
   * Ce sont EUX que la poursuite interpole : ils doivent donc être des
   * grandeurs continues, pas des codes ni des index.
   */
  values(slider: number, option: number): number[];

  /**
   * Met en forme un jeu de valeurs — y compris à mi-course d'animation, donc
   * potentiellement non entières. À chaque modèle d'arrondir ce qui doit l'être :
   * « 14,3 panneaux », même fugace, serait faux.
   */
  format(values: number[], option: number): string[];

  /** Le libellé de l'entrée, affiché en tête de panneau : « 6 kWc », « 15 000 € ». */
  inputLabel(slider: number): string;

  /** Légende sous la jauge, quand la variante en a une. */
  caption?(option: number): string;

  /** Remplissage de la piste du curseur, en pourcentage. */
  sliderRatio(slider: number): number;

  /**
   * Remplissage de la jauge, en pourcentage.
   *
   * Distincte du curseur, et c'est délibéré : la jauge situe un RÉSULTAT, le
   * curseur suit le pouce. Les confondre ferait traîner le remplissage de la
   * piste derrière le doigt (voir l'en-tête de `sliderCalculator.ts`).
   *
   * Reçoit AUSSI les entrées, et pas seulement les valeurs dérivées : le
   * Rénoprêt cale sa jauge sur une échelle absolue en euros par mois, qu'on ne
   * peut pas retrouver depuis la seule mensualité. Sans ce paramètre, le modèle
   * devait retenir la dernière position du curseur — un état caché dans un
   * objet qui doit rester pur.
   */
  gaugeRatio(values: number[], slider: number, option: number): number;

  /** La phrase annoncée au lecteur d'écran une fois le geste terminé. */
  announce(slider: number, option: number): string;
}

/**
 * L'état rendu au build, que le composant écrit dans le HTML.
 *
 * ⚠️ Le module doit être complet et lisible SANS JavaScript (règle d'or #1) :
 * le script ne construit rien, il réécrit des nœuds de texte qui existent déjà.
 */
export interface CalculatorState {
  inputLabel: string;
  outputs: string[];
  caption?: string;
  sliderRatio: number;
  gaugeRatio: number;
}

/** Calcule l'état initial d'un modèle — utilisé au build par le composant. */
export function initialState(
  model: CalculatorModel,
  slider: number,
  option: number,
): CalculatorState {
  const values = model.values(slider, option);
  return {
    inputLabel: model.inputLabel(slider),
    outputs: model.format(values, option),
    caption: model.caption?.(option),
    sliderRatio: model.sliderRatio(slider),
    gaugeRatio: model.gaugeRatio(values, slider, option),
  };
}

/**
 * Situe une valeur entre deux bornes, en pourcentage.
 *
 * Pour les jauges qui légendent une fourchette annoncée. Le résultat est BORNÉ :
 * la jauge reçoit des valeurs interpolées, qui sortent momentanément de la
 * fourchette quand une poursuite dépasse — sans cela le remplissage déborderait
 * de sa barre. Renvoie 0 plutôt que NaN sur une plage dégénérée.
 */
export function boundedRatio(value: number, low: number, high: number): number {
  if (high === low) return 0;
  return Math.min(Math.max((value - low) / (high - low), 0), 1) * 100;
}
