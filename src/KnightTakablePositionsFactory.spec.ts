import { Knight, Pawn, Position, Queen } from '@official-sashimi/chess-models';
import { KnightTakablePositionsFactory } from './KnightTakablePositionsFactory';

describe('KnightTakablePositionsFactory', () => {
  describe('.create', () => {
    describe('for white pieces', () => {
      const positionedPieces = {
        c: { 3: new Pawn('Black') },
        f: { 2: new Pawn('White'), 6: new Pawn('Black') },
        g: { 5: new Pawn('Black'), 6: new Queen('Black') },
      };
      const offset = new Position('e', 4);
      const piece = new Knight('White');

      it('returns positions which were extracted from a given board', () => {
        expect(
          KnightTakablePositionsFactory.create({
            subject: piece,
            in: positionedPieces,
            at: offset,
          }),
        ).toEqual(
          new Set([
            new Position('c', 3),
            new Position('g', 5),
            new Position('f', 6),
          ]),
        );
      });
    });

    describe('for black pieces', () => {
      const positionedPieces = {
        c: { 3: new Pawn('White'), 7: new Pawn('Black') },
        e: { 3: new Pawn('White') },
        f: { 6: new Pawn('Black') },
      };
      const offset = new Position('d', 5);
      const piece = new Knight('Black');

      it('returns positions which were extracted from a given board', () => {
        expect(
          KnightTakablePositionsFactory.create({
            subject: piece,
            in: positionedPieces,
            at: offset,
          }),
        ).toEqual(new Set([new Position('c', 3), new Position('e', 3)]));
      });
    });
  });
});
