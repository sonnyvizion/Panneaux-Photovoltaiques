import { regionFromPostalCode } from './regionLinks';

/**
 * Le parcours du simulateur — logique pure, sans DOM.
 *
 * ⚠️ Ce fichier ne calcule RIEN : il dit seulement quelle étape est affichée,
 * si elle est répondue, et ce que raconte le compteur. L'arithmétique reste
 * dans `simulator.ts`.
 *
 * ⚠️ L'ÉTAPE VIT DANS L'URL (`?etape=3`, `?etape=resultat`, `?etape=a2`). C'est
 * ce qui fait fonctionner le bouton retour du navigateur, et ce qui permet à un
 * pont contextualisé d'ouvrir le simulateur à la bonne question.
 */

export interface WizardStep {
  /** Ce que porte l'URL. */
  id: string;
  /** Le champ du formulaire dont dépend la validation de l'étape. */
  field: string;
  /** Le titre de la question. */
  label: string;
  /** L'étape ne s'affiche que sur un toit incliné. */
  tiltedOnly?: boolean;
  /**
   * Le champ porte TOUJOURS une valeur — un curseur a sa position de départ, une
   * case à cocher répond dans ses deux états. Double conséquence : l'étape ne
   * verrouille jamais « Suivant », et sa valeur ne prouve pas non plus que le
   * visiteur ait répondu quoi que ce soit.
   */
  alwaysAnswered?: true;
  /**
   * L'étape n'apparaît que si la région est encore inconnue.
   */
  regionOnly?: true;
  /**
   * Répondre à cette étape situe le projet sans le DÉCRIRE : le résultat reste
   * un exemple tant que le bâtiment lui-même n'a pas été renseigné.
   */
  contextOnly?: true;
}

/**
 * Les cinq questions du brief, dans l'ordre. L'ordre compte : le type de bien
 * vient en premier parce qu'il peut court-circuiter le parcours (professionnel),
 * et la consommation en dernier parce que c'est la plus coûteuse à répondre.
 */
export const QUESTION_STEPS: WizardStep[] = [
  /**
   * ⚠️ CONDITIONNELLE, et c'est tout son intérêt. La région pilote les aides, le
   * tarif d'injection et donc le temps de retour — l'écart entre Bruxelles et la
   * Wallonie va de « 4 à 8 ans » à « jamais ». Tant que cette question
   * n'existait pas, un visiteur arrivé d'une page de contenu sans code postal
   * recevait en silence un calcul wallon, le moins favorable des trois.
   *
   * Elle disparaît dès que la région est connue — code postal du hero, `?region=`
   * d'un méga-menu, ou choix mémorisé dans le header. Le brief veut que le code
   * postal soit « mémorisé, jamais redemandé » : ici il n'a jamais été donné,
   * on ne le redemande donc pas, on le demande.
   */
  { id: '0', field: 'cp', label: 'Localisation', regionOnly: true, contextOnly: true },
  { id: '1', field: 'property', label: 'Type de bien' },
  { id: '2', field: 'roof', label: 'Type de toit' },
  { id: '3', field: 'orientation', label: 'Orientation' },
  { id: '4', field: 'area', label: 'Surface', alwaysAnswered: true },
  { id: '5', field: 'consumptionMode', label: 'Consommation' },
];

export const REFINE_STEPS: WizardStep[] = [
  { id: 'a1', field: 'tilt', label: 'Inclinaison', tiltedOnly: true },
  { id: 'a2', field: 'shading', label: 'Ombrage' },
  { id: 'a3', field: 'heatPump', label: 'Pompe à chaleur' },
  { id: 'a4', field: 'car', label: 'Voiture électrique' },
  { id: 'a5', field: 'battery', label: 'Batterie', alwaysAnswered: true },
];

export const RESULT_STEP = 'resultat';

/** Toutes les étapes d'un parcours, dans l'ordre du rail. */
export type WizardKind = 'questions' | 'affinage';

/**
 * L'affinage saute l'inclinaison sur un toit plat : la question y ferait
 * doublon avec la réponse de l'étape 2. Le compteur suit donc — « sur 4 », pas
 * « sur 5 » — sinon il annoncerait une étape qui n'arrivera jamais.
 */
export function visibleRefineSteps(roofTilted: boolean): WizardStep[] {
  return REFINE_STEPS.filter((step) => roofTilted || !step.tiltedOnly);
}

