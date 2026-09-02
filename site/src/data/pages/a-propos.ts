import type { Bridge, Fact, FaqItem, Figure, SectionCopy, StackedRow, TimelineStep, TopicCard } from '../content';
import type { PageSeo } from '../seo';
import { PHONE } from '../site';

/**
 * Page transverse — « Notre équipe » (`/a-propos`).
 *
 * ⚠️ ELLE PORTE L'ARGUMENT CENTRAL DU PROJET, pas une biographie d'entreprise.
 * Le CLAUDE.md le pose en modèle business : le client possède ses installateurs,
 * ce n'est pas un comparateur de leads, et la promesse est « vous parlez
 * directement à l'équipe qui installera vos panneaux ». Trois entrées du site
 * mènent ici — la carte équipe de la home, le cluster confiance du header et le
 * footer — et toutes trois vendent CETTE phrase. La page doit la prouver, pas
 * la répéter.
 *
 * ⚠️ CE QUI MANQUE ENCORE, ET QUI EST ASSUMÉ EN PLACEHOLDER VISIBLE (CLAUDE.md
 * « À compléter » — décision : livrer la page plutôt que l'attendre) :
 *   — les PRÉNOMS et le nombre réel de personnes de l'équipe ;
 *   — les PORTRAITS et une seconde photo de chantier (une seule est livrée,
 *     `assets/team/team_hero.webp`, prise par le hero) ;
 *   — le NUMÉRO DE TÉLÉPHONE (`PHONE` de `site.ts` porte encore un gabarit) ;
 *   — l'ANNÉE DE CRÉATION et le nombre d'installations posées ;
 *   — les CERTIFICATIONS autres qu'Enphase (RESCERT ou équivalent belge) ;
 *   — l'entité juridique exacte : Belgreen ou Belectric ?
 *
 * ⚠️ AUCUN CHIFFRE INVENTÉ. Tant que le client n'a pas donné « X installations
 * depuis 20XX », la page tient sur ce qui est vrai et vérifiable : la zone,
 * l'absence d'intermédiaire, la certification Enphase. Un chiffre inventé sur la
 * page qui vend la confiance serait le pire endroit du site où en mettre un.
 */

/**
 * Métadonnées de tête de page — contraintes dans `data/seo.ts`, vérifiées au build.
 *
 * ⚠️ La requête visée n'est pas « qui sommes-nous » : c'est
 * « installateur panneaux solaires Bruxelles », une requête locale à intention
 * commerciale. La description porte donc l'argument anti-intermédiaire, qui est
 * ce qui distingue cette page des annuaires qui occupent la même requête.
 */
export const SEO: PageSeo = {
  title: 'Installateur panneaux solaires à Bruxelles | Belgreen',
  description:
    'Une équipe d’installateurs certifiés Enphase basée à Bruxelles. Vous parlez directement à ceux qui monteront sur votre toit : aucun intermédiaire.',
};

export const HERO = {
  badge: 'L’équipe',
  title: 'Qui installera vos panneaux solaires ?',
  answer:
    'Nous. Belgreen / Belectric est une équipe d’installateurs basée à Bruxelles : la personne qui répond à votre demande travaille dans la même équipe que celle qui montera sur votre toit. Pas d’intermédiaire, pas de mise en relation, pas de revente de vos coordonnées.',
  cta: { label: 'Demander un devis', href: '/devis' },
  imageAlt:
    'Deux installateurs Belgreen fixant un panneau solaire sur une toiture au coucher du soleil',
} as const;

export const LEAD = {
  text: 'La plupart des sites qui vous proposent un devis solaire ne posent pas de panneaux : ils revendent votre demande à trois ou quatre installateurs qui vous rappelleront tous. Ici, votre demande ne va nulle part ailleurs qu’à notre équipe.',
} as const;

