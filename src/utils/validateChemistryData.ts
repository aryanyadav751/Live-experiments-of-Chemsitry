import { REACTIONS, ALL_REACTION_CATEGORIES } from "../data/reactions";
import { EXPERIMENTS_DATABASE } from "../data/experiments";
import { CHAPTERS } from "../data/chapters";
import { Reaction, ExperimentMode } from "../types";

// Unicode subscript and fraction map
const NORMALIZATION_MAP: Record<string, string> = {
  "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
  "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
  "½": ".5", "1½": "1.5", "2½": "2.5"
};

// Normalize formula: convert unicode subscripts and fractions to normal numbers
export function normalizeFormula(str: string): string {
  let res = str;
  for (const [sub, num] of Object.entries(NORMALIZATION_MAP)) {
    res = res.split(sub).join(num);
  }
  return res;
}

// Parse a single molecule or formula unit without outer stoichiometric coefficient
// e.g. "Pb(NO3)2", "CuSO4", "5H2O", "CH3COOH", "CH2=CH2"
export function parseChemicalFormula(rawFormula: string): Record<string, number> {
  const formula = normalizeFormula(rawFormula)
    .replace(/\s+/g, "")
    // Strip ONLY state annotations, NEVER (OH) or (NO3)
    .replace(/\((?:s|l|g|aq|powder|solid|liquid|gas|vapour|dil|conc|dilute|concentrated)\)/gi, "")
    .replace(/[↑↓⁺⁻=–—]/g, "") // strip arrows, charges, and bond dashes
    .replace(/\[O\]/g, "O"); // nascent oxygen [O] -> O

  // Handle hydrates like CuSO4·5H2O or FeSO4·7H2O or CaSO4·0.5H2O / 2CaSO4·H2O
  if (formula.includes("·") || (formula.includes(".") && !formula.match(/^\d+\./))) {
    const parts = formula.split(/[·]/);
    const total: Record<string, number> = {};
    for (const part of parts) {
      if (!part.trim()) continue;
      // Check if part starts with coefficient, like 5H2O or 0.5H2O or 7H2O or 2H2O
      const match = part.match(/^([0-9]*\.?[0-9]+)?([A-Za-z0-9\(\)]+)$/);
      if (match) {
        const factor = match[1] ? parseFloat(match[1]) : 1;
        const subCounts = parseFormulaBody(match[2]);
        for (const [elem, count] of Object.entries(subCounts)) {
          total[elem] = (total[elem] || 0) + count * factor;
        }
      } else {
        const subCounts = parseFormulaBody(part);
        for (const [elem, count] of Object.entries(subCounts)) {
          total[elem] = (total[elem] || 0) + count;
        }
      }
    }
    return total;
  }

  return parseFormulaBody(formula);
}

// Parse formula containing parentheses and element symbols
function parseFormulaBody(formula: string): Record<string, number> {
  const counts: Record<string, number> = {};
  
  // Recursively expand parentheses: e.g. Pb(NO3)2 -> Pb N2 O6
  let current = formula;
  const parenRegex = /\(([^()]+)\)(\d*(?:\.\d+)?)/;
  
  while (parenRegex.test(current)) {
    current = current.replace(parenRegex, (_, group, multStr) => {
      const multiplier = multStr ? parseFloat(multStr) : 1;
      const innerCounts = parseSimpleFormula(group);
      let expanded = "";
      for (const [elem, count] of Object.entries(innerCounts)) {
        expanded += `${elem}${count * multiplier}`;
      }
      return expanded;
    });
  }

  return parseSimpleFormula(current);
}

// Parse flat formula like Fe2O3 or CH3COOH or PbO
function parseSimpleFormula(formula: string): Record<string, number> {
  const counts: Record<string, number> = {};
  const elementRegex = /([A-Z][a-z]?)(\d*(?:\.\d+)?)/g;
  let match: RegExpExecArray | null;

  while ((match = elementRegex.exec(formula)) !== null) {
    if (!match[1]) continue;
    const element = match[1];
    const count = match[2] ? parseFloat(match[2]) : 1;
    counts[element] = (counts[element] || 0) + count;
  }

  return counts;
}

