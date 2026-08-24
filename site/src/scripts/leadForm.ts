/**
 * Écran Q du brief — le filtrage de profil, sur les formulaires de sortie.
 *
 * ⚠️ Le simulateur CALCULE, il ne QUALIFIE pas : ce tri n'existe qu'ici, une
 * fois le résultat obtenu et le visiteur volontaire.
 *
 * ⚠️ Progressive enhancement : les messages sont rendus au build et masqués par
 * `hidden`. Sans JavaScript, le formulaire reste entièrement utilisable — on
 * perd le message adapté, pas le parcours.
 *
 * ⚠️ Le LOCATAIRE n'est pas éconduit. Il ne peut pas engager de travaux, donc on
 * ne lui demande pas de rendez-vous ; on lui laisse le rapport par e-mail, qui
 * lui sert d'argument auprès de son propriétaire. C'est le seul cas où l'on
 * retire un bouton, et c'est par honnêteté, pas par tri commercial.
 */

import { buildPayload, submitLead, type LeadState } from './leadSubmit';

/** Les messages à révéler pour un statut donné. */
export function messageFor(statut: string): string | null {
  if (statut === 'locataire') return 'locataire';
  if (statut === 'copropriete') return 'copropriete';
  return null;
}

export function initLeadForm(root: ParentNode = document): void {
  const form = root.querySelector<HTMLFormElement>('[data-lead-form]');
  if (!form) return;

  const notices = [...root.querySelectorAll<HTMLElement>('[data-lead-notice]')];
  const submit = root.querySelector<HTMLElement>('[data-lead-submit]');

  /* ── L'envoi ──────────────────────────────────────────────────────────
     ⚠️ Il se branche AVANT le tri de profil : `initLeadForm` renonçait jusqu'ici
     dès qu'un formulaire n'avait pas de message de statut — or `/rapport` n'en a
     aucun (il ne demande que l'e-mail). Le brancher après aurait laissé la seule
     sortie ouverte à tous les profils sans aucun envoi. */
  const answersField = root.querySelector<HTMLInputElement>('[data-lead-answers]');
  const states = [...root.querySelectorAll<HTMLElement>('[data-lead-state]')];
  const button = root.querySelector<HTMLButtonElement>('[data-lead-button]');
  const variant = form.dataset.leadVariant ?? 'rapport';

  /* Les réponses du simulateur arrivent par l'URL — le compte rendu les y a
     mises. Sans elles, la demande de rapport ne sait pas quoi envoyer. */
  const answers = typeof window === 'undefined' ? '' : window.location.search.replace(/^\?/, '');
  if (answersField) answersField.value = answers;

  const paint = (state: LeadState) => {
    for (const node of states) node.hidden = node.dataset.leadState !== state;
    /* Le bouton disparaît une fois la demande partie : le laisser inviterait à
       la renvoyer, et le visiteur ne saurait pas si la première a compté. */
    if (submit) submit.hidden = state === 'sending' || state === 'sent';
    if (button) button.disabled = state === 'sending';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    /* `novalidate` est posé sur le formulaire pour garder la main sur les
       messages ; la validation native reste disponible à la demande. */
    if (!form.reportValidity()) return;

    paint('sending');
    const origin = typeof window === 'undefined' ? '' : window.location.origin;
    const path = typeof window === 'undefined' ? '' : window.location.pathname;
    paint(await submitLead(buildPayload(new FormData(form), variant, answers, origin, path)));
  });

  if (!notices.length) return;

  const apply = () => {
    const statut = String(new FormData(form).get('statut') ?? '');
    const active = messageFor(statut);
    for (const notice of notices) notice.hidden = notice.dataset.leadNotice !== active;
    /* Un locataire ne peut pas commander l'installation : on ne lui propose pas
       un rendez-vous qu'il ne pourra pas honorer. */
    if (submit) submit.hidden = statut === 'locataire';
  };

  form.addEventListener('change', apply);
  apply();
}
