import { DiscoveryRule, DiscoveryReactionResult } from "../types";

export interface SimulationConditions {
  heat: boolean;
  water: boolean;
  testedWithSplinter?: boolean;
  testedWithLimeWater?: boolean;
}

export const DISCOVERY_RULES: DiscoveryRule[] = [
  // 1. Thermal Decomposition of Ferrous Sulphate (NCERT Activity 1.5)
  {
    id: "feso4-thermal-decomposition",
    reactionId: "ch1-ferrous-sulphate-decomposition",
    title: "Thermal Decomposition of Ferrous Sulphate",
    reactants: ["feso4"],
    requiresHeat: true,
    matches: (set, conditions, count) => count === 1 && conditions.heat && set.has("feso4"),
    getResult: () => ({
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
        "⚠️ Virtual Simulation Notice: Sulphur dioxide (SO₂) gas is choking and harmful to inhale. Simulated safely without exposure.",
      visualEffect: {
        color: "#78350f",
        hasBubbles: true,
        gasName: "SO₂ + SO₃ Fumes",
        temperatureChange: 45,
        soundDesc: "Subtle crackling and pungent vapor release"
      }
    })
  },

  // 2. Thermal Decomposition of Lead Nitrate (NCERT Activity 1.6)
  {
    id: "pb-no3-2-thermal-decomposition",
    reactionId: "ch1-lead-nitrate-decomposition",
    title: "Thermal Decomposition of Lead Nitrate",
    reactants: ["pb_no3_2"],
    requiresHeat: true,
    matches: (set, conditions, count) => count === 1 && conditions.heat && set.has("pb_no3_2"),
    getResult: () => ({
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
        "⚠️ Virtual Simulation Notice: NO₂ brown fumes are toxic and irritating. Virtual simulation allows safe study of color transitions without exposure.",
      visualEffect: {
        color: "#ca8a04",
        hasBubbles: true,
        gasName: "NO₂ (Reddish-brown fumes)",
        temperatureChange: 50,
        soundDesc: "Sharp crackling decrepitation sound"
      }
    })
  },

  // 3. Thermal Decomposition of Calcium Carbonate (Limestone)
  {
    id: "caco3-calcination",
    reactionId: "ch1-limestone-decomposition",
    title: "Thermal Decomposition of Calcium Carbonate (Calcination)",
    reactants: ["caco3"],
    requiresHeat: true,
    matches: (set, conditions, count) => count === 1 && conditions.heat && set.has("caco3"),
    getResult: () => ({
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
    })
  },

  // 4. Copper Sulphate Hydrate Dehydration (NCERT Activity 2.15)
  {
    id: "cuso4-crystallization-water",
    reactionId: "ch2-copper-sulphate-crystallisation-water",
    title: "Loss of Water of Crystallization (Hydrated to Anhydrous)",
    reactants: ["cuso4"],
    requiresHeat: true,
    matches: (set, conditions, count) => count === 1 && conditions.heat && set.has("cuso4"),
    getResult: () => ({
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
        "Blue vitriol contains 5 fixed molecules of water per formula unit. Heating drives off this water, collapsing the copper coordination sphere (NCERT Activity 2.15).",
      energyChange: "Endothermic",
      isHazardous: false,
      visualEffect: {
        color: "#f8fafc",
        hasBubbles: false,
        temperatureChange: 20
      }
    })
  },

  // 5. Magnesium Ribbon Combustion (NCERT Activity 1.1)
  {
    id: "mg-combustion",
    reactionId: "ch1-magnesium-ribbon",
    title: "Combustion of Magnesium Ribbon in Air",
    reactants: ["mg"],
    requiresHeat: true,
    matches: (set, conditions, count) => count === 1 && conditions.heat && set.has("mg"),
    getResult: () => ({
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
        "⚠️ Virtual Simulation Notice: Looking directly at burning magnesium can harm eyesight. Safely rendered on screen.",
      visualEffect: {
        color: "#ffffff",
        flameColor: "#ffffff",
        temperatureChange: 80,
        soundDesc: "Hissing burn with dazzling luminescence"
      }
    })
  },

  // 6. Sodium + Water Reaction (NCERT Activity 3.10)
  {
    id: "na-water-reaction",
    reactionId: "ch3-sodium-cold-water",
    title: "Violent Reaction of Alkali Metal Sodium with Water",
    reactants: ["na", "h2o"],
    matches: (set, conditions) =>
      (set.has("na") && (set.has("h2o") || conditions.water)) ||
      (set.has("na") && set.has("hcl")),
    getResult: () => ({
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
        "Sodium has very low ionization energy and reacts vigorously with cold water. Stored submerged under kerosene (NCERT Activity 3.10).",
      energyChange: "Exothermic",
      isHazardous: true,
      simulationSafetyNote:
        "⚠️ SIMULATION NOTICE: Virtual sandbox provides full visual fidelity without physical fire or explosive blast hazard.",
      visualEffect: {
        color: "#f472b6",
        hasBubbles: true,
        gasName: "H₂ (ignites)",
        temperatureChange: 75,
        flameColor: "#eab308",
        soundDesc: "Rapid hissing and pop combustion"
      }
    })
  },

  // 7. Slaking of Quicklime (NCERT Activity 1.4)
  {
    id: "cao-slaking",
    reactionId: "ch1-slaked-lime",
    title: "Slaking of Lime (Formation of Slaked Lime)",
    reactants: ["cao", "h2o"],
    matches: (set, conditions) => set.has("cao") && (set.has("h2o") || conditions.water),
    getResult: () => ({
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
        "Calcium oxide reacts vigorously with water to form calcium hydroxide, releasing a large amount of heat. Used for whitewashing walls (NCERT Activity 1.4).",
      energyChange: "Exothermic",
      isHazardous: false,
      visualEffect: {
        color: "#f8fafc",
        hasBubbles: true,
        gasName: "Steam (H₂O vapor)",
        temperatureChange: 45,
        soundDesc: "Loud hissing effervescence"
      }
    })
  },

  // 8. Lead Nitrate + Potassium Iodide Precipitation (NCERT Activity 1.2)
  {
    id: "pbi2-precipitation",
    reactionId: "ch1-lead-iodide-precipitation",
    title: "Precipitation of Lead(II) Iodide",
    reactants: ["pb_no3_2", "ki"],
    matches: (set) => set.has("pb_no3_2") && set.has("ki"),
    getResult: () => ({
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
    })
  },

  // 9. Barium Chloride + Sodium Sulphate Precipitation (NCERT Activity 1.10)
  {
    id: "baso4-precipitation",
    reactionId: "ch1-double-displacement-barium-sulphate",
    title: "Precipitation of Barium Sulphate",
    reactants: ["bacl2", "na2so4"],
    matches: (set) => set.has("bacl2") && set.has("na2so4"),
    getResult: () => ({
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
    })
  },

  // 10. Displacement of Copper by Iron (NCERT Activity 1.9)
  {
    id: "fe-cuso4-displacement",
    reactionId: "ch1-iron-copper-sulphate-displacement",
    title: "Displacement of Copper by Iron",
    reactants: ["fe", "cuso4"],
    matches: (set) => set.has("fe") && set.has("cuso4"),
    getResult: () => ({
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
    })
  },

  // 11. Displacement of Copper by Zinc
  {
    id: "zn-cuso4-displacement",
    title: "Displacement of Copper by Zinc",
    reactants: ["zn", "cuso4"],
    matches: (set) => set.has("zn") && set.has("cuso4"),
    getResult: () => ({
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
    })
  },

  // 12. Copper + Acid: No Reaction (Below Hydrogen)
  {
    id: "cu-acid-no-reaction",
    title: "No Reaction (Copper Below Hydrogen in Reactivity Series)",
    reactants: ["cu", "hcl"],
    matches: (set) => set.has("cu") && (set.has("hcl") || set.has("h2so4")),
    getResult: () => ({
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
    })
  },

  // 13. Zinc + Acid (NCERT Activity 2.3)
  {
    id: "zn-acid-hydrogen",
    reactionId: "ch2-zinc-acid-hydrogen",
    title: "Reaction of Zinc with Dilute Acid",
    reactants: ["zn", "hcl"],
    matches: (set) => (set.has("hcl") || set.has("h2so4")) && set.has("zn"),
    getResult: (set, conditions) => {
      const isH2SO4 = set.has("h2so4");
      return {
        occurred: true,
        title: `Reaction of Zinc Granules with Dilute ${isH2SO4 ? "Sulphuric" : "Hydrochloric"} Acid`,
        equation: isH2SO4
          ? "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)"
          : "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)",
        balancedEquation: isH2SO4
          ? "Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑"
          : "Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)↑",
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
  },

  // 14. Reactive Metals (Mg, Al, Fe) + Dilute Acid
  {
    id: "reactive-metal-acid",
    title: "Reaction of Metal with Dilute Acid",
    reactants: ["mg", "hcl"],
    matches: (set) =>
      (set.has("hcl") || set.has("h2so4")) &&
      (set.has("al") || set.has("mg") || set.has("fe")),
    getResult: (set) => {
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
  },

  // 15. Zinc + Sodium Hydroxide (Amphoteric Behavior) (NCERT Activity 2.4)
  {
    id: "zn-naoh-amphoteric",
    reactionId: "ch2-zinc-sodium-hydroxide",
    title: "Reaction of Zinc with Sodium Hydroxide (Amphoteric Behavior)",
    reactants: ["zn", "naoh"],
    matches: (set) => set.has("zn") && set.has("naoh"),
    getResult: () => ({
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
    })
  },

  // 16. Acid + Carbonate / Bicarbonate (NCERT Activity 2.5)
  {
    id: "acid-carbonate-gas",
    reactionId: "ch2-metal-carbonates-acid",
    title: "Action of Acid on Metal Carbonate",
    reactants: ["nahco3", "hcl"],
    matches: (set) =>
      (set.has("hcl") || set.has("h2so4")) &&
      (set.has("caco3") || set.has("nahco3") || set.has("na2co3")),
    getResult: (set, conditions) => {
      const isBakingSoda = set.has("nahco3");
      const isWashingSoda = set.has("na2co3");
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
  },

  // 17. Ethanoic Acid + Sodium Bicarbonate (NCERT Activity 4.9)
  {
    id: "ch3cooh-nahco3-gas",
    reactionId: "ch4-ethanoic-acid-sodium-bicarbonate",
    title: "Reaction of Ethanoic Acid with Sodium Bicarbonate",
    reactants: ["ch3cooh", "nahco3"],
    matches: (set) => set.has("ch3cooh") && (set.has("nahco3") || set.has("na2co3")),
    getResult: () => ({
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
        "Ethanoic acid behaves like mineral acids with carbonates, liberating CO₂. Distinguishes ethanoic acid from ethanol (NCERT Activity 4.9).",
      energyChange: "Neutral",
      isHazardous: false,
      visualEffect: {
        color: "#f8fafc",
        hasBubbles: true,
        gasName: "CO₂ Gas",
        temperatureChange: -2,
        soundDesc: "Crisp effervescence"
      }
    })
  },

  // 18. Acid-Base Neutralisation (NCERT Activity 2.6)
  {
    id: "acid-base-neutralisation",
    reactionId: "ch2-acid-base-neutralisation",
    title: "Acid-Base Neutralisation",
    reactants: ["naoh", "hcl"],
    matches: (set) =>
      (set.has("hcl") || set.has("h2so4")) &&
      (set.has("naoh") || set.has("koh") || set.has("ca_oh2")),
    getResult: (set) => {
      const baseName = set.has("naoh") ? "NaOH" : set.has("koh") ? "KOH" : "Ca(OH)₂";
      const acidId = set.has("hcl") ? "hcl" : "h2so4";
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
  },

  // 19. Esterification (NCERT Activity 4.8)
  {
    id: "esterification",
    reactionId: "ch4-esterification-reaction",
    title: "Esterification Reaction (Synthesis of Sweet Ester)",
    reactants: ["ch3cooh", "c2h5oh"],
    matches: (set) => set.has("ch3cooh") && set.has("c2h5oh"),
    getResult: () => ({
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
    })
  },

  // 20. Saponification (Soap Preparation) (NCERT Section 4.4.2)
  {
    id: "saponification",
    reactionId: "ch4-saponification-soap",
    title: "Saponification Reaction (Soap Preparation)",
    reactants: ["ester", "naoh"],
    matches: (set) => set.has("ester") && set.has("naoh"),
    getResult: () => ({
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
    })
  },

  // 21. Indicators (Phenolphthalein, Litmus, Universal)
  {
    id: "indicator-tests",
    title: "Indicator Reaction Test",
    reactants: ["phenolphthalein"],
    matches: (set) =>
      Array.from(set).some((id) =>
        [
          "blue_litmus",
          "red_litmus",
          "phenolphthalein",
          "methyl_orange",
          "universal_indicator"
        ].includes(id)
      ),
    getResult: (set) => {
      const indicatorId = Array.from(set).find((id) =>
        [
          "blue_litmus",
          "red_litmus",
          "phenolphthalein",
          "methyl_orange",
          "universal_indicator"
        ].includes(id)
      );

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

      // Universal Indicator
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
];

export const EMPTY_VESSEL_RESULT: DiscoveryReactionResult = {
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

export const DEFAULT_NO_REACTION_RESULT: DiscoveryReactionResult = {
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
