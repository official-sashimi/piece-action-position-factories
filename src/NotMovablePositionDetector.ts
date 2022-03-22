import { Position } from '@official-sashimi/chess-models';
import { PositionedPieces } from './types';

export abstract class NotMovablePositionDetector {
  // eslint-disable-next-line no-useless-constructor
  constructor(readonly positionedPieces: PositionedPieces) {}

  abstract notMovablePositionsOf(offset: Position): Set<Position>;

  protected getPiece(offset: Position) {
    const piece = this.positionedPieces[offset.file]?.[offset.rank];

    if (piece) {
      return piece;
    }

    throw new Error('a piece does not exist on specified offset.');
  }
}
