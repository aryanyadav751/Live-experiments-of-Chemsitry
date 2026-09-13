import { Reaction, DiscoveryReactionResult, DiscoveryRule } from "../types";
import { DISCOVERY_RULES, SimulationConditions, EMPTY_VESSEL_RESULT } from "../data/discoveryRules";
import { getReactionById, REACTIONS } from "../data/reactions";
import { getSubstanceById } from "../data/substances";

export interface DiscoveryEvaluationResult {
  matched: boolean;
  empty: boolean;
  reaction: Reaction | null;
  result: DiscoveryReactionResult;
  rule: DiscoveryRule | null;
  suggestedCombinations: {
    label: string;
    substanceNames: string[];
    ids: string[];
    conditionTip?: string;
  }[];
}

// Common verified Class 10 combinations for helpful suggestions when a student tries an unknown mixture
export const SUGGESTED_COMBINATIONS = [
  {
    label: "Iron & Copper Sulphate (Displacement)",
    substanceNames: ["Iron Filings (Fe)", "Copper Sulphate (CuSO₄)"],
    ids: ["fe", "cuso4"]
  },
  {
    label: "Zinc & Hydrochloric Acid (Gas Evolution)",
    substanceNames: ["Zinc Granules (Zn)", "Dilute HCl"],
    ids: ["zn", "hcl"],
    conditionTip: "Test evolved H₂ with a glowing wood splinter!"
  },
  {
    label: "Quicklime & Water (Slaking)",
    substanceNames: ["Quicklime (CaO)", "Distilled Water (H₂O)"],
    ids: ["cao", "h2o"],
    conditionTip: "Watch for steam and vigorous exothermic heat release!"
  },
  {
    label: "Thermal Decomposition of Ferrous Sulphate",
    substanceNames: ["Ferrous Sulphate (FeSO₄)"],
    ids: ["feso4"],
    conditionTip: "Turn on [🔥 Virtual Heat] to decompose pale green crystals."
  },
  {
    label: "Lead Nitrate & Potassium Iodide (Precipitation)",
    substanceNames: ["Lead Nitrate (Pb(NO₃)₂)", "Potassium Iodide (KI)"],
    ids: ["pb_no3_2", "ki"],
    conditionTip: "Observe brilliant canary-yellow PbI₂ precipitate formation."
  },
  {
    label: "Photolytic Decomposition of Silver Chloride",
    substanceNames: ["Silver Chloride (AgCl)"],
    ids: ["agcl"],
    conditionTip: "Activate [☀️ Virtual Light] to observe photolysis into grey silver."
  },
  {
    label: "Electrolysis of Water",
    substanceNames: ["Distilled Water (H₂O)"],
    ids: ["h2o"],
    conditionTip: "Activate [⚡ Virtual Electricity] to split water into 2:1 H₂ and O₂."
  },
  {
    label: "Ethanoic Acid & Baking Soda (Brisk Effervescence)",
    substanceNames: ["Ethanoic Acid (CH₃COOH)", "Baking Soda (NaHCO₃)"],
    ids: ["ch3cooh", "nahco3"],
    conditionTip: "Observe brisk effervescence of CO₂ gas turning lime water milky!"
  },
  {
    label: "Esterification (Fruity Aroma)",
    substanceNames: ["Ethanoic Acid (CH₃COOH)", "Ethanol (C₂H₅OH)"],
    ids: ["ch3cooh", "c2h5oh"],
    conditionTip: "Requires [🔥 Virtual Heat] and acid catalyst to form sweet ester."
  }
];

/**
 * Normalizes user-selected IDs, eliminating duplicates and mapping aliases
 */
export function normalizeSubstanceIds(ids: string[]): string[] {
  const map: Record<string, string> = {
    ch3cooh_organic: "ch3cooh",
    iron: "fe",
    zinc: "zn",
    copper: "cu",
    water: "h2o"
  };

  const normalized = ids.map((id) => {
    const clean = id.trim().toLowerCase();
    return map[clean] || clean;
  });

  return Array.from(new Set(normalized)).sort();
}

/**
 * Evaluates the substances and conditions against curated NCERT Discovery Rules and Reactions
 */
export function evaluateDiscovery(
  rawSubstanceIds: string[],
  conditions: SimulationConditions
): DiscoveryEvaluationResult {
  const normalized = normalizeSubstanceIds(rawSubstanceIds);
  const count = normalized.length;

  if (count === 0) {
    return {
      matched: false,
      empty: true,
      reaction: null,
      result: EMPTY_VESSEL_RESULT,
      rule: null,
      suggestedCombinations: SUGGESTED_COMBINATIONS.slice(0, 4)
    };
  }

  const set = new Set(normalized);

  // Search for matching rule in curated Class 10 rules
  for (const rule of DISCOVERY_RULES) {
    if (rule.matches(set, conditions, count)) {
      const result = rule.getResult(set, conditions);

      let reaction: Reaction | null = null;
      if (rule.reactionId) {
        reaction = getReactionById(rule.reactionId) || null;
      }

      // Secondary fallback: match directly against REACTIONS equation or title if not explicitly bound
      if (!reaction) {
        reaction =
          REACTIONS.find(
            (r) =>
              r.title.toLowerCase() === rule.title.toLowerCase() ||
              r.balancedEquation.toLowerCase() === result.balancedEquation.toLowerCase()
          ) || null;
      }

      return {
        matched: true,
        empty: false,
        reaction,
        result,
        rule,
        suggestedCombinations: SUGGESTED_COMBINATIONS.filter((s) => s.ids.join(",") !== normalized.join(","))
      };
    }
  }

  // Exact unrepresented combination response according to requirement 4
  const noReactionResult: DiscoveryReactionResult = {
    occurred: false,
    title: "🔎 No verified reaction found",
    equation: "This combination is not currently represented in the Class 10 Discovery Lab database.",
    balancedEquation: "—",
    reactionType: "Unverified / No Reaction",
    observations: [
      "No observable chemical reaction detected for this mixture under the current virtual conditions.",
      "In CBSE Class 10 Chemistry, reactions require a clear thermodynamic driving force (such as precipitate formation, gas release, acid-base neutralisation, or redox displacement based on the reactivity series)."
    ],
    explanation:
      "This combination is not currently represented in the Class 10 Discovery Lab database. Try another combination from the verified NCERT chemical shelf.",
    energyChange: "Neutral",
    isHazardous: false,
    visualEffect: {
      color: "#f1f5f9"
    }
  };

  return {
    matched: false,
    empty: false,
    reaction: null,
    result: noReactionResult,
    rule: null,
    suggestedCombinations: SUGGESTED_COMBINATIONS.slice(0, 4)
  };
}
