import { Pawn, Position, Rook, Queen } from '@official-sashimi/chess-models';
import { DirectionalNotMovablePositionDetector } from './DirectionalNotMovablePositionDetector';

describe('DirectionalNotMovablePositionDetector', () => {
  describe('notMovablePositionsOf method', () => {
    describe('to reduce for a white queen piece', () => {
      const positionedPieces = {
        a: { 8: new Rook('Black') },
        c: { 2: new Pawn('White'), 4: new Pawn('Black') },
        e: {
          1: new Rook('White'),
          4: new Queen('White'),
          6: new Pawn('Black'),
          7: new Queen('Black'),
        },
        f: { 3: new Pawn('White') },
        g: { 5: new Pawn('Black'), 6: new Queen('Black') },
        h: { 4: new Pawn('Black') },
      };

      const reducer = new DirectionalNotMovablePositionDetector(
        positionedPieces,
      );
      const offset = new Position('e', 4);

      it('returns positions which were extracted from a given board', () => {
        expect(reducer.notMovablePositionsOf(offset)).toEqual(
          new Set([
            // ↑
            new Position('e', 6),
            new Position('e', 7),
            new Position('e', 8),
            // ↗
            new Position('g', 6),
            new Position('h', 7),
            // →
            new Position('h', 4),
            // ↘
            new Position('f', 3),
            new Position('g', 2),
            new Position('h', 1),
            // ↓
            new Position('e', 1),
            // ↙
            new Position('c', 2),
            new Position('b', 1),
            // ←
            new Position('c', 4),
            new Position('b', 4),
            new Position('a', 4),
            // ↖
            new Position('a', 8),
          ]),
        );
      });
    });

    describe('to reduce for a black queen piece', () => {
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

      const reducer = new DirectionalNotMovablePositionDetector(
        positionedPieces,
      );
      const offset = new Position('d', 5);

      it('returns positions which were extracted from a given board', () => {
        expect(reducer.notMovablePositionsOf(offset)).toEqual(
          new Set([
            // ↑
            new Position('d', 3),
            new Position('d', 2),
            new Position('d', 1),
            // ↗
            new Position('b', 3),
            new Position('a', 2),
            // →
            new Position('a', 5),
            // ↘
            new Position('a', 8),
            // ↓
            new Position('d', 7),
            new Position('d', 8),
            // ↙
            new Position('e', 6),
            new Position('f', 7),
            new Position('g', 8),
            // ←
            new Position('g', 5),
            new Position('h', 5),
            // ↖
            new Position('f', 3),
            new Position('g', 2),
            new Position('h', 1),
          ]),
        );
      });
    });
  });
});
