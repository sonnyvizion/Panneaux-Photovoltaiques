/**
 * Ce que devient une demande, entre le clic du visiteur et deux courriels.
 *
 * ⚠️ LOGIQUE PURE, VOLONTAIREMENT. La fonction serveur qui appelle Brevo
 * (`functions/api/lead.ts`) ne fait que du transport : lire, valider, poster,
 * répondre. Tout ce qui se décide — ce qui est refusé, ce qui est écrit, à qui —
 * vit ici, où les tests l'atteignent sans réseau ni environnement Cloudflare.
 *
 * ⚠️ AUCUNE CLÉ NI ADRESSE ICI. Ce fichier est importable depuis le navigateur
 * sans risque : il ne connaît ni la clé d'API, ni l'adresse de l'équipe, qui
 * sont des variables d'environnement lues côté serveur uniquement.
 */

export interface LeadPayload {
  /** `devis` · `etude` · `rapport` · `contact` — ce que le visiteur demande. */
  variant: string;
  /** Les champs saisis. */
  fields: Record<string, string>;
  /** Les réponses du simulateur, telles qu'elles voyagent dans les URLs. */
  answers: string;
  /** L'adresse de la page à imprimer pour produire le PDF. */
  document: string;
  /** La page d'où part la demande — utile pour l'attribution. */
  source: string;
}

/** Les demandes que le site sait produire. Tout le reste est refusé. */
const VARIANTS = new Set(['devis', 'etude', 'rapport', 'contact']);

/** Ce que chaque variante raconte, dans les deux courriels. */
const INTENT: Record<string, string> = {
  devis: 'une demande de devis',
  etude: 'une demande d’étude personnalisée',
  rapport: 'une demande de rapport détaillé',
  contact: 'un message via le formulaire de contact',
};

/** Libellés des champs du formulaire, dans l'ordre où on veut les lire. */
const LABELS: [string, string][] = [
  ['prenom', 'Prénom'],
  ['nom', 'Nom'],
  ['email', 'E-mail'],
  ['telephone', 'Téléphone'],
  ['adresse', 'Adresse'],
  ['statut', 'Statut'],
  ['objectif', 'Objectif'],
  ['horizon', 'Horizon'],
  ['budget', 'Budget'],
  ['rdv', 'Rendez-vous'],
  ['creneau', 'Créneau'],
];

/**
 * ⚠️ CHAMP PIÈGE. Invisible pour un humain, vide par construction. Un robot qui
 * remplit tout le formulaire le remplit aussi, et sa demande est jetée. C'est la
 * défense la moins chère qui existe — et la seule qui ne coûte rien au visiteur :
 * ni script tiers, ni image à déchiffrer, ni consentement à demander.
 *
 * Si le spam passe malgré tout, l'étape suivante est Cloudflare Turnstile, qui
 * s'ajoute sans rien retirer d'ici.
 */
export const HONEYPOT_FIELD = 'site';

/** Au-delà, ce n'est plus un formulaire, c'est une charge. */
const MAX_FIELD = 2000;
const MAX_TOTAL = 8000;

/**
 * Ce qui cloche, en une liste de mots-clés. Vide = la demande passe.
 *
 * ⚠️ Renvoie des CLÉS, pas des phrases : ce retour part dans les journaux du
 * serveur, jamais à l'écran. Le visiteur, lui, voit un message unique — détailler
 * quel garde-fou a bloqué renseignerait surtout les robots.
 */
export function validateLead(payload: LeadPayload): string[] {
  const problems: string[] = [];
  const fields = payload.fields ?? {};

  if (!VARIANTS.has(payload.variant)) problems.push('variant');
  if (fields[HONEYPOT_FIELD]) problems.push('piege');

  const email = (fields.email ?? '').trim();
  /* Volontairement permissif : un point après l'arobase et pas d'espace. Une
     expression plus stricte rejette des adresses valides, et le vrai contrôle
     est de toute façon que le message arrive. */
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) problems.push('email');

  const values = Object.values(fields);
  if (values.some((value) => value.length > MAX_FIELD)) problems.push('taille');
  if (values.join('').length > MAX_TOTAL) problems.push('taille');

  return problems;
}

