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
  /**
   * Sous-libellé : la condition qui rend le chiffre vrai, ex. « logement > 10
   * ans », « à votre charge ».
   *
   * Distinct de `prefix`, qui qualifie la valeur (« à partir de ») : celui-ci
   * la RESTREINT. Sur la page Aides & primes, un « Taux 0 % » sans son « jusqu'à
   * 60 000 € » serait un chiffre qu'on ne peut pas tenir.
   */
  note?: string;
  tone: 'grey' | 'lime' | 'ink';
}

/** Carte texte de « L'essentiel » : une condition, en clair. */
export interface Fact {
  title: string;
  text: string;
}

/**
 * Carte PHOTO de « L'essentiel » : un objet physique, montré.
 *
 * ⚠️ POURQUOI CE TYPE EXISTE. La carte chiffre pousse sa `value` en très gros
 * en bas à droite — un format taillé pour « 20-22 kg » ou « 6 ans ». Appliqué à
 * du texte qualitatif (« Capte », « Détaillé », « Un par panneau »), il fait
 * flotter un mot sans échelle à la place d'un chiffre : l'œil lui accorde le
 * poids d'une statistique, et ce n'en est pas une. Quand les trois cartes
 * désignent trois OBJETS distincts et photographiables, c'est la photo qui
 * porte l'information, pas une valeur géante.
 */
export interface PhotoCard {
  title: string;
  text: string;
  /**
   * Nom du fichier attendu, ex. `onduleur-carte-micro.jpg`.
   *
   * ⚠️ Tant que la photo n'est pas livrée, c'est un `ImagePlaceholder` étiqueté
   * de ce nom qui s'affiche — voir le principe « pas de stock générique » de
   * `design.md`. Le jour de la livraison, seul le composant change.
   */
  image: string;
}

/**
 * Carte ICÔNE de « L'essentiel » : une facette qualitative, sans chiffre.
 *
 * Le cas de figure où les trois cartes sont trois facettes parallèles d'un même
 * sujet (rôle / impact / installation) : rien à photographier séparément, et
 * rien à mesurer non plus. L'icône tient le rôle de repère visuel que la valeur
 * géante tenait mal.
 *
 * ⚠️ L'icône est un COMPOSANT passé par la page, jamais une clé résolue ici —
 * même raison que `TopicCard` : chaque page a son jeu d'icônes, et un registre
 * central les importerait toutes dans chacune.
 */
export interface IconCard {
  title: string;
  text: string;
}

/**
 * Tableau de « L'essentiel » : une vraie comparaison.
 *
 * Trois objets comparés sur les mêmes critères ne sont pas trois cartes : les
 * cartes cassent justement le lien qui rend la comparaison lisible. Le tableau
 * le rétablit — on lit une colonne de haut en bas.
 */
export interface EssentialsTable {
  /** En-têtes de colonnes. La première nomme la ligne. */
  head: string[];
  rows: string[][];
}

/**
 * Une ligne de la liste empilée — famille H du registre des modules.
 *
 * ⚠️ CE N'EST PAS UNE CARTE. Pas de fond, pas de rayon : les lignes sont
 * séparées par un filet pointillé et rien d'autre. C'est ce qui les fait lire
 * comme une suite — un raisonnement en trois temps — plutôt que comme trois
 * objets indépendants posés côte à côte.
 */
export interface StackedRow {
  /** Le mot en capitales, à gauche du titre : rôle, impact, installation… */
  eyebrow: string;
  title: string;
  text: string;
}

/**
 * Bloc ÉDITORIAL de « L'essentiel » (Figma 699:1140).
 *
 * ⚠️ CELUI-CI REMPLACE L'EN-TÊTE DE SECTION, il ne s'y ajoute pas. Son titre
 * EST le `h2` de la section — d'où l'absence de surtitre et de chapô sur les
 * pages qui l'emploient. Les leur laisser aurait fait trois titres d'affilée.
 *
 * Le cas de figure : une page dont la réponse tient en un paragraphe, et dont
 * les chiffres sont trop peu nombreux ou trop dispersés pour faire une grille.
 * Sur Impact écologique, les deux vraies grandeurs (tonnes de CO₂, années
 * d'amortissement carbone) sont désormais DANS le texte, à leur place — une
 * grille les sortait de la phrase qui les rendait compréhensibles.
 */
export interface EssentialsEditorial {
  /** Devient le `h2` de la section. */
  title: string;
  /** Le paragraphe, dans sa carte blanche. Un seul, volontairement. */
  text: string;
  imageAlt: string;
}

/**
 * Carte unique de « L'essentiel », à plusieurs lignes.
 *
 * Pour le cas où les « trois informations » sont en réalité trois conséquences
 * d'un seul fait. Les séparer en trois cartes leur donne une indépendance
 * qu'elles n'ont pas.
 */
