import { easeOutCubic } from './countUp';
import { CALCULATOR_MODELS, type CalculatorName } from './calculators/registry';
import type { CalculatorModel } from './calculators/types';

/**
 * Branche un module de la famille A sur ses affichages.
 *
 * Généralisation de `powerWidget.ts` et `loanWidget.ts`, qui faisaient la même
 * chose à la formule près (registre des modules, famille A). Le calcul vit dans
 * un modèle — `scripts/calculators/` — testé à part ; ici, uniquement le câblage
 * DOM et la POURSUITE.
 *
 * Le composant a déjà rendu l'état par défaut en HTML, chiffres compris : ce
 * script ne CONSTRUIT rien, il réécrit des nœuds de texte qui existent déjà.
 * C'est ce qui rend le module lisible et indexable sans JavaScript (règle d'or
 * #1) — et ce qui évite un clignotement au chargement, puisque rien n'est
 * réécrit tant que le visiteur n'a pas touché au curseur.
 *
 * ⚠️ Deux vitesses cohabitent, et c'est délibéré :
 *
 *  — **immédiat** : le libellé de l'entrée et le remplissage de la piste. Ils
 *    doivent coller au pouce, qui suit le doigt sans inertie. Les animer ferait
 *    traîner le remplissage derrière la poignée, ce qui se voit aussitôt.
 *  — **poursuivi** : les valeurs de sortie et la jauge. Ce sont des
 *    conséquences, pas la commande — c'est là que l'inertie se lit comme de la
 *    douceur et non comme du retard.
 *
 * D'où deux variables CSS distinctes, `--slider-ratio` et `--gauge-ratio`. Les
 * confondre remettrait le remplissage de la piste dans l'animation.
 */

/**
 * Durée de la poursuite.
 *
 * Assez longue pour que le glissement se voie, assez courte pour ne pas traîner
 * derrière le doigt — au-delà d'une demi-seconde, l'affichage ne répond plus, il
 * rattrape. Constante JS documentée plutôt que token : c'est un réglage
 * d'interaction, pas une valeur de design réutilisable ailleurs.
 */
export const CHASE_DURATION = 320;

/** Une valeur intermédiaire entre `from` et `to`, en décélération. */
export function chase(from: number, to: number, progress: number): number {
  return from + (to - from) * easeOutCubic(progress);
}

/** Les nœuds d'un module. `null` si le balisage attendu manque. */
interface CalculatorRefs {
  root: HTMLElement;
  input: HTMLInputElement;
  label: HTMLElement;
  outputs: HTMLElement[];
  options: HTMLInputElement[];
  caption: HTMLElement | null;
  gauge: HTMLElement;
  status: HTMLElement;
}

function collect(root: HTMLElement): CalculatorRefs | null {
  const input = root.querySelector<HTMLInputElement>('[data-calc-input]');
  const label = root.querySelector<HTMLElement>('[data-calc-label]');
  const outputs = Array.from(root.querySelectorAll<HTMLElement>('[data-calc-output]'));
  const options = Array.from(root.querySelectorAll<HTMLInputElement>('[data-calc-option]'));
  const gauge = root.querySelector<HTMLElement>('[data-calc-gauge]');
  const status = root.querySelector<HTMLElement>('[data-calc-status]');

  if (!input || !label || !gauge || !status || outputs.length === 0) return null;

  return {
    root,
    input,
    label,
    outputs,
    options,
    caption: root.querySelector<HTMLElement>('[data-calc-caption]'),
    gauge,
    status,
  };
}

/**
 * L'option cochée.
 *
 * `0` quand le module n'a pas de groupe d'options : les modèles qui n'en ont pas
 * ignorent le paramètre, et ceux qui en ont un le reçoivent toujours coché — le
 * composant rend un `checked` par défaut dans le HTML.
 */
function selectedOption(refs: CalculatorRefs): number {
  if (refs.options.length === 0) return 0;
  const checked = refs.options.find((option) => option.checked);
  return Number(checked?.value ?? refs.options[0].value);
}