export interface Mail {
  subject: string;
  text: string;
  html: string;
}

const fullName = (fields: Record<string, string>) =>
  [fields.prenom, fields.nom].filter(Boolean).join(' ').trim();

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Le même contenu en texte et en HTML : les deux partent, le client choisit. */
function render(lines: string[]): { text: string; html: string } {
  return {
    text: lines.join('\n'),
    html: lines
      .map((line) => (line ? `<p style="margin:0 0 12px">${escape(line)}</p>` : ''))
      .join('\n'),
  };
}

/** Le courriel qui part à l'équipe : tout, dans l'ordre, sans mise en scène. */
export function teamEmail(payload: LeadPayload): Mail {
  const fields = payload.fields ?? {};
  const name = fullName(fields) || 'Sans nom';
  const intent = INTENT[payload.variant] ?? payload.variant;

  const lines = [`${name} a envoyé ${intent}.`, ''];

  for (const [key, label] of LABELS) {
    if (fields[key]) lines.push(`${label} : ${fields[key]}`);
  }

  /* Les champs qu'on n'a pas prévus ne se perdent pas : un formulaire qui gagne
     une question ne doit pas la voir disparaître en silence côté équipe. */
  const known = new Set([...LABELS.map(([key]) => key), HONEYPOT_FIELD, 'reponses']);
  for (const [key, value] of Object.entries(fields)) {
    if (!known.has(key) && value) lines.push(`${key} : ${value}`);
  }

  lines.push('', `Demande envoyée depuis ${payload.source || 'une page inconnue'}.`);

  if (payload.document && payload.answers) {
    lines.push(
      '',
      'Son estimation, telle qu’il l’a vue, et prête à imprimer :',
      payload.document,
    );
  } else {
    lines.push('', 'Cette personne n’est pas passée par le simulateur.');
  }

  return { subject: `${intent[0].toUpperCase()}${intent.slice(1)} — ${name}`, ...render(lines) };
}

/**
 * L'accusé de réception du visiteur.
 *
 * ⚠️ NE PROMET AUCUN DÉLAI D'AMORTISSEMENT, ni aucun chiffre. Le rapport porte
 * les chiffres, avec ses hypothèses ; un courriel qui les répéterait sans elles
 * deviendrait une promesse commerciale détachée de son contexte.
 *
 * ⚠️ Renvoie `null` faute d'adresse. Sans elle il n'y a personne à qui écrire,
 * et ce n'est pas une erreur : la demande de l'équipe part quand même.
 */
export function visitorEmail(payload: LeadPayload): Mail | null {
  const fields = payload.fields ?? {};
  const email = (fields.email ?? '').trim();
  if (!email) return null;

  const prenom = fields.prenom?.trim();
  const lines = [
    prenom ? `Bonjour ${prenom},` : 'Bonjour,',
    '',
    'Nous avons bien reçu votre demande et nous vous répondons rapidement.',
  ];

  if (payload.document && payload.answers) {
    lines.push(
      '',
      'Votre estimation reste consultable à cette adresse, et vous pouvez l’enregistrer en PDF depuis votre navigateur :',
      payload.document,
      '',
      'Elle repose sur les réponses que vous avez données et sur des hypothèses de calcul publiées sur le site. C’est un ordre de grandeur, pas un devis : seule une étude sur place permet de chiffrer précisément votre toiture.',
    );
  }

  lines.push(
    '',
    'Une précision qui compte : votre demande arrive directement chez nous. Nous ne sommes pas un intermédiaire, et vos coordonnées ne sont transmises à personne. C’est l’équipe qui installera vos panneaux qui vous rappellera.',
  );

  return { subject: 'Votre demande est bien arrivée', ...render(lines) };
}
