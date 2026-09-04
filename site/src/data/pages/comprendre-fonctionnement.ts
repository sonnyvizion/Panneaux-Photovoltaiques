import type { Bridge, Fact, FaqItem, Figure, FlowStep, PhotoCard, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 4.1 — « Fonctionnement des panneaux » (`/comprendre/fonctionnement`).
 *
 * Module : `PhotonFlow` (famille G, nouvelle). Cinq étapes, décrites par la
 * commande du pilier : lumière → cellule → électron → courant → onduleur. Le
 * cahier n'en spécifiait pas le détail (« à concevoir »).
 *
 * ⚠️ Les cinq étapes du module ne recopient pas les trois cartes de
 * « L'essentiel » : le module raconte la TRANSFORMATION physique, les cartes
 * listent les COMPOSANTS. Deux découpages différents du même sujet, pas une
 * redite — le module s'arrête à l'onduleur, les cartes vont jusqu'au compteur.
 *
 *
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées au build, voir
 * `data/seo.ts`.
 *
 * « Comment fonctionne un panneau solaire » est la requête telle qu'elle se
 * tape — le H1 la porte déjà mot pour mot, le titre la reprend sans la diluer.
 */
export const SEO: PageSeo = {
  title: 'Comment fonctionne un panneau solaire ? | Belgreen',
  description:
    'La lumière frappe le silicium, un électron se libère, l’onduleur convertit : suivez le trajet de l’électricité, du photon à votre prise de courant.',
};

export const HERO = {
  badge: 'Comprendre',
  title: 'Comment fonctionne un panneau solaire ?',
  answer:
    'Un panneau solaire transforme la lumière du soleil en électricité grâce à l’effet photovoltaïque : les cellules de silicium libèrent des électrons au contact de la lumière, créant un courant continu que l’onduleur transforme ensuite en courant alternatif utilisable dans la maison.',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    "Gros plan sur une cellule photovoltaïque bleutée et sa grille de contacts argentés, traversée par un reflet de lumière",
} as const;

export const LEAD = {
  text: 'Pas besoin d’être ingénieur pour comprendre le principe : trois étapes suffisent à saisir comment la lumière devient de l’électricité utilisable chez vous.',
  note: 'Suivez le trajet, étape par étape.',
} as const;

export const FLOW_COPY: SectionCopy = {
  overline: 'Le voyage du photon',
  title: 'De la lumière à la prise',
  intro: 'Ce qui se passe entre le rayon de soleil et votre appareil branché.',
};

export const FLOW: FlowStep[] = [
  {
    title: 'La lumière arrive',
    state: 'photon',
    text: 'Un rayon de soleil frappe la surface du panneau. Ce n’est pas la chaleur qui compte, mais la lumière elle-même : c’est pour ça qu’un panneau produit aussi par temps froid.',
  },
  {
    title: 'La cellule l’absorbe',
    state: 'silicium',
    text: 'Le photon est absorbé par une cellule de silicium. L’énergie qu’il transporte est transmise à la matière.',
  },
  {
    title: 'Un électron se libère',
    state: 'effet photovoltaïque',
    text: 'Cette énergie arrache un électron à son atome. C’est l’effet photovoltaïque, et c’est le seul moment où de la lumière devient de l’électricité.',
  },
  {
    title: 'Le courant circule',
    state: 'courant continu',
    text: 'Les électrons libérés se déplacent tous dans le même sens à travers la cellule : un courant continu apparaît, et parcourt l’installation.',
  },
  {
    title: 'L’onduleur convertit',
    state: 'courant alternatif',
    text: 'Le courant continu est inutilisable tel quel. L’onduleur le transforme en courant alternatif, celui de vos prises et du réseau.',
  },
];

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Les trois composants',
  intro: 'Le trajet de l’électricité, en 3 étapes.',
};

/* ⚠️ « Capte », « Convertit », « Mesure » n'étaient pas des chiffres : posés en
   corps 44 en bas à droite, ces trois verbes prenaient le poids visuel d'une
   statistique. Ce sont trois OBJETS — la maquette 695:490 les montre en photo.

   Textes repris mot pour mot de cette maquette. */
export const FIGURES: Figure[] = [];

