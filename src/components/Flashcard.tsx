import React, { useState } from "react";
import { Reaction } from "../types";
import { motion } from "motion/react";
import { RotateCw, CheckCircle2, Bookmark, Star, ArrowRight, ArrowLeft } from "lucide-react";
import { SafetyBadge } from "./SafetyBadge";

interface FlashcardProps {
  reaction: Reaction;
  isMastered?: boolean;
  onToggleMastered?: (id: string) => void;
  className?: string;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  reaction,
  isMastered = false,
  onToggleMastered,
  className = ""
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <div
      id={`flashcard-${reaction.id}`}
      className={`perspective-1000 w-full max-w-xl mx-auto h-96 sm:h-[420px] select-none cursor-pointer ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 60 }}
        className="w-full h-full relative [transform-style:preserve-3d]"
      >
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-blue-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold border border-blue-500/20">
              Ch {reaction.chapterNumber}: {reaction.topic}
            </span>
            <span className="text-xs font-mono text-slate-400">Click anywhere to flip 🔄</span>
          </div>

          {/* Center Equation Prompt */}
          <div className="text-center py-6">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-2 block">
              Predict Products & Observation
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {reaction.title}
            </h3>

            {/* Incomplete / Reactants prompt */}
            <div className="p-4 rounded-2xl bg-slate-950 text-sky-400 font-mono text-base sm:text-lg border border-slate-800 shadow-inner inline-block max-w-full">
              {reaction.reactants.join(" + ")} → ?
            </div>
          </div>

          {/* Front Footer */}
          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80 pt-4">
            <SafetyBadge mode={reaction.experimentMode} size="sm" />
            <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-bold">
              <span>Reveal Solution</span>
              <RotateCw className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-3xl border border-blue-500/30 bg-slate-950 text-slate-100 p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto">
          {/* Back Top */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Balanced Solution & Board Tips
            </span>
            {onToggleMastered && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMastered(reaction.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  isMastered
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isMastered ? "Mastered ✓" : "Mark as Mastered"}
              </button>
            )}
          </div>

          {/* Back Content */}
          <div className="my-auto py-2 space-y-3">
            {/* Balanced Equation */}
            <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 font-mono text-sm sm:text-base text-center font-bold">
              {reaction.balancedEquation}
            </div>

            {/* Type & Energy */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400">Classification:</span>
              {reaction.reactionType.map((t, idx) => (
                <span key={idx} className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono">
                  {t}
                </span>
              ))}
              {reaction.energyChange && (
                <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                  {reaction.energyChange}
                </span>
              )}
            </div>

            {/* Key Observation */}
            <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <strong className="text-amber-400">NCERT Observation: </strong>
              {reaction.observations[0]}
            </div>

            {/* Board Question / Tip */}
            {reaction.commonBoardQuestion && (
              <div className="text-xs text-slate-300 leading-relaxed bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                <strong className="text-amber-300">Board Exam Tip: </strong>
                {reaction.commonBoardQuestion}
              </div>
            )}
          </div>

          {/* Back Footer */}
          <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400">
            <span>NCERT {reaction.ncertConcept.split(":")[0]}</span>
            <span className="text-slate-300">Tap to flip back</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
