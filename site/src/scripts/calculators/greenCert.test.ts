import { describe, expect, it } from 'vitest';
import {
  CERT_DEFAULT,
  CERT_MAX,
  CERT_MIN,
  CERT_YEARS,
  CV_PER_MWH,
  CV_PRICE,
  certsPerYear,
  clampPower,
  yearlyRevenue,
} from './greenCert';

describe('bornes du module', () => {
  it('reste dans la plage où le coefficient est confirmé', () => {
    /* La rédaction interdit d'extrapoler au-delà de 5 kWc : le coefficient d'octroi
       y change et n'est pas vérifié. Ce test est le garde-fou de cette consigne. */
    expect(CERT_MIN).toBe(3);
    expect(CERT_MAX).toBe(5);
  });

  it('démarre sur le cas de référence de la page', () => {
    expect(CERT_DEFAULT).toBe(CERT_MAX);
  });
});

describe('certsPerYear', () => {
  /* L'exemple donné mot pour mot par la rédaction : « une installation qui
     produit 4,5 MWh par an génère environ 9,2 certificats verts annuels ».
     Si ce test tombe, c'est le texte de la page qu'il faut corriger aussi. */
  it('retrouve l’exemple chiffré de la page pour 5 kWc', () => {
    expect(certsPerYear(5)).toBeCloseTo(9.2, 1);
  });

  it('est proportionnel à la puissance', () => {
    expect(certsPerYear(CERT_MAX) / certsPerYear(CERT_MIN)).toBeCloseTo(CERT_MAX / CERT_MIN);
  });
});

describe('yearlyRevenue', () => {
  /* La réponse du hero annonce « environ 700 à 1 000 €/an pour 5 kWc ». Le
     modèle prend le prix moyen du certificat, il doit donc tomber dans le bas
     de cette fourchette — pas au-dessus, ce serait une promesse intenable. */
  it('tombe dans la fourchette annoncée par le hero', () => {
    const revenue = yearlyRevenue(5);
    expect(revenue).toBeGreaterThanOrEqual(700);
    expect(revenue).toBeLessThanOrEqual(1000);
  });

  it('applique bien le coefficient et le prix du certificat', () => {
    expect(yearlyRevenue(4)).toBeCloseTo((4 * 900 / 1000) * CV_PER_MWH * CV_PRICE);
  });

  it('croît avec la puissance sur toute la plage', () => {
    expect(yearlyRevenue(CERT_MAX)).toBeGreaterThan(yearlyRevenue(CERT_MIN));
  });

  it('donne un total sur dix ans de plusieurs milliers d’euros', () => {
    expect(yearlyRevenue(CERT_DEFAULT) * CERT_YEARS).toBeGreaterThan(5000);
  });
});

describe('clampPower', () => {
  it('ramène dans la plage ce qui en sort', () => {
    expect(clampPower(1)).toBe(CERT_MIN);
    expect(clampPower(50)).toBe(CERT_MAX);
  });

  it('retombe sur le défaut pour une saisie qui n’est pas un nombre', () => {
    expect(clampPower(Number.NaN)).toBe(CERT_DEFAULT);
  });
});
