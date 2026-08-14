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

/** ⚠️ Placeholder — numéro réel à fournir par le client (CLAUDE.md « À compléter »). */
export const PHONE = {
  label: '+32 2 XXX XX XX',
  href: 'tel:+322XXXXXXX',
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
          { label: 'Fonctionnement des panneaux', href: '/comprendre/fonctionnement' },
          { label: 'Impact écologique', href: '/comprendre/impact-ecologique' },
          { label: 'Risques & inconvénients', href: '/comprendre/risques-inconvenients' },
        ],
      },
      {
        label: 'Types de panneaux',
        links: [
          { label: 'Monocristallin', href: '/comprendre/monocristallin' },
          { label: 'Polycristallin', href: '/comprendre/polycristallin' },
          { label: 'Bifacial', href: '/comprendre/bifacial' },
          { label: 'Amorphe', href: '/comprendre/amorphe' },
        ],
      },
      {
        label: 'Composants',
        links: [
          { label: 'Onduleur & micro-onduleur', href: '/comprendre/onduleur' },
          { label: 'Batterie domestique', href: '/comprendre/batterie' },
          { label: 'Compteur intelligent', href: '/comprendre/compteur-intelligent' },
          { label: 'Borne de recharge', href: '/comprendre/borne-de-recharge' },
        ],
      },
      {
        label: 'Dans la durée',
        links: [
          { label: 'Longévité', href: '/comprendre/longevite' },
          { label: 'Garanties (Belgique)', href: '/comprendre/garanties' },
          { label: 'Maintenance & nettoyage', href: '/comprendre/maintenance' },
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
          { label: 'Rendement', href: '/rentabilite-prix/rendement' },
          { label: 'Production', href: '/rentabilite-prix/production' },
          { label: 'Amortissement / retour sur investissement', href: '/rentabilite-prix/amortissement' },
          { label: 'Autoconsommation', href: '/rentabilite-prix/autoconsommation' },
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
          { label: 'Guide entreprises', href: '/aides-primes/entreprises' },
          { label: 'Installation en copropriété', href: '/aides-primes/copropriete' },
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
          { label: 'Nombre de panneaux', href: '/installation/nombre-de-panneaux' },
          { label: 'Puissance (kWc)', href: '/installation/puissance' },
          { label: 'Dimensions & poids', href: '/installation/dimensions-poids' },
          { label: 'Ombrage', href: '/installation/ombrage' },
          { label: 'Fixation', href: '/installation/fixation' },
        ],
      },
      {
        label: 'Emplacements',
        links: [
          { label: 'Toit incliné', href: '/installation/toit-incline' },
          { label: 'Toit plat', href: '/installation/toit-plat' },
          { label: 'Intégré toiture (BIPV)', href: '/installation/bipv' },
          { label: 'Abri de jardin', href: '/installation/abri-de-jardin' },
          { label: 'Au sol / jardin', href: '/installation/au-sol' },
          { label: 'Carport', href: '/installation/carport' },
          { label: 'Balcon', href: '/installation/balcon' },
          { label: 'Camping-car & van', href: '/installation/camping-car' },
          { label: 'Ombrière de parking', href: '/installation/ombriere' },
        ],
      },
      {
        label: 'Passer à l’acte',
        links: [
          { label: 'Trouver un pro', href: '/installation/trouver-un-installateur', published: true },
          { label: 'Installer soi-même', href: '/installation/soi-meme' },
          { label: 'Pompe à chaleur', href: '/installation/pompe-a-chaleur' },
          { label: 'Voiture électrique', href: '/installation/voiture-electrique' },
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
  return pillar.groups.flatMap((group) => group.links.filter((link) => link.published));
}

/** Les colonnes d'un pilier, vidées de leurs liens non publiés. */
export function publishedGroups(pillar: NavPillar): NavGroup[] {
  return pillar.groups
    .map((group) => ({ ...group, links: group.links.filter((link) => link.published) }))
    .filter((group) => group.links.length > 0);
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
