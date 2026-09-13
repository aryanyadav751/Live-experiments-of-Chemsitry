import React, { useState, useEffect, useRef, useMemo } from "react";
import { Reaction } from "../types";
import { getExperimentForReaction, Experiment } from "../data/experiments";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Thermometer,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Atom,
  Clock,
  HelpCircle,
  StepForward,
  ChevronRight,
  ShieldAlert,
  Beaker
} from "lucide-react";
import { SafetyBadge } from "./SafetyBadge";
import { MolecularAnimation } from "./MolecularAnimation";
import { Molecular3DViewer } from "./Molecular3DViewer";
import { ObservationPanel } from "./ObservationPanel";
import { ReactionEquation } from "./ReactionEquation";
import { markExperimentSimulated } from "../utils/progress";

interface ExperimentSimulatorProps {
  reaction: Reaction;
  onClose?: () => void;
  className?: string;
}

const TIMELINE_STAGES = [
  { id: 0, label: "Reactants", sub: "Setup apparatus & reagents" },
  { id: 1, label: "Mixing", sub: "Contact & physical interaction" },
  { id: 2, label: "Reaction", sub: "Chemical reorganization & heat" },
  { id: 3, label: "Observation", sub: "Qualitative laboratory cues" },
  { id: 4, label: "Products", sub: "Final chemical yield" }
];

