# Bruxelles : certificats verts, comment ça marche

> URL : `/aides/bruxelles` — Pilier : Aides & primes
> Rédaction complète (Partie B), à partir de la fiche `fiches-aides-primes.md` #4 (avec le teaser Sibelga ajouté).

---

## H1 + réponse (toujours visible)

# Certificats verts à Bruxelles : le seul vrai avantage financier en Belgique

Bruxelles est la seule région belge à encore octroyer des certificats verts pour les nouvelles installations photovoltaïques — environ 700 à 1 000 €/an de revenus sur 10 ans pour une installation de 5 kWc.

---

## Intro courte

En Wallonie et en Flandre, ce système a disparu depuis longtemps. À Bruxelles, il existe toujours — et c'est un vrai revenu, pas juste une réduction de facture. Voici comment ça marche, et combien ça représente concrètement pour vous.

---

## MODULE — Calculateur de certificats verts

*(voir description détaillée ci-dessus — slider 3-5 kWc, sortie CV/an + revenu/an + total sur 10 ans)*

CTA sous le module : **Estimer mon installation**

---

## Essentiel scannable

- **Taux d'octroi 2026** : 2,055 CV/MWh pour les installations de 5 kWc ou moins (en vigueur depuis le 13 octobre 2023)
- **Prix de revente d'un certificat** : environ 65 à 90 €
- **Durée** : les certificats sont octroyés pendant 10 ans, chaque certificat reste valide 5 ans
- **Au-delà de 100 kWc** : plus aucun certificat vert n'est octroyé — l'installation est jugée assez rentable sans (retour sur investissement visé : 7 ans)
- **Condition obligatoire depuis 2026** : le certificat RESCert PV, délivré par un installateur certifié, sans lequel vous n'avez accès à aucun certificat vert

Le raccordement Sibelga, qui fait peur à beaucoup de propriétaires, notre équipe s'en occupe pour vous — voir le détail des démarches.

---

## [ACCORDÉON : Comment sont calculés mes certificats verts ?]
Le nombre de certificats verts que vous recevez dépend de votre production réelle, exprimée en MWh, multipliée par le coefficient régional (2,055 CV/MWh pour les installations ≤5 kWc). Une installation qui produit 4,5 MWh par an génère donc environ 9,2 certificats verts annuels.

## [ACCORDÉON : Comment revendre mes certificats verts ?]
Les certificats verts se revendent généralement aux fournisseurs d'électricité, qui ont l'obligation légale d'en détenir un quota. Le prix varie selon le marché, entre 65 et 90 € par certificat.

## [ACCORDÉON : Le RESCert PV, qu'est-ce que c'est exactement ?]
C'est un certificat de conformité délivré par un installateur certifié, obligatoire depuis le 1er janvier 2026 pour toute nouvelle installation de 5 kWc ou moins à Bruxelles. Sans lui, impossible d'accéder aux certificats verts, quelle que soit la qualité de votre installation.

## [ACCORDÉON : Que se passe-t-il après les 10 ans ?]
Une fois la période de 10 ans d'octroi terminée, votre installation ne génère plus de nouveaux certificats verts. L'électricité produite reste la vôtre, mais l'avantage financier des CV s'arrête à ce moment-là.

---

## FAQ

**Comment vendre mes certificats verts, à qui ?**
Vous les revendez à un fournisseur d'électricité, qui a l'obligation légale d'en détenir un certain quota. Le prix de rachat varie selon le marché, entre 65 et 90 € par certificat.

**Le RESCert, c'est quoi exactement et qui le délivre ?**
C'est un certificat de conformité obligatoire depuis 2026, délivré par votre installateur s'il est certifié RESCert PV. Sans lui, pas d'accès aux certificats verts, même si votre installation fonctionne parfaitement.

**Que se passe-t-il après les 10 ans d'octroi ?**
Vous arrêtez de recevoir de nouveaux certificats verts, mais votre installation continue de produire de l'électricité normalement.

**Les certificats verts, ça vaut combien concrètement pour mon installation ?**
Pour une installation de 5 kWc, comptez environ 700 à 1 000 € par an, soit plusieurs milliers d'euros sur les 10 ans d'octroi. Utilisez le calculateur en haut de page pour une estimation sur votre puissance exacte.

---

## PONT — lien contextuel

**En savoir plus sur la réglementation 2026** → `/aides/bruxelles/reglementation-2026`

---

## PONT FINAL

Intégrez cet avantage à votre calcul de rentabilité complet.
**→ Estimer mon installation**

---

## Notes pour le dev / relecture

- Le module réutilise la même mécanique que le `billSlider` de la page Prix (slider → 2-3 résultats calculés en direct) — pas un nouveau composant à développer de zéro, juste une nouvelle formule de calcul.
- Le calcul affiché (900 kWh/kWc/an × 2,055 CV/MWh × 77€ moyen) doit rester visible en petit sous le module, dans l'esprit du bloc "Hypothèses de calcul" du simulateur — transparence = crédibilité.
- Le slider est volontairement limité à 3-5 kWc : au-delà, le coefficient de CV change et n'est pas confirmé dans nos sources actuelles — ne pas extrapoler au-delà sans vérification.
- Meta-titre suggéré (<60 caractères) : `Certificats verts Bruxelles 2026 : combien ça rapporte`
- Meta-description suggérée (<155 caractères) : `Bruxelles reste la seule région avec des certificats verts pour le solaire. Calculez ce que ça représente pour votre installation.`
