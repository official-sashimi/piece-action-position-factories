import { Knight, Position } from '@official-sashimi/chess-models';
import { PieceActionContext } from './types';

export class KnightNotMovablePositionsFactory {
  static create(context: PieceActionContext): Set<Position> {
    const { subject: piece, in: positionedPieces, at: offset } = context;

    if (!(piece instanceof Knight)) {
      throw new Error('The specified piece is not a knight.');
    }

    return new Set(
      Array.from(piece.movablePositionsFrom(offset)).filter((position) => {
        return positionedPieces[position.file]?.[position.rank];
      }),
    );
  }
}
