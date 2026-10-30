"use client";

import { useState } from "react";
import Image from "next/image";
import Game from "@/components/Game";
export default function HomeClient() {
  const [hasStarted, setHasStarted] = useState(false);
  // Bumping the key remounts Game so its board resets when returning to start.
  const [gameKey, setGameKey] = useState(0);

  const handleBack = () => {
    setHasStarted(false);
    setGameKey((k) => k + 1);
  };

  return (
    // In landscape (e.g. iPad held sideways) the game view splits into a logo
    // column on the left and the board on the right.
    <div
      className={`h-[100dvh] flex flex-col overflow-hidden ${
        hasStarted ? "landscape:flex-row" : ""
      }`}
    >
      {/* Back navigation — only shown in-game */}
      {hasStarted && (
        <button
          onClick={handleBack}
          aria-label="Back to start screen"
          className="
            absolute top-4 left-4 z-20
            flex items-center justify-center
            w-11 h-11 rounded-full
            text-[var(--color-standard)]
            bg-white/80 backdrop-blur
            transition-all duration-200
            hover:bg-blue-50 hover:scale-105
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-[var(--color-electric)]
          "
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Header — centered on the start screen, animates to the top in-game */}
      <header
        className={`flex flex-col items-center shrink-0 transition-[padding] duration-700 ease-in-out ${
          hasStarted
            ? "portrait:pt-6 portrait:pb-4 portrait:sm:pt-12 portrait:sm:pb-8 landscape:w-[38%] landscape:justify-center landscape:pl-8"
            : "pt-[28vh] pb-4"
        }`}
      >
        <Image
          src="/Shields&Flags-top.png"
          alt="Shields & Flags"
          width={663}
          height={280}
          priority
          className={`h-auto w-[min(60vw,240px)] ${
            hasStarted ? "portrait:sm:w-[280px] landscape:w-[min(28vw,340px)]" : "sm:w-[280px]"
          }`}
        />
      </header>

      {/* Main Game Area */}
      <main
        className={`flex-1 min-h-0 flex justify-center px-4 ${
          hasStarted ? "items-center landscape:py-8 landscape:pr-8" : "items-start"
        }`}
      >
        <Game key={gameKey} hasStarted={hasStarted} onStart={() => setHasStarted(true)} />
      </main>
    </div>
  );
}
