import { PHONE } from './site';

/**
 * Les trois pages légales : mentions, confidentialité, cookies.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚠️ GABARITS À VALIDER ET À SIGNER PAR LE CLIENT (demande du 2026-09-03 :
 * « tu peux préparer les gabarits, je les valide et signe »). Les trois routes
 * sont en `noindex` tant que ce n'est pas fait — voir `NOT_INDEXED` dans
 * `data/searchSources.ts`. Leur ligne saute le jour de la validation.
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * ⚠️ HORS DE `data/pages/`, VOLONTAIREMENT. Ce répertoire est globé par
 * `search-index.json.ts` et par le contrôle d'orphelins, qui imposerait
 * d'indexer ces pages. Même raison que `data/realisations.ts`.
 *
 * ⚠️ CE QUI MANQUE N'EST PAS INVENTÉ. Une adresse de siège plausible sur une
 * page de mentions légales serait une fausse déclaration, pas un brouillon :
 * les champs absents valent `null` et s'affichent en marqueur visible. Même
 * parti pris que les fiches de chantier de `data/realisations.ts`.
 *
 * ⚠️ CE FICHIER N'EST PAS UN CONSEIL JURIDIQUE. Il rassemble ce que le Code de
 * droit économique (art. XII.6) et le RGPD (art. 13) imposent d'afficher, dans
 * la formulation la plus factuelle possible. C'est la signature du client qui
 * l'engage, pas sa rédaction.
 */

/** Ce qui manque encore, et qui s'affiche comme tel. */
export const MISSING = null;

/**
 * L'identité de l'entreprise, à un seul endroit.
 *
 * ⚠️ `legalName` et `tradeName` ne sont PAS interchangeables. Le client a
 * précisé le 2026-09-03 : l'entité juridique est **Ivan Ceustermans**, et
 * **Belectric est une dénomination commerciale**. Les mentions légales doivent
 * nommer la première ; la seconde est ce sous quoi l'entreprise se présente.
 *
 * ⚠️ `brand` est en ATTENTE DE DÉCISION. Le site est marqué « Belgreen » de
 * bout en bout (46 titres de page, le logo, la fiche d'entreprise), et la
 * question de savoir si cette marque reste, cède la place à Belectric, ou
 * cohabite avec elle n'est pas tranchée. Cette constante existe pour que la
 * réponse ne se cherche pas dans 46 fichiers.
 */
export const ENTITY = {
  legalName: 'Ivan Ceustermans',
  tradeName: 'Belectric',
  brand: 'Belgreen',
  /** Numéro d'entreprise à la Banque-Carrefour, confirmé par le client. */
  enterpriseNumber: '0669.738.181',
  phone: PHONE,
  /** Adresse du siège d'exploitation. Obligatoire, toujours attendue. */
  address: MISSING,
  /** Adresse de contact. Obligatoire, toujours attendue. */
  email: MISSING,
  /**
   * Numéro de TVA, confirmé par le client le 2026-09-04.
   *
   * ⚠️ C'est le numéro d'entreprise préfixé de `BE` et écrit SANS points : le
   * numéro BCE se présente en 0669.738.181, le numéro de TVA en BE0669738181.
   * Les deux désignent la même entreprise et ne s'écrivent pas pareil.
   */
  vatNumber: 'BE0669738181',
} as const;

/**
 * Durée de conservation des demandes, en années.
 *
 * ⚠️ PROPOSITION, pas une obligation légale : le RGPD impose d'annoncer une
 * durée, pas laquelle. Trois ans à compter du dernier contact est l'usage
 * courant en prospection commerciale et se défend devant l'Autorité de
 * protection des données. À confirmer à la signature.
 */
export const RETENTION_YEARS = 3;

export interface LegalBlock {
  title: string;
  /** Paragraphes, ou paires libellé/valeur pour les blocs d'identité. */
  body?: string[];
  facts?: { label: string; value: string | null; note?: string }[];
  list?: string[];
}

export interface LegalPage {
  h1: string;
  intro: string;
  blocks: LegalBlock[];
}

/* ────────────────────────────────────────────────────── mentions légales */

