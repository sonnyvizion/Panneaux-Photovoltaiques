import type { Bridge, Fact, FaqItem, Figure, SectionCopy, StackedRow, TopicCard } from '../content';
import type { PageSeo } from '../seo';
import { POWER_DEFAULT, POWER_MAX, POWER_MIN } from '../../scripts/powerEstimate';

/**
 * Page 2.3 — « Puissance (kWc) » (`/installation/puissance`).
 *
 * Module : `FigureModule` (famille E) — le cahier demande un « schéma
 * illustratif statique kWc vs kWh ».
 *
 * ⚠️ Le schéma n'est pas livré. Le module reprend la photo du hero et porte
 * l'explication dans sa légende : c'est le texte qui fait le travail
 * pédagogique, l'image y est décorative. Schéma attendu :
 * `2.3-puissance-module.jpg`.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 *
 * Le mot-clé principal est l'unité elle-même (« kWc ») : c'est ce que le
 * visiteur tape quand il tombe dessus sur un devis. La fourchette résidentielle
 * vient de `powerEstimate.ts`, jamais recopiée.
 */
export const SEO: PageSeo = {
  title: 'kWc : définition et puissance à installer | Belgreen',
  description:
    'Le kWc mesure la puissance maximale d’une installation, le kWh l’énergie qu’elle produit vraiment. La différence entre les deux, et la puissance à viser.',
};

export const HERO = {
  badge: 'Installation',
  title: 'Le kWc, qu’est-ce que c’est et de combien ai-je besoin ?',
  answer: `Le kWc (kilowatt-crête) mesure la puissance maximale qu’une installation peut produire dans des conditions standardisées de test. Les installations résidentielles belges vont généralement de ${POWER_MIN} à ${POWER_MAX} kWc.`,
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Panneaux solaires en toiture sous un ciel dégagé',
} as const;

export const LEAD = {
  text: 'kWc, kWh : deux unités qui se ressemblent mais ne mesurent pas la même chose. Voici la différence, en clair.',
  /* ⚠️ PAS DE NOTE ICI, et ne pas en remettre une. Elle disait « la différence
     entre les deux, en une image » et annonçait la planche qui suivait
     immédiatement. La planche est passée sous « L'essentiel » (famille I) : la
     note promettait donc une image que le lecteur ne trouvait pas là où on la
     lui annonçait. Même piège que sur la page Wallonie — une note doit annoncer
     ce qui suit VRAIMENT. */
} as const;

export const MODULE = {
  title: 'kWc et kWh : la puissance et l’énergie',
  caption:
    'Le kWc est une capacité : ce que l’installation peut produire au mieux, mesuré en conditions de test (1000 W/m², 25 °C). Le kWh est un résultat : ce qu’elle produit vraiment, qui varie avec la météo, la saison et l’heure. On achète des kWc, on consomme des kWh.',
  bridgeLabel: 'Quelle puissance vous faut-il ?',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Deux unités à ne pas confondre',
  intro: 'Deux unités à ne pas confondre.',
};

/* ⚠️ « Puissance » et « Énergie » n'étaient pas des valeurs mais des
   DÉFINITIONS : la carte annonçait « kWc » en libellé et répondait
   « Puissance » en corps 44. Un glossaire déguisé en statistique. Les trois
   points forment une explication suivie, pas trois mesures. */
export const FIGURES: Figure[] = [];

export const STACKED_ROWS: StackedRow[] = [
  {
    eyebrow: 'CAPACITÉ',
    title: 'Le kWc, une puissance maximale théorique',
    text:
      'Mesuré en conditions de test standardisées (1000 W/m², 25 °C) : ce que l’installation peut produire au mieux, pas ce qu’elle produit réellement au quotidien.',
  },
  {
    eyebrow: 'PRODUCTION',
    title: 'Le kWh, ce qui compte vraiment',
    text:
      'L’énergie réellement produite varie avec la météo, la saison et l’heure. On achète des kWc, on consomme des kWh.',
  },
  {
    eyebrow: 'GAMME',
    /* Les bornes du curseur de la page prix, jamais recopiées : le jour où le
       résidentiel s'étend, la phrase suit. */
    title: `Entre ${POWER_MIN} et ${POWER_MAX} kWc en résidentiel`,
    text:
      'La quasi-totalité des installations belges se situent dans cette fourchette, selon la taille du foyer et sa consommation.',
  },
];

/* Photo en cours de génération : emplacement nommé en attendant. */
export const STACKED_IMAGE = 'puissance-liste.jpg';

