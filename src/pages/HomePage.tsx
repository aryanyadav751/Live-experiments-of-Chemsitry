import React from "react";
import { Chapter, Reaction } from "../types";
import { ChapterCard } from "../components/ChapterCard";
import { ReactionCard } from "../components/ReactionCard";
import { CHAPTERS } from "../data/chapters";
import { REACTIONS } from "../data/reactions";
import { calculateChapterProgress, calculateTotalProgress } from "../utils/progress";
import {
  FlaskConical,
  Sparkles,
  BookOpen,
  Award,
  ShieldCheck,
  Atom,
  ArrowRight,
  Star,
  CheckCircle2
} from "lucide-react";
import { motion } from "motion/react";

interface HomePageProps {
  onSelectChapter: (chapterNum: number) => void;
  onSelectReaction: (reaction: Reaction) => void;
  onRunExperiment: (reaction: Reaction) => void;
  onNavigateTab: (tab: any) => void;
  userProgress: any;
  ncertMode: boolean;
  onToggleBookmark: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectChapter,
  onSelectReaction,
  onRunExperiment,
  onNavigateTab,
  userProgress,
  ncertMode,
  onToggleBookmark
}) => {
  const stats = calculateTotalProgress(userProgress);

  // Board favorites for showcase
  const boardFavorites = REACTIONS.filter(
    (r) => r.boardImportance === "Very High"
  ).slice(0, 4);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-10 md:p-14 border border-slate-800 shadow-2xl">
        {/* Subtle background glow & atomic grid */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>CBSE CLASS 10 SCIENCE • NCERT CURRICULUM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Chemistry Lab — <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              Interactive Chemical Reactions
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-2xl">
            Master every chemical reaction, balanced equation, colour change, gas test, and molecular mechanism across all 4 NCERT chapters through virtual experiments, animations, and CBSE board quizzes.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onRunExperiment(REACTIONS[0])}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-102 active:scale-98"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Launch Virtual Lab</span>
            </button>

            <button
              onClick={() => onNavigateTab("explorer")}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm border border-slate-700 transition-all"
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Explore All Reactions</span>
            </button>

            <button
              onClick={() => onNavigateTab("exam")}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500/15 hover:bg-amber-500/20 text-amber-300 font-bold text-sm border border-amber-500/30 transition-all"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Board Exam Zone</span>
            </button>
          </div>
        </div>

        {/* Floating Quick Stats */}
        <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div>
            <div className="text-2xl font-bold font-mono text-white">{REACTIONS.length}</div>
            <div className="text-xs text-slate-400">NCERT Reactions</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-blue-400">4 Chapters</div>
            <div className="text-xs text-slate-400">Class 10 Syllabus</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-400">100% Safe</div>
            <div className="text-xs text-slate-400">Virtual Simulations</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-amber-400">CBSE Ready</div>
            <div className="text-xs text-slate-400">Board Questions & Quizzes</div>
          </div>
        </div>
      </section>

      {/* Safety Commitment Banner */}
      <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <strong className="font-semibold text-emerald-800 dark:text-emerald-300">
              Classroom Safety Notice:{" "}
            </strong>
            This educational platform visualizes chemical principles for conceptual understanding. Experiments classified as teacher demonstrations or simulation-only must never be attempted independently in real life.
          </div>
        </div>
      </div>

      {/* NCERT Chapters Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              NCERT Chemistry Chapters
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Select a chapter to explore balanced equations, observations, and virtual apparatus
            </p>
          </div>

          <button
            onClick={() => onNavigateTab("chapters")}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CHAPTERS.map((chapter) => {
            const chapterProg = calculateChapterProgress(chapter.number, userProgress);
            return (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                progressPercent={chapterProg.percentage}
                studiedCount={chapterProg.studiedCount}
                totalCount={chapterProg.totalCount}
                onSelect={(chNum) => onSelectChapter(chNum)}
              />
            );
          })}
        </div>
      </section>

      {/* CBSE Board Exam Favorites Spotlight */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              HIGH-PROBABILITY BOARD TOPICS
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Board Reactions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Questions frequently repeated in CBSE 10th Science theory papers
            </p>
          </div>

          <button
            onClick={() => onNavigateTab("exam")}
            className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <span>Exam Zone</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {boardFavorites.map((reaction) => (
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
      </section>

      {/* Interactive Features Bento Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-4">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Virtual Laboratory Simulator
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Experience beaker fluid color changes, precipitate settling, gas evolution with pop sounds, and temperature thermochemistry with step-by-step NCERT controls.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab("lab")}
            className="mt-6 flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Launch Lab <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4">
              <Atom className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Molecular Mechanism Animations
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Watch subatomic interactions in slow motion: see iron displace copper ions, barium swap sulphate anions, and molecules decompose into simpler fragments.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab("explorer")}
            className="mt-6 flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Explore Mechanisms <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Revision Flashcards & Quizzes
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Test your ability to predict products, balance stoichiometry, identify sensory cues, and solve board multiple choice questions with instant explanations.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab("flashcards")}
            className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Start Revision <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
