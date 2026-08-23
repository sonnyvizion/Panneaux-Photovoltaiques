import {
  POWER_MAX,
  POWER_MIN,
  clampPower,
  estimate,
  formatEuro,
  formatNumber,
  formatPower,
  powerRatio,
} from '../powerEstimate';
import { boundedRatio, type CalculatorModel } from './types';

/**
 * Modèle « Puissance installée » — page Rentabilité & prix, et page « Nombre de
 * panneaux » du pilier Installation (registre, famille A, variante `billSlider`).
 *
 * Adaptateur, pas un calcul de plus : toute l'arithmétique reste dans
 * `powerEstimate.ts`, testée à part depuis la première page. Ce fichier ne fait
 * que présenter ce calcul sous le contrat commun aux six calculateurs du site.
 */

/* Bornes de la jauge, calculées une fois : elle situe le prix courant dans la
   fourchette annoncée par les deux libellés écrits sous elle. */
const LOW_PRICE = estimate(POWER_MIN).price;
const HIGH_PRICE = estimate(POWER_MAX).price;

/** Espace fine insécable (U+202F), la même que celle du rendu serveur.
    Écrite en séquence d'échappement : un caractère invisible qu'on ne peut pas
    relire dans le code finit par diverger, et la valeur se décale alors au
    premier déplacement du curseur. */
const THIN_NBSP = ' ';

export const powerModel: CalculatorModel = {
  clamp: clampPower,

  values(slider) {
    const { price, panels, production } = estimate(slider);
    return [price, panels, production];
  },

  format([price, panels, production]) {
    return [
      formatEuro(Math.round(price)),
      /* Arrondi à l'entier en vol : un « 14,3 panneaux » serait faux. */
      String(Math.round(panels)),
      `${formatNumber(Math.round(production))}${THIN_NBSP}kWh`,
    ];
  },

  inputLabel: formatPower,

  sliderRatio: powerRatio,

  gaugeRatio([price]) {
    return boundedRatio(price, LOW_PRICE, HIGH_PRICE);
  },

  announce(slider) {
    const settled = estimate(slider);
    return (
      `${formatPower(slider)} : ${formatEuro(settled.price)}, ` +
      `${settled.panels} panneaux, ${formatNumber(settled.production)} kWh par an.`
    );
  },
};
