import { Pawn, Position } from '@official-sashimi/chess-models';
import { NotMovablePositionDetector } from './NotMovablePositionDetector';

export class PawnNotMovablePositionDetector extends NotMovablePositionDetector {
  notMovablePositionsOf(offset: Position) {
    const piece = this.getPiece(offset);

    if (!(piece instanceof Pawn)) {
      throw new Error('The specified piece is not a pawn.');
    }

    const movablePositions = piece.movablePositionsFrom(offset);

    if (movablePositions.size === 1) {
      const persistedPiece = Array.from(movablePositions).find(
        (position) => this.positionedPieces[position.file]?.[position.rank],
      );
      return persistedPiece ? movablePositions : new Set([]);
    }

    const interceptor = Array.from(movablePositions).find(
      (position) =>
        this.positionedPieces[position.file]?.[position.rank] &&
        [3, 6].includes(position.rank),
    );
    if (interceptor) {
      return new Set(movablePositions);
    }

    return new Set(
      Array.from(movablePositions).filter((position) => {
        return this.positionedPieces[position.file]?.[position.rank];
      }),
    );
  }
}
