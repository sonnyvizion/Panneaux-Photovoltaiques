import { dialModel, dialPercent, dialStep, type DialAxis } from './orientation';

/**
 * Câblage du curseur orientation / inclinaison.
 *
 * ⚠️ AUCUN CALCUL ICI : `dialModel()`, `dialStep()` et `dialPercent()` sont purs
 * et testés dans `orientation.ts`. Ce fichier déplace un soleil et réécrit deux
 * nœuds déjà rendus au build.
 *
 * ⚠️ Le champ transmis reste VIDE tant que le visiteur n'a rien manipulé. C'est
 * ce qui laisse « Suivant » verrouillé dans le parcours du simulateur, où rien
 * n'est pré-coché. Sur une page de contenu, la brique n'a rien à verrouiller :
 * le même comportement y est simplement invisible.
 */

/* Doit rester d'accord avec la géométrie du composant. */
const W = 320;
const H = 170;
const CX = W / 2;
const CY = H - 26;
const SPAN = 118;
const RISE = 104;

/**
 * La position du soleil : l'abscisse suit la course du curseur, l'ORDONNÉE
 * porte le rendement.
 *
 * ⚠️ Ce n'est PAS la trajectoire réelle du soleil, et c'est délibéré. Un
 * demi-cercle parcouru de gauche à droite posait « Sud » au ras de l'horizon —
 * exactement l'inverse de ce que la brique doit montrer. Ici, plus le rendement
 * est bon, plus le soleil est haut : « Sud » culmine, « Nord » rase le sol. Sur
 * l'axe de la pente, l'optimum étant au milieu, le soleil culmine au centre et
 * redescend des deux côtés — ce qui est précisément la leçon de cet axe.
 */
export function sunPosition(index: number, count: number, quality: number): { x: number; y: number } {
  const ratio = count > 1 ? index / (count - 1) : 0.5;
  return {
    x: CX - SPAN + ratio * SPAN * 2,
    y: CY - Math.min(Math.max(quality, 0), 1) * RISE,
  };
}

function wire(root: HTMLElement): void {
  const axis = (root.dataset.dialAxis ?? 'orientation') as DialAxis;
  const range = root.querySelector<HTMLInputElement>('[data-dial-range]');
  const field = root.querySelector<HTMLInputElement>('[data-dial-value]');
  const sun = root.querySelector<SVGCircleElement>('[data-dial-sun]');
  const percent = root.querySelector<HTMLElement>('[data-dial-percent]');
  const caption = root.querySelector<HTMLElement>('[data-dial-caption]');
  const status = root.querySelector<HTMLElement>('[data-dial-status]');
  const escape = root.querySelector<HTMLElement>('[data-dial-escape]');
  if (!range || !field) return;

  const model = dialModel(axis);

  const render = (index: number, answered: boolean) => {
    const step = dialStep(axis, index);
    const { x, y } = sunPosition(index, model.steps.length, dialPercent(axis, step.value) / 100);
    sun?.setAttribute('cx', x.toFixed(1));
    sun?.setAttribute('cy', y.toFixed(1));
    root.classList.toggle('dial--unset', !answered);

    if (percent) percent.textContent = answered ? `${dialPercent(axis, step.value)} %` : '—';
    if (caption) caption.textContent = answered ? step.label : 'Déplacez le curseur';
    if (answered && status) {
      status.textContent = `${step.label} — ${dialPercent(axis, step.value)} % du rendement optimal.`;
    }
  };

  const commit = (index: number) => {
    range.value = String(index);
    field.value = dialStep(axis, index).value;
    render(index, true);
    /* `bubbles` : le simulateur écoute le formulaire, pas ce champ. Sans
       propagation, déplacer le soleil ne déverrouillerait jamais « Suivant ». */
    field.dispatchEvent(new Event('change', { bubbles: true }));
    field.dispatchEvent(new Event('input', { bubbles: true }));
  };

  range.addEventListener('input', () => commit(Number(range.value)));

  /**
   * « Je ne sais pas » écrit l'hypothèse prudente ET place le soleil dessus
   * quand elle correspond à un cran — sur l'azimut, c'est sud-est/sud-ouest. Le
   * visiteur VOIT alors ce qu'on a supposé pour lui au lieu de le deviner.
   */
  escape?.addEventListener('click', () => {
    const value = escape.dataset.dialEscape ?? model.unknown;
    const index = model.steps.findIndex((s) => s.value === value);
    field.value = value;
    if (index >= 0) commit(index);
    else {
      render(Number(range.value), true);
      if (caption) caption.textContent = 'Hypothèse prudente';
      if (percent) percent.textContent = `${dialPercent(axis, value)} %`;
      field.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  render(Number(range.value), field.value !== '');
}

export function initOrientationDials(root: ParentNode = document): void {
  for (const node of root.querySelectorAll<HTMLElement>('[data-dial]')) wire(node);
}
