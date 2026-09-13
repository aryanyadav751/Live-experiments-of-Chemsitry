export interface EncyclopediaSubstance {
  id: string;
  formula: string;
  iupacName: string;
  commonNames: string[];
  appearance: string;
  colorHex: string;
  physicalState: "solid" | "liquid" | "aqueous" | "gas";
  molarMass: string;
  ncertReference: string;
  reactionsInvolved: {
    id: string;
    title: string;
    equation: string;
    role: "reactant" | "product" | "catalyst";
  }[];
  relatedExperiments: string[];
  relatedConcepts: string[];
  boardExamTips: string;
}

export const ENCYCLOPEDIA_SUBSTANCES: EncyclopediaSubstance[] = [
  {
    id: "cuso4",
    formula: "CuSO₄",
    iupacName: "Copper(II) sulphate",
    commonNames: ["Blue Vitriol", "Hydrated Copper Sulphate (CuSO₄·5H₂O)", "Neela Thotha"],
    appearance: "Vivid blue crystalline solid (hydrated CuSO₄·5H₂O); turns white amorphous powder when heated to anhydrous state.",
    colorHex: "#2563eb",
    physicalState: "solid",
    molarMass: "159.61 g/mol (anhydrous), 249.68 g/mol (pentahydrate)",
    ncertReference: "Chapter 1: Activity 1.9 (Displacement by Iron); Chapter 2: Activity 2.15 (Water of Crystallisation).",
    reactionsInvolved: [
      {
        id: "ch1-iron-copper-sulphate-displacement",
        title: "Displacement of Copper by Iron",
        equation: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)",
        role: "reactant"
      },
      {
        id: "ch2-copper-sulphate-crystallisation-water",
        title: "Thermal Dehydration of Blue Vitriol",
        equation: "CuSO₄·5H₂O(s) —(Heat)→ CuSO₄(s) + 5H₂O(g)",
        role: "reactant"
      }
    ],
    relatedExperiments: ["Iron nail displacement", "Heating hydrated crystals in dry test tube"],
    relatedConcepts: ["Reactivity Series", "Displacement Reaction", "Water of Crystallisation", "Reversible Hydration"],
    boardExamTips: "Board examiners frequently ask: 'What happens when blue copper sulphate crystals are heated in a dry boiling tube?' Remember to mention: (1) Crystals turn white, (2) Water droplets condense near the tube mouth, and (3) Adding 2-3 drops of water restores the blue color!"
  },
  {
    id: "fe",
    formula: "Fe",
    iupacName: "Iron",
    commonNames: ["Iron metal", "Iron nails", "Iron filings"],
    appearance: "Greyish-silver lustrous metal; turns reddish-brown when rusted or coated with displaced copper.",
    colorHex: "#64748b",
    physicalState: "solid",
    molarMass: "55.85 g/mol",
    ncertReference: "Chapter 1: Activity 1.9; Chapter 3: Activity 3.10 (Action of Steam); Chapter 3: Section 3.5 (Corrosion & Rusting).",
    reactionsInvolved: [
      {
        id: "ch1-iron-copper-sulphate-displacement",
        title: "Displacement of Copper by Iron",
        equation: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)",
        role: "reactant"
      },
      {
        id: "ch3-iron-steam-action",
        title: "Action of Steam on Red-Hot Iron",
        equation: "3Fe(s) + 4H₂O(g) → Fe₃O₄(s) + 4H₂(g)↑",
        role: "reactant"
      },
      {
        id: "ch3-thermite-reaction",
        title: "Thermite Molten Iron Production",
        equation: "Fe₂O₃(s) + 2Al(s) → 2Fe(l) + Al₂O₃(s) + Heat",
        role: "product"
      }
    ],
    relatedExperiments: ["Iron nail in copper sulphate", "Action of steam on iron coil", "Thermite reaction demonstration"],
    relatedConcepts: ["Reactivity of metals", "Displacement", "Oxidation states (Fe²⁺ vs Fe³⁺)", "Galvanisation"],
    boardExamTips: "In Activity 1.9, clean iron nails with sand paper before immersing so protective grease or rust does not interfere with the displacement rate."
  },
  {
    id: "feso4",
    formula: "FeSO₄",
    iupacName: "Iron(II) sulphate",
    commonNames: ["Ferrous sulphate", "Green Vitriol (FeSO₄·7H₂O)", "Hara Kasis"],
    appearance: "Pale green crystalline solid (heptahydrate); turns dirty white on gentle warming and brown Fe₂O₃ on strong heating.",
    colorHex: "#86efac",
    physicalState: "solid",
    molarMass: "151.91 g/mol (anhydrous), 278.02 g/mol (heptahydrate)",
    ncertReference: "Chapter 1: Activity 1.5 (Thermal Decomposition); Chapter 1: Activity 1.9 (Displacement solution product).",
    reactionsInvolved: [
      {
        id: "ch1-ferrous-sulphate-decomposition",
        title: "Thermal Decomposition of Ferrous Sulphate",
        equation: "2FeSO₄(s) —(Heat)→ Fe₂O₃(s) + SO₂(g) + SO₃(g)",
        role: "reactant"
      },
      {
        id: "ch1-iron-copper-sulphate-displacement",
        title: "Displacement of Copper by Iron",
        equation: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)",
        role: "product"
      }
    ],
    relatedExperiments: ["Heating green ferrous sulphate crystals in a dry boiling tube"],
    relatedConcepts: ["Thermal Decomposition", "Water of Crystallisation", "Choking gases SO₂/SO₃"],
    boardExamTips: "Identify the characteristic choking odour like burning sulphur during decomposition: it is caused by SO₂ gas! The solid residue left in the tube is reddish-brown Fe₂O₃."
  },
  {
    id: "cao",
    formula: "CaO",
    iupacName: "Calcium oxide",
    commonNames: ["Quicklime", "Burnt lime", "Chuna"],
    appearance: "White amorphous solid / porous lumps; highly basic, reacts violently with moisture.",
    colorHex: "#f8fafc",
    physicalState: "solid",
    molarMass: "56.08 g/mol",
    ncertReference: "Chapter 1: Activity 1.4 (Combination with Water); Chapter 1: Section 1.2.2 (Limestone decomposition).",
    reactionsInvolved: [
      {
        id: "ch1-slaked-lime",
        title: "Slaking of Lime with Water",
        equation: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat",
        role: "reactant"
      },
      {
        id: "ch1-limestone-decomposition",
        title: "Thermal Decomposition of Limestone",
        equation: "CaCO₃(s) —(Heat)→ CaO(s) + CO₂(g)",
        role: "product"
      }
    ],
    relatedExperiments: ["Addition of water to quicklime in a beaker (hissing sound and boiling heat)"],
    relatedConcepts: ["Exothermic Combination Reaction", "Manufacture of Cement", "Basic metal oxide"],
    boardExamTips: "Board favourite question: 'A solution of a substance X is used for whitewashing. Name the substance X and write its formula.' Ans: Substance X is Calcium oxide (CaO)."
  },
  {
    id: "caoh2",
    formula: "Ca(OH)₂",
    iupacName: "Calcium hydroxide",
    commonNames: ["Slaked lime", "Lime water (clear aqueous solution)", "Milk of lime (suspension)"],
    appearance: "Fine white powder; clear colourless transparent aqueous solution (lime water) when filtered.",
    colorHex: "#e2e8f0",
    physicalState: "solid",
    molarMass: "74.09 g/mol",
    ncertReference: "Chapter 1: Activity 1.4; Chapter 1: Box page 6; Chapter 2: Activity 2.5 (Lime water test for CO₂); Chapter 2: Section 2.4.2 (Bleaching powder synthesis).",
    reactionsInvolved: [
      {
        id: "ch1-slaked-lime",
        title: "Formation of Slaked Lime",
        equation: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat",
        role: "product"
      },
      {
        id: "ch1-whitewash-carbonation",
        title: "Carbonation of Slaked Lime on Walls",
        equation: "Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l)",
        role: "reactant"
      },
      {
        id: "ch2-lime-water-milky-excess",
        title: "Lime Water Test for Carbon Dioxide",
        equation: "Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s)↓ + H₂O(l)",
        role: "reactant"
      },
      {
        id: "ch2-bleaching-powder-synthesis",
        title: "Dry Slaked Lime Reaction with Chlorine",
        equation: "Ca(OH)₂(s) + Cl₂(g) → CaOCl₂(s) + H₂O(l)",
        role: "reactant"
      }
    ],
    relatedExperiments: ["Lime water test with exhaled air or acid-carbonate reaction"],
    relatedConcepts: ["Gas identification for CO₂", "Whitewashing chemistry", "Bleaching powder manufacture"],
    boardExamTips: "Lime water turns milky due to insoluble white CaCO₃ precipitate. Passing excess CO₂ causes milkiness to disappear because soluble Ca(HCO₃)₂ forms!"
  },
  {
    id: "caco3",
    formula: "CaCO₃",
    iupacName: "Calcium carbonate",
    commonNames: ["Limestone", "Marble", "Chalk", "Eggshells", "Seashells"],
    appearance: "White insoluble crystalline solid or fine white powder.",
    colorHex: "#f1f5f9",
    physicalState: "solid",
    molarMass: "100.09 g/mol",
    ncertReference: "Chapter 1: Section 1.2.2; Chapter 2: Section 2.1.2 & Activity 2.5.",
    reactionsInvolved: [
      {
        id: "ch1-limestone-decomposition",
        title: "Decomposition of Limestone",
        equation: "CaCO₃(s) —(Heat)→ CaO(s) + CO₂(g)",
        role: "reactant"
      },
      {
        id: "ch1-whitewash-carbonation",
        title: "Formation of Shiny Marble Layer",
        equation: "Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l)",
        role: "product"
      },
      {
        id: "ch2-lime-water-milky-excess",
        title: "Milky Precipitate Formation",
        equation: "Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s)↓ + H₂O(l)",
        role: "product"
      }
    ],
    relatedExperiments: ["Thermal decomposition of marble chips", "Testing eggshells with dilute HCl"],
    relatedConcepts: ["Thermal decomposition", "Acid-carbonate effervescence", "Cement production"],
    boardExamTips: "Eggshells are made of calcium carbonate. Adding dilute HCl produces brisk effervescence of CO₂ gas that turns lime water milky."
  },
  {
    id: "mg",
    formula: "Mg",
    iupacName: "Magnesium",
    commonNames: ["Magnesium metal", "Magnesium ribbon"],
    appearance: "Silvery-white shiny metallic ribbon; usually covered with dull white protective oxide layer.",
    colorHex: "#cbd5e1",
    physicalState: "solid",
    molarMass: "24.31 g/mol",
    ncertReference: "Chapter 1: Activity 1.1 (Burning in air); Chapter 3: Section 3.2.1 (Reactivity with oxygen & boiling water).",
    reactionsInvolved: [
      {
        id: "ch1-magnesium-ribbon",
        title: "Burning of Magnesium Ribbon",
        equation: "2Mg(s) + O₂(g) → 2MgO(s) + Heat + Light",
        role: "reactant"
      }
    ],
    relatedExperiments: ["Burning magnesium ribbon over a Bunsen flame with pair of tongs"],
    relatedConcepts: ["Oxidation", "Combination reaction", "Basic metal oxide"],
    boardExamTips: "Crucial Class 10 Board exam question: 'Why should a magnesium ribbon be cleaned with sandpaper before burning in air?' Ans: To remove the protective coating of basic magnesium oxide formed by reaction with atmospheric oxygen."
  },
  {
    id: "mgo",
    formula: "MgO",
    iupacName: "Magnesium oxide",
    commonNames: ["Magnesia", "Burnt Magnesium Ash"],
    appearance: "Fine white powdery ash; sparingly soluble in water, basic in nature.",
    colorHex: "#f8fafc",
    physicalState: "solid",
    molarMass: "40.30 g/mol",
    ncertReference: "Chapter 1: Activity 1.1; Chapter 3: Basic oxides section.",
    reactionsInvolved: [
      {
        id: "ch1-magnesium-ribbon",
        title: "Burning of Magnesium Ribbon",
        equation: "2Mg(s) + O₂(g) → 2MgO(s)",
        role: "product"
      }
    ],
    relatedExperiments: ["Collecting white ash on watch glass and testing with moist red litmus paper"],
    relatedConcepts: ["Basic nature of metal oxides (turns red litmus blue)", "Combination product"],
    boardExamTips: "Dissolving MgO in water gives magnesium hydroxide Mg(OH)₂, which turns red litmus paper blue, proving metal oxides are basic."
  },
  {
    id: "pbno32",
    formula: "Pb(NO₃)₂",
    iupacName: "Lead(II) nitrate",
    commonNames: ["Lead nitrate"],
    appearance: "Colourless, sparkling white crystalline solid; toxic.",
    colorHex: "#e2e8f0",
    physicalState: "solid",
    molarMass: "331.20 g/mol",
    ncertReference: "Chapter 1: Activity 1.2 (Lead Iodide precipitation) & Activity 1.6 (Thermal decomposition).",
    reactionsInvolved: [
      {
        id: "ch1-lead-nitrate-decomposition",
        title: "Thermal Decomposition of Lead Nitrate",
        equation: "2Pb(NO₃)₂(s) —(Heat)→ 2PbO(s) + 4NO₂(g) + O₂(g)",
        role: "reactant"
      },
      {
        id: "ch1-lead-iodide-precipitation",
        title: "Precipitation of Lead Iodide",
        equation: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s) + 2KNO₃(aq)",
        role: "reactant"
      }
    ],
    relatedExperiments: ["Heating dry lead nitrate crystals in boiling tube", "Mixing lead nitrate and potassium iodide solutions"],
    relatedConcepts: ["Thermal decomposition", "Toxic brown NO₂ fumes", "Double displacement precipitation"],
    boardExamTips: "Board questions frequently ask to identify the brown fumes evolved during heating of lead nitrate: The brown gas is Nitrogen Dioxide (NO₂), and the yellow residue remaining in the test tube is Lead(II) Oxide (PbO)."
  },
  {
    id: "pbi2",
    formula: "PbI₂",
    iupacName: "Lead(II) iodide",
    commonNames: ["Lead iodide precipitate", "Golden rain"],
    appearance: "Intensely bright canary-yellow heavy insoluble precipitate.",
    colorHex: "#eab308",
    physicalState: "solid",
    molarMass: "461.01 g/mol",
    ncertReference: "Chapter 1: Activity 1.2 & Figure 1.2.",
    reactionsInvolved: [
      {
        id: "ch1-lead-iodide-precipitation",
        title: "Double Displacement Precipitation",
        equation: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)",
        role: "product"
      }
    ],
    relatedExperiments: ["Mixing aqueous lead nitrate with potassium iodide in a test tube"],
    relatedConcepts: ["Double displacement", "Precipitation reaction", "Spectator ions"],
    boardExamTips: "The precipitate formed is bright yellow. This is a classic test for lead ions (Pb²⁺) and iodide ions (I⁻)."
  },
  {
    id: "agcl",
    formula: "AgCl",
    iupacName: "Silver chloride",
    commonNames: ["Horn silver"],
    appearance: "White curdy precipitate; photosensitive, decomposes in sunlight to grey metallic silver.",
    colorHex: "#f8fafc",
    physicalState: "solid",
    molarMass: "143.32 g/mol",
    ncertReference: "Chapter 1: Activity 1.8 & Figure 1.7 (Photolytic Decomposition).",
    reactionsInvolved: [
      {
        id: "ch1-photolytic-silver-chloride",
        title: "Photolysis of Silver Chloride",
        equation: "2AgCl(s) —(Sunlight)→ 2Ag(s) + Cl₂(g)",
        role: "reactant"
      }
    ],
    relatedExperiments: ["Placing white silver chloride on a watch glass in direct sunlight"],
    relatedConcepts: ["Photochemical decomposition", "Black and white photography", "Light sensitivity"],
    boardExamTips: "NCERT Board question: 'Why is silver chloride stored in dark coloured bottles?' Ans: To prevent photolytic decomposition caused by exposure to light."
  },
  {
    id: "baso4",
    formula: "BaSO₄",
    iupacName: "Barium sulphate",
    commonNames: ["Baryte", "Barium meal"],
    appearance: "Insoluble, dense, stark white precipitate.",
    colorHex: "#ffffff",
    physicalState: "solid",
    molarMass: "233.39 g/mol",
    ncertReference: "Chapter 1: Activity 1.10 (Double Displacement); Chapter 1: Section 1.2.4.",
    reactionsInvolved: [
      {
        id: "ch1-double-displacement-barium-sulphate",
        title: "Precipitation of Barium Sulphate",
        equation: "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + 2NaCl(aq)",
        role: "product"
      }
    ],
    relatedExperiments: ["Mixing sodium sulphate and barium chloride solutions in test tubes"],
    relatedConcepts: ["Double displacement", "Precipitate definition", "Sulphate ion confirmation"],
    boardExamTips: "Define precipitation reaction: Any reaction that produces an insoluble substance (precipitate) is called a precipitation reaction. Example: Na₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl."
  },
  {
    id: "zn",
    formula: "Zn",
    iupacName: "Zinc",
    commonNames: ["Zinc granules", "Spelter"],
    appearance: "Bluish-white shiny granulated metallic pieces.",
    colorHex: "#94a3b8",
    physicalState: "solid",
    molarMass: "65.38 g/mol",
    ncertReference: "Chapter 2: Activity 2.3 & Figure 2.1; Chapter 3: Reactivity series & Metallurgy.",
    reactionsInvolved: [
      {
        id: "ch2-zinc-acid-hydrogen",
        title: "Zinc Reaction with Dilute Acid",
        equation: "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑",
        role: "reactant"
      },
      {
        id: "ch3-roasting-zinc-sulphide",
        title: "Roasting of Sphalerite Ore",
        equation: "2ZnS(s) + 3O₂(g) → 2ZnO(s) + 2SO₂(g)",
        role: "reactant"
      },
      {
        id: "ch3-reduction-zinc-oxide-carbon",
        title: "Smelting of Zinc Oxide by Carbon",
        equation: "ZnO(s) + C(s) → Zn(s) + CO(g)",
        role: "product"
      }
    ],
    relatedExperiments: ["Reaction of zinc granules with dilute H₂SO₄ and testing hydrogen with soap bubbles & candle flame"],
    relatedConcepts: ["Metal + Acid → Salt + H₂", "Pop test for hydrogen", "Galvanisation of iron"],
    boardExamTips: "Zinc also reacts with strong base (NaOH) to liberate hydrogen gas: Zn + 2NaOH → Na₂ZnO₂ (Sodium zincate) + H₂↑. This proves its amphoteric character!"
  },
  {
    id: "nahco3",
    formula: "NaHCO₃",
    iupacName: "Sodium hydrogencarbonate",
    commonNames: ["Baking soda", "Sodium bicarbonate", "Meetha soda"],
    appearance: "Fine white crystalline powder, odorless, mild non-corrosive basic salt (pH ~ 8.3).",
    colorHex: "#f8fafc",
    physicalState: "solid",
    molarMass: "84.01 g/mol",
    ncertReference: "Chapter 2: Section 2.4.3 (Baking soda synthesis and uses); Chapter 4: Activity 4.10 (Ethanoic acid reaction).",
    reactionsInvolved: [
      {
        id: "ch2-baking-soda-thermal-decomposition",
        title: "Thermal Decomposition during Baking",
        equation: "2NaHCO₃(s) —(Heat)→ Na₂CO₃(s) + H₂O(l) + CO₂(g)↑",
        role: "reactant"
      },
      {
        id: "ch4-ethanoic-acid-sodium-bicarbonate",
        title: "Effervescence with Ethanoic Acid",
        equation: "CH₃COOH(aq) + NaHCO₃(s) → CH₃COONa(aq) + H₂O(l) + CO₂(g)↑",
        role: "reactant"
      }
    ],
    relatedExperiments: ["Heating baking soda in test tube", "Adding vinegar or acetic acid to baking soda"],
    relatedConcepts: ["Antacid ingredient", "Baking powder formulation (with mild edible acid like tartaric acid)", "Soda-acid fire extinguisher"],
    boardExamTips: "Why is tartaric acid added to baking soda to make baking powder? Ans: When heated, NaHCO₃ produces Na₂CO₃ which has a bitter taste. Tartaric acid neutralizes the sodium carbonate to form pleasant-tasting sodium tartrate salt!"
  },
  {
    id: "caocl2",
    formula: "CaOCl₂",
    iupacName: "Calcium oxychloride",
    commonNames: ["Bleaching powder", "Chloride of lime"],
    appearance: "Pale yellowish-white powder with strong pungent odour of chlorine.",
    colorHex: "#fef9c3",
    physicalState: "solid",
    molarMass: "126.98 g/mol",
    ncertReference: "Chapter 2: Section 2.4.2 (Bleaching Powder).",
    reactionsInvolved: [
      {
        id: "ch2-bleaching-powder-synthesis",
        title: "Synthesis from Dry Slaked Lime and Chlorine",
        equation: "Ca(OH)₂(s) + Cl₂(g) → CaOCl₂(s) + H₂O(l)",
        role: "product"
      }
    ],
    relatedExperiments: ["Preparation by action of chlorine on dry slaked lime"],
    relatedConcepts: ["Disinfectant for drinking water", "Bleaching agent in textile and paper factories", "Oxidising agent in chemical industries"],
    boardExamTips: "Remember: Bleaching powder is prepared by passing chlorine gas over DRY slaked lime (not aqueous lime water)!"
  },
  {
    id: "caso4_half_h2o",
    formula: "CaSO₄·½H₂O",
    iupacName: "Calcium sulphate hemihydrate",
    commonNames: ["Plaster of Paris (POP)"],
    appearance: "Fine snow-white powder; hardens rapidly into solid gypsum upon mixing with water.",
    colorHex: "#f8fafc",
    physicalState: "solid",
    molarMass: "145.15 g/mol",
    ncertReference: "Chapter 2: Section 2.4.5 (Plaster of Paris).",
    reactionsInvolved: [
      {
        id: "ch2-plaster-of-paris-gypsum",
        title: "Dehydration of Gypsum & Setting of POP",
        equation: "CaSO₄·2H₂O(s) —(373 K / 100°C)→ CaSO₄·½H₂O(s) + 1½H₂O",
        role: "product"
      }
    ],
    relatedExperiments: ["Careful heating of gypsum at exactly 373 K; mixing POP powder with water to observe setting"],
    relatedConcepts: ["Water of crystallisation (half molecule ratio)", "Bone fracture support casts", "Sculpture & decorative ceilings"],
    boardExamTips: "Why should gypsum not be heated above 373 K (100°C)? Ans: Heating above 373 K causes complete loss of water of crystallisation, forming dead burnt plaster (anhydrous CaSO₄) which has no setting property with water!"
  },
  {
    id: "c2h5oh",
    formula: "C₂H₅OH",
    iupacName: "Ethanol",
    commonNames: ["Ethyl alcohol", "Spirit"],
    appearance: "Volatile colourless liquid with pleasant characteristic sweet alcoholic odour, miscible in water in all proportions, boiling point 78°C (351 K).",
    colorHex: "#e0f2fe",
    physicalState: "liquid",
    molarMass: "46.07 g/mol",
    ncertReference: "Chapter 4: Section 4.4.1 (Properties of Ethanol); Activities 4.5, 4.6, 4.7, 4.8.",
    reactionsInvolved: [
      {
        id: "ch4-ethanol-oxidation-kmno4",
        title: "Oxidation to Ethanoic Acid",
        equation: "CH₃CH₂OH(l) + 2[O] —(Alkaline KMnO₄ + Heat)→ CH₃COOH(l) + H₂O(l)",
        role: "reactant"
      },
      {
        id: "ch4-ethanol-sodium-metal",
        title: "Reaction with Sodium Metal",
        equation: "2C₂H₅OH(l) + 2Na(s) → 2C₂H₅ONa(aq) + H₂(g)↑",
        role: "reactant"
      },
      {
        id: "ch4-ethanol-dehydration-ethene",
        title: "Dehydration with Hot Conc. H₂SO₄",
        equation: "CH₃CH₂OH(l) —(Conc H₂SO₄ at 443 K)→ CH₂=CH₂(g)↑ + H₂O(l)",
        role: "reactant"
      },
      {
        id: "ch4-esterification-reaction",
        title: "Esterification Reaction",
        equation: "CH₃COOH(l) + C₂H₅OH(l) —(H⁺)→ CH₃COOC₂H₅(l) + H₂O(l)",
        role: "reactant"
      }
    ],
    relatedExperiments: ["Warming ethanol with alkaline KMnO₄ until purple disappears", "Reaction with small sodium pellet", "Esterification in water bath"],
    relatedConcepts: ["Combustion & power alcohol", "Denatured alcohol", "Functional group -OH", "Dehydration mechanism"],
    boardExamTips: "Board questions often test differentiating between ethanol and ethanoic acid: (1) Add NaHCO₃: ethanoic acid gives brisk effervescence of CO₂, ethanol does not! (2) Test with blue litmus: ethanoic acid turns it red, ethanol has no effect (neutral)."
  },
  {
    id: "ch3cooh",
    formula: "CH₃COOH",
    iupacName: "Ethanoic acid",
    commonNames: ["Acetic acid", "Vinegar (5-8% solution in water)", "Glacial acetic acid (pure 100%)"],
    appearance: "Colourless liquid with sharp pungent vinegar odour; pure acid freezes at 290 K (17°C) into ice-like crystals.",
    colorHex: "#f1f5f9",
    physicalState: "liquid",
    molarMass: "60.05 g/mol",
    ncertReference: "Chapter 4: Section 4.4.2 (Properties of Ethanoic Acid); Activities 4.8, 4.9, 4.10.",
    reactionsInvolved: [
      {
        id: "ch4-esterification-reaction",
        title: "Esterification with Ethanol",
        equation: "CH₃COOH(l) + C₂H₅OH(l) —(Acid)→ CH₃COOCH₂CH₃(l) + H₂O(l)",
        role: "reactant"
      },
      {
        id: "ch4-ethanoic-acid-sodium-bicarbonate",
        title: "Brisk Effervescence with Sodium Bicarbonate",
        equation: "CH₃COOH(aq) + NaHCO₃(s) → CH₃COONa(aq) + H₂O(l) + CO₂(g)↑",
        role: "reactant"
      }
    ],
    relatedExperiments: ["Fruity smell ester synthesis in water bath", "Testing gas evolved with sodium bicarbonate using lime water"],
    relatedConcepts: ["Carboxylic acid functional group -COOH", "Weak acid equilibrium", "Vinegar food preservative", "Saponification reverse reaction"],
    boardExamTips: "Why is 100% pure ethanoic acid called 'glacial acetic acid'? Ans: Its freezing point is 290 K (17°C), so it often freezes into ice-like crystals in cold winter climates."
  },
  {
    id: "ch3cooc2h5",
    formula: "CH₃COOC₂H₅",
    iupacName: "Ethyl ethanoate",
    commonNames: ["Ethyl acetate", "Fruity Ester"],
    appearance: "Volatile colourless liquid with sweet, pleasant, fruity fragrance.",
    colorHex: "#fdf2f8",
    physicalState: "liquid",
    molarMass: "88.11 g/mol",
    ncertReference: "Chapter 4: Section 4.4.2 & Activity 4.8.",
    reactionsInvolved: [
      {
        id: "ch4-esterification-reaction",
        title: "Esterification Synthesis",
        equation: "CH₃COOH + C₂H₅OH —(Conc. H₂SO₄)→ CH₃COOC₂H₅ + H₂O",
        role: "product"
      },
      {
        id: "ch4-saponification-soap",
        title: "Alkaline Hydrolysis (Saponification)",
        equation: "CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH",
        role: "reactant"
      }
    ],
    relatedExperiments: ["Water bath heating of glacial acetic acid, ethanol and conc. H₂SO₄; pouring into beaker with water to smell fruity aroma"],
    relatedConcepts: ["Ester functional group -COO-", "Perfumes & food flavouring agents", "Saponification (soap making)"],
    boardExamTips: "In esterification, concentrated sulphuric acid serves two vital roles: (1) Catalyst to speed up the reaction, and (2) Dehydrating agent that absorbs water, shifting equilibrium forward."
  }
];

export function getEncyclopediaSubstanceById(id: string): EncyclopediaSubstance | undefined {
  return ENCYCLOPEDIA_SUBSTANCES.find(s => s.id === id);
}

export function searchEncyclopedia(query: string): EncyclopediaSubstance[] {
  const q = query.trim().toLowerCase();
  if (!q) return ENCYCLOPEDIA_SUBSTANCES;

  // Normalized search query removing subscript numbers (e.g., CuSO4 -> cuso4)
  const normQ = q.replace(/[\u2080-\u2089]/g, match => String.fromCharCode(match.charCodeAt(0) - 0x2080));

  return ENCYCLOPEDIA_SUBSTANCES.filter(item => {
    const normFormula = item.formula.toLowerCase().replace(/[\u2080-\u2089]/g, match => String.fromCharCode(match.charCodeAt(0) - 0x2080));
    return (
      normFormula.includes(normQ) ||
      item.formula.toLowerCase().includes(q) ||
      item.iupacName.toLowerCase().includes(q) ||
      item.commonNames.some(cn => cn.toLowerCase().includes(q)) ||
      item.ncertReference.toLowerCase().includes(q) ||
      item.relatedConcepts.some(rc => rc.toLowerCase().includes(q))
    );
  });
}
