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
import { ExperimentStage } from "./animation/ExperimentStage";

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
        <div className="lg:col-span-8 flex flex-col items-center w-full">
          <ExperimentStage
            reaction={reaction}
            onExperimentComplete={() => markExperimentSimulated(reaction.id)}
          />
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
