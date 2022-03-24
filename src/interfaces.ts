import { MoveDirection } from '@official-sashimi/chess-models';

interface MoveDirectionResponsible {
  moveDirections(): Set<MoveDirection>;
}

export const implementsMoveDirectionResponsible = (
  arg: any,
): arg is MoveDirectionResponsible => {
  return (
    arg !== null &&
    typeof arg === 'object' &&
    typeof arg.moveDirections === 'function'
  );
};
