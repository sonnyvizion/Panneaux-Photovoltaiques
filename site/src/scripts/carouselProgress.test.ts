import { describe, expect, it } from 'vitest';
import {
  getNextSegment,
  getProgressIndex,
  getSegmentTarget,
  interpolate,
  shouldYieldToPage,
  stepPosition,
} from './carouselProgress';

describe('getNextSegment', () => {
  it('advances one segment at a time', () => {
    expect(getNextSegment(0, 3)).toBe(1);
    expect(getNextSegment(1, 3)).toBe(2);
  });

  it('loops back to the first segment after the last', () => {
    expect(getNextSegment(2, 3)).toBe(0);
  });

  it('stays at zero when there are no segments', () => {
    expect(getNextSegment(0, 0)).toBe(0);
  });
});

describe('getSegmentTarget', () => {
  it('maps three segments onto nine cards in groups of three', () => {
    expect(getSegmentTarget(0, 9, 3)).toBe(0);
    expect(getSegmentTarget(1, 9, 3)).toBe(3);
    expect(getSegmentTarget(2, 9, 3)).toBe(6);
  });

  it('never points past the last card', () => {
    expect(getSegmentTarget(2, 4, 3)).toBe(3);
    expect(getSegmentTarget(5, 4, 3)).toBe(3);
  });

  it('stays at zero when there is nothing to target', () => {
    expect(getSegmentTarget(1, 0, 3)).toBe(0);
    expect(getSegmentTarget(1, 9, 0)).toBe(0);
  });
});

describe('getProgressIndex', () => {
  it('marks the first segment at rest', () => {
    expect(getProgressIndex(0, 3000, 1000, 3)).toBe(0);
  });

  it('marks the last segment at the end of the run', () => {
    expect(getProgressIndex(2000, 3000, 1000, 3)).toBe(2);
  });

  it('marks the middle segment halfway', () => {
    expect(getProgressIndex(1000, 3000, 1000, 3)).toBe(1);
  });

  it('falls back to the first segment when nothing scrolls', () => {
    expect(getProgressIndex(0, 800, 1000, 3)).toBe(0);
  });

  it('never returns an index outside the segments', () => {
    expect(getProgressIndex(9999, 3000, 1000, 3)).toBe(2);
    expect(getProgressIndex(-50, 3000, 1000, 3)).toBe(0);
  });

  it('handles a single segment', () => {
    expect(getProgressIndex(500, 3000, 1000, 1)).toBe(0);
  });
});

describe('shouldYieldToPage', () => {
  it('laisse passer le geste vertical pur : il n\'accroche pas le rail', () => {
    expect(shouldYieldToPage(0, 120)).toBe(false);
    expect(shouldYieldToPage(0, -120)).toBe(false);
  });

  it('rend la main à la page sur un geste oblique dominé par la verticale', () => {
    expect(shouldYieldToPage(25, 120)).toBe(true);
    expect(shouldYieldToPage(-8, -90)).toBe(true);
  });

  it('laisse le geste franchement horizontal au rail', () => {
    expect(shouldYieldToPage(250, 0)).toBe(false);
    expect(shouldYieldToPage(120, 30)).toBe(false);
  });

  it('tranche en faveur du rail quand les deux axes sont à égalité', () => {
    expect(shouldYieldToPage(100, 100)).toBe(false);
  });
});

describe('stepPosition', () => {
  /* Un rail de 6 questions à 1 000 px : la course utile vaut 5 000 px, donc une
     question par millier de pixels. */
  it('rend le rang exact quand le rail est calé sur une question', () => {
    expect(stepPosition(0, 6000, 1000, 6)).toBe(0);
    expect(stepPosition(2000, 6000, 1000, 6)).toBe(2);
    expect(stepPosition(5000, 6000, 1000, 6)).toBe(5);
  });

  it('rend une position FRACTIONNAIRE en cours de geste', () => {
    expect(stepPosition(1500, 6000, 1000, 6)).toBe(1.5);
    expect(stepPosition(2250, 6000, 1000, 6)).toBe(2.25);
  });

  it('ne sort jamais de la course, même sur un rebond élastique', () => {
    expect(stepPosition(-300, 6000, 1000, 6)).toBe(0);
    expect(stepPosition(9999, 6000, 1000, 6)).toBe(5);
  });

  it('reste à zéro quand il n’y a rien à faire défiler', () => {
    expect(stepPosition(0, 800, 1000, 6)).toBe(0);
    expect(stepPosition(400, 1000, 1000, 1)).toBe(0);
  });
});

describe('interpolate', () => {
  it('rend la valeur du rang quand la position est entière', () => {
    expect(interpolate([100, 300, 200], 0)).toBe(100);
    expect(interpolate([100, 300, 200], 1)).toBe(300);
  });

  it('rend le point intermédiaire entre deux hauteurs', () => {
    expect(interpolate([100, 300, 200], 0.5)).toBe(200);
    expect(interpolate([100, 300, 200], 1.5)).toBe(250);
  });

  it('se cale sur les bords hors de la plage', () => {
    expect(interpolate([100, 300], -1)).toBe(100);
    expect(interpolate([100, 300], 5)).toBe(300);
  });

  it('supporte une liste vide ou unique sans casser le rail', () => {
    expect(interpolate([], 0.5)).toBe(0);
    expect(interpolate([250], 0.5)).toBe(250);
  });
});
