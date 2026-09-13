import React, { useState, useEffect, useMemo } from "react";
import { Reaction, DiscoveryReactionResult, DiscoveryHistoryItem } from "../../types";
import { ChemicalShelf } from "./ChemicalShelf";
import { ExperimentVessel } from "./ExperimentVessel";
import { DiscoveryResult } from "./DiscoveryResult";
import { GeminiLabAssistant } from "./GeminiLabAssistant";
import { DiscoveryChallengesModal } from "./DiscoveryChallengesModal";
import { MyDiscoveriesModal } from "./MyDiscoveriesModal";
import { Molecular3DViewer } from "../Molecular3DViewer";
import { EquationBalancer } from "../EquationBalancer";
import { SimulationConditions, EMPTY_VESSEL_RESULT } from "../../data/discoveryRules";
import { evaluateDiscovery } from "../../utils/discoveryEngine";
import { buildLabContext } from "../../utils/labContext";
import {
  getLocalDiscoveries,
  recordDiscovery,
  checkChallengeCompletion,
  completeChallengeAndAwardXP,
  DiscoveryChallengeObjective
} from "../../services/discoveryService";
import { getReactionById } from "../../data/reactions";
import {
  Sparkles,
  Trophy,
  BookmarkCheck,
  Box,
  Scale,
  FlaskConical,
  Eye,
  X,
  Award,
  ArrowRight
} from "lucide-react";

