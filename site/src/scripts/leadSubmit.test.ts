import { describe, expect, it, vi } from 'vitest';
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
  const payload = () => buildPayload(formWith({}), 'rapport', '', 'https://x.be', '/rapport');

  /**
   * ⚠️ 503 SIGNIFIE « PAS ENCORE ARMÉ », pas « en panne ». La fonction serveur
   * répond ainsi tant que la clé Brevo n'est pas posée. Traduire cela en
   * « envoyé » afficherait un remerciement sans qu'aucun courriel ne parte : le
   * prospect serait perdu, et personne ne s'en apercevrait avant des semaines.
   * Le traduire en « erreur » inviterait à réessayer en vain.
   */
  it('dit « non configuré » quand le serveur n’est pas encore armé', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{}', { status: 503 }));

    await expect(submitLead(payload())).resolves.toBe('unconfigured');
    fetchSpy.mockRestore();
  });

  it('dit « envoyé » quand le serveur a bien pris la demande', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{"ok":true}', { status: 200 }));

    await expect(submitLead(payload())).resolves.toBe('sent');
    fetchSpy.mockRestore();
  });

  it('dit « erreur » sur un refus, et ne lève jamais', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockRejectedValue(new Error('réseau coupé'));

    await expect(submitLead(payload())).resolves.toBe('error');
    fetchSpy.mockRestore();
  });
});