export interface EssentialsPanel {
  /**
   * Optionnel : quand le titre de section dit déjà la même chose, la carte s'en
   * passe. C'est le cas de la réglementation bruxelloise, où le titrer aurait
   * fait lire trois fois « ce qui change concrètement depuis 2026 » d'affilée.
   */
  title?: string;
  items: string[];
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

/**
 * Carte-lien de « Creuser le sujet », variante encyclopédie.
 *
 * L'autre forme du même bloc du gabarit (`pages-contenu.md` §4). `DeepDiveItem`
 * replie une réponse DANS la page ; celle-ci envoie vers une page dédiée.
 *
 * Le choix se fait sur la longueur du sujet, pas sur le goût : un arbitrage de
 * trois phrases se replie, une aide régionale qui a sa propre page se lie. La
 * page Aides & primes a quatre sujets qui existent déjà au sitemap, d'où les
 * cartes ; la page prix, cinq digressions qui n'en méritent pas, d'où les
 * accordéons.
 *
 * Pas de libellé de lien : c'est la carte entière qui est cliquable, et son
 * titre qui la nomme. Un « en savoir plus » de plus n'apprendrait rien et
 * donnerait quatre liens de même nom à un lecteur d'écran.
 */
export interface TopicCard {
  title: string;
  text: string;
  /**
   * Destination, quand le sujet a une page.
   *
   * ⚠️ OPTIONNEL : la plupart des pages du sitemap développent leurs quatre
   * sujets sur place, sans page dédiée. La carte devient alors un simple bloc
   * de texte — sans flèche, sans survol, sans entrée au clavier. Une carte
   * cliquable qui ne mène nulle part est pire qu'une carte inerte.
   */
  href?: string;
  /**
   * Porte l'aplat d'accent. Un seul par grille — le wireframe générique du
   * cahier de construction demande « 2x2, 1 accent ».
   */
  accent?: boolean;
  /**
   * Points énumérés sous le texte, quand la carte porte une liste plutôt qu'un
   * paragraphe (famille F du registre : « permis / pas permis »).
   *
   * Une vraie `<ul>` et non des puces dans une chaîne : ce sont des éléments
   * distincts, un lecteur d'écran doit les annoncer comme tels et en donner le
   * nombre. C'est précisément ce que la page « Installer soi-même » demande —
   * savoir combien de choses tombent de chaque côté de la limite.
   */
  items?: string[];
}

/** En-tête de section : surtitre, titre, chapô. */
export interface SectionCopy {
  overline: string;
  title: string;
  intro?: string;
}

/**
 * Étape d'une timeline de démarches (famille D du registre des modules).
 *
 * Les trois pages « Démarches » du pilier Aides & primes partagent ce module :
 * même composant, deux à quatre étapes selon la région.
 */
export interface TimelineStep {
  title: string;
  text: string;
  /**
   * Pastille d'accent sur l'étape, ex. « Pris en charge par notre équipe ».
   *
   * C'est l'argument anti-intermédiaire posé exactement là où le doute naît —
   * au milieu d'une liste de formalités administratives (règle d'or #7). Une
   * seule étape par page la porte, sinon elle ne signale plus rien.
   */
  badge?: string;
}

/**
 * Cellule d'un comparateur multi-options (famille B du registre).
 *
 * `status` porte le pictogramme, `text` la nuance. Les deux sont facultatifs :
 * une case peut n'avoir qu'un symbole (« ✕ »), qu'un texte (« Tarif prosumer »),
 * ou les deux (« ✕ depuis 2014 »).
 *
 * ⚠️ `status` est un ÉTAT, pas un caractère. Le composant en tire à la fois le
 * signe visible et un mot lu par les lecteurs d'écran — une croix collée dans
 * du texte s'annoncerait « lettre x » ou serait passée sous silence.
 */
export interface ComparatorCell {
  status?: 'yes' | 'no' | 'na';
  text?: string;
}

/** Ligne d'un comparateur : un critère, une cellule par option comparée. */
export interface ComparatorRow {
  label: string;
  cells: ComparatorCell[];
}

/**
 * État d'une bascule à deux positions (famille C du registre).
 *
 * ⚠️ Les DEUX états sont rendus dans le HTML, jamais construits au clic : leur
 * texte doit être indexable (règle d'or #1). La bascule ne fait que masquer, et
 * elle le fait en CSS.
 */
export interface ToggleState {
  /** Libellé du bouton, ex. « Avant 2021 ». */
  label: string;
  title: string;
  text: string;
  /** Ce que le mécanisme donne, en une formule courte et frappante. */
  highlight?: string;
}

/**
 * Étape du schéma « voyage du photon » (famille G du registre — schéma animé
 * au scroll).
 *
 * Purement descriptif : ce module n'a aucun calcul, il raconte un trajet. Le
 * texte de chaque étape est du HTML normal, indexable — seule sa mise en scène
 * est animée (règle d'or #1).
 */
export interface FlowStep {
  /** Le nom de l'étape, ex. « Cellule photovoltaïque ». */
  title: string;
  /** Ce qui s'y passe, en une phrase. */
  text: string;
  /** L'état de l'énergie à ce point du trajet, ex. « courant continu ». */
  state?: string;
}
