export function isNavOverHero(entry: IntersectionObserverEntry): boolean {
  return entry.isIntersecting;
}
