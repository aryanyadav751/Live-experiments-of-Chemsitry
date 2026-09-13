import React from "react";

interface ProgressBarProps {
  percentage: number;
  label?: string;
  showPercent?: boolean;
  color?: string;
  className?: string;
  height?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  label,
  showPercent = true,
  color = "bg-blue-600",
  className = "",
  height = "h-2"
}) => {
  const clamped = Math.min(100, Math.max(0, percentage));

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
          {label && <span className="text-slate-600 dark:text-slate-400">{label}</span>}
          {showPercent && <span className="font-mono text-slate-800 dark:text-slate-200">{clamped}%</span>}
        </div>
      )}
      <div className={`w-full ${height} rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden`}>
        <div
          className={`${height} rounded-full ${color} transition-all duration-500`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
