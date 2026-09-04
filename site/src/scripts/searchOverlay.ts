import { hasEstimateIntent, search, type SearchEntry, type SearchResult } from './search';
import { track } from './analytics';
import { lock, unlock } from './scrollLock';
import { getSmoothScroll } from './smoothScroll';

/**
 * Câblage de l'overlay de recherche — tout le DOM, aucun classement.
 *
 * ⚠️ CE MODULE N'EST JAMAIS DANS LE BUNDLE INITIAL. `NavBar.astro` l'appelle en
 * `import()` dynamique au premier geste de recherche ; l'index n'est `fetch()`
 * qu'à cet instant. Une page qui n'ouvre pas la loupe ne télécharge ni ce
 * fichier ni les 23 Ko de l'index (règle d'or #1). Un import statique depuis
 * `BaseLayout` l'enverrait sur les 55 pages — c'est l'erreur à ne pas commettre
 * en le déplaçant.
 *
 * Le classement vit dans `search.ts`, testé sans DOM. Ici, il n'y a que du
 * branchement.
 */

const INDEX_URL = '/search-index.json';

/** Nom sous lequel la recherche tient le verrou de défilement. */
const LOCK_OWNER = 'recherche';

let dialog: HTMLDialogElement | null = null;
let input: HTMLInputElement | null = null;
let results: HTMLElement | null = null;
let intro: HTMLElement | null = null;
let empty: HTMLElement | null = null;
let echo: HTMLElement | null = null;
let status: HTMLElement | null = null;
let action: HTMLElement | null = null;

/** Le survol ne pilote la sélection qu'au pointeur fin (règle d'or #6). */
const finePointer = window.matchMedia('(pointer: fine)');

/** L'index, chargé une fois et gardé — la promesse sert aussi de verrou. */
let indexPromise: Promise<SearchEntry[]> | null = null;
let entries: SearchEntry[] = [];
let active = -1;
let wired = false;
/** L'élément qui avait le focus avant l'ouverture — on le lui rend. */
let opener: HTMLElement | null = null;

function loadIndex(): Promise<SearchEntry[]> {
  indexPromise ??= fetch(INDEX_URL)
    .then((response) => {
      if (!response.ok) throw new Error(`search-index: HTTP ${response.status}`);
      return response.json() as Promise<SearchEntry[]>;
    })
    .then((loaded) => {
      entries = loaded;
      return loaded;
    })
    .catch((error) => {
      /* Un index injoignable ne doit pas casser la page : la recherche reste
         ouverte, vide, avec ses sujets populaires et ses deux portes de sortie.
         La promesse est remise à zéro pour qu'une seconde tentative reparte. */
      console.error('Recherche indisponible :', error);
      indexPromise = null;
      return [];
    });
  return indexPromise;
}

/** Les options actuellement rendues — l'ordre du DOM fait foi. */
const options = (): HTMLAnchorElement[] =>
  results ? Array.from(results.querySelectorAll<HTMLAnchorElement>('.search__result')) : [];

/**
 * Désigne la ligne qu'Entrée ouvrira.
 *
 * `aria-activedescendant` et non le focus : le focus doit RESTER dans le champ,
 * sinon la frappe suivante ne s'y écrit plus. C'est le motif combobox — le champ
 * garde le focus, l'attribut dit au lecteur d'écran quelle option est courante.
 */
function setActive(next: number): void {
  const items = options();
  active = items.length === 0 ? -1 : Math.max(0, Math.min(next, items.length - 1));

  items.forEach((item, index) => {
    const current = index === active;
    item.classList.toggle('is-active', current);
    item.setAttribute('aria-selected', String(current));
    if (current) {
      input?.setAttribute('aria-activedescendant', item.id);
      item.scrollIntoView({ block: 'nearest' });
    }
  });

  if (active === -1) input?.removeAttribute('aria-activedescendant');
}

function resultNode(result: SearchResult, index: number): HTMLLIElement {
  const { entry } = result;
  const li = document.createElement('li');
  li.setAttribute('role', 'presentation');

  const link = document.createElement('a');
  link.className = 'search__result';
  link.href = entry.href;
  link.id = `search-result-${index}`;
  link.setAttribute('role', 'option');
  link.setAttribute('aria-selected', 'false');

  /* `textContent` partout, jamais `innerHTML` : les titres portent des
     apostrophes typographiques et des esperluettes, et rien de ce qui vient de
     l'index n'a à être interprété comme du balisage. */
  const pillar = document.createElement('span');
  pillar.className = 'search__result-pillar';
  pillar.textContent = entry.pillar;

  const title = document.createElement('span');
  title.className = 'search__result-title';
  title.textContent = entry.label;

  link.append(pillar, title);

  if (entry.answer) {
    const answer = document.createElement('span');
    answer.className = 'search__result-answer';
    answer.textContent = entry.answer;
    link.append(answer);
  }

  li.append(link);
  return li;
}

