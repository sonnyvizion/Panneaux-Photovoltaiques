import { easeOutCubic } from './countUp';
import {
  POWER_DEFAULT,
  POWER_MAX,
  POWER_MIN,
  clampPower,
  estimate,
  formatEuro,
  formatNumber,
  formatPower,
  powerRatio,
  type PowerEstimate,
} from './powerEstimate';

/**
 * Branche le curseur du module « Puissance installée » sur ses affichages.
 *
 * Le composant a déjà rendu l'état par défaut en HTML, chiffres compris : ce
 * script ne CONSTRUIT rien, il réécrit des nœuds de texte qui existent déjà.
 * C'est ce qui rend le module lisible et indexable sans JavaScript
 * (règle d'or #1) — et ce qui évite un clignotement au chargement, puisque rien
 * n'est réécrit tant que le visiteur n'a pas touché au curseur.
 *
 * Le calcul lui-même vit dans `powerEstimate.ts`, testé à part. Ici, le câblage
 * DOM et la POURSUITE : les chiffres ne sautent plus d'une valeur à l'autre,
 * ils y glissent.
 *
 * ⚠️ Deux vitesses cohabitent, et c'est délibéré :
 *
 *  — **immédiat** : la puissance affichée et le remplissage de la piste. Ils
 *    doivent coller au pouce, qui suit le doigt sans inertie. Les animer ferait
 *    traîner le remplissage derrière la poignée, ce qui se voit aussitôt.
 *  — **poursuivi** : les trois chiffres et la jauge de prix. Ce sont des
 *    conséquences, pas la commande — c'est là que l'inertie se lit comme de la
 *    douceur et non comme du retard.
 *
 * D'où deux variables CSS distinctes, `--power-ratio` et `--price-ratio`. Les
 * confondre remettrait le remplissage de la piste dans l'animation.
 */

/**
 * Durée de la poursuite.
 *
 * Assez longue pour que le glissement se voie, assez courte pour ne pas traîner
 * derrière le doigt — au-delà d'une demi-seconde, l'affichage ne répond plus, il
 * rattrape. Constante JS documentée plutôt que token, comme `COUNT_DURATION`
 * dans `Reassurance.astro` : c'est un réglage d'interaction, pas une valeur de
 * design réutilisable ailleurs.
 */
export const CHASE_DURATION = 320;

/** Une valeur intermédiaire entre `from` et `to`, en décélération. */
export function chase(from: number, to: number, progress: number): number {
  return from + (to - from) * easeOutCubic(progress);
}

/**
 * Position d'un prix dans la fourchette annoncée, en pourcentage.
 *
 * La jauge suit le PRIX et non la puissance : elle légende les deux bornes
 * chiffrées écrites juste en dessous. Comme le prix est quantifié au demi-millier,
 * elle avance par paliers — que la poursuite lisse, exactement comme les chiffres.
 */
export function gaugeRatio(price: number, low: number, high: number): number {
  if (high === low) return 0;
  const ratio = (price - low) / (high - low);
  return Math.min(Math.max(ratio, 0), 1) * 100;
}

/** Les nœuds d'un module. `null` si le balisage attendu manque. */
interface WidgetRefs {
  input: HTMLInputElement;
  display: HTMLElement;
  price: HTMLElement;
  panels: HTMLElement;
  production: HTMLElement;
  gauge: HTMLElement;
  status: HTMLElement;
}

function collect(root: ParentNode): WidgetRefs | null {
  const input = root.querySelector<HTMLInputElement>('[data-power-input]');
  const display = root.querySelector<HTMLElement>('[data-power-display]');
  const price = root.querySelector<HTMLElement>('[data-power-price]');
  const panels = root.querySelector<HTMLElement>('[data-power-panels]');
  const production = root.querySelector<HTMLElement>('[data-power-production]');
  const gauge = root.querySelector<HTMLElement>('[data-power-gauge]');
  const status = root.querySelector<HTMLElement>('[data-power-status]');

  if (!input || !display || !price || !panels || !production || !gauge || !status) {
    return null;
  }
  return { input, display, price, panels, production, gauge, status };
}

