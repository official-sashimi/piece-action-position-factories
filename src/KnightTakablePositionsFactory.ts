import { Knight, Position } from '@official-sashimi/chess-models';
import { PieceActionContext } from './types';

export class KnightTakablePositionsFactory {
  static create(context: PieceActionContext): Set<Position> {
    const { subject: piece, in: positionedPieces, at: offset } = context;

    if (!(piece instanceof Knight)) {
      throw new Error('The specified piece is not a knight.');
    }

    return new Set(
      Array.from(piece.movablePositionsFrom(offset)).filter((position) => {
        const existingPiece = positionedPieces[position.file]?.[position.rank];
        return existingPiece && existingPiece.color !== piece.color;
      }),
    );
  }
}
