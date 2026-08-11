import { describe, expect, it } from 'vitest';
import {
  getNextSegment,
  getProgressIndex,
  getSegmentTarget,
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
