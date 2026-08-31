import { SUMMER_WINTER_RATIO } from './powerEstimate';

/**
 * Les textes du graphique mensuel, écrits UNE seule fois.
 *
 * ⚠️ LE GRAPHIQUE EXISTE EN DOUBLE — à l'écran (`SimulatorResult.astro`) et dans
 * le rapport (`ReportDocument.astro`). Sa légende y était recopiée mot pour
 * mot : deux copies qu'aucun outil ne rapprochait, et qui finissaient
 * fatalement par diverger. Le code l'admettait lui-même, le rapport portant le
 * commentaire « Même correction qu'à l'écran ». Elles vivent ici, et les deux
 * composants les lisent.
 *
 * ⚠️ CE MODULE NE PORTE QUE DE LA PROSE. Les valeurs — le pic, la puissance de
 * référence — restent dans leur `<span>` du gabarit, que `simulatorWidget.ts` et
 * `reportDocument.ts` mettent à jour seuls. Une version antérieure exportait la
 * phrase entière, valeur comprise : les deux scripts devaient alors réécrire
 * tout le texte à chaque recalcul, pour ne changer qu'un nombre.
 */

/**
 * Le libellé du repère haut.
 *
 * ⚠️ CE CHIFFRE EST LE MEILLEUR MOIS, PAS L'ANNÉE. Rendu nu sous un titre « La
 * production dans l'année », rien ne le distinguait d'un total annuel et il se
 * lisait comme tel. Le mot manquant coûtait la crédibilité de tout le bloc.
 */
export const CHART_PEAK_LABEL = 'Pic mensuel estimé';

/**
 * Sur quel scénario les barres sont tracées.
 *
 * ⚠️ LE GRAPHIQUE NE PORTE PAS DE FOURCHETTE, LES TUILES SI. Les barres sont
 * calculées sur la valeur centrale : la somme des douze mois ne vaut donc ni la
 * borne basse ni la borne haute affichées juste en dessous. Sans ce nom, le
 * lecteur prend les barres pour la borne haute.
 */
export const CHART_BASIS_LEAD =
  'Profil mensuel basé sur une installation intermédiaire d’environ';

/**
 * L'écart entre l'été et l'hiver, et ce qu'il implique.
 *
 * ⚠️ AUCUN CHIFFRE EN DUR DANS LA PROSE : le rapport vient de
 * `SUMMER_WINTER_RATIO`, qui pilote déjà le calcul. Écrit à la main, il aurait
 * cessé d'être vrai à la première modification de la constante.
 *
 * ⚠️ ESPACE INSÉCABLE RÉEL, PAS `&nbsp;`. Astro échappe le texte interpolé :
 * l'entité s'afficherait telle quelle, à l'écran comme dans le PDF.
 */
export const chartSeasonNote = (): string =>
  `Un mois d’été produit environ ${SUMMER_WINTER_RATIO.toFixed(1).replace('.', ',')} fois ` +
  'plus qu’un mois d’hiver. En été, la production peut dépasser la ' +
  'consommation instantanée du bâtiment : le surplus est alors injecté sur ' +
  'le réseau. Plus vous autoconsommez votre production, plus l’installation ' +
  'est rentable.';
