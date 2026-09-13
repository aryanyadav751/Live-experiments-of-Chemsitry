export type ExperimentMode = "safe" | "teacher-demo" | "simulation-only";

export type ReactionCategory =
  | "Combination"
  | "Decomposition"
  | "Displacement"
  | "Double Displacement"
  | "Precipitation"
  | "Oxidation"
  | "Reduction"
  | "Redox"
  | "Neutralisation"
  | "Combustion"
  | "Addition"
  | "Substitution"
  | "Esterification"
  | "Saponification"
  | "Electrolysis";

export interface ChemicalEntity {
  formula: string;
  name: string;
  role: "reactant" | "product" | "catalyst" | "medium";
  state: "s" | "l" | "g" | "aq";
  color?: string;
  ncertNote?: string;
}

export interface AnimationStep {
  step: number;
  description: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface MolecularParticle {
  id: string;
  symbol: string;
  color: string;
  size: number;
  initialPos: { x: number; y: number };
  finalPos: { x: number; y: number };
  label: string;
  phaseNote?: string;
}

export interface SimulatorConfig {
  apparatus: "beaker" | "test-tube" | "crucible" | "conical-flask" | "china-dish" | "electrolysis-cell";
  primarySubstance: {
    name: string;
    formula: string;
    appearance: string;
    liquidColor?: string;
    solidColor?: string;
  };
  addedSubstance?: {
    name: string;
    formula: string;
    appearance: string;
    actionLabel: string;
    type: "liquid" | "solid" | "gas" | "heat";
  };
  reactionResult: {
    liquidColor?: string;
    precipitateColor?: string;
    hasPrecipitate?: boolean;
    precipitateName?: string;
    bubbles?: boolean;
    gasName?: string;
    gasColor?: string;
    tempChange?: "exothermic" | "endothermic" | "neutral";
    tempDisplay?: string;
    depositOnSolid?: string;
    smokeColor?: string;
    flameColor?: string;
    soundEffect?: string;
  };
  molecularScene?: {
    description: string;
    reactants: { name: string; formula: string; count: number; color: string }[];
    products: { name: string; formula: string; count: number; color: string }[];
    mechanism: "join" | "split" | "displace" | "exchange" | "oxidize" | "condense";
  };
}

export interface Reaction {
  id: string;
  chapter: string;
  chapterNumber: number;
  topic: string;

  title: string;

  reactants: string[];
  products: string[];

  equation: string;
  balancedEquation: string;

  reactionType: string[];

  conditions?: string[];

  observations: string[];

  explanation: string;

  molecularExplanation: string;

  experimentMode: ExperimentMode;

  safetyNotes: string[];

  realLifeApplications?: string[];

  structuredApplications?: {
    principle: string;
    application: string;
    whyItMatters: string;
  }[];

  source?: {
    textbook: string;
    chapter: string;
    section?: string;
    page?: string;
  };

  ncertConcept: string;

  tags: string[];

  animationSteps: AnimationStep[];

  quiz?: QuizQuestion[];

  // Interactive extras for enhanced learning
  interactiveEntities?: ChemicalEntity[];
  simulatorConfig?: SimulatorConfig;
  boardImportance?: "Very High" | "High" | "Medium";
  commonBoardQuestion?: string;
  energyChange?: "Exothermic" | "Endothermic" | "None";
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  shortDescription: string;
  description?: string;
  weightage?: string;
  color: string;
  iconName: string;
  topics: string[];
  reactionCount: number;
  experimentCount: number;
}

export interface DailyStreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  lastStudyDate?: string; // YYYY-MM-DD
  todayCompleted: boolean;
  totalActiveDays: number;
  totalStudyDays?: number;
}

export interface UserProgress {
  completedChapters: string[];
  studiedReactions: string[];
  simulatedExperiments: string[];
  quizScores: Record<string, { score: number; total: number; timestamp: number }>;
  flashcardMastered: string[];
  bookmarkedReactions: string[];
  streakInfo?: DailyStreakInfo;
  balancedEquations?: string[];
  challengeCompletions?: Record<string, { score: number; date: string }>;
}

export type VirtualLabMode = "guided" | "discovery" | "challenge";

export interface DiscoverySubstance {
  id: string;
  name: string;
  formula: string;
  category: "Acid" | "Base" | "Metal" | "Salt" | "Oxide" | "Organic" | "Indicator" | "Other";
  state: "solid" | "liquid" | "aqueous" | "gas";
  color: string;
  description: string;
  isHazardous?: boolean;
  hazardNote?: string;
  phValue?: number;
}

export interface DiscoveryReactionResult {
  occurred: boolean;
  title: string;
  equation: string;
  balancedEquation: string;
  reactionType: string;
  observations: string[];
  explanation: string;
  energyChange: "Exothermic" | "Endothermic" | "Neutral";
  isHazardous: boolean;
  simulationSafetyNote?: string;
  visualEffect: {
    color: string;
    hasBubbles?: boolean;
    gasName?: string;
    hasPrecipitate?: boolean;
    precipitateColor?: string;
    precipitateName?: string;
    temperatureChange?: number; // delta in deg C
    flameColor?: string;
    soundDesc?: string;
  };
}

export interface DiscoveryRule {
  id: string;
  reactionId?: string;
  title: string;
  reactants: string[];
  requiresHeat?: boolean;
  requiresWater?: boolean;
  matches: (
    substanceSet: Set<string>,
    conditions: {
      heat: boolean;
      water: boolean;
      testedWithSplinter?: boolean;
      testedWithLimeWater?: boolean;
    },
    count: number
  ) => boolean;
  getResult: (
    substanceSet: Set<string>,
    conditions: {
      heat: boolean;
      water: boolean;
      testedWithSplinter?: boolean;
      testedWithLimeWater?: boolean;
    }
  ) => DiscoveryReactionResult;
}

export interface ChemistryChallenge {
  id: string;
  title: string;
  chapter: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  scenario: string;
  objective: string;
  allowedSubstanceIds: string[];
  targetReactionEquation?: string;
  validationCheck: (
    selectedIds: string[],
    condition: {
      heat: boolean;
      water: boolean;
      testedWithLimeWater?: boolean;
      testedWithSplinter?: boolean;
    }
  ) => {
    solved: boolean;
    feedback: string;
    observation: string;
  };
  hints: string[];
  boardFact: string;
}