/** Module de la page : la certification, montrée plutôt qu'affirmée. */
export const MODULE = {
  title: 'Installateur certifié Enphase',
  caption:
    'Enphase ne certifie pas tout le monde : la certification suppose une formation sur ses micro-onduleurs et un suivi de la qualité des poses. Concrètement, cela veut dire que la marque reconnaît notre équipe comme habilitée à installer et à garantir son matériel, et que le monitoring de votre production est configuré correctement dès le premier jour.',
  extra: {
    title: 'Pourquoi des micro-onduleurs ?',
    text: 'Un micro-onduleur par panneau : un panneau à l’ombre ne fait plus baisser toute la rangée, et la production se lit panneau par panneau. C’est ce qui permet de repérer une anomalie sans monter sur le toit.',
  },
  imageAlt: 'Micro-onduleur Enphase installé sous un panneau photovoltaïque',
  bridgeLabel: 'Comprendre le rôle de l’onduleur',
  cta: { label: 'Lire la page onduleur', href: '/comprendre/onduleur' },
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Une équipe locale, pas une plateforme',
  intro: 'Ce que ça change pour vous, concrètement.',
};

/* ⚠️ Grille de chiffres volontairement VIDE : les seules grandeurs qu'on
   pourrait afficher ici — nombre d'installations, années d'existence — ne sont
   pas encore fournies par le client, et les inventer sur la page qui vend la
   confiance serait exactement la faute à ne pas commettre. Les trois faits
   qualitatifs passent en liste empilée ci-dessous. */
export const FIGURES: Figure[] = [];

export const STACKED_ROWS: StackedRow[] = [
  {
    eyebrow: 'Qui',
    title: 'Une équipe d’installateurs, pas un service commercial',
    text: 'Belgreen / Belectric installe ses propres chantiers. La personne qui prend votre demande, celle qui vient mesurer votre toiture et celle qui pose les panneaux appartiennent à la même équipe.',
  },
  {
    eyebrow: 'Où',
    title: 'Bruxelles et sa périphérie en priorité',
    text: 'C’est notre zone d’intervention principale : nous connaissons les règles d’urbanisme communales, le gestionnaire de réseau et les délais réels de raccordement. Au-delà, nous le disons franchement plutôt que d’envoyer une équipe à trois heures de route.',
  },
  {
    eyebrow: 'Comment',
    title: 'Vos coordonnées ne sortent pas d’ici',
    text: 'Nous ne revendons ni ne partageons vos données avec des installateurs partenaires : il n’y en a pas. Une seule demande, un seul interlocuteur, un seul rappel.',
  },
];

/** Le fichier attendu pour la seconde photo — voir l'en-tête du fichier. */
export const STACKED_IMAGE = 'equipe-chantier.jpg';

export const FACTS: Fact[] = [
  {
    title: 'Ce que nous ne faisons pas',
    text: 'Nous ne vendons pas votre demande, nous ne facturons pas l’étude, et nous ne vous rappelons pas six mois de suite. Si le solaire n’est pas rentable chez vous, nous le disons. C’est aussi ce qu’une étude sert à savoir.',
  },
  {
    title: 'Ce qu’un devis engage',
    text: 'Rien, tant que vous ne l’avez pas signé. La visite sur place, les mesures et le chiffrage sont gratuits ; c’est le seul moyen de passer d’une estimation en ligne à un prix qui tient.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Comment reconnaître un bon installateur ?',
    text: 'Les critères à vérifier avant de signer, y compris chez nous.',
    cta: { label: 'Voir les critères', href: '/installation/trouver-un-installateur' },
  },
  {
    title: 'Quelles garanties en Belgique ?',
    text: 'Produit, production, main-d’œuvre, décennale : ce que chaque garantie couvre vraiment.',
    cta: { label: 'Lire les garanties', href: '/comprendre/garanties' },
  },
];

export const STEPS_COPY: SectionCopy = {
  overline: 'Ce qui se passe ensuite',
  title: 'De votre demande à votre première production',
  intro: 'Quatre étapes, et à chacune un interlocuteur de notre équipe, jamais un centre d’appel.',
};

