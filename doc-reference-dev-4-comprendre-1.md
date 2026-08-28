# PILIER 4 — COMPRENDRE (11 pages)

> Jamais traité dans ce projet jusqu'ici. Architecture de pages construite à partir de
> `architecture.md` : certains items du pilier (types de panneaux) sont regroupés en une
> seule page comparative plutôt que scindés, contrairement aux piliers Aides/Installation —
> à valider, c'est un choix d'architecture de ma part, pas une donnée du cahier existant.
> Contenu technique général (connaissance stable, pas de recherche nécessaire) sauf mention
> contraire signalée explicitement.

---

## 4.1 Fonctionnement des panneaux

**URL** : `/comprendre/fonctionnement`
**Module** : `photonFlow` — schéma animé "voyage du photon", brique déjà cataloguée dans
`interactivite-seo.md` ("remplace le pavé" sur cette page précisément, SVG léger, anim au
scroll-in)

### H1 + réponse
# Comment fonctionne un panneau solaire ?

Un panneau solaire transforme la lumière du soleil en électricité grâce à l'effet
photovoltaïque : les cellules de silicium libèrent des électrons au contact de la lumière,
créant un courant continu que l'onduleur transforme ensuite en courant alternatif utilisable
dans la maison.

### Intro
Pas besoin d'être ingénieur pour comprendre le principe — trois étapes suffisent à saisir
comment la lumière devient de l'électricité utilisable chez vous.

### Essentiel scannable
*Sous-titre : Le trajet de l'électricité, en 3 étapes.*
- Cellule photovoltaïque (accent) — Capte la lumière, libère des électrons (courant continu)
- Onduleur — Transforme le courant continu en courant alternatif utilisable
- Compteur (sombre) — Mesure ce qui est consommé et ce qui est injecté sur le réseau

### Creuser le sujet
*Sous-titre : Ce qu'on comprend mal en général sur le fonctionnement des panneaux.*
- **Pourquoi courant continu puis alternatif ?** Les panneaux produisent naturellement du
  courant continu (comme une pile), mais les appareils domestiques et le réseau électrique
  fonctionnent en courant alternatif — l'onduleur fait cette conversion indispensable.
- **Un panneau produit-il par temps nuageux ?** Oui, à rendement réduit — la lumière diffuse
  traverse les nuages et continue à activer les cellules, juste avec moins d'intensité qu'en
  plein soleil.
