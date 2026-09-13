import React from "react";
import { Search, X, Filter, Sparkles, Star } from "lucide-react";
import { ALL_REACTION_CATEGORIES } from "../data/reactions";
import { ExperimentMode } from "../types";

interface ReactionFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedChapter: number | "all";
  onChapterChange: (ch: number | "all") => void;
  selectedCategory: string | "all";
  onCategoryChange: (cat: string | "all") => void;
  selectedSafety: ExperimentMode | "all";
  onSafetyChange: (mode: ExperimentMode | "all") => void;
  boardOnly: boolean;
  onBoardOnlyChange: (b: boolean) => void;
  totalResults: number;
  onClearFilters: () => void;
  className?: string;
}

export const ReactionFilters: React.FC<ReactionFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedChapter,
  onChapterChange,
  selectedCategory,
  onCategoryChange,
  selectedSafety,
  onSafetyChange,
  boardOnly,
  onBoardOnlyChange,
  totalResults,
  onClearFilters,
  className = ""
}) => {
  const chapters = [
    { num: "all" as const, label: "All Chapters" },
    { num: 1, label: "Ch 1: Reactions" },
    { num: 2, label: "Ch 2: Acids & Bases" },
    { num: 3, label: "Ch 3: Metals" },
    { num: 4, label: "Ch 4: Carbon" }
  ];

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedChapter !== "all" ||
    selectedCategory !== "all" ||
    selectedSafety !== "all" ||
    boardOnly;

  return (
    <div
      id="reaction-filters-bar"
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-4 sm:p-5 shadow-sm space-y-4 ${className}`}
    >
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search reactions by name, chemical formula (e.g. FeSO4, CuSO4), reactant, or sensory observation..."
          className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Chapters Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Chapter:
        </span>
        {chapters.map((c) => (
          <button
            key={String(c.num)}
            onClick={() => onChapterChange(c.num)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              selectedChapter === c.num
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Secondary Row: Reaction Type Dropdown, Safety Mode & Board Favorites */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          {/* Reaction Category */}
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="all">All Reaction Types</option>
            {ALL_REACTION_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Safety Mode */}
          <select
            value={selectedSafety}
            onChange={(e) => onSafetyChange(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="all">All Safety Classifications</option>
            <option value="safe">🟢 Safe Lab Activity</option>
            <option value="teacher-demo">🟡 Teacher Demonstration</option>
            <option value="simulation-only">🔴 Simulation Only</option>
          </select>

          {/* Board Favorite Toggle */}
          <button
            onClick={() => onBoardOnlyChange(!boardOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              boardOnly
                ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40 ring-1 ring-amber-500/30"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-amber-400"
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${boardOnly ? "fill-amber-500 text-amber-500" : ""}`} />
            Board Exam Favorites
          </button>
        </div>

        {/* Results count & Clear */}
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-900 dark:text-white">{totalResults}</strong> reactions
          </span>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-rose-600 dark:text-rose-400 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
