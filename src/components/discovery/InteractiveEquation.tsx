import React, { useState } from "react";
import { getSubstanceById } from "../../data/substances";
import { splitEquation } from "../../utils/atomBalanceEngine";
import { Info, X, Atom } from "lucide-react";

interface InteractiveEquationProps {
  equation: string;
  reactionConcept?: string;
}

interface SubstanceDetail {
  token: string;
  cleanFormula: string;
  name: string;
  role: "Reactant" | "Product";
  state: string;
  composition: Record<string, number>;
  concept: string;
}

export const InteractiveEquation: React.FC<InteractiveEquationProps> = ({
  equation,
  reactionConcept
}) => {
  const [activeSubstance, setActiveSubstance] = useState<SubstanceDetail | null>(null);

  if (!equation || equation === "—") {
    return null;
  }

  // Parse equation tokens
  const sides = splitEquation(equation);
  if (!sides) {
    return (
      <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
        {equation}
      </div>
    );
  }

  const parseTokens = (sideStr: string, role: "Reactant" | "Product") => {
    // Split by "+"
    const parts = sideStr.split("+").map((p) => p.trim());
    return parts.map((part) => {
      // Extract formula and state like "Fe(s)" or "2FeSO₄(s)"
      const stateMatch = part.match(/\((s|l|g|aq)\)/i);
      const state = stateMatch ? stateMatch[1].toLowerCase() : "solid";
      const cleanFormula = part.replace(/\((s|l|g|aq)\)/i, "").trim().replace(/^[0-9]+/, "");

      // Try looking up in verified substances
      const matched = getSubstanceById(cleanFormula.toLowerCase()) ||
        getSubstanceById(cleanFormula.replace(/[^a-zA-Z0-9]/g, "").toLowerCase());

      // Element breakdown heuristic
      const composition: Record<string, number> = {};
      const elemRegex = /([A-Z][a-z]*)(\d*)/g;
      let m;
      while ((m = elemRegex.exec(cleanFormula)) !== null) {
        if (m[1]) {
          const el = m[1];
          const count = m[2] ? parseInt(m[2], 10) : 1;
          composition[el] = (composition[el] || 0) + count;
        }
      }

      return {
        token: part,
        cleanFormula,
        name: matched?.name || cleanFormula,
        role,
        state: state === "s" ? "Solid (s)" : state === "l" ? "Liquid (l)" : state === "g" ? "Gas (g)" : "Aqueous Solution (aq)",
        composition,
        concept: matched?.description || reactionConcept || "Verified Class 10 NCERT Reagent / Compound."
      };
    });
  };

  const reactantTokens = parseTokens(sides.leftSide, "Reactant");
  const productTokens = parseTokens(sides.rightSide, "Product");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs sm:text-sm">
        {/* Reactants */}
        {reactantTokens.map((item, idx) => (
          <React.Fragment key={`react-${idx}`}>
            <button
              type="button"
              onClick={() => setActiveSubstance(item)}
              className="px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 font-bold transition-all transform active:scale-95 shadow-2xs hover:border-blue-400"
              title="Click to inspect substance properties"
            >
              {item.token}
            </button>
            {idx < reactantTokens.length - 1 && (
              <span className="text-slate-400 font-extrabold px-0.5">+</span>
            )}
          </React.Fragment>
        ))}

        {/* Reaction Arrow */}
        <span className="text-amber-500 font-extrabold px-1.5 text-base">→</span>

        {/* Products */}
        {productTokens.map((item, idx) => (
          <React.Fragment key={`prod-${idx}`}>
            <button
              type="button"
              onClick={() => setActiveSubstance(item)}
              className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 font-bold transition-all transform active:scale-95 shadow-2xs hover:border-emerald-400"
              title="Click to inspect substance properties"
            >
              {item.token}
            </button>
            {idx < productTokens.length - 1 && (
              <span className="text-slate-400 font-extrabold px-0.5">+</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="text-[10px] text-slate-400 flex items-center gap-1">
        <Info className="w-3 h-3 text-blue-500" />
        <span>Click any chemical formula in the equation above to view role, state, and composition</span>
      </div>

      {/* Popover / Detail modal */}
      {activeSubstance && (
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm relative animate-fadeIn">
          <button
            onClick={() => setActiveSubstance(null)}
            className="absolute top-2.5 right-2.5 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Close details"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <Atom className="w-4 h-4 text-blue-500" />
            <span className="font-extrabold text-xs text-slate-900 dark:text-white">
              {activeSubstance.name}
            </span>
            <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              {activeSubstance.cleanFormula}
            </span>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeSubstance.role === "Reactant"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
              }`}
            >
              {activeSubstance.role}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400 mb-2">
            <div>
              <span className="text-slate-400 font-medium">Physical State:</span>{" "}
              <span className="font-bold text-slate-700 dark:text-slate-300">{activeSubstance.state}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Elements:</span>{" "}
              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                {Object.entries(activeSubstance.composition)
                  .map(([elem, count]) => `${elem}: ${count}`)
                  .join(", ") || "Pure element"}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900/60 p-2 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <span className="font-bold text-slate-800 dark:text-slate-200">NCERT Insight:</span>{" "}
            {activeSubstance.concept}
          </p>
        </div>
      )}
    </div>
  );
};
