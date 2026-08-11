/**
 * Décompte animé des chiffres clés.
 *
 * Les valeurs finales restent écrites dans le HTML : le script ne fait que
 * rejouer la montée. Sans JavaScript, ou avant son exécution, le chiffre juste
 * est déjà là — ce que demande la règle d'or #1 (le texte vit dans le HTML).
 */

/** Décélération : rapide au départ, la fin se pose. */
export function easeOutCubic(t: number): number {
  const clamped = Math.min(Math.max(t, 0), 1);
  return 1 - Math.pow(1 - clamped, 3);
}

/** Valeur intermédiaire entre 0 et la cible, à l'avancement donné. */
export function getCountValue(to: number, progress: number): number {
  return to * easeOutCubic(progress);
}

/**
 * Mise en forme sans séparateur de milliers : la maquette écrit « 2400+ » et
 * « 4.8/5 », pas « 2 400 » ni « 4,8 ».
 */
export function formatCount(value: number, decimals: number): string {
  return value.toFixed(decimals);
}
