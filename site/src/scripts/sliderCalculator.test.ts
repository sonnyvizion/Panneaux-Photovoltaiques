import { describe, expect, it } from 'vitest';
import { CHASE_DURATION, chase } from './sliderCalculator';
import { boundedRatio, initialState } from './calculators/types';
import { CALCULATOR_MODELS } from './calculators/registry';

describe('chase', () => {
  /* Les deux extrémités décident de tout : partir d'ailleurs que de la valeur
     affichée produit un saut visible, et ne pas atteindre exactement la cible
     laisse un reliquat qui s'accumule d'une poursuite à l'autre. */
  it('part de la valeur courante et atterrit exactement sur la cible', () => {
    expect(chase(7500, 8000, 0)).toBe(7500);
    expect(chase(7500, 8000, 1)).toBe(8000);
  });

  it('décélère : plus de la moitié du chemin est faite à mi-course', () => {
    expect(chase(0, 100, 0.5)).toBeGreaterThan(50);
  });

  /* Une image peut arriver après la fin de la course (onglet en arrière-plan,
     horloge qui saute). Sans bornes, la valeur dépasserait la cible. */
  it('borne une progression hors plage', () => {
    expect(chase(7500, 8000, -1)).toBe(7500);
    expect(chase(7500, 8000, 2)).toBe(8000);
  });

  it('fonctionne aussi à rebours', () => {
    expect(chase(8000, 7500, 1)).toBe(7500);
    expect(chase(8000, 7500, 0.5)).toBeLessThan(7750);
  });

  it('est assez court pour suivre le doigt plutôt que le rattraper', () => {
    expect(CHASE_DURATION).toBeLessThanOrEqual(500);
  });
});

describe('boundedRatio', () => {
  it('couvre toute la plage entre les deux bornes', () => {
    expect(boundedRatio(4500, 4500, 11500)).toBe(0);
    expect(boundedRatio(11500, 4500, 11500)).toBe(100);
  });

  /* La jauge reçoit des valeurs INTERPOLÉES, qui peuvent momentanément sortir
     de la fourchette si une poursuite dépasse. Le remplissage doit rester dans
     sa barre. */
  it('borne une valeur hors fourchette', () => {
    expect(boundedRatio(0, 4500, 11500)).toBe(0);
    expect(boundedRatio(99999, 4500, 11500)).toBe(100);
  });

  /* Garde-fou contre une division par zéro le jour où un modèle rendrait les
     deux bornes égales. */
  it('renvoie zéro plutôt que NaN sur une plage dégénérée', () => {
    expect(boundedRatio(5000, 5000, 5000)).toBe(0);
  });

  it('place le milieu de la plage au milieu de la jauge', () => {
    expect(boundedRatio(8000, 4500, 11500)).toBeCloseTo(50, 5);
  });
});

/**
 * Le contrat de la famille A, vérifié sur TOUS les modèles du registre.
 *
 * C'est le filet qui rend la généralisation sûre : un modèle ajouté plus tard
 * qui oublierait une méthode, renverrait un `NaN` ou un nombre de sorties
 * incohérent casserait le composant partagé sur six pages. Ces tests le
 * rattrapent sans avoir à ouvrir un navigateur.
 */
describe('contrat des modèles', () => {
  const names = Object.keys(CALCULATOR_MODELS) as (keyof typeof CALCULATOR_MODELS)[];

  it('couvre bien les cinq modèles codés à ce jour', () => {
    expect(names).toEqual(['power', 'loan', 'prosumer', 'greenCert', 'selfConsumption']);
  });

  for (const name of names) {
    const model = CALCULATOR_MODELS[name];
    /* Les modèles à option reçoivent une durée de prêt ; les autres l'ignorent.
       10 est la seule valeur valable pour `loan` et neutre pour les autres. */
    const option = 10;

    describe(name, () => {
      it('produit autant de chaînes que de valeurs', () => {
        const values = model.values(1, option);
        expect(values.length).toBeGreaterThan(0);
        expect(model.format(values, option)).toHaveLength(values.length);
      });

      it('ne produit jamais de NaN, même hors plage', () => {
        for (const raw of [Number.NaN, -1e6, 0, 1e9]) {
          const slider = model.clamp(raw);
          expect(Number.isFinite(slider)).toBe(true);
          for (const value of model.values(slider, option)) {
            expect(Number.isFinite(value)).toBe(true);
          }
        }
      });

      it('garde ses deux remplissages entre 0 et 100', () => {
        for (const raw of [-1e6, 0, 1e9]) {
          const slider = model.clamp(raw);
          const values = model.values(slider, option);
          for (const ratio of [
            model.sliderRatio(slider),
            model.gaugeRatio(values, slider, option),
          ]) {
            expect(ratio).toBeGreaterThanOrEqual(0);
            expect(ratio).toBeLessThanOrEqual(100);
          }
        }
      });

      it('rend un état initial complet, celui écrit dans le HTML sans JS', () => {
        const state = initialState(model, model.clamp(5), option);
        expect(state.inputLabel).not.toHaveLength(0);
        expect(state.outputs.every((text) => text.length > 0)).toBe(true);
      });

      it('annonce une phrase non vide aux lecteurs d’écran', () => {
        expect(model.announce(model.clamp(5), option).length).toBeGreaterThan(10);
      });
    });
  }
});
