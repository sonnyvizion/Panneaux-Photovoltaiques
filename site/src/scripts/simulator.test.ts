import { describe, expect, it } from 'vitest';
import {
  AREA_DEFAULT,
  BATTERY_RATE,
  BILL_BANDS,
  EQUIPMENT_RATE_CAP,
  PROPERTY_TYPES,
  REFINE_DEFAULT,
  ROOF_TYPES,
  SHADINGS,
  SPREAD_QUICK,
  SPREAD_REFINED,
  TILTS,
  aidesLabel,
  powerFromArea,
  powerFromConsumption,
  productionFactor,
  rateFromRefine,
  resolveConsumption,
  ROI_WARM_MAX,
  outcomeProfile,
  simulate,
  sizedPower,
  tiltFactor,
  type SimulatorInputs,
  type SimulatorResults,
} from './simulator';
import { SELF_CONSUMPTION_RATE } from './savings';
import { POWER_MAX, POWER_MIN, estimate } from './powerEstimate';
import { ORIENTATIONS } from './orientation';

const BASE: SimulatorInputs = {
  region: 'wallonie',
  property: 'maison',
  roof: 'inclinee',
  orientation: 'sud',
  area: AREA_DEFAULT,
  consumptionMode: 'facture',
  bill: '100-200',
  consumption: 3800,
};

describe('le mode rapide suit les 5 questions du brief', () => {
  it('propose les trois types de bien, dans l’ordre du brief', () => {
    expect(PROPERTY_TYPES.map((p) => p.value)).toEqual(['maison', 'copropriete', 'professionnel']);
  });

  it('n’offre que deux types de toit à l’écran B', () => {
    expect(ROOF_TYPES.map((r) => r.value)).toEqual(['inclinee', 'plate']);
  });

  it('déduit une consommation croissante des tranches de facture', () => {
    const values = BILL_BANDS.map((b) => resolveConsumption({ ...BASE, bill: b.value }));
    expect(values).toEqual([...values].sort((a, b) => a - b));
  });

  it('accepte une saisie directe en kWh', () => {
    expect(resolveConsumption({ ...BASE, consumptionMode: 'kwh', consumption: 5200 })).toBe(5200);
  });

  /* « Je ne sais pas » = moyenne selon le type de bien. Seule la maison en a une ;
     les deux autres doivent saisir leur facture, et le résultat le signale. */
  it('retombe sur la moyenne du type de bien, ou réclame la facture', () => {
    const maison = simulate({ ...BASE, consumptionMode: 'inconnue' });
    expect(maison.needsBill).toBe(false);
    expect(maison.consumption).toBe(3800);

    const copro = simulate({ ...BASE, property: 'copropriete', consumptionMode: 'inconnue' });
    expect(copro.needsBill).toBe(true);
  });

  /* Le bâtiment professionnel sort du modèle résidentiel : on l'oriente vers un
     contact humain plutôt que de produire un chiffre faux. */
  it('signale le bâtiment professionnel comme hors modèle', () => {
    expect(simulate({ ...BASE, property: 'professionnel' }).outOfScope).toBe(true);
    expect(simulate({ ...BASE, property: 'maison' }).outOfScope).toBe(false);
  });
});

describe('le résultat est en fourchettes', () => {
  it('rend une fourchette pour chaque grandeur affichée', () => {
    const r = simulate(BASE);
    for (const value of [r.kwc, r.production, r.savings, r.cost]) {
      expect(value.high).toBeGreaterThan(value.low);
    }
  });

  it('encadre le prix du modèle de puissance, sans le recalculer', () => {
    const r = simulate(BASE);
    const centre = (r.cost.low + r.cost.high) / 2;
    expect(centre).toBeCloseTo(estimate(sizedPower(BASE)).price);
  });

  /* La promesse du brief : « un affinage optionnel qui RESSERRE les
     fourchettes ». Sans ce resserrement, répondre à cinq questions de plus
     n'apporterait rien. */
  it('resserre la fourchette dès que le visiteur a affiné', () => {
    const rapide = simulate(BASE);
    const affine = simulate({ ...BASE, refine: REFINE_DEFAULT });
    const largeur = (r: { low: number; high: number }) => r.high - r.low;
    expect(largeur(affine.cost)).toBeLessThan(largeur(rapide.cost));
    expect(SPREAD_REFINED).toBeLessThan(SPREAD_QUICK);
    expect(affine.refined).toBe(true);
  });
});

