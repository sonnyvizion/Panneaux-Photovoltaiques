/**
 * Position d'un rail à défilement horizontal, ramenée à un nombre fixe de
 * segments d'indicateur.
 *
 * L'indicateur ne compte pas les cartes : il découpe la course en tiers. Le
 * même repère fonctionne donc quel que soit le nombre de cartes visibles —
 * trois par écran en desktop, une sur mobile — sans avoir à régénérer le
 * balisage à chaque changement de taille.
 */
export function getProgressIndex(
  scrollLeft: number,
  scrollWidth: number,
  clientWidth: number,
  segments: number,
): number {
  if (segments <= 1) return 0;

  const scrollable = scrollWidth - clientWidth;
  // Rien à faire défiler : tout tient à l'écran, le premier segment est actif.
  if (scrollable <= 0) return 0;

  const ratio = Math.min(Math.max(scrollLeft / scrollable, 0), 1);
  // `ratio` vaut exactement 1 en fin de course : sans ce min, on sortirait
  // du tableau des segments.
  return Math.min(Math.floor(ratio * segments), segments - 1);
}

/**
 * Carte à amener en tête quand on active le segment `index`.
 * Trois segments sur neuf cartes donnent les cartes 0, 3 et 6 — c'est-à-dire
 * le début de chaque lot en desktop, et le tiers de course sur mobile.
 */
/** Segment suivant, en boucle : le dernier ramène au premier. */
export function getNextSegment(current: number, segments: number): number {
  if (segments <= 0) return 0;
  return (current + 1) % segments;
}

export function getSegmentTarget(
  index: number,
  itemCount: number,
  segments: number,
): number {
  if (itemCount <= 0 || segments <= 0) return 0;
  const target = Math.round((index * itemCount) / segments);
  return Math.min(Math.max(target, 0), itemCount - 1);
}

/**
 * Le rail doit-il rendre le geste à la page ?
 *
 * Chrome attribue un geste entier au premier défileur qu'il accroche. Un
 * mouvement de trackpad légèrement oblique est happé par le rail, qui ne
 * défile pas verticalement : la composante verticale est jetée et la page se
 * fige. On ne reprend la main que sur les gestes obliques dominés par la
 * verticale — un geste vertical pur n'accroche rien et fonctionne déjà, un
 * geste franchement horizontal appartient au rail.
 */
export function shouldYieldToPage(deltaX: number, deltaY: number): boolean {
  if (deltaX === 0) return false;
  return Math.abs(deltaY) > Math.abs(deltaX);
}
