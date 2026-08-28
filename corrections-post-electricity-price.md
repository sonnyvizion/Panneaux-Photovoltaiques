# Corrections post-révision ELECTRICITY_PRICE — 3 pages

> Remplace les sections concernées dans `doc-reference-dev-3-rentabilite-prix.md` et
> `redaction-wallonie-aides-2026.md`. Chiffres basés sur le tableau recalculé du 18/08/2026
> (installation 6 kWc, 7 500 €, injection 4 c€/kWh, électricité 0,32 €/kWh, dégradation 0,5%/an) —
> voir `savings.ts` pour la source de vérité, ces textes ne recopient pas les chiffres en dur
> dans l'esprit, mais les rapportent fidèlement à date du 18/08/2026.

---

## 3.3 Amortissement / retour sur investissement — RÉÉCRITURE COMPLÈTE

**URL** : `/rentabilite-prix/amortissement`

### H1 + réponse
# Amortissement solaire : en combien de temps l'installation est-elle rentabilisée ?

Le retour sur investissement varie fortement selon votre région et surtout selon votre taux
d'autoconsommation — de 4 ans à Bruxelles à plusieurs dizaines d'années en Wallonie sans
optimisation. Le facteur qui pèse le plus n'est pas votre budget, c'est combien vous
consommez vous-même de votre propre production.

### Intro
Il n'y a pas un seul chiffre d'amortissement en Belgique — il y en a au moins autant que de
combinaisons région × taux d'autoconsommation. Voici les vrais ordres de grandeur, sans les
lisser en une moyenne qui ne collerait à personne.

### Essentiel scannable
*Sous-titre : Le ROI à autoconsommation standard (38%), par région.*
- Bruxelles (accent) — 6 ans, grâce aux certificats verts
- Flandre — 10 ans, porté par le tarif d'injection
- Wallonie (sombre) — Plus de 25 ans sans optimisation — le tarif prosumer absorbe l'essentiel
  du bénéfice tant que l'autoconsommation reste standard

### Creuser le sujet
*Sous-titre : Ce qui accélère ou ralentit vraiment votre retour sur investissement.*
- **L'autoconsommation change-t-elle vraiment le calcul ?** Oui, radicalement — c'est le
  facteur qui pèse le plus sur le résultat final, bien plus que le prix de l'installation
  elle-même. En Wallonie par exemple, passer de 38% à 45% d'autoconsommation fait basculer le
  bilan sur 25 ans de négatif à positif.
- **La région où j'habite influence-t-elle mon ROI ?** Énormément : les certificats verts
  bruxellois accélèrent nettement le retour sur investissement, le tarif d'injection flamand
  le porte à un rythme intermédiaire, et le tarif prosumer wallon (une charge fixe, pas liée à
  votre consommation) exige une autoconsommation plus poussée pour rester rentable sur la
  durée de vie de l'installation.
- **Quel est le seuil à connaître en Wallonie ?** Autour de 45% d'autoconsommation : c'est là
  que le bilan sur 25 ans redevient positif. En dessous, l'installation coûte plus qu'elle ne
  rapporte sur sa durée de vie complète ; au-delà, chaque point d'autoconsommation
  supplémentaire compte double.
- **Faut-il une batterie pour atteindre ces seuils ?** Pas obligatoirement — décaler ses usages
  (lave-linge, lave-vaisselle, recharge de véhicule en journée) ou coupler une pompe à chaleur
  peut suffire à pousser l'autoconsommation vers 70% sans investissement de stockage. Une
  batterie reste une option, mais son propre coût s'ajoute au calcul (voir la page dédiée).

### FAQ
*Sous-titre : Les questions qu'on nous pose le plus souvent sur la rentabilité.*
- **Y a-t-il un chiffre unique fiable pour "le" ROI solaire en Belgique ?** Non, honnêtement —
  l'écart entre 4 ans (Bruxelles, forte autoconsommation) et plusieurs dizaines d'années
  (Wallonie, autoconsommation standard) est trop large pour qu'un seul chiffre ait un sens.
  Utilisez le simulateur pour votre cas précis.
