/**
 * Contenu structurel partagé entre le header et le footer.
 *
 * Provisoire : ces données ont vocation à venir de Sanity (docs/stack.md).
 * Les regrouper ici évite de dupliquer l'arborescence entre NavBar et Footer et
 * donne un seul point de bascule le jour de la connexion au CMS.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavPillar extends NavLink {
  /** Sous-liens affichés dans le footer (et plus tard dans les méga-menus). */
  links: NavLink[];
}

/** ⚠️ Placeholder — numéro réel à fournir par le client (CLAUDE.md « À compléter »). */
export const PHONE = {
  label: '+32 2 XXX XX XX',
  href: 'tel:+322XXXXXXX',
} as const;

export const REGIONS: NavLink[] = [
  { label: 'Wallonie', href: '?region=wallonie' },
  { label: 'Bruxelles', href: '?region=bruxelles' },
  { label: 'Flandre', href: '?region=flandre' },
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

export const PILLARS: NavPillar[] = [
  {
    label: 'Comprendre',
    href: '/comprendre',
    links: [
      { label: 'Fonctionnement', href: '/comprendre/fonctionnement' },
      { label: 'Types de panneaux', href: '/comprendre/types-de-panneaux' },
      { label: 'Onduleur & batterie', href: '/comprendre/onduleur-batterie' },
      { label: 'Garanties & longévité', href: '/comprendre/garanties-longevite' },
    ],
  },
  {
    label: 'Rentabilité & prix',
    href: '/rentabilite-prix',
    links: [
      { label: 'Prix des panneaux 2026', href: '/rentabilite-prix/prix' },
      { label: 'Rendement & production', href: '/rentabilite-prix/rendement' },
      { label: 'Amortissement / ROI', href: '/rentabilite-prix/amortissement' },
      { label: 'Autoconsommation & revente', href: '/rentabilite-prix/autoconsommation' },
    ],
  },
  {
    label: 'Aides & primes',
    href: '/aides-primes',
    links: [
      { label: 'Primes Wallonie', href: '/aides-primes/wallonie' },
      { label: 'Primes Bruxelles', href: '/aides-primes/bruxelles' },
      { label: 'Primes Flandre', href: '/aides-primes/flandre' },
      { label: 'Guide entreprises', href: '/aides-primes/entreprises' },
    ],
  },
  {
    label: 'Installation',
    href: '/installation',
    links: [
      { label: 'Orientation & inclinaison', href: '/installation/orientation' },
      { label: 'Toit plat / incliné / BIPV', href: '/installation/types-de-toit' },
      { label: 'Trouver un pro', href: '/installation/trouver-un-installateur' },
      { label: 'Voiture électrique & PAC', href: '/installation/voiture-pac' },
    ],
  },
];

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
