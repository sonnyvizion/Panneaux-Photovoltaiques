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
/** Le peu de l'API Lenis dont les défileurs imbriqués ont besoin. */
interface SmoothScroll {
  targetScroll: number;
  scrollTo(target: number, options?: Record<string, unknown>): void;
  /**
   * Suspendre / reprendre — pour les surfaces qui couvrent l'écran.
   *
   * ⚠️ Un `body { overflow: hidden }` NE SUFFIT PAS à figer la page quand Lenis
   * tourne : il ne bloque que le défilement natif, alors que Lenis déplace la
   * page en JavaScript sur les événements de molette. Sans `stop()`, ouvrir un
   * dialogue laissait le trackpad faire défiler la page derrière lui.
   */
  stop(): void;
  start(): void;
}

/* Exposée aux défileurs imbriqués qui doivent rendre un geste à la page : leur
   laisser appeler `window.scrollBy` désynchroniserait Lenis, qui repartirait de
   sa propre position au geste suivant. Voir le rail des avis. */
let instance: SmoothScroll | null = null;

export function getSmoothScroll(): SmoothScroll | null {
  return instance;
}

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
  instance = lenis as unknown as SmoothScroll;

  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}
