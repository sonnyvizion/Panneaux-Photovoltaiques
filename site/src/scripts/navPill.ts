/**
 * Pilule de navigation qui suit le survol.
 *
 * Ce module ne fait que MESURER et POSER des positions. Durée, courbes et
 * étirement vivent entièrement dans le CSS de `NavBar.astro` : la pilule est
 * posée en `left`/`right`, dont les deux transitions ont des courbes
 * différentes. Le décalage entre ces deux courbes EST l'allongement en cours de
 * trajet — il n'y a pas d'image-clé « milieu » à calculer ici, et rien à
 * reprendre quand un survol en interrompt un autre : la transition CSS repart
 * seule de la valeur en cours.
 *
 * Corollaire utile : le bloc `prefers-reduced-motion` de `global.css`, qui force
 * `transition-duration: 0.01ms !important`, neutralise le mouvement sans qu'on
 * ait à le tester ici. Une animation WAAPI y aurait échappé.
 */

/** Le strict nécessaire d'un `DOMRect` — de quoi tester sans DOM. */
export interface Rect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/** Les quatre bords, chacun mesuré depuis le bord homologue du conteneur. */
export interface PillEdges {
  left: number;
  /** Distance depuis le bord DROIT du conteneur — c'est la propriété `right`. */
  right: number;
  top: number;
  /** Distance depuis le bord BAS du conteneur. */
  bottom: number;
}

export type Direction = 'left' | 'right';

/**
 * Position d'une entrée dans son conteneur, exprimée en quatre bords.
 *
 * Horizontalement, on renvoie `right` mesuré depuis la droite, et NON une
 * largeur : ce sont les deux bords qui doivent pouvoir se déplacer
 * indépendamment pour que la pilule s'étire. Avec une largeur, les deux
 * extrémités resteraient solidaires et il n'y aurait pas d'étirement du tout.
 *
 * Verticalement, on mesure plutôt que de recalculer en CSS : la hauteur visible
 * d'une entrée dépend du jeu entre le padding de la liste et la marge négative
 * des liens. Toute retouche de l'un des deux décalerait une valeur écrite en dur.
 *
 * Aucun arrondi : les largeurs de texte sont fractionnaires, et arrondir
 * décalerait chaque bord d'un demi-pixel — visible sur un aplat de couleur.
 */
export function pillEdges(container: Rect, item: Rect): PillEdges {
  return {
    left: item.left - container.left,
    right: container.right - item.right,
    top: item.top - container.top,
    bottom: container.bottom - item.bottom,
  };
}

/**
 * Sens du trajet, qui décide quel bord reçoit la courbe « avant ».
 *
 * À égalité, on conserve le sens précédent : revenir sur l'entrée déjà occupée
 * ne doit pas réattribuer les courbes, sans quoi les deux bords échangeraient
 * leur rôle au milieu d'une transition en cours.
 */
export function travelDirection(
  previousLeft: number,
  nextLeft: number,
  previous: Direction,
): Direction {
  if (nextLeft === previousLeft) return previous;
  return nextLeft > previousLeft ? 'right' : 'left';
}

/**
 * Branche le voile de survol sur la barre de navigation.
 *
 * Il n'y a rien ici sur l'entrée COURANTE : son fond lime est posé en CSS pur
 * par `.header__link.is-active` et ne dépend pas de ce script. Le voile ne fait
 * que suivre le curseur, et disparaît quand rien n'est survolé.
 *
 * Progressive enhancement gratuit : sans JavaScript, le lime reste et le voile
 * — invisible par défaut, révélé par `is-visible` — ne paraît jamais.
 */
export function initNavPill(list: HTMLElement): void {
  const pill = list.querySelector<HTMLElement>('.header__pill');
  if (!pill) return;

  const items = Array.from(list.querySelectorAll<HTMLElement>('.header__link'));
  if (items.length === 0) return;

  const finePointer = window.matchMedia('(pointer: fine)');

  let direction: Direction = 'right';
  let left = 0;
  let current: HTMLElement | null = null;

  /**
   * Passe au foncé le texte de l'entrée que le voile occupe.
   *
   * Sur le hero les libellés sont blancs : posés sur le voile clair, ils
   * tomberaient à ~1,2:1. L'entrée courante, elle, n'a pas besoin de ce
   * traitement — son lime porte déjà sa propre couleur de texte en CSS.
   */
  const light = (item: HTMLElement | null) => {
    for (const other of items) other.classList.toggle('is-lit', other === item);
  };

  const place = (item: HTMLElement) => {
    const edges = pillEdges(list.getBoundingClientRect(), item.getBoundingClientRect());
    direction = travelDirection(left, edges.left, direction);
    left = edges.left;
    current = item;
    light(item);

    pill.dataset.dir = direction;
    pill.style.setProperty('--pill-left', `${edges.left}px`);
    pill.style.setProperty('--pill-right', `${edges.right}px`);
    pill.style.setProperty('--pill-top', `${edges.top}px`);
    pill.style.setProperty('--pill-bottom', `${edges.bottom}px`);
  };

  /**
   * Pose la pilule sans transition, le temps d'une frame.
   *
   * Sert à la faire NAÎTRE sur l'entrée survolée quand la page n'a pas d'entrée
   * courante : sans ça, elle traverserait toute la barre depuis sa position
   * initiale en apparaissant.
   */
  const placeInstantly = (item: HTMLElement) => {
    pill.classList.add('is-instant');
    place(item);
    // Forcer le recalcul : sans cette lecture, le navigateur regroupe la pose et
    // le retrait de la classe dans le même style et la transition part quand même.
    void pill.offsetWidth;
    pill.classList.remove('is-instant');
  };

  const show = (item: HTMLElement) => {
    if (item === current) return;
    if (pill.classList.contains('is-visible')) {
      place(item);
    } else {
      placeInstantly(item);
      pill.classList.add('is-visible');
    }
  };

  /**
   * Le voile n'a pas de gîte : il disparaît dès que rien n'est survolé.
   *
   * C'est le lime de `.is-active` qui tient le repos, en CSS pur — le voile
   * n'a donc jamais à revenir se poser quelque part, ni sur cette page ni sur
   * une page sans entrée courante. Un seul comportement partout.
   */
  const rest = () => {
    pill.classList.remove('is-visible');
    light(null);
    current = null;
  };

  for (const item of items) {
    // Survol sous pointeur fin seulement (règle d'or #6), clavier sans garde :
    // même couple d'écouteurs que l'accordéon des piliers.
    item.addEventListener('pointerenter', () => {
      if (finePointer.matches) show(item);
    });
    item.addEventListener('focusin', () => show(item));
  }

  list.addEventListener('pointerleave', rest);
  list.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (!list.contains(document.activeElement)) rest();
    });
  });

  /** Repositionnement sans transition — la pilule n'a pas à voyager sur un resize. */
  const reposition = () => {
    if (current) placeInstantly(current);
  };

  let ticking = false;
  window.addEventListener(
    'resize',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        reposition();
        ticking = false;
      });
    },
    { passive: true },
  );

  // Circular Std est un woff2 local : les libellés changent de largeur quand il
  // arrive, et le voile resterait calé sur les métriques de la police de repli.
  // Sans rien de survolé, `current` est nul et l'appel ne fait rien.
  document.fonts?.ready.then(reposition);
}
