import { Reaction, DiscoveryReactionResult } from "../../types";

export type ExperimentAnimationType =
  | "mixing"
  | "color-change"
  | "gas-evolution"
  | "precipitation"
  | "metal-deposition"
  | "combination"
  | "decomposition"
  | "displacement"
  | "double-displacement"
  | "combustion"
  | "oxidation"
  | "addition"
  | "substitution"
  | "neutralisation"
  | "electrolysis"
  | "esterification";

export type StepType =
  | "setup"
  | "add"
  | "pour"
  | "mix"
  | "heat"
  | "react"
  | "observe"
  | "product";

export interface ExperimentAnimationStep {
  id: string;
  stageIndex: number;
  type: StepType;
  title: string;
  duration: number; // in milliseconds at 1x speed
  description: string;
  actionPrompt?: string; // Student action prompt in interactive mode
  actionRequired?: "select_reagent" | "pour" | "drop_solid" | "mix" | "apply_heat" | "observe";
  visualEffects?: {
    pouring?: boolean;
    droppingSolid?: boolean;
    stirring?: boolean;
    heatApplied?: boolean;
    bubbles?: boolean;
    colorTransition?: boolean;
    precipitateForming?: boolean;
    metalDepositing?: boolean;
    vibration?: boolean;
    glow?: boolean;
    smoke?: boolean;
  };
}

export interface ReagentTransferInfo {
  id: string;
  name: string;
  formula: string;
  state: "liquid" | "solid" | "gas";
  color: string;
  containerType: "bottle" | "vial" | "spatula" | "dropper";
}

export type ApparatusType =
  | "beaker"
  | "test-tube"
  | "conical-flask"
  | "crucible"
  | "china-dish"
  | "electrolysis-cell"
  | "measuring-cylinder";

export interface PredictionOption {
  id: string;
  label: string;
  category: "no_reaction" | "color_change" | "gas_formation" | "precipitate" | "temperature" | "metal_deposition" | "new_substance";
  description: string;
}

export const PREDICTION_OPTIONS: PredictionOption[] = [
  { id: "pred-no-reaction", label: "No Reaction", category: "no_reaction", description: "Substances will remain chemically unchanged in the vessel" },
  { id: "pred-color-change", label: "Distinct Colour Change", category: "color_change", description: "Solution or solid will shift visibly in tint or shade" },
  { id: "pred-gas", label: "Gas Evolution & Effervescence", category: "gas_formation", description: "Bubbles, fizzing, or gaseous vapour will be released" },
  { id: "pred-precipitate", label: "Insoluble Precipitate Formation", category: "precipitate", description: "A solid cloudy precipitate will separate and settle downward" },
  { id: "pred-temp-rise", label: "Exothermic Temperature Rise", category: "temperature", description: "Thermal energy will be released, warming the container" },
  { id: "pred-metal-deposit", label: "Metal Deposition on Solid", category: "metal_deposition", description: "A less reactive metal will deposit as a new layer" },
  { id: "pred-new-substance", label: "Complete New Substance Formation", category: "new_substance", description: "Combination or synthesis yielding new compound properties" }
];
