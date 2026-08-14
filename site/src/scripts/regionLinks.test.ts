import { describe, expect, it } from 'vitest';
import { isSimulatorLink, withRegion } from './regionLinks';

describe('withRegion', () => {
  it('adds the region to a bare simulator link', () => {
    expect(withRegion('/simulateur', 'wallonie')).toBe('/simulateur?region=wallonie');
  });

  it('replaces a region already present', () => {
    expect(withRegion('/simulateur?region=flandre', 'bruxelles')).toBe(
      '/simulateur?region=bruxelles',
    );
  });

  it('preserves the other query parameters', () => {
    expect(withRegion('/simulateur?orientation=sud', 'wallonie')).toBe(
      '/simulateur?orientation=sud&region=wallonie',
    );
  });

  it('preserves the hash', () => {
    expect(withRegion('/simulateur#resultats', 'wallonie')).toBe(
      '/simulateur?region=wallonie#resultats',
    );
  });

  it('drops the region when none is selected', () => {
    expect(withRegion('/simulateur?region=flandre', null)).toBe('/simulateur');
  });

  it('leaves non-simulator links untouched', () => {
    expect(withRegion('/aides-primes/wallonie', 'bruxelles')).toBe('/aides-primes/wallonie');
  });

  it('leaves anchors and external links untouched', () => {
    expect(withRegion('#faq', 'wallonie')).toBe('#faq');
    expect(withRegion('tel:+3221234567', 'wallonie')).toBe('tel:+3221234567');
    expect(withRegion('https://example.com/simulateur', 'wallonie')).toBe(
      'https://example.com/simulateur',
    );
  });

  it('rejects a region outside the three Belgian ones', () => {
    // Une valeur inventée (paramètre d'URL bricolé, entrée corrompue) ne doit
    // pas se propager silencieusement dans tous les liens de la page.
    expect(withRegion('/simulateur', 'picardie')).toBe('/simulateur');
  });

  it('matches sub-paths of the simulator but not lookalike siblings', () => {
    expect(withRegion('/simulateur/resultats', 'wallonie')).toBe(
      '/simulateur/resultats?region=wallonie',
    );
    expect(withRegion('/simulateur-avis', 'wallonie')).toBe('/simulateur-avis');
  });
});

describe('isSimulatorLink', () => {
  it('recognises the simulator and its sub-paths', () => {
    expect(isSimulatorLink('/simulateur')).toBe(true);
    expect(isSimulatorLink('/simulateur?region=wallonie')).toBe(true);
    expect(isSimulatorLink('/simulateur/resultats')).toBe(true);
  });

  it('rejects everything else', () => {
    expect(isSimulatorLink('/simulateur-avis')).toBe(false);
    expect(isSimulatorLink('/comprendre')).toBe(false);
    expect(isSimulatorLink('https://example.com/simulateur')).toBe(false);
    expect(isSimulatorLink('#faq')).toBe(false);
  });
});
