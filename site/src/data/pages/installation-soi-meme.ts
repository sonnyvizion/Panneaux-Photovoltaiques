import type { Bridge, FaqItem, Fact, SectionCopy, TopicCard } from '../content';

/**
 * Page 2.17 — « Installer soi-même » (`/installation/soi-meme`).
 *
 * Module : les deux colonnes « permis / pas permis » (famille F), rendues par
 * `TopicCards` en deux colonnes avec listes internes. C'est ce qui a motivé
 * l'ajout d'`items` à `TopicCard` : ce sont des éléments distincts à énumérer,
 * pas un paragraphe.
 *
 * ⚠️ « L'essentiel » ne porte pas de cartes chiffres : le cahier y décrit
 * exactement les deux colonnes du module. Les rendre deux fois aurait dupliqué
 * la même information — même arbitrage que sur la page « Fixation ».
 *
 * ⚠️ CTA FINAL À CONFIRMER PAR LE CLIENT. Le cahier le signale lui-même : « CTA
 * différent, service partiel — à confirmer que Belgreen le propose ». La page
 * propose donc « Nous contacter » et NON une promesse de service : le texte
 * demande d'en parler, il n'affirme pas que le service existe.
 */

export const HERO = {
  badge: 'Installation',
  title: 'Peut-on installer ses panneaux solaires soi-même ?',
  answer:
    'Poser soi-même des panneaux solaires sur sa toiture est légal en Belgique, mais le raccordement électrique et le contrôle de conformité RGIE doivent obligatoirement être réalisés par un professionnel avant la mise en service.',
  cta: { label: 'Voir la limite exacte', href: '#limite-autoinstallation' },
  imageAlt: 'Particulier manipulant un panneau solaire sur une toiture',
} as const;

export const LEAD = {
  text: 'Ni totalement interdit, ni totalement libre — voici la limite précise entre ce que vous pouvez faire vous-même et ce qui doit passer par un professionnel.',
  note: 'La limite, des deux côtés.',
} as const;

export const LIMIT_COPY: SectionCopy = {
  overline: 'La limite',
  title: 'Ce qui est permis, ce qui ne l’est pas',
  intro: 'Deux colonnes, une frontière nette.',
};

export const LIMIT: TopicCard[] = [
  {
    title: 'Permis en autonomie',
    text: 'Vous pouvez le faire vous-même, sans professionnel :',
    items: [
      'Poser les panneaux sur la toiture ou la façade',
      'Installer un kit plug & play homologué',
    ],
    accent: true,
  },
  {
    title: 'Pas permis sans professionnel',
    text: 'Ces trois opérations exigent un professionnel qualifié :',
    items: [
      'Le raccordement au tableau électrique',
      'Le contrôle de conformité RGIE',
      'L’installation d’une batterie domestique (interdit en auto-installation depuis la révision RGIE 2025)',
    ],
  },
];

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce que ça change vraiment',
  intro: 'Ce qu’il faut savoir avant de se lancer soi-même.',
};

export const FACTS: Fact[] = [
  {
    title: 'L’économie est partielle',
    text: 'Le raccordement et le contrôle restent facturés — le gain porte surtout sur la main-d’œuvre de pose.',
  },
  {
    title: 'Un contrôle négatif bloque tout',
    text: 'Tant que les corrections n’ont pas été faites par un professionnel, la mise en service est impossible.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Le kit plug & play, lui, est libre',
    text: 'C’est la seule installation qu’on pose et branche entièrement soi-même, en toute légalité.',
    cta: { label: 'Voir le kit de balcon', href: '/installation/balcon' },
  },
  {
    title: 'Comment juger le professionnel qui vous complète ?',
    text: 'Même pour un raccordement seul, les critères de choix restent les mêmes.',
    cta: { label: 'Voir les critères', href: '/installation/trouver-un-installateur' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Ce qu’il faut savoir avant de se lancer soi-même.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Puis-je vraiment poser mes panneaux moi-même légalement ?',
    text: 'Oui, la pose physique sur la toiture est autorisée — c’est le raccordement électrique et le contrôle qui nécessitent un professionnel.',
    accent: true,
  },
  {
    title: 'Que dois-je absolument faire faire par un professionnel ?',
    text: 'Le raccordement au tableau électrique et le contrôle RGIE, obligatoires avant toute mise en service, quel que soit qui a posé les panneaux.',
  },
  {
    title: 'Que risque-t-on en cas de contrôle RGIE négatif ?',
    text: 'Une non-conformité qui empêche la mise en service tant que les corrections nécessaires n’ont pas été faites par un professionnel.',
  },
  {
    title: 'Ça fait vraiment économiser, au final ?',
    text: 'Une partie du coût seulement, puisque le raccordement et le contrôle restent obligatoirement facturés — le gain porte surtout sur la main-d’œuvre de pose elle-même.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Puis-je vraiment poser mes panneaux moi-même légalement ?',
    answer:
      'Oui pour la pose physique. Le raccordement électrique et le contrôle RGIE, eux, exigent un professionnel.',
    open: true,
  },
  {
    question: 'Que dois-je absolument faire faire par un professionnel ?',
    answer:
      'Le raccordement au tableau électrique et le contrôle RGIE, obligatoires avant toute mise en service.',
  },
  {
    question: 'Que risque-t-on en cas de contrôle RGIE négatif ?',
    answer:
      'La mise en service est bloquée tant qu’un professionnel n’a pas apporté les corrections nécessaires.',
  },
  {
    question: 'L’auto-installation, ça fait vraiment économiser de l’argent au final ?',
    answer:
      'En partie seulement : raccordement et contrôle restent facturés. Le gain porte sur la main-d’œuvre de pose.',
  },
];

export const FINAL_CTA = {
  title: 'Vous posez vous-même ? Parlons du raccordement',
  text: "Dites-nous où vous en êtes, on vous dira ce qu'on peut prendre en charge.",
  cta: { label: 'Nous contacter', href: '/contact' },
} as const;