export const MENTIONS: LegalPage = {
  h1: 'Mentions légales',
  intro:
    'Les informations que tout site belge doit rendre accessibles, en application du Code de droit économique.',
  blocks: [
    {
      title: 'Éditeur du site',
      facts: [
        { label: 'Entité juridique', value: ENTITY.legalName },
        {
          label: 'Dénomination commerciale',
          value: ENTITY.tradeName,
          note: 'le nom sous lequel l’entreprise se présente à ses clients',
        },
        { label: 'Numéro d’entreprise (BCE)', value: ENTITY.enterpriseNumber },
        { label: 'Numéro de TVA', value: ENTITY.vatNumber },
        { label: 'Siège d’exploitation', value: ENTITY.address },
        { label: 'Téléphone', value: ENTITY.phone.label },
        { label: 'Adresse e-mail', value: ENTITY.email },
        {
          label: 'Responsable de la publication',
          value: ENTITY.legalName,
        },
      ],
    },
    {
      title: 'Hébergement',
      body: [
        'Le site est hébergé par Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis, sur son service Cloudflare Pages.',
        'L’hébergeur sert des pages statiques : il ne reçoit ni ne conserve les données que vous saisissez dans les formulaires. Le traitement de ces données est décrit dans la politique de confidentialité.',
      ],
    },
    {
      title: 'Ce que ce site est, et ce qu’il n’est pas',
      body: [
        'Le simulateur produit une estimation à partir des réponses que vous donnez et d’hypothèses de calcul publiées sur le site. Cette estimation est indicative : elle ne constitue ni un devis, ni une offre, ni un engagement contractuel.',
        'Seule une étude sur place, tenant compte de votre toiture, de votre installation électrique et de votre consommation réelle, permet d’établir une proposition ferme.',
        'Les montants d’aides, de primes et de tarifs cités sont ceux en vigueur à la date de rédaction indiquée sur chaque page. Ils relèvent de décisions régionales et fédérales qui peuvent changer sans préavis.',
      ],
    },
    {
      title: 'Propriété intellectuelle',
      body: [
        'Les textes, illustrations, schémas et le code de ce site sont protégés. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.',
        'Les marques et logos de tiers cités, notamment ceux des fabricants de matériel, appartiennent à leurs titulaires respectifs.',
      ],
    },
    {
      title: 'Liens vers d’autres sites',
      body: [
        'Ce site renvoie vers des sources externes : administrations régionales, gestionnaires de réseau, régulateurs. Ces liens sont donnés à titre documentaire. Nous n’avons aucun contrôle sur leur contenu et n’en assumons pas la responsabilité.',
      ],
    },
    {
      title: 'Droit applicable',
      body: [
        'Le présent site et son utilisation sont régis par le droit belge. En cas de litige, et à défaut de résolution amiable, les cours et tribunaux belges territorialement compétents sont seuls compétents.',
      ],
    },
  ],
};

/* ────────────────────────────────────────────────────────── confidentialité */

export const PRIVACY: LegalPage = {
  h1: 'Politique de confidentialité',
  intro:
    'Ce que nous collectons, pourquoi, combien de temps nous le gardons, et ce que nous n’en faisons pas.',
  blocks: [
    {
      title: 'Notre engagement, en une phrase',
      body: [
        'Vos coordonnées servent à répondre à votre demande, et à rien d’autre. Elles ne sont ni vendues, ni louées, ni transmises à des installateurs partenaires. C’est la différence de fond avec un comparateur de devis : vous parlez directement à l’équipe qui installera vos panneaux.',
      ],
    },
    {
      title: 'Qui traite vos données',
      facts: [
        { label: 'Responsable du traitement', value: ENTITY.legalName },
        { label: 'Numéro d’entreprise (BCE)', value: ENTITY.enterpriseNumber },
        { label: 'Adresse', value: ENTITY.address },
        { label: 'Contact', value: ENTITY.email },
        { label: 'Téléphone', value: ENTITY.phone.label },
      ],
    },
    {
      title: 'Ce que nous collectons',
      body: [
        'Aucune donnée personnelle tant que vous vous contentez de lire. Le site ne dépose aucun cookie et ne vous suit pas d’un site à l’autre. Une mesure d’audience anonyme compte les pages vues et quelques étapes du parcours, sans jamais vous identifier : elle est décrite sur la page Cookies.',
        'Quand vous envoyez une demande de devis, une demande d’étude ou une demande de rapport, nous recevons ce que vous avez saisi dans le formulaire, ainsi que les réponses que vous avez données au simulateur.',
      ],
      list: [
        'vos coordonnées : nom, adresse e-mail, numéro de téléphone,',
        'la localisation de votre projet : code postal, région,',
        'les caractéristiques que vous décrivez : type de bâtiment, toiture, orientation, consommation,',
        'le message libre que vous ajoutez, le cas échéant.',
      ],
    },
    {
      title: 'Pourquoi, et sur quelle base',
      facts: [
        {
          label: 'Répondre à votre demande',
          value: 'Mesures précontractuelles (RGPD, art. 6.1.b)',
          note: 'vous nous sollicitez, nous vous répondons : le traitement est nécessaire à cette démarche',
        },
        {
          label: 'Vous envoyer votre rapport d’estimation',
          value: 'Mesures précontractuelles (RGPD, art. 6.1.b)',
        },
        {
          label: 'Vous recontacter commercialement plus tard',
          value: 'Votre consentement (RGPD, art. 6.1.a)',
          note: 'donné séparément, retirable à tout moment sans justification',
        },
      ],
    },
    {
      title: 'Qui d’autre y a accès',
      body: [
        'Deux prestataires interviennent, tous deux dans l’Union européenne et tous deux comme sous-traitants, sur nos seules instructions. Brevo, service d’envoi d’e-mails établi en France, achemine les messages. Plausible mesure l’audience du site sans cookie ni identifiant : il ne reçoit aucune de vos coordonnées.',
        'Une précision sur la mesure : quand une recherche interne ne donne aucun résultat, les mots cherchés nous sont transmis, sans rien qui permette de savoir qui les a tapés. C’est ainsi que nous repérons les sujets que vous attendiez et que nous n’avons pas encore écrits.',
        'Ni l’un ni l’autre n’utilise vos données pour son propre compte.',
        'Aucune donnée n’est transférée hors de l’Union européenne. Aucune donnée n’est cédée, vendue ou communiquée à des tiers commerciaux.',
      ],
    },
    {
      title: 'Combien de temps nous les gardons',
      body: [
        `Trois ans à compter de notre dernier échange. Passé ce délai, vos données sont supprimées. Si un contrat est conclu, les documents liés sont conservés le temps imposé par les obligations comptables et fiscales belges.`,
      ],
    },
    {
      title: 'Vos droits',
      body: [
        'Vous pouvez à tout moment demander l’accès à vos données, leur rectification, leur effacement, la limitation de leur traitement, leur portabilité, ou vous opposer à leur utilisation. Il suffit de nous écrire ; nous répondons dans le mois.',
        'Si notre réponse ne vous satisfait pas, vous pouvez introduire une réclamation auprès de l’Autorité de protection des données, rue de la Presse 35, 1000 Bruxelles.',
      ],
    },
    {
      title: 'Décision automatisée',
      body: [
        'Le simulateur calcule une estimation à partir de vos réponses. Ce calcul ne produit aucune décision à votre égard : il n’accorde ni ne refuse rien, il ne vous classe pas, et il ne détermine pas les conditions qui vous seraient proposées. Toute proposition commerciale passe par une étude menée par une personne.',
      ],
    },
    {
      title: 'Sécurité',
      body: [
        'Le site est servi exclusivement en HTTPS. Les demandes transitent chiffrées, et l’accès aux données reçues est restreint aux personnes qui traitent votre dossier.',
      ],
    },
  ],
};

