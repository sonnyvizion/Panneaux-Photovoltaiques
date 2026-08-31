import { describe, expect, it } from 'vitest';
import { initialRegion } from './simulatorWidget';

/* Les fonctions pures du câblage. Le reste touche au DOM et n'est pas testé ici :
   le projet n'embarque pas jsdom. La logique d'étapes, elle, a été sortie dans
   `wizard.ts` précisément pour rester testable — voir `wizard.test.ts`. */

describe('initialRegion', () => {
  it('donne priorité au paramètre explicite sur le code postal', () => {
    expect(initialRegion('?region=flandre&cp=1000', null)).toBe('flandre');
  });

  it('déduit la région du code postal du hero', () => {
    expect(initialRegion('?cp=5000', null)).toBe('wallonie');
  });

  /* Le code postal du hero est une intention plus récente que le sélecteur
     mémorisé du header : il doit gagner. */
  it('préfère le code postal au choix mémorisé', () => {
    expect(initialRegion('?cp=2000', 'bruxelles')).toBe('flandre');
  });

  it('retombe sur le choix mémorisé, puis sur rien', () => {
    expect(initialRegion('', 'bruxelles')).toBe('bruxelles');
    expect(initialRegion('?cp=0000', 'bruxelles')).toBe('bruxelles');
    expect(initialRegion('', null)).toBeNull();
  });
});
