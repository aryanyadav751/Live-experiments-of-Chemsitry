import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Zap } from "lucide-react";

interface ReactionEffectProps {
  isStarting: boolean;
  isVigorous?: boolean;
  glowColor?: string;
  flameColor?: string;
  reducedMotion?: boolean;
}

export const ReactionEffect: React.FC<ReactionEffectProps> = ({
  isStarting,
  isVigorous = false,
  glowColor = "#38bdf8",
  flameColor,
  reducedMotion = false
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 flex flex-col items-center justify-center">
      {/* "REACTION STARTING..." Announcement Banner */}
      <AnimatePresence>
        {isStarting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute top-1/3 z-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-mono text-xs sm:text-sm font-black px-4 py-2 rounded-2xl shadow-2xl border border-white/40 flex items-center gap-2 backdrop-blur-md"
          >
            <Zap className="w-4 h-4 text-amber-300 animate-bounce" />
            <span className="tracking-wider uppercase">REACTION STARTING...</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luminescent Radial Reaction Glow */}
      <motion.div
        animate={{
          opacity: isStarting ? [0.2, 0.6, 0.3] : [0.1, 0.25, 0.1],
          scale: isStarting ? [0.95, 1.15, 1] : [1, 1.05, 1]
        }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute w-64 h-64 rounded-full blur-2xl pointer-events-none"
        style={{
          backgroundColor: flameColor || glowColor,
          opacity: 0.2
        }}
      />
    </div>
  );
};
