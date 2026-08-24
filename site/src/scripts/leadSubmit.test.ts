import { describe, expect, it } from 'vitest';
import { buildPayload, submitLead } from './leadSubmit';

/* Les mêmes paires qu'un `FormData` produirait, sans avoir besoin d'un DOM. */
const formWith = (fields: Record<string, string>): [string, string][] => Object.entries(fields);

describe('la demande envoyée au serveur', () => {
  it('emporte les champs saisis', () => {
    const payload = buildPayload(
      formWith({ email: 'a@b.be' }),
      'rapport',
      'bien=maison',
      'https://belgreen.be',
      '/rapport',
    );
    expect(payload.fields.email).toBe('a@b.be');
    expect(payload.variant).toBe('rapport');
    expect(payload.source).toBe('/rapport');
  });

  /* ⚠️ L'INVARIANT DU RAPPORT : le serveur doit pouvoir fabriquer le PDF sans
     rien recalculer. Il n'a qu'à ouvrir cette adresse et l'imprimer. */
  it('donne au serveur l’adresse exacte du document à imprimer', () => {
    const payload = buildPayload(
      formWith({ email: 'a@b.be' }),
      'rapport',
      'region=bruxelles&bien=maison',
      'https://belgreen.be',
      '/rapport',
    );
    expect(payload.document).toBe(
      'https://belgreen.be/rapport/document?region=bruxelles&bien=maison',
    );
  });

  it('reste valide quand le visiteur arrive sans réponses', () => {
    const payload = buildPayload(formWith({ email: 'a@b.be' }), 'rapport', '', 'https://x.be', '/rapport');
    expect(payload.document).toBe('https://x.be/rapport/document');
    expect(payload.answers).toBe('');
  });

  /* Les réponses voyagent dans leur propre champ ; les laisser AUSSI dans les
     champs saisis obligerait le serveur à trier ce qui est saisie et ce qui est
     contexte. */
  it('ne duplique pas les réponses dans les champs saisis', () => {
    const payload = buildPayload(
      formWith({ email: 'a@b.be', reponses: 'bien=maison' }),
      'rapport',
      'bien=maison',
      'https://x.be',
      '/rapport',
    );
    expect(payload.fields.reponses).toBeUndefined();
    expect(payload.answers).toBe('bien=maison');
  });
});

describe('l’envoi ne ment jamais sur son issue', () => {
  /* ⚠️ Aucun endpoint n'est configuré tant que l'hébergeur n'est pas choisi.
     Répondre « sent » ici afficherait un remerciement sans qu'aucun e-mail ne
     parte — le prospect serait perdu, et personne ne s'en apercevrait. */
  it('dit « non configuré » plutôt que « envoyé » quand l’endpoint manque', async () => {
    const payload = buildPayload(formWith({}), 'rapport', '', 'https://x.be', '/rapport');
    await expect(submitLead(payload)).resolves.toBe('unconfigured');
  });
});
