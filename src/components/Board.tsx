"use client";

import Cell, { CellValue } from "./Cell";

interface BoardProps {
  cells: CellValue[];
  onCellClick: (index: number) => void;
  disabled: boolean;
  winningCells: number[];
}

function getWinningLineStyle(winningCells: number[]): React.CSSProperties | null {
  if (winningCells.length !== 3) return null;

  const [a, b, c] = winningCells.sort((x, y) => x - y);

  // Horizontal lines
  if (a === 0 && b === 1 && c === 2) {
    return { top: "16.67%", left: "5%", width: "90%", height: "4px", transform: "translateY(-50%)" };
  }
  if (a === 3 && b === 4 && c === 5) {
    return { top: "50%", left: "5%", width: "90%", height: "4px", transform: "translateY(-50%)" };
  }
  if (a === 6 && b === 7 && c === 8) {
    return { top: "83.33%", left: "5%", width: "90%", height: "4px", transform: "translateY(-50%)" };
  }

  // Vertical lines
  if (a === 0 && b === 3 && c === 6) {
    return { left: "16.67%", top: "5%", height: "90%", width: "4px", transform: "translateX(-50%)" };
  }
  if (a === 1 && b === 4 && c === 7) {
    return { left: "50%", top: "5%", height: "90%", width: "4px", transform: "translateX(-50%)" };
  }
  if (a === 2 && b === 5 && c === 8) {
    return { left: "83.33%", top: "5%", height: "90%", width: "4px", transform: "translateX(-50%)" };
  }

  // Diagonal lines
  if (a === 0 && b === 4 && c === 8) {
    return { top: "50%", left: "50%", width: "120%", height: "4px", transform: "translate(-50%, -50%) rotate(45deg)" };
  }
  if (a === 2 && b === 4 && c === 6) {
    return { top: "50%", left: "50%", width: "120%", height: "4px", transform: "translate(-50%, -50%) rotate(-45deg)" };
  }

  return null;
}

export default function Board({ cells, onCellClick, disabled, winningCells }: BoardProps) {
  const winningLineStyle = getWinningLineStyle(winningCells);

  return (
    <div className="relative">
      {/* Board grid with lines */}
      <div
        className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px]"
        role="grid"
        aria-label="Game board"
      >
        {/* Vertical lines - animated */}
        <div
          className="absolute left-[33.33%] top-[8%] bottom-[8%] w-[2px] bg-black animate-draw-vertical opacity-0"
          style={{ animationDelay: "0.1s" }}
        />
        <div
          className="absolute left-[66.67%] top-[8%] bottom-[8%] w-[2px] bg-black animate-draw-vertical opacity-0"
          style={{ animationDelay: "0.2s" }}
        />

        {/* Horizontal lines - animated */}
        <div
          className="absolute top-[33.33%] left-[8%] right-[8%] h-[2px] bg-black animate-draw-horizontal opacity-0"
          style={{ animationDelay: "0.3s" }}
        />
        <div
          className="absolute top-[66.67%] left-[8%] right-[8%] h-[2px] bg-black animate-draw-horizontal opacity-0"
          style={{ animationDelay: "0.4s" }}
        />

        {/* Cells */}
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
          {cells.map((cell, index) => (
            <Cell
              key={index}
              value={cell}
              onClick={() => onCellClick(index)}
              disabled={disabled}
              isWinningCell={winningCells.includes(index)}
            />
          ))}
        </div>

        {/* Winning line */}
        {winningLineStyle && (
          <div
            className="absolute bg-[#7CB9E8] rounded-full pointer-events-none z-10"
            style={winningLineStyle}
          />
        )}
      </div>
    </div>
  );
}
