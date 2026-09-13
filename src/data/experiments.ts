import { ExperimentMode, Reaction } from "../types";
import { REACTIONS } from "./reactions";

export interface ExperimentStep {
  step: number;
  title: string;
  description: string;
  action?: string;
  visualCue?: string;
}

export interface Experiment {
  id: string;
  reactionId: string;
  title: string;
  apparatus: string[];
  chemicals: string[];
  steps: ExperimentStep[];
  observations: string[];
  inference: string;
  animationType: "combination" | "decomposition" | "displacement" | "double_displacement" | "precipitation" | "redox" | "combustion" | "addition" | "neutralisation";
  safetyLevel: ExperimentMode;
  safetyPrecautions: string[];
}

export const EXPERIMENTS_DATABASE: Experiment[] = [
  {
    id: "exp-magnesium-ribbon",
    reactionId: "ch1-magnesium-ribbon",
    title: "Burning of Magnesium Ribbon in Air (Activity 1.1)",
    apparatus: ["Virtual Workbench", "Heat Source", "Digital Sensor", "Spectrometry View"],
    chemicals: ["Magnesium Ribbon (Mg)", "Atmospheric Oxygen (O₂)"],
    steps: [
      { step: 1, title: "Add Virtual Substance", description: "Select cleaned metallic Magnesium ribbon (Mg) and place it on the virtual reaction pedestal.", action: "Add Virtual Mg" },
      { step: 2, title: "Start Simulation", description: "Engage the virtual thermal source to initiate rapid oxidation with atmospheric oxygen.", action: "Start Simulation" },
      { step: 3, title: "Observe Luminescence & Product", description: "Observe the intense dazzling white flame and witness the formation of white Magnesium Oxide (MgO) ash.", action: "Observe Luminescence" },
      { step: 4, title: "View Molecular Explanation", description: "Examine the electron transfer where Mg loses 2 electrons to oxygen forming the ionic MgO crystal lattice.", action: "View Molecular Model" }
    ],
    observations: [
      "Magnesium ribbon burns with a dazzling, brilliant white flame.",
      "A powdery white substance (Magnesium Oxide, MgO) is left behind on the virtual watch glass.",
      "Intense heat energy and blinding white radiance are generated."
    ],
    inference: "Magnesium actively combines with atmospheric oxygen at ignition temperature in a combination and exothermic redox reaction: 2Mg(s) + O₂(g) → 2MgO(s).",
    animationType: "combination",
    safetyLevel: "teacher-demo",
    safetyPrecautions: [
      "⚠️ Virtual Simulation Notice: In a physical laboratory, burning magnesium emits intense UV radiation requiring specialized dark goggles.",
      "Simulated safely on screen without radiation exposure."
    ]
  },
  {
    id: "exp-slaked-lime",
    reactionId: "ch1-slaked-lime",
    title: "Slaking of Quicklime with Water (Activity 1.4)",
    apparatus: ["Virtual Borosilicate Beaker", "Thermal Probe", "Suspension Sensor"],
    chemicals: ["Calcium Oxide (Quicklime, CaO)", "Deionised Water (H₂O)"],
    steps: [
      { step: 1, title: "Add Virtual Substance", description: "Select solid Calcium Oxide (Quicklime, CaO) and load it into the virtual reaction vessel.", action: "Add Virtual CaO" },
      { step: 2, title: "Start Simulation", description: "Dispense virtual water into the reaction vessel to initiate the exothermic hydration.", action: "Start Simulation" },
      { step: 3, title: "Observe Exothermic Change", description: "Observe violent hissing effervescence, rapid steam evolution, and thermal probe surge to ~90°C.", action: "Observe Thermal Surge" },
      { step: 4, title: "View Molecular Explanation", description: "Observe the formation of calcium hydroxide Ca(OH)₂ suspension as water molecules cleave oxide bonds.", action: "View Molecular Model" }
    ],
    observations: [
      "Vigorous hissing bubbling sound is heard as water contacts quicklime.",
      "The beaker becomes extremely hot (temperature rises dramatically by >50°C).",
      "Lumps disintegrate into a milky white suspension of slaked lime (Ca(OH)₂)."
    ],
    inference: "Quicklime combines with water releasing enormous thermal energy in an exothermic combination reaction: CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat.",
    animationType: "combination",
    safetyLevel: "teacher-demo",
    safetyPrecautions: [
      "⚠️ High Exothermic Warning: Slaking of quicklime releases boiling heat and can violently splatter caustic alkali.",
      "Simulated virtually to teach thermodynamics safely."
    ]
  },
  {
    id: "exp-iron-displacement",
    reactionId: "ch1-iron-copper-sulphate-displacement",
    title: "Displacement of Copper by Iron (Activity 1.9)",
    apparatus: ["Virtual Reaction Chamber", "Colorimeter Sensor", "Substrate Stage"],
    chemicals: ["Iron Metal (Fe)", "Copper(II) Sulphate (CuSO₄) solution"],
    steps: [
      { step: 1, title: "Add Virtual Substance", description: "Prepare the virtual beaker with deep blue Copper(II) Sulphate (CuSO₄) solution.", action: "Add Virtual CuSO₄" },
      { step: 2, title: "Start Simulation", description: "Submerge the virtual metallic iron (Fe) substrate into the blue solution.", action: "Start Simulation" },
      { step: 3, title: "Observe Colour Change & Deposit", description: "Observe blue solution fading to light green (FeSO₄) while reddish-brown metallic copper coats the iron.", action: "Observe Colour Shift" },
      { step: 4, title: "View Molecular Explanation", description: "Analyze the single displacement redox mechanism where Fe donates electrons to Cu²⁺ ions.", action: "View Molecular Model" }
    ],
    observations: [
      "Deep blue color of CuSO₄ solution fades gradually to pale light green (FeSO₄).",
      "A reddish-brown powdery coating of pure metallic copper deposits on the iron.",
      "The control test tube remains vibrant blue."
    ],
    inference: "Iron is more reactive than copper in the reactivity series and displaces Cu²⁺ ions: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s).",
    animationType: "displacement",
    safetyLevel: "safe",
    safetyPrecautions: [
      "Safe school-level experiment. Virtual simulation accelerates the 20-minute reaction into an interactive instant visualization."
    ]
  },
  {
    id: "exp-lead-nitrate-precipitation",
    reactionId: "ch1-lead-iodide-precipitation",
    title: "Precipitation of Lead(II) Iodide (Activity 1.2)",
    apparatus: ["Virtual Dual Burettes", "Precipitate Density Detector", "Optical Chamber"],
    chemicals: ["Lead(II) Nitrate solution [Pb(NO₃)₂]", "Potassium Iodide solution [KI]"],
    steps: [
      { step: 1, title: "Add Virtual Substance", description: "Select clear, colourless Lead(II) Nitrate [Pb(NO₃)₂] and Potassium Iodide [KI] solutions.", action: "Add Virtual Solutions" },
      { step: 2, title: "Start Simulation", description: "Combine both transparent liquids into the virtual reaction vessel.", action: "Start Simulation" },
      { step: 3, title: "Observe Precipitate", description: "Observe the instantaneous appearance of a brilliant canary-yellow precipitate of insoluble Lead(II) Iodide.", action: "Observe Yellow Solid" },
      { step: 4, title: "View Molecular Explanation", description: "Review mutual ion exchange: Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ forming an insoluble crystalline network.", action: "View Molecular Model" }
    ],
    observations: [
      "Both starting solutions are completely clear and colourless.",
      "Upon mixing, an intense brilliant canary-yellow precipitate appears instantly.",
      "The yellow precipitate settles down as solid particles of PbI₂."
    ],
    inference: "Double displacement and precipitation occur as insoluble lead iodide is formed: Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq).",
    animationType: "precipitation",
    safetyLevel: "teacher-demo",
    safetyPrecautions: [
      "⚠️ Heavy Metal Caution: Lead compounds are toxic and environmentally hazardous.",
      "This simulation provides safe, zero-waste discovery of double-displacement precipitation."
    ]
  },
  {
    id: "exp-ferrous-sulphate-decomposition",
    reactionId: "ch1-ferrous-sulphate-decomposition",
    title: "Thermal Decomposition of Ferrous Sulphate (Activity 1.5)",
    apparatus: ["Virtual Pyrex Tube", "Thermal Heating Coil", "Digital Sensor View"],
    chemicals: ["Ferrous Sulphate Heptahydrate crystals (FeSO₄·7H₂O)"],
    steps: [
      { step: 1, title: "Add Virtual Substance", description: "Place pale green Ferrous Sulphate crystals (FeSO₄·7H₂O) into the virtual boiling tube.", action: "Add Virtual FeSO₄" },
      { step: 2, title: "Start Simulation", description: "Apply high heat virtually to initiate dehydration followed by thermal chemical decomposition.", action: "Start Simulation" },
      { step: 3, title: "Observe Colour Change & Gas Evolution", description: "Observe crystals turning white then dark reddish-brown (Fe₂O₃) as gases evolve during thermal decomposition.", action: "Observe Gas Evolution" },
      { step: 4, title: "View Molecular Explanation", description: "Examine single-compound thermal breakdown into three products: Fe₂O₃(s) + SO₂(g) + SO₃(g).", action: "View Molecular Model" }
    ],
    observations: [
      "Light green crystals first lose water of crystallization, turning white (anhydrous FeSO₄).",
      "On further strong heating, solid turns dark reddish-brown (Ferric Oxide, Fe₂O₃).",
      "Gases are evolved during thermal decomposition (SO₂ and SO₃).",
      "Acidic sulphur gases turn virtual moist blue litmus paper red."
    ],
    inference: "Single compound decomposes on heating into three simpler substances: 2FeSO₄(s) —(Heat)→ Fe₂O₃(s) + SO₂(g) + SO₃(g).",
    animationType: "decomposition",
    safetyLevel: "simulation-only",
    safetyPrecautions: [
      "⚠️ Simulation-only / teacher demonstration.",
      "Note: The gases are represented visually in this simulation. Do not attempt to identify reaction gases by smell.",
      "Sulphur dioxide and sulphur trioxide are toxic, choking gases that irritate the respiratory system; physical demonstration requires a chemical fume hood."
    ]
  },
  {
    id: "exp-zinc-acid-hydrogen",
    reactionId: "ch2-zinc-acid-hydrogen",
    title: "Action of Dilute Acid on Zinc Granules (Activity 1.3 / 2.3)",
    apparatus: ["Virtual Conical Flask", "Gas Collection Tube", "Acoustic Pop-Detector"],
    chemicals: ["Granulated Zinc Metal (Zn)", "Dilute Sulphuric Acid (H₂SO₄)"],
    steps: [
      { step: 1, title: "Add Virtual Substance", description: "Select metallic Zinc (Zn) granules and load into the virtual reaction flask.", action: "Add Virtual Zinc" },
      { step: 2, title: "Start Simulation", description: "Introduce dilute acid into the chamber to begin single displacement.", action: "Start Simulation" },
      { step: 3, title: "Observe Gas Evolution & Acoustic Pop", description: "Observe brisk effervescence of hydrogen bubbles; activate acoustic test to trigger characteristic 'POP' sound.", action: "Observe Effervescence" },
      { step: 4, title: "View Molecular Explanation", description: "Track electron transfer from zinc atoms to hydrogen ions: Zn + 2H⁺ → Zn²⁺ + H₂↑.", action: "View Molecular Model" }
    ],
    observations: [
      "Brisk effervescence with rapid stream of colourless, odourless gas bubbles.",
      "The conical flask becomes noticeably warm (exothermic reaction).",
      "The gas bubbles burst with a sharp, distinctive 'POP' sound when ignited, confirming hydrogen gas."
    ],
    inference: "Active metal displaces hydrogen from dilute mineral acids: Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑.",
    animationType: "displacement",
    safetyLevel: "teacher-demo",
    safetyPrecautions: [
      "⚠️ Flammable Gas Hazard: Hydrogen forms explosive mixtures with atmospheric oxygen.",
      "Virtual simulation allows students to safely observe effervescence and acoustic pop testing."
    ]
  }
];

