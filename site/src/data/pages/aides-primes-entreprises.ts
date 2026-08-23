import type { Bridge, FaqItem, Fact, Figure, SectionCopy, TopicCard } from '../content';

/**
 * Contenu de la page « Guide entreprises » (`/aides-primes/entreprises`).
 *
 * Page 1.10 du cahier de construction. Pas de module — le cahier l'indique.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️⚠️ PAGE À NE PAS PUBLIER EN L'ÉTAT.
 *
 * Le cahier de construction la marque « contenu à valider » et signale lui-même
 * que la fiscalité professionnelle n'a pas été vérifiée aussi profondément que
 * le résidentiel. Trois passages y sont explicitement marqués [À VALIDER] :
 * le régime d'amortissement, les aides spécifiques aux entreprises, et les aides
 * sectorielles.
 *
 * CE QUI A ÉTÉ FAIT ICI : les zones non validées ne sont PAS rendues. Écrire
 * « [À VALIDER] » dans une page publique serait pire que de ne rien dire, et
 * inventer un régime fiscal serait un risque juridique pour le client. Les
 * emplacements sont conservés en commentaire, prêts à être remplis dès que le
 * client ou son comptable aura tranché.
 *
 * La page reste donc volontairement plus courte que ses voisines : elle ne dit
 * que ce qui est confirmé. C'est cohérent avec la ligne éditoriale du site —
 * la page Wallonie dit « il n'y a plus de prime » plutôt que de meubler.
 *
 * ⚠️ Elle est en `hidden` dans `site.ts` : liable, mais absente des méga-menus
 * tant que le contenu fiscal n'est pas validé.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const HERO = {
  badge: 'Aides & Primes',
  title: 'Panneaux solaires pour entreprises : quelles règles en 2026 ?',
  /* ⚠️ La réponse du cahier se terminait sur « [À VALIDER : détail exact du
     régime d'amortissement applicable] ». La phrase est coupée avant : elle
     reste vraie et complète sans la partie non vérifiée. */
  answer:
    "Contrairement au résidentiel, une entreprise ne bénéficie pas de la TVA réduite à 6 % sur son installation solaire, et suit un régime d'amortissement fiscal distinct.",
  cta: { label: 'Nous contacter', href: '/contact' },
  imageAlt:
    'Toiture plate d’un bâtiment industriel entièrement couverte de panneaux solaires',
} as const;

export const LEAD = {
  text: "Le solaire professionnel obéit à des règles différentes du résidentiel — voici ce qu'on peut confirmer, et ce qui reste à valider avec un comptable ou fiscaliste avant de s'engager.",
} as const;

export const ESSENTIALS_COPY: SectionCopy = {
  overline: 'En bref',
  title: 'Ce qui diffère du résidentiel',
  intro: 'Les deux points confirmés à ce jour. Le volet fiscal reste à valider avec votre comptable.',
};

/* ⚠️ DEUX cartes chiffres et non trois : la troisième du cahier était
   « Amortissement fiscal — [À VALIDER : mécanisme exact selon le régime de
   l'entreprise] ». Une carte chiffre sans chiffre n'a rien à montrer. Le
   composant accepte le nombre de cartes qu'on lui donne. */
export const FIGURES: Figure[] = [
  { label: 'TVA', value: '21 %', note: 'pas de taux réduit comme pour les particuliers', tone: 'lime' },
  { label: 'Certificats verts', value: '> 10 kWc', note: 'en Wallonie ; toute puissance à Bruxelles', tone: 'ink' },
];

export const FACTS: Fact[] = [
  {
    title: 'Amortissement fiscal',
    text: 'Le régime applicable dépend de la forme et du régime de votre entreprise — à valider avec votre comptable.',
  },
  {
    title: 'Aides sectorielles',
    text: 'Agriculture, PME, secteurs spécifiques : les dispositifs varient et changent souvent. Parlons-en directement.',
  },
];

export const BRIDGES: Bridge[] = [
  {
    title: 'Combien coûte une installation professionnelle ?',
    text: 'Les ordres de grandeur du résidentiel donnent une première base, à ajuster à la surface de votre toiture.',
    cta: { label: 'Voir les prix 2026', href: '/rentabilite-prix' },
  },
  {
    title: 'Votre projet mérite un chiffrage sur mesure',
    text: 'Puissance, fiscalité, raccordement : sur un bâtiment professionnel, rien ne se calcule au forfait.',
    cta: { label: 'Nous contacter', href: '/contact' },
  },
];

export const TOPICS_COPY: SectionCopy = {
  overline: 'Pour aller plus loin',
  title: 'Creuser le sujet',
  intro: 'Les questions à poser avant de se lancer.',
};

/* ⚠️ Une seule des trois entrées du cahier est rendue : les deux autres étaient
   « [À VALIDER — recherche complémentaire nécessaire] » et « [À VALIDER] », sans
   aucun contenu. Elles reviendront telles quelles dès validation. */
export const TOPICS: TopicCard[] = [
  {
    title: 'Les certificats verts sont-ils accessibles aux professionnels ?',
    text: "Oui à Bruxelles pour toute puissance ; en Wallonie, seulement au-delà de 10 kWc — la limite qui a mis fin au Solwatt résidentiel en 2014 ne s'applique pas aux plus grosses installations.",
    accent: true,
  },
];

export const FAQ: FaqItem[] = [
  {
    question: 'Une entreprise peut-elle bénéficier de la TVA à 6 % ?',
    answer: 'Non, sauf cas particuliers à vérifier au cas par cas.',
    open: true,
  },
  {
    question: 'Les certificats verts sont-ils accessibles aux professionnels partout en Belgique ?',
    answer:
      'Pas uniformément — Bruxelles reste la plus accessible, la Wallonie réserve ça aux installations de plus de 10 kWc.',
  },
];

export const FINAL_CTA = {
  title: 'Parlons de votre projet professionnel',
  text: "Fiscalité, puissance, raccordement : on chiffre votre cas avec vous. Vous parlez directement à l'équipe qui installe.",
  cta: { label: 'Nous contacter', href: '/contact' },
} as const;
