/**
 * AI Chemistry Tutor with strict CBSE Class 10 NCERT Guardrails.
 * Adheres strictly to NCERT syllabus guidelines, marks scheme,
 * laboratory safety protocols, and pedagogical keyword highlighting.
 */

import { Reaction } from "../types";
import { getReactionById, REACTIONS } from "../data/reactions";
import { splitEquation, parseEquationSide, checkEquationBalance } from "../utils/atomBalanceEngine";

export type ExplanationLevel = "simple" | "board_exam" | "deep_dive";

export interface TutorExplanation {
  reactionId: string;
  level: ExplanationLevel;
  title: string;
  badge: string;
  explanation: string;
  ncertKeywords: string[];
  balancedEquation: string;
  boardMarksTip: string;
  safetyWarning?: string;
  energyProfile: string;
}

export interface HindiExplanation {
  reactionId: string;
  titleHindi: string;
  conceptHindi: string;
  observationHindi: string;
  safetyHindi: string;
  balancedEquation: string;
  keyWordsHindi: string[];
}

export interface TutorQuizQuestion {
  reactionId: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  conceptTag: string;
}

export interface MistakeDiagnosis {
  isCorrect: boolean;
  leftDiscrepancies: { element: string; expected: number; actual: number }[];
  rightDiscrepancies: { element: string; expected: number; actual: number }[];
  feedback: string;
  remedialStep: string;
}

// NCERT Class 10 Keywords targeted for board examinations
export const NCERT_KEYWORDS = [
  "precipitate",
  "exothermic",
  "endothermic",
  "redox",
  "oxidation",
  "reduction",
  "rancidity",
  "corrosion",
  "displacement",
  "double displacement",
  "saponification",
  "esterification",
  "thermal decomposition",
  "electrolytic decomposition",
  "neutralisation",
  "effervescence",
  "slaked lime",
  "quicklime",
  "bleaching powder",
  "plaster of paris",
  "baking soda",
  "washing soda"
];

// Safety Guardrail Checker: Never provide hazardous synthesis instructions
export function checkSafetyGuardrail(query: string): { isHazardous: boolean; safetyNotice: string } {
  const q = query.toLowerCase();
  const hazardousTriggers = [
    "bomb", "explosive", "gunpowder", "poison", "weapon", "cyanide",
    "make chlorine gas at home", "concentrated acid on skin", "bleach and ammonia",
    "mustard gas", "firecracker", "hazardous mix", "toxic fumes at home"
  ];

  for (const trigger of hazardousTriggers) {
    if (q.includes(trigger)) {
      return {
        isHazardous: true,
        safetyNotice: "⚠️ Safety Directive: Chemical reactions involving concentrated acids, toxic chlorine vapours, or volatile reactive substances must NEVER be conducted unsupervised or at home. CBSE Class 10 laboratory protocols mandate strict teacher supervision with laboratory fume extraction hoods and personal protective equipment (PPE)."
      };
    }
  }

  return { isHazardous: false, safetyNotice: "" };
}

/**
 * Explains a chemical reaction according to CBSE Class 10 level
 */
