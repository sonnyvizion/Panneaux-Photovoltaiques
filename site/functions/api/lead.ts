import { teamEmail, validateLead, visitorEmail, type LeadPayload } from '../../src/scripts/leadMail';

/**
 * LE POINT D'ARRIVÉE DES DEMANDES — la seule pièce serveur du site.
 *
 * Le site est statique : c'est une fonction Cloudflare Pages, servie sur
 * `/api/lead` par le même domaine que les pages. Même origine, donc aucun CORS
 * à ouvrir, et rien à configurer côté navigateur.
 *
 * ⚠️ TOUT CE QUI SE DÉCIDE EST AILLEURS. Ce fichier lit, valide, poste et
 * répond. Ce qui est refusé et ce qui est écrit vit dans `src/scripts/leadMail.ts`,
 * pur et testé — ici il n'y a rien à tester qui ne demande un réseau.
 *
 * ⚠️ LA CLÉ NE PART JAMAIS AU NAVIGATEUR. C'est toute la raison d'être de cette
 * fonction : `BREVO_API_KEY` est une variable d'environnement Cloudflare, lue
 * côté serveur. Un site statique qui appellerait Brevo depuis la page publierait
 * sa clé à qui ouvre les outils de développement.
 */

interface Env {
  /** Clé d'API Brevo. Son absence n'est pas une panne — voir plus bas. */
  BREVO_API_KEY?: string;
  /** Adresse de l'équipe, destinataire des demandes. */
  LEAD_TO?: string;
  /** Expéditeur, qui doit être un domaine vérifié chez Brevo. */
  LEAD_FROM_EMAIL?: string;
  LEAD_FROM_NAME?: string;
}

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

interface BrevoMail {
  subject: string;
  text: string;
  html: string;
}

async function send(
  env: Env,
  to: { email: string; name?: string },
  mail: BrevoMail,
  replyTo?: string,
): Promise<boolean> {
  const response = await fetch(BREVO_ENDPOINT, {
    method: 'POST',
    headers: {
      'api-key': env.BREVO_API_KEY!,
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { email: env.LEAD_FROM_EMAIL, name: env.LEAD_FROM_NAME ?? 'Belgreen' },
      to: [to],
      subject: mail.subject,
      textContent: mail.text,
      htmlContent: mail.html,
      /* Répondre au courriel de l'équipe écrit directement au visiteur : c'est
         le geste que fera la personne qui traite la demande, autant qu'il
         tombe juste. */
      ...(replyTo ? { replyTo: { email: replyTo } } : {}),
    }),
  });

  return response.ok;
}

export const onRequestPost: (context: {
  request: Request;
  env: Env;
}) => Promise<Response> = async ({ request, env }) => {
  /**
   * ⚠️ PAS DE CLÉ, PAS D'ERREUR : 503 et un drapeau explicite.
   *
   * `submitLead` le traduit en « l'envoi n'est pas encore actif », le message
   * honnête que le site affiche déjà. Cela permet de DÉPLOYER cette fonction
   * avant que le compte Brevo n'existe, sans qu'un visiteur voie jamais un échec
   * : il lit la même phrase qu'aujourd'hui, et le jour où la clé arrive, tout se
   * met à fonctionner sans redéployer une ligne.
   */
  if (!env.BREVO_API_KEY || !env.LEAD_TO || !env.LEAD_FROM_EMAIL) {
    return json({ configured: false }, 503);
  }

  /* Même origine seulement. Ce n'est pas une serrure — un en-tête se forge —
     mais cela écarte les robots qui postent à l'aveugle sur tout ce qui
     ressemble à une API. */
  const origin = request.headers.get('origin');
  if (origin && new URL(request.url).origin !== origin) {
    return json({ ok: false }, 403);
  }

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return json({ ok: false }, 400);
  }

  const problems = validateLead(payload);
  if (problems.length > 0) {
    /* Les motifs partent dans les journaux, pas dans la réponse : détailler quel
       garde-fou a bloqué renseignerait surtout les robots. */
    console.warn('demande refusée', problems.join(','));
    return json({ ok: false }, 400);
  }

  const visitor = payload.fields.email.trim();

  /* ⚠️ L'ORDRE COMPTE. Le courriel de l'équipe est celui qui ne doit jamais se
     perdre : c'est lui, le lead. L'accusé de réception du visiteur est un
     confort — s'il échoue, la demande est quand même arrivée, et répondre en
     erreur ferait renvoyer le formulaire pour rien. */
  const delivered = await send(
    env,
    { email: env.LEAD_TO },
    teamEmail(payload),
    visitor,
  );

  if (!delivered) {
    console.error('Brevo a refusé le courriel de l’équipe');
    return json({ ok: false }, 502);
  }

  const receipt = visitorEmail(payload);
  if (receipt) {
    try {
      await send(env, { email: visitor, name: payload.fields.prenom }, receipt);
    } catch (error) {
      console.error('accusé de réception non parti', error);
    }
  }

  return json({ ok: true }, 200);
};
