import { LabContext, Reaction, DiscoveryReactionResult } from "../types";
import { getReactionById, REACTIONS } from "../data/reactions";
import { getSubstanceById } from "../data/substances";
import { splitEquation, parseEquationSide, checkEquationBalance } from "./atomBalanceEngine";

/**
 * Builds structured LabContext for Gemini Lab Assistant
 */
export function buildLabContext(params: {
  selectedSubstances: string[];
  reaction: Reaction | null;
  discoveryResult: DiscoveryReactionResult | null;
  conditions: {
    heat: boolean;
    light: boolean;
    electricity: boolean;
    water: boolean;
  };
}): LabContext {
  const { selectedSubstances, reaction, discoveryResult, conditions } = params;

  const substanceNames = selectedSubstances
    .map((id) => {
      const s = getSubstanceById(id);
      return s ? `${s.name} (${s.formula})` : id;
    });

  if (reaction) {
    return {
      chapter: `Chapter ${reaction.chapterNumber}: ${reaction.chapter}`,
      selectedSubstances: substanceNames,
      reactionId: reaction.id,
      title: reaction.title,
      equation: reaction.equation,
      balancedEquation: reaction.balancedEquation,
      reactionType: reaction.reactionType,
      observations: reaction.observations,
      products: reaction.products,
      experimentMode: reaction.experimentMode,
      conditions
    };
  }

  if (discoveryResult && discoveryResult.occurred) {
    return {
      chapter: "NCERT Class 10 Chemistry Discovery",
      selectedSubstances: substanceNames,
      title: discoveryResult.title,
      equation: discoveryResult.equation,
      balancedEquation: discoveryResult.balancedEquation,
      reactionType: [discoveryResult.reactionType],
      observations: discoveryResult.observations,
      conditions
    };
  }

  return {
    chapter: "NCERT Class 10 Chemistry Discovery",
    selectedSubstances: substanceNames,
    title: "Empty or Unreactive Mixture",
    equation: "No reaction occurred",
    balancedEquation: "—",
    reactionType: ["None / Unreactive"],
    observations: ["No visible chemical reaction detected."],
    conditions
  };
}

/**
 * Safe Internal Tools for Gemini / Lab Assistant
 */
export const labTools = {
  getReactionById(id: string): Reaction | null {
    return getReactionById(id) || null;
  },

  getSubstanceInfo(id: string) {
    return getSubstanceById(id) || null;
  },

  getCurrentLabState(context: LabContext) {
    return {
      chapter: context.chapter,
      selectedSubstances: context.selectedSubstances,
      reactionTitle: context.title,
      balancedEquation: context.balancedEquation,
      reactionType: context.reactionType,
      observations: context.observations,
      conditions: context.conditions
    };
  },

  getReactionExplanation(reactionId: string): string | null {
    const rx = getReactionById(reactionId);
    if (!rx) return null;
    return `${rx.explanation}\n\nNCERT Concept: ${rx.ncertConcept}\n\nMolecular Mechanism: ${rx.molecularExplanation}`;
  },

  getNCERTConcept(reactionId: string): string | null {
    const rx = getReactionById(reactionId);
    return rx ? rx.ncertConcept : null;
  },

  getRealWorldApplication(reactionId: string): string[] {
    const rx = getReactionById(reactionId);
    return rx?.realLifeApplications || [];
  },

  getBalanceStatus(equation: string) {
    if (!equation || equation === "—") {
      return { isBalanced: false, feedback: "No valid equation provided." };
    }
    const sides = splitEquation(equation);
    if (!sides) {
      return { isBalanced: false, feedback: "Could not parse reaction arrow." };
    }
    const leftTerms = parseEquationSide(sides.leftSide);
    const rightTerms = parseEquationSide(sides.rightSide);
    const leftCoeffs = leftTerms.map((t) => t.defaultCoeff);
    const rightCoeffs = rightTerms.map((t) => t.defaultCoeff);
    const check = checkEquationBalance(leftTerms, rightTerms, leftCoeffs, rightCoeffs);
    return {
      isBalanced: check.isFullyBalanced,
      elementStatuses: check.elementStatuses,
      reactants: sides.leftSide,
      products: sides.rightSide
    };
  }
};

/**
 * Generates pedagogical progressive hints for Discovery Lab
 */
export function getProgressiveHint(
  reaction: Reaction | null,
  level: 1 | 2 | 3
): string {
  if (!reaction) {
    if (level === 1) return "💡 Hint 1: Check the Chemical Shelf tabs (Metals, Acids, Salts) for two substances that commonly react in NCERT experiments.";
    if (level === 2) return "💡 Hint 2: Think about single displacement: try placing a reactive metal like Iron (Fe) or Zinc (Zn) into an acid or salt solution.";
    return "💡 Final Hint: Try selecting Iron (Fe) and Copper Sulphate (CuSO₄), or Zinc (Zn) and Hydrochloric Acid (HCl).";
  }

  const rType = reaction.reactionType[0] || "Reaction";

  if (rType.toLowerCase().includes("displacement") && !rType.toLowerCase().includes("double")) {
    if (level === 1) return "💡 Hint 1: Notice how one metal changes places with another in the solution.";
    if (level === 2) return "💡 Hint 2: Compare the positions of both metals in the CBSE Reactivity Series (K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Ag > Au).";
    return `💡 Final Hint: Since the more reactive metal displaces the less reactive one, this is a ${reaction.reactionType.join(" / ")}.`;
  }

  if (rType.toLowerCase().includes("decomposition")) {
    if (level === 1) return "💡 Hint 1: Count how many reactants you started with compared to the number of products formed.";
    if (level === 2) return "💡 Hint 2: Did the reaction require energy (Heat, Light, or Electricity) to break down bonds?";
    return `💡 Final Hint: A single compound breaking down into multiple simpler substances upon heating/light is a Decomposition Reaction.`;
  }

  if (rType.toLowerCase().includes("double")) {
    if (level === 1) return "💡 Hint 1: Look closely at the positive and negative ions of both aqueous compounds.";
    if (level === 2) return "💡 Hint 2: Did the ions mutual exchange partners to form an insoluble precipitate?";
    return `💡 Final Hint: Two compounds exchanging ions to form an insoluble solid is a Double Displacement Precipitation Reaction.`;
  }

  if (level === 1) return `💡 Hint 1: Observe the physical changes: look at color transitions, gas bubbles, and temperature indicators.`;
  if (level === 2) return `💡 Hint 2: Think about the NCERT concept for Chapter ${reaction.chapterNumber}: ${reaction.ncertConcept.slice(0, 80)}...`;
  return `💡 Final Hint: This reaction represents: ${reaction.balancedEquation}.`;
}
