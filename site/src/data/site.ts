/**
 * Contenu structurel partagé entre le header et le footer.
 *
 * Provisoire : ces données ont vocation à venir de Sanity (docs/stack.md).
 * Les regrouper ici évite de dupliquer l'arborescence entre NavBar et Footer et
 * donne un seul point de bascule le jour de la connexion au CMS.
 *
 * L'arborescence est celle de `architecture.md` §« Les 4 piliers », en entier.
 * Ce qui n'est pas encore livré y figure quand même, sans `published` — voir
 * `publishedLinks` plus bas.
 */

export interface NavLink {
  label: string;
  href: string;
  /**
   * La page existe et peut être liée.
   *
   * ⚠️ Logique volontairement inverse : **absent = non publié**. Le sitemap
   * compte ~55 pages dont la Phase 1 n'en livre qu'une poignée
   * (`architecture.md` §Plan de phasage) ; un oubli doit produire un lien
   * manquant, jamais un 404 indexé (règle d'or #1).
   *
   * À la bascule Sanity, ce drapeau devient l'existence du document.
   */
  published?: boolean;
  /**
   * Liable, mais absent des méga-menus et du footer.
   *
   * Pour une destination qu'une PAGE référence déjà — les cartes « Creuser le
   * sujet » de `/aides-primes/wallonie` visent trois sujets que la maquette a
   * dessinés en avance sur le sitemap. Sans elle, il fallait choisir entre deux
   * mauvaises options : laisser le lien tomber en 404, ou publier dans la nav
   * trois entrées qui n'ouvrent qu'un gabarit vide.
   *
   * `published` reste donc à `true` — la route attrape-tout doit générer le
   * gabarit `noindex`, faute de quoi le lien casse. Ce drapeau-ci ne parle que
   * de LISTAGE : il retire l'entrée des inventaires de navigation, pas du site.
   *
   * ⚠️ Temporaire par nature. Le jour où la page est écrite, on retire le
   * drapeau et l'entrée réapparaît dans son méga-menu.
   */
  hidden?: boolean;
}

/** Colonne d'un méga-menu. Sans `label`, la colonne n'a pas d'en-tête. */
export interface NavGroup {
  label?: string;
  links: NavLink[];
  /** Rampe vers le simulateur qui referme la colonne (`nav.md`). */
  ramp?: NavLink;
}

export interface NavPillar extends NavLink {
  groups: NavGroup[];
  /** Rampe du pilier, quand ce ne sont pas les colonnes qui la portent. */
  ramp?: NavLink;
}

/**
 * Le numéro réel, fourni par le client le 2026-09-03.
 *
 * ⚠️ `label` en format national (c'est ainsi qu'un Belge le lit et le dicte),
 * `href` en E.164 (c'est le seul format qu'un téléphone compose sans se
 * tromper depuis l'étranger, et celui qu'attend `schema.org`).
 */
export const PHONE = {
  label: '02 219 45 37',
  href: 'tel:+3222194537',
} as const;

/**
 * Le sélecteur de région ne navigue pas : il choisit une valeur, que
 * `scripts/regionLinks.ts` propage ensuite dans les liens vers `/simulateur`.
 * D'où `value` et non `href`.
 */
export interface RegionOption {
  label: string;
  value: string;
}

export const REGIONS: RegionOption[] = [
  { label: 'Wallonie', value: 'wallonie' },
  { label: 'Bruxelles', value: 'bruxelles' },
  { label: 'Flandre', value: 'flandre' },
];

export const LOCALES: NavLink[] = [
  { label: 'FR', href: '/' },
  { label: 'NL', href: '/nl' },
];

/** CTA unique du header — règle d'or #2. */
export const PRIMARY_CTA: NavLink = {
  label: 'Mon estimation',
  href: '/simulateur',
};

/** Entrée « Accueil » de la barre principale, en plus du logo. */
export const HOME_LINK: NavLink = {
  label: 'Accueil',
  href: '/',
  published: true,
};

/**
 * Cluster confiance — rangée utilitaire du header et panneau mobile.
 *
 * Ces pages portent l'argument anti-intermédiaire (« vous parlez directement à
 * l'équipe qui installera vos panneaux ») : les laisser au seul footer revenait
 * à enterrer un actif de conversion. Elles ne sont pas dans la barre principale
 * pour ne pas concurrencer les 4 piliers encyclopédiques.
 */
export const TRUST_LINKS: NavLink[] = [
  { label: 'À propos', href: '/a-propos', published: true },
  { label: 'Nos réalisations', href: '/realisations', published: true },
  { label: 'Contact', href: '/contact', published: true },
];

