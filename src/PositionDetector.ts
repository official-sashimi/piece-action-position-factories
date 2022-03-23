import { Position } from '@official-sashimi/chess-models';
import { PositionedPieces } from './types';

export abstract class PositionDetector {
  // eslint-disable-next-line no-useless-constructor
  constructor(readonly positionedPieces: PositionedPieces) {}

  protected getPiece(offset: Position) {
    const piece = this.positionedPieces[offset.file]?.[offset.rank];

    if (piece) {
      return piece;
    }

    throw new Error('a piece does not exist on specified offset.');
  }
}
