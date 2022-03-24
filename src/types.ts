import { File, Piece, Position, Rank } from '@official-sashimi/chess-models';

// eslint-disable-next-line no-unused-vars
export type PositionedPieces = { [k in File]?: { [k in Rank]?: Piece } };

export type PieceActionContext = {
  subject: Piece;
  in: PositionedPieces;
  at: Position;
};
