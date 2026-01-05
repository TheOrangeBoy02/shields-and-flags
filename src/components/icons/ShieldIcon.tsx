interface ShieldIconProps {
  className?: string;
  filled?: boolean;
}

export default function ShieldIcon({ className = "", filled = false }: ShieldIconProps) {
  if (filled) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-label="Shield"
      >
        <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" />
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
      aria-label="Shield"
    >
      <path d="M12 3L4 7v5c0 5.25 3.4 10.2 8 11.5 4.6-1.3 8-6.25 8-11.5V7l-8-4z" />
    </svg>
  );
}
