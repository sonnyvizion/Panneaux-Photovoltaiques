import { describe, expect, it } from 'vitest';
import { pillEdges, travelDirection, type Rect } from './navPill';

const rect = (left: number, width: number, top = 0, height = 40): Rect => ({
  left,
  right: left + width,
  top,
  bottom: top + height,
});

describe('pillEdges', () => {
  const list = rect(100, 500, 10, 60); // x de 100 à 600, y de 10 à 70

  it('measures the left edge from the left of the list', () => {
    expect(pillEdges(list, rect(160, 80)).left).toBe(60);
  });

  it('measures the right edge from the RIGHT of the list', () => {
    // L'entrée finit à 240 ; la liste finit à 600 → 360 de marge à droite.
    expect(pillEdges(list, rect(160, 80)).right).toBe(360);
  });

  it('measures the vertical edges from the top and the BOTTOM', () => {
    // L'entrée déborde la boîte de contenu de la liste par sa marge négative :
    // les bords peuvent donc être négatifs, et c'est le cas attendu.
    const item = rect(160, 80, 4, 72);
    expect(pillEdges(list, item)).toMatchObject({ top: -6, bottom: -6 });
  });

  it('gives zero margins for an item filling the list', () => {
    expect(pillEdges(list, rect(100, 500, 10, 60))).toEqual({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    });
  });

  it('is unaffected by the list being scrolled in the viewport', () => {
    // Les deux rects bougent ensemble : les bords relatifs ne changent pas.
    const scrolled = rect(0, 500, 0, 60);
    expect(pillEdges(scrolled, rect(60, 80, -10, 40))).toEqual(
      pillEdges(list, rect(160, 80, 0, 40)),
    );
  });

  it('rounds nothing — sub-pixel widths must survive', () => {
    // Les largeurs de texte sont fractionnaires ; arrondir décalerait la pilule
    // d'un demi-pixel sur chaque bord, visible sur un aplat de couleur.
    expect(pillEdges(list, rect(160.5, 79.25))).toMatchObject({
      left: 60.5,
      right: 360.25,
    });
  });
});

describe('travelDirection', () => {
  it('reports right when the target sits further right', () => {
    expect(travelDirection(10, 200, 'left')).toBe('right');
  });

  it('reports left when the target sits further left', () => {
    expect(travelDirection(200, 10, 'right')).toBe('left');
  });

  it('keeps the previous direction when nothing moves', () => {
    // Revenir sur l'entrée déjà occupée ne doit pas réattribuer les courbes :
    // les deux bords échangeraient leur rôle au milieu d'une transition.
    expect(travelDirection(120, 120, 'right')).toBe('right');
    expect(travelDirection(120, 120, 'left')).toBe('left');
  });
});
