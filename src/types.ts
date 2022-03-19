import { File, Piece, Rank } from '@official-sashimi/chess-models';

// eslint-disable-next-line no-unused-vars
export type PositionedPieces = { [k in File]?: { [k in Rank]?: Piece } };
