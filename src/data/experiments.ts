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
    apparatus: ["Bunsen Burner", "Tongs", "Watch Glass", "Sandpaper", "Safety Goggles"],
    chemicals: ["Magnesium Ribbon (cleaned)", "Atmospheric Oxygen"],
    steps: [
      { step: 1, title: "Surface Cleaning", description: "Clean a 2 cm magnesium ribbon with sandpaper to scrape off the basic magnesium carbonate coating.", action: "Rub Sandpaper" },
      { step: 2, title: "Holding with Tongs", description: "Hold the cleaned magnesium ribbon firmly at one end using laboratory pair of tongs.", action: "Grip Ribbon" },
      { step: 3, title: "Ignition in Flame", description: "Bring the other tip of the ribbon into the flame of a spirit lamp or Bunsen burner.", action: "Ignite in Flame" },
      { step: 4, title: "Collecting Ash", description: "Collect the falling white powder onto a clean watch glass held underneath.", action: "Collect Powder" }
    ],
    observations: [
      "Magnesium ribbon burns with a dazzling, brilliant white flame.",
      "A powdery white substance (Magnesium Oxide, MgO) is left behind on the watch glass.",
      "Intense heat energy and blinding white radiance are generated."
    ],
    inference: "Magnesium actively combines with atmospheric oxygen at ignition temperature in a combination and exothermic redox reaction: 2Mg(s) + O₂(g) → 2MgO(s).",
    animationType: "combination",
    safetyLevel: "teacher-demo",
    safetyPrecautions: [
      "Never stare directly at the dazzling white flame; wear UV protective goggles.",
      "Always hold ribbon firmly with metal tongs, never bare hands."
    ]
  },
  {
    id: "exp-slaked-lime",
    reactionId: "ch1-slaked-lime",
    title: "Slaking of Quicklime with Water (Activity 1.4)",
    apparatus: ["Borosilicate Beaker", "Glass Rod", "Thermometer", "Dropper"],
    chemicals: ["Calcium Oxide (Quicklime) lumps", "Distilled Water"],
    steps: [
      { step: 1, title: "Adding Quicklime", description: "Place approximately 5 g of white quicklime (CaO) lumps into a dry 250 mL beaker.", action: "Add CaO Lumps" },
      { step: 2, title: "Adding Water", description: "Slowly pour 50 mL of water over the quicklime along the inner wall of the beaker.", action: "Pour Water" },
      { step: 3, title: "Observing Exothermic Slaking", description: "Observe the hissing sound, steam evolution, and the crumbling of lumps into fine powder.", action: "Observe Reaction" },
      { step: 4, title: "Temperature Check", description: "Carefully touch the outer wall of the beaker or check temperature with a laboratory thermometer.", action: "Measure Temp" }
    ],
    observations: [
      "Vigorous hissing bubbling sound is heard as water contacts quicklime.",
      "The beaker becomes extremely hot to touch (temperature rises dramatically by >50°C).",
      "Lumps disintegrate into a milky white suspension of slaked lime (Ca(OH)₂)."
    ],
    inference: "Quicklime combines with water releasing enormous thermal energy in an exothermic combination reaction: CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat.",
    animationType: "combination",
    safetyLevel: "safe",
    safetyPrecautions: [
      "Pour water slowly down the beaker side to avoid splashing hot alkaline liquid.",
      "Do not touch the beaker bottom directly during the peak exothermic phase."
    ]
  },
  {
    id: "exp-iron-displacement",
    reactionId: "ch1-iron-copper-sulphate-displacement",
    title: "Displacement of Copper by Iron Nails (Activity 1.9)",
    apparatus: ["Two Test Tubes", "Test Tube Stand", "Sandpaper", "Thread"],
    chemicals: ["Iron Nails (clean & rust-free)", "Copper(II) Sulphate (CuSO₄) solution (0.1 M)"],
    steps: [
      { step: 1, title: "Clean Iron Nails", description: "Rub two clean iron nails with emery sandpaper until silvery and shiny.", action: "Polish Nails" },
      { step: 2, title: "Fill Test Tubes", description: "Take two test tubes (A and B), and fill each with 10 mL of deep blue copper sulphate solution.", action: "Add Blue CuSO₄" },
      { step: 3, title: "Immersion", description: "Tie one iron nail with a thread and immerse it into test tube A for 20 minutes. Keep tube B as control.", action: "Immerse Iron Nail" },
      { step: 4, title: "Comparative Observation", description: "Withdraw the nail from tube A and compare its surface and the solution color with tube B.", action: "Compare Results" }
    ],
    observations: [
      "Deep blue color of CuSO₄ solution fades gradually to pale light green (FeSO₄).",
      "A reddish-brown powdery coating of pure metallic copper deposits on the iron nail.",
      "The control tube B remains vibrant blue."
    ],
    inference: "Iron is more reactive than copper in the reactivity series and displaces Cu²⁺ ions: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s).",
    animationType: "displacement",
    safetyLevel: "safe",
    safetyPrecautions: [
      "Copper sulphate solution is toxic if ingested; avoid contact with broken skin.",
      "Wash hands thoroughly after handling test solutions."
    ]
  },
  {
    id: "exp-lead-nitrate-precipitation",
    reactionId: "ch1-lead-nitrate-potassium-iodide",
    title: "Precipitation of Lead(II) Iodide (Activity 1.2)",
    apparatus: ["Two 50 mL Beakers / Test Tubes", "Glass Stirring Rod", "Dropper"],
    chemicals: ["Lead Nitrate solution (colourless)", "Potassium Iodide solution (colourless)"],
    steps: [
      { step: 1, title: "Prepare Lead Nitrate", description: "Take 10 mL of clear, transparent lead nitrate [Pb(NO₃)₂] solution in a test tube.", action: "Pour Pb(NO₃)₂" },
      { step: 2, title: "Prepare Potassium Iodide", description: "Take 10 mL of clear, transparent potassium iodide (KI) solution in another test tube.", action: "Pour KI" },
      { step: 3, title: "Mixing Solutions", description: "Slowly add the potassium iodide solution into the lead nitrate test tube.", action: "Mix Solutions" },
      { step: 4, title: "Observe Instant Precipitation", description: "Witness the instantaneous formation of bright canary-yellow precipitate.", action: "Observe Yellow Solid" }
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
      "Lead salts are toxic heavy metals; handle under teacher supervision and do not pour down common drains.",
      "Dispose of lead waste in designated chemical hazardous waste container."
    ]
  },
  {
    id: "exp-ferrous-sulphate-decomposition",
    reactionId: "ch1-ferrous-sulphate-decomposition",
    title: "Thermal Decomposition of Ferrous Sulphate Crystals (Activity 1.5)",
    apparatus: ["Boiling Tube", "Boiling Tube Holder", "Bunsen Burner", "Moist Blue Litmus Paper"],
    chemicals: ["Green Ferrous Sulphate Crystals (FeSO₄·7H₂O)"],
    steps: [
      { step: 1, title: "Load Boiling Tube", description: "Take about 2 g of light green ferrous sulphate crystals in a dry Pyrex boiling tube.", action: "Load Crystals" },
      { step: 2, title: "Hold with Test Tube Holder", description: "Grip the boiling tube firmly with a tube holder, pointing the mouth away from all persons.", action: "Point Safely" },
      { step: 3, title: "Gentle then Strong Heating", description: "Heat gently first over the flame, then heat strongly.", action: "Apply Heat" },
      { step: 4, title: "Waif Gas Vapours", description: "Gently waft the emitted gas toward the nose to detect the characteristic smell of burning sulphur.", action: "Waft Gas" }
    ],
    observations: [
      "Light green crystals first lose water of crystallization, turning white (anhydrous FeSO₄).",
      "On further strong heating, solid turns dark reddish-brown (Ferric Oxide, Fe₂O₃).",
      "Choking, pungent fumes with the characteristic smell of burning sulphur (SO₂ & SO₃) are evolved.",
      "Moist blue litmus paper held at the mouth turns red, proving acidic nature of sulphur gases."
    ],
    inference: "Single compound decomposes on heating into three simpler substances: 2FeSO₄(s) --Δ→ Fe₂O₃(s) + SO₂(g) + SO₃(g).",
    animationType: "decomposition",
    safetyLevel: "teacher-demo",
    safetyPrecautions: [
      "Never point the mouth of the boiling tube towards yourself or your lab partner.",
      "Sulphur dioxide and trioxide gases are irritating to respiratory tract; waft gently and never inhale deeply."
    ]
  },
  {
    id: "exp-zinc-acid-hydrogen",
    reactionId: "ch1-zinc-granules-h2so4",
    title: "Action of Dilute Acid on Zinc Granules (Activity 1.3 / Activity 2.3)",
    apparatus: ["Conical Flask", "Delivery Tube", "Soap Bubble Trough", "Burning Splinter", "Cork with single bore"],
    chemicals: ["Granulated Zinc metal", "Dilute Sulphuric Acid (H₂SO₄) / Hydrochloric Acid (HCl)", "Soap Solution"],
    steps: [
      { step: 1, title: "Place Zinc Granules", description: "Add a few pieces of granulated zinc into a clean 100 mL conical flask.", action: "Add Zinc" },
      { step: 2, title: "Add Dilute Acid", description: "Pour 10 mL of dilute sulphuric acid over the zinc granules and fit the cork with delivery tube.", action: "Pour Dilute Acid" },
      { step: 3, title: "Observe Effervescence", description: "Brisk effervescence begins immediately as tiny colourless gas bubbles coat the zinc.", action: "Observe Bubbles" },
      { step: 4, title: "Pop Sound Test", description: "Pass gas through soap water and bring a burning candle near the soap bubbles filled with gas.", action: "Test with Flame" }
    ],
    observations: [
      "Brisk effervescence with rapid stream of colourless, odourless gas bubbles.",
      "The conical flask becomes noticeably warm (exothermic reaction).",
      "The gas bubbles burst with a sharp, distinctive 'POP' sound when ignited, confirming hydrogen gas."
    ],
    inference: "Active metal displaces hydrogen from dilute mineral acids: Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑.",
    animationType: "displacement",
    safetyLevel: "safe",
    safetyPrecautions: [
      "Keep flame at least 30 cm away from the reaction flask; test only small soap bubbles with candle flame.",
      "Always handle dilute acid with care and use droppers."
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
