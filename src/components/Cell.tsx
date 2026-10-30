"use client";

import ShieldIcon from "./icons/ShieldIcon";
import FlagIcon from "./icons/FlagIcon";

export type CellValue = "shield" | "flag" | null;

interface CellProps {
  value: CellValue;
  onClick: () => void;
  disabled: boolean;
  isWinningCell: boolean;
}

export default function Cell({ value, onClick, disabled, isWinningCell }: CellProps) {
  return (
    <button
      className={`
        w-full h-full
        flex items-center justify-center
        bg-transparent rounded-lg
        transition-all duration-200 ease-in-out
        focus:outline-none focus:bg-blue-50/50
        ${!disabled && !value ? "cursor-pointer hover:bg-blue-100" : ""}
        ${disabled || value ? "cursor-default" : ""}
      `}
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={value ? `Cell contains ${value}` : "Empty cell"}
    >
      {value === "shield" && (
          <img
            src="/Shield@4x.png"
            alt="Shield"
            className="h-[60%] w-auto object-contain transition-transform duration-300 animate-[scaleIn_0.3s_ease-out]"
          />
      )}
      {value === "flag" && (
          <img
            src="/Flag@4x.png"
            alt="Flag"
            className="h-[60%] w-auto object-contain transition-transform duration-300 animate-[scaleIn_0.3s_ease-out]"
          />
      )}
    </button>
  );
}