export const STEPS: TimelineStep[] = [
  {
    title: 'Vous nous écrivez',
    text: 'Votre demande arrive chez nous, et nulle part ailleurs. Nous rappelons une fois pour comprendre votre situation : toiture, consommation, projets à venir (pompe à chaleur, voiture électrique).',
  },
  {
    title: 'Nous venons mesurer',
    text: 'Visite sur place : orientation, inclinaison, état de la toiture, ombrages, tableau électrique. C’est là qu’une estimation en ligne devient un projet chiffré, et parfois qu’on découvre qu’il faut d’abord refaire la couverture.',
  },
  {
    title: 'Nous posons',
    text: 'Une à deux journées de chantier pour une installation résidentielle classique. La même équipe, du montage au raccordement du tableau.',
    badge: 'Démarches administratives prises en charge par notre équipe',
  },
  {
    title: 'Vous suivez votre production',
    text: 'Mise en service, configuration du monitoring, explication de ce que vous voyez sur l’application. Et notre numéro, s’il y a une question six mois plus tard.',
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Avant de nous écrire',
  title: 'Ce qu’il vaut mieux savoir',
  intro: 'Trois choses à vérifier, y compris sur nous.',
};

export const TOPICS: TopicCard[] = [
  {
    title: 'Comment choisir son installateur',
    text: 'Les questions à poser, les documents à demander, les signaux qui doivent alerter. Posez-les-nous aussi.',
    href: '/installation/trouver-un-installateur',
    accent: true,
  },
  {
    title: 'Ce que couvrent les garanties',
    text: 'Panneaux, onduleur, pose : trois garanties différentes, de durées différentes, et ce que dit la loi belge.',
    href: '/comprendre/garanties',
  },
  {
    /* Carte SANS `href` : il n'y a pas de page « données personnelles » à
       montrer tant que la politique RGPD n'est pas écrite (CLAUDE.md, « À
       compléter »). Une carte inerte vaut mieux qu'un lien vers un gabarit
       vide — voir `href` dans `TopicCard`. */
    title: 'Ce que deviennent vos coordonnées',
    text: 'Elles servent à vous rappeler et à préparer votre étude. Elles ne sont ni revendues, ni transmises à un partenaire, ni utilisées pour autre chose.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Intervenez-vous partout en Belgique ?',
    answer:
      'Notre zone principale est Bruxelles et sa périphérie. Au-delà, écrivez-nous : nous vous dirons franchement si nous pouvons intervenir dans de bonnes conditions plutôt que d’envoyer une équipe trop loin.',
    open: true,
  },
  {
    question: 'Mes coordonnées sont-elles transmises à d’autres installateurs ?',
    answer:
      'Non. Nous ne sommes pas un comparateur : il n’y a pas d’installateur partenaire à qui transmettre quoi que ce soit. Votre demande reste dans notre équipe, et vous n’aurez qu’un seul appel.',
  },
  {
    question: 'La visite et le devis sont-ils payants ?',
    answer:
      'Non. La visite sur place, les mesures et le chiffrage sont gratuits et sans engagement. Vous ne payez qu’après signature, et seulement si vous signez.',
  },
  {
    question: 'Que se passe-t-il si ma toiture ne convient pas ?',
    answer:
      'Nous vous le disons. Une toiture trop ombragée, trop ancienne ou mal orientée ne devient pas rentable parce qu’on a envie de vendre une installation. Et une pose sur une couverture à refaire coûte deux fois le démontage.',
  },
  {
    question: 'Comment vous joindre directement ?',
    /* ⚠️ Le numéro vient de `PHONE` (`site.ts`), qui porte encore un gabarit :
       il se corrigera ici en même temps que dans le header et le footer. */
    answer: `Par téléphone au ${PHONE.label}, ou par le formulaire de devis : c’est la même équipe qui répond aux deux.`,
  },
];

export const FINAL_CTA = {
  title: 'Parlons de votre toiture',
  text: 'Une visite, des mesures, un prix qui tient. Gratuit et sans engagement. Et c’est nous qui venons.',
  cta: { label: 'Demander un devis', href: '/devis' },
} as const;
