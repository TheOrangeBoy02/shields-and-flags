"use client";

import ShieldIcon from "./icons/ShieldIcon";
import FlagIcon from "./icons/FlagIcon";

type GameState = "playing" | "shield-wins" | "flag-wins" | "draw";
type CurrentPlayer = "shield" | "flag";

interface GameStatusProps {
  gameState: GameState;
  currentPlayer: CurrentPlayer;
  isFirstMove: boolean;
}

export default function GameStatus({ gameState, currentPlayer, isFirstMove }: GameStatusProps) {
  const isGameOver = gameState !== "playing";
  const isWin = gameState === "shield-wins" || gameState === "flag-wins";

  const getMessage = () => {
    switch (gameState) {
      case "shield-wins":
        return (
          <div className="flex items-center gap-3">
            <ShieldIcon className="w-6 h-6" filled={true} />
            <span>SHIELDS WIN</span>
          </div>
        );
      case "flag-wins":
        return (
          <div className="flex items-center gap-3">
            <FlagIcon className="w-6 h-6" filled={true} />
            <span>FLAGS WIN</span>
          </div>
        );
      case "draw":
        return <span>IT&apos;S A DRAW</span>;
      case "playing":
        return currentPlayer === "shield" ? (
          <div className="flex items-center gap-3">
            <ShieldIcon className="w-6 h-6" filled={false} />
            <span>{isFirstMove ? "SHIELDS START" : "SHIELDS TURN"}</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <FlagIcon className="w-6 h-6" filled={true} />
            <span>{isFirstMove ? "FLAGS START" : "FLAGS TURN"}</span>
          </div>
        );
    }
  };

  const baseClasses = `
    flex items-center justify-center
    py-3 px-8
    text-lg font-bold tracking-wide
    rounded-xl
    transition-all duration-300
  `;

  const stateClasses = isWin
    ? "bg-[var(--color-electric)] text-white"
    : gameState === "draw"
    ? "bg-gray-500 text-white"
    : "bg-white text-[var(--color-standard)] border-2 border-[var(--color-standard)]";

  return (
    <div
      className={`${baseClasses} ${stateClasses}`}
      role="status"
      aria-live="polite"
    >
      {getMessage()}
    </div>
  );
}
