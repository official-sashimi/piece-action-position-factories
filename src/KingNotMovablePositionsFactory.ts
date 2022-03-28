import {
  ALL_RANKS,
  ALL_FILES,
  King,
  Position,
} from '@official-sashimi/chess-models';
import { AttackingPositionsFactory } from './AttackingPositionsFactory';
import { PieceActionContext } from './types';

export class KingNotMovablePositionsFactory {
  static create(context: PieceActionContext): Set<Position> {
    const { subject: piece, in: positionedPieces, at: offset } = context;

    if (!(piece instanceof King)) {
      throw new Error('The specified piece is not a knight.');
    }

    const BeingAttackedPositionStrings = ALL_FILES.map((file) => {
      return ALL_RANKS.map((rank) => {
        const otherPiece = positionedPieces[file]?.[rank];

        // eslint-disable-next-line eqeqeq
        if (otherPiece == undefined) {
          return [];
        }
        if (otherPiece.color === piece.color) {
          return [];
        }

        return Array.from(
          AttackingPositionsFactory.create({
            subject: otherPiece,
            in: positionedPieces,
            at: new Position(file, rank),
          }),
        );
      }).flat();
    })
      .flat()
      .map((p) => p.toString());

    return new Set(
      Array.from(piece.movablePositionsFrom(offset)).filter((position) => {
        const otherPiece = positionedPieces[position.file]?.[position.rank];
        return (
          (otherPiece && otherPiece.color === piece.color) ||
          BeingAttackedPositionStrings.includes(position.toString())
        );
      }),
    );
  }
}
