import React, { useState } from "react";
import { Reaction } from "../types";
import { REACTIONS } from "../data/reactions";
import { aiService, ReactionComparisonResult } from "../services/aiService";
import { ReactionEquation } from "../components/ReactionEquation";
import { SafetyBadge } from "../components/SafetyBadge";
import { GitCompare, Sparkles, CheckCircle2, ArrowRight, BookOpen } from "lucide-react";

interface ComparePageProps {
  onSelectReaction: (reaction: Reaction) => void;
  onRunExperiment: (reaction: Reaction) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({
  onSelectReaction,
  onRunExperiment
}) => {
  const [rx1Id, setRx1Id] = useState<string>(REACTIONS[0].id);
  const [rx2Id, setRx2Id] = useState<string>(REACTIONS[3].id);
  const [comparison, setComparison] = useState<ReactionComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const r1 = REACTIONS.find((r) => r.id === rx1Id) || REACTIONS[0];
  const r2 = REACTIONS.find((r) => r.id === rx2Id) || REACTIONS[1];

  const handleRunComparison = async () => {
    setIsLoading(true);
    try {
      const result = await aiService.compareReactions(r1.id, r2.id);
      setComparison(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold mb-2">
          <GitCompare className="w-3.5 h-3.5" />
          <span>SIDE-BY-SIDE ANALYSIS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Reaction Comparison Tool
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Compare any two NCERT reactions to clarify differences in observations, types, and energetic pathways.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div>
          <label className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">
            Select Reaction 1
          </label>
          <select
            value={rx1Id}
            onChange={(e) => setRx1Id(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            {REACTIONS.map((r) => (
              <option key={r.id} value={r.id}>
                Ch {r.chapterNumber}: {r.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">
            Select Reaction 2
          </label>
          <select
            value={rx2Id}
            onChange={(e) => setRx2Id(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            {REACTIONS.map((r) => (
              <option key={r.id} value={r.id}>
                Ch {r.chapterNumber}: {r.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleRunComparison}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-102"
        >
          <Sparkles className="w-4 h-4" />
          <span>Compare Reactions</span>
        </button>
      </div>

      {/* Side-by-Side Cards Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-600 text-white">
              Ch {r1.chapterNumber}
            </span>
            <SafetyBadge mode={r1.experimentMode} size="sm" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {r1.title}
          </h3>

          <div className="p-3 rounded-xl bg-slate-950 text-emerald-300 font-mono text-xs overflow-x-auto">
            {r1.balancedEquation}
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <strong className="text-slate-400 font-mono">Reaction Types: </strong>
              <span className="text-slate-800 dark:text-slate-200">{r1.reactionType.join(", ")}</span>
            </div>
            <div>
              <strong className="text-slate-400 font-mono">Energy Change: </strong>
              <span className="text-slate-800 dark:text-slate-200">{r1.energyChange || "Neutral"}</span>
            </div>
            <div>
              <strong className="text-slate-400 font-mono">Primary Observation: </strong>
              <p className="text-slate-700 dark:text-slate-300 mt-0.5">{r1.observations[0]}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => onSelectReaction(r1)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Inspect Details
            </button>
            <button
              onClick={() => onRunExperiment(r1)}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm"
            >
              Simulate
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-600 text-white">
              Ch {r2.chapterNumber}
            </span>
            <SafetyBadge mode={r2.experimentMode} size="sm" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {r2.title}
          </h3>

          <div className="p-3 rounded-xl bg-slate-950 text-emerald-300 font-mono text-xs overflow-x-auto">
            {r2.balancedEquation}
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <strong className="text-slate-400 font-mono">Reaction Types: </strong>
              <span className="text-slate-800 dark:text-slate-200">{r2.reactionType.join(", ")}</span>
            </div>
            <div>
              <strong className="text-slate-400 font-mono">Energy Change: </strong>
              <span className="text-slate-800 dark:text-slate-200">{r2.energyChange || "Neutral"}</span>
            </div>
            <div>
              <strong className="text-slate-400 font-mono">Primary Observation: </strong>
              <p className="text-slate-700 dark:text-slate-300 mt-0.5">{r2.observations[0]}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => onSelectReaction(r2)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Inspect Details
            </button>
            <button
              onClick={() => onRunExperiment(r2)}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm"
            >
              Simulate
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Analysis Synthesis Card */}
      {comparison && (
        <div className="rounded-3xl border border-blue-500/30 bg-slate-50 dark:bg-slate-950/60 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Comparative NCERT Analysis
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                Key Similarities
              </h4>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                {comparison.similarities.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-2">
                Distinguishing Differences
              </h4>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                {comparison.differences.map((d, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-500">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            <strong className="text-amber-600 dark:text-amber-400">Board Exam Distinction Tip: </strong>
            {comparison.examTakeaway}
          </div>
        </div>
      )}
    </div>
  );
};
