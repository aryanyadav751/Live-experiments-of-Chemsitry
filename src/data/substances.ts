import { DiscoverySubstance, SubstanceCategory } from "../types";

export const SUBSTANCE_CATEGORIES: { id: SubstanceCategory; label: string; icon: string }[] = [
  { id: "Metals", label: "Metals", icon: "Shield" },
  { id: "Non-metals", label: "Non-metals", icon: "Flame" },
  { id: "Acids", label: "Acids", icon: "Droplet" },
  { id: "Bases", label: "Bases", icon: "Sparkles" },
  { id: "Salts", label: "Salts", icon: "Box" },
  { id: "Carbon compounds", label: "Carbon Compounds", icon: "Atom" },
  { id: "Indicators", label: "Indicators", icon: "Eye" },
  { id: "Water", label: "Water", icon: "Droplets" },
  { id: "Other NCERT substances", label: "Other NCERT", icon: "Flask" }
];

export const ALL_SUBSTANCES: DiscoverySubstance[] = [
  // 1. METALS
  {
    id: "fe",
    name: "Iron Filings / Nails",
    formula: "Fe(s)",
    category: "Metals",
    state: "solid",
    color: "#475569",
    description: "Grey-black transition metal; displaces Cu from blue CuSO₄ turning it pale green FeSO₄."
  },
  {
    id: "zn",
    name: "Zinc Granules",
    formula: "Zn(s)",
    category: "Metals",
    state: "solid",
    color: "#94a3b8",
    description: "Bluish-white reactive metal; evolves H₂ gas briskly with dilute HCl and NaOH."
  },
  {
    id: "cu",
    name: "Copper Turnings",
    formula: "Cu(s)",
    category: "Metals",
    state: "solid",
    color: "#b45309",
    description: "Reddish-brown metal below H in the reactivity series; oxidizes to black CuO on heating."
  },
  {
    id: "mg",
    name: "Magnesium Ribbon",
    formula: "Mg(s)",
    category: "Metals",
    state: "solid",
    color: "#cbd5e1",
    description: "Silvery-white ribbon; burns with a dazzling white flame to form white MgO powder."
  },
  {
    id: "al",
    name: "Aluminium Foil",
    formula: "Al(s)",
    category: "Metals",
    state: "solid",
    color: "#cbd5e1",
    description: "Amphoteric metal; vigorous displacement reducing iron oxide in the thermite reaction."
  },
  {
    id: "na",
    name: "Sodium Metal",
    formula: "Na(s)",
    category: "Metals",
    state: "solid",
    color: "#e2e8f0",
    description: "Soft alkali metal stored under kerosene; violently exothermic with cold water in simulation.",
    isHazardous: true,
    hazardNote: "Simulation-only: Reacts vigorously with water yielding alkaline NaOH and flammable H₂."
  },
  {
    id: "ca",
    name: "Calcium Metal",
    formula: "Ca(s)",
    category: "Metals",
    state: "solid",
    color: "#e2e8f0",
    description: "Alkaline earth metal; reacts with cold water to evolve bubbles of H₂ that stick to its surface."
  },
  {
    id: "pb",
    name: "Lead Metal",
    formula: "Pb(s)",
    category: "Metals",
    state: "solid",
    color: "#64748b",
    description: "Bluish-white heavy metal; displaces copper from copper chloride solution."
  },
  {
    id: "ag",
    name: "Silver Metal",
    formula: "Ag(s)",
    category: "Metals",
    state: "solid",
    color: "#e2e8f0",
    description: "Noble transition metal; deposits as glistening crystals during displacement reactions."
  },

  // 2. NON-METALS
  {
    id: "c",
    name: "Carbon / Coke",
    formula: "C(s)",
    category: "Non-metals",
    state: "solid",
    color: "#1e293b",
    description: "Black allotrope of carbon; acts as a reducing agent in metallurgical reduction of ZnO."
  },
  {
    id: "s",
    name: "Sulphur Powder",
    formula: "S(s)",
    category: "Non-metals",
    state: "solid",
    color: "#facc15",
    description: "Bright yellow non-metallic elemental powder; burns in air to produce acidic SO₂ gas."
  },
  {
    id: "o2",
    name: "Oxygen Gas",
    formula: "O₂(g)",
    category: "Non-metals",
    state: "gas",
    color: "#93c5fd",
    description: "Diatomic supporter of combustion; rekindles a glowing wood splinter."
  },
  {
    id: "cl2",
    name: "Chlorine Gas",
    formula: "Cl₂(g)",
    category: "Non-metals",
    state: "gas",
    color: "#bef264",
    description: "Greenish-yellow gas with pungent odor; reacts with dry slaked lime to form bleaching powder."
  },
  {
    id: "h2",
    name: "Hydrogen Gas",
    formula: "H₂(g)",
    category: "Non-metals",
    state: "gas",
    color: "#e0f2fe",
    description: "Colorless, odorless lightest gas; burns with a characteristic 'pop' sound."
  },

  // 3. ACIDS
  {
    id: "hcl",
    name: "Hydrochloric Acid",
    formula: "HCl(aq)",
    category: "Acids",
    state: "aqueous",
    color: "#f8fafc",
    description: "Strong monobasic mineral acid; effervesces with carbonates and reactive metals.",
    phValue: 1.0,
    isHazardous: true,
    hazardNote: "Corrosive. Safely simulated in virtual experiments without aerosol exposure."
  },
  {
    id: "h2so4",
    name: "Sulphuric Acid",
    formula: "H₂SO₄(aq)",
    category: "Acids",
    state: "aqueous",
    color: "#f8fafc",
    description: "King of Chemicals; strong dehydrating dibasic acid used in esterification catalysis.",
    phValue: 1.0,
    isHazardous: true,
    hazardNote: "Corrosive acid; acts as catalyst in ethanol dehydration and esterification."
  },
  {
    id: "hno3",
    name: "Nitric Acid",
    formula: "HNO₃(aq)",
    category: "Acids",
    state: "aqueous",
    color: "#fef9c3",
    description: "Strong oxidizing acid; oxidizes evolved H₂ to H₂O with most metals.",
    phValue: 1.2,
    isHazardous: true
  },
  {
    id: "ch3cooh",
    name: "Ethanoic (Acetic) Acid",
    formula: "CH₃COOH(aq)",
    category: "Acids",
    state: "aqueous",
    color: "#ffffff",
    description: "Weak organic carboxylic acid (5–8% in vinegar); reacts with NaHCO₃ to briskly liberate CO₂.",
    phValue: 3.5
  },

  // 4. BASES
  {
    id: "naoh",
    name: "Sodium Hydroxide",
    formula: "NaOH(aq)",
    category: "Bases",
    state: "aqueous",
    color: "#f1f5f9",
    description: "Caustic soda; turns phenolphthalein deep pink and red litmus blue; reacts with amphoteric Zn.",
    phValue: 13.5,
    isHazardous: true
  },
  {
    id: "ca_oh2",
    name: "Calcium Hydroxide (Slaked Lime)",
    formula: "Ca(OH)₂(aq)",
    category: "Bases",
    state: "aqueous",
    color: "#f8fafc",
    description: "Limewater; turns milky with CO₂ due to CaCO₃ precipitate; used for whitewashing walls.",
    phValue: 11.5
  },
  {
    id: "koh",
    name: "Potassium Hydroxide",
    formula: "KOH(aq)",
    category: "Bases",
    state: "aqueous",
    color: "#f8fafc",
    description: "Strong alkali used in manufacturing soft soaps and absorbing carbon dioxide gas.",
    phValue: 13.5,
    isHazardous: true
  },
  {
    id: "nh4oh",
    name: "Ammonium Hydroxide",
    formula: "NH₄OH(aq)",
    category: "Bases",
    state: "aqueous",
    color: "#f8fafc",
    description: "Mild aqueous basic solution used to precipitate characteristic metal hydroxides.",
    phValue: 10.5
  },

  // 5. SALTS
  {
    id: "agcl",
    name: "Silver Chloride",
    formula: "AgCl(s)",
    category: "Salts",
    state: "solid",
    color: "#f8fafc",
    description: "White light-sensitive salt; decomposes in sunlight to grey metallic silver and chlorine gas."
  },
  {
    id: "cuso4",
    name: "Copper Sulphate Crystals",
    formula: "CuSO₄·5H₂O",
    category: "Salts",
    state: "solid",
    color: "#2563eb",
    description: "Bright blue hydrated crystals (Blue Vitriol); turns white anhydrous CuSO₄ upon heating."
  },
  {
    id: "feso4",
    name: "Ferrous Sulphate Crystals",
    formula: "FeSO₄·7H₂O",
    category: "Salts",
    state: "solid",
    color: "#86efac",
    description: "Pale green crystals (Green Vitriol); thermally decomposes to reddish-brown Fe₂O₃ and SO₂/SO₃."
  },
  {
    id: "caco3",
    name: "Calcium Carbonate",
    formula: "CaCO₃(s)",
    category: "Salts",
    state: "solid",
    color: "#f8fafc",
    description: "Insoluble marble/limestone; thermally decomposes to CaO and CO₂; effervesces with acids."
  },
  {
    id: "nahco3",
    name: "Sodium Hydrogen Carbonate",
    formula: "NaHCO₃(s)",
    category: "Salts",
    state: "solid",
    color: "#ffffff",
    description: "Baking soda; mild basic salt that decomposes on heating to produce CO₂."
  },
  {
    id: "na2co3",
    name: "Sodium Carbonate",
    formula: "Na₂CO₃(s)",
    category: "Salts",
    state: "solid",
    color: "#ffffff",
    description: "Washing soda; alkaline salt used in softening permanent water hardness and glass making."
  },
  {
    id: "pb_no3_2",
    name: "Lead(II) Nitrate",
    formula: "Pb(NO₃)₂(s)",
    category: "Salts",
    state: "solid",
    color: "#ffffff",
    description: "Decomposes with crackling sound on heating into yellow PbO, brown NO₂ fumes, and O₂."
  },
  {
    id: "ki",
    name: "Potassium Iodide",
    formula: "KI(aq)",
    category: "Salts",
    state: "aqueous",
    color: "#f8fafc",
    description: "Provides iodide ions (I⁻) that precipitate brilliant canary-yellow Lead(II) Iodide."
  },
  {
    id: "bacl2",
    name: "Barium Chloride",
    formula: "BaCl₂(aq)",
    category: "Salts",
    state: "aqueous",
    color: "#f8fafc",
    description: "Precipitating reagent for sulphate ions, yielding insoluble white BaSO₄."
  },
  {
    id: "na2so4",
    name: "Sodium Sulphate",
    formula: "Na₂SO₄(aq)",
    category: "Salts",
    state: "aqueous",
    color: "#f8fafc",
    description: "Soluble neutral sulphate salt used in double displacement precipitation tests."
  },
  {
    id: "nacl",
    name: "Sodium Chloride",
    formula: "NaCl(s/aq)",
    category: "Salts",
    state: "solid",
    color: "#ffffff",
    description: "Common salt; raw material for chlor-alkali electrolysis, baking soda, and washing soda."
  },
  {
    id: "cao",
    name: "Calcium Oxide (Quicklime)",
    formula: "CaO(s)",
    category: "Salts",
    state: "solid",
    color: "#f1f5f9",
    description: "White basic oxide; reacts vigorously with water in a highly exothermic reaction to give slaked lime."
  },
  {
    id: "caocl2",
    name: "Bleaching Powder",
    formula: "CaOCl₂(s)",
    category: "Salts",
    state: "solid",
    color: "#fef08a",
    description: "Produced by action of chlorine on dry slaked lime; used as a disinfectant and oxidizing agent."
  },
  {
    id: "plaster_of_paris",
    name: "Plaster of Paris",
    formula: "CaSO₄·½H₂O",
    category: "Salts",
    state: "solid",
    color: "#ffffff",
    description: "Calcium sulphate hemihydrate; sets into hard gypsum mass on adding water."
  },
  {
    id: "zns",
    name: "Zinc Sulphide (Zinc Blende)",
    formula: "ZnS(s)",
    category: "Salts",
    state: "solid",
    color: "#cbd5e1",
    description: "Sulphide ore of zinc; converted to zinc oxide by roasting in excess air."
  },
  {
    id: "znco3",
    name: "Zinc Carbonate (Calamine)",
    formula: "ZnCO₃(s)",
    category: "Salts",
    state: "solid",
    color: "#f8fafc",
    description: "Carbonate ore of zinc; converted to zinc oxide by calcination in limited air."
  },

  // 6. CARBON COMPOUNDS
  {
    id: "ch4",
    name: "Methane",
    formula: "CH₄(g)",
    category: "Carbon compounds",
    state: "gas",
    color: "#93c5fd",
    description: "Simplest hydrocarbon (alkane), major constituent of CNG and biogas; burns with a clean blue flame."
  },
  {
    id: "c2h5oh",
    name: "Ethanol",
    formula: "C₂H₅OH(l)",
    category: "Carbon compounds",
    state: "liquid",
    color: "#f8fafc",
    description: "Volatile alcohol; oxidizes to ethanoic acid with alkaline KMnO₄, and forms sweet fruity ester."
  },
  {
    id: "ch3cooh_organic",
    name: "Ethanoic Acid (Glacial)",
    formula: "CH₃COOH(l)",
    category: "Carbon compounds",
    state: "liquid",
    color: "#ffffff",
    description: "Carboxylic acid with 290 K melting point; undergoes esterification with ethanol."
  },
  {
    id: "ester",
    name: "Ethyl Ethanoate (Ester)",
    formula: "CH₃COOC₂H₅(l)",
    category: "Carbon compounds",
    state: "liquid",
    color: "#fbcfe8",
    description: "Sweet fruity-smelling ester; undergoes saponification with NaOH to yield soap and ethanol."
  },
  {
    id: "ethene",
    name: "Ethene",
    formula: "CH₂=CH₂(g)",
    category: "Carbon compounds",
    state: "gas",
    color: "#e2e8f0",
    description: "Unsaturated alkene with carbon-carbon double bond; undergoes addition hydrogenation."
  },

  // 7. INDICATORS
  {
    id: "blue_litmus",
    name: "Blue Litmus Solution",
    formula: "Litmus (Blue)",
    category: "Indicators",
    state: "liquid",
    color: "#3b82f6",
    description: "Natural indicator extracted from lichens; turns RED in acidic medium."
  },
  {
    id: "red_litmus",
    name: "Red Litmus Solution",
    formula: "Litmus (Red)",
    category: "Indicators",
    state: "liquid",
    color: "#ef4444",
    description: "Natural indicator; turns BLUE in basic / alkaline medium."
  },
  {
    id: "phenolphthalein",
    name: "Phenolphthalein Indicator",
    formula: "Phenolphthalein",
    category: "Indicators",
    state: "liquid",
    color: "#fdf2f8",
    description: "Synthetic indicator; colorless in acid/neutral and turns VIVID PINK in base."
  },
  {
    id: "methyl_orange",
    name: "Methyl Orange Indicator",
    formula: "Methyl Orange",
    category: "Indicators",
    state: "liquid",
    color: "#f97316",
    description: "Synthetic indicator; turns RED in acids and YELLOW in bases."
  },
  {
    id: "universal_indicator",
    name: "Universal Indicator",
    formula: "pH 0–14 Indicator",
    category: "Indicators",
    state: "liquid",
    color: "#10b981",
    description: "Full-range indicator displaying continuous spectrum: Red (acid), Green (neutral), Purple (alkali)."
  },
  {
    id: "lime_water",
    name: "Fresh Lime Water",
    formula: "Ca(OH)₂(dilute)",
    category: "Indicators",
    state: "liquid",
    color: "#f8fafc",
    description: "Turns milky with carbon dioxide (CO₂) due to CaCO₃ precipitate formation."
  },

  // 8. WATER
  {
    id: "h2o",
    name: "Distilled Water",
    formula: "H₂O(l)",
    category: "Water",
    state: "liquid",
    color: "#e0f2fe",
    description: "Pure neutral solvent (pH 7.0); provides aqueous hydration and electrolytic medium."
  },

  // 9. OTHER NCERT SUBSTANCES
  {
    id: "splinter",
    name: "Glowing Wood Splinter",
    formula: "Test Tool",
    category: "Other NCERT substances",
    state: "solid",
    color: "#ea580c",
    description: "Tests gases: 'POP' sound with H₂, rekindles with O₂, and extinguishes in CO₂."
  },
  {
    id: "kmno4",
    name: "Alkaline Potassium Permanganate",
    formula: "KMnO₄ + Heat",
    category: "Other NCERT substances",
    state: "liquid",
    color: "#a855f7",
    description: "Deep purple oxidizing agent; oxidizes alcohols to carboxylic acids while discharging its color."
  }
];

export const getSubstanceById = (id: string): DiscoverySubstance | undefined => {
  // Normalize alias IDs
  if (id === "ch3cooh_organic") id = "ch3cooh";
  return ALL_SUBSTANCES.find((s) => s.id === id);
};