// Parse a side of an equation (e.g. "2Pb(NO₃)₂" or "Fe + CuSO₄")
export function parseEquationSide(sideStr: string): {
  counts: Record<string, number>;
  terms: { raw: string; coefficient: number; formula: string; counts: Record<string, number> }[];
} {
  const clean = normalizeFormula(sideStr)
    .replace(/\b(?:Tremendous\s+)?Heat(?:\s+and\s+Light|\s+Energy)?\b/gi, "")
    .replace(/\bLight(?:\s+Energy)?\b/gi, "")
    .replace(/\bElectricity\b/gi, "")
    .replace(/\bSunlight\b/gi, "")
    .replace(/\bpop\s*sound\b/gi, "")
    .replace(/\bNo\s+Reaction\b/gi, "");

  const rawTerms = clean.split("+").map(t => t.trim()).filter(t => t.length > 0);
  const totalCounts: Record<string, number> = {};
  const terms: { raw: string; coefficient: number; formula: string; counts: Record<string, number> }[] = [];

  for (const raw of rawTerms) {
    // Strip ONLY state designations: (s), (l), (g), (aq), (powder), etc.
    let trimmed = raw
      .replace(/\s*\((?:s|l|g|aq|powder|solid|liquid|gas|vapour|dil|conc|dilute|concentrated)\)\s*/gi, "")
      .replace(/[↑↓]/g, "")
      .trim();

    if (!trimmed) continue;

    // Extract leading coefficient (integer or fraction or decimal)
    let coeff = 1;
    const coeffMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*([A-Za-z\[].*)$/);
    let formulaPart = trimmed;

    if (coeffMatch && coeffMatch[1]) {
      coeff = parseFloat(coeffMatch[1]);
      formulaPart = coeffMatch[2].trim();
    }

    if (!formulaPart) continue;

    const termCounts = parseChemicalFormula(formulaPart);
    terms.push({
      raw,
      coefficient: coeff,
      formula: formulaPart,
      counts: termCounts
    });

    for (const [elem, cnt] of Object.entries(termCounts)) {
      totalCounts[elem] = (totalCounts[elem] || 0) + cnt * coeff;
    }
  }

  return { counts: totalCounts, terms };
}

export interface EquationValidationResult {
  isBalanced: boolean;
  leftCounts: Record<string, number>;
  rightCounts: Record<string, number>;
  mismatches: { element: string; left: number; right: number }[];
  skippedNote?: string;
}

export function validateBalancedEquation(equationStr: string): EquationValidationResult {
  // Split on reaction arrow, including any conditions written above arrow:
  // e.g. —(Heat)→, —(Sunlight)→, ⎯⎯Δ⎯⎯→, →, ⇌
  const arrowRegex = /\s*(?:—|⎯|-)+\s*(?:\(.*?\)|[^\s→]+)?\s*(?:—|⎯|-)*→\s*|\s*→\s*|\s*⇌\s*|\s*==>\s*/;
  if (!arrowRegex.test(equationStr)) {
    return {
      isBalanced: false,
      leftCounts: {},
      rightCounts: {},
      mismatches: [],
      skippedNote: "No arrow found in equation string"
    };
  }

  const parts = equationStr.split(arrowRegex);
  if (parts.length < 2) {
    return {
      isBalanced: false,
      leftCounts: {},
      rightCounts: {},
      mismatches: [],
      skippedNote: "Could not split into reactants and products"
    };
  }

  const leftStr = parts[0];
  const rightStr = parts[parts.length - 1]; // Use last part in case of multiple arrows/steps

  // If equation is "No Reaction", it's conceptually unreactive
  if (rightStr.toLowerCase().includes("no reaction")) {
    return {
      isBalanced: true,
      leftCounts: {},
      rightCounts: {},
      mismatches: []
    };
  }

  const left = parseEquationSide(leftStr);
  const right = parseEquationSide(rightStr);

  const allElements = new Set([...Object.keys(left.counts), ...Object.keys(right.counts)]);
  const mismatches: { element: string; left: number; right: number }[] = [];

  for (const elem of allElements) {
    const lVal = left.counts[elem] || 0;
    const rVal = right.counts[elem] || 0;
    // Allow slight float tolerance for fractions
    if (Math.abs(lVal - rVal) > 0.001) {
      mismatches.push({ element: elem, left: lVal, right: rVal });
    }
  }

  return {
    isBalanced: mismatches.length === 0,
    leftCounts: left.counts,
    rightCounts: right.counts,
    mismatches
  };
}

