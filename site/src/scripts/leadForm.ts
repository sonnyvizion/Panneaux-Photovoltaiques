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
