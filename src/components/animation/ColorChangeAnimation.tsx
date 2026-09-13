import React from "react";
import { motion } from "motion/react";

interface ColorChangeAnimationProps {
  initialColor: string;
  finalColor: string;
  isChanging: boolean;
  progress: number; // 0 to 1
  reducedMotion?: boolean;
}

export const ColorChangeAnimation: React.FC<ColorChangeAnimationProps> = ({
  initialColor,
  finalColor,
  isChanging,
  progress
}) => {
  if (initialColor.toLowerCase() === finalColor.toLowerCase()) return null;

  return (
    <div className="absolute top-2 left-2 z-35 flex items-center gap-1.5 bg-slate-900/85 border border-slate-700/70 px-2 py-1 rounded-xl shadow-md backdrop-blur-xs pointer-events-none">
      <div className="flex items-center gap-1">
        <span
          className="w-3 h-3 rounded-full border border-white/40 shadow-xs"
          style={{ backgroundColor: initialColor }}
          title="Initial Color"
        />
        <motion.span
          animate={{ x: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-[10px] text-slate-400"
        >
          →
        </motion.span>
        <span
          className="w-3 h-3 rounded-full border border-white/40 shadow-xs"
          style={{ backgroundColor: finalColor }}
          title="Final Color"
        />
      </div>
      <span className="text-[9px] font-mono font-bold text-slate-300">
        {isChanging ? `Transitioning (${Math.round(progress * 100)}%)` : "Colour Shift"}
      </span>
    </div>
  );
};
