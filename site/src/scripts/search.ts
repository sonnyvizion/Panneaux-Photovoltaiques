/**
 * Moteur de la recherche interne — normalisation, appariement, classement.
 *
 * Fonctions PURES, sans DOM ni `fetch` : tout ce qui décide de l'ordre des
 * résultats est testable sans navigateur, comme `savings.ts` ou `orientation.ts`.
 * Le câblage vit dans `searchOverlay.ts`, l'index dans `search-index.json.ts`.
 *
 * ⚠️ POURQUOI PAS DE BIBLIOTHÈQUE. 46 pages, un champ de recherche : un moteur
 * d'index inversé coûterait plus en octets qu'il ne rapporterait en pertinence,
 * et la règle d'or #1 se mesure en JavaScript envoyé. Le balayage linéaire de 46
 * entrées est instantané, et le classement reste lisible et réglable.
 *
 * ⚠️ UN RÉSULTAT = UNE PAGE, mais le texte INDEXÉ descend aux questions de FAQ
 * et aux titres de cartes (`strong`). C'est ce qui fait que « onduleur qui fait
 * du bruit » trouve `/comprendre/onduleur` : la question est dans le sac de
 * mots, même si le résultat affiché reste la page entière.
 */

/** Une page indexée. Produit par `search-index.json.ts`. */
export interface SearchEntry {
  href: string;
  /** Libellé court de la nav — le nom le plus reconnaissable de la page. */
  label: string;
  /** Pilier d'appartenance, affiché en fil d'Ariane du résultat. */
  pillar: string;
  title: string;
  /** Réponse-clé du hero : c'est ELLE qu'on lit sous le titre du résultat. */
  answer: string;
  /** Questions de FAQ, titres de cartes et de faits. */
  strong: string[];
  /** Chapô, textes de cartes, notes de chiffres. */
  weak: string[];
  /**
   * Ce que la page EST dans l'architecture : son pilier, et les segments de son
   * URL.
   *
   * ⚠️ Ce n'est pas du remplissage. La page `/aides-primes/bruxelles` s'intitule
   * « Certificats verts à Bruxelles » et n'écrit JAMAIS le mot « prime » — à
   * Bruxelles, il n'y en a pas. Sans ce champ, « prime bruxelles », qui est une
   * requête parfaitement naturelle, ne la trouvait pas du tout et remontait la
   * Flandre. Le pilier « Aides & primes » porte ce que la page est venue traiter,
   * même quand sa réponse est « il n'y en a pas ».
   */
  context: string;
}

export interface SearchResult {
  entry: SearchEntry;
  score: number;
}

/**
 * Poids par champ. Ils encodent une intention : le nom de la page pèse plus que
 * ce qui est écrit dedans, sinon une page longue qui mentionne un mot en passant
 * passerait devant la page qui PORTE ce mot.
 *
 * L'ordre se lit comme une échelle de PREUVE, du plus au moins probant :
 *
 *   label 10 · title 8 — la page se nomme ainsi ;
 *   context 6          — l'architecture du site la range là (pilier, URL) ;
 *   strong 4           — elle pose la question ;
 *   answer 2 · weak 1  — elle en parle.
 *
 * ⚠️ `context` est HAUT, et c'est ce qui tranche les requêtes régionales.
 * « prime bruxelles » remontait la page Flandre : celle-ci a « primes » dans son
 * titre (8) et « Bruxelles » dans une question de FAQ comparative (4), soit plus
 * que la page bruxelloise, qui n'écrit jamais le mot « prime ». Or la Flandre ne
 * fait que MENTIONNER Bruxelles, tandis que `/aides-primes/bruxelles` EST la
 * page des aides bruxelloises — ce que seul le contexte dit. Placé sous le
 * titre et au-dessus des questions, il rétablit l'ordre sans jamais permettre à
 * une URL de battre un vrai titre.
 */
const WEIGHTS = { label: 10, title: 8, context: 6, strong: 4, answer: 2, weak: 1 } as const;

/**
 * Synonymes du domaine, dans les DEUX sens.
 *
 * Le visiteur n'emploie pas le vocabulaire du site : il tape « combien ça
 * coûte » quand la page dit « rentabilité », « subside » quand elle dit
 * « prime ». Une vingtaine d'entrées curées valent ici bien plus qu'un
 * algorithme — et coûtent quelques centaines d'octets.
 *
 * ⚠️ Les clés sont NORMALISÉES (sans accent, minuscules) : elles sont comparées
 * après `normalize`, jamais avant.
 */
