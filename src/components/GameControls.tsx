import React from 'react';
import { RotateCcw, Save, SkipBack } from 'lucide-react';

interface GameControlsProps {
  onReset: () => void;
  onUndo: () => void;
  onSave: () => void;
  canUndo: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onReset,
  onUndo,
  onSave,
  canUndo
}) => {
  return (
    <div className="mt-4 flex gap-2 justify-center">
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50"
      >
        <SkipBack className="w-4 h-4" />
        Undo
      </button>
      <button
        onClick={onSave}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
      >
        <Save className="w-4 h-4" />
        Save Game
      </button>
    </div>
  );
};