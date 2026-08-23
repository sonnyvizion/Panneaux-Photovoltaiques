import { formatEuro } from '../format';
import type { CalculatorModel } from './types';

/**
 * Modèle « Tarif prosumer » — page Aides & primes Wallonie / tarif prosumer.
 *
 * ⚠️ CE N'EST PAS LE SIMULATEUR (règle d'or #3). Le module répond à une seule
 * question — « ce tarif, ça me coûte combien par an ? » — à partir de la seule
 * variable qui le détermine vraiment : la puissance installée.
 *
 * ⚠️ Le calcul se fait sur la plus petite valeur entre la puissance des panneaux
 * et celle de l'onduleur (c'est ce que dit la carte « Base de calcul » de la
 * page). Le module ne demande QUE la puissance : demander les deux ferait de lui
 * un formulaire, et l'écart entre les deux est marginal sur une installation
 * bien dimensionnée. Le curseur porte donc la puissance de référence, pas celle
 * des panneaux — la page le dit en toutes lettres juste au-dessus.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ CONSTANTE À VALIDER PAR LE CLIENT (CLAUDE.md § « À compléter »).
 * Le coefficient est révisé chaque année par la CWaPE et varie légèrement selon
 * le gestionnaire de réseau (ORES ou RESA) — la page le dit elle-même. Aucun
 * chiffre d'ici ne doit être présenté comme une facture.
 * ═══════════════════════════════════════════════════════════════════════════
 */

/** Bornes du curseur, en kWc — celles données par le cahier de construction. */
export const PROSUMER_MIN = 1;
export const PROSUMER_MAX = 10;

/**
 * Pas du curseur, en kWc.
 *
 * Fin (0,1) comme celui de la page prix : à 1 kWc, la plage n'offrirait que dix
 * positions et le pouce sauterait de l'une à l'autre au lieu de suivre le doigt.
 */
export const PROSUMER_STEP = 0.1;

/** Le cas de référence de la page (« ~435 €/an pour 5 kWe »). */
export const PROSUMER_DEFAULT = 5;

/** Redevance annuelle par kilowatt-crête, en euros. ⚠️ À valider. */
export const PROSUMER_RATE = 87;

export function clampPower(kwc: number): number {
  if (!Number.isFinite(kwc)) return PROSUMER_DEFAULT;
  return Math.min(PROSUMER_MAX, Math.max(PROSUMER_MIN, kwc));
}

/** Le coût annuel, en euros. */
export function yearlyCost(kwc: number): number {
  return clampPower(kwc) * PROSUMER_RATE;
}

/** Position du coût sur la jauge, en pourcentage du pire cas de la plage. */
export function costRatio(kwc: number): number {
  return (yearlyCost(kwc) / yearlyCost(PROSUMER_MAX)) * 100;
}

/* `maximumFractionDigits: 1` sans minimum : une puissance ronde s'écrit « 5 » et
   non « 5,0 ». Le zéro de fin ferait sautiller la largeur du libellé. */
const powerFormat = new Intl.NumberFormat('fr-BE', { maximumFractionDigits: 1 });

export function formatPower(kwc: number): string {
  return `${powerFormat.format(clampPower(kwc))} kWc`;
}

export const prosumerModel: CalculatorModel = {
  clamp: clampPower,

  values(slider) {
    const yearly = yearlyCost(slider);
    /* Le mensuel n'est pas une donnée de plus : c'est le même montant, ramené à
       l'échelle à laquelle les gens lisent leurs factures d'énergie. */
    return [yearly, yearly / 12];
  },

  format([yearly, monthly]) {
    return [formatEuro(Math.round(yearly)), formatEuro(Math.round(monthly))];
  },

  inputLabel: formatPower,

  caption: () => `sur la base de ${PROSUMER_RATE} €/kWc par an`,

  sliderRatio(slider) {
    return ((clampPower(slider) - PROSUMER_MIN) / (PROSUMER_MAX - PROSUMER_MIN)) * 100;
  },

  gaugeRatio(_values, slider) {
    return costRatio(slider);
  },

  announce(slider) {
    return `${formatPower(slider)} : environ ${formatEuro(
      Math.round(yearlyCost(slider)),
    )} de tarif prosumer par an.`;
  },
};
