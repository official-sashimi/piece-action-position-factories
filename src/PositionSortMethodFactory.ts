import { Position, MoveDirection } from '@official-sashimi/chess-models';

// eslint-disable-next-line no-unused-vars
const METHODS: { [k in MoveDirection]: (a: Position, b: Position) => number } =
  {
    Up: (a, b) => (a.rank > b.rank ? 1 : -1),
    UpRight: (a, b) => (a.rank > b.rank ? 1 : -1),
    Right: (a, b) => (a.file > b.file ? 1 : -1),
    DownRight: (a, b) => (a.rank < b.rank ? 1 : -1),
    Down: (a, b) => (a.rank < b.rank ? 1 : -1),
    DownLeft: (a, b) => (a.rank < b.rank ? 1 : -1),
    Left: (a, b) => (a.file < b.file ? 1 : -1),
    UpLeft: (a, b) => (a.rank > b.rank ? 1 : -1),
  };

export class PositionSortMethodFactory {
  static create(moveDirection: MoveDirection) {
    return METHODS[moveDirection];
  }
}
