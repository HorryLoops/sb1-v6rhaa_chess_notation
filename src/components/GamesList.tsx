import React from 'react';
import { ChessGame } from '../types/chess';
import { PlayCircle } from 'lucide-react';

interface GamesListProps {
  games: ChessGame[];
  onLoadGame: (game: ChessGame) => void;
}

export const GamesList: React.FC<GamesListProps> = ({ games, onLoadGame }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Saved Games</h2>
      {games.length === 0 ? (
        <p className="text-gray-500">No saved games yet</p>
      ) : (
        <div className="space-y-2">
          {games.map((game) => (
            <div
              key={game.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div>
                <p className="font-medium">
                  {game.white} vs {game.black}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(game.date).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => onLoadGame(game)}
                className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
              >
                <PlayCircle className="w-5 h-5" />
                Load
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};