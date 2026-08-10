import { describe, expect, it } from 'vitest';
import { shouldEnableSmoothScroll } from './smoothScroll';

/** Simule matchMedia à partir de la liste des requêtes considérées vraies. */
const matcher = (active: string[]) => (query: string) => active.includes(query);

describe('shouldEnableSmoothScroll', () => {
  it('enables it on a desktop pointer', () => {
    expect(
      shouldEnableSmoothScroll(matcher(['(pointer: fine)', '(min-width: 1024px)'])),
    ).toBe(true);
  });

  it('stays off below the desktop breakpoint', () => {
    expect(shouldEnableSmoothScroll(matcher(['(pointer: fine)']))).toBe(false);
  });

  it('stays off on a touch pointer, even on a wide screen', () => {
    expect(shouldEnableSmoothScroll(matcher(['(min-width: 1024px)']))).toBe(false);
  });

  it('stays off when the user asked for reduced motion', () => {
    expect(
      shouldEnableSmoothScroll(
        matcher([
          '(prefers-reduced-motion: reduce)',
          '(pointer: fine)',
          '(min-width: 1024px)',
        ]),
      ),
    ).toBe(false);
  });
});
