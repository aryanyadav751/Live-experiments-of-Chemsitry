import React, { useState } from "react";
import { Chapter, Reaction } from "../types";
import { CHAPTERS } from "../data/chapters";
import { getReactionsByChapter } from "../data/reactions";
import { ReactionCard } from "../components/ReactionCard";
import { ProgressBar } from "../components/ProgressBar";
import { calculateChapterProgress } from "../utils/progress";
import { BookOpen, FlaskConical, ChevronDown, ChevronUp, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChaptersPageProps {
  initialChapter?: number | null;
  onSelectReaction: (reaction: Reaction) => void;
  onRunExperiment: (reaction: Reaction) => void;
  userProgress: any;
  ncertMode: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ChaptersPage: React.FC<ChaptersPageProps> = ({
  initialChapter = 1,
  onSelectReaction,
  onRunExperiment,
  userProgress,
  ncertMode,
  onToggleBookmark
}) => {
  const [expandedChapter, setExpandedChapter] = useState<number>(initialChapter || 1);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>NCERT CURRICULUM CHAPTERS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Class 10 Chemistry Chapters
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Explore reactions, practical experiments, and textbook activities organized chapter-by-chapter.
        </p>
      </div>

      {/* Chapters Accordion / List */}
      <div className="space-y-6">
        {CHAPTERS.map((chapter) => {
          const isExpanded = expandedChapter === chapter.number;
          const chapterReactions = getReactionsByChapter(chapter.number);
          const progress = calculateChapterProgress(chapter.number, userProgress);

          return (
            <div
              key={chapter.id}
              className={`rounded-3xl border transition-all overflow-hidden ${
                isExpanded
                  ? "border-blue-500/40 bg-white dark:bg-slate-900 shadow-lg ring-1 ring-blue-500/20"
                  : "border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 hover:border-slate-300"
              }`}
            >
              {/* Chapter Header Card (Click to toggle) */}
              <div
                onClick={() => setExpandedChapter(isExpanded ? 0 : chapter.number)}
                className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-mono font-extrabold text-lg flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25">
                    {chapter.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                        Chapter {chapter.number}
                      </span>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        {chapter.weightage}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      {chapter.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  {/* Progress snippet */}
                  <div className="w-36 hidden md:block">
                    <ProgressBar
                      percentage={progress.percentage}
                      label={`${progress.studiedCount}/${progress.totalCount} studied`}
                      height="h-1.5"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                    <span>{chapterReactions.length} Reactions</span>
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Chapter Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-6 space-y-6"
                  >
                    {/* Chapter Description & Core Topics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-500" />
                          Chapter Overview & NCERT Objectives
                        </h4>
                        <p>{chapter.description}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                        <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          Core Subtopics Covered
                        </h4>
                        <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                          {chapter.topics.map((t, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Reactions Grid */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                          <FlaskConical className="w-4 h-4 text-blue-500" />
                          All Reactions & Experiments in Chapter {chapter.number}
                        </h3>
                        <span className="text-xs text-slate-500 font-mono">
                          {chapterReactions.length} curated NCERT reactions
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {chapterReactions.map((reaction) => (
                          <ReactionCard
                            key={reaction.id}
                            reaction={reaction}
                            onSelect={onSelectReaction}
                            onRunExperiment={onRunExperiment}
                            isBookmarked={userProgress.bookmarkedReactions.includes(reaction.id)}
                            onToggleBookmark={onToggleBookmark}
                            ncertMode={ncertMode}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
