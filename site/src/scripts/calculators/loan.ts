import { formatEuro } from '../format';
import { amountRatio, clampAmount, monthly, monthlyRatio } from '../loanEstimate';
import type { CalculatorModel } from './types';

/**
 * Modèle « Montant emprunté » — Rénoprêt, page Aides & primes Wallonie.
 *
 * Adaptateur au-dessus de `loanEstimate.ts`, qui garde le calcul et ses tests.
 * C'est la variante du contrat qui a un GROUPE D'OPTIONS : `option` porte ici la
 * durée en années, et elle entre dans la formule au même titre que le curseur.
 */
export const loanModel: CalculatorModel = {
  clamp: clampAmount,

  values(slider, option) {
    return [monthly(slider, option)];
  },

  format([value]) {
    return [formatEuro(Math.round(value))];
  },

  inputLabel: (slider) => formatEuro(clampAmount(slider)),

  caption: (option) => `sur ${option} ans · 0 % d’intérêt`,

  sliderRatio: amountRatio,

  /* ⚠️ Recalculée depuis les ENTRÉES et non depuis la mensualité reçue :
     `monthlyRatio` cale la jauge sur une échelle absolue en euros par mois,
     qu'on ne peut pas retrouver à partir de la seule mensualité. C'est cette
     échelle absolue qui fait qu'allonger la durée rétrécit la barre à montant
     inchangé — toute la démonstration du module. */
  gaugeRatio(_values, slider, option) {
    return monthlyRatio(slider, option);
  },

  announce(slider, option) {
    return `${formatEuro(clampAmount(slider))} sur ${option} ans : environ ${formatEuro(
      monthly(slider, option),
    )} par mois, sans intérêts.`;
  },
};
