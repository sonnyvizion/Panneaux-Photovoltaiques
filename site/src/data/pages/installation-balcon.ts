import type { Bridge, Fact, FaqItem, Figure, SectionCopy, StackedRow, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 2.14 — « Balcon » (`/installation/balcon`).
 *
 * ⚠️ SEULE PAGE DU SITE QUI S'ADRESSE AUX LOCATAIRES. Le cahier le dit
 * explicitement, et le pont final en tire la conséquence : « ton plus doux, pas
 * le CTA simulateur classique — ce public n'est pas prioritairement
 * propriétaire ».
 *
 * Ce que ça change ici : le CTA du hero et celui du pont final ne promettent pas
 * une estimation d'installation. Envoyer un locataire dans un funnel de devis
 * résidentiel produirait un lead inexploitable pour le client ET une déception
 * pour le visiteur — c'est exactement le contraire de « leads qualifiés »
 * (CLAUDE.md). Le pont final conditionne explicitement : « vous êtes
 * propriétaire ? ».
 *
 * ⚠️ Module : illustration du kit plug & play, non livrée
 * (`2.14-balcon-module.jpg`). La photo du hero sert de fond.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 *
 * La description porte les DEUX conditions qui décident de la légalité — la
 * date et le plafond de 800 W. C'est ce que le visiteur cherche à vérifier
 * avant d'acheter, et ce qu'aucun titre seul ne peut dire.
 */
export const SEO: PageSeo = {
  title: 'Panneau solaire de balcon : le kit plug & play | Belgreen',
  description:
    'Légal en Belgique depuis avril 2025 : un kit plug & play homologué, dans la limite de 800 W, s’installe sans professionnel — même quand vous êtes locataire.',
};

export const HERO = {
  badge: 'Installation',
  title: 'Panneau solaire de balcon : le kit plug & play',
  /* ⚠️ Le plafond de 800 W et l'homologation Synergrid C10/26 sont les DEUX
     conditions qui rendent le kit légal ; la réponse-clé les annonçait sans
     elles, ce qui laissait croire que n'importe quel kit convient. Vérifié le
     2026-09-02 (Test-Achats, Synergrid, Batibouw). */
  answer:
    'Depuis avril 2025, un kit solaire « plug & play » homologué Synergrid peut être installé sur un balcon sans professionnel en Belgique, dans la limite de 800 W cumulés par ménage — une solution accessible aux locataires.',
  /* ⚠️ Pas « Estimer mon installation » : le lecteur type de cette page est
     locataire, et ce CTA lui promettrait un service qui ne le concerne pas. */
  cta: { label: 'Voir les conditions', href: '#essentiel-balcon' },
  imageAlt: 'Panneau solaire compact fixé à la rambarde d’un balcon d’appartement',
} as const;

export const LEAD = {
  text: 'La seule page de ce site qui s’adresse vraiment aux locataires, pas seulement aux propriétaires — une vraie option d’entrée dans le solaire, à petite échelle.',
  note: 'Le kit, en une image.',
} as const;

export const MODULE = {
  title: 'Un kit qui se branche sur une prise',
  caption:
    'Un ou deux panneaux, un micro-onduleur intégré, et une prise domestique standard : le kit plug & play s’installe sans professionnel et se démonte aussi facilement. Il doit être homologué et figurer sur la liste Synergrid — c’est ce qui le rend légal depuis avril 2025.',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Avant d’installer un kit',
  intro: 'Ce qu’il faut savoir avant d’installer un kit plug & play.',
};

/* ⚠️ « Avril 2025 » est une vraie date, mais « Sans pro » et « Obligatoire »
   n'étaient pas des grandeurs. La date reste, dans le texte de sa ligne, où
   elle est enfin accompagnée de sa condition. */
export const FIGURES: Figure[] = [];

export const STACKED_ROWS: StackedRow[] = [
  {
    eyebrow: 'LÉGAL DEPUIS',
    title: 'Avril 2025, sous conditions',
    text:
      'Un kit plug & play homologué et listé Synergrid peut être installé sans professionnel.',
  },
  {
    eyebrow: 'INSTALLATION',
    title: 'Auto-installable, prise standard',
    text:
      'Se branche directement sur une prise domestique, se démonte tout aussi facilement.',
  },
  {
    eyebrow: 'DÉCLARATION',
    title: 'Obligatoire au GRD, quelle que soit la puissance',
    text:
      'Même un kit modeste doit être déclaré comme nouvelle production d’énergie.',
  },
];

/* Photo en cours de génération : emplacement nommé en attendant. */
export const STACKED_IMAGE = 'balcon-liste.jpg';

export const FACTS: Fact[] = [
  {
    title: 'Demandez l’accord',
    text: 'Vérifiez auprès du propriétaire et, en copropriété, auprès de l’ACP avant d’installer quoi que ce soit.',
  },
  {
    title: 'Il vous suit',
    text: 'Le kit est démontable et transportable — c’est un de ses avantages sur une installation fixe.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Vous êtes en copropriété ?',
    text: 'Même pour un kit de balcon, l’accord de l’assemblée peut être requis selon le règlement.',
    cta: { label: 'Voir la copropriété', href: '/aides-primes/copropriete' },
  },
  {
    title: 'Vous êtes propriétaire ?',
    text: 'Une installation complète en toiture n’a rien à voir en puissance et en rentabilité.',
    cta: { label: 'Voir les prix 2026', href: '/rentabilite-prix' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Ce qu’il faut vérifier avant d’acheter un kit.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Un locataire peut-il vraiment installer des panneaux ?',
    text: 'Oui, avec un kit plug & play homologué — mais mieux vaut vérifier auprès du propriétaire et, en copropriété, auprès de l’ACP avant de l’installer.',
    accent: true,
  },
  {
    title: 'Le kit plug & play est-il rentable ?',
    text: 'Sur une petite échelle, oui, mais avec un retour sur investissement plus long qu’une installation complète, vu la puissance limitée.',
  },
  {
    title: 'Dois-je déclarer mon kit même s’il est petit ?',
    text: 'Oui, la déclaration « nouvelle production d’énergie » au GRD est obligatoire quelle que soit la puissance, même minime.',
  },
  {
    title: 'Que se passe-t-il si je déménage ?',
    text: 'Le kit est démontable et transportable — c’est un de ses avantages par rapport à une installation fixe.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Un locataire peut-il vraiment installer des panneaux solaires ?',
    answer:
      'Oui, avec un kit plug & play homologué. Vérifiez tout de même auprès du propriétaire, et de l’ACP en copropriété.',
    open: true,
  },
  {
    question: 'Un kit solaire de balcon est-il rentable ?',
    answer:
      'À petite échelle oui, mais le retour sur investissement est plus long qu’avec une installation complète : le plafond de 800 W limite mécaniquement ce que le kit peut couvrir de votre consommation.',
  },
  {
    /* ⚠️ La réponse précédente généralisait l'obligation à toute la Belgique.
       Elle vaut en Wallonie (notification à ORES, RESA, AIEG ou AIESH selon la
       commune) ; la Flandre n'impose pas d'enregistrement pour un kit dans les
       limites prévues. Vérifié le 2026-09-02. */
    question: 'Dois-je déclarer mon kit de balcon au gestionnaire de réseau ?',
    answer:
      'En Wallonie, oui : chaque appareil se notifie à votre gestionnaire de réseau, quelle que soit sa puissance. La Flandre ne l’impose pas pour un kit qui reste dans les limites prévues. Dans les deux cas, le kit doit être homologué et rester sous les 800 W cumulés.',
  },
  {
    question: 'Que se passe-t-il si je déménage ?',
    answer: 'Vous l’emportez : le kit est démontable et transportable.',
  },
];

/* ⚠️ Pont conditionnel, pas un CTA générique : il ne s'adresse qu'à la part du
   lectorat que le funnel devis concerne réellement. */
export const FINAL_CTA = {
  overline: 'Et si vous êtes propriétaire',
  title: 'Vous voulez une vraie installation ?',
  text: "Si vous êtes propriétaire, une installation en toiture change d'échelle — et là, on peut chiffrer.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