export interface AuditReport {
  totalReactions: number;
  validReactions: number;
  errors: string[];
  warnings: string[];
  equationChecks: { id: string; equation: string; balanced: boolean; details?: string }[];
}

export function auditChemistryData(): AuditReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const equationChecks: { id: string; equation: string; balanced: boolean; details?: string }[] = [];

  const seenIds = new Set<string>();
  const validChapters = new Set([1, 2, 3, 4]);
  const validModes: ExperimentMode[] = ["safe", "teacher-demo", "simulation-only"];

  // 1. Audit Reactions
  for (const r of REACTIONS) {
    // Unique ID
    if (!r.id || r.id.trim() === "") {
      errors.push(`Reaction missing id: ${r.title}`);
    } else if (seenIds.has(r.id)) {
      errors.push(`Duplicate reaction ID found: "${r.id}"`);
    } else {
      seenIds.add(r.id);
    }

    // Chapter check
    if (!validChapters.has(r.chapterNumber)) {
      errors.push(`Reaction "${r.id}" has invalid chapterNumber: ${r.chapterNumber}`);
    }

    // Safety mode check
    if (!validModes.includes(r.experimentMode)) {
      errors.push(`Reaction "${r.id}" has invalid experimentMode: "${r.experimentMode}"`);
    }

    // Safety audit for dangerous reactions
    const dangerousKeywords = ["toxic", "explosive", "violent", "fumes", "decrepitation", "choking", "2500°c", "molten"];
    const textCorpus = (r.title + " " + r.observations.join(" ") + " " + r.explanation + " " + r.safetyNotes.join(" ")).toLowerCase();
    const isDangerous = dangerousKeywords.some(kw => textCorpus.includes(kw));
    if (isDangerous && r.experimentMode === "safe") {
      warnings.push(`Reaction "${r.id}" (${r.title}) involves hazardous keywords but is marked as "safe". Consider "simulation-only" or "teacher-demo".`);
    }

    // Procedural lab instructions audit (Rule 2)
    const proceduralKeywords = ["take 2 cm", "take 5 g", "pour 50 ml", "rub with sandpaper", "hold with bare", "taste", "smell deeply"];
    for (const step of r.animationSteps || []) {
      const sDesc = step.description.toLowerCase();
      if (proceduralKeywords.some(pk => sDesc.includes(pk))) {
        warnings.push(`Reaction "${r.id}" step ${step.step} contains physical-lab procedural instructions: "${step.description}". Replace with safe conceptual simulation steps.`);
      }
    }

    // Reaction types validation
    if (!r.reactionType || r.reactionType.length === 0) {
      errors.push(`Reaction "${r.id}" must have at least one reactionType.`);
    }

    // Equation balancing check
    const eqToCheck = r.balancedEquation || r.equation;
    const balanceResult = validateBalancedEquation(eqToCheck);
    if (!balanceResult.isBalanced) {
      if (balanceResult.skippedNote) {
        warnings.push(`Reaction "${r.id}" equation could not be automatically parsed: ${balanceResult.skippedNote}`);
      } else {
        const mismatchStr = balanceResult.mismatches
          .map(m => `${m.element} (Reactants: ${m.left}, Products: ${m.right})`)
          .join(", ");
        errors.push(`Reaction "${r.id}" equation is NOT balanced: ${eqToCheck} -> Mismatches: ${mismatchStr}`);
        equationChecks.push({
          id: r.id,
          equation: eqToCheck,
          balanced: false,
          details: mismatchStr
        });
      }
    } else {
      equationChecks.push({
        id: r.id,
        equation: eqToCheck,
        balanced: true
      });
    }

    // Required fields check
    if (!r.reactants || r.reactants.length === 0) errors.push(`Reaction "${r.id}" has empty reactants.`);
    if (!r.products || r.products.length === 0) errors.push(`Reaction "${r.id}" has empty products.`);
    if (!r.observations || r.observations.length === 0) errors.push(`Reaction "${r.id}" has empty observations.`);
    if (!r.explanation || r.explanation.trim() === "") errors.push(`Reaction "${r.id}" has empty explanation.`);
    if (!r.molecularExplanation || r.molecularExplanation.trim() === "") errors.push(`Reaction "${r.id}" has empty molecularExplanation.`);

    // Quiz validation
    if (r.quiz && r.quiz.length > 0) {
      r.quiz.forEach((q, qIdx) => {
        if (!q.question || q.question.trim() === "") {
          errors.push(`Reaction "${r.id}" quiz question #${qIdx + 1} has empty question text.`);
        }
        if (!q.options || q.options.length < 2) {
          errors.push(`Reaction "${r.id}" quiz question #${qIdx + 1} must have at least 2 options.`);
        }
        if (!q.options.includes(q.answer)) {
          errors.push(`Reaction "${r.id}" quiz question #${qIdx + 1} answer "${q.answer}" is NOT among the provided options: [${q.options.join(", ")}].`);
        }
        if (!q.explanation || q.explanation.trim() === "") {
          errors.push(`Reaction "${r.id}" quiz question #${qIdx + 1} has empty explanation.`);
        }
      });
    }
  }

  // 2. Audit Experiments Database
  for (const exp of EXPERIMENTS_DATABASE) {
    if (!seenIds.has(exp.reactionId)) {
      errors.push(`Experiment "${exp.id}" references non-existent reactionId: "${exp.reactionId}"`);
    }
  }

  return {
    totalReactions: REACTIONS.length,
    validReactions: REACTIONS.length - errors.length,
    errors,
    warnings,
    equationChecks
  };
}