export const FACTS: Fact[] = [
  {
    title: 'Conditions de test',
    text: '1000 W/m² et 25 °C : des conditions de laboratoire, jamais celles d’une vraie journée.',
  },
  {
    title: 'Le prix n’est pas proportionnel',
    text: 'Le coût par Wc diminue quand la puissance installée augmente : une partie du chantier ne dépend pas du nombre de panneaux.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Combien de panneaux pour ces kWc ?',
    text: 'Une puissance se traduit en nombre de panneaux, et ce nombre dépend de leur puissance unitaire.',
    cta: { label: 'Voir le calcul', href: '/installation/nombre-de-panneaux' },
  },
  {
    title: 'Et ça coûte combien, par kWc ?',
    text: 'Le prix au watt-crête baisse avec la taille de l’installation. Voyez les fourchettes 2026.',
    cta: { label: 'Voir les prix 2026', href: '/rentabilite-prix' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Ce que ça change concrètement pour votre projet.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Quelle est la différence entre kWc et kWh ?',
    text: 'Le kWc est une capacité maximale mesurée en conditions de test standardisées (1000 W/m², 25 °C) ; le kWh est l’énergie que votre installation produit réellement, qui varie selon la météo, la saison et l’heure.',
    accent: true,
  },
  {
    title: 'Comment savoir combien de kWc me faut-il ?',
    text: 'Ça dépend de votre consommation annuelle, de votre surface de toiture disponible et de son orientation : c’est exactement ce que calcule le simulateur.',
  },
  {
    title: 'Le prix est-il proportionnel à la puissance ?',
    text: 'Pas tout à fait : le prix par Wc diminue généralement à mesure que la puissance installée augmente (économies d’échelle).',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Quelle est la différence entre kWc et kWh ?',
    answer:
      'Le kWc est une puissance maximale théorique, mesurée en laboratoire. Le kWh est l’énergie réellement produite, qui dépend de la météo, de la saison et de l’heure.',
    open: true,
  },
  {
    /* Reformulée sur la longue traîne réellement tapée (« de combien de kWc
       ai-je besoin »), et la réponse donne la fourchette avant de renvoyer au
       simulateur : une réponse qui ne fait que déléguer ne gagne aucun extrait. */
    question: 'De combien de kWc ai-je besoin pour ma maison ?',
    answer: `La plupart des maisons belges se situent entre ${POWER_MIN} et ${POWER_MAX} kWc, ${POWER_DEFAULT} kWc étant le cas le plus courant. Le chiffre exact dépend de votre consommation annuelle, de la surface de toiture disponible et de son orientation.`,
  },
  {
    question: 'Une installation plus puissante coûte-t-elle proportionnellement plus cher ?',
    answer:
      'Non. Le prix au watt-crête baisse quand la puissance augmente, parce qu’une partie du chantier est fixe.',
  },
];

/**
 * La planche kWc / kWh — famille I, `SchemaPlate`.
 *
 * ⚠️ Le `FigureModule` qui reprenait la photo du hero a été RETIRÉ, et la
 * planche ne prend pas sa place : elle descend sous « L'essentiel », suivant la
 * règle de la famille I. Le créneau du module reste donc VIDE sur cette page,
 * et c'est délibéré — douze pages du site n'ont aucun module, et y remettre une
 * photo décorative contredirait la règle d'or #5 (« interactif = accent, pas
 * défaut », et le décoratif encore moins).
 *
 * ⚠️ Le doublon que le déplacement règle : « on achète la hauteur, on consomme
 * la surface » (la légende ci-dessous) et « on achète des kWc, on consomme des
 * kWh » (`STACKED_ROWS`) disaient la même phrase à 300 px d'intervalle.
 *
 * Le dessin porte les deux grandeurs sur la MÊME courbe — la flèche verticale
 * est une hauteur (le kWc), la trame de points est une aire (le kWh). C'est ce
 * qui règle la confusion la plus tenace du sujet : ce ne sont pas deux unités
 * concurrentes, ce sont deux lectures d'une seule et même journée.
 */
export const SCHEMA = {
  src: '/schemas/kwc-kwh.svg',
  alt: "Courbe de production d’une journée : une flèche verticale mesure la hauteur du pic de midi, tandis que toute l’aire sous la courbe est remplie d’une trame de points.",
  title: 'Une hauteur et une aire, sur la même journée',
  caption:
    'La flèche mesure la hauteur du pic : c’est le kWc, la puissance maximale atteinte dans des conditions de test. La surface sous la courbe, elle, est le kWh : tout ce qui a réellement été produit au fil des heures. On achète la hauteur, on consomme la surface.',
  keys: [
    { swatch: 'green', label: 'La hauteur du pic, c’est le kWc' },
    { swatch: 'grey', label: 'L’aire sous la courbe, ce sont les kWh produits' },
  ],
  bridgeLabel: 'Quelle puissance vous faut-il ?',
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;

export const FINAL_CTA = {
  title: 'Quelle puissance vous faut-il vraiment ?',
  text: "On la calcule à partir de votre consommation et de votre toiture. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
