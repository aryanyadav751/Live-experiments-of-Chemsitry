/**
 * Atom Balance Engine for Class 10 Chemistry
 * Parses chemical formulas and equations, counts elements on LHS & RHS,
 * and verifies stoichiometry with element-by-element status.
 */

export interface ElementCount {
  [element: string]: number;
}

export interface FormulaTerm {
  raw: string;
  cleanedFormula: string;
  defaultCoeff: number;
  elements: ElementCount;
}

export interface ParsedEquationSide {
  terms: FormulaTerm[];
}

export interface ElementBalanceStatus {
  element: string;
  elementName: string;
  leftCount: number;
  rightCount: number;
  isBalanced: boolean;
}

export interface BalanceCheckResult {
  isFullyBalanced: boolean;
  elementStatuses: ElementBalanceStatus[];
  leftTotals: ElementCount;
  rightTotals: ElementCount;
}

const ELEMENT_NAMES: Record<string, string> = {
  H: "Hydrogen",
  He: "Helium",
  Li: "Lithium",
  Be: "Beryllium",
  B: "Boron",
  C: "Carbon",
  N: "Nitrogen",
  O: "Oxygen",
  F: "Fluorine",
  Ne: "Neon",
  Na: "Sodium",
  Mg: "Magnesium",
  Al: "Aluminium",
  Si: "Silicon",
  P: "Phosphorus",
  S: "Sulphur",
  Cl: "Chlorine",
  K: "Potassium",
  Ca: "Calcium",
  Cr: "Chromium",
  Mn: "Manganese",
  Fe: "Iron",
  Co: "Cobalt",
  Ni: "Nickel",
  Cu: "Copper",
  Zn: "Zinc",
  Ag: "Silver",
  Ba: "Barium",
  Pb: "Lead",
  Sn: "Tin",
  I: "Iodine",
  Br: "Bromine",
  Au: "Gold",
  Pt: "Platinum"
};

/**
 * Strips state symbols e.g. (s), (l), (g), (aq), bonds like =, -, and energy terms like + Heat
 * Does NOT strip chemical formula groups like (OH)2 or (NO3)2
 */
export function cleanFormulaString(raw: string): string {
  return raw
    .replace(/\s*\((s|l|g|aq)\)/gi, "") // ONLY remove physical state symbols
    .replace(/\+?\s*(\d*\s*)?(Tremendous\s+)?(Heat|Light|Energy|electricity|Δ)/gi, "")
    .replace(/[↑↓]/g, "")
    .replace(/[=\-–—](?=[A-Za-z0-9])/g, "") // remove structural single/double bond dashes
    .replace(/₂/g, "2")
    .replace(/₃/g, "3")
    .replace(/₄/g, "4")
    .replace(/₅/g, "5")
    .replace(/₆/g, "6")
    .replace(/₇/g, "7")
    .replace(/₈/g, "8")
    .replace(/₉/g, "9")
    .replace(/₀/g, "0")
    .trim();
}

/**
 * Extracts leading integer or fractional coefficient if present
 */
export function extractLeadingCoefficient(term: string): [number, string] {
  const cleaned = cleanFormulaString(term);
  if (cleaned.startsWith("1½") || cleaned.startsWith("1.5")) {
    return [1.5, cleaned.replace(/^(1½|1\.5)/, "").trim()];
  }
  if (cleaned.startsWith("½") || cleaned.startsWith("0.5") || cleaned.startsWith("1/2")) {
    return [0.5, cleaned.replace(/^(½|0\.5|1\/2)/, "").trim()];
  }
  const match = cleaned.match(/^(\d+)(.*)$/);
  if (match && match[2] && match[2].trim().length > 0) {
    const coeff = parseInt(match[1], 10);
    return [coeff, match[2].trim()];
  }
  return [1, cleaned];
}

/**
 * Helper to parse a single element group without dots
 */
function parseSimpleFormulaGroup(cleaned: string): ElementCount {
  const counts: ElementCount = {};
  const stack: ElementCount[] = [{}];

  let i = 0;
  while (i < cleaned.length) {
    const char = cleaned[i];

    if (char === "(" || char === "[") {
      stack.push({});
      i++;
    } else if (char === ")" || char === "]") {
      i++;
      // Parse multiplier following closing bracket
      let numStr = "";
      while (i < cleaned.length && /\d/.test(cleaned[i])) {
        numStr += cleaned[i];
        i++;
      }
      const multiplier = numStr ? parseInt(numStr, 10) : 1;
      const top = stack.pop() || {};
      const current = stack[stack.length - 1];

      for (const [elem, count] of Object.entries(top)) {
        current[elem] = (current[elem] || 0) + count * multiplier;
      }
    } else if (/[A-Z]/.test(char)) {
      // Element symbol starts with uppercase letter
      let elem = char;
      i++;
      if (i < cleaned.length && /[a-z]/.test(cleaned[i])) {
        elem += cleaned[i];
        i++;
      }
      // Read subscript number
      let numStr = "";
      while (i < cleaned.length && /\d/.test(cleaned[i])) {
        numStr += cleaned[i];
        i++;
      }
      const count = numStr ? parseInt(numStr, 10) : 1;
      const current = stack[stack.length - 1];
      current[elem] = (current[elem] || 0) + count;
    } else {
      // Skip bond symbols, charges, whitespace
      i++;
    }
  }

  const root = stack[0] || {};
  for (const [elem, count] of Object.entries(root)) {
    counts[elem] = (counts[elem] || 0) + count;
  }
  return counts;
}

/**
 * Parses a chemical formula string (e.g. "Ca(OH)2", "CuSO4·5H2O", "CH3COOH") into element counts.
 */