/**
 * Les questions réellement posées. Cinq quand la région est connue, six sinon —
 * et le compteur suit, sinon il annoncerait une étape qui n'arrivera pas.
 */
export function visibleQuestionSteps(regionKnown: boolean): WizardStep[] {
  return QUESTION_STEPS.filter((step) => !regionKnown || !step.regionOnly);
}

const PARAM = 'etape';

/**
 * L'étape demandée par l'URL, ou `null` quand elle n'en demande aucune de
 * valide.
 *
 * ⚠️ `null` et non « la première étape » : depuis que la question du code postal
 * est conditionnelle, la première étape n'est plus une constante — c'est `'0'`
 * pour qui arrive sans région, `'1'` pour les autres. Seul l'appelant sait
 * laquelle, cette fonction ne peut donc pas trancher à sa place.
 */
export function stepFromSearch(search: string): string | null {
  const value = new URLSearchParams(search).get(PARAM);
  if (!value) return null;
  if (value === RESULT_STEP) return RESULT_STEP;
  const known = [...QUESTION_STEPS, ...REFINE_STEPS].some((step) => step.id === value);
  return known ? value : null;
}

/**
 * L'URL d'une étape.
 *
 * ⚠️ On repart de la recherche courante au lieu d'en fabriquer une neuve : `cp`
 * et `region` viennent du hero et doivent survivre au parcours (« le code postal
 * est mémorisé, jamais redemandé »).
 */
export function stepToSearch(step: string, search: string): string {
  const params = new URLSearchParams(search);
  params.set(PARAM, step);
  return `?${params.toString()}`;
}

/** L'étape appartient-elle à l'affinage ? */
export function isRefineStep(step: string): boolean {
  return REFINE_STEPS.some((s) => s.id === step);
}

/**
 * L'étape est-elle répondue ? C'est ce qui déverrouille « Suivant ».
 *
 * ⚠️ Rien n'étant pré-coché, la question a un sens : le visiteur choisit
 * vraiment, et la barre de progression dit la vérité.
 *
 * `get` prend la forme d'un `FormData.get` pour se brancher directement dessus,
 * tout en restant testable sans DOM.
 */
/**
 * ⚠️ UN CHAMP VIDE N'EST PAS UNE RÉPONSE. `FormData.get()` rend `''` — pas
 * `null` — pour un champ présent mais vide, et le curseur d'orientation en pose
 * justement un tant que le visiteur ne l'a pas manipulé. Tester `!== null`
 * déverrouillait donc « Suivant » sur une question sans réponse.
 */
const filled = (value: string | null) => value !== null && value.trim() !== '';

export function isStepAnswered(
  stepId: string,
  get: (name: string) => string | null,
): boolean {
  const step = [...QUESTION_STEPS, ...REFINE_STEPS].find((s) => s.id === stepId);
  if (!step) return false;
  if (step.alwaysAnswered) return true;

  /* Un code postal n'est répondu que s'il désigne une région belge : « 0000 »
     laisserait passer quelqu'un vers un calcul sans région. */
  if (step.regionOnly) return regionFromPostalCode(get(step.field) ?? '') !== null;

  /* La consommation est la seule question à deux étages : le mode, puis — pour
     la facture seulement — la tranche. Le mode « kWh » s'appuie sur un curseur,
     et « je ne sais pas » est en soi une réponse. */
  if (step.id === '5') {
    const mode = get('consumptionMode');
    if (!filled(mode)) return false;
    return mode !== 'facture' || filled(get('bill'));
  }

  return filled(get(step.field));
}

/**
 * Le visiteur a-t-il répondu à quoi que ce soit ?
 *
 * ⚠️ Les étapes `alwaysAnswered` sont EXCLUES, et c'est tout l'intérêt de la
 * question : le curseur de surface porte une valeur dès le premier octet de
 * HTML. En le comptant, on croyait toujours avoir des réponses — et le panneau
 * de résultat retirait son étiquette « exemple » alors que personne n'avait
 * touché à rien.
 */
export function hasAnyAnswer(get: (name: string) => string | null): boolean {
  return QUESTION_STEPS.filter((s) => !s.alwaysAnswered && !s.contextOnly).some((s) =>
    filled(get(s.field)),
  );
}

/** « Question 3 sur 5 » · « Affinage 2 sur 4 ». */
export function progressLabel(index: number, total: number, kind: WizardKind): string {
  const noun = kind === 'affinage' ? 'Affinage' : 'Question';
  return `${noun} ${index + 1} sur ${total}`;
}