/** Le compte, dit à voix haute. Un lecteur d'écran ne voit pas la liste changer. */
function announce(count: number, query: string): void {
  if (!status) return;
  if (query.trim() === '') status.textContent = '';
  else if (count === 0) status.textContent = 'Aucun résultat.';
  else status.textContent = `${count} résultat${count > 1 ? 's' : ''}.`;
}

function render(query: string): void {
  if (!results || !intro || !empty || !action) return;

  const trimmed = query.trim();
  const found = trimmed === '' ? [] : search(entries, trimmed);

  intro.hidden = trimmed !== '';
  results.hidden = found.length === 0;
  empty.hidden = !(trimmed !== '' && found.length === 0);
  action.hidden = !(trimmed !== '' && hasEstimateIntent(trimmed));

  if (echo && !empty.hidden) echo.textContent = `« ${trimmed} »`;

  results.replaceChildren(...found.map(resultNode));
  input?.setAttribute('aria-expanded', String(found.length > 0));

  /* La première ligne est présélectionnée : Entrée ouvre le meilleur résultat
     sans aucune flèche, ce qui est le geste le plus fréquent. */
  setActive(found.length > 0 ? 0 : -1);
  announce(found.length, trimmed);

  /**
   * ⚠️ ON NE MESURE QUE L'ÉCHEC, et c'est délibéré. Une recherche qui aboutit
   * n'apprend rien qu'on ne sache déjà : la page existe. Une recherche SANS
   * RÉSULTAT nomme un contenu que le visiteur attendait et qu'on n'a pas
   * écrit. C'est le détecteur de trous de contenu le moins cher du projet.
   *
   * ⚠️ Le seuil de trois caractères évite de compter les frappes en cours :
   * sans lui, « p », « pa », « pan » remonteraient tous comme des échecs, et
   * le rapport ne dirait plus rien.
   *
   * La requête part avec l'événement, sans quoi il ne resterait qu'un compteur
   * d'échecs sans le mot cherché — inexploitable. C'est écrit dans
   * `/confidentialite`.
   */
  if (found.length === 0 && trimmed.length >= 3) {
    track('search_no_results', { requete: trimmed });
  }
}

function onKeydown(event: KeyboardEvent): void {
  const items = options();

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    setActive(active + 1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    setActive(active - 1);
  } else if (event.key === 'Enter') {
    /* Le formulaire n'a pas d'action : sans cette interception, Entrée le
       soumettrait et rechargerait la page en perdant la recherche. */
    event.preventDefault();
    items[active]?.click();
  }
}

