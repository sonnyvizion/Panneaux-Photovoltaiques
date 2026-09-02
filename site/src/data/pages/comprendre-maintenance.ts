import type { Bridge, EssentialsEditorial, Fact, FaqItem, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 4.9 — « Maintenance & nettoyage » (`/comprendre/maintenance`).
 *
 * ⚠️ URL : le cahier écrit `/comprendre/maintenance-nettoyage`, `site.ts` porte
 * `/comprendre/maintenance`. On suit le code, comme pour les autres écarts.
 * Module : aucun.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées au build, voir
 * `data/seo.ts`.
 *
 * La requête tapée est « entretien des panneaux solaires », pas
 * « maintenance » — le slug reste `maintenance`, le titre suit l'usage.
 */
export const SEO: PageSeo = {
  title: 'Entretien des panneaux solaires : que faire ? | Belgreen',
  description:
    'Pas de pièce mobile et la pluie belge fait l’essentiel : un contrôle visuel une à deux fois par an suffit. Ce qu’il faut surveiller, et quand intervenir.',
};

export const HERO = {
  badge: 'Comprendre',
  title: "L’entretien d’une installation solaire : ce qu’il faut vraiment faire",
  answer:
    "Une installation solaire demande très peu d’entretien : pas de pièce mobile à user, un nettoyage occasionnel suffit dans la plupart des cas, la pluie faisant naturellement le principal du travail.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    "Gouttes de pluie perlant à la surface d’un panneau solaire, en gros plan",
} as const;

export const LEAD = {
  text: "Un des avantages sous-estimés du solaire : contrairement à beaucoup d’équipements domestiques, il ne demande presque rien une fois installé.",
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: "Ce qu’il faut surveiller",
  intro: "Ce qu’il faut surveiller, et à quelle fréquence.",
};

/* ⚠️ « Rarement » et « En continu » n'étaient pas des chiffres, et
   « 1-2 fois/an » est une fréquence, pas une grandeur qu'on lit de loin. Les
   trois disaient la même chose — que l'entretien est léger — ce qu'une phrase
   dit mieux que trois cartes. */
export const FIGURES: Figure[] = [];

export const EDITORIAL: EssentialsEditorial = {
  title: 'Maintenance',
  text:
    'Un des avantages sous-estimés du solaire : il ne demande presque rien. Le nettoyage est rarement nécessaire. En Belgique, la pluie fait l’essentiel du travail. Un contrôle visuel une à deux fois par an suffit pour repérer un défaut, et l’application de l’onduleur permet de suivre la production au quotidien sans rien faire de plus. Pas de contrat d’entretien obligatoire, juste un œil de temps en temps.',
  imageAlt:
    'Gros plan sur des panneaux solaires couverts de gouttes de pluie',
};

export const FACTS: Fact[] = [
  { title: "Le contrat d’entretien n’est pas indispensable", text: "Le besoin réel est faible ; certains installateurs le proposent pour la tranquillité d’esprit." },
  { title: "Un mauvais nettoyage abîme", text: "Produits agressifs et matériel abrasif rayent la surface : de l’eau claire, ou un professionnel équipé." },
];

export const BRIDGES: Bridge[] = [
  {
    title: "Comment lire une baisse de production ?",
    text: "L’onduleur est le premier suspect, et le premier composant à remplacer.",
    cta: { label: "Comprendre l’onduleur", href: '/comprendre/onduleur' },
  },
  {
    title: "Une ombre nouvelle peut tout expliquer",
    text: "Un arbre qui a poussé suffit à faire chuter une chaîne entière de panneaux.",
    cta: { label: "Voir l’ombrage", href: '/installation/ombrage' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: "Quand et comment intervenir sur son installation.",
};

export const TOPICS: TopicCard[] = [
  {
    title: "Faut-il nettoyer ses panneaux régulièrement ?",
    text: "Rarement nécessaire en Belgique, où le climat pluvieux fait naturellement le travail. Un nettoyage ponctuel peut se justifier en cas de dépôt inhabituel : pollen dense, poussière, fientes d’oiseaux localisées.",
    accent: true,
  },
  {
    title: "Comment savoir si mon installation fonctionne bien ?",
    text: "Le suivi de production via l’application de l’onduleur permet de repérer une baisse anormale : c’est l’outil de surveillance le plus simple au quotidien.",
  },
  {
    title: "Faut-il un contrat d’entretien ?",
    text: "Pas indispensable vu le faible besoin d’entretien réel, mais certains installateurs le proposent pour un suivi et une tranquillité d’esprit supplémentaires.",
  },
  {
    title: "Quand faire intervenir un professionnel ?",
    text: "En cas de baisse de production inexpliquée, de dommage visible, ou simplement pour un contrôle périodique si vous préférez ne rien vérifier vous-même.",
  },
];

export const FAQ: FaqItem[] = [
  {
    question: "Dois-je surveiller mes panneaux après une tempête ?",
    answer:
      "Un contrôle visuel rapide est une bonne précaution après un événement météo important, surtout en cas de grêle.",
    open: true,
  },
  {
    question: "Le nettoyage abîme-t-il les panneaux ?",
    answer:
      "Un nettoyage mal fait, avec des produits agressifs ou du matériel abrasif, peut endommager la surface. Mieux vaut de l’eau claire, ou un professionnel équipé du bon matériel.",
  },
  {
    question: "Combien coûte un entretien professionnel ?",
    answer:
      "Ça varie selon le prestataire et la fréquence choisie, à mettre en balance avec le faible besoin réel d’entretien du solaire.",
  },
];

export const FINAL_CTA = {
  title: "Peu d’entretien, mais un bon suivi",
  text: "On vous montre comment lire votre production dès la mise en service.",
  cta: { label: "Estimer mon installation", href: '/simulateur' },
} as const;
