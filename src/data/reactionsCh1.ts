import { Reaction } from "../types";

export const CHAPTER_1_REACTIONS: Reaction[] = [
  {
    id: "ch1-magnesium-ribbon",
    chapter: "Chemical Reactions and Equations",
    chapterNumber: 1,
    topic: "Combination Reactions & Oxidation",
    title: "Burning of Magnesium Ribbon in Air",
    reactants: ["2Mg(s)", "O₂(g)"],
    products: ["2MgO(s)"],
    equation: "Mg + O₂ → MgO",
    balancedEquation: "2Mg(s) + O₂(g) → 2MgO(s) + Heat + Light",
    reactionType: ["Combination", "Oxidation", "Redox"],
    conditions: ["Heating in Bunsen flame / Spirit lamp"],
    observations: [
      "Magnesium ribbon burns with a dazzling, brilliant white flame.",
      "A white powder (Magnesium Oxide, MgO) is collected on the watch glass.",
      "Significant heat and intense light energy are released."
    ],
    explanation: "Magnesium combines rapidly with atmospheric oxygen at high temperature to form magnesium oxide. Magnesium loses electrons to form Mg²⁺, while oxygen gains electrons to form O²⁻.",
    molecularExplanation: "Two solid magnesium atoms donate valence electrons to one diatomic oxygen molecule (O=O). The covalent oxygen bond breaks, and the ions arrange into a crystalline ionic lattice of MgO.",
    experimentMode: "teacher-demo",
    safetyNotes: [
      "Wear protective UV safety goggles; looking directly at the dazzling white flame can cause eye strain.",
      "Rub ribbon with sandpaper before burning to remove the protective layer of basic magnesium carbonate.",
      "Hold ribbon firmly with laboratory tongs."
    ],
    realLifeApplications: [
      "Used in fireworks and emergency marine distress flares due to high luminescence.",
      "Flash photography in early cameras."
    ],
    ncertConcept: "Activity 1.1: Combination and Exothermic reaction where two elements combine into a single compound.",
    tags: ["Magnesium", "Oxygen", "Combination", "Exothermic", "Activity 1.1", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "Why should a magnesium ribbon be cleaned before burning in air? (Ans: To remove the protective coating of basic magnesium carbonate)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Add virtual substance: Select cleaned metallic Magnesium ribbon (Mg) on the workbench." },
      { step: 2, description: "Start simulation: Virtual ignition triggers oxidation with atmospheric oxygen." },
      { step: 3, description: "Observe luminescence: Dazzling white flame produces white Magnesium Oxide (MgO) ash." }
    ],
    interactiveEntities: [
      { formula: "Mg", name: "Magnesium Ribbon", role: "reactant", state: "s", color: "#94a3b8", ncertNote: "Silvery-white active metal" },
      { formula: "O₂", name: "Oxygen Gas", role: "reactant", state: "g", color: "#38bdf8", ncertNote: "Atmospheric supporter of combustion" },
      { formula: "MgO", name: "Magnesium Oxide", role: "product", state: "s", color: "#f8fafc", ncertNote: "Basic white oxide powder" }
    ],
    simulatorConfig: {
      apparatus: "crucible",
      primarySubstance: { name: "Magnesium Ribbon", formula: "Mg", appearance: "Silvery metallic strip", solidColor: "#94a3b8" },
      addedSubstance: { name: "Oxygen / Flame", formula: "O₂ + Heat", appearance: "Atmospheric flame", actionLabel: "Ignite in Flame", type: "heat" },
      reactionResult: {
        liquidColor: "transparent",
        precipitateColor: "#f8fafc",
        hasPrecipitate: true,
        precipitateName: "White MgO Ash",
        smokeColor: "#ffffff",
        flameColor: "#ffffff",
        tempChange: "exothermic",
        tempDisplay: "Extremely Hot (>1200°C)"
      },
      molecularScene: {
        description: "2 Mg atoms join with 1 diatomic O₂ molecule to form 2 MgO formula units.",
        reactants: [{ name: "Mg", formula: "Mg", count: 2, color: "#94a3b8" }, { name: "O₂", formula: "O₂", count: 1, color: "#38bdf8" }],
        products: [{ name: "MgO", formula: "MgO", count: 2, color: "#f8fafc" }],
        mechanism: "join"
      }
    },
    quiz: [
      {
        question: "Why is magnesium ribbon rubbed with sandpaper before burning?",
        options: ["To remove moisture", "To remove basic magnesium carbonate layer", "To make it smooth", "To increase its weight"],
        answer: "To remove basic magnesium carbonate layer",
        explanation: "Magnesium reacts slowly with moist air to form a protective layer of basic magnesium carbonate which hinders burning."
      },
      {
        question: "What is the nature of the ash formed when magnesium burns?",
        options: ["Acidic", "Basic", "Neutral", "Amphoteric"],
        answer: "Basic",
        explanation: "MgO dissolves slightly in water to form Mg(OH)₂, which turns red litmus paper blue."
      }
    ]
  },
  {
    id: "ch1-slaked-lime",
    chapter: "Chemical Reactions and Equations",
    chapterNumber: 1,
    topic: "Combination & Exothermic Reactions",
    title: "Action of Water on Quicklime (Slaked Lime Formation)",
    reactants: ["CaO(s)", "H₂O(l)"],
    products: ["Ca(OH)₂(aq)"],
    equation: "CaO + H₂O → Ca(OH)₂",
    balancedEquation: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat",
    reactionType: ["Combination", "Exothermic"],
    conditions: ["Room temperature, vigorous reaction"],
    observations: [
      "Vigorous hissing sound as water touches quicklime.",
      "The beaker becomes extremely hot (can boil water in large scale).",
      "Calcium oxide lumps break down into a milky slaked lime suspension."
    ],
    explanation: "Calcium oxide (quicklime) vigorously combines with water to produce calcium hydroxide (slaked lime), releasing a huge quantity of thermal energy.",
    molecularExplanation: "The Ca²⁺ and O²⁻ in solid CaO react with polar H₂O molecules, breaking H-O bonds to form hydrated Ca²⁺ and 2 OH⁻ ions.",
    experimentMode: "teacher-demo",
    safetyNotes: [
      "⚠️ Exothermic Warning: Slaking of quicklime releases intense boiling heat and can splatter caustic alkali.",
      "Simulated safely on screen to observe thermodynamics without burns."
    ],
    realLifeApplications: [
      "Preparation of whitewash for buildings.",
      "Soil neutralization in agriculture."
    ],
    ncertConcept: "Activity 1.4: Combination reaction where two reactants form a single product with high heat evolution.",
    tags: ["CaO", "Quicklime", "Slaked Lime", "Activity 1.4", "Exothermic"],
    boardImportance: "Very High",
    commonBoardQuestion: "Write a balanced equation for the reaction of substance 'X' used for whitewashing with water. (Ans: CaO + H₂O → Ca(OH)₂)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Add virtual substance: Place solid Quicklime (CaO) lumps into the virtual beaker." },
      { step: 2, description: "Start simulation: Introduce virtual water to trigger exothermic hydration." },
      { step: 3, description: "Observe exothermic change: High heat surge, steam evolution, and formation of slaked lime Ca(OH)₂ suspension." }
    ],
    interactiveEntities: [
      { formula: "CaO", name: "Calcium Oxide (Quicklime)", role: "reactant", state: "s", color: "#e2e8f0", ncertNote: "Substance 'X' used in whitewashing" },
      { formula: "H₂O", name: "Water", role: "reactant", state: "l", color: "#60a5fa", ncertNote: "Solvent and reactant" },
      { formula: "Ca(OH)₂", name: "Calcium Hydroxide (Slaked Lime)", role: "product", state: "aq", color: "#cbd5e1", ncertNote: "Aqueous form is lime water" }
    ],
    simulatorConfig: {
      apparatus: "beaker",
      primarySubstance: { name: "Quicklime Lumps", formula: "CaO", appearance: "White solid pieces", solidColor: "#e2e8f0" },
      addedSubstance: { name: "Water", formula: "H₂O", appearance: "Clear liquid", actionLabel: "Pour Water", type: "liquid" },
      reactionResult: {
        liquidColor: "#f1f5f9",
        bubbles: true,
        gasName: "Steam vapours from boiling heat",
        tempChange: "exothermic",
        tempDisplay: "Hot (+55°C Rise)",
        soundEffect: "Hissing bubbling sound"
      },
      molecularScene: {
        description: "CaO combines with H₂O to form Ca(OH)₂.",
        reactants: [{ name: "CaO", formula: "CaO", count: 1, color: "#94a3b8" }, { name: "H₂O", formula: "H₂O", count: 1, color: "#38bdf8" }],
        products: [{ name: "Ca(OH)₂", formula: "Ca(OH)₂", count: 1, color: "#cbd5e1" }],
        mechanism: "join"
      }
    },
    quiz: [
      {
        question: "Substance 'X' is used for whitewashing. What is its chemical formula?",
        options: ["Ca(OH)₂", "CaO", "CaCO₃", "CaCl₂"],
        answer: "CaO",
        explanation: "Substance X is Calcium oxide (Quicklime, CaO), which forms Ca(OH)₂ on adding water."
      }
    ]
  },
  {
    id: "ch1-whitewash-carbonation",
    chapter: "Chemical Reactions and Equations",
    chapterNumber: 1,
    topic: "Combination & Precipitation",
    title: "Carbonation of Slaked Lime on Walls",
    reactants: ["Ca(OH)₂(aq)", "CO₂(g)"],
    products: ["CaCO₃(s)", "H₂O(l)"],
    equation: "Ca(OH)₂ + CO₂ → CaCO₃ + H₂O",
    balancedEquation: "Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l)",
    reactionType: ["Precipitation", "Double Displacement"],
    conditions: ["Slow reaction with atmospheric carbon dioxide over 2-3 days"],
    observations: [
      "Thin coating on walls turns from translucent wet layer to shiny white finish.",
      "Formation of insoluble calcium carbonate film."
    ],
    explanation: "Calcium hydroxide reacts slowly with carbon dioxide in ambient air to form a thin, durable, gleaming white layer of calcium carbonate (marble composition).",
    molecularExplanation: "Gaseous CO₂ dissolves in the aqueous film, forming carbonate ions CO₃²⁻ which bind Ca²⁺ to precipitate solid CaCO₃.",
    experimentMode: "safe",
    safetyNotes: ["Safe simulation."],
    realLifeApplications: ["Traditional building whitewashing and wall finishing."],
    ncertConcept: "Box 'Do You Know?' in Chapter 1: Why whitewashed walls develop a shiny finish after 2 to 3 days.",
    tags: ["Whitewash", "CaCO₃", "CO₂", "Shiny Finish"],
    boardImportance: "High",
    commonBoardQuestion: "Why do walls get a shiny white finish 2 to 3 days after whitewashing? (Ans: Due to slow formation of CaCO₃ layer)",
    energyChange: "None",
    animationSteps: [
      { step: 1, description: "Apply aqueous slaked lime film on the wall surface." },
      { step: 2, description: "Atmospheric CO₂ gas gradually reacts with Ca(OH)₂." },
      { step: 3, description: "Gleaming white insoluble CaCO₃ forms, giving a lustrous finish." }
    ],
    interactiveEntities: [
      { formula: "Ca(OH)₂", name: "Slaked Lime Solution", role: "reactant", state: "aq", color: "#e2e8f0" },
      { formula: "CO₂", name: "Carbon Dioxide Gas", role: "reactant", state: "g", color: "#94a3b8" },
      { formula: "CaCO₃", name: "Calcium Carbonate", role: "product", state: "s", color: "#ffffff", ncertNote: "Formula for limestone, marble, and chalk" }
    ],
    simulatorConfig: {
      apparatus: "china-dish",
      primarySubstance: { name: "Slaked Lime Film", formula: "Ca(OH)₂", appearance: "Translucent liquid film", liquidColor: "#e2e8f0" },
      addedSubstance: { name: "CO₂ Gas Stream", formula: "CO₂", appearance: "Ambient gas", actionLabel: "Expose to CO₂", type: "gas" },
      reactionResult: {
        liquidColor: "transparent",
        precipitateColor: "#ffffff",
        hasPrecipitate: true,
        precipitateName: "Shiny CaCO₃ Crust",
        tempChange: "neutral",
        tempDisplay: "Ambient (25°C)"
      }
    }
  },
  {
    id: "ch1-ferrous-sulphate-decomposition",
    chapter: "Chemical Reactions and Equations",
    chapterNumber: 1,
    topic: "Decomposition Reactions",
    title: "Thermal Decomposition of Ferrous Sulphate Crystals",
    reactants: ["2FeSO₄(s)"],
    products: ["Fe₂O₃(s)", "SO₂(g)", "SO₃(g)"],
    equation: "FeSO₄ → Fe₂O₃ + SO₂ + SO₃",
    balancedEquation: "2FeSO₄(s) —(Heat)→ Fe₂O₃(s) + SO₂(g) + SO₃(g)",
    reactionType: ["Decomposition", "Redox"],
    conditions: ["Strong heating in a dry boiling tube"],
    observations: [
      "Green ferrous sulphate heptahydrate crystals (FeSO₄·7H₂O) first lose water and turn white.",
      "On further strong heating, the white residue turns reddish-brown (ferric oxide, Fe₂O₃).",
      "Pungent, choking smell of burning sulphur due to SO₂ and SO₃ gases evolved."
    ],
    explanation: "Ferrous sulphate crystals lose 7 water molecules of crystallisation on mild heating. On strong heating, anhydrous FeSO₄ thermally decomposes into ferric oxide, sulphur dioxide, and sulphur trioxide.",
    molecularExplanation: "High thermal energy breaks the Fe-SO₄ ionic bond lattice. Fe(II) oxidizes to Fe(III) while some S(VI) reduces to S(IV) in SO₂.",
    experimentMode: "simulation-only",
    safetyNotes: [
      "⚠️ SIMULATION-ONLY: Sulphur dioxide and sulphur trioxide are toxic, choking gases that irritate the respiratory tract.",
      "Physical experiment requires a chemical fume hood; safely simulated in the virtual lab without toxic inhalation hazard."
    ],
    realLifeApplications: ["Production of iron oxide pigments for paints and ceramic coloring."],
    ncertConcept: "Activity 1.5: Thermal decomposition of a single reactant into three simpler products with characteristic gas odor.",
    tags: ["FeSO₄", "Thermal Decomposition", "Activity 1.5", "Sulphur Smell"],
    boardImportance: "Very High",
    commonBoardQuestion: "Name the gases evolved when ferrous sulphate crystals are heated. How are they identified? (Ans: SO₂ and SO₃, recognized by burning sulphur smell)",
    energyChange: "Endothermic",
    animationSteps: [
      { step: 1, description: "Add virtual substance: Place pale green FeSO₄·7H₂O crystals in the virtual boiling tube." },
      { step: 2, description: "Start simulation: Apply high heat to induce thermal breakdown." },
      { step: 3, description: "Observe colour change & gas evolution: Green turns white then reddish-brown Fe₂O₃ with choking SO₂ and SO₃ gases." }
    ],
    interactiveEntities: [
      { formula: "FeSO₄", name: "Ferrous Sulphate", role: "reactant", state: "s", color: "#86efac", ncertNote: "Pale green crystals" },
      { formula: "Fe₂O₃", name: "Ferric Oxide", role: "product", state: "s", color: "#b45309", ncertNote: "Reddish-brown solid residue" },
      { formula: "SO₂", name: "Sulphur Dioxide", role: "product", state: "g", color: "#cbd5e1", ncertNote: "Suffocating smell of burning sulphur" },
      { formula: "SO₃", name: "Sulphur Trioxide", role: "product", state: "g", color: "#e2e8f0" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Green FeSO₄ Crystals", formula: "FeSO₄·7H₂O", appearance: "Light green crystals", solidColor: "#86efac" },
      addedSubstance: { name: "Bunsen Heat", formula: "Δ Heat", appearance: "Blue hot flame", actionLabel: "Apply Strong Flame", type: "heat" },
      reactionResult: {
        precipitateColor: "#b45309",
        hasPrecipitate: true,
        precipitateName: "Reddish-Brown Fe₂O₃ Residue",
        bubbles: true,
        gasName: "Pungent SO₂ + SO₃ Fumes",
        smokeColor: "#e2e8f0",
        tempChange: "endothermic",
        tempDisplay: "Heated over Bunsen Flame (>400°C)"
      },
      molecularScene: {
        description: "2 FeSO₄ formula units break apart into 1 Fe₂O₃ + 1 SO₂ + 1 SO₃.",
        reactants: [{ name: "FeSO₄", formula: "FeSO₄", count: 2, color: "#86efac" }],
        products: [{ name: "Fe₂O₃", formula: "Fe₂O₃", count: 1, color: "#b45309" }, { name: "SO₂", formula: "SO₂", count: 1, color: "#f59e0b" }, { name: "SO₃", formula: "SO₃", count: 1, color: "#cbd5e1" }],
        mechanism: "split"
      }
    },
    quiz: [
      {
        question: "What is the initial colour of ferrous sulphate crystals before heating?",
        options: ["Blue", "Green", "White", "Yellow"],
        answer: "Green",
        explanation: "Hydrated ferrous sulphate (FeSO₄·7H₂O) crystals are pale green in colour."
      }
    ]
  },
  {
    id: "ch1-limestone-decomposition",
    chapter: "Chemical Reactions and Equations",
    chapterNumber: 1,
    topic: "Decomposition Reactions",
    title: "Thermal Decomposition of Calcium Carbonate (Limestone)",
    reactants: ["CaCO₃(s)"],
    products: ["CaO(s)", "CO₂(g)"],
    equation: "CaCO₃ → CaO + CO₂",
    balancedEquation: "CaCO₃(s) —(Heat)→ CaO(s) + CO₂(g)",
    reactionType: ["Decomposition"],
    conditions: ["High temperature heating (>825°C) in kiln"],
    observations: [
      "White limestone decomposes to leave white quicklime residue.",
      "Carbon dioxide gas is evolved which turns freshly prepared lime water milky."
    ],
    explanation: "Thermal decomposition of limestone yields calcium oxide (quick lime) and carbon dioxide. Quick lime has immense industrial applications, notably in cement manufacturing.",
    molecularExplanation: "Heat vibrations destabilize the carbonate anion (CO₃²⁻), decomposing it into an oxide ion (O²⁻) and releasing stable CO₂ gas.",
    experimentMode: "safe",
    safetyNotes: ["Simulation of industrial lime kiln."],
    realLifeApplications: ["Manufacture of Portland cement and lime mortar."],
    ncertConcept: "Section 1.2.2: Thermal decomposition widely utilized in heavy chemical industry.",
    tags: ["Limestone", "Cement", "Thermal Decomposition", "CaO"],
    boardImportance: "High",
    energyChange: "Endothermic",
    animationSteps: [
      { step: 1, description: "Load calcium carbonate powder into high-temp crucible." },
      { step: 2, description: "Heat strongly; CO₂ gas begins evolving." },
      { step: 3, description: "Solid CaO (quicklime) remains as residue in crucible." }
    ],
    interactiveEntities: [
      { formula: "CaCO₃", name: "Limestone", role: "reactant", state: "s", color: "#f1f5f9" },
      { formula: "CaO", name: "Quicklime", role: "product", state: "s", color: "#e2e8f0" },
      { formula: "CO₂", name: "Carbon Dioxide", role: "product", state: "g", color: "#cbd5e1" }
    ],
    simulatorConfig: {
      apparatus: "crucible",
      primarySubstance: { name: "Limestone Powder", formula: "CaCO₃", appearance: "Chalky white solid", solidColor: "#f8fafc" },
      addedSubstance: { name: "High Heat", formula: "Δ", appearance: "Furnace heat", actionLabel: "Heat in Kiln", type: "heat" },
      reactionResult: {
        precipitateColor: "#e2e8f0",
        hasPrecipitate: true,
        precipitateName: "Quicklime (CaO)",
        bubbles: true,
        gasName: "CO₂ Gas",
        tempChange: "endothermic",
        tempDisplay: "Furnace 900°C"
      }
    }
  },
  {
    id: "ch1-lead-nitrate-decomposition",
    chapter: "Chemical Reactions and Equations",
    chapterNumber: 1,
    topic: "Decomposition Reactions",
    title: "Thermal Decomposition of Lead Nitrate",
    reactants: ["2Pb(NO₃)₂(s)"],
    products: ["2PbO(s)", "4NO₂(g)", "O₂(g)"],
    equation: "Pb(NO₃)₂ → PbO + NO₂ + O₂",
    balancedEquation: "2Pb(NO₃)₂(s) —(Heat)→ 2PbO(s) + 4NO₂(g) + O₂(g)",
    reactionType: ["Decomposition", "Redox"],
    conditions: ["Heating in a dry boiling tube over flame"],
    observations: [
      "White crystalline lead nitrate powder crackles on heating.",
      "Dense, suffocating reddish-brown fumes of nitrogen dioxide (NO₂) are evolved.",
      "A yellow solid residue of lead(II) oxide (PbO) remains in the boiling tube."
    ],
    explanation: "Lead nitrate decomposes under heat into lead monoxide (yellow), nitrogen dioxide (brown acidic gas), and colorless oxygen gas which rekindles a glowing splint.",
    molecularExplanation: "Nitrate groups (NO₃⁻) decompose under thermal stress; electrons transfer to form NO₂ molecules and O₂ while Pb²⁺ forms ionic PbO.",
    experimentMode: "simulation-only",
    safetyNotes: [
      "⚠️ SIMULATION-ONLY: Nitrogen dioxide (NO₂) fumes are toxic and severely irritate the lungs. Lead(II) oxide is a heavy-metal poison.",
      "Physical execution requires dedicated fume extraction; safely demonstrated virtually with accurate color and decrepitation physics."
    ],
    realLifeApplications: ["Synthesis of lead pigments and analytical chemistry."],
    ncertConcept: "Activity 1.6: Observation of brown nitrogen dioxide fumes upon heating lead nitrate.",
    tags: ["Lead Nitrate", "Brown Fumes", "NO₂", "PbO", "Activity 1.6", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "Name the brown fumes produced when lead nitrate is heated in a boiling tube. (Ans: Nitrogen dioxide, NO₂)",
    energyChange: "Endothermic",
    animationSteps: [
      { step: 1, description: "Add virtual substance: Load white crystalline Lead(II) Nitrate [Pb(NO₃)₂] in virtual tube." },
      { step: 2, description: "Start simulation: Heat strongly to initiate decrepitation and thermal decomposition." },
      { step: 3, description: "Observe gas evolution & residue: Brown fumes of nitrogen dioxide (NO₂) and yellow lead monoxide (PbO) residue." }
    ],
    interactiveEntities: [
      { formula: "Pb(NO₃)₂", name: "Lead Nitrate", role: "reactant", state: "s", color: "#f8fafc", ncertNote: "White crystalline powder" },
      { formula: "PbO", name: "Lead(II) Oxide", role: "product", state: "s", color: "#facc15", ncertNote: "Yellow solid residue" },
      { formula: "NO₂", name: "Nitrogen Dioxide", role: "product", state: "g", color: "#b45309", ncertNote: "Pungent reddish-brown fumes" },
      { formula: "O₂", name: "Oxygen Gas", role: "product", state: "g", color: "#38bdf8" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Lead Nitrate Powder", formula: "Pb(NO₃)₂", appearance: "White crystalline powder", solidColor: "#f8fafc" },
      addedSubstance: { name: "Burner Flame", formula: "Heat", appearance: "Heating flame", actionLabel: "Apply Flame", type: "heat" },
      reactionResult: {
        precipitateColor: "#facc15",
        hasPrecipitate: true,
        precipitateName: "Yellow PbO Residue",
        bubbles: true,
        gasName: "Dense Brown NO₂ + O₂ Gas",
        smokeColor: "#9a3412",
        tempChange: "endothermic",
        tempDisplay: "Boiling Tube 450°C"
      },
      molecularScene: {
        description: "2 Pb(NO₃)₂ split into 2 PbO + 4 NO₂ + 1 O₂.",
        reactants: [{ name: "Pb(NO₃)₂", formula: "Pb(NO₃)₂", count: 2, color: "#f8fafc" }],
        products: [
          { name: "PbO", formula: "PbO", count: 2, color: "#facc15" },
          { name: "NO₂", formula: "NO₂", count: 4, color: "#9a3412" },
          { name: "O₂", formula: "O₂", count: 1, color: "#38bdf8" }
        ],
        mechanism: "split"
      }
    },
    quiz: [
      {
        question: "What is the colour of the fumes evolved during the thermal decomposition of lead nitrate?",
        options: ["White", "Brown", "Yellow", "Colourless"],
        answer: "Brown",
        explanation: "Nitrogen dioxide (NO₂) gas is emitted as characteristic reddish-brown fumes."
      }
    ]
  },
  {
    id: "ch1-electrolysis-of-water",
    chapter: "Chemical Reactions and Equations",
    chapterNumber: 1,
    topic: "Decomposition Reactions",
    title: "Electrolysis of Acidified Water",
    reactants: ["2H₂O(l)"],
    products: ["2H₂(g)", "O₂(g)"],
    equation: "H₂O → H₂ + O₂",
    balancedEquation: "2H₂O(l) —(Electric Current)→ 2H₂(g) + O₂(g)",
    reactionType: ["Decomposition", "Electrolysis", "Redox"],
    conditions: ["6V DC battery, carbon/graphite electrodes, drops of dilute H₂SO₄ for conductivity"],
    observations: [
      "Gas bubbles continuously form at both cathode and anode.",
      "Water is displaced downwards in both inverted test tubes.",
      "The volume of gas collected at cathode (H₂) is exactly TWICE the volume of gas at anode (O₂)."
    ],
    explanation: "Electric current breaks covalent bonds in water molecules. Hydrogen ions (H⁺) reduce at cathode to H₂ gas; hydroxide ions (OH⁻) oxidize at anode to release O₂ gas. Volume ratio is 2:1 according to stoichiometry.",
    molecularExplanation: "Two H₂O molecules yield two H₂ molecules and one O₂ molecule (2:1 molar and volumetric ratio by Avogadro's law).",
    experimentMode: "teacher-demo",
    safetyNotes: [
      "⚠️ Electrical & Gas Safety: Requires low voltage DC to prevent electrical hazards. Hydrogen-oxygen mixtures are explosive.",
      "Virtual simulation allows precise quantitative gas ratio measurement without high electrical currents."
    ],
    realLifeApplications: ["Green hydrogen fuel generation for clean energy cells."],
    ncertConcept: "Activity 1.7: Electrolytic decomposition demonstrating chemical decomposition using electrical energy.",
    tags: ["Electrolysis", "Water", "H₂ vs O₂ 2:1", "Activity 1.7", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "Why is the volume of gas collected in one test tube during water electrolysis double of the other? (Ans: Water contains 2 parts hydrogen to 1 part oxygen by volume)",
    energyChange: "Endothermic",
    animationSteps: [
      { step: 1, description: "Add virtual substance: Place acidified water electrolyte in the virtual Hofmann voltmeter." },
      { step: 2, description: "Start simulation: Energize DC circuit to initiate electrolytic decomposition." },
      { step: 3, description: "Observe gas evolution: 2 volumes of H₂ gas collect at cathode, 1 volume of O₂ gas at anode." }
    ],
    interactiveEntities: [
      { formula: "H₂O", name: "Acidified Water", role: "reactant", state: "l", color: "#38bdf8" },
      { formula: "H₂", name: "Hydrogen Gas (Cathode)", role: "product", state: "g", color: "#60a5fa", ncertNote: "Burns with pop sound; 2 parts by volume" },
      { formula: "O₂", name: "Oxygen Gas (Anode)", role: "product", state: "g", color: "#f87171", ncertNote: "Rekindles glowing splint; 1 part by volume" }
    ],
    simulatorConfig: {
      apparatus: "electrolysis-cell",
      primarySubstance: { name: "Acidified Water", formula: "H₂O + dil. H₂SO₄", appearance: "Transparent electrolyte", liquidColor: "#e0f2fe" },
      addedSubstance: { name: "6V Electric DC Current", formula: "e⁻ Current", appearance: "Battery circuit", actionLabel: "Switch ON Current", type: "liquid" },
      reactionResult: {
        liquidColor: "#e0f2fe",
        bubbles: true,
        gasName: "H₂ at Cathode (-) : O₂ at Anode (+) in 2:1 ratio",
        tempChange: "neutral",
        tempDisplay: "Electrochemical Cell 28°C"
      },
      molecularScene: {
        description: "2 H₂O molecules split into 2 diatomic H₂ and 1 diatomic O₂.",
        reactants: [{ name: "H₂O", formula: "H₂O", count: 2, color: "#38bdf8" }],
        products: [
          { name: "H₂", formula: "H₂", count: 2, color: "#60a5fa" },
          { name: "O₂", formula: "O₂", count: 1, color: "#ef4444" }
        ],
        mechanism: "split"
      }
    },
    quiz: [
      {
        question: "Which gas is collected at the cathode during electrolysis of water?",
        options: ["Oxygen", "Hydrogen", "Sulphur dioxide", "Chlorine"],
        answer: "Hydrogen",
        explanation: "H⁺ cations migrate to the negatively charged cathode where they gain electrons to form H₂ gas."
      }
    ]
  },
  {
    id: "ch1-photolytic-silver-chloride",
    chapter: "Chemical Reactions and Equations",
    chapterNumber: 1,
    topic: "Decomposition Reactions",
    title: "Photolytic Decomposition of Silver Chloride in Sunlight",
    reactants: ["2AgCl(s)"],
    products: ["2Ag(s)", "Cl₂(g)"],
    equation: "AgCl → Ag + Cl₂",
    balancedEquation: "2AgCl(s) —(Sunlight)→ 2Ag(s) + Cl₂(g)",
    reactionType: ["Decomposition", "Photochemical", "Redox"],
    conditions: ["Exposure to ambient sunlight on a china dish"],
    observations: [
      "Snow-white silver chloride powder gradually darkens into grey silver metal.",
      "Greenish-yellow chlorine gas with bleach odor dissipates."
    ],
    explanation: "Light photons (hv) deliver energy sufficient to overcome the ionic bond between Ag⁺ and Cl⁻, causing reduction of silver ions to elemental silver atoms.",
    molecularExplanation: "Photons excite valence electrons in chloride ions (Cl⁻ → Cl + e⁻). The released electron reduces Ag⁺ cation to neutral Ag(0) atom.",
    experimentMode: "safe",
    safetyNotes: ["Safe simulation."],
    realLifeApplications: ["Historical black and white photographic film and photochromic sunglasses."],
    ncertConcept: "Activity 1.8: Photolytic decomposition where radiant sunlight decomposes silver halide.",
    tags: ["Silver Chloride", "Sunlight", "Photography", "Activity 1.8"],
    boardImportance: "High",
    commonBoardQuestion: "Why is silver chloride stored in dark-colored bottles? (Ans: To prevent its decomposition by sunlight)",
    energyChange: "Endothermic",
    animationSteps: [
      { step: 1, description: "Place pure white AgCl powder on a china dish." },
      { step: 2, description: "Expose the china dish to bright solar sunlight." },
      { step: 3, description: "Observe the white powder turning distinctly grey as metallic silver forms." }
    ],
    interactiveEntities: [
      { formula: "AgCl", name: "Silver Chloride", role: "reactant", state: "s", color: "#f8fafc", ncertNote: "Pure white insoluble salt" },
      { formula: "Ag", name: "Silver Metal", role: "product", state: "s", color: "#94a3b8", ncertNote: "Greyish metallic deposit" },
      { formula: "Cl₂", name: "Chlorine Gas", role: "product", state: "g", color: "#a3e635" }
    ],
    simulatorConfig: {
      apparatus: "china-dish",
      primarySubstance: { name: "Silver Chloride Powder", formula: "AgCl", appearance: "White solid powder", solidColor: "#f8fafc" },
      addedSubstance: { name: "Solar Light Rays", formula: "hν Sunlight", appearance: "Golden rays", actionLabel: "Expose to Sunlight", type: "heat" },
      reactionResult: {
        precipitateColor: "#64748b",
        hasPrecipitate: true,
        precipitateName: "Grey Silver Metal",
        tempChange: "neutral",
        tempDisplay: "Sunlit Dish 30°C"
      }
    }
  },
  {
    id: "ch1-iron-copper-sulphate-displacement",
    chapter: "Chemical Reactions and Equations",
    chapterNumber: 1,
    topic: "Displacement Reactions",
    title: "Displacement of Copper by Iron in Copper Sulphate Solution",
    reactants: ["Fe(s)", "CuSO₄(aq)"],
    products: ["FeSO₄(aq)", "Cu(s)"],
    equation: "Fe + CuSO₄ → FeSO₄ + Cu",
    balancedEquation: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)",
    reactionType: ["Displacement", "Redox"],
    conditions: ["Clean iron nail immersed in 10 mL copper sulphate solution for 20 minutes"],
    observations: [
      "The striking blue colour of copper sulphate solution gradually fades and turns pale light green (FeSO₄).",
      "A reddish-brown spongy coating of metallic copper deposits on the submerged iron nail."
    ],
    explanation: "Iron is more reactive than copper in the electrochemical reactivity series. Iron displaces copper from its salt solution by donating two electrons to Cu²⁺ ions.",
    molecularExplanation: "Fe atom donates two electrons: Fe → Fe²⁺ + 2e⁻. The Cu²⁺ ion in solution captures them: Cu²⁺ + 2e⁻ → Cu(s) and plates onto the nail surface.",
    experimentMode: "safe",
    safetyNotes: [
      "Clean iron nail thoroughly with sandpaper to expose fresh active metal.",
      "Wear gloves when handling copper sulphate solution."
    ],
    realLifeApplications: ["Hydrometallurgy (cementation of copper from low grade leach solutions)."],
    ncertConcept: "Activity 1.9: Classic single displacement reaction based on metal activity series.",
    tags: ["Fe", "CuSO4", "Displacement", "Activity 1.9", "Blue to Light Green", "Redox"],
    boardImportance: "Very High",
    commonBoardQuestion: "Why does the blue colour of copper sulphate solution fade when an iron nail is dipped into it? (Ans: Iron displaces copper forming pale green ferrous sulphate)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Add virtual substance: Prepare virtual beaker with deep blue Copper(II) Sulphate (CuSO₄) solution." },
      { step: 2, description: "Start simulation: Lower metallic iron (Fe) into the copper sulphate solution." },
      { step: 3, description: "Observe colour change & deposit: Solution turns pale green (FeSO₄) with reddish-brown copper coating on the iron." }
    ],
    interactiveEntities: [
      { formula: "Fe", name: "Iron Nail", role: "reactant", state: "s", color: "#64748b", ncertNote: "More reactive metal (higher in series)" },
      { formula: "CuSO₄", name: "Copper Sulphate Solution", role: "reactant", state: "aq", color: "#0284c7", ncertNote: "Deep sky blue solution" },
      { formula: "FeSO₄", name: "Ferrous Sulphate Solution", role: "product", state: "aq", color: "#86efac", ncertNote: "Pale light green solution" },
      { formula: "Cu", name: "Copper Metal", role: "product", state: "s", color: "#b45309", ncertNote: "Reddish-brown deposit on nail" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Copper Sulphate Solution", formula: "CuSO₄(aq)", appearance: "Vibrant blue solution", liquidColor: "#0284c7" },
      addedSubstance: { name: "Clean Iron Nail", formula: "Fe(s)", appearance: "Grey iron nail", actionLabel: "Immerse Iron Nail", type: "solid" },
      reactionResult: {
        liquidColor: "#bbf7d0",
        depositOnSolid: "Reddish-Brown Copper layer",
        precipitateColor: "#b45309",
        tempChange: "exothermic",
        tempDisplay: "Room temp (+2°C slight rise)"
      },
      molecularScene: {
        description: "Grey Fe atom displaces blue Cu²⁺ ion from sulphate companion.",
        reactants: [{ name: "Fe", formula: "Fe", count: 1, color: "#64748b" }, { name: "CuSO₄", formula: "Cu²⁺SO₄²⁻", count: 1, color: "#0284c7" }],
        products: [{ name: "FeSO₄", formula: "Fe²⁺SO₄²⁻", count: 1, color: "#86efac" }, { name: "Cu", formula: "Cu", count: 1, color: "#b45309" }],
        mechanism: "displace"
      }
    },
    quiz: [
      {
        question: "What is the colour of the deposit formed on the iron nail?",
        options: ["Silvery white", "Reddish brown", "Jet black", "Bright yellow"],
        answer: "Reddish brown",
        explanation: "Displaced copper metal forms a reddish-brown coating over the iron surface."
      }
    ]
  },
  {
    id: "ch1-double-displacement-barium-sulphate",
    chapter: "Chemical Reactions and Equations",
    chapterNumber: 1,
    topic: "Double Displacement & Precipitation",
    title: "Double Displacement Reaction of Sodium Sulphate and Barium Chloride",
    reactants: ["Na₂SO₄(aq)", "BaCl₂(aq)"],
    products: ["BaSO₄(s)", "2NaCl(aq)"],
    equation: "Na₂SO₄ + BaCl₂ → BaSO₄ + NaCl",
    balancedEquation: "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s) + 2NaCl(aq)",
    reactionType: ["Double Displacement", "Precipitation"],
    conditions: ["Mixing aqueous solutions at room temperature"],
    observations: [
      "Instantaneous formation of a thick, opaque white precipitate of barium sulphate (BaSO₄).",
      "Sodium chloride remains dissolved in the clear supernatant liquid."
    ],
    explanation: "There is an exchange of ions between the two reactants. Barium cations (Ba²⁺) and sulphate anions (SO₄²⁻) combine to form barium sulphate, which is insoluble in water and precipitates out.",
    molecularExplanation: "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓. The electrostatic attraction between Ba²⁺ and SO₄²⁻ exceeds the hydration energy, forming an insoluble lattice.",
    experimentMode: "safe",
    safetyNotes: ["Safe simulation."],
    realLifeApplications: ["Radiology barium meals for digestive tract X-ray imaging."],
    ncertConcept: "Activity 1.10: Double displacement reaction showing exchange of ions and formation of precipitate.",
    tags: ["Double Displacement", "Precipitation", "BaSO₄", "Activity 1.10", "White Precipitate"],
    boardImportance: "Very High",
    commonBoardQuestion: "Define a double displacement reaction. Give an example where a white precipitate is formed. (Ans: Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl)",
    energyChange: "None",
    animationSteps: [
      { step: 1, description: "Take transparent sodium sulphate (Na₂SO₄) solution in a test tube." },
      { step: 2, description: "Add clear barium chloride (BaCl₂) solution dropwise." },
      { step: 3, description: "A dense, milky white precipitate of BaSO₄ forms instantly throughout." }
    ],
    interactiveEntities: [
      { formula: "Na₂SO₄", name: "Sodium Sulphate", role: "reactant", state: "aq", color: "#e2e8f0" },
      { formula: "BaCl₂", name: "Barium Chloride", role: "reactant", state: "aq", color: "#f1f5f9" },
      { formula: "BaSO₄", name: "Barium Sulphate", role: "product", state: "s", color: "#ffffff", ncertNote: "Insoluble white precipitate" },
      { formula: "NaCl", name: "Sodium Chloride", role: "product", state: "aq", color: "#e2e8f0" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Sodium Sulphate Solution", formula: "Na₂SO₄(aq)", appearance: "Colorless solution", liquidColor: "#e0f2fe" },
      addedSubstance: { name: "Barium Chloride Solution", formula: "BaCl₂(aq)", appearance: "Colorless solution", actionLabel: "Add Barium Chloride", type: "liquid" },
      reactionResult: {
        liquidColor: "#ffffff",
        hasPrecipitate: true,
        precipitateColor: "#ffffff",
        precipitateName: "White Precipitate of BaSO₄",
        tempChange: "neutral",
        tempDisplay: "Room Temperature (24°C)"
      },
      molecularScene: {
        description: "Ba²⁺ pairs with SO₄²⁻ while Na⁺ pairs with Cl⁻ (ion exchange).",
        reactants: [{ name: "Na₂SO₄", formula: "2Na⁺ + SO₄²⁻", count: 1, color: "#38bdf8" }, { name: "BaCl₂", formula: "Ba²⁺ + 2Cl⁻", count: 1, color: "#fb923c" }],
        products: [{ name: "BaSO₄", formula: "BaSO₄ (insoluble)", count: 1, color: "#ffffff" }, { name: "NaCl", formula: "2Na⁺ + 2Cl⁻", count: 1, color: "#a5b4fc" }],
        mechanism: "exchange"
      }
    },
    quiz: [
      {
        question: "Which of the following is the insoluble white substance formed in Activity 1.10?",
        options: ["Sodium chloride", "Barium sulphate", "Sodium sulphate", "Barium chloride"],
        answer: "Barium sulphate",
        explanation: "BaSO₄ is insoluble in water and precipitates as a distinctive white solid."
      }
    ]
  },
  {
    id: "ch1-lead-iodide-precipitation",
    chapter: "Chemical Reactions and Equations",
    chapterNumber: 1,
    topic: "Double Displacement & Precipitation",
    title: "Precipitation of Bright Yellow Lead Iodide",
    reactants: ["Pb(NO₃)₂(aq)", "2KI(aq)"],
    products: ["PbI₂(s)", "2KNO₃(aq)"],
    equation: "Pb(NO₃)₂ + KI → PbI₂ + KNO₃",
    balancedEquation: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq)",
    reactionType: ["Double Displacement", "Precipitation"],
    conditions: ["Mixing aqueous solutions at room temperature"],
    observations: [
      "A brilliant, canary-yellow precipitate of lead(II) iodide (PbI₂) separates out instantly.",
      "The liquid above the precipitate contains soluble potassium nitrate (KNO₃)."
    ],
    explanation: "Lead cations (Pb²⁺) combine with iodide anions (I⁻) from potassium iodide to form insoluble lead iodide, displaying brilliant golden yellow precipitation.",
    molecularExplanation: "Pb²⁺ + 2I⁻ → PbI₂(s)↓. Strong ionic bonding between heavy lead cations and polarizable iodide anions creates an insoluble golden crystalline solid.",
    experimentMode: "teacher-demo",
    safetyNotes: ["Lead compounds are toxic. Handle with care and dispose of precipitate in hazardous waste."],
    realLifeApplications: ["Historical artist pigment (iodine yellow) and semiconductor materials."],
    ncertConcept: "Activity 1.2: Precipitation and double displacement with vivid canary yellow color change.",
    tags: ["Lead Iodide", "Activity 1.2", "Yellow Precipitate", "Double Displacement"],
    boardImportance: "Very High",
    commonBoardQuestion: "What is the colour of precipitate formed when potassium iodide is added to lead nitrate solution? (Ans: Bright yellow precipitate of PbI₂)",
    energyChange: "None",
    animationSteps: [
      { step: 1, description: "Take clear colourless lead nitrate solution in a test tube." },
      { step: 2, description: "Add clear colourless potassium iodide solution." },
      { step: 3, description: "Instantly, a striking canary-yellow precipitate of PbI₂ appears." }
    ],
    interactiveEntities: [
      { formula: "Pb(NO₃)₂", name: "Lead Nitrate Solution", role: "reactant", state: "aq", color: "#e2e8f0" },
      { formula: "KI", name: "Potassium Iodide Solution", role: "reactant", state: "aq", color: "#e2e8f0" },
      { formula: "PbI₂", name: "Lead(II) Iodide", role: "product", state: "s", color: "#eab308", ncertNote: "Vibrant yellow precipitate" },
      { formula: "KNO₃", name: "Potassium Nitrate", role: "product", state: "aq", color: "#e2e8f0" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Lead Nitrate Solution", formula: "Pb(NO₃)₂(aq)", appearance: "Clear colourless liquid", liquidColor: "#f8fafc" },
      addedSubstance: { name: "Potassium Iodide Solution", formula: "KI(aq)", appearance: "Clear liquid", actionLabel: "Add Potassium Iodide", type: "liquid" },
      reactionResult: {
        liquidColor: "#fef08a",
        hasPrecipitate: true,
        precipitateColor: "#eab308",
        precipitateName: "Bright Yellow PbI₂ Precipitate",
        tempChange: "neutral",
        tempDisplay: "Ambient 23°C"
      }
    }
  },
  {
    id: "ch1-copper-oxidation-reduction",
    chapter: "Chemical Reactions and Equations",
    chapterNumber: 1,
    topic: "Oxidation, Reduction & Redox",
    title: "Oxidation of Copper to Black CuO and Reduction by H₂",
    reactants: ["2Cu(s)", "O₂(g)"],
    products: ["2CuO(s)"],
    equation: "2Cu + O₂ → 2CuO",
    balancedEquation: "2Cu(s) + O₂(g) —(Heat)→ 2CuO(s)",
    reactionType: ["Oxidation", "Combination", "Redox"],
    conditions: ["Heating copper powder in a china dish over wire gauze"],
    observations: [
      "Shiny reddish-brown copper powder surface turns into a dull black powder.",
      "The black substance is copper(II) oxide formed due to addition of oxygen."
    ],
    explanation: "Copper gains oxygen when heated in air to form black copper(II) oxide (oxidation). If hydrogen gas is subsequently passed over hot CuO, the black coating turns brown again as CuO loses oxygen and is reduced to Cu.",
    molecularExplanation: "Cu loses 2 electrons (oxidized) while oxygen gains 2 electrons (reduced). In reverse: CuO + H₂ → Cu + H₂O.",
    experimentMode: "teacher-demo",
    safetyNotes: ["Use heat-resistant tongs to hold hot china dish."],
    realLifeApplications: ["Metal patination and surface oxide metallurgy."],
    ncertConcept: "Activity 1.11: Gain of oxygen represents oxidation; loss of oxygen represents reduction.",
    tags: ["Copper", "Oxidation", "CuO", "Redox", "Activity 1.11"],
    boardImportance: "Very High",
    commonBoardQuestion: "A shiny brown coloured element 'X' on heating in air becomes black in colour. Name 'X' and the black compound. (Ans: 'X' is Copper Cu, black compound is Copper(II) Oxide CuO)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Add virtual substance: Spread reddish-brown copper powder on the virtual dish." },
      { step: 2, description: "Start simulation: Apply thermal energy in the presence of atmospheric oxygen." },
      { step: 3, description: "Observe colour change: Surface oxidizes to jet black Copper(II) Oxide (CuO)." }
    ],
    interactiveEntities: [
      { formula: "Cu", name: "Copper Powder", role: "reactant", state: "s", color: "#b45309", ncertNote: "Shiny reddish-brown metal" },
      { formula: "O₂", name: "Atmospheric Oxygen", role: "reactant", state: "g", color: "#38bdf8" },
      { formula: "CuO", name: "Copper(II) Oxide", role: "product", state: "s", color: "#1e293b", ncertNote: "Black oxide coating" }
    ],
    simulatorConfig: {
      apparatus: "china-dish",
      primarySubstance: { name: "Brown Copper Powder", formula: "Cu", appearance: "Reddish-brown powder", solidColor: "#b45309" },
      addedSubstance: { name: "Burner Heat + Air", formula: "O₂ + Heat", appearance: "Heating flame", actionLabel: "Heat in Air", type: "heat" },
      reactionResult: {
        precipitateColor: "#1e293b",
        hasPrecipitate: true,
        precipitateName: "Jet Black Copper(II) Oxide (CuO)",
        tempChange: "exothermic",
        tempDisplay: "Hot Dish 380°C"
      },
      molecularScene: {
        description: "Cu atoms bind with O atoms from atmospheric O₂ to form black CuO.",
        reactants: [{ name: "Cu", formula: "Cu", count: 2, color: "#b45309" }, { name: "O₂", formula: "O₂", count: 1, color: "#38bdf8" }],
        products: [{ name: "CuO", formula: "CuO", count: 2, color: "#1e293b" }],
        mechanism: "oxidize"
      }
    },
    quiz: [
      {
        question: "What is the black compound formed when copper powder is heated in air?",
        options: ["Cu₂O", "CuO", "CuCO₃", "Cu(OH)₂"],
        answer: "CuO",
        explanation: "Copper(II) oxide (CuO) is black in colour, formed by the oxidation of copper."
      }
    ]
  }
];