describe('dimensionnement', () => {
  it('reste dans la gamme résidentielle quoi qu’on saisisse', () => {
    for (const area of [1, AREA_DEFAULT, 500]) {
      for (const bill of BILL_BANDS) {
        const kwc = sizedPower({ ...BASE, area, bill: bill.value });
        expect(kwc).toBeGreaterThanOrEqual(POWER_MIN);
        expect(kwc).toBeLessThanOrEqual(POWER_MAX);
      }
    }
  });

  it('installe moins de puissance sur un toit plat, à surface égale', () => {
    expect(powerFromArea(60, 'plate')).toBeLessThan(powerFromArea(60, 'inclinee'));
  });

  it('appelle plus de puissance quand l’orientation est mauvaise', () => {
    expect(powerFromConsumption(3800, 'nord')).toBeGreaterThan(powerFromConsumption(3800, 'sud'));
  });
});

describe('affinage', () => {
  it('n’applique pente et ombrage qu’une fois affiné', () => {
    const avant = productionFactor(BASE);
    const apres = productionFactor({
      ...BASE,
      refine: { ...REFINE_DEFAULT, shading: 'important' },
    });
    expect(apres).toBeLessThan(avant);
  });

  /* L'inclinaison est masquée sur toit plat — le brief la dit conditionnelle,
     « sinon doublon avec toit plat ». */
  it('ignore l’inclinaison sur un toit plat', () => {
    const plat = { ...BASE, roof: 'plate', refine: { ...REFINE_DEFAULT, tilt: 'faible' } };
    const platNeutre = { ...BASE, roof: 'plate', refine: { ...REFINE_DEFAULT, tilt: 'moyenne' } };
    expect(productionFactor(plat)).toBe(productionFactor(platNeutre));
  });

  it('pénalise l’inclinaison inconnue plutôt que de la flatter', () => {
    expect(tiltFactor('inconnue')).toBeLessThan(tiltFactor('moyenne'));
  });

  it('relève l’autoconsommation avec les équipements, sous plafond', () => {
    expect(rateFromRefine(REFINE_DEFAULT)).toBe(SELF_CONSUMPTION_RATE);
    expect(rateFromRefine({ ...REFINE_DEFAULT, heatPump: 'oui' })).toBeGreaterThan(SELF_CONSUMPTION_RATE);
    expect(rateFromRefine({ ...REFINE_DEFAULT, heatPump: 'oui', car: 'oui' })).toBeLessThanOrEqual(
      EQUIPMENT_RATE_CAP,
    );
  });

  it('compte « en projet » pour moitié', () => {
    const projet = rateFromRefine({ ...REFINE_DEFAULT, heatPump: 'projet' });
    const oui = rateFromRefine({ ...REFINE_DEFAULT, heatPump: 'oui' });
    expect(projet).toBeGreaterThan(SELF_CONSUMPTION_RATE);
    expect(projet).toBeLessThan(oui);
  });

  it('fait passer la batterie au-dessus du plafond des équipements', () => {
    expect(rateFromRefine({ ...REFINE_DEFAULT, battery: true })).toBe(BATTERY_RATE);
    expect(BATTERY_RATE).toBeGreaterThan(EQUIPMENT_RATE_CAP);
  });

  it('améliore les économies quand on active la batterie', () => {
    const sans = simulate({ ...BASE, refine: REFINE_DEFAULT });
    const avec = simulate({ ...BASE, refine: { ...REFINE_DEFAULT, battery: true } });
    expect(avec.savings.low).toBeGreaterThan(sans.savings.low);
  });
});

describe('robustesse', () => {
  it('ne produit jamais de valeur non finie, sur toutes les combinaisons', () => {
    for (const o of ORIENTATIONS) {
      for (const r of ROOF_TYPES) {
        for (const s of SHADINGS) {
          for (const t of TILTS) {
            const res = simulate({
              ...BASE,
              orientation: o.value,
              roof: r.value,
              refine: { ...REFINE_DEFAULT, shading: s.value, tilt: t.value },
            });
            for (const v of [res.kwc.low, res.production.high, res.savings.low, res.co2Kg]) {
              expect(Number.isFinite(v)).toBe(true);
            }
          }
        }
      }
    }
  });
});