function wire(): void {
  if (wired) return;

  dialog = document.querySelector<HTMLDialogElement>('#site-search');
  if (!dialog) return;

  input = dialog.querySelector('[data-search-input]');
  results = dialog.querySelector('[data-search-results]');
  intro = dialog.querySelector('[data-search-intro]');
  empty = dialog.querySelector('[data-search-empty]');
  echo = dialog.querySelector('[data-search-echo]');
  status = dialog.querySelector('[data-search-status]');
  action = dialog.querySelector('[data-search-action]');

  input?.addEventListener('input', () => render(input?.value ?? ''));
  input?.addEventListener('keydown', onKeydown);

  /* Survoler un résultat le rend ACTIF.
   *
   * ⚠️ Deux défauts en un. Sans cela, la première ligne — présélectionnée pour
   * qu'Entrée ouvre le meilleur résultat sans toucher aux flèches — gardait son
   * fond pendant qu'on en survolait une autre : deux lignes paraissaient
   * retenues en même temps. Et surtout, la ligne mise en avant n'était plus
   * celle qu'Entrée ouvrait — on pouvait survoler la troisième et ouvrir la
   * première.
   *
   * Délégué sur la liste plutôt que posé sur chaque ligne : elles sont
   * reconstruites à chaque frappe, un écouteur par ligne serait reposé des
   * dizaines de fois. `pointerover` et non `pointerenter`, qui ne remonte pas.
   *
   * Pointeur fin uniquement (règle d'or #6) : au doigt, un `pointerover` précède
   * le tap et déplacerait la sélection juste avant de naviguer, sans que
   * personne ne le voie. */
  results?.addEventListener('pointerover', (event) => {
    if (!finePointer.matches) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const item = target.closest('.search__result');
    if (!item) return;
    const index = options().indexOf(item as HTMLAnchorElement);
    if (index !== -1) setActive(index);
  });

  dialog.querySelector('[data-search-close]')?.addEventListener('click', () => dialog?.close());

  /* Clic hors de la fenêtre. Un `<dialog>` couvre tout l'écran, fond compris :
     le seul moyen de distinguer les deux est de comparer le point cliqué à ses
     bords — `event.target === dialog` seul se déclencherait aussi sur les
     marges intérieures. */
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    const outside =
      event.clientX < box.left || event.clientX > box.right ||
      event.clientY < box.top || event.clientY > box.bottom;
    if (outside) dialog.close();
  });

  /* Un seul point de sortie : `close` couvre le bouton, le clic extérieur ET
     Échap (que le `<dialog>` traite nativement). Poser le déverrouillage sur
     chacun d'eux en oublierait un. */
  dialog.addEventListener('close', () => {
    unlock(LOCK_OWNER);
    getSmoothScroll()?.start();
    if (input) input.value = '';
    render('');

    /* ⚠️ LE FOCUS NE REVIENT PAS TOUT SEUL. On attend d'un `<dialog>` modal
       qu'il rende le focus à l'élément qui l'a ouvert ; mesuré au navigateur,
       il reste sur le champ de recherche — c'est-à-dire DANS un dialogue
       fermé, donc invisible.

       Deux conséquences, l'une et l'autre constatées : la tabulation repart
       d'un point que l'utilisateur ne voit pas, et le raccourci « / » cesse de
       fonctionner, son garde-fou « ne pas capturer pendant une saisie » voyant
       un `<input>` toujours actif.

       ⚠️ FAIT DEUX FOIS, tout de suite ET différé. Le navigateur poursuit sa
       propre gestion du focus après cet écouteur et peut écraser ce qu'on y
       pose ; mais l'inverse s'observe aussi, selon le chemin de fermeture. Les
       deux passes sont idempotentes et coûtent une ligne — les faire toutes les
       deux évite de parier sur un ordre qui varie d'un moteur à l'autre.

       `setTimeout` et non `requestAnimationFrame` : un onglet en arrière-plan
       ne peint plus, donc ne déclenche plus de frame — or c'est exactement là
       qu'un focus resté dans un dialogue fermé traînerait le plus longtemps.

       `blur()` avant de rendre le focus : sans lui, un `opener` non focusable
       (le `<body>`, quand la recherche a été ouverte au raccourci depuis la
       page) laisserait le focus là où il est, dans le dialogue fermé. */
    const previous = opener;
    opener = null;

    const restoreFocus = () => {
      input?.blur();
      if (previous?.isConnected && previous !== document.body) previous.focus();
    };
    restoreFocus();
    setTimeout(restoreFocus, 0);
  });

  wired = true;
}

/**
 * Ouvre la recherche. Idempotent : le premier appel câble tout.
 *
 * `showModal()` et non `show()` : c'est lui qui apporte le fond, le piège de
 * focus, l'inertie du reste de la page, Échap, et la couche supérieure — donc
 * le passage au-dessus du panneau mobile et du burger épinglé.
 *
 * ⚠️ Le verrou de défilement RESTE nécessaire malgré le modal : iOS laisse
 * défiler le corps de page derrière un `<dialog>`. Il est pris sous un NOM, car
 * la recherche s'ouvre depuis le panneau mobile, déjà verrouillé de son côté —
 * chacun rend le sien sans toucher à celui de l'autre.
 */
export async function openSearch(): Promise<void> {
  wire();
  if (!dialog || dialog.open) return;

  opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  lock(LOCK_OWNER);

  /* ⚠️ INDISPENSABLE EN PLUS DU VERROU. `body { overflow: hidden }` ne bloque
     que le défilement NATIF ; Lenis, lui, déplace la page en JavaScript sur les
     événements de molette et passe donc au travers. Sur un trackpad de MacBook,
     faire défiler les résultats faisait filer la page floutée derrière le
     dialogue. Constaté à l'usage — invisible pour un test qui lit
     `body.style.overflow` au lieu d'envoyer une vraie molette.

     `?.` : Lenis n'existe pas au doigt, sous 1024px, ni en mouvement réduit. */
  getSmoothScroll()?.stop();

  dialog.showModal();
  input?.focus();

  await loadIndex();
  /* L'index arrive peut-être après les premières lettres : on rejoue la
     requête telle qu'elle est MAINTENANT, sinon la frappe la plus rapide
     resterait sans résultat. */
  if (dialog.open) render(input?.value ?? '');
}
