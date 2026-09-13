import React, { useState } from "react";
import { Reaction } from "../types";
import { REACTIONS } from "../data/reactions";
import { QuizCard } from "../components/QuizCard";
import { EquationBalancer } from "../components/EquationBalancer";
import { recordQuizScore } from "../utils/progress";
import {
  Award,
  Star,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Scale
} from "lucide-react";

interface ExamZonePageProps {
  onSelectReaction: (reaction: Reaction) => void;
  onRunExperiment: (reaction: Reaction) => void;
  onScoreUpdate: (id: string, score: number, total: number) => void;
}

export const ExamZonePage: React.FC<ExamZonePageProps> = ({
  onSelectReaction,
  onRunExperiment,
  onScoreUpdate
}) => {
  const [activeSection, setActiveSection] = useState<"balancer" | "reactions" | "puzzles" | "quiz">("balancer");
  const [activeQuizChapter, setActiveQuizChapter] = useState<number>(1);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // High-probability reactions for CBSE board exams
  const boardFavorites = REACTIONS.filter((r) => r.boardImportance === "Very High");

  // Comprehensive CBSE Board Mystery "Identify Substance X, Y, Z" Puzzles
  const mysteryPuzzles = [
    {
      title: "Identify X, Y, Z: Thermal Decomposition of Lead Nitrate",
      prompt: "A white crystalline powder 'X' is heated strongly in a dry boiling tube. A brown gas 'Y' is evolved along with a colorless gas that rekindles a glowing splinter. A yellow residue 'Z' remains in the tube which fuses with glass.",
      solution: {
        X: "Lead Nitrate [Pb(NO₃)₂] (White crystalline salt)",
        Y: "Nitrogen Dioxide [NO₂] (Brown pungent gas)",
        Z: "Lead(II) Oxide [PbO] (Yellow residue when cold)",
        equation: "2Pb(NO₃)₂(s) —(Heat)→ 2PbO(s) + 4NO₂(g)↑ + O₂(g)↑",
        concept: "Activity 1.6: Thermal decomposition of lead nitrate."
      }
    },
    {
      title: "Identify X, Y, Z: The Slaked Lime & Bleaching Powder Loop",
      prompt: "A compound 'X' is used for white-washing houses. When 'X' reacts vigorously with water, it produces compound 'Y' with liberation of large heat. When dry 'Y' is treated with chlorine gas, it forms a yellow-white disinfectant powder 'Z'.",
      solution: {
        X: "Calcium Oxide / Quicklime [CaO]",
        Y: "Calcium Hydroxide / Slaked Lime [Ca(OH)₂]",
        Z: "Bleaching Powder [CaOCl₂]",
        equation: "CaO + H₂O → Ca(OH)₂ + Heat; Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O",
        concept: "NCERT Chapter 1 (Activity 1.4) & Chapter 2 (Section 2.4.2)."
      }
    },
    {
      title: "Identify X, Y, Z: Organic Esterification & Fruity Aroma",
      prompt: "An organic compound 'A' with formula C₂H₆O is used in alcoholic beverages and tinctures. On oxidation with alkaline KMnO₄, it produces an organic acid 'B' that smells like vinegar. When 'A' and 'B' are warmed in the presence of conc. H₂SO₄, a sweet fruity smelling substance 'C' is formed.",
      solution: {
        X: "Compound A = Ethanol [CH₃CH₂OH]",
        Y: "Compound B = Ethanoic Acid (Acetic Acid) [CH₃COOH]",
        Z: "Compound C = Ethyl Ethanoate Ester [CH₃COOC₂H₅]",
        equation: "CH₃COOH + C₂H₅OH —(H₂SO₄)→ CH₃COOC₂H₅ + H₂O",
        concept: "Activity 4.5 & Activity 4.8: Oxidation and Esterification."
      }
    }
  ];

  // Curated CBSE Board Quiz pool for Chapter 1
  const chapter1Quiz = [
    {
      question: "Which of the following is an endothermic reaction?",
      options: [
        "Slaking of lime: CaO + H₂O → Ca(OH)₂",
        "Burning of natural gas: CH₄ + 2O₂ → CO₂ + 2H₂O",
        "Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
        "Decomposition of ferrous sulphate: 2FeSO₄ → Fe₂O₃ + SO₂ + SO₃"
      ],
      answer: "Decomposition of ferrous sulphate: 2FeSO₄ → Fe₂O₃ + SO₂ + SO₃",
      explanation: "Decomposition of green ferrous sulphate requires continuous thermal heating from the flame to break down bonds, so it is endothermic."
    },
    {
      question: "What observation is made when iron nails are kept in copper sulphate solution for 30 minutes?",
      options: [
        "Solution turns red and iron nails dissolve completely",
        "Blue solution turns light green and reddish-brown copper deposits on nail",
        "Solution remains blue and hydrogen gas bubbles evolve",
        "White precipitate of FeSO₄ forms at the bottom"
      ],
      answer: "Blue solution turns light green and reddish-brown copper deposits on nail",
      explanation: "Iron displaces copper: Fe + CuSO₄(blue) → FeSO₄(light green) + Cu(s) (red-brown coating on iron nail)."
    },
    {
      question: "In the redox reaction: CuO + H₂ → Cu + H₂O, which substance is oxidised?",
      options: ["CuO", "H₂", "Cu", "H₂O"],
      answer: "H₂",
      explanation: "Hydrogen gains oxygen to become H₂O, so H₂ is oxidised. CuO loses oxygen, so it is reduced."
    }
  ];

  const handleQuizComplete = (score: number, total: number) => {
    onScoreUpdate(`ch-${activeQuizChapter}-board-exam`, score, total);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono font-bold mb-2 border border-amber-500/20">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>CBSE CLASS 10 BOARD EXAM HUB</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          CBSE Board Exam Zone
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Interactive equation balancing practice, high-yield reactions, &quot;Identify Compound X, Y, Z&quot; mystery questions, and mock quizzes.
        </p>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 w-fit">
          <button
            onClick={() => setActiveSection("balancer")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSection === "balancer"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Interactive Equation Balancer</span>
          </button>
          <button
            onClick={() => setActiveSection("reactions")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSection === "reactions"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Must-Master Reactions ({boardFavorites.length})</span>
          </button>
          <button
            onClick={() => setActiveSection("puzzles")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSection === "puzzles"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BrainCircuit className="w-4 h-4 text-purple-400" />
            <span>Identify X, Y, Z Puzzles</span>
          </button>
          <button
            onClick={() => setActiveSection("quiz")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeSection === "quiz"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Mock Board Quiz</span>
          </button>
        </div>
      </div>

      {/* 1. Interactive Equation Balancer Section */}
      {(activeSection === "balancer") && (
        <section className="space-y-4">
          <EquationBalancer />
        </section>
      )}

      {/* 2. High Probability Board Reactions Table */}
      {(activeSection === "reactions") && (
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Must-Master Board Exam Reactions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ranked by repetition frequency in past 10 years CBSE Science papers
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
            {boardFavorites.length} Top Reactions
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {boardFavorites.map((rx, idx) => (
            <div
              key={rx.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 p-3 rounded-xl transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    Ch {rx.chapterNumber}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {rx.title}
                  </h4>
                </div>
                <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                  {rx.balancedEquation}
                </p>
                {rx.commonBoardQuestion && (
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    <strong className="text-amber-600 dark:text-amber-400">Board Q: </strong>
                    {rx.commonBoardQuestion}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onSelectReaction(rx)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Study
                </button>
                <button
                  onClick={() => onRunExperiment(rx)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm shadow-blue-500/20"
                >
                  Simulate
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* 3. Identify Mystery Substance X, Y, Z (Classic CBSE 3-Mark Questions) */}
      {(activeSection === "puzzles") && (
      <section className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/20 to-slate-900 p-6 shadow-md">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-400 mb-1">
            <BrainCircuit className="w-4 h-4" />
            CLASSIC 3-MARK & 5-MARK BOARD PUZZLES
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Identify Unknown Compounds &apos;X&apos;, &apos;Y&apos;, &apos;Z&apos;
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Read the experimental clues and deduce the identities of the chemical compounds.
          </p>
        </div>

        <div className="space-y-4">
          {mysteryPuzzles.map((puzzle, i) => {
            const isOpened = expandedFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
              >
                <div
                  onClick={() => setExpandedFaq(isOpened ? null : i)}
                  className="p-5 cursor-pointer flex items-start justify-between gap-4 select-none hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-2">
                      {puzzle.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {puzzle.prompt}
                    </p>
                  </div>
                  <div className="p-1 rounded-lg text-slate-400 shrink-0">
                    {isOpened ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {isOpened && (
                  <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-blue-50/40 dark:bg-blue-950/20 space-y-2.5 text-xs sm:text-sm">
                    <div className="font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-xs">
                      Model CBSE Answer Scheme:
                    </div>
                    <ul className="space-y-1.5 text-slate-800 dark:text-slate-200">
                      <li>• <strong>X:</strong> {puzzle.solution.X}</li>
                      <li>• <strong>Y:</strong> {puzzle.solution.Y}</li>
                      <li>• <strong>Z:</strong> {puzzle.solution.Z}</li>
                    </ul>
                    <div className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs mt-2 border border-slate-800">
                      Balanced Reaction: {puzzle.solution.equation}
                    </div>
                    <div className="text-xs text-slate-500 font-mono pt-1">
                      Reference: {puzzle.solution.concept}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      )}

      {/* 4. Interactive Board Practice Quiz */}
      {(activeSection === "quiz") && (
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Chapter 1 Mock Board Quiz
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Simulate real multiple-choice board exam questions with explanations.
          </p>
        </div>

        <QuizCard
          questions={chapter1Quiz}
          quizTitle="CBSE Chapter 1 Board Mock Test"
          onComplete={handleQuizComplete}
        />
      </section>
      )}
    </div>
  );
};
