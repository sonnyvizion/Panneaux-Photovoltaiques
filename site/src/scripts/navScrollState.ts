export function isNavOverHero(entry: IntersectionObserverEntry): boolean {
  return entry.isIntersecting;
}

export type ScrollDirection = 'up' | 'down';

/**
 * Sens de défilement entre deux positions.
 *
 * Un seuil évite de basculer sur le bruit (rebond élastique iOS, molette de
 * précision) : sous ce delta, on conserve le sens précédent.
 */
export function getScrollDirection(
  previousY: number,
  currentY: number,
  previous: ScrollDirection,
  threshold = 4,
): ScrollDirection {
  const delta = currentY - previousY;
  if (Math.abs(delta) < threshold) return previous;
  return delta > 0 ? 'down' : 'up';
}

/**
 * La nav se replie uniquement quand on descend, une fois le haut de page
 * quitté. Elle reste visible en haut de page et à chaque remontée.
 *
 * `menuOpen` la fige : une barre qui se replie en emportant un méga-menu
 * ouvert se lit comme un bug, pas comme une économie de place.
 */
export function shouldHideNav(
  direction: ScrollDirection,
  currentY: number,
  menuOpen = false,
  revealOffset = 120,
): boolean {
  if (menuOpen) return false;
  if (currentY <= revealOffset) return false;
  return direction === 'down';
}