export const DiscoveryLab: React.FC = () => {
  // Chemical selection state
  const [selectedSubstanceIds, setSelectedSubstanceIds] = useState<string[]>(["fe", "cuso4"]);

  // Smart Virtual Conditions
  const [conditions, setConditions] = useState<SimulationConditions>({
    heat: false,
    light: false,
    electricity: false,
    water: false
  });

  // Simulation execution state
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(true);

  // Result state
  const [evaluationResult, setEvaluationResult] = useState(() =>
    evaluateDiscovery(["fe", "cuso4"], { heat: false, light: false, electricity: false, water: false })
  );

  // Saved discoveries history
  const [discoveries, setDiscoveries] = useState<DiscoveryHistoryItem[]>(() => getLocalDiscoveries());
  const [isSaved, setIsSaved] = useState(false);

  // Active challenge being attempted
  const [activeChallenge, setActiveChallenge] = useState<DiscoveryChallengeObjective | null>(null);
  const [celebrationChallenge, setCelebrationChallenge] = useState<DiscoveryChallengeObjective | null>(null);

  // Modals state
  const [show3DModal, setShow3DModal] = useState(false);
  const [showBalancerModal, setShowBalancerModal] = useState(false);
  const [showChallengesModal, setShowChallengesModal] = useState(false);
  const [showDiscoveriesModal, setShowDiscoveriesModal] = useState(false);

  // Right column active tab on desktop / main tab on mobile
  const [rightPanelTab, setRightPanelTab] = useState<"observation" | "gemini">("observation");
  const [mobileTab, setMobileTab] = useState<"lab" | "chemicals" | "observation" | "gemini" | "3d">("lab");

  // Prompt to pass directly into Gemini Assistant
  const [externalGeminiPrompt, setExternalGeminiPrompt] = useState<string | undefined>(undefined);

  // Build lab context for Gemini
  const labContext = useMemo(() => {
    return buildLabContext({
      selectedSubstances: selectedSubstanceIds,
      reaction: evaluationResult.reaction,
      discoveryResult: evaluationResult.result,
      conditions: {
        heat: conditions.heat,
        light: conditions.light || false,
        electricity: conditions.electricity || false,
        water: conditions.water
      }
    });
  }, [selectedSubstanceIds, evaluationResult, conditions]);

  // Check if current reaction is already saved in journal
  useEffect(() => {
    if (evaluationResult.reaction) {
      const exists = discoveries.some((d) => d.reactionId === evaluationResult.reaction!.id);
      setIsSaved(exists);
    } else {
      setIsSaved(false);
    }
  }, [evaluationResult, discoveries]);

  // Toggle substance in vessel
  const handleToggleSubstance = (id: string) => {
    if (selectedSubstanceIds.includes(id)) {
      setSelectedSubstanceIds((prev) => prev.filter((s) => s !== id));
    } else {
      if (selectedSubstanceIds.length < 4) {
        setSelectedSubstanceIds((prev) => [...prev, id]);
      }
    }
    setHasRun(false);
  };

  const handleAddSubstance = (id: string) => {
    if (!selectedSubstanceIds.includes(id) && selectedSubstanceIds.length < 4) {
      setSelectedSubstanceIds((prev) => [...prev, id]);
      setHasRun(false);
    }
  };

  const handleRemoveSubstance = (id: string) => {
    setSelectedSubstanceIds((prev) => prev.filter((s) => s !== id));
    setHasRun(false);
  };

  const handleClearAll = () => {
    setSelectedSubstanceIds([]);
    setEvaluationResult({
      matched: false,
      empty: true,
      reaction: null,
      result: EMPTY_VESSEL_RESULT,
      rule: null,
      suggestedCombinations: evaluationResult.suggestedCombinations
    });
    setHasRun(false);
  };

  const handleToggleCondition = (key: keyof SimulationConditions) => {
    setConditions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    setHasRun(false);
  };

  // Run experiment simulation
  const handleRunExperiment = () => {
    if (selectedSubstanceIds.length === 0) return;

    setIsRunning(true);
    setMobileTab("lab");

    setTimeout(() => {
      const evalRes = evaluateDiscovery(selectedSubstanceIds, conditions);
      setEvaluationResult(evalRes);
      setIsRunning(false);
      setHasRun(true);
      setRightPanelTab("observation");

      // Check if this completes any discovery challenge
      if (evalRes.matched && evalRes.reaction) {
        const completed = checkChallengeCompletion(evalRes.reaction.id, evalRes.reaction.reactionType);
        if (completed) {
          completeChallengeAndAwardXP(completed);
          setCelebrationChallenge(completed);
        }
      }
    }, 600);
  };

  // Save current reaction to discoveries journal
  const handleSaveDiscovery = () => {
    if (!evaluationResult.reaction) return;

    const res = recordDiscovery({
      reactionId: evaluationResult.reaction.id,
      title: evaluationResult.reaction.title,
      equation: evaluationResult.reaction.equation,
      balancedEquation: evaluationResult.reaction.balancedEquation,
      reactionType: evaluationResult.reaction.reactionType.join(" / "),
      chapter: `Chapter ${evaluationResult.reaction.chapterNumber}`,
      substances: selectedSubstanceIds
    });

    setDiscoveries(res.history);
    setIsSaved(true);
  };

  // Load a discovered reaction or suggestion back into lab
  const handleLoadReaction = (item: { reactionId?: string; substances?: string[]; ids?: string[] }) => {
    const rx = item.reactionId ? getReactionById(item.reactionId) : null;
    let newSubstances: string[] = [];

    if (item.ids) {
      newSubstances = item.ids;
    } else if (item.substances) {
      newSubstances = item.substances;
    } else if (rx) {
      // derive from reaction reactants
      if (rx.id === "ch1-iron-copper-sulphate-displacement") newSubstances = ["fe", "cuso4"];
      else if (rx.id === "ch2-zinc-acid-hydrogen") newSubstances = ["zn", "hcl"];
      else if (rx.id === "ch1-slaked-lime") newSubstances = ["cao", "h2o"];
      else if (rx.id === "ch1-ferrous-sulphate-decomposition") {
        newSubstances = ["feso4"];
        setConditions((prev) => ({ ...prev, heat: true }));
      } else if (rx.id === "ch1-photolytic-silver-chloride") {
        newSubstances = ["agcl"];
        setConditions((prev) => ({ ...prev, light: true }));
      } else if (rx.id === "ch1-electrolysis-of-water") {
        newSubstances = ["h2o"];
        setConditions((prev) => ({ ...prev, electricity: true }));
      } else {
        newSubstances = ["fe", "cuso4"];
      }
    }

    setSelectedSubstanceIds(newSubstances);
    const evalRes = evaluateDiscovery(newSubstances, conditions);
    setEvaluationResult(evalRes);
    setHasRun(true);
    setMobileTab("lab");
  };

  const handleAskGemini = (prompt?: string) => {
    setRightPanelTab("gemini");
    setMobileTab("gemini");
    if (prompt) {
      setExternalGeminiPrompt(prompt);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-2 sm:px-4 py-3 space-y-3">
      {/* Top Bar / Laboratory Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Discovery Lab 2.0
              </h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                CBSE Class 10 NCERT
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              &ldquo;Experiment. Discover. Understand.&rdquo;
            </p>
          </div>
        </div>

        {/* Quick Nav Tools */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowChallengesModal(true)}
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 font-bold text-xs transition-colors"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Challenges</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDiscoveriesModal(true)}
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
          >
            <BookmarkCheck className="w-4 h-4 text-blue-500" />
            <span className="hidden sm:inline">My Discoveries</span>
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700">
              {discoveries.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleAskGemini()}
            className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xs transition-transform active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Gemini</span>
          </button>
        </div>
      </div>

      {/* Challenge Completed Celebration Banner */}
      {celebrationChallenge && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider">
                🎉 Challenge Discovered & Solved!
              </div>
              <div className="text-sm font-bold">
                {celebrationChallenge.title} (+{celebrationChallenge.xpReward} XP awarded to your streak)
              </div>
            </div>
          </div>

          <button
            onClick={() => setCelebrationChallenge(null)}
            className="p-1 rounded-full bg-black/10 hover:bg-black/20 text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MOBILE TAB SWITCHER (visible on mobile only) */}
      <div className="flex lg:hidden items-center justify-between p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
        <button
          onClick={() => setMobileTab("lab")}
          className={`flex-1 py-1.5 px-2 rounded-xl transition-all ${
            mobileTab === "lab" ? "bg-white dark:bg-slate-900 shadow-xs text-blue-600" : "text-slate-600"
          }`}
        >
          🧪 Lab
        </button>
        <button
          onClick={() => setMobileTab("chemicals")}
          className={`flex-1 py-1.5 px-2 rounded-xl transition-all ${
            mobileTab === "chemicals" ? "bg-white dark:bg-slate-900 shadow-xs text-blue-600" : "text-slate-600"
          }`}
        >
          🧴 Shelf
        </button>
        <button
          onClick={() => setMobileTab("observation")}
          className={`flex-1 py-1.5 px-2 rounded-xl transition-all ${
            mobileTab === "observation" ? "bg-white dark:bg-slate-900 shadow-xs text-blue-600" : "text-slate-600"
          }`}
        >
          👁 Result
        </button>
        <button
          onClick={() => setMobileTab("gemini")}
          className={`flex-1 py-1.5 px-2 rounded-xl transition-all ${
            mobileTab === "gemini" ? "bg-white dark:bg-slate-900 shadow-xs text-blue-600" : "text-slate-600"
          }`}
        >
          🧠 Gemini
        </button>
        <button
          onClick={() => {
            if (evaluationResult.reaction) setShow3DModal(true);
            else setMobileTab("observation");
          }}
          className="flex-1 py-1.5 px-2 rounded-xl text-slate-600"
        >
          🔬 3D
        </button>
      </div>

      {/* MAIN 3-COLUMN WORKBENCH LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-[600px]">
        {/* COLUMN 1: CHEMICALS SHELF */}
        <div
          className={`lg:col-span-3 h-full ${
            mobileTab === "chemicals" ? "block" : "hidden lg:block"
          }`}
        >
          <ChemicalShelf
            selectedIds={selectedSubstanceIds}
            onToggleSubstance={handleToggleSubstance}
            maxSelection={4}
          />
        </div>

        {/* COLUMN 2: EXPERIMENT AREA (Reaction Vessel & Controls) */}
        <div
          className={`lg:col-span-5 h-full ${
            mobileTab === "lab" ? "block" : "hidden lg:block"
          }`}
        >
          <ExperimentVessel
            selectedIds={selectedSubstanceIds}
            onAddSubstance={handleAddSubstance}
            onRemoveSubstance={handleRemoveSubstance}
            onClearAll={handleClearAll}
            conditions={conditions}
            onToggleCondition={handleToggleCondition}
            onRunExperiment={handleRunExperiment}
            isRunning={isRunning}
            activeVisualEffect={evaluationResult.result.visualEffect}
            reactionOccurred={evaluationResult.matched}
            reaction={evaluationResult.reaction}
            discoveryResult={evaluationResult.result}
            hasRun={hasRun}
            onAskGeminiPrompt={handleAskGemini}
            onView3DModal={() => setShow3DModal(true)}
            onBalanceEquation={() => setShowBalancerModal(true)}
          />
        </div>

        {/* COLUMN 3: OBSERVATION / RESULT / GEMINI ASSISTANT */}
        <div
          className={`lg:col-span-4 h-full flex flex-col ${
            mobileTab === "observation" || mobileTab === "gemini" ? "block" : "hidden lg:flex"
          }`}
        >
          {/* Desktop Right Column Tab Switcher */}
          <div className="hidden lg:flex items-center p-1 mb-2 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setRightPanelTab("observation")}
              className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                rightPanelTab === "observation"
                  ? "bg-white dark:bg-slate-900 shadow-xs text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Observation & Analysis</span>
            </button>
            <button
              onClick={() => setRightPanelTab("gemini")}
              className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                rightPanelTab === "gemini"
                  ? "bg-white dark:bg-slate-900 shadow-xs text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>🧠 Gemini Assistant</span>
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto">
            {(rightPanelTab === "observation" && mobileTab !== "gemini") || mobileTab === "observation" ? (
              <DiscoveryResult
                result={evaluationResult.result}
                reaction={evaluationResult.reaction}
                onOpen3D={() => setShow3DModal(true)}
                onOpenBalancer={() => setShowBalancerModal(true)}
                onAskGemini={handleAskGemini}
                onSaveDiscovery={handleSaveDiscovery}
                isSaved={isSaved}
                suggestedCombinations={evaluationResult.suggestedCombinations}
                onApplySuggested={(ids) => handleLoadReaction({ ids })}
              />
            ) : (
              <GeminiLabAssistant
                labContext={labContext}
                externalPrompt={externalGeminiPrompt}
                onClearExternalPrompt={() => setExternalGeminiPrompt(undefined)}
              />
            )}
          </div>
        </div>
      </div>

      {/* 3D MOLECULAR VIEWER MODAL */}
      {show3DModal && evaluationResult.reaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="text-sm font-extrabold text-white">
                    3D Molecular Bond & Stoichiometry Engine
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {evaluationResult.reaction.balancedEquation}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShow3DModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 min-h-[440px] p-2">
              <Molecular3DViewer
                reaction={evaluationResult.reaction}
                height={460}
                onClose={() => setShow3DModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* EQUATION BALANCER MODAL */}
      {showBalancerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-500" />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Stoichiometric Equation Balancer
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Verify conservation of mass atom-by-atom
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBalancerModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <EquationBalancer />
            </div>
          </div>
        </div>
      )}

      {/* CHALLENGES MODAL */}
      <DiscoveryChallengesModal
        isOpen={showChallengesModal}
        onClose={() => setShowChallengesModal(false)}
        onSelectChallenge={(chal) => {
          setActiveChallenge(chal);
          if (chal.targetReactionId) {
            handleLoadReaction({ reactionId: chal.targetReactionId });
          }
        }}
      />

      {/* MY DISCOVERIES MODAL */}
      <MyDiscoveriesModal
        isOpen={showDiscoveriesModal}
        onClose={() => setShowDiscoveriesModal(false)}
        discoveries={discoveries}
        onLoadReaction={(item) => handleLoadReaction(item)}
        onOpen3D={(rxId) => {
          const rx = getReactionById(rxId);
          if (rx) {
            setEvaluationResult((prev) => ({ ...prev, reaction: rx }));
            setShow3DModal(true);
          }
        }}
        onOpenBalancer={() => setShowBalancerModal(true)}
      />
    </div>
  );
};
