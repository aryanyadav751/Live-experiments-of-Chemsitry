import React from "react";
import { motion } from "motion/react";

interface GasBubbleAnimationProps {
  active: boolean;
  gasName?: string;
  intensity?: "mild" | "vigorous" | "violent";
  speed?: number;
  reducedMotion?: boolean;
}

export const GasBubbleAnimation: React.FC<GasBubbleAnimationProps> = ({
  active,
  gasName,
  intensity = "vigorous",
  speed = 1,
  reducedMotion = false
}) => {
  if (!active) return null;

  const count = intensity === "violent" ? 24 : intensity === "vigorous" ? 16 : 8;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
      {/* Gas identifier tag above liquid surface */}
      {gasName && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-8 right-3 z-30 bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md backdrop-blur-xs flex items-center gap-1"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Gas Evolved: {gasName}</span>
        </motion.div>
      )}

      {/* Surface Bubbling Layer / Foam */}
      <motion.div
        animate={{
          scaleY: [1, 1.3, 1],
          opacity: [0.7, 0.95, 0.7]
        }}
        transition={{ repeat: Infinity, duration: 0.6 / speed }}
        className="absolute top-[35%] inset-x-2 h-3 rounded-full bg-white/25 blur-[1px] flex items-center justify-around"
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/50 border border-white/60"
          />
        ))}
      </motion.div>

      {/* Rising Bubbles through liquid column */}
      {!reducedMotion && (
        <div className="absolute inset-x-2 bottom-2 top-[35%] overflow-hidden">
          {[...Array(count)].map((_, i) => {
            const size = 3 + (i % 4) * 2.5;
            const startX = 10 + (i * 19) % 80;
            const duration = (0.9 + (i % 5) * 0.25) / speed;
            const delay = (i * 0.12) / speed;

            return (
              <motion.div
                key={i}
                initial={{ y: 160, x: `${startX}%`, opacity: 0, scale: 0.5 }}
                animate={{
                  y: [160, 0],
                  x: [
                    `${startX}%`,
                    `${startX + (i % 2 === 0 ? 4 : -4)}%`,
                    `${startX + (i % 2 === 0 ? -3 : 3)}%`
                  ],
                  opacity: [0, 0.9, 0.9, 0],
                  scale: [0.6, 1.1, 1.3]
                }}
                transition={{
                  repeat: Infinity,
                  duration,
                  delay,
                  ease: "easeIn"
                }}
                className="absolute bottom-0 rounded-full border border-white/80 bg-white/40 shadow-xs blur-[0.2px]"
                style={{
                  width: `${size}px`,
                  height: `${size}px`
                }}
              />
            );
          })}
        </div>
      )}

      {/* Gentle upward vapour drift above surface */}
      <motion.div
        animate={{
          y: [-10, -45],
          opacity: [0, 0.4, 0]
        }}
        transition={{ repeat: Infinity, duration: 1.6 / speed }}
        className="absolute top-[20%] inset-x-6 h-8 bg-gradient-to-t from-white/20 to-transparent blur-xs rounded-full pointer-events-none"
      />
    </div>
  );
};
