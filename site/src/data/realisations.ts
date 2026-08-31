import type { FaqItem, SectionCopy } from './content';

/**
 * Page transverse — « Nos réalisations » (`/realisations`).
 *
 * ⚠️ POURQUOI CE FICHIER N'EST PAS DANS `data/pages/`. Le contrôle d'orphelins
 * de `search-index.json.ts` fait échouer le build sur tout fichier de
 * `data/pages/` que `PAGE_SOURCES` ne réclame pas — et y être, c'est être
 * indexé. Or la page est en `noindex` par décision, faute de chantiers réels.
 * Le fichier vit donc à côté, comme `pillarIndex.ts` et `pageHeroes.ts`, et le
 * garde-fou reste entier.
 *
 * ⚠️ LE JOUR OÙ LES CHANTIERS ARRIVENT, quatre gestes et la page est publiée :
 *   1. remplir les fiches ci-dessous et déposer les photos dans `img/pages/`
 *      (puis `npm run images`) ;
 *   2. déplacer ce fichier dans `src/data/pages/realisations.ts` ;
 *   3. l'entrer dans `PAGE_SOURCES` (`searchSources.ts`) et retirer la ligne
 *      `/realisations` de `NOT_INDEXED` ;
 *   4. retirer `noindex` de `src/pages/realisations.astro`.
 *
 * ⚠️ AUCUN CHANTIER INVENTÉ. Les six fiches sont des GABARITS VIDES : commune,
 * puissance, nombre de panneaux, toiture, matériel, mise en service. Publier des
 * références plausibles mais fausses sur la page qui sert précisément de preuve
 * serait exactement la faute à ne pas commettre — c'est aussi ce que dit déjà
 * l'avertissement de `Testimonials.astro` à propos des avis.
 *
 * ⚠️ CE QUE LE CLIENT DOIT FOURNIR :
 *   — 6 photos de chantiers terminés (toiture entière, de préférence par temps
 *     couvert : le contre-jour mange les panneaux) ;
 *   — pour chacune : commune, puissance en kWc, nombre de panneaux, type de
 *     toiture, marque des panneaux et de l'onduleur, mois de mise en service ;
 *   — l'accord écrit du propriétaire pour publier la photo ;
 *   — des avis clients authentiques et sourcés, pour remplacer le carrousel de
 *     démonstration (voir `Testimonials.astro`).
 */

/**
 * Une fiche chantier.
 *
 * ⚠️ Tous les champs de caractéristiques sont OPTIONNELS, et c'est le sujet même
 * du composant : un champ absent s'affiche en marqueur « à fournir » plutôt
 * qu'en tiret muet. La page doit dire quelles cases restent à remplir.
 */
export interface Realisation {
  /** Commune du chantier. L'adresse exacte n'est JAMAIS publiée. */
  commune?: string;
  /** Ce que la photo montre en un mot : « Toiture inclinée », « Toit plat »… */
  toiture?: string;
  /** Puissance installée, ex. « 6,2 kWc ». */
  puissance?: string;
  /** Nombre de panneaux posés, ex. « 14 panneaux ». */
  panneaux?: string;
  orientation?: string;
  /** Marques posées, ex. « Enphase IQ8 + panneaux 430 Wc ». */
  materiel?: string;
  /** Mois et année de mise en service, ex. « mars 2026 ». */
  miseEnService?: string;
  /** Le fichier photo attendu, tant qu'il n'est pas livré. */
  placeholder: string;
  imageAlt?: string;
}

export const HERO = {
  badge: 'Nos réalisations',
  title: 'À quoi ressemblent nos chantiers ?',
  answer:
    'Des toitures résidentielles à Bruxelles et en périphérie, entre 8 et 20 panneaux le plus souvent. Chaque fiche donne la puissance installée, le nombre de panneaux, le type de toiture et le matériel posé — pour que vous puissiez comparer avec la vôtre.',
  cta: { label: 'Demander un devis', href: '/devis' },
  /* ⚠️ Photo empruntée à la page « Toit plat » : aucune photo de chantier n'est
     livrée. L'emprunt est déclaré dans `data/pageHeroes.ts`. Le placeholder de
     `PageHero` était exclu ici — c'est un aplat gris clair, et la nav se pose
     dessus en blanc. */
  imageAlt: 'Toiture résidentielle équipée de panneaux photovoltaïques',
} as const;

export const LEAD = {
  text: 'Ce que nous montrons d’un chantier : la toiture, la puissance et le matériel. Ce que nous ne montrons jamais : l’adresse, ni le nom du propriétaire. Chaque photo est publiée avec son accord.',
} as const;

export const PROJECTS_COPY: SectionCopy = {
  overline: 'Chantiers récents',
  title: 'Six installations, six toitures différentes',
  intro: 'Cherchez celle qui ressemble à la vôtre : c’est le meilleur repère avant une estimation.',
};

/* ⚠️ SIX FICHES VIDES, EN ATTENTE DES DONNÉES CLIENT. Les noms de fichiers
   photo sont ceux attendus dans `img/pages/` ; les champs se remplissent
   ensuite un par un. Ne pas supprimer une fiche pour « faire propre » : c'est
   le nombre de cases vides qui rappelle ce qui manque. */
export const PROJECTS: Realisation[] = [
  { placeholder: 'realisation-01.jpg' },
  { placeholder: 'realisation-02.jpg' },
  { placeholder: 'realisation-03.jpg' },
  { placeholder: 'realisation-04.jpg' },
  { placeholder: 'realisation-05.jpg' },
  { placeholder: 'realisation-06.jpg' },
];

export const TESTIMONIALS_COPY = {
  overline: 'Ce qu’ils en disent',
  title: 'Après le chantier',
  intro:
    'Des propriétaires qui ont fait poser leurs panneaux par notre équipe, dans les trois régions.',
} as const;

export const FAQ: FaqItem[] = [
  {
    question: 'Puis-je visiter une installation avant de me décider ?',
    answer:
      'Parfois, oui : certains propriétaires acceptent de montrer leur installation à un voisin qui hésite. Demandez-le lors de la visite technique, nous verrons ce qui est possible près de chez vous.',
    open: true,
  },
  {
    question: 'Pourquoi les adresses ne sont-elles pas indiquées ?',
    answer:
      'Parce qu’une installation photovoltaïque est un équipement visible et coûteux, et que publier l’adresse de nos clients ne leur rend aucun service. Nous indiquons la commune, jamais la rue.',
  },
  {
    question: 'Ces chantiers sont-ils représentatifs des prix annoncés ?',
    answer:
      'Ils donnent l’ordre de grandeur des puissances posées, pas un prix : deux toitures de même puissance peuvent différer de plusieurs milliers d’euros selon l’accès, la couverture et le tableau électrique. C’est ce que la visite technique tranche.',
  },
  {
    question: 'Intervenez-vous en dehors de Bruxelles ?',
    answer:
      'Bruxelles et sa périphérie sont notre zone principale. Au-delà, écrivez-nous : nous vous dirons franchement si nous pouvons intervenir dans de bonnes conditions.',
  },
];

export const FINAL_CTA = {
  title: 'Votre toiture ressemble à l’une d’elles ?',
  text: 'Une visite, des mesures, un prix qui tient. Gratuit et sans engagement — et c’est nous qui venons.',
  cta: { label: 'Demander un devis', href: '/devis' },
} as const;
