import React from "react";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";

interface BeforeAfterCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialColor: string;
  finalColor: string;
  reactantsText: string;
  productsText: string;
  hasGas?: boolean;
  gasName?: string;
  hasPrecipitate?: boolean;
  precipitateName?: string;
  hasDeposit?: boolean;
  depositText?: string;
  tempChange?: string;
}

export const BeforeAfterCompareModal: React.FC<BeforeAfterCompareModalProps> = ({
  isOpen,
  onClose,
  title,
  initialColor,
  finalColor,
  reactantsText,
  productsText,
  hasGas,
  gasName,
  hasPrecipitate,
  precipitateName,
  hasDeposit,
  depositText,
  tempChange
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 max-w-2xl w-full shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🧪 Before & After Reaction Comparison</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {title}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Side-by-side comparison boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* BEFORE CARD */}
          <div className="bg-slate-50 dark:bg-slate-850/80 border border-slate-250 dark:border-slate-750 rounded-2xl p-4 flex flex-col items-center gap-3">
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-slate-500">
              Initial State (Before)
            </span>

            {/* Vessel preview before */}
            <div className="w-28 h-36 border-2 border-slate-300 dark:border-slate-600 rounded-b-2xl bg-slate-900/30 flex flex-col justify-end p-2 relative overflow-hidden shadow-inner">
              <div
                className="w-full h-1/2 rounded-b-xl opacity-80"
                style={{ backgroundColor: initialColor }}
              />
              <span className="absolute top-2 left-2 text-[9px] font-mono text-slate-400">
                Reactants
              </span>
            </div>

            <div className="w-full space-y-1.5 text-xs">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                <span className="text-slate-500">Chemicals:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-right">
                  {reactantsText}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                <span className="text-slate-500">Appearance:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                    style={{ backgroundColor: initialColor }}
                  />
                  Clear / Unreacted
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Precipitate / Gas:</span>
                <span className="text-slate-600 dark:text-slate-400">None</span>
              </div>
            </div>
          </div>

          {/* AFTER CARD */}
          <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-4 flex flex-col items-center gap-3">
            <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
              Final State (After Reaction)
            </span>

            {/* Vessel preview after */}
            <div className="w-28 h-36 border-2 border-slate-300 dark:border-slate-600 rounded-b-2xl bg-slate-900/30 flex flex-col justify-end p-2 relative overflow-hidden shadow-inner">
              <div
                className="w-full h-3/5 rounded-b-xl opacity-85"
                style={{ backgroundColor: finalColor }}
              />
              {hasPrecipitate && (
                <div className="absolute bottom-0 inset-x-0 h-4 bg-white/90 border-t border-slate-300 text-[7px] font-mono font-bold text-slate-800 text-center">
                  Precipitate
                </div>
              )}
              {hasDeposit && (
                <div className="absolute inset-x-8 bottom-3 h-16 bg-amber-800 rounded-t-sm" />
              )}
              <span className="absolute top-2 left-2 text-[9px] font-mono text-emerald-400 font-bold">
                ✓ Products
              </span>
            </div>

            <div className="w-full space-y-1.5 text-xs">
              <div className="flex justify-between border-b border-blue-100 dark:border-blue-900/40 pb-1">
                <span className="text-slate-500">Products:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-right">
                  {productsText}
                </span>
              </div>
              <div className="flex justify-between border-b border-blue-100 dark:border-blue-900/40 pb-1">
                <span className="text-slate-500">Appearance:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                    style={{ backgroundColor: finalColor }}
                  />
                  Chemical Transformation
                </span>
              </div>
              {hasGas && (
                <div className="flex justify-between border-b border-blue-100 dark:border-blue-900/40 pb-1">
                  <span className="text-slate-500">Gas Released:</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">{gasName || "Gas bubbles"}</span>
                </div>
              )}
              {hasPrecipitate && (
                <div className="flex justify-between border-b border-blue-100 dark:border-blue-900/40 pb-1">
                  <span className="text-slate-500">Precipitate:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{precipitateName || "Solid formed"}</span>
                </div>
              )}
              {hasDeposit && (
                <div className="flex justify-between border-b border-blue-100 dark:border-blue-900/40 pb-1">
                  <span className="text-slate-500">Deposition:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{depositText || "Coating on metal"}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