export async function explainReaction(
  reactionId: string,
  level: ExplanationLevel = "board_exam"
): Promise<TutorExplanation> {
  const rx = getReactionById(reactionId);
  if (!rx) {
    throw new Error(`Reaction with ID "${reactionId}" not found in NCERT database.`);
  }

  // Artificial processing tick
  await new Promise(resolve => setTimeout(resolve, 200));

  // Determine present NCERT keywords
  const fullText = `${rx.title} ${rx.explanation} ${rx.ncertConcept} ${rx.observations.join(" ")} ${rx.reactionType.join(" ")}`.toLowerCase();
  const matchedKeywords = NCERT_KEYWORDS.filter(kw => fullText.includes(kw.toLowerCase()));

  // Determine safety alerts
  let safetyWarning: string | undefined;
  if (rx.experimentMode === "simulation-only" || rx.experimentMode === "teacher-demo") {
    safetyWarning = `⚠️ Laboratory Safety Alert: This experiment is designated as [${rx.experimentMode.toUpperCase()}]. ${rx.safetyNotes.join(" ")}`;
  }

  if (level === "simple") {
    return {
      reactionId: rx.id,
      level: "simple",
      title: `${rx.title} — Intuitive Beginner Explanation`,
      badge: "Beginner Friendly",
      explanation: `Think of this reaction like building blocks! When ${rx.reactants.join(" and ")} come into contact, their existing atomic partnerships break and rearrange. What you actually see happening in front of your eyes: ${rx.observations[0] || "a distinct chemical transformation"}. The new chemical substance created is ${rx.products.join(" and ")}.`,
      ncertKeywords: matchedKeywords,
      balancedEquation: rx.balancedEquation,
      boardMarksTip: "Focus on the visual observation: examiners award 1 full mark specifically for mentioning the color change or state change.",
      safetyWarning,
      energyProfile: rx.energyChange || "Neutral"
    };
  }

  if (level === "deep_dive") {
    return {
      reactionId: rx.id,
      level: "deep_dive",
      title: `${rx.title} — Molecular & Mechanistic Deep Dive`,
      badge: "In-Depth Molecular Mechanics",
      explanation: `${rx.molecularExplanation || rx.explanation}\n\nThermodynamics & Mechanism: The reactant bonds undergo vibrational excitation upon collision. Under conditions of ${rx.conditions?.join(", ") || "room temperature and standard pressure"}, the free energy barrier is crossed. ${rx.ncertConcept}. Key physical state observations: ${rx.observations.join(" | ")}.`,
      ncertKeywords: matchedKeywords,
      balancedEquation: rx.balancedEquation,
      boardMarksTip: "For 5-mark conceptual questions: write the balanced equation with physical state symbols (s, l, g, aq) and draw a neat labeled diagram of the apparatus.",
      safetyWarning,
      energyProfile: rx.energyChange ? `${rx.energyChange} enthalpy change` : "Stoichiometric energetic reorganization"
    };
  }

  // Default: board_exam
  return {
    reactionId: rx.id,
    level: "board_exam",
    title: `${rx.title} — CBSE Class 10 Board Exam Standard`,
    badge: "Board Exam Focused (CBSE NCERT)",
    explanation: `${rx.explanation}\n\nNCERT Syllabus Relevance: ${rx.ncertConcept}\n\nKey Observable Evidences (Marks Scoring):\n• ${rx.observations.join("\n• ")}`,
    ncertKeywords: matchedKeywords,
    balancedEquation: rx.balancedEquation,
    boardMarksTip: rx.commonBoardQuestion
      ? `CBSE Previous Years Question (PYQ): "${rx.commonBoardQuestion}". Always mention the chemical formula of substance 'X' and state whether heat is absorbed or evolved!`
      : "Write the balanced chemical equation with correct coefficients to earn the full 2 marks for the equation step.",
    safetyWarning,
    energyProfile: rx.energyChange || "Standard reaction"
  };
}

export const explainReactionTutor = explainReaction;

/**
 * Hindi Medium CBSE NCERT explanation
 */
export async function explainInHindi(reactionId: string): Promise<HindiExplanation> {
  const rx = getReactionById(reactionId);
  if (!rx) {
    throw new Error(`Reaction with ID "${reactionId}" not found in NCERT database.`);
  }

  await new Promise(resolve => setTimeout(resolve, 200));

  // Determine chapter title in Hindi
  let chHindi = "रासायनिक अभिक्रियाएं एवं समीकरण";
  if (rx.chapterNumber === 2) chHindi = "अम्ल, क्षारक एवं लवण";
  if (rx.chapterNumber === 3) chHindi = "धातु एवं अधातु";
  if (rx.chapterNumber === 4) chHindi = "कार्बन एवं उसके यौगिक";

  const conceptHindi = `यह अभिक्रिया NCERT विज्ञान अध्याय ${rx.chapterNumber} (${chHindi}) के अंतर्गत आती है। जब ${rx.reactants.join(" तथा ")} परस्पर क्रिया करते हैं, तो रासायनिक बंध टूटकर नए उत्पाद ${rx.products.join(" और ")} बनते हैं। इसे '${rx.reactionType[0]}' अभिक्रिया के रूप में वर्गीकृत किया जाता है।`;

  const observationHindi = `प्रयोगशाला में मुख्य प्रेक्षण: ${rx.observations.join("; ")}। रासायनिक ऊर्जा में यह अभिक्रिया ${rx.energyChange === "Exothermic" ? "ऊष्माक्षेपी (ऊष्मा मुक्त होती है)" : rx.energyChange === "Endothermic" ? "ऊष्माशोषी (ऊष्मा अवशोषित होती है)" : "संतुलित"} है।`;

  const safetyHindi = rx.experimentMode === "safe"
    ? "यह प्रयोग विद्यालय की प्रयोगशाला में सुरक्षित रूप से किया जा सकता है।"
    : "सावधानी: यह अभिक्रिया केवल शिक्षक के मार्गदर्शन में प्रयोगशाला चश्मे और परखनली चिमटी के साथ की जानी चाहिए।";

  const keyWordsHindi = [
    "अभिकारक (Reactants)",
    "उत्पाद (Products)",
    "संतुलित समीकरण (Balanced Equation)",
    rx.energyChange === "Exothermic" ? "ऊष्माक्षेपी अभिक्रिया (Exothermic)" : "ऊष्माशोषी अभिक्रिया (Endothermic)",
    "अवक्षेप (Precipitate)"
  ];

  return {
    reactionId: rx.id,
    titleHindi: `${rx.title} (कक्षा 10 NCERT विज्ञान)`,
    conceptHindi,
    observationHindi,
    safetyHindi,
    balancedEquation: rx.balancedEquation,
    keyWordsHindi
  };
}

