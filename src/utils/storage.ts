import { ChessGame } from '../types/chess';

const STORAGE_KEY = 'chess-games';

export const saveGame = (game: ChessGame): void => {
  const games = loadGames();
  games.push(game);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
};

export const loadGames = (): ChessGame[] => {
  const gamesJson = localStorage.getItem(STORAGE_KEY);
  return gamesJson ? JSON.parse(gamesJson) : [];
};