- **Que se passe-t-il la nuit ?** Aucune production, logiquement — c'est le rôle du réseau
  électrique (ou d'une batterie domestique) de prendre le relais.
- **Combien de temps un panneau met-il à "démarrer" le matin ?** La production commence dès
  les premiers rayons, de façon progressive — pas d'effet de seuil brutal, juste une montée en
  puissance graduelle avec la luminosité.

### FAQ
*Sous-titre : Les questions qu'on nous pose le plus souvent sur le fonctionnement.*
- **Un panneau solaire peut-il tomber en panne ?** Rarement le panneau lui-même (pas de pièce
  mobile), plus souvent l'onduleur, qui a une durée de vie plus courte (10-15 ans en général).
- **Faut-il un branchement électrique spécial ?** Le raccordement se fait via votre tableau
  électrique existant, adapté par un professionnel lors de l'installation.
- **La neige empêche-t-elle la production ?** Temporairement si elle recouvre les panneaux,
  mais l'inclinaison et la surface lisse favorisent en général un glissement naturel assez rapide.

### Pont final
Comprendre le principe, c'est bien — voir ce que ça donnerait chez vous, c'est mieux →
**Estimer mon installation**

### Notes dev
- Module = `photonFlow`, jamais spécifié en détail ailleurs dans le projet — à concevoir :
  probablement une animation SVG simple (photon → cellule → électron → courant → onduleur),
  déclenchée au scroll-in, pas de librairie lourde.
- Meta-titre : `Comment fonctionne un panneau solaire ? Le principe expliqué simplement`
- Meta-description : `L'effet photovoltaïque expliqué en 3 étapes : de la lumière du soleil à l'électricité utilisable chez vous.`

---

## 4.2 Types de panneaux

**URL** : `/comprendre/types-de-panneaux`
**Module** : grille de cartes comparatives (famille F) — 4 types côte à côte

### H1 + réponse
# Monocristallin, polycristallin, bifacial, amorphe : quel type de panneau choisir ?

Le monocristallin domine le marché résidentiel belge grâce à son meilleur rendement par m² —
un critère important sur des toitures de taille limitée. Les autres technologies répondent à
des besoins plus spécifiques.

### Intro
Quatre technologies, un seul choix qui compte vraiment pour la plupart des projets
résidentiels — voici les différences essentielles, sans jargon inutile.

### Essentiel scannable — 4 cartes
*Sous-titre : Les 4 technologies, en un coup d'œil.*
- **Monocristallin** (accent) — Meilleur rendement par m², le plus courant en résidentiel
- **Polycristallin** — Rendement légèrement inférieur, souvent moins cher
- **Bifacial** — Capte la lumière des deux faces, utile en toiture surélevée ou au sol
- **Amorphe** (sombre) — Souple et léger, rendement plus faible, usages spécifiques (mobile, façade)

### Creuser le sujet
*Sous-titre : Comment choisir entre les 4 technologies.*
- **Pourquoi le monocristallin est-il le plus utilisé ?** Son meilleur rendement par m² permet
  de produire plus sur une surface de toiture limitée — l'argument décisif pour la majorité
  des toits résidentiels belges, où la surface disponible est souvent le facteur limitant.
- **Le polycristallin vaut-il le coup pour économiser ?** Sur une grande toiture sans
  contrainte de surface, oui — l'écart de rendement compte moins quand la place ne manque pas.
- **Le bifacial, dans quels cas ça a du sens ?** Surtout pour les installations au sol ou sur
  structures surélevées, où la face arrière peut capter la lumière réfléchie par le sol —
  moins pertinent pour une toiture classique posée à plat sur la charpente.
- **L'amorphe a-t-il sa place en résidentiel ?** Rarement pour une installation principale —
  son rendement plus faible le réserve à des usages spécifiques (intégration architecturale,
  surfaces courbes, applications mobiles).

### FAQ
*Sous-titre : Les questions qu'on nous pose le plus souvent sur les types de panneaux.*
- **Quelle est la différence de rendement entre mono et polycristallin ?** Le monocristallin
  atteint généralement des rendements plus élevés par m², un avantage surtout significatif sur
  petite surface.
- **Le prix varie-t-il beaucoup selon la technologie ?** Oui, le monocristallin coûte
  généralement plus cher au m² mais compense souvent par une puissance supérieure à surface égale.
- **Peut-on mélanger plusieurs technologies sur un même toit ?** Techniquement possible mais
  rarement recommandé — mieux vaut une installation homogène pour simplifier le suivi et
  l'entretien.

### Pont final
Le bon type de panneau dépend surtout de votre surface disponible → **Estimer mon installation**

### Notes dev
- Meta-titre : `Types de panneaux solaires : mono, poly, bifacial, amorphe`
- Meta-description : `Monocristallin, polycristallin, bifacial ou amorphe : les différences essentielles pour choisir le bon type de panneau solaire.`

---

## 4.3 Onduleur & micro-onduleur

**URL** : `/comprendre/onduleur`
**Module** : aucun — accordéon simple suffit

### H1 + réponse
# L'onduleur : le composant qui rend l'électricité solaire utilisable

L'onduleur transforme le courant continu produit par les panneaux en courant alternatif,
utilisable par les appareils domestiques et compatible avec le réseau électrique. Sans lui,
l'électricité produite par les panneaux serait inutilisable.

### Intro
Moins visible que les panneaux, mais tout aussi indispensable — et souvent le premier
composant à remplacer au cours de la vie de l'installation.

### Essentiel scannable
*Sous-titre : Onduleur string ou micro-onduleur, la vraie question.*
- Rôle (accent) — Transforme le courant continu en courant alternatif
- Onduleur string — Un seul onduleur pour toute l'installation, le plus courant
- Micro-onduleur (sombre) — Un par panneau, plus cher mais limite l'impact de l'ombrage
  (voir la page dédiée)

### Creuser le sujet
*Sous-titre : Ce qu'il faut savoir avant de choisir son onduleur.*
- **Onduleur string ou micro-onduleur, lequel choisir ?** L'onduleur string convient à la
  plupart des toitures sans ombrage significatif ; le micro-onduleur se justifie surtout en
  présence de sources d'ombrage partielles difficiles à éviter.
- **Combien de temps dure un onduleur ?** Généralement 10 à 15 ans, sensiblement moins que les
  panneaux eux-mêmes (25-30 ans) — un remplacement à mi-vie de l'installation est à anticiper
  dans le budget.
- **L'onduleur consomme-t-il de l'électricité ?** Une part infime pour son propre
  fonctionnement, négligeable par rapport à l'énergie qu'il convertit.
- **Où installer l'onduleur ?** Dans un local ventilé, si possible frais, à une distance
  raisonnable des panneaux (l'éloignement augmente les pertes et le coût du câblage).

### FAQ
*Sous-titre : Les questions qu'on nous pose le plus souvent sur l'onduleur.*
- **Que se passe-t-il si l'onduleur tombe en panne ?** L'installation cesse de produire de
  l'électricité utilisable jusqu'au remplacement — c'est la panne la plus fréquente sur une
  installation solaire, plus que les panneaux eux-mêmes.
- **Le remplacement de l'onduleur est-il coûteux ?** C'est une dépense à prévoir sur la durée
  de vie de l'installation, à budgétiser dès le départ plutôt que découvrir la surprise
  10-15 ans plus tard.
- **Un onduleur fait-il du bruit ?** Un léger bruit de ventilation est normal pour certains
  modèles — à prendre en compte dans le choix de son emplacement (éviter une chambre adjacente).

### Pont final
**Estimer mon installation**

### Notes dev
- Meta-titre : `Onduleur solaire : rôle, durée de vie, string vs micro-onduleur`
- Meta-description : `L'onduleur transforme l'électricité de vos panneaux en courant utilisable. String ou micro-onduleur, durée de vie, entretien : l'essentiel.`

---

## 4.4 Batterie domestique

**URL** : `/comprendre/batterie-domestique`
**Module** : aucun

### H1 + réponse
# La batterie domestique : stocker sa production solaire

Une batterie domestique stocke le surplus d'électricité produit en journée pour le
consommer plus tard, notamment le soir — elle augmente le taux d'autoconsommation mais
représente un investissement supplémentaire important.

### Intro
Ce n'est pas indispensable pour rentabiliser une installation solaire, mais ça change la
donne pour qui veut maximiser son autonomie électrique.

### Essentiel scannable
*Sous-titre : Ce qu'une batterie change concrètement.*
- Rôle (accent) — Stocke le surplus de journée pour une consommation différée
- Impact — Augmente significativement le taux d'autoconsommation
- Installation (sombre) — Ne peut pas être posée soi-même depuis la révision RGIE 2025

### Creuser le sujet
*Sous-titre : Ce qu'il faut savoir avant d'investir dans une batterie.*
- **Une batterie est-elle rentable ?** Ça dépend fortement du prix de l'électricité et de
  votre profil de consommation — le calcul est plus long à amortir qu'une installation
  solaire seule, à évaluer au cas par cas.
- **Quelle capacité de batterie choisir ?** Ça dépend de votre consommation en soirée et de
  votre production journalière — une batterie surdimensionnée n'apporte pas de bénéfice
  proportionnel à son coût.
- **La batterie fonctionne-t-elle en cas de coupure de courant ?** Pas systématiquement — ça
  dépend du système installé, certains fonctionnent uniquement couplés au réseau, d'autres
  offrent un mode secours. À vérifier avec votre installateur.
- **Peut-on ajouter une batterie après coup ?** Oui, la plupart des installations récentes sont
  compatibles avec un ajout ultérieur de batterie, sous réserve de compatibilité de l'onduleur.

### FAQ
*Sous-titre : Les questions qu'on nous pose le plus souvent sur les batteries.*
- **Une batterie augmente-t-elle vraiment mes économies ?** Oui, en vous permettant de
  consommer votre propre électricité le soir plutôt que d'en racheter au réseau — mais
  l'investissement doit être mis en balance avec le gain réel.
- **Combien de temps dure une batterie domestique ?** Généralement plusieurs milliers de
  cycles de charge/décharge, souvent garantie 10 ans par les fabricants.
- **Puis-je installer ma batterie moi-même ?** Non, l'auto-installation de batterie est
  interdite depuis la révision RGIE 2025 — un professionnel est obligatoire.

### Pont final
**Estimer mon installation**

### Notes dev
- Meta-titre : `Batterie domestique solaire : rôle, rentabilité, ce qu'il faut savoir`
- Meta-description : `Stocker sa production solaire avec une batterie domestique : impact sur l'autoconsommation, rentabilité, installation.`

---

## 4.5 Compteur intelligent

**URL** : `/comprendre/compteur-intelligent`
**Module** : aucun

### H1 + réponse
# Le compteur intelligent : indispensable pour le solaire ?

Un compteur intelligent (ou communicant) mesure séparément votre consommation et votre
production, ce qui est nécessaire pour bénéficier des différents mécanismes de valorisation
du solaire selon votre région (tarif prosumer, tarif d'injection, certificats verts).

### Intro
Un objet technique qu'on remarque à peine, mais sans lequel les mécanismes régionaux
(prosumer, injection, certificats verts) ne peuvent pas fonctionner.

### Essentiel scannable
*Sous-titre : Ce que fait un compteur intelligent.*
- Rôle (accent) — Mesure séparément production et consommation
- Obligation — Nécessaire pour toute installation solaire raccordée au réseau
- Gestionnaire (sombre) — Demande gratuite auprès de votre GRD (ORES, RESA, Fluvius, Sibelga)

### Creuser le sujet
*Sous-titre : Ce qu'il faut savoir sur le compteur intelligent.*
- **Le compteur intelligent est-il payant ?** Non, la demande et l'installation sont
  généralement prises en charge par le gestionnaire de réseau.
- **Combien de temps pour l'obtenir ?** Ça varie selon la région et le rythme de déploiement
  du gestionnaire de réseau — voir les pages démarches par région pour le détail.
- **Le compteur intelligent collecte-t-il mes données de consommation en détail ?** Il mesure
  les flux d'énergie nécessaires à la facturation — les modalités exactes de collecte varient
  selon le gestionnaire de réseau.
- **Sans compteur intelligent, puis-je quand même installer des panneaux ?** Techniquement
  oui pour la pose, mais l'activation des mécanismes de valorisation (tarif d'injection,
  certificats verts...) nécessite ce compteur.

### FAQ
*Sous-titre : Les questions qu'on nous pose le plus souvent sur le compteur intelligent.*
- **Qui demande le compteur intelligent, moi ou l'installateur ?** Généralement votre
  installateur s'en charge avec vous dans le cadre des démarches globales.
- **Le compteur intelligent remplace-t-il mon ancien compteur ?** Oui, il vient en
  remplacement du compteur analogique existant.
- **Ai-je le choix de refuser ?** Ça dépend de votre région et de la date de votre
  installation — voir la page "Fin du compteur inversé" pour le détail en Flandre.

### Pont final
**Estimer mon installation**

### Notes dev
- Meta-titre : `Compteur intelligent et panneaux solaires : à quoi ça sert`
- Meta-description : `Le compteur communicant mesure séparément production et consommation solaire — indispensable pour activer les mécanismes régionaux.`

---

## 4.6 Borne de recharge

**URL** : `/comprendre/borne-de-recharge`
**Module** : aucun — lien contextuel fort vers `/installation/applications/voiture-electrique`

### H1 + réponse
# La borne de recharge : un complément naturel au solaire

Une borne de recharge permet de recharger un véhicule électrique plus rapidement et plus
efficacement qu'une prise domestique classique — et de le faire avec l'électricité produite
par vos panneaux solaires.

### Intro
Ce n'est pas obligatoire pour recharger une voiture électrique, mais ça change la vitesse de
recharge et l'efficacité du couplage avec le solaire.

### Essentiel scannable
*Sous-titre : Pourquoi une borne plutôt qu'une prise classique.*
- Vitesse (accent) — Recharge nettement plus rapide qu'une prise domestique standard
- Sécurité — Installation dédiée, plus sûre pour un usage répété
- Couplage solaire (sombre) — Certaines bornes s'adaptent à la production disponible en temps réel

### Creuser le sujet
*Sous-titre : Ce qu'il faut savoir avant d'installer une borne.*
- **Faut-il une borne spécifique pour coupler avec le solaire ?** Certains modèles intelligents
  ajustent automatiquement la puissance de recharge selon la production solaire disponible —
  un vrai plus pour maximiser l'autoconsommation, mais pas indispensable pour recharger tout court.
- **La borne consomme-t-elle plus qu'une prise classique ?** Non, elle ne consomme pas plus
  d'énergie pour un même trajet — elle la délivre juste plus rapidement et plus efficacement.
- **Peut-on installer une borne sans panneaux solaires ?** Oui, les deux sont indépendants,
  même si le couplage a du sens économiquement quand les deux coexistent.
- **Faut-il un permis pour installer une borne ?** Généralement non pour une installation
  murale standard, mais les règles peuvent varier selon la commune.

### FAQ
*Sous-titre : Les questions qu'on nous pose le plus souvent sur la borne de recharge.*
- **Une borne coûte-t-elle cher à installer ?** Le coût varie selon la puissance et les
  éventuelles adaptations du tableau électrique nécessaires.
- **Puis-je recharger la nuit avec mes panneaux solaires ?** Non, sans batterie de stockage
  — voir la page dédiée "Voiture électrique" pour le détail.
- **La borne fonctionne-t-elle avec toutes les voitures électriques ?** La plupart des bornes
  domestiques sont compatibles avec les standards de charge courants, à vérifier selon le
  modèle de véhicule.

### Pont final
Voir comment coupler borne de recharge et panneaux solaires → **Estimer mon installation**
**Lien contextuel** → `/installation/applications/voiture-electrique`

### Notes dev
- Meta-titre : `Borne de recharge et panneaux solaires : le duo gagnant`
- Meta-description : `Pourquoi une borne de recharge plutôt qu'une prise classique, et comment la coupler efficacement avec une installation solaire.`
