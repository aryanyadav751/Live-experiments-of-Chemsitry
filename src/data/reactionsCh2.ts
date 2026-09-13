import { Reaction } from "../types";

export const CHAPTER_2_REACTIONS: Reaction[] = [
  {
    id: "ch2-zinc-acid-hydrogen",
    chapter: "Acids, Bases and Salts",
    chapterNumber: 2,
    topic: "Reaction of Acids with Metals",
    title: "Reaction of Zinc with Dilute Sulphuric Acid",
    reactants: ["Zn(s)", "H₂SO₄(aq)"],
    products: ["ZnSO₄(aq)", "H₂(g)"],
    equation: "Zn + H₂SO₄ → ZnSO₄ + H₂",
    balancedEquation: "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑",
    reactionType: ["Displacement", "Redox"],
    conditions: ["Room temperature in a conical flask or test tube"],
    observations: [
      "Rapid stream of gas bubbles evolves from the surface of zinc granules.",
      "The flask becomes noticeably warm (exothermic reaction).",
      "When the gas is passed through soap solution, gas-filled soap bubbles rise in the air.",
      "Bringing a burning candle near a bubble causes it to burst with a characteristic sharp 'POP' sound."
    ],
    explanation: "Zinc is more electropositive than hydrogen in the activity series. Zinc displaces hydrogen from dilute sulphuric acid, forming zinc sulphate salt and hydrogen gas.",
    molecularExplanation: "Zn atom donates two electrons: Zn → Zn²⁺ + 2e⁻. Two H⁺ ions from dissociated H₂SO₄ capture these electrons: 2H⁺ + 2e⁻ → H₂(g).",
    experimentMode: "teacher-demo",
    safetyNotes: [
      "⚠️ Flammable Gas Warning: Hydrogen gas forms explosive mixtures with air.",
      "Safely simulated on screen with acoustic pop-sound feedback."
    ],
    realLifeApplications: ["Industrial production of zinc salts and laboratory generation of hydrogen."],
    ncertConcept: "Activity 2.3 & Figure 2.1: General rule: Acid + Metal → Salt + Hydrogen gas.",
    tags: ["Zinc", "H₂SO₄", "Pop Sound", "Activity 2.3", "Hydrogen Gas", "Exothermic"],
    boardImportance: "Very High",
    commonBoardQuestion: "Which gas is evolved when dilute acid reacts with a metal? How do you test for it? (Ans: Hydrogen gas; tested by bringing a burning candle which extinguishes with a 'pop' sound)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Add virtual substance: Place metallic Zinc (Zn) granules into the virtual conical flask." },
      { step: 2, description: "Start simulation: Introduce dilute sulphuric acid to initiate single displacement." },
      { step: 3, description: "Observe gas evolution & pop sound: Brisk effervescence of H₂; soap bubble burst test yields characteristic 'POP' sound." }
    ],
    interactiveEntities: [
      { formula: "Zn", name: "Zinc Granules", role: "reactant", state: "s", color: "#94a3b8", ncertNote: "Active amphoteric metal" },
      { formula: "H₂SO₄", name: "Dilute Sulphuric Acid", role: "reactant", state: "aq", color: "#e0f2fe", ncertNote: "Strong mineral acid" },
      { formula: "ZnSO₄", name: "Zinc Sulphate", role: "product", state: "aq", color: "#f8fafc", ncertNote: "Soluble colourless salt" },
      { formula: "H₂", name: "Hydrogen Gas", role: "product", state: "g", color: "#38bdf8", ncertNote: "Combustible gas, burns with pop sound" }
    ],
    simulatorConfig: {
      apparatus: "conical-flask",
      primarySubstance: { name: "Dilute Sulphuric Acid", formula: "H₂SO₄(aq)", appearance: "Clear colourless liquid", liquidColor: "#e0f2fe" },
      addedSubstance: { name: "Zinc Granules", formula: "Zn(s)", appearance: "Grey granulated pellets", actionLabel: "Drop Zinc Granules", type: "solid" },
      reactionResult: {
        liquidColor: "#f8fafc",
        bubbles: true,
        gasName: "Hydrogen Gas (H₂)",
        soundEffect: "Pop sound on candle flame",
        tempChange: "exothermic",
        tempDisplay: "Warm (+12°C Rise)"
      },
      molecularScene: {
        description: "Zn displaces 2 H⁺ from sulphate to liberate H₂ gas.",
        reactants: [{ name: "Zn", formula: "Zn", count: 1, color: "#94a3b8" }, { name: "H₂SO₄", formula: "2H⁺ + SO₄²⁻", count: 1, color: "#38bdf8" }],
        products: [{ name: "ZnSO₄", formula: "Zn²⁺ + SO₄²⁻", count: 1, color: "#cbd5e1" }, { name: "H₂", formula: "H₂", count: 1, color: "#60a5fa" }],
        mechanism: "displace"
      }
    },
    quiz: [
      {
        question: "Which sound confirms the presence of hydrogen gas?",
        options: ["Hissing sound", "Pop sound", "Whistling sound", "Cracking sound"],
        answer: "Pop sound",
        explanation: "Hydrogen gas burns explosively in small amounts producing a characteristic 'pop' sound."
      }
    ]
  },
  {
    id: "ch2-zinc-sodium-hydroxide",
    chapter: "Acids, Bases and Salts",
    chapterNumber: 2,
    topic: "Reaction of Bases with Metals",
    title: "Reaction of Zinc with Strong Base (Sodium Zincate Formation)",
    reactants: ["Zn(s)", "2NaOH(aq)"],
    products: ["Na₂ZnO₂(aq)", "H₂(g)"],
    equation: "Zn + 2NaOH → Na₂ZnO₂ + H₂",
    balancedEquation: "Zn(s) + 2NaOH(aq) —(Warm)→ Na₂ZnO₂(aq) + H₂(g)↑",
    reactionType: ["Displacement", "Redox"],
    conditions: ["Gentle warming of test tube contents"],
    observations: [
      "Effervescence of hydrogen gas bubbles observed upon gentle heating.",
      "Granulated zinc dissolves slowly in the alkaline solution, yielding colourless sodium zincate."
    ],
    explanation: "Zinc is an amphoteric metal. It reacts not only with acids but also with strong alkalis like sodium hydroxide to form a complex salt, sodium zincate (Na₂ZnO₂), and liberate hydrogen gas.",
    molecularExplanation: "Zn reacts with hydroxide ions: Zn + 2OH⁻ → ZnO₂²⁻ + H₂. Two Na⁺ counterions stabilize the zincate anion.",
    experimentMode: "teacher-demo",
    safetyNotes: [
      "Concentrated NaOH is highly caustic; avoid contact with skin and eyes.",
      "Heat gently with constant shaking."
    ],
    realLifeApplications: ["Zinc-air battery chemistries and protective alkaline coatings."],
    ncertConcept: "Activity 2.4: Demonstrates that certain metals (amphoteric) react with bases to evolve hydrogen gas.",
    tags: ["Sodium Zincate", "Base + Metal", "Activity 2.4", "Na₂ZnO₂", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "Write the balanced chemical equation for the reaction of zinc metal with sodium hydroxide solution. (Ans: Zn + 2NaOH → Na₂ZnO₂ + H₂)",
    energyChange: "Endothermic",
    animationSteps: [
      { step: 1, description: "Add virtual substance: Select Zinc (Zn) granules and concentrated NaOH solution." },
      { step: 2, description: "Start simulation: Apply gentle warming to initiate alkaline displacement." },
      { step: 3, description: "Observe gas evolution: Hydrogen gas evolves, forming clear sodium zincate Na₂ZnO₂ solution." }
    ],
    interactiveEntities: [
      { formula: "Zn", name: "Zinc Granules", role: "reactant", state: "s", color: "#94a3b8" },
      { formula: "NaOH", name: "Sodium Hydroxide", role: "reactant", state: "aq", color: "#e2e8f0", ncertNote: "Strong alkali" },
      { formula: "Na₂ZnO₂", name: "Sodium Zincate", role: "product", state: "aq", color: "#f1f5f9", ncertNote: "Complex salt formed with base" },
      { formula: "H₂", name: "Hydrogen Gas", role: "product", state: "g", color: "#38bdf8" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "NaOH Solution", formula: "NaOH(aq)", appearance: "Clear liquid", liquidColor: "#f1f5f9" },
      addedSubstance: { name: "Zinc + Warmth", formula: "Zn + Δ", appearance: "Pellets with warmth", actionLabel: "Add Zinc & Warm", type: "solid" },
      reactionResult: {
        liquidColor: "#f8fafc",
        bubbles: true,
        gasName: "Hydrogen Gas (H₂)",
        tempChange: "endothermic",
        tempDisplay: "Warmed to 60°C"
      }
    }
  },
  {
    id: "ch2-metal-carbonates-acid",
    chapter: "Acids, Bases and Salts",
    chapterNumber: 2,
    topic: "Acids with Carbonates & Hydrogencarbonates",
    title: "Action of Dilute HCl on Sodium Carbonate & Hydrogencarbonate",
    reactants: ["Na₂CO₃(s)", "2HCl(aq)"],
    products: ["2NaCl(aq)", "H₂O(l)", "CO₂(g)"],
    equation: "Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂",
    balancedEquation: "Na₂CO₃(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g)↑",
    reactionType: ["Double Displacement", "Decomposition"],
    conditions: ["Room temperature; thistle funnel delivery apparatus"],
    observations: [
      "Brisk effervescence of a colourless, odourless gas (CO₂).",
      "The solid carbonate dissolves completely into a clear sodium chloride solution.",
      "When passed into freshly prepared lime water, the gas turns the solution milky white."
    ],
    explanation: "Metal carbonates react with acids to form the corresponding salt, water, and carbon dioxide gas. The brisk fizzing is due to rapid carbon dioxide release.",
    molecularExplanation: "2H⁺(aq) + CO₃²⁻(s) → H₂CO₃(aq) → H₂O(l) + CO₂(g)↑.",
    experimentMode: "safe",
    safetyNotes: ["Ensure delivery tube is immersed in lime water without back-suction."],
    realLifeApplications: ["Effervescent antacid tablets (ENO), baking powder reaction, soda-acid fire extinguishers."],
    ncertConcept: "Activity 2.5: Metal Carbonate/Hydrogencarbonate + Acid → Salt + CO₂ + H₂O.",
    tags: ["Brisk Effervescence", "CO₂", "Activity 2.5", "Na₂CO₃", "Lime Water Test"],
    boardImportance: "Very High",
    commonBoardQuestion: "What happens when dilute hydrochloric acid is added to sodium carbonate? How do you confirm the gas evolved? (Ans: Brisk effervescence of CO₂ which turns lime water milky)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Put 0.5 g sodium carbonate powder in test tube A." },
      { step: 2, description: "Add 2 mL dilute HCl through thistle funnel; brisk bubbling erupts." },
      { step: 3, description: "Pass evolved CO₂ gas through lime water, watching it turn milky white." }
    ],
    interactiveEntities: [
      { formula: "Na₂CO₃", name: "Sodium Carbonate", role: "reactant", state: "s", color: "#f8fafc" },
      { formula: "HCl", name: "Hydrochloric Acid", role: "reactant", state: "aq", color: "#e0f2fe" },
      { formula: "NaCl", name: "Sodium Chloride", role: "product", state: "aq", color: "#f8fafc" },
      { formula: "CO₂", name: "Carbon Dioxide Gas", role: "product", state: "g", color: "#94a3b8", ncertNote: "Turns lime water milky" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Sodium Carbonate Powder", formula: "Na₂CO₃", appearance: "White solid powder", solidColor: "#f8fafc" },
      addedSubstance: { name: "Dilute HCl", formula: "HCl(aq)", appearance: "Clear acid", actionLabel: "Add Dilute HCl", type: "liquid" },
      reactionResult: {
        liquidColor: "#f0fdf4",
        bubbles: true,
        gasName: "Carbon Dioxide (CO₂) brisk effervescence",
        tempChange: "neutral",
        tempDisplay: "Room Temp 24°C"
      }
    }
  },
  {
    id: "ch2-lime-water-milky-excess",
    chapter: "Acids, Bases and Salts",
    chapterNumber: 2,
    topic: "Acids with Carbonates & Hydrogencarbonates",
    title: "Lime Water Test for CO₂ and Action of Excess CO₂",
    reactants: ["Ca(OH)₂(aq)", "CO₂(g)"],
    products: ["CaCO₃(s)", "H₂O(l)"],
    equation: "Ca(OH)₂ + CO₂ → CaCO₃ + H₂O",
    balancedEquation: "Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s)↓ + H₂O(l)",
    reactionType: ["Precipitation", "Double Displacement"],
    conditions: ["Bubbling CO₂ through freshly prepared clear lime water"],
    observations: [
      "Initially, clear lime water turns cloudy milky white due to insoluble CaCO₃ precipitate.",
      "On passing EXCESS CO₂, the milky solution becomes completely CLEAR and colourless again due to soluble calcium hydrogencarbonate Ca(HCO₃)₂."
    ],
    explanation: "CO₂ reacts with Ca(OH)₂ to precipitate insoluble calcium carbonate (milky). Excess CO₂ in water forms carbonic acid which converts CaCO₃ into soluble calcium hydrogencarbonate [Ca(HCO₃)₂], making milkiness disappear.",
    molecularExplanation: "Initial: Ca²⁺ + CO₃²⁻ → CaCO₃(s)↓ (milky). Excess: CaCO₃(s) + H₂O(l) + CO₂(g) → Ca(HCO₃)₂(aq) (soluble ions).",
    experimentMode: "safe",
    safetyNotes: ["Safe classroom demonstration."],
    realLifeApplications: ["Formation of stalactites and stalagmites in limestone caves; temporary hardness in water."],
    ncertConcept: "Activity 2.5 follow-up: Essential CBSE board test for confirming carbon dioxide gas.",
    tags: ["Lime Water", "Milky White", "Excess CO₂", "Ca(HCO₃)₂", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "Why does the milkiness of lime water disappear on passing excess CO₂? Write equations. (Ans: Due to formation of soluble Ca(HCO₃)₂)",
    energyChange: "None",
    animationSteps: [
      { step: 1, description: "Bubble CO₂ gas into clear, colourless lime water [Ca(OH)₂]." },
      { step: 2, description: "Dense milky white precipitate of CaCO₃ clouds the solution." },
      { step: 3, description: "Continue bubbling excess CO₂; solution turns completely clear as Ca(HCO₃)₂ dissolves." }
    ],
    interactiveEntities: [
      { formula: "Ca(OH)₂", name: "Lime Water", role: "reactant", state: "aq", color: "#f8fafc" },
      { formula: "CO₂", name: "Carbon Dioxide", role: "reactant", state: "g", color: "#94a3b8" },
      { formula: "CaCO₃", name: "Calcium Carbonate", role: "product", state: "s", color: "#ffffff", ncertNote: "Milky insoluble precipitate" },
      { formula: "Ca(HCO₃)₂", name: "Calcium Hydrogencarbonate", role: "product", state: "aq", color: "#e0f2fe", ncertNote: "Clear water-soluble salt" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Clear Lime Water", formula: "Ca(OH)₂(aq)", appearance: "Transparent liquid", liquidColor: "#e0f2fe" },
      addedSubstance: { name: "CO₂ Stream", formula: "CO₂(g)", appearance: "Gas stream", actionLabel: "Pass CO₂ Gas", type: "gas" },
      reactionResult: {
        liquidColor: "#ffffff",
        hasPrecipitate: true,
        precipitateColor: "#ffffff",
        precipitateName: "Milky CaCO₃ (Clears on excess CO₂ to Ca(HCO₃)₂)",
        tempChange: "neutral",
        tempDisplay: "Room Temp 24°C"
      }
    }
  },
  {
    id: "ch2-acid-base-neutralisation",
    chapter: "Acids, Bases and Salts",
    chapterNumber: 2,
    topic: "Neutralisation Reactions",
    title: "Neutralisation of Sodium Hydroxide with Hydrochloric Acid",
    reactants: ["NaOH(aq)", "HCl(aq)"],
    products: ["NaCl(aq)", "H₂O(l)"],
    equation: "NaOH + HCl → NaCl + H₂O",
    balancedEquation: "NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l) + Heat",
    reactionType: ["Neutralisation", "Double Displacement"],
    conditions: ["Titration using phenolphthalein indicator"],
    observations: [
      "Dilute NaOH solution with phenolphthalein has an intense, vibrant pink colour.",
      "Adding dilute HCl drop by drop causes the pink colour to suddenly discharge into completely colourless at neutralisation.",
      "Adding a few drops of NaOH restores the pink colour immediately.",
      "The bottom of the test tube feels warm."
    ],
    explanation: "Hydroxide ions (OH⁻) from the base react with hydrogen ions (H⁺) from the acid to form neutral water molecules, cancelling each other's corrosive properties.",
    molecularExplanation: "H⁺(aq) + OH⁻(aq) → H₂O(l). The indicator changes structural form when pH crosses the transition range (8.2-10).",
    experimentMode: "safe",
    safetyNotes: ["Wear safety glasses during acid-base titration."],
    realLifeApplications: ["Antacids relieving acidity, neutralization of industrial acidic effluents, treating bee stings."],
    ncertConcept: "Activity 2.6: Base + Acid → Salt + Water; H⁺ + OH⁻ → H₂O.",
    tags: ["Neutralisation", "Phenolphthalein", "Pink to Colourless", "Activity 2.6"],
    boardImportance: "Very High",
    commonBoardQuestion: "Define a neutralisation reaction with an equation. Describe how phenolphthalein shows the end point. (Ans: Reaction of acid and base to give salt and water; pink to colourless)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Add 2 mL NaOH into test tube and add 2 drops phenolphthalein; bright pink colour appears." },
      { step: 2, description: "Add dilute HCl drop by drop while swirling." },
      { step: 3, description: "At equivalence point, the solution instantly turns completely colourless." }
    ],
    interactiveEntities: [
      { formula: "NaOH", name: "Sodium Hydroxide", role: "reactant", state: "aq", color: "#ec4899", ncertNote: "Turns phenolphthalein pink" },
      { formula: "HCl", name: "Hydrochloric Acid", role: "reactant", state: "aq", color: "#0284c7" },
      { formula: "NaCl", name: "Sodium Chloride", role: "product", state: "aq", color: "#f8fafc" },
      { formula: "H₂O", name: "Water", role: "product", state: "l", color: "#38bdf8" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "NaOH + Phenolphthalein", formula: "NaOH(aq) + Indicator", appearance: "Vibrant pink alkaline liquid", liquidColor: "#f43f5e" },
      addedSubstance: { name: "Dilute HCl Drops", formula: "HCl(aq)", appearance: "Acid dropper", actionLabel: "Add HCl Drops", type: "liquid" },
      reactionResult: {
        liquidColor: "#f8fafc",
        tempChange: "exothermic",
        tempDisplay: "Neutralised (pH 7.0, +6°C Rise)"
      }
    }
  },
  {
    id: "ch2-copper-oxide-acid",
    chapter: "Acids, Bases and Salts",
    chapterNumber: 2,
    topic: "Metallic Oxides with Acids",
    title: "Reaction of Copper(II) Oxide with Dilute Hydrochloric Acid",
    reactants: ["CuO(s)", "2HCl(aq)"],
    products: ["CuCl₂(aq)", "H₂O(l)"],
    equation: "CuO + 2HCl → CuCl₂ + H₂O",
    balancedEquation: "CuO(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l)",
    reactionType: ["Neutralisation", "Double Displacement"],
    conditions: ["Slow addition with continuous stirring in a beaker"],
    observations: [
      "The black copper(II) oxide powder dissolves gradually into the acid.",
      "The colorless acid solution turns into a striking, vivid blue-green colour.",
      "The blue-green colour is due to the formation of copper(II) chloride (CuCl₂)."
    ],
    explanation: "Metal oxides react with acids to form salt and water, exactly analogous to the reaction between a base and an acid. Therefore, metallic oxides are basic oxides.",
    molecularExplanation: "CuO(s) + 2H⁺(aq) → Cu²⁺(aq) + H₂O(l). The hydrated Cu²⁺ complex ions in the presence of Cl⁻ impart the distinctive blue-green hue.",
    experimentMode: "safe",
    safetyNotes: ["Safe simulation."],
    realLifeApplications: ["Cleaning tarnished copper vessels with lemon juice or tamarind (citric/tartaric acid dissolves basic copper carbonate/oxide layer)."],
    ncertConcept: "Activity 2.7: Metal oxide + Acid → Salt + Water; proves metallic oxides are basic in nature.",
    tags: ["CuO", "Basic Oxide", "Blue-Green Solution", "CuCl₂", "Activity 2.7"],
    boardImportance: "Very High",
    commonBoardQuestion: "Why are metallic oxides called basic oxides? Give an equation. (Ans: Because they react with acids to form salt and water)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Place black insoluble CuO powder in the bottom of a beaker." },
      { step: 2, description: "Add dilute hydrochloric acid slowly while stirring." },
      { step: 3, description: "Black solid dissolves and the solution transforms into a brilliant blue-green color." }
    ],
    interactiveEntities: [
      { formula: "CuO", name: "Copper(II) Oxide", role: "reactant", state: "s", color: "#1e293b", ncertNote: "Black basic metal oxide" },
      { formula: "HCl", name: "Hydrochloric Acid", role: "reactant", state: "aq", color: "#e0f2fe" },
      { formula: "CuCl₂", name: "Copper(II) Chloride", role: "product", state: "aq", color: "#0d9488", ncertNote: "Vivid blue-green solution" },
      { formula: "H₂O", name: "Water", role: "product", state: "l", color: "#38bdf8" }
    ],
    simulatorConfig: {
      apparatus: "beaker",
      primarySubstance: { name: "Black CuO Powder", formula: "CuO(s)", appearance: "Black powder", solidColor: "#1e293b" },
      addedSubstance: { name: "Dilute HCl", formula: "HCl(aq)", appearance: "Colorless acid", actionLabel: "Pour Dilute HCl", type: "liquid" },
      reactionResult: {
        liquidColor: "#0d9488",
        tempChange: "exothermic",
        tempDisplay: "Blue-green CuCl₂ (32°C)"
      }
    }
  },
  {
    id: "ch2-chlor-alkali-process",
    chapter: "Acids, Bases and Salts",
    chapterNumber: 2,
    topic: "Chemicals from Common Salt",
    title: "The Chlor-Alkali Process (Electrolysis of Brine)",
    reactants: ["2NaCl(aq)", "2H₂O(l)"],
    products: ["2NaOH(aq)", "Cl₂(g)", "H₂(g)"],
    equation: "NaCl + H₂O → NaOH + Cl₂ + H₂",
    balancedEquation: "2NaCl(aq) + 2H₂O(l) —(Electricity)→ 2NaOH(aq) + Cl₂(g)↑ + H₂(g)↑",
    reactionType: ["Electrolysis", "Decomposition", "Redox"],
    conditions: ["Electrolysis of saturated aqueous NaCl (brine) using membrane cell"],
    observations: [
      "Greenish-yellow chlorine gas with pungent bleach smell evolves at the ANODE (+).",
      "Colorless hydrogen gas bubbles vigorously at the CATHODE (-).",
      "Sodium hydroxide (alkali) solution forms near the cathode."
    ],
    explanation: "Named 'Chlor-Alkali' because the products are chlorine ('chlor') and sodium hydroxide ('alkali'). All three products (Cl₂, H₂, NaOH) are vital industrial building blocks.",
    molecularExplanation: "Anode: 2Cl⁻ → Cl₂ + 2e⁻ (Oxidation). Cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻ (Reduction). Na⁺ ions pair with OH⁻ in catholyte.",
    experimentMode: "simulation-only",
    safetyNotes: [
      "Chlorine gas is highly toxic and corrosive. Industrial process carried out with closed membrane cells."
    ],
    realLifeApplications: [
      "Chlorine for water disinfection, PVC, CFCs.",
      "Hydrogen for fuels, margarine, ammonia.",
      "NaOH for soap, detergents, paper making."
    ],
    ncertConcept: "Section 2.4.3 & Figure 2.8: Primary industrial manufacturing process from common salt.",
    tags: ["Chlor-Alkali", "Brine", "Anode Cl₂", "Cathode H₂", "NaOH", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "Why is the electrolysis of brine called the chlor-alkali process? Name the products formed at anode and cathode. (Ans: Chlor for Cl₂ at anode, alkali for NaOH near cathode; H₂ at cathode)",
    energyChange: "Endothermic",
    animationSteps: [
      { step: 1, description: "Fill membrane cell with saturated aqueous sodium chloride (brine)." },
      { step: 2, description: "Turn on electrolysis current: Cl₂ gas bubbles at anode; H₂ gas bubbles at cathode." },
      { step: 3, description: "Concentrated sodium hydroxide (NaOH) solution is drawn from cathode compartment." }
    ],
    interactiveEntities: [
      { formula: "NaCl", name: "Sodium Chloride (Brine)", role: "reactant", state: "aq", color: "#e2e8f0" },
      { formula: "NaOH", name: "Sodium Hydroxide", role: "product", state: "aq", color: "#3b82f6", ncertNote: "Forms near cathode; used in soaps" },
      { formula: "Cl₂", name: "Chlorine Gas", role: "product", state: "g", color: "#a3e635", ncertNote: "Given off at Anode (+)" },
      { formula: "H₂", name: "Hydrogen Gas", role: "product", state: "g", color: "#38bdf8", ncertNote: "Given off at Cathode (-)" }
    ],
    simulatorConfig: {
      apparatus: "electrolysis-cell",
      primarySubstance: { name: "Saturated Brine", formula: "2NaCl + 2H₂O", appearance: "Brine electrolyte", liquidColor: "#e0f2fe" },
      addedSubstance: { name: "Electrolytic DC Power", formula: "e⁻ Current", appearance: "High DC current", actionLabel: "Energize Electrodes", type: "liquid" },
      reactionResult: {
        liquidColor: "#bae6fd",
        bubbles: true,
        gasName: "Cl₂ (Anode) & H₂ (Cathode)",
        gasColor: "#bef264",
        tempChange: "neutral",
        tempDisplay: "Cell Operating (35°C)"
      }
    }
  },
  {
    id: "ch2-bleaching-powder-synthesis",
    chapter: "Acids, Bases and Salts",
    chapterNumber: 2,
    topic: "Chemicals from Common Salt",
    title: "Preparation of Bleaching Powder",
    reactants: ["Ca(OH)₂(s)", "Cl₂(g)"],
    products: ["CaOCl₂(s)", "H₂O(l)"],
    equation: "Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O",
    balancedEquation: "Ca(OH)₂(s) + Cl₂(g) → CaOCl₂(s) + H₂O(l)",
    reactionType: ["Combination", "Redox"],
    conditions: ["Action of dry chlorine gas on dry slaked lime [Ca(OH)₂]"],
    observations: [
      "White slaked lime absorbs chlorine gas.",
      "Forms yellowish-white powder having a strong, penetrating odor of chlorine."
    ],
    explanation: "Chlorine produced during chlor-alkali process is treated with dry slaked lime to manufacture bleaching powder [chemically Calcium hypochlorite / oxychloride, CaOCl₂].",
    molecularExplanation: "Chlorine oxidizes and incorporates into the calcium hydroxide lattice forming CaOCl₂ and water.",
    experimentMode: "simulation-only",
    safetyNotes: ["Chlorine gas is toxic; handled in closed industrial Hasenclever plant."],
    realLifeApplications: [
      "Bleaching cotton and linen in textile industry.",
      "Disinfecting drinking water to make it free from germs.",
      "Oxidizing agent in chemical manufacturing."
    ],
    ncertConcept: "Section 2.4.3: Action of chlorine on dry slaked lime yields bleaching powder (CaOCl₂).",
    tags: ["Bleaching Powder", "CaOCl₂", "Slaked Lime", "Disinfectant"],
    boardImportance: "High",
    commonBoardQuestion: "Name the substance which on treatment with chlorine yields bleaching powder. Write the equation. (Ans: Dry slaked lime Ca(OH)₂; Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Load dry slaked lime [Ca(OH)₂] powder into reactor." },
      { step: 2, description: "Pass chlorine gas (from chlor-alkali cell) over slaked lime." },
      { step: 3, description: "Obtain bleaching powder (CaOCl₂) with distinct chlorine scent." }
    ],
    interactiveEntities: [
      { formula: "Ca(OH)₂", name: "Dry Slaked Lime", role: "reactant", state: "s", color: "#f8fafc" },
      { formula: "Cl₂", name: "Chlorine Gas", role: "reactant", state: "g", color: "#a3e635" },
      { formula: "CaOCl₂", name: "Bleaching Powder", role: "product", state: "s", color: "#fef08a", ncertNote: "Calcium oxychloride, bleaching agent" }
    ],
    simulatorConfig: {
      apparatus: "china-dish",
      primarySubstance: { name: "Dry Slaked Lime", formula: "Ca(OH)₂", appearance: "White powder", solidColor: "#f8fafc" },
      addedSubstance: { name: "Chlorine Gas Stream", formula: "Cl₂", appearance: "Yellowish gas", actionLabel: "Pass Chlorine Gas", type: "gas" },
      reactionResult: {
        precipitateColor: "#fef9c3",
        hasPrecipitate: true,
        precipitateName: "Bleaching Powder (CaOCl₂)",
        gasName: "Chlorine odor",
        tempChange: "neutral",
        tempDisplay: "Room Temp 25°C"
      }
    }
  },
  {
    id: "ch2-baking-soda-thermal-decomposition",
    chapter: "Acids, Bases and Salts",
    chapterNumber: 2,
    topic: "Chemicals from Common Salt",
    title: "Thermal Decomposition of Baking Soda During Cooking",
    reactants: ["2NaHCO₃(s)"],
    products: ["Na₂CO₃(s)", "H₂O(l)", "CO₂(g)"],
    equation: "NaHCO₃ → Na₂CO₃ + H₂O + CO₂",
    balancedEquation: "2NaHCO₃(s) —(Heat)→ Na₂CO₃(s) + H₂O(l) + CO₂(g)↑",
    reactionType: ["Decomposition"],
    conditions: ["Heating during cooking or in a dry boiling tube"],
    observations: [
      "White baking soda powder releases tiny water droplets and carbon dioxide gas.",
      "Carbon dioxide gas causes cake and bread batter to rise, making them soft and spongy."
    ],
    explanation: "Sodium hydrogencarbonate (baking soda) is a mild, non-corrosive basic salt. On heating, it decomposes into sodium carbonate, steam, and carbon dioxide.",
    molecularExplanation: "2 NaHCO₃ molecules thermally release 1 molecule of CO₂ and 1 molecule of H₂O, leaving anhydrous Na₂CO₃.",
    experimentMode: "safe",
    safetyNotes: ["Safe domestic and laboratory reaction."],
    realLifeApplications: [
      "Baking cakes and breads.",
      "Active ingredient in antacids.",
      "Soda-acid fire extinguishers."
    ],
    ncertConcept: "Section 2.4.3: Decomposition of NaHCO₃ on heating during cooking.",
    tags: ["Baking Soda", "NaHCO₃", "Soft and Spongy", "CO₂", "Antacid"],
    boardImportance: "Very High",
    commonBoardQuestion: "What happens when baking soda is heated during cooking? Write the balanced chemical equation. (Ans: 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂)",
    energyChange: "Endothermic",
    animationSteps: [
      { step: 1, description: "Place white sodium hydrogencarbonate (baking soda) in test tube." },
      { step: 2, description: "Apply heat; carbon dioxide gas is expelled steadily." },
      { step: 3, description: "Residue of sodium carbonate remains behind; CO₂ causes dough expansion." }
    ],
    interactiveEntities: [
      { formula: "NaHCO₃", name: "Sodium Hydrogencarbonate", role: "reactant", state: "s", color: "#f8fafc", ncertNote: "Baking soda, mild basic salt" },
      { formula: "Na₂CO₃", name: "Sodium Carbonate", role: "product", state: "s", color: "#f1f5f9" },
      { formula: "CO₂", name: "Carbon Dioxide", role: "product", state: "g", color: "#94a3b8", ncertNote: "Makes cakes rise soft and spongy" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Baking Soda", formula: "NaHCO₃", appearance: "White powder", solidColor: "#f8fafc" },
      addedSubstance: { name: "Cooking Heat", formula: "Heat", appearance: "Flame", actionLabel: "Apply Heat", type: "heat" },
      reactionResult: {
        bubbles: true,
        gasName: "CO₂ (causes bread/cake to rise spongy)",
        tempChange: "endothermic",
        tempDisplay: "Cooking Temp 150°C"
      }
    }
  },
  {
    id: "ch2-plaster-of-paris-gypsum",
    chapter: "Acids, Bases and Salts",
    chapterNumber: 2,
    topic: "Water of Crystallisation",
    title: "Formation and Setting of Plaster of Paris (POP)",
    reactants: ["CaSO₄·2H₂O(s)"],
    products: ["CaSO₄·½H₂O(s)", "1½H₂O(g)"],
    equation: "CaSO₄·2H₂O → CaSO₄·½H₂O + 1½H₂O",
    balancedEquation: "CaSO₄·2H₂O(s) —(373 K / 100°C)→ CaSO₄·½H₂O(s) + 1½H₂O",
    reactionType: ["Decomposition", "Dehydration"],
    conditions: ["Carefully heating gypsum at exactly 373 K (100°C)"],
    observations: [
      "Gypsum loses three-fourths of its water of crystallisation to form a fine white powder (Plaster of Paris).",
      "On re-adding water to Plaster of Paris, it sets into a rock-hard solid mass of gypsum within 10-15 minutes with slight expansion and heat release."
    ],
    explanation: "Heating gypsum at 373 K yields calcium sulphate hemihydrate (CaSO₄·½H₂O). Two formula units of CaSO₄ share one water molecule. On adding water, POP rapidly re-hydrates back to interlocking gypsum crystals.",
    molecularExplanation: "CaSO₄·½H₂O + 1½ H₂O → CaSO₄·2H₂O. The needles of monoclinic gypsum interlock into an unyielding rigid stone.",
    experimentMode: "safe",
    safetyNotes: [
      "Store Plaster of Paris in moisture-proof containers to prevent premature hardening.",
      "Temperature must not exceed 373 K, or dead burnt plaster (anhydrous CaSO₄) forms which does not set with water."
    ],
    realLifeApplications: [
      "Orthopedic casts supporting fractured bones in position.",
      "Making decorative ceiling moldings, toys, statues, and smooth surfaces."
    ],
    ncertConcept: "Section 2.4.4: Plaster of Paris formation from Gypsum and reverse setting reaction.",
    tags: ["Plaster of Paris", "Gypsum", "373 K", "CaSO₄·½H₂O", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "Why should Plaster of Paris be stored in a moisture-proof container? Write the reaction for its setting with water. (Ans: It absorbs moisture and turns into hard solid gypsum)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Heat gypsum (CaSO₄·2H₂O) at controlled 373 K to produce white POP powder." },
      { step: 2, description: "Mix POP powder with 1.5 parts water; a workable paste forms." },
      { step: 3, description: "Within 10 minutes, the paste sets hard with slight expansion as gypsum reforms." }
    ],
    interactiveEntities: [
      { formula: "CaSO₄·2H₂O", name: "Gypsum", role: "reactant", state: "s", color: "#f1f5f9", ncertNote: "Mineral with 2 water molecules of crystallisation" },
      { formula: "CaSO₄·½H₂O", name: "Plaster of Paris (POP)", role: "product", state: "s", color: "#ffffff", ncertNote: "Calcium sulphate hemihydrate" }
    ],
    simulatorConfig: {
      apparatus: "beaker",
      primarySubstance: { name: "Plaster of Paris Powder", formula: "CaSO₄·½H₂O", appearance: "Fine white powder", solidColor: "#ffffff" },
      addedSubstance: { name: "Water", formula: "1½ H₂O", appearance: "Water", actionLabel: "Add Water & Set", type: "liquid" },
      reactionResult: {
        precipitateColor: "#f1f5f9",
        hasPrecipitate: true,
        precipitateName: "Hard Set Gypsum (CaSO₄·2H₂O)",
        tempChange: "exothermic",
        tempDisplay: "Hard Solidifies (Warm +5°C)"
      }
    },
    quiz: [
      {
        question: "At what temperature is gypsum heated to prepare Plaster of Paris?",
        options: ["273 K", "373 K", "473 K", "100 K"],
        answer: "373 K",
        explanation: "Gypsum is heated at 373 K (100°C) to lose 1½ molecules of water and form calcium sulphate hemihydrate."
      }
    ]
  },
  {
    id: "ch2-copper-sulphate-crystallisation-water",
    chapter: "Acids, Bases and Salts",
    chapterNumber: 2,
    topic: "Water of Crystallisation",
    title: "Loss of Water of Crystallisation from Hydrated Copper Sulphate",
    reactants: ["CuSO₄·5H₂O(s)"],
    products: ["CuSO₄(s)", "5H₂O(g)"],
    equation: "CuSO₄·5H₂O → CuSO₄ + 5H₂O",
    balancedEquation: "CuSO₄·5H₂O(s) —(Heat)→ CuSO₄(s) + 5H₂O(g)",
    reactionType: ["Decomposition", "Dehydration"],
    conditions: ["Heating blue vitriol in a dry boiling tube"],
    observations: [
      "Vibrant blue crystals of copper sulphate turn into an anhydrous chalky white powder on heating.",
      "Tiny droplets of water condense on the cooler upper inner walls of the boiling tube.",
      "Adding 2-3 drops of water to the white powder restores the vivid blue colour instantly."
    ],
    explanation: "Copper sulphate crystals contain 5 molecules of water of crystallisation per formula unit (CuSO₄·5H₂O). Heating expels this coordinated water, collapsing the color-producing ligand field. Adding water restores the coordination and blue color.",
    molecularExplanation: "CuSO₄·5H₂O (Blue crystal lattice) ⇌ CuSO₄ (White anhydrous) + 5H₂O.",
    experimentMode: "safe",
    safetyNotes: ["Boiling tube must be dry before starting heating."],
    realLifeApplications: ["Anhydrous copper sulphate is used as a sensitive chemical test for detecting presence of water."],
    ncertConcept: "Activity 2.15 & Figure 2.9: Proves that crystals of salts which seem dry actually contain water of crystallisation.",
    tags: ["CuSO₄·5H₂O", "Water of Crystallisation", "Blue to White", "Activity 2.15"],
    boardImportance: "Very High",
    commonBoardQuestion: "Are the crystals of salts really dry? Explain with reference to copper sulphate crystals. (Ans: No, they contain 5 molecules of water of crystallisation; turn blue on re-adding water)",
    energyChange: "Endothermic",
    animationSteps: [
      { step: 1, description: "Place sparkling blue CuSO₄·5H₂O crystals in dry test tube." },
      { step: 2, description: "Heat over flame; crystals turn white as water droplets condense on tube walls." },
      { step: 3, description: "Add 2-3 drops of water to white anhydrous powder; blue colour flashes back." }
    ],
    interactiveEntities: [
      { formula: "CuSO₄·5H₂O", name: "Hydrated Copper Sulphate", role: "reactant", state: "s", color: "#0284c7", ncertNote: "Contains 5 molecules water of crystallisation" },
      { formula: "CuSO₄", name: "Anhydrous Copper Sulphate", role: "product", state: "s", color: "#f8fafc", ncertNote: "White powder" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Blue Vitriol Crystals", formula: "CuSO₄·5H₂O", appearance: "Deep blue crystals", solidColor: "#0284c7" },
      addedSubstance: { name: "Flame Heat", formula: "Heat", appearance: "Heating flame", actionLabel: "Heat Crystals", type: "heat" },
      reactionResult: {
        precipitateColor: "#ffffff",
        hasPrecipitate: true,
        precipitateName: "White Anhydrous CuSO₄ (Water Droplets on Tube)",
        tempChange: "endothermic",
        tempDisplay: "Test Tube 180°C"
      }
    }
  }
];
