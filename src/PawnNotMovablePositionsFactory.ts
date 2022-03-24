import { Pawn, Position } from '@official-sashimi/chess-models';
import { PieceActionContext } from './types';

export class PawnNotMovablePositionsFactory {
  static create(context: PieceActionContext): Set<Position> {
    const { subject: piece, in: positionedPieces, at: offset } = context;

    if (!(piece instanceof Pawn)) {
      throw new Error('The specified piece is not a pawn.');
    }

    const movablePositions = piece.movablePositionsFrom(offset);

    if (movablePositions.size === 1) {
      const persistedPiece = Array.from(movablePositions).find(
        (position) => positionedPieces[position.file]?.[position.rank],
      );
      return persistedPiece ? movablePositions : new Set([]);
    }

    const interceptor = Array.from(movablePositions).find(
      (position) =>
        positionedPieces[position.file]?.[position.rank] &&
        [3, 6].includes(position.rank),
    );
    if (interceptor) {
      return new Set(movablePositions);
    }

    return new Set(
      Array.from(movablePositions).filter((position) => {
        return positionedPieces[position.file]?.[position.rank];
      }),
    );
  }
}
