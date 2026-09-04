import type { Bridge, Fact, FaqItem, Figure, PhotoCard, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 4.3 — « Onduleur & micro-onduleur » (`/comprendre/onduleur`).
 *
 * ⚠️ Cette URL existait déjà comme gabarit `noindex` : des ponts des pages
 * Ombrage et Fonctionnement y menaient. Le drapeau `hidden` de `site.ts` est
 * donc retiré — la page est réelle et rejoint le méga-menu.
 *
 * Module : aucun, sur prescription du cahier.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées au build, voir
 * `data/seo.ts`.
 *
 * La requête utile n'est pas « onduleur » seul mais l'arbitrage qui amène
 * dessus : string ou micro-onduleur.
 */
export const SEO: PageSeo = {
  title: 'Onduleur solaire : string ou micro-onduleur ? | Belgreen',
  description:
    'L’onduleur rend utilisable le courant des panneaux. String ou micro-onduleur : durée de vie, garanties de 10 à 25 ans, et quand le surcoût se justifie.',
};

export const HERO = {
  badge: 'Comprendre',
  title: "L’onduleur : le composant qui rend l’électricité solaire utilisable",
  answer:
    "L’onduleur transforme le courant continu produit par les panneaux en courant alternatif, utilisable par les appareils domestiques et compatible avec le réseau électrique. Sans lui, l’électricité produite par les panneaux serait inutilisable.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt:
    "Onduleur mural blanc et gris fixé sur un mur clair, câbles raccordés en partie basse et coffret électrique attenant",
} as const;

export const LEAD = {
  text: "Moins visible que les panneaux, mais tout aussi indispensable, et souvent le premier composant à remplacer au cours de la vie de l’installation.",
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: "String ou micro-onduleur",
  intro: "Onduleur string ou micro-onduleur, la vraie question.",
};

/* ⚠️ PLUS DE CARTES CHIFFRES ICI. « Convertir », « Un seul », « Un par
   panneau » n'étaient pas des chiffres : posés en corps 44 en bas à droite, ils
   prenaient le poids visuel d'une statistique sans en être une.

   ⚠️ ET DEUX CARTES, PAS TROIS. La 3ᵉ portait le rôle général de l'onduleur —
   déjà dit par l'intro de la page. Les deux qui restent sont deux OBJETS
   distincts, qu'une photo montre mieux qu'un mot. */
export const FIGURES: Figure[] = [];

export const PHOTOS: PhotoCard[] = [
  {
    title: 'L’onduleur string',
    text: 'Un seul boîtier pour toute l’installation : le montage le plus courant, adapté à la plupart des toitures sans ombrage.',
    image: '4.3-onduleur-carte-string.jpg',
    alt: 'Onduleur string mural installé dans un local technique résidentiel avec câbles solaires rangés',
  },
  {
    title: 'Le micro-onduleur',
    text: 'Un boîtier par panneau : plus cher à l’achat, mais limite fortement l’impact d’une ombre partielle sur la production totale.',
    image: 'onduleur-carte-micro.jpg',
    alt: 'Micro-onduleur fixé sous un panneau solaire avec câbles et connecteurs visibles',
  },
];

export const FACTS: Fact[] = [
  { title: "Le premier à remplacer, sauf en micro", text: "Un onduleur central tient 10 à 15 ans contre 25 à 30 pour les panneaux : le remplacement à mi-vie se budgétise dès le départ. Les micro-onduleurs que nous posons sont garantis 25 ans, ce qui supprime cette ligne du calcul." },
  { title: "Où l’installer", text: "Dans un local ventilé et si possible frais, à distance raisonnable des panneaux : l’éloignement coûte en pertes et en câblage." },
];

export const BRIDGES: Bridge[] = [
  {
    title: "Votre toiture a de l’ombre ?",
    text: "C’est le seul cas où le micro-onduleur se justifie vraiment. Et il change tout.",
    cta: { label: "Voir l’ombrage", href: '/installation/ombrage' },
  },
  {
    title: "Combien de temps ça dure, au juste ?",
    text: "Panneaux, onduleur, fixation : trois durées de vie différentes à connaître.",
    cta: { label: "Voir la longévité", href: '/comprendre/longevite' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: "Ce qu’il faut savoir avant de choisir son onduleur.",
};

export const TOPICS: TopicCard[] = [
  {
    title: "Onduleur string ou micro-onduleur, lequel choisir ?",
    text: "L’onduleur string convient à la plupart des toitures sans ombrage significatif. Le micro-onduleur s’impose dès qu’il y a de l’ombre portée ou deux pans d’orientations différentes, et il apporte autre chose que du rendement : une garantie de 25 ans, quand un onduleur central se remplace vers la quinzième année.",
    accent: true,
  },
  {
    title: "Combien de temps dure un onduleur ?",
    text: "Cela dépend de sa technologie. Un onduleur central tient 10 à 15 ans, sensiblement moins que les panneaux (25 à 30 ans) : son remplacement à mi-vie s’anticipe dans le budget. Les micro-onduleurs que nous posons sont garantis 25 ans, et cette ligne disparaît du calcul.",
  },
  {
    title: "L’onduleur consomme-t-il de l’électricité ?",
    text: "Une part infime pour son propre fonctionnement, négligeable par rapport à l’énergie qu’il convertit.",
  },
  {
    title: "Où installer l’onduleur ?",
    text: "Dans un local ventilé, si possible frais, à une distance raisonnable des panneaux : l’éloignement augmente les pertes et le coût du câblage.",
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Onduleur string ou micro-onduleurs, lequel choisir ?',
    answer:
      'Cela se décide sur votre toiture, pas sur le catalogue. Un onduleur string relie les panneaux en série : simple et moins cher, mais le plus faible de la chaîne tire les autres vers le bas. Les micro-onduleurs rendent chaque panneau indépendant : plus chers, ils s’imposent dès qu’il y a de l’ombre portée, deux pans d’orientations différentes, ou l’envie de suivre la production panneau par panneau.',
  },
  {
    question: "Que se passe-t-il si l’onduleur tombe en panne ?",
    answer:
      "L’installation cesse de produire de l’électricité utilisable jusqu’au remplacement : c’est la panne la plus fréquente sur une installation solaire, plus que les panneaux eux-mêmes.",
    open: true,
  },
  {
    question: "Le remplacement de l’onduleur est-il coûteux ?",
    answer:
      "Sur une installation à onduleur central, oui : c’est une dépense à budgétiser dès le départ plutôt que de la découvrir vers la quinzième année. Avec des micro-onduleurs garantis 25 ans, la question ne se pose pas sur la durée de vie de l’installation, et c’est un point à comparer entre deux devis dont les prix se tiennent.",
  },
  {
    question: "Un onduleur fait-il du bruit ?",
    answer:
      "Un léger bruit de ventilation est normal sur certains modèles, à prendre en compte dans le choix de l’emplacement, en évitant une chambre adjacente.",
  },
  {
    question: 'Où installe-t-on l’onduleur ?',
    answer:
      'Dans un local sec, frais et ventilé, généralement près du tableau électrique : la chaleur est son premier ennemi et raccourcit sa durée de vie. Les micro-onduleurs, eux, se fixent sous les panneaux et vivent donc sur le toit, conçus pour l’extérieur.',
  },
];

/**
 * La planche « string contre micro-onduleur » — famille I, `SchemaPlate`.
 *
 * ⚠️ PLACEMENT : sous « L'essentiel », pas dans le créneau du module — règle de
 * la famille I, voir l'en-tête de `SchemaPlate.astro`. Ici le doublon était
 * net : la planche démontre l'effet d'une ombre sur une file de panneaux, et
 * les deux photos de « L'essentiel » le réexpliquaient en légende juste après.
 *
 * ⚠️ Le cahier ne prévoyait AUCUN module ici, et c'était l'erreur : la page
 * tranchait entre deux câblages avec deux photos de boîtiers blancs. Or la
 * différence n'est pas dans l'objet, elle est dans la façon dont les panneaux
 * sont reliés — une photo ne la montrera jamais.
 *
 * ⚠️ CE QUE LE DESSIN DOIT FAIRE VOIR, c'est la CAUSE et pas seulement l'effet :
 * à gauche un seul fil traverse les six panneaux, donc le plus faible impose son
 * débit à toute la file ; à droite chaque panneau a sa propre boîte et sort
 * seul. Montrer les panneaux éteints sans montrer le fil répéterait simplement
 * ce que la bascule de la page Ombrage dit déjà.
 */
export const SCHEMA = {
  src: '/schemas/onduleur-string-micro.svg',
  alt: "Deux toitures identiques de six panneaux : à gauche un seul fil les traverse tous et rejoint un unique boîtier, tous les panneaux sont éteints ; à droite chaque panneau a son propre boîtier et un seul panneau est éteint.",
  title: 'Un seul fil, ou un boîtier par panneau',
  caption:
    'À gauche, les six panneaux sont montés en file sur un seul fil : une ombre sur un seul d’entre eux fait chuter toute la file, parce que le plus faible impose son débit aux autres. À droite, chaque panneau a son propre convertisseur et travaille seul : l’ombre ne coûte que ce panneau-là.',
  keys: [
    { swatch: 'ink', label: 'Le câblage : un fil unique à gauche, un par panneau à droite' },
    { swatch: 'green', label: 'Panneau qui produit normalement' },
    { swatch: 'dim', label: 'Panneau dont la production s’effondre' },
  ],
  bridgeLabel: 'Votre toiture a-t-elle de l’ombre ?',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

export const FINAL_CTA = {
  title: "Le bon onduleur dépend de votre toiture",
  text: "Notre équipe est certifiée Enphase : les micro-onduleurs, c'est notre spécialité.",
  cta: { label: "Estimer mon installation", href: '/simulateur' },
} as const;
