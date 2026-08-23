import { POWER_DEFAULT, POWER_MAX, POWER_MIN, estimate } from './powerEstimate';

/**
 * CO₂ évité par une installation photovoltaïque résidentielle belge.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ POURQUOI CE MODULE EXISTE : deux documents du projet donnaient deux
 * fourchettes différentes pour la même grandeur.
 *
 *  — `simulateur.md` : « 0,5 à 1,0 t/an », et son tableau de résultats affiche
 *    « ~600–900 kg/an » ;
 *  — la page 4.10 « Impact écologique » : « 0,5 à 1,5 tonne/an », en affirmant
 *    reprendre la correction validée dans `simulateur.md` — ce qui est faux
 *    pour la borne haute.
 *
 * Les deux sont justes, mais pas sur le même périmètre : 0,5–1,0 t décrit
 * l'installation TYPIQUE, 0,5–1,5 t décrit TOUTE la gamme résidentielle. Écrits
 * l'un et l'autre « installation résidentielle standard », ils se contredisaient.
 *
 * La fourchette n'est donc plus recopiée nulle part : elle est DÉRIVÉE du modèle
 * de production déjà testé (`powerEstimate`) et du facteur d'émission du réseau.
 * Le jour où le simulateur sera codé, il consommera ces mêmes fonctions — les
 * deux chiffres ne pourront plus diverger.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ⚠️ CONSTANTE À VALIDER (CLAUDE.md § « À compléter »). `simulateur.md` impose
 * de citer la source et l'année dans le bloc « Hypothèses de calcul » :
 * « Facteur d'émission CO₂ du réseau belge : ~170 g/kWh (source : Elia, [année]) ».
 *
 * ⚠️ Ne JAMAIS surgonfler ce chiffre. `simulateur.md` en fait une consigne
 * explicite : un visiteur qui se fait corriger par un ami informé perd confiance
 * dans toutes les autres valeurs du site. Le réseau belge est peu carboné, et la
 * page le dit.
 */

/**
 * Facteur d'émission moyen du réseau électrique belge, en grammes de CO₂ par
 * kWh. ⚠️ À réactualiser sur les données publiques d'Elia, mises à jour
 * annuellement.
 */
export const GRID_CO2_G_PER_KWH = 170;

/** Le CO₂ évité par an, en kilogrammes, pour une puissance donnée. */
export function avoidedCo2Kg(kwc: number): number {
  return (estimate(kwc).production * GRID_CO2_G_PER_KWH) / 1000;
}

/**
 * Met en forme une masse de CO₂ selon la règle de `simulateur.md` : en kg en
 * dessous d'une tonne, en tonnes au-delà.
 *
 * ⚠️ « 0,65 tonne » est explicitement proscrit — on écrit « 650 kg ». Une masse
 * en dessous de la tonne s'écrit en kg, sinon le lecteur doit convertir de tête
 * pour se représenter la quantité.
 */
export function formatCo2(kg: number): string {
  if (kg < 1000) {
    /* Arrondi à la dizaine : la précision réelle du facteur d'émission ne
       justifie pas le kilo près. */
    return `${Math.round(kg / 10) * 10} kg`;
  }
  return `${tonneFormat.format(kg / 1000)} t`;
}

const tonneFormat = new Intl.NumberFormat('fr-BE', { maximumFractionDigits: 1 });

/**
 * La fourchette sur toute la gamme résidentielle, telle qu'elle s'affiche.
 *
 * Bornée par `POWER_MIN` et `POWER_MAX` — les mêmes bornes que le curseur de la
 * page prix, donc la même définition de « résidentiel » partout sur le site.
 */
export function residentialRange(): string {
  return `${tonneFormat.format(avoidedCo2Kg(POWER_MIN) / 1000)} à ${tonneFormat.format(
    avoidedCo2Kg(POWER_MAX) / 1000,
  )} tonne`;
}

/** Le cas standard, celui que le reste du site prend pour référence. */
export function standardCase(): string {
  return formatCo2(avoidedCo2Kg(POWER_DEFAULT));
}
