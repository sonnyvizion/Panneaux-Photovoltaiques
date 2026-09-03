import type { Bridge, EssentialsEditorial, Fact, FaqItem, Figure, SectionCopy, TopicCard } from '../content';
import type { PageSeo } from '../seo';

/**
 * Page 2.17 — « Installer soi-même » (`/installation/soi-meme`).
 *
 * Module : les deux colonnes « permis / pas permis » (famille F), rendues par
 * `TopicCards` en deux colonnes avec listes internes. C'est ce qui a motivé
 * l'ajout d'`items` à `TopicCard` : ce sont des éléments distincts à énumérer,
 * pas un paragraphe.
 *
 * ⚠️ « L'essentiel » ne porte pas de cartes chiffres : le cahier y décrit
 * exactement les deux colonnes du module. Les rendre deux fois aurait dupliqué
 * la même information — même arbitrage que sur la page « Fixation ».
 *
 * ⚠️ CTA FINAL À CONFIRMER PAR LE CLIENT. Le cahier le signale lui-même : « CTA
 * différent, service partiel — à confirmer que Belgreen le propose ». La page
 * propose donc « Nous contacter » et NON une promesse de service : le texte
 * demande d'en parler, il n'affirme pas que le service existe.
 */

/**
 * Ce que Google lit en tête de page — bornes vérifiées par `data/seo.ts`.
 *
 * La description tranche dès la première phrase (« légal… mais ») : c'est une
 * requête à réponse binaire, et une description qui la fait attendre perd le
 * clic au profit du résultat qui répond tout de suite.
 */
export const SEO: PageSeo = {
  title: 'Installer ses panneaux solaires soi-même | Belgreen',
  description:
    'Poser ses panneaux soi-même est légal en Belgique, mais raccordement et contrôle RGIE exigent un professionnel. La limite exacte, et ce que ça fait gagner.',
};

export const HERO = {
  badge: 'Installation',
  title: 'Peut-on installer ses panneaux solaires soi-même ?',
  answer:
    'Poser soi-même des panneaux solaires sur sa toiture est légal en Belgique, mais le raccordement électrique et le contrôle de conformité RGIE doivent obligatoirement être réalisés par un professionnel avant la mise en service.',
  cta: { label: 'Voir la limite exacte', href: '#limite-autoinstallation' },
  imageAlt: 'Particulier manipulant un panneau solaire sur une toiture',
} as const;

export const LEAD = {
  text: 'Ni totalement interdit, ni totalement libre : voici la limite précise entre ce que vous pouvez faire vous-même et ce qui doit passer par un professionnel.',
  note: 'La limite, des deux côtés.',
} as const;

export const LIMIT_COPY: SectionCopy = {
  overline: 'La limite',
  title: 'Ce qui est permis, ce qui ne l’est pas',
  intro: 'Deux colonnes, une frontière nette.',
};

export const LIMIT: TopicCard[] = [
  {
    title: 'Permis en autonomie',
    text: 'Vous pouvez le faire vous-même, sans professionnel :',
    items: [
      'Poser les panneaux sur la toiture ou la façade',
      'Installer un kit plug & play homologué',
    ],
    accent: true,
  },
  {
    title: 'Pas permis sans professionnel',
    text: 'Ces trois opérations exigent un professionnel qualifié :',
    items: [
      'Le raccordement au tableau électrique',
      'Le contrôle de conformité RGIE',
      'L’installation d’une batterie domestique (interdit en auto-installation depuis la révision RGIE 2025)',
    ],
  },
];

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce que ça change vraiment',
  intro: 'Ce qu’il faut savoir avant de se lancer soi-même.',
};

/* ⚠️ La page n'avait aucune carte chiffre — elle n'en avait pas besoin. Le
   bloc éditorial lui donne enfin la réponse d'un seul tenant que le gabarit
   attend à cet endroit. */
export const FIGURES: Figure[] = [];

export const EDITORIAL: EssentialsEditorial = {
  title: 'Installer soi-même',
  text:
    'Poser ses panneaux soi-même est légal en Belgique, sur la toiture ou la façade, sans professionnel obligatoire. Mais le raccordement au tableau électrique et le contrôle de conformité RGIE, eux, doivent toujours être réalisés par un professionnel avant la mise en service. Les kits plug & play homologués font exception : ils s’installent en autonomie complète. Seule certitude côté interdiction : l’auto-installation d’une batterie domestique, prohibée depuis la révision RGIE 2025.',
};