export function parseChemicalFormula(formula: string): ElementCount {
  let cleaned = cleanFormulaString(formula).replace(/^(\d+)/, "").trim();

  // Handle nascent oxygen "[O]" or "O"
  if (cleaned === "[O]" || cleaned === "O") {
    return { O: 1 };
  }

  // Handle water of crystallisation e.g. CuSO4·5H2O, CaSO4·2H2O, CaSO4·½H2O
  if (cleaned.includes("·") || cleaned.includes(".")) {
    const parts = cleaned.split(/[·\.]/);
    const mainCounts = parseSimpleFormulaGroup(parts[0]);

    if (parts.length > 1) {
      const hydratePart = parts[1].trim();
      let multiplier = 1;
      let hydrateFormula = hydratePart;

      if (/^(\d+)/.test(hydratePart)) {
        const m = hydratePart.match(/^(\d+)(.*)$/);
        if (m) {
          multiplier = parseInt(m[1], 10);
          hydrateFormula = m[2];
        }
      } else if (hydratePart.startsWith("½") || hydratePart.startsWith("1/2") || hydratePart.startsWith("0.5")) {
        multiplier = 0.5;
        hydrateFormula = hydratePart.replace(/^(½|1\/2|0\.5)/, "");
      } else if (hydratePart.startsWith("1½") || hydratePart.startsWith("1.5")) {
        multiplier = 1.5;
        hydrateFormula = hydratePart.replace(/^(1½|1\.5)/, "");
      }

      const waterCounts = parseSimpleFormulaGroup(hydrateFormula || "H2O");
      for (const [elem, count] of Object.entries(waterCounts)) {
        mainCounts[elem] = (mainCounts[elem] || 0) + count * multiplier;
      }
    }

    return mainCounts;
  }

  return parseSimpleFormulaGroup(cleaned);
}

/**
 * Parses one side of a chemical equation (e.g. "2Mg + O₂" or "Fe₂O₃ + 2Al") into individual FormulaTerms.
 */
export function parseEquationSide(sideString: string): FormulaTerm[] {
  // Split on '+' but be careful not to split inside parentheses
  const rawTerms = sideString
    .split(/\+(?![^()]*\))/)
    .map(t => t.trim())
    .filter(t => t.length > 0);

  const terms: FormulaTerm[] = [];

  for (const raw of rawTerms) {
    const cleaned = cleanFormulaString(raw);
    if (!cleaned || cleaned.toLowerCase() === "heat" || cleaned.toLowerCase() === "energy") {
      continue;
    }

    const [defaultCoeff, formulaWithoutCoeff] = extractLeadingCoefficient(raw);
    const elements = parseChemicalFormula(formulaWithoutCoeff);

    if (Object.keys(elements).length > 0) {
      terms.push({
        raw,
        cleanedFormula: formulaWithoutCoeff,
        defaultCoeff,
        elements
      });
    }
  }

  return terms;
}

/**
 * Checks whether atom counts on the LHS equal atom counts on the RHS given current coefficients.
 */
export function checkEquationBalance(
  leftTerms: FormulaTerm[],
  rightTerms: FormulaTerm[],
  leftCoeffs: number[],
  rightCoeffs: number[]
): BalanceCheckResult {
  const leftTotals: ElementCount = {};
  const rightTotals: ElementCount = {};

  // Calculate LHS
  leftTerms.forEach((term, idx) => {
    const coeff = leftCoeffs[idx] !== undefined ? leftCoeffs[idx] : term.defaultCoeff;
    for (const [elem, count] of Object.entries(term.elements)) {
      leftTotals[elem] = (leftTotals[elem] || 0) + count * coeff;
    }
  });

  // Calculate RHS
  rightTerms.forEach((term, idx) => {
    const coeff = rightCoeffs[idx] !== undefined ? rightCoeffs[idx] : term.defaultCoeff;
    for (const [elem, count] of Object.entries(term.elements)) {
      rightTotals[elem] = (rightTotals[elem] || 0) + count * coeff;
    }
  });

  // Gather unique elements across both sides
  const allElements = Array.from(
    new Set([...Object.keys(leftTotals), ...Object.keys(rightTotals)])
  ).sort();

  let isFullyBalanced = true;

  const elementStatuses: ElementBalanceStatus[] = allElements.map(elem => {
    const l = leftTotals[elem] || 0;
    const r = rightTotals[elem] || 0;
    const isBalanced = l > 0 && Math.abs(l - r) < 0.05;
    if (!isBalanced) {
      isFullyBalanced = false;
    }
    return {
      element: elem,
      elementName: ELEMENT_NAMES[elem] || elem,
      leftCount: Math.round(l * 10) / 10,
      rightCount: Math.round(r * 10) / 10,
      isBalanced
    };
  });

  return {
    isFullyBalanced,
    elementStatuses,
    leftTotals,
    rightTotals
  };
}

/**
 * Splits an equation string by arrow into left and right sides.
 * Safely handles condition annotations on arrows, e.g. "—(Ignition)→", "—(Ni Catalyst)→", "—(Sunlight)→".
 */
export function splitEquation(equationStr: string): { leftSide: string; rightSide: string } | null {
  const arrowRegex = /[—\-\s]*\([^)]*\)[—\-\s]*[→>]|[—\-]+[→>]|→|->|⇌|\s+=\s+|=>/;
  const match = equationStr.match(arrowRegex);

  if (match && match.index !== undefined) {
    const leftSide = equationStr.substring(0, match.index).trim();
    const rightSide = equationStr.substring(match.index + match[0].length).trim();
    return { leftSide, rightSide };
  }

  const simpleParts = equationStr.split(/→|->|⇌/);
  if (simpleParts.length === 2) {
    return {
      leftSide: simpleParts[0].trim(),
      rightSide: simpleParts[1].trim()
    };
  }

  return null;
}
