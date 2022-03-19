import { Position, MoveDirection } from '@official-sashimi/chess-models';

const GETTERS = {
  Up: Position.allUpsFrom,
  UpRight: Position.allUpRightsFrom,
  Right: Position.allRightsFrom,
  DownRight: Position.allDownRightsFrom,
  Down: Position.allDownsFrom,
  DownLeft: Position.allDownLeftsFrom,
  Left: Position.allLeftsFrom,
  UpLeft: Position.allUpLeftsFrom,
};

export class MovablePositionGetterFactory {
  static create(
    moveDirection: MoveDirection,
  ): (offset: Position) => Set<Position> {
    return GETTERS[moveDirection];
  }
}
