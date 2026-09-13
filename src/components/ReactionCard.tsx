import React from "react";
import { Reaction } from "../types";
import { SafetyBadge } from "./SafetyBadge";
import { ArrowRight, Bookmark, Sparkles, Star, FlaskConical, BookOpen } from "lucide-react";
import { motion } from "motion/react";

interface ReactionCardProps {
  reaction: Reaction;
  onSelect: (reaction: Reaction) => void;
  onRunExperiment: (reaction: Reaction) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
  isStudied?: boolean;
  isSimulated?: boolean;
  ncertMode?: boolean;
  className?: string;
}

export const ReactionCard: React.FC<ReactionCardProps> = ({
  reaction,
  onSelect,
  onRunExperiment,
  isBookmarked = false,
  onToggleBookmark,
  isStudied = false,
  isSimulated = false,
  ncertMode = false,
  className = ""
}) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      id={`reaction-card-${reaction.id}`}
      className={`relative rounded-2xl border bg-white dark:bg-slate-900/90 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
        ncertMode && reaction.boardImportance === "Very High"
          ? "border-amber-400/60 dark:border-amber-500/40 ring-1 ring-amber-400/30"
          : "border-slate-200 dark:border-slate-800 hover:border-blue-400/50"
      } ${className}`}
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-300 font-mono text-xs font-semibold">
              Ch {reaction.chapterNumber}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
              {reaction.topic}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {ncertMode && reaction.boardImportance === "Very High" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[11px] font-bold border border-amber-500/30">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                Board Favorite
              </span>
            )}
            {onToggleBookmark && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(reaction.id);
                }}
                className={`p-1.5 rounded-lg text-slate-400 hover:text-amber-500 transition-colors ${
                  isBookmarked ? "text-amber-500 fill-amber-500" : ""
                }`}
                title="Bookmark for quick revision"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(reaction)}
          className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors leading-snug mb-2"
        >
          {reaction.title}
        </h3>

        {/* Chemical Equation Box */}
        <div
          onClick={() => onSelect(reaction)}
          className="cursor-pointer p-3 rounded-xl bg-slate-950 text-emerald-300 font-mono text-xs sm:text-sm shadow-inner border border-slate-800 flex items-center justify-between gap-2 mb-3 overflow-x-auto"
        >
          <span className="truncate">{reaction.balancedEquation}</span>
        </div>

        {/* Badges: Reaction Type & Safety */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <SafetyBadge mode={reaction.experimentMode} size="sm" />
          {reaction.reactionType.slice(0, 2).map((t, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200 dark:border-slate-700"
            >
              {t}
            </span>
          ))}
          {reaction.energyChange && reaction.energyChange !== "None" && (
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
              reaction.energyChange === "Exothermic" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
            }`}>
              {reaction.energyChange}
            </span>
          )}
        </div>

        {/* Primary Observation Preview */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          <strong className="text-slate-800 dark:text-slate-200">Observation: </strong>
          {reaction.observations[0]}
        </p>
      </div>

      {/* Footer Action Buttons */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(reaction)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" /> Details
        </button>

        <button
          onClick={() => onRunExperiment(reaction)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all hover:scale-102"
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Run Experiment</span>
        </button>
      </div>
    </motion.div>
  );
};
