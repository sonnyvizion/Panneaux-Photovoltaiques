/**
 * Estimation d'ordre de grandeur pour le module « Puissance installée » de la
 * page Rentabilité & prix.
 *
 * ⚠️ CE N'EST PAS LE SIMULATEUR (règle d'or #3). C'est une brique illustrative :
 * elle montre COMMENT le prix varie avec la puissance, elle ne calcule pas le
 * projet du visiteur. Aucune région, aucune orientation, aucune consommation,
 * aucune coordonnée — le module se termine sur un pont vers `/simulateur`, qui
 * seul fait le vrai calcul.
 *
 * Les valeurs sont volontairement arrondies au demi-millier : le positionnement
 * validé (CLAUDE.md, « Option A ») veut des fourchettes, le détail précis étant
 * réservé à l'étude personnalisée de l'équipe. Un chiffre à l'euro près ici
 * serait une fausse précision, et un engagement qu'on ne peut pas tenir.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ CONSTANTES À VALIDER PAR LE CLIENT (CLAUDE.md § « À compléter »).
 * Tant qu'elles ne le sont pas, aucun de ces chiffres ne doit être présenté
 * comme un prix.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ⚠️ Les repères de la maquette Figma ne sont PAS cohérents entre eux : le
 * widget y affiche « 10 kWc · ~14 000 € » (1,40 €/Wc) quand la carte
 * « L'essentiel » de la même page annonce 10 000 € (1,00 €/Wc), et le texte
 * affirme par ailleurs que le coût par Wc BAISSE avec la taille — ce que le
 * premier chiffre contredit. Une seule source fait foi : ce fichier. Les trois
 * blocs de la page tirent leurs chiffres d'ici, ils ne peuvent donc plus se
 * contredire. Les valeurs qui en résultent s'écartent de la copie Figma pour
 * 5-6 kWc et 10 kWc — à revoir avec le client, pas à « recorriger » vers Figma.
 */

/** Bornes du curseur, en kWc. En deçà et au-delà, ce n'est plus du résidentiel. */
export const POWER_MIN = 3;
export const POWER_MAX = 10;
/**
 * Pas du curseur.
 *
 * Fin (0,1) et non entier : à 1 kWc, la plage n'offrait que huit positions et le
 * pouce sautait de l'une à l'autre au lieu de suivre le doigt. C'est le seul
 * endroit du site où le visiteur manipule quelque chose — s'il y sent du
 * saccadé, la démonstration perd sa force.
 *
 * Le prix, lui, reste quantifié au demi-millier : c'est la CIBLE qui saute de
 * 7 500 à 8 000, et l'animation qui traverse les valeurs intermédiaires.
 */
export const POWER_STEP = 0.1;
/** Le cas courant en Belgique — et l'état rendu en HTML sans JavaScript. */
export const POWER_DEFAULT = 6;

/**
 * Le prix est modélisé en DEUX parts, TVA 6 % comprise :
 *
 *   prix = part fixe + part proportionnelle à la puissance
 *
 * C'est exactement ce que la page explique — les coûts qui ne dépendent pas du
 * nombre de panneaux (déplacement, échafaudage, onduleur, raccordement,
 * administratif) se répartissent sur une puissance croissante. La dégressivité
 * du €/Wc n'est donc pas une constante de plus à régler : elle SORT du modèle.
 *
 * Un modèle en « €/Wc dégressif » a été essayé d'abord et abandonné : couplé à
 * l'arrondi en fourchette, il faisait remonter le prix au Wc entre 4 et 5 kWc —
 * la page se contredisait sur son argument central. Ici, chaque palier entier
 * tombe en plus sur un multiple de 500 sans qu'on ait à l'arrondir.
 */
const PRICE_FIXED = 1500;
const PRICE_PER_KWC = 1000;

/** Puissance unitaire d'un panneau courant en 2026, en Wc. */
export const WC_PER_PANEL = 430;

/**
 * Encombrement d'un panneau, en m².
 *
 * La page « Dimensions » publie « environ 1,9 à 2 m² par panneau » ; on retient
 * la borne haute, qui inclut de fait les pertes de calepinage. Exportée parce
 * que le simulateur en a besoin pour convertir une surface de toiture en
 * puissance installable — et qu'il ne doit pas la redéclarer.
 */
export const M2_PER_PANEL = 2;

/**
 * Productible belge moyen, en kWh par kWc et par an, toutes orientations.
 *
 * ⚠️ EXPORTÉE : c'est la source unique du productible pour tout le site. Le
 * modèle des certificats verts en avait recopié une seconde déclaration, ce qui
 * ouvrait la porte à deux productibles divergents — et donc à une page qui
 * annonce 5 400 kWh pendant qu'une autre en calcule 5 000 sans que rien ne le
 * signale. Toute nouvelle formule qui a besoin d'une production part d'ici.
 */
export const KWH_PER_KWC_YEAR = 900;

/** Granularité d'affichage des prix : une fourchette, pas un devis. */
const PRICE_ROUNDING = 500;
/** Idem pour la production, dont la précision réelle est bien moindre. */
const PRODUCTION_ROUNDING = 50;

