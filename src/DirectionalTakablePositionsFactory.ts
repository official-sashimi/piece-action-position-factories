import { Position } from '@official-sashimi/chess-models';
import { InterceptorsFactory } from './Interceptor';
import { implementsMoveDirectionResponsible } from './interfaces';
import { PieceActionContext } from './types';

export class DirectionalTakablePositionsFactory {
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

    const takablePositions = Array.from(piece.moveDirections())
      .map((moveDirection) => {
        const interceptor = interceptors.get(moveDirection);
        // eslint-disable-next-line eqeqeq
        if (interceptor == undefined) {
          return [];
        }
        const [interceptorPosition, interceptingPiece] = interceptor;
        return piece.color === interceptingPiece.color
          ? []
          : [interceptorPosition];
      })
      .flat();
    return new Set(takablePositions);
  }
}
