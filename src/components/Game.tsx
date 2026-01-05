"use client";

import { useReducer, useCallback, useState } from "react";
import Board from "./Board";
import GameStatus from "./GameStatus";
import ResetButton from "./ResetButton";
import StartScreen from "./StartScreen";
import { CellValue } from "./Cell";

type GameState = "playing" | "shield-wins" | "flag-wins" | "draw";
type CurrentPlayer = "shield" | "flag";

interface State {
  cells: CellValue[];
  currentPlayer: CurrentPlayer;
  gameState: GameState;
  winningCells: number[];
  moveCount: number;
}

type Action =
  | { type: "MAKE_MOVE"; index: number }
  | { type: "RESET_GAME" };

const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

function checkWinner(cells: CellValue[]): { winner: CellValue; winningCells: number[] } {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { winner: cells[a], winningCells: combination };
    }
  }
  return { winner: null, winningCells: [] };
}

function checkDraw(cells: CellValue[]): boolean {
  return cells.every((cell) => cell !== null);
}

const initialState: State = {
  cells: Array(9).fill(null),
  currentPlayer: "flag",
  gameState: "playing",
  winningCells: [],
  moveCount: 0,
};

function gameReducer(state: State, action: Action): State {
  switch (action.type) {
    case "MAKE_MOVE": {
      if (state.gameState !== "playing" || state.cells[action.index] !== null) {
        return state;
      }

      const newCells = [...state.cells];
      newCells[action.index] = state.currentPlayer;

      const { winner, winningCells } = checkWinner(newCells);

      if (winner) {
        return {
          ...state,
          cells: newCells,
          gameState: winner === "shield" ? "shield-wins" : "flag-wins",
          winningCells,
          moveCount: state.moveCount + 1,
        };
      }

      if (checkDraw(newCells)) {
        return {
          ...state,
          cells: newCells,
          gameState: "draw",
          moveCount: state.moveCount + 1,
        };
      }

      return {
        ...state,
        cells: newCells,
        currentPlayer: state.currentPlayer === "shield" ? "flag" : "shield",
        moveCount: state.moveCount + 1,
      };
    }

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
}

export default function Game() {
  const [hasStarted, setHasStarted] = useState(false);
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleStart = useCallback(() => {
    setHasStarted(true);
  }, []);

  const handleCellClick = useCallback((index: number) => {
    dispatch({ type: "MAKE_MOVE", index });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET_GAME" });
  }, []);

  const isGameOver = state.gameState !== "playing";
  const isFirstMove = state.moveCount === 0;

  if (!hasStarted) {
    return <StartScreen onStart={handleStart} />;
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Board
        cells={state.cells}
        onCellClick={handleCellClick}
        disabled={isGameOver}
        winningCells={state.winningCells}
      />

      <div className="flex flex-col items-center gap-4">
        <GameStatus
          gameState={state.gameState}
          currentPlayer={state.currentPlayer}
          isFirstMove={isFirstMove}
        />

        {isGameOver && <ResetButton onClick={handleReset} />}
      </div>
    </div>
  );
}
