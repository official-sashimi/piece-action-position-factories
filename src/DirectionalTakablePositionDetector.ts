import { MoveDirection, Piece, Position } from '@official-sashimi/chess-models';
import { InterceptorsFactory } from './Interceptor';
import { TakablePositionDetector } from './TakablePositionDetector';
import { implementsMoveDirectionResponsible } from './interfaces';

export class DirectionalTakablePositionDetector extends TakablePositionDetector {
  takablePositionsOf(offset: Position): Set<Position> {
    const piece = this.getPiece(offset);
    if (!implementsMoveDirectionResponsible(piece)) {
      throw new Error(
        'The specified piece does not have a move direction getter.',
      );
    }

    const interceptors = this.#getInterceptors(offset);
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