/**
 * Automatically retrieves or builds an experiment object for any reaction in the NCERT database.
 */
export function getExperimentForReaction(reaction: Reaction): Experiment {
  // Check if hand-crafted detailed experiment exists
  const found = EXPERIMENTS_DATABASE.find(e => e.reactionId === reaction.id);
  if (found) return found;

  // Derive animation type from reaction categories
  let animType: Experiment["animationType"] = "combination";
  const cat = reaction.reactionType.join(" ").toLowerCase();
  if (cat.includes("precipitat")) animType = "precipitation";
  else if (cat.includes("double displacement")) animType = "double_displacement";
  else if (cat.includes("displacement")) animType = "displacement";
  else if (cat.includes("decomposition")) animType = "decomposition";
  else if (cat.includes("neutralis")) animType = "neutralisation";
  else if (cat.includes("combustion")) animType = "combustion";
  else if (cat.includes("addition")) animType = "addition";
  else if (cat.includes("redox") || cat.includes("oxidation")) animType = "redox";

  // Derive apparatus
  const apparatus: string[] = [];
  if (reaction.simulatorConfig?.apparatus === "test-tube") apparatus.push("Test Tube", "Test Tube Stand", "Dropper");
  else if (reaction.simulatorConfig?.apparatus === "crucible") apparatus.push("Crucible", "Clay Triangle", "Tripod", "Burner");
  else if (reaction.simulatorConfig?.apparatus === "china-dish") apparatus.push("China Dish", "Wire Gauze", "Tripod", "Spirit Lamp");
  else apparatus.push("Borosilicate Beaker", "Glass Stirring Rod", "Measuring Cylinder");

  // Derive steps from animationSteps
  const steps: ExperimentStep[] = (reaction.animationSteps && reaction.animationSteps.length > 0)
    ? reaction.animationSteps.map((s, idx) => ({
        step: s.step,
        title: `Phase ${idx + 1}: ${idx === 0 ? "Setup & Reactants" : idx === 1 ? "Chemical Interaction" : "Observation"}`,
        description: s.description,
        action: `Proceed to Step ${s.step}`
      }))
    : [
        { step: 1, title: "Setup Reactants", description: `Prepare ${reaction.reactants.join(" and ")} in the apparatus.` },
        { step: 2, title: "Apply Reaction Conditions", description: reaction.conditions?.join(", ") || "Allow substances to interact at standard conditions." },
        { step: 3, title: "Examine Products", description: `Verify formation of ${reaction.products.join(" and ")}.` }
      ];

  return {
    id: `exp-${reaction.id}`,
    reactionId: reaction.id,
    title: `Virtual Experiment: ${reaction.title}`,
    apparatus,
    chemicals: [...reaction.reactants],
    steps,
    observations: reaction.observations.length > 0 ? reaction.observations : ["Clear qualitative transformation observed according to chemical stoichiometry."],
    inference: reaction.explanation,
    animationType: animType,
    safetyLevel: reaction.experimentMode,
    safetyPrecautions: reaction.safetyNotes.length > 0 ? reaction.safetyNotes : ["Perform under laboratory supervision with standard eye protection."]
  };
}
