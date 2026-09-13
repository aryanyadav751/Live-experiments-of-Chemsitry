import { Reaction } from "../types";

export const CHAPTER_3_REACTIONS: Reaction[] = [
  {
    id: "ch3-amphoteric-alumina-acid-base",
    chapter: "Metals and Non-metals",
    chapterNumber: 3,
    topic: "Amphoteric Oxides",
    title: "Amphoteric Nature of Aluminium Oxide (Reactions with Acid & Base)",
    reactants: ["Al₂O₃(s)", "6HCl(aq)"],
    products: ["2AlCl₃(aq)", "3H₂O(l)"],
    equation: "Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O (with Acid) & Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O (with Base)",
    balancedEquation: "Al₂O₃(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂O(l)",
    reactionType: ["Neutralisation", "Double Displacement"],
    conditions: ["Reaction with dilute acid and concentrated alkali"],
    observations: [
      "White insoluble aluminium oxide dissolves both in hydrochloric acid and in sodium hydroxide.",
      "Forms aluminium chloride with acid, and soluble sodium aluminate (NaAlO₂) with base."
    ],
    explanation: "Metal oxides that react with both acids as well as bases to produce salt and water are known as amphoteric oxides. Al₂O₃ and ZnO are prime examples.",
    molecularExplanation: "In acidic media, Al₂O₃ acts as a base accepting protons. In strongly basic media, it acts as an acid forming [Al(OH)₄]⁻ / AlO₂⁻ anions.",
    experimentMode: "safe",
    safetyNotes: ["Safe simulation."],
    realLifeApplications: ["Anodizing aluminum cookware to provide corrosion-resistant, scratch-proof coating."],
    ncertConcept: "Section 3.2.1: Definition and reactions of amphoteric oxides (Al₂O₃ and ZnO).",
    tags: ["Amphoteric Oxide", "Al₂O₃", "Sodium Aluminate", "NaAlO₂", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "What are amphoteric oxides? Give two examples and write chemical equations showing amphoteric nature of aluminium oxide. (Ans: Oxides reacting with both acids and bases; Al₂O₃, ZnO)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Take insoluble white aluminium oxide (Al₂O₃) in two separate test tubes." },
      { step: 2, description: "Add dilute HCl to tube 1: Al₂O₃ dissolves to form clear AlCl₃." },
      { step: 3, description: "Add NaOH to tube 2: Al₂O₃ dissolves to form soluble sodium aluminate (NaAlO₂)." }
    ],
    interactiveEntities: [
      { formula: "Al₂O₃", name: "Aluminium Oxide", role: "reactant", state: "s", color: "#e2e8f0", ncertNote: "Amphoteric metal oxide" },
      { formula: "HCl", name: "Hydrochloric Acid", role: "reactant", state: "aq", color: "#0284c7" },
      { formula: "AlCl₃", name: "Aluminium Chloride", role: "product", state: "aq", color: "#f8fafc" },
      { formula: "NaAlO₂", name: "Sodium Aluminate", role: "product", state: "aq", color: "#cbd5e1", ncertNote: "Salt formed with NaOH base" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Aluminium Oxide Powder", formula: "Al₂O₃(s)", appearance: "White oxide powder", solidColor: "#f8fafc" },
      addedSubstance: { name: "NaOH or HCl", formula: "Base / Acid", appearance: "Reagent", actionLabel: "Add Acid / Base", type: "liquid" },
      reactionResult: {
        liquidColor: "#f8fafc",
        precipitateColor: "transparent",
        hasPrecipitate: false,
        tempChange: "exothermic",
        tempDisplay: "Dissolved Completely (28°C)"
      }
    },
    quiz: [
      {
        question: "Which of the following is an amphoteric oxide?",
        options: ["Na₂O", "Al₂O₃", "CaO", "K₂O"],
        answer: "Al₂O₃",
        explanation: "Al₂O₃ (and ZnO) reacts with both acids and bases to produce salt and water."
      }
    ]
  },
  {
    id: "ch3-sodium-cold-water",
    chapter: "Metals and Non-metals",
    chapterNumber: 3,
    topic: "Reaction of Metals with Water",
    title: "Vigorous Reaction of Sodium Metal with Cold Water",
    reactants: ["2Na(s)", "2H₂O(l)"],
    products: ["2NaOH(aq)", "H₂(g)"],
    equation: "Na + H₂O → NaOH + H₂",
    balancedEquation: "2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)↑ + Heat Energy",
    reactionType: ["Displacement", "Redox", "Exothermic"],
    conditions: ["Dropping a tiny rice-grain sized sodium piece in a trough of water"],
    observations: [
      "Sodium darts rapidly across the water surface as a molten silvery ball with a loud hissing sound.",
      "The heat produced is so intense that evolved hydrogen gas immediately catches fire with a golden-yellow flame.",
      "The resulting solution turns red litmus paper blue, proving strong alkaline sodium hydroxide (NaOH) formation."
    ],
    explanation: "Sodium is near the top of the reactivity series. Its reaction with cold water is violently exothermic, producing hydrogen gas which ignites spontaneously in air.",
    molecularExplanation: "Na atoms instantly shed single valence electrons to H₂O: 2Na + 2H₂O → 2Na⁺ + 2OH⁻ + H₂.",
    experimentMode: "simulation-only",
    safetyNotes: [
      "NEVER touch sodium with bare wet hands; stored under kerosene to prevent accidental ignition.",
      "Only tiny pieces (rice-grain size) behind safety shield."
    ],
    realLifeApplications: ["Handling highly reactive alkali metal safety in industry."],
    ncertConcept: "Section 3.2.2 & Activity 3.10: Demonstrates violent reactivity of alkali metals with cold water.",
    tags: ["Sodium", "Cold Water", "Catches Fire", "Yellow Flame", "Activity 3.10"],
    boardImportance: "Very High",
    commonBoardQuestion: "Why is sodium kept immersed in kerosene oil? What happens when it is placed in water? (Ans: It reacts violently with atmospheric moisture and oxygen catching fire)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Extract small sodium piece from kerosene and blot dry on filter paper." },
      { step: 2, description: "Drop into water trough; sodium melts into a darting sphere." },
      { step: 3, description: "Evolved H₂ catches fire with a bright yellow flame; basic NaOH solution remains." }
    ],
    interactiveEntities: [
      { formula: "Na", name: "Sodium Metal", role: "reactant", state: "s", color: "#cbd5e1", ncertNote: "Soft alkali metal, stored under kerosene" },
      { formula: "H₂O", name: "Water", role: "reactant", state: "l", color: "#38bdf8" },
      { formula: "NaOH", name: "Sodium Hydroxide", role: "product", state: "aq", color: "#93c5fd", ncertNote: "Alkaline solution, turns red litmus blue" },
      { formula: "H₂", name: "Hydrogen Gas", role: "product", state: "g", color: "#facc15", ncertNote: "Catches fire immediately" }
    ],
    simulatorConfig: {
      apparatus: "beaker",
      primarySubstance: { name: "Water Trough", formula: "H₂O", appearance: "Cold water", liquidColor: "#e0f2fe" },
      addedSubstance: { name: "Sodium Pellet", formula: "Na(s)", appearance: "Silvery soft pellet", actionLabel: "Drop Sodium Pellet", type: "solid" },
      reactionResult: {
        liquidColor: "#bae6fd",
        bubbles: true,
        gasName: "Hydrogen Gas catching fire",
        flameColor: "#eab308",
        tempChange: "exothermic",
        tempDisplay: "Vigorous Ignition (>800°C flame)",
        soundEffect: "Violent hissing popping sound"
      }
    }
  },
  {
    id: "ch3-calcium-cold-water",
    chapter: "Metals and Non-metals",
    chapterNumber: 3,
    topic: "Reaction of Metals with Water",
    title: "Reaction of Calcium with Cold Water (Floating Phenomenon)",
    reactants: ["Ca(s)", "2H₂O(l)"],
    products: ["Ca(OH)₂(aq)", "H₂(g)"],
    equation: "Ca + H₂O → Ca(OH)₂ + H₂",
    balancedEquation: "Ca(s) + 2H₂O(l) → Ca(OH)₂(aq) + H₂(g)↑",
    reactionType: ["Displacement", "Redox"],
    conditions: ["Room temperature water in a beaker"],
    observations: [
      "Reaction is steady and less violent; heat evolved is not sufficient for hydrogen to catch fire.",
      "Calcium pieces sink initially, then start FLOATING to the surface.",
      "Floating occurs because evolved bubbles of hydrogen gas stick to the metal surface, acting like tiny buoyancy floats."
    ],
    explanation: "Calcium is less reactive than sodium. The reaction produces calcium hydroxide and hydrogen gas, but the energy release does not ignite the gas.",
    molecularExplanation: "Ca loses 2 electrons to form Ca²⁺; sticking H₂ gas bubbles decrease the effective density of the calcium metal chunks.",
    experimentMode: "safe",
    safetyNotes: ["Safe classroom demonstration."],
    realLifeApplications: ["Production of slaked lime and calcium salts."],
    ncertConcept: "Section 3.2.2: Explanation of why calcium starts floating when dropped in water.",
    tags: ["Calcium", "Cold Water", "Floats", "H₂ Bubbles", "Board Favorite"],
    boardImportance: "High",
    commonBoardQuestion: "Why does calcium start floating when treated with water? (Ans: Bubbles of hydrogen gas stick to its surface)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Drop grey calcium granules into water beaker; they sink to the bottom." },
      { step: 2, description: "Steady hydrogen gas bubbles begin forming on the metal surface." },
      { step: 3, description: "Adhering H₂ bubbles lift the calcium metal to the surface, making it float." }
    ],
    interactiveEntities: [
      { formula: "Ca", name: "Calcium Metal", role: "reactant", state: "s", color: "#94a3b8" },
      { formula: "H₂O", name: "Water", role: "reactant", state: "l", color: "#38bdf8" },
      { formula: "Ca(OH)₂", name: "Calcium Hydroxide", role: "product", state: "aq", color: "#f8fafc" },
      { formula: "H₂", name: "Hydrogen Gas Bubbles", role: "product", state: "g", color: "#60a5fa", ncertNote: "Stick to calcium surface providing buoyancy" }
    ],
    simulatorConfig: {
      apparatus: "beaker",
      primarySubstance: { name: "Water Beaker", formula: "H₂O", appearance: "Cold water", liquidColor: "#e0f2fe" },
      addedSubstance: { name: "Calcium Granules", formula: "Ca(s)", appearance: "Grey granules", actionLabel: "Add Calcium Metal", type: "solid" },
      reactionResult: {
        liquidColor: "#f1f5f9",
        bubbles: true,
        gasName: "H₂ Bubbles sticking to Calcium (Metal Floats!)",
        tempChange: "exothermic",
        tempDisplay: "Warm (+10°C Rise)"
      }
    }
  },
  {
    id: "ch3-iron-steam-action",
    chapter: "Metals and Non-metals",
    chapterNumber: 3,
    topic: "Reaction of Metals with Steam",
    title: "Action of Steam on Red-Hot Iron (Magnetic Oxide Formation)",
    reactants: ["3Fe(s)", "4H₂O(g)"],
    products: ["Fe₃O₄(s)", "4H₂(g)"],
    equation: "Fe + H₂O(g) → Fe₃O₄ + H₂",
    balancedEquation: "3Fe(s) + 4H₂O(g) —(Red Hot)→ Fe₃O₄(s) + 4H₂(g)↑",
    reactionType: ["Redox", "Displacement"],
    conditions: ["Passing steam from wet glass-wool over red-hot iron metal in a hard-glass tube"],
    observations: [
      "Shiny iron turnings turn into dark black magnetic oxide of iron (Fe₃O₄ / ferroso-ferric oxide).",
      "Hydrogen gas collects over water in the pneumatic trough.",
      "The gas burns with a pop sound when tested."
    ],
    explanation: "Iron does not react with cold or hot water, but reacts with steam when heated red hot to produce mixed iron oxide (Fe₃O₄ = FeO·Fe₂O₃) and hydrogen gas.",
    molecularExplanation: "High kinetic energy steam molecules break on red-hot Fe surface, donating oxygen to form Fe₃O₄ lattice and releasing H₂ gas.",
    experimentMode: "teacher-demo",
    safetyNotes: [
      "Remove the delivery tube from water before taking away burner to prevent cold water back-suction and tube cracking."
    ],
    realLifeApplications: ["Lane's process for commercial manufacture of hydrogen gas."],
    ncertConcept: "Figure 3.3 & Section 3.2.2: Action of steam on metals like Fe, Al, Zn.",
    tags: ["Fe₃O₄", "Steam", "Red Hot Iron", "Figure 3.3", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "Write a balanced chemical equation for the reaction of iron with steam. Name the oxide formed. (Ans: 3Fe + 4H₂O(g) → Fe₃O₄ + 4H₂; Magnetic oxide of iron / iron(II,III) oxide)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Heat wet glass-wool to generate continuous stream of steam." },
      { step: 2, description: "Steam passes over red-hot iron sample inside the glass combustion tube." },
      { step: 3, description: "Black Fe₃O₄ forms on iron while H₂ gas is collected over water trough." }
    ],
    interactiveEntities: [
      { formula: "Fe", name: "Iron Turnings", role: "reactant", state: "s", color: "#64748b" },
      { formula: "H₂O(g)", name: "Steam", role: "reactant", state: "g", color: "#cbd5e1" },
      { formula: "Fe₃O₄", name: "Iron(II,III) Oxide", role: "product", state: "s", color: "#0f172a", ncertNote: "Black magnetic oxide (ferroso-ferric oxide)" },
      { formula: "H₂", name: "Hydrogen Gas", role: "product", state: "g", color: "#38bdf8" }
    ],
    simulatorConfig: {
      apparatus: "test-tube",
      primarySubstance: { name: "Iron Turnings (Red Hot)", formula: "Fe(s)", appearance: "Glowing red metal", solidColor: "#dc2626" },
      addedSubstance: { name: "Steam Stream", formula: "H₂O(g)", appearance: "Hot steam vapour", actionLabel: "Pass Steam over Iron", type: "gas" },
      reactionResult: {
        precipitateColor: "#0f172a",
        hasPrecipitate: true,
        precipitateName: "Black Magnetic Oxide Fe₃O₄",
        bubbles: true,
        gasName: "H₂ gas collected over trough",
        tempChange: "exothermic",
        tempDisplay: "Red Hot (>700°C)"
      }
    }
  },
  {
    id: "ch3-roasting-zinc-sulphide",
    chapter: "Metals and Non-metals",
    chapterNumber: 3,
    topic: "Extraction of Metals",
    title: "Roasting of Zinc Sulphide (Sphalerite) in Excess Air",
    reactants: ["2ZnS(s)", "3O₂(g)"],
    products: ["2ZnO(s)", "2SO₂(g)"],
    equation: "ZnS + O₂ → ZnO + SO₂",
    balancedEquation: "2ZnS(s) + 3O₂(g) —(Heat in excess air)→ 2ZnO(s) + 2SO₂(g)↑",
    reactionType: ["Roasting", "Oxidation", "Redox"],
    conditions: ["Strong heating below melting point in presence of EXCESS air"],
    observations: [
      "Dense greyish zinc sulphide ore converts to yellowish-white zinc oxide powder.",
      "Choking sulphur dioxide (SO₂) gas is expelled."
    ],
    explanation: "Sulphide ores are converted into metal oxides by heating strongly in excess air (Roasting) because it is easier to reduce metal oxides to metals than sulphides.",
    molecularExplanation: "Oxygen replaces sulphur in the ZnS crystal matrix, releasing SO₂ gas.",
    experimentMode: "simulation-only",
    safetyNotes: ["Industrial metallurgical operation; SO₂ gas scrubbing required."],
    realLifeApplications: ["Commercial extraction of zinc metal from zinc blende ore."],
    ncertConcept: "Section 3.4.4: Roasting (heating sulphide ores in excess air) vs Calcination.",
    tags: ["Roasting", "ZnS", "Excess Air", "Metallurgy", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "Differentiate between roasting and calcination with balanced chemical equations. (Ans: Roasting is heating sulphide ore in excess air; Calcination is heating carbonate ore in limited air)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Crushed zinc sulphide (ZnS) ore is fed into furnace." },
      { step: 2, description: "Blow excess hot air/oxygen over the ore while heating." },
      { step: 3, description: "ZnS converts to solid ZnO while gaseous SO₂ is vented." }
    ],
    interactiveEntities: [
      { formula: "ZnS", name: "Zinc Sulphide (Zinc Blende)", role: "reactant", state: "s", color: "#64748b" },
      { formula: "O₂", name: "Excess Air / Oxygen", role: "reactant", state: "g", color: "#38bdf8" },
      { formula: "ZnO", name: "Zinc Oxide", role: "product", state: "s", color: "#fef08a", ncertNote: "Yellow when hot, white when cold" },
      { formula: "SO₂", name: "Sulphur Dioxide Gas", role: "product", state: "g", color: "#cbd5e1" }
    ],
    simulatorConfig: {
      apparatus: "crucible",
      primarySubstance: { name: "Crushed ZnS Ore", formula: "ZnS(s)", appearance: "Grey ore powder", solidColor: "#64748b" },
      addedSubstance: { name: "Excess Blast Air + Heat", formula: "O₂ + Δ", appearance: "Air stream", actionLabel: "Blow Air & Roast", type: "gas" },
      reactionResult: {
        precipitateColor: "#fef08a",
        hasPrecipitate: true,
        precipitateName: "Zinc Oxide (ZnO)",
        bubbles: true,
        gasName: "SO₂ Gas Vented",
        tempChange: "endothermic",
        tempDisplay: "Roaster Furnace 800°C"
      }
    }
  },
  {
    id: "ch3-calcination-zinc-carbonate",
    chapter: "Metals and Non-metals",
    chapterNumber: 3,
    topic: "Extraction of Metals",
    title: "Calcination of Zinc Carbonate (Calamine) in Limited Air",
    reactants: ["ZnCO₃(s)"],
    products: ["ZnO(s)", "CO₂(g)"],
    equation: "ZnCO₃ → ZnO + CO₂",
    balancedEquation: "ZnCO₃(s) —(Heat in limited air)→ ZnO(s) + CO₂(g)↑",
    reactionType: ["Decomposition", "Calcination"],
    conditions: ["Strong heating in the ABSENCE or limited supply of air"],
    observations: [
      "White calamine ore powder decomposes into zinc oxide (yellow when hot, white when cold).",
      "Carbon dioxide gas is released without requiring any oxygen."
    ],
    explanation: "Carbonate ores are changed into oxides by heating strongly in limited or no air (Calcination). The oxide is then reduced by carbon to metal.",
    molecularExplanation: "ZnCO₃ decomposes thermally: ZnCO₃(s) → ZnO(s) + CO₂(g).",
    experimentMode: "safe",
    safetyNotes: ["Safe simulation."],
    realLifeApplications: ["Extraction of zinc from calamine ore."],
    ncertConcept: "Section 3.4.4: Calcination for carbonate ores.",
    tags: ["Calcination", "ZnCO₃", "Limited Air", "Calamine", "Board Favorite"],
    boardImportance: "Very High",
    energyChange: "Endothermic",
    animationSteps: [
      { step: 1, description: "Load zinc carbonate (calamine) in a closed retort." },
      { step: 2, description: "Heat strongly in limited air; thermal breakdown begins." },
      { step: 3, description: "Solid zinc oxide residue forms and CO₂ escapes." }
    ],
    interactiveEntities: [
      { formula: "ZnCO₃", name: "Zinc Carbonate (Calamine)", role: "reactant", state: "s", color: "#f1f5f9" },
      { formula: "ZnO", name: "Zinc Oxide", role: "product", state: "s", color: "#fef08a" },
      { formula: "CO₂", name: "Carbon Dioxide", role: "product", state: "g", color: "#94a3b8" }
    ],
    simulatorConfig: {
      apparatus: "crucible",
      primarySubstance: { name: "Calamine Powder", formula: "ZnCO₃", appearance: "White carbonate powder", solidColor: "#f1f5f9" },
      addedSubstance: { name: "Limited Air Heat", formula: "Δ", appearance: "Retort furnace", actionLabel: "Calcine Ore", type: "heat" },
      reactionResult: {
        precipitateColor: "#fef08a",
        hasPrecipitate: true,
        precipitateName: "Zinc Oxide (ZnO)",
        bubbles: true,
        gasName: "Carbon Dioxide (CO₂)",
        tempChange: "endothermic",
        tempDisplay: "Kiln 650°C"
      }
    }
  },
  {
    id: "ch3-reduction-zinc-oxide-carbon",
    chapter: "Metals and Non-metals",
    chapterNumber: 3,
    topic: "Extraction of Metals",
    title: "Reduction of Zinc Oxide by Carbon (Coke)",
    reactants: ["ZnO(s)", "C(s)"],
    products: ["Zn(s)", "CO(g)"],
    equation: "ZnO + C → Zn + CO",
    balancedEquation: "ZnO(s) + C(s) —(High Heat)→ Zn(s) + CO(g)↑",
    reactionType: ["Reduction", "Redox"],
    conditions: ["High temperature heating with carbon (coke) in vertical retort"],
    observations: [
      "Black mixture of zinc oxide and coke produces zinc vapor at high temperature.",
      "Vapors condense into shiny liquid / solid metallic zinc.",
      "Carbon monoxide gas is evolved."
    ],
    explanation: "Carbon acts as a reducing agent, removing oxygen from zinc oxide to yield elemental zinc and carbon monoxide.",
    molecularExplanation: "C atom has greater chemical affinity for oxygen at elevated temperatures than Zn, stripping oxygen from ZnO.",
    experimentMode: "simulation-only",
    safetyNotes: ["Industrial metallurgical process; CO is an asphyxiating gas."],
    realLifeApplications: ["Smelting of zinc and blast furnace iron reduction."],
    ncertConcept: "Section 3.4.4: Reduction of metal oxides using carbon reducing agent.",
    tags: ["Reduction", "Coke", "ZnO", "Smelting"],
    boardImportance: "High",
    energyChange: "Endothermic",
    animationSteps: [
      { step: 1, description: "Blend powdered zinc oxide with crushed coke (carbon)." },
      { step: 2, description: "Heat to 1200°C in distillation retort." },
      { step: 3, description: "Metallic zinc vaporizes and is collected in condensers." }
    ],
    interactiveEntities: [
      { formula: "ZnO", name: "Zinc Oxide", role: "reactant", state: "s", color: "#fef08a" },
      { formula: "C", name: "Carbon (Coke)", role: "reactant", state: "s", color: "#334155" },
      { formula: "Zn", name: "Zinc Metal", role: "product", state: "s", color: "#94a3b8" },
      { formula: "CO", name: "Carbon Monoxide", role: "product", state: "g", color: "#64748b" }
    ],
    simulatorConfig: {
      apparatus: "crucible",
      primarySubstance: { name: "ZnO + Coke Mix", formula: "ZnO + C", appearance: "Dark grey mixture", solidColor: "#475569" },
      addedSubstance: { name: "Smelting Heat", formula: "1200°C", appearance: "Furnace", actionLabel: "Smelt with Coke", type: "heat" },
      reactionResult: {
        precipitateColor: "#94a3b8",
        hasPrecipitate: true,
        precipitateName: "Metallic Zinc (Condensed)",
        bubbles: true,
        gasName: "Carbon Monoxide (CO)",
        tempChange: "endothermic",
        tempDisplay: "Smelting Temp 1200°C"
      }
    }
  },
  {
    id: "ch3-thermite-reaction",
    chapter: "Metals and Non-metals",
    chapterNumber: 3,
    topic: "Extraction of Metals & Exothermic Reactions",
    title: "The Thermite Reaction (Joining Railway Tracks)",
    reactants: ["Fe₂O₃(s)", "2Al(s)"],
    products: ["2Fe(l)", "Al₂O₃(s)"],
    equation: "Fe₂O₃ + 2Al → 2Fe + Al₂O₃",
    balancedEquation: "Fe₂O₃(s) + 2Al(s) —(Ignition)→ 2Fe(l) + Al₂O₃(s) + Tremendous Heat",
    reactionType: ["Displacement", "Redox", "Exothermic"],
    conditions: ["Ignited using a magnesium ribbon fuse in a refractory crucible"],
    observations: [
      "Spectacular blinding shower of white-hot sparks and fiery sparks.",
      "Temperatures soar above 2500°C.",
      "The iron metal produced is in the MOLTEN liquid state and flows freely into track fissures to weld them seamlessly."
    ],
    explanation: "Aluminium has an extraordinarily high affinity for oxygen and displaces iron from iron(III) oxide. The reaction is so fiercely exothermic that the iron metal is formed as molten liquid.",
    molecularExplanation: "Aluminium strips oxygen from Fe³⁺: 2Al + Fe₂O₃ → Al₂O₃ + 2Fe. ΔH is immense (-851 kJ/mol).",
    experimentMode: "simulation-only",
    safetyNotes: [
      "Extremely hazardous real-world reaction. Generates molten iron >2500°C. Never attempt without industrial safety enclosures."
    ],
    realLifeApplications: ["Welding broken railway tracks and repair of heavy cracked industrial machine castings."],
    ncertConcept: "Section 3.4.4 & Figure 3.11: Highly exothermic reduction using reactive metal (aluminium).",
    tags: ["Thermite Reaction", "Molten Iron", "Railway Tracks", "Figure 3.11", "Exothermic", "Board Favorite"],
    boardImportance: "Very High",
    commonBoardQuestion: "What is the thermite reaction? Write the balanced chemical equation and state one practical application. (Ans: Fe₂O₃ + 2Al → 2Fe(l) + Al₂O₃ + Heat; used to weld railway tracks)",
    energyChange: "Exothermic",
    animationSteps: [
      { step: 1, description: "Load powdered Fe₂O₃ and fine aluminium powder into conical refractory crucible." },
      { step: 2, description: "Ignite magnesium fuse; blinding thermal fireworks ignite instantly." },
      { step: 3, description: "Glowing molten iron (2Fe) pours into railway track joint, solidifying into solid steel weld." }
    ],
    interactiveEntities: [
      { formula: "Fe₂O₃", name: "Iron(III) Oxide", role: "reactant", state: "s", color: "#b45309", ncertNote: "Haematite powder" },
      { formula: "Al", name: "Aluminium Powder", role: "reactant", state: "s", color: "#cbd5e1", ncertNote: "Powerful reducing agent" },
      { formula: "Fe(l)", name: "Molten Iron", role: "product", state: "l", color: "#f97316", ncertNote: "Molten state due to intense heat" },
      { formula: "Al₂O₃", name: "Aluminium Oxide Slag", role: "product", state: "s", color: "#f8fafc" }
    ],
    simulatorConfig: {
      apparatus: "crucible",
      primarySubstance: { name: "Thermite Mix (Fe₂O₃ + Al)", formula: "Fe₂O₃ + 2Al", appearance: "Grey-red granular mixture", solidColor: "#78350f" },
      addedSubstance: { name: "Magnesium Fuse Ignition", formula: "Mg Fuse", appearance: "Bright sparkling fuse", actionLabel: "Ignite Thermite Fuse", type: "heat" },
      reactionResult: {
        precipitateColor: "#f97316",
        hasPrecipitate: true,
        precipitateName: "White-Hot Molten Iron Fe(l)",
        flameColor: "#fbbf24",
        smokeColor: "#ffffff",
        tempChange: "exothermic",
        tempDisplay: "Blinding Molten Heat (>2500°C!)"
      },
      molecularScene: {
        description: "2 Al atoms displace iron atoms from Fe₂O₃, liberating glowing molten iron.",
        reactants: [{ name: "Fe₂O₃", formula: "Fe₂O₃", count: 1, color: "#b45309" }, { name: "Al", formula: "Al", count: 2, color: "#cbd5e1" }],
        products: [{ name: "Fe", formula: "Fe(liquid)", count: 2, color: "#f97316" }, { name: "Al₂O₃", formula: "Al₂O₃", count: 1, color: "#ffffff" }],
        mechanism: "displace"
      }
    },
    quiz: [
      {
        question: "Why is the iron produced in the thermite reaction in molten liquid state?",
        options: ["Iron has a very low melting point", "The reaction is extraordinarily exothermic", "External heat melts it", "Aluminium acts as a flux"],
        answer: "The reaction is extraordinarily exothermic",
        explanation: "The amount of heat evolved is so massive (>2500°C) that it far exceeds the melting point of iron (1538°C)."
      }
    ]
  }
];
