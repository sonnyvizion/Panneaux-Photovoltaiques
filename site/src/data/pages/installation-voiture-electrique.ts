import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 2.19 — « Voiture électrique » (`/installation/voiture-electrique`).
 * Module : `FigureModule` (famille E). ⚠️ Schéma de flux non livré
 * (`2.19-voiture-electrique-module.jpg`).
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 */
export const SEO: PageSeo = {
  title: 'Recharger sa voiture électrique en solaire | Belgreen',
  description:
    'Recharger en journée, c’est consommer sa propre production au lieu de l’injecter à bas prix. Dimensionnement, borne, carport et limites de la recharge nocturne.',
};

export const HERO = {
  badge: 'Installation',
  title: 'Recharger sa voiture électrique avec des panneaux solaires',
  answer:
    'Une borne de recharge alimentée par vos panneaux solaires permet de recharger votre véhicule électrique avec une électricité largement autoproduite, plutôt qu’achetée au réseau.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Voiture électrique en charge devant une maison équipée de panneaux solaires',
} as const;

export const LEAD = {
  text: 'Comme pour la pompe à chaleur, la voiture électrique transforme un surplus solaire peu valorisé en économie directe sur un poste de dépense important.',
  note: 'Le flux, en une image.',
} as const;

export const MODULE = {
  title: 'Du toit à la batterie, sans passer par le réseau',
  caption:
    'Recharger en journée, c’est consommer directement ce que les panneaux produisent au même moment. L’électricité ne transite pas par le réseau, donc elle n’est ni vendue à bas prix ni rachetée au tarif plein — c’est là que se fait l’économie.',
  bridgeLabel: 'Ajoutez la borne à votre simulation',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

/* ⚠️ UNE SECONDE CARTE SUR LA MÊME PHOTO, pas un second module. Le sujet
   appelle deux temps — ce que la combinaison fait, puis pourquoi elle est
   intéressante — et les séparer en deux bandes illustrées aurait fait relire la
   même image deux fois. Voir le `extra` de `FigureModule`. */
export const MODULE_EXTRA = {
  title: 'Ce qui rend cette combinaison intéressante',
  text:
    'Faire coïncider recharge et production, c’est transformer un surplus peu valorisé en économie directe. Coupler avec un carport solaire pousse la logique encore plus loin — production et recharge au même endroit, sans détour par le réseau.',
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui rend la combinaison intéressante',
  intro: 'Ce qui rend cette combinaison intéressante.',
};

export const FIGURES: Figure[] = [
  { label: 'Économie', value: 'Autoproduit', note: 'rechargé plutôt qu’acheté au réseau', tone: 'lime' },
  { label: 'Synergie', value: 'Carport', note: 'particulièrement pertinent avec un carport solaire', tone: 'grey' },
  { label: 'Timing', value: 'En journée', note: 'c’est là que la production est disponible', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Pas de recharge solaire la nuit',
    text: 'Sans batterie de stockage, la nuit la recharge vient du réseau classique.',
  },
  {
    title: 'Prévoir la puissance',
    text: 'Une recharge régulière est une consommation importante — mieux vaut la couvrir dès le dimensionnement.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Un carport solaire ?',
    text: 'Produire exactement là où la voiture stationne : c’est le cas d’usage le plus cohérent.',
    cta: { label: 'Voir le carport', href: '/installation/carport' },
  },
  {
    title: 'Et une pompe à chaleur en plus ?',
    text: 'Deux gros postes électriques, une même logique d’autoconsommation.',
    cta: { label: 'Voir la pompe à chaleur', href: '/installation/pompe-a-chaleur' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Les questions fréquentes sur cette combinaison.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Faut-il plus de panneaux si on a une voiture électrique ?',
    text: 'Recommandé, une recharge régulière représentant une consommation électrique importante à couvrir au mieux par la production solaire.',
    accent: true,
  },
  {
    title: 'Peut-on recharger la nuit avec des panneaux solaires ?',
    text: 'Pas directement — sans batterie de stockage, l’électricité solaire n’est disponible qu’en journée ; la nuit, la recharge vient du réseau classique.',
  },
  {
    title: 'Une batterie domestique est-elle nécessaire ?',
    text: 'Pas indispensable, mais elle permet de décaler l’usage de l’électricité solaire produite en journée vers une recharge nocturne.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Faut-il plus de panneaux si on a une voiture électrique ?',
    answer:
      'C’est recommandé : une recharge régulière est une consommation importante, qu’il vaut mieux couvrir par la production.',
    open: true,
  },
  {
    question: 'Peut-on recharger la nuit avec des panneaux solaires ?',
    answer:
      'Pas directement. Sans batterie, la production n’est disponible qu’en journée ; la nuit, la recharge vient du réseau.',
  },
  {
    question: 'Une batterie domestique est-elle nécessaire pour ça ?',
    answer:
      'Pas indispensable, mais elle permet de décaler la production de la journée vers une recharge nocturne.',
  },
];

export const FINAL_CTA = {
  title: 'Ajoutez une borne de recharge à votre simulation',
  text: "Le dimensionnement change quand la voiture entre dans le calcul. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
