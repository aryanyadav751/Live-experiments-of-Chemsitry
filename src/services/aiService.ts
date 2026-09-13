import { Reaction } from "../types";
import { getReactionById, REACTIONS } from "../data/reactions";

export interface AIExplanationResult {
  title: string;
  badge: string;
  explanation: string;
  keyTakeaway: string;
  boardTip?: string;
  hindiTranslation?: string;
}

export interface ReactionComparisonResult {
  reaction1: Reaction;
  reaction2: Reaction;
  similarities: string[];
  differences: string[];
  energyComparison: string;
  examTakeaway: string;
}

// Built-in intelligent offline repository curated strictly for CBSE Class 10 NCERT
export const aiService = {
  /**
   * Explains reaction with custom tailored tone
   */
  async explainReaction(
    reactionId: string,
    mode: "class10" | "simple" | "scientific" | "hindi"
  ): Promise<AIExplanationResult> {
    const rx = getReactionById(reactionId);
    if (!rx) {
      throw new Error("Reaction not found");
    }

    // Small realistic simulation delay for AI feel
    await new Promise((resolve) => setTimeout(resolve, 350));

    if (mode === "hindi") {
      return {
        title: `${rx.title} — हिंदी में व्याख्या`,
        badge: "CBSE Class 10 Hindi Medium",
        explanation: generateHindiExplanation(rx),
        keyTakeaway: `मुख्य निष्कर्ष: ${rx.ncertConcept}`,
        boardTip: "बोर्ड परीक्षा टिप: रासायनिक सूत्र और समीकरण हमेशा संतुलित अवस्था में अंग्रेजी में ही लिखें।"
      };
    }

    if (mode === "simple") {
      return {
        title: `Simple Everyday Analogy: ${rx.title}`,
        badge: "Explain Simply (Intuitive Analogy)",
        explanation: generateSimpleExplanation(rx),
        keyTakeaway: `Bottom Line: ${rx.explanation}`,
        boardTip: "Remember this picture in your mind to never forget the observation in your exams!"
      };
    }

    if (mode === "scientific") {
      return {
        title: `Deep Molecular & Thermodynamic Breakdown: ${rx.title}`,
        badge: "Advanced Scientific Analysis",
        explanation: `${rx.molecularExplanation} Structurally, the electronic valence transitions dictate the driving force: the chemical potential of the products is markedly lower than that of the reactants. Under the specified reaction conditions (${rx.conditions?.join(", ") || "standard STP"}), the activation barrier is overcome, stabilizing the final atomic configuration.`,
        keyTakeaway: `Thermodynamics: Reaction enthalpy is ${rx.energyChange || "energetically favored"}, driven by ion exchange / oxidation potential.`,
        boardTip: "Include state symbols (s, l, g, aq) and catalyst/temperature annotations on the arrow for full marks in 3-mark & 5-mark questions."
      };
    }

    // Default: Explain Like I'm in Class 10
    return {
      title: `Class 10 CBSE Explanation: ${rx.title}`,
      badge: "CBSE Class 10 Standard",
      explanation: `${rx.explanation} \n\nFrom the NCERT textbook perspective: ${rx.ncertConcept} When this reaction takes place in your school laboratory, the most distinctive clues to identify it are: ${rx.observations.join(" ")}`,
      keyTakeaway: `Key Concept: Classified under ${rx.reactionType.join(", ")}.`,
      boardTip: rx.commonBoardQuestion ? `Frequently Asked in Board Exam: ${rx.commonBoardQuestion}` : "Always balance atom counts before writing your final answer in the theory paper."
    };
  },

  /**
   * Generates or retrieves CBSE-level quiz questions for a reaction
   */
  async generateQuiz(reactionId: string) {
    const rx = getReactionById(reactionId);
    if (!rx || !rx.quiz || rx.quiz.length === 0) {
      return [
        {
          question: `What type of reaction is: ${rx?.balancedEquation || "the given equation"}?`,
          options: ["Combination", "Displacement", "Decomposition", "Neutralisation"],
          answer: rx?.reactionType[0] || "Combination",
          explanation: `This reaction is classified as ${rx?.reactionType.join(", ")} according to NCERT Chapter ${rx?.chapterNumber}.`
        }
      ];
    }
    return rx.quiz;
  },

  /**
   * Compare two NCERT reactions side-by-side
   */
  async compareReactions(id1: string, id2: string): Promise<ReactionComparisonResult> {
    const r1 = getReactionById(id1) || REACTIONS[0];
    const r2 = getReactionById(id2) || REACTIONS[1];

    await new Promise((resolve) => setTimeout(resolve, 250));

    const commonTypes = r1.reactionType.filter((t) => r2.reactionType.includes(t));
    const similarities = [
      `Both are vital NCERT Class 10 syllabus reactions.`,
      commonTypes.length > 0
        ? `Both exhibit ${commonTypes.join(", ")} reaction characteristics.`
        : `Both involve definitive chemical bond transformations between reactants.`,
      `Both require explicit conservation of mass and atom balancing for board exams.`
    ];

    const differences = [
      `Classification: [${r1.title}] is primarily ${r1.reactionType.join("/")}, whereas [${r2.title}] is ${r2.reactionType.join("/")}.`,
      `Observational cue: ${r1.title} displays "${r1.observations[0]}", while ${r2.title} displays "${r2.observations[0]}".`,
      `Experiment Safety: ${r1.title} is classified as "${r1.experimentMode.toUpperCase()}", whereas ${r2.title} is "${r2.experimentMode.toUpperCase()}".`
    ];

    const energyComparison = `Reaction 1 (${r1.title}) is ${r1.energyChange || "Neutral"}, whereas Reaction 2 (${r2.title}) is ${r2.energyChange || "Neutral"}.`;
    const examTakeaway = `In CBSE board questions, Examiners frequently compare these to test whether students can distinguish between ${r1.reactionType[0]} and ${r2.reactionType[0]}.`;

    return {
      reaction1: r1,
      reaction2: r2,
      similarities,
      differences,
      energyComparison,
      examTakeaway
    };
  },

  /**
   * Question answering for CBSE Class 10 Chemistry doubts
   */
  async answerChemistryQuestion(question: string, contextReactionId?: string): Promise<string> {
    const q = question.toLowerCase();
    const rx = contextReactionId ? getReactionById(contextReactionId) : null;

    await new Promise((resolve) => setTimeout(resolve, 400));

    if (q.includes("balance") || q.includes("balancing")) {
      return `To balance any Class 10 NCERT equation, follow the Hit-and-Trial method:
1. Draw boxes around all chemical formulas; never change subscripts inside formulas.
2. Count the atoms of each element on LHS (reactants) and RHS (products).
3. Start balancing with the compound containing the maximum number of atoms (often oxygen or metals).
4. Equalise atoms by placing whole number coefficients in front of formulas.
5. Finish by writing physical states: (s) solid, (l) liquid, (g) gas, and (aq) aqueous solution!`;
    }

    if (q.includes("pop") || q.includes("hydrogen")) {
      return `Hydrogen gas (H₂) is tested by bringing a burning candle or wooden splint near the mouth of the test tube. The gas bursts with a characteristic sharp 'POP' sound because hydrogen forms an explosive mixture with atmospheric oxygen that detonates mildly in small quantities!`;
    }

    if (q.includes("lime water") || q.includes("milky") || q.includes("co2")) {
      return `When carbon dioxide (CO₂) is passed through freshly prepared lime water [Ca(OH)₂], it turns milky white due to the formation of an insoluble white precipitate of calcium carbonate:
Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s)↓ + H₂O(l).
If you pass EXCESS CO₂, the milkiness disappears because insoluble CaCO₃ turns into water-soluble calcium hydrogencarbonate:
CaCO₃(s) + H₂O(l) + CO₂(g) → Ca(HCO₃)₂(aq)!`;
    }

    if (rx) {
      return `Regarding "${rx.title}":
Balanced Equation: ${rx.balancedEquation}
Primary Observation: ${rx.observations[0]}
NCERT Core Concept: ${rx.ncertConcept}
Board Tip: ${rx.commonBoardQuestion || "Make sure to write state symbols (s, l, g, aq) when writing this in your CBSE answer sheet."}`;
    }

    return `This is a fundamental CBSE Class 10 Science question. In NCERT Chemistry, remember that every chemical reaction obeys the Law of Conservation of Mass. Make sure to identify: (1) Reactants & Products, (2) Reaction Type (Combination, Decomposition, Displacement, Double Displacement, or Redox), and (3) Sensory Observations such as colour change, gas evolution, or precipitate formation!`;
  }
};

