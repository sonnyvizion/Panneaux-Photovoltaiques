/**
 * Verrou de défilement du corps de page, partagé entre plusieurs surfaces.
 *
 * ⚠️ POURQUOI UN MODULE ET PAS `document.body.style.overflow = 'hidden'`.
 * Deux surfaces couvrent l'écran et doivent bloquer la page derrière elles : le
 * panneau mobile de la nav et l'overlay de recherche. Or on ouvre la recherche
 * DEPUIS le panneau, donc les deux sont posées en même temps. Écrit en direct,
 * le premier déverrouillage rendrait le défilement au corps de page alors que
 * l'autre surface est toujours ouverte — et la page filerait derrière elle,
 * exactement le défaut que le verrou existe pour empêcher.
 *
 * ⚠️ DES DÉTENTEURS NOMMÉS, ET NON UN COMPTEUR. Un compteur suppose que chaque
 * appelant s'apparie parfaitement : un `lock` de trop et le verrou ne se lève
 * plus jamais ; un `unlock` de trop et une surface VOLE le verrou de l'autre.
 * Ce second cas n'a rien de théorique — l'événement `close` d'un `<dialog>` peut
 * tirer plus d'une fois, et il aurait alors déverrouillé la page pour le panneau
 * mobile resté ouvert.
 *
 * Avec un ensemble de noms, les deux opérations sont idempotentes par
 * construction : verrouiller deux fois sous le même nom ne fait rien, et
 * déverrouiller un nom qui ne détient rien ne fait rien non plus. Il n'y a plus
 * d'appariement à tenir juste, donc plus de fuite possible.
 *
 * `overflow` et non `position: fixed` : c'est ce que le panneau posait déjà, et
 * la bascule en `fixed` ferait perdre la position de défilement au retour.
 */

/** Qui bloque le défilement en ce moment. */
const holders = new Set<string>();

function apply(body: HTMLElement): void {
  body.style.overflow = holders.size > 0 ? 'hidden' : '';
}

/**
 * Bloque le défilement au nom de `owner`.
 *
 * Idempotent : deux appels sous le même nom valent un seul verrou.
 */
export function lock(owner: string, body: HTMLElement = document.body): void {
  holders.add(owner);
  apply(body);
}

/**
 * Rend le verrou de `owner`. La page ne redéfile qu'une fois le DERNIER rendu.
 *
 * Idempotent, et surtout inoffensif pour les autres : déverrouiller un nom qui
 * ne détient rien ne touche pas aux détenteurs restants.
 */
export function unlock(owner: string, body: HTMLElement = document.body): void {
  holders.delete(owner);
  apply(body);
}

/** Les détenteurs courants — pour les tests, et pour eux seuls. */
export function lockHolders(): string[] {
  return [...holders];
}

/** Remise à zéro, réservée aux tests : l'ensemble est un singleton de module. */
export function resetScrollLock(body?: HTMLElement): void {
  holders.clear();
  if (body) body.style.overflow = '';
}
