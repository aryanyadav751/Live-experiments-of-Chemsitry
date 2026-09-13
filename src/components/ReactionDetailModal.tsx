import React, { useState, useEffect } from "react";
import { Reaction } from "../types";
import { SafetyBadge } from "./SafetyBadge";
import { ReactionEquation } from "./ReactionEquation";
import { ObservationPanel } from "./ObservationPanel";
import { MolecularAnimation } from "./MolecularAnimation";
import { Molecular3DViewer } from "./Molecular3DViewer";
import { QuizCard } from "./QuizCard";
import {
  explainReactionTutor,
  getHindiExplanation,
  TutorExplanation,
  HindiExplanation,
  ExplanationLevel
} from "../services/geminiTutor";
import {
  X,
  FlaskConical,
  BookOpen,
  Sparkles,
  Award,
  Layers,
  HelpCircle,
  Star,
  CheckCircle2,
  Atom,
  Bot,
  Languages,
  Globe,
  AlertTriangle,
  Tag
} from "lucide-react";
import { motion } from "motion/react";

interface ReactionDetailModalProps {
  reaction: Reaction;
  onClose: () => void;
  onRunExperiment: (reaction: Reaction) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
}

export const ReactionDetailModal: React.FC<ReactionDetailModalProps> = ({
  reaction,
  onClose,
  onRunExperiment,
  isBookmarked = false,
  onToggleBookmark
}) => {
  const [activeTab, setActiveTab] = useState<"details" | "molecular" | "ai" | "quiz">("details");
  const [molecularMode, setMolecularMode] = useState<"3d" | "schematic">("3d");
  const [aiMode, setAiMode] = useState<"board_exam" | "hindi" | "simple" | "deep_dive">("board_exam");
  const [tutorResult, setTutorResult] = useState<TutorExplanation | null>(null);
  const [hindiResult, setHindiResult] = useState<HindiExplanation | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const fetchAiExplanation = async (mode: "board_exam" | "hindi" | "simple" | "deep_dive") => {
    setAiMode(mode);
    setIsAiLoading(true);
    try {
      if (mode === "hindi") {
        const res = await getHindiExplanation(reaction.id);
        setHindiResult(res);
        setTutorResult(null);
      } else {
        const res = await explainReactionTutor(reaction.id, mode as ExplanationLevel);
        setTutorResult(res);
        setHindiResult(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Preload AI explanation when user opens AI tab
  useEffect(() => {
    if (activeTab === "ai" && !tutorResult && !hindiResult) {
      fetchAiExplanation("board_exam");
    }
  }, [activeTab]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-4xl max-h-[92vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50 dark:bg-slate-950/50">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-600 text-white">
                Chapter {reaction.chapterNumber}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {reaction.topic}
              </span>
              <SafetyBadge mode={reaction.experimentMode} size="sm" />
              {reaction.boardImportance === "Very High" && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  CBSE Board Favorite
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              {reaction.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onRunExperiment(reaction)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all hover:scale-102"
            >
              <FlaskConical className="w-4 h-4" />
              <span className="hidden sm:inline">Launch Simulation</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab("details")}
            className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "details"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 font-bold"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Equation & Details
          </button>

          <button
            onClick={() => setActiveTab("molecular")}
            className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "molecular"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 font-bold"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Atom className="w-4 h-4" />
            Molecular Mechanism
          </button>

          <button
            onClick={() => {
              setActiveTab("ai");
              if (!tutorResult && !hindiResult) fetchAiExplanation("board_exam");
            }}
            className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "ai"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 font-bold"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Bot className="w-4 h-4" />
            AI Tutor & Hindi Mode
          </button>

          {reaction.quiz && reaction.quiz.length > 0 && (
            <button
              onClick={() => setActiveTab("quiz")}
              className={`py-3 px-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "quiz"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400 font-bold"
                  : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Award className="w-4 h-4" />
              Practice Quiz ({reaction.quiz.length})
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === "details" && (
            <>
              {/* Interactive Equation */}
              <div>
                <ReactionEquation reaction={reaction} interactive={true} size="md" />
              </div>

              {/* Reaction Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Observations */}
                <ObservationPanel reaction={reaction} />

                {/* Right: Chemical Explanation & Classification */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-5 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Chemical Explanation
                    </h4>
                    <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      {reaction.explanation}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      NCERT Textbook Connection
                    </h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300 font-medium bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                      📖 {reaction.ncertConcept}
                    </p>
                  </div>

                  {reaction.conditions && reaction.conditions.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Reaction Conditions & Catalysts
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-slate-300">
                        {reaction.conditions.join(" • ")}
                      </p>
                    </div>
                  )}

                  {reaction.realLifeApplications && reaction.realLifeApplications.length > 0 && (
                    <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        <Globe className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Real-World Applications & Everyday Connections</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {reaction.realLifeApplications.map((app, idx) => (
                          <span
                            key={idx}
                            className="inline-block text-xs font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-emerald-500/30 text-slate-800 dark:text-slate-200"
                          >
                            🌍 {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Board Exam Highlight Box */}
              {reaction.commonBoardQuestion && (
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 text-slate-800 dark:text-slate-200 text-sm">
                  <div className="flex items-center gap-2 font-bold text-amber-700 dark:text-amber-400 mb-1">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>Frequently Asked CBSE Board Question:</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium">{reaction.commonBoardQuestion}</p>
                </div>
              )}
            </>
          )}

          {activeTab === "molecular" && (
            <div className="space-y-4">
              {/* Switcher between 3D Ball-and-Stick Viewer & 2D Schematic */}
              <div className="flex items-center justify-between gap-3 bg-slate-100 dark:bg-slate-950/80 p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300 ml-1">Visualization Mode:</span>
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => setMolecularMode("3d")}
                      className={`px-3 py-1 rounded-md font-bold transition-all ${
                        molecularMode === "3d"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      3D Ball-and-Stick Orbit
                    </button>
                    <button
                      onClick={() => setMolecularMode("schematic")}
                      className={`px-3 py-1 rounded-md font-bold transition-all ${
                        molecularMode === "schematic"
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      2D Mechanism Flow
                    </button>
                  </div>
                </div>

                <span className="hidden sm:inline font-mono text-[11px] text-slate-500">
                  {molecularMode === "3d" ? "Rotate 360° in 3D" : "Step-by-step 2D rearrangement"}
                </span>
              </div>

              {molecularMode === "3d" ? (
                <Molecular3DViewer reaction={reaction} />
              ) : (
                <MolecularAnimation reaction={reaction} />
              )}
            </div>
          )}

          {activeTab === "ai" && (
            <div className="space-y-4">
              {/* AI Mode Selector Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => fetchAiExplanation("board_exam")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    aiMode === "board_exam"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  CBSE Board Exam Level
                </button>

                <button
                  onClick={() => fetchAiExplanation("hindi")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    aiMode === "hindi"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  हिंदी में व्याख्या (Hindi Medium)
                </button>

                <button
                  onClick={() => fetchAiExplanation("simple")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    aiMode === "simple"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  Simple Everyday Analogy
                </button>

                <button
                  onClick={() => fetchAiExplanation("deep_dive")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    aiMode === "deep_dive"
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  Deep Dive & Thermodynamics
                </button>
              </div>

              {/* AI Explanation Output */}
              {isAiLoading ? (
                <div className="p-8 text-center text-slate-400 font-mono text-sm flex flex-col items-center gap-3">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing NCERT Class 10 Chemistry explanation...</span>
                </div>
              ) : tutorResult ? (
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-5 space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {tutorResult.title}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      {tutorResult.badge}
                    </span>
                  </div>

                  {tutorResult.safetyWarning && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Laboratory Safety Precaution:</span> {tutorResult.safetyWarning}
                      </div>
                    </div>
                  )}

                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                      Balanced NCERT Chemical Equation
                    </div>
                    <div className="font-mono text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400">
                      {tutorResult.balancedEquation}
                    </div>
                  </div>

                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                    {tutorResult.explanation}
                  </p>

                  {tutorResult.ncertKeywords && tutorResult.ncertKeywords.length > 0 && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center flex-wrap gap-1.5">
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
                        <Tag className="w-3.5 h-3.5 text-blue-500" /> NCERT Keywords:
                      </span>
                      {tutorResult.ncertKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex flex-col gap-1">
                    <div className="text-amber-700 dark:text-amber-300 font-medium">
                      💡 {tutorResult.boardMarksTip}
                    </div>
                    <div className="font-semibold text-slate-600 dark:text-slate-400">
                      Enthalpy Profile: {tutorResult.energyProfile}
                    </div>
                  </div>
                </div>
              ) : hindiResult ? (
                <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-slate-950/60 p-5 space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-indigo-200 dark:border-indigo-900/50 pb-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">
                      {hindiResult.titleHindi}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      CBSE कक्षा 10 हिन्दी माध्यम
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900">
                    <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                      संतुलित रासायनिक समीकरण
                    </div>
                    <div className="font-mono text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400">
                      {hindiResult.balancedEquation}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-300">अवधारणा एवं व्याख्या:</h4>
                      <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed mt-0.5">
                        {hindiResult.conceptHindi}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-300">प्रायोगिक प्रेक्षण:</h4>
                      <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed mt-0.5">
                        {hindiResult.observationHindi}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-amber-700 dark:text-amber-300">सुरक्षा निर्देश:</h4>
                      <p className="text-xs text-amber-800 dark:text-amber-200 mt-0.5">
                        {hindiResult.safetyHindi}
                      </p>
                    </div>
                  </div>

                  {hindiResult.keyWordsHindi && hindiResult.keyWordsHindi.length > 0 && (
                    <div className="pt-2 border-t border-indigo-200 dark:border-indigo-900 flex items-center flex-wrap gap-1.5">
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
                        <Tag className="w-3.5 h-3.5 text-indigo-500" /> मुख्य शब्दावली:
                      </span>
                      {hindiResult.keyWordsHindi.map((kw, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}

          {activeTab === "quiz" && reaction.quiz && (
            <QuizCard questions={reaction.quiz} quizTitle={`${reaction.title} Quiz`} />
          )}
        </div>
      </motion.div>
    </div>
  );
};