function generateHindiExplanation(rx: Reaction): string {
  if (rx.id.includes("magnesium")) {
    return `जब मैग्नीशियम रिबन को हवा (ऑक्सीजन) में जलाया जाता है, तो यह चमकदार सफेद लौ (dazzling white flame) के साथ जलता है और मैग्नीशियम ऑक्साइड (MgO) का सफेद पाउडर बनाता है।
समीकरण: 2Mg(s) + O₂(g) → 2MgO(s) + ऊष्मा + प्रकाश।
यह एक 'संयोजन अभिक्रिया' (Combination reaction) और 'ऑक्सीकरण अभिक्रिया' (Oxidation reaction) का उदाहरण है।`;
  }
  if (rx.id.includes("slaked-lime")) {
    return `कैल्शियम ऑक्साइड (बिना बुझा चूना या Quicklime) जल के साथ तीव्रता से अभिक्रिया करके बुझा हुआ चूना (Slaked lime, Ca(OH)₂) बनाता है और अत्यधिक मात्रा में ऊष्मा (Heat) उत्पन्न करता है।
समीकरण: CaO(s) + H₂O(l) → Ca(OH)₂(aq) + ऊष्मा।
क्योंकि इसमें बहुत अधिक ऊष्मा निकलती है, इसलिए यह एक 'ऊष्माक्षेपी अभिक्रिया' (Exothermic reaction) है।`;
  }
  if (rx.id.includes("ferrous-sulphate")) {
    return `हरे रंग के फेरस सल्फेट क्रिस्टल (FeSO₄·7H₂O) को गर्म करने पर पहले वे पानी खोकर सफेद हो जाते हैं। अधिक गर्म करने पर यह फेरिक ऑक्साइड (Fe₂O₃ - भूरा रंग), सल्फर डाइऑक्साइड (SO₂) और सल्फर ट्राइऑक्साइड (SO₃) में टूट जाता है।
समीकरण: 2FeSO₄(s) —(ऊष्मा)→ Fe₂O₃(s) + SO₂(g) + SO₃(g)।
जलती हुई गंधक (सल्फर) की तीखी गंध गैसों की पहचान कराती है। यह एक 'ऊष्मीय वियोजन' (Thermal Decomposition) अभिक्रिया है।`;
  }
  if (rx.id.includes("copper-sulphate") || rx.id.includes("iron")) {
    return `जब लोहे की कील (Fe) को कॉपर सल्फेट (CuSO₄) के नीले घोल में डुबोया जाता है, तो लोहा कॉपर को विस्थापित कर देता है।
घोल का रंग नीले से हल्का हरा (FeSO₄) हो जाता है और कील पर लाल-भूरे रंग की तांबे (Cu) की परत जम जाती है।
समीकरण: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)।
लोहा कॉपर से अधिक अभिक्रियाशील है, इसलिए इसे 'विस्थापन अभिक्रिया' (Displacement Reaction) कहते हैं।`;
  }
  if (rx.id.includes("esterification")) {
    return `जब एथेनॉइक अम्ल (Ethanoic acid) सांद्र सल्फ्यूरिक अम्ल की उपस्थिति में एथेनॉल (Ethanol) के साथ अभिक्रिया करता है, तो एक मीठी फलों जैसी सुगंध वाला यौगिक एस्टर (Ethyl ethanoate) बनता है।
समीकरण: CH₃COOH + C₂H₅OH —(अम्ल)→ CH₃COOC₂H₅ + H₂O।
इस अभिक्रिया को 'एस्टरीकरण' (Esterification) कहा जाता है। इसका उपयोग इत्र (Perfume) और स्वाद बढ़ाने वाले एजेंटों में होता है।`;
  }
  return `NCERT कक्षा 10 विज्ञान के अनुसार: ${rx.title} एक महत्वपूर्ण रासायनिक प्रक्रिया है। 
संतुलित रासायनिक समीकरण: ${rx.balancedEquation}
मुख्य प्रेक्षण: ${rx.observations[0]}
यह अभिक्रिया ${rx.reactionType.join(", ")} की श्रेणी में आती है।`;
}

