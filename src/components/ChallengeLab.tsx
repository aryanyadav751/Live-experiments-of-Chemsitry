import React, { useState } from "react";
import { ChemistryChallenge } from "../types";
import { CHEMISTRY_CHALLENGES } from "../data/challengeLabData";
import { getSubstanceById } from "../data/discoverySubstances";
import { auth, saveChallengeProgressToCloud } from "../lib/firebase";
import { GoogleDriveReportModal } from "./GoogleDriveReportModal";
import { LabReportExport } from "../services/googleDriveService";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Flame,
  Droplets,
  RotateCcw,
  ChevronRight,
  HardDrive,
  Lightbulb,
  Play,
  Eye,
  Star,
  ShieldCheck
} from "lucide-react";

interface ChallengeLabProps {
  onScoreUpdate?: (points: number) => void;
}

export const ChallengeLab: React.FC<ChallengeLabProps> = ({ onScoreUpdate }) => {
  const [activeChallengeId, setActiveChallengeId] = useState<string>(CHEMISTRY_CHALLENGES[0].id);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [heatEnabled, setHeatEnabled] = useState<boolean>(false);
  const [testedLimeWater, setTestedLimeWater] = useState<boolean>(false);
  const [testedSplinter, setTestedSplinter] = useState<boolean>(false);

  // Solved state map: { [challengeId]: { score: number, hintsUsed: number } }
  const [solvedChallenges, setSolvedChallenges] = useState<Record<string, boolean>>({});
  const [currentScore, setCurrentScore] = useState<number>(0);

  // Feedback state
  const [validationResult, setValidationResult] = useState<{
    solved: boolean;
    feedback: string;
    observation: string;
  } | null>(null);

  // Hints state
  const [hintIndex, setHintIndex] = useState<number>(-1);

  // Google Drive report modal
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  const activeChallenge =
    CHEMISTRY_CHALLENGES.find((c) => c.id === activeChallengeId) || CHEMISTRY_CHALLENGES[0];

  // Select a different challenge
  const handleSelectChallenge = (id: string) => {
    setActiveChallengeId(id);
    setSelectedIds([]);
    setHeatEnabled(false);
    setTestedLimeWater(false);
    setTestedSplinter(false);
    setValidationResult(null);
    setHintIndex(-1);
  };

  // Toggle substance
  const handleToggleSubstance = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((s) => s !== id));
    } else {
      if (selectedIds.length >= 4) return;
      setSelectedIds((prev) => [...prev, id]);
    }
    setValidationResult(null);
  };

  // Submit test
  const handleSubmitSolution = async () => {
    const result = activeChallenge.validationCheck(selectedIds, {
      heat: heatEnabled,
      water: false,
      testedWithLimeWater: testedLimeWater,
      testedWithSplinter: testedSplinter
    });

    setValidationResult(result);

    if (result.solved && !solvedChallenges[activeChallenge.id]) {
      const earnedPoints = Math.max(20, activeChallenge.points - (hintIndex + 1) * 15);
      setSolvedChallenges((prev) => ({ ...prev, [activeChallenge.id]: true }));
      setCurrentScore((prev) => prev + earnedPoints);

      if (onScoreUpdate) {
        onScoreUpdate(earnedPoints);
      }

      // Sync to Firebase
      const user = auth.currentUser;
      if (user?.uid) {
        try {
          await saveChallengeProgressToCloud(
            user.uid,
            activeChallenge.id,
            earnedPoints,
            hintIndex + 1
          );
        } catch (err) {
          console.warn("Could not save challenge progress to Firebase:", err);
        }
      }
    }
  };

  // Reset current attempt
  const handleResetAttempt = () => {
    setSelectedIds([]);
    setHeatEnabled(false);
    setTestedLimeWater(false);
    setTestedSplinter(false);
    setValidationResult(null);
  };

  // Show next hint
  const handleShowNextHint = () => {
    if (hintIndex < activeChallenge.hints.length - 1) {
      setHintIndex((prev) => prev + 1);
    }
  };

  const isCurrentSolved = Boolean(solvedChallenges[activeChallenge.id]);

  // Report export data
  const reportData: LabReportExport = {
    title: `Challenge: ${activeChallenge.title}`,
    chapter: activeChallenge.chapter,
    aim: activeChallenge.objective,
    apparatus: `Virtual Reaction Vessel, Bunsen Burner, Testing Probes, Reagents (${selectedIds
      .map((id) => getSubstanceById(id)?.name)
      .join(", ")})`,
    reactions: [activeChallenge.targetReactionEquation || "Equation verified in simulation"],
    observations: validationResult?.observation || "Successful challenge test completed.",
    inference: validationResult?.feedback || activeChallenge.boardFact,
    safetyPrecautions:
      "All reactions performed safely within simulation environment under Class 10 NCERT practical guidelines.",
    mode: "challenge"
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-500/20">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              🎮 Challenge Lab — Solve Virtual Chemistry Mysteries
            </h2>
            <span className="text-[10px] font-mono font-bold bg-amber-600 text-white px-2.5 py-0.5 rounded-full">
              INTERACTIVE CHALLENGES
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Apply deductive chemical reasoning, mix correct reagents, and verify reaction pathways!
          </p>
        </div>

        {/* Score & Completed counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono shadow-sm">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-black">{currentScore}</span>
            <span className="text-[11px] text-slate-400">Pts</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {Object.keys(solvedChallenges).length} / {CHEMISTRY_CHALLENGES.length} Solved
            </span>
          </div>
        </div>
      </div>

      {/* Challenge Browser & Active Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Challenges Selector List (4 Cols) */}
        <div className="lg:col-span-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2.5 shadow-sm max-h-[700px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              NCERT Challenges ({CHEMISTRY_CHALLENGES.length})
            </h3>
          </div>

          {CHEMISTRY_CHALLENGES.map((ch, idx) => {
            const isSelected = ch.id === activeChallenge.id;
            const isSolved = Boolean(solvedChallenges[ch.id]);

            return (
              <button
                key={ch.id}
                onClick={() => handleSelectChallenge(ch.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all relative ${
                  isSelected
                    ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 text-slate-900 dark:text-white ring-1 ring-amber-500/40"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/60 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1 text-[10px] font-mono">
                  <span className="text-slate-400">Challenge {idx + 1}</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-1.5 py-0.2 rounded font-bold ${
                        ch.difficulty === "Easy"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : ch.difficulty === "Medium"
                          ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                          : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {ch.difficulty}
                    </span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      +{ch.points} pts
                    </span>
                  </div>
                </div>

                <div className="font-bold text-xs line-clamp-1">{ch.title}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {ch.chapter}
                </div>

                {isSolved && (
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Solved!</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Active Challenge Workbench (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          {/* Challenge Prompt & Objective Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                  {activeChallenge.chapter}
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {activeChallenge.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  Reward: {activeChallenge.points} Points
                </span>
                {isCurrentSolved && (
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Solved
                  </span>
                )}
              </div>
            </div>

            {/* Scenario Narrative */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>The Mystery Scenario:</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {activeChallenge.scenario}
              </p>
            </div>

            {/* Objective */}
            <div className="flex items-start gap-2 text-xs">
              <span className="font-bold text-slate-900 dark:text-white shrink-0">Objective:</span>
              <span className="text-slate-600 dark:text-slate-400">{activeChallenge.objective}</span>
            </div>
          </div>

          {/* Interactive Reagent Tray for this Challenge */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>Available Reagent Rack:</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-400">
                {selectedIds.length} added to vessel
              </span>
            </div>

            {/* Reagents Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {activeChallenge.allowedSubstanceIds.map((id) => {
                const sub = getSubstanceById(id);
                if (!sub) return null;
                const isSelected = selectedIds.includes(id);

                return (
                  <button
                    key={id}
                    onClick={() => handleToggleSubstance(id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "border-amber-500 bg-amber-500/15 text-slate-900 dark:text-white shadow-sm ring-1 ring-amber-500/40"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                      <span className="text-blue-600 dark:text-blue-400">{sub.formula}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />}
                    </div>
                    <div className="font-bold text-xs truncate mt-1">{sub.name}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{sub.category}</div>
                  </button>
                );
              })}
            </div>

            {/* Conditions & Action Controls */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setHeatEnabled(!heatEnabled)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    heatEnabled
                      ? "bg-orange-500 text-white border-orange-600"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Heat (Flame)</span>
                </button>

                <button
                  onClick={() => setTestedLimeWater(!testedLimeWater)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    testedLimeWater
                      ? "bg-teal-600 text-white border-teal-700"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lime Water Test</span>
                </button>

                <button
                  onClick={() => setTestedSplinter(!testedSplinter)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    testedSplinter
                      ? "bg-amber-600 text-white border-amber-700"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Splinter Pop Test</span>
                </button>

                <button
                  onClick={handleResetAttempt}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 text-xs font-semibold hover:text-red-500"
                  title="Clear vessel"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitSolution}
                disabled={selectedIds.length === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-xs font-black shadow-md shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Run Test & Verify Solution</span>
              </button>
            </div>
          </div>

          {/* Validation Feedback & Celebration HUD */}
          {validationResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-3xl border shadow-sm space-y-3 ${
                validationResult.solved
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-100"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  {validationResult.solved ? (
                    <>
                      <Trophy className="w-5 h-5 text-emerald-500" />
                      <span className="text-base font-black text-emerald-700 dark:text-emerald-300">
                        Challenge Solved Successfully! 🎉
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      <span className="text-base font-black text-amber-700 dark:text-amber-300">
                        Experiment Result Analysis
                      </span>
                    </>
                  )}
                </div>

                {validationResult.solved && (
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>Export to Google Drive</span>
                  </button>
                )}
              </div>

              {/* Feedback text */}
              <p className="text-xs leading-relaxed">{validationResult.feedback}</p>

              {/* Observation detail */}
              <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                  Virtual Observation:
                </span>
                {validationResult.observation}
              </div>

              {/* Board fact */}
              {validationResult.solved && (
                <div className="pt-2 text-[11px] text-emerald-800 dark:text-emerald-200 flex items-start gap-1.5 font-sans">
                  <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>CBSE Board Fact:</strong> {activeChallenge.boardFact}
                  </span>
                </div>
              )}
            </motion.div>
          )}

          {/* Progressive Hints Accordion */}
          <div className="p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <HelpCircle className="w-4 h-4 text-blue-500" />
                <span>Need a Hint? ({hintIndex + 1} / {activeChallenge.hints.length} revealed)</span>
              </div>

              {hintIndex < activeChallenge.hints.length - 1 && (
                <button
                  onClick={handleShowNextHint}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-bold"
                >
                  Reveal Hint {hintIndex + 2} (-15 pts)
                </button>
              )}
            </div>

            {hintIndex >= 0 && (
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                {activeChallenge.hints.slice(0, hintIndex + 1).map((h, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-blue-500/5 dark:bg-blue-900/20 border border-blue-500/20 text-blue-900 dark:text-blue-200"
                  >
                    {h}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Google Drive Export Modal */}
      {showReportModal && (
        <GoogleDriveReportModal
          report={reportData}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
};