export const ExperimentSimulator: React.FC<ExperimentSimulatorProps> = ({
  reaction,
  onClose,
  className = ""
}) => {
  // Load data-driven experiment specification
  const experiment: Experiment = useMemo(() => getExperimentForReaction(reaction), [reaction]);

  // Simulation progression state: 0 (Reactants), 1 (Mixing), 2 (Reaction), 3 (Observation), 4 (Products)
  const [stage, setStage] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.5 | 1 | 2>(1);
  const [showMolecularView, setShowMolecularView] = useState<boolean>(false);
  const [showEquation, setShowEquation] = useState<boolean>(true);
  const [showObservation, setShowObservation] = useState<boolean>(true);

  const timerRef = useRef<any>(null);
  const config = reaction.simulatorConfig;

  // Track simulation completion in student progress
  useEffect(() => {
    if (stage === 4) {
      markExperimentSimulated(reaction.id);
    }
  }, [stage, reaction.id]);

  // Stage timer progression
  useEffect(() => {
    if (isPlaying) {
      const baseDuration = 2200;
      const stepDuration = baseDuration / playbackSpeed;
      timerRef.current = setTimeout(() => {
        setStage((prev) => {
          if (prev < 4) return prev + 1;
          setIsPlaying(false);
          return 4;
        });
      }, stepDuration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, stage, playbackSpeed]);

  const handleStartOrResume = () => {
    if (stage === 4) {
      setStage(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleRestart = () => {
    setIsPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    setStage(0);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    setStage((prev) => Math.min(4, prev + 1));
  };

  // Fluid and reaction colors
  const initialLiquid = config?.primarySubstance.liquidColor || "#e0f2fe";
  const finalLiquid = config?.reactionResult.liquidColor || initialLiquid;
  const currentLiquidColor = stage <= 1 ? initialLiquid : finalLiquid;
  const hasBubbles = Boolean(config?.reactionResult.bubbles && (stage === 2 || stage === 3));
  const hasPrecipitate = Boolean(config?.reactionResult.hasPrecipitate && stage >= 3);
  const depositText = stage >= 2 ? config?.reactionResult.depositOnSolid : null;

  return (
    <div
      id={`simulator-${reaction.id}`}
      className={`rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden flex flex-col ${className}`}
    >
      {/* Top Laboratory Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 font-bold text-lg">
            🧪
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Chapter {reaction.chapterNumber} • {experiment.animationType.toUpperCase()}
              </span>
              <SafetyBadge mode={experiment.safetyLevel} size="sm" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
              {experiment.title}
            </h2>
          </div>
        </div>

        {/* View Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowMolecularView(!showMolecularView)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              showMolecularView
                ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400"
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            {showMolecularView ? "Hide 3D View" : "3D Molecular View"}
          </button>

          <button
            onClick={() => setShowEquation(!showEquation)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              showEquation
                ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 border-transparent"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
            }`}
          >
            Equation
          </button>

          <button
            onClick={() => setShowObservation(!showObservation)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              showObservation
                ? "bg-emerald-600 text-white border-emerald-500"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
            }`}
          >
            Observations
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-200/60 dark:bg-slate-800"
            >
              Exit Lab
            </button>
          )}
        </div>
      </div>

      {/* Safety Guideline Banner */}
      <div className="px-4 sm:px-6 py-2.5 bg-amber-500/10 border-b border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <strong className="font-bold">Safety Directive:</strong>
          <span>{experiment.safetyPrecautions[0]}</span>
        </span>
        <span className="font-mono text-[11px] text-amber-700 dark:text-amber-400 font-bold">
          CBSE Class 10 Aligned Simulation
        </span>
      </div>

      {/* Mandatory Experiment Timeline: Reactants → Mixing → Reaction → Observation → Products */}
      <div className="px-4 sm:px-6 py-3 bg-slate-100 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
        <div className="flex items-center min-w-[540px] justify-between">
          {TIMELINE_STAGES.map((t, idx) => {
            const isCurrent = stage === t.id;
            const isCompleted = stage > t.id;

            return (
              <React.Fragment key={t.id}>
                {idx > 0 && (
                  <div className={`h-[2px] flex-1 mx-2 transition-colors ${
                    isCompleted ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-800"
                  }`} />
                )}
                <button
                  onClick={() => {
                    setStage(t.id);
                    setIsPlaying(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all ${
                    isCurrent
                      ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/25 scale-105"
                      : isCompleted
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] ${
                    isCurrent
                      ? "bg-white text-blue-600 font-bold"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}>
                    {isCompleted ? "✓" : t.id + 1}
                  </span>
                  <div className="text-left">
                    <div className="font-bold leading-tight">{t.label}</div>
                  </div>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Optional Top Equation View */}
      {showEquation && (
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-900/30">
          <ReactionEquation reaction={reaction} interactive={true} size="md" />
        </div>
      )}

      {/* Genuine 3D Molecular View if active */}
      {showMolecularView && (
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-950 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-indigo-400 font-bold flex items-center gap-2">
              <Atom className="w-4 h-4" />
              WebGL Three.js 3D Molecular Simulation
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Drag to rotate • Wheel to zoom
            </span>
          </div>
          <Molecular3DViewer reaction={reaction} height={380} />
        </div>
      )}

      {/* Main Simulation Stage & Controls Area */}
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stage Container (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col items-center">
          {/* Virtual Bench / Canvas */}
          <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl flex flex-col items-center justify-end p-6 overflow-hidden">
            {/* Lab Grid lines backdrop */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Stage Indicator Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 font-mono text-xs text-slate-200 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl shadow-md">
              <span className={`w-2.5 h-2.5 rounded-full ${
                stage === 0 ? "bg-slate-400" : stage === 1 ? "bg-blue-400 animate-pulse" : stage === 2 ? "bg-amber-400 animate-pulse" : stage === 3 ? "bg-purple-400 animate-pulse" : "bg-emerald-400"
              }`} />
              <span className="font-bold">
                {TIMELINE_STAGES[stage].label}: {TIMELINE_STAGES[stage].sub}
              </span>
            </div>

            {/* Exothermic / Endothermic Temperature Thermometer Display */}
            {config?.reactionResult.tempDisplay && (
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono shadow-md">
                <Thermometer className={`w-4 h-4 ${
                  config.reactionResult.tempChange === "exothermic" ? "text-rose-500 animate-pulse" : config.reactionResult.tempChange === "endothermic" ? "text-cyan-400" : "text-emerald-400"
                }`} />
                <span className="text-slate-200 font-bold">{config.reactionResult.tempDisplay}</span>
              </div>
            )}

            {/* Dynamic Glassware Apparatus Display */}
            <div className="relative flex flex-col items-center z-10 mb-4">
              {/* Flame animation for combustion or heating reactions */}
              {(config?.reactionResult.flameColor || config?.addedSubstance?.type === "heat") && stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: [1, 1.15, 1], y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="absolute -bottom-8 w-16 h-12 z-0 flex items-center justify-center"
                >
                  <div
                    className="w-12 h-14 rounded-full blur-[3px]"
                    style={{
                      background: config?.reactionResult.flameColor
                        ? `radial-gradient(circle, ${config.reactionResult.flameColor}, transparent)`
                        : "radial-gradient(circle, #f97316, #eab308, transparent)"
                    }}
                  />
                </motion.div>
              )}

              {/* Glassware Container Body */}
              <div
                className={`relative border-2 border-slate-400/50 bg-slate-800/20 backdrop-blur-sm shadow-2xl flex flex-col justify-end items-center overflow-hidden transition-colors duration-1000 ${
                  config?.apparatus === "test-tube"
                    ? "w-24 sm:w-28 h-56 sm:h-64 rounded-b-full border-t-0"
                    : config?.apparatus === "crucible" || config?.apparatus === "china-dish"
                    ? "w-44 sm:w-52 h-24 sm:h-28 rounded-b-3xl border-t-0"
                    : "w-44 sm:w-52 h-52 sm:h-60 rounded-b-2xl rounded-t-sm"
                }`}
              >
                {/* Volume graduation markings on glassware */}
                <div className="absolute left-2 inset-y-6 flex flex-col justify-between pointer-events-none opacity-40">
                  <span className="w-2.5 h-[1.5px] bg-white text-[8px] font-mono text-slate-300 pl-3.5">100ml</span>
                  <span className="w-1.5 h-[1px] bg-white" />
                  <span className="w-2.5 h-[1.5px] bg-white text-[8px] font-mono text-slate-300 pl-3.5">50ml</span>
                  <span className="w-1.5 h-[1px] bg-white" />
                  <span className="w-2.5 h-[1.5px] bg-white text-[8px] font-mono text-slate-300 pl-3.5">20ml</span>
                </div>

                {/* Submerged Solid Object */}
                {config?.primarySubstance.solidColor && (
                  <motion.div
                    animate={
                      depositText
                        ? { filter: "sepia(0.8) hue-rotate(-30deg) saturate(2)" }
                        : {}
                    }
                    className="absolute z-10 w-4 h-24 sm:h-28 rounded-t-sm rounded-b-full shadow-md transition-all duration-1000"
                    style={{ backgroundColor: config.primarySubstance.solidColor }}
                  >
                    <div className="w-full text-center text-[8px] font-mono font-bold text-white pt-1">
                      {config.primarySubstance.formula}
                    </div>
                  </motion.div>
                )}

                {/* Insoluble Precipitate Layer at bottom if active */}
                {hasPrecipitate && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 28, opacity: 0.95 }}
                    transition={{ duration: 1.2 }}
                    className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-center font-mono text-[10px] font-bold text-slate-900 shadow-md"
                    style={{ backgroundColor: config?.reactionResult.precipitateColor || "#ffffff" }}
                  >
                    {config?.reactionResult.precipitateName || "Precipitate ↓"}
                  </motion.div>
                )}

                {/* Fluid Liquid with Animated Color Transition */}
                <motion.div
                  animate={{
                    backgroundColor: currentLiquidColor,
                    height: stage === 0 ? "55%" : "65%"
                  }}
                  transition={{ duration: 1.2 / playbackSpeed }}
                  className="w-full relative flex items-center justify-center opacity-85 overflow-hidden"
                >
                  {/* Liquid meniscus surface wave */}
                  <div className="absolute top-0 inset-x-0 h-2 bg-white/20 blur-[1px]" />

                  {/* Gas bubbles rising through liquid */}
                  {hasBubbles && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            y: [40, -100],
                            x: [(i % 2 === 0 ? -6 : 6), (i % 2 === 0 ? 8 : -8)],
                            opacity: [0, 0.9, 0],
                            scale: [0.5, 1.2, 0.8]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.9 + (i % 5) * 0.25,
                            delay: (i * 0.15)
                          }}
                          className="absolute bottom-2 w-2.5 h-2.5 rounded-full bg-white/70 border border-white shadow-sm"
                          style={{ left: `${15 + (i * 7)}%` }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Liquid Label */}
                  <span className="text-[11px] font-mono font-bold text-slate-900 bg-white/70 px-2 py-0.5 rounded shadow-sm">
                    {stage < 3 ? config?.primarySubstance.formula || reaction.reactants[0] : reaction.products[0]?.split("(")[0]}
                  </span>
                </motion.div>
              </div>

              {/* Lab Bench Stand */}
              <div className="w-56 sm:w-64 h-3 rounded-md bg-slate-700 shadow-lg border-t border-slate-600 mt-0.5" />
            </div>

            {/* Apparatus list badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-slate-300 text-xs">
              <span className="font-mono text-[11px] text-slate-400">Apparatus:</span>
              {experiment.apparatus.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/80 text-[11px] font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Laboratory Controls Panel: Play, Pause, Step, Restart, 0.5x, 1x, 2x */}
          <div className="w-full mt-4 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
            {/* Primary Action Button */}
            <div className="flex items-center gap-2">
              {isPlaying ? (
                <button
                  onClick={handlePause}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={handleStartOrResume}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all hover:scale-102 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{stage === 0 ? "Play Simulation" : stage === 4 ? "Replay" : "Resume"}</span>
                </button>
              )}

              <button
                onClick={handleStepForward}
                disabled={stage >= 4}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 text-xs font-bold transition-colors disabled:opacity-40"
                title="Advance to next stage"
              >
                <StepForward className="w-3.5 h-3.5" />
                <span>Step</span>
              </button>

              <button
                onClick={handleRestart}
                className="p-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                title="Restart Experiment"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Speed Controls: 0.5x, 1x, 2x */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-mono">
              <span className="text-[10px] text-slate-400 pl-1">Speed:</span>
              {([0.5, 1, 2] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-1 rounded-lg font-bold transition-all ${
                    playbackSpeed === spd
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Experiment Guide & Observations Side Panel (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Data-Driven Steps from experiments.ts */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4 sm:p-5 space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              NCERT Protocol Steps
            </h4>

            <div className="space-y-2">
              {experiment.steps.map((st, idx) => {
                const isCurrent = stage === idx;
                const isDone = stage > idx;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setStage(idx);
                      setIsPlaying(false);
                    }}
                    className={`cursor-pointer p-3 rounded-xl border text-xs leading-relaxed transition-all ${
                      isCurrent
                        ? "bg-blue-500/15 border-blue-500/40 text-blue-950 dark:text-blue-200 font-medium ring-1 ring-blue-500/30"
                        : isDone
                        ? "bg-emerald-500/10 border-emerald-500/20 text-slate-700 dark:text-slate-300"
                        : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-1">
                      {isDone ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center font-mono text-[10px]">
                          {st.step}
                        </span>
                      )}
                      <span>{st.title}</span>
                    </div>
                    <p>{st.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Observations panel */}
          {showObservation && (
            <ObservationPanel reaction={reaction} />
          )}
        </div>
      </div>
    </div>
  );
};
