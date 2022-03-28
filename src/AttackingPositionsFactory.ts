import { Pawn, Position } from '@official-sashimi/chess-models';
import { PieceActionContext } from './types';
import { MovablePositionsFactory } from './MovablePositionsFactory';
import { TakablePositionsFactory } from './TakablePositionsFactory';

export class AttackingPositionsFactory {
  static create(context: PieceActionContext): Set<Position> {
    const { subject: piece } = context;

    const takablePositions = TakablePositionsFactory.create(context);
    if (piece instanceof Pawn) {
      return takablePositions;
    }

    const movablePositions = MovablePositionsFactory.create(context);
    return new Set([...takablePositions, ...movablePositions]);
  }
}
