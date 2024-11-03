export interface ChessMove {
  from: string;
  to: string;
  piece: string;
  capture?: boolean;
  check?: boolean;
  mate?: boolean;
  promotion?: string;
}

export interface ChessGame {
  id: string;
  date: string;
  white: string;
  black: string;
  result: string;
  moves: ChessMove[];
  pgn: string;
}

export interface Position {
  square: string;
  piece: string | null;
}