import { InterceptorsFactory } from './Interceptor';
import {
  MoveDirection,
  Pawn,
  Piece,
  Position,
  Queen,
} from '@official-sashimi/chess-models';

describe('InterceptorsFactory', () => {
  const offset = new Position('e', 4);

  describe('for Up', () => {
    const moveDirections = new Set(['Up']) as Set<MoveDirection>;

    describe('to map interceptors', () => {
      const positionedPieces = {
        e: { 6: new Queen('Black'), 7: new Pawn('Black') },
      };
      const interceptors = InterceptorsFactory.create(
        offset,
        positionedPieces,
        moveDirections,
      );
      const [position, piece] = interceptors.get('Up') as [Position, Piece];

      it('maps an interceptor by move direction', () => {
        expect(position).toMatchObject(new Position('e', 6));
        expect(piece).toMatchObject(new Queen('Black'));
      });
    });

    describe('to map if any pieces are not', () => {
      const interceptors = InterceptorsFactory.create(
        offset,
        {},
        moveDirections,
      );

      it('returns a blank map', () => {
        expect(interceptors).toEqual(new Map());
      });
    });
  });

  describe('for UpRight', () => {
    const moveDirections = new Set(['UpRight']) as Set<MoveDirection>;

    describe('to map interceptors', () => {
      const positionedPieces = {
        e: { 6: new Pawn('White') },
        f: { 5: new Pawn('Black') },
        g: { 6: new Queen('Black') },
      };
      const interceptors = InterceptorsFactory.create(
        offset,
        positionedPieces,
        moveDirections,
      );
      const [position, piece] = interceptors.get('UpRight') as [
        Position,
        Piece,
      ];

      it('maps an interceptor by move direction', () => {
        expect(position).toMatchObject(new Position('f', 5));
        expect(piece).toMatchObject(new Pawn('Black'));
      });
    });
  });

  describe('for Right', () => {
    const moveDirections = new Set(['Right']) as Set<MoveDirection>;

    describe('to map interceptors', () => {
      const positionedPieces = {
        f: { 4: new Pawn('White') },
        g: { 4: new Queen('Black') },
      };
      const interceptors = InterceptorsFactory.create(
        offset,
        positionedPieces,
        moveDirections,
      );
      const [position, piece] = interceptors.get('Right') as [Position, Piece];

      it('maps an interceptor by move direction', () => {
        expect(position).toMatchObject(new Position('f', 4));
        expect(piece).toMatchObject(new Pawn('White'));
      });
    });
  });

  describe('for DownRight', () => {
    const moveDirections = new Set(['DownRight']) as Set<MoveDirection>;

    describe('to map interceptors', () => {
      const positionedPieces = {
        f: { 3: new Pawn('White') },
        g: { 2: new Queen('Black') },
      };
      const interceptors = InterceptorsFactory.create(
        offset,
        positionedPieces,
        moveDirections,
      );
      const [position, piece] = interceptors.get('DownRight') as [
        Position,
        Piece,
      ];

      it('maps an interceptor by move direction', () => {
        expect(position).toMatchObject(new Position('f', 3));
        expect(piece).toMatchObject(new Pawn('White'));
      });
    });
  });

  describe('for Down', () => {
    const moveDirections = new Set(['Down']) as Set<MoveDirection>;

    describe('to map interceptors', () => {
      const positionedPieces = {
        e: { 2: new Queen('Black'), 3: new Pawn('White') },
      };
      const interceptors = InterceptorsFactory.create(
        offset,
        positionedPieces,
        moveDirections,
      );
      const [position, piece] = interceptors.get('Down') as [Position, Piece];

      it('maps an interceptor by move direction', () => {
        expect(position).toMatchObject(new Position('e', 3));
        expect(piece).toMatchObject(new Pawn('White'));
      });
    });
  });

  describe('for DownLeft', () => {
    const moveDirections = new Set(['DownLeft']) as Set<MoveDirection>;

    describe('to map interceptors', () => {
      const positionedPieces = {
        d: { 3: new Pawn('White') },
        b: { 2: new Queen('Black') },
      };
      const interceptors = InterceptorsFactory.create(
        offset,
        positionedPieces,
        moveDirections,
      );
      const [position, piece] = interceptors.get('DownLeft') as [
        Position,
        Piece,
      ];

      it('maps an interceptor by move direction', () => {
        expect(position).toMatchObject(new Position('d', 3));
        expect(piece).toMatchObject(new Pawn('White'));
      });
    });
  });

  describe('for Left', () => {
    const moveDirections = new Set(['Left']) as Set<MoveDirection>;

    describe('to map interceptors', () => {
      const positionedPieces = {
        c: { 4: new Queen('Black') },
        d: { 4: new Pawn('White') },
      };
      const interceptors = InterceptorsFactory.create(
        offset,
        positionedPieces,
        moveDirections,
      );
      const [position, piece] = interceptors.get('Left') as [Position, Piece];

      it('maps an interceptor by move direction', () => {
        expect(position).toMatchObject(new Position('d', 4));
        expect(piece).toMatchObject(new Pawn('White'));
      });
    });
  });

  describe('for UpLeft', () => {
    const moveDirections = new Set(['UpLeft']) as Set<MoveDirection>;

    describe('to map interceptors', () => {
      const positionedPieces = {
        a: { 8: new Queen('Black') },
        c: { 6: new Pawn('White') },
      };
      const interceptors = InterceptorsFactory.create(
        offset,
        positionedPieces,
        moveDirections,
      );
      const [position, piece] = interceptors.get('UpLeft') as [Position, Piece];

      it('maps an interceptor by move direction', () => {
        expect(position).toMatchObject(new Position('c', 6));
        expect(piece).toMatchObject(new Pawn('White'));
      });
    });
  });
});
