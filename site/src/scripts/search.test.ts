import { describe, expect, it } from 'vitest';
import {
  hasEstimateIntent,
  normalize,
  queryTerms,
  scoreEntry,
  search,
  stem,
  tokenize,
  type SearchEntry,
} from './search';

/* Un extrait réduit de l'index réel — mêmes libellés, mêmes titres, mêmes
   questions de FAQ que les pages livrées. Les cas testés ci-dessous sont des
   requêtes qu'un visiteur belge tape vraiment. */
const entry = (over: Partial<SearchEntry> & Pick<SearchEntry, 'href' | 'label'>): SearchEntry => ({
  pillar: 'Comprendre',
  title: over.label,
  answer: '',
  strong: [],
  weak: [],
  /* Par défaut, ce que l'endpoint construit : le pilier et les segments d'URL. */
  context: `${over.pillar ?? 'Comprendre'} ${over.href}`.replace(/[/-]/g, ' '),
  ...over,
});

const ONDULEUR = entry({
  href: '/comprendre/onduleur',
  label: 'Onduleur & micro-onduleur',
  title: 'L’onduleur : le composant qui rend l’électricité solaire utilisable',
  answer: 'L’onduleur transforme le courant continu produit par les panneaux en courant alternatif.',
  strong: ['Un onduleur fait-il du bruit ?', 'Combien de temps dure un onduleur ?'],
  weak: ['Dans un local ventilé et si possible frais.'],
});

const BATTERIE = entry({
  href: '/comprendre/batterie',
  label: 'Batterie domestique',
  title: 'La batterie domestique : stocker sa production pour la consommer plus tard',
  answer: 'Une batterie stocke le surplus de production pour le restituer le soir.',
});

const TOIT_PLAT = entry({
  href: '/installation/toit-plat',
  label: 'Toit plat',
  pillar: 'Installation',
  title: 'Panneaux sur toit plat : lestage et inclinaison',
});

const PRIX = entry({
  href: '/rentabilite-prix',
  label: 'Rentabilité & prix',
  pillar: 'Rentabilité & prix',
  title: 'Combien coûte une installation photovoltaïque en Belgique ?',
  answer: 'Comptez entre 4 000 et 9 000 € pour une installation résidentielle.',
});

const BRUXELLES = entry({
  href: '/aides-primes/bruxelles',
  label: 'Certificats verts',
  pillar: 'Aides & primes',
  title: 'Certificats verts à Bruxelles : ce que rapporte votre installation',
  strong: ['Quelle prime à Bruxelles en 2026 ?'],
});

const WALLONIE = entry({
  href: '/aides-primes/wallonie',
  label: 'Primes & certificats verts',
  pillar: 'Aides & primes',
  title: 'Primes et certificats verts en Wallonie',
});

const INDEX = [ONDULEUR, BATTERIE, TOIT_PLAT, PRIX, BRUXELLES, WALLONIE];
const hrefs = (query: string) => search(INDEX, query).map((r) => r.entry.href);

describe('normalize', () => {
  it('retire les accents — personne ne les tape dans un champ de recherche', () => {
    expect(normalize('Rentabilité')).toBe('rentabilite');
    expect(normalize('Intégré toiture')).toBe('integre toiture');
  });

  it('écrase l’apostrophe typographique comme la droite', () => {
    expect(normalize('l’onduleur')).toBe('l onduleur');
    expect(normalize("l'onduleur")).toBe('l onduleur');
  });
});

describe('tokenize', () => {
  it('jette les mots d’une lettre, qui feraient matcher tout le site', () => {
    expect(tokenize('l’onduleur a du bruit')).toEqual(['onduleur', 'du', 'bruit']);
  });
});

describe('stem', () => {
  it('retire le pluriel courant', () => {
    expect(stem('batteries')).toBe('batterie');
    expect(stem('panneaux')).toBe('panneau');
  });

  /* Sans le garde de longueur, « pas » deviendrait « pa » et « prix » « pri ». */
  it('laisse les mots courts intacts', () => {
    expect(stem('pas')).toBe('pas');
    expect(stem('kwc')).toBe('kwc');
  });
});

describe('search — appariement', () => {
  it('trouve sur un préfixe', () => {
    expect(hrefs('ondul')).toContain('/comprendre/onduleur');
  });

  it('trouve sans les accents', () => {
    expect(hrefs('rentabilite')).toContain('/rentabilite-prix');
  });

  it('trouve au pluriel ce qui est écrit au singulier', () => {
    expect(hrefs('batteries')).toContain('/comprendre/batterie');
  });

  /* Le cas qui justifie d'indexer les questions de FAQ : la page ne contient
     « bruit » NULLE PART ailleurs que dans sa FAQ. */
  it('trouve par une question de FAQ', () => {
    expect(hrefs('onduleur bruit')).toEqual(['/comprendre/onduleur']);
  });

  it('trouve par synonyme du domaine', () => {
    expect(hrefs('stockage')).toContain('/comprendre/batterie');
    expect(hrefs('subside wallonie')).toContain('/aides-primes/wallonie');
  });

  it('ne rend rien quand rien ne répond', () => {
    expect(hrefs('xyzzy')).toEqual([]);
  });

  it('ne rend rien sur une requête vide', () => {
    expect(hrefs('   ')).toEqual([]);
  });
});

