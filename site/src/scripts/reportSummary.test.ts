import { describe, expect, it } from 'vitest';
import { ANSWER_LABELS, answerSummary, consumptionAnswer } from './reportSummary';
import { REFINE_DEFAULT, type SimulatorInputs } from './simulator';
import { ORIENTATIONS } from './orientation';

const BASE: SimulatorInputs = {
  region: 'wallonie',
  property: 'maison',
  roof: 'inclinee',
  orientation: 'sud-est-ouest',
  area: 40,
  consumptionMode: 'facture',
  bill: '100-200',
  consumption: 3800,
};

const label = (answers: { label: string; value: string }[], name: string) =>
  answers.find((a) => a.label === name)?.value;

describe('le rappel des réponses dans le rapport', () => {
  it('reprend les libellés du parcours, sans les recopier', () => {
    const answers = answerSummary(BASE);
    /* Le libellé DOIT venir de la table qui pilote le simulateur : c'est la
       seule garantie que le rapport et l'écran ne divergent jamais. */
    const fromTable = ORIENTATIONS.find((o) => o.value === 'sud-est-ouest')!.label;
    expect(label(answers, 'Orientation')).toBe(fromTable);
    expect(label(answers, 'Type de bien')).toBe('Maison');
    expect(label(answers, 'Toiture')).toBe('Incliné');
    expect(label(answers, 'Région')).toBe('Wallonie');
    expect(label(answers, 'Surface disponible')).toBe('40 m²');
  });

  it('n’expose pas l’affinage tant qu’il n’a pas été traversé', () => {
    const answers = answerSummary(BASE);
    expect(answers.map((a) => a.label)).not.toContain('Ombrage');
    expect(answers.map((a) => a.label)).not.toContain('Batterie envisagée');
  });

  it('expose l’affinage une fois traversé', () => {
    const answers = answerSummary({ ...BASE, refine: { ...REFINE_DEFAULT, shading: 'partiel' } });
    expect(label(answers, 'Ombrage')).toBe('Partiel');
    expect(label(answers, 'Batterie envisagée')).toBe('Non');
  });

  /* ⚠️ Le parcours masque la pente sur un toit plat. Le rapport la
     ressusciterait s'il listait bêtement les cinq champs d'affinage — et le
     lecteur croirait avoir répondu à une question jamais posée. */
  it('ne ressuscite pas la pente sur un toit plat', () => {
    const plat = answerSummary({ ...BASE, roof: 'plate', refine: { ...REFINE_DEFAULT } });
    const incline = answerSummary({ ...BASE, roof: 'inclinee', refine: { ...REFINE_DEFAULT } });
    expect(plat.map((a) => a.label)).not.toContain('Pente du toit');
    expect(incline.map((a) => a.label)).toContain('Pente du toit');
  });
});

describe('la consommation est rendue telle que le visiteur l’a exprimée', () => {
  it('rend la tranche de facture quand il a répondu en euros', () => {
    expect(consumptionAnswer(BASE)).toBe('100 – 200 €/mois');
  });

  it('rend les kWh quand il a répondu en kWh', () => {
    expect(consumptionAnswer({ ...BASE, consumptionMode: 'kwh', consumption: 5200 })).toContain('kWh par an');
    expect(consumptionAnswer({ ...BASE, consumptionMode: 'kwh', consumption: 5200 })).toContain('200');
  });

  /* ⚠️ « Je ne sais pas » ne doit pas devenir un chiffre muet : sans le mot
     « estimée », le budget du rapport serait inexplicable au lecteur. */
  it('annonce l’hypothèse quand il ne savait pas', () => {
    const value = consumptionAnswer({ ...BASE, consumptionMode: 'inconnue' });
    expect(value).toMatch(/^Estimée à/);
    expect(value).toContain('kWh par an');
  });
});

describe('ANSWER_LABELS', () => {
  /* ⚠️ Le document rend ses lignes au build à partir de cette liste et les
     remplit ensuite. Si `answerSummary` produisait un libellé absent d'ici, la
     ligne n'existerait pas dans le HTML et la réponse disparaîtrait du rapport
     — silencieusement. */
  it('couvre tout ce que answerSummary peut produire', () => {
    const cas: SimulatorInputs[] = [
      BASE,
      { ...BASE, refine: { ...REFINE_DEFAULT } },
      { ...BASE, roof: 'plate', refine: { ...REFINE_DEFAULT } },
      { ...BASE, consumptionMode: 'kwh' },
      { ...BASE, consumptionMode: 'inconnue' },
    ];
    for (const inputs of cas) {
      for (const { label } of answerSummary(inputs)) {
        expect(ANSWER_LABELS).toContain(label);
      }
    }
  });

  it('n’annonce aucun libellé que answerSummary ne produirait jamais', () => {
    const tous = new Set([
      ...answerSummary({ ...BASE, refine: { ...REFINE_DEFAULT } }).map((a) => a.label),
    ]);
    for (const label of ANSWER_LABELS) expect(tous).toContain(label);
  });
});
