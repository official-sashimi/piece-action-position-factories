import { Pawn, Position, Rook, Queen } from '@official-sashimi/chess-models';
import { DirectionalTakablePositionDetector } from './DirectionalTakablePositionDetector';

describe('DirectionalTakablePositionDetector', () => {
  describe('takablePositionsOf method', () => {
    describe('for white pieces', () => {
      const positionedPieces = {
        a: { 8: new Rook('Black') },
        c: { 2: new Pawn('White'), 4: new Pawn('Black') },
        e: {
          1: new Rook('White'),
          4: new Queen('White'),
          6: new Pawn('Black'),
        },
        f: { 3: new Pawn('White') },
        g: { 5: new Pawn('Black'), 6: new Queen('Black') },
        h: { 4: new Pawn('White') },
      };

      const reducer = new DirectionalTakablePositionDetector(positionedPieces);
      const offset = new Position('e', 4);

      it('returns positions which were extracted from a given board', () => {
        expect(reducer.takablePositionsOf(offset)).toEqual(
          new Set([
            // ↑
            new Position('e', 6),
            // ↗
            new Position('g', 6),
            // →
            // ↘
            // ↓
            // ↙
            // ←
            new Position('c', 4),
            // ↖
            new Position('a', 8),
          ]),
        );
      });
    });

    describe('for black pieces', () => {
      const positionedPieces = {
        a: { 4: new Rook('Black'), 5: new Pawn('White'), 8: new Rook('Black') },
        b: { 3: new Pawn('White') },
        c: { 3: new Pawn('Black') },
        d: {
          3: new Pawn('White'),
          5: new Queen('Black'),
          7: new Pawn('Black'),
        },
        e: { 6: new Pawn('Black') },
        f: { 3: new Pawn('White') },
        g: { 5: new Pawn('Black'), 6: new Pawn('White') },
        h: { 5: new Pawn('Black') },
      };

      const reducer = new DirectionalTakablePositionDetector(positionedPieces);
      const offset = new Position('d', 5);

      it('returns positions which were extracted from a given board', () => {
        expect(reducer.takablePositionsOf(offset)).toEqual(
          new Set([
            // ↑
            new Position('d', 3),
            // ↗
            new Position('b', 3),
            // →
            new Position('a', 5),
            // ↘
            // ↓
            // ↙
            // ←
            // ↖
            new Position('f', 3),
          ]),
        );
      });
    });
  });
});
