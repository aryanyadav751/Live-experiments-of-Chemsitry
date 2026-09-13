import React from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface PrecipitateAnimationProps {
  active: boolean;
  precipitateName?: string;
  precipitateColor?: string;
  stageProgress: number; // 0 to 1 (0: starting to form, 1: settled at bottom)
  reducedMotion?: boolean;
}

export const PrecipitateAnimation: React.FC<PrecipitateAnimationProps> = ({
  active,
  precipitateName = "Insoluble Precipitate",
  precipitateColor = "#ffffff",
  stageProgress,
  reducedMotion = false
}) => {
  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
      {/* "Precipitate formed ✓" Verification Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute top-8 left-3 z-30 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5"
      >
        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        <span>Precipitate Formed ✓</span>
      </motion.div>

      {/* Cloudiness / Turbidity diffusion in middle of solution */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: stageProgress < 0.6 ? stageProgress * 1.4 : Math.max(0.2, 1 - (stageProgress - 0.6) * 1.5),
          scale: [0.9, 1.05, 0.95]
        }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-x-2 bottom-6 top-[40%] rounded-2xl blur-[3px]"
        style={{ backgroundColor: precipitateColor }}
      />

      {/* Settling solid particles sinking downward */}
      {!reducedMotion && (
        <div className="absolute inset-x-3 bottom-6 top-[42%] overflow-hidden">
          {[...Array(18)].map((_, i) => {
            const startX = 8 + (i * 21) % 84;
            const startY = 10 + (i * 13) % 60;
            const duration = 1.6 + (i % 4) * 0.3;

            return (
              <motion.div
                key={i}
                initial={{ y: startY, opacity: 0, scale: 0.6 }}
                animate={{
                  y: [startY, 110],
                  opacity: [0, 0.9, 0.9, 0.2],
                  scale: [0.7, 1.1, 0.9]
                }}
                transition={{
                  repeat: Infinity,
                  duration,
                  delay: (i * 0.1),
                  ease: "easeIn"
                }}
                className="absolute w-2 h-2 rounded-xs shadow-xs"
                style={{
                  left: `${startX}%`,
                  backgroundColor: precipitateColor,
                  border: "1px solid rgba(0,0,0,0.15)"
                }}
              />
            );
          })}
        </div>
      )}

      {/* Compact Solid Precipitate Bed at bottom */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: `${Math.min(32, 10 + stageProgress * 22)}px`,
          opacity: 0.95
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-0 inset-x-0 z-20 flex flex-col items-center justify-center border-t border-black/20 shadow-md"
        style={{ backgroundColor: precipitateColor }}
      >
        <span className="font-mono text-[9px] font-black text-slate-800 dark:text-slate-900 drop-shadow-xs px-1 text-center truncate">
          {precipitateName} ↓
        </span>
      </motion.div>
    </div>
  );
};