function generateSimpleExplanation(rx: Reaction): string {
  if (rx.id.includes("displacement")) {
    return `Think of a musical chairs game or a stronger friend taking the front seat: a more reactive (energetic) metal comes in and pushes out the weaker metal from its place, claiming its partner! That is why iron easily kicks out copper from copper sulphate.`;
  }
  if (rx.id.includes("decomposition")) {
    return `Imagine building a LEGO tower and then dropping it so it breaks apart into smaller individual blocks. Heat or electricity provides the energy that snaps the big molecule into simpler pieces!`;
  }
  if (rx.id.includes("combination")) {
    return `Two separate ingredients—like flour and water—mixing together to form one unified dough! Two or more starting chemicals join hands to build a single brand-new compound.`;
  }
  if (rx.id.includes("neutralisation")) {
    return `Think of hot spicy chili sauce being calmed down by cool sweet yogurt. The strong sour acid and the sharp bitter base clash and cancel each other out completely, leaving harmless salt and water!`;
  }
  if (rx.id.includes("esterification")) {
    return `Sharp, pungent vinegar and medicinal alcohol meet with a drop of acid matchmaker—and voila! They fuse together to create a delightful, sweet, fruity perfume that smells like sweet apples and strawberries.`;
  }
  return `In simple everyday terms: ${rx.explanation} Notice how the chemicals swap partners or rearrange their atomic bonds to reach a happier, more stable state!`;
}
