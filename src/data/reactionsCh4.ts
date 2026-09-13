import { Reaction } from "../types";

export const CHAPTER_4_REACTIONS: Reaction[] = [
  {
    id: "ch4-methane-combustion",
    chapter: "Carbon and its Compounds",
    chapterNumber: 4,
    topic: "Chemical Properties of Carbon Compounds",
    title: "Complete Combustion of Methane (Natural Gas)",
    reactants: ["CH₄(g)", "2O₂(g)"],
    products: ["CO₂(g)", "2H₂O(g)"],
    equation: "CH₄ + 2O₂ → CO₂ + 2H₂O",
    balancedEquation: "CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g) + Heat and Light",
    reactionType: ["Combustion", "Oxidation", "Exothermic"],
    conditions: ["Sufficient oxygen/air supply, burner ignition"],
    observations: [
      "Burns with a clean, clear, non-sooty BLUE flame.",
      "Produces copious amounts of thermal heat and no black smoke deposits on utensils."
    ],
    explanation: "Saturated hydrocarbons burn with a clean blue flame in sufficient supply of air. Carbon and hydrogen are fully oxidized to carbon dioxide and steam, releasing large enthalpy.",
    molecularExplanation: "C-H single bonds break; C bonds with 2 oxygen atoms to form linear O=C=O, while 4 H atoms form two bent H-O-H molecules.",
    experimentMode: "safe",
    safetyNotes: ["Safe domestic LPG / CNG burner simulation."],
    realLifeApplications: ["Cooking gas (PNG/CNG), domestic home heating, thermal power stations."],
    ncertConcept: "Section 4.3.1 & Activity 4.4: Clean blue flame with sufficient air vs yellow sooty flame with limited air.",
    tags: ["Methane", "Combustion", "Blue Flame", "Exothermic", "CNG"],
    boardImportance: "High",
    commonBoardQuestion: "Why do saturated hydrocarbons give a clean blue flame while unsaturated hydrocarbons give a yellow sooty flame? (Ans: Saturated hydrocarbons have lower carbon percentage and undergo complete combustion)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Feed methane (CH₄) gas through burner nozzle." },
      { step: 2, description: "Open air inlet collar to provide abundant oxygen." },
      { step: 3, description: "Gas burns with a clear, non-sooty intense blue flame, generating CO₂ and H₂O." }
    ],
    interactiveEntities: [
      { formula: "CH₄", name: "Methane", role: "reactant", state: "g", color: "#60a5fa", ncertNote: "Major component of CNG and biogas" },
      { formula: "O₂", name: "Oxygen Gas", role: "reactant", state: "g", color: "#38bdf8" },
      { formula: "CO₂", name: "Carbon Dioxide", role: "product", state: "g", color: "#94a3b8" },
      { formula: "H₂O", name: "Water Vapour", role: "product", state: "g", color: "#93c5fd" }
    ],
    simulatorConfig: {
      apparatus: "conical-flask",
      primarySubstance: { name: "Methane Gas Jet", formula: "CH₄", appearance: "Colorless combustible gas", liquidColor: "#e0f2fe" },
      addedSubstance: { name: "Abundant Oxygen", formula: "2O₂ + Spark", appearance: "Air intake", actionLabel: "Ignite Burner", type: "heat" },
      reactionResult: {
        flameColor: "#3b82f6",
        smokeColor: "transparent",
        tempChange: "exothermic",
        tempDisplay: "Clean Blue Flame (~1300°C)"
      }
    }
  },
  {
    id: "ch4-ethanol-oxidation-kmno4",
    chapter: "Carbon and its Compounds",
    chapterNumber: 4,
    topic: "Oxidation of Carbon Compounds",
    title: "Oxidation of Ethanol to Ethanoic Acid Using Alkaline KMnO₄",
    reactants: ["CH₃CH₂OH(l)", "2[O]"],
    products: ["CH₃COOH(l)", "H₂O(l)"],
    equation: "CH₃CH₂OH + 2[O] → CH₃COOH + H₂O",
    balancedEquation: "CH₃CH₂OH(l) + 2[O] —(Alkaline KMnO₄ + Heat)→ CH₃COOH(l) + H₂O(l)",
    reactionType: ["Oxidation", "Redox"],
    conditions: ["Gentle heating in a warm water bath with 5% alkaline KMnO₄"],
    observations: [
      "Initially, the deep pink/purple color of alkaline KMnO₄ discharges and vanishes immediately as it oxidizes ethanol.",
      "When ethanol is completely oxidized, subsequent excess drops of KMnO₄ retain their characteristic persistent purple color."
    ],
    explanation: "Alkaline potassium permanganate acts as a strong oxidising agent, transferring nascent oxygen to the -CH₂OH primary alcohol group to convert it into a -COOH carboxylic acid group.",
    molecularExplanation: "Ethanol loses 2 hydrogen atoms and gains 1 oxygen atom: CH₃CH₂OH + 2[O] → CH₃COOH + H₂O.",
    experimentMode: "safe",
    safetyNotes: [
      "Ethanol is flammable. Always heat in a gentle warm water bath, NEVER directly over an open flame."
    ],
    realLifeApplications: ["Production of vinegar, laboratory synthesis of carboxylic acids, breathalyzer testing chemistry."],
    ncertConcept: "Activity 4.5: Definition of oxidising agents (alkaline KMnO₄ or acidified K₂Cr₂O₇).",
    tags: ["Ethanol", "Oxidation", "Alkaline KMnO₄", "Ethanoic Acid", "Activity 4.5", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "Why is the conversion of ethanol to ethanoic acid considered an oxidation reaction? Name the reagent used. (Ans: Oxygen is added / hydrogen removed; Alkaline KMnO₄ or acidified K₂Cr₂O₇)",
    energyChange: "Endothermic",
    animationSteps: [
      { step: 1, description: "Warm 3 mL ethanol in a test tube immersed in water bath." },
      { step: 2, description: "Add drops of deep purple alkaline KMnO₄; color decolourizes as ethanol oxidizes." },
      { step: 3, description: "Once oxidation to ethanoic acid completes, purple color persists." }
    ],
    interactiveEntities: [
      { formula: "CH₃CH₂OH", name: "Ethanol", role: "reactant", state: "l", color: "#e2e8f0", ncertNote: "Drinking alcohol / industrial solvent" },
      { formula: "KMnO₄", name: "Alkaline KMnO₄", role: "catalyst", state: "aq", color: "#a855f7", ncertNote: "Strong oxidising agent (deep purple)" },
      { formula: "CH₃COOH", name: "Ethanoic Acid (Acetic Acid)", role: "product", state: "l", color: "#f8fafc", ncertNote: "Carboxylic acid, vinegar smell" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Warm Ethanol", formula: "CH₃CH₂OH", appearance: "Clear liquid in water bath", liquidColor: "#f8fafc" },
      addedSubstance: { name: "Purple KMnO₄ Drops", formula: "Alkaline KMnO₄", appearance: "Deep purple solution", actionLabel: "Add KMnO₄ Drops", type: "liquid" },
      reactionResult: {
        liquidColor: "#f8fafc",
        tempChange: "endothermic",
        tempDisplay: "Water Bath 60°C"
      },
      molecularScene: {
        description: "Alkaline KMnO₄ inserts oxygen into ethanol, producing ethanoic acid and water.",
        reactants: [{ name: "CH₃CH₂OH", formula: "Ethanol", count: 1, color: "#38bdf8" }, { name: "KMnO₄", formula: "2[O]", count: 1, color: "#a855f7" }],
        products: [{ name: "CH₃COOH", formula: "Ethanoic Acid", count: 1, color: "#f43f5e" }, { name: "H₂O", formula: "H₂O", count: 1, color: "#60a5fa" }],
        mechanism: "oxidize"
      }
    },
    quiz: [
      {
        question: "Which reagent acts as the oxidising agent in the conversion of ethanol to ethanoic acid?",
        options: ["Concentrated H₂SO₄", "Alkaline KMnO₄", "Nickel catalyst", "Sodium metal"],
        answer: "Alkaline KMnO₄",
        explanation: "Alkaline KMnO₄ (or acidified K₂Cr₂O₇) provides nascent oxygen to oxidise ethanol."
      }
    ]
  },
  {
    id: "ch4-hydrogenation-addition",
    chapter: "Carbon and its Compounds",
    chapterNumber: 4,
    topic: "Addition Reaction",
    title: "Hydrogenation of Unsaturated Hydrocarbons (Vegetable Oils)",
    reactants: ["R₂C=CR₂(l)", "H₂(g)"],
    products: ["R₂CH-CHR₂(s)"],
    equation: "R₂C=CR₂ + H₂ → R₂CH-CHR₂",
    balancedEquation: "CH₂=CH₂(g) + H₂(g) —(Ni Catalyst / 200°C)→ CH₃-CH₃(g)",
    reactionType: ["Addition"],
    conditions: ["Finely divided Nickel (Ni) or Palladium catalyst, heated under pressure"],
    observations: [
      "Liquid unsaturated vegetable oil absorbs hydrogen gas across carbon-carbon double bonds.",
      "The unsaturated oil solidifies into saturated semi-solid vegetable ghee (vanaspati).",
      "Decolourization of bromine water can test loss of unsaturation."
    ],
    explanation: "Unsaturated hydrocarbons contain reactive double or triple bonds. They add hydrogen atoms in the presence of nickel catalyst to form fully saturated single-bonded hydrocarbons.",
    molecularExplanation: "The pi (π) bond in C=C breaks; each sp² carbon binds one hydrogen atom, becoming tetrahedral sp³ alkane carbons.",
    experimentMode: "simulation-only",
    safetyNotes: ["High pressure industrial hydrogenation process."],
    realLifeApplications: ["Manufacture of vanaspati ghee from liquid sunflower / groundnut oil."],
    ncertConcept: "Section 4.3.3: Industrial addition reaction; animal fats contain saturated chains while vegetable oils contain unsaturated chains.",
    tags: ["Addition Reaction", "Hydrogenation", "Nickel Catalyst", "Vegetable Oil", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "What is hydrogenation? Mention its industrial application and the catalyst used. (Ans: Addition of H₂ to unsaturated compounds using Ni catalyst; converts vegetable oils to fats)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Flow unsaturated ethene / liquid vegetable oil into catalytic reactor." },
      { step: 2, description: "Introduce hydrogen gas over heated nickel (Ni) catalyst bed." },
      { step: 3, description: "Double bonds open up to accept hydrogen, producing saturated ethane / solid vanaspati." }
    ],
    interactiveEntities: [
      { formula: "CH₂=CH₂", name: "Ethene (Unsaturated)", role: "reactant", state: "g", color: "#f59e0b", ncertNote: "Contains C=C double bond" },
      { formula: "H₂", name: "Hydrogen Gas", role: "reactant", state: "g", color: "#38bdf8" },
      { formula: "Ni", name: "Nickel Catalyst", role: "catalyst", state: "s", color: "#64748b" },
      { formula: "CH₃-CH₃", name: "Ethane (Saturated)", role: "product", state: "g", color: "#10b981", ncertNote: "Contains only C-C single bonds" }
    ],
    simulatorConfig: {
      apparatus: "conical-flask",
      primarySubstance: { name: "Vegetable Oil (Unsaturated)", formula: "R₂C=CR₂", appearance: "Golden viscous liquid", liquidColor: "#fef08a" },
      addedSubstance: { name: "H₂ Gas + Ni Catalyst", formula: "H₂ / Ni", appearance: "Catalyst slurry", actionLabel: "Hydrogenate", type: "gas" },
      reactionResult: {
        liquidColor: "#fef9c3",
        precipitateColor: "#f8fafc",
        hasPrecipitate: true,
        precipitateName: "Solid Saturated Fat (Vanaspati)",
        tempChange: "neutral",
        tempDisplay: "Hydrogenator 200°C"
      }
    }
  },
  {
    id: "ch4-substitution-chlorination",
    chapter: "Carbon and its Compounds",
    chapterNumber: 4,
    topic: "Substitution Reaction",
    title: "Substitution Reaction of Methane with Chlorine in Sunlight",
    reactants: ["CH₄(g)", "Cl₂(g)"],
    products: ["CH₃Cl(g)", "HCl(g)"],
    equation: "CH₄ + Cl₂ → CH₃Cl + HCl",
    balancedEquation: "CH₄(g) + Cl₂(g) —(Sunlight / hν)→ CH₃Cl(g) + HCl(g)",
    reactionType: ["Substitution", "Photochemical"],
    conditions: ["Diffused sunlight / Ultraviolet light radiation"],
    observations: [
      "Greenish-yellow tint of chlorine gas steadily fades in sunlight.",
      "Acidic hydrogen chloride fumes are formed that turn moist blue litmus paper red."
    ],
    explanation: "Saturated hydrocarbons are generally unreactive, but in the presence of sunlight, highly reactive chlorine radicals replace hydrogen atoms one by one in succession.",
    molecularExplanation: "Light homolytically cleaves Cl-Cl to generate Cl· free radicals. A chlorine atom abstracts H from CH₄ to make ·CH₃ and HCl; ·CH₃ combines with Cl₂ to make CH₃Cl.",
    experimentMode: "simulation-only",
    safetyNotes: ["Simulation only; mixture can explode in direct harsh sunlight."],
    realLifeApplications: ["Production of methyl chloride, chloroform (solvent), and chlorofluorocarbons."],
    ncertConcept: "Section 4.3.4: Substitution reaction where one type of atom takes the place of another.",
    tags: ["Substitution", "Methane", "Chlorine", "Sunlight", "Chloromethane"],
    boardImportance: "High",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Combine methane and greenish chlorine gas in reaction vessel." },
      { step: 2, description: "Irradiate with diffused sunlight; photochemical dissociation triggers." },
      { step: 3, description: "Chlorine replaces a hydrogen atom, yielding chloromethane (CH₃Cl) and HCl." }
    ],
    interactiveEntities: [
      { formula: "CH₄", name: "Methane", role: "reactant", state: "g", color: "#60a5fa" },
      { formula: "Cl₂", name: "Chlorine Gas", role: "reactant", state: "g", color: "#a3e635" },
      { formula: "CH₃Cl", name: "Chloromethane", role: "product", state: "g", color: "#93c5fd" },
      { formula: "HCl", name: "Hydrogen Chloride Gas", role: "product", state: "g", color: "#cbd5e1" }
    ],
    simulatorConfig: {
      apparatus: "conical-flask",
      primarySubstance: { name: "CH₄ + Cl₂ Gas Mix", formula: "CH₄ + Cl₂", appearance: "Pale greenish gas", liquidColor: "#ecfccb" },
      addedSubstance: { name: "Sunlight Irradiation", formula: "hν Sunlight", appearance: "Light beam", actionLabel: "Expose to Sunlight", type: "heat" },
      reactionResult: {
        liquidColor: "transparent",
        bubbles: true,
        gasName: "Chloromethane (CH₃Cl) + HCl Gas",
        tempChange: "neutral",
        tempDisplay: "Photochemical Reaction"
      }
    }
  },
  {
    id: "ch4-ethanol-sodium-metal",
    chapter: "Carbon and its Compounds",
    chapterNumber: 4,
    topic: "Properties of Ethanol",
    title: "Reaction of Ethanol with Sodium Metal",
    reactants: ["2CH₃CH₂OH(l)", "2Na(s)"],
    products: ["2CH₃CH₂O⁻Na⁺(aq)", "H₂(g)"],
    equation: "C₂H₅OH + Na → C₂H₅ONa + H₂",
    balancedEquation: "2CH₃CH₂OH(l) + 2Na(s) → 2CH₃CH₂O⁻Na⁺(aq) + H₂(g)↑",
    reactionType: ["Displacement", "Redox"],
    conditions: ["Dropping rice-grain sized sodium into dry absolute alcohol in a test tube"],
    observations: [
      "Sodium effervesces gently without catching fire, moving smoothly on the bottom.",
      "Steady stream of tiny bubbles of hydrogen gas evolves.",
      "The gas burns with a pop sound when tested with a burning splinter.",
      "Yields a clear solution of sodium ethoxide."
    ],
    explanation: "Active metals like sodium react with alcohols by displacing the acidic hydroxylic proton, producing sodium ethoxide and hydrogen gas. The reaction is far milder than with water.",
    molecularExplanation: "2 Na atoms donate electrons to 2 acidic protons of the O-H group in ethanol: 2 R-OH + 2 Na → 2 R-O⁻Na⁺ + H₂.",
    experimentMode: "teacher-demo",
    safetyNotes: [
      "Use absolute (dry) alcohol; water contamination causes violent sputtering.",
      "Use small sodium piece under instructor supervision."
    ],
    realLifeApplications: ["Preparation of sodium ethoxide strong organic base for synthetic chemistries."],
    ncertConcept: "Activity 4.6 & Section 4.4.1: Reaction of ethanol with sodium used to test alcohols.",
    tags: ["Ethanol", "Sodium", "Sodium Ethoxide", "Pop Sound", "Activity 4.6"],
    boardImportance: "Very High",
    commonBoardQuestion: "Write the equation for reaction of ethanol with sodium metal. How do you confirm the gas evolved? (Ans: 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂; burns with pop sound)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Take 3 mL absolute ethanol in a clean dry test tube." },
      { step: 2, description: "Drop a small, dry piece of sodium metal into the alcohol." },
      { step: 3, description: "Sodium fizzes smoothly, evolving H₂ gas which pops with a burning splinter." }
    ],
    interactiveEntities: [
      { formula: "CH₃CH₂OH", name: "Absolute Ethanol", role: "reactant", state: "l", color: "#f8fafc" },
      { formula: "Na", name: "Sodium Metal", role: "reactant", state: "s", color: "#cbd5e1" },
      { formula: "CH₃CH₂O⁻Na⁺", name: "Sodium Ethoxide", role: "product", state: "aq", color: "#f1f5f9" },
      { formula: "H₂", name: "Hydrogen Gas", role: "product", state: "g", color: "#38bdf8" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Absolute Ethanol", formula: "CH₃CH₂OH", appearance: "Clear liquid", liquidColor: "#e0f2fe" },
      addedSubstance: { name: "Sodium Metal Piece", formula: "Na(s)", appearance: "Silvery pellet", actionLabel: "Drop Sodium Piece", type: "solid" },
      reactionResult: {
        liquidColor: "#f8fafc",
        bubbles: true,
        gasName: "Hydrogen Gas (H₂)",
        soundEffect: "Pop sound on flame",
        tempChange: "exothermic",
        tempDisplay: "Mild Warm (+8°C)"
      }
    }
  },
  {
    id: "ch4-ethanol-dehydration-ethene",
    chapter: "Carbon and its Compounds",
    chapterNumber: 4,
    topic: "Properties of Ethanol",
    title: "Dehydration of Ethanol to Ethene with Hot Concentrated H₂SO₄",
    reactants: ["CH₃CH₂OH(l)"],
    products: ["CH₂=CH₂(g)", "H₂O(l)"],
    equation: "CH₃CH₂OH → CH₂=CH₂ + H₂O",
    balancedEquation: "CH₃CH₂OH(l) —(Hot Conc. H₂SO₄ at 443 K / 170°C)→ CH₂=CH₂(g)↑ + H₂O(l)",
    reactionType: ["Dehydration", "Elimination"],
    conditions: ["Heating with EXCESS concentrated sulphuric acid at exactly 443 K (170°C)"],
    observations: [
      "Effervescence of gaseous unsaturated alkene (ethene).",
      "Gas collected decolourizes reddish-brown bromine water, proving unsaturation."
    ],
    explanation: "Concentrated sulphuric acid acts as a powerful dehydrating agent, abstracting a molecule of water from ethanol to generate unsaturated ethene.",
    molecularExplanation: "Protonation of -OH to -OH₂⁺ followed by loss of H₂O leaves a carbocation intermediate; loss of adjacent H⁺ creates the C=C double bond.",
    experimentMode: "simulation-only",
    safetyNotes: [
      "Concentrated sulphuric acid at 170°C is extraordinarily corrosive. Simulated demonstration only."
    ],
    realLifeApplications: ["Petrochemical manufacture of polyethylene plastic monomer."],
    ncertConcept: "Section 4.4.1 (ii): Role of concentrated H₂SO₄ as dehydrating agent.",
    tags: ["Dehydration", "Ethanol", "Ethene", "443 K", "Conc H₂SO₄", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "What happens when ethanol is heated with excess concentrated sulphuric acid at 443 K? What is the role of sulphuric acid? (Ans: Dehydrated to ethene; acts as dehydrating agent)",
    energyChange: "Endothermic",
    animationSteps: [
      { step: 1, description: "Mix ethanol with excess concentrated sulphuric acid in distillation flask." },
      { step: 2, description: "Heat mixture precisely to 443 K (170°C)." },
      { step: 3, description: "Water molecule is stripped off, evolving ethene (CH₂=CH₂) gas." }
    ],
    interactiveEntities: [
      { formula: "CH₃CH₂OH", name: "Ethanol", role: "reactant", state: "l", color: "#f8fafc" },
      { formula: "H₂SO₄", name: "Hot Conc. H₂SO₄", role: "catalyst", state: "l", color: "#f59e0b", ncertNote: "Dehydrating agent (removes water)" },
      { formula: "CH₂=CH₂", name: "Ethene Gas", role: "product", state: "g", color: "#10b981", ncertNote: "Unsaturated alkene gas" },
      { formula: "H₂O", name: "Water", role: "product", state: "l", color: "#38bdf8" }
    ],
    simulatorConfig: {
      apparatus: "conical-flask",
      primarySubstance: { name: "Ethanol + Conc H₂SO₄", formula: "C₂H₅OH + H₂SO₄", appearance: "Viscous pale brown liquid", liquidColor: "#fed7aa" },
      addedSubstance: { name: "Heating to 443 K", formula: "443 K Heat", appearance: "Sand bath flame", actionLabel: "Heat to 443 K", type: "heat" },
      reactionResult: {
        bubbles: true,
        gasName: "Ethene (CH₂=CH₂) gas",
        tempChange: "endothermic",
        tempDisplay: "Maintained at 443 K (170°C)"
      }
    }
  },
  {
    id: "ch4-esterification-reaction",
    chapter: "Carbon and its Compounds",
    chapterNumber: 4,
    topic: "Reactions of Ethanoic Acid",
    title: "Esterification: Reaction of Ethanoic Acid with Ethanol",
    reactants: ["CH₃COOH(l)", "CH₃CH₂OH(l)"],
    products: ["CH₃COOCH₂CH₃(l)", "H₂O(l)"],
    equation: "CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O",
    balancedEquation: "CH₃COOH(l) + CH₃CH₂OH(l) —(Acid Catalyst / Heat)→ CH₃COOCH₂CH₃(l) + H₂O(l)",
    reactionType: ["Esterification", "Condensation"],
    conditions: ["Warming in a water bath for 5 minutes with a few drops of concentrated H₂SO₄"],
    observations: [
      "On pouring the warmed reaction mixture into a beaker containing water, a pleasant, sweet fruity smell is instantly perceived.",
      "A lighter, oily layer of ethyl ethanoate ester floats on the water."
    ],
    explanation: "Carboxylic acids react with alcohols in the presence of an acid catalyst to form sweet-smelling organic compounds called esters.",
    molecularExplanation: "The -OH group from ethanoic acid and the -H from ethanol condense to form water, linking the acyl group to ethoxy: CH₃-C(=O)-O-CH₂CH₃.",
    experimentMode: "safe",
    safetyNotes: [
      "Always warm in a water bath because ethanol and ester are volatile and flammable.",
      "Gently waft the sweet scent with cupped hand to detect the fragrance."
    ],
    realLifeApplications: [
      "Perfumes, cosmetics, fruit flavoring agents (apple, pear, pineapple flavors), and nail polish removers."
    ],
    ncertConcept: "Activity 4.8 & Figure 4.11: Esterification reaction producing sweet-smelling ester.",
    tags: ["Esterification", "Sweet Fruity Smell", "Perfumes", "Ethyl Ethanoate", "Activity 4.8", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "Describe an activity to demonstrate esterification. Write the balanced equation and one use of esters. (Ans: Heat CH₃COOH + C₂H₅OH with acid catalyst; sweet fruity smell; used in perfumes/flavorings)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Combine 1 mL glacial acetic acid and 1 mL ethanol with a few drops conc. H₂SO₄." },
      { step: 2, description: "Warm the test tube inside a water bath for 5 minutes." },
      { step: 3, description: "Pour into water beaker; notice distinct delightful fruity fragrance." }
    ],
    interactiveEntities: [
      { formula: "CH₃COOH", name: "Glacial Ethanoic Acid", role: "reactant", state: "l", color: "#f8fafc", ncertNote: "Acetic acid, pungent vinegar aroma" },
      { formula: "CH₃CH₂OH", name: "Absolute Ethanol", role: "reactant", state: "l", color: "#e2e8f0" },
      { formula: "H₂SO₄", name: "Concentrated H₂SO₄", role: "catalyst", state: "l", color: "#f59e0b", ncertNote: "Acid catalyst and water remover" },
      { formula: "CH₃COOC₂H₅", name: "Ethyl Ethanoate (Ester)", role: "product", state: "l", color: "#fbcfe8", ncertNote: "Sweet, fruity-smelling ester" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Acid + Alcohol Mixture", formula: "CH₃COOH + C₂H₅OH", appearance: "Colorless mixture in water bath", liquidColor: "#e0f2fe" },
      addedSubstance: { name: "Acid Drops + Warmth", formula: "H₂SO₄ Catalyst", appearance: "Catalyst drops", actionLabel: "Warm in Water Bath", type: "liquid" },
      reactionResult: {
        liquidColor: "#fdf2f8",
        tempChange: "neutral",
        tempDisplay: "Water Bath 70°C",
        soundEffect: "Sweet fruity perfume aroma detected!"
      },
      molecularScene: {
        description: "Ethanoic acid joins ethanol with release of water to synthesize ethyl ethanoate.",
        reactants: [{ name: "CH₃COOH", formula: "Ethanoic Acid", count: 1, color: "#f43f5e" }, { name: "C₂H₅OH", formula: "Ethanol", count: 1, color: "#38bdf8" }],
        products: [{ name: "CH₃COOC₂H₅", formula: "Ethyl Ethanoate", count: 1, color: "#ec4899" }, { name: "H₂O", formula: "H₂O", count: 1, color: "#60a5fa" }],
        mechanism: "condense"
      }
    },
    quiz: [
      {
        question: "What characteristic physical property identifies the formation of an ester?",
        options: ["Pungent suffocating smell", "Sweet, fruity smell", "Rotten egg smell", "Smell of burning sulphur"],
        answer: "Sweet, fruity smell",
        explanation: "Esters have characteristic pleasant, sweet, fruit-like fragrances."
      }
    ]
  },
  {
    id: "ch4-saponification-soap",
    chapter: "Carbon and its Compounds",
    chapterNumber: 4,
    topic: "Reactions of Ethanoic Acid & Soaps",
    title: "Saponification: Preparation of Soap from Ester and Alkali",
    reactants: ["CH₃COOC₂H₅(l)", "NaOH(aq)"],
    products: ["CH₃COO⁻Na⁺(aq)", "C₂H₅OH(l)"],
    equation: "CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH",
    balancedEquation: "CH₃COOC₂H₅(l) + NaOH(aq) —(Heat)→ CH₃COO⁻Na⁺(aq) + C₂H₅OH(l)",
    reactionType: ["Saponification", "Hydrolysis"],
    conditions: ["Heating ester with sodium hydroxide alkali solution"],
    observations: [
      "The fruity odor disappears as ester hydrolyzes.",
      "Produces sodium salt of carboxylic acid (soap base) and recovers alcohol.",
      "Adding common salt (NaCl) precipitates out the solid curd of soap."
    ],
    explanation: "Alkaline hydrolysis of an ester with sodium hydroxide converts it into alcohol and sodium salt of carboxylic acid. This reaction is known as saponification because it forms soap.",
    molecularExplanation: "OH⁻ nucleophilically attacks the ester carbonyl carbon, cleaving the ester bond into carboxylate anion (CH₃COO⁻) and ethoxide (which protonates to ethanol).",
    experimentMode: "safe",
    safetyNotes: ["Safe laboratory soap making simulation."],
    realLifeApplications: ["Industrial manufacturing of bathing and laundry soaps from vegetable oil / animal fats."],
    ncertConcept: "Section 4.4.2 & Section 4.5: Definition of saponification and chemistry of soap micelle formation.",
    tags: ["Saponification", "Soap", "Ester Hydrolysis", "NaOH", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "What is saponification? Write the chemical equation. Why is common salt added after saponification? (Ans: Alkaline hydrolysis of ester to form soap; NaCl is added for salting out / precipitation of soap)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Combine ethyl ethanoate ester with aqueous sodium hydroxide in a beaker." },
      { step: 2, description: "Heat the mixture with continuous stirring; ester hydrolyzes." },
      { step: 3, description: "Add common salt (NaCl); curd of solid soap separates out on cooling." }
    ],
    interactiveEntities: [
      { formula: "CH₃COOC₂H₅", name: "Ethyl Ethanoate (Ester)", role: "reactant", state: "l", color: "#fbcfe8" },
      { formula: "NaOH", name: "Sodium Hydroxide", role: "reactant", state: "aq", color: "#3b82f6" },
      { formula: "CH₃COONa", name: "Sodium Ethanoate (Soap salt)", role: "product", state: "aq", color: "#f8fafc" },
      { formula: "C₂H₅OH", name: "Ethanol", role: "product", state: "l", color: "#cbd5e1" }
    ],
    simulatorConfig: {
      apparatus: "beaker",
      primarySubstance: { name: "Ester Solution", formula: "CH₃COOC₂H₅", appearance: "Oily sweet layer", liquidColor: "#fdf2f8" },
      addedSubstance: { name: "20% NaOH Solution", formula: "NaOH(aq)", appearance: "Caustic solution", actionLabel: "Add NaOH & Boil", type: "liquid" },
      reactionResult: {
        liquidColor: "#f1f5f9",
        precipitateColor: "#ffffff",
        hasPrecipitate: true,
        precipitateName: "Curd of Soap (Sodium salt)",
        tempChange: "exothermic",
        tempDisplay: "Boiled & Salting Out"
      }
    },
    quiz: [
      {
        question: "Why is common salt added to the mixture after saponification?",
        options: ["To neutralize the alkali", "To precipitate (salt out) the soap", "To impart fragrance", "To accelerate reaction"],
        answer: "To precipitate (salt out) the soap",
        explanation: "Adding NaCl decreases the solubility of soap, allowing it to precipitate out as a solid curd."
      }
    ]
  },
  {
    id: "ch4-ethanoic-acid-sodium-bicarbonate",
    chapter: "Carbon and its Compounds",
    chapterNumber: 4,
    topic: "Reactions of Ethanoic Acid",
    title: "Reaction of Ethanoic Acid with Sodium Hydrogencarbonate (CO₂ Effervescence)",
    reactants: ["CH₃COOH(aq)", "NaHCO₃(s)"],
    products: ["CH₃COONa(aq)", "H₂O(l)", "CO₂(g)"],
    equation: "CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂",
    balancedEquation: "CH₃COOH(aq) + NaHCO₃(s) → CH₃COONa(aq) + H₂O(l) + CO₂(g)↑",
    reactionType: ["Double Displacement", "Decomposition"],
    conditions: ["Room temperature in a test tube with lime water delivery tube"],
    observations: [
      "Brisk effervescence occurs vigorously upon addition.",
      "A colourless, odourless gas (CO₂) is liberated rapidly.",
      "The gas turns freshly prepared lime water milky, confirming carbon dioxide."
    ],
    explanation: "Carboxylic acids are stronger acids than carbonic acid and displace carbon dioxide from metal hydrogencarbonates. Alcohols do not undergo this reaction, making it the definitive test to distinguish ethanoic acid from ethanol.",
    molecularExplanation: "CH₃COOH + HCO₃⁻ → CH₃COO⁻ + H₂CO₃; H₂CO₃ decomposes immediately to H₂O + CO₂↑.",
    experimentMode: "safe",
    safetyNotes: ["Safe classroom test to distinguish alcohols from carboxylic acids."],
    realLifeApplications: ["Chemical test to distinguish ethanol from ethanoic acid; baking applications."],
    ncertConcept: "Activity 4.9: Reaction of ethanoic acid with carbonates and hydrogencarbonates.",
    tags: ["Ethanoic Acid", "NaHCO₃", "Brisk Effervescence", "Distinguishing Test", "Activity 4.9", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "How would you distinguish experimentally between an alcohol and a carboxylic acid? (Ans: Add sodium hydrogencarbonate; ethanoic acid gives brisk effervescence of CO₂ turning lime water milky, whereas ethanol gives no reaction)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Take a spatula of sodium hydrogencarbonate (NaHCO₃) in a test tube." },
      { step: 2, description: "Add 2 mL dilute ethanoic acid; vigorous brisk effervescence erupts." },
      { step: 3, description: "Pass gas into lime water: lime water immediately turns milky white." }
    ],
    interactiveEntities: [
      { formula: "CH₃COOH", name: "Ethanoic Acid", role: "reactant", state: "aq", color: "#f8fafc" },
      { formula: "NaHCO₃", name: "Sodium Hydrogencarbonate", role: "reactant", state: "s", color: "#f1f5f9" },
      { formula: "CH₃COONa", name: "Sodium Ethanoate", role: "product", state: "aq", color: "#e2e8f0" },
      { formula: "CO₂", name: "Carbon Dioxide Gas", role: "product", state: "g", color: "#94a3b8", ncertNote: "Turns lime water milky" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Baking Soda (NaHCO₃)", formula: "NaHCO₃", appearance: "White powder", solidColor: "#f8fafc" },
      addedSubstance: { name: "Dilute Ethanoic Acid", formula: "CH₃COOH(aq)", appearance: "Clear vinegar liquid", actionLabel: "Pour Ethanoic Acid", type: "liquid" },
      reactionResult: {
        liquidColor: "#f0fdf4",
        bubbles: true,
        gasName: "CO₂ brisk effervescence (turns lime water milky)",
        tempChange: "neutral",
        tempDisplay: "Room Temperature (23°C)"
      }
    }
  }
];
