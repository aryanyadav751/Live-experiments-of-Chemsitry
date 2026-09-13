import { Reaction, ReactionCategory, ExperimentMode } from "../types";
import { CHAPTER_1_REACTIONS } from "./reactionsCh1";
import { CHAPTER_2_REACTIONS } from "./reactionsCh2";
import { CHAPTER_3_REACTIONS } from "./reactionsCh3";
import { CHAPTER_4_REACTIONS } from "./reactionsCh4";

export const REACTIONS: Reaction[] = [
  ...CHAPTER_1_REACTIONS,
  ...CHAPTER_2_REACTIONS,
  ...CHAPTER_3_REACTIONS,
  ...CHAPTER_4_REACTIONS
];

export const ALL_REACTION_CATEGORIES: ReactionCategory[] = [
  "Combination",
  "Decomposition",
  "Displacement",
  "Double Displacement",
  "Precipitation",
  "Oxidation",
  "Reduction",
  "Redox",
  "Neutralisation",
  "Combustion",
  "Addition",
  "Substitution",
  "Esterification",
  "Saponification",
  "Electrolysis"
];

export const ALL_SAFETY_MODES: { value: ExperimentMode; label: string; icon: string; badgeClass: string }[] = [
  { value: "safe", label: "SAFE SIMULATION", icon: "🟢", badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  { value: "teacher-demo", label: "TEACHER DEMONSTRATION", icon: "🟡", badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  { value: "simulation-only", label: "SIMULATION ONLY", icon: "🔴", badgeClass: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" }
];

export function getReactionById(id: string): Reaction | undefined {
  return REACTIONS.find((r) => r.id === id);
}

export function getReactionsByChapter(chapterNumber: number): Reaction[] {
  return REACTIONS.filter((r) => r.chapterNumber === chapterNumber);
}

export function searchReactions(query: string, filters?: {
  chapter?: number | "all";
  category?: string | "all";
  mode?: ExperimentMode | "all";
}): Reaction[] {
  const q = query.trim().toLowerCase();

  return REACTIONS.filter((r) => {
    if (filters?.chapter && filters.chapter !== "all" && r.chapterNumber !== filters.chapter) {
      return false;
    }
    if (filters?.category && filters.category !== "all" && !r.reactionType.includes(filters.category)) {
      return false;
    }
    if (filters?.mode && filters.mode !== "all" && r.experimentMode !== filters.mode) {
      return false;
    }

    if (!q) return true;

    // Search matches: reaction name, chemical formula, reactant, product, topic, tags
    const inTitle = r.title.toLowerCase().includes(q);
    const inEquation = r.equation.toLowerCase().includes(q) || r.balancedEquation.toLowerCase().includes(q);
    const inReactants = r.reactants.some((chem) => chem.toLowerCase().includes(q));
    const inProducts = r.products.some((chem) => chem.toLowerCase().includes(q));
    const inTopic = r.topic.toLowerCase().includes(q);
    const inTags = r.tags.some((t) => t.toLowerCase().includes(q));
    const inObservations = r.observations.some((obs) => obs.toLowerCase().includes(q));

    return inTitle || inEquation || inReactants || inProducts || inTopic || inTags || inObservations;
  });
}
