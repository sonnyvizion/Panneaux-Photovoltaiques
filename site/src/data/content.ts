/**
 * Types des blocs de contenu des pages des 4 piliers.
 *
 * Ils décrivent le gabarit de `pages-contenu.md` : réponse visible → module →
 * essentiel → accordéons → FAQ → ponts simulateur. Un fichier de page les
 * remplit, les composants les consomment.
 *
 * ⚠️ Ces interfaces **préfigurent le modèle Sanity** (`keyAnswer`, `module`,
 * `accordion`, `faq`, `simulatorBridge`). Les nommer d'après les blocs du CMS
 * plutôt que d'après les composants Astro est délibéré : le jour de la bascule,
 * c'est la couche de données qui change, pas les composants.
 *
 * Déclarés ici et non dans les `.astro` : un type exporté depuis un frontmatter
 * Astro n'est pas résoluble de façon fiable par `tsc`.
 */

/** Lien vers le simulateur, contextualisé au sujet de la page. */
export interface ContentLink {
  label: string;
  href: string;
}

/** Une Q/R de FAQ. Elle alimente l'affichage ET le balisage `FAQPage`. */
export interface FaqItem {
  question: string;
  answer: string;
  /** Ouvert au chargement. Un seul par bloc — ils sont exclusifs. */
  open?: boolean;
}

/**
 * Carte chiffre de « L'essentiel » : un cas, son ordre de grandeur.
 *
 * `tone` reprend les trois aplats de la maquette. Le cas courant est en `lime`
 * — la carte d'accent désigne le scénario le plus fréquent, pas le moins cher.
 */
export interface Figure {
  label: string;
  /** Sur-libellé de la valeur, ex. « à partir de ». */
  prefix?: string;
  value: string;
  tone: 'grey' | 'lime' | 'ink';
}

/** Carte texte de « L'essentiel » : une condition, en clair. */
export interface Fact {
  title: string;
  text: string;
}

/**
 * Pont contextualisé vers une autre page ou vers le simulateur
 * (`pages-contenu.md` § « La boucle contenu ↔ simulateur »).
 */
export interface Bridge {
  title: string;
  text: string;
  cta: ContentLink;
}

/** Entrée repliée de « Creuser le sujet ». */
export interface DeepDiveItem {
  title: string;
  text: string;
  open?: boolean;
}

/** En-tête de section : surtitre, titre, chapô. */
export interface SectionCopy {
  overline: string;
  title: string;
  intro?: string;
}
