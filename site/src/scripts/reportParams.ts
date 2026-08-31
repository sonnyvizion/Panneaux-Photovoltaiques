import {
  AREA_DEFAULT,
  CONSUMPTION_DEFAULT,
  REFINE_DEFAULT,
  type RefineInputs,
  type SimulatorInputs,
} from './simulator';
import { REGION_DEFAULT, type Region } from './savings';
import { isRegion } from './regionLinks';

/**
 * Le transport des réponses du simulateur vers le rapport.
 *
 * ⚠️ POURQUOI CE MODULE EXISTE : `/rapport` ne savait RIEN. Le compte rendu y
 * envoyait le visiteur par un lien nu, et la page affichait un formulaire
 * promettant « votre estimation par e-mail » sans avoir la moindre idée de
 * l'estimation en question. Le document n'était donc pas fabricable.
 *
 * ⚠️ L'URL, PAS LE STOCKAGE. Trois raisons, dans cet ordre :
 *  — le rapport doit pouvoir être fabriqué par un AUTRE agent que le navigateur
 *    du visiteur (un rendu serveur qui ouvre la page pour l'imprimer) : il n'aura
 *    ni `sessionStorage` ni cookie, seulement une adresse ;
 *  — c'est déjà la convention du projet (`?etape=`, `?region=`) ;
 *  — une estimation partagée par copier-coller reste lisible.
 *
 * ⚠️ CLÉS EN FRANÇAIS, comme `?etape=`. L'URL est visible par le visiteur.
 *
 * ⚠️ Pur et testable : aucune fonction ici ne touche au DOM ni à `window`.
 */

/* Les noms de paramètres, réunis ici pour qu'écriture et lecture ne puissent
   pas diverger — le piège classique de ce genre de module. */
const KEYS = {
  region: 'region',
  property: 'bien',
  roof: 'toit',
  orientation: 'orientation',
  area: 'surface',
  consumptionMode: 'conso-mode',
  bill: 'facture',
  consumption: 'conso',
  tilt: 'pente',
  shading: 'ombrage',
  heatPump: 'pac',
  car: 'voiture',
  battery: 'batterie',
} as const;

/**
 * Les réponses, en paramètres d'URL.
 *
 * ⚠️ L'affinage n'est écrit QUE s'il a été traversé. Un rapport qui porterait
 * des réponses d'affinage jamais données afficherait une fourchette resserrée
 * que le visiteur n'a pas méritée — et le document prétendrait à une précision
 * qu'il n'a pas.
 */
export function toReportSearch(inputs: SimulatorInputs): string {
  const params = new URLSearchParams();
  params.set(KEYS.region, inputs.region);
  params.set(KEYS.property, inputs.property);
  params.set(KEYS.roof, inputs.roof);
  params.set(KEYS.orientation, inputs.orientation);
  params.set(KEYS.area, String(inputs.area));
  params.set(KEYS.consumptionMode, inputs.consumptionMode);
  params.set(KEYS.bill, inputs.bill);
  params.set(KEYS.consumption, String(inputs.consumption));

  if (inputs.refine) {
    params.set(KEYS.tilt, inputs.refine.tilt);
    params.set(KEYS.shading, inputs.refine.shading);
    params.set(KEYS.heatPump, inputs.refine.heatPump);
    params.set(KEYS.car, inputs.refine.car);
    /* Présence = vrai. Un `batterie=false` dans l'URL se lirait comme une
       réponse, alors que c'est le défaut. */
    if (inputs.refine.battery) params.set(KEYS.battery, '1');
  }

  return params.toString();
}

/** Le lien complet vers une page, réponses comprises. */
export function reportHref(path: string, inputs: SimulatorInputs): string {
  return `${path}?${toReportSearch(inputs)}`;
}

/**
 * Les réponses, relues depuis une URL.
 *
 * ⚠️ TOUT PARAMÈTRE ABSENT OU ABERRANT RETOMBE SUR LE DÉFAUT. Cette fonction
 * lit une chaîne que n'importe qui peut écrire à la main : elle ne doit jamais
 * produire un objet que `simulate()` ne saurait pas traiter. Le tri fin des
 * valeurs appartient déjà aux tables de `simulator.ts` (`propertyType()`,
 * `roofType()`, `shadingFactor()`… retombent toutes sur leur premier élément),
 * on ne le refait donc pas ici.
 */
export function fromReportSearch(search: string): SimulatorInputs {
  const params = new URLSearchParams(search);
  const str = (key: string, fallback: string) => params.get(key)?.trim() || fallback;
  const num = (key: string, fallback: number) => {
    const value = Number(params.get(key));
    return Number.isFinite(value) && value > 0 ? value : fallback;
  };

  const region = params.get(KEYS.region);

  /* L'affinage n'est reconstruit que si l'URL en porte au moins une trace :
     sinon le rapport resserrerait des fourchettes sans raison. */
  const refined = [KEYS.tilt, KEYS.shading, KEYS.heatPump, KEYS.car, KEYS.battery].some((k) =>
    params.has(k),
  );
  const refine: RefineInputs | undefined = refined
    ? {
        tilt: str(KEYS.tilt, REFINE_DEFAULT.tilt),
        shading: str(KEYS.shading, REFINE_DEFAULT.shading),
        heatPump: str(KEYS.heatPump, REFINE_DEFAULT.heatPump),
        car: str(KEYS.car, REFINE_DEFAULT.car),
        battery: params.get(KEYS.battery) === '1',
      }
    : undefined;

  return {
    region: (isRegion(region) ? region : REGION_DEFAULT) as Region,
    property: str(KEYS.property, 'maison'),
    roof: str(KEYS.roof, 'inclinee'),
    orientation: str(KEYS.orientation, 'sud'),
    area: num(KEYS.area, AREA_DEFAULT),
    consumptionMode: str(KEYS.consumptionMode, 'facture'),
    bill: str(KEYS.bill, '100-200'),
    consumption: num(KEYS.consumption, CONSUMPTION_DEFAULT),
    refine,
  };
}

/** `true` si l'URL porte réellement des réponses, et pas seulement des défauts. */
export function hasReportAnswers(search: string): boolean {
  const params = new URLSearchParams(search);
  return Object.values(KEYS).some((key) => params.has(key));
}
