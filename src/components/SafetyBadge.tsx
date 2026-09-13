import React from "react";
import { ExperimentMode } from "../types";
import { ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";

interface SafetyBadgeProps {
  mode: ExperimentMode;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const SafetyBadge: React.FC<SafetyBadgeProps> = ({
  mode,
  showText = true,
  size = "md",
  className = ""
}) => {
  const configs = {
    safe: {
      label: "SAFE SIMULATION",
      dot: "🟢",
      icon: ShieldCheck,
      color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
      description: "Appropriate for supervised student laboratory activities or clean simulations."
    },
    "teacher-demo": {
      label: "TEACHER DEMONSTRATION",
      dot: "🟡",
      icon: AlertTriangle,
      color: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
      description: "Requires teacher supervision with fume hood or protective eye wear."
    },
    "simulation-only": {
      label: "SIMULATION ONLY",
      dot: "🔴",
      icon: ShieldAlert,
      color: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30",
      description: "Hazardous or industrial reaction. Do not attempt in school; virtual simulation only."
    }
  };

  const current = configs[mode] || configs.safe;
  const Icon = current.icon;

  const sizeStyles = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-xs font-semibold px-2.5 py-1 gap-1.5",
    lg: "text-sm font-semibold px-3 py-1.5 gap-2"
  };

  return (
    <div
      id={`safety-badge-${mode}`}
      title={current.description}
      className={`inline-flex items-center rounded-full border tracking-wide uppercase font-mono ${current.color} ${sizeStyles[size]} ${className}`}
    >
      <span className="text-xs leading-none">{current.dot}</span>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      {showText && <span>{current.label}</span>}
    </div>
  );
};