export interface PowerEstimate {
  /** Prix TVAC, en euros. */
  price: number;
  /** Nombre de panneaux nécessaires pour atteindre la puissance. */
  panels: number;
  /** Production annuelle estimée, en kWh. */
  production: number;
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export function clampPower(kwc: number): number {
  if (!Number.isFinite(kwc)) return POWER_DEFAULT;
  return Math.min(POWER_MAX, Math.max(POWER_MIN, kwc));
}

export function estimate(kwc: number): PowerEstimate {
  const power = clampPower(kwc);

  /**
   * ⚠️ La puissance est convertie en Wc ENTIERS avant toute division.
   *
   * `4.3 * 1000` vaut `4300.000000000001` en virgule flottante, et
   * `Math.ceil(4300.000000000001 / 430)` renvoie **11** panneaux là où 10
   * suffisent. Le défaut était invisible tant que le curseur avait un pas
   * entier ; avec un pas de 0,1 il tombe sur une position atteignable sur deux.
   */
  const wc = Math.round(power * 1000);

  return {
    price: roundTo(PRICE_FIXED + power * PRICE_PER_KWC, PRICE_ROUNDING),
    /* Arrondi au SUPÉRIEUR : on ne peut pas poser 13,95 panneau, et une
       installation en dessous de la puissance visée ne la tiendrait pas. */
    panels: Math.ceil(wc / WC_PER_PANEL),
    production: roundTo((wc / 1000) * KWH_PER_KWC_YEAR, PRODUCTION_ROUNDING),
  };
}

/* Les euros et les nombres nus sont formatés dans `format.ts`, partagé avec le
   module Rénoprêt de la page Aides & primes. Ré-exportés ici : c'est de ce
   module que le composant et son script les importent depuis toujours, et rien
   ne gagne à faire bouger ces imports. */
export { formatEuro, formatNumber } from './format';

/* `maximumFractionDigits: 1` sans minimum : une puissance ronde s'écrit « 6 »
   et non « 6,0 ». Le zéro de fin donnerait au chiffre une précision qu'il n'a
   pas, et ferait sautiller la largeur du libellé au passage de 5,9 à 6. */
const powerFormat = new Intl.NumberFormat('fr-BE', { maximumFractionDigits: 1 });

/**
 * La puissance et son unité : « 6 kWc », « 6,4 kWc ».
 *
 * L'espace est une fine insécable (U+202F), la même que celle du rendu serveur —
 * un caractère différent des deux côtés décalerait la valeur au premier
 * déplacement du curseur.
 */
export function formatPower(kwc: number): string {
  return `${powerFormat.format(clampPower(kwc))} kWc`;
}

/**
 * Répartition mensuelle de la production, en kWh, de janvier à décembre.
 *
 * ⚠️ AUCUNE DONNÉE EXTERNE. Douze valeurs d'irradiation présentées comme
 * mesurées seraient la seule donnée du site à prétendre une précision qu'on ne
 * peut pas vérifier. La courbe est donc un MODÈLE, calibré sur un repère que le
 * site publie déjà : la page « Rendement & production » affirme qu'« un mois de
 * décembre peut être 5 à 6 fois plus faible qu'un mois de juillet ».
 *
 * Une cosinusoïde centrée sur le solstice, dont l'amplitude est déduite de ce
 * seul rapport, puis normalisée pour que les douze mois somment EXACTEMENT à la
 * production annuelle. Le total ne peut donc pas diverger de `estimate()`.
 *
 * ⚠️ Remplaçable par des données PVGIS le jour où on en a : ce sont douze
 * coefficients à substituer, le reste du code ne bouge pas.
 */
export const MONTH_LABELS = [
  'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin',
  'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc',
] as const;

/** Rapport entre le meilleur et le pire mois — le repère publié par la page. */
export const SUMMER_WINTER_RATIO = 5.5;

/* Le pic tombe entre juin et juillet : l'ensoleillement suit le solstice, pas le
   calendrier. Exprimé en index de mois (0 = janvier), d'où 5,5. */
const PEAK_MONTH = 5.5;

/* Amplitude déduite du rapport publié, jamais réglée à la main :
   r = (1 + A·c) / (1 − A·c), avec c = cos(π/12) l'écart entre juillet et le pic. */
const PEAK_OFFSET = Math.cos(Math.PI / 12);
const AMPLITUDE =
  (SUMMER_WINTER_RATIO - 1) / (PEAK_OFFSET * (SUMMER_WINTER_RATIO + 1));

export function monthlyProduction(kwc: number): number[] {
  const weights = MONTH_LABELS.map(
    (_, month) => 1 + AMPLITUDE * Math.cos(((month - PEAK_MONTH) * 2 * Math.PI) / 12),
  );
  const total = weights.reduce((sum, w) => sum + w, 0);
  const yearly = estimate(kwc).production;
  return weights.map((w) => (yearly * w) / total);
}

/**
 * Position du curseur sur la plage, en pourcentage — pour la jauge de prix.
 * Exportée parce qu'elle est testable, et parce que la même valeur sert au
 * rendu statique côté serveur et à la mise à jour côté client.
 */
export function powerRatio(kwc: number): number {
  return ((clampPower(kwc) - POWER_MIN) / (POWER_MAX - POWER_MIN)) * 100;
}
