export const INITIAL_POSITION = [
  '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜', // Black pieces (8th rank)
  '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟', // Black pawns (7th rank)
  '', '', '', '', '', '', '', '',           // Empty squares (6th rank)
  '', '', '', '', '', '', '', '',           // Empty squares (5th rank)
  '', '', '', '', '', '', '', '',           // Empty squares (4th rank)
  '', '', '', '', '', '', '', '',           // Empty squares (3rd rank)
  '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙', // White pawns (2nd rank)
  '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'  // White pieces (1st rank)
];

export const getPieceType = (piece: string): string => {
  const pieceMap: { [key: string]: string } = {
    '♔': 'K', '♚': 'k',
    '♕': 'Q', '♛': 'q',
    '♖': 'R', '♜': 'r',
    '♗': 'B', '♝': 'b',
    '♘': 'N', '♞': 'n',
    '♙': 'P', '♟': 'p'
  };
  return pieceMap[piece] || '';
};

export const isPieceWhite = (piece: string): boolean => {
  return '♔♕♖♗♘♙'.includes(piece);
};