/* ─────────────────────────────────────────────────────────────── cookies */

export const COOKIES: LegalPage = {
  h1: 'Cookies',
  intro:
    'Page courte, parce qu’il n’y a pas grand-chose à dire : ce site ne dépose aucun cookie.',
  blocks: [
    {
      title: 'Aucun cookie',
      body: [
        'Ce site ne dépose aucun cookie sur votre appareil : ni cookie publicitaire, ni cookie de mesure d’audience, ni cookie tiers. C’est aussi pourquoi vous n’avez pas vu de bandeau de consentement en arrivant : il n’y a rien à consentir.',
      ],
    },
    {
      title: 'La seule chose enregistrée dans votre navigateur',
      body: [
        'Quand vous choisissez votre région, ce choix est retenu localement pour que le site ne vous la redemande pas à chaque page. Cette valeur est stockée par votre navigateur, sur votre appareil.',
        'Elle ne nous est jamais transmise, elle ne contient que le nom d’une région, et elle ne permet d’identifier personne. Le droit européen classe ce type de stockage parmi les mesures strictement nécessaires au service que vous avez demandé : il ne requiert pas votre consentement.',
        'Pour l’effacer, videz les données de site de votre navigateur pour cette adresse. Le site fonctionnera exactement pareil, il vous redemandera simplement votre région.',
      ],
    },
    {
      title: 'Comment nous mesurons l’audience, alors',
      body: [
        'Avec Plausible, un outil européen conçu pour compter sans identifier. Il enregistre les pages vues, le site d’où vous venez, le type d’appareil et le pays. Il ne pose aucun cookie, ne crée aucun identifiant qui vous suivrait d’une visite à l’autre, et ne vous reconnaît pas d’un site à l’autre.',
        'Nous y suivons aussi quelques étapes du parcours : le lancement du simulateur, la question atteinte, l’envoi d’une demande, et les recherches internes restées sans résultat. Ces mesures sont agrégées : elles disent combien de visiteurs abandonnent à la troisième question, jamais qui.',
        'C’est précisément parce que cet outil n’identifie personne que la loi ne conditionne pas son usage à votre consentement, et que vous n’avez pas de bandeau à écarter en arrivant.',
      ],
    },
    {
      title: 'Si cela change',
      body: [
        'Des campagnes publicitaires sont envisagées. Les outils de mesure publicitaire, eux, déposent des cookies : le jour où ils seront installés, cette page sera mise à jour avant leur mise en service, un bandeau vous demandera votre accord, et rien ne sera déposé tant que vous ne l’aurez pas donné.',
      ],
    },
  ],
};
