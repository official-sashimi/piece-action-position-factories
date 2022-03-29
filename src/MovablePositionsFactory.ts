import {
  King,
  Knight,
  Pawn,
  Piece,
  Position,
} from '@official-sashimi/chess-models';
import { DirectionalNotMovablePositionsFactory } from './DirectionalNotMovablePositionsFactory';
import { KingNotMovablePositionsFactory } from './KingNotMovablePositionsFactory';
import { KnightNotMovablePositionsFactory } from './KnightNotMovablePositionsFactory';
import { PawnNotMovablePositionsFactory } from './PawnNotMovablePositionsFactory';
import { PieceActionContext } from './types';

export class MovablePositionsFactory {
  static create(context: PieceActionContext): Set<Position> {
    const { subject: piece, at: offset } = context;

    const factory = this.createNotMovablePositionsFactory(piece);
    const notMovablePositionStrings = Array.from(factory.create(context)).map(
      (p) => p.toString(),
    );
    const movablePositions = Array.from(piece.movablePositionsFrom(offset));

    return new Set(
      movablePositions.filter(
        (p) => !notMovablePositionStrings.includes(p.toString()),
      ),
    );
  }

  private static createNotMovablePositionsFactory(piece: Piece) {
    switch (true) {
      case piece instanceof Pawn:
        return PawnNotMovablePositionsFactory;
      case piece instanceof Knight:
        return KnightNotMovablePositionsFactory;
      case piece instanceof King:
        return KingNotMovablePositionsFactory;
      default:
        return DirectionalNotMovablePositionsFactory;
    }
  }
}
