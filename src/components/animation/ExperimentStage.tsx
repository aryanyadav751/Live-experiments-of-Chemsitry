import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Reaction, DiscoveryReactionResult } from "../../types";
import { SimulationConditions } from "../../data/discoveryRules";
import {
  generateTimelineForReaction,
  GeneratedTimeline
} from "./timelineGenerator";
import {
  ExperimentAnimationStep,
  PredictionOption
} from "./animationTypes";
import { ApparatusRenderer } from "./ApparatusRenderer";
import { ChemicalTransferAnimation } from "./ChemicalTransferAnimation";
import { LiquidAnimation } from "./LiquidAnimation";
import { MixingAnimation } from "./MixingAnimation";
import { GasBubbleAnimation } from "./GasBubbleAnimation";
import { PrecipitateAnimation } from "./PrecipitateAnimation";
import { ColorChangeAnimation } from "./ColorChangeAnimation";
import { TemperatureAnimation } from "./TemperatureAnimation";
import { ParticleReactionAnimation } from "./ParticleReactionAnimation";
import { ReactionEffect } from "./ReactionEffect";
import { ExperimentTimeline } from "./ExperimentTimeline";
import { PredictionModal } from "./PredictionModal";
import { BeforeAfterCompareModal } from "./BeforeAfterCompareModal";
import { Molecular3DViewer } from "../Molecular3DViewer";
import {
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Atom,
  Eye,
  CheckCircle2,
  HelpCircle,
  Zap,
  SplitSquareVertical,
  Maximize2,
  Minimize2,
  Check,
  Flame,
  ArrowRight,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ExperimentStageProps {
  reaction: Reaction | null;
  discoveryResult?: DiscoveryReactionResult | null;
  selectedSubstances?: string[];
  conditions?: SimulationConditions;
  onExperimentComplete?: (predictionMatch?: boolean) => void;
  onAskGeminiPrompt?: (prompt: string) => void;
  onView3DModal?: () => void;
  onBalanceEquation?: () => void;
  onResetLab?: () => void;
  className?: string;
  hasRun?: boolean;
}

export const ExperimentStage: React.FC<ExperimentStageProps> = ({
  reaction,
  discoveryResult,
  selectedSubstances = [],
  conditions = { heat: false, water: false },
  onExperimentComplete,
  onAskGeminiPrompt,
  onView3DModal,
  onBalanceEquation,
  onResetLab,
  className = "",
  hasRun = false
}) => {
  // Check user preference for reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  // Generate data-driven timeline
  const timeline: GeneratedTimeline = useMemo(() => {
    return generateTimelineForReaction(reaction, discoveryResult, selectedSubstances);
  }, [reaction, discoveryResult, selectedSubstances]);

  // Timeline execution state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.5 | 1 | 2>(1);
  const [stepProgress, setStepProgress] = useState(0); // 0 to 1
  const [interactiveMode, setInteractiveMode] = useState(false);

  // Student Prediction State
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  const [studentPrediction, setStudentPrediction] = useState<PredictionOption | null>(null);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Split-screen & View Tab state
  // On desktop: can show split-screen [Experiment | Molecular]
  // On mobile: tabs [Experiment] | [Molecular 3D]
  const [activeViewTab, setActiveViewTab] = useState<"experiment" | "molecular">("experiment");
  const [isSplitScreen, setIsSplitScreen] = useState(true);

  // Step timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep: ExperimentAnimationStep = timeline.steps[currentStepIndex] || timeline.steps[0];
  const isFinished = currentStepIndex >= timeline.steps.length - 1 && stepProgress >= 1;

  // Visual state derivations
  const isPouring = currentStep.visualEffects?.pouring === true;
  const isDroppingSolid = currentStep.visualEffects?.droppingSolid === true;
  const isStirring = currentStep.visualEffects?.stirring === true;
  const isReactionActive = currentStep.type === "react" || currentStep.type === "observe" || currentStep.type === "product";
  const isStartingReaction = currentStep.type === "react" && stepProgress < 0.35;

  // Liquid level calculation
  const liquidFillPercentage = useMemo(() => {
    if (currentStepIndex === 0) return 0; // setup, empty vessel
    if (currentStepIndex === 1) return Math.min(50, stepProgress * 50); // primary pouring
    if (currentStepIndex === 2 && timeline.addedReagents[0]?.state === "liquid") {
      return 50 + stepProgress * 15; // secondary pouring
    }
    return 65; // filled during mix and reaction
  }, [currentStepIndex, stepProgress, timeline.addedReagents]);

  // Liquid Color Interpolation
  const currentLiquidColor = useMemo(() => {
    if (!isReactionActive) {
      return timeline.initialColor;
    }
    // Interpolate gradually to final color during reaction
    if (currentStep.type === "react") {
      return stepProgress > 0.5 ? timeline.finalColor : timeline.initialColor;
    }
    return timeline.finalColor;
  }, [isReactionActive, currentStep.type, stepProgress, timeline.initialColor, timeline.finalColor]);

  // Progress animation runner
  useEffect(() => {
    if (!isPlaying) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const duration = currentStep.duration / playbackSpeed;
    const intervalMs = 40;
    const increment = intervalMs / duration;

    progressIntervalRef.current = setInterval(() => {
      setStepProgress((prev) => {
        const next = prev + increment;
        if (next >= 1) {
          clearInterval(progressIntervalRef.current!);
          // Advance to next step if not last step
          if (currentStepIndex < timeline.steps.length - 1) {
            setCurrentStepIndex((s) => s + 1);
            return 0;
          } else {
            setIsPlaying(false);
            // Completed experiment!
            if (onExperimentComplete) {
              const matched = studentPrediction
                ? checkPredictionAccuracy(studentPrediction, timeline)
                : undefined;
              onExperimentComplete(matched);
            }
            return 1;
          }
        }
        return next;
      });
    }, intervalMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, currentStepIndex, currentStep, playbackSpeed, timeline, onExperimentComplete, studentPrediction]);

  // Prediction accuracy checker
  function checkPredictionAccuracy(pred: PredictionOption, tl: GeneratedTimeline): boolean {
    switch (pred.category) {
      case "color_change":
        return tl.initialColor.toLowerCase() !== tl.finalColor.toLowerCase();
      case "gas_formation":
        return tl.hasGas;
      case "precipitate":
        return tl.hasPrecipitate;
      case "temperature":
        return tl.tempChange === "exothermic" || tl.tempChange === "endothermic";
      case "metal_deposition":
        return tl.hasDeposit;
      case "new_substance":
        return Boolean(reaction || discoveryResult);
      case "no_reaction":
        return !tl.hasGas && !tl.hasPrecipitate && !tl.hasDeposit && tl.initialColor === tl.finalColor;
      default:
        return true;
    }
  }

  // Playback control handlers
  const handlePlay = useCallback(() => {
    if (currentStepIndex >= timeline.steps.length - 1 && stepProgress >= 1) {
      // Replay from start
      setCurrentStepIndex(0);
      setStepProgress(0);
    }
    setIsPlaying(true);
  }, [currentStepIndex, timeline.steps.length, stepProgress]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleRestart = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setStepProgress(0);
  }, []);

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < timeline.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setStepProgress(0);
    }
  }, [currentStepIndex, timeline.steps.length]);

  const handleSelectStep = useCallback((idx: number) => {
    setCurrentStepIndex(idx);
    setStepProgress(0);
  }, []);

  const handleChangeSpeed = useCallback((speed: 0.5 | 1 | 2) => {
    setPlaybackSpeed(speed);
  }, []);

  // Quick Action in Interactive Step-by-Step mode
  const handlePerformStudentAction = () => {
    // Advances current step progress to completion
    setStepProgress(1);
    if (currentStepIndex < timeline.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setStepProgress(0);
    } else {
      setIsPlaying(false);
      if (onExperimentComplete) {
        onExperimentComplete(true);
      }
    }
  };

  const predictionAccuracy = useMemo(() => {
    if (!studentPrediction || !isFinished) return null;
    return checkPredictionAccuracy(studentPrediction, timeline);
  }, [studentPrediction, isFinished, timeline]);

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Prediction & Comparison Modals */}
      <PredictionModal
        isOpen={showPredictionModal}
        onClose={() => setShowPredictionModal(false)}
        onSubmitPrediction={(pred) => {
          setStudentPrediction(pred);
          handleRestart();
          handlePlay();
        }}
        reactantsList={
          reaction?.reactants ||
          (selectedSubstances.length > 0 ? selectedSubstances.map((s) => s.toUpperCase()) : ["Reactants"])
        }
      />

      <BeforeAfterCompareModal
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        title={reaction?.title || discoveryResult?.title || "Chemical Transformation"}
        initialColor={timeline.initialColor}
        finalColor={timeline.finalColor}
        reactantsText={reaction?.reactants?.join(" + ") || selectedSubstances.join(" + ").toUpperCase()}
        productsText={reaction?.products?.join(" + ") || "New Chemical Products"}
        hasGas={timeline.hasGas}
        gasName={timeline.gasName}
        hasPrecipitate={timeline.hasPrecipitate}
        precipitateName={timeline.precipitateName}
        hasDeposit={timeline.hasDeposit}
        depositText={timeline.depositText}
        tempChange={timeline.tempText}
      />

      {/* Top Action Bar: Mode Switcher, Prediction Prompt, Split View toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-900/90 border border-slate-800 p-2.5 sm:p-3 rounded-2xl shadow-md">
        <div className="flex items-center gap-2">
          {/* Mode Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Animation Engine 2.0</span>
          </div>

          {/* Autoplay vs Interactive Student mode */}
          <button
            type="button"
            onClick={() => setInteractiveMode(!interactiveMode)}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all border ${
              interactiveMode
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
            }`}
          >
            {interactiveMode ? "✋ Student Interactive" : "🎬 Cinematic Autoplay"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Scientific Prediction Button */}
          <button
            type="button"
            onClick={() => setShowPredictionModal(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{studentPrediction ? `Hypothesis: ${studentPrediction.label}` : "Make Prediction"}</span>
          </button>

          {/* Before / After comparison (Section 28) */}
          {isFinished && (
            <button
              type="button"
              onClick={() => setShowCompareModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compare Before/After</span>
            </button>
          )}

          {/* Desktop Split-Screen Toggle */}
          <div className="hidden lg:flex items-center">
            <button
              type="button"
              onClick={() => setIsSplitScreen(!isSplitScreen)}
              className={`p-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${
                isSplitScreen
                  ? "bg-blue-600/20 text-blue-300 border-blue-500/30"
                  : "bg-slate-800 text-slate-400 border-slate-700"
              }`}
              title="Toggle Split-Screen Macro vs Molecular View"
            >
              <SplitSquareVertical className="w-4 h-4" />
              <span className="text-[11px]">Split-Screen</span>
            </button>
          </div>

          {/* Mobile Tab Switcher */}
          <div className="flex lg:hidden items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setActiveViewTab("experiment")}
              className={`px-2 py-1 rounded-lg text-xs font-bold ${
                activeViewTab === "experiment" ? "bg-blue-600 text-white" : "text-slate-400"
              }`}
            >
              🧪 Lab
            </button>
            <button
              type="button"
              onClick={() => setActiveViewTab("molecular")}
              className={`px-2 py-1 rounded-lg text-xs font-bold ${
                activeViewTab === "molecular" ? "bg-blue-600 text-white" : "text-slate-400"
              }`}
            >
              ⚛️ Molecular 3D
            </button>
          </div>
        </div>
      </div>

      {/* Main Split-Screen Stage Container */}
      <div
        className={`grid gap-4 items-stretch ${
          isSplitScreen ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"
        }`}
      >
        {/* ================= LEFT VIEW: EXPERIMENT VIEW (APPARATUS & PRACTICAL) ================= */}
        <div
          className={`${
            isSplitScreen ? "lg:col-span-7" : "w-full"
          } ${activeViewTab === "molecular" ? "hidden lg:block" : "block"}`}
        >
          <div className="relative w-full h-84 sm:h-96 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl flex flex-col items-center justify-end p-6 overflow-hidden select-none">
            {/* Lab Bench Wall Tiles / Grid Lines backdrop */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            {/* Stage Indicator Badge */}
            <div className="absolute top-4 left-4 z-30 flex items-center gap-2 font-mono text-xs text-slate-200 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl shadow-md backdrop-blur-xs">
              <span className={`w-2.5 h-2.5 rounded-full ${
                currentStep.type === "setup" ? "bg-slate-400" :
                currentStep.type === "pour" || currentStep.type === "add" ? "bg-blue-400 animate-pulse" :
                currentStep.type === "mix" ? "bg-amber-400 animate-pulse" :
                currentStep.type === "react" ? "bg-purple-400 animate-pulse" :
                "bg-emerald-400"
              }`} />
              <span className="font-bold">
                {currentStep.stageIndex + 1}. {currentStep.title}
              </span>
            </div>

            {/* Reaction Type / Apparatus Type Chip */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 font-mono text-[10px] text-slate-300 bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded-xl shadow-md">
              <span className="capitalize">{timeline.apparatus.replace("-", " ")}</span>
              {reaction?.reactionType?.[0] && (
                <>
                  <span className="text-slate-600">•</span>
                  <span className="text-blue-400">{reaction.reactionType[0]}</span>
                </>
              )}
            </div>

            {/* Interactive Student Action Cue (In Interactive Mode) */}
            {interactiveMode && currentStep.actionPrompt && !isFinished && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-14 inset-x-8 z-35 flex items-center justify-between bg-amber-500/20 border border-amber-500/50 backdrop-blur-md p-2 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-amber-200">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>Your Action: {currentStep.actionPrompt}</span>
                </div>
                <button
                  type="button"
                  onClick={handlePerformStudentAction}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs flex items-center gap-1"
                >
                  <span>Perform Action</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}

            {/* Chemical Transfer Pouring & Dropping Animation */}
            <ChemicalTransferAnimation
              reagent={
                currentStepIndex === 1
                  ? timeline.primaryReagent
                  : timeline.addedReagents[0] || null
              }
              isPouring={isPouring}
              isDroppingSolid={isDroppingSolid}
            />

            {/* Dynamic Glassware Apparatus Renderer */}
            <ApparatusRenderer
              apparatus={timeline.apparatus}
              isHeating={timeline.requiresHeat && currentStepIndex >= 3}
              isPhotolysis={timeline.requiresLight}
              isElectrolysis={timeline.requiresElectricity}
            >
              {/* Internal Liquid Animation */}
              {liquidFillPercentage > 0 && (
                <LiquidAnimation
                  fillPercentage={liquidFillPercentage}
                  color={currentLiquidColor}
                  isStirring={isStirring}
                  reducedMotion={reducedMotion}
                />
              )}

              {/* Swirling Vortex Mixing Animation */}
              <MixingAnimation
                isMixing={isStirring}
                speed={playbackSpeed}
                reducedMotion={reducedMotion}
              />

              {/* Gas Bubbles Rising & Effervescence */}
              <GasBubbleAnimation
                active={timeline.hasGas && isReactionActive}
                gasName={timeline.gasName}
                speed={playbackSpeed}
                reducedMotion={reducedMotion}
              />

              {/* Precipitate Formation & Settling Layer */}
              <PrecipitateAnimation
                active={timeline.hasPrecipitate && isReactionActive}
                precipitateName={timeline.precipitateName}
                precipitateColor={timeline.precipitateColor}
                stageProgress={currentStep.type === "product" || currentStep.type === "observe" ? 1 : stepProgress}
                reducedMotion={reducedMotion}
              />

              {/* Metal Deposition (e.g. Copper on Iron Nail) */}
              <ParticleReactionAnimation
                hasDeposit={timeline.hasDeposit && isReactionActive}
                depositText={timeline.depositText}
                depositColor={timeline.depositColor}
                progress={currentStep.type === "product" || currentStep.type === "observe" ? 1 : stepProgress}
                reducedMotion={reducedMotion}
              />
            </ApparatusRenderer>

            {/* Color Shift Indicator Swatch Badge */}
            <ColorChangeAnimation
              initialColor={timeline.initialColor}
              finalColor={timeline.finalColor}
              isChanging={isReactionActive && timeline.initialColor !== timeline.finalColor}
              progress={stepProgress}
              reducedMotion={reducedMotion}
            />

            {/* Immersed Thermometer Temperature Animation */}
            <TemperatureAnimation
              tempChange={timeline.tempChange}
              tempText={timeline.tempText}
              stageProgress={isReactionActive ? stepProgress : 0}
              reducedMotion={reducedMotion}
            />

            {/* Reaction Effect: "REACTION STARTING..." Banner & Radiance Glow */}
            <ReactionEffect
              isStarting={isStartingReaction}
              isVigorous={timeline.hasGas || timeline.requiresHeat}
              glowColor={timeline.finalColor}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>

        {/* ================= RIGHT VIEW: SYNCHRONIZED MOLECULAR 3D VIEW ================= */}
        <div
          className={`${
            isSplitScreen ? "lg:col-span-5" : "w-full"
          } ${activeViewTab === "experiment" ? "hidden lg:block" : "block"}`}
        >
          <div className="w-full h-84 sm:h-96 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden relative">
            {/* Molecular Header */}
            <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between z-20">
              <div className="flex items-center gap-2">
                <Atom className="w-4 h-4 text-purple-400 animate-spin" />
                <span className="font-mono text-xs font-bold text-slate-200">
                  Molecular 3D Simulation
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Drag to rotate • Wheel to zoom
              </span>
            </div>

            {/* Molecular 3D Simulation Viewer */}
            <div className="flex-1 w-full relative bg-slate-950">
              {reaction ? (
                <Molecular3DViewer
                  reaction={reaction}
                  height="100%"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-500">
                  <Atom className="w-12 h-12 text-slate-700 mb-2 animate-pulse" />
                  <p className="text-xs font-mono">
                    Molecular lattice active for verified reactions.
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Select known reactants to inspect atom bonding in 3D.
                  </p>
                </div>
              )}
            </div>

            {/* Molecular Stage Synced Notice */}
            <div className="p-2 bg-slate-950/90 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between px-3">
              <span>Mechanism: {reaction?.simulatorConfig?.molecularScene?.mechanism || "Substance interaction"}</span>
              <span className="text-purple-400 font-bold">
                {currentStep.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= EXPERIMENT TIMELINE CONTROLS ================= */}
      <ExperimentTimeline
        steps={timeline.steps}
        currentStepIndex={currentStepIndex}
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
        stepProgress={stepProgress}
        onPlay={handlePlay}
        onPause={handlePause}
        onRestart={handleRestart}
        onNextStep={handleNextStep}
        onSelectStep={handleSelectStep}
        onChangeSpeed={handleChangeSpeed}
        interactiveMode={interactiveMode}
      />

      {/* ================= OBSERVATION & PREDICTION SUMMARY (POST-EXPERIMENT) ================= */}
      {isFinished && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col gap-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400">
                    PRACTICAL EXPERIMENT COMPLETE ✓
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {reaction?.title || discoveryResult?.title || "Chemical Transformation Observed"}
                </h4>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Practical</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCompareModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Compare Before/After</span>
              </button>
            </div>
          </div>

          {/* Prediction Evaluation Box if student made a prediction */}
          {studentPrediction && (
            <div className={`p-3.5 rounded-2xl border text-xs flex items-start gap-3 ${
              predictionAccuracy
                ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                : "bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200"
            }`}>
              <div className="p-1 rounded-full bg-white dark:bg-slate-900 shrink-0 mt-0.5">
                {predictionAccuracy ? (
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                ) : (
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <div>
                <span className="font-bold">
                  {predictionAccuracy ? "✓ Accurate Hypothesis!" : "💡 Scientific Learning Opportunity:"}
                </span>
                <p className="mt-0.5">
                  Your predicted outcome was <strong>"{studentPrediction.label}"</strong>.{" "}
                  {predictionAccuracy
                    ? "Your physical intuition aligns with verified NCERT chemistry laboratory data! (+10 Discovery XP awarded)"
                    : "Review the verified observations below to understand why this specific physical change manifested."}
                </p>
              </div>
            </div>
          )}

          {/* Observation Auto-Detection Checklist (Section 20) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-850/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-500" />
                <span>Verified Laboratory Observations</span>
              </h5>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    timeline.initialColor !== timeline.finalColor
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                  }`}>
                    {timeline.initialColor !== timeline.finalColor ? "✓" : "–"}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {timeline.initialColor !== timeline.finalColor
                      ? `Visible Colour Shift (${timeline.initialColor} → ${timeline.finalColor})`
                      : "No distinct solution colour change"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    timeline.hasGas
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                  }`}>
                    {timeline.hasGas ? "✓" : "–"}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {timeline.hasGas
                      ? `Gas Evolved: ${timeline.gasName || "Effervescence"}`
                      : "No gaseous effervescence"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    timeline.hasPrecipitate
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                  }`}>
                    {timeline.hasPrecipitate ? "✓" : "–"}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {timeline.hasPrecipitate
                      ? `Precipitate Formed: ${timeline.precipitateName}`
                      : "No insoluble precipitate formed"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    timeline.tempChange !== "neutral"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                  }`}>
                    {timeline.tempChange !== "neutral" ? "✓" : "–"}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {timeline.tempText || "No significant enthalpy temperature shift"}
                  </span>
                </div>

                {timeline.hasDeposit && (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      Deposition: {timeline.depositText}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Chemical Equation & Principles */}
            <div className="bg-slate-50 dark:bg-slate-850/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 mb-1">
                  Chemical Equation
                </h5>
                <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                  {reaction?.balancedEquation || reaction?.equation || discoveryResult?.balancedEquation || discoveryResult?.equation || "Reaction Confirmed"}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                  {reaction?.explanation || discoveryResult?.explanation || "Stoichiometrically verified chemical interaction."}
                </p>
              </div>

              {/* Gemini Context Query Shortcuts */}
              {onAskGeminiPrompt && (
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => onAskGeminiPrompt(`Explain why this reaction occurred in terms of CBSE Class 10 NCERT chemistry: ${reaction?.equation || discoveryResult?.equation}`)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:border-blue-500 transition-colors"
                  >
                    🧠 Why did this reaction occur?
                  </button>
                  <button
                    type="button"
                    onClick={() => onAskGeminiPrompt(`Explain this reaction in simple Hindi and English: ${reaction?.equation || discoveryResult?.equation}`)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:border-blue-500 transition-colors"
                  >
                    🇮🇳 Explain in Hindi
                  </button>
                  {onBalanceEquation && (
                    <button
                      type="button"
                      onClick={onBalanceEquation}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-semibold"
                    >
                      ⚖️ Balance Equation
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
