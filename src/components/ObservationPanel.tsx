import React from "react";
import { Reaction } from "../types";
import { Eye, Flame, Thermometer, Droplets, Sparkles, Wind, ShieldCheck } from "lucide-react";

interface ObservationPanelProps {
  reaction: Reaction;
  className?: string;
}

export const ObservationPanel: React.FC<ObservationPanelProps> = ({ reaction, className = "" }) => {
  // Infer sensory cues based on text
  const obsText = reaction.observations.join(" ").toLowerCase();

  const tags = [
    {
      active: obsText.includes("colour") || obsText.includes("color") || obsText.includes("blue") || obsText.includes("green") || obsText.includes("white") || obsText.includes("yellow") || obsText.includes("pink"),
      icon: Droplets,
      label: "Colour Change",
      color: "text-sky-500 bg-sky-500/10 border-sky-500/20"
    },
    {
      active: obsText.includes("precipitate") || obsText.includes("solid") || obsText.includes("insoluble"),
      icon: Sparkles,
      label: "Precipitate Formation",
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    },
    {
      active: obsText.includes("gas") || obsText.includes("bubbles") || obsText.includes("effervescence") || obsText.includes("fumes"),
      icon: Wind,
      label: "Gas Evolution",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      active: reaction.energyChange === "Exothermic" || reaction.energyChange === "Endothermic" || obsText.includes("heat") || obsText.includes("hot") || obsText.includes("temperature"),
      icon: Thermometer,
      label: reaction.energyChange === "Endothermic" ? "Endothermic (Cooling/Heat Absorption)" : "Temperature Rise (Exothermic)",
      color: reaction.energyChange === "Endothermic" ? "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" : "text-rose-500 bg-rose-500/10 border-rose-500/20"
    },
    {
      active: obsText.includes("deposit") || obsText.includes("coating") || obsText.includes("nail"),
      icon: ShieldCheck,
      label: "Metal Deposition",
      color: "text-violet-500 bg-violet-500/10 border-violet-500/20"
    },
    {
      active: obsText.includes("smell") || obsText.includes("odour") || obsText.includes("odor") || obsText.includes("scent") || obsText.includes("pungent") || obsText.includes("fruity"),
      icon: Wind,
      label: "Distinct Odour / Smell",
      color: "text-fuchsia-500 bg-fuchsia-500/10 border-fuchsia-500/20"
    },
    {
      active: obsText.includes("flame") || obsText.includes("dazzling") || obsText.includes("fire"),
      icon: Flame,
      label: "Flame / Light Emission",
      color: "text-orange-500 bg-orange-500/10 border-orange-500/20"
    }
  ].filter((t) => t.active);

  return (
    <div
      id={`observation-panel-${reaction.id}`}
      className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              What Do You See? (Laboratory Observations)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Chemically accurate NCERT sensory evidence
            </p>
          </div>
        </div>
      </div>

      {/* Sensory Indicator Badges */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag, i) => {
            const Icon = tag.icon;
            return (
              <span
                key={i}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${tag.color}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tag.label}
              </span>
            );
          })}
        </div>
      )}

      {/* Observation List Items */}
      <ul className="space-y-2.5">
        {reaction.observations.map((obs, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 text-sm leading-relaxed border border-slate-100 dark:border-slate-800"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white font-mono text-xs shrink-0 mt-0.5 font-bold">
              {idx + 1}
            </span>
            <span>{obs}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
