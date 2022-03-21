import { Position } from '@official-sashimi/chess-models';
import { PositionedPieces } from './types';

export abstract class NotMovablePositionDetector {
  // eslint-disable-next-line no-useless-constructor
  constructor(readonly positionedPieces: PositionedPieces) {}

  abstract notMovablePositionsOf(offset: Position): Set<Position>;
}
