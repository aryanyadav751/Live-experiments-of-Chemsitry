import React, { useState, useMemo, useEffect } from "react";
import { Reaction } from "../types";
import { REACTIONS } from "../data/reactions";
import { markEquationBalanced, recordDailyActivity } from "../utils/progress";
import {
  parseEquationSide,
  checkEquationBalance,
  splitEquation,
  FormulaTerm
} from "../utils/atomBalanceEngine";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Shuffle,
  RotateCcw,
  Award,
  ChevronRight,
  Flame,
  ArrowRight,
  Info,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GeneratedChallenge {
  reactionId: string;
  title: string;
  chapterNumber: number;
  unbalancedEquation: string;
  balancedEquation: string;
  leftTerms: FormulaTerm[];
  rightTerms: FormulaTerm[];
  targetLeftCoeffs: number[];
  targetRightCoeffs: number[];
  hint1: string;
  hint2: string;
  finalHint: string;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

// Extract Class 10 reactions and parse into interactive challenges
function generateChallengesFromReactions(): GeneratedChallenge[] {
  const challenges: GeneratedChallenge[] = [];

  for (const rx of REACTIONS) {
    if (!rx.balancedEquation || !rx.equation) continue;

    const splitBalanced = splitEquation(rx.balancedEquation);
    const splitUnbalanced = splitEquation(rx.equation);

    if (!splitBalanced || !splitUnbalanced) continue;

    try {
      const leftTerms = parseEquationSide(splitBalanced.leftSide);
      const rightTerms = parseEquationSide(splitBalanced.rightSide);

      if (leftTerms.length === 0 || rightTerms.length === 0) continue;

      const targetLeftCoeffs = leftTerms.map(t => t.defaultCoeff);
      const targetRightCoeffs = rightTerms.map(t => t.defaultCoeff);

      // Verify the parsed equation is stoichiometric
      const testBalance = checkEquationBalance(leftTerms, rightTerms, targetLeftCoeffs, targetRightCoeffs);
      if (!testBalance.isFullyBalanced) continue;

      // Determine difficulty based on total coefficients sum
      const coeffSum = targetLeftCoeffs.reduce((a, b) => a + b, 0) + targetRightCoeffs.reduce((a, b) => a + b, 0);
      let difficulty: "Easy" | "Medium" | "Hard" = "Easy";
      if (coeffSum > 8) difficulty = "Hard";
      else if (coeffSum > 5) difficulty = "Medium";

      // Derive pedagogical hints
      const allElements = testBalance.elementStatuses.map(s => s.element);
      const oxygenPresent = allElements.includes("O");
      const hydrogenPresent = allElements.includes("H");

      const hint1 = oxygenPresent
        ? "Look at the Oxygen atoms first, or find the compound with the maximum number of atoms."
        : "Start by balancing the metal or heaviest element present on both sides.";

      const hint2 = `The balanced equation contains ${leftTerms.length} reactant formula(s) and ${rightTerms.length} product formula(s). Target elements: ${allElements.join(", ")}.`;

      const finalHint = `Target stoichiometric coefficients: Left [${targetLeftCoeffs.join(", ")}] → Right [${targetRightCoeffs.join(", ")}]. Check your integer multipliers.`;

      challenges.push({
        reactionId: rx.id,
        title: rx.title,
        chapterNumber: rx.chapterNumber,
        unbalancedEquation: rx.equation,
        balancedEquation: rx.balancedEquation,
        leftTerms,
        rightTerms,
        targetLeftCoeffs,
        targetRightCoeffs,
        hint1,
        hint2,
        finalHint,
        explanation: rx.explanation || "Balanced according to the law of conservation of mass where the number of atoms of each element remains conserved.",
        difficulty
      });
    } catch {
      // Continue parsing other reactions
    }
  }

  return challenges;
}

interface EquationBalancerProps {
  onEquationSolved?: (reactionId: string) => void;
  className?: string;
}

export const EquationBalancer: React.FC<EquationBalancerProps> = ({
  onEquationSolved,
  className = ""
}) => {
  const allChallenges = useMemo(() => generateChallengesFromReactions(), []);
  const [selectedDifficulty, setSelectedDifficulty] = useState<"All" | "Easy" | "Medium" | "Hard">("All");
  const [selectedChapter, setSelectedChapter] = useState<number | "All">("All");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User input coefficients: arrays of numbers
  const [leftCoeffs, setLeftCoeffs] = useState<number[]>([]);
  const [rightCoeffs, setRightCoeffs] = useState<number[]>([]);

  // Validation & Hint states
  const [hintLevel, setHintLevel] = useState<0 | 1 | 2 | 3 | 4>(0); // 0=none, 1=hint1, 2=hint2, 3=finalHint, 4=showSolution
  const [checkResult, setCheckResult] = useState<{ checked: boolean; isBalanced: boolean; message: string } | null>(null);
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [solvedInSession, setSolvedInSession] = useState<string[]>([]);

  // Filter available challenges
  const filteredChallenges = useMemo(() => {
    return allChallenges.filter((ch) => {
      if (selectedDifficulty !== "All" && ch.difficulty !== selectedDifficulty) return false;
      if (selectedChapter !== "All" && ch.chapterNumber !== selectedChapter) return false;
      return true;
    });
  }, [allChallenges, selectedDifficulty, selectedChapter]);

  const activeChallenge = filteredChallenges[currentIndex % Math.max(1, filteredChallenges.length)] || allChallenges[0];

  // Initialize coefficients when activeChallenge changes
  useEffect(() => {
    if (!activeChallenge) return;
    setLeftCoeffs(activeChallenge.leftTerms.map(() => 1));
    setRightCoeffs(activeChallenge.rightTerms.map(() => 1));
    setHintLevel(0);
    setCheckResult(null);
  }, [activeChallenge]);

  // Handle coefficient changes
  const updateLeftCoeff = (index: number, delta: number) => {
    setLeftCoeffs((prev) => {
      const next = [...prev];
      next[index] = Math.max(1, Math.min(20, (next[index] || 1) + delta));
      return next;
    });
    setCheckResult(null);
  };

  const updateRightCoeff = (index: number, delta: number) => {
    setRightCoeffs((prev) => {
      const next = [...prev];
      next[index] = Math.max(1, Math.min(20, (next[index] || 1) + delta));
      return next;
    });
    setCheckResult(null);
  };

  const handleDirectLeftInput = (index: number, val: string) => {
    const num = parseInt(val, 10);
    setLeftCoeffs((prev) => {
      const next = [...prev];
      next[index] = isNaN(num) ? 1 : Math.max(1, Math.min(20, num));
      return next;
    });
    setCheckResult(null);
  };

  const handleDirectRightInput = (index: number, val: string) => {
    const num = parseInt(val, 10);
    setRightCoeffs((prev) => {
      const next = [...prev];
      next[index] = isNaN(num) ? 1 : Math.max(1, Math.min(20, num));
      return next;
    });
    setCheckResult(null);
  };

  // Compute live element atom counts on LHS and RHS
  const balanceEvaluation = useMemo(() => {
    if (!activeChallenge) return null;
    return checkEquationBalance(
      activeChallenge.leftTerms,
      activeChallenge.rightTerms,
      leftCoeffs,
      rightCoeffs
    );
  }, [activeChallenge, leftCoeffs, rightCoeffs]);

  // Check Answer Handler
  const handleCheckAnswer = () => {
    if (!balanceEvaluation || !activeChallenge) return;

    if (balanceEvaluation.isFullyBalanced) {
      // Check if coefficients match lowest whole number ratio
      const leftMatches = activeChallenge.targetLeftCoeffs.every((c, i) => leftCoeffs[i] === c);
      const rightMatches = activeChallenge.targetRightCoeffs.every((c, i) => rightCoeffs[i] === c);

      if (leftMatches && rightMatches) {
        setCheckResult({
          checked: true,
          isBalanced: true,
          message: "🎉 Perfectly Balanced! All elements obey the Law of Conservation of Mass in minimum stoichiometric ratios."
        });

        if (!solvedInSession.includes(activeChallenge.reactionId)) {
          setSessionScore((s) => s + 10);
          setSolvedInSession((prev) => [...prev, activeChallenge.reactionId]);
          recordDailyActivity();
          markEquationBalanced(activeChallenge.reactionId);
          if (onEquationSolved) onEquationSolved(activeChallenge.reactionId);
        }
      } else {
        setCheckResult({
          checked: true,
          isBalanced: false,
          message: "⚠️ All atoms match, but these coefficients can be reduced to simpler lowest integer ratios. Divide by common factors!"
        });
      }
    } else {
      const unbalancedList = balanceEvaluation.elementStatuses
        .filter(s => !s.isBalanced)
        .map(s => `${s.element} (${s.leftCount} LHS ≠ ${s.rightCount} RHS)`)
        .join(", ");

      setCheckResult({
        checked: true,
        isBalanced: false,
        message: `❌ Not balanced yet. Discrepancy in: ${unbalancedList}.`
      });
    }
  };

  const handleNextRandomEquation = () => {
    const nextIdx = Math.floor(Math.random() * filteredChallenges.length);
    setCurrentIndex(nextIdx === currentIndex ? (currentIndex + 1) % filteredChallenges.length : nextIdx);
  };

  const handleReset = () => {
    if (!activeChallenge) return;
    setLeftCoeffs(activeChallenge.leftTerms.map(() => 1));
    setRightCoeffs(activeChallenge.rightTerms.map(() => 1));
    setHintLevel(0);
    setCheckResult(null);
  };

  const handleShowSolution = () => {
    if (!activeChallenge) return;
    setLeftCoeffs([...activeChallenge.targetLeftCoeffs]);
    setRightCoeffs([...activeChallenge.targetRightCoeffs]);
    setHintLevel(4);
    setCheckResult({
      checked: true,
      isBalanced: true,
      message: "NCERT Model Solution Loaded. Inspect the coefficients and atom balance table below."
    });
  };

  if (!activeChallenge) {
    return (
      <div className="p-8 text-center text-slate-500">
        No chemical equations found for the selected criteria.
      </div>
    );
  }

  return (
    <div
      id="equation-balancer-tool"
      className={`rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden flex flex-col ${className}`}
    >
      {/* Top Header */}
      <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-600 text-white">
              NCERT Class 10 Balancer
            </span>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300">
              Chapter {activeChallenge.chapterNumber}
            </span>
            <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
              activeChallenge.difficulty === "Easy"
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                : activeChallenge.difficulty === "Medium"
                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
            }`}>
              {activeChallenge.difficulty}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            {activeChallenge.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Set integer coefficients on left and right sides so atom counts are equal for each element.
          </p>
        </div>

        {/* Score & Randomizer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl shadow-sm text-xs font-mono">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Score: {sessionScore} pts
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {solvedInSession.length} Solved
            </span>
          </div>

          <button
            onClick={handleNextRandomEquation}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-transform active:scale-95"
            title="Practice another random reaction"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Randomize Equation</span>
          </button>
        </div>
      </div>

      {/* Chapter & Difficulty Sub-filters */}
      <div className="px-5 py-2.5 bg-slate-100 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Difficulty:</span>
          {(["All", "Easy", "Medium", "Hard"] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                selectedDifficulty === diff
                  ? "bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Chapter:</span>
          {(["All", 1, 2, 3, 4] as const).map((ch) => (
            <button
              key={ch}
              onClick={() => setSelectedChapter(ch)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                selectedChapter === ch
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {ch === "All" ? "All" : `Ch ${ch}`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Equation Balancing Workbench */}
      <div className="p-5 sm:p-8 space-y-8 flex-1">
        {/* Interactive Equation Card */}
        <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 p-6 sm:p-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-base sm:text-lg">
          {/* Reactants */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {activeChallenge.leftTerms.map((term, idx) => (
              <React.Fragment key={`left-${idx}`}>
                {idx > 0 && <span className="text-slate-400 font-bold text-xl">+</span>}
                <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 sm:p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  {/* Stepper */}
                  <div className="flex flex-col items-center gap-0.5">
                    <button
                      onClick={() => updateLeftCoeff(idx, 1)}
                      className="w-7 h-5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold transition-colors"
                      title="Increase coefficient"
                    >
                      ▲
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={leftCoeffs[idx] || 1}
                      onChange={(e) => handleDirectLeftInput(idx, e.target.value)}
                      className="w-10 text-center font-bold text-blue-600 dark:text-blue-400 bg-transparent border-b border-blue-500/40 focus:outline-none text-base"
                    />
                    <button
                      onClick={() => updateLeftCoeff(idx, -1)}
                      className="w-7 h-5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold transition-colors"
                      title="Decrease coefficient"
                    >
                      ▼
                    </button>
                  </div>

                  {/* Chemical Formula */}
                  <span className="font-bold text-slate-900 dark:text-white px-2">
                    {term.cleanedFormula}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Reaction Arrow */}
          <div className="flex items-center justify-center px-2 text-blue-500">
            <ArrowRight className="w-7 h-7" />
          </div>

          {/* Products */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {activeChallenge.rightTerms.map((term, idx) => (
              <React.Fragment key={`right-${idx}`}>
                {idx > 0 && <span className="text-slate-400 font-bold text-xl">+</span>}
                <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 sm:p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  {/* Stepper */}
                  <div className="flex flex-col items-center gap-0.5">
                    <button
                      onClick={() => updateRightCoeff(idx, 1)}
                      className="w-7 h-5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold transition-colors"
                      title="Increase coefficient"
                    >
                      ▲
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={rightCoeffs[idx] || 1}
                      onChange={(e) => handleDirectRightInput(idx, e.target.value)}
                      className="w-10 text-center font-bold text-emerald-600 dark:text-emerald-400 bg-transparent border-b border-emerald-500/40 focus:outline-none text-base"
                    />
                    <button
                      onClick={() => updateRightCoeff(idx, -1)}
                      className="w-7 h-5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold transition-colors"
                      title="Decrease coefficient"
                    >
                      ▼
                    </button>
                  </div>

                  {/* Chemical Formula */}
                  <span className="font-bold text-slate-900 dark:text-white px-2">
                    {term.cleanedFormula}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Action Controls: Check Answer, Reset, Show Solution */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCheckAnswer}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-transform active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Check Answer</span>
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
              title="Reset all coefficients to 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShowSolution}
              className="px-4 py-2.5 rounded-xl border border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 text-xs font-mono font-bold transition-colors"
            >
              Show Solution
            </button>
          </div>
        </div>

        {/* Feedback / Result Banner */}
        {checkResult && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl border flex items-center gap-3 text-xs sm:text-sm font-medium ${
              checkResult.isBalanced
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-950 dark:text-emerald-200"
                : "bg-rose-500/15 border-rose-500/30 text-rose-950 dark:text-rose-200"
            }`}
          >
            {checkResult.isBalanced ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
            )}
            <div>{checkResult.message}</div>
          </motion.div>
        )}

        {/* Structured Element-by-Element Atom Status Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span>Stoichiometric Atom Count Table</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                (Element • Left • Right • Status)
              </span>
            </h4>
            {balanceEvaluation && (
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {balanceEvaluation.elementStatuses.filter(s => s.isBalanced).length} / {balanceEvaluation.elementStatuses.length} Elements Balanced
              </span>
            )}
          </div>

          {/* Exact Element Left Right Status Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 font-mono uppercase text-[11px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-bold">Element</th>
                  <th className="py-3 px-4 font-bold text-center">Left (Reactants)</th>
                  <th className="py-3 px-4 font-bold text-center">Right (Products)</th>
                  <th className="py-3 px-4 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                {balanceEvaluation?.elementStatuses.map((row) => (
                  <tr
                    key={row.element}
                    className={`transition-colors ${
                      row.isBalanced
                        ? "bg-emerald-500/5 dark:bg-emerald-500/5 text-emerald-950 dark:text-emerald-200"
                        : "bg-rose-500/5 dark:bg-rose-500/5 text-rose-950 dark:text-rose-200"
                    }`}
                  >
                    <td className="py-3 px-4 font-bold">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-black text-xs text-slate-800 dark:text-slate-200 font-mono">
                          {row.element}
                        </span>
                        <span className="font-sans text-xs text-slate-600 dark:text-slate-400 hidden sm:inline">
                          {row.elementName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-base">
                      {row.leftCount}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-base">
                      {row.rightCount}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.isBalanced ? (
                        <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>✓ Balanced</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-bold text-rose-600 dark:text-rose-400 text-xs">
                          <XCircle className="w-4 h-4" />
                          <span>✗ Unbalanced ({row.leftCount > row.rightCount ? `LHS +${row.leftCount - row.rightCount}` : `RHS +${row.rightCount - row.leftCount}`})</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3-Tier Progressive Hints */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setHintLevel(1)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                hintLevel >= 1
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-900 dark:text-amber-200 font-bold"
                  : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              💡 Hint 1
            </button>

            <button
              onClick={() => setHintLevel(2)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                hintLevel >= 2
                  ? "bg-blue-500/20 border-blue-500/40 text-blue-900 dark:text-blue-200 font-bold"
                  : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              🎯 Hint 2
            </button>

            <button
              onClick={() => setHintLevel(3)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                hintLevel >= 3
                  ? "bg-purple-500/20 border-purple-500/40 text-purple-900 dark:text-purple-200 font-bold"
                  : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              🔍 Final Hint
            </button>
          </div>

          {/* Hint Card Display */}
          {hintLevel === 1 && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950 dark:text-amber-200">
              <strong className="block mb-1 font-bold">Hint 1: Initial Strategy</strong>
              <p>{activeChallenge.hint1}</p>
            </div>
          )}

          {hintLevel === 2 && (
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-950 dark:text-blue-200">
              <strong className="block mb-1 font-bold">Hint 2: Stoichiometric Focus</strong>
              <p>{activeChallenge.hint2}</p>
            </div>
          )}

          {hintLevel === 3 && (
            <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-950 dark:text-purple-200">
              <strong className="block mb-1 font-bold">Final Hint: Coefficient Bounds</strong>
              <p>{activeChallenge.finalHint}</p>
            </div>
          )}

          {hintLevel === 4 && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs space-y-2">
              <div className="font-bold text-emerald-400 font-mono flex items-center gap-1">
                <span>✓ NCERT Model Answer:</span>
                <span className="text-white ml-1">{activeChallenge.balancedEquation}</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                {activeChallenge.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
