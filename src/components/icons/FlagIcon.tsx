interface FlagIconProps {
  className?: string;
  filled?: boolean;
}

export default function FlagIcon({ className = "", filled = true }: FlagIconProps) {
  if (filled) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-label="Flag"
      >
        <path d="M6 3v18h2v-6h5l1 2h6V5h-6l-1-2H6z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Flag"
    >
      <path d="M6 3v18" />
      <path d="M6 3h8l1 2h5v10h-6l-1-2H6V3z" />
    </svg>
  );
}