/* Photo en cours de génération : emplacement nommé en attendant. */
export const EDITORIAL_IMAGE = 'soi-meme-editorial.jpg';

export const FACTS: Fact[] = [
  {
    title: 'L’économie est partielle',
    text: 'Le raccordement et le contrôle restent facturés : le gain porte surtout sur la main-d’œuvre de pose.',
  },
  {
    title: 'Un contrôle négatif bloque tout',
    text: 'Tant que les corrections n’ont pas été faites par un professionnel, la mise en service est impossible.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Le kit plug & play, lui, est libre',
    text: 'C’est la seule installation qu’on pose et branche entièrement soi-même, en toute légalité.',
    cta: { label: 'Voir le kit de balcon', href: '/installation/balcon' },
  },
  {
    title: 'Comment juger le professionnel qui vous complète ?',
    text: 'Même pour un raccordement seul, les critères de choix restent les mêmes.',
    cta: { label: 'Voir les critères', href: '/installation/trouver-un-installateur' },
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
    title: 'Ce qu’un installateur prend en charge',
    text: 'Certification, assurance, devis, démarches : les critères de tri, et les signaux d’alarme.',
    href: '/installation/trouver-un-installateur',
    accent: true,
  },
  {
    title: 'Le certificat qui conditionne les certificats verts',
    text: 'À Bruxelles, sans RESCert PV, une installation de 5 kWc ou moins n’ouvre plus aucun droit.',
    href: '/aides-primes/bruxelles/reglementation',
  },
  {
    title: 'Les démarches, dans l’ordre',
    text: 'Compteur communicant, contrôle RGIE, déclaration au gestionnaire de réseau.',
    href: '/aides-primes/wallonie/demarches',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Puis-je vraiment poser mes panneaux moi-même légalement ?',
    answer:
      "Oui. Le RGIE fixe une obligation de résultat sur l'installation, il ne désigne pas qui tient le tournevis : rien ne vous interdit de poser vos panneaux sur votre propre logement. Ce qui n'est pas négociable, c'est le contrôle de conformité par un organisme agréé par le SPF Économie avant toute mise en service, et la déclaration au gestionnaire de réseau. Sans ce rapport, pas de raccordement.",
    open: true,
  },
  {
    question: 'Que dois-je absolument faire faire par un professionnel ?',
    answer:
      'Le contrôle RGIE par un organisme agréé, obligatoire avant toute mise en service. Le raccordement au tableau, vous pouvez légalement le faire chez vous, mais c’est la partie où une erreur se paie le plus cher, et c’est elle que le contrôle examine en premier.',
  },
  {
    question: 'En installant moi-même à Bruxelles, est-ce que je perds les certificats verts ?',
    answer:
      "Oui, et c'est le point qui change le calcul. Depuis le 1ᵉʳ janvier 2026, une installation bruxelloise de 5 kWc ou moins n'ouvre droit aux certificats verts que si elle porte un certificat RESCert PV, délivré par un installateur certifié. Une pose faite par vos soins ne peut pas l'obtenir : vous économisez la main-d'œuvre et vous perdez le seul vrai revenu du photovoltaïque à Bruxelles, pendant dix ans.",
  },
  {
    question: 'Que risque-t-on en cas de contrôle RGIE négatif ?',
    answer:
      'La mise en service est bloquée tant qu’un professionnel n’a pas apporté les corrections nécessaires.',
  },
  {
    question: 'L’auto-installation, ça fait vraiment économiser de l’argent au final ?',
    answer:
      'En partie seulement : raccordement et contrôle restent facturés. Le gain porte sur la main-d’œuvre de pose.',
  },
];

export const FINAL_CTA = {
  title: 'Vous posez vous-même ? Parlons du raccordement',
  text: "Dites-nous où vous en êtes, on vous dira ce qu'on peut prendre en charge.",
  cta: { label: 'Nous contacter', href: '/contact' },
} as const;
