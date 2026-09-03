import type { Bridge, Fact, FaqItem, Figure, SectionCopy, StackedRow, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 4.11 — « Risques & inconvénients » (`/comprendre/risques-inconvenients`).
 *
 * ⚠️ CETTE PAGE DOIT RESTER HONNÊTE ET NON DÉFENSIVE — c'est une consigne
 * explicite du cahier, qui la rattache à la ligne éditoriale de la page
 * Wallonie-aides : là-bas, « il n'y a plus de prime » a été dit franchement
 * plutôt qu'édulcoré. Aucune limite listée ici n'est suivie d'une contre-attaque
 * commerciale ; les ponts renvoient vers les pages qui traitent chaque limite,
 * pas vers un argumentaire.
 *
 * Module : aucun.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées au build, voir
 * `data/seo.ts`.
 *
 * « Inconvénients des panneaux solaires » est la requête, et elle est posée
 * par quelqu'un qui cherche à être détrompé ou confirmé — pas à être vendu.
 */
export const SEO: PageSeo = {
  title: 'Inconvénients des panneaux solaires : à savoir | Belgreen',
  description:
    'Coût initial, production dépendante de la météo, toitures incompatibles, rentabilité inégale selon la région : les limites du solaire, sans les édulcorer.',
};

export const HERO = {
  badge: 'Comprendre',
  title: "Panneaux solaires : les inconvénients à connaître avant de se lancer",
  answer:
    "Le solaire n’est pas sans limites : investissement initial élevé, rendement dépendant de la météo et de la saison, et une rentabilité qui varie fortement selon la région et le profil de consommation.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    "Vue aérienne d’une maison en briques à toiture solaire, sa terrasse et son jardin ouverts sur la campagne",
} as const;

export const LEAD = {
  text: "Un site honnête doit aussi dire ce qui ne va pas parfaitement : voici les vrais points de vigilance, sans dramatiser ni minimiser.",
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: "Les limites réelles",
  intro: "Les limites réelles à anticiper.",
};

/* ⚠️ ⚠️ « 7-12 ans » disparaît de la mise en avant, et c'est voulu : la carte
   était étiquetée « Investissement initial » pour une valeur qui donnait une
   DURÉE. Le libellé annonçait un montant, la valeur répondait autre chose. Le
   texte dit maintenant les deux sans les confondre.

   « Variable » et « Pas toutes » n'étaient de toute façon pas des chiffres. */
export const FIGURES: Figure[] = [];

export const STACKED_ROWS: StackedRow[] = [
  {
    eyebrow: 'INVESTISSEMENT',
    title: 'Un coût initial réel',
    text:
      'Plusieurs milliers d’euros à avancer, avec un retour sur investissement qui varie fortement selon votre région et votre profil de consommation.',
  },
  {
    eyebrow: 'MÉTÉO',
    title: 'Une production qui varie',
    text:
      'Le rendement dépend de la saison, de l’ensoleillement et de l’ombrage : pas de production stable garantie au jour le jour.',
  },
  {
    eyebrow: 'TOITURE',
    title: 'Pas toutes compatibles',
    text:
      'Orientation défavorable, ombrage important ou structure fragile peuvent limiter ou empêcher une installation standard sur certains toits.',
  },
];

export const STACKED_ALT =
  'Panneaux solaires noirs posés sur le versant d’un toit de tuiles, sous un ciel de nuages';

export const FACTS: Fact[] = [
  { title: "Le déménagement change le calcul", text: "L’installation valorise le bien à la revente, mais la rentabilité prévue ne se réalise pas si vous partez avant le seuil." },
  { title: "La production ne se commande pas", text: "Sur l’année le calcul tient, mais au jour le jour on ne peut pas compter sur une production stable." },
];

export const BRIDGES: Bridge[] = [
  {
    title: "Votre toiture est-elle compatible ?",
    text: "Orientation, ombrage et solidité décident avant tout le reste.",
    cta: { label: "Voir l’ombrage", href: '/installation/ombrage' },
  },
  {
    title: "Le coût initial vous freine ?",
    text: "En Wallonie, un prêt à taux 0 % existe encore : c’est ce qui reste des aides.",
    cta: { label: "Voir les aides en Wallonie", href: '/aides-primes/wallonie' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: "Ce qu’il faut vraiment évaluer avant de se lancer.",
};

export const TOPICS: TopicCard[] = [
  {
    title: "Le coût initial est-il un vrai obstacle ?",
    text: "C’est le principal frein pour beaucoup de foyers : le Rénoprêt en Wallonie ou d’autres solutions de financement peuvent atténuer cet impact, mais l’investissement reste réel.",
    accent: true,
  },
  {
    title: "Et si je déménage avant d’avoir amorti ?",
    text: "L’installation valorise généralement le bien à la revente, mais le calcul de rentabilité initial ne se réalise pas si vous partez avant le seuil, à anticiper si un déménagement est probable à moyen terme.",
  },
  {
    title: "Le rendement variable est-il vraiment gênant ?",
    text: "Pas pour la rentabilité globale, calculée sur l’année et sur 25 à 30 ans. Mais ça veut dire qu’on ne peut pas compter sur une production stable au jour le jour.",
  },
  {
    title: "Toutes les toitures sont-elles compatibles ?",
    text: "Non : une orientation très défavorable, un ombrage important ou une structure trop fragile peuvent limiter ou empêcher une installation standard.",
  },
];

export const FAQ: FaqItem[] = [
  {
    question: "Le solaire est-il rentable pour tout le monde ?",
    answer:
      "Pas automatiquement : ça dépend de votre toiture, de votre consommation et de votre région. C’est justement ce que le simulateur évalue pour votre cas précis.",
    open: true,
  },
  {
    question: "Y a-t-il un risque de panne fréquente ?",
    answer:
      "Non, le matériel est globalement fiable, avec peu de pièces mobiles. L’onduleur est le composant le plus susceptible de nécessiter un remplacement en cours de vie.",
  },
  {
    question: "L’esthétique est-elle un inconvénient réel ?",
    answer:
      "C’est subjectif : des solutions comme le BIPV existent pour qui privilégie l’intégration visuelle.",
  },
  {
    question: 'Et si je déménage avant d’avoir amorti l’installation ?',
    answer:
      'L’installation reste avec la maison et compte dans sa valeur : elle ne se perd pas, elle se revend avec le bien. Les garanties, elles, sont généralement transférables au nouveau propriétaire. Le vrai point d’attention est ailleurs : un projet de vente à court terme change le calcul, parce que la plus-value ne restitue pas mécaniquement ce que l’installation n’a pas encore économisé.',
  },
  {
    question: 'Toutes les toitures conviennent-elles ?',
    answer:
      'Non, et c’est l’un des rares vrais obstacles. Une toiture très ombragée, orientée plein nord, en mauvais état, ou dont la charpente ne peut pas encaisser la charge, disqualifie ou reporte le projet. Une couverture à refaire dans les cinq ans se refait avant, jamais après : déposer puis reposer une installation coûte plus cher que de l’avoir posée au bon moment.',
  },
];

export const FINAL_CTA = {
  title: "Voyez si votre situation précise est favorable",
  text: "Si elle ne l'est pas, on vous le dira. C'est le sens d'une estimation honnête.",
  cta: { label: "Estimer mon installation", href: '/simulateur' },
} as const;
