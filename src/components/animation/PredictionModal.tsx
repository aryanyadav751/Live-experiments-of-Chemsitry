import React, { useState } from "react";
import { PREDICTION_OPTIONS, PredictionOption } from "./animationTypes";
import { Sparkles, Check, HelpCircle, X } from "lucide-react";

interface PredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPrediction: (prediction: PredictionOption) => void;
  reactantsList: string[];
}

export const PredictionModal: React.FC<PredictionModalProps> = ({
  isOpen,
  onClose,
  onSubmitPrediction,
  reactantsList
}) => {
  const [selected, setSelected] = useState<PredictionOption>(PREDICTION_OPTIONS[1]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Scientific Hypothesis & Prediction
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                What do you predict will happen when these substances react?
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Reactants Badge */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
          <span className="font-semibold text-slate-600 dark:text-slate-300">
            Selected Reagents:
          </span>
          <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
            {reactantsList.length > 0 ? reactantsList.join(" + ") : "Chemical Reactants"}
          </span>
        </div>

        {/* Prediction Choices */}
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
          {PREDICTION_OPTIONS.map((opt) => {
            const isChosen = selected.id === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelected(opt)}
                className={`flex items-start gap-3 p-3 rounded-2xl text-left transition-all border ${
                  isChosen
                    ? "bg-blue-50 dark:bg-blue-950/40 border-blue-500 dark:border-blue-400 shadow-xs"
                    : "bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                    isChosen
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                >
                  {isChosen && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {opt.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {opt.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Action */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Skip Prediction
          </button>
          <button
            type="button"
            onClick={() => {
              onSubmitPrediction(selected);
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-500/30"
          >
            Confirm Hypothesis & Run Experiment
          </button>
        </div>
      </div>
    </div>
  );
};