export function initSliderCalculator(root: ParentNode = document): void {
  for (const node of root.querySelectorAll<HTMLElement>('[data-calc]')) {
    const name = node.dataset.calc as CalculatorName | undefined;
    const model = name ? CALCULATOR_MODELS[name] : undefined;
    /* Un nom inconnu laisse le module en l'état plutôt que de jeter : le HTML
       rendu au build reste juste et lisible, seul l'interactif manque. */
    if (model) wire(node, model);
  }
}

function wire(node: HTMLElement, model: CalculatorModel): void {
  const refs = collect(node);
  if (!refs) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const read = () => ({
    slider: model.clamp(Number(refs.input.value)),
    option: selectedOption(refs),
  });

  const start0 = read();
  /* `current` est ce qui est AFFICHÉ, pas ce qui est demandé : c'est de là que
     repart chaque poursuite. Sans lui, une cible qui change en cours de route
     ferait repartir l'affichage de l'ANCIENNE cible — donc un saut en arrière
     visible à chaque mouvement du doigt. */
  let current = model.values(start0.slider, start0.option);
  let currentGauge = model.gaugeRatio(current, start0.slider, start0.option);
  let from = current;
  let fromGauge = currentGauge;
  let target = current;
  let targetGauge = currentGauge;
  let option = start0.option;
  let raf = 0;
  let started = 0;

  const paintOutputs = () => {
    const text = model.format(current, option);
    refs.outputs.forEach((node, index) => {
      if (text[index] !== undefined) node.textContent = text[index];
    });
    /* Une seule custom property par image, sans lecture de mise en page : aucun
       reflow forcé pendant le glissé. */
    refs.gauge.style.setProperty('--gauge-ratio', `${currentGauge}%`);
  };

  const frame = (now: number) => {
    const progress = Math.min((now - started) / CHASE_DURATION, 1);
    current = target.map((value, index) => chase(from[index] ?? value, value, progress));
    currentGauge = chase(fromGauge, targetGauge, progress);
    paintOutputs();
    /* Remis à zéro à l'arrivée : c'est `raf` qui dit si une boucle tourne déjà. */
    raf = progress < 1 ? requestAnimationFrame(frame) : 0;
  };

  const update = () => {
    const { slider, option: next } = read();
    option = next;

    /* Ce qui suit le pouce sans retard. */
    const label = model.inputLabel(slider);
    refs.label.textContent = label;
    /* Sans `aria-valuetext`, le curseur s'annonce « 22500 » — un nombre nu, sans
       unité ni devise. */
    refs.input.setAttribute('aria-valuetext', label);
    refs.input.style.setProperty('--slider-ratio', `${model.sliderRatio(slider)}%`);
    if (refs.caption && model.caption) refs.caption.textContent = model.caption(option);

    const nextValues = model.values(slider, option);
    const nextGauge = model.gaugeRatio(nextValues, slider, option);

    if (reduced.matches) {
      /* Aucune interpolation : `global.css` neutralise tout le mouvement du
         site, ces modules ne font pas exception. */
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      current = nextValues;
      currentGauge = nextGauge;
      paintOutputs();
      return;
    }

    from = current;
    fromGauge = currentGauge;
    target = nextValues;
    targetGauge = nextGauge;
    started = performance.now();
    if (!raf) raf = requestAnimationFrame(frame);
  };

  const announce = () => {
    const { slider, option: current } = read();
    refs.status.textContent = model.announce(slider, current);
  };

  /* `input` et non `change` : le retour doit suivre le doigt, pas attendre le
     relâchement. Un `<input type="range">` émet `input` au clavier aussi. */
  refs.input.addEventListener('input', update);

  /* `change` et non `input` sur l'annonce : il ne se déclenche qu'à la FIN du
     glissé (et à chaque appui clavier). Annoncer sur `input` inonderait un
     lecteur d'écran de valeurs intermédiaires — c'est précisément pour cela que
     la liste des résultats n'est pas une région live. */
  refs.input.addEventListener('change', announce);

  /* Les boutons radio n'émettent qu'un `change` : un choix est discret, il n'a
     pas d'états intermédiaires à annoncer. */
  for (const node of refs.options) {
    node.addEventListener('change', () => {
      update();
      announce();
    });
  }
}
