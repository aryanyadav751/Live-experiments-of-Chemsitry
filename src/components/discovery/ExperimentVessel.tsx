import React, { useState } from "react";
import { DiscoverySubstance, Reaction, DiscoveryReactionResult } from "../../types";
import { getSubstanceById } from "../../data/substances";
import { SimulationConditions } from "../../data/discoveryRules";
import { ExperimentStage } from "../animation/ExperimentStage";
import {
  Flame,
  Sun,
  Zap,
  Droplets,
  RotateCcw,
  Play,
  X,
  Plus,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  Atom
} from "lucide-react";

interface ExperimentVesselProps {
  selectedIds: string[];
  onAddSubstance: (id: string) => void;
  onRemoveSubstance: (id: string) => void;
  onClearAll: () => void;
  conditions: SimulationConditions;
  onToggleCondition: (key: keyof SimulationConditions) => void;
  onRunExperiment: () => void;
  isRunning: boolean;
  activeVisualEffect?: {
    color?: string;
    hasBubbles?: boolean;
    hasPrecipitate?: boolean;
    precipitateColor?: string;
    temperatureChange?: number;
    gasName?: string;
    flameColor?: string;
  };
  reactionOccurred?: boolean;
  reaction?: Reaction | null;
  discoveryResult?: DiscoveryReactionResult | null;
  hasRun?: boolean;
  onAskGeminiPrompt?: (prompt: string) => void;
  onView3DModal?: () => void;
  onBalanceEquation?: () => void;
}

export const ExperimentVessel: React.FC<ExperimentVesselProps> = ({
  selectedIds,
  onAddSubstance,
  onRemoveSubstance,
  onClearAll,
  conditions,
  onToggleCondition,
  onRunExperiment,
  isRunning,
  activeVisualEffect,
  reactionOccurred,
  reaction = null,
  discoveryResult = null,
  hasRun = false,
  onAskGeminiPrompt,
  onView3DModal,
  onBalanceEquation
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const selectedSubstances: DiscoverySubstance[] = selectedIds
    .map((id) => getSubstanceById(id))
    .filter((s): s is DiscoverySubstance => s !== undefined);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id && !selectedIds.includes(id)) {
      onAddSubstance(id);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
      {/* Top Bar */}
      <div className="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-blue-500" />
          <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
            Virtual Workbench
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Animated Stage
          </span>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          disabled={selectedIds.length === 0}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Vessel</span>
        </button>
      </div>

      {/* Reagents Drop Strip */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-3 border-b transition-colors ${
          isDragOver
            ? "bg-blue-50/90 dark:bg-blue-950/60 border-blue-400 border-dashed"
            : "bg-slate-50/40 dark:bg-slate-950/40 border-slate-100 dark:border-slate-800"
        }`}
      >
        <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Reagents Loaded in Apparatus ({selectedSubstances.length}/4)</span>
          <span className="text-[10px] lowercase font-normal">drag or click chemicals from shelf</span>
        </div>

        {selectedSubstances.length === 0 ? (
          <div className="py-3.5 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center">
            <Plus className="w-5 h-5 text-slate-400 mb-1" />
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Vessel is empty
            </p>
            <p className="text-[11px] text-slate-400">
              Select chemicals from the shelf to prepare the virtual practical
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {selectedSubstances.map((sub) => (
              <div
                key={sub.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                  style={{ backgroundColor: sub.color }}
                />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {sub.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {sub.formula}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveSubstance(sub.id)}
                  aria-label={`Remove ${sub.name}`}
                  className="ml-1 text-slate-400 hover:text-rose-500 p-0.5 rounded-full transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Animated Experiment Stage Area */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
        {selectedSubstances.length > 0 || hasRun ? (
          <ExperimentStage
            reaction={reaction}
            discoveryResult={discoveryResult}
            selectedSubstances={selectedIds}
            conditions={conditions}
            onAskGeminiPrompt={onAskGeminiPrompt}
            onView3DModal={onView3DModal}
            onBalanceEquation={onBalanceEquation}
            onResetLab={onClearAll}
            hasRun={hasRun}
          />
        ) : (
          <div className="w-full h-72 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center text-slate-400 select-none">
            <FlaskConical className="w-14 h-14 text-slate-700 mb-3 animate-pulse" />
            <h4 className="text-sm font-bold text-slate-200">
              Laboratory Ready for Experimentation
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mt-1">
              Select one or more chemicals from the shelf, apply virtual thermal or electrical energy, and initiate the animated practical simulation.
            </p>
          </div>
        )}
      </div>

      {/* Smart Virtual Conditions Section */}
      <div className="p-3.5 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Smart Virtual Environmental Conditions
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          <button
            type="button"
            onClick={() => onToggleCondition("heat")}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
              conditions.heat
                ? "bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/20"
                : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>🔥 Virtual Heat</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleCondition("light")}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
              conditions.light
                ? "bg-yellow-500 text-white border-yellow-500 shadow-sm shadow-yellow-500/20"
                : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-yellow-400"
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-yellow-500" />
            <span>☀️ Solar Light</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleCondition("electricity")}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
              conditions.electricity
                ? "bg-cyan-500 text-white border-cyan-500 shadow-sm shadow-cyan-500/20"
                : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-400"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-cyan-500" />
            <span>⚡ DC Current</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleCondition("water")}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
              conditions.water
                ? "bg-blue-500 text-white border-blue-500 shadow-sm shadow-blue-500/20"
                : "bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400"
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-blue-500" />
            <span>💧 Aqueous Medium</span>
          </button>
        </div>

        {/* PRIMARY ACTION BUTTON */}
        <button
          type="button"
          onClick={onRunExperiment}
          disabled={selectedIds.length === 0 || isRunning}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{isRunning ? "INITIALIZING SIMULATION..." : "RUN VIRTUAL EXPERIMENT"}</span>
        </button>
      </div>
    </div>
  );
};