export const getHindiExplanation = explainInHindi;

/**
 * Generates an NCERT aligned quiz question
 */
export async function generateQuizQuestion(reactionId: string): Promise<TutorQuizQuestion> {
  const rx = getReactionById(reactionId);
  if (!rx) {
    throw new Error(`Reaction with ID "${reactionId}" not found.`);
  }

  // If reaction has pre-crafted quiz, use one
  if (rx.quiz && rx.quiz.length > 0) {
    const q = rx.quiz[0];
    return {
      reactionId: rx.id,
      question: q.question,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation,
      conceptTag: rx.topic
    };
  }

  // Generate dynamic Class 10 question
  return {
    reactionId: rx.id,
    question: `Identify the classification of the following chemical reaction: ${rx.equation}`,
    options: [rx.reactionType[0], "Double Decomposition", "Oxidation Only", "Electrolysis"],
    answer: rx.reactionType[0],
    explanation: `According to NCERT Chapter ${rx.chapterNumber}, this reaction is classified as ${rx.reactionType.join(", ")}.`,
    conceptTag: rx.topic
  };
}

/**
 * Diagnoses a student's balancing mistake step-by-step
 */
export function diagnoseStudentMistake(
  targetBalancedEquation: string,
  studentAnswerEquation: string
): MistakeDiagnosis {
  const splitTarget = splitEquation(targetBalancedEquation);
  const splitStudent = splitEquation(studentAnswerEquation);

  if (!splitTarget || !splitStudent) {
    return {
      isCorrect: false,
      leftDiscrepancies: [],
      rightDiscrepancies: [],
      feedback: "Invalid equation format. Ensure equation contains reactants separated by '+' and an arrow '→' pointing to products.",
      remedialStep: "Write the equation in standard form: Reactants → Products"
    };
  }

  const targetLeft = parseEquationSide(splitTarget.leftSide);
  const targetRight = parseEquationSide(splitTarget.rightSide);
  const studentLeft = parseEquationSide(splitStudent.leftSide);
  const studentRight = parseEquationSide(splitStudent.rightSide);

  const targetCheck = checkEquationBalance(
    targetLeft,
    targetRight,
    targetLeft.map(t => t.defaultCoeff),
    targetRight.map(t => t.defaultCoeff)
  );

  const studentCheck = checkEquationBalance(
    studentLeft,
    studentRight,
    studentLeft.map(t => t.defaultCoeff),
    studentRight.map(t => t.defaultCoeff)
  );

  if (studentCheck.isFullyBalanced) {
    // Check lowest integer
    const targetLeftCoeffs = targetLeft.map(t => t.defaultCoeff);
    const studentLeftCoeffs = studentLeft.map(t => t.defaultCoeff);
    const isLowest = targetLeftCoeffs.every((c, idx) => c === studentLeftCoeffs[idx]);

    if (isLowest) {
      return {
        isCorrect: true,
        leftDiscrepancies: [],
        rightDiscrepancies: [],
        feedback: "Excellent! Your equation is stoichiometric and written with the minimum whole number coefficients.",
        remedialStep: "Proceed to next board question."
      };
    } else {
      return {
        isCorrect: false,
        leftDiscrepancies: [],
        rightDiscrepancies: [],
        feedback: "Atoms balance on both sides, but coefficients are multiples of the lowest integers.",
        remedialStep: "Divide all coefficients by their greatest common divisor (GCD)."
      };
    }
  }

  // Find mismatched elements
  const leftDiscrepancies: { element: string; expected: number; actual: number }[] = [];
  const rightDiscrepancies: { element: string; expected: number; actual: number }[] = [];

  for (const status of studentCheck.elementStatuses) {
    if (!status.isBalanced) {
      const exp = targetCheck.leftTotals[status.element] || 0;
      leftDiscrepancies.push({
        element: status.element,
        expected: exp,
        actual: status.leftCount
      });
      rightDiscrepancies.push({
        element: status.element,
        expected: exp,
        actual: status.rightCount
      });
    }
  }

  const elementsWithIssues = leftDiscrepancies.map(d => d.element).join(", ");

  return {
    isCorrect: false,
    leftDiscrepancies,
    rightDiscrepancies,
    feedback: `The number of ${elementsWithIssues} atoms on the reactant side does not equal the number of ${elementsWithIssues} atoms on the product side.`,
    remedialStep: `Adjust the coefficient of the compound containing ${elementsWithIssues}. Remember: change only leading coefficients, never chemical subscripts!`
  };
}
