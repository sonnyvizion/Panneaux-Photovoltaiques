import { collectPayback, renderPayback } from './paybackRender';
import { fromReportSearch } from './reportParams';
import { answerSummary } from './reportSummary';
import { formatCo2 } from './co2';
import { formatEuro, formatNumber } from './format';
import { aidesLabel, simulate, type Range, type SimulatorResults } from './simulator';
import { regionLabel } from './savings';
import { formatPower } from './powerEstimate';

/**
 * Le rapport, peint à partir des réponses transportées dans l'URL.
 *
 * ⚠️ IL RÉÉCRIT DES NŒUDS, IL N'EN CONSTRUIT PAS — sauf la liste des réponses,
 * dont le nombre de lignes dépend de l'affinage. C'est la doctrine du projet :
 * le HTML porte un cas médian lisible, le script le remplace. Rien ne clignote,
 * et le document reste sensé si le script ne tourne pas.
 *
 * ⚠️ LES MÊMES FORMATEURS QUE L'ÉCRAN. Ils sont recopiés d'un composant à
 * l'autre depuis le début du projet ; les faire diverger ici produirait un
 * document qui arrondit autrement que la page que le visiteur vient de lire.
 * C'est le genre d'écart qu'on ne voit jamais à l'œil.
 *
 * ⚠️ UN SIGNAL DE FIN. `data-report-ready` est posé sur `<html>` quand tout est
 * peint : un moteur de rendu PDF doit savoir quand la page est prête, sinon il
 * imprime le cas médian du build. C'est le contrat entre cette page et ce qui
 * l'imprimera — quel que soit l'outil retenu.
 */

const r50 = (v: number) => Math.round(v / 50) * 50;
const euro = (r: Range) => `${formatEuro(r50(r.low))} – ${formatEuro(r50(r.high))}`;
const kwh = (r: Range) => `${formatNumber(r50(r.low))} – ${formatNumber(r50(r.high))} kWh`;
const kwc = (r: Range) =>
  `${r.low.toFixed(1).replace('.', ',')} – ${r.high.toFixed(1).replace('.', ',')} kWc`;
const roiText = (r: SimulatorResults) =>
  r.roi === null ? 'au-delà de 25 ans' : `${r.roi.low} – ${r.roi.high} ans`;

export function initReportDocument(root: ParentNode = document): void {
  const doc = root.querySelector<HTMLElement>('[data-report]');
  if (!doc) return;

  const search = typeof window === 'undefined' ? '' : window.location.search;
  const inputs = fromReportSearch(search);
  const results = simulate(inputs);

  /* --- Les chiffres --- */
  const values: Record<string, string> = {
    savings: `${euro(results.savings)} / an`,
    kwc: kwc(results.kwc),
    production: kwh(results.production),
    cost: euro(results.cost),
    co2: formatCo2(results.co2Kg),
  };
  for (const node of doc.querySelectorAll<HTMLElement>('[data-report-out]')) {
    const value = values[node.dataset.reportOut ?? ''];
    if (value !== undefined) node.textContent = value;
  }

  /* --- L'en-tête --- */
  const date = doc.querySelector<HTMLTimeElement>('[data-report-date]');
  if (date) {
    const now = new Date();
    date.dateTime = now.toISOString().slice(0, 10);
    date.textContent = now.toLocaleDateString('fr-BE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  const region = doc.querySelector<HTMLElement>('[data-report-region]');
  if (region) region.textContent = regionLabel(inputs.region);

  const aides = doc.querySelector<HTMLElement>('[data-report-aides]');
  if (aides) aides.textContent = aidesLabel(inputs.region);

  /* --- La courbe : même fonction que le compte rendu, donc même dessin --- */
  const payback = doc.querySelector<HTMLElement>('[data-payback]');
  if (payback) {
    const mid = (r: Range) => (r.low + r.high) / 2;
    renderPayback(
      collectPayback(payback),
      mid(results.kwc),
      { region: inputs.region, rate: results.rate, production: mid(results.production) },
      roiText(results),
    );
  }

  /* --- Les barres mensuelles --- */
  const peak = Math.max(...results.monthly);
  doc.querySelectorAll<HTMLElement>('[data-report-bar]').forEach((bar, index) => {
    const value = results.monthly[index] ?? 0;
    bar.style.setProperty('--bar', `${peak > 0 ? (value / peak) * 100 : 0}%`);
  });
  const peakNode = doc.querySelector<HTMLElement>('[data-report-peak]');
  if (peakNode) peakNode.textContent = formatNumber(Math.round(peak / 10) * 10);
  /* Le scénario que les barres dessinent, nommé sous le graphe — sinon elles se
     lisent comme la borne haute des fourchettes annoncées ailleurs. */
  const basisNode = doc.querySelector<HTMLElement>('[data-report-basis]');
  if (basisNode) basisNode.textContent = formatPower(results.kwcTypical);

  /* --- Le taux d'autoconsommation réellement retenu --- */
  const rate = doc.querySelector<HTMLElement>('[data-report-rate]');
  if (rate) rate.textContent = `${Math.round(results.rate * 100)} %`;

  /* --- Les réponses. Toutes les lignes existent déjà dans le HTML : on remplit
         celles qui s'appliquent et on masque les autres. Les construire ici
         aurait donné des nœuds sans l'attribut de portée d'Astro, donc sans
         style, et une page vide sans JavaScript. --- */
  const given = new Map(answerSummary(inputs).map(({ label, value }) => [label, value]));
  for (const row of doc.querySelectorAll<HTMLElement>('[data-report-answer]')) {
    const value = given.get(row.dataset.reportAnswer ?? '');
    row.hidden = value === undefined;
    const dd = row.querySelector('dd');
    if (dd && value !== undefined) dd.textContent = value;
  }

  document.documentElement.dataset.reportReady = 'true';
}
