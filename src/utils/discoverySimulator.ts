import { DiscoveryReactionResult, DiscoverySubstance } from "../types";
import { getSubstanceById } from "../data/discoverySubstances";

export interface SimulationConditions {
  heat: boolean;
  water: boolean;
  testedWithSplinter?: boolean;
  testedWithLimeWater?: boolean;
}

export function simulateSubstanceMixture(
  substanceIds: string[],
  conditions: SimulationConditions
): DiscoveryReactionResult {
  const set = new Set(substanceIds);
  const count = set.size;

  if (count === 0) {
    return {
      occurred: false,
      title: "Empty Reaction Vessel",
      equation: "—",
      balancedEquation: "—",
      reactionType: "None",
      observations: ["No substances have been added to the glassware."],
      explanation: "Select one or more reagents from the chemical shelf to begin simulation.",
      energyChange: "Neutral",
      isHazardous: false,
      visualEffect: { color: "#f8fafc" }
    };
  }

  // --- 1. SINGLE SUBSTANCE HEATING (Thermal Decomposition / Physical changes) ---
  if (count === 1 && conditions.heat) {
    if (set.has("feso4")) {
      return {
        occurred: true,
        title: "Thermal Decomposition of Ferrous Sulphate",
        equation: "FeSO₄·7H₂O(s) → Fe₂O₃(s) + SO₂(g) + SO₃(g) + 7H₂O(g)",
        balancedEquation: "2FeSO₄(s) ⎯⎯Δ⎯⎯→ Fe₂O₃(s) + SO₂(g) + SO₃(g)",
        reactionType: "Decomposition / Endothermic",
        observations: [
          "Pale green crystals lose water of crystallization to turn dirty white.",
          "On strong heating, the residue turns reddish-brown solid (Ferric oxide, Fe₂O₃).",
          "Evolution of choking gases having the characteristic burning sulphur odor (SO₂ & SO₃)."
        ],
        explanation:
          "Single reactant breaks down upon heating into ferric oxide solid and acidic gases sulphur dioxide and sulphur trioxide (NCERT Activity 1.5).",
        energyChange: "Endothermic",
        isHazardous: true,
        simulationSafetyNote:
          "⚠️ Virtual Simulation Notice: Sulphur dioxide (SO₂) gas is choking and harmful to inhale. In a physical laboratory, this must be wafted gently towards the nose or performed in a fume cupboard.",
        visualEffect: {
          color: "#78350f",
          hasBubbles: true,
          gasName: "SO₂ + SO₃ Fumes",
          temperatureChange: 45,
          soundDesc: "Subtle crackling and pungent vapor release"
        }
      };
    }

    if (set.has("pb_no3_2")) {
      return {
        occurred: true,
        title: "Thermal Decomposition of Lead Nitrate",
        equation: "Pb(NO₃)₂(s) → PbO(s) + NO₂(g) + O₂(g)",
        balancedEquation: "2Pb(NO₃)₂(s) ⎯⎯Δ⎯⎯→ 2PbO(s) + 4NO₂(g) + O₂(g)",
        reactionType: "Decomposition / Endothermic",
        observations: [
          "Crackling sound (decrepitation) heard during thermal breakdown.",
          "Dense, characteristic reddish-brown fumes of Nitrogen Dioxide (NO₂) fill the test tube.",
          "A yellow solid residue of Lead(II) oxide (PbO) remains in the boiling tube."
        ],
        explanation:
          "Heating white crystalline lead nitrate decomposes it into yellow lead monoxide, brown nitrogen dioxide gas, and oxygen (NCERT Activity 1.6).",
        energyChange: "Endothermic",
        isHazardous: true,
        simulationSafetyNote:
          "⚠️ Virtual Simulation Notice: NO₂ brown fumes are toxic and irritating to the respiratory tract. Virtual simulation allows safe study of color transitions without exposure.",
        visualEffect: {
          color: "#ca8a04",
          hasBubbles: true,
          gasName: "NO₂ (Reddish-brown fumes)",
          temperatureChange: 50,
          soundDesc: "Sharp crackling decrepitation sound"
        }
      };
    }

    if (set.has("caco3")) {
      return {
        occurred: true,
        title: "Thermal Decomposition of Calcium Carbonate (Calcination)",
        equation: "CaCO₃(s) → CaO(s) + CO₂(g)",
        balancedEquation: "CaCO₃(s) ⎯⎯Δ⎯⎯→ CaO(s) + CO₂(g)↑",
        reactionType: "Thermal Decomposition",
        observations: [
          "White solid is heated to high temperature.",
          "Colorless, odorless carbon dioxide (CO₂) gas evolves.",
          "Residue is quicklime (Calcium oxide, CaO)."
        ],
        explanation:
          "Industrial manufacture of quicklime from limestone; critical for cement and glass industries.",
        energyChange: "Endothermic",
        isHazardous: false,
        visualEffect: {
          color: "#f1f5f9",
          hasBubbles: true,
          gasName: "CO₂",
          temperatureChange: 60
        }
      };
    }

    if (set.has("cuso4")) {
      return {
        occurred: true,
        title: "Loss of Water of Crystallization (Hydrated to Anhydrous)",
        equation: "CuSO₄·5H₂O(s) → CuSO₄(s) + 5H₂O(g)",
        balancedEquation: "CuSO₄·5H₂O(s) ⎯⎯Δ⎯⎯→ CuSO₄(s) + 5H₂O(g)↑",
        reactionType: "Dehydration / Endothermic",
        observations: [
          "Intense blue crystals lose their color, turning into a dull white powder.",
          "Water droplets condense on the cooler upper walls of the test tube.",
          "Adding a drop of water restores the brilliant blue color immediately."
        ],
        explanation:
          "Blue vitriol contains 5 fixed molecules of water per formula unit. Heating drives off this water, collapsing the octahedral copper coordination sphere (NCERT Activity 2.15).",
        energyChange: "Endothermic",
        isHazardous: false,
        visualEffect: {
          color: "#f8fafc",
          hasBubbles: false,
          temperatureChange: 20
        }
      };
    }

    if (set.has("mg")) {
      return {
        occurred: true,
        title: "Combustion of Magnesium Ribbon in Air",
        equation: "Mg(s) + O₂(g) → MgO(s)",
        balancedEquation: "2Mg(s) + O₂(g) ⎯⎯Δ⎯⎯→ 2MgO(s)",
        reactionType: "Combination / Combustion / Redox",
        observations: [
          "Magnesium ribbon burns with an intensely brilliant, dazzling white flame.",
          "Forms a soft white powdery residue of Magnesium Oxide (MgO).",
          "Aqueous solution of the ash turns red litmus paper blue (basic oxide)."
        ],
        explanation:
          "Magnesium is vigorously oxidized by atmospheric oxygen releasing extreme light and heat energy (NCERT Activity 1.1).",
        energyChange: "Exothermic",
        isHazardous: true,
        simulationSafetyNote:
          "⚠️ Virtual Simulation Notice: Looking directly at burning magnesium can harm eyesight due to intense UV emission. Wear dark goggles in a real lab; virtual lab renders safe illumination.",
        visualEffect: {
          color: "#ffffff",
          flameColor: "#ffffff",
          temperatureChange: 80,
          soundDesc: "Hissing burn with dazzling luminescence"
        }
      };
    }
  }

  // --- 2. HIGH-HAZARD SIMULATION-FIRST: SODIUM + WATER ---
  if ((set.has("na") && (set.has("h2o") || conditions.water)) || (set.has("na") && set.has("hcl"))) {
    return {
      occurred: true,
      title: "Violent Reaction of Alkali Metal Sodium with Water",
      equation: "Na(s) + H₂O(l) → NaOH(aq) + H₂(g) + Heat",
      balancedEquation: "2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)↑ + Heat",
      reactionType: "Displacement / Highly Exothermic Redox",
      observations: [
        "Sodium melts into a silvery sphere that skitters rapidly across the water surface with a loud hissing sound.",
        "Immense heat ignites the evolved hydrogen gas with a vivid golden-yellow flame.",
        "Resulting solution turns phenolphthalein deep pink, proving formation of strong alkali (NaOH)."
      ],
      explanation:
        "Sodium has very low ionization energy and reacts explosively with cold water. It must be stored submerged under kerosene (NCERT Activity 3.10).",
      energyChange: "Exothermic",
      isHazardous: true,
      simulationSafetyNote:
        "⚠️ SIMULATION-FIRST PROTOCOL: In real laboratory settings, sodium piece size is restricted to a pinhead and handled only with dry forceps behind safety screens. This virtual sandbox provides full visual fidelity without physical blast or fire hazard.",
      visualEffect: {
        color: "#f472b6",
        hasBubbles: true,
        gasName: "H₂ (ignites)",
        temperatureChange: 75,
        flameColor: "#eab308",
        soundDesc: "Rapid hissing and pop combustion"
      }
    };
  }

  // --- 3. SLAKING OF QUICKLIME: CaO + H2O ---
  if (set.has("cao") && (set.has("h2o") || conditions.water)) {
    return {
      occurred: true,
      title: "Slaking of Lime (Formation of Slaked Lime)",
      equation: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat",
      balancedEquation: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat",
      reactionType: "Combination / Exothermic",
      observations: [
        "Vigorous reaction accompanied by loud hissing sounds and generation of steam.",
        "The beaker becomes intensely hot to the touch (temperature spikes dramatically).",
        "Forms a milky suspension of slaked lime (Calcium hydroxide)."
      ],
      explanation:
        "Calcium oxide reacts vigorously with water to form calcium hydroxide, releasing a large amount of heat. Used for whitewashing walls (NCERT Activity 1.3).",
      energyChange: "Exothermic",
      isHazardous: false,
      visualEffect: {
        color: "#f8fafc",
        hasBubbles: true,
        gasName: "Steam (H₂O vapor)",
        temperatureChange: 45,
        soundDesc: "Loud hissing effervescence"
      }
    };
  }

  // --- 4. DOUBLE DISPLACEMENT PRECIPITATIONS ---
  // A. Lead Nitrate + Potassium Iodide
  if ((set.has("pb_no3_2") && set.has("ki")) || (set.has("pb_no3_2") && set.has("ki"))) {
    return {
      occurred: true,
      title: "Precipitation of Lead(II) Iodide",
      equation: "Pb(NO₃)₂(aq) + KI(aq) → PbI₂(s)↓ + KNO₃(aq)",
      balancedEquation: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)",
      reactionType: "Double Displacement / Precipitation",
      observations: [
        "Two crystal clear, colorless solutions are mixed together.",
        "An instantaneous bright canary-yellow precipitate forms.",
        "The precipitate gradually settles to the bottom of the beaker."
      ],
      explanation:
        "Exchange of ions: Pb²⁺ cations pair with I⁻ anions to produce insoluble lead iodide (PbI₂) while potassium nitrate remains dissolved (NCERT Activity 1.2).",
      energyChange: "Neutral",
      isHazardous: false,
      visualEffect: {
        color: "#fef08a",
        hasPrecipitate: true,
        precipitateColor: "#eab308",
        precipitateName: "PbI₂ (Bright Yellow Precipitate)",
        soundDesc: "Instant clouding"
      }
    };
  }

  // B. Barium Chloride + Sodium Sulphate
  if (set.has("bacl2") && set.has("na2so4")) {
    return {
      occurred: true,
      title: "Precipitation of Barium Sulphate",
      equation: "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + NaCl(aq)",
      balancedEquation: "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + 2NaCl(aq)",
      reactionType: "Double Displacement / Precipitation",
      observations: [
        "Instantaneous formation of a dense, chalky-white insoluble precipitate.",
        "The mixture turns completely opaque milky white.",
        "Precipitate does not dissolve in dilute hydrochloric acid."
      ],
      explanation:
        "Sulphate ions (SO₄²⁻) react with barium ions (Ba²⁺) to precipitate insoluble BaSO₄ (NCERT Activity 1.10).",
      energyChange: "Neutral",
      isHazardous: false,
      visualEffect: {
        color: "#f8fafc",
        hasPrecipitate: true,
        precipitateColor: "#ffffff",
        precipitateName: "BaSO₄ (Curdy White Precipitate)",
        soundDesc: "Instant milky turbidity"
      }
    };
  }

  // --- 5. SINGLE DISPLACEMENT OF METALS ---
  // A. Iron + Copper Sulphate
  if (set.has("fe") && set.has("cuso4")) {
    return {
      occurred: true,
      title: "Displacement of Copper by Iron",
      equation: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓",
      balancedEquation: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓",
      reactionType: "Displacement / Redox",
      observations: [
        "The brilliant royal blue color of copper sulphate solution gradually fades to light apple-green (FeSO₄).",
        "A soft reddish-brown coating of metallic copper forms over the iron surface."
      ],
      explanation:
        "Iron is more reactive than copper in the activity series and displaces Cu²⁺ ions from aqueous solution (NCERT Activity 1.9).",
      energyChange: "Exothermic",
      isHazardous: false,
      visualEffect: {
        color: "#bbf7d0",
        hasPrecipitate: true,
        precipitateColor: "#b45309",
        precipitateName: "Cu (Reddish-brown copper deposit)",
        temperatureChange: 5
      }
    };
  }

  // B. Zinc + Copper Sulphate
  if (set.has("zn") && set.has("cuso4")) {
    return {
      occurred: true,
      title: "Displacement of Copper by Zinc",
      equation: "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)↓",
      balancedEquation: "Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)↓",
      reactionType: "Displacement / Redox",
      observations: [
        "Deep blue color of copper sulphate solution completely discharges to colorless zinc sulphate.",
        "Spongy reddish-brown copper precipitates out."
      ],
      explanation:
        "Zinc is higher than copper in the reactivity series and readily reduces copper ions to elemental copper.",
      energyChange: "Exothermic",
      isHazardous: false,
      visualEffect: {
        color: "#f1f5f9",
        hasPrecipitate: true,
        precipitateColor: "#b45309",
        precipitateName: "Cu (Reddish-brown deposit)",
        temperatureChange: 12
      }
    };
  }

  // C. Copper + HCl (No reaction check)
  if (set.has("cu") && (set.has("hcl") || set.has("h2so4"))) {
    return {
      occurred: false,
      title: "No Reaction (Copper Below Hydrogen in Reactivity Series)",
      equation: "Cu(s) + HCl(aq) → No Reaction",
      balancedEquation: "Cu(s) + HCl(aq) ⎯⎯→ No Reaction",
      reactionType: "Unreactive",
      observations: [
        "No bubbles or effervescence observed.",
        "Copper turnings remain intact with unchanged reddish-brown sheen.",
        "Liquid remains completely clear and colorless."
      ],
      explanation:
        "Copper is placed below hydrogen in the electrochemical reactivity series. It cannot displace hydrogen from dilute non-oxidizing acids (NCERT Activity 3.11).",
      energyChange: "Neutral",
      isHazardous: false,
      visualEffect: {
        color: "#f8fafc"
      }
    };
  }

  // --- 6. ACID + METAL (HYDROGEN GAS EVOLUTION) ---
  const acidId = set.has("hcl") ? "hcl" : set.has("h2so4") ? "h2so4" : null;
  if (acidId && set.has("zn")) {
    const isH2SO4 = acidId === "h2so4";
    return {
      occurred: true,
      title: `Reaction of Zinc Granules with Dilute ${isH2SO4 ? "Sulphuric" : "Hydrochloric"} Acid`,
      equation: isH2SO4 ? "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)" : "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)",
      balancedEquation: isH2SO4 ? "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑" : "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑",
      reactionType: "Displacement / Redox / Exothermic",
      observations: [
        "Brisk effervescence with tiny gas bubbles streaming up from the zinc granules.",
        "The bottom of the conical flask feels pleasantly warm (exothermic).",
        conditions.testedWithSplinter
          ? "POP SOUND TEST POSITIVE: Bringing a burning splinter to the mouth produces a sharp 'POP' sound, confirming pure Hydrogen gas!"
          : "Testing gas: Bringing a burning splinter near the mouth extinguishes the flame with a characteristic 'POP' sound."
      ],
      explanation:
        "Reactive metal zinc displaces hydrogen from dilute acid forming zinc salt and dihydrogen gas (NCERT Activity 1.3 & 2.3).",
      energyChange: "Exothermic",
      isHazardous: false,
      visualEffect: {
        color: "#f1f5f9",
        hasBubbles: true,
        gasName: "H₂ (Hydrogen Gas — Pop Sound)",
        temperatureChange: 15,
        soundDesc: "Rapid fizzy effervescence with pop sound on flame"
      }
    };
  }

  if (acidId && (set.has("al") || set.has("mg") || set.has("fe"))) {
    const metalId = set.has("mg") ? "mg" : set.has("al") ? "al" : "fe";
    const metalName = metalId === "mg" ? "Magnesium" : metalId === "al" ? "Aluminium" : "Iron";
    return {
      occurred: true,
      title: `Reaction of ${metalName} with Dilute Acid`,
      equation: `${metalName} + Acid → Metal Salt + H₂(g)`,
      balancedEquation:
        metalId === "mg"
          ? "Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)↑"
          : metalId === "al"
          ? "2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g)↑"
          : "Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g)↑",
      reactionType: "Displacement / Redox",
      observations: [
        `Vigorous stream of bubbles escaping as ${metalName} dissolves into the acid.`,
        "Exothermic heat warms the test tube.",
        "Hydrogen gas extinguishes a burning splinter with a distinct 'pop' sound."
      ],
      explanation: `Reactive metals displace hydrogen from dilute acids according to reactivity: Mg > Al > Zn > Fe (NCERT Chapter 3).`,
      energyChange: "Exothermic",
      isHazardous: false,
      visualEffect: {
        color: metalId === "fe" ? "#dcfce7" : "#f1f5f9",
        hasBubbles: true,
        gasName: "H₂ Gas",
        temperatureChange: metalId === "mg" ? 25 : 10
      }
    };
  }

  // --- 7. AMPHOTERIC METAL + BASE: Zn + NaOH ---
  if (set.has("zn") && set.has("naoh")) {
    return {
      occurred: true,
      title: "Reaction of Zinc with Sodium Hydroxide (Amphoteric Behavior)",
      equation: "Zn(s) + NaOH(aq) → Na₂ZnO₂(aq) + H₂(g)",
      balancedEquation: "Zn(s) + 2NaOH(aq) ⎯⎯Δ⎯⎯→ Na₂ZnO₂(aq) + H₂(g)↑",
      reactionType: "Displacement / Amphoteric Redox",
      observations: [
        "On gentle heating, hydrogen gas bubbles form on the surface of zinc granules.",
        "Gas burns with a characteristic pop sound when tested with a burning splinter.",
        "Zinc dissolves into a clear solution of Sodium Zincate."
      ],
      explanation:
        "Zinc is an amphoteric metal: it reacts with acids as well as strong alkalis to liberate hydrogen gas and form sodium zincate (Na₂ZnO₂) (NCERT Activity 2.4).",
      energyChange: "Endothermic",
      isHazardous: false,
      visualEffect: {
        color: "#f8fafc",
        hasBubbles: true,
        gasName: "H₂ Gas (Sodium Zincate formed)",
        temperatureChange: 15
      }
    };
  }

  // --- 8. ACID + METAL CARBONATE / BICARBONATE (CO2 GAS EVOLUTION) ---
  const carbonateId = set.has("caco3")
    ? "caco3"
    : set.has("nahco3")
    ? "nahco3"
    : set.has("na2co3")
    ? "na2co3"
    : null;

  if (acidId && carbonateId) {
    const isBakingSoda = carbonateId === "nahco3";
    const isWashingSoda = carbonateId === "na2co3";
    const carbName = isBakingSoda
      ? "Sodium Hydrogen Carbonate"
      : isWashingSoda
      ? "Sodium Carbonate"
      : "Calcium Carbonate";

    return {
      occurred: true,
      title: `Action of Acid on ${carbName}`,
      equation: isBakingSoda
        ? "NaHCO₃ + HCl → NaCl + H₂O + CO₂↑"
        : isWashingSoda
        ? "Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑"
        : "CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑",
      balancedEquation: isBakingSoda
        ? "NaHCO₃(s) + HCl(aq) → NaCl(aq) + H₂O(l) + CO₂(g)↑"
        : isWashingSoda
        ? "Na₂CO₃(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g)↑"
        : "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)↑",
      reactionType: "Decomposition / Gas Evolution",
      observations: [
        "Intense, brisk effervescence resembling soda fizz.",
        "Colorless, odorless carbon dioxide gas bubbles vigorously through the solution.",
        conditions.testedWithLimeWater || set.has("ca_oh2") || set.has("lime_water")
          ? "LIME WATER TEST POSITIVE: Passing the evolved gas through clear lime water turns it milky white (CaCO₃ precipitate). Passing excess clears the milkiness!"
          : "A glowing wood splinter placed near the mouth is instantly extinguished."
      ],
      explanation:
        "All metal carbonates and hydrogen carbonates react with acids to yield a salt, water, and carbon dioxide gas (NCERT Activity 2.5).",
      energyChange: "Endothermic",
      isHazardous: false,
      visualEffect: {
        color: "#f8fafc",
        hasBubbles: true,
        gasName: "CO₂ (Turns Limewater Milky)",
        temperatureChange: -3,
        soundDesc: "Brisk fizzy bubbling"
      }
    };
  }

  // --- 9. ETHANOIC ACID + BAKING SODA: CH3COOH + NaHCO3 (Activity 4.9) ---
  if (set.has("ch3cooh") && (set.has("nahco3") || set.has("na2co3"))) {
    return {
      occurred: true,
      title: "Reaction of Ethanoic Acid with Sodium Bicarbonate",
      equation: "CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑",
      balancedEquation: "CH₃COOH(aq) + NaHCO₃(s) → CH₃COONa(aq) + H₂O(l) + CO₂(g)↑",
      reactionType: "Acid-Base Carbonate Gas Evolution",
      observations: [
        "Immediate, brisk effervescence with abundant gas bubbles.",
        "Pungent vinegar odor of ethanoic acid diminishes as sodium ethanoate salt forms.",
        "When passed through clear lime water, the gas turns it milky white."
      ],
      explanation:
        "Ethanoic acid behaves like mineral acids with carbonates, liberating CO₂. Used in school labs to distinguish ethanoic acid from ethanol (NCERT Activity 4.9).",
      energyChange: "Neutral",
      isHazardous: false,
      visualEffect: {
        color: "#f8fafc",
        hasBubbles: true,
        gasName: "CO₂ Gas",
        temperatureChange: -2,
        soundDesc: "Crisp effervescence"
      }
    };
  }

  // --- 10. NEUTRALISATION: ACID + BASE ---
  const hasBase = set.has("naoh") || set.has("koh") || set.has("ca_oh2");
  if (acidId && hasBase) {
    const baseName = set.has("naoh") ? "NaOH" : set.has("koh") ? "KOH" : "Ca(OH)₂";
    return {
      occurred: true,
      title: `Acid-Base Neutralisation (${baseName} + Acid)`,
      equation: `${baseName} + Acid → Salt + H₂O + Heat`,
      balancedEquation:
        set.has("naoh") && acidId === "hcl"
          ? "NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l) + Heat"
          : set.has("koh") && acidId === "hcl"
          ? "KOH(aq) + HCl(aq) → KCl(aq) + H₂O(l) + Heat"
          : "2NaOH(aq) + H₂SO₄(aq) → Na₂SO₄(aq) + 2H₂O(l) + Heat",
      reactionType: "Neutralisation / Exothermic",
      observations: [
        "Colorless solution formed as acid and base cancel each other out.",
        "Noticeable temperature rise in the flask due to heat of neutralisation.",
        set.has("phenolphthalein")
          ? "Phenolphthalein indicator: Initially pink alkali decolorizes to completely colorless as equivalence point is reached!"
          : "pH approaches neutral 7.0."
      ],
      explanation:
        "H⁺ ions from the acid combine with OH⁻ ions from the base to form unionized water molecules: H⁺ + OH⁻ → H₂O (NCERT Activity 2.6).",
      energyChange: "Exothermic",
      isHazardous: false,
      visualEffect: {
        color: set.has("phenolphthalein") ? "#fdf2f8" : "#f8fafc",
        temperatureChange: 18,
        soundDesc: "Warm gentle mixing"
      }
    };
  }

  // --- 11. ESTERIFICATION: CH3COOH + C2H5OH ---
  if (set.has("ch3cooh") && set.has("c2h5oh")) {
    return {
      occurred: true,
      title: "Esterification Reaction (Synthesis of Sweet Ester)",
      equation: "CH₃COOH + C₂H₅OH ⎯⎯H₂SO₄⎯⎯→ CH₃COOC₂H₅ + H₂O",
      balancedEquation: "CH₃COOH(l) + C₂H₅OH(l) ⎯⎯Acid, Δ⎯⎯→ CH₃COOC₂H₅(l) + H₂O(l)",
      reactionType: "Esterification / Condensation",
      observations: [
        "Warm water bath heating releases a distinct, sweet fruity fragrance.",
        "Liquid separates into an immiscible aromatic organic layer.",
        "Sharp acidic vinegar smell is replaced by pleasant perfume-like odor."
      ],
      explanation:
        "Carboxylic acids react with alcohols in the presence of an acid catalyst to form sweet-smelling esters used in perfumes and flavoring agents (NCERT Activity 4.8).",
      energyChange: "Endothermic",
      isHazardous: false,
      visualEffect: {
        color: "#f8fafc",
        temperatureChange: 10,
        soundDesc: "Pleasant vapor aroma"
      }
    };
  }

  // --- 12. SAPONIFICATION: Ester + NaOH ---
  if (set.has("ester") && set.has("naoh")) {
    return {
      occurred: true,
      title: "Saponification Reaction (Soap Preparation)",
      equation: "CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH",
      balancedEquation: "CH₃COOC₂H₅(l) + NaOH(aq) → CH₃COONa(aq) + C₂H₅OH(l)",
      reactionType: "Saponification / Alkaline Ester Hydrolysis",
      observations: [
        "Fruity ester layer dissolves as reaction proceeds upon heating.",
        "Solution turns soapy and slippery to touch.",
        "Forms sodium ethanoate salt and ethanol."
      ],
      explanation:
        "Ester reacts with alkali to regenerate alcohol and sodium salt of carboxylic acid. This reaction is the basis of soap manufacturing (NCERT Section 4.4.2).",
      energyChange: "Endothermic",
      isHazardous: false,
      visualEffect: {
        color: "#f1f5f9",
        temperatureChange: 10
      }
    };
  }

  // --- 13. INDICATOR COLOR TESTS ---
  const indicatorId = Array.from(set).find((id) =>
    [
      "blue_litmus",
      "red_litmus",
      "phenolphthalein",
      "methyl_orange",
      "universal_indicator",
      "lime_water"
    ].includes(id)
  );

  if (indicatorId) {
    const isAcid = set.has("hcl") || set.has("h2so4") || set.has("hno3") || set.has("ch3cooh");
    const isBase = set.has("naoh") || set.has("ca_oh2") || set.has("koh");

    if (indicatorId === "phenolphthalein") {
      const color = isBase ? "#ec4899" : "#f8fafc";
      return {
        occurred: true,
        title: "Phenolphthalein Indicator Test",
        equation: "HIn(aq) ⇌ H⁺(aq) + In⁻(aq)",
        balancedEquation: "Phenolphthalein in medium",
        reactionType: "Qualitative Indicator Test",
        observations: [
          isBase
            ? "Vivid magenta / deep pink coloration immediately develops (pH > 8.2)."
            : isAcid
            ? "Solution remains crystal clear and colorless (pH < 8.2)."
            : "No color change in neutral water."
        ],
        explanation:
          "Phenolphthalein is colorless in acidic and neutral media but dissociates into its pink anionic resonance form in basic solutions (NCERT Activity 2.1).",
        energyChange: "Neutral",
        isHazardous: false,
        visualEffect: { color }
      };
    }

    if (indicatorId === "blue_litmus" || indicatorId === "red_litmus") {
      const isRedLitmus = indicatorId === "red_litmus";
      const finalColor = isAcid ? "#ef4444" : isBase ? "#3b82f6" : isRedLitmus ? "#ef4444" : "#3b82f6";
      return {
        occurred: true,
        title: `${isRedLitmus ? "Red" : "Blue"} Litmus Indicator Test`,
        equation: "Litmus acid-base equilibrium",
        balancedEquation: "Litmus indicator test",
        reactionType: "Acid-Base Indicator",
        observations: [
          isAcid
            ? "Turns sharp RED, demonstrating the presence of acidic hydrogen (H⁺/H₃O⁺) ions."
            : isBase
            ? "Turns vibrant BLUE, demonstrating alkaline hydroxide (OH⁻) ions."
            : "No color change observed in neutral solution."
        ],
        explanation:
          "Litmus is a natural dye extracted from lichen that undergoes color inversion based on solution hydronium concentration.",
        energyChange: "Neutral",
        isHazardous: false,
        visualEffect: { color: finalColor }
      };
    }

    if (indicatorId === "universal_indicator") {
      const finalColor = isAcid ? "#ef4444" : isBase ? "#7c3aed" : "#22c55e";
      const pHStr = isAcid ? "pH ~ 1-3 (Acidic)" : isBase ? "pH ~ 12-14 (Basic)" : "pH ~ 7 (Neutral)";
      return {
        occurred: true,
        title: "Universal Indicator pH Spectrum Test",
        equation: "pH = -log₁₀[H⁺]",
        balancedEquation: "Universal pH test",
        reactionType: "Full-Range pH Measurement",
        observations: [
          `Solution turns ${isAcid ? "bright red/orange" : isBase ? "deep violet" : "emerald green"}.`,
          `Estimated solution pH: ${pHStr}.`
        ],
        explanation:
          "Universal indicator is a calibrated mixture of indicators providing distinct hues across the entire 0-14 pH scale (NCERT Activity 2.11).",
        energyChange: "Neutral",
        isHazardous: false,
        visualEffect: { color: finalColor }
      };
    }
  }

  // --- 14. DEFAULT / NO REACTION CASE ---
  return {
    occurred: false,
    title: "No Observable Chemical Reaction",
    equation: "Reagents mixed without reaction",
    balancedEquation: "—",
    reactionType: "Mixture / No Reaction",
    observations: [
      "No color change, gas effervescence, or precipitate formation observed.",
      "Temperature remains stable.",
      "The substances do not have sufficient driving force (redox potential or solubility change) to react under these conditions."
    ],
    explanation:
      "For a chemical reaction to occur, there must be a valid thermodynamic driving force (e.g. formation of an insoluble precipitate, evolution of gas, or redox displacement according to the activity series).",
    energyChange: "Neutral",
    isHazardous: false,
    visualEffect: { color: "#f8fafc" }
  };
}
