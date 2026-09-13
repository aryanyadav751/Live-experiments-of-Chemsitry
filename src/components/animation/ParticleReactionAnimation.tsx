import React from "react";
import { motion } from "motion/react";

interface ParticleReactionAnimationProps {
  hasDeposit: boolean;
  depositText?: string;
  depositColor?: string;
  progress: number; // 0 to 1
  reducedMotion?: boolean;
}

export const ParticleReactionAnimation: React.FC<ParticleReactionAnimationProps> = ({
  hasDeposit,
  depositText = "Reddish-brown Copper (Cu)",
  depositColor = "#9a3412",
  progress,
  reducedMotion = false
}) => {
  if (!hasDeposit) return null;

  // Solid Iron nail or plate submerged in the center of the vessel
  return (
    <div className="absolute inset-x-0 bottom-4 top-16 flex flex-col items-center justify-center pointer-events-none z-22">
      {/* Submerged Metal Object (e.g. Iron nail / plate) */}
      <div className="relative flex flex-col items-center">
        {/* Metal suspension thread/wire */}
        <div className="w-[1.5px] h-12 bg-slate-400 opacity-60" />

        {/* The Metal Core (e.g. Grey Iron Nail) */}
        <div className="relative w-7 sm:w-8 h-28 sm:h-32 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500 rounded-t-sm rounded-b-full border border-slate-600 shadow-xl overflow-hidden flex flex-col items-center justify-between p-1">
          {/* Iron label */}
          <span className="text-[9px] font-mono font-bold text-slate-800 bg-white/70 px-1 rounded-xs">
            Fe (s)
          </span>

          {/* Growing Reddish-Brown Deposited Copper Layer */}
          <motion.div
            animate={{
              height: `${Math.min(100, progress * 105)}%`,
              opacity: Math.min(0.95, 0.2 + progress * 0.8)
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-x-0 bottom-0 rounded-b-full shadow-inner flex flex-col items-center justify-end pb-1"
            style={{
              backgroundColor: depositColor,
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "6px 6px"
            }}
          >
            {progress > 0.4 && (
              <span className="text-[7px] font-mono font-bold text-white drop-shadow-xs text-center px-0.5 truncate">
                Cu deposit
              </span>
            )}
          </motion.div>
        </div>

        {/* Microscopic Cu²⁺ Ion Transfer Dots */}
        {!reducedMotion && progress > 0.1 && progress < 0.9 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [(i % 2 === 0 ? -30 : 30), 0],
                  y: [(i * 12) - 40, (i * 12) - 40],
                  opacity: [0, 0.9, 0],
                  scale: [1, 0.6]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
                className="absolute w-2 h-2 rounded-full bg-amber-600 border border-amber-300 shadow-xs"
              />
            ))}
          </div>
        )}
      </div>

      {/* Deposition Status Tag */}
      {progress > 0.3 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 bg-amber-950/90 border border-amber-500/50 text-amber-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md backdrop-blur-xs flex items-center gap-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
          <span>Metal Deposition: {depositText}</span>
        </motion.div>
      )}
    </div>
  );
};
