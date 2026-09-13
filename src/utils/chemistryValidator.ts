import { ALL_REACTIONS } from "../data/reactions";
import { Reaction } from "../types";
import {
  parseEquationSide,
  checkEquationBalance,
  splitEquation,
  cleanFormulaString,
  FormulaTerm,
  BalanceCheckResult,
  ElementBalanceStatus
} from "./atomBalanceEngine";

export interface EquationValidationSummary {
  reactionId: string;
  title: string;
  equation: string;
  isBalanced: boolean;
  elementDetails: string[];
  errors: string[];
}

export interface FullAuditReport {
  totalReactions: number;
  balancedCount: number;
  failedCount: number;
  results: EquationValidationSummary[];
  isValid: boolean;
}

/**
 * Validates conservation of atoms for a single chemical equation string.
 */
export function validateEquationString(equationStr: string, reactionId = "custom"): EquationValidationSummary {
  const sides = splitEquation(equationStr);
  if (!sides) {
    return {
      reactionId,
      title: "Unknown Equation",
      equation: equationStr,
      isBalanced: false,
      elementDetails: [],
      errors: ["Failed to split equation into reactants and products by arrow."]
    };
  }

  // Handle No Reaction cases
  if (sides.rightSide.toLowerCase().includes("no reaction")) {
    return {
      reactionId,
      title: "Unreactive Equation",
      equation: equationStr,
      isBalanced: true,
      elementDetails: ["No Reaction: Conserved (unreactive)"],
      errors: []
    };
  }

  const leftTerms = parseEquationSide(sides.leftSide);
  const rightTerms = parseEquationSide(sides.rightSide);

  const leftCoeffs = leftTerms.map(t => t.defaultCoeff);
  const rightCoeffs = rightTerms.map(t => t.defaultCoeff);

  const balanceResult: BalanceCheckResult = checkEquationBalance(
    leftTerms,
    rightTerms,
    leftCoeffs,
    rightCoeffs
  );

  const elementDetails: string[] = [];
  const errors: string[] = [];

  for (const status of balanceResult.elementStatuses) {
    if (status.isBalanced) {
      elementDetails.push(`${status.element}: ${status.leftCount} = ${status.rightCount} ✓`);
    } else {
      elementDetails.push(`${status.element}: ${status.leftCount} ≠ ${status.rightCount} ✗`);
      errors.push(`ERROR: ${status.elementName} (${status.element})\nLeft: ${status.leftCount}\nRight: ${status.rightCount}`);
    }
  }

  return {
    reactionId,
    title: reactionId,
    equation: equationStr,
    isBalanced: balanceResult.isFullyBalanced,
    elementDetails,
    errors
  };
}

/**
 * Validates a single Reaction object from the database.
 */
export function validateReaction(reaction: Reaction): EquationValidationSummary {
  const res = validateEquationString(reaction.balancedEquation || reaction.equation, reaction.id);
  res.title = reaction.title;
  return res;
}

/**
 * Validates all reactions currently defined in ALL_REACTIONS.
 * Prints detailed terminal output and returns a structured audit report.
 */
export function validateAllReactions(): FullAuditReport {
  const results: EquationValidationSummary[] = [];
  let balancedCount = 0;
  let failedCount = 0;

  for (const rxn of ALL_REACTIONS) {
    const summary = validateReaction(rxn);
    results.push(summary);
    if (summary.isBalanced) {
      balancedCount++;
    } else {
      failedCount++;
    }
  }

  return {
    totalReactions: ALL_REACTIONS.length,
    balancedCount,
    failedCount,
    results,
    isValid: failedCount === 0
  };
}

/**
 * CLI runner for development validation
 */
if (typeof process !== "undefined" && process.argv && process.argv[1]?.includes("chemistryValidator")) {
  console.log("=================================================");
  console.log("🧪 CHEMISTRY ATOM CONSERVATION VALIDATION");
  console.log("=================================================");
  const report = validateAllReactions();

  for (const res of report.results) {
    console.log(`\nReaction: ${res.equation} (${res.reactionId})`);
    for (const detail of res.elementDetails) {
      console.log(`  ${detail}`);
    }
    if (res.isBalanced) {
      console.log("  BALANCED ✓");
    } else {
      console.log("  FAILED ✗");
      for (const err of res.errors) {
        console.log(`  ${err}`);
      }
    }
  }

  console.log("\n-------------------------------------------------");
  console.log(`Total: ${report.totalReactions} | Balanced: ${report.balancedCount} | Failed: ${report.failedCount}`);
  if (report.isValid) {
    console.log("✅ ALL REACTIONS BALANCED & CONSERVE ATOMS!");
  } else {
    console.error("❌ ERRORS FOUND IN CHEMICAL EQUATIONS!");
    process.exit(1);
  }
}
