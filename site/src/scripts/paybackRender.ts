import { CHART_H, CHART_W, paybackGeometry } from './payback';
import { formatEuro } from './format';
import type { SavingsOptions } from './savings';

/**
 * Le rendu d'une timeline d'amortissement déjà présente dans le DOM.
 *
 * ⚠️ EXTRAIT DE `simulatorWidget`, PAS RÉÉCRIT. La brique est maintenant montée
 * à TROIS endroits — la page Amortissement (statique, au build), le compte rendu
 * du simulateur (deux tuiles, sans tracé) et le rapport (tracé complet). Les
 * deux derniers la redessinent à l'exécution. Laisser chacun peindre de son côté
 * aurait garanti la divergence : le rapport et l'écran doivent porter le MÊME
 * graphique, c'est toute la promesse du document.
 *
 * ⚠️ Cette fonction ne CONSTRUIT aucun nœud, elle réécrit ceux que le HTML a
 * déjà posés (règle d'or #1 : la page reste lisible sans JavaScript, et rien ne
 * clignote au chargement). Elle tolère l'absence de chacun d'eux — le compte
 * rendu, par exemple, n'a pas de tracé du tout.
 *
 * ⚠️ Zéro arithmétique : tout vient de `paybackGeometry()`, pure et testée.
 */

export interface PaybackNodes {
  benefit: SVGPathElement | null;
  cost: SVGLineElement | null;
  curve: SVGPathElement | null;
  cross: HTMLElement | null;
  axis: HTMLElement | null;
  years: HTMLElement | null;
  gain: HTMLElement | null;
  /**
   * La tuile « Coût de départ ».
   *
   * ⚠️ Elle était ABSENTE de la collecte, et donc jamais mise à jour. Le compte
   * rendu ne l'affiche pas (`showCost={false}`), le défaut passait donc
   * inaperçu — jusqu'au rapport, qui l'affiche : le document annonçait un coût
   * de départ de 7 500 € (le cas médian du build) à côté d'un budget indicatif
   * de 9 200 à 13 800 €. Deux chiffres contradictoires sur la même page.
   */
  costValue: HTMLElement | null;
  scale: HTMLElement[];
  shortfall: HTMLElement | null;
  tile: HTMLElement | null;
}

/** Rassemble les nœuds d'une timeline à partir de sa racine `[data-payback]`. */
export function collectPayback(root: ParentNode): PaybackNodes {
  return {
    benefit: root.querySelector<SVGPathElement>('[data-payback-benefit]'),
    cost: root.querySelector<SVGLineElement>('[data-payback-cost]'),
    curve: root.querySelector<SVGPathElement>('[data-payback-curve]'),
    cross: root.querySelector<HTMLElement>('[data-payback-cross]'),
    axis: root.querySelector<HTMLElement>('[data-payback-axis]'),
    years: root.querySelector<HTMLElement>('[data-payback-years]'),
    gain: root.querySelector<HTMLElement>('[data-payback-gain]'),
    costValue: root.querySelector<HTMLElement>('[data-payback-cost-value]'),
    scale: [...root.querySelectorAll<HTMLElement>('[data-payback-scale] li')],
    shortfall: root.querySelector<HTMLElement>('[data-payback-shortfall]'),
    tile: root.querySelector<HTMLElement>('[data-payback-tile]'),
  };
}

/**
 * Redessine la timeline.
 *
 * `roiText` est la lecture chiffrée à écrire dans la tuile — une FOURCHETTE
 * (« 4 – 8 ans ») quand l'appelant en a une, jamais l'année exacte du tracé :
 * le résultat reste en fourchettes, décision validée avec le client.
 */
export function renderPayback(
  nodes: PaybackNodes,
  kwc: number,
  options: SavingsOptions,
  roiText: string,
): void {
  const g = paybackGeometry(kwc, options);

  nodes.benefit?.setAttribute('d', g.benefit);
  nodes.curve?.setAttribute('d', g.curve);
  nodes.cost?.setAttribute('y1', String(g.costY));
  nodes.cost?.setAttribute('y2', String(g.costY));

  if (nodes.cross) {
    nodes.cross.toggleAttribute('hidden', g.crossX === null);
    /* ⚠️ Le point vit en HTML par-dessus le SVG, pas dedans : le tracé est
       étiré (`preserveAspectRatio="none"`) et y écraserait le disque en ellipse.
       On le place donc en POURCENTAGE du cadre — même projection que le
       `viewBox`, donc il retombe exactement sur la courbe. */
    nodes.cross.style.left = `${((g.crossX ?? 0) / CHART_W) * 100}%`;
    nodes.cross.style.top = `${(g.costY / CHART_H) * 100}%`;
  }

  /* ⚠️ SEULEMENT LES DEUX BORNES, pas le repère de croisement. Sur la page de
     contenu il annonce l'année exacte, ce qui est juste : elle y est affichée
     telle quelle. Ici la lecture chiffrée dit « 4 – 8 ans » — laisser l'axe
     écrire « 6 ans » à côté publierait une précision que l'estimation n'a pas. */
  const bounds = [g.marks[0], g.marks[g.marks.length - 1]];
  nodes.axis?.replaceChildren(
    ...bounds.map((year) => {
      const span = document.createElement('span');
      span.textContent = year === 1 ? 'Année 1' : `${year} ans`;
      return span;
    }),
  );

  /* L'échelle suit le projet : sans elle, la courbe changerait d'amplitude sous
     des graduations restées au cas médian du build. */
  nodes.scale.forEach((node, index) => {
    const share = [1, 0.5, 0][index] ?? 0;
    node.textContent = formatEuro(Math.round((g.maxY * share) / 100) * 100);
  });

  /* ⚠️ UN ATTRIBUT, PAS UNE CLASSE. C'était `classList.toggle('payback__item--accent')`
     — une classe stylée dans `PaybackChart`, donc PORTÉE à ce composant par
     Astro. Le compte rendu, qui rend ses tuiles lui-même, recevait bien la
     classe mais aucune règle ne s'y appliquait : l'accent n'y a jamais
     fonctionné, ni au build ni en direct. Un attribut de données se style
     depuis n'importe quel composant. */
  nodes.tile?.toggleAttribute('data-accent', g.payback !== null);
  nodes.shortfall?.toggleAttribute('hidden', g.payback !== null);

  if (nodes.years) nodes.years.textContent = roiText;
  if (nodes.gain) nodes.gain.textContent = formatEuro(Math.round(g.gain / 100) * 100);
  /* Le coût de départ vient de la MÊME géométrie que la ligne en tirets : c'est
     ce qui garantit que le chiffre écrit et le seuil dessiné sont le même. */
  if (nodes.costValue) nodes.costValue.textContent = formatEuro(g.cost);
}
