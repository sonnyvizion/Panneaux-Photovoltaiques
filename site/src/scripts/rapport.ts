import { hasReportAnswers } from './reportParams';

/**
 * `/rapport` — la page qui envoie l'estimation par e-mail.
 *
 * ⚠️ ELLE N'A DE SENS QU'ACCOMPAGNÉE DE RÉPONSES. Le compte rendu du simulateur
 * les lui transmet dans l'URL ; un visiteur qui arrive par un lien direct — un
 * partage, un favori, un e-mail de relance — n'en a aucune. Lui présenter le
 * formulaire reviendrait à lui envoyer le cas médian du build en le faisant
 * passer pour son estimation.
 *
 * ⚠️ On ne masque pas le formulaire par prudence excessive : on le remplace par
 * la seule chose utile à ce visiteur-là, l'entrée du simulateur.
 *
 * ⚠️ Rendu au build, masqué par `hidden` : sans JavaScript, c'est le formulaire
 * qui reste visible — le comportement le moins surprenant des deux.
 */
export function initReportPage(root: ParentNode = document): void {
  const missing = root.querySelector<HTMLElement>('[data-report-missing]');
  const available = root.querySelector<HTMLElement>('[data-report-available]');
  if (!missing || !available) return;

  const answered = hasReportAnswers(
    typeof window === 'undefined' ? '' : window.location.search,
  );
  missing.hidden = answered;
  available.hidden = !answered;
}
