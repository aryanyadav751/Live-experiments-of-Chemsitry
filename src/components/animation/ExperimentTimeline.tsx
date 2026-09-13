import React from "react";
import { ExperimentAnimationStep } from "./animationTypes";
import { Play, Pause, RotateCcw, SkipForward, FastForward, CheckCircle2 } from "lucide-react";

interface ExperimentTimelineProps {
  steps: ExperimentAnimationStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  playbackSpeed: 0.5 | 1 | 2;
  stepProgress: number; // 0 to 1
  onPlay: () => void;
  onPause: () => void;
  onRestart: () => void;
  onNextStep: () => void;
  onSelectStep: (index: number) => void;
  onChangeSpeed: (speed: 0.5 | 1 | 2) => void;
  interactiveMode?: boolean;
}

export const ExperimentTimeline: React.FC<ExperimentTimelineProps> = ({
  steps,
  currentStepIndex,
  isPlaying,
  playbackSpeed,
  stepProgress,
  onPlay,
  onPause,
  onRestart,
  onNextStep,
  onSelectStep,
  onChangeSpeed,
  interactiveMode = false
}) => {
  const currentStep = steps[currentStepIndex] || steps[0];

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col gap-3">
      {/* Step Buttons Flow Bar */}
      <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {steps.map((step, idx) => {
          const isCurrent = currentStepIndex === idx;
          const isCompleted = currentStepIndex > idx;

          return (
            <React.Fragment key={step.id}>
              {idx > 0 && (
                <div
                  className={`h-[2px] flex-1 min-w-3 transition-colors ${
                    isCompleted ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"
                  }`}
                />
              )}
              <button
                type="button"
                onClick={() => onSelectStep(idx)}
                className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all shrink-0 ${
                  isCurrent
                    ? "bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/30 scale-105"
                    : isCompleted
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800"
                    : "bg-slate-50 dark:bg-slate-800/60 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center font-mono text-[9px] ${
                    isCurrent
                      ? "bg-white text-blue-600 font-bold"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {isCompleted ? "✓" : idx + 1}
                </span>
                <span className="text-[11px]">{step.title}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Current Step Description & Progress Line */}
      <div className="flex flex-col gap-1.5 bg-slate-50 dark:bg-slate-850/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>
              Stage {currentStepIndex + 1}/{steps.length}: {currentStep?.title}
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-500">
            {Math.round(stepProgress * 100)}%
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {currentStep?.description}
        </p>
        {/* Progress bar line */}
        <div className="w-full h-1 bg-slate-200 dark:bg-slate-750 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-150"
            style={{ width: `${stepProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Bottom Controls (Play/Pause, Step, Speed, Restart) */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          {isPlaying ? (
            <button
              type="button"
              onClick={onPause}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs transition-colors"
            >
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onPlay}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{currentStepIndex === steps.length - 1 ? "Replay" : "Play"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onNextStep}
            disabled={currentStepIndex >= steps.length - 1}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-300 font-bold text-xs"
            title="Next Step"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Next</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
            title="Restart Practical"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Playback Speed Controls */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {([0.5, 1, 2] as const).map((spd) => (
            <button
              key={spd}
              type="button"
              onClick={() => onChangeSpeed(spd)}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-colors ${
                playbackSpeed === spd
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {spd}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
