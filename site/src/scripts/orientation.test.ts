import { describe, expect, it } from 'vitest';
import {
  ORIENTATIONS,
  ORIENTATION_DEFAULT,
  dialIndex,
  dialModel,
  dialPercent,
  dialStep,
  orientationFactor,
  orientationSpread,
} from './orientation';
import { sunPosition } from './orientationDial';

describe('orientation', () => {
  it('couvre les quatre orientations du cahier, dans l’ordre décroissant', () => {
    expect(ORIENTATIONS.map((o) => o.value)).toEqual(['sud', 'sud-est-ouest', 'est-ouest', 'nord']);
    const factors = ORIENTATIONS.map((o) => o.factor);
    expect(factors).toEqual([...factors].sort((a, b) => b - a));
  });

  it('prend le sud comme référence à 100 %', () => {
    expect(orientationFactor(ORIENTATION_DEFAULT)).toBe(1);
  });

  /* La page « Rendement & production » annonce « 35 points d'écart entre le sud
     et le nord ». Le chiffre est dérivé des coefficients : si l'un bouge, le
     texte doit bouger aussi, et ce test le signale. */
  it('retrouve les 35 points d’écart annoncés par la page Rendement', () => {
    expect(orientationSpread()).toBe(35);
  });

  it('retombe sur le sud pour une valeur inconnue', () => {
    expect(orientationFactor('plein-ouest-nord-nord')).toBe(1);
  });
});

describe('dialModel — la brique à deux axes', () => {
  /* ⚠️ Déplacer le soleil vers le sud doit faire MONTER le rendement. Un curseur
     dont la valeur baisse quand on avance ment sur ce qu'il représente. */
  it('balaie l’azimut du pire au meilleur', () => {
    const factors = dialModel('orientation').steps.map((s) => s.factor);
    expect(factors).toEqual([...factors].sort((a, b) => a - b));
    expect(dialModel('orientation').steps[0].value).toBe('nord');
    expect(dialModel('orientation').steps.at(-1)!.value).toBe('sud');
  });

  /* La pente se balaie par ANGLE, pas par rendement : son optimum est au milieu,
     et c'est justement ce que le visiteur doit voir. */
  it('balaie la pente par angle, optimum au centre', () => {
    const steps = dialModel('tilt').steps;
    expect(steps.map((s) => s.value)).toEqual(['faible', 'moyenne', 'forte']);
    expect(steps[1].factor).toBeGreaterThan(steps[0].factor);
    expect(steps[1].factor).toBeGreaterThan(steps[2].factor);
  });

  /* ⚠️ Les deux axes ne traitent PAS « je ne sais pas » pareil, et c'est voulu.
     Sur la pente, l'hypothèse prudente (0,95) ne correspond à aucun angle : elle
     reste hors course. Sur l'azimut, elle coïncide avec une orientation réelle,
     sud-est/sud-ouest — le curseur se pose donc dessus et MONTRE au visiteur ce
     qu'on a supposé pour lui, au lieu de le laisser deviner. */
  it('laisse « je ne sais pas » hors course sur la pente', () => {
    const m = dialModel('tilt');
    expect(m.steps.some((s) => s.value === m.unknown)).toBe(false);
  });

  it('fait coïncider « je ne sais pas » avec une position réelle sur l’azimut', () => {
    const m = dialModel('orientation');
    expect(m.steps.some((s) => s.value === m.unknown)).toBe(true);
    expect(dialPercent('orientation', m.unknown)).toBe(95);
  });
});

describe('dialStep / dialIndex', () => {
  it('font l’aller-retour sur tous les crans', () => {
    for (const axis of ['orientation', 'tilt'] as const) {
      dialModel(axis).steps.forEach((step, i) => {
        expect(dialStep(axis, i).value).toBe(step.value);
        expect(dialIndex(axis, step.value)).toBe(i);
      });
    }
  });

  it('borne une position hors course au lieu de rendre `undefined`', () => {
    expect(dialStep('orientation', -5).value).toBe('nord');
    expect(dialStep('orientation', 99).value).toBe('sud');
  });

  it('ne trouve pas de position pour une valeur hors course', () => {
    expect(dialIndex('tilt', 'inconnue')).toBeNull();
    expect(dialIndex('orientation', 'plein-ouest')).toBeNull();
    /* Contre-exemple assumé : sur l'azimut, l'hypothèse prudente EST un cran. */
    expect(dialIndex('orientation', 'sud-est-ouest')).toBe(2);
  });
});

describe('dialPercent', () => {
  it('rapporte au meilleur cran de l’axe, pas au productible absolu', () => {
    expect(dialPercent('orientation', 'sud')).toBe(100);
    expect(dialPercent('orientation', 'nord')).toBe(65);
    expect(dialPercent('orientation', 'est-ouest')).toBe(85);
  });

  /* Sur la pente, l'optimum est « moyenne » : c'est elle qui vaut 100 %. */
  it('place les 100 % de la pente au milieu', () => {
    expect(dialPercent('tilt', 'moyenne')).toBe(100);
    expect(dialPercent('tilt', 'faible')).toBe(90);
    expect(dialPercent('tilt', 'forte')).toBe(92);
  });

  it('sait encore chiffrer « je ne sais pas », qui n’est pas un cran', () => {
    expect(dialPercent('orientation', 'sud-est-ouest')).toBe(95);
    expect(dialPercent('tilt', 'inconnue')).toBe(95);
  });
});

describe('sunPosition', () => {
  /* L'abscisse suit la course du curseur : à gauche le premier cran, à droite le
     dernier. Inverser les deux ferait glisser le soleil à gauche quand le doigt
     va à droite. */
  it('va de gauche à droite', () => {
    expect(sunPosition(0, 4, 1).x).toBeLessThan(sunPosition(3, 4, 1).x);
  });

  /* ⚠️ L'ORDONNÉE PORTE LE RENDEMENT, pas l'heure du jour. Un demi-cercle
     parcouru de gauche à droite posait « Sud » au ras de l'horizon — l'inverse
     de ce que la brique doit montrer. */
  it('monte le soleil quand le rendement monte', () => {
    const bon = sunPosition(3, 4, 1);
    const mauvais = sunPosition(0, 4, 0.65);
    expect(bon.y).toBeLessThan(mauvais.y);
  });

  it('borne la hauteur à la course, quoi qu’on lui donne', () => {
    const sol = sunPosition(0, 4, -1).y;
    const plafond = sunPosition(0, 4, 5).y;
    expect(sunPosition(0, 4, 0).y).toBe(sol);
    expect(sunPosition(0, 4, 1).y).toBe(plafond);
  });

  /* Sur l'axe de la pente, l'optimum est au milieu : le soleil doit y culminer
     et redescendre des deux côtés. C'est toute la leçon de cet axe. */
  it('culmine au centre sur un axe dont l’optimum est médian', () => {
    const gauche = sunPosition(0, 3, dialPercent('tilt', 'faible') / 100);
    const centre = sunPosition(1, 3, dialPercent('tilt', 'moyenne') / 100);
    const droite = sunPosition(2, 3, dialPercent('tilt', 'forte') / 100);
    expect(centre.y).toBeLessThan(gauche.y);
    expect(centre.y).toBeLessThan(droite.y);
  });
});
