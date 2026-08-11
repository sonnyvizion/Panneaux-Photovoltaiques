import { describe, expect, it } from 'vitest';
import { easeOutCubic, formatCount, getCountValue } from './countUp';

describe('easeOutCubic', () => {
  it('starts at zero and ends at one', () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
  });

  it('decelerates: more than half the distance is covered at mid-course', () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });

  it('clamps values outside the range', () => {
    expect(easeOutCubic(-1)).toBe(0);
    expect(easeOutCubic(2)).toBe(1);
  });
});

describe('getCountValue', () => {
  it('starts at zero', () => {
    expect(getCountValue(2400, 0)).toBe(0);
  });

  it('reaches the target exactly at the end', () => {
    expect(getCountValue(2400, 1)).toBe(2400);
    expect(getCountValue(4.8, 1)).toBe(4.8);
  });
});

describe('formatCount', () => {
  it('renders whole figures without a separator', () => {
    expect(formatCount(2400, 0)).toBe('2400');
    expect(formatCount(89, 0)).toBe('89');
  });

  it('keeps one decimal for the rating', () => {
    expect(formatCount(4.8, 1)).toBe('4.8');
    expect(formatCount(4, 1)).toBe('4.0');
  });

  it('rounds intermediate values', () => {
    expect(formatCount(1234.7, 0)).toBe('1235');
  });
});
