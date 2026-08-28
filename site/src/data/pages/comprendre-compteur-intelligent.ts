import type { Bridge, Fact, FaqItem, Figure, SectionCopy, StackedRow, TopicCard } from '../content';

/**
 * Page 4.5 — « Compteur intelligent » (`/comprendre/compteur-intelligent`).
 * Module : aucun.
 */

export const HERO = {
  badge: 'Comprendre',
  title: "Le compteur intelligent : indispensable pour le solaire ?",
  answer:
    "Un compteur intelligent (ou communicant) mesure séparément votre consommation et votre production, ce qui est nécessaire pour bénéficier des différents mécanismes de valorisation du solaire selon votre région : tarif prosumer, tarif d’injection, certificats verts.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    "Compteur communicant à écran numérique fixé sur un mur clair, éclairé par la lumière d’une fenêtre",
} as const;

export const LEAD = {
  text: "Un objet technique qu’on remarque à peine, mais sans lequel les mécanismes régionaux — prosumer, injection, certificats verts — ne peuvent pas fonctionner.",
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: "Ce que fait ce compteur",
  intro: "Ce que fait un compteur intelligent.",
};

/* ⚠️ Même raisonnement en trois temps que sur la page Batterie : ce que fait
   l'appareil, pourquoi il est obligatoire, qui le pose. Une suite, pas un
   catalogue. */
export const FIGURES: Figure[] = [];

export const STACKED_ROWS: StackedRow[] = [
  {
    eyebrow: 'RÔLE',
    title: 'Mesurer, pas seulement compter',
    text:
      'Le compteur intelligent distingue ce que vous consommez de ce que vous injectez sur le réseau — une donnée que l’ancien compteur ne pouvait pas fournir.',
  },
  {
    eyebrow: 'OBLIGATION',
    title: 'Nécessaire pour toute installation',
    text:
      'Sans compteur communicant, les mécanismes régionaux de valorisation (tarif prosumer, tarif d’injection, certificats verts) ne peuvent pas s’activer.',
  },
  {
    eyebrow: 'GESTIONNAIRE',
    title: 'Gratuit, via votre GRD',
    text:
      'La demande et l’installation sont prises en charge par votre gestionnaire de réseau — ORES, RESA, Fluvius ou Sibelga selon votre région.',
  },
];

export const STACKED_ALT =
  'Compteur électrique communicant blanc fixé à un mur clair, son écran numérique allumé, dans la lumière rasante d’une fenêtre';

export const FACTS: Fact[] = [
  { title: "Sans lui, pas de valorisation", text: "La pose des panneaux reste possible, mais les mécanismes régionaux ne peuvent pas s’activer." },
  { title: "Il remplace l’ancien", text: "Le compteur communicant vient en remplacement du compteur analogique existant." },
];

export const BRIDGES: Bridge[] = [
  {
    title: "Les démarches diffèrent selon la région",
    text: "Wallonie, Bruxelles, Flandre : trois parcours, trois interlocuteurs.",
    cta: { label: "Voir les démarches en Wallonie", href: '/aides-primes/wallonie/demarches' },
  },
  {
    title: "En Flandre, le sujet est particulier",
    text: "Le déploiement du compteur digital conditionne tout le régime flamand actuel.",
    cta: { label: "Voir la fin du compteur inversé", href: '/aides-primes/flandre/compteur-inverse' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: "Ce qu’il faut savoir sur le compteur intelligent.",
};

export const TOPICS: TopicCard[] = [
  {
    title: "Le compteur intelligent est-il payant ?",
    text: "Non, la demande et l’installation sont généralement prises en charge par le gestionnaire de réseau.",
    accent: true,
  },
  {
    title: "Combien de temps pour l’obtenir ?",
    text: "Ça varie selon la région et le rythme de déploiement du gestionnaire de réseau — voir les pages démarches par région pour le détail.",
  },
  {
    title: "Collecte-t-il mes données en détail ?",
    text: "Il mesure les flux d’énergie nécessaires à la facturation — les modalités exactes de collecte varient selon le gestionnaire de réseau.",
  },
  {
    title: "Puis-je installer des panneaux sans lui ?",
    text: "Techniquement oui pour la pose, mais l’activation des mécanismes de valorisation — tarif d’injection, certificats verts — nécessite ce compteur.",
  },
];

export const FAQ: FaqItem[] = [
  {
    question: "Qui demande le compteur, moi ou l’installateur ?",
    answer:
      "Généralement votre installateur s’en charge avec vous, dans le cadre des démarches globales.",
    open: true,
  },
  {
    question: "Remplace-t-il mon ancien compteur ?",
    answer:
      "Oui, il vient en remplacement du compteur analogique existant.",
  },
  {
    question: "Ai-je le choix de refuser ?",
    answer:
      "Ça dépend de votre région et de la date de votre installation — voir la page « Fin du compteur inversé » pour le détail en Flandre.",
  },
];

export const FINAL_CTA = {
  title: "On s’occupe de la demande avec vous",
  text: "Le compteur fait partie des démarches que notre équipe prend en charge.",
  cta: { label: "Estimer mon installation", href: '/simulateur' },
} as const;
