import React, { useState, useMemo } from "react";
import { Reaction } from "../types";
import { REACTIONS } from "../data/reactions";
import { ReactionEquation } from "../components/ReactionEquation";
import {
  Globe,
  Search,
  Sparkles,
  FlaskConical,
  ArrowRight,
  Filter,
  CheckCircle2,
  Atom,
  Flame,
  Layers,
  ExternalLink,
  Info
} from "lucide-react";

interface RealWorldApplicationsPageProps {
  onSelectReaction: (reaction: Reaction) => void;
  onRunExperiment: (reaction: Reaction) => void;
}

interface ApplicationItem {
  applicationText: string;
  reaction: Reaction;
  domain: "Household & Food" | "Medicine & Health" | "Industry & Engineering" | "Nature & Environment";
  iconEmoji: string;
}

// Map applications to categorical domains
function categorizeApplication(text: string, reaction: Reaction): { domain: ApplicationItem["domain"]; iconEmoji: string } {
  const lower = (text + " " + reaction.title).toLowerCase();

  if (
    lower.includes("food") ||
    lower.includes("baking") ||
    lower.includes("vinegar") ||
    lower.includes("cooking") ||
    lower.includes("washing") ||
    lower.includes("soap") ||
    lower.includes("kitchen") ||
    lower.includes("effervescence") ||
    lower.includes("ghee")
  ) {
    return { domain: "Household & Food", iconEmoji: "🍳" };
  }

  if (
    lower.includes("antacid") ||
    lower.includes("medicine") ||
    lower.includes("plaster") ||
    lower.includes("bone") ||
    lower.includes("sanitizer") ||
    lower.includes("antiseptic") ||
    lower.includes("disinfect") ||
    lower.includes("tooth")
  ) {
    return { domain: "Medicine & Health", iconEmoji: "🏥" };
  }

  if (
    lower.includes("railway") ||
    lower.includes("welding") ||
    lower.includes("smelting") ||
    lower.includes("metallurgy") ||
    lower.includes("bleach") ||
    lower.includes("galvanis") ||
    lower.includes("industry") ||
    lower.includes("cement") ||
    lower.includes("photo")
  ) {
    return { domain: "Industry & Engineering", iconEmoji: "🏭" };
  }

  return { domain: "Nature & Environment", iconEmoji: "🌿" };
}

export const RealWorldApplicationsPage: React.FC<RealWorldApplicationsPageProps> = ({
  onSelectReaction,
  onRunExperiment
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<number | "All">("All");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");

  // Flatten all real-life applications from the reaction database
  const applicationList: ApplicationItem[] = useMemo(() => {
    const list: ApplicationItem[] = [];
    REACTIONS.forEach((reaction) => {
      if (reaction.realLifeApplications && reaction.realLifeApplications.length > 0) {
        reaction.realLifeApplications.forEach((app) => {
          const { domain, iconEmoji } = categorizeApplication(app, reaction);
          list.push({
            applicationText: app,
            reaction,
            domain,
            iconEmoji
          });
        });
      }
    });
    return list;
  }, []);

  // Filtered applications
  const filteredList = useMemo(() => {
    return applicationList.filter((item) => {
      if (selectedChapter !== "All" && item.reaction.chapterNumber !== selectedChapter) {
        return false;
      }
      if (selectedDomain !== "All" && item.domain !== selectedDomain) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText = item.applicationText.toLowerCase().includes(q);
        const matchesTitle = item.reaction.title.toLowerCase().includes(q);
        const matchesEquation = item.reaction.equation.toLowerCase().includes(q);
        const matchesChapter = item.reaction.chapter.toLowerCase().includes(q);
        if (!matchesText && !matchesTitle && !matchesEquation && !matchesChapter) {
          return false;
        }
      }
      return true;
    });
  }, [applicationList, selectedChapter, selectedDomain, searchQuery]);

  const domains = ["All", "Household & Food", "Medicine & Health", "Industry & Engineering", "Nature & Environment"];

  return (
    <div id="real-world-applications-page" className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="relative rounded-3xl p-6 sm:p-10 overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-950 border border-emerald-500/30 text-white shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Globe className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold mb-3 border border-emerald-500/30">
            <Globe className="w-3.5 h-3.5" />
            <span>CONNECTING LAB CHEMISTRY TO EVERYDAY LIFE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
            Real-World Practical Applications
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Chemistry isn&apos;t just equations on textbook pages — it powers the food we cook, the medicines that heal us, the metals in our bridges, and the fuels that drive our world. Explore how every NCERT Class 10 chemical reaction shapes real-world engineering and nature.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-5 text-xs font-mono text-emerald-300">
            <span className="flex items-center gap-1 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              ✓ {applicationList.length} Practical Case Connections
            </span>
            <span className="flex items-center gap-1 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-500/30">
              ✓ Cross-Referenced with CBSE 10 NCERT
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by everyday application (e.g., baking cake, railway welding, vinegar, sanitizer, antacid)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Chapter Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap mr-1">Chapter:</span>
            {(["All", 1, 2, 3, 4] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setSelectedChapter(ch)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedChapter === ch
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {ch === "All" ? "All Chapters" : `Ch ${ch}`}
              </button>
            ))}
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-100 dark:border-slate-800/80 pt-3 text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap">Domain:</span>
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all whitespace-nowrap ${
                selectedDomain === dom
                  ? "bg-slate-900 text-white dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-500/40"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {dom === "All" ? "🌐 All Domains" : dom}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredList.map((item, index) => (
          <div
            key={`${item.reaction.id}-${index}`}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Header & Domain */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-2xl p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
                  {item.iconEmoji}
                </span>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    Ch {item.reaction.chapterNumber}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {item.domain}
                  </span>
                </div>
              </div>

              {/* Real World Application Title */}
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {item.applicationText}
              </h3>

              {/* Underlying Reaction Name */}
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                Underlying Reaction: <span className="text-slate-700 dark:text-slate-200">{item.reaction.title}</span>
              </div>

              {/* Chemical Equation Box */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 font-mono text-xs text-blue-600 dark:text-blue-400 mb-3 overflow-x-auto">
                {item.reaction.equation}
              </div>

              {/* Scientific Mechanism Explanation */}
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {item.reaction.description}
              </p>
            </div>

            {/* Bottom Action Buttons */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectReaction(item.reaction)}
                className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Atom className="w-3.5 h-3.5" />
                <span>3D Molecule & Details</span>
              </button>

              <button
                onClick={() => onRunExperiment(item.reaction)}
                className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20 transition-all active:scale-95"
              >
                <FlaskConical className="w-3 h-3" />
                <span>Simulate</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredList.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <Globe className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-40" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            No matching practical applications found
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Try searching for terms like &quot;whitewashing&quot;, &quot;antacid&quot;, &quot;welding&quot;, &quot;baking&quot;, or clearing the filter.
          </p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedChapter("All"); setSelectedDomain("All"); }}
            className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
