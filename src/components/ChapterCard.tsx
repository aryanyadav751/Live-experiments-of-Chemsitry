import React from "react";
import { Chapter } from "../types";
import { ArrowRight, BookOpen, FlaskConical, Award } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { motion } from "motion/react";

interface ChapterCardProps {
  chapter: Chapter;
  progressPercent: number;
  studiedCount: number;
  totalCount: number;
  onSelect: (chapterNumber: number) => void;
  className?: string;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  progressPercent,
  studiedCount,
  totalCount,
  onSelect,
  className = ""
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      id={`chapter-card-${chapter.number}`}
      onClick={() => onSelect(chapter.number)}
      className={`cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-sm hover:shadow-lg hover:border-blue-500/40 transition-all flex flex-col justify-between group ${className}`}
    >
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
              {chapter.number}
            </span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              NCERT Chapter {chapter.number}
            </span>
          </div>

          <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            {chapter.weightage}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
          {chapter.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
          {chapter.description}
        </p>

        {/* Key Topics preview */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {chapter.topics.slice(0, 3).map((topic, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
            >
              {topic}
            </span>
          ))}
          {chapter.topics.length > 3 && (
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
              +{chapter.topics.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer with Progress & Action */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="mb-3">
          <ProgressBar
            percentage={progressPercent}
            label={`${studiedCount} of ${totalCount} reactions mastered`}
            height="h-1.5"
            color="bg-blue-600"
          />
        </div>

        <div className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
          <span className="flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5" />
            Explore Reactions & Lab
          </span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};
