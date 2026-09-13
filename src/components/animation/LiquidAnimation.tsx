import React from "react";
import { motion } from "motion/react";

interface LiquidAnimationProps {
  fillPercentage: number; // e.g. 20 to 70%
  color: string;
  isStirring?: boolean;
  reducedMotion?: boolean;
}

export const LiquidAnimation: React.FC<LiquidAnimationProps> = ({
  fillPercentage,
  color,
  isStirring = false,
  reducedMotion = false
}) => {
  return (
    <motion.div
      animate={{
        height: `${fillPercentage}%`
      }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute bottom-0 inset-x-0 overflow-hidden flex flex-col justify-start pointer-events-none"
      style={{
        backgroundColor: color,
        boxShadow: "inset 0 4px 12px rgba(255,255,255,0.25), inset 0 -6px 15px rgba(0,0,0,0.3)"
      }}
    >
      {/* Curved Meniscus Surface Wave */}
      <motion.div
        animate={
          reducedMotion
            ? {}
            : isStirring
            ? {
                y: [0, -3, 3, 0],
                scaleX: [1, 1.05, 0.95, 1],
                rotate: [-1, 1, -1]
              }
            : {
                y: [0, -1.5, 0]
              }
        }
        transition={{
          repeat: Infinity,
          duration: isStirring ? 0.8 : 2.5,
          ease: "easeInOut"
        }}
        className="w-full h-3.5 -mt-1 rounded-t-full opacity-60 bg-white/40 blur-[0.5px]"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.4)"
        }}
      />

      {/* Internal Fluid Shimmer / Specular Light */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/15 pointer-events-none" />
    </motion.div>
  );
};
