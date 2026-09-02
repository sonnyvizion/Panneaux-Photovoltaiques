import type { Bridge, EssentialsPanel, Fact, FaqItem, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Contenu de la page « Réglementation bruxelloise 2026 »
 * (`/aides-primes/bruxelles/reglementation`).
 *
 * Page 1.5 du cahier de construction. Texte repris tel quel.
 *
 * ⚠️ PAS DE MODULE, et c'est le cahier qui le prescrit : « sujet réglementaire,
 * pas de variable à calculer ». Le gabarit passe donc du chapô directement à
 * « L'essentiel ». Poser un curseur ici serait de l'interactivité décorative
 * (règle d'or #5).
 *
 * ⚠️ Les deux PONTS ne viennent pas du cahier, qui n'en donne pas pour cette
 * page. Le gabarit les prévoit « si pertinent » et CLAUDE.md en fait une règle
 * d'or : une page qui annonce une obligation doit dire où lire ce qu'elle
 * conditionne.
 *
 * ⚠️ Chiffres et dates À VALIDER PAR LE CLIENT (CLAUDE.md § « À compléter »).
 */

/**
 * Ce que Google lit en tête de page — contraintes vérifiées au build
 * (`data/seo.ts`).
 *
 * Le sigle RESCert EST la requête : personne ne cherche « réglementation
 * photovoltaïque bruxelloise », tout le monde cherche « RESCert » depuis
 * l'entrée en vigueur du 1ᵉʳ janvier 2026. Le titre l'ouvre donc.
 */
export const SEO: PageSeo = {
  title: 'RESCert PV à Bruxelles : l’obligation 2026 | Belgreen',
  description:
    'Depuis le 1er janvier 2026, une installation de 5 kWc ou moins doit être posée par un installateur certifié RESCert pour donner droit aux certificats verts.',
};

export const HERO = {
  badge: 'Aides & Primes',
  title: 'RESCert PV à Bruxelles : ce qui est obligatoire depuis 2026',
  answer:
    "Depuis le 1er janvier 2026, toute nouvelle installation photovoltaïque de 5 kWc ou moins à Bruxelles doit obtenir un certificat RESCert PV délivré par un installateur certifié pour accéder aux certificats verts.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    'Toitures bruxelloises vues d’en haut, plusieurs équipées de panneaux solaires',
} as const;

export const LEAD = {
  text: "Une nouvelle règle, simple sur le papier, mais qui peut bloquer tout un dossier de certificats verts si elle est oubliée. Voici ce qu'il faut savoir.",
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui change concrètement',
  /* ⚠️ L'intro reprenait le titre MOT POUR MOT, et la carte allait le répéter
     une troisième fois. Elle dit maintenant ce que le titre ne dit pas : d'où
     vient la règle et sur quoi elle pèse. */
  intro: 'Un seul certificat commande désormais l’accès aux certificats verts en Région bruxelloise.',
};

/* ⚠️ UN SEUL FAIT, TROIS CONSÉQUENCES — donc une seule carte. « Obligatoire »,
   « Aucun CV » et « Révisés » découlent tous du même RESCert : les répartir sur
   trois cartes leur donnait une indépendance qu'ils n'ont pas, et suggérait
   trois choses à retenir là où il n'y en a qu'une. */
export const FIGURES: Figure[] = [];

/* Sans titre : celui de la section le dit déjà. */
export const PANEL: EssentialsPanel = {
  items: [
    'RESCert PV obligatoire pour toute installation ≤ 5 kWc',
    'Sans ce certificat, aucun accès aux certificats verts',
    'Coefficients de CV révisés à partir du 1ᵉʳ avril 2026 par Brugel',
  ],
};

export const FACTS: Fact[] = [
  {
    title: 'Installations existantes',
    text: 'La règle ne s’applique pas rétroactivement : seules les nouvelles installations sont concernées.',
  },
  {
    title: 'Qui délivre le certificat',
    text: 'Un installateur formé et accrédité RESCert, reconnu par la région bruxelloise.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Les certificats verts bruxellois, ça rapporte combien ?',
    text: 'C’est le mécanisme que ce certificat conditionne — sans RESCert, il n’y a rien à toucher.',
    cta: { label: 'Voir les certificats verts', href: '/aides-primes/bruxelles' },
  },
  {
    title: 'Et les démarches, dans quel ordre ?',
    text: 'Le certificat s’insère dans un parcours administratif qui passe par Sibelga.',
    cta: { label: 'Voir les démarches', href: '/aides-primes/bruxelles/demarches' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Ce que ça implique pour vous et votre installateur.',
};

/* Développements de CETTE page, sans destination au sitemap : cartes inertes. */
export const TOPICS: TopicCard[] = [
  {
    title: 'Qu’est-ce qu’un installateur certifié RESCert ?',
    text: 'Un professionnel formé et accrédité pour délivrer ce certificat de conformité, reconnu par la région bruxelloise.',
    accent: true,
  },
  {
    title: 'Que risque-t-on sans RESCert ?',
    text: "L'impossibilité d'obtenir des certificats verts, quelle que soit la qualité réelle de l'installation.",
  },
  {
    title: 'Ça change quoi pour les installations existantes ?',
    text: 'La règle s’applique aux nouvelles installations à partir de 2026 — les installations déjà en service ne sont pas concernées rétroactivement.',
  },
];

/**
 * ⚠️ RÉPONSES RALLONGÉES (2026-09-02). Les trois du cahier tenaient en une
 * ligne — « Aucun accès aux certificats verts. » Ce bloc porte le balisage
 * `FAQPage` : une réponse de six mots n'est jamais retenue en résultat enrichi,
 * et ne répond à aucune requête longue traîne. La quatrième entrée est neuve :
 * la révision des coefficients du 1ᵉʳ avril 2026 est la question que se posent
 * ceux qui hésitent à faire poser leur installation cette année (vérifié le
 * 2026-09-02 sur environnement.brussels).
 */
export const FAQ: FaqItem[] = [
  {
    question: 'Qu’est-ce qu’un installateur certifié RESCert exactement ?',
    answer:
      'Un professionnel qui a suivi la formation RESCert PV et obtenu l’accréditation reconnue par la Région bruxelloise. C’est lui — et lui seul — qui peut délivrer le certificat de conformité devenu obligatoire au 1ᵉʳ janvier 2026 pour les installations de 5 kWc ou moins.',
    open: true,
  },
  {
    question: 'Que risque-t-on si l’installateur n’est pas certifié RESCert ?',
    answer:
      'Votre installation fonctionnera normalement, mais elle ne pourra pas être certifiée par Brugel : aucun certificat vert ne vous sera octroyé, et c’est l’essentiel de l’avantage financier bruxellois qui disparaît. Vérifiez la certification AVANT de signer, pas après la pose.',
  },
  {
    question: 'Le RESCert est-il obligatoire pour les installations déjà en service ?',
    answer:
      'Non. La règle n’est pas rétroactive : elle ne vise que les installations mises en service à partir du 1ᵉʳ janvier 2026. Si la vôtre tourne déjà, vos certificats verts continuent d’être octroyés sans changement.',
  },
  {
    question: 'Les coefficients de certificats verts baissent-ils en 2026 ?',
    answer:
      'Pas pour les petites installations. Depuis le 1ᵉʳ avril 2026, Brugel applique de nouveaux coefficients aux installations mises en service après cette date : rien ne change jusqu’à 5 kWc, mais l’octroi baisse au-delà, et il disparaît complètement au-dessus de 100 kWc.',
  },
];

export const FINAL_CTA = {
  title: 'Notre équipe est certifiée RESCert',
  text: "Votre dossier est en règle dès le départ. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
