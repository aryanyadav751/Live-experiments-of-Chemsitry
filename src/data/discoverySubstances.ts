import { DiscoverySubstance } from "../types";

export const DISCOVERY_SUBSTANCES: DiscoverySubstance[] = [
  // --- ACIDS ---
  {
    id: "hcl",
    name: "Hydrochloric Acid",
    formula: "HCl (dilute)",
    category: "Acid",
    state: "aqueous",
    color: "#f8fafc",
    description: "Strong mineral acid present in gastric juice; reacts vigorously with reactive metals and metal carbonates.",
    phValue: 1.0,
    isHazardous: true,
    hazardNote: "Corrosive to skin and eyes. In virtual simulation, handles safely without fumes."
  },
  {
    id: "h2so4",
    name: "Sulphuric Acid",
    formula: "H₂SO₄ (dilute)",
    category: "Acid",
    state: "aqueous",
    color: "#f8fafc",
    description: "Known as King of Chemicals; strong dibasic dehydrating mineral acid.",
    phValue: 1.0,
    isHazardous: true,
    hazardNote: "Highly corrosive; diluting real concentrated acid is intensely exothermic."
  },
  {
    id: "hno3",
    name: "Nitric Acid",
    formula: "HNO₃ (dilute)",
    category: "Acid",
    state: "aqueous",
    color: "#fef9c3",
    description: "Strong oxidizing acid; generally oxidizes evolved hydrogen to water with most metals.",
    phValue: 1.2,
    isHazardous: true,
    hazardNote: "Strong oxidizing agent; can stain skin yellow (xanthoproteic reaction)."
  },
  {
    id: "ch3cooh",
    name: "Ethanoic (Acetic) Acid",
    formula: "CH₃COOH (5-8% Vinegar)",
    category: "Acid",
    state: "aqueous",
    color: "#ffffff",
    description: "Weak monobasic organic carboxylic acid with characteristic pungent vinegar odor; freezes into glacial acetic acid at 290 K.",
    phValue: 3.5,
    isHazardous: false
  },

  // --- BASES ---
  {
    id: "naoh",
    name: "Sodium Hydroxide",
    formula: "NaOH (Caustic Soda)",
    category: "Base",
    state: "aqueous",
    color: "#f1f5f9",
    description: "Strong alkali pellets dissolving with heat; turns phenolphthalein deep pink and red litmus blue.",
    phValue: 13.5,
    isHazardous: true,
    hazardNote: "Caustic alkali; slippery touch due to saponification of skin oils."
  },
  {
    id: "ca_oh2",
    name: "Calcium Hydroxide (Slaked Lime)",
    formula: "Ca(OH)₂ (aq)",
    category: "Base",
    state: "aqueous",
    color: "#f8fafc",
    description: "Mild alkaline solution (limewater) used to test carbon dioxide gas; forms insoluble calcium carbonate milky cloud.",
    phValue: 11.5,
    isHazardous: false
  },
  {
    id: "koh",
    name: "Potassium Hydroxide",
    formula: "KOH",
    category: "Base",
    state: "aqueous",
    color: "#f8fafc",
    description: "Strong alkali used in manufacturing soft soaps and absorbing carbon dioxide gas.",
    phValue: 13.5,
    isHazardous: true,
    hazardNote: "Corrosive caustic alkali."
  },

  // --- METALS ---
  {
    id: "zn",
    name: "Zinc Granules",
    formula: "Zn (s)",
    category: "Metal",
    state: "solid",
    color: "#94a3b8",
    description: "Bluish-white moderately reactive transition metal; liberates H₂ gas with dilute acids and sodium hydroxide."
  },
  {
    id: "fe",
    name: "Iron Filings / Nails",
    formula: "Fe (s)",
    category: "Metal",
    state: "solid",
    color: "#475569",
    description: "Grey-black magnetic metal; displaces copper from blue CuSO₄ solution turning it pale green."
  },
  {
    id: "cu",
    name: "Copper Turnings",
    formula: "Cu (s)",
    category: "Metal",
    state: "solid",
    color: "#b45309",
    description: "Reddish-brown metal; lower than hydrogen in electrochemical reactivity series, does NOT react with dilute HCl."
  },
  {
    id: "mg",
    name: "Magnesium Ribbon",
    formula: "Mg (s)",
    category: "Metal",
    state: "solid",
    color: "#cbd5e1",
    description: "Silvery-white lightweight metal; burns with an intensely dazzling white light leaving white ash of MgO."
  },
  {
    id: "al",
    name: "Aluminium Foil",
    formula: "Al (s)",
    category: "Metal",
    state: "solid",
    color: "#cbd5e1",
    description: "Reactive metal protected by a natural amphoteric oxide layer (Al₂O₃); reacts with acids after oxide removal."
  },
  {
    id: "na",
    name: "Sodium Metal (Simulation-First)",
    formula: "Na (s)",
    category: "Metal",
    state: "solid",
    color: "#e2e8f0",
    description: "Extremely reactive soft alkali metal stored under kerosene; reacts violently with water catching fire with yellow flame.",
    isHazardous: true,
    hazardNote: "VIRTUAL ONLY: Explosive reaction with water producing flammable hydrogen. Strictly simulated."
  },

  // --- SALTS & OXIDES ---
  {
    id: "caco3",
    name: "Calcium Carbonate (Marble)",
    formula: "CaCO₃ (s)",
    category: "Salt",
    state: "solid",
    color: "#f8fafc",
    description: "White insoluble salt found in limestone, chalk, marble, and eggshells; effervesces with dilute acids liberating CO₂."
  },
  {
    id: "nahco3",
    name: "Sodium Hydrogen Carbonate",
    formula: "NaHCO₃ (Baking Soda)",
    category: "Salt",
    state: "solid",
    color: "#ffffff",
    description: "Mild non-corrosive basic salt; releases CO₂ briskly with acids like ethanoic acid or upon heating."
  },
  {
    id: "na2co3",
    name: "Sodium Carbonate (Washing Soda)",
    formula: "Na₂CO₃ (s)",
    category: "Salt",
    state: "solid",
    color: "#ffffff",
    description: "Basic salt used in glass and soap industry, and for removing permanent hardness of water."
  },
  {
    id: "cuso4",
    name: "Copper Sulphate Crystals",
    formula: "CuSO₄·5H₂O",
    category: "Salt",
    state: "solid",
    color: "#2563eb",
    description: "Bright blue hydrated crystals (Blue Vitriol); turns white anhydrous CuSO₄ when water of crystallization is driven off by heating."
  },
  {
    id: "bacl2",
    name: "Barium Chloride",
    formula: "BaCl₂ (aq)",
    category: "Salt",
    state: "aqueous",
    color: "#f8fafc",
    description: "Clear aqueous salt solution; reacts with sulphate ions to precipitate insoluble barium sulphate (BaSO₄)."
  },
  {
    id: "na2so4",
    name: "Sodium Sulphate",
    formula: "Na₂SO₄ (aq)",
    category: "Salt",
    state: "aqueous",
    color: "#f8fafc",
    description: "Neutral soluble salt used in standard double displacement precipitation testing."
  },
  {
    id: "pb_no3_2",
    name: "Lead(II) Nitrate",
    formula: "Pb(NO₃)₂ (s/aq)",
    category: "Salt",
    state: "solid",
    color: "#ffffff",
    description: "White crystalline solid; decomposes on heating to yield reddish-brown NO₂ gas and yellow PbO residue. Precipitates yellow PbI₂ with KI."
  },
  {
    id: "ki",
    name: "Potassium Iodide",
    formula: "KI (aq)",
    category: "Salt",
    state: "aqueous",
    color: "#f8fafc",
    description: "Clear solution providing iodide ions (I⁻) for precipitating canary-yellow lead iodide."
  },
  {
    id: "feso4",
    name: "Ferrous Sulphate Crystals",
    formula: "FeSO₄·7H₂O (Green Vitriol)",
    category: "Salt",
    state: "solid",
    color: "#86efac",
    description: "Pale green crystals; lose water of crystallisation and decompose on heating into reddish-brown Fe₂O₃ with choking SO₂ and SO₃ gases."
  },
  {
    id: "cao",
    name: "Calcium Oxide (Quicklime)",
    formula: "CaO (s)",
    category: "Oxide",
    state: "solid",
    color: "#f1f5f9",
    description: "White basic oxide manufactured by calcining limestone; reacts vigorously with water with hissing sound releasing immense heat."
  },

  // --- ORGANIC COMPOUNDS ---
  {
    id: "c2h5oh",
    name: "Ethanol (Ethyl Alcohol)",
    formula: "C₂H₅OH (l)",
    category: "Organic",
    state: "liquid",
    color: "#f8fafc",
    description: "Colorless volatile alcohol with sweet aroma; active ingredient in alcoholic beverages and tincture of iodine; forms fruity ester with ethanoic acid."
  },
  {
    id: "ester",
    name: "Ethyl Ethanoate (Ester)",
    formula: "CH₃COOC₂H₅ (l)",
    category: "Organic",
    state: "liquid",
    color: "#f8fafc",
    description: "Sweet fruity smelling organic compound; undergoes saponification with sodium hydroxide to form soap and alcohol."
  },

  // --- INDICATORS & REAGENTS ---
  {
    id: "blue_litmus",
    name: "Blue Litmus Solution",
    formula: "Litmus (Blue)",
    category: "Indicator",
    state: "liquid",
    color: "#3b82f6",
    description: "Natural acid-base indicator extracted from lichens; turns RED in acidic medium, remains blue in alkaline medium."
  },
  {
    id: "red_litmus",
    name: "Red Litmus Solution",
    formula: "Litmus (Red)",
    category: "Indicator",
    state: "liquid",
    color: "#ef4444",
    description: "Natural indicator; turns BLUE in basic / alkaline medium, remains red in acidic medium."
  },
  {
    id: "phenolphthalein",
    name: "Phenolphthalein Indicator",
    formula: "C₂₀H₁₄O₄",
    category: "Indicator",
    state: "liquid",
    color: "#fdf2f8",
    description: "Synthetic acid-base indicator; COLORLESS in acidic/neutral solutions and turns intense VIVID PINK in basic solutions (pH > 8.2)."
  },
  {
    id: "methyl_orange",
    name: "Methyl Orange Indicator",
    formula: "C₁₄H₁₄N₃NaO₃S",
    category: "Indicator",
    state: "liquid",
    color: "#f97316",
    description: "Synthetic indicator; turns RED/PINK in acidic solutions and YELLOW in neutral/basic solutions."
  },
  {
    id: "universal_indicator",
    name: "Universal Indicator",
    formula: "Full Range pH Indicator",
    category: "Indicator",
    state: "liquid",
    color: "#10b981",
    description: "Mixture of indicators that shows different colors across the whole pH scale (0 to 14): Red (strong acid), Green (pH 7 neutral), Violet (strong base)."
  },
  {
    id: "lime_water",
    name: "Fresh Lime Water",
    formula: "Ca(OH)₂ (dilute)",
    category: "Indicator",
    state: "liquid",
    color: "#f8fafc",
    description: "Clear test reagent that turns milky white when carbon dioxide (CO₂) gas bubbles through it due to insoluble CaCO₃."
  },

  // --- SOLVENT & TESTING TOOLS ---
  {
    id: "h2o",
    name: "Distilled Water",
    formula: "H₂O (l)",
    category: "Other",
    state: "liquid",
    color: "#e0f2fe",
    description: "Pure neutral solvent (pH 7.0) used for dissolving salts, slaking quicklime, and testing hydration."
  },
  {
    id: "splinter",
    name: "Glowing Wood Splinter",
    formula: "Test Tool",
    category: "Other",
    state: "solid",
    color: "#ea580c",
    description: "Used to test evolved gases: Burns with a 'POP' sound with Hydrogen (H₂), rekindles with Oxygen (O₂), and extinguishes in Carbon Dioxide (CO₂)."
  }
];

export const getSubstanceById = (id: string): DiscoverySubstance | undefined => {
  return DISCOVERY_SUBSTANCES.find((s) => s.id === id);
};
