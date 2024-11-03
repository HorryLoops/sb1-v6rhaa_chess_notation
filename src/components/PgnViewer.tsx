import React from 'react';
import { ChessMove } from '../types/chess';
import { gameHistoryToPgn } from '../utils/pgn';

interface PgnViewerProps {
  moves: ChessMove[];
}

export const PgnViewer: React.FC<PgnViewerProps> = ({ moves }) => {
  const pgn = gameHistoryToPgn(moves);

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Game Notation</h2>
      <div className="font-mono bg-gray-50 p-3 rounded border overflow-x-auto">
        {pgn || 'No moves yet'}
      </div>
    </div>
  );
};