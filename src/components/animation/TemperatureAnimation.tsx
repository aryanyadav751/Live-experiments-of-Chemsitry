import React from "react";
import { motion } from "motion/react";
import { Thermometer, Flame, Snowflake } from "lucide-react";

interface TemperatureAnimationProps {
  tempChange?: "exothermic" | "endothermic" | "neutral";
  tempText?: string;
  stageProgress: number; // 0 to 1
  reducedMotion?: boolean;
}

export const TemperatureAnimation: React.FC<TemperatureAnimationProps> = ({
  tempChange = "neutral",
  tempText,
  stageProgress,
  reducedMotion = false
}) => {
  if (tempChange === "neutral") return null;

  const isExo = tempChange === "exothermic";
  const mercuryHeight = isExo
    ? 25 + stageProgress * 45 // rises from 25% to 70%
    : 65 - stageProgress * 35; // drops from 65% to 30%

  return (
    <div className="absolute top-2 right-2 z-35 flex items-center gap-2 pointer-events-none">
      {/* Immersed Digital / Laboratory Thermometer */}
      <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 px-2.5 py-1 rounded-xl shadow-lg backdrop-blur-xs">
        {/* Thermometer Tube Icon & Bar */}
        <div className="relative w-2.5 h-10 bg-slate-800 rounded-full border border-slate-600 overflow-hidden flex flex-col justify-end p-0.5">
          <motion.div
            animate={{ height: `${mercuryHeight}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className={`w-full rounded-full ${
              isExo ? "bg-rose-500 shadow-sm shadow-rose-500/50" : "bg-cyan-400 shadow-sm shadow-cyan-400/50"
            }`}
          />
        </div>

        <div>
          <div className="flex items-center gap-1">
            {isExo ? (
              <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            ) : (
              <Snowflake className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            )}
            <span className={`text-[10px] font-mono font-bold ${
              isExo ? "text-rose-400" : "text-cyan-300"
            }`}>
              {tempText || (isExo ? "ΔH < 0 (Exothermic)" : "ΔH > 0 (Endothermic)")}
            </span>
          </div>
          <div className="text-[8px] text-slate-400 font-mono">
            Conceptual energy change
          </div>
        </div>
      </div>

      {/* Infrared Heat Shimmer Waves for Exothermic */}
      {isExo && !reducedMotion && (
        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scaleY: [0.95, 1.1, 0.95]
          }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="absolute -top-6 inset-x-0 h-8 bg-gradient-to-t from-rose-500/15 to-transparent blur-[2px] rounded-full pointer-events-none"
        />
      )}
    </div>
  );
};
