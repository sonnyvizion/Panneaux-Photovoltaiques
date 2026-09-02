import type { FaqItem } from './content';

/**
 * FAQ de la home. Sortie du composant le jour où une deuxième page en a eu
 * besoin — `Faq.astro` est désormais un gabarit, le contenu vit à côté.
 *
 * Provisoire, comme `site.ts` : ces Q/R ont vocation à venir de Sanity
 * (bloc `faq` de `pages-contenu.md`).
 */
export const FAQ_HOME: FaqItem[] = [
  {
    question: 'Le photovoltaïque est-il vraiment rentable pour ma maison ?',
    answer:
      "Dans la majorité des cas en Belgique, oui, mais le délai d'amortissement dépend de votre consommation, de l'orientation de votre toit et des primes de votre région. Le simulateur vous donne une fourchette en deux minutes, sans laisser vos coordonnées.",
  },
  {
    question: 'Revendez-vous mes données à des installateurs partenaires ?',
    answer:
      "Non. Belgreen/Belectric n'est pas un comparateur de devis : nous ne revendons ni ne partageons vos données avec des installateurs tiers. Quand vous demandez une estimation, c'est directement notre équipe, celle qui viendra poser vos panneaux, qui vous contacte. Personne d'autre n'a accès à vos coordonnées.",
    open: true,
  },
  {
    question: 'Quelles aides puis-je obtenir dans ma région ?',
    answer:
      "Les aides diffèrent fortement entre la Wallonie, Bruxelles et la Flandre, et évoluent chaque année. Le simulateur applique automatiquement le régime de votre région à partir de votre code postal.",
  },
  {
    question: 'Le simulateur est-il vraiment gratuit et sans engagement ?',
    answer:
      "Oui. Le calcul est gratuit et ne demande aucune coordonnée. Vous ne nous laissez vos informations que si vous décidez vous-même de demander une étude personnalisée.",
  },
];
