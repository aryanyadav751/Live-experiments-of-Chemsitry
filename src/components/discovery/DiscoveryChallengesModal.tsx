import React from "react";
import {
  DISCOVERY_CHALLENGES,
  DiscoveryChallengeObjective
} from "../../services/discoveryService";
import { getSavedProgress } from "../../utils/progress";
import {
  Trophy,
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Flame,
  Lightbulb
} from "lucide-react";

interface DiscoveryChallengesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChallenge: (chal: DiscoveryChallengeObjective) => void;
}

export const DiscoveryChallengesModal: React.FC<DiscoveryChallengesModalProps> = ({
  isOpen,
  onClose,
  onSelectChallenge
}) => {
  if (!isOpen) return null;

  const progress = getSavedProgress();
  const completedMap = progress.challengeCompletions || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                🎯 Discovery Challenges
              </h2>
              <p className="text-xs text-slate-500">
                Solve chemistry objectives to earn +100 XP and board mastery
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {DISCOVERY_CHALLENGES.map((chal) => {
            const isCompleted = !!completedMap[chal.id];

            return (
              <div
                key={chal.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50"
                    : "bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-blue-400"
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300"
                          : "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                      }`}
                    >
                      {chal.category}
                    </span>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {chal.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                      +{chal.xpReward} XP
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  {chal.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>{chal.hint}</span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectChallenge(chal);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
                  >
                    <span>Attempt in Lab</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
