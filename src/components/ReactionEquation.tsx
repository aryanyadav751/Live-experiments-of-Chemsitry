import React, { useState } from "react";
import { Reaction, ChemicalEntity } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Info, X, Sparkles, CheckCircle2 } from "lucide-react";

interface ReactionEquationProps {
  reaction: Reaction;
  interactive?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const ReactionEquation: React.FC<ReactionEquationProps> = ({
  reaction,
  interactive = true,
  className = "",
  size = "md"
}) => {
  const [selectedEntity, setSelectedEntity] = useState<ChemicalEntity | null>(null);

  // Fallback entity builder if not explicitly given
  const entities: ChemicalEntity[] = reaction.interactiveEntities && reaction.interactiveEntities.length > 0
    ? reaction.interactiveEntities
    : [
        ...reaction.reactants.map((r) => ({
          formula: r,
          name: r.replace(/\(.*\)/, "").trim(),
          role: "reactant" as const,
          state: (r.includes("(s)") ? "s" : r.includes("(aq)") ? "aq" : r.includes("(g)") ? "g" : "l") as any,
          ncertNote: "Starting reactant in the chemical transformation."
        })),
        ...reaction.products.map((p) => ({
          formula: p,
          name: p.replace(/\(.*\)/, "").trim(),
          role: "product" as const,
          state: (p.includes("(s)") ? "s" : p.includes("(aq)") ? "aq" : p.includes("(g)") ? "g" : "l") as any,
          ncertNote: "Final product formed according to conservation of mass."
        }))
      ];

  const reactants = entities.filter((e) => e.role === "reactant");
  const products = entities.filter((e) => e.role === "product");
  const catalysts = entities.filter((e) => e.role === "catalyst" || e.role === "medium");

  const sizeClasses = {
    sm: "text-sm gap-1.5 py-1.5 px-2.5",
    md: "text-base sm:text-lg gap-2 py-3 px-4",
    lg: "text-lg sm:text-xl md:text-2xl gap-3 py-4 px-6"
  };

  const tokenSize = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1.5 text-sm sm:text-base",
    lg: "px-4 py-2 text-base sm:text-lg"
  };

  const handleEntityClick = (entity: ChemicalEntity) => {
    if (!interactive) return;
    setSelectedEntity(entity);
  };

  return (
    <div className={`relative ${className}`} id={`reaction-equation-${reaction.id}`}>
      {/* Interactive instruction cue */}
      {interactive && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-slate-400 mb-2.5 px-1">
          <span className="flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Click any chemical formula to inspect molecular role & NCERT concept</span>
          </span>
          <span className="self-start sm:self-auto font-mono text-[10px] sm:text-[11px] bg-slate-800 border border-slate-700/60 px-2 py-0.5 rounded text-slate-300 font-semibold shrink-0">
            Balanced Equation
          </span>
        </div>
      )}

      {/* Main Equation Container */}
      <div
        className={`flex flex-wrap items-center justify-center font-mono rounded-xl bg-slate-900 text-slate-100 shadow-md border border-slate-800 ${sizeClasses[size]}`}
      >
        {/* Reactants */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {reactants.map((entity, idx) => (
            <React.Fragment key={`r-${idx}`}>
              <motion.button
                whileHover={interactive ? { scale: 1.05, y: -2 } : {}}
                whileTap={interactive ? { scale: 0.95 } : {}}
                onClick={() => handleEntityClick(entity)}
                className={`relative group rounded-lg font-bold transition-all border shadow-sm ${tokenSize[size]} ${
                  selectedEntity?.formula === entity.formula
                    ? "bg-blue-600 text-white border-blue-400 ring-2 ring-blue-400/50"
                    : "bg-slate-800/90 text-blue-300 border-slate-700 hover:border-blue-500 hover:bg-slate-800"
                }`}
              >
                <span>{entity.formula}</span>
                {entity.state && (
                  <span className="text-[10px] text-slate-400 font-normal ml-0.5">
                    ({entity.state})
                  </span>
                )}
                {interactive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-400 group-hover:animate-ping opacity-75" />
                )}
              </motion.button>
              {idx < reactants.length - 1 && (
                <span className="text-slate-500 font-bold px-0.5 sm:px-1 text-lg">+</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Reaction Arrow with Conditions/Catalyst */}
        <div className="flex flex-col items-center justify-center px-2 sm:px-3 my-1">
          {/* Reaction condition annotation above arrow */}
          {(catalysts.length > 0 || (reaction.conditions && reaction.conditions.length > 0)) && (
            <span className="text-[10px] sm:text-xs text-amber-400 font-sans font-medium text-center leading-tight mb-0.5 max-w-[120px] truncate">
              {catalysts.map((c) => c.formula).join(", ") || reaction.conditions?.[0]}
            </span>
          )}
          <div className="flex items-center text-emerald-400">
            <span className="h-[2px] w-4 sm:w-8 bg-emerald-400" />
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 -ml-1 shrink-0" />
          </div>
          {/* Subtext below arrow e.g. Heat */}
          {reaction.conditions && reaction.conditions.length > 1 && (
            <span className="text-[9px] text-slate-400 font-sans leading-tight mt-0.5">
              {reaction.conditions[1]}
            </span>
          )}
        </div>

        {/* Products */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {products.map((entity, idx) => (
            <React.Fragment key={`p-${idx}`}>
              <motion.button
                whileHover={interactive ? { scale: 1.05, y: -2 } : {}}
                whileTap={interactive ? { scale: 0.95 } : {}}
                onClick={() => handleEntityClick(entity)}
                className={`relative group rounded-lg font-bold transition-all border shadow-sm ${tokenSize[size]} ${
                  selectedEntity?.formula === entity.formula
                    ? "bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-400/50"
                    : "bg-slate-800/90 text-emerald-300 border-slate-700 hover:border-emerald-500 hover:bg-slate-800"
                }`}
              >
                <span>{entity.formula}</span>
                {entity.state && (
                  <span className="text-[10px] text-slate-400 font-normal ml-0.5">
                    ({entity.state})
                  </span>
                )}
                {interactive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping opacity-75" />
                )}
              </motion.button>
              {idx < products.length - 1 && (
                <span className="text-slate-500 font-bold px-0.5 sm:px-1 text-lg">+</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Selected Entity Inspector Modal / Card */}
      <AnimatePresence>
        {selectedEntity && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mt-3 p-4 rounded-xl border border-blue-500/30 bg-slate-900/95 backdrop-blur-md text-slate-100 shadow-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center font-mono font-bold text-blue-400 text-base">
                  {selectedEntity.formula.split("(")[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white text-base leading-tight">
                      {selectedEntity.name}
                    </h4>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      selectedEntity.role === "reactant"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}>
                      {selectedEntity.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Formula: {selectedEntity.formula} • State:{" "}
                    <span className="text-slate-200">
                      {selectedEntity.state === "s" ? "Solid (s)" : selectedEntity.state === "l" ? "Liquid (l)" : selectedEntity.state === "g" ? "Gas (g)" : "Aqueous Solution (aq)"}
                    </span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEntity(null)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* NCERT Concept Note */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-blue-300">NCERT Concept: </span>
                {selectedEntity.ncertNote || reaction.ncertConcept}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
