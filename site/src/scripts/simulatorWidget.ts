import { getProgressIndex } from './carouselProgress';
import { collectPayback, renderPayback } from './paybackRender';
import { reportHref } from './reportParams';
import { chase, CHASE_DURATION } from './sliderCalculator';
import { formatEuro, formatNumber } from './format';
import { formatCo2 } from './co2';
import {
  applyRegionToLinks,
  isRegion,
  readStoredRegion,
  regionFromPostalCode,
  writeStoredRegion,
  type Region,
} from './regionLinks';
import {
  QUESTION_STEPS,
  REFINE_STEPS,
  RESULT_STEP,
  hasAnyAnswer,
  isRefineStep,
  isStepAnswered,
  progressLabel,
  stepFromSearch,
  stepToSearch,
  visibleQuestionSteps,
  type WizardKind,
} from './wizard';
import { REGION_DEFAULT, regionLabel } from './savings';
import {
  aidesLabel,
  outcomeProfile,
  roofType,
  simulate,
  type Range,
  type SimulatorInputs,
  type SimulatorResults,
} from './simulator';

/**
 * Le câblage du simulateur : le parcours, puis le repaint du résultat.
 *
 * ⚠️ Le CALCUL n'est pas ici (`simulator.ts`), et la LOGIQUE D'ÉTAPES non plus
 * (`wizard.ts`, pure et testée). Ce fichier ne fait que brancher l'un sur
 * l'autre et réécrire des nœuds déjà rendus au build.
 *
 * ⚠️ Le geste de swipe n'est PAS ici : il est en CSS (`scroll-snap`). Le script
 * ne fait que suivre le rail et le piloter aux boutons.
 */

/* Les réponses supposées tant que le visiteur n'a pas répondu. Elles ne servent
   qu'à faire tourner `simulate()` sur un formulaire incomplet : le résultat
   reste masqué jusqu'à la dernière question, et le panneau porte l'étiquette
   « exemple » jusqu'à la première vraie réponse. */
/* Au-delà, un défilement piloté est forcément terminé — ou n'a jamais eu lieu. */
const RAIL_HOLD = 600;

const FALLBACK = {
  property: 'maison',
  roof: 'inclinee',
  orientation: 'sud',
  consumptionMode: 'facture',
  bill: '100-200',
  tilt: 'inconnue',
  shading: 'aucun',
  heatPump: 'non',
  car: 'non',
} as const;

interface Wizard {
  kind: WizardKind;
  root: HTMLElement;
  rail: HTMLElement;
  steps: HTMLElement[];
  segments: HTMLAnchorElement[];
  count: HTMLElement;
  prev: HTMLElement;
  next: HTMLElement;
  /** ⚠️ Le libellé, pas la pilule : `next.textContent = …` effacerait la
      pastille flèche et le cadre de coupe qui porte le roulement au survol. */
  nextLabel: HTMLElement;
  finalLabel: string;
}

function collectWizard(root: ParentNode, kind: WizardKind): Wizard | null {
  const node = root.querySelector<HTMLElement>(`[data-wizard="${kind}"]`);
  const rail = node?.querySelector<HTMLElement>('[data-wizard-rail]');
  const count = node?.querySelector<HTMLElement>('[data-wizard-count]');
  const prev = node?.querySelector<HTMLElement>('[data-wizard-prev]');
  const next = node?.querySelector<HTMLElement>('[data-wizard-next]');
  const nextLabel = next?.querySelector<HTMLElement>('.btn__label-line');
  if (!node || !rail || !count || !prev || !next || !nextLabel) return null;

  return {
    kind,
    root: node,
    rail,
    steps: [...rail.querySelectorAll<HTMLElement>('[data-step]')],
    segments: [...node.querySelectorAll<HTMLAnchorElement>('[data-wizard-seg]')],
    count,
    prev,
    next,
    nextLabel,
    finalLabel: node.dataset.wizardFinal ?? 'Continuer',
  };
}

/**
 * La région retenue au chargement : le paramètre d'URL, puis le code postal de
 * l'amorce, puis le choix mémorisé dans le header. L'intention la plus récente
 * gagne.
 */
export function initialRegion(search: string, stored: Region | null): Region | null {
  const params = new URLSearchParams(search);
  const explicit = params.get('region');
  if (isRegion(explicit)) return explicit;
  const cp = params.get('cp');
  if (cp) {
    const detected = regionFromPostalCode(cp);
    if (detected) return detected;
  }
  return stored;
}

/* --------------------------------------------------------------- affichage */

/* Arrondi au demi-cent : une fourchette n'a pas la précision de l'euro. */
const r50 = (n: number) => Math.round(n / 50) * 50;
const euro = (r: Range) => `${formatEuro(r50(r.low))} – ${formatEuro(r50(r.high))}`;
const kwh = (r: Range) => `${formatNumber(r50(r.low))} – ${formatNumber(r50(r.high))} kWh`;
const kwc = (r: Range) =>
  `${r.low.toFixed(1).replace('.', ',')} – ${r.high.toFixed(1).replace('.', ',')} kWc`;