// Standalone execution helper
if (typeof process !== "undefined" && process.argv && process.argv[1]?.includes("validateChemistryData")) {
  console.log("=================================================");
  console.log("🧪 CHEMISTRY DATA VALIDATION & BALANCING AUDIT");
  console.log("=================================================\n");

  const report = auditChemistryData();

  console.log(`Total Reactions Audited: ${report.totalReactions}\n`);

  console.log("--- Equation Balancing Results ---");
  for (const chk of report.equationChecks) {
    if (chk.balanced) {
      console.log(`✓ [BALANCED] ${chk.id}: ${chk.equation}`);
    } else {
      console.log(`✗ [MISMATCH] ${chk.id}: ${chk.equation}`);
      if (chk.details) console.log(`    Details: ${chk.details}`);
    }
  }

  if (report.warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${report.warnings.length}):`);
    report.warnings.forEach((w, i) => console.log(`  ${i + 1}. ${w}`));
  }

  if (report.errors.length > 0) {
    console.log(`\n❌ ERRORS (${report.errors.length}):`);
    report.errors.forEach((e, i) => console.log(`  ${i + 1}. ${e}`));
    process.exit(1);
  } else {
    console.log("\n✅ ALL CHEMISTRY DATA & EQUATIONS PASSED VALIDATION!");
    process.exit(0);
  }
}
