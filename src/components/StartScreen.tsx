"use client";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      <button
        onClick={onStart}
        className="
          flex items-center gap-4
          px-12 py-4
          bg-white
          text-[var(--color-standard)] text-xl font-bold tracking-wide
          border-2 border-[var(--color-standard)]
          rounded-xl
          transition-all duration-200
          hover:bg-blue-50 hover:scale-105
          active:scale-95
          focus:outline-none focus:ring-2 focus:ring-[var(--color-electric)] focus:ring-offset-2
        "
        aria-label="Start game"
      >
        START GAME
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
