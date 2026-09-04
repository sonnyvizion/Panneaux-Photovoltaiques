/**
 * L'ENVOI DES FORMULAIRES DE SORTIE — le point de branchement, et le seul.
 *
 * ⚠️ L'HÉBERGEUR N'EST PAS TRANCHÉ. `stack.md` hésite encore entre Cloudflare
 * Pages et Netlify, et le service d'e-mail entre Brevo et Resend. Tout ce qui
 * dépend de ces choix tient donc dans UNE variable et UNE fonction : le jour où
 * ils sont faits, il n'y a rien d'autre à toucher dans le site.
 *
 * ⚠️ PAS DE FAUX SUCCÈS. Tant qu'aucun endpoint n'est configuré, le formulaire
 * le DIT. Afficher « merci, vous allez recevoir votre estimation » sans rien
 * envoyer serait un mensonge au visiteur et une perte sèche de prospect pour le
 * client — et le genre de panne qu'on ne découvre que des semaines plus tard,
 * en se demandant pourquoi le site ne génère rien. Mieux vaut une page qui
 * avoue qu'une page qui ment.
 *
 * ⚠️ CE QUE LE SERVEUR RECEVRA : les champs du formulaire, plus les réponses du
 * simulateur, plus `document` — l'adresse de la page à imprimer pour fabriquer
 * le PDF (`/rapport/document?…`). Le serveur n'a donc rien à recalculer : il
 * ouvre, attend `data-report-ready`, imprime, joint, envoie.
 */

/**
 * L'adresse du point d'envoi.
 *
 * ⚠️ `/api/lead` PAR DÉFAUT depuis le 2026-09-04 : c'est la fonction Cloudflare
 * Pages du dépôt (`functions/api/lead.ts`), servie par le même domaine que les
 * pages. Elle existe donc toujours, et il n'y a plus rien à configurer côté
 * navigateur — la variable ne sert qu'à la détourner (recette, autre
 * hébergeur).
 *
 * ⚠️ Ce défaut est SANS RISQUE parce que la fonction répond `503
 * { configured: false }` tant que la clé Brevo n'est pas posée, ce que
 * `submitLead` traduit par « pas encore actif ». Le visiteur lit la même phrase
 * honnête qu'avant tout branchement, et le jour où la clé arrive, l'envoi
 * fonctionne sans qu'une ligne soit redéployée.
 */
export const LEAD_ENDPOINT = import.meta.env.PUBLIC_LEAD_ENDPOINT ?? '/api/lead';

import { track } from './analytics';

export type LeadState = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured';

/* ⚠️ LE CONTRAT VIT DANS `leadMail.ts`, et il n'est pas recopié ici : c'est le
   MÊME objet que la fonction serveur consomme. Deux définitions auraient divergé
   au premier champ ajouté, et la divergence ne se serait vue qu'en production,
   sur une demande perdue. */
import type { LeadPayload } from './leadMail';
export type { LeadPayload };

/**
 * ⚠️ Prend des PAIRES, pas un `<form>`. Un `FormData` en est déjà un itérable,
 * l'appelant n'a donc rien à faire de plus — mais la fonction devient testable
 * sans DOM, et le projet n'embarque pas d'environnement DOM pour ses tests.
 * Tout le reste de sa logique (l'adresse du document, le tri des champs) mérite
 * d'être verrouillé : c'est ce contrat que le serveur consommera.
 */
export function buildPayload(
  entries: Iterable<[string, FormDataEntryValue]>,
  variant: string,
  answers: string,
  origin: string,
  pathname: string,
): LeadPayload {
  const fields: Record<string, string> = {};
  for (const [key, value] of entries) {
    if (typeof value === 'string') fields[key] = value;
  }
  /* Les réponses voyagent à part, pas mélangées aux champs saisis : le serveur
     doit pouvoir reconstruire l'URL du document sans trier. */
  delete fields['reponses'];

  return {
    variant,
    fields,
    answers,
    document: `${origin}/rapport/document${answers ? `?${answers}` : ''}`,
    source: pathname,
  };
}

/**
 * Envoie la demande.
 *
 * Ne lève jamais : l'appelant peint un état, il n'a pas à intercepter.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadState> {
  if (!LEAD_ENDPOINT) return 'unconfigured';

  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    /**
     * ⚠️ 503 N'EST PAS UNE PANNE. La fonction serveur répond ainsi tant que la
     * clé Brevo n'est pas posée : le point d'envoi existe, il n'est pas encore
     * armé. Le visiteur lit alors la même phrase honnête qu'avant tout
     * branchement, au lieu d'un échec qui l'inviterait à réessayer en vain.
     */
    if (response.status === 503) return 'unconfigured';

    if (response.ok) {
      /* ⚠️ L'ÉVÉNEMENT PART À LA RÉUSSITE, PAS À LA TENTATIVE. Compter les
         soumissions qui échouent gonflerait le taux de conversion exactement
         dans les moments où le site marche le moins bien : on croirait le
         formulaire performant le jour où il est cassé. Sans point d'envoi
         configuré, la fonction est déjà sortie plus haut, donc rien ne part. */
      track(payload.variant === 'rapport' ? 'pdf_requested' : 'quote_form_submitted', {
        source: payload.source,
      });
      return 'sent';
    }
    return 'error';
  } catch {
    /* Réseau coupé, endpoint injoignable, CORS refusé : du point de vue du
       visiteur c'est la même chose — sa demande n'est pas partie. */
    return 'error';
  }
}
