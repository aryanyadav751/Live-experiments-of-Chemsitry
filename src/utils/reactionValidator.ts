/**
 * Reaction Validator for Class 10 NCERT Chemistry
 * Audits every reaction record to ensure full scientific accuracy,
 * completeness, unique IDs, stoichiometric validity, and safety tags.
 */

import { Reaction } from "../types";
import { splitEquation, parseEquationSide, checkEquationBalance } from "./atomBalanceEngine";

export interface ValidationIssue {
  reactionId: string;
  reactionTitle: string;
  field: string;
  severity: "error" | "warning";
  message: string;
}

export interface ValidationSummary {
  totalChecked: number;
  validCount: number;
  issueCount: number;
  issues: ValidationIssue[];
}

const ALLOWED_EXPERIMENT_MODES = ["safe", "teacher-demo", "simulation-only"];

/**
 * Validates a single reaction record.
 */
export function validateReaction(reaction: Reaction, seenIds: Set<string>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const addIssue = (field: string, severity: "error" | "warning", message: string) => {
    issues.push({
      reactionId: reaction.id || "UNKNOWN_ID",
      reactionTitle: reaction.title || "Untitled Reaction",
      field,
      severity,
      message
    });
  };

  // 1. Check ID & Metadata
  if (!reaction.id || typeof reaction.id !== "string" || reaction.id.trim() === "") {
    addIssue("id", "error", "Reaction is missing a valid unique ID string.");
  } else if (seenIds.has(reaction.id)) {
    addIssue("id", "error", `Duplicate reaction ID detected: "${reaction.id}".`);
  } else {
    seenIds.add(reaction.id);
  }

  if (!reaction.title || reaction.title.trim() === "") {
    addIssue("title", "error", "Missing reaction title.");
  }

  if (!reaction.chapter || typeof reaction.chapterNumber !== "number") {
    addIssue("chapter", "error", "Missing or invalid chapter metadata.");
  }

  if (!reaction.topic || reaction.topic.trim() === "") {
    addIssue("topic", "warning", "Missing topic designation.");
  }

  // 2. Reactants and Products
  if (!reaction.reactants || !Array.isArray(reaction.reactants) || reaction.reactants.length === 0) {
    addIssue("reactants", "error", "Missing or empty reactants array.");
  }

  if (!reaction.products || !Array.isArray(reaction.products) || reaction.products.length === 0) {
    addIssue("products", "error", "Missing or empty products array.");
  }

  // 3. Balanced Equation and Equation
  if (!reaction.equation || reaction.equation.trim() === "") {
    addIssue("equation", "error", "Missing standard chemical equation.");
  }

  if (!reaction.balancedEquation || reaction.balancedEquation.trim() === "") {
    addIssue("balancedEquation", "error", "Missing stoichiometric balanced equation.");
  } else {
    // Audit stoichiometric balance using Atom Balance Engine
    const split = splitEquation(reaction.balancedEquation);
    if (split) {
      try {
        const leftTerms = parseEquationSide(split.leftSide);
        const rightTerms = parseEquationSide(split.rightSide);
        const leftCoeffs = leftTerms.map(t => t.defaultCoeff);
        const rightCoeffs = rightTerms.map(t => t.defaultCoeff);
        const balanceResult = checkEquationBalance(leftTerms, rightTerms, leftCoeffs, rightCoeffs);

        if (!balanceResult.isFullyBalanced) {
          const unbalancedElements = balanceResult.elementStatuses
            .filter(s => !s.isBalanced)
            .map(s => `${s.element}: LHS=${s.leftCount} vs RHS=${s.rightCount}`)
            .join(", ");
          addIssue("balancedEquation", "warning", `Atom balance discrepancy in balanced equation: ${unbalancedElements}`);
        }
      } catch (err) {
        addIssue("balancedEquation", "warning", `Could not parse balanced equation stoichiometry: ${String(err)}`);
      }
    }
  }

  // 4. Reaction types
  if (!reaction.reactionType || !Array.isArray(reaction.reactionType) || reaction.reactionType.length === 0) {
    addIssue("reactionType", "error", "Missing reaction category classification.");
  }

  // 5. Safety classification
  if (!reaction.experimentMode || !ALLOWED_EXPERIMENT_MODES.includes(reaction.experimentMode)) {
    addIssue(
      "experimentMode",
      "error",
      `Invalid or missing experimentMode. Must be one of: ${ALLOWED_EXPERIMENT_MODES.join(", ")}.`
    );
  }

  // 6. Observations & Explanations
  if (!reaction.observations || !Array.isArray(reaction.observations) || reaction.observations.length === 0) {
    addIssue("observations", "warning", "Missing observable qualitative changes / laboratory observations.");
  }

  if (!reaction.explanation || reaction.explanation.trim().length < 15) {
    addIssue("explanation", "warning", "Explanation is missing or too brief for Class 10 NCERT standards.");
  }

  // 7. Animation / Experiment Simulator information
  if (!reaction.animationSteps || !Array.isArray(reaction.animationSteps) || reaction.animationSteps.length === 0) {
    addIssue("animationSteps", "warning", "Missing step-by-step animation steps for molecular/virtual simulation.");
  }

  return issues;
}

/**
 * Runs a complete audit across all reactions and outputs development warnings.
 */
export function validateAllReactions(reactions: Reaction[], logWarnings: boolean = true): ValidationSummary {
  const seenIds = new Set<string>();
  const allIssues: ValidationIssue[] = [];

  for (const rx of reactions) {
    const issues = validateReaction(rx, seenIds);
    allIssues.push(...issues);
  }

  const errors = allIssues.filter(i => i.severity === "error");
  const warnings = allIssues.filter(i => i.severity === "warning");

  if (logWarnings && typeof console !== "undefined") {
    if (errors.length > 0) {
      console.error(`[ReactionValidator] 🚨 Found ${errors.length} fatal errors in reaction dataset:`, errors);
    }
    if (warnings.length > 0) {
      console.warn(`[ReactionValidator] ⚠️ Found ${warnings.length} warnings in reaction dataset:`, warnings);
    }
    if (allIssues.length === 0) {
      console.log(`[ReactionValidator] ✅ All ${reactions.length} chemical reactions passed rigorous chemistry audit!`);
    }
  }

  return {
    totalChecked: reactions.length,
    validCount: reactions.length - new Set(errors.map(e => e.reactionId)).size,
    issueCount: allIssues.length,
    issues: allIssues
  };
}