function texts(r: SimulatorResults): Record<string, string> {
  return {
    savings: `${euro(r.savings)} / an`,
    kwc: kwc(r.kwc),
    production: kwh(r.production),
    cost: euro(r.cost),
    /* Insécables : « 4 – 8 ans » doit rester d'un bloc, alors que « au-delà de
       25 ans » doit pouvoir se replier (voir `paybackLabel`). */
    roi: r.roi === null ? 'au-delà de 25 ans' : `${r.roi.low}\u00a0–\u00a0${r.roi.high}\u00a0ans`,
    co2: formatCo2(r.co2Kg),
  };
}

export function initSimulator(root: ParentNode = document): void {
  const form = root.querySelector<HTMLFormElement>('[data-sim-form]');
  const result = root.querySelector<HTMLElement>('[data-sim-result]');
  const decor = root.querySelector<HTMLElement>('[data-sim-view]');
  /* Les quatre variantes du bloc de conversion, rendues au build ; une seule
     est révélée. */
  const outcomes = [...root.querySelectorAll<HTMLElement>('[data-sim-outcome]')];
  const peakOut = root.querySelector<HTMLElement>('[data-sim-peak]');
  /* ⚠️ `querySelectorAll` : le discours de conversion est rendu DEUX fois — dans
     la carte de la grille et dans la barre flottante. Un `querySelector` n'en
     aurait mis à jour qu'un, et la barre serait restée sur le profil du build. */
  const ctas = [...root.querySelectorAll<HTMLElement>('[data-sim-cta], [data-sim-sticky]')];
  const ctaEtudes = [...root.querySelectorAll<HTMLElement>('[data-sim-cta-etude]')];
  const ctaContacts = [...root.querySelectorAll<HTMLElement>('[data-sim-cta-contact]')];
  const reportLinks = [...root.querySelectorAll<HTMLAnchorElement>('[data-sim-report-link]')];
  const status = root.querySelector<HTMLElement>('[data-sim-status]');
  const questions = collectWizard(root, 'questions');
  const refine = collectWizard(root, 'affinage');
  if (!form || !result || !status || !questions || !refine) return;

  /**
   * ⚠️ UNE LISTE par clé, pas un élément. Depuis que la ligne de tête reprend les
   * économies déjà présentes dans les tuiles, deux nœuds portent
   * `data-sim-out="savings"` — une `Map` d'éléments n'en aurait gardé qu'un, et
   * l'autre serait resté figé sur sa valeur d'exemple.
   */
  const outputs = new Map<string, HTMLElement[]>();
  for (const node of root.querySelectorAll<HTMLElement>('[data-sim-out]')) {
    const key = node.dataset.simOut;
    if (!key) continue;
    const list = outputs.get(key);
    if (list) list.push(node);
    else outputs.set(key, [node]);
  }
  const echoes = new Map<string, HTMLElement>();
  for (const node of root.querySelectorAll<HTMLElement>('[data-sim-echo]')) {
    if (node.dataset.simEcho) echoes.set(node.dataset.simEcho, node);
  }
  const example = root.querySelector<HTMLElement>('[data-sim-example]');
  const monthly = root.querySelector<HTMLElement>('[data-sim-monthly]');
  const aides = root.querySelector<HTMLElement>('[data-sim-aides]');
  const outOfScope = root.querySelector<HTMLElement>('[data-sim-outofscope]');
  const needsBill = root.querySelector<HTMLElement>('[data-sim-needsbill]');
  const title = result.querySelector<HTMLElement>('.result__title');
  const openRefine = root.querySelector<HTMLElement>('[data-sim-refine-open]');
  const editAnswers = root.querySelector<HTMLElement>('[data-sim-edit]');
  const help = root.querySelector<HTMLElement>('[data-sim-help]');

  /**
   * La timeline d'amortissement — brique du catalogue montée ici pour la seconde
   * fois. Elle se redessine à chaque mise à jour du résultat.
   */
  const payback = root.querySelector<HTMLElement>('[data-payback]');
  const chart = payback && collectPayback(payback);
  const helpBlocks = [...root.querySelectorAll<HTMLElement>('[data-help]')];
  const outOfScopeStep = root.querySelector<HTMLElement>('[data-sim-outofscope-step]');

  /**
   * LA BARRE FLOTTANTE — visible tant que l'action de la carte est hors écran.
   *
   * ⚠️ ELLE S'EFFACE DÈS QUE LE BOUTON EST VISIBLE. Deux fois la même action à
   * l'écran, c'est la concurrence de sorties qu'on a passé du temps à supprimer.
   *
   * ⚠️ UN OBSERVATEUR, PAS UN ÉCOUTEUR DE DÉFILEMENT. Un `scroll` se déclenche
   * des dizaines de fois par seconde et forcerait un recalcul de mise en page à
   * chaque appel ; `IntersectionObserver` ne réveille le fil principal qu'au
   * franchissement. Sur une page dont les Core Web Vitals conditionnent tout le
   * trafic, ce n'est pas un détail.
   *
   * ⚠️ Le CSS la garde en `display: none` sous 768px : retirer `hidden` ici ne
   * la fera jamais apparaître sur mobile, quoi qu'observe le navigateur.
   */
  /* ⚠️ L'ANCRE A DÉMÉNAGÉ. Elle visait `[data-sim-cta] .result__actions` — le
     bouton quand il vivait dans la carte de conversion. Il est depuis remonté
     dans le verdict, et ce sélecteur ne trouvait plus rien : l'observateur ne
     s'installait tout simplement pas, sans que rien ne le signale. */
  const loader = root.querySelector<HTMLElement>('[data-sim-loader]');
  const floats = [...root.querySelectorAll<HTMLElement>('[data-sim-sticky], [data-sim-dock]')];
  const ctaAnchor = root.querySelector<HTMLElement>('.result__verdict .result__actions');
  const footer = document.querySelector('.footer');

  if (floats.length && ctaAnchor && 'IntersectionObserver' in window) {
    /**
     * DEUX CONDITIONS, PAS UNE.
     *
     * ⚠️ La barre ne s'affiche que si le bouton est hors champ **ET** que le
     * pied de page ne l'est pas. Sans la seconde, elle continuait par-dessus le
     * footer : son verre est un blanc translucide, et `design.md` prévient qu'il
     * ne signe la surface que sur un fond clair ou une photo. Composé sur le
     * footer sombre, il donnait un voile grisâtre sale.
     *
     * Augmenter l'opacité aurait masqué le symptôme sans traiter la cause : la
     * barre appartient au compte rendu, elle n'a rien à rappeler une fois qu'on
     * l'a dépassé.
     */
    let ctaOffscreen = false;
    let footerVisible = false;
    const sync = () => {
      const show = ctaOffscreen && !footerVisible;
      /* ⚠️ UN ATTRIBUT, PAS `hidden`. `hidden` pose `display: none`, qui coupe
         toute transition : la barre apparaissait d'un coup. Le CSS masque par
         `visibility`, qui s'anime et retire quand même l'élément du clavier et
         du lecteur d'écran. */
      for (const node of floats) node.toggleAttribute('data-shown', show);
    };

    new IntersectionObserver(
      ([entry]) => {
        ctaOffscreen = !entry.isIntersecting;
        sync();
      },
      /* Une marge basse égale à la hauteur de la barre : sans elle, la barre
         recouvre le bouton au moment précis où il entre à l'écran, et les deux
         clignotent l'un sur l'autre. */
      { rootMargin: '0px 0px -120px 0px' },
    ).observe(ctaAnchor);

    if (footer) {
      new IntersectionObserver(
        ([entry]) => {
          footerVisible = entry.isIntersecting;
          sync();
        },
        /* La barre s'efface un peu AVANT que le footer n'affleure : elle glisse
           vers le bas pendant que le fond sombre monte, au lieu de disparaître
           une fois posée dessus. */
        { rootMargin: '0px 0px 80px 0px' },
      ).observe(footer);
    }
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const regionEcho = root.querySelector<HTMLElement>('[data-sim-region-echo]');

  /**
   * ⚠️ La région n'est plus une CONSTANTE posée au chargement.
   *
   * Elle vient d'abord du contexte (code postal du hero, `?region=` d'un
   * méga-menu, choix mémorisé). Si rien de tout cela n'existe, le parcours pose
   * la question — et la réponse doit alors pouvoir changer la région en cours de
   * route. Un `?? 'wallonie'` figé donnait au visiteur bruxellois un « au-delà
   * de 25 ans » là où sa vraie réponse est « 4 à 8 ans ».
   */
  const contextRegion = initialRegion(window.location.search, readStoredRegion());
  const regionKnown = contextRegion !== null;
  let region: Region = contextRegion ?? REGION_DEFAULT;

  /** Les questions réellement posées : six sans région connue, cinq sinon. */
  const questionSteps = visibleQuestionSteps(regionKnown);

  let step = stepFromSearch(window.location.search) ?? questionSteps[0].id;

  /**
   * Le visiteur a-t-il répondu quoi que ce soit ?
   *
   * ⚠️ LU DANS LE FORMULAIRE, jamais mémorisé dans un drapeau. Un drapeau
   * mettait l'étiquette « exemple » à faux dès qu'on atteignait le résultat —
   * y compris en arrivant droit sur `?etape=resultat` sans avoir rien répondu,
   * où le panneau se serait alors présenté comme « votre » estimation.
   */
  const hasAnswers = () => hasAnyAnswer(answers());

  /* ------------------------------------------------------------- le calcul */

  const read = (): SimulatorInputs => {
    const data = new FormData(form);
    const str = (key: keyof typeof FALLBACK) => String(data.get(key) ?? FALLBACK[key]);
    const num = (key: string, fallback: number) => {
      const value = Number(data.get(key));
      return Number.isFinite(value) ? value : fallback;
    };
    return {
      region,
      property: str('property'),
      roof: str('roof'),
      orientation: str('orientation'),
      area: num('area', 40),
      consumptionMode: str('consumptionMode'),
      bill: str('bill'),
      consumption: num('consumption', 3800),
      /* L'affinage n'entre dans le calcul qu'une fois traversé : sinon le
         résultat se resserrerait sans que le visiteur ait rien répondu. */
      refine: refineVisited
        ? {
            tilt: str('tilt'),
            shading: str('shading'),
            heatPump: str('heatPump'),
            car: str('car'),
            battery: data.get('battery') !== null,
          }
        : undefined,
    };
  };

  let refineVisited = false;
  let current = simulate(read());
  let from = current;
  let start = 0;
  let raf = 0;

  /**
   * Redessine la timeline pour le projet en cours.
   *
   * ⚠️ MÊMES OPTIONS que `simulate()` — région, taux d'autoconsommation et
   * production réelle. Sans cela le graphe raconterait un autre amortissement
   * que la fourchette écrite juste à côté, et la brique unique n'aurait servi à
   * rien.
   *
   * ⚠️ Le TRACÉ est indicatif, le TEXTE porte la fourchette. La courbe se
   * dessine sur l'estimation ponctuelle ; la lecture chiffrée reçoit « 4 – 8
   * ans », conformément au parti pris des résultats en fourchettes.
   */
  const drawPayback = () => {
    if (!chart) return;
    const mid = (r: Range) => (r.low + r.high) / 2;
    renderPayback(
      chart,
      mid(current.kwc),
      { region, rate: current.rate, production: mid(current.production) },
      texts(current).roi,
    );
  };

  const paint = () => {
    const values = texts(current);
    for (const [key, nodes] of outputs) {
      if (values[key] === undefined) continue;
      for (const node of nodes) node.textContent = values[key];
    }

    if (monthly) {
      const peak = Math.max(...current.monthly);
      monthly.querySelectorAll<HTMLElement>('[data-sim-bar]').forEach((bar, i) => {
        const value = current.monthly[i] ?? 0;
        bar.style.setProperty('--bar', `${peak > 0 ? (value / peak) * 100 : 0}%`);
      });
      /* Le repère haut borne la lecture des barres : il suit le projet, sinon
         il annoncerait l'échelle du cas médian du build. Arrondi à la dizaine —
         la précision réelle du modèle ne justifie pas mieux. */
      if (peakOut) peakOut.textContent = formatNumber(Math.round(peak / 10) * 10);
    }

    /* ⚠️ UNE SEULE SORTIE VISIBLE. Le profil décide de l'offre : pousser une
       étude à quelqu'un dont l'installation ne s'amortit pas sur 25 ans est
       inefficace, et contraire au positionnement du site. */
    /* ⚠️ LE LIEN VERS LE RAPPORT EMPORTE LES RÉPONSES. Sans elles, `/rapport`
       promet « votre estimation par e-mail » sans savoir de quelle estimation il
       parle — le document n'était pas fabricable. */
    for (const link of reportLinks) link.setAttribute('href', reportHref('/rapport', read()));

    /* ⚠️ UNE SEULE SORTIE VISIBLE. Le profil décide de l'offre : pousser une
       étude à quelqu'un dont l'installation ne s'amortit pas est inefficace, et
       contraire au positionnement du site. */
    const profile = outcomeProfile(current);
    for (const node of outcomes) node.hidden = node.dataset.simOutcome !== profile;

    /* ⚠️ LE LIME NE PORTE JAMAIS UNE MAUVAISE NOUVELLE. La carte de conversion
       perd son accent quand le verdict est défavorable — même raisonnement que
       la tuile « Amortissement » juste au-dessus. */
    const warm = profile === 'chaud' || profile === 'tiede';
    for (const node of ctas) node.dataset.tone = warm ? 'lime' : 'neutre';
    for (const node of ctaEtudes) node.hidden = !warm;
    for (const node of ctaContacts) node.hidden = warm;

    const inputs = read();
    echoes.get('area')?.replaceChildren(`${inputs.area} m²`);
    echoes.get('consumption')?.replaceChildren(`${formatNumber(inputs.consumption)} kWh`);

    if (aides) aides.textContent = aidesLabel(region);

    if (chart) drawPayback();
    /* L'exemple nomme la région qu'il suppose : sans cela, il annoncerait la
       Wallonie tout en affichant des chiffres bruxellois. */
    const exampleRegion = example?.querySelector('[data-sim-example-region]');
    if (exampleRegion) exampleRegion.textContent = regionLabel(region);
    if (example) example.hidden = hasAnswers();
    if (outOfScope) outOfScope.hidden = !current.outOfScope;
    if (needsBill) needsBill.hidden = !current.needsBill;

    /* Les sous-champs de consommation suivent le mode choisi — tous masqués tant
       qu'aucun mode n'est coché. */
    const mode = new FormData(form).get('consumptionMode');
    for (const node of form.querySelectorAll<HTMLElement>('[data-sim-mode]')) {
      node.hidden = node.dataset.simMode !== mode;
    }
  };

  const frame = (now: number) => {
    const progress = Math.min((now - start) / CHASE_DURATION, 1);
    const target = simulate(read());
    const band = (a: Range, b: Range): Range => ({
      low: chase(a.low, b.low, progress),
      high: chase(a.high, b.high, progress),
    });
    current = {
      ...target,
      kwc: band(from.kwc, target.kwc),
      production: band(from.production, target.production),
      savings: band(from.savings, target.savings),
      cost: band(from.cost, target.cost),
      co2Kg: chase(from.co2Kg, target.co2Kg, progress),
      monthly: target.monthly.map((m, i) => chase(from.monthly[i] ?? m, m, progress)),
    };
    paint();
    raf = progress < 1 ? requestAnimationFrame(frame) : 0;
  };

  const recompute = (animate: boolean) => {
    const target = simulate(read());
    if (!animate || reduced.matches) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      current = target;
      paint();
      return;
    }
    from = current;
    start = performance.now();
    if (!raf) raf = requestAnimationFrame(frame);
  };

  /* ------------------------------------------------------------ le parcours */

  const answers = () => {
    const data = new FormData(form);
    return (name: string) => {
      const value = data.get(name);
      return value === null ? null : String(value);
    };
  };

  /** Les étapes réellement présentes dans un rail — l'affinage en cache une. */
  const liveSteps = (w: Wizard) => w.steps.filter((node) => !node.hidden);

  /**
   * L'affinage saute l'inclinaison sur un toit plat : la question ferait doublon
   * avec la réponse de l'étape 2, et le compteur doit dire « sur 4 ».
   */
  /**
   * L'étape « code postal » ne vit que si la région est inconnue. Même mécanique
   * que l'inclinaison sur toit plat : on masque la `<li>` ET son segment, pour
   * que le compteur et la barre disent la vérité.
   */
  const syncRegionStep = () => {
    for (const node of questions.steps) {
      if (node.dataset.step === '0') node.hidden = regionKnown;
    }
    for (const seg of questions.segments) {
      if (seg.dataset.wizardSeg === '0') seg.closest('li')?.toggleAttribute('hidden', regionKnown);
    }
  };

  /**
   * Le code postal saisi devient LA région — et on l'écrit dans le stockage :
   * le sélecteur du header cessera d'afficher « Wallonie » alors que le visiteur
   * vient de taper 1000, et les rampes des autres pages porteront la bonne.
   */
  const syncRegionFromForm = () => {
    if (regionKnown) return;
    const detected = regionFromPostalCode(String(new FormData(form).get('cp') ?? ''));
    if (detected) {
      region = detected;
      writeStoredRegion(detected);
      applyRegionToLinks(document, detected);
      for (const select of document.querySelectorAll<HTMLSelectElement>('[data-region-select]')) {
        select.value = detected;
      }
    }
    if (regionEcho) {
      regionEcho.textContent = detected
        ? `${regionLabel(detected)} — les aides et le tarif d’injection y sont propres à cette région.`
        : 'Les aides et le tarif d’injection changent du tout au tout selon la région.';
    }
  };

  const syncRefineSteps = () => {
    const tilted = roofType(read().roof).tilted;
    for (const node of refine.steps) {
      if (node.dataset.step === 'a1') node.hidden = !tilted;
    }
    for (const seg of refine.segments) {
      if (seg.dataset.wizardSeg === 'a1') seg.closest('li')?.toggleAttribute('hidden', !tilted);
    }
  };

  const wizardOf = (id: string) => (isRefineStep(id) ? refine : questions);

  /**
   * Vrai pendant un défilement que NOUS avons déclenché.
   *
   * ⚠️ IL DOIT SE RELÂCHER SEUL. Le drapeau était levé par `scrollTo` et
   * rabaissé par l'évènement de défilement qui suit — sauf qu'un `scrollTo`
   * n'en produit AUCUN quand le rail est déjà en place, ou quand le défilement
   * doux ne s'exécute pas. Le drapeau restait alors levé pour de bon et le
   * suivi du rail était mort pour le reste de la session : le swipe cessait de
   * mettre le compteur à jour, sans rien signaler. D'où le « ça remarche, puis
   * ça rebloque ». Le minuteur garantit qu'il retombe dans tous les cas.
   */
  let programmatic = false;
  let release = 0;
  const holdRail = () => {
    programmatic = true;
    clearTimeout(release);
    release = window.setTimeout(() => {
      programmatic = false;
    }, RAIL_HOLD);
  };

  /**
   * ⚠️ Renvoie `-1` quand l'étape n'appartient pas à ce rail, au lieu de la
   * ramener à 0. Un `Math.max(0, …)` faisait passer un désaccord d'état pour
   * « on est au début » : la barre, le compteur et `inert` se calaient alors sur
   * une étape qui n'était pas celle affichée.
   */
  const indexOf = (w: Wizard, id: string) =>
    liveSteps(w).findIndex((node) => node.dataset.step === id);

  /**
   * ⚠️ `behavior` explicite, jamais laissé au CSS. Le rail porte
   * `scroll-behavior: smooth` pour que les boutons fassent glisser la question
   * suivante — mais au CHARGEMENT et au retour navigateur, cette animation
   * partirait de la première étape et serait encore en cours quand la page se
   * montre : on verrait un rail décalé entre deux questions. Un saut instantané
   * est le seul état juste dans ces deux cas.
   *
   * ⚠️ Et ce saut s'écrit `'instant'`, PAS `'auto'` : par spécification, `'auto'`
   * signifie « suis la propriété CSS `scroll-behavior` » — donc `smooth` ici.
   * Écrit `'auto'`, le rail s'animait quand même et se figeait entre deux
   * questions au chargement.
   */
  const scrollTo = (w: Wizard, index: number, behavior: ScrollBehavior) => {
    const steps = liveSteps(w);
    const target = steps[index];
    if (!target) return;
    /* Le suivi du rail doit se taire pendant qu'on le pilote : sinon il conclut
       d'une position intermédiaire qu'on a changé d'étape. */
    holdRail();
    w.rail.scrollTo({ left: target.offsetLeft - steps[0].offsetLeft, behavior });
  };

  /**
   * Met le rail au diapason de l'étape courante : compteur, barre, navigation,
   * et surtout `inert` sur ce qui n'est pas à l'écran.
   *
   * ⚠️ `inert` n'est pas cosmétique : sans lui, la tabulation atteint un champ
   * hors cadre et le navigateur fait sauter le rail pour l'amener en vue. Sans
   * JavaScript, rien n'est inerte — et c'est cohérent, puisque tout est alors
   * atteignable en faisant défiler.
   */
  const syncWizard = (w: Wizard, id: string) => {
    const steps = liveSteps(w);
    const index = indexOf(w, id);
    if (index < 0) return;
    const total = steps.length;
    const get = answers();

    steps.forEach((node, i) => {
      node.toggleAttribute('inert', i !== index);
      node.setAttribute('aria-hidden', String(i !== index));
      /* ⚠️ Le rang de la ligne de tête se RECALCULE : une étape conditionnelle
         qui disparaît — le code postal quand la région est connue, l'inclinaison
         sur un toit plat — décale toutes celles qui la suivent. Rendu au build
         puis figé, « 4/6 » resterait affiché sur une cinquième et dernière
         question. */
      node.querySelector('[data-step-index]')?.replaceChildren(String(i + 1));
      node.querySelector('[data-step-total]')?.replaceChildren(String(total));
    });

    w.count.textContent = progressLabel(index, total, w.kind);

    const visibleSegs = w.segments.filter((seg) => !seg.closest('li')?.hidden);
    visibleSegs.forEach((seg, i) => {
      seg.toggleAttribute('data-done', i < index);
      if (i === index) seg.setAttribute('aria-current', 'step');
      else seg.removeAttribute('aria-current');
      /* On revient sur ses pas, on ne saute pas les questions à venir. */
      seg.setAttribute('aria-disabled', String(i > index));
    });

    w.prev.hidden = index === 0;
    const prevId = steps[index - 1]?.dataset.step;
    if (prevId) w.prev.setAttribute('href', `#etape-${prevId}`);

    const last = index === total - 1;
    const nextId = steps[index + 1]?.dataset.step;

    /**
     * ⚠️ COURT-CIRCUIT DU PROFIL PROFESSIONNEL. `POWER_MIN`/`POWER_MAX` bornent
     * le modèle au résidentiel : produire un chiffre ici serait produire un faux
     * chiffre. `simulateur.md` pose la règle — filtrer tôt vaut mieux que faire
     * répondre à quatre questions pour conclure que rien ne s'applique.
     * Le bouton cesse alors d'être une étape et devient une sortie vers l'équipe.
     */
    const exit = w.kind === 'questions' && get('property') === 'professionnel';
    if (outOfScopeStep) outOfScopeStep.hidden = !exit;

    w.next.toggleAttribute('data-exit', exit);
    w.nextLabel.textContent = exit ? 'Parlons-en directement' : last ? w.finalLabel : 'Suivant';
    w.next.setAttribute('href', exit ? '/contact' : last ? '#resultat-titre' : `#etape-${nextId}`);
    w.next.setAttribute('aria-disabled', String(!exit && !isStepAnswered(id, get)));
  };

  /* `push` distingue une navigation VOULUE (bouton, segment) d'une remise en
     place (chargement, retour navigateur) : c'est aussi ce qui décide du
     glissement animé ou du saut instantané. */
  const show = (next: string, push: boolean) => {
    step = next;
    syncRegionStep();
    syncRefineSteps();

    /**
     * ⚠️ L'ÉTAPE VISÉE PEUT NE PLUS EXISTER, et il faut alors se rabattre sur la
     * première du parcours.
     *
     * Les deux étapes conditionnelles rendent ce cas ordinaire : ouvrir
     * l'affinage vise `a1` (l'inclinaison), qui est justement masquée quand le
     * toit est plat. On atterrissait sur une étape absente, `syncWizard`
     * renonçait, et le compteur restait figé sur « Affinage 1 sur 5 » là où il
     * n'y a que quatre questions. Même mécanique pour `?etape=0` quand la région
     * est déjà connue.
     */
    if (step !== RESULT_STEP) {
      const w = wizardOf(step);
      if (indexOf(w, step) < 0) step = liveSteps(w)[0]?.dataset.step ?? step;
    }

    /* Toute navigation annule un chargement en cours : retour navigateur, lien
       d'étape, « Modifier mes réponses »… Sans cela le timer survivrait au
       changement de vue. */
    stopLoader();

    const onResult = step === RESULT_STEP;
    const inRefine = isRefineStep(step);

    /* Le décor de la page suit la vue : photo et verre pour les questions, fond
       uni pour le compte rendu (voir le commentaire dans `SimulatorPanels`). */
    if (decor) decor.dataset.simView = onResult ? 'resultat' : 'questions';

    questions.root.hidden = onResult || inRefine;
    refine.root.hidden = onResult || !inRefine;
    result.hidden = !onResult;
    if (editAnswers) editAnswers.hidden = !onResult;

    /* L'aide suit l'étape, et disparaît au résultat : là, il n'y a plus de
       question à éclairer. */
    if (help) help.hidden = onResult;
    for (const block of helpBlocks) block.hidden = block.dataset.help !== step;

    if (!onResult) {
      const w = wizardOf(step);
      syncWizard(w, step);
      scrollTo(w, indexOf(w, step), push && !reduced.matches ? 'smooth' : 'instant');
    }

    if (push) {
      window.history.pushState({ step }, '', stepToSearch(step, window.location.search) || '.');
    }

    if (onResult) {
      recompute(refineVisited);
      const t = texts(simulate(read()));
      status.textContent =
        `Votre estimation : ${t.kwc}, ${t.production} par an, ${t.savings} d'économies, retour ${t.roi}.`;
      /* Le focus va au titre : sans lui, un lecteur d'écran resterait sur un
         bouton qui vient de disparaître. */
      title?.focus({ preventScroll: true });
      result.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
    } else {
      status.textContent = progressLabel(indexOf(wizardOf(step), step), liveSteps(wizardOf(step)).length, wizardOf(step).kind);
    }
  };

  /**
   * L'ÉCRAN DE CALCUL — la mise en scène qui précède le compte rendu.
   *
   * ⚠️ L'ATTENTE EST FABRIQUÉE. L'estimation est calculée instantanément ; cet
   * écran existe pour que le résultat ne surgisse pas sans transition. Les
   * étapes qu'il affiche nomment en revanche de vraies opérations du modèle.
   *
   * ⚠️ LA DURÉE VIENT DU CSS, pas d'une constante d'ici. Recopiée, elle
   * finirait par diverger de l'animation : le résultat s'afficherait avant que
   * les points aient fini leur tour, ou après un blanc.
   *
   * ⚠️ LE TIMER EST ANNULABLE, et c'est indispensable. Sans cela, un retour
   * navigateur pendant les quatre secondes laissait le `setTimeout` courir : il
   * affichait ensuite le compte rendu par-dessus la page où le visiteur venait
   * de revenir.
   */
  let loaderTimer: number | undefined;

  const stopLoader = () => {
    if (loaderTimer !== undefined) {
      window.clearTimeout(loaderTimer);
      loaderTimer = undefined;
    }
    if (loader) loader.hidden = true;
  };

  const runLoader = (then: () => void) => {
    if (!loader) return then();

    /* Les questions s'effacent, l'écran prend leur place. Le compte rendu reste
       masqué : c'est `show()` qui le révélera, une fois le temps écoulé. */
    questions.root.hidden = true;
    refine.root.hidden = true;
    if (help) help.hidden = true;
    /* Le décor s'efface dès le chargement : la photo et le verre appartiennent
       aux questions. Sans cela l'écran de calcul se jouait sur le paysage, et le
       fond basculait brutalement au blanc à l'apparition du compte rendu. */
    if (decor) decor.dataset.simView = 'chargement';
    loader.hidden = false;

    /* ⚠️ REMONTER EN HAUT. La page reste là où le visiteur l'avait laissée — au
       bas du compte rendu précédent, par exemple : l'écran de calcul s'affichait
       hors champ et on regardait le pied de page pendant quatre secondes. */
    loader.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'center' });

    /* ⚠️ L'animation se réamorce d'elle-même. Les `@keyframes` démarrent quand
       l'élément entre dans le rendu : le passage de `display: none` à `flex` que
       `hidden` vient d'opérer suffit. Une remise à zéro manuelle (retrait puis
       ajout d'une classe avec `offsetWidth`) serait du bruit — et c'est vérifié
       au navigateur, pas supposé. */
    status.textContent = 'Calcul de votre estimation en cours.';

    const ms =
      Number.parseFloat(getComputedStyle(loader).getPropertyValue('--duration-loader')) || 4500;
    loaderTimer = window.setTimeout(() => {
      loaderTimer = undefined;
      loader.hidden = true;
      then();
    }, ms);
  };

  /* -------------------------------------------------------------- branchement */

  /**
   * Le rail défile aussi au doigt : on suit sa position pour recaler compteur et
   * barre. L'historique, lui, n'est écrit qu'une fois l'étape POSÉE — pousser à
   * chaque `scroll` empilerait trente entrées par swipe et rendrait le bouton
   * retour inutilisable.
   */
  const followRail = (w: Wizard) => {
    let settle = 0;
    const settled = () => {
      /**
       * ⚠️ TROIS GARDES, chacune pour un désaccord d'état déjà observé :
       *
       * — un rail masqué a une largeur nulle, `getProgressIndex` y renvoie donc
       *   toujours 0, et le moindre évènement de défilement y réécrivait l'étape
       *   courante en « a1 » alors que le visiteur en était à la question 2 ;
       * — un rail dont l'étape courante n'est pas issue n'a rien à dire ;
       * — pendant un défilement que nous pilotons, toute position intermédiaire
       *   est un état de passage, pas une décision du visiteur.
       */
      if (w.root.hidden || programmatic) return;
      if (indexOf(w, step) < 0) return;

      const steps = liveSteps(w);
      const index = getProgressIndex(w.rail.scrollLeft, w.rail.scrollWidth, w.rail.clientWidth, steps.length);
      const id = steps[index]?.dataset.step;
      if (!id || id === step) return;
      step = id;
      syncWizard(w, id);
      window.history.replaceState({ step }, '', stepToSearch(step, window.location.search));
    };

    const done = () => {
      clearTimeout(release);
      programmatic = false;
      settled();
    };

    w.rail.addEventListener('scroll', () => {
      /* `scrollend` n'existe pas partout : on garde le minuteur en repli, et on
         l'annule quand l'évènement natif arrive. */
      clearTimeout(settle);
      settle = window.setTimeout(done, 160);
    });
    w.rail.addEventListener('scrollend', () => {
      clearTimeout(settle);
      done();
    });
  };

  followRail(questions);
  followRail(refine);

  /**
   * ⚠️ `preventDefault()` D'ABORD, TOUJOURS — même quand on ne sait pas où aller.
   *
   * « Suivant » est un lien d'ancre (`#etape-3`) pour rester utilisable sans
   * JavaScript. Laisser passer son comportement natif, ne serait-ce qu'une fois,
   * déclenche un saut de fragment : le navigateur remonte alors TOUS les
   * ancêtres défilables pour amener la cible en vue, et comme l'étape se trouve
   * à 1 400 px dans un rail horizontal, c'est LA PAGE ENTIÈRE qui part sur le
   * côté — en-tête coupé, question hors champ, écran qui paraît blanc.
   *
   * L'ancien code sortait sans rien empêcher quand la destination était
   * introuvable, c'est-à-dire exactement dans les cas cassés.
   */
  const navigate = (event: Event, target: string | undefined) => {
    event.preventDefault();
    if (target) show(target, true);
  };

  for (const w of [questions, refine]) {
    w.next.addEventListener('click', (event) => {
      if (w.next.getAttribute('aria-disabled') === 'true') {
        event.preventDefault();
        return;
      }
      /* Sortie vers `/contact` : on laisse le lien faire son travail. */
      if (w.next.hasAttribute('data-exit')) return;
      const steps = liveSteps(w);
      const index = indexOf(w, step);
      const target = index === steps.length - 1 ? RESULT_STEP : steps[index + 1]?.dataset.step;

      /* ⚠️ L'ÉCRAN NE S'INTERPOSE QUE SUR CE GESTE-LÀ : le dernier bouton du
         parcours de QUESTIONS. Le brancher dans `show()` l'aurait déclenché
         aussi sur une URL `?etape=resultat`, sur un retour navigateur, et sur
         « Mettre à jour mon estimation » — or l'affinage doit rester léger et
         répétable, c'est le seul levier capable de retourner un mauvais
         verdict. */
      if (target === RESULT_STEP && w.kind === 'questions') {
        event.preventDefault();
        runLoader(() => show(RESULT_STEP, true));
        return;
      }

      navigate(event, target);
      /* `index` vaut -1 si l'état a dérivé : `navigate` a déjà neutralisé le
         saut d'ancre, on remet simplement le rail sur ses pieds. */
      if (index < 0) show(steps[0].dataset.step!, true);
    });

    w.prev.addEventListener('click', (event) => {
      navigate(event, liveSteps(w)[indexOf(w, step) - 1]?.dataset.step);
    });

    for (const seg of w.segments) {
      seg.addEventListener('click', (event) => {
        if (seg.getAttribute('aria-disabled') === 'true') {
          event.preventDefault();
          return;
        }
        navigate(event, seg.dataset.wizardSeg);
      });
    }
  }

  openRefine?.addEventListener('click', () => {
    refineVisited = true;
    show(REFINE_STEPS[0].id, true);
  });

  editAnswers?.addEventListener('click', () => show(QUESTION_STEPS[0].id, true));

  form.addEventListener('change', () => {
    syncRegionFromForm();
    recompute(false);
    /* ⚠️ Répondre « toit plat » à l'étape 2 retire une étape à l'AFFINAGE : sans
       cette resynchronisation, son compteur annonçait encore « sur 5 » et une
       question condamnée restait dans le rail. */
    syncRefineSteps();
    syncWizard(wizardOf(step), step);
  });
  /* Le code postal se valide À LA FRAPPE : `change` n'arrive qu'à la perte de
     focus, et « Suivant » serait resté verrouillé le doigt encore sur le clavier. */
  form.addEventListener('input', () => {
    syncRegionFromForm();
    recompute(false);
    syncWizard(wizardOf(step), step);
  });

  window.addEventListener('popstate', () => show(stepFromSearch(window.location.search), false));

  /**
   * Un pont contextualisé (`/simulateur?orientation=sud`) a déjà posé une
   * réponse : on la coche, sinon on la redemanderait à quelqu'un qui vient
   * justement de la donner.
   */
  const params = new URLSearchParams(window.location.search);
  for (const [name, value] of params) {
    const field = form.querySelector<HTMLInputElement>(
      `input[name="${CSS.escape(name)}"][value="${CSS.escape(value)}"]`,
    );
    if (field) field.checked = true;
  }

  recompute(false);
  show(step, false);
  /* Une seconde mise en place après la première image : au chargement, les
     polices et l'image du logo n'ont pas fini de se poser, et le rail avait été
     mesuré sur une largeur qui n'est plus la bonne. */
  requestAnimationFrame(() => {
    if (step === RESULT_STEP) return;
    const w = wizardOf(step);
    scrollTo(w, indexOf(w, step), 'instant');
  });
}
