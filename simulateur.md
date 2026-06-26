# Le simulateur

> Hub : `../CLAUDE.md`. L'objet central du site. Existe déjà (calculateur live, validé).
> Ce doc liste ce qu'on garde, ce qu'on corrige, et le pont de conversion à (re)faire.
> Voir aussi `docs/funnel.md` pour la segmentation audience et les séquences email.

## Rôle & emplacements

- Vit sur la page **`/simulateur`** (et c'est cette page que le hero ouvre).
- Calculateur **live** : tout se met à jour en direct, sur un écran (gauche = saisie, droite = résultats).
- C'est à la fois un terrain de jeu (engagement, SEO) ET l'entrée du funnel devis.

## L'amorce (hero de la home)

- Hero = **un seul champ : code postal** + bouton « Continuer à simuler ».
- Le bouton **ouvre `/simulateur`** avec le **volet 1 pré-rempli** : région **auto-détectée**
  depuis le code postal (table préfixes BE : 1xxx = Bruxelles, 4xxx/5xxx/6xxx/7xxx = Wallonie,
  2xxx/3xxx/8xxx/9xxx = Flandre — à affiner). Effet « on a déjà repéré que vous êtes en Wallonie ».
- Le hero **n'effectue aucun calcul** : il amorce et transmet une donnée. Un seul simulateur existe.

### Transmission de contexte (query params)

Chaque point d'entrée vers `/simulateur` doit transmettre les informations déjà connues :

```
/simulateur?region=wallonie                          ← depuis hero home (CP détecté)
/simulateur?region=flandre&orientation=sud           ← depuis page "orientation toit"
/simulateur?region=bruxelles                         ← depuis méga-menu Aides > Bruxelles
```

Le simulateur lit ces params au montage et pré-remplit les champs correspondants.
Effet perçu : « le site a retenu ce que je cherchais » → réduction de friction, hausse du taux de complétion.
Règle : **ne jamais ouvrir `/simulateur` sans transmettre au moins la région si elle est connue.**

## Entrées (à conserver)

- **Statut** (propriétaire / locataire) — **à poser en toute première question**, avant tout calcul.
  Un locataire ne peut pas installer → redirection bienveillante immédiate (voir ci-dessous).
- **Région** (Wallonie / Bruxelles / Flandre) — pilote ensoleillement, primes ET logique d'économies.
- **Consommation annuelle** (kWh/an, slider) — proposer aussi une saisie par **facture mensuelle €**
  pour ceux qui ignorent leurs kWh.
- **Surface de toiture disponible** (m²).
- **Orientation** : Sud 100 % · Sud-Est 95 % · Est/Ouest 85 % · Nord 65 %.
- **Type de toiture** : inclinée · toit plat · intégré toiture (BIPV) · au sol / jardin.
- **Prix de l'électricité** (€/kWh, slider, défaut ~0,28).

### Gestion du locataire (qualification dès l'étape 1)

Si le visiteur sélectionne **« Locataire »** :
- Ne pas afficher le simulateur complet (il ne peut pas installer).
- Afficher un écran dédié : « L'installation nécessite l'accord du propriétaire »
  avec deux sorties :
  - « Partagez cette estimation avec votre propriétaire » (lien de partage).
  - « Revenez si votre situation change » (invitation à bookmarker / laisser l'email).
- **Pourquoi dès l'étape 1** : engagement progressif (Cialdini — cohérence). Un locataire
  qui va jusqu'au bout du simulateur pour découvrir qu'il ne peut pas installer vit une
  frustration qui détruit la confiance dans le site. Filtrer tôt = meilleure expérience
  ET leads commerciaux uniquement qualifiés.

## Sorties — Option A : résultats partiels (décision validée)

Le simulateur affiche volontairement des **résultats en fourchette**, pas des chiffres précis.
Objectif : donner assez pour convaincre, pas assez pour que le visiteur se passe de l'équipe.

### Ce qui est visible (sans inscription)

| Métrique | Format affiché | Exemple |
|---|---|---|
| Économies annuelles estimées | Fourchette large | ~800 – 1 400 €/an |
| Retour sur investissement | Fourchette | 7 – 11 ans |
| Potentiel solaire de la région | Qualitatif + étoiles | Bon potentiel ●●●●○ |
| Aides disponibles | Liste sans montants | ✓ Prime énergie · ✓ Tarif prosumer |
| CO₂ évité | Ordre de grandeur | ~600 – 900 kg/an |

### Ce qui est caché (derrière la demande d'étude)

- Puissance recommandée (kWc exact)
- Nombre de panneaux précis
- Coût estimé de l'installation
- Montant précis des aides par région
- Courbe de production mensuelle
- Détail autoconsommation vs injection réseau

**Pourquoi cette approche :** le visiteur obtient assez pour se qualifier lui-même
("oui, ça vaut le coup pour moi") mais le chiffrage précis nécessite une visite de toit
et l'expertise de l'équipe. C'est vrai — et ça justifie le contact.

### Le bloc « Hypothèses de calcul »
À conserver dans la version visible — c'est un pilier de crédibilité encyclopédique.
Il explique les paramètres utilisés (ensoleillement région, prix €/kWh, facteur CO₂ Elia…)
sans donner le calcul précis de l'installation.

## Corrections à apporter

### 1. CO₂ — actuellement FAUX (correction critique)

La valeur affichée (~9,5 t/an) est **6 à 15× trop haute**. Le réseau électrique belge est
peu carboné (mix nucléaire + renouvelables important). Un visiteur averti le détecte
immédiatement et perd confiance dans **toutes** les autres valeurs du simulateur.

**Facteur à utiliser** : le facteur d'émission du réseau belge publié par Elia / IPCC.
- Elia publie un facteur moyen annuel : **~170 g CO₂/kWh** (à vérifier avec la valeur
  la plus récente disponible sur elia.be — données publiques, mises à jour annuellement).
- Pour ~3 800 kWh/an évités : **~0,65 t CO₂/an** (ordre de grandeur réaliste).
- Fourchette honnête selon l'année et le mix : **0,5 à 1,0 t CO₂/an** pour une installation
  résidentielle typique belge.

**Action** :
1. Corriger le calcul : `co2_evite_kg = kwh_evites * facteur_elia_g_par_kwh / 1000`.
2. Afficher le résultat en **kg** si < 1 000 kg, en **tonnes** si > 1 t (ne pas afficher
   "0,65 tonnes" — afficher "650 kg").
3. Mentionner la source dans le bloc « Hypothèses de calcul » :
   > « Facteur d'émission CO₂ du réseau belge : ~170 g/kWh (source : Elia, [année]) »
4. Ne pas supprimer la métrique CO₂ — la corriger. C'est un pilier de crédibilité.

**Ce qu'il ne faut pas faire** : surgonfler pour impressionner. Un visiteur qui partage
l'estimation avec un ami écologiste informé et se retrouve corrigé = perte de confiance
dans tout le site.

### 2. Régionalisation — doit aller plus loin que l'ensoleillement + les primes
La **logique d'économies elle-même** change par région :
- **Wallonie** : le **tarif prosumer** est un coût annuel réel → il dégrade le ROI.
  Le « 8,1 ans » actuel est optimiste tant qu'il n'est pas intégré.
- **Flandre** : le **compteur qui tourne à l'envers, c'est fini** → la valeur de l'injection
  est très différente (tarif d'injection). À modéliser distinctement.
- **Bruxelles** : régime de **certificats verts** (revenu) à intégrer.
- **Action** : un jeu d'hypothèses par région, pas un simple coefficient d'ensoleillement.
- Hypothèses à faire valider par le client (placeholders) : prix/kWc, tarif injection,
  montant prosumer, valeur certificat vert, ensoleillement par région.

## Le pont de conversion (à refaire)

Le bloc existe en bas du simulateur, mais son discours est à **réécrire** : aujourd'hui
« Obtenez 3 devis réels d'installateurs certifiés » = positionnement Solvari (intermédiaire),
**faux pour ce client et contre-productif**.

### Nouveau discours — Option A (étude personnalisée)

Le CTA n'est plus "devis direct" mais **"étude personnalisée"** — ça justifie
pourquoi les chiffres précis ne sont pas dans le simulateur.

> **Obtenez votre étude personnalisée gratuite**
> Nos experts analysent votre toiture, votre consommation réelle et les aides
> auxquelles vous avez droit en [région]. Vous recevez un chiffrage précis —
> pas une fourchette, votre prix à vous.
> *Gratuit · sans engagement · réponse sous 48h*
> *Installateur certifié Enphase · [région détectée]*

### Réutiliser les chiffres
Le formulaire affiche le récap de SA simulation (ex. « ~900–1 300 €/an d'économies estimées »)
pour qu'il sente qu'il **finalise son projet**, pas qu'il remplit un formulaire de plus.
Note : afficher la fourchette, pas un chiffre précis — cohérent avec l'Option A.

### Champs de qualification (le commercial en a besoin)
- **Statut** : propriétaire / locataire (un locataire ne peut pas faire poser → à savoir tout de suite).
- **Échéance** du projet : « dans le mois » / « 1-3 mois » / « je me renseigne »
  (priorise l'appel commercial).
- Prénom, e-mail.
- **Téléphone en dernier** (le champ qui fait le plus fuir).
- Ne demander QUE ce que le commercial utilisera vraiment.

### CTA secondaire (rattraper les hésitants)
Pour qui n'est pas prêt à parler à un commercial : « recevez votre rapport PDF par e-mail »
ou « être rappelé ». On ne perd pas l'abandonneur.

> **Règle de présentation** : CTA primaire (devis) affiché en premier et visuellement dominant.
> CTA secondaire (PDF) affiché juste en-dessous, texte plus petit, sans bouton concurrent.
> Exemple : bouton plein « Recevoir mon devis » + lien texte « Recevoir mon estimation par email ».

### Conserver
Le lien « Aides disponibles → Voir » (hameçon vers le contenu encyclopédique).

## CTA adaptatif selon le profil détecté

Le pont de conversion ne doit pas présenter le même discours à tous les profils.
Le simulateur connaît le profil dès que les entrées sont remplies — l'utiliser.

| Signal détecté | CTA prioritaire | Justification |
|---|---|---|
| Consommation élevée (> 4 000 kWh/an) + orientation Sud + grande surface | Pont devis directement | Profil "chaud" — ROI évident, pas besoin de nurture |
| Consommation moyenne + orientation correcte | Pont devis + CTA secondaire PDF | Profil standard |
| Consommation faible OU orientation défavorable OU petite surface | CTA secondaire PDF dominant | ROI moins évident → nurture email avant appel commercial |
| Locataire | Redirection bienveillante (voir entrées) | Lead non qualifiable |

**Implémentation** : la logique est côté client (déjà calculé). Un score simple
(ex. kWh × coefficient orientation × m² / seuil) détermine le CTA à mettre en avant.
Seuils à calibrer avec le commercial (quels leads veut-il recevoir en priorité ?).

## Séquence email post-capture (à définir avec le client)

Quand un visiteur laisse son email (CTA secondaire PDF ou abandon), il entre dans
une séquence nurture. Cette séquence **doit être différenciée par région** — c'est
l'un des différenciateurs forts du site (aides ≠ selon région).

Structure proposée (à valider) :

| Email | Timing | Contenu | CTA |
|---|---|---|---|
| 1 — Votre estimation | Immédiat | Récap simulation + PDF | « Des questions ? Appelez-nous » |
| 2 — Les aides [région] | J+2 | Aides spécifiques à leur région | « Calculer mon aide exacte » → simulateur |
| 3 — Témoignage [région] | J+5 | Chantier réel dans leur région | « Voir d'autres réalisations » |
| 4 — Relance devis | J+10 | « Votre projet a-t-il avancé ? » | Pont devis direct |

Outils recommandés : **Brevo** (RGPD, tarifs accessibles, séquences visuelles) ou **Resend**
(pour les devs, API-first). À décider avec le client.
**Non négociable** : toute séquence doit avoir un lien de désinscription conforme RGPD.

## i18n
Tous les libellés du simulateur et du pont en FR/NL. Les hypothèses régionales
sont communes ; seules les chaînes changent.
Les séquences email sont à dupliquer en NL avec contenu localisé (aides Flandre en NL,
aides Bruxelles bilingue FR/NL selon préférence détectée).
