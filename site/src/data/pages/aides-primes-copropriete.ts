import type { Bridge, Fact, FaqItem, Figure, SectionCopy, StackedRow, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Contenu de la page « Installation en copropriété »
 * (`/aides-primes/copropriete`).
 *
 * Page 1.11 du cahier de construction. Texte repris tel quel.
 *
 * Module : illustration statique (famille E) — le schéma du processus de
 * décision en assemblée générale. L'image n'est pas encore livrée : le module
 * porte un emplacement étiqueté, au nom conventionnel du cahier
 * (`X.X-nom-page-module.jpg`).
 *
 * ⚠️ Le cahier note pour la FAQ « mêmes questions que ci-dessus, reformulées en
 * Q/R courtes ». Les réponses ont donc été condensées depuis « Creuser le
 * sujet » — c'est une reformulation, pas du contenu neuf.
 */

/** Métadonnées de tête de page — contraintes dans `data/seo.ts`, vérifiées au build. */
export const SEO: PageSeo = {
  title: 'Panneaux solaires en copropriété : les règles | Belgreen',
  description:
    'La toiture est une partie commune : l’installation passe par l’assemblée générale. Majorités requises, montages possibles et financement.',
};

export const HERO = {
  badge: 'Aides & Primes',
  title: 'Installer des panneaux solaires en copropriété : comment ça se décide',
  answer:
    "Installer des panneaux solaires en copropriété est possible, mais nécessite l'accord de l'assemblée générale des copropriétaires, la toiture étant une partie commune.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    'Immeuble à appartements dont la toiture plate est équipée de panneaux solaires',
} as const;

export const LEAD = {
  text: "Ce n'est pas plus compliqué qu'une autre rénovation de toiture, mais ça passe par une étape que les propriétaires individuels n'ont pas : convaincre l'assemblée.",
  note: 'Le parcours de décision, en un coup d’œil.',
} as const;

export const MODULE = {
  title: 'Du projet au vote en assemblée générale',
  caption:
    "La toiture est une partie commune : c'est l'assemblée générale qui autorise l'installation, et le règlement de copropriété qui fixe la majorité requise et la répartition de l'électricité produite.",
  bridgeLabel: 'Chiffrez le projet avant d’en parler en AG',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Table de réunion de copropriété avec documents et plan de toiture solaire',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Les trois points à trancher',
  intro: 'Ce qu’il faut savoir avant d’en parler en assemblée générale.',
};

/* ⚠️ « À vérifier », « Pas requis », « À définir » : trois cartes chiffres qui
   ne portaient aucun chiffre — et qui, pire, disaient toutes « ça dépend ».
   C'était le cas le plus vide du site. Ces trois points forment un ordre de
   marche : ce qu'il faut obtenir, ce dont on peut se passer, ce qu'il reste à
   fixer. Une suite, donc la liste empilée. */
export const FIGURES: Figure[] = [];

export const STACKED_ROWS: StackedRow[] = [
  {
    eyebrow: 'RÈGLEMENT DE COPROPRIÉTÉ',
    title: 'L’accord de l’assemblée d’abord',
    text:
      'La toiture est une partie commune : c’est l’assemblée générale qui autorise l’installation, et le règlement de copropriété qui fixe la majorité requise et la répartition de l’électricité produite.',
  },
  {
    eyebrow: 'PERMIS D’URBANISME',
    title: 'Pas toujours nécessaire',
    text:
      'Les mêmes règles qu’ailleurs s’appliquent : pas de permis si l’installation ne modifie pas l’aspect extérieur visible depuis la rue.',
  },
  {
    eyebrow: 'RÉPARTITION',
    title: 'À définir entre copropriétaires',
    text:
      'Plusieurs modèles existent, du partage égal à une répartition selon la participation financière de chacun, à fixer dans le règlement avant de lancer le projet.',
  },
];

export const STACKED_ALT =
  'Immeuble en brique de plusieurs étages dont le toit plat est entièrement couvert de panneaux solaires, avec des balcons en façade';

export const FACTS: Fact[] = [
  {
    title: 'Qui finance',
    text: 'Typiquement, seuls les copropriétaires participants financent l’installation et se partagent la production.',
  },
  {
    title: 'Le rôle du syndic',
    text: 'C’est lui qui inscrit le point à l’ordre du jour et qui connaît la majorité requise par votre règlement.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Combien coûte l’installation à répartir ?',
    text: 'Un budget clair est le meilleur argument en assemblée générale.',
    cta: { label: 'Voir les prix 2026', href: '/rentabilite-prix' },
  },
  {
    title: 'Quelles aides pour un immeuble en Wallonie ?',
    text: 'Prêt à taux 0 %, TVA réduite, tarif prosumer : les règles régionales s’appliquent aussi en copropriété.',
    cta: { label: 'Voir les aides en Wallonie', href: '/aides-primes/wallonie' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Les pages qui prolongent le sujet.',
};

/*
 * « Creuser le sujet » en CARTES-LIENS — meme motif que sur les quatorze pages
 * traitees le 2026-09-03 : ce bloc reposait les questions de la FAQ, trois
 * cents pixels plus haut. Voir `pages-contenu.md` §4 et §5.
 */
export const TOPICS: TopicCard[] = [
  {
    title: 'Le régime d’aides de votre région',
    text: 'Wallonie, Bruxelles, Flandre : trois cadres différents, qui s’appliquent aussi à l’immeuble.',
    href: '/aides-primes',
    accent: true,
  },
  {
    title: 'La pose sur toiture plate',
    text: 'Le cas le plus fréquent en immeuble : lestage, espacement des rangées, étanchéité.',
    href: '/installation/toit-plat',
  },
  {
    title: 'Ce que la toiture peut porter',
    text: 'La charge au mètre carré, et comment savoir si la structure l’encaisse.',
    href: '/installation/poids',
  },
];

/* ⚠️ Reformulations courtes des quatre entrées ci-dessus — c'est ce que
   demande le cahier pour cette page, pas des questions nouvelles. */
export const FAQ: FaqItem[] = [
  {
    question: 'Qui décide en copropriété ?',
    answer:
      'L’assemblée générale. La majorité requise dépend de votre règlement de copropriété et de la nature des travaux : votre syndic peut la confirmer.',
    open: true,
  },
  {
    question: 'Comment répartir l’électricité produite ?',
    answer:
      'Du partage égal à une répartition proportionnelle à la participation financière : le modèle se fixe en amont, dans le règlement.',
  },
  {
    question: 'Faut-il un permis d’urbanisme en copropriété ?',
    answer:
      'Pas si l’aspect extérieur visible depuis la rue reste inchangé : la règle est la même que pour une maison individuelle.',
  },
  {
    question: 'Qui paie si tous les copropriétaires n’y participent pas ?',
    answer:
      'Les copropriétaires participants financent seuls l’installation et se partagent la production.',
  },
];

export const FINAL_CTA = {
  title: 'Discutons de votre projet en copropriété',
  text: "On vous aide à préparer le dossier pour l'assemblée générale. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
