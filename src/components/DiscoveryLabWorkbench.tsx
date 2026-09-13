import React, { useState, useMemo } from "react";
import { DiscoverySubstance, DiscoveryReactionResult } from "../types";
import { DISCOVERY_SUBSTANCES, getSubstanceById } from "../data/discoverySubstances";
import { simulateSubstanceMixture, SimulationConditions } from "../utils/discoverySimulator";
import { auth, saveExperimentToCloud } from "../lib/firebase";
import { GoogleDriveReportModal } from "./GoogleDriveReportModal";
import { LabReportExport } from "../services/googleDriveService";
import { motion, AnimatePresence } from "motion/react";
import {
  FlaskConical,
  Flame,
  Droplets,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Save,
  CheckCircle2,
  Share2,
  Search,
  Plus,
  X,
  Thermometer,
  Eye,
  Info,
  Beaker,
  TestTube,
  HardDrive
} from "lucide-react";

export const DiscoveryLabWorkbench: React.FC = () => {
  const [selectedSubstanceIds, setSelectedSubstanceIds] = useState<string[]>(["zn", "hcl"]);
  const [heatEnabled, setHeatEnabled] = useState<boolean>(false);
  const [waterAdded, setWaterAdded] = useState<boolean>(false);
  const [splinterTest, setSplinterTest] = useState<boolean>(false);
  const [limeWaterTest, setLimeWaterTest] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [vesselType, setVesselType] = useState<"beaker" | "test-tube">("beaker");

  // Save / Cloud status
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Google Drive modal state
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Categories
  const categories = ["All", "Acid", "Base", "Metal", "Salt", "Organic", "Indicator", "Other"];

  // Filtered reagents for shelf
  const filteredSubstances = useMemo(() => {
    return DISCOVERY_SUBSTANCES.filter((s) => {
      const matchesCategory = activeCategory === "All" || s.category === activeCategory;
      const matchesQuery =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.formula.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  // Compute reaction result
  const conditions: SimulationConditions = {
    heat: heatEnabled,
    water: waterAdded,
    testedWithSplinter: splinterTest,
    testedWithLimeWater: limeWaterTest
  };

  const reactionResult: DiscoveryReactionResult = useMemo(() => {
    return simulateSubstanceMixture(selectedSubstanceIds, conditions);
  }, [selectedSubstanceIds, heatEnabled, waterAdded, splinterTest, limeWaterTest]);

  // Toggle reagent selection
  const handleToggleSubstance = (id: string) => {
    if (selectedSubstanceIds.includes(id)) {
      setSelectedSubstanceIds((prev) => prev.filter((item) => item !== id));
    } else {
      if (selectedSubstanceIds.length >= 4) {
        // limit to 4 simultaneous reagents in reaction vessel
        return;
      }
      setSelectedSubstanceIds((prev) => [...prev, id]);
    }
    setSaveSuccess(false);
  };

  // Clear vessel
  const handleClearVessel = () => {
    setSelectedSubstanceIds([]);
    setHeatEnabled(false);
    setWaterAdded(false);
    setSplinterTest(false);
    setLimeWaterTest(false);
    setSaveSuccess(false);
  };

  // Save experiment to Firebase
  const handleSaveToCloud = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please sign in with Google to save your experiment to Firebase.");
      return;
    }

    try {
      setIsSaving(true);
      const substanceNames = selectedSubstanceIds
        .map((id) => getSubstanceById(id)?.name || id)
        .join(" + ");

      await saveExperimentToCloud(user.uid, {
        mode: "discovery",
        title: reactionResult.title,
        substances: selectedSubstanceIds,
        reactionResult: reactionResult.balancedEquation,
        isHazardous: reactionResult.isHazardous,
        observations: reactionResult.observations.join("; "),
        notes: `Simulated mix of ${substanceNames}. Heat: ${heatEnabled ? "ON" : "OFF"}.`
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save experiment error:", err);
      alert("Could not save experiment. Please check network connection.");
    } finally {
      setIsSaving(false);
    }
  };

  // Prepare lab report for Google Drive export
  const currentReport: LabReportExport = {
    title: reactionResult.title,
    chapter: "NCERT Class 10 Discovery Sandbox",
    aim: `To investigate the chemical reaction occurring between ${selectedSubstanceIds
      .map((id) => getSubstanceById(id)?.name)
      .filter(Boolean)
      .join(", ")} under virtual laboratory conditions.`,
    apparatus: `${vesselType === "beaker" ? "Glass Beaker (250 mL)" : "Hard Glass Boiling Tube"}, ${
      heatEnabled ? "Bunsen Burner, Wire Gauze, Tripod Stand, " : ""
    }${splinterTest ? "Wooden Splinter, " : ""}${limeWaterTest ? "Delivery Tube and Lime Water Flask, " : ""}Droppers and Reagents.`,
    reactions: [reactionResult.balancedEquation],
    observations: reactionResult.observations.join("\n- "),
    inference: reactionResult.explanation,
    safetyPrecautions: reactionResult.isHazardous
      ? reactionResult.simulationSafetyNote ||
        "Hazardous chemical reaction simulated virtually. Eye protection and fume hood required in physical laboratory."
      : "Standard educational safety protocols followed. Reagents handled in non-toxic virtual simulation.",
    mode: "discovery"
  };

  return (
    <div className="space-y-6">
      {/* Workbench Header & Sub-Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              🔬 Discovery Lab — Choose Substances & Observe
            </h2>
            <span className="text-[10px] font-mono font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
              FREE SANDBOX
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Mix up to 4 reagents from the shelf, apply heat, add water, and run real-time qualitative tests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setVesselType(vesselType === "beaker" ? "test-tube" : "beaker")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            title="Switch glassware type"
          >
            {vesselType === "beaker" ? (
              <>
                <Beaker className="w-3.5 h-3.5 text-blue-500" />
                <span>Beaker</span>
              </>
            ) : (
              <>
                <TestTube className="w-3.5 h-3.5 text-indigo-500" />
                <span>Test Tube</span>
              </>
            )}
          </button>

          <button
            onClick={handleClearVessel}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
            title="Reset reaction vessel"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout: Left Shelf, Right Reaction Apparatus & Sensory Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Reagent Shelf (Left 5 Columns) */}
        <div className="lg:col-span-5 flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-blue-500" />
              <span>Chemical Reagent Shelf</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              {selectedSubstanceIds.length}/4 Selected
            </span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or formula (e.g. Zn, HCl)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            />
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-xl whitespace-nowrap text-[11px] font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Reagents Grid */}
          <div className="flex-1 overflow-y-auto max-h-[440px] pr-1 space-y-2">
            {filteredSubstances.map((sub) => {
              const isSelected = selectedSubstanceIds.includes(sub.id);
              return (
                <button
                  key={sub.id}
                  onClick={() => handleToggleSubstance(sub.id)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-2.5 ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10 dark:bg-blue-500/15 text-slate-900 dark:text-white shadow-sm"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs truncate">{sub.name}</span>
                      <span className="font-mono text-[11px] font-extrabold text-blue-600 dark:text-blue-400 shrink-0">
                        {sub.formula}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {sub.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono">
                      <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {sub.category}
                      </span>
                      {sub.phValue !== undefined && (
                        <span className="text-purple-600 dark:text-purple-400">
                          pH {sub.phValue}
                        </span>
                      )}
                      {sub.isHazardous && (
                        <span className="text-amber-600 dark:text-amber-400 font-bold">
                          ⚠️ Hazard
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-slate-300 dark:border-slate-700 text-slate-400"
                    }`}
                  >
                    {isSelected ? <CheckCircle2 className="w-4 h-4" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reaction Apparatus & Observations (Right 7 Columns) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {/* Reaction Vessel Interactive Canvas */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
            {/* Environmental Conditions Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>Reaction Conditions:</span>
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {/* Heat switch */}
                <button
                  onClick={() => setHeatEnabled(!heatEnabled)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all border ${
                    heatEnabled
                      ? "bg-orange-500 text-white border-orange-600 shadow-md shadow-orange-500/25"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <Flame className={`w-3.5 h-3.5 ${heatEnabled ? "animate-bounce" : ""}`} />
                  <span>Heat (Bunsen Flame)</span>
                </button>

                {/* Water switch */}
                <button
                  onClick={() => setWaterAdded(!waterAdded)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all border ${
                    waterAdded
                      ? "bg-sky-500 text-white border-sky-600 shadow-md shadow-sky-500/25"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Add Water (H₂O)</span>
                </button>

                {/* Splinter test */}
                <button
                  onClick={() => setSplinterTest(!splinterTest)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all border ${
                    splinterTest
                      ? "bg-amber-600 text-white border-amber-700 shadow-md shadow-amber-600/25"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  }`}
                  title="Test evolved gases with burning splinter (Pop sound test)"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Burning Splinter Test</span>
                </button>

                {/* Lime water test */}
                <button
                  onClick={() => setLimeWaterTest(!limeWaterTest)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-all border ${
                    limeWaterTest
                      ? "bg-teal-600 text-white border-teal-700 shadow-md shadow-teal-600/25"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  }`}
                  title="Bubble gas into fresh lime water flask"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lime Water Test</span>
                </button>
              </div>
            </div>

            {/* Vessel Visual Stage */}
            <div className="relative h-64 rounded-2xl bg-gradient-to-b from-slate-100/80 to-slate-200/50 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden">
              {/* Heat thermal wave underneath */}
              {heatEnabled && (
                <div className="absolute bottom-2 flex items-center justify-center">
                  <div className="w-24 h-12 rounded-t-full bg-gradient-to-t from-orange-600 via-amber-400 to-transparent opacity-75 blur-sm animate-pulse" />
                </div>
              )}

              {/* Glassware Model Container */}
              <div
                className={`relative transition-all duration-500 border-4 border-slate-400/40 dark:border-slate-600/40 backdrop-blur-xs flex flex-col justify-end overflow-hidden ${
                  vesselType === "beaker"
                    ? "w-44 h-48 rounded-b-3xl border-t-0"
                    : "w-24 h-52 rounded-b-full border-t-0"
                }`}
                style={{
                  boxShadow: "inset 0 0 20px rgba(255,255,255,0.2), 0 10px 25px rgba(0,0,0,0.1)"
                }}
              >
                {/* Meniscus / Fluid Level */}
                {selectedSubstanceIds.length > 0 && (
                  <motion.div
                    className="w-full relative transition-all duration-700"
                    style={{
                      height: `${Math.min(85, 30 + selectedSubstanceIds.length * 15)}%`,
                      backgroundColor: reactionResult.visualEffect.color || "#e0f2fe",
                      opacity: 0.85
                    }}
                  >
                    {/* Fluid surface meniscus ripple */}
                    <div className="absolute top-0 inset-x-0 h-2 bg-white/40 rounded-full" />

                    {/* Effervescence Bubbles */}
                    {reactionResult.visualEffect.hasBubbles && (
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[10, 30, 50, 70, 90].map((left, idx) => (
                          <motion.div
                            key={idx}
                            animate={{ y: [40, -10], opacity: [0, 1, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1 + (idx % 3) * 0.4,
                              delay: idx * 0.2
                            }}
                            className="absolute w-2 h-2 rounded-full bg-white/80"
                            style={{ left: `${left}%`, bottom: "10%" }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Precipitate layer at bottom */}
                    {reactionResult.visualEffect.hasPrecipitate && (
                      <div
                        className="absolute bottom-0 inset-x-0 h-5 transition-all duration-1000 shadow-inner"
                        style={{
                          backgroundColor:
                            reactionResult.visualEffect.precipitateColor || "#ffffff"
                        }}
                      >
                        <span className="text-[9px] font-mono font-bold text-slate-800 text-center block leading-tight pt-0.5">
                          {reactionResult.visualEffect.precipitateName || "Precipitate"}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Empty vessel placeholder */}
                {selectedSubstanceIds.length === 0 && (
                  <div className="h-full flex items-center justify-center p-3 text-center text-slate-400 text-xs font-mono">
                    Add substances from shelf
                  </div>
                )}
              </div>

              {/* Rising gas / steam cues */}
              {reactionResult.visualEffect.gasName && (
                <div className="absolute top-4 flex flex-col items-center animate-bounce">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-mono font-bold border border-slate-700 shadow-md">
                    ↑ {reactionResult.visualEffect.gasName}
                  </span>
                </div>
              )}

              {/* Temperature Delta Gauge in corner */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-[11px] font-mono flex items-center gap-1.5 shadow-sm">
                <Thermometer
                  className={`w-3.5 h-3.5 ${
                    reactionResult.energyChange === "Exothermic"
                      ? "text-red-500"
                      : reactionResult.energyChange === "Endothermic"
                      ? "text-blue-500"
                      : "text-slate-400"
                  }`}
                />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {reactionResult.energyChange === "Exothermic"
                    ? `+${reactionResult.visualEffect.temperatureChange || 15}°C (Exothermic)`
                    : reactionResult.energyChange === "Endothermic"
                    ? `-${reactionResult.visualEffect.temperatureChange || 5}°C (Endothermic)`
                    : "Room Temp (25°C)"}
                </span>
              </div>
            </div>

            {/* Currently Mixed Reagents Chips in Vessel */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400">In Vessel:</span>
              {selectedSubstanceIds.length === 0 ? (
                <span className="text-xs text-slate-400 italic">None (Select from shelf)</span>
              ) : (
                selectedSubstanceIds.map((id) => {
                  const s = getSubstanceById(id);
                  return (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 text-xs font-bold"
                    >
                      <span>{s?.name || id}</span>
                      <button
                        onClick={() => handleToggleSubstance(id)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })
              )}
            </div>
          </div>

          {/* Simulation-First Safety Protocol Banner (for hazardous combinations) */}
          {reactionResult.isHazardous && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-900 dark:text-amber-200 space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-700 dark:text-amber-300">
                <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>SIMULATION-FIRST SAFETY PROTOCOL ENFORCED</span>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                {reactionResult.simulationSafetyNote ||
                  "This reaction involves hazardous thermal energy or toxic gaseous release. The Virtual Chemistry Lab allows you to inspect the qualitative phenomena safely on screen without real-world physical hazard."}
              </p>
            </div>
          )}

          {/* Qualitative Observations & Stoichiometric Result Panel */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Chemical Status
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {reactionResult.title}
                </h3>
              </div>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
                  reactionResult.occurred
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                }`}
              >
                {reactionResult.reactionType}
              </span>
            </div>

            {/* Balanced Equation */}
            {reactionResult.occurred && (
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                  Balanced Chemical Equation
                </span>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm overflow-x-auto">
                  {reactionResult.balancedEquation}
                </div>
              </div>
            )}

            {/* Observations List */}
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Qualitative Laboratory Observations
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {reactionResult.observations.map((obs, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scientific Explanation */}
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                Scientific Inference & NCERT Concept
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {reactionResult.explanation}
              </p>
            </div>

            {/* Action Buttons: Save to Cloud & Export to Google Drive */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveToCloud}
                  disabled={isSaving || selectedSubstanceIds.length === 0}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-xs font-bold text-slate-800 dark:text-slate-200 transition-all disabled:opacity-50"
                  title="Save experiment record to Firebase Firestore"
                >
                  <Save className="w-3.5 h-3.5 text-blue-500" />
                  <span>{isSaving ? "Saving..." : saveSuccess ? "Saved to Cloud! ✓" : "Save Run"}</span>
                </button>
              </div>

              <button
                onClick={() => setShowReportModal(true)}
                disabled={selectedSubstanceIds.length === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>Export Report to Google Drive</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Google Drive Export & Google Picker Modal */}
      {showReportModal && (
        <GoogleDriveReportModal
          report={currentReport}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
};
