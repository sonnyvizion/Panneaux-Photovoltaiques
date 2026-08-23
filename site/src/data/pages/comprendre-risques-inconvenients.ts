import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';

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
  text: "Un site honnête doit aussi dire ce qui ne va pas parfaitement — voici les vrais points de vigilance, sans dramatiser ni minimiser.",
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: "Les limites réelles",
  intro: "Les limites réelles à anticiper.",
};

export const FIGURES: Figure[] = [
  { label: "Investissement initial", value: "7-12 ans", note: "plusieurs milliers d’euros, amortis sur cette durée", tone: 'lime' },
  { label: "Dépendance météo", value: "Variable", note: "selon la saison, l’ensoleillement et l’ombrage", tone: 'grey' },
  { label: "Toiture", value: "Pas toutes", note: "certaines demandent des travaux, ou une solution adaptée", tone: 'ink' },
];

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
    text: "En Wallonie, un prêt à taux 0 % existe encore — c’est ce qui reste des aides.",
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
    text: "C’est le principal frein pour beaucoup de foyers — le Rénoprêt en Wallonie ou d’autres solutions de financement peuvent atténuer cet impact, mais l’investissement reste réel.",
    accent: true,
  },
  {
    title: "Et si je déménage avant d’avoir amorti ?",
    text: "L’installation valorise généralement le bien à la revente, mais le calcul de rentabilité initial ne se réalise pas si vous partez avant le seuil — à anticiper si un déménagement est probable à moyen terme.",
  },
  {
    title: "Le rendement variable est-il vraiment gênant ?",
    text: "Pas pour la rentabilité globale, calculée sur l’année et sur 25 à 30 ans. Mais ça veut dire qu’on ne peut pas compter sur une production stable au jour le jour.",
  },
  {
    title: "Toutes les toitures sont-elles compatibles ?",
    text: "Non — une orientation très défavorable, un ombrage important ou une structure trop fragile peuvent limiter ou empêcher une installation standard.",
  },
];

export const FAQ: FaqItem[] = [
  {
    question: "Le solaire est-il rentable pour tout le monde ?",
    answer:
      "Pas automatiquement — ça dépend de votre toiture, de votre consommation et de votre région. C’est justement ce que le simulateur évalue pour votre cas précis.",
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
      "C’est subjectif — des solutions comme le BIPV existent pour qui privilégie l’intégration visuelle.",
  },
];

export const FINAL_CTA = {
  title: "Voyez si votre situation précise est favorable",
  text: "Si elle ne l'est pas, on vous le dira. C'est le sens d'une estimation honnête.",
  cta: { label: "Estimer mon installation", href: '/simulateur' },
} as const;
