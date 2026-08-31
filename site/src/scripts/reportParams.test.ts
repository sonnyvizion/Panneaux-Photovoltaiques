import { describe, expect, it } from 'vitest';
import {
  fromReportSearch,
  hasReportAnswers,
  reportHref,
  toReportSearch,
} from './reportParams';
import { REFINE_DEFAULT, simulate, type SimulatorInputs } from './simulator';

const BASE: SimulatorInputs = {
  region: 'bruxelles',
  property: 'maison',
  roof: 'plate',
  orientation: 'est-ouest',
  area: 55,
  consumptionMode: 'kwh',
  bill: '200-350',
  consumption: 5200,
};

describe('le transport des réponses vers le rapport', () => {
  it('fait l’aller-retour sans rien perdre', () => {
    expect(fromReportSearch(toReportSearch(BASE))).toEqual({ ...BASE, refine: undefined });
  });

  it('fait l’aller-retour avec l’affinage', () => {
    const refined: SimulatorInputs = {
      ...BASE,
      refine: { tilt: 'forte', shading: 'partiel', heatPump: 'oui', car: 'projet', battery: true },
    };
    expect(fromReportSearch(toReportSearch(refined))).toEqual(refined);
  });

  /* ⚠️ L'INVARIANT QUI COMPTE VRAIMENT : le rapport doit porter les MÊMES
     chiffres que l'écran. S'il repartait d'entrées légèrement différentes, le
     visiteur recevrait un document qui contredit ce qu'il vient de lire — et
     c'est exactement le genre d'écart qu'on ne détecte jamais à l'œil. */
  it('produit la même estimation qu’à l’écran', () => {
    const relu = fromReportSearch(toReportSearch(BASE));
    expect(simulate(relu)).toEqual(simulate(BASE));
  });

  it('produit la même estimation qu’à l’écran, affinage compris', () => {
    const refined: SimulatorInputs = {
      ...BASE,
      refine: { ...REFINE_DEFAULT, heatPump: 'oui', battery: true },
    };
    const relu = fromReportSearch(toReportSearch(refined));
    expect(simulate(relu)).toEqual(simulate(refined));
  });

  it('n’écrit pas l’affinage quand il n’a pas été traversé', () => {
    const search = toReportSearch(BASE);
    expect(search).not.toContain('pente=');
    expect(search).not.toContain('batterie=');
    expect(fromReportSearch(search).refine).toBeUndefined();
  });

  it('n’écrit pas la batterie quand elle est à non', () => {
    /* Un `batterie=0` se lirait comme une réponse donnée ; c'est le défaut. */
    const search = toReportSearch({ ...BASE, refine: { ...REFINE_DEFAULT, battery: false } });
    expect(search).not.toContain('batterie');
    expect(fromReportSearch(search).refine?.battery).toBe(false);
  });

  it('utilise des clés en français, comme le reste des URLs du site', () => {
    const search = toReportSearch(BASE);
    expect(search).toContain('bien=maison');
    expect(search).toContain('toit=plate');
    expect(search).toContain('surface=55');
  });
});

describe('la relecture résiste à une URL écrite à la main', () => {
  it('retombe sur les défauts quand l’URL est vide', () => {
    const inputs = fromReportSearch('');
    expect(inputs.region).toBe('wallonie');
    expect(inputs.property).toBe('maison');
    expect(inputs.refine).toBeUndefined();
    /* Le vrai test : ça doit rester calculable. */
    expect(() => simulate(inputs)).not.toThrow();
  });

  it('ignore une région inconnue plutôt que de la propager', () => {
    expect(fromReportSearch('region=picardie').region).toBe('wallonie');
  });

  it('ignore une surface absurde plutôt que de produire un chiffre faux', () => {
    expect(fromReportSearch('surface=-40').area).toBe(40);
    expect(fromReportSearch('surface=abc').area).toBe(40);
    expect(fromReportSearch('conso=0').consumption).toBe(3800);
  });

  it('reste calculable même avec des valeurs inventées', () => {
    const inputs = fromReportSearch('bien=chateau&toit=chaume&orientation=nulle-part');
    expect(() => simulate(inputs)).not.toThrow();
  });
});

describe('hasReportAnswers', () => {
  it('distingue une URL nue d’une URL porteuse de réponses', () => {
    expect(hasReportAnswers('')).toBe(false);
    expect(hasReportAnswers('utm_source=mail')).toBe(false);
    expect(hasReportAnswers(toReportSearch(BASE))).toBe(true);
  });
});

describe('reportHref', () => {
  it('colle les réponses au chemin demandé', () => {
    expect(reportHref('/rapport', BASE)).toMatch(/^\/rapport\?/);
    expect(reportHref('/rapport', BASE)).toContain('bien=maison');
  });
});
