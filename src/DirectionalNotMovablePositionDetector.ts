import { MoveDirection, Piece, Position } from '@official-sashimi/chess-models';
import { InterceptorsFactory } from './Interceptor';
import { MovablePositionGetterFactory } from './MovablePositionGetterFactory';
import { NotMovablePositionDetector } from './NotMovablePositionDetector';
import { PositionSortMethodFactory } from './PositionSortMethodFactory';

export interface MoveDirectionResponsible {
  moveDirections(): Set<MoveDirection>;
}

const implementsMoveDirectionResponsible = (
  arg: any,
): arg is MoveDirectionResponsible => {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.moveDirections === 'function'
  );
};

export class DirectionalNotMovablePositionDetector extends NotMovablePositionDetector {
  notMovablePositionsOf(offset: Position) {
    const piece = this.getPiece(offset);
    if (!implementsMoveDirectionResponsible(piece)) {
      throw new Error(
        'The specified piece does not have a move direction getter.',
      );
    }

    const interceptors = this.#getInterceptors(offset);
    const notMovablePositions = Array.from(piece.moveDirections())
      .map((moveDirection) => {
        const interceptor = interceptors.get(moveDirection);
        // eslint-disable-next-line eqeqeq
        if (interceptor == undefined) {
          return [];
        }

        const positionGetter =
          MovablePositionGetterFactory.create(moveDirection);
        const sortedMovablePositions = Array.from(positionGetter(offset)).sort(
          PositionSortMethodFactory.create(moveDirection),
        );

        const [interceptorPosition] = interceptor;
        const boundaryIndex = sortedMovablePositions
          .map((p) => p.toString())
          .indexOf(interceptorPosition.toString());

        return sortedMovablePositions.slice(boundaryIndex);
      })
      .flat();
    return new Set(notMovablePositions);
  }

  #getInterceptors(offset: Position): Map<MoveDirection, [Position, Piece]> {
    const piece = this.getPiece(offset);

    if (implementsMoveDirectionResponsible(piece)) {
      return InterceptorsFactory.create(
        offset,
        this.positionedPieces,
        piece.moveDirections(),
      );
    }

    throw new Error(
      'The specified piece does not have a move direction getter.',
    );
  }
}
