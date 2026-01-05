"use client";

interface ResetButtonProps {
  onClick: () => void;
}

export default function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-3
        px-8 py-3
        bg-white
        text-[var(--color-standard)] text-lg font-bold tracking-wide
        border-2 border-[var(--color-standard)]
        rounded-xl
        transition-all duration-200
        hover:bg-blue-50 hover:scale-105
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-[var(--color-electric)] focus:ring-offset-2
      "
      aria-label="Restart game"
    >
      RESTART GAME
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
