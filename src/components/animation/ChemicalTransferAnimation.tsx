import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ReagentTransferInfo } from "./animationTypes";

interface ChemicalTransferAnimationProps {
  reagent: ReagentTransferInfo | null;
  isPouring: boolean;
  isDroppingSolid: boolean;
  onAnimationComplete?: () => void;
}

export const ChemicalTransferAnimation: React.FC<ChemicalTransferAnimationProps> = ({
  reagent,
  isPouring,
  isDroppingSolid
}) => {
  if (!reagent || (!isPouring && !isDroppingSolid)) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-visible">
      {/* Liquid Pouring Animation */}
      {isPouring && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 80, y: -40, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              x: [80, 20, 20, 20, 80],
              y: [-40, -10, -10, -10, -40],
              rotate: [0, -48, -48, -48, 0]
            }}
            transition={{ duration: 2.8, times: [0, 0.2, 0.7, 0.85, 1], ease: "easeInOut" }}
            className="absolute top-2 right-16 flex flex-col items-center origin-bottom-left"
          >
            {/* Reagent Bottle */}
            <div className="relative w-14 h-24 bg-gradient-to-b from-amber-100 to-amber-200 dark:from-slate-700 dark:to-slate-800 rounded-t-lg rounded-b-xl border-2 border-slate-500/80 shadow-2xl flex flex-col items-center justify-between p-1.5">
              {/* Bottle Cap */}
              <div className="w-6 h-3 bg-slate-800 rounded-t-xs border border-slate-600 -mt-3.5" />
              {/* Bottle Neck */}
              <div className="w-5 h-3 bg-slate-300 dark:bg-slate-600" />
              {/* Bottle Label */}
              <div className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-sm p-1 text-center shadow-xs">
                <div className="text-[8px] font-bold text-slate-800 dark:text-white truncate">
                  {reagent.formula}
                </div>
                <div className="text-[6px] text-slate-500 truncate uppercase">
                  Reagent
                </div>
              </div>
              {/* Fluid inside bottle */}
              <div
                className="w-full h-8 rounded-b-lg opacity-85"
                style={{ backgroundColor: reagent.color || "#38bdf8" }}
              />
            </div>

            {/* Continuous Falling Liquid Stream */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: [0, 110, 110, 0], opacity: [0, 0.9, 0.9, 0] }}
              transition={{ duration: 2.2, times: [0, 0.2, 0.8, 1], delay: 0.4 }}
              className="absolute -bottom-24 left-1 w-2 rounded-full blur-[0.5px] shadow-sm"
              style={{
                backgroundColor: reagent.color || "#38bdf8",
                boxShadow: `0 0 8px ${reagent.color || "#38bdf8"}`
              }}
            />

            {/* Liquid droplets splashing down */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.8, delay: 0.6 }}
              className="absolute -bottom-24 left-0 flex gap-1"
            >
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, 80],
                    x: [(i - 1.5) * 3, (i - 1.5) * 6],
                    opacity: [1, 0.2]
                  }}
                  transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.1 }}
                  className="w-1 h-1.5 rounded-full"
                  style={{ backgroundColor: reagent.color || "#38bdf8" }}
                />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Solid Transfer (Spatula / Powder dropping animation) */}
      {isDroppingSolid && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -60, y: -40, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              x: [-60, 10, 10, 10, -60],
              y: [-40, -15, -15, -15, -40],
              rotate: [0, 25, 25, 25, 0]
            }}
            transition={{ duration: 2.8, times: [0, 0.2, 0.7, 0.85, 1], ease: "easeInOut" }}
            className="absolute top-2 left-16 flex flex-col items-start origin-bottom-right"
          >
            {/* Laboratory Spatula */}
            <div className="relative flex items-center">
              {/* Spatula handle */}
              <div className="w-24 h-2 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-l-full border border-slate-400 shadow-md" />
              {/* Spatula blade scoop */}
              <div className="w-10 h-3 bg-gradient-to-b from-slate-300 to-slate-500 rounded-r-full border border-slate-400 -ml-1 relative flex items-center justify-center">
                {/* Solid powder granules on scoop */}
                <div
                  className="w-6 h-2 rounded-full shadow-inner"
                  style={{ backgroundColor: reagent.color || "#64748b" }}
                />
              </div>
            </div>

            {/* Falling Powder / Crystal Granules */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.8, delay: 0.5 }}
              className="relative w-8 h-28 left-24"
            >
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, 120 + (i % 4) * 10],
                    x: [(i % 3 - 1) * 6, (i % 4 - 1.5) * 10],
                    opacity: [1, 0.8, 0],
                    scale: [1, 0.8]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6 + (i % 5) * 0.1,
                    delay: (i * 0.08)
                  }}
                  className="absolute top-0 w-1.5 h-1.5 rounded-full shadow-xs"
                  style={{ backgroundColor: reagent.color || "#64748b" }}
                />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
