import React from "react";
import { UserProgress } from "../types";
import { CHAPTERS } from "../data/chapters";
import { REACTIONS, getReactionsByChapter } from "../data/reactions";
import { calculateChapterProgress, calculateTotalProgress } from "../utils/progress";
import { ProgressBar } from "../components/ProgressBar";
import {
  Award,
  CheckCircle2,
  FlaskConical,
  BookOpen,
  CreditCard,
  RotateCcw,
  Sparkles,
  Trophy,
  Star,
  Flame
} from "lucide-react";

interface ProgressPageProps {
  userProgress: UserProgress;
  onResetProgress: () => void;
  onNavigateTab: (tab: any) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  userProgress,
  onResetProgress,
  onNavigateTab
}) => {
  const stats = calculateTotalProgress(userProgress);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>STUDENT MASTERY DASHBOARD</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            My Learning Progress
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your chapter-wise syllabus completion, virtual laboratory experiments, and CBSE board readiness.
          </p>
        </div>

        <button
          onClick={onResetProgress}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Progress</span>
        </button>
      </div>

      {/* Main Overall Progress Hero Card */}
      <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-mono font-bold text-blue-300 uppercase tracking-widest">
                CBSE Class 10 Chemistry Syllabus
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono text-xs font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{stats.totalXP} XP Earned</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Overall Syllabus Mastery: {stats.overallPercentage}%
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              You have studied {stats.studiedReactions} of {stats.totalReactions} chemical reactions and completed {stats.simulatedCount} interactive virtual experiments.
            </p>
          </div>

          {/* Big Circular percentage badge */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-blue-400/40 bg-blue-500/20 flex flex-col items-center justify-center font-mono shrink-0 shadow-lg shadow-blue-500/20">
            <span className="text-3xl sm:text-4xl font-black text-white">{stats.overallPercentage}%</span>
            <span className="text-[10px] text-blue-300 uppercase tracking-wider font-sans font-semibold">Completed</span>
          </div>
        </div>

        <div className="mt-6">
          <ProgressBar
            percentage={stats.overallPercentage}
            height="h-2.5"
            color="bg-gradient-to-r from-blue-400 to-indigo-400"
            showPercent={false}
          />
        </div>
      </div>

      {/* 8 Primary Student Dashboard Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
        {/* 1. Current Streak */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-orange-500/40 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Flame className="w-5 h-5 fill-orange-500" />
            </div>
            <span className="text-[10px] font-mono uppercase text-slate-400">Daily Goal</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {stats.currentStreak} <span className="text-xs font-sans font-normal text-slate-500">Days</span>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1 flex items-center gap-1">
            <span>🔥 Current Streak</span>
          </div>
        </div>

        {/* 2. Longest Streak */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-[10px] font-mono uppercase text-slate-400">Record</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {stats.longestStreak} <span className="text-xs font-sans font-normal text-slate-500">Days</span>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1 flex items-center gap-1">
            <span>🏆 Longest Streak</span>
          </div>
        </div>

        {/* 3. Experiments Completed */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <FlaskConical className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-[10px] font-mono uppercase text-slate-400">Virtual Lab</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {stats.simulatedCount}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1 flex items-center gap-1">
            <span>🧪 Experiments Completed</span>
          </div>
        </div>

        {/* 4. Reactions Studied */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-500/40 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-[10px] font-mono uppercase text-slate-400">{stats.totalReactions} Total</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {stats.studiedReactions}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1 flex items-center gap-1">
            <span>⚗️ Reactions Studied</span>
          </div>
        </div>

        {/* 5. Questions Solved */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-purple-500/40 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-[10px] font-mono uppercase text-slate-400">Quiz & Practice</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {stats.questionsSolved}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1 flex items-center gap-1">
            <span>🧠 Questions Solved</span>
          </div>
        </div>

        {/* 6. Flashcards Mastered */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-indigo-500/40 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <CreditCard className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-[10px] font-mono uppercase text-slate-400">Spaced Recall</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {stats.flashcardsMastered}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1 flex items-center gap-1">
            <span>🎴 Flashcards Mastered</span>
          </div>
        </div>

        {/* 7. Equations Balanced */}
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Sparkles className="w-5 h-5 text-cyan-600" />
            </div>
            <span className="text-[10px] font-mono uppercase text-slate-400">Stoichiometry</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
            {stats.balancedCount}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1 flex items-center gap-1">
            <span>⚖️ Equations Balanced</span>
          </div>
        </div>

        {/* 8. Total Earned XP */}
        <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 shadow-sm hover:border-amber-500/60 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <span className="text-[10px] font-mono font-bold uppercase text-amber-600 dark:text-amber-400">Level {Math.floor(stats.totalXP / 200) + 1}</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-600 dark:text-amber-400">
            {stats.totalXP}
          </div>
          <div className="text-xs text-amber-700 dark:text-amber-300 font-semibold mt-1 flex items-center gap-1">
            <span>⭐ Earned XP</span>
          </div>
        </div>
      </div>

      {/* Chapter-wise Breakdown */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Chapter-Wise NCERT Completion
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time percentage breakdown for each of the 4 chemistry units
          </p>
        </div>

        <div className="space-y-5">
          {CHAPTERS.map((chapter) => {
            const prog = calculateChapterProgress(chapter.number, userProgress);
            return (
              <div key={chapter.id} className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono text-xs flex items-center justify-center">
                      {chapter.number}
                    </span>
                    <span className="text-slate-900 dark:text-white">{chapter.title}</span>
                  </div>
                  <span className="font-mono text-slate-600 dark:text-slate-400">
                    {prog.studiedCount} of {prog.totalCount} studied ({prog.percentage}%)
                  </span>
                </div>
                <ProgressBar percentage={prog.percentage} showPercent={false} height="h-2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
