import type { FaqItem, SectionCopy, TimelineStep } from '../content';
import type { PageSeo } from '../seo';

/**
 * Contenu de la page « Démarches administratives Bruxelles »
 * (`/aides-primes/bruxelles/demarches`).
 *
 * Page 1.6 du cahier, texte de `redaction-demarches-bruxelles.md`.
 * **Gabarit allégé** — la rédaction le dit explicitement : « pas de bloc
 * Essentiel ni Creuser le sujet, la timeline porte l'essentiel du contenu ».
 *
 * C'est la page qui a servi de modèle aux deux autres « Démarches » : elles
 * étaient déjà codées avant elle, sur le même composant, sans rien de plus.
 *
 * ⚠️ La pastille de l'étape 2 est, selon la rédaction, « le seul élément
 * différenciateur concret de toute la page » — l'accompagnement Sibelga. Elle
 * doit rester visuellement distincte, pas noyée dans le texte.
 */

/**
 * Ce que Google lit en tête de page — contraintes vérifiées au build
 * (`data/seo.ts`).
 *
 * La requête tapée mêle les deux organismes (« Sibelga Brugel certificats
 * verts ») : c'est précisément la confusion que la page lève, et la description
 * les nomme donc tous les deux.
 */
export const SEO: PageSeo = {
  title: 'Démarches certificats verts Bruxelles 2026 | Belgreen',
  description:
    'Certification RESCert, encodage des index sur Green Meter Sibelga, octroi par Brugel : les trois étapes pour toucher vos certificats verts, dans l’ordre.',
};

export const HERO = {
  badge: 'Aides & Primes',
  title: 'Les démarches pour toucher vos certificats verts à Bruxelles',
  answer:
    "À Bruxelles, il faut faire certifier l'installation (RESCert), encoder les index de production sur la plateforme Green Meter de Sibelga, puis laisser Brugel octroyer les certificats verts — quatre fois par an, dans les quinze jours calendrier suivant l'encodage.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
  imageAlt: 'Toitures bruxelloises en enfilade avec panneaux solaires dans un quartier résidentiel dense',
} as const;

export const LEAD = {
  text: "Trois étapes, trois interlocuteurs différents. C'est justement là que la plupart des propriétaires se perdent — Sibelga et Brugel ne sont pas la même chose, et personne ne vous le rappelle nulle part. Voici comment ça se déroule concrètement, et ce qu'on prend en charge pour vous.",
  note: 'Les trois étapes, dans l’ordre où elles se présentent.',
} as const;

export const TIMELINE_COPY: SectionCopy = {
  overline: 'Étape par étape',
  title: 'Le parcours administratif',
  intro: 'Du certificat RESCert à la délivrance par Brugel.',
};

export const TIMELINE: TimelineStep[] = [
  {
    title: 'Certification RESCert',
    text: 'Votre installateur certifie l’installation. Depuis le 1er janvier 2026, ce certificat est obligatoire pour toute installation de 5 kWc ou moins : sans lui, pas d’accès aux certificats verts.',
  },
  {
    title: 'Déclaration Sibelga',
    text: 'Le relevé des index de production se fait via la plateforme Sibelga, aussi appelée « greenmeter ». C’est une étape que beaucoup de propriétaires trouvent fastidieuse — notre équipe s’en charge directement avec vous.',
    badge: 'Pris en charge par notre équipe',
  },
  {
    title: 'Demande auprès de Brugel',
    text: 'Sur base des index transmis par Sibelga, Brugel calcule et octroie vos certificats verts. Sibelga vous invite à encoder vos index quatre fois par an — en mars, juin, septembre et décembre — et l’octroi suit dans les quinze jours calendrier.',
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Quelle est la différence entre Sibelga et Brugel ?',
    answer:
      'Sibelga est le gestionnaire du réseau de distribution à Bruxelles — c’est lui qui relève les index de production de votre installation. Brugel est le régulateur régional qui calcule et délivre les certificats verts sur base de ces relevés. Deux organismes, deux rôles distincts, mais un seul dossier à suivre.',
    open: true,
  },
  {
    question: 'À quelle fréquence dois-je déclarer ma production ?',
    answer:
      'Quatre fois par an : Sibelga vous envoie un e-mail en mars, juin, septembre et décembre pour vous inviter à encoder votre index sur Green Meter. Rien ne vous oblige à répondre à chaque fois — espacer les encodages allège les démarches, mais retarde d’autant l’octroi de vos certificats.',
  },
  {
    question: 'Combien de temps avant de recevoir mes premiers certificats ?',
    answer:
      'Une fois votre index encodé sur Green Meter, Brugel octroie les certificats dans les quinze jours calendrier — souvent le lundi suivant, Sibelga lui transmettant les données chaque semaine. Le délai réel se joue donc avant : sur la certification de l’installation, pas sur l’octroi.',
  },
  {
    question: 'Dois-je gérer moi-même le raccordement Sibelga, ou votre équipe s’en occupe ?',
    answer:
      'Notre équipe gère cette étape avec vous — ce n’est pas une prestation ponctuelle, c’est une démarche qu’on accompagne pour tous nos clients bruxellois. Vous n’avez pas à naviguer seul entre les plateformes.',
  },
];

export const FINAL_CTA = {
  title: 'On gère votre raccordement Sibelga de A à Z',
  text: "Ce n'est pas à vous de vous débrouiller seul. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Estimer mon installation', href: '/simulateur' },
} as const;
