import { Position } from '@official-sashimi/chess-models';
import { PositionDetector } from './PositionDetector';

export abstract class TakablePositionDetector extends PositionDetector {
  abstract takablePositionsOf(offset: Position): Set<Position>;
}
