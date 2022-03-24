import { Position } from '@official-sashimi/chess-models';
import { PieceActionContext } from './types';
import { InterceptorsFactory } from './Interceptor';
import { MovablePositionGetterFactory } from './MovablePositionGetterFactory';
import { PositionSortMethodFactory } from './PositionSortMethodFactory';
import { implementsMoveDirectionResponsible } from './interfaces';

export class DirectionalNotMovablePositionsFactory {
  static create(context: PieceActionContext): Set<Position> {
    const { subject: piece, in: positionedPieces, at: offset } = context;

    if (!implementsMoveDirectionResponsible(piece)) {
      throw new Error(
        'The specified piece does not have a move direction getter.',
      );
    }

    const interceptors = InterceptorsFactory.create(
      offset,
      positionedPieces,
      piece.moveDirections(),
    );

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
}
