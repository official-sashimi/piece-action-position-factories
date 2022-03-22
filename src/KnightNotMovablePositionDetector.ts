import { Knight, Position } from '@official-sashimi/chess-models';
import { NotMovablePositionDetector } from './NotMovablePositionDetector';

export class KnightNotMovablePositionDetector extends NotMovablePositionDetector {
  notMovablePositionsOf(offset: Position) {
    const piece = this.getPiece(offset);

    if (!(piece instanceof Knight)) {
      throw new Error('The specified piece is not a knight.');
    }

    return new Set(
      Array.from(piece.movablePositionsFrom(offset)).filter((position) => {
        return this.positionedPieces[position.file]?.[position.rank];
      }),
    );
  }
}
