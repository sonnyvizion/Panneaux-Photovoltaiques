# Correction du "Cas A" — cahier pour Claude Code

> Contexte : l'audit de mise en page a identifié un problème récurrent — le composant
> "carte-chiffre" (3 cartes, grande valeur en bas à droite) est conçu pour de vraies
> statistiques ("100%", "6 ans"), mais est appliqué sur beaucoup de pages à du texte
> qualitatif ("Capte", "Complément", "4-6"), où la valeur flotte de façon disproportionnée.
> Voir `audit-mise-en-page.md` pour le détail complet de l'audit.

## Le principe à appliquer partout (pas juste sur les pages listées)

Avant de corriger une page, pose-toi cette question pour **chacune des 3 cartes** de la
section "En bref" :

1. **La valeur est-elle un vrai chiffre qui mérite d'être vu de loin** (ex. "6 ans", "45%",
   "20-22 kg") ? → Garde le format carte-chiffre pour celle-là.
2. **Les 3 cartes représentent-elles 3 objets physiques différents et photographiables**
   (ex. cellule / onduleur / compteur) ? → Passe en carte-photo (voir modèle Fonctionnement).
3. **Les 3 cartes sont-elles 3 facettes qualitatives parallèles d'un même sujet**, sans
   objet à photographier (ex. rôle / impact / installation d'une batterie) ? → Passe en
   carte-icône (icône + titre + texte, pas de valeur géante).
4. **Le contenu est-il vraiment une comparaison** (2-3 options avec les mêmes critères) ?
   → Envisage un petit tableau plutôt que des cartes.
5. **Un seul fait mérite d'être mis en avant, les autres sont secondaires** ? → Garde une
   carte-chiffre pour le fait principal, redescends le reste en texte simple sous la grille.

**Ne force jamais 3 cartes uniformes si le contenu ne s'y prête pas naturellement.** C'est
cette contrainte artificielle qui a créé le problème au départ.

---

## 1. Fonctionnement — ✅ déjà fait, ne pas retoucher
Carte-photo, 3 textes déjà corrigés et images en cours de génération
(`fonctionnement-carte-cellule.jpg`, `-onduleur.jpg`, `-compteur.jpg`). Sert de modèle visuel
pour la section 2.

## 2. Onduleur — carte-photo (2 cartes, pas 3)
Les 3 valeurs d'origine (Rôle / Onduleur string / Micro-onduleur) se réduisent à **2 vrais
objets photographiables** — le rôle général est déjà couvert par l'intro de la page, pas
besoin d'une 3e carte pour ça.

- **Carte A** — Titre : *L'onduleur string* — Texte : "Un seul boîtier pour toute
  l'installation — le montage le plus courant, adapté à la plupart des toitures sans
  ombrage." — Photo : réutilise `fonctionnement-carte-onduleur.jpg` (déjà générée).
- **Carte B** — Titre : *Le micro-onduleur* — Texte : "Un boîtier par panneau — plus cher à
  l'achat, mais limite fortement l'impact d'une ombre partielle sur la production totale." —
  Photo : `onduleur-carte-micro.jpg` (en cours de génération).

Passe en grille 2 colonnes égales, pas la grille asymétrique 2+1 de Fonctionnement (qui n'a
de sens qu'à 3 éléments).

## 3. Trouver un pro — carte-photo (3 cartes)
- **Certification** — Texte : "RESCert ou équivalent régional selon votre zone — la garantie
  que l'installateur est reconnu par les autorités." — Photo :
  `trouver-pro-carte-certification.jpg`.
- **Assurance** — Texte : "Responsabilité civile professionnelle — à vérifier avant de
  signer, ça vous protège en cas de problème." — Photo :
  `trouver-pro-carte-assurance.jpg`.
- **Devis** — Texte : "Détaillé et remis avant le début des travaux — jamais un chiffrage
  approximatif de dernière minute." — Photo : `trouver-pro-carte-devis.jpg`.

Grille 2+1 comme Fonctionnement (3 éléments réels).

## 4. Batterie domestique — carte-icône (garder 3 cartes, ajouter icônes)
Rôle / Impact / Installation restent 3 facettes qualitatives parallèles, pas d'objet
à photographier de façon distincte. Passe en carte-icône :
- Stocker → icône `package` ou `archive`
- Autoconso → icône `trending-up`
- Par un pro → icône `user-check`

## 5. Compteur intelligent — carte-icône
- Mesurer → icône `chart-bar` ou `activity`
- Nécessaire → icône `lock` ou `shield-check`
- Gratuit → icône `gift` ou `tag`

## 6. Garanties — tableau, pas de cartes
Les 3 garanties (produit / performance / légale) sont une vraie comparaison — mieux servies
par un tableau à 2 colonnes que par 3 cartes séparées qui cassent le lien logique entre elles :

| Type de garantie | Couvre quoi | Durée typique |
|---|---|---|
| Garantie produit | Défauts de fabrication du panneau | 10 à 15 ans |
| Garantie de performance | Rendement minimum garanti dans le temps | Jusqu'à 25 ans |
| Garantie légale | S'applique à tout achat en Belgique | Selon le droit commun |

## 7. Réglementation bruxelloise 2026 — 1 carte à 3 lignes, pas 3 cartes
"Obligatoire" / "Aucun CV" / "Révisés" sont 3 conséquences d'un seul fait (le RESCert),
pas 3 informations indépendantes. Regroupe en une seule carte :

**Titre** : Ce qui change concrètement depuis 2026
- RESCert PV obligatoire pour toute installation ≤ 5 kWc
- Sans ce certificat, aucun accès aux certificats verts
- Coefficients de CV révisés à partir du 1ᵉʳ avril 2026 par Brugel

## 8. Fin du compteur inversé (Flandre) — 2 cartes-chiffre + texte simple
"Janvier 2021" et "2029" sont de vraies dates, gardent leur carte-chiffre. "Tous" (qui est
concerné) devient un texte simple, pas une 3e carte :

- Carte-chiffre (accent) : **Janvier 2021** — décision de la Cour constitutionnelle
- Carte-chiffre (sombre) : **2029** — fin du déploiement, ~30 000 poses/mois en 2026
- Texte sous les 2 cartes : *"Qui est concerné ? Tous les propriétaires de panneaux
  solaires, y compris les installations antérieures à 2021."*

## 9. Poids — 1 carte-chiffre + texte simple
"20-22 kg" est un vrai chiffre, garde sa carte. "Diffuse" et "À vérifier" deviennent du texte :

- Carte-chiffre (accent, seule) : **20-22 kg** — par panneau, soit 280 à 310 kg pour 14 panneaux
- Texte en dessous : *"Ce poids se répartit sur toute la surface du toit, jamais en un seul
  point. Sur les toitures anciennes ou déjà fragilisées, une vérification reste recommandée."*

## 10. Impact écologique — retouche mineure
"0,5 à 1,5 tonne" et "1-3 ans" restent en cartes-chiffre (2 cartes, pas 3). "Largement"
(recyclage) devient un texte sous la grille :

- Texte : *"Les panneaux sont largement recyclables — verre, aluminium et silicium sont
  récupérables via des filières dédiées."*

## 11. Abri de jardin — 1 carte-chiffre + texte simple
"4-6" est un vrai chiffre, garde sa carte. "Complément" et "Au compteur" deviennent du texte :

- Carte-chiffre (accent, seule) : **4-6** — panneaux au maximum, selon la surface
- Texte en dessous : *"Rôle : un complément, rarement une installation principale.
  Raccordement : au même compteur que la maison — la configuration la plus fréquente."*

---

## 12-15. Pages non vérifiées visuellement — à toi de jouer

Je n'ai pas revisité individuellement Longévité, Maintenance, Borne de recharge et Risques &
inconvénients pendant l'audit — donc pas de prescription toute faite pour celles-là. Applique
le principe en tête de ce document à chacune, et dis-moi ce que tu trouves (quelles cartes
sont de vrais chiffres à garder, lesquelles doivent changer de traitement) avant de les
corriger à l'aveugle. Si en creusant tu tombes sur d'autres pages touchées par le même
problème ailleurs sur le site (pas seulement Comprendre/Aides/Installation), signale-les aussi
plutôt que de les corriger sans prévenir.

## Ce que je veux dans ton rapport
Comme d'habitude : quelles pages tu as pu corriger directement avec ce cahier, ce que tu as
trouvé sur les 4 pages non vérifiées, et toute page où le principe ne donnait pas un résultat
clair (dans ce cas, ne tranche pas seul, décris-moi le cas).
