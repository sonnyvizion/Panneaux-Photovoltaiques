import { describe, expect, it } from 'vitest';
import { GRID_CO2_G_PER_KWH, avoidedCo2Kg, formatCo2, residentialRange, standardCase } from './co2';
import { POWER_DEFAULT, POWER_MAX, POWER_MIN, estimate } from './powerEstimate';

describe('cohérence avec le simulateur', () => {
  /* Le garde-fou de la contradiction qui a motivé ce module : `simulateur.md`
     annonce « ~600–900 kg/an » pour une installation typique. Si le facteur ou
     le modèle de production changent au point de sortir de cette fourchette,
     c'est `simulateur.md` qu'il faut corriger EN MÊME TEMPS — pas ce test. */
  it('place le cas standard dans la fourchette annoncée par simulateur.md', () => {
    const kg = avoidedCo2Kg(POWER_DEFAULT);
    expect(kg).toBeGreaterThanOrEqual(600);
    expect(kg).toBeLessThanOrEqual(1000);
  });

  /* La page 4.10 énonce « 0,5 à 1,5 tonne/an ». Elle ne l'écrit plus en dur :
     elle appelle `residentialRange()`. Ce test vérifie que la valeur dérivée
     tombe bien sur la phrase validée par la rédaction. */
  it('retrouve la fourchette publiée par la page Impact écologique', () => {
    expect(residentialRange()).toBe('0,5 à 1,5 tonne');
  });

  it('dérive bien du modèle de production, pas d’une constante recopiée', () => {
    expect(avoidedCo2Kg(POWER_DEFAULT)).toBeCloseTo(
      (estimate(POWER_DEFAULT).production * GRID_CO2_G_PER_KWH) / 1000,
    );
  });
});

describe('avoidedCo2Kg', () => {
  it('croît avec la puissance installée', () => {
    expect(avoidedCo2Kg(POWER_MAX)).toBeGreaterThan(avoidedCo2Kg(POWER_MIN));
  });

  it('reste positif sur toute la gamme résidentielle', () => {
    for (let kwc = POWER_MIN; kwc <= POWER_MAX; kwc += 0.5) {
      expect(avoidedCo2Kg(kwc)).toBeGreaterThan(0);
    }
  });

  /* ⚠️ Le point de crédibilité de `simulateur.md` : l'ancienne valeur du
     simulateur (~9,5 t/an) était « 6 à 15× trop haute ». Aucune puissance
     résidentielle ne doit plus produire un ordre de grandeur pareil. */
  it('ne peut plus produire un chiffre gonflé comme l’ancien simulateur', () => {
    expect(avoidedCo2Kg(POWER_MAX)).toBeLessThan(3000);
  });
});

describe('formatCo2', () => {
  /* Règle explicite de `simulateur.md` : « ne pas afficher 0,65 tonnes —
     afficher 650 kg ». */
  it('écrit en kg en dessous de la tonne', () => {
    expect(formatCo2(650)).toBe('650 kg');
    expect(formatCo2(918)).toBe('920 kg');
  });

  it('écrit en tonnes au-delà', () => {
    expect(formatCo2(1530)).toBe('1,5 t');
  });

  it('applique la règle au cas standard du site', () => {
    expect(standardCase()).toMatch(/kg$/);
  });
});