describe('search — classement', () => {
  /* ET et non OU : « prime bruxelles » ne doit pas ramener la Wallonie sous
     prétexte qu'elle parle de primes. */
  it('exige TOUS les termes', () => {
    expect(hrefs('prime bruxelles')).toEqual(['/aides-primes/bruxelles']);
  });

  it('place la page qui PORTE le mot avant celle qui le mentionne', () => {
    expect(hrefs('onduleur')[0]).toBe('/comprendre/onduleur');
  });

  it('fait gagner la phrase exacte', () => {
    expect(hrefs('toit plat')[0]).toBe('/installation/toit-plat');
  });

  /* Le libellé pèse 10, la réponse 2 : une page nommée « Batterie domestique »
     passe devant une page qui ne fait que citer la batterie. */
  it('pèse le libellé plus lourd que le corps de texte', () => {
    const label = scoreEntry(BATTERIE, ['batterie']);
    const mention = scoreEntry(entry({
      href: '/x', label: 'Autre page', answer: 'On y parle de batterie aussi.',
    }), ['batterie']);
    expect(label).toBeGreaterThan(mention);
  });

  it('respecte la limite demandée', () => {
    expect(search(INDEX, 'panneaux', 2).length).toBeLessThanOrEqual(2);
  });
});

describe('queryTerms', () => {
  /* ⚠️ RÉGRESSION VÉCUE. L'appariement exige TOUS les termes : « ça » réclamait
     donc un mot commençant par « ca » dans la page, et la page Prix — dont le
     titre est pourtant « combien coûte une installation » — était écartée au
     profit de celles qui contenaient « capacité » ou « cas ». */
  it('retire les mots-outils de la requête', () => {
    expect(queryTerms('combien ça coûte')).toEqual(['combien', 'coute']);
    expect(queryTerms('le prix des panneaux')).toEqual(['prix', 'panneaux']);
  });

  /* Sans ce repli, « pour tout » se viderait et la recherche rendrait le site
     entier — un champ qui répond tout n'a rien compris à la demande. */
  it('garde les mots-outils quand il n’y a qu’eux', () => {
    expect(queryTerms('pour tout')).toEqual(['pour', 'tout']);
  });
});

describe('search — contexte de la page', () => {
  /* ⚠️ RÉGRESSION VÉCUE, et le cas le plus subtil du moteur.

     `/aides-primes/bruxelles` s'intitule « Certificats verts à Bruxelles » et
     n'écrit JAMAIS le mot « prime » — à Bruxelles, il n'y en a pas. La page
     Flandre, elle, a « primes » dans son titre et « Bruxelles » dans une
     question de FAQ comparative. « prime bruxelles » remontait donc la Flandre.

     Le contexte (pilier + URL) dit ce que la page EST, là où la Flandre ne fait
     que MENTIONNER Bruxelles. */
  const BX = entry({
    href: '/aides-primes/bruxelles',
    label: 'Certificats verts',
    pillar: 'Aides & primes',
    title: 'Certificats verts à Bruxelles : le seul vrai avantage financier',
  });

  const FL = entry({
    href: '/aides-primes/flandre',
    label: 'Premie & régime 2026',
    pillar: 'Aides & primes',
    title: 'Aides et primes pour panneaux solaires en Flandre en 2026',
    strong: ['Pourquoi la Flandre n’a-t-elle pas de certificats verts comme Bruxelles ?'],
  });

  it('trouve la page bruxelloise sur un mot qu’elle n’écrit pas', () => {
    expect(scoreEntry(BX, ['prime'])).toBeGreaterThan(0);
  });

  it('fait gagner la page qui EST le sujet, pas celle qui le mentionne', () => {
    const results = search([FL, BX], 'prime bruxelles');
    expect(results[0].entry.href).toBe('/aides-primes/bruxelles');
  });

  /* Le contexte reste SOUS le titre : une URL ne doit jamais battre un vrai
     titre, sinon `/installation/...` remonterait sur toute requête contenant
     « installation ». */
  it('ne laisse pas l’URL battre un titre', () => {
    const parLUrl = entry({ href: '/installation/poids', label: 'Poids', pillar: 'Installation' });
    const parLeTitre = entry({
      href: '/installation/trouver-un-installateur',
      label: 'Trouver un pro',
      pillar: 'Installation',
      title: 'Comment choisir son installation et son installateur',
    });
    expect(scoreEntry(parLeTitre, ['installation'])).toBeGreaterThan(
      scoreEntry(parLUrl, ['installation']),
    );
  });
});

describe('hasEstimateIntent', () => {
  /* Ces requêtes appellent un CHIFFRE, pas un article : l'overlay épingle
     alors le simulateur au-dessus des résultats (règle d'or #3). */
  it('reconnaît une demande de chiffre', () => {
    expect(hasEstimateIntent('combien ça coûte')).toBe(true);
    expect(hasEstimateIntent('prix panneaux')).toBe(true);
    expect(hasEstimateIntent('rentabilité')).toBe(true);
    expect(hasEstimateIntent('devis')).toBe(true);
  });

  it('laisse passer une question de contenu', () => {
    expect(hasEstimateIntent('onduleur bruit')).toBe(false);
    expect(hasEstimateIntent('nettoyage')).toBe(false);
  });
});
