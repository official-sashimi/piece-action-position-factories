import { Pawn, Position, Rook, Queen } from '@official-sashimi/chess-models';
import { MovablePositionsFactory } from './MovablePositionsFactory';

describe('MovablePositionsFactory', () => {
  describe('.create', () => {
    describe('for directional movable pieces', () => {
      describe('for white pieces', () => {
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
        const offset = new Position('e', 4);
        const piece = new Queen('White');

        it('returns positions which were extracted from a given board', () => {
          expect(
            MovablePositionsFactory.create({
              subject: piece,
              in: positionedPieces,
              at: offset,
            }),
          ).toEqual(
            new Set([
              // ↑
              new Position('e', 5),
              // ↗
              new Position('f', 5),
              // →
              new Position('f', 4),
              new Position('g', 4),
              // ↘
              // ↓
              new Position('e', 2),
              new Position('e', 3),
              // ↙
              new Position('d', 3),
              // ←
              new Position('d', 4),
              // ↖
              new Position('b', 7),
              new Position('c', 6),
              new Position('d', 5),
            ]),
          );
        });
      });

      describe('for black pieces', () => {
        const positionedPieces = {
          a: {
            4: new Rook('Black'),
            5: new Pawn('White'),
            8: new Rook('Black'),
          },
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
        const offset = new Position('d', 5);
        const piece = new Queen('Black');

        it('returns positions which were extracted from a given board', () => {
          expect(
            MovablePositionsFactory.create({
              subject: piece,
              in: positionedPieces,
              at: offset,
            }),
          ).toEqual(
            new Set([
              // ↑
              new Position('d', 4),
              // ↗
              new Position('c', 4),
              // →
              new Position('b', 5),
              new Position('c', 5),
              // ↘
              new Position('b', 7),
              new Position('c', 6),
              // ↓
              new Position('d', 6),
              // ↙
              // ←
              new Position('e', 5),
              new Position('f', 5),
              // ↖
              new Position('e', 4),
            ]),
          );
        });
      });
    });
  });
});
