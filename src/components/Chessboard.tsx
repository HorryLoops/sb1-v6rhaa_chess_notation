import React, { useState } from 'react';
import { ChessMove } from '../types/chess';
import { getPieceType, isPieceWhite } from '../utils/chess';

interface ChessboardProps {
  position: string[];
  onMove: (move: ChessMove) => void;
}

export const Chessboard: React.FC<ChessboardProps> = ({ position, onMove }) => {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);
  const [draggedPiece, setDraggedPiece] = useState<string | null>(null);

  const getSquareIndex = (square: string): number => {
    const file = files.indexOf(square[0]);
    const rank = ranks.indexOf(square[1]);
    return rank * 8 + file;
  };

  const handleDragStart = (e: React.DragEvent, square: string) => {
    const index = getSquareIndex(square);
    const piece = position[index];
    if (!piece) return;

    setDraggedFrom(square);
    setDraggedPiece(piece);
    e.dataTransfer.setData('text/plain', square);
    e.dataTransfer.effectAllowed = 'move';

    const dragImage = document.createElement('div');
    dragImage.className = 'text-5xl';
    dragImage.textContent = piece;
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 35, 35);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, toSquare: string) => {
    e.preventDefault();
    if (!draggedFrom || !draggedPiece) return;

    const move: ChessMove = {
      from: draggedFrom,
      to: toSquare,
      piece: getPieceType(draggedPiece),
      capture: position[getSquareIndex(toSquare)] !== '',
    };

    onMove(move);
    setDraggedFrom(null);
    setDraggedPiece(null);
  };

  const handleDragEnd = () => {
    setDraggedFrom(null);
    setDraggedPiece(null);
  };

  return (
    <div className="aspect-square w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4">
      <div className="grid grid-cols-8 gap-0 aspect-square border-2 border-gray-800">
        {ranks.map((rank) =>
          files.map((file) => {
            const square = file + rank;
            const isLight = (files.indexOf(file) + ranks.indexOf(rank)) % 2 === 0;
            const index = getSquareIndex(square);
            const piece = position[index];
            const isDragging = draggedFrom === square;

            return (
              <div
                key={square}
                className={`
                  aspect-square flex items-center justify-center text-5xl select-none transition-colors
                  ${isLight ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'}
                  ${isLight ? 'hover:bg-[#cdb891]' : 'hover:bg-[#9b7455]'}
                  ${piece ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}
                  ${isDragging ? 'opacity-50' : 'opacity-100'}
                `}
                draggable={!!piece}
                onDragStart={(e) => handleDragStart(e, square)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, square)}
                onDragEnd={handleDragEnd}
              >
                {piece && (
                  <span className={`
                    ${isPieceWhite(piece) ? 'text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]' : 'text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.5)]'}
                  `}>
                    {piece}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
      
      {/* File labels (a-h) */}
      <div className="grid grid-cols-8 mt-1 text-center text-sm text-gray-600">
        {files.map(file => (
          <div key={file}>{file}</div>
        ))}
      </div>
      
      {/* Rank labels (1-8) */}
      <div className="absolute -left-6 top-4 grid grid-rows-8 gap-0 h-[calc(100%-2rem)] text-sm text-gray-600">
        {ranks.map(rank => (
          <div key={rank} className="flex items-center">{rank}</div>
        ))}
      </div>
    </div>
  );
};