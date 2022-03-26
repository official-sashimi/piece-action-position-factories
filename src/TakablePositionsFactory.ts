import { Knight, Pawn, Piece, Position } from '@official-sashimi/chess-models';
import { DirectionalTakablePositionsFactory } from './DirectionalTakablePositionsFactory';
import { KnightTakablePositionsFactory } from './KnightTakablePositionsFactory';
import { PawnTakablePositionsFactory } from './PawnTakablePositionsFactory';
import { PieceActionContext } from './types';

export class TakablePositionsFactory {
  static create(context: PieceActionContext): Set<Position> {
    const { subject: piece } = context;

    const factory = this.createTakablePositionsFactory(piece);
    return factory.create(context);
  }

  private static createTakablePositionsFactory(piece: Piece) {
    switch (true) {
      case piece instanceof Pawn:
        return PawnTakablePositionsFactory;
      case piece instanceof Knight:
        return KnightTakablePositionsFactory;
      default:
        return DirectionalTakablePositionsFactory;
    }
  }
}
