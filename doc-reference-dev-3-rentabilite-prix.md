# PILIER RENTABILITÉ & PRIX — les 3 pages manquantes

> Complète le pilier : "Prix des panneaux 2026" est déjà codée (référence pour l'architecture),
> ces 3 pages suivent la même méthode que `document-reference-complet.md`. Format identique,
> à fusionner dans le même document si besoin avant de transmettre à Claude Code.

---

## 3.2 Rendement & production

**URL** : `/rentabilite/rendement-production`
**Module** : `billSlider` réutilisé — même composant que la page Prix, mais avec **Production/an**
mis en accent au lieu de Prix estimé (cohérent avec la règle "la donnée accentuée doit matcher
le sujet de la page")

### H1 + réponse
# Combien produit une installation solaire en Belgique ?

Une installation de 6 kWc bien orientée produit environ 5 400 kWh par an en Belgique — soit
environ 900 kWh par kWc installé. Ce chiffre varie fortement selon l'orientation, l'inclinaison,
et dans une moindre mesure la région.

### Intro
"Combien ça produit" est la question qui vient juste après "combien ça coûte" — et la réponse
dépend de bien plus que la seule puissance installée.

### Essentiel scannable
*Sous-titre : Ce qui fait varier la production, au-delà de la puissance.*
- Production de référence (accent) — Environ 900 kWh/kWc/an pour une installation bien orientée
- Orientation — Peut faire varier le rendement de 35 points entre le sud et le nord (voir page dédiée)
- Production mensuelle (sombre) — Plus élevée d'avril à septembre, très réduite en hiver

### Creuser le sujet
*Sous-titre : Ce qui explique les écarts de production d'une installation à l'autre.*
- **La production varie-t-elle selon la région ?** Légèrement — l'ensoleillement diffère peu
  entre la Wallonie, Bruxelles et la Flandre à l'échelle de la Belgique, l'orientation et
  l'inclinaison du toit ont un impact bien plus important que la localisation.
- **Pourquoi ma production baisse-t-elle en hiver ?** Les jours sont plus courts et le soleil
  moins haut dans le ciel — la production d'un mois de décembre peut être 5 à 6 fois plus
  faible qu'un mois de juillet.
- **Les panneaux perdent-ils en performance avec le temps ?** Oui, une dégradation naturelle
  d'environ 0,5 % par an est normale — un panneau garde généralement plus de 80 % de sa
  capacité initiale après 25 ans.
- **La météo (nuages, pluie) impacte-t-elle beaucoup la production ?** Oui au jour le jour,
  mais un panneau continue de produire par temps couvert (à rendement réduit) — ce n'est pas
  tout ou rien comme on l'imagine souvent.

### FAQ
*Sous-titre : Les questions qu'on nous pose le plus souvent sur la production.*
- **900 kWh/kWc, c'est une moyenne fiable pour mon cas ?** C'est un ordre de grandeur pour une
  orientation favorable — utilisez le simulateur pour une estimation propre à votre toiture.
- **Ma production sera-t-elle la même chaque année ?** À peu près, avec une légère baisse
  progressive due au vieillissement naturel des panneaux (~0,5 %/an).
- **Puis-je suivre ma production en temps réel ?** Oui, la plupart des onduleurs modernes
  offrent un suivi via application, souvent inclus par l'installateur.

### Pont final
Cette estimation reste générique — voyez la production réelle attendue sur votre toit →
**Estimer mon installation**

### Notes dev
- Meta-titre : `Production panneaux solaires Belgique : combien de kWh par an ?`
- Meta-description : `900 kWh/kWc/an en moyenne en Belgique — ce qui fait varier la production réelle de votre installation solaire, mois par mois.`

---

## 3.3 Amortissement / retour sur investissement

**URL** : `/rentabilite/amortissement-roi`
**Module** : `paybackTimeline` (brique déjà cataloguée dans `interactivite-seo.md`, prévue
justement pour cette page) — timeline visuelle montrant le point où les économies cumulées
dépassent le coût initial

### H1 + réponse
# Amortissement solaire : en combien de temps l'installation est-elle rentabilisée ?

Le retour sur investissement se situe généralement entre 7 et 12 ans, pour une installation
qui dure 25 à 30 ans — soit 15 à 20 ans de production quasiment gratuite une fois l'investissement
remboursé.

### Intro
Le calcul dépend de bien plus que le prix d'achat — votre région, votre taux d'autoconsommation,
et ce que vous faites du surplus changent fortement le résultat final.

### Essentiel scannable
*Sous-titre : Ce qui fait varier votre temps de retour sur investissement.*
- ROI moyen (accent) — Entre 7 et 12 ans selon les cas
- Durée de vie — 25 à 30 ans, largement au-delà du seuil de rentabilité
- Facteur régional (sombre) — Wallonie (tarif prosumer) et Flandre (tarif d'injection)
  dégradent légèrement le calcul par rapport à Bruxelles (certificats verts)

### Creuser le sujet
*Sous-titre : Ce qui accélère ou ralentit votre retour sur investissement.*
- **L'autoconsommation change-t-elle vraiment le calcul ?** Oui, fortement — l'électricité
  autoconsommée vaut son prix d'achat plein tarif, alors que le surplus revendu ou injecté
  vaut nettement moins (voir la page dédiée Autoconsommation).
- **La région où j'habite influence-t-elle mon ROI ?** Oui : le tarif prosumer wallon est une
  charge annuelle qui allonge légèrement le délai, le tarif d'injection flamand valorise
  modestement le surplus, et les certificats verts bruxellois l'accélèrent.
- **Que se passe-t-il après le seuil de rentabilité ?** L'installation continue à produire
  pendant encore 15 à 20 ans (jusqu'à 25-30 ans de durée de vie totale) — c'est cette période
  qui fait la vraie rentabilité du solaire, pas seulement le fait d'atteindre le seuil.
- **Le prix de l'électricité influence-t-il le calcul ?** Beaucoup — plus le prix du réseau
  augmente, plus vite votre installation se rembourse, puisque chaque kWh autoconsommé
  "économise" un prix plus élevé.

### FAQ
*Sous-titre : Les questions qu'on nous pose le plus souvent sur la rentabilité.*
- **7 à 12 ans, c'est fiable pour mon cas précis ?** C'est une fourchette générale — le
  simulateur calcule votre cas avec votre région, consommation et toiture.
- **Et si le prix de l'électricité baisse dans le futur ?** Ça ralentirait légèrement le
  retour sur investissement, mais l'installation resterait rentable sur sa durée de vie
  totale dans la quasi-totalité des scénarios.
- **Dois-je intégrer l'entretien dans le calcul ?** Les coûts d'entretien sont faibles pour le
  photovoltaïque (nettoyage occasionnel, pas de pièces mobiles) — voir la page Maintenance
  du pilier Comprendre.

### Pont final
Calculez votre propre délai de rentabilité, avec votre région déjà intégrée →
**Estimer mon installation**

### Notes dev
- Ce module (`paybackTimeline`) est mentionné dans `interactivite-seo.md` mais n'a jamais été
  spécifié en détail dans ce projet — à concevoir : probablement un axe temporel (0 à 25 ans)
  avec une courbe économies cumulées vs coût initial, le point de croisement mis en évidence.
- Meta-titre : `Amortissement panneaux solaires : combien d'années pour rentabiliser ?`
- Meta-description : `7 à 12 ans en moyenne pour rentabiliser une installation solaire en Belgique. Ce qui accélère ou ralentit votre retour sur investissement.`

---

## 3.4 Autoconsommation & revente de surplus

**URL** : `/rentabilite/autoconsommation-revente`
**Module** : slider "taux d'autoconsommation" (0-100%) → répartition entre économies directes
et valorisation du surplus (revente/injection selon région)

### H1 + réponse
# Autoconsommation et revente du surplus : comment ça marche

Plus vous consommez directement votre production solaire, plus votre installation est rentable
— l'électricité autoconsommée vaut son prix d'achat plein tarif, alors que le surplus revendu
ou injecté est valorisé à un tarif nettement inférieur.

### Intro
Deux installations identiques peuvent avoir une rentabilité très différente selon un seul
facteur : combien de leur production est utilisée sur place plutôt qu'envoyée sur le réseau.

### Essentiel scannable
*Sous-titre : La règle simple qui détermine votre rentabilité.*
- Autoconsommation (accent) — Vaut le prix plein de l'électricité achetée
- Surplus — Valorisé à un tarif inférieur (varie selon la région)
- Taux moyen (sombre) — Environ 30 à 40 % pour un foyer standard sans adaptation particulière

### Creuser le sujet
*Sous-titre : Comment augmenter votre taux d'autoconsommation.*
- **Comment augmenter mon taux d'autoconsommation ?** En décalant les usages énergivores
  (lave-linge, lave-vaisselle, recharge de véhicule) vers les heures de production, ou en
  ajoutant des équipements qui consomment en journée (pompe à chaleur, borne de recharge).
- **Une batterie domestique change-t-elle la donne ?** Oui, significativement — elle permet de
  stocker le surplus de journée pour le consommer le soir, augmentant fortement le taux
  d'autoconsommation, au prix d'un investissement supplémentaire.
- **Que devient mon surplus selon ma région ?** En Wallonie, il part sur le réseau sans
  compensation directe au-delà du tarif prosumer ; en Flandre, il est valorisé au tarif
  d'injection (3-5 ct/kWh) ; à Bruxelles, il génère des certificats verts.
- **Faut-il viser 100 % d'autoconsommation ?** Pas nécessairement — au-delà d'un certain point,
  ça demanderait une installation sous-dimensionnée par rapport à votre toiture disponible,
  ou un investissement en stockage qui n'est pas toujours rentable.

### FAQ
*Sous-titre : Les questions qu'on nous pose le plus souvent sur l'autoconsommation.*
- **Quel est le taux d'autoconsommation moyen sans rien faire de spécial ?** Environ 30 à 40 %
  pour un foyer standard, le reste partant en surplus sur le réseau.
- **La pompe à chaleur ou la voiture électrique aident-elles vraiment ?** Oui, ce sont deux des
  leviers les plus efficaces pour augmenter l'autoconsommation (voir les pages dédiées).
- **Dois-je changer mes habitudes pour en profiter ?** Ce n'est pas obligatoire, mais quelques
  ajustements simples (lancer l'électroménager en journée) augmentent sensiblement votre
  taux d'autoconsommation sans effort majeur.

### Pont final
Voyez votre taux d'autoconsommation estimé et son impact sur vos économies →
**Estimer mon installation**
**Liens contextuels** → `/installation/applications/pompe-a-chaleur`,
`/installation/applications/voiture-electrique`

### Notes dev
- Le taux "30-40% sans adaptation" est un ordre de grandeur cohérent avec le 37,76% déjà
  utilisé dans le calcul du tarif prosumer wallon (`fiches-aides-primes.md`) — pas une
  nouvelle donnée, juste réutilisée en contexte différent.
- Meta-titre : `Autoconsommation solaire : comment ça marche et comment l'augmenter`
- Meta-description : `Votre production autoconsommée vaut plus que votre surplus revendu. Comment augmenter votre taux d'autoconsommation et ce que devient votre surplus selon votre région.`
