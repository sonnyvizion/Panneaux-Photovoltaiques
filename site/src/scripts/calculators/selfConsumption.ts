import { formatEuro } from '../format';
import { POWER_DEFAULT } from '../powerEstimate';
import {
  ELECTRICITY_PRICE,
  REGION_DEFAULT,
  SELF_CONSUMPTION_RATE,
  regionLabel,
  yearSavings,
} from '../savings';
import type { CalculatorModel } from './types';

/**
 * Modèle « Taux d'autoconsommation » — page Rentabilité & prix 3.4.
 *
 * Le curseur porte le TAUX (0-100 %) et non une puissance : c'est la seule
 * variable dont la page parle, et l'argument central du texte — « deux
 * installations identiques peuvent avoir une rentabilité très différente selon
 * un seul facteur ».
 *
 * ⚠️ Aucun composant nouveau : `SliderCalculator` accepte déjà une à trois
 * sorties. Les trois tuiles montrent la répartition demandée — économies
 * directes, valorisation du surplus, total — et la jauge porte la part que
 * l'autoconsommation représente dans la valeur totale. C'est la « double barre »
 * du cahier, obtenue sans variante de composant.
 *
 * ⚠️ Toute l'arithmétique vient de `savings.ts`, partagé avec la timeline
 * d'amortissement. Les deux pages ne peuvent pas afficher deux économies
 * différentes pour la même installation.
 *
 * La puissance est FIXÉE au cas standard : la page parle du taux, pas du
 * dimensionnement — celui-ci a sa propre page, et le simulateur fait le reste.
 */

/** Bornes du curseur, en pourcentage. */
export const RATE_MIN = 0;
export const RATE_MAX = 100;
export const RATE_STEP = 1;

/** Le taux de référence, arrondi au point : c'est une position atteignable. */
export const RATE_DEFAULT = Math.round(SELF_CONSUMPTION_RATE * 100);

export function clampRate(percent: number): number {
  if (!Number.isFinite(percent)) return RATE_DEFAULT;
  return Math.min(RATE_MAX, Math.max(RATE_MIN, percent));
}

/** Le bilan de la première année pour un taux donné. */
function forRate(percent: number) {
  return yearSavings(POWER_DEFAULT, {
    region: REGION_DEFAULT,
    rate: clampRate(percent) / 100,
    year: 1,
  });
}

export const selfConsumptionModel: CalculatorModel = {
  clamp: clampRate,

  values(slider) {
    const { direct, surplus, net } = forRate(slider);
    return [direct, surplus, net];
  },

  format([direct, surplus, net]) {
    return [formatEuro(Math.round(direct)), formatEuro(Math.round(surplus)), formatEuro(Math.round(net))];
  },

  inputLabel: (slider) => `${Math.round(clampRate(slider))} %`,

  /* Les hypothèses, affichées comme sur la page certificats verts : dérivées des
     constantes, jamais réécrites à la main. */
  caption: () =>
    `${POWER_DEFAULT} kWc en ${regionLabel(REGION_DEFAULT)} · électricité à ${ELECTRICITY_PRICE.toFixed(2).replace('.', ',')} €/kWh`,

  sliderRatio: (slider) => clampRate(slider),

  /**
   * La jauge porte la part de l'autoconsommation dans la VALEUR totale, pas le
   * taux lui-même — le curseur le montre déjà. C'est précisément l'écart entre
   * les deux qui fait le sujet de la page : à 40 % d'autoconsommation, la part
   * de valeur directe est bien supérieure à 40 %.
   */
  gaugeRatio([direct, surplus]) {
    const total = direct + surplus;
    return total <= 0 ? 0 : Math.min(Math.max(direct / total, 0), 1) * 100;
  },

  announce(slider) {
    const { direct, surplus, net } = forRate(slider);
    return (
      `${Math.round(clampRate(slider))} % d'autoconsommation : ${formatEuro(Math.round(direct))} d'économies directes, ` +
      `${formatEuro(Math.round(surplus))} de surplus valorisé, soit ${formatEuro(Math.round(net))} par an.`
    );
  },
};
