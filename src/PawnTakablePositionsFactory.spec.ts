import { Pawn, Position } from '@official-sashimi/chess-models';
import { PawnTakablePositionsFactory } from './PawnTakablePositionsFactory';

describe('PawnTakablePositionsFactory', () => {
  describe('.create', () => {
    describe('for white pieces', () => {
      const positionedPieces = {
        d: { 5: new Pawn('Black') },
        e: { 5: new Pawn('Black') },
        f: { 5: new Pawn('White') },
      };
      const offset = new Position('e', 4);
      const piece = new Pawn('White');

      it('returns positions which were extracted from a given board', () => {
        expect(
          PawnTakablePositionsFactory.create({
            subject: piece,
            in: positionedPieces,
            at: offset,
          }),
        ).toEqual(new Set([new Position('d', 5)]));
      });
    });

    describe('for black pieces', () => {
      const positionedPieces = {
        c: { 4: new Pawn('White') },
        d: { 4: new Pawn('White') },
        e: { 4: new Pawn('White') },
      };
      const offset = new Position('d', 5);
      const piece = new Pawn('Black');

      it('returns positions which were extracted from a given board', () => {
        expect(
          PawnTakablePositionsFactory.create({
            subject: piece,
            in: positionedPieces,
            at: offset,
          }),
        ).toEqual(new Set([new Position('c', 4), new Position('e', 4)]));
      });
    });
  });
});
