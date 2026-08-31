/**
 * Formateurs de nombres partagés par les modules chiffrés du site.
 *
 * Extraits de `powerEstimate.ts` le jour où un second module (le Rénoprêt de la
 * page Aides & primes Wallonie) a eu besoin des mêmes euros. Les dupliquer
 * aurait suffi à faire diverger deux affichages qui doivent se ressembler : un
 * `maximumFractionDigits` différent d'un module à l'autre se voit tout de suite
 * quand les deux se suivent dans la page.
 *
 * `powerEstimate.ts` les RÉ-EXPORTE pour ne pas casser son API publique — les
 * imports existants et leurs tests continuent de pointer là où ils pointaient.
 *
 * Locale `fr-BE` : séparateur de milliers en espace insécable étroite (U+202F),
 * virgule décimale. C'est aussi ce que le rendu serveur écrit dans le HTML, d'où
 * l'importance de ne jamais reformater ailleurs à la main.
 *
 * Les formateurs sont créés UNE FOIS au chargement du module. En instancier un
 * par image d'animation coûterait plus cher que tout le reste des modules
 * interactifs réunis — `Intl.NumberFormat` est cher à construire, pas à appeler.
 */

const euroFormat = new Intl.NumberFormat('fr-BE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const numberFormat = new Intl.NumberFormat('fr-BE', { maximumFractionDigits: 0 });

/** Un montant en euros, sans décimale : « 15 000 € ». */
export function formatEuro(value: number): string {
  return euroFormat.format(value);
}

/** Un nombre nu, sans unité : « 5 400 ». */
export function formatNumber(value: number): string {
  return numberFormat.format(value);
}
