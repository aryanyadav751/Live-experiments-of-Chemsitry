import React, { useState, useEffect } from "react";
import { Reaction } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Sparkles, Pause, ArrowRight } from "lucide-react";

interface MolecularAnimationProps {
  reaction: Reaction;
  className?: string;
}

export const MolecularAnimation: React.FC<MolecularAnimationProps> = ({ reaction, className = "" }) => {
  const [phase, setPhase] = useState<"reactants" | "transition" | "products">("reactants");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Auto-play loop for molecular animation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPhase((prev) => {
        if (prev === "reactants") return "transition";
        if (prev === "transition") return "products";
        return "reactants";
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Determine mechanism style
  const isDecomp = reaction.reactionType.includes("Decomposition");
  const isComb = reaction.reactionType.includes("Combination");
  const isDisplace = reaction.reactionType.includes("Displacement") && !reaction.reactionType.includes("Double Displacement");
  const isDoubleDisplace = reaction.reactionType.includes("Double Displacement");
  const isEster = reaction.reactionType.includes("Esterification");
  const isCombust = reaction.reactionType.includes("Combustion");

  const mechanismTitle = isDisplace
    ? "Single Displacement Mechanism (Atom Replacement)"
    : isDoubleDisplace
    ? "Double Displacement Mechanism (Mutual Ion Exchange)"
    : isDecomp
    ? "Decomposition Mechanism (Molecular Cleavage)"
    : isComb
    ? "Combination Mechanism (Atomic Synthesis)"
    : isEster
    ? "Esterification Condensation (Dehydration Coupling)"
    : isCombust
    ? "Rapid Oxidation Combustion Mechanism"
    : "Subatomic Bond Rearrangement";

  return (
    <div
      id={`molecular-view-${reaction.id}`}
      className={`rounded-2xl border border-indigo-500/20 bg-slate-950 p-5 text-slate-100 shadow-xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              Molecular View: Subatomic Interaction
            </h3>
            <p className="text-xs text-indigo-300 font-mono">
              {mechanismTitle}
            </p>
          </div>
        </div>

        {/* Phase Timeline and Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs font-mono">
            <button
              onClick={() => { setPhase("reactants"); setIsPlaying(false); }}
              className={`px-2 py-1 rounded transition-all ${
                phase === "reactants" ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              1. Reactants
            </button>
            <ArrowRight className="w-3 h-3 text-slate-600 mx-0.5" />
            <button
              onClick={() => { setPhase("transition"); setIsPlaying(false); }}
              className={`px-2 py-1 rounded transition-all ${
                phase === "transition" ? "bg-amber-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              2. Transition
            </button>
            <ArrowRight className="w-3 h-3 text-slate-600 mx-0.5" />
            <button
              onClick={() => { setPhase("products"); setIsPlaying(false); }}
              className={`px-2 py-1 rounded transition-all ${
                phase === "products" ? "bg-emerald-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              3. Products
            </button>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title={isPlaying ? "Pause Animation" : "Play Continuous Loop"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={() => { setPhase("reactants"); setIsPlaying(true); }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Reset from Step 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Animation Stage */}
      <div className="relative h-64 sm:h-72 w-full rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 flex items-center justify-center p-4 overflow-hidden">
        {/* Subtle atomic grid backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Status Cue Banner */}
        <div className="absolute top-3 left-4 text-xs font-mono text-slate-400 flex items-center gap-2 z-10">
          <span className={`w-2 h-2 rounded-full ${
            phase === "reactants" ? "bg-blue-400 animate-ping" : phase === "transition" ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
          }`} />
          <span>
            {phase === "reactants" && "STAGE 1: Reactant atoms/molecules in initial state"}
            {phase === "transition" && "STAGE 2: Chemical bonds breaking & transition state forming"}
            {phase === "products" && "STAGE 3: Stable products formed according to stoichiometry"}
          </span>
        </div>

        {/* Dynamic Mechanism Visualizers */}
        <div className="relative w-full max-w-lg h-44 flex items-center justify-center">
          {/* CASE 1: Single Displacement (e.g. Fe + CuSO4 -> FeSO4 + Cu) */}
          {isDisplace && (
            <div className="relative w-full h-full flex items-center justify-around">
              {/* Metal A (e.g. Fe) */}
              <motion.div
                animate={
                  phase === "reactants"
                    ? { x: -60, y: 0, scale: 1 }
                    : phase === "transition"
                    ? { x: 0, y: -20, scale: 1.15 }
                    : { x: 40, y: 0, scale: 1 }
                }
                transition={{ type: "spring", stiffness: 70, damping: 14 }}
                className="flex flex-col items-center gap-1 z-20"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 border-2 border-slate-300 shadow-lg shadow-slate-500/20 flex items-center justify-center font-bold text-white text-base">
                  Fe
                </div>
                <span className="text-[11px] font-mono text-slate-300 font-semibold">
                  {phase === "products" ? "Fe²⁺ (in solution)" : "Fe atom"}
                </span>
              </motion.div>

              {/* Metal B (e.g. Cu) */}
              <motion.div
                animate={
                  phase === "reactants"
                    ? { x: 0, y: 0, scale: 1 }
                    : phase === "transition"
                    ? { x: 20, y: 20, scale: 1.1 }
                    : { x: -70, y: 0, scale: 1 }
                }
                transition={{ type: "spring", stiffness: 70, damping: 14 }}
                className="flex flex-col items-center gap-1 z-20"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 border-2 border-amber-400 shadow-lg shadow-amber-500/30 flex items-center justify-center font-bold text-white text-base">
                  Cu
                </div>
                <span className="text-[11px] font-mono text-amber-300 font-semibold">
                  {phase === "products" ? "Cu(s) metal deposit" : "Cu²⁺ ion"}
                </span>
              </motion.div>

              {/* Anion Companion (e.g. SO4) */}
              <motion.div
                animate={
                  phase === "reactants"
                    ? { x: 40, y: 0 }
                    : phase === "transition"
                    ? { x: 10, y: 0 }
                    : { x: 80, y: 0 }
                }
                transition={{ type: "spring", stiffness: 70, damping: 14 }}
                className="flex flex-col items-center gap-1 z-10"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-600 to-blue-800 border-2 border-sky-400 shadow-lg shadow-blue-500/20 flex items-center justify-center font-bold text-white text-xs">
                  SO₄²⁻
                </div>
                <span className="text-[11px] font-mono text-sky-300 font-semibold">
                  {phase === "products" ? "With Fe²⁺" : "With Cu²⁺"}
                </span>
              </motion.div>
            </div>
          )}

          {/* CASE 2: Double Displacement (Ion Exchange) */}
          {isDoubleDisplace && (
            <div className="relative w-full h-full flex items-center justify-center gap-8">
              {/* Pair 1 */}
              <motion.div
                animate={
                  phase === "reactants"
                    ? { x: -40, y: 0 }
                    : phase === "transition"
                    ? { x: 0, y: -20, rotate: 45 }
                    : { x: -30, y: 0 }
                }
                transition={{ duration: 0.8 }}
                className="flex items-center gap-1.5 p-2 rounded-2xl bg-slate-800/40 border border-slate-700/50"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-600 border border-indigo-400 flex items-center justify-center font-bold text-white text-xs">
                  {phase === "products" ? "Ba²⁺" : "2Na⁺"}
                </div>
                <div className="w-12 h-12 rounded-full bg-rose-600 border border-rose-400 flex items-center justify-center font-bold text-white text-xs">
                  {phase === "products" ? "SO₄²⁻" : "SO₄²⁻"}
                </div>
              </motion.div>

              {/* Pair 2 */}
              <motion.div
                animate={
                  phase === "reactants"
                    ? { x: 40, y: 0 }
                    : phase === "transition"
                    ? { x: 0, y: 20, rotate: -45 }
                    : { x: 30, y: 0 }
                }
                transition={{ duration: 0.8 }}
                className="flex items-center gap-1.5 p-2 rounded-2xl bg-slate-800/40 border border-slate-700/50"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-600 border border-emerald-400 flex items-center justify-center font-bold text-white text-xs">
                  {phase === "products" ? "2Na⁺" : "Ba²⁺"}
                </div>
                <div className="w-12 h-12 rounded-full bg-cyan-600 border border-cyan-400 flex items-center justify-center font-bold text-white text-xs">
                  2Cl⁻
                </div>
              </motion.div>
            </div>
          )}

          {/* CASE 3: Decomposition (Splitting) */}
          {isDecomp && (
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                animate={
                  phase === "reactants"
                    ? { scale: 1.1, x: 0 }
                    : phase === "transition"
                    ? { scale: 1.25, filter: "brightness(1.4)" }
                    : { scale: 0.85, x: -80 }
                }
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 border-2 border-emerald-300 shadow-lg flex items-center justify-center font-bold text-white text-sm">
                  {phase === "products" ? "Residue" : "Parent"}
                </div>
                <span className="text-[11px] font-mono text-emerald-300 font-semibold">
                  {phase === "products" ? "Solid Product" : reaction.reactants[0]}
                </span>
              </motion.div>

              {phase !== "reactants" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.2, x: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: phase === "transition" ? 40 : 90,
                    y: phase === "transition" ? -20 : -35
                  }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-amber-600 border-2 border-rose-300 shadow-lg flex items-center justify-center font-bold text-white text-xs animate-bounce">
                    Gas ↑
                  </div>
                  <span className="text-[11px] font-mono text-rose-300 font-semibold">
                    {reaction.products[1] || "Gas Molecule"}
                  </span>
                </motion.div>
              )}
            </div>
          )}

          {/* CASE 4: Combination / Addition / Esterification / Default Joining */}
          {!isDisplace && !isDoubleDisplace && !isDecomp && (
            <div className="relative w-full h-full flex items-center justify-center gap-4">
              <motion.div
                animate={
                  phase === "reactants"
                    ? { x: -80, scale: 1 }
                    : phase === "transition"
                    ? { x: -20, scale: 1.1 }
                    : { x: 0, scale: 1 }
                }
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-14 h-14 rounded-full bg-blue-600 border-2 border-blue-400 shadow-lg flex items-center justify-center font-bold text-white text-xs">
                  {reaction.reactants[0]?.split("(")[0] || "A"}
                </div>
                <span className="text-[10px] font-mono text-blue-300 font-semibold">Reactant 1</span>
              </motion.div>

              <motion.span
                animate={phase === "products" ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                className="text-2xl font-bold text-slate-500 font-mono"
              >
                +
              </motion.span>

              <motion.div
                animate={
                  phase === "reactants"
                    ? { x: 80, scale: 1 }
                    : phase === "transition"
                    ? { x: 20, scale: 1.1 }
                    : { x: 0, scale: 1 }
                }
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-14 h-14 rounded-full bg-amber-600 border-2 border-amber-400 shadow-lg flex items-center justify-center font-bold text-white text-xs">
                  {reaction.reactants[1]?.split("(")[0] || "B"}
                </div>
                <span className="text-[10px] font-mono text-amber-300 font-semibold">Reactant 2</span>
              </motion.div>
            </div>
          )}
        </div>

        {/* Mechanism explanation footer inside stage */}
        <div className="absolute bottom-2 inset-x-4 text-center">
          <p className="text-xs text-slate-300 bg-slate-900/90 py-1.5 px-3 rounded-lg border border-slate-800 inline-block font-sans max-w-xl truncate">
            {reaction.molecularExplanation}
          </p>
        </div>
      </div>
    </div>
  );
};
