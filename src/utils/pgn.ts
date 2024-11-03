import { ChessMove } from '../types/chess';

export const moveToPgn = (move: ChessMove): string => {
  if (!move || !move.piece) return '';
  
  let pgn = '';
  
  // Add piece symbol (except for pawns)
  if (move.piece.toLowerCase() !== 'p') {
    pgn += move.piece.toUpperCase();
  }
  
  // Add capture symbol
  if (move.capture) {
    if (move.piece.toLowerCase() === 'p') {
      pgn += move.from[0];
    }
    pgn += 'x';
  }
  
  // Add destination square
  pgn += move.to;
  
  // Add promotion
  if (move.promotion) {
    pgn += '=' + move.promotion.toUpperCase();
  }
  
  // Add check/mate
  if (move.mate) {
    pgn += '#';
  } else if (move.check) {
    pgn += '+';
  }
  
  return pgn;
};

export const gameHistoryToPgn = (moves: ChessMove[]): string => {
  return moves.map((move, index) => {
    const moveNumber = Math.floor(index / 2) + 1;
    const notation = moveToPgn(move);
    return index % 2 === 0 ? `${moveNumber}. ${notation}` : notation;
  }).join(' ');
};