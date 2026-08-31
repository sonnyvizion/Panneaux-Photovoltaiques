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

/** L'adresse du point d'envoi. Vide tant que l'hébergeur n'est pas choisi. */
export const LEAD_ENDPOINT = import.meta.env.PUBLIC_LEAD_ENDPOINT ?? '';

export type LeadState = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured';

export interface LeadPayload {
  /** `devis` · `etude` · `rapport` — ce que le visiteur demande. */
  variant: string;
  /** Les champs saisis. */
  fields: Record<string, string>;
  /** Les réponses du simulateur, telles qu'elles voyagent dans les URLs. */
  answers: string;
  /** L'adresse de la page à imprimer pour produire le PDF. */
  document: string;
  /** La page d'où part la demande — utile pour l'attribution. */
  source: string;
}

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
    return response.ok ? 'sent' : 'error';
  } catch {
    /* Réseau coupé, endpoint injoignable, CORS refusé : du point de vue du
       visiteur c'est la même chose — sa demande n'est pas partie. */
    return 'error';
  }
}
