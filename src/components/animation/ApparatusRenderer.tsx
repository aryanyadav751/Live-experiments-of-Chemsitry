import React from "react";
import { ApparatusType } from "./animationTypes";
import { motion } from "motion/react";

interface ApparatusRendererProps {
  apparatus: ApparatusType;
  children: React.ReactNode;
  isHeating?: boolean;
  isPhotolysis?: boolean;
  isElectrolysis?: boolean;
  className?: string;
}

export const ApparatusRenderer: React.FC<ApparatusRendererProps> = ({
  apparatus,
  children,
  isHeating = false,
  isPhotolysis = false,
  isElectrolysis = false,
  className = ""
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-end ${className}`}>
      {/* Sunlight Beam Effect for Photochemical Decomposition (AgCl, AgBr) */}
      {isPhotolysis && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-24 -left-12 w-64 h-72 pointer-events-none z-30"
          style={{
            background: "linear-gradient(135deg, rgba(253, 224, 71, 0.4) 0%, rgba(253, 224, 71, 0.05) 70%, transparent 100%)",
            clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)"
          }}
        >
          <div className="absolute top-2 left-6 text-[10px] font-mono font-bold text-amber-200 bg-amber-900/60 px-2 py-0.5 rounded-full border border-amber-500/40">
            ☀️ Virtual Solar Radiation
          </div>
        </motion.div>
      )}

      {/* Virtual Bunsen Burner Flame (when heating) */}
      {isHeating && (
        <div className="absolute -bottom-16 flex flex-col items-center z-10 pointer-events-none">
          {/* Flame animation */}
          <motion.div
            animate={{
              scaleY: [1, 1.25, 0.95, 1.15],
              scaleX: [1, 0.92, 1.08, 0.96],
              y: [0, -3, 1, -2]
            }}
            transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
            className="relative flex items-center justify-center"
          >
            {/* Outer flame glow */}
            <div className="w-10 h-16 rounded-full bg-gradient-to-t from-blue-600 via-amber-500 to-yellow-300 blur-[2px] opacity-90" />
            {/* Inner flame cone */}
            <div className="absolute bottom-1 w-4 h-8 rounded-full bg-gradient-to-t from-cyan-400 to-white blur-[0.5px]" />
          </motion.div>
          {/* Burner metal nozzle */}
          <div className="w-6 h-7 bg-gradient-to-r from-slate-600 via-slate-400 to-slate-700 rounded-t-sm border border-slate-500 shadow-md" />
          <div className="w-14 h-2 bg-slate-800 rounded-full" />
          <span className="text-[9px] font-mono text-orange-400 font-bold mt-0.5 bg-slate-950/80 px-1.5 py-0.2 rounded-sm">
            Virtual Heat
          </span>
        </div>
      )}

      {/* Main Glassware / Container Body */}
      <div
        className={`relative z-20 flex flex-col justify-end items-center overflow-hidden transition-all duration-700 backdrop-blur-xs border-2 ${
          apparatus === "test-tube"
            ? "w-24 sm:w-28 h-56 sm:h-64 rounded-b-full border-t-0 border-slate-300/60 dark:border-slate-500/60 bg-slate-850/30"
            : apparatus === "conical-flask"
            ? "w-44 sm:w-52 h-56 sm:h-64 rounded-b-3xl border-slate-300/60 dark:border-slate-500/60 bg-slate-850/30"
            : apparatus === "crucible" || apparatus === "china-dish"
            ? "w-48 sm:w-56 h-28 sm:h-32 rounded-b-full border-t-0 border-amber-200/50 bg-amber-950/20"
            : apparatus === "measuring-cylinder"
            ? "w-16 sm:w-20 h-64 sm:h-72 rounded-b-lg border-t-0 border-slate-300/60 bg-slate-850/30"
            : "w-48 sm:w-56 h-56 sm:h-64 rounded-b-3xl rounded-t-xs border-slate-300/60 dark:border-slate-500/60 bg-slate-850/30 shadow-2xl"
        }`}
        style={{
          boxShadow: "inset 0 2px 10px rgba(255,255,255,0.15), 0 12px 30px rgba(0,0,0,0.5)"
        }}
      >
        {/* Beaker Pour Spout / Lip if standard beaker */}
        {apparatus === "beaker" && (
          <div className="absolute top-0 left-0 w-4 h-3 -translate-x-1.5 -translate-y-1 bg-transparent border-t-2 border-l-2 border-slate-300/60 rounded-tl-sm pointer-events-none" />
        )}

        {/* Borosilicate Glassware Graduation Markings */}
        {apparatus !== "crucible" && apparatus !== "china-dish" && (
          <div className="absolute left-2 inset-y-6 flex flex-col justify-between pointer-events-none opacity-40 z-30 select-none">
            <div className="flex items-center gap-1">
              <span className="w-3 h-[1.5px] bg-white" />
              <span className="text-[8px] font-mono text-slate-200">100ml</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-[1px] bg-white" />
              <span className="text-[7px] font-mono text-slate-300">75ml</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-[1.5px] bg-white" />
              <span className="text-[8px] font-mono text-slate-200">50ml</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-[1px] bg-white" />
              <span className="text-[7px] font-mono text-slate-300">25ml</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-[1.5px] bg-white" />
              <span className="text-[8px] font-mono text-slate-200">10ml</span>
            </div>
          </div>
        )}

        {/* Glass Specular Highlights */}
        <div className="absolute top-0 right-2 w-2 inset-y-2 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-full pointer-events-none z-30" />
        <div className="absolute top-0 left-1 w-1 inset-y-3 bg-white/20 rounded-full pointer-events-none z-30" />

        {/* Electrolysis Electrodes (if electrolysis apparatus) */}
        {isElectrolysis && (
          <div className="absolute inset-x-8 bottom-0 h-44 flex justify-between z-20 pointer-events-none">
            {/* Cathode (-) */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-36 bg-slate-900 border border-slate-700 rounded-t-sm shadow-md" />
              <span className="text-[8px] font-mono font-bold text-cyan-400 bg-slate-900/90 px-1 rounded-sm mt-0.5">
                Cathode (-) H₂
              </span>
            </div>
            {/* Anode (+) */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-36 bg-slate-900 border border-slate-700 rounded-t-sm shadow-md" />
              <span className="text-[8px] font-mono font-bold text-rose-400 bg-slate-900/90 px-1 rounded-sm mt-0.5">
                Anode (+) O₂
              </span>
            </div>
          </div>
        )}

        {/* Embedded Container Contents (Liquid, Solid, Particles, etc.) */}
        {children}
      </div>

      {/* Lab Bench Stand / Tripod / Shadow */}
      <div className="w-48 sm:w-60 h-3 mt-1 bg-gradient-to-r from-transparent via-slate-950/80 to-transparent rounded-full blur-[2px] pointer-events-none" />
    </div>
  );
};
