/**
 * Défilement fluide (Lenis) — desktop uniquement.
 *
 * Garde-fous, dans l'ordre de la règle d'or #1 du projet (perf & SEO d'abord) :
 * - import dynamique : le mobile ne télécharge jamais la bibliothèque ;
 * - jamais si `prefers-reduced-motion` est actif — détourner le défilement est
 *   précisément ce que ce réglage demande d'éviter ;
 * - jamais au doigt : sur tactile le défilement natif est meilleur et Lenis
 *   dégraderait l'INP sans rien apporter.
 *
 * Lenis pilote le défilement réel de la fenêtre : `window.scrollY`, les
 * IntersectionObserver et l'ancrage du header continuent de fonctionner.
 */
export function shouldEnableSmoothScroll(
  matches: (query: string) => boolean,
): boolean {
  if (matches('(prefers-reduced-motion: reduce)')) return false;
  if (!matches('(pointer: fine)')) return false;
  return matches('(min-width: 1024px)');
}

export async function initSmoothScroll(): Promise<void> {
  const matches = (query: string) => window.matchMedia(query).matches;
  if (!shouldEnableSmoothScroll(matches)) return;

  // Les règles CSS de Lenis vivent dans global.css : un `import` dynamique de
  // feuille de style n'émet aucun asset au build et la page resterait cassée.
  const { default: Lenis } = await import('lenis');

  const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}
