import React, { useState, useMemo } from "react";
import { Reaction, ExperimentMode } from "../types";
import { REACTIONS, searchReactions } from "../data/reactions";
import { ReactionCard } from "../components/ReactionCard";
import { ReactionFilters } from "../components/ReactionFilters";
import { Sparkles, Search } from "lucide-react";

interface ExplorerPageProps {
  onSelectReaction: (reaction: Reaction) => void;
  onRunExperiment: (reaction: Reaction) => void;
  userProgress: any;
  ncertMode: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ExplorerPage: React.FC<ExplorerPageProps> = ({
  onSelectReaction,
  onRunExperiment,
  userProgress,
  ncertMode,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<number | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<string | "all">("all");
  const [selectedSafety, setSelectedSafety] = useState<ExperimentMode | "all">("all");
  const [boardOnly, setBoardOnly] = useState<boolean>(false);

  const filteredReactions = useMemo(() => {
    let results = searchReactions(searchQuery, {
      chapter: selectedChapter,
      category: selectedCategory,
      mode: selectedSafety
    });

    if (boardOnly) {
      results = results.filter((r) => r.boardImportance === "Very High" || r.boardImportance === "High");
    }

    return results;
  }, [searchQuery, selectedChapter, selectedCategory, selectedSafety, boardOnly]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedChapter("all");
    setSelectedCategory("all");
    setSelectedSafety("all");
    setBoardOnly(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NCERT DATABASE EXPLORER</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Chemical Reaction Explorer
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Search all 36+ Class 10 NCERT reactions by chemical formula, reactants, reaction type, or observation.
        </p>
      </div>

      {/* Filter Component */}
      <ReactionFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedChapter={selectedChapter}
        onChapterChange={setSelectedChapter}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedSafety={selectedSafety}
        onSafetyChange={setSelectedSafety}
        boardOnly={boardOnly}
        onBoardOnlyChange={setBoardOnly}
        totalResults={filteredReactions.length}
        onClearFilters={handleClearFilters}
      />

      {/* Reactions Grid */}
      {filteredReactions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReactions.map((reaction) => (
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
      ) : (
        <div className="py-16 text-center rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">
            No matching reactions found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Try searching by chemical formula (e.g. &apos;CuSO4&apos;, &apos;FeSO4&apos;, &apos;CaCO3&apos;) or clearing your filters.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
