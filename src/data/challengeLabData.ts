import { ChemistryChallenge } from "../types";

export const CHEMISTRY_CHALLENGES: ChemistryChallenge[] = [
  {
    id: "challenge-lime-water",
    title: "The Milkiness Disappearance Mystery",
    chapter: "Chapter 1 & 2: Chemical Reactions & Acids, Bases",
    difficulty: "Medium",
    points: 100,
    scenario:
      "A white solid compound X was added to dilute Hydrochloric Acid in a flask. A colorless, odorless gas was evolved with brisk effervescence. When bubbled through freshly prepared lime water, the solution turned milky. On passing excess gas, the milkiness completely disappeared.",
    objective:
      "Identify compound X from the chemical shelf, react it with dilute acid, and verify the evolved gas using the lime water test.",
    allowedSubstanceIds: ["caco3", "nahco3", "hcl", "naoh", "lime_water", "splinter", "fe"],
    targetReactionEquation: "CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)↑",
    validationCheck: (ids, conditions) => {
      const hasCarbonate = ids.includes("caco3") || ids.includes("nahco3");
      const hasAcid = ids.includes("hcl");
      const testedWithLime = conditions.testedWithLimeWater || ids.includes("lime_water");

      if (hasCarbonate && hasAcid && testedWithLime) {
        return {
          solved: true,
          feedback:
            "Correct! CaCO₃ reacts with dilute HCl to release CO₂ gas, turning lime water milky due to insoluble CaCO₃. Excess CO₂ forms soluble calcium hydrogen carbonate Ca(HCO₃)₂, causing the milkiness to disappear!",
          observation:
            "Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s)↓ (milky) + H₂O. Excess: CaCO₃ + H₂O + CO₂ → Ca(HCO₃)₂(aq) (soluble clear)."
        };
      } else if (hasCarbonate && hasAcid && !testedWithLime) {
        return {
          solved: false,
          feedback:
            "You released the gas, but forgot to test it with Lime Water! Enable the Lime Water Test to confirm the gas identity.",
          observation: "Brisk effervescence observed, but gas remains unconfirmed."
        };
      }
      return {
        solved: false,
        feedback:
          "Not quite. Select a carbonate salt (like CaCO₃ or NaHCO₃), add dilute acid (HCl), and test with Lime Water.",
        observation: "Incomplete or incorrect chemical mixture."
      };
    },
    hints: [
      "Hint 1: All metal carbonates and bicarbonates release Carbon Dioxide gas when treated with acids.",
      "Hint 2: Lime water is Calcium Hydroxide, Ca(OH)₂.",
      "Hint 3: Combine Calcium Carbonate (CaCO₃) and Hydrochloric Acid (HCl), then click the Lime Water Test button!"
    ],
    boardFact:
      "NCERT Activity 2.5: Board exams frequently test the chemical equations for both the initial milkiness (CaCO₃) and its subsequent clearing upon excess CO₂ (forming soluble Ca(HCO₃)₂)."
  },
  {
    id: "challenge-displacement",
    title: "The Iron Nail Transformation",
    chapter: "Chapter 1 & 3: Chemical Reactions & Metals",
    difficulty: "Easy",
    points: 75,
    scenario:
      "A student noticed that an iron nail immersed in an unknown blue aqueous solution changed the solution to light green, while depositing a reddish-brown coating on the nail surface.",
    objective:
      "Select the correct salt solution and metal to reproduce this classic single displacement reaction.",
    allowedSubstanceIds: ["fe", "cuso4", "zn", "cu", "bacl2", "h2o"],
    targetReactionEquation: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)↓",
    validationCheck: (ids) => {
      if (ids.includes("fe") && ids.includes("cuso4")) {
        return {
          solved: true,
          feedback:
            "Challenge Solved! Iron (Fe) is higher than copper in the reactivity series. It displaces copper from CuSO₄, turning the solution pale green (FeSO₄) and depositing reddish-brown copper on the iron.",
          observation:
            "Blue solution fades to light green; reddish-brown layer coats the iron strip."
        };
      }
      return {
        solved: false,
        feedback:
          "Remember the reactivity series: Iron displaces a less reactive transition metal from its blue sulphate salt solution.",
        observation: "The required color change has not occurred."
      };
    },
    hints: [
      "Hint 1: What is the formula of the blue vitriol solution? CuSO₄.",
      "Hint 2: Which metal is used for nails? Fe.",
      "Hint 3: Mix Iron Filings/Nails (Fe) and Copper Sulphate (CuSO₄)!"
    ],
    boardFact:
      "NCERT Activity 1.9: A staple Class 10 practical question asked in board exams every year. Why does the blue color fade? Because Fe²⁺ ions replace Cu²⁺ ions in solution."
  },
  {
    id: "challenge-yellow-precipitate",
    title: "Synthesis of Canary-Yellow Precipitate",
    chapter: "Chapter 1: Chemical Reactions & Equations",
    difficulty: "Easy",
    points: 80,
    scenario:
      "You need to prepare an insoluble bright canary-yellow chemical precipitate without heating, by simply mixing two clear aqueous salt solutions.",
    objective:
      "Select the two correct soluble salts from the rack to precipitate Lead(II) Iodide.",
    allowedSubstanceIds: ["pb_no3_2", "ki", "bacl2", "na2so4", "cuso4", "naoh"],
    targetReactionEquation: "Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂(s)↓ + 2KNO₃(aq)",
    validationCheck: (ids) => {
      if (ids.includes("pb_no3_2") && ids.includes("ki")) {
        return {
          solved: true,
          feedback:
            "Spectacular! Mixing Lead(II) Nitrate and Potassium Iodide produces an instantaneous brilliant yellow precipitate of Lead Iodide (PbI₂).",
          observation: "Bright yellow solid precipitates instantly in the clear liquid."
        };
      }
      return {
        solved: false,
        feedback:
          "Check the salts: One provides lead ions (Pb²⁺), the other provides iodide ions (I⁻).",
        observation: "No yellow precipitate formed."
      };
    },
    hints: [
      "Hint 1: Think about NCERT Activity 1.2 on page 2.",
      "Hint 2: The cation is Lead and the anion is Iodide.",
      "Hint 3: Select Lead(II) Nitrate (Pb(NO₃)₂) and Potassium Iodide (KI)!"
    ],
    boardFact:
      "NCERT Activity 1.2: One of the hallmark examples of a Double Displacement and Precipitation reaction."
  },
  {
    id: "challenge-neutralisation",
    title: "Perfect Neutralisation (Target pH 7.0)",
    chapter: "Chapter 2: Acids, Bases & Salts",
    difficulty: "Medium",
    points: 90,
    scenario:
      "You have a flask of caustic Sodium Hydroxide with Phenolphthalein indicator, showing an intense magenta-pink color. You must bring the solution to neutral pH 7.0 where the pink color completely vanishes.",
    objective:
      "Neutralise the alkali by choosing the appropriate mineral acid and observing the decolorization of phenolphthalein.",
    allowedSubstanceIds: ["naoh", "hcl", "phenolphthalein", "universal_indicator", "ch3cooh", "h2o"],
    targetReactionEquation: "NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l) + Heat",
    validationCheck: (ids) => {
      const hasBase = ids.includes("naoh");
      const hasAcid = ids.includes("hcl");
      const hasIndicator = ids.includes("phenolphthalein") || ids.includes("universal_indicator");

      if (hasBase && hasAcid && hasIndicator) {
        return {
          solved: true,
          feedback:
            "Equivalence Achieved! H⁺ ions from Hydrochloric acid completely neutralized OH⁻ ions from Sodium Hydroxide. Phenolphthalein is decolorized and pH reaches 7.0.",
          observation:
            "Intense magenta pink turns completely clear and colorless; temperature rises slightly."
        };
      } else if (hasBase && hasAcid && !hasIndicator) {
        return {
          solved: false,
          feedback:
            "The acid and base reacted, but you need an indicator (Phenolphthalein or Universal Indicator) to visually monitor the neutralization!",
          observation: "Reaction happened, but indicator verification is missing."
        };
      }
      return {
        solved: false,
        feedback: "Mix Sodium Hydroxide (NaOH), Hydrochloric Acid (HCl), and Phenolphthalein.",
        observation: "Incomplete neutralization setup."
      };
    },
    hints: [
      "Hint 1: Acid + Base → Salt + Water + Heat.",
      "Hint 2: Phenolphthalein turns colorless as soon as all OH⁻ ions are consumed.",
      "Hint 3: Select NaOH, HCl, and Phenolphthalein together."
    ],
    boardFact:
      "NCERT Activity 2.6: Demonstrates that the effect of a base is nullified by an acid and vice versa."
  },
  {
    id: "challenge-fruity-ester",
    title: "The Fruity Perfume Synthesis",
    chapter: "Chapter 4: Carbon and its Compounds",
    difficulty: "Hard",
    points: 120,
    scenario:
      "A perfume manufacturer needs to synthesize ethyl ethanoate, an organic ester renowned for its pleasant, sweet, fruity aroma, using organic reagents commonly found in school chemistry labs.",
    objective:
      "Select the carboxylic acid and alcohol, then apply heating in acidic conditions to synthesize the ester.",
    allowedSubstanceIds: ["ch3cooh", "c2h5oh", "h2so4", "naoh", "caco3"],
    targetReactionEquation: "CH₃COOH(l) + C₂H₅OH(l) ⎯⎯H₂SO₄, Δ⎯⎯→ CH₃COOC₂H₅(l) + H₂O(l)",
    validationCheck: (ids, conditions) => {
      const hasAcid = ids.includes("ch3cooh");
      const hasAlcohol = ids.includes("c2h5oh");
      const heated = conditions.heat;

      if (hasAcid && hasAlcohol && heated) {
        return {
          solved: true,
          feedback:
            "Magnificent synthesis! Ethanoic acid reacts with absolute ethanol in the presence of heat and acid catalyst to form sweet-smelling Ethyl Ethanoate ester.",
          observation:
            "Distinct, pleasant fruity aroma detected. Liquid separates into organic ester layer."
        };
      } else if (hasAcid && hasAlcohol && !heated) {
        return {
          solved: false,
          feedback:
            "Reagents are correct, but esterification requires heat (warm water bath)! Turn on the Heat switch.",
          observation: "Reagents mixed cold; esterification rate is negligible without heat."
        };
      }
      return {
        solved: false,
        feedback: "Select Ethanoic Acid (CH₃COOH) and Ethanol (C₂H₅OH), then apply Heat.",
        observation: "Incorrect reagents for esterification."
      };
    },
    hints: [
      "Hint 1: Esterification is the reaction between a carboxylic acid and an alcohol.",
      "Hint 2: Ethanoic acid + Ethanol.",
      "Hint 3: Make sure you turn on the Heat (Bunsen Burner) switch!"
    ],
    boardFact:
      "NCERT Activity 4.8: Esters are sweet-smelling substances used in making perfumes and as flavoring agents. On treatment with sodium hydroxide, the ester is converted back to alcohol and sodium salt of carboxylic acid (saponification)."
  },
  {
    id: "challenge-amphoteric",
    title: "The Dual Nature (Amphoteric) Metal",
    chapter: "Chapter 2 & 3: Acids, Bases & Metals",
    difficulty: "Hard",
    points: 110,
    scenario:
      "Find the versatile metal that breaks the rule of metals reacting only with acids: this metal reacts vigorously with strong caustic alkali (NaOH) upon heating, liberating flammable hydrogen gas!",
    objective:
      "Select the amphoteric metal and caustic soda (NaOH), apply gentle heating, and confirm the evolution of hydrogen.",
    allowedSubstanceIds: ["zn", "al", "fe", "cu", "naoh", "hcl", "splinter"],
    targetReactionEquation: "Zn(s) + 2NaOH(aq) ⎯⎯Δ⎯⎯→ Na₂ZnO₂(aq) + H₂(g)↑",
    validationCheck: (ids, conditions) => {
      const isZinc = ids.includes("zn");
      const hasBase = ids.includes("naoh");
      const heated = conditions.heat;

      if (isZinc && hasBase && heated) {
        return {
          solved: true,
          feedback:
            "Challenge Solved! Zinc is an amphoteric metal. It reacts with hot concentrated NaOH to liberate Hydrogen gas and form Sodium Zincate (Na₂ZnO₂).",
          observation:
            "Zinc granules dissolve in hot caustic alkali with steady evolution of H₂ gas bubbles."
        };
      } else if (isZinc && hasBase && !heated) {
        return {
          solved: false,
          feedback:
            "The reaction of Zinc with NaOH is sluggish at room temperature. Warm the mixture with Heat!",
          observation: "Slow bubbling; needs thermal energy."
        };
      }
      return {
        solved: false,
        feedback: "Choose Zinc granules (Zn) and Sodium Hydroxide (NaOH), then apply Heat.",
        observation: "Incorrect reagent combination."
      };
    },
    hints: [
      "Hint 1: Review NCERT Activity 2.4 on page 20.",
      "Hint 2: The product formed is called Sodium Zincate, Na₂ZnO₂.",
      "Hint 3: Select Zinc Granules (Zn), Sodium Hydroxide (NaOH), and toggle Heat ON!"
    ],
    boardFact:
      "NCERT Activity 2.4: Most metals do NOT react with bases to give hydrogen gas. Zinc and Aluminium are exceptions due to their amphoteric nature."
  },
  {
    id: "challenge-brown-fumes",
    title: "The Toxic Brown Fumes Deconstruction",
    chapter: "Chapter 1: Chemical Reactions & Equations",
    difficulty: "Medium",
    points: 95,
    scenario:
      "When a white solid is strongly heated in a dry boiling tube, it decrepitates with crackling sounds, releasing dense, choking reddish-brown fumes of a toxic gas, leaving behind a yellow solid residue that sticks to the glass.",
    objective:
      "Select the white crystalline lead salt and subject it to thermal decomposition.",
    allowedSubstanceIds: ["pb_no3_2", "feso4", "caco3", "cuso4", "splinter"],
    targetReactionEquation: "2Pb(NO₃)₂(s) ⎯⎯Δ⎯⎯→ 2PbO(s) + 4NO₂(g)↑ + O₂(g)↑",
    validationCheck: (ids, conditions) => {
      if (ids.includes("pb_no3_2") && conditions.heat) {
        return {
          solved: true,
          feedback:
            "Mastery demonstrated! Lead(II) Nitrate decomposes thermally into Lead Monoxide (yellow residue PbO), brown Nitrogen Dioxide (NO₂) fumes, and Oxygen (O₂).",
          observation:
            "Crackling decrepitation sound, dense reddish-brown fumes of NO₂, and yellow PbO residue."
        };
      } else if (ids.includes("pb_no3_2") && !conditions.heat) {
        return {
          solved: false,
          feedback: "Lead Nitrate requires strong thermal decomposition! Turn on the Heat switch.",
          observation: "White crystalline salt sitting cold in the tube."
        };
      }
      return {
        solved: false,
        feedback: "Select Lead Nitrate (Pb(NO₃)₂) and apply Heat.",
        observation: "Incorrect salt chosen."
      };
    },
    hints: [
      "Hint 1: Which salt contains nitrate ions that form brown NO₂ gas?",
      "Hint 2: The yellow residue is PbO.",
      "Hint 3: Choose Lead(II) Nitrate and turn on the Heat switch!"
    ],
    boardFact:
      "NCERT Activity 1.6: This reaction is asked almost every year in CBSE boards under 'Identify the brown gas X (NO₂) and yellow residue Y (PbO)'."
  },
  {
    id: "challenge-saponification",
    title: "The Soap Making (Saponification) Reaction",
    chapter: "Chapter 4: Carbon and its Compounds",
    difficulty: "Medium",
    points: 100,
    scenario:
      "Convert a sweet-smelling ester into a sodium salt of a fatty/carboxylic acid (soap) by hydrolyzing it under alkaline conditions.",
    objective:
      "Combine Ethyl Ethanoate ester with caustic alkali and apply gentle heat.",
    allowedSubstanceIds: ["ester", "naoh", "koh", "ch3cooh", "c2h5oh"],
    targetReactionEquation: "CH₃COOC₂H₅(l) + NaOH(aq) → CH₃COONa(aq) + C₂H₅OH(l)",
    validationCheck: (ids) => {
      const hasEster = ids.includes("ester");
      const hasAlkali = ids.includes("naoh") || ids.includes("koh");

      if (hasEster && hasAlkali) {
        return {
          solved: true,
          feedback:
            "Saponification Successful! Alkaline hydrolysis of the ester produces sodium ethanoate and regenerates ethanol. This forms the foundation of commercial soap making.",
          observation:
            "The ester dissolves; liquid becomes thick, soapy, and slippery with ethanol formation."
        };
      }
      return {
        solved: false,
        feedback: "Select Ethyl Ethanoate (Ester) and Sodium Hydroxide (NaOH).",
        observation: "Missing ester or alkaline reagent."
      };
    },
    hints: [
      "Hint 1: Saponification literally means 'soap making'.",
      "Hint 2: Ester + Base → Soap + Alcohol.",
      "Hint 3: Select Ethyl Ethanoate (Ester) and Sodium Hydroxide (NaOH)."
    ],
    boardFact:
      "NCERT Section 4.4.2: Saponification is used in the preparation of soap. Soaps are sodium or potassium salts of long-chain carboxylic acids."
  }
];
