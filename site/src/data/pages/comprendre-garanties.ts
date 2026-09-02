import type { Bridge, EssentialsTable, Fact, FaqItem, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 4.8 — « Garanties (Belgique) » (`/comprendre/garanties`).
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ RÉSERVE À LEVER AVANT VALIDATION FINALE — signalée deux fois par le cahier,
 * en tête de fichier et en note dev :
 *
 *  1. Les DURÉES citées (10-15 ans en garantie produit, jusqu'à 25 ans en
 *     garantie de performance) sont des standards de marché courants, PAS des
 *     obligations légales vérifiées pour la Belgique.
 *  2. La portée exacte de la garantie légale de conformité appliquée à ce type
 *     d'achat n'a pas fait l'objet d'une vérification juridique.
 *
 * La page est publiée malgré tout — contrairement au Guide entreprises, il n'y a
 * pas de risque juridique direct ici, seulement une précision commerciale à
 * confirmer. La distinction de fond (garantie légale ≠ garanties commerciales)
 * est correcte et c'est elle qui porte la valeur de la page : beaucoup de
 * contenus du secteur les confondent.
 *
 * Le texte a été écrit pour rester vrai même si les durées bougent : chaque
 * mention est explicitement présentée comme un standard de marché « à confirmer
 * selon le fabricant », jamais comme une règle.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Module : aucun.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées au build, voir
 * `data/seo.ts`.
 *
 * « Garantie panneaux solaires » avec la mention Belgique : c'est la
 * distinction garantie légale / garanties commerciales qui fait la valeur de la
 * page, et elle est nationale.
 */
export const SEO: PageSeo = {
  title: 'Garanties des panneaux solaires en Belgique | Belgreen',
  description:
    'Garantie produit, garantie de performance, garantie légale : trois couvertures qu’on confond souvent. Voyez laquelle couvre quoi, et pour combien de temps.',
};

export const HERO = {
  badge: 'Comprendre',
  title: "Quelles garanties pour une installation solaire en Belgique ?",
  answer:
    "Une installation solaire est couverte par plusieurs garanties distinctes : la garantie légale de conformité, qui relève du droit commun, et deux garanties commerciales spécifiques aux panneaux, la garantie produit et la garantie de performance, généralement proposées par le fabricant.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    "Mains ouvrant un dossier posé sur une table en bois, devant une baie vitrée donnant sur une toiture solaire",
} as const;

export const LEAD = {
  text: "« La garantie », au singulier, n’existe pas vraiment en solaire : il y en a plusieurs, qui ne couvrent pas la même chose.",
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: "Trois couvertures à ne pas confondre",
  intro: "Les différentes garanties, à ne pas confondre.",
};

/* ⚠️ UNE COMPARAISON, DONC UN TABLEAU. Les trois garanties se comparent sur
   les mêmes critères — ce que ça couvre, combien de temps. En trois cartes
   séparées, ce lien-là disparaissait : on lisait trois objets indépendants au
   lieu d'une même grille de lecture appliquée trois fois. La durée, qui est le
   vrai chiffre de la page, n'apparaissait nulle part. */
export const FIGURES: Figure[] = [];

export const TABLE: EssentialsTable = {
  head: ['Type de garantie', 'Couvre quoi', 'Durée typique'],
  rows: [
    ['Garantie produit', 'Défauts de fabrication du panneau', '10 à 15 ans'],
    ['Garantie de performance', 'Rendement minimum garanti dans le temps', 'Jusqu’à 25 ans'],
    ['Garantie légale', 'S’applique à tout achat en Belgique', 'Selon le droit commun'],
  ],
};

export const FACTS: Fact[] = [
  { title: "Deux durées différentes", text: "Produit et performance ne courent presque jamais sur la même période. Lisez les deux séparément dans le devis." },
  { title: "La main-d’œuvre n’est pas toujours incluse", text: "Certaines garanties couvrent le matériel seul, d’autres l’intervention. À vérifier précisément avant signature." },
];

export const BRIDGES: Bridge[] = [
  {
    title: "Combien de temps ça dure vraiment ?",
    text: "Les garanties se comprennent mieux à côté des durées de vie réelles des composants.",
    cta: { label: "Voir la longévité", href: '/comprendre/longevite' },
  },
  {
    title: "Que vérifier chez un installateur ?",
    text: "La garantie fabricant ne vaut que si quelqu’un reste joignable pour l’activer.",
    cta: { label: "Voir les critères", href: '/installation/trouver-un-installateur' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: "Ce qu’il faut vérifier dans les garanties proposées.",
};

export const TOPICS: TopicCard[] = [
  {
    title: "Garantie produit ou garantie de performance ?",
    text: "La garantie produit couvre les défauts matériels : un panneau qui casse ou dysfonctionne. La garantie de performance garantit que le panneau produit toujours au-dessus d’un certain seuil après un nombre d’années donné. Deux couvertures différentes, souvent avec des durées différentes.",
    accent: true,
  },
  {
    title: "L’onduleur a-t-il la même garantie que les panneaux ?",
    text: "Non, généralement une durée plus courte, cohérente avec sa durée de vie plus limitée.",
  },
  {
    title: "La garantie couvre-t-elle la main-d’œuvre ?",
    text: "Ça dépend du contrat : certaines garanties couvrent uniquement le matériel, d’autres incluent aussi l’intervention. À vérifier précisément dans le devis avant signature.",
  },
  {
    title: "Que se passe-t-il si l’installateur ferme boutique ?",
    text: "La garantie fabricant reste valable indépendamment de l’installateur, mais l’intervention peut devenir plus compliquée à organiser sans le service après-vente d’origine.",
  },
];

export const FAQ: FaqItem[] = [
  {
    question: "Combien de temps sont garantis les panneaux ?",
    answer:
      "Les standards de marché courants avoisinent 10 à 15 ans pour la garantie produit et jusqu’à 25 ans pour la garantie de performance, à confirmer précisément selon le fabricant choisi.",
    open: true,
  },
  {
    question: "Et l’onduleur ?",
    answer:
      "Généralement une garantie plus courte, cohérente avec sa durée de vie de 10 à 15 ans.",
  },
  {
    question: "La garantie est-elle transférable en cas de revente ?",
    answer:
      "Ça dépend des conditions du fabricant, à vérifier au moment de l’achat si c’est un critère important pour vous.",
  },
];

export const FINAL_CTA = {
  title: "Les garanties se lisent dans le devis, pas après",
  text: "On détaille les nôtres avant signature, ligne par ligne.",
  cta: { label: "Estimer mon installation", href: '/simulateur' },
} as const;
