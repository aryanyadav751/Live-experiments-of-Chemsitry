import React, { useState } from "react";
import { Reaction, VirtualLabMode } from "../types";
import { REACTIONS, getReactionsByChapter } from "../data/reactions";
import { ExperimentSimulator } from "../components/ExperimentSimulator";
import { DiscoveryLabWorkbench } from "../components/DiscoveryLabWorkbench";
import { DiscoveryLab } from "../components/discovery/DiscoveryLab";
import { ChallengeLab } from "../components/ChallengeLab";
import { AuthBar } from "../components/AuthBar";
import { GoogleDriveReportModal } from "../components/GoogleDriveReportModal";
import { LabReportExport, openGooglePicker } from "../services/googleDriveService";
import { auth, getAccessToken, signInWithGoogle } from "../lib/firebase";
import {
  FlaskConical,
  BookOpen,
  Sparkles,
  Layers,
  Award,
  HardDrive,
  FolderOpen,
  ShieldAlert,
  ChevronRight,
  ExternalLink
} from "lucide-react";

interface VirtualLabPageProps {
  selectedReaction?: Reaction | null;
  onSelectReaction: (reaction: Reaction) => void;
}

export const VirtualLabPage: React.FC<VirtualLabPageProps> = ({
  selectedReaction,
  onSelectReaction
}) => {
  const [labMode, setLabMode] = useState<VirtualLabMode>("guided");
  const [currentRx, setCurrentRx] = useState<Reaction>(selectedReaction || REACTIONS[0]);
  const [filterChapter, setFilterChapter] = useState<number | "all">("all");

  // Google Drive report modal for Guided Experiments
  const [showGuidedReportModal, setShowGuidedReportModal] = useState<boolean>(false);

  // Google Picker modal state
  const [pickerFile, setPickerFile] = useState<{ id: string; name: string; url?: string } | null>(
    null
  );
  const [pickerLoading, setPickerLoading] = useState<boolean>(false);

  const filteredReactions =
    filterChapter === "all" ? REACTIONS : getReactionsByChapter(filterChapter);

  // Open Google Picker from top banner
  const handleOpenGooglePicker = async () => {
    try {
      setPickerLoading(true);
      let token = getAccessToken();
      if (!token) {
        const authRes = await signInWithGoogle();
        token = authRes.accessToken;
      }
      if (!token) {
        alert("Please sign in to Google to open Google Picker.");
        return;
      }

      await openGooglePicker(token, (file) => {
        setPickerFile(file);
      });
    } catch (err: any) {
      console.error("Google Picker launch failed:", err);
      alert(err?.message || "Could not launch Google Picker.");
    } finally {
      setPickerLoading(false);
    }
  };

  // Prepare Guided Experiment Report for Drive
  const guidedReport: LabReportExport = {
    title: currentRx.title,
    chapter: `NCERT Class 10 Chemistry — Chapter ${currentRx.chapterNumber}: ${currentRx.chapter}`,
    aim: `To perform and observe the ${currentRx.reactionType.join(", ")} experiment for: ${currentRx.title}.`,
    apparatus: `${currentRx.simulatorConfig?.apparatus || "Glass Beaker / Boiling Tube"}, Reagents (${currentRx.reactants.join(
      ", "
    )}), Heat Source / Droppers as per NCERT practical guidelines.`,
    reactions: [currentRx.balancedEquation],
    observations: currentRx.observations.join("\n- "),
    inference: `${currentRx.explanation}\n\nMolecular Mechanism: ${currentRx.molecularExplanation}`,
    safetyPrecautions: currentRx.safetyNotes.join("; ") || "Handle laboratory glassware with care.",
    mode: "guided"
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Cloud & Drive Auth Banner */}
      <AuthBar />

      {/* Main Title & Mode Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold mb-2">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>VIRTUAL CHEMISTRY LABORATORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Virtual Chemistry Lab — Experiment Anything
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Explore authentic CBSE Class 10 chemistry through three interactive modes with Google Drive lab reports and cloud progress.
          </p>
        </div>

        {/* Google Picker Quick Launch */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleOpenGooglePicker}
            disabled={pickerLoading}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all disabled:opacity-50"
            title="Browse your Google Drive for saved chemistry files"
          >
            <FolderOpen className="w-4 h-4 text-blue-500" />
            <span>{pickerLoading ? "Opening Picker..." : "Open with Google Picker"}</span>
          </button>
        </div>
      </div>

      {/* Google Picker picked file banner */}
      {pickerFile && (
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-900 dark:text-blue-100 flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 min-w-0">
            <FolderOpen className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="truncate font-bold">Selected Drive File: {pickerFile.name}</span>
          </div>
          {pickerFile.url && (
            <a
              href={pickerFile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold hover:underline shrink-0"
            >
              <span>Open in Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}

      {/* 3-Mode Primary Switcher */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-1.5 rounded-3xl bg-slate-200/70 dark:bg-slate-900 border border-slate-300/60 dark:border-slate-800">
        {/* Mode 1: Guided Experiments */}
        <button
          onClick={() => setLabMode("guided")}
          className={`flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all ${
            labMode === "guided"
              ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md shadow-slate-900/5 ring-1 ring-blue-500/30"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/40"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
              labMode === "guided"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-extrabold text-sm flex items-center gap-1.5">
              <span>📚 Guided Experiments</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              NCERT experiments with explanations
            </p>
          </div>
        </button>

        {/* Mode 2: Discovery Lab */}
        <button
          onClick={() => setLabMode("discovery")}
          className={`flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all ${
            labMode === "discovery"
              ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md shadow-slate-900/5 ring-1 ring-indigo-500/30"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/40"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
              labMode === "discovery"
                ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            }`}
          >
            <FlaskConical className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-extrabold text-sm flex items-center gap-1.5">
              <span>🔬 Discovery Lab 2.0</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold">
                NEW
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              &ldquo;Experiment. Discover. Understand.&rdquo;
            </p>
          </div>
        </button>

        {/* Mode 3: Challenge Lab */}
        <button
          onClick={() => setLabMode("challenge")}
          className={`flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all ${
            labMode === "challenge"
              ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md shadow-slate-900/5 ring-1 ring-amber-500/30"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/40"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
              labMode === "challenge"
                ? "bg-amber-600 text-white shadow-sm shadow-amber-500/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            }`}
          >
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-extrabold text-sm flex items-center gap-1.5">
              <span>🎮 Challenge Lab</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
              Solve chemistry challenges virtually
            </p>
          </div>
        </button>
      </div>

      {/* MODE 1: GUIDED EXPERIMENTS */}
      {labMode === "guided" && (
        <div className="space-y-6">
          {/* Reaction Selector Bar with Export to Google Drive button */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Select NCERT Experiment:
              </span>
              <select
                value={currentRx.id}
                onChange={(e) => {
                  const rx = REACTIONS.find((r) => r.id === e.target.value);
                  if (rx) setCurrentRx(rx);
                }}
                className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              >
                {REACTIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    Ch {r.chapterNumber}: {r.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowGuidedReportModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all active:scale-95"
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>Export Practical Report to Google Drive</span>
              </button>
            </div>
          </div>

          {/* Interactive Experiment Simulator */}
          <ExperimentSimulator reaction={currentRx} key={currentRx.id} />

          {/* Quick Switch Carousel / Tray */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Quick Switch NCERT Laboratory Experiments
                </h3>
              </div>

              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-400 font-mono mr-1">Filter:</span>
                {[
                  { num: "all" as const, label: "All" },
                  { num: 1, label: "Ch 1" },
                  { num: 2, label: "Ch 2" },
                  { num: 3, label: "Ch 3" },
                  { num: 4, label: "Ch 4" }
                ].map((c) => (
                  <button
                    key={String(c.num)}
                    onClick={() => setFilterChapter(c.num)}
                    className={`px-2.5 py-0.5 rounded-full font-mono text-xs ${
                      filterChapter === c.num
                        ? "bg-blue-600 text-white font-bold"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Experiments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredReactions.map((r) => {
                const isSelected = r.id === currentRx.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setCurrentRx(r)}
                    className={`text-left p-3.5 rounded-2xl border transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10 dark:bg-blue-500/15 text-blue-900 dark:text-blue-200 ring-1 ring-blue-500/30"
                        : "border-slate-200 dark:border-slate-800 hover:border-blue-400 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span>Ch {r.chapterNumber}</span>
                      <span className="capitalize">{r.simulatorConfig?.apparatus || "beaker"}</span>
                    </div>
                    <div className="font-bold text-xs line-clamp-1">{r.title}</div>
                    <div className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 truncate mt-1">
                      {r.balancedEquation}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Google Drive Export Modal for Guided Experiment */}
          {showGuidedReportModal && (
            <GoogleDriveReportModal
              report={guidedReport}
              onClose={() => setShowGuidedReportModal(false)}
            />
          )}
        </div>
      )}

      {/* MODE 2: DISCOVERY LAB 2.0 */}
      {labMode === "discovery" && <DiscoveryLab />}

      {/* MODE 3: CHALLENGE LAB */}
      {labMode === "challenge" && <ChallengeLab />}
    </div>
  );
};