export const PHOTOS: PhotoCard[] = [
  {
    title: 'La cellule photovoltaïque',
    text: 'Capte la lumière du soleil et libère des électrons. C’est la naissance du courant continu. Le matériau qui rend ça possible : le silicium, à la base de la quasi-totalité des panneaux du marché.',
    image: '4.1-fonctionnement-carte-cellule.webp',
    alt: 'Gros plan sur des cellules photovoltaïques bleu foncé et leurs fines grilles de contact argentées, balayées par un reflet de soleil',
  },
  {
    /* La maquette écrit « L'Onduleur » ; la capitale au milieu de la phrase est
       une coquille, pas une intention — les deux autres titres n'en ont pas. */
    title: 'L’onduleur',
    text: 'Convertit le continu en alternatif, utilisable',
    image: '4.1-fonctionnement-carte-onduleur.webp',
    alt: 'Onduleur gris fixé à un mur, son écran allumé d’un voyant vert, les câbles rouges et noirs raccordés en dessous',
  },
  {
    title: 'Le compteur',
    text: 'Mesure ce qui est consommé et ce qui est injecté',
    image: '4.1-fonctionnement-carte-compteur.webp',
    alt: 'Compteur électrique sous capot transparent fixé à un mur blanc, son afficheur numérique visible',
  },
];

export const FACTS: Fact[] = [
  {
    title: 'Pas de pièce mobile',
    text: 'Un panneau ne s’use pas mécaniquement : c’est l’onduleur qui tombe en panne en premier, en général.',
  },
  {
    title: 'La lumière, pas la chaleur',
    text: 'C’est l’intensité lumineuse qui produit, pas la température. Un ciel voilé produit, à rendement réduit.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'L’onduleur mérite qu’on s’y arrête',
    text: 'C’est le composant qui décide de la durée de vie et du comportement face à l’ombre.',
    cta: { label: 'Comprendre l’onduleur', href: '/comprendre/onduleur' },
  },
  {
    title: 'Et le compteur, à quoi sert-il exactement ?',
    text: 'Sans lui, aucun mécanisme régional de valorisation ne peut fonctionner.',
    cta: { label: 'Voir le compteur intelligent', href: '/comprendre/compteur-intelligent' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Ce qu’on comprend mal en général sur le fonctionnement des panneaux.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Pourquoi courant continu puis alternatif ?',
    text: 'Les panneaux produisent naturellement du courant continu (comme une pile), mais les appareils domestiques et le réseau électrique fonctionnent en courant alternatif : l’onduleur fait cette conversion indispensable.',
    accent: true,
  },
  {
    title: 'Un panneau produit-il par temps nuageux ?',
    text: 'Oui, à rendement réduit : la lumière diffuse traverse les nuages et continue à activer les cellules, juste avec moins d’intensité qu’en plein soleil.',
  },
  {
    title: 'Que se passe-t-il la nuit ?',
    text: 'Aucune production, logiquement : c’est le rôle du réseau électrique (ou d’une batterie domestique) de prendre le relais.',
  },
  {
    title: 'Combien de temps un panneau met-il à démarrer le matin ?',
    text: 'La production commence dès les premiers rayons, de façon progressive : pas d’effet de seuil brutal, juste une montée en puissance graduelle avec la luminosité.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Un panneau solaire peut-il tomber en panne ?',
    answer:
      'Rarement le panneau lui-même : il n’a aucune pièce mobile. C’est plus souvent l’onduleur, dont la durée de vie dépend de la technologie : 10 à 15 ans pour un onduleur central, 25 ans de garantie pour les micro-onduleurs que nous posons.',
    open: true,
  },
  {
    question: 'Faut-il un branchement électrique spécial ?',
    answer:
      'Le raccordement se fait via votre tableau électrique existant, adapté par un professionnel lors de l’installation.',
  },
  {
    question: 'La neige empêche-t-elle la production ?',
    answer:
      'Temporairement si elle recouvre les panneaux, mais l’inclinaison et la surface lisse favorisent en général un glissement naturel assez rapide.',
  },
  {
    question: 'Les panneaux produisent-ils par temps couvert ?',
    answer:
      'Oui, moins, mais ils produisent. Un panneau capte aussi la lumière diffuse, celle qui traverse les nuages : c’est ce qui rend le photovoltaïque viable en Belgique, où le ciel est couvert une bonne partie de l’année. Les rendements annoncés sur ce site sont des moyennes annuelles, ciel belge compris, pas des performances de plein soleil.',
  },
  {
    question: 'Produisent-ils quelque chose la nuit ?',
    answer:
      'Non, rien. Sans lumière, pas d’effet photovoltaïque : la nuit, votre électricité vient du réseau, ou d’une batterie si vous en avez une. C’est précisément ce décalage entre le moment où l’on produit et celui où l’on consomme qui décide de la rentabilité d’une installation.',
  },
];

export const FINAL_CTA = {
  title: 'Comprendre le principe, c’est bien. Voir ce que ça donne chez vous, c’est mieux',
  text: "Vous parlez directement à l'équipe qui installe. Pas d'intermédiaire.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
