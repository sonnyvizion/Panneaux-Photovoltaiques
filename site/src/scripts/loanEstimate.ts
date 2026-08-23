/**
 * Mensualité d'un Rénoprêt à taux 0 %, pour le module de la page
 * « Aides & primes — Wallonie ».
 *
 * ⚠️ CE N'EST PAS LE SIMULATEUR (règle d'or #3), et ce n'est pas non plus une
 * offre de crédit. Le module répond à UNE question — « si j'emprunte ce montant,
 * ça fait combien par mois ? » — et se termine sur un pont « Vérifier mon
 * éligibilité ». Il ne demande ni revenus, ni composition de ménage, ni âge du
 * logement : c'est précisément ce qui décide de l'éligibilité, et ce que le
 * module ne prétend donc pas trancher.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ CONSTANTES À VALIDER PAR LE CLIENT (CLAUDE.md § « À compléter »).
 * Le Rénoprêt de la SWCS n'est à 0 % que pour certaines tranches de revenus ;
 * au-delà, le taux monte. Le module affiche donc explicitement « à taux 0 % »
 * et renvoie à l'éligibilité — il ne doit JAMAIS présenter sa mensualité comme
 * celle que le visiteur obtiendra.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * À 0 %, la mensualité est une simple division : `montant / (années × 12)`.
 * Pas d'amortissement, pas d'intérêts composés — et c'est tout l'argument de la
 * page : ce qu'on rembourse est exactement ce qu'on a emprunté.
 */

/**
 * Bornes du curseur, en euros — celles du Rénoprêt lui-même.
 *
 * Le plafond de 60 000 € est le chiffre que la carte « L'essentiel » annonce
 * juste au-dessus dans la page : le curseur doit pouvoir l'atteindre, sinon le
 * module contredit la carte. Le plancher est arrondi sous le prix d'une
 * installation de 3 kWc — en dessous, on n'emprunte pas.
 */
export const LOAN_MIN = 5000;
export const LOAN_MAX = 60000;

/**
 * Pas du curseur, en euros.
 *
 * 500 € : c'est déjà la granularité d'affichage des prix
 * (`PRICE_ROUNDING` dans `powerEstimate.ts`). Un pas plus fin afficherait des
 * montants au centaine près que le reste du site arrondit — la page se
 * contredirait d'un bloc à l'autre.
 */
export const LOAN_STEP = 500;

/**
 * Montant par défaut — et état rendu en HTML sans JavaScript.
 *
 * ⚠️ VOLONTAIREMENT AU-DESSUS du prix d'une installation nue, que le site
 * chiffre ailleurs autour de 7 500 € pour 6 kWc (`powerEstimate.ts`). Ce n'est
 * pas une incohérence : un Rénoprêt ne finance pas des panneaux, il finance un
 * bouquet de rénovation — panneaux, batterie, pompe à chaleur, isolation. Le
 * module ne demande donc pas « combien coûtent vos panneaux » mais « combien
 * empruntez-vous », et démarrer sur le seul prix des panneaux aurait suggéré le
 * contraire.
 *
 * 15 000 € est la valeur de la maquette, et elle tombe juste pour une autre
 * raison : sur une plage qui monte à 60 000 €, une poignée posée à 7 500 € est
 * à 4 % de la piste — le visiteur la croit au minimum et ne pense pas à la
 * tirer. C'est le seul endroit du site où il manipule quelque chose (règle d'or
 * #5) : la position de départ doit inviter au geste.
 */
export const LOAN_DEFAULT = 15000;

/** Durées proposées, en années. Celles du Rénoprêt (30 ans maximum). */
export const LOAN_TERMS = [10, 20, 30] as const;

export type LoanTerm = (typeof LOAN_TERMS)[number];

/** Durée sélectionnée au chargement (tuile en accent sur la maquette). */
export const LOAN_TERM_DEFAULT: LoanTerm = 10;

/**
 * Plafond de la jauge, en euros par mois.
 *
 * Échelle ABSOLUE et non relative à la durée choisie : c'est ce qui fait que
 * passer de 10 à 30 ans RÉTRÉCIT la barre à vue d'œil, à montant inchangé. Une
 * jauge recalée sur chaque durée ne bougerait pas d'un pixel — elle doublerait
 * le curseur et n'apprendrait rien.
 *
 * Sa valeur est le pire cas atteignable : le montant maximum sur la durée la
 * plus courte.
 */
export const MONTHLY_MAX = LOAN_MAX / (Math.min(...LOAN_TERMS) * 12);

export function clampAmount(euros: number): number {
  if (!Number.isFinite(euros)) return LOAN_DEFAULT;
  return Math.min(LOAN_MAX, Math.max(LOAN_MIN, euros));
}

/** Une durée du groupe, ou celle par défaut si la valeur est inconnue. */
export function clampTerm(years: number): LoanTerm {
  return (LOAN_TERMS as readonly number[]).includes(years)
    ? (years as LoanTerm)
    : LOAN_TERM_DEFAULT;
}

/**
 * La mensualité, en euros.
 *
 * ⚠️ Arrondie à l'euro alors que la division est EXACTE (7 500 € sur 10 ans font
 * 62,50 € au centime près). Les centimes sont vrais mais trompeurs : ils
 * donneraient au chiffre l'autorité d'une offre alors que le taux réellement
 * accordé dépend de l'éligibilité. L'affichage le préfixe d'un « ≈ » pour la
 * même raison.
 */
export function monthly(euros: number, years: number): number {
  return Math.round(clampAmount(euros) / (clampTerm(years) * 12));
}

/**
 * Position de la mensualité sur la jauge, en pourcentage de `MONTHLY_MAX`.
 * Exportée parce qu'elle est testable, et parce que la même valeur sert au
 * rendu serveur et à la mise à jour côté client.
 */
export function monthlyRatio(euros: number, years: number): number {
  const ratio = monthly(euros, years) / MONTHLY_MAX;
  return Math.min(Math.max(ratio, 0), 1) * 100;
}

/** Position du curseur sur sa plage, en pourcentage — le remplissage de la piste. */
export function amountRatio(euros: number): number {
  return ((clampAmount(euros) - LOAN_MIN) / (LOAN_MAX - LOAN_MIN)) * 100;
}
