import { Pawn, Position, Knight } from '@official-sashimi/chess-models';
import { KnightNotMovablePositionsFactory } from './KnightNotMovablePositionsFactory';

describe('KnightNotMovablePositionsFactory', () => {
  describe('.create', () => {
    describe('for white pieces', () => {
      const positionedPieces = {
        d: { 6: new Pawn('White') },
        e: { 4: new Knight('White') },
        g: { 3: new Knight('Black') },
      };
      const offset = new Position('e', 4);
      const piece = new Knight('White');

      it('returns positions which were extracted from a given board', () => {
        expect(
          KnightNotMovablePositionsFactory.create({
            subject: piece,
            in: positionedPieces,
            at: offset,
          }),
        ).toEqual(new Set([new Position('d', 6), new Position('g', 3)]));
      });
    });

    describe('for black pieces', () => {
      const positionedPieces = {
        b: { 4: new Pawn('White') },
        d: { 5: new Knight('Black') },
        f: { 6: new Pawn('Black') },
      };
      const offset = new Position('d', 5);
      const piece = new Knight('Black');

      it('returns positions which were extracted from a given board', () => {
        expect(
          KnightNotMovablePositionsFactory.create({
            subject: piece,
            in: positionedPieces,
            at: offset,
          }),
        ).toEqual(new Set([new Position('b', 4), new Position('f', 6)]));
      });
    });
  });
});