/**
 * ⚠️ Trois entrées portent `published: true, hidden: true` sans avoir de page
 * rédigée : `/comprendre/onduleur`, `/installation/au-sol` et
 * `/rentabilite-prix/amortissement`. Des pages LIVRÉES pointent vers elles
 * (ponts contextuels d'Ombrage, d'Abri de jardin et de Rentabilité) et ces
 * liens tombaient en 404. Le drapeau leur donne un gabarit « en cours de
 * rédaction » en `noindex`, sans les faire apparaître dans les méga-menus.
 *
 * `/installation/au-sol` est la page 2.12, en attente de son texte ; les deux
 * autres relèvent de piliers non traités à ce jour.
 */
export const PILLARS: NavPillar[] = [
  {
    label: 'Comprendre',
    href: '/comprendre',
    published: true,
    ramp: { label: 'Ce que ça donnerait chez vous', href: '/simulateur' },
    groups: [
      {
        label: 'Le principe',
        links: [
          { label: 'Fonctionnement des panneaux', href: '/comprendre/fonctionnement', published: true },
          { label: 'Impact écologique', href: '/comprendre/impact-ecologique', published: true },
          { label: 'Risques & inconvénients', href: '/comprendre/risques-inconvenients', published: true },
        ],
      },
      {
        label: 'Types de panneaux',
        links: [
          /* ⚠️ UNE entrée pour quatre technologies, là où le sitemap d'origine
             en prévoyait quatre. La rédaction du pilier Comprendre en fait une
             page comparative unique : mono, poly, bifacial et amorphe ne se
             choisissent qu'en les comparant, et quatre pages obligeraient à
             quatre allers-retours pour une seule décision. Choix d'architecture
             assumé, confirmé à la commande. */
          { label: 'Types de panneaux', href: '/comprendre/types-de-panneaux', published: true },
        ],
      },
      {
        label: 'Composants',
        links: [
          { label: 'Onduleur & micro-onduleur', href: '/comprendre/onduleur', published: true },
          { label: 'Batterie domestique', href: '/comprendre/batterie', published: true },
          { label: 'Compteur intelligent', href: '/comprendre/compteur-intelligent', published: true },
          { label: 'Borne de recharge', href: '/comprendre/borne-de-recharge', published: true },
        ],
      },
      {
        label: 'Dans la durée',
        links: [
          { label: 'Longévité', href: '/comprendre/longevite', published: true },
          { label: 'Garanties (Belgique)', href: '/comprendre/garanties', published: true },
          { label: 'Maintenance & nettoyage', href: '/comprendre/maintenance', published: true },
        ],
      },
    ],
  },
  {
    label: 'Rentabilité & prix',
    href: '/rentabilite-prix',
    published: true,
    ramp: { label: 'Chiffrer mon installation', href: '/simulateur' },
    groups: [
      {
        links: [
          { label: 'Prix des panneaux 2026', href: '/rentabilite-prix/prix' },
          { label: 'Rendement', href: '/rentabilite-prix/rendement', published: true },
          { label: 'Production', href: '/rentabilite-prix/production' },
          { label: 'Amortissement / retour sur investissement', href: '/rentabilite-prix/amortissement', published: true },
          { label: 'Autoconsommation', href: '/rentabilite-prix/autoconsommation', published: true },
          { label: 'Revente de surplus / injection réseau', href: '/rentabilite-prix/injection' },
        ],
      },
    ],
  },
  {
    /**
     * Organisé PAR RÉGION et non par thème : c'est le différenciateur face à la
     * concurrence, et surtout la région est ainsi connue au moment du clic —
     * chaque colonne peut donc porter sa propre rampe régionalisée (`nav.md`).
     */
    label: 'Aides & primes',
    href: '/aides-primes',
    published: true,
    groups: [
      {
        label: 'Wallonie',
        ramp: { label: 'Calculer ma prime', href: '/simulateur?region=wallonie' },
        links: [
          { label: 'Primes & certificats verts', href: '/aides-primes/wallonie', published: true },
          { label: 'Tarif prosumer', href: '/aides-primes/wallonie/prosumer', published: true },
          { label: 'Démarches administratives', href: '/aides-primes/wallonie/demarches', published: true },
          /* Les trois sujets visés par les cartes « Creuser le sujet » de
             `/aides-primes/wallonie`, dessinés dans la maquette avant d'exister
             au sitemap. `hidden` : liables depuis la page, pas encore listés
             dans le méga-menu — voir le drapeau plus haut. */
          { label: 'Le Rénoprêt', href: '/aides-primes/wallonie/renopret', published: true, hidden: true },
          { label: 'Certificats verts', href: '/aides-primes/wallonie/certificats-verts', published: true, hidden: true },
          { label: 'Primes communales', href: '/aides-primes/wallonie/primes-communales', published: true, hidden: true },
        ],
      },
      {
        label: 'Bruxelles',
        ramp: { label: 'Calculer ma prime', href: '/simulateur?region=bruxelles' },
        links: [
          { label: 'Certificats verts', href: '/aides-primes/bruxelles', published: true },
          { label: 'Réglementation 2026', href: '/aides-primes/bruxelles/reglementation', published: true },
          { label: 'Démarches administratives', href: '/aides-primes/bruxelles/demarches', published: true },
        ],
      },
      {
        label: 'Flandre',
        ramp: { label: 'Bereken mijn premie', href: '/simulateur?region=flandre' },
        links: [
          { label: 'Premie & régime 2026', href: '/aides-primes/flandre', published: true },
          { label: 'Fin du compteur inversé', href: '/aides-primes/flandre/compteur-inverse', published: true },
          { label: 'Démarches administratives', href: '/aides-primes/flandre/demarches', published: true },
        ],
      },
      {
        label: 'Transverses',
        links: [
          /* ⚠️ `hidden` : la page existe et se visite, mais son volet fiscal
             n'est pas validé (le cahier de construction marque trois passages
             « à valider »). La lister dans le méga-menu enverrait du trafic
             professionnel sur une page qui ne répond pas encore à sa question.
             Retirer le drapeau dès que le client aura tranché. */
          { label: 'Guide entreprises', href: '/aides-primes/entreprises', published: true, hidden: true },
          { label: 'Installation en copropriété', href: '/aides-primes/copropriete', published: true },
        ],
      },
    ],
  },
  {
    label: 'Installation',
    href: '/installation',
    published: true,
    ramp: { label: 'Estimer mon installation', href: '/simulateur' },
    groups: [
      {
        label: 'Préparation',
        links: [
          { label: 'Orientation & inclinaison', href: '/installation/orientation' },
          { label: 'Nombre de panneaux', href: '/installation/nombre-de-panneaux', published: true },
          { label: 'Puissance (kWc)', href: '/installation/puissance', published: true },
          /* ⚠️ Scindé en deux : le cahier de construction en fait deux pages
             distinctes (2.4 et 2.5), avec deux textes complets et deux jeux
             d'icônes livrés. L'entrée unique « Dimensions & poids » venait du
             sitemap d'origine, antérieur à la rédaction. */
          { label: 'Dimensions', href: '/installation/dimensions', published: true },
          { label: 'Poids', href: '/installation/poids', published: true },
          { label: 'Ombrage', href: '/installation/ombrage', published: true },
          { label: 'Fixation', href: '/installation/fixation', published: true },
        ],
      },
      {
        label: 'Emplacements',
        links: [
          { label: 'Toit incliné', href: '/installation/toit-incline' },
          { label: 'Toit plat', href: '/installation/toit-plat', published: true },
          { label: 'Intégré toiture (BIPV)', href: '/installation/bipv', published: true },
          { label: 'Abri de jardin', href: '/installation/abri-de-jardin', published: true },
          { label: 'Au sol / jardin', href: '/installation/au-sol', published: true, hidden: true },
          { label: 'Carport', href: '/installation/carport', published: true },
          { label: 'Balcon', href: '/installation/balcon', published: true },
          { label: 'Camping-car & van', href: '/installation/camping-car', published: true },
          { label: 'Ombrière de parking', href: '/installation/ombriere' },
        ],
      },
      {
        label: 'Passer à l’acte',
        links: [
          { label: 'Trouver un pro', href: '/installation/trouver-un-installateur', published: true },
          { label: 'Installer soi-même', href: '/installation/soi-meme', published: true },
          { label: 'Pompe à chaleur', href: '/installation/pompe-a-chaleur', published: true },
          { label: 'Voiture électrique', href: '/installation/voiture-electrique', published: true },
        ],
      },
    ],
  },
];

