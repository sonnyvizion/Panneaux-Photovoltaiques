/**
 * La mesure d'audience — le seul fichier du site qui sache qu'elle existe.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ SANS COOKIE, ET C'EST UNE DÉCISION, PAS UN HASARD. L'outil retenu est
 * Plausible (client, 2026-09-04) : il compte les visites et les événements sans
 * déposer de cookie, sans identifiant persistant et sans suivi entre sites. Le
 * site n'a donc **pas** de bandeau de consentement, parce qu'il n'y a rien à
 * consentir — voir `/cookies`, qui le dit au visiteur.
 *
 * Trois conséquences qu'on perd de vue si on ne les écrit pas :
 *
 *  1. On mesure **100 % des visiteurs**, là où un bandeau ne laisse mesurer que
 *     ceux qui acceptent. Sur un site dont tout l'objet est de trouver où le
 *     parcours casse, une mesure partielle est une mesure biaisée.
 *  2. ~1 Ko de JavaScript, contre ~90 Ko pour GA4. La règle d'or n°1 du projet
 *     (perf & SEO d'abord) n'est pas négociable, et un tag lourd la mange.
 *  3. Le discours « pas d'intermédiaire, pas de revente de données » reste
 *     tenable. Il ne le serait qu'à moitié avec une régie sur chaque page.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ⚠️ LA COUTURE DE LA PHASE PUBLICITAIRE EST ICI. Google Ads et Meta sont
 * prévus, sans calendrier, et eux imposeront des cookies et donc un bandeau.
 * Le jour venu, un `consent.ts` portera l'état du consentement et c'est CE
 * module qui refusera de charger la moindre balise avant un accord explicite.
 * Aucun appelant n'aura à changer : ils appellent `track()`, rien d'autre.
 *
 * ⚠️ Le blocage devra être RÉEL. Une balise chargée « en attendant le clic »
 * a déjà déposé ses cookies : c'est l'erreur la plus répandue, et c'est celle
 * qui rend un bandeau illégal.
 */

/** Ce que le script tiers pose sur `window`. */
export interface Measured {
  plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
}

/**
 * Les événements du site, tels que `funnel.md` les a nommés.
 *
 * ⚠️ Liste FERMÉE, et c'est le point. Un nom d'événement inventé au fil de
 * l'eau produit deux compteurs pour une même chose et une statistique qui ne
 * veut rien dire trois mois plus tard. Ajouter un événement se fait ici, en
 * regard du tableau de `funnel.md`.
 */
export type TrackedEvent =
  /** Le visiteur quitte la première question : le parcours est commencé. */
  | 'simulator_started'
  /** Une étape atteinte, avec son rang — c'est lui qui dit OÙ ça bloque. */
  | 'simulator_step'
  /** Le compte rendu est affiché. */
  | 'simulator_completed'
  /** Une demande de rapport est partie. */
  | 'pdf_requested'
  /** Une demande de devis ou d'étude est partie. */
  | 'quote_form_submitted'
  /** Une région a été choisie, au hero ou dans l'en-tête. */
  | 'region_selected'
  /** Une recherche interne n'a rien donné : un trou de contenu, nommé. */
  | 'search_no_results';

/**
 * Envoie un événement, si et seulement si la mesure est en place.
 *
 * @param props Propriétés Plausible. ⚠️ Elles n'existent pas dans l'offre
 * d'entrée : si l'abonnement ne les couvre pas, `simulator_step` devra se
 * replier sur des noms d'événements distincts par étape.
 * @param scope Injecté par les tests. En production c'est `window`.
 */
export function track(
  event: TrackedEvent,
  props?: Record<string, string>,
  scope: Measured = typeof window === 'undefined' ? {} : (window as Measured),
): void {
  const send = scope.plausible;
  /* Pas de script, pas de mesure, pas de bruit. C'est le cas de la démo, des
     tests, du développement local — et de tout visiteur qui bloque les scripts
     tiers, ce qui est son droit. */
  if (typeof send !== 'function') return;

  /* Plausible n'accepte que des chaînes en valeur de propriété. Un nombre passé
     tel quel est refusé côté serveur, silencieusement : l'événement arrive sans
     sa propriété, et le rapport est vide sans que rien n'ait signalé d'erreur. */
  const entries = Object.entries(props ?? {}).map(([key, value]) => [key, String(value)]);
  const payload = entries.length > 0 ? { props: Object.fromEntries(entries) } : undefined;

  try {
    send(event, payload);
  } catch {
    /* ⚠️ SILENCE VOLONTAIRE. Une mesure ne doit jamais emporter la
       fonctionnalité qu'elle observe : si le compteur casse, le simulateur
       continue. L'inverse serait une régression payée par le visiteur pour un
       chiffre destiné à nous seuls. */
  }
}
