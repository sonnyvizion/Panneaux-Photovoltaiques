import { estimate } from './powerEstimate';
import {
  HORIZON_YEARS,
  cumulativeSavings,
  netGain,
  paybackYear,
  type SavingsOptions,
} from './savings';

/**
 * La géométrie de la timeline d'amortissement — brique du catalogue
 * (`interactivite-seo.md`), rôle « Résultats (ROI) ».
 *
 * ⚠️ FONCTION PURE ET PARTAGÉE, c'est tout l'intérêt. Le tracé était calculé
 * dans le frontmatter de `PaybackTimeline` : il ne servait donc que la page de
 * contenu, au build. Le catalogue veut la brique montée DEUX fois — sur sa page
 * ET dans le simulateur, où les entrées changent à l'exécution. Une seule
 * fonction produit les deux.
 *
 * ⚠️ ZÉRO ARITHMÉTIQUE NOUVELLE : elle assemble `cumulativeSavings()`,
 * `paybackYear()`, `netGain()` et `estimate()`, tous déjà testés. Elle ne fait
 * que traduire des euros en coordonnées.
 */

/* `viewBox` en unités arbitraires : le SVG est en `width: 100%`, c'est le ratio
   qui compte, pas les pixels. */
export const CHART_W = 1000;
export const CHART_H = 360;
const PAD = 8;

export interface PaybackGeometry {
  /** Le chemin de la courbe des économies cumulées. */
  curve: string;
  /** L'aire du bénéfice, vide tant que l'installation n'est pas amortie. */
  benefit: string;
  /** L'ordonnée de la ligne de coût, en unités du `viewBox`. */
  costY: number;
  /** L'abscisse du croisement, `null` si l'amortissement n'arrive jamais. */
  crossX: number | null;
  /** Les repères de l'axe : début, croisement, fin. */
  marks: number[];
  /** L'année d'amortissement, ou `null`. */
  payback: number | null;
  cost: number;
  gain: number;
}

export function paybackGeometry(kwc: number, options: SavingsOptions = {}): PaybackGeometry {
  const cost = estimate(kwc).price;
  const series = cumulativeSavings(kwc, options);
  const payback = paybackYear(kwc, options);
  const gain = netGain(kwc, options);

  /* L'échelle verticale couvre le cumul final ET le coût, avec une marge — sinon
     la courbe touche le bord haut du cadre à la dernière année. */
  const maxY = Math.max(series[series.length - 1], cost) * 1.08;

  const x = (year: number) => ((year - 1) / (HORIZON_YEARS - 1)) * (CHART_W - PAD * 2) + PAD;
  const y = (value: number) => CHART_H - PAD - (value / maxY) * (CHART_H - PAD * 2);

  const curve = `M ${series
    .map((total, index) => `${x(index + 1).toFixed(1)},${y(total).toFixed(1)}`)
    .join(' L ')}`;

  /**
   * L'aire du bénéfice : la courbe au-dessus de la ligne de coût, refermée sur
   * elle. Elle ne commence qu'au croisement — avant, il n'y a pas de bénéfice.
   *
   * ⚠️ La condition porte sur `payback`, PAS sur le nombre de points. L'ancien
   * code repliait `benefitFrom` sur la 25ᵉ année quand l'amortissement n'arrivait
   * jamais : le filtre gardait alors ce seul point et refermait un triangle plat
   * d'un pixel au bord droit. Invisible, donc jamais remarqué — mais il
   * affirmait un bénéfice là où il n'y en a aucun, ce qui est faux en Wallonie
   * où le tarif prosumer empêche l'amortissement sur l'horizon.
   */
  const top =
    payback === null
      ? []
      : series
          .map((total, index) => ({ year: index + 1, total }))
          .filter(({ year }) => year >= payback)
          .map(({ year, total }) => `${x(year).toFixed(1)},${y(total).toFixed(1)}`);
  const benefit = top.length
    ? `M ${x(payback as number).toFixed(1)},${y(cost).toFixed(1)} L ${top.join(' L ')} L ${x(HORIZON_YEARS).toFixed(1)},${y(cost).toFixed(1)} Z`
    : '';

  return {
    curve,
    benefit,
    costY: Number(y(cost).toFixed(1)),
    crossX: payback ? Number(x(payback).toFixed(1)) : null,
    /* Trois repères suffisent — un axe gradué de 25 ans ajouterait du bruit sans
       rien apprendre. */
    marks: [1, ...(payback ? [payback] : []), HORIZON_YEARS],
    payback,
    cost,
    gain,
  };
}

/** Le libellé de l'amortissement, partagé par la page et le simulateur. */
export function paybackLabel(payback: number | null): string {
  return payback === null ? 'au-delà de 25 ans' : `${payback} ans`;
}
