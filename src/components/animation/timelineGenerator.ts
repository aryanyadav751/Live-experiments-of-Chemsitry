import { Reaction, DiscoveryReactionResult } from "../../types";
import { ExperimentAnimationStep, ApparatusType, ReagentTransferInfo } from "./animationTypes";

export interface GeneratedTimeline {
  apparatus: ApparatusType;
  primaryReagent: ReagentTransferInfo;
  addedReagents: ReagentTransferInfo[];
  steps: ExperimentAnimationStep[];
  initialColor: string;
  finalColor: string;
  hasGas: boolean;
  gasName?: string;
  hasPrecipitate: boolean;
  precipitateName?: string;
  precipitateColor?: string;
  hasDeposit: boolean;
  depositColor?: string;
  depositText?: string;
  tempChange?: "exothermic" | "endothermic" | "neutral";
  tempText?: string;
  requiresHeat?: boolean;
  requiresLight?: boolean;
  requiresElectricity?: boolean;
}

/**
 * Generates a complete data-driven animation timeline for ANY CBSE Class 10 NCERT reaction
 */
export function generateTimelineForReaction(
  reaction: Reaction | null,
  discoveryResult?: DiscoveryReactionResult | null,
  selectedChemicals: string[] = []
): GeneratedTimeline {
  // Apparatus determination
  let apparatus: ApparatusType = "beaker";
  if (reaction?.simulatorConfig?.apparatus) {
    apparatus = reaction.simulatorConfig.apparatus;
  } else if (discoveryResult?.equation?.includes("Electricity") || reaction?.id?.includes("electrolysis")) {
    apparatus = "electrolysis-cell";
  } else if (reaction?.reactionType?.includes("Precipitation") || discoveryResult?.visualEffect?.precipitateColor) {
    apparatus = "test-tube";
  } else if (reaction?.equation?.includes("Heat") || discoveryResult?.equation?.includes("Heat")) {
    apparatus = reaction?.id?.includes("lead-nitrate") || reaction?.id?.includes("ferrous") ? "test-tube" : "crucible";
  } else if (reaction?.id?.includes("zinc") || reaction?.id?.includes("acid")) {
    apparatus = "conical-flask";
  }

  // Initial and final colors
  let initialColor = "#e0f2fe"; // default dilute clear aqueous
  let finalColor = "#e0f2fe";

  if (reaction?.simulatorConfig?.primarySubstance?.liquidColor) {
    initialColor = reaction.simulatorConfig.primarySubstance.liquidColor;
  }
  if (reaction?.simulatorConfig?.reactionResult?.liquidColor) {
    finalColor = reaction.simulatorConfig.reactionResult.liquidColor;
  } else if (discoveryResult?.visualEffect?.color) {
    finalColor = discoveryResult.visualEffect.color;
    if (initialColor === "#e0f2fe" && finalColor !== "#e0f2fe") {
      // If we have discovery rule, check reactants
      if (selectedChemicals.includes("cuso4")) initialColor = "#2563eb";
      else if (selectedChemicals.includes("feso4")) initialColor = "#86efac";
    }
  }

  // Reactions like Iron + Copper sulphate
  if (reaction?.id === "ch1-iron-copper-sulphate-displacement" || (selectedChemicals.includes("fe") && selectedChemicals.includes("cuso4"))) {
    initialColor = "#1d4ed8"; // deep CuSO4 blue
    finalColor = "#86efac"; // pale green FeSO4
  }

  // Gas properties
  const hasGas = Boolean(
    reaction?.simulatorConfig?.reactionResult?.bubbles ||
    discoveryResult?.visualEffect?.hasBubbles ||
    reaction?.observations?.some((o) => o.toLowerCase().includes("gas") || o.toLowerCase().includes("bubble") || o.toLowerCase().includes("effervescence"))
  );
  const gasName = reaction?.simulatorConfig?.reactionResult?.gasName || discoveryResult?.visualEffect?.gasName || "Gas bubbles";

  // Precipitate properties
  const hasPrecipitate = Boolean(
    reaction?.simulatorConfig?.reactionResult?.hasPrecipitate ||
    discoveryResult?.visualEffect?.precipitateColor ||
    reaction?.reactionType?.some((t) => t.toLowerCase().includes("precipitat"))
  );
  const precipitateName = reaction?.simulatorConfig?.reactionResult?.precipitateName || discoveryResult?.visualEffect?.precipitateName || "Insoluble Precipitate";
  const precipitateColor = reaction?.simulatorConfig?.reactionResult?.precipitateColor || discoveryResult?.visualEffect?.precipitateColor || "#ffffff";

  // Metal deposition properties
  const hasDeposit = Boolean(
    reaction?.simulatorConfig?.reactionResult?.depositOnSolid ||
    discoveryResult?.visualEffect?.deposit ||
    (selectedChemicals.includes("fe") && selectedChemicals.includes("cuso4"))
  );
  const depositColor = "#9a3412"; // reddish brown copper
  const depositText = reaction?.simulatorConfig?.reactionResult?.depositOnSolid || discoveryResult?.visualEffect?.deposit || "Reddish-brown Copper (Cu)";

  // Temperature properties
  let tempChange: "exothermic" | "endothermic" | "neutral" = "neutral";
  let tempText: string | undefined = undefined;
  if (reaction?.simulatorConfig?.reactionResult?.tempChange) {
    tempChange = reaction.simulatorConfig.reactionResult.tempChange;
    tempText = reaction.simulatorConfig.reactionResult.tempDisplay;
  } else if (discoveryResult?.energyChange?.toLowerCase().includes("exo") || reaction?.explanation?.toLowerCase().includes("exothermic")) {
    tempChange = "exothermic";
    tempText = "+Heat Released (Exothermic)";
  } else if (discoveryResult?.energyChange?.toLowerCase().includes("endo") || reaction?.explanation?.toLowerCase().includes("endothermic")) {
    tempChange = "endothermic";
    tempText = "Energy Absorbed (Endothermic)";
  }

  // Energy conditions
  const requiresHeat = Boolean(reaction?.conditions?.some((c) => c.toLowerCase().includes("heat") || c.includes("Δ")) || discoveryResult?.equation?.includes("Heat"));
  const requiresLight = Boolean(reaction?.conditions?.some((c) => c.toLowerCase().includes("sunlight") || c.toLowerCase().includes("light")) || discoveryResult?.equation?.includes("Sunlight"));
  const requiresElectricity = Boolean(reaction?.conditions?.some((c) => c.toLowerCase().includes("electric")) || discoveryResult?.equation?.includes("Electricity"));

  // Reagents Info
  const primaryReagent: ReagentTransferInfo = {
    id: "primary",
    name: reaction?.reactants?.[0] || "Primary Solution",
    formula: reaction?.reactants?.[0] || "Solvent / Reagent",
    state: "liquid",
    color: initialColor,
    containerType: "bottle"
  };

  const addedReagents: ReagentTransferInfo[] = [];
  if (reaction?.reactants && reaction.reactants.length > 1) {
    const second = reaction.reactants[1];
    const isSolid = second.includes("(s)") || second.startsWith("Fe") || second.startsWith("Zn") || second.startsWith("Mg");
    addedReagents.push({
      id: "second",
      name: second,
      formula: second,
      state: isSolid ? "solid" : "liquid",
      color: isSolid ? "#64748b" : "#cbd5e1",
      containerType: isSolid ? "spatula" : "dropper"
    });
  } else if (selectedChemicals.length > 1) {
    addedReagents.push({
      id: "added-reagent",
      name: selectedChemicals[1].toUpperCase(),
      formula: selectedChemicals[1].toUpperCase(),
      state: ["fe", "zn", "mg", "cu", "caco3"].includes(selectedChemicals[1]) ? "solid" : "liquid",
      color: "#94a3b8",
      containerType: ["fe", "zn", "mg", "cu", "caco3"].includes(selectedChemicals[1]) ? "spatula" : "bottle"
    });
  }

  // Construct standard CBSE Class 10 animation steps
  const steps: ExperimentAnimationStep[] = [
    {
      id: "step-setup",
      stageIndex: 0,
      type: "setup",
      title: "Apparatus Setup",
      duration: 2600,
      description: `Sterilized borosilicate ${apparatus.replace("-", " ")} positioned on laboratory bench.`,
      actionPrompt: `Position ${apparatus.replace("-", " ")} on virtual lab table`,
      actionRequired: "select_reagent"
    },
    {
      id: "step-add-primary",
      stageIndex: 1,
      type: "pour",
      title: "Add Primary Reagent",
      duration: 3200,
      description: `Dispensing ${primaryReagent.name} into the reaction vessel.`,
      actionPrompt: `Tilt bottle and pour ${primaryReagent.name} into apparatus`,
      actionRequired: "pour",
      visualEffects: { pouring: true }
    }
  ];

  if (addedReagents.length > 0) {
    const reagent = addedReagents[0];
    steps.push({
      id: "step-add-secondary",
      stageIndex: 2,
      type: reagent.state === "solid" ? "add" : "pour",
      title: `Introduce ${reagent.name}`,
      duration: 3200,
      description: reagent.state === "solid"
        ? `Gently introducing solid ${reagent.name} particles into the liquid medium.`
        : `Transferring ${reagent.name} solution into the reaction vessel.`,
      actionPrompt: reagent.state === "solid"
        ? `Pick spatula and introduce ${reagent.name} into vessel`
        : `Pour ${reagent.name} into vessel`,
      actionRequired: reagent.state === "solid" ? "drop_solid" : "pour",
      visualEffects: {
        droppingSolid: reagent.state === "solid",
        pouring: reagent.state === "liquid"
      }
    });
  }

  if (requiresHeat) {
    steps.push({
      id: "step-heat",
      stageIndex: 3,
      type: "heat",
      title: "Apply Virtual Thermal Energy",
      duration: 3000,
      description: "Engaging virtual Bunsen burner flame underneath vessel to supply activation energy.",
      actionPrompt: "Ignite virtual Bunsen burner to heat reactants",
      actionRequired: "apply_heat",
      visualEffects: { heatApplied: true }
    });
  }

  steps.push({
    id: "step-mix",
    stageIndex: requiresHeat ? 4 : 3,
    type: "mix",
    title: "Vigorous Mixing & Dispersion",
    duration: 3000,
    description: "Swirling liquid vortex ensures intimate molecular contact between reacting species.",
    actionPrompt: "Press MIX to swirl reactants together",
    actionRequired: "mix",
    visualEffects: { stirring: true }
  });

  steps.push({
    id: "step-reaction",
    stageIndex: requiresHeat ? 5 : 4,
    type: "react",
    title: "Chemical Reaction Occurs",
    duration: 3800,
    description: "Chemical bonds reorganize as activation energy is crossed and electron transfer takes place.",
    actionPrompt: "Observe chemical transformation in progress",
    actionRequired: "observe",
    visualEffects: {
      vibration: true,
      glow: true,
      colorTransition: initialColor !== finalColor,
      bubbles: hasGas,
      precipitateForming: hasPrecipitate,
      metalDepositing: hasDeposit
    }
  });

  steps.push({
    id: "step-observe",
    stageIndex: requiresHeat ? 6 : 5,
    type: "observe",
    title: "Record Qualitative Observations",
    duration: 3200,
    description: "Macroscopic and sensory clues verify chemical conversion according to NCERT practical criteria.",
    actionPrompt: "Confirm physical observations in lab journal",
    actionRequired: "observe"
  });

  steps.push({
    id: "step-products",
    stageIndex: requiresHeat ? 7 : 6,
    type: "product",
    title: "Final Chemical Yield",
    duration: 2800,
    description: "Stable chemical products formed. Stoichiometric equation confirmed.",
    actionPrompt: "Review balanced equation and molecular structure",
    actionRequired: "observe"
  });

  return {
    apparatus,
    primaryReagent,
    addedReagents,
    steps,
    initialColor,
    finalColor,
    hasGas,
    gasName,
    hasPrecipitate,
    precipitateName,
    precipitateColor,
    hasDeposit,
    depositColor,
    depositText,
    tempChange,
    tempText,
    requiresHeat,
    requiresLight,
    requiresElectricity
  };
}
