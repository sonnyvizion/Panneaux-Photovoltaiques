import { describe, expect, it } from 'vitest';
import { isNavOverHero } from './navScrollState';

describe('isNavOverHero', () => {
  it('returns true when the hero section is intersecting the viewport', () => {
    const entry = { isIntersecting: true } as IntersectionObserverEntry;
    expect(isNavOverHero(entry)).toBe(true);
  });

  it('returns false when the hero section has scrolled out of view', () => {
    const entry = { isIntersecting: false } as IntersectionObserverEntry;
    expect(isNavOverHero(entry)).toBe(false);
  });
});
