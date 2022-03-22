import { Pawn, Position } from '@official-sashimi/chess-models';
import { PawnNotMovablePositionDetector } from './PawnNotMovablePositionDetector';

describe('PawnNotMovablePositionDetector', () => {
  describe('notMovablePositionsOf method', () => {
    describe('for white pieces', () => {
      describe('for a pawn which is in the first move', () => {
        describe('not prevention by other piece', () => {
          const positionedPieces = {
            a: { 2: new Pawn('White'), 5: new Pawn('Black') },
          };
          const offset = new Position('a', 2);
          const reducer = new PawnNotMovablePositionDetector(positionedPieces);

          it('returns an empty set', () => {
            expect(reducer.notMovablePositionsOf(offset)).toEqual(new Set([]));
          });
        });

        describe('prevention by other piece at rank 3', () => {
          it('returns some not movable positions', () => {
            const positionedPieces = {
              a: { 2: new Pawn('White'), 3: new Pawn('Black') },
            };
            const offset = new Position('a', 2);
            const reducer = new PawnNotMovablePositionDetector(
              positionedPieces,
            );
            expect(reducer.notMovablePositionsOf(offset)).toEqual(
              new Set([new Position('a', 3), new Position('a', 4)]),
            );
          });
        });

        describe('prevention by other piece at rank 4', () => {
          it('returns some not movable positions', () => {
            const positionedPieces = {
              a: { 2: new Pawn('White'), 4: new Pawn('White') },
            };
            const offset = new Position('a', 2);
            const reducer = new PawnNotMovablePositionDetector(
              positionedPieces,
            );
            expect(reducer.notMovablePositionsOf(offset)).toEqual(
              new Set([new Position('a', 4)]),
            );
          });
        });
      });

      describe('for a pawn which is not in the first move', () => {
        describe('not prevention by other piece', () => {
          const positionedPieces = {
            a: { 6: new Pawn('White') },
          };
          const offset = new Position('a', 6);
          const reducer = new PawnNotMovablePositionDetector(positionedPieces);

          it('returns an empty set', () => {
            expect(reducer.notMovablePositionsOf(offset)).toEqual(new Set([]));
          });
        });

        describe('prevention by other piece', () => {
          const positionedPieces = {
            a: { 6: new Pawn('White'), 7: new Pawn('White') },
          };
          const offset = new Position('a', 6);
          const reducer = new PawnNotMovablePositionDetector(positionedPieces);

          it('returns a not movable position', () => {
            expect(reducer.notMovablePositionsOf(offset)).toEqual(
              new Set([new Position('a', 7)]),
            );
          });
        });
      });
    });

    describe('for black pieces', () => {
      describe('for a pawn which is in the first move', () => {
        describe('not prevention by other piece', () => {
          const positionedPieces = {
            a: { 7: new Pawn('Black'), 4: new Pawn('White') },
          };
          const offset = new Position('a', 7);
          const reducer = new PawnNotMovablePositionDetector(positionedPieces);

          it('returns an empty set', () => {
            expect(reducer.notMovablePositionsOf(offset)).toEqual(new Set([]));
          });
        });

        describe('prevention by other piece at rank 6', () => {
          it('returns some not movable positions', () => {
            const positionedPieces = {
              a: { 7: new Pawn('Black'), 6: new Pawn('White') },
            };
            const offset = new Position('a', 7);
            const reducer = new PawnNotMovablePositionDetector(
              positionedPieces,
            );
            expect(reducer.notMovablePositionsOf(offset)).toEqual(
              new Set([new Position('a', 6), new Position('a', 5)]),
            );
          });
        });

        describe('prevention by other piece at rank 5', () => {
          it('returns some not movable positions', () => {
            const positionedPieces = {
              a: { 7: new Pawn('Black'), 5: new Pawn('White') },
            };
            const offset = new Position('a', 7);
            const reducer = new PawnNotMovablePositionDetector(
              positionedPieces,
            );
            expect(reducer.notMovablePositionsOf(offset)).toEqual(
              new Set([new Position('a', 5)]),
            );
          });
        });
      });

      describe('for a pawn which is not in the first move', () => {
        describe('not prevention by other piece', () => {
          const positionedPieces = {
            a: { 2: new Pawn('Black') },
          };
          const offset = new Position('a', 2);
          const reducer = new PawnNotMovablePositionDetector(positionedPieces);

          it('returns an empty set', () => {
            expect(reducer.notMovablePositionsOf(offset)).toEqual(new Set([]));
          });
        });

        describe('prevention by other piece', () => {
          const positionedPieces = {
            a: { 3: new Pawn('Black'), 2: new Pawn('White') },
          };
          const offset = new Position('a', 3);
          const reducer = new PawnNotMovablePositionDetector(positionedPieces);

          it('returns a not movable position', () => {
            expect(reducer.notMovablePositionsOf(offset)).toEqual(
              new Set([new Position('a', 2)]),
            );
          });
        });
      });
    });
  });
});
