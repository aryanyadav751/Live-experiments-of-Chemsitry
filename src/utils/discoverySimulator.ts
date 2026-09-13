import { DiscoveryReactionResult } from "../types";
import {
  DISCOVERY_RULES,
  EMPTY_VESSEL_RESULT,
  DEFAULT_NO_REACTION_RESULT,
  SimulationConditions
} from "../data/discoveryRules";

export type { SimulationConditions };

/**
 * Data-Driven Chemistry Discovery Lab Simulator
 * Iterates through curated NCERT DiscoveryRules rather than hardcoded monolithic logic.
 */
export function simulateSubstanceMixture(
  substanceIds: string[],
  conditions: SimulationConditions
): DiscoveryReactionResult {
  const set = new Set(substanceIds);
  const count = set.size;

  if (count === 0) {
    return EMPTY_VESSEL_RESULT;
  }

  // Evaluate curated rules in declarative order
  for (const rule of DISCOVERY_RULES) {
    if (rule.matches(set, conditions, count)) {
      return rule.getResult(set, conditions);
    }
  }

  return DEFAULT_NO_REACTION_RESULT;
}
