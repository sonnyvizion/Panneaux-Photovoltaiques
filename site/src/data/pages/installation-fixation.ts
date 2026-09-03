import type { Bridge, FaqItem, Fact, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 2.7 — « Fixation » (`/installation/fixation`).
 *
 * Module : grille de trois cartes (famille F), rendue par `TopicCards` en
 * trois colonnes sur fond gris.
 *
 * ⚠️ PAS DE CARTES CHIFFRES dans « L'essentiel », et c'est délibéré : le cahier
 * décrit son bloc « Essentiel — 3 cartes » avec EXACTEMENT le contenu du module
 * (toit incliné / toit plat / BIPV). Les rendre deux fois aurait donné deux
 * grilles identiques à un écran d'intervalle. Les trois familles de fixation
 * sont donc le module, et « L'essentiel » ne garde que ce qui les nuance.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 *
 * Le titre annonce le dénombrement (« les 3 systèmes ») : c'est ce qui
 * distingue ce résultat des pages produit qui rankent sur la même requête.
 */
export const SEO: PageSeo = {
  title: 'Fixation des panneaux solaires : les 3 systèmes | Belgreen',
  description:
    'Rails sur crochets en toit incliné, lestage sans perçage en toit plat, intégration en BIPV : les trois façons de fixer des panneaux, et ce que subit la toiture.',
};

export const HERO = {
  badge: 'Installation',
  title: 'Comment sont fixés les panneaux solaires ?',
  answer:
    'La fixation dépend du type de toiture : rails sur crochets pour un toit incliné, lest ou plots sans percement pour un toit plat, intégration directe pour le BIPV.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Rails et crochets de fixation posés sur une toiture en tuiles',
} as const;

export const LEAD = {
  text: 'Trois grandes familles de fixation, chacune adaptée à un type de toiture. Le détail complet par type de toit se trouve dans les pages « Emplacements », celle-ci reste la vue d’ensemble.',
  note: 'Les trois familles, côte à côte.',
} as const;

export const FIXATIONS_COPY: SectionCopy = {
  overline: 'Le module',
  title: 'Les 3 grandes familles de fixation',
  intro: 'Chacune correspond à un type de toiture.',
};

export const FIXATIONS: TopicCard[] = [
  {
    title: 'Toit incliné',
    text: 'Rails sur crochets accrochés à la charpente. Quelques tuiles sont déplacées le temps de la pose, puis remises en place.',
    accent: true,
  },
  {
    title: 'Toit plat',
    text: 'Structure lestée ou plots, souvent sans aucun perçage : la membrane d’étanchéité reste intacte.',
  },
  {
    title: 'BIPV',
    text: 'Panneaux intégrés directement au revêtement de toiture, qu’ils remplacent au lieu de s’y superposer.',
  },
];

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui décide de la durée',
  intro: 'Ce qui détermine la durée de vie de la fixation.',
};

export const FACTS: Fact[] = [
  {
    title: 'Aussi longtemps que les panneaux',
    text: 'Rails sur crochets comme systèmes lestés sont conçus pour tenir 25 à 30 ans, avec un entretien minimal.',
  },
  {
    title: 'La toiture n’est pas abîmée',
    text: 'Sur toit incliné, seules quelques tuiles sont temporairement déplacées. Sur toit plat, le lestage évite tout perçage.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Vous avez un toit plat ?',
    text: 'La structure inclinée et l’espacement entre rangées y changent complètement la donne.',
    cta: { label: 'Voir le toit plat', href: '/installation/toit-plat' },
  },
  {
    title: 'Le BIPV vous intéresse ?',
    text: 'Les panneaux intégrés remplacent la couverture : plus esthétique, plus cher.',
    cta: { label: 'Voir le BIPV', href: '/installation/bipv' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Les pages qui prolongent le sujet.',
};

/*
 * « Creuser le sujet » en CARTES-LIENS, pas en questions.
 *
 * ⚠️ Ce bloc REPOSAIT MOT POUR MOT les questions de la FAQ, trois cents pixels
 * plus haut : le visiteur lisait deux fois la meme reponse et la page servait
 * la meme question deux fois a Google, dont une seule balisee. Le gabarit
 * (`pages-contenu.md` §4) veut ici « details secondaires, cas particuliers,
 * pour aller plus loin » — pas un doublon de la §5.
 *
 * La variante retenue est celle d'`a-propos.ts` : un titre en affirmation, ce
 * que la page voisine repond, et son `href`. Aucun contenu invente, et le
 * maillage interne y gagne.
 */
export const TOPICS: TopicCard[] = [
  {
    title: 'Ce que la fixation fait porter à la toiture',
    text: 'Le poids au mètre carré selon le système retenu, et le signe qu’une charpente ne suivra pas.',
    href: '/installation/poids',
    accent: true,
  },
  {
    title: 'Fixer sans percer, sur un toit plat',
    text: 'Le lestage, son inclinaison recréée et l’étanchéité qui reste intacte.',
    href: '/installation/toit-plat',
  },
  {
    title: 'Ce que couvre la garantie de pose',
    text: 'Panneaux, onduleur, main-d’œuvre : trois garanties de durées différentes.',
    href: '/comprendre/garanties',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'La fixation abîme-t-elle la toiture ?',
    answer:
      'Non. Sur toit incliné, quelques tuiles sont déplacées puis remises en place ; sur toit plat, le lestage évite tout perçage.',
    open: true,
  },
  {
    question: 'Quelle fixation dure le plus longtemps ?',
    answer:
      'Rails sur crochets et systèmes lestés durent tous deux aussi longtemps que les panneaux, soit 25 à 30 ans.',
  },
  {
    question: 'Peut-on démonter et remonter une installation ailleurs ?',
    answer:
      'Techniquement oui, mais l’opération demande un professionnel et n’est pas toujours économiquement intéressante.',
  },
];

export const FINAL_CTA = {
  title: 'Le bon système de fixation dépend de votre toiture',
  text: "On s'en charge, du relevé à la pose. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
