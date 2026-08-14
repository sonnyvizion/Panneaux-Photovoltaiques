import { describe, expect, it } from 'vitest';
import { getScrollDirection, isNavOverHero, shouldHideNav } from './navScrollState';

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

describe('getScrollDirection', () => {
  it('reports down when the page moves forward past the threshold', () => {
    expect(getScrollDirection(100, 200, 'up')).toBe('down');
  });

  it('reports up when the page moves backward past the threshold', () => {
    expect(getScrollDirection(200, 100, 'down')).toBe('up');
  });

  it('keeps the previous direction below the threshold', () => {
    expect(getScrollDirection(100, 102, 'up')).toBe('up');
    expect(getScrollDirection(100, 98, 'down')).toBe('down');
  });
});

describe('shouldHideNav', () => {
  it('hides the nav while scrolling down past the reveal offset', () => {
    expect(shouldHideNav('down', 500)).toBe(true);
  });

  it('shows the nav as soon as the user scrolls back up', () => {
    expect(shouldHideNav('up', 500)).toBe(false);
  });

  it('never hides the nav near the top of the page', () => {
    expect(shouldHideNav('down', 0)).toBe(false);
    expect(shouldHideNav('down', 120)).toBe(false);
  });

  it('keeps the nav in place while a menu is open', () => {
    expect(shouldHideNav('down', 500, true)).toBe(false);
  });

  it('hides again once the menu is closed', () => {
    expect(shouldHideNav('down', 500, false)).toBe(true);
  });
});
