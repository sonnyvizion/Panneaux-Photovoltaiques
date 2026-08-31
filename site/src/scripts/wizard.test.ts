import { describe, expect, it } from 'vitest';
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
  visibleRefineSteps,
} from './wizard';

/** Un `FormData.get` de laboratoire. */
const form = (values: Record<string, string>) => (name: string) => values[name] ?? null;

describe('stepFromSearch', () => {
  /* ⚠️ `null`, pas « étape 1 » : la première étape dépend de la région connue ou
     non, et seule la page peut le savoir. */
  it('ne tranche pas quand l’URL ne dit rien', () => {
    expect(stepFromSearch('')).toBeNull();
    expect(stepFromSearch('?cp=1000')).toBeNull();
  });

  it('lit les questions, le résultat et l’affinage', () => {
    expect(stepFromSearch('?etape=3')).toBe('3');
    expect(stepFromSearch('?etape=resultat')).toBe(RESULT_STEP);
    expect(stepFromSearch('?cp=1000&etape=a2')).toBe('a2');
  });

  /* Une URL trafiquée ne doit pas afficher un rail vide. */
  it('rejette une étape inconnue', () => {
    expect(stepFromSearch('?etape=42')).toBeNull();
    expect(stepFromSearch('?etape=a9')).toBeNull();
    expect(stepFromSearch('?etape=')).toBeNull();
  });
});

describe('stepToSearch', () => {
  /* Le code postal vient du hero : il doit survivre au parcours entier. */
  it('préserve les paramètres déjà présents', () => {
    expect(stepToSearch('3', '?cp=1000')).toBe('?cp=1000&etape=3');
    expect(stepToSearch('a1', '?region=flandre')).toBe('?region=flandre&etape=a1');
  });

  /* Toutes les étapes s'écrivent, y compris la première : une URL implicite
     redeviendrait ambiguë dès que la première étape change. */
  it('écrit toujours l’étape, et remplace la précédente', () => {
    expect(stepToSearch('1', '')).toBe('?etape=1');
    expect(stepToSearch('1', '?cp=1000&etape=4')).toBe('?cp=1000&etape=1');
  });

  it('fait l’aller-retour avec stepFromSearch', () => {
    for (const step of [...QUESTION_STEPS, ...REFINE_STEPS].map((s) => s.id).concat(RESULT_STEP)) {
      expect(stepFromSearch(stepToSearch(step, '?cp=4000'))).toBe(step);
    }
  });
});

describe('visibleRefineSteps', () => {
  it('pose les cinq options sur un toit incliné', () => {
    expect(visibleRefineSteps(true)).toHaveLength(5);
  });

  /* L'inclinaison ferait doublon avec « toit plat », répondu à l'étape 2. */
  it('saute l’inclinaison sur un toit plat', () => {
    const steps = visibleRefineSteps(false);
    expect(steps).toHaveLength(4);
    expect(steps.some((s) => s.field === 'tilt')).toBe(false);
  });
});

describe('isStepAnswered', () => {
  it('exige un choix sur les questions à boutons radio', () => {
    expect(isStepAnswered('1', form({}))).toBe(false);
    expect(isStepAnswered('1', form({ property: 'maison' }))).toBe(true);
    expect(isStepAnswered('2', form({ roof: 'plate' }))).toBe(true);
    expect(isStepAnswered('3', form({ property: 'maison' }))).toBe(false);
  });

  /* Un curseur porte toujours une valeur : rien à déverrouiller. */
  it('considère la surface comme toujours répondue', () => {
    expect(isStepAnswered('4', form({}))).toBe(true);
  });

  /* Décoché VEUT dire « pas de batterie » — c'est une réponse. */
  it('considère la batterie comme toujours répondue', () => {
    expect(isStepAnswered('a5', form({}))).toBe(true);
  });

  describe('la consommation, seule question à deux étages', () => {
    it('attend d’abord le mode', () => {
      expect(isStepAnswered('5', form({}))).toBe(false);
    });

    it('attend la tranche en mode facture', () => {
      expect(isStepAnswered('5', form({ consumptionMode: 'facture' }))).toBe(false);
      expect(isStepAnswered('5', form({ consumptionMode: 'facture', bill: '100-200' }))).toBe(true);
    });

    it('se contente du mode pour les kWh et pour « je ne sais pas »', () => {
      expect(isStepAnswered('5', form({ consumptionMode: 'kwh' }))).toBe(true);
      expect(isStepAnswered('5', form({ consumptionMode: 'inconnue' }))).toBe(true);
    });
  });

  it('exige un choix sur les questions d’affinage', () => {
    expect(isStepAnswered('a2', form({}))).toBe(false);
    expect(isStepAnswered('a2', form({ shading: 'aucun' }))).toBe(true);
  });
});

