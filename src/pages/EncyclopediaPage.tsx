import React, { useState, useMemo } from "react";
import { Search, BookOpen, FlaskConical, Sparkles, ExternalLink, Lightbulb, FileText, ArrowRight } from "lucide-react";
import { ENCYCLOPEDIA_SUBSTANCES, searchEncyclopedia, EncyclopediaSubstance } from "../data/encyclopediaData";
import { getReactionById } from "../data/reactions";
import { Reaction } from "../types";

interface EncyclopediaPageProps {
  onRunExperiment: (reaction: Reaction) => void;
  onSelectReaction: (reaction: Reaction) => void;
}

const QUICK_SEARCH_CHIPS = [
  "CuSO₄",
  "CaO",
  "Ca(OH)₂",
  "Fe",
  "FeSO₄",
  "CaCO₃",
  "NaHCO₃",
  "C₂H₅OH",
  "CH₃COOH",
  "Pb(NO₃)₂",
  "AgCl",
  "CaSO₄·½H₂O"
];

export const EncyclopediaPage: React.FC<EncyclopediaPageProps> = ({
  onRunExperiment,
  onSelectReaction
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubstanceId, setSelectedSubstanceId] = useState<string>("cuso4");

  const searchResults = useMemo(() => {
    return searchEncyclopedia(searchQuery);
  }, [searchQuery]);

  const currentSubstance = useMemo(() => {
    return (
      searchResults.find((s) => s.id === selectedSubstanceId) ||
      searchResults[0] ||
      ENCYCLOPEDIA_SUBSTANCES[0]
    );
  }, [searchResults, selectedSubstanceId]);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NCERT CLASS 10 SUBSTANCE REGISTRY</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Chemistry Encyclopedia
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Search chemical formulas, common names, physical appearances, and see where they appear in NCERT Class 10 Science with verified reactions.
        </p>
      </div>

      {/* Search Bar & Quick Chips */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by formula (e.g. CuSO4, Fe, NaHCO3) or common name (e.g. Quicklime, Baking Soda)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-400 font-mono text-[11px] shrink-0 mr-1">Quick Select:</span>
          {QUICK_SEARCH_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => {
                setSearchQuery(chip);
              }}
              className={`px-2.5 py-1 rounded-lg border font-mono transition-all shrink-0 ${
                searchQuery.toLowerCase() === chip.toLowerCase()
                  ? "bg-cyan-500 text-white border-cyan-600 shadow-sm"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Encyclopedia View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Substance List (4 Columns) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>NCERT SUBSTANCES ({searchResults.length})</span>
            <span>Class 10 Index</span>
          </div>

          <div className="max-h-[600px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {searchResults.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs space-y-2">
                <p>No substances found matching "{searchQuery}".</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-cyan-600 dark:text-cyan-400 underline font-bold"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              searchResults.map((sub) => {
                const isSelected = sub.id === currentSubstance?.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubstanceId(sub.id)}
                    className={`w-full text-left p-3.5 transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-cyan-500/10 dark:bg-cyan-500/20 border-l-4 border-l-cyan-500"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                          {sub.formula}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {sub.iupacName}
                        </span>
                      </div>
                      <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium truncate max-w-[200px] mt-0.5">
                        {sub.commonNames[0]}
                      </div>
                    </div>

                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0 border border-slate-300 dark:border-slate-700 shadow-sm"
                      style={{ backgroundColor: sub.colorHex }}
                      title={`Typical appearance color: ${sub.appearance}`}
                    />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Comprehensive Substance Detail Dossier (8 Columns) */}
        {currentSubstance && (
          <div className="lg:col-span-8 space-y-5">
            {/* Main Header Banner */}
            <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 text-white p-6 sm:p-7 shadow-lg space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-mono font-bold mb-1.5">
                    <span>{currentSubstance.physicalState.toUpperCase()}</span>
                    <span>•</span>
                    <span>Molar Mass: {currentSubstance.molarMass}</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
                    {currentSubstance.formula}
                  </h2>
                  <p className="text-base sm:text-lg font-semibold text-cyan-200 mt-0.5">
                    {currentSubstance.iupacName}
                  </p>
                </div>

                {/* Color Swatch Badge */}
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs">
                  <div
                    className="w-5 h-5 rounded-full border border-white/40 shadow-inner"
                    style={{ backgroundColor: currentSubstance.colorHex }}
                  />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 font-mono">Appearance</div>
                    <div className="font-bold text-white max-w-[150px] truncate">{currentSubstance.appearance}</div>
                  </div>
                </div>
              </div>

              {/* Common Names list */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-mono">Common / NCERT Names:</span>
                {currentSubstance.commonNames.map((cn, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-lg bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 text-xs font-semibold"
                  >
                    {cn}
                  </span>
                ))}
              </div>
            </div>

            {/* NCERT Syllabus Location & Physical Appearance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  <BookOpen className="w-4 h-4" />
                  <span>WHERE IT APPEARS IN NCERT</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {currentSubstance.ncertReference}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <FileText className="w-4 h-4" />
                  <span>PHYSICAL APPEARANCE & SENSORY</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentSubstance.appearance}
                </p>
              </div>
            </div>

            {/* Reactions Involving this substance */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-cyan-600" />
                Verified NCERT Reactions Involving {currentSubstance.formula} ({currentSubstance.reactionsInvolved.length})
              </h3>

              <div className="space-y-2.5">
                {currentSubstance.reactionsInvolved.map((rxItem) => {
                  const fullReaction = getReactionById(rxItem.id);
                  return (
                    <div
                      key={rxItem.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {rxItem.title}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold uppercase">
                            As {rxItem.role}
                          </span>
                        </div>
                        <div className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                          {rxItem.equation}
                        </div>
                      </div>

                      {fullReaction && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => onSelectReaction(fullReaction)}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                          >
                            Study
                          </button>
                          <button
                            onClick={() => onRunExperiment(fullReaction)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm transition-colors"
                          >
                            <FlaskConical className="w-3.5 h-3.5" />
                            <span>Simulate</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Related Experiments and Concepts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
                <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  RELATED LAB EXPERIMENTS
                </div>
                <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 list-disc list-inside">
                  {currentSubstance.relatedExperiments.map((exp, i) => (
                    <li key={i}>{exp}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
                <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                  CORE CBSE CONCEPTS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentSubstance.relatedConcepts.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CBSE Board Exam Pro-Tip */}
            <div className="p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-100 shadow-sm flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 font-mono">
                  CBSE Class 10 Board Exam Tip
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {currentSubstance.boardExamTips}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
