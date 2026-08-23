import { describe, expect, it } from 'vitest';
import { messageFor } from './leadForm';

describe('messageFor', () => {
  it('n’interpelle pas le propriétaire', () => {
    expect(messageFor('proprietaire')).toBeNull();
  });

  it('oriente la copropriété vers le dossier chiffré', () => {
    expect(messageFor('copropriete')).toBe('copropriete');
  });

  /* Le locataire ne peut pas engager les travaux : on le dit, et on lui laisse
     le rapport par e-mail plutôt qu'un rendez-vous qu'il ne pourra pas tenir. */
  it('prévient le locataire', () => {
    expect(messageFor('locataire')).toBe('locataire');
  });

  it('ne dit rien tant que rien n’est coché', () => {
    expect(messageFor('')).toBeNull();
  });
});