const SYNONYMS: readonly (readonly string[])[] = [
  ['prix', 'cout', 'tarif', 'budget', 'coute', 'combien'],
  ['aide', 'prime', 'subside', 'subvention', 'premie'],
  ['rentabilite', 'amortissement', 'roi', 'rentable', 'retour'],
  ['batterie', 'stockage', 'accumulateur'],
  ['panneau', 'module', 'photovoltaique', 'solaire'],
  ['devis', 'estimation', 'simulation', 'simulateur', 'etude'],
  ['onduleur', 'inverter', 'convertisseur'],
  ['installateur', 'pro', 'professionnel', 'entreprise', 'installation'],
  ['entretien', 'maintenance', 'nettoyage'],
  ['production', 'rendement', 'performance'],
  ['compteur', 'comptage', 'index'],
  ['voiture', 'vehicule', 'auto', 'borne', 'recharge'],
  ['toit', 'toiture', 'couverture'],
  ['demarche', 'formalite', 'administratif', 'declaration'],
  ['ecologie', 'ecologique', 'environnement', 'co2', 'carbone'],
  ['duree', 'longevite', 'vie', 'garantie'],
  ['injection', 'revente', 'surplus', 'autoconsommation'],
  ['pompe', 'chaleur', 'pac'],
];

/**
 * Mots-outils, retirés de la REQUÊTE (jamais de l'index).
 *
 * ⚠️ C'EST UNE CORRECTION DE BUG, pas un raffinement. L'appariement exige TOUS
 * les termes : « combien ça coûte » réclamait donc un mot commençant par « ca »
 * dans la page, et écartait `/rentabilite-prix` — dont le titre est pourtant
 * « combien coûte une installation ». Les pages qui remontaient étaient celles
 * qui contenaient par hasard « capacité » ou « cas ».
 *
 * Retirés de la requête seulement : l'index les garde, ils ne coûtent rien et
 * servent aux bonus de phrase exacte.
 *
 * Les mots d'une lettre n'y figurent pas — `tokenize` les a déjà écartés.
 */
const STOPWORDS = new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'ce', 'ca', 'cet', 'cette',
  'et', 'ou', 'au', 'aux', 'en', 'dans', 'sur', 'sous', 'pour', 'par', 'avec',
  'sans', 'mon', 'ma', 'mes', 'votre', 'vos', 'son', 'sa', 'ses', 'je', 'tu',
  'il', 'elle', 'on', 'nous', 'vous', 'ils', 'est', 'sont', 'qui', 'que',
  'quoi', 'dont', 'si', 'ne', 'pas', 'plus', 'tout', 'tous', 'quel', 'quelle',
]);

/** Index des synonymes : un mot → tous ses équivalents, lui compris. */
const SYNONYM_INDEX = new Map<string, readonly string[]>();
for (const group of SYNONYMS) {
  for (const word of group) SYNONYM_INDEX.set(word, group);
}

/**
 * Minuscules, sans accents, sans ponctuation.
 *
 * `NFD` sépare la lettre de son accent, la plage \u0300-\u036f retire ce
 * dernier : « rentabilité » et « rentabilite » deviennent le même mot. C'est
 * indispensable en français — personne ne tape les accents dans un champ de
 * recherche.
 *
 * Les apostrophes typographiques (’) passent en espace comme les droites :
 * « l'onduleur » doit donner le token « onduleur ».
 */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Mots d'une chaîne, normalisés.
 *
 * Les mots d'une lettre tombent : ils n'apportent rien et font matcher tout le
 * site (« a », « l » après découpe des apostrophes).
 */
export function tokenize(text: string): string[] {
  const words = normalize(text).split(' ').filter((word) => word.length > 1);
  return words;
}

/**
 * Les termes d'une requête : ses mots, moins les mots-outils.
 *
 * ⚠️ Sauf s'il ne reste rien. Une requête qui n'est QUE des mots-outils
 * (« pour tout ») doit chercher ces mots-là plutôt que de se vider et de tout
 * renvoyer — un champ qui rend le site entier n'a rien compris à la demande.
 */
export function queryTerms(query: string): string[] {
  const words = tokenize(query);
  const kept = words.filter((word) => !STOPWORDS.has(word));
  return kept.length > 0 ? kept : words;
}

/**
 * Racine grossière : retire le pluriel français courant.
 *
 * ⚠️ Ce n'est PAS un stemmer, et ça n'a pas à l'être. On veut seulement que
 * « batteries » trouve « batterie » et « panneaux » trouve « panneau ». Un vrai
 * stemmer français pèse plusieurs kilo-octets pour un gain nul sur 46 pages.
 */
export function stem(word: string): string {
  if (word.length > 3 && (word.endsWith('s') || word.endsWith('x'))) {
    return word.slice(0, -1);
  }
  return word;
}

/** Les formes qu'un terme de recherche accepte : lui, sa racine, ses synonymes. */
function expand(term: string): string[] {
  const root = stem(term);
  const forms = new Set([term, root]);
  for (const form of [term, root]) {
    for (const synonym of SYNONYM_INDEX.get(form) ?? []) forms.add(synonym);
  }
  return [...forms];
}