- **Je suis en Wallonie, dois-je renoncer au solaire ?** Non, mais votre rentabilité dépend
  presque entièrement de votre capacité à consommer votre propre production — c'est la
  variable à travailler en priorité, pas le choix de l'installateur ou du matériel.
- **Et si le prix de l'électricité continue d'augmenter ?** Ça accélère le retour sur
  investissement dans toutes les régions — chaque kWh autoconsommé "économise" un prix plus
  élevé.

### Pont final
Votre région et votre profil de consommation changent tout — voyez votre cas précis →
**Estimer mon installation**

### Notes dev
- Chiffres alignés sur `savings.ts` au 18/08/2026 (ELECTRICITY_PRICE = 0,32 €/kWh). À
  resynchroniser si cette constante bouge — ne pas laisser cette page dériver du code comme
  c'est arrivé une première fois.
- Meta-titre : `Amortissement solaire par région : le vrai calcul, pas une moyenne`
- Meta-description : `De 4 ans à Bruxelles à plusieurs dizaines d'années en Wallonie sans optimisation : le retour sur investissement solaire varie fortement. Calculez votre cas précis.`

---

## 3.4 Autoconsommation & revente de surplus — AJUSTEMENTS

**URL** : `/rentabilite-prix/autoconsommation-revente`

### Essentiel scannable — REMPLACER la carte "Taux moyen"
*Ancienne version : "Taux moyen (sombre) — Environ 30 à 40 % pour un foyer standard sans
adaptation particulière"*

**Nouvelle version** :
- Seuil critique en Wallonie (sombre) — Autour de 45% d'autoconsommation : c'est le point où
  l'installation redevient rentable sur sa durée de vie (voir la page Amortissement)

### Creuser le sujet — AJOUTER un 5e point
- **Ce seuil de 45% est-il le même partout ?** Non — c'est spécifiquement le repère wallon, où
  le tarif prosumer (une charge fixe) rend l'autoconsommation déterminante. À Bruxelles et en
  Flandre, la rentabilité reste positive même à autoconsommation standard, grâce aux
  certificats verts et au tarif d'injection.

### Pont final — REMPLACER
*Ancienne version évoquait un chiffre générique de rentabilité*

**Nouvelle version** : En Wallonie particulièrement, chaque point d'autoconsommation compte —
voyez l'impact sur votre cas précis → **Estimer mon installation**

### Notes dev
- Cohérent avec la réécriture de 3.3 — le "seuil 45%" doit être le même chiffre sur les deux
  pages, pas recalculé indépendamment.

---

## 1.1 Wallonie : les aides réelles en 2026 — AJUSTEMENT DU PONT FINAL

**URL** : `/aides/wallonie`

### Pont final — REMPLACER
*Ancienne version : "Même sans prime, une installation reste rentable en 7 à 12 ans en
moyenne. Calculez votre cas précis, avec le tarif prosumer déjà intégré → Estimer mon
installation"*

**Nouvelle version** :

En Wallonie, la rentabilité dépend surtout de votre taux d'autoconsommation — au-delà de 45%,
l'installation reste positive sur toute sa durée de vie ; en dessous, le tarif prosumer pèse
lourd. Calculez votre cas précis, avec le tarif prosumer déjà intégré →
**Estimer mon installation**

### Notes dev
- Ce pont ne doit plus jamais afficher "7 à 12 ans" pour la Wallonie spécifiquement — ce
  chiffre reste correct pour décrire Bruxelles (6 ans) à Flandre (10 ans), mais pas pour la
  Wallonie sans précision sur l'autoconsommation.

---

## Action hors-code : `simulateur.md`

Ce document projet affiche toujours ~0,28 € comme valeur par défaut du curseur "Prix de
l'électricité" — à mettre à jour vers 0,32 € (ou une valeur dynamique si le simulateur le
permet) quand le simulateur sera codé, sinon le texte et le calcul repartiront chacun de leur
côté comme ça vient d'arriver pour ces 3 pages. Point à traiter par l'humain sur le doc projet,
pas par Claude Code sur le code.