/**
 * Les sous-liens d'un pilier effectivement liables, groupes aplatis.
 *
 * Source unique de vérité du filtrage : header et footer l'utilisent tous les
 * deux, faute de quoi les deux arborescences divergeraient à la première page
 * publiée.
 */
export function publishedLinks(pillar: NavPillar): NavLink[] {
  return pillar.groups.flatMap((group) => group.links.filter(isListed));
}

/** Les colonnes d'un pilier, vidées de leurs liens non publiés. */
export function publishedGroups(pillar: NavPillar): NavGroup[] {
  return pillar.groups
    .map((group) => ({ ...group, links: group.links.filter(isListed) }))
    .filter((group) => group.links.length > 0);
}

/**
 * Un lien qui a sa place dans un inventaire de navigation.
 *
 * ⚠️ À ne pas confondre avec « le lien fonctionne » : une destination `hidden`
 * existe et se visite, elle ne se LISTE pas. C'est la route attrape-tout, qui
 * filtre sur `published` seul, qui décide de ce qui doit exister.
 */
function isListed(link: NavLink): boolean {
  return Boolean(link.published) && !link.hidden;
}

/** Liens transverses de la rangée basse du footer. */
export const UTILITY_LINKS: NavLink[] = [
  { label: 'Simulateur', href: '/simulateur' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Avis & réalisations', href: '/realisations' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/confidentialite' },
  { label: 'Cookies', href: '/cookies' },
];
