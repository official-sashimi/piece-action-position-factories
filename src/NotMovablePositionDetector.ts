import { Position } from '@official-sashimi/chess-models';
import { PositionDetector } from './PositionDetector';

export abstract class NotMovablePositionDetector extends PositionDetector {
  abstract notMovablePositionsOf(offset: Position): Set<Position>;
}
