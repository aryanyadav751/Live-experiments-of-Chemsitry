import React, { useState } from "react";
import { Reaction } from "../types";
import { REACTIONS, getReactionsByChapter } from "../data/reactions";
import { ExperimentSimulator } from "../components/ExperimentSimulator";
import { FlaskConical, Sparkles, ChevronRight, Layers } from "lucide-react";

interface VirtualLabPageProps {
  selectedReaction?: Reaction | null;
  onSelectReaction: (reaction: Reaction) => void;
}

export const VirtualLabPage: React.FC<VirtualLabPageProps> = ({
  selectedReaction,
  onSelectReaction
}) => {
  const [currentRx, setCurrentRx] = useState<Reaction>(selectedReaction || REACTIONS[0]);
  const [filterChapter, setFilterChapter] = useState<number | "all">("all");

  const filteredReactions = filterChapter === "all"
    ? REACTIONS
    : getReactionsByChapter(filterChapter);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold mb-2">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>INTERACTIVE SIMULATOR</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Virtual Chemistry Lab
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Safely simulate NCERT Class 10 chemical experiments with virtual glassware, fluid animations, and real-time sensory observations.
          </p>
        </div>

        {/* Experiment Selector Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={currentRx.id}
            onChange={(e) => {
              const rx = REACTIONS.find((r) => r.id === e.target.value);
              if (rx) setCurrentRx(rx);
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            {REACTIONS.map((r) => (
              <option key={r.id} value={r.id}>
                Ch {r.chapterNumber}: {r.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Interactive Laboratory Apparatus Canvas */}
      <div>
        <ExperimentSimulator reaction={currentRx} key={currentRx.id} />
      </div>

      {/* Quick Switch Carousel / Tray */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Quick Switch Laboratory Experiments
            </h3>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400 font-mono mr-1">Filter:</span>
            {[
              { num: "all" as const, label: "All" },
              { num: 1, label: "Ch 1" },
              { num: 2, label: "Ch 2" },
              { num: 3, label: "Ch 3" },
              { num: 4, label: "Ch 4" }
            ].map((c) => (
              <button
                key={String(c.num)}
                onClick={() => setFilterChapter(c.num)}
                className={`px-2.5 py-0.5 rounded-full font-mono text-xs ${
                  filterChapter === c.num
                    ? "bg-blue-600 text-white font-bold"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Scrolling Experiment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredReactions.slice(0, 8).map((r) => {
            const isSelected = r.id === currentRx.id;
            return (
              <button
                key={r.id}
                onClick={() => setCurrentRx(r)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? "border-blue-500 bg-blue-500/10 dark:bg-blue-500/15 text-blue-900 dark:text-blue-200 ring-1 ring-blue-500/30"
                    : "border-slate-200 dark:border-slate-800 hover:border-blue-400 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>Ch {r.chapterNumber}</span>
                  <span className="capitalize">{r.simulatorConfig?.apparatus || "beaker"}</span>
                </div>
                <div className="font-bold text-xs line-clamp-1">{r.title}</div>
                <div className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 truncate mt-1">
                  {r.balancedEquation}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