/**
 * Espace fine insécable (U+202F) entre un nombre et son unité.
 *
 * Écrite en séquence d'échappement et non au clavier : c'est le MÊME caractère
 * que celui du rendu serveur (`&#8239;` dans le composant), et un caractère
 * invisible qu'on ne peut pas relire dans le code est un caractère qui finit par
 * diverger. S'ils divergent, la valeur se décale au premier déplacement.
 */
const THIN_NBSP = ' ';

/** Ce qui suit le pouce sans retard : la puissance et le remplissage de la piste. */
function paintPower(refs: WidgetRefs, power: number): void {
  const label = formatPower(power);
  refs.display.textContent = label;
  /* Sans `aria-valuetext`, le curseur s'annonce « 6,4 » — un nombre nu, sans
     unité ni sens. */
  refs.input.setAttribute('aria-valuetext', label);
  refs.input.style.setProperty('--power-ratio', `${powerRatio(power)}%`);
}

/** Ce qui poursuit : les trois chiffres et la jauge. */
function paintResults(
  refs: WidgetRefs,
  value: PowerEstimate,
  low: number,
  high: number,
): void {
  refs.price.textContent = formatEuro(Math.round(value.price));
  /* Arrondi à l'entier en vol : un « 14,3 panneaux », même fugace, serait faux. */
  refs.panels.textContent = String(Math.round(value.panels));
  refs.production.textContent = `${formatNumber(Math.round(value.production))}${THIN_NBSP}kWh`;
  /* Une seule custom property par image, sans lecture de mise en page : aucun
     reflow forcé pendant le glissé. */
  refs.gauge.style.setProperty('--price-ratio', `${gaugeRatio(value.price, low, high)}%`);
}

export function initPowerWidget(root: ParentNode): void {
  const refs = collect(root);
  if (!refs) return;

  const low = estimate(POWER_MIN).price;
  const high = estimate(POWER_MAX).price;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* `current` est ce qui est AFFICHÉ, pas ce qui est demandé : c'est de là que
     repart chaque nouvelle poursuite. Sans lui, une cible qui change en cours de
     route ferait repartir l'affichage de l'ANCIENNE cible — donc un saut en
     arrière visible à chaque mouvement du doigt. */
  let current: PowerEstimate = estimate(POWER_DEFAULT);
  let from: PowerEstimate = current;
  let target: PowerEstimate = current;
  let start = 0;
  let raf = 0;

  const frame = (now: number) => {
    const progress = Math.min((now - start) / CHASE_DURATION, 1);
    current = {
      price: chase(from.price, target.price, progress),
      panels: chase(from.panels, target.panels, progress),
      production: chase(from.production, target.production, progress),
    };
    paintResults(refs, current, low, high);
    /* Remis à zéro à l'arrivée : c'est `raf` qui dit si une boucle tourne déjà.
       Sans cette remise à zéro, plus aucune poursuite ne repartirait. */
    raf = progress < 1 ? requestAnimationFrame(frame) : 0;
  };

  /* `input` et non `change` : le retour doit suivre le doigt, pas attendre le
     relâchement. Un `<input type="range">` émet `input` au clavier aussi. */
  refs.input.addEventListener('input', () => {
    const power = clampPower(Number(refs.input.value));
    paintPower(refs, power);

    const next = estimate(power);

    if (reduced.matches) {
      /* Aucune interpolation : `global.css` neutralise tout le mouvement du
         site, ce module ne fait pas exception. */
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      current = next;
      paintResults(refs, current, low, high);
      return;
    }

    from = current;
    target = next;
    start = performance.now();
    if (!raf) raf = requestAnimationFrame(frame);
  });

  /* `change` et non `input` : il ne se déclenche qu'à la FIN du glissé (et à
     chaque appui clavier). Annoncer sur `input` inonderait un lecteur d'écran de
     valeurs intermédiaires — c'est précisément pour cela que la liste des
     résultats n'est plus une région live. */
  refs.input.addEventListener('change', () => {
    const power = clampPower(Number(refs.input.value));
    const settled = estimate(power);
    refs.status.textContent =
      `${formatPower(power)} : ${formatEuro(settled.price)}, ` +
      `${settled.panels} panneaux, ${formatNumber(settled.production)} kWh par an.`;
  });
}
