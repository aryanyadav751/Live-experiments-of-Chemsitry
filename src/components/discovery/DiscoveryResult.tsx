import React from "react";
import { Reaction, DiscoveryReactionResult } from "../../types";
import { InteractiveEquation } from "./InteractiveEquation";
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Box,
  Scale,
  Sparkles,
  BookmarkPlus,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Globe
} from "lucide-react";

interface DiscoveryResultProps {
  result: DiscoveryReactionResult;
  reaction: Reaction | null;
  onOpen3D: () => void;
  onOpenBalancer: () => void;
  onAskGemini: (prompt?: string) => void;
  onSaveDiscovery: () => void;
  isSaved?: boolean;
  suggestedCombinations?: {
    label: string;
    substanceNames: string[];
    ids: string[];
    conditionTip?: string;
  }[];
  onApplySuggested: (ids: string[]) => void;
}

export const DiscoveryResult: React.FC<DiscoveryResultProps> = ({
  result,
  reaction,
  onOpen3D,
  onOpenBalancer,
  onAskGemini,
  onSaveDiscovery,
  isSaved,
  suggestedCombinations,
  onApplySuggested
}) => {
  // Case 1: Empty vessel
  if (!result.occurred && result.title === "Empty Reaction Vessel") {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center h-full bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
          <BookOpen className="w-6 h-6" />
        </div>
        <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200 mb-1">
          Awaiting Chemical Reagents
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">
          Select substances from the left Chemical Shelf and drop them into the vessel. You can also turn on virtual heating, light, or electricity.
        </p>
        <div className="w-full max-w-xs space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Popular NCERT Combinations
          </span>
          {suggestedCombinations?.slice(0, 3).map((item) => (
            <button
              key={item.label}
              onClick={() => onApplySuggested(item.ids)}
              className="w-full text-left p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-xs text-slate-700 dark:text-slate-300 transition-all flex items-center justify-between group"
            >
              <span className="truncate">{item.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Case 2: No verified reaction (Requirement 4)
  if (!result.occurred) {
    return (
      <div className="flex flex-col p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 mb-4">
          <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-extrabold text-amber-900 dark:text-amber-200 mb-1">
              🔎 No verified reaction found
            </h3>
            <p className="text-xs text-amber-800/90 dark:text-amber-300 leading-relaxed">
              This combination is not currently represented in the Class 10 Discovery Lab database. Try another combination.
            </p>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Why didn&apos;t they react?
          </span>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
            Chemical reactions require a thermodynamic driving force: such as ion exchange forming a precipitate, gas liberation, or a more reactive metal displacing a less reactive metal in the reactivity series.
          </p>
          <button
            onClick={() => onAskGemini("Why did these specific chemicals not react according to the Class 10 reactivity series?")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Gemini why this combination didn&apos;t react</span>
          </button>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Try One of These Verified NCERT Reactions:
          </span>
          <div className="space-y-1.5">
            {suggestedCombinations?.map((item) => (
              <button
                key={item.label}
                onClick={() => onApplySuggested(item.ids)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 hover:bg-blue-50 dark:hover:bg-blue-950/50 border border-slate-200 dark:border-slate-800 hover:border-blue-400 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {item.substanceNames.join(" + ")}
                    {item.conditionTip && ` • ${item.conditionTip}`}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Case 3: Reaction Detected!
  return (
    <div className="flex flex-col p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      {/* Reaction Detected Header */}
      <div className="p-4 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-600 text-white">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              Reaction Detected
            </span>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
            {reaction ? `Chapter ${reaction.chapterNumber}` : "Class 10 NCERT"}
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug mb-1">
          {result.title}
        </h2>

        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-3">
          Type: {Array.isArray(reaction?.reactionType) ? reaction.reactionType.join(" / ") : result.reactionType}
        </div>

        {/* Interactive Equation */}
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-900 shadow-2xs">
          <InteractiveEquation
            equation={result.balancedEquation || result.equation}
            reactionConcept={reaction?.ncertConcept}
          />
        </div>
      </div>

      {/* Observations */}
      <div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
          Key Observations
        </span>
        <ul className="space-y-1">
          {result.observations.map((obs, idx) => (
            <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
              <span className="text-blue-500 font-bold mt-0.5">•</span>
              <span>{obs}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Why It Happens & NCERT Concept */}
      <div className="space-y-2 text-xs">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
          <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
            Why It Happens:
          </span>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {reaction?.explanation || result.explanation}
          </p>
        </div>

        {reaction?.ncertConcept && (
          <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
            <span className="font-bold text-blue-900 dark:text-blue-200 block mb-1">
              NCERT Concept & Curriculum Link:
            </span>
            <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
              {reaction.ncertConcept}
            </p>
          </div>
        )}
      </div>

      {/* Products & Safety Level */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850">
          <span className="text-[10px] text-slate-400 font-bold block mb-0.5">PRODUCTS FORMED</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {reaction?.products.join(", ") || "Derived compounds"}
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-850">
          <span className="text-[10px] text-slate-400 font-bold block mb-0.5">ENERGY CHANGE</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {result.energyChange || "Neutral"}
          </span>
        </div>
      </div>

      {/* Real-World Connection */}
      {reaction?.realLifeApplications && reaction.realLifeApplications.length > 0 && (
        <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 mb-1">
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>Real-World Connection:</span>
          </div>
          <p className="text-xs text-amber-800/90 dark:text-amber-300 leading-relaxed">
            {reaction.realLifeApplications[0]}
          </p>
        </div>
      )}

      {/* Action Buttons Bar */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onOpen3D}
          className="flex-1 min-w-[120px] py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Box className="w-3.5 h-3.5" />
          <span>VIEW IN 3D</span>
        </button>

        <button
          type="button"
          onClick={onOpenBalancer}
          className="flex-1 min-w-[120px] py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Scale className="w-3.5 h-3.5 text-amber-400" />
          <span>BALANCE</span>
        </button>

        <button
          type="button"
          onClick={() => onAskGemini()}
          className="flex-1 min-w-[120px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>ASK GEMINI</span>
        </button>

        <button
          type="button"
          onClick={onSaveDiscovery}
          className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
            isSaved
              ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300"
              : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
          }`}
        >
          <BookmarkPlus className="w-3.5 h-3.5" />
          <span>{isSaved ? "Saved" : "Save Discovery"}</span>
        </button>
      </div>
    </div>
  );
};
