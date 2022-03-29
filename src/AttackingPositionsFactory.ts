import { King, Pawn, Position } from '@official-sashimi/chess-models';
import { PieceActionContext } from './types';
import { MovablePositionsFactory } from './MovablePositionsFactory';
import { TakablePositionsFactory } from './TakablePositionsFactory';

export class AttackingPositionsFactory {
  static create(context: PieceActionContext): Set<Position> {
    const { subject: piece, at: offset } = context;

    if (piece instanceof Pawn || piece instanceof King) {
      return piece.takablePositionsFrom(offset);
    }

    const takablePositions = TakablePositionsFactory.create(context);
    const movablePositions = MovablePositionsFactory.create(context);
    return new Set([...takablePositions, ...movablePositions]);
  }
}