describe('aidesLabel', () => {
  /* Le brief demande « budget avant / après primes ». Nos propres pages disent
     qu'il n'y a plus de prime directe en Wallonie ni en Flandre : ces libellés
     sont la seule réponse honnête, et ce test les verrouille contre une
     réintroduction de « après primes ». */
  it('ne promet de prime directe dans aucune région', () => {
    for (const region of ['wallonie', 'bruxelles', 'flandre'] as const) {
      expect(aidesLabel(region)).not.toMatch(/après primes/i);
      expect(aidesLabel(region).length).toBeGreaterThan(0);
    }
  });

  it('nomme le mécanisme propre à chaque région', () => {
    expect(aidesLabel('bruxelles')).toMatch(/certificats verts/i);
    expect(aidesLabel('wallonie')).toMatch(/prosumer/i);
    expect(aidesLabel('flandre')).toMatch(/injection/i);
  });
});

describe('continuité entre le mode rapide et l’affinage', () => {
  /* ⚠️ L'invariant central du brief : « l'affinage reprend les réponses déjà
     données et met à jour le même résultat ». Ouvrir l'écran D sans rien
     répondre ne doit donc RIEN déplacer — sinon le visiteur est puni d'avoir
     cliqué, et l'affinage cesse d'être « 100 % optionnel ». */
  it('affiner sans rien changer ne déplace que la fourchette', () => {
    const quick = simulate(BASE);
    const refined = simulate({ ...BASE, refine: { ...REFINE_DEFAULT } });

    const mid = (r: { low: number; high: number }) => (r.low + r.high) / 2;
    expect(mid(refined.savings)).toBeCloseTo(mid(quick.savings), 6);
    expect(mid(refined.production)).toBeCloseTo(mid(quick.production), 6);
    expect(mid(refined.kwc)).toBeCloseTo(mid(quick.kwc), 6);
    expect(refined.rate).toBe(quick.rate);

    /* Seul bénéfice promis, et il est mesurable. */
    const width = (r: { low: number; high: number }) => r.high - r.low;
    expect(width(refined.savings)).toBeLessThan(width(quick.savings));
  });

  it('répondre « moyenne » à la pente relève l’estimation', () => {
    const unknown = simulate({ ...BASE, refine: { ...REFINE_DEFAULT, tilt: 'inconnue' } });
    const known = simulate({ ...BASE, refine: { ...REFINE_DEFAULT, tilt: 'moyenne' } });
    expect(known.production.low).toBeGreaterThan(unknown.production.low);
  });
});

describe('le profil de sortie choisit le CTA', () => {
  const results = (over: Partial<SimulatorResults>): SimulatorResults =>
    ({ ...simulate(BASE), ...over }) as SimulatorResults;

  it('range le bâtiment professionnel hors périmètre, avant tout chiffre', () => {
    /* ⚠️ `outOfScope` prime sur le ROI : le modèle résidentiel ne s'applique
       pas, donc son verdict n'a pas à être interprété. */
    expect(outcomeProfile(results({ outOfScope: true, roi: { low: 4, high: 6 } }))).toBe(
      'hors-perimetre',
    );
  });

  it('déclare froid un résultat qui ne s’amortit jamais sur l’horizon', () => {
    expect(outcomeProfile(results({ roi: null }))).toBe('froid');
  });

  it('déclare chaud un amortissement court', () => {
    expect(outcomeProfile(results({ roi: { low: 6, high: 9 } }))).toBe('chaud');
  });

  it('juge sur la borne HAUTE, jamais sur l’hypothèse la plus favorable', () => {
    /* Une fourchette « 4 à 22 ans » n'est pas un bon résultat sous prétexte
       qu'elle commence à 4 : c'est le risque qui décide de la sortie. */
    expect(outcomeProfile(results({ roi: { low: 4, high: 22 } }))).toBe('tiede');
  });

  it('place la frontière chaud/tiède à ROI_WARM_MAX inclus', () => {
    expect(outcomeProfile(results({ roi: { low: 8, high: ROI_WARM_MAX } }))).toBe('chaud');
    expect(outcomeProfile(results({ roi: { low: 8, high: ROI_WARM_MAX + 1 } }))).toBe('tiede');
  });

  it('couvre les quatre profils, sans trou', () => {
    const seen = new Set([
      outcomeProfile(results({ outOfScope: true })),
      outcomeProfile(results({ roi: null })),
      outcomeProfile(results({ roi: { low: 5, high: 8 } })),
      outcomeProfile(results({ roi: { low: 5, high: 20 } })),
    ]);
    expect(seen).toEqual(new Set(['hors-perimetre', 'froid', 'chaud', 'tiede']));
  });
});
