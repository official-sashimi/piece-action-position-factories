import { King, Pawn, Position, Rook } from '@official-sashimi/chess-models';
import { KingNotMovablePositionsFactory } from './KingNotMovablePositionsFactory';

describe('KingNotMovablePositionsFactory', () => {
  describe('.create', () => {
    describe('for white pieces', () => {
      const positionedPieces = {
        a: { 1: new Rook('White') },
        e: { 2: new Pawn('White'), 3: new Pawn('Black') },
        g: { 1: new Rook('White'), 8: new Rook('Black') },
      };
      const offset = new Position('f', 1);
      const piece = new King('White');

      it('returns positions which were extracted from a given board', () => {
        expect(
          KingNotMovablePositionsFactory.create({
            subject: piece,
            in: positionedPieces,
            at: offset,
          }),
        ).toEqual(
          new Set([
            new Position('e', 2),
            new Position('f', 2),
            new Position('g', 1),
            new Position('g', 2),
          ]),
        );
      });
    });

    describe('for black pieces', () => {
      const positionedPieces = {
        c: { 6: new King('White') },
        d: { 8: new Rook('Black') },
        e: { 8: new Rook('White') },
      };
      const offset = new Position('c', 8);
      const piece = new King('Black');

      it('returns positions which were extracted from a given board', () => {
        expect(
          KingNotMovablePositionsFactory.create({
            subject: piece,
            in: positionedPieces,
            at: offset,
          }),
        ).toEqual(
          new Set([
            new Position('b', 7),
            new Position('c', 7),
            new Position('d', 7),
            new Position('d', 8),
          ]),
        );
      });
    });
  });
});