describe('isRefineStep', () => {
  it('sépare les deux parcours', () => {
    expect(isRefineStep('a3')).toBe(true);
    expect(isRefineStep('3')).toBe(false);
    expect(isRefineStep(RESULT_STEP)).toBe(false);
  });
});

describe('progressLabel', () => {
  it('compte à partir de 1, et nomme le parcours', () => {
    expect(progressLabel(0, 5, 'questions')).toBe('Question 1 sur 5');
    expect(progressLabel(2, 5, 'questions')).toBe('Question 3 sur 5');
    expect(progressLabel(1, 4, 'affinage')).toBe('Affinage 2 sur 4');
  });
});

describe('hasAnyAnswer', () => {
  /* ⚠️ Régression : le curseur de surface porte une valeur dès le HTML rendu au
     build. En le comptant, on croyait toujours avoir des réponses, et le
     panneau retirait son étiquette « exemple » sans que personne n'ait
     répondu. */
  it('ignore les champs qui portent toujours une valeur', () => {
    expect(hasAnyAnswer(form({ area: '40' }))).toBe(false);
    expect(hasAnyAnswer(form({}))).toBe(false);
  });

  it('devient vrai dès la première vraie réponse', () => {
    expect(hasAnyAnswer(form({ property: 'maison' }))).toBe(true);
    expect(hasAnyAnswer(form({ consumptionMode: 'inconnue' }))).toBe(true);
  });
});

describe('visibleQuestionSteps', () => {
  /* ⚠️ Le trou que cette étape bouche : sans région connue, le simulateur
     retombait en silence sur la Wallonie — la seule des trois régions où
     l'installation ne s'amortit jamais. */
  it('pose la question de la région quand elle est inconnue', () => {
    const steps = visibleQuestionSteps(false);
    expect(steps).toHaveLength(6);
    expect(steps[0].field).toBe('cp');
  });

  it('ne la pose pas quand le hero ou le méga-menu l’a déjà donnée', () => {
    const steps = visibleQuestionSteps(true);
    expect(steps).toHaveLength(5);
    expect(steps.some((s) => s.field === 'cp')).toBe(false);
  });

  it('compte « sur 6 » ou « sur 5 » selon le cas', () => {
    expect(progressLabel(0, visibleQuestionSteps(false).length, 'questions')).toBe('Question 1 sur 6');
    expect(progressLabel(0, visibleQuestionSteps(true).length, 'questions')).toBe('Question 1 sur 5');
  });
});

describe('isStepAnswered — le code postal', () => {
  it('exige un code postal belge, pas quatre chiffres au hasard', () => {
    expect(isStepAnswered('0', form({}))).toBe(false);
    expect(isStepAnswered('0', form({ cp: '10' }))).toBe(false);
    expect(isStepAnswered('0', form({ cp: '0000' }))).toBe(false);
    expect(isStepAnswered('0', form({ cp: '1000' }))).toBe(true);
    expect(isStepAnswered('0', form({ cp: '4000' }))).toBe(true);
  });

  /* Un code postal SITUE le projet, il ne le DÉCRIT pas : le résultat doit
     rester étiqueté « exemple » tant que le bâtiment est inconnu. */
  it('ne fait pas passer le résultat pour celui du visiteur', () => {
    expect(hasAnyAnswer(form({ cp: '1000' }))).toBe(false);
    expect(hasAnyAnswer(form({ cp: '1000', property: 'maison' }))).toBe(true);
  });
});

describe('un champ vide n’est pas une réponse', () => {
  /* ⚠️ Régression : `FormData.get()` rend `''` pour un champ présent mais vide.
     Le curseur d'orientation en pose un tant qu'on ne l'a pas manipulé —
     tester `!== null` déverrouillait « Suivant » sur une question sans
     réponse. */
  it('verrouille l’étape quand le champ est vide', () => {
    expect(isStepAnswered('3', form({ orientation: '' }))).toBe(false);
    expect(isStepAnswered('3', form({ orientation: '   ' }))).toBe(false);
    expect(isStepAnswered('3', form({ orientation: 'sud' }))).toBe(true);
  });

  it('vaut aussi pour la consommation et l’affinage', () => {
    expect(isStepAnswered('5', form({ consumptionMode: '' }))).toBe(false);
    expect(isStepAnswered('5', form({ consumptionMode: 'facture', bill: '' }))).toBe(false);
    expect(isStepAnswered('a1', form({ tilt: '' }))).toBe(false);
  });

  it('ne fait pas passer un champ vide pour une vraie réponse', () => {
    expect(hasAnyAnswer(form({ orientation: '' }))).toBe(false);
    expect(hasAnyAnswer(form({ orientation: 'sud' }))).toBe(true);
  });
});
