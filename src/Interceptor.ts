import { MoveDirection, Piece, Position } from '@official-sashimi/chess-models';
import { MovablePositionGetterFactory } from './MovablePositionGetterFactory';
import { PositionSortMethodFactory } from './PositionSortMethodFactory';
import { PositionedPieces } from './types';

export class InterceptorsFactory {
  static create(
    offset: Position,
    positionedPieces: PositionedPieces,
    moveDirections: Set<MoveDirection>,
  ): Map<MoveDirection, [Position, Piece]> {
    const interceptors = new Map();
    Array.from(moveDirections).forEach((moveDirection) => {
      const positionGetter = MovablePositionGetterFactory.create(moveDirection);
      const sortedMovablePositions = Array.from(positionGetter(offset)).sort(
        PositionSortMethodFactory.create(moveDirection),
      );

      for (const position of sortedMovablePositions) {
        const piece = positionedPieces[position.file]?.[position.rank];

        if (piece) {
          interceptors.set(moveDirection, [position, piece]);
          break;
        }
      }
    });

    return interceptors;
  }
}
