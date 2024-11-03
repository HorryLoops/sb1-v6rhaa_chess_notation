import React, { useState, useEffect } from 'react';
import { ChessGame, ChessMove } from './types/chess';
import { Chessboard } from './components/Chessboard';
import { PgnViewer } from './components/PgnViewer';
import { GameControls } from './components/GameControls';
import { GamesList } from './components/GamesList';
import { saveGame, loadGames } from './utils/storage';
import { INITIAL_POSITION } from './utils/chess';
import { Crown } from 'lucide-react';

function App() {
  const [games, setGames] = useState<ChessGame[]>([]);
  const [currentGame, setCurrentGame] = useState<ChessMove[]>([]);
  const [position, setPosition] = useState<string[]>(INITIAL_POSITION);

  useEffect(() => {
    setGames(loadGames());
  }, []);

  const handleMove = (move: ChessMove) => {
    setCurrentGame([...currentGame, move]);
    
    const newPosition = [...position];
    const fromIndex = getSquareIndex(move.from);
    const toIndex = getSquareIndex(move.to);
    newPosition[toIndex] = newPosition[fromIndex];
    newPosition[fromIndex] = '';
    setPosition(newPosition);
  };

  const handleUndo = () => {
    if (currentGame.length === 0) return;
    
    const lastMove = currentGame[currentGame.length - 1];
    const newPosition = [...position];
    const fromIndex = getSquareIndex(lastMove.from);
    const toIndex = getSquareIndex(lastMove.to);
    newPosition[fromIndex] = newPosition[toIndex];
    newPosition[toIndex] = '';
    
    setPosition(newPosition);
    setCurrentGame(currentGame.slice(0, -1));
  };

  const handleReset = () => {
    setCurrentGame([]);
    setPosition(INITIAL_POSITION);
  };

  const handleSave = () => {
    const newGame: ChessGame = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      white: 'Player 1',
      black: 'Player 2',
      result: '*',
      moves: currentGame,
      pgn: '',
    };
    saveGame(newGame);
    setGames(loadGames());
  };

  const handleLoadGame = (game: ChessGame) => {
    setCurrentGame(game.moves);
    let newPosition = [...INITIAL_POSITION];
    game.moves.forEach(move => {
      const fromIndex = getSquareIndex(move.from);
      const toIndex = getSquareIndex(move.to);
      newPosition[toIndex] = newPosition[fromIndex];
      newPosition[fromIndex] = '';
    });
    setPosition(newPosition);
  };

  const getSquareIndex = (square: string): number => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const file = files.indexOf(square[0]);
    const rank = ranks.indexOf(square[1]);
    return rank * 8 + file;
  };

  return (
    <div className="min-h-screen bg-[#2f2f2f]">
      <header className="bg-[#1a1a1a] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Crown className="w-8 h-8 text-[#f0d9b5] mr-3" />
            <h1 className="text-2xl font-bold text-[#f0d9b5]">Chess Notes</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            <Chessboard
              position={position}
              onMove={handleMove}
            />
            <GameControls
              onReset={handleReset}
              onUndo={handleUndo}
              onSave={handleSave}
              canUndo={currentGame.length > 0}
            />
            <PgnViewer moves={currentGame} />
          </div>
          <div>
            <GamesList
              games={games}
              onLoadGame={handleLoadGame}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;