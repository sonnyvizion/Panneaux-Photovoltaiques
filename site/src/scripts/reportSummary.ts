import {
  BILL_BANDS,
  SHADINGS,
  YES_NO_SOON,
  propertyType,
  resolveConsumption,
  roofType,
  type SimulatorInputs,
} from './simulator';
import { ORIENTATIONS, TILTS } from './orientation';
import { regionLabel } from './savings';
import { formatNumber } from './format';

/**
 * Les réponses du visiteur, en clair.
 *
 * ⚠️ POURQUOI C'EST DANS LE RAPPORT : un document reçu par e-mail est lu hors
 * contexte, parfois des semaines plus tard, parfois par quelqu'un d'autre (le
 * conjoint, le propriétaire). Sans le rappel des réponses, ses chiffres ne se
 * rattachent à rien et deviennent invérifiables. C'est aussi ce qui permet au
 * lecteur de repérer une réponse fausse — « ah non, mon toit est plein sud ».
 *
 * ⚠️ AUCUN LIBELLÉ RECOPIÉ. Tout vient des tables qui pilotent déjà le
 * parcours (`PROPERTY_TYPES`, `ROOF_TYPES`, `ORIENTATIONS`, `TILTS`,
 * `SHADINGS`, `BILL_BANDS`). Recopier « Sud-Est / Sud-Ouest » ici garantirait
 * qu'un jour le simulateur et le rapport ne disent plus la même chose.
 *
 * ⚠️ Pur et testable : aucune fonction ici ne touche au DOM.
 */

export interface Answer {
  label: string;
  value: string;
}

/**
 * TOUS les libellés que le rapport peut avoir à afficher, dans l'ordre.
 *
 * ⚠️ Il existe pour que le document rende ses lignes AU BUILD et se contente
 * ensuite de les remplir ou de les masquer. Construire les lignes en JavaScript
 * aurait produit des nœuds sans l'attribut de portée d'Astro — donc sans style —
 * et aurait laissé la page vide sans JavaScript. On réécrit, on ne construit
 * pas : c'est la doctrine du projet.
 */
export const ANSWER_LABELS = [
  'Région',
  'Type de bien',
  'Toiture',
  'Orientation',
  'Surface disponible',
  'Consommation',
  'Pente du toit',
  'Ombrage',
  'Pompe à chaleur',
  'Voiture électrique',
  'Batterie envisagée',
] as const;

function labelOf(table: { value: string; label: string }[], value: string, fallback: string) {
  return table.find((entry) => entry.value === value)?.label ?? fallback;
}

/** La consommation, telle que le visiteur l'a exprimée. */
export function consumptionAnswer(inputs: SimulatorInputs): string {
  if (inputs.consumptionMode === 'facture') {
    return labelOf(BILL_BANDS, inputs.bill, 'Non précisée');
  }
  if (inputs.consumptionMode === 'kwh') {
    return `${formatNumber(inputs.consumption)} kWh par an`;
  }
  /* « Je ne sais pas » : on affiche la moyenne retenue, en le disant. Masquer
     l'hypothèse rendrait le budget du rapport inexplicable. */
  return `Estimée à ${formatNumber(Math.round(resolveConsumption(inputs)))} kWh par an`;
}

/**
 * Les réponses à rappeler dans le document.
 *
 * L'affinage n'apparaît QUE s'il a été traversé : lister « Pente : je ne sais
 * pas » à quelqu'un qui n'a jamais vu la question lui ferait croire qu'il a
 * répondu, et donnerait au document une précision qu'il n'a pas.
 */
export function answerSummary(inputs: SimulatorInputs): Answer[] {
  const answers: Answer[] = [
    { label: 'Région', value: regionLabel(inputs.region) },
    { label: 'Type de bien', value: propertyType(inputs.property).label },
    { label: 'Toiture', value: roofType(inputs.roof).label },
    { label: 'Orientation', value: labelOf(ORIENTATIONS, inputs.orientation, 'Non précisée') },
    { label: 'Surface disponible', value: `${inputs.area} m²` },
    { label: 'Consommation', value: consumptionAnswer(inputs) },
  ];

  if (!inputs.refine) return answers;

  /* La pente ne se pose pas sur un toit plat — le parcours masque la question,
     le rapport ne doit pas la ressusciter. */
  if (roofType(inputs.roof).tilted) {
    answers.push({ label: 'Pente du toit', value: labelOf(TILTS, inputs.refine.tilt, 'Inconnue') });
  }

  answers.push(
    { label: 'Ombrage', value: labelOf(SHADINGS, inputs.refine.shading, 'Aucun') },
    { label: 'Pompe à chaleur', value: labelOf(YES_NO_SOON, inputs.refine.heatPump, 'Non') },
    { label: 'Voiture électrique', value: labelOf(YES_NO_SOON, inputs.refine.car, 'Non') },
    { label: 'Batterie envisagée', value: inputs.refine.battery ? 'Oui' : 'Non' },
  );

  return answers;
}
