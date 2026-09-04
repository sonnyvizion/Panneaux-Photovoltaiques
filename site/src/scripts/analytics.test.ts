import { afterEach, describe, expect, it, vi } from 'vitest';
import { track } from './analytics';

/* Le module parle à `window.plausible`, posé par le script tiers. Les tests
   fabriquent cette fenêtre plutôt que d'en simuler une : c'est le seul contrat
   qui compte, et il tient en une fonction. */
type Fenetre = { plausible?: (event: string, options?: { props?: Record<string, string> }) => void };

const fenetre = (): Fenetre => ({});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('track', () => {
  it('reste SILENCIEUX quand la mesure n’est pas configurée', () => {
    /* Le cas de la démo, des tests, et de tout développement local : le script
       n'est pas chargé, `window.plausible` n'existe pas. Rien ne doit lever. */
    expect(() => track('simulator_started', undefined, fenetre())).not.toThrow();
  });

  it('transmet le nom de l’événement', () => {
    const spy = vi.fn();
    track('simulator_completed', undefined, { plausible: spy });

    expect(spy).toHaveBeenCalledWith('simulator_completed', undefined);
  });

  it('transmet les propriétés quand il y en a', () => {
    const spy = vi.fn();
    track('simulator_step', { etape: '3' }, { plausible: spy });

    expect(spy).toHaveBeenCalledWith('simulator_step', { props: { etape: '3' } });
  });

  it('n’envoie PAS de propriétés vides plutôt qu’un objet vide', () => {
    const spy = vi.fn();
    track('region_selected', {}, { plausible: spy });

    expect(spy).toHaveBeenCalledWith('region_selected', undefined);
  });

  it('avale l’erreur du script tiers plutôt que de casser la page', () => {
    /* Un bloqueur de publicité peut remplacer `plausible` par autre chose, ou
       le script peut échouer à mi-chemin. Une mesure ne doit JAMAIS emporter la
       fonctionnalité qu'elle observe : le simulateur passe avant le compteur. */
    const boom = vi.fn(() => {
      throw new Error('bloqué');
    });

    expect(() => track('quote_form_submitted', undefined, { plausible: boom })).not.toThrow();
    expect(boom).toHaveBeenCalled();
  });

  it('convertit les valeurs non textuelles, que Plausible refuse', () => {
    const spy = vi.fn();
    track('simulator_step', { etape: 3 as unknown as string }, { plausible: spy });

    expect(spy).toHaveBeenCalledWith('simulator_step', { props: { etape: '3' } });
  });
});
