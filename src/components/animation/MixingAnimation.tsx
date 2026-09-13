import React from "react";
import { motion } from "motion/react";

interface MixingAnimationProps {
  isMixing: boolean;
  speed?: number; // 0.5, 1, 2
  reducedMotion?: boolean;
}

export const MixingAnimation: React.FC<MixingAnimationProps> = ({
  isMixing,
  speed = 1,
  reducedMotion = false
}) => {
  if (!isMixing) return null;

  const duration = (1.4 / speed);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 flex items-center justify-center">
      {/* Central Swirling Vortex Funnel */}
      <motion.div
        animate={
          reducedMotion
            ? { opacity: [0.3, 0.6, 0.3] }
            : {
                rotate: [0, 360],
                scale: [0.95, 1.05, 0.95]
              }
        }
        transition={{
          repeat: Infinity,
          duration,
          ease: "linear"
        }}
        className="relative w-32 h-32 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center opacity-70"
      >
        <div className="w-20 h-20 rounded-full border border-dotted border-white/40" />
        <div className="w-8 h-8 rounded-full bg-white/20 blur-[1px]" />
      </motion.div>

      {/* Swirling Tracer Particles */}
      {!reducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(14)].map((_, i) => {
            const radius = 25 + (i % 4) * 12;
            const startAngle = (i * 360) / 14;
            return (
              <motion.div
                key={i}
                animate={{
                  rotate: [startAngle, startAngle + 360]
                }}
                transition={{
                  repeat: Infinity,
                  duration: (1.2 + (i % 3) * 0.3) / speed,
                  ease: "linear"
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  width: `${radius * 2}px`,
                  height: `${radius * 2}px`
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-xs blur-[0.2px]" />
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Mixing Indicator Tag */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/80 border border-blue-400/50 text-blue-300 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-lg backdrop-blur-xs flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
        <span>Vigorous Swirling & Dispersion</span>
      </div>
    </div>
  );
};
