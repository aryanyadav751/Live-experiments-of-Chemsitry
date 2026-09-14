import React, { useState } from "react";
import { Reaction, VirtualLabMode } from "../types";
import { REACTIONS, getReactionsByChapter } from "../data/reactions";
import { ExperimentSimulator } from "../components/ExperimentSimulator";
import { DiscoveryLab } from "../components/discovery/DiscoveryLab";
import { openGooglePicker } from "../services/googleDriveService";
import { getAccessToken, signInWithGoogle } from "../lib/firebase";
import {
  FlaskConical,
  BookOpen,
  Layers,
  FolderOpen,
  ChevronDown,
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
      if (
        err?.code === "auth/cancelled-popup-request" ||
        err?.code === "auth/popup-closed-by-user"
      ) {
        // User closed the popup, cancel quietly
        return;
      }
      console.error("Google Picker launch failed:", err);
      alert(err?.message || "Could not launch Google Picker.");
    } finally {
      setPickerLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Main Title & Google Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Virtual Chemistry Lab — Experiment Anything
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Explore authentic CBSE Class 10 chemistry through interactive laboratory simulations and open-ended discovery.
          </p>
        </div>

        {/* Google Picker Quick Launch */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleOpenGooglePicker}
            disabled={pickerLoading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-3.5 py-2.5 sm:py-2 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all disabled:opacity-50 active:scale-98"
            title="Browse your Google Drive for saved chemistry files"
          >
            <FolderOpen className="w-4 h-4 text-blue-500 shrink-0" />
            <span>{pickerLoading ? "Opening Picker..." : "Open with Google Picker"}</span>
          </button>
        </div>
      </div>

      {/* Google Picker picked file banner */}
      {pickerFile && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-900 dark:text-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
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

      {/* 2-Mode Primary Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2 rounded-2xl sm:rounded-3xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Mode 1: Guided Experiments */}
        <button
          onClick={() => setLabMode("guided")}
          className={`group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all ${
            labMode === "guided"
              ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm ring-2 ring-blue-600 dark:ring-blue-500 border border-transparent"
              : "bg-white/60 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 shadow-2xs"
          }`}
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold shrink-0 transition-all ${
              labMode === "guided"
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-400"
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
              Guided Experiments
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-1 truncate">
              NCERT experiments with explanations
            </p>
          </div>
        </button>

        {/* Mode 2: Discovery Lab */}
        <button
          onClick={() => setLabMode("discovery")}
          className={`group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all ${
            labMode === "discovery"
              ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm ring-2 ring-indigo-600 dark:ring-indigo-500 border border-transparent"
              : "bg-white/60 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 shadow-2xs"
          }`}
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold shrink-0 transition-all ${
              labMode === "discovery"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                : "bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
            }`}
          >
            <FlaskConical className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
              <span>Discovery Lab 2.0</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold">
                NEW
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-1 truncate">
              Experiment. Discover. Understand.
            </p>
          </div>
        </button>
      </div>

      {/* MODE 1: GUIDED EXPERIMENTS */}
      {labMode === "guided" && (
        <div className="space-y-6">
          {/* Reaction Selector Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 w-full">
              <label htmlFor="ncert-experiment-select" className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 shrink-0">
                Select NCERT Experiment:
              </label>
              <div className="relative flex-1 w-full sm:max-w-2xl">
                <select
                  id="ncert-experiment-select"
                  value={currentRx.id}
                  onChange={(e) => {
                    const rx = REACTIONS.find((r) => r.id === e.target.value);
                    if (rx) setCurrentRx(rx);
                  }}
                  className="w-full appearance-none pr-10 pl-3.5 py-2.5 h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm font-bold shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer truncate leading-normal"
                >
                  {REACTIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      Ch {r.chapterNumber}: {r.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Interactive Experiment Simulator */}
          <ExperimentSimulator reaction={currentRx} key={currentRx.id} />

          {/* Quick Switch Carousel / Tray */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500 shrink-0" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Quick Switch NCERT Laboratory Experiments
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-1 text-xs">
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
                    className={`px-2.5 py-1 rounded-lg font-mono text-xs transition-colors ${
                      filterChapter === c.num
                        ? "bg-blue-600 text-white font-bold"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Experiments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredReactions.map((r) => {
                const isSelected = r.id === currentRx.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setCurrentRx(r)}
                    className={`text-left p-3.5 rounded-2xl border transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/10 dark:bg-blue-500/15 text-blue-900 dark:text-blue-200 ring-1 ring-blue-500/30 shadow-xs"
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
        </div>
      )}

      {/* MODE 2: DISCOVERY LAB 2.0 */}
      {labMode === "discovery" && <DiscoveryLab />}
    </div>
  );
};
