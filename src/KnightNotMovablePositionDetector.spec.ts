import { Pawn, Position, Knight } from '@official-sashimi/chess-models';
import { KnightNotMovablePositionDetector } from './KnightNotMovablePositionDetector';

describe('KnightNotMovablePositionDetector', () => {
  describe('notMovablePositionsOf method', () => {
    describe('for white pieces', () => {
      const positionedPieces = {
        d: { 6: new Pawn('White') },
        e: { 4: new Knight('White') },
        g: { 3: new Knight('Black') },
      };

      const reducer = new KnightNotMovablePositionDetector(positionedPieces);
      const offset = new Position('e', 4);

      it('returns positions which were extracted from a given board', () => {
        expect(reducer.notMovablePositionsOf(offset)).toEqual(
          new Set([new Position('d', 6), new Position('g', 3)]),
        );
      });
    });

    describe('for black pieces', () => {
      const positionedPieces = {
        b: { 4: new Pawn('White') },
        d: { 5: new Knight('Black') },
        f: { 6: new Pawn('Black') },
      };

      const reducer = new KnightNotMovablePositionDetector(positionedPieces);
      const offset = new Position('d', 5);

      it('returns positions which were extracted from a given board', () => {
        expect(reducer.notMovablePositionsOf(offset)).toEqual(
          new Set([new Position('b', 4), new Position('f', 6)]),
        );
      });
    });
  });
});
