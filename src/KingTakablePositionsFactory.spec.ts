import { King, Pawn, Position, Rook } from '@official-sashimi/chess-models';
import { KingTakablePositionsFactory } from './KingTakablePositionsFactory';

describe('KingTakablePositionsFactory', () => {
  describe('.create', () => {
    describe('for white pieces', () => {
      const positionedPieces = {
        d: { 3: new Pawn('Black') },
        e: { 2: new Pawn('Black') },
        f: { 2: new Pawn('White') },
        g: { 2: new Pawn('Black') },
      };
      const offset = new Position('f', 1);
      const piece = new King('White');

      it('returns positions which were extracted from a given board', () => {
        expect(
          KingTakablePositionsFactory.create({
            subject: piece,
            in: positionedPieces,
            at: offset,
          }),
        ).toEqual(new Set([new Position('g', 2)]));
      });
    });

    describe('for black pieces', () => {
      const positionedPieces = {
        c: { 7: new Pawn('White') },
        d: { 6: new King('White'), 7: new Rook('White'), 8: new Rook('Black') },
      };
      const offset = new Position('c', 8);
      const piece = new King('Black');

      it('returns positions which were extracted from a given board', () => {
        expect(
          KingTakablePositionsFactory.create({
            subject: piece,
            in: positionedPieces,
            at: offset,
          }),
        ).toEqual(new Set());
      });
    });
  });
});
