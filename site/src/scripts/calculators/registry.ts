import { greenCertModel } from './greenCert';
import { loanModel } from './loan';
import { powerModel } from './power';
import { prosumerModel } from './prosumer';
import { selfConsumptionModel } from './selfConsumption';
import type { CalculatorModel } from './types';

/**
 * Les modèles de la famille A, adressables par un nom.
 *
 * Le composant `SliderCalculator.astro` reçoit ce nom en prop et le passe à son
 * script, qui va chercher le modèle ici. C'est ce qui permet à UN composant de
 * servir six pages : la formule est une donnée, pas une variante de code.
 *
 * ⚠️ Tous les modèles sont donc dans le bundle de toute page qui porte un
 * calculateur, y compris ceux qu'elle n'utilise pas. C'est assumé : ce sont des
 * fonctions pures de quelques lignes, l'ensemble pèse moins que le surcoût
 * d'orchestration qu'aurait un import dynamique par page — lequel ajouterait en
 * plus un aller-retour réseau au premier mouvement du curseur.
 */
export const CALCULATOR_MODELS = {
  power: powerModel,
  loan: loanModel,
  prosumer: prosumerModel,
  greenCert: greenCertModel,
  selfConsumption: selfConsumptionModel,
} satisfies Record<string, CalculatorModel>;

export type CalculatorName = keyof typeof CALCULATOR_MODELS;