/**
 * Score d'un terme dans une liste de tokens, ou 0 s'il est absent.
 *
 * Trois niveaux, et l'écart entre eux compte : un mot exact vaut mieux qu'un
 * préfixe (« onduleur » plutôt que « ondul »), et un préfixe mieux qu'un
 * synonyme — sinon la page « Prix » passerait devant la page « Coût » pour la
 * requête « coût ».
 */
function matchScore(term: string, tokens: readonly string[]): number {
  const root = stem(term);
  let best = 0;

  for (const token of tokens) {
    const tokenRoot = stem(token);
    if (token === term) return 3;
    if (tokenRoot === root) best = Math.max(best, 2.5);
    else if (token.startsWith(term)) best = Math.max(best, 2);
  }
  if (best > 0) return best;

  /* Les synonymes ne sont consultés qu'à défaut : ils élargissent la recherche,
     ils ne doivent pas la dominer. */
  const forms = expand(term);
  for (const token of tokens) {
    if (forms.includes(token) || forms.includes(stem(token))) return 1;
  }
  return 0;
}

/** Tokens d'un champ, mémorisés — une entrée est re-scannée à chaque frappe. */
const tokenCache = new WeakMap<SearchEntry, Record<string, string[]>>();

function fieldTokens(entry: SearchEntry): Record<string, string[]> {
  const cached = tokenCache.get(entry);
  if (cached) return cached;

  const fields = {
    label: tokenize(entry.label),
    title: tokenize(entry.title),
    strong: tokenize(entry.strong.join(' ')),
    answer: tokenize(entry.answer),
    weak: tokenize(entry.weak.join(' ')),
    context: tokenize(entry.context),
  };
  tokenCache.set(entry, fields);
  return fields;
}

/**
 * Score d'une page pour une requête, ou 0 si elle ne répond pas.
 *
 * ⚠️ ET entre les termes, jamais OU : un terme absent de TOUS les champs annule
 * la page. « prime bruxelles » doit rendre les pages bruxelloises sur les aides,
 * pas toutes les pages qui parlent de primes plus toutes celles qui parlent de
 * Bruxelles. Sur un site de 46 pages, le OU rend tout et n'aide personne.
 */
export function scoreEntry(entry: SearchEntry, terms: readonly string[]): number {
  if (terms.length === 0) return 0;
  const fields = fieldTokens(entry);
  let total = 0;

  for (const term of terms) {
    let termScore = 0;
    for (const [field, weight] of Object.entries(WEIGHTS)) {
      const hit = matchScore(term, fields[field as keyof typeof fields]);
      termScore = Math.max(termScore, hit * weight);
    }
    if (termScore === 0) return 0; // un terme manquant disqualifie la page
    total += termScore;
  }

  /* Bonus de phrase : la requête entière apparaît telle quelle dans le titre ou
     le libellé. « toit plat » doit sortir la page Toit plat avant toute page qui
     contient les deux mots séparément. */
  const phrase = normalize(terms.join(' '));
  if (normalize(entry.label).includes(phrase)) total += 12;
  else if (normalize(entry.title).includes(phrase)) total += 6;

  return total;
}

/**
 * Les pages qui répondent à une requête, les meilleures d'abord.
 *
 * À score égal, l'ordre de l'index tranche — il suit celui de la navigation,
 * donc l'ordre éditorial. Un tri instable ferait danser les résultats d'une
 * frappe à l'autre sur des égalités, ce qui se voit et se ressent comme un bug.
 */
export function search(
  entries: readonly SearchEntry[],
  query: string,
  limit = 8,
): SearchResult[] {
  const terms = queryTerms(query);
  if (terms.length === 0) return [];

  const results: SearchResult[] = [];
  for (const entry of entries) {
    const score = scoreEntry(entry, terms);
    if (score > 0) results.push({ entry, score });
  }

  return results
    .map((result, index) => ({ result, index }))
    .sort((a, b) => b.result.score - a.result.score || a.index - b.index)
    .slice(0, limit)
    .map(({ result }) => result);
}

/**
 * La requête porte-t-elle une intention chiffrée ?
 *
 * Le simulateur est la colonne vertébrale (règle d'or #3) : quand quelqu'un
 * demande un prix ou une rentabilité, la réponse la plus utile n'est pas un
 * article, c'est SON chiffre. On épingle alors une ligne d'action vers
 * `/simulateur` au-dessus des résultats — sans jamais les remplacer.
 */
const INTENT_TERMS = [
  'prix', 'cout', 'coute', 'combien', 'rentab', 'amorti', 'devis',
  'estimation', 'simul', 'budget', 'tarif', 'economie', 'roi',
];

export function hasEstimateIntent(query: string): boolean {
  const tokens = tokenize(query);
  return tokens.some((token) => INTENT_TERMS.some((intent) => token.startsWith(intent)));
}
