import { describe, expect, it } from 'vitest';
import { teamEmail, validateLead, visitorEmail, type LeadPayload } from './leadMail';

const lead = (over: Partial<LeadPayload> = {}): LeadPayload => ({
  variant: 'etude',
  fields: {
    prenom: 'Camille',
    nom: 'Dubois',
    email: 'camille@example.be',
    telephone: '0470 12 34 56',
    adresse: 'Rue de la Station 4, 5000 Namur',
  },
  answers: 'etape=resultat&region=wallonie&puissance=6',
  document: 'https://exemple.be/rapport/document?region=wallonie',
  source: '/simulateur',
  ...over,
});

describe('validateLead', () => {
  it('accepte une demande complète', () => {
    expect(validateLead(lead())).toEqual([]);
  });

  it('refuse une adresse e-mail absente ou manifestement fausse', () => {
    expect(validateLead(lead({ fields: { prenom: 'Camille' } }))).toContain('email');
    expect(validateLead(lead({ fields: { email: 'camille' } }))).toContain('email');
    expect(validateLead(lead({ fields: { email: 'a@b' } }))).toContain('email');
  });

  it('refuse une variante inconnue', () => {
    expect(validateLead(lead({ variant: 'n’importe quoi' }))).toContain('variant');
  });

  /* ⚠️ LE PIÈGE À ROBOTS. Le champ `site` est invisible pour un humain et vide
     par construction ; un robot qui remplit tout le formulaire le remplit aussi.
     C'est la défense la moins chère qui existe, et elle ne coûte rien au
     visiteur — ni script tiers, ni image à déchiffrer, ni consentement. */
  it('refuse une demande dont le champ piège est rempli', () => {
    expect(validateLead(lead({ fields: { email: 'a@b.be', site: 'http://spam' } }))).toContain(
      'piege',
    );
  });

  it('refuse une charge utile démesurée', () => {
    expect(validateLead(lead({ fields: { email: 'a@b.be', nom: 'x'.repeat(5000) } }))).toContain(
      'taille',
    );
  });
});

describe('teamEmail', () => {
  it('nomme le demandeur et sa demande dans le sujet', () => {
    const mail = teamEmail(lead());
    expect(mail.subject).toContain('Camille Dubois');
    expect(mail.subject.toLowerCase()).toContain('étude');
  });

  it('reprend TOUS les champs saisis, sans en perdre un', () => {
    const mail = teamEmail(lead());
    for (const value of Object.values(lead().fields)) {
      expect(mail.text).toContain(value);
    }
  });

  it('porte le lien du rapport, pour rappeler le contexte du visiteur', () => {
    expect(teamEmail(lead()).text).toContain('https://exemple.be/rapport/document');
  });

  it('dit d’où vient la demande', () => {
    expect(teamEmail(lead()).text).toContain('/simulateur');
  });

  /* Une demande sans passage par le simulateur reste valable : le formulaire de
     contact n'en produit pas. Le courriel ne doit pas afficher un lien mort. */
  it('n’annonce pas de rapport quand il n’y a pas eu de simulation', () => {
    const mail = teamEmail(lead({ answers: '', document: '' }));
    expect(mail.text).not.toContain('rapport/document');
  });
});

describe('visitorEmail', () => {
  it('tutoie le sujet sans promettre de délai', () => {
    const mail = visitorEmail(lead())!;
    expect(mail.subject).toBeTruthy();
    expect(mail.text).not.toMatch(/\b\d+ ans\b/);
  });

  it('donne au visiteur le lien de SON rapport', () => {
    expect(visitorEmail(lead())!.text).toContain('https://exemple.be/rapport/document');
  });

  /* ⚠️ Sans simulation, pas de rapport à envoyer — mais la demande, elle, doit
     quand même être confirmée. Un accusé de réception qui pointe vers rien
     inquiète plus qu'il ne rassure. */
  it('confirme quand même une demande sans rapport', () => {
    const mail = visitorEmail(lead({ answers: '', document: '' }))!;
    expect(mail.text).not.toContain('rapport/document');
    expect(mail.text.length).toBeGreaterThan(80);
  });

  it('porte l’argument central du site', () => {
    expect(visitorEmail(lead())!.text.toLowerCase()).toContain('intermédiaire');
  });

  it('n’écrit à personne sans adresse', () => {
    expect(visitorEmail(lead({ fields: { prenom: 'Camille' } }))).toBeNull();
  });
});
