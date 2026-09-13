import { LabContext, Reaction } from "../types";
import { labTools, getProgressiveHint } from "../utils/labContext";
import { getReactionById } from "../data/reactions";

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "assistant" | "system";
  content: string;
  timestamp: number;
  isHint?: boolean;
  isOfflineFallback?: boolean;
}

export interface GeminiResponse {
  available: boolean;
  text: string;
  isOfflineFallback?: boolean;
  warningNotice?: string;
}

export const QUICK_QUESTIONS = [
  { id: "what-happened", label: "💡 What happened?", prompt: "What happened in this reaction? Explain the visual observations." },
  { id: "why-occurred", label: "🧪 Why did this reaction occur?", prompt: "Why did this chemical reaction occur? Explain the scientific driving force." },
  { id: "reaction-type", label: "⚗️ What type of reaction is this?", prompt: "What type of chemical reaction is this according to NCERT Class 10 classification?" },
  { id: "molecular-change", label: "🔬 Explain the molecular change", prompt: "Explain the molecular mechanism and particle rearrangement taking place." },
  { id: "ncert-concept", label: "📖 Explain the NCERT concept", prompt: "Explain the core NCERT textbook concept and board exam significance of this reaction." },
  { id: "hindi-explain", label: "🇮🇳 समझाइए हिंदी में", prompt: "कृपया इस रासायनिक अभिक्रिया को सरल और स्पष्ट हिंदी में समझाइए।" },
  { id: "balance-help", label: "⚖️ Help me balance it", prompt: "Help me understand how the atoms are balanced in this chemical equation." },
  { id: "give-quiz", label: "🎯 Give me a quiz", prompt: "Give me an NCERT Class 10 board exam question based on this reaction." }
];

export async function askGeminiLabAssistant(params: {
  messages: { role: string; content: string }[];
  labContext: LabContext;
  hintLevel?: 1 | 2 | 3;
}): Promise<GeminiResponse> {
  const { messages, labContext, hintLevel } = params;

  try {
    const res = await fetch("/api/gemini/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        labContext,
        hintLevel
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.available && data.text) {
        return {
          available: true,
          text: data.text
        };
      }
    }
  } catch (err) {
    console.warn("Could not reach /api/gemini/chat, switching to offline NCERT engine:", err);
  }

  // Graceful offline fallback adhering strictly to Requirement 18
  const offlineText = generateOfflineTutorReply(
    messages[messages.length - 1]?.content || "",
    labContext,
    hintLevel
  );

  return {
    available: false,
    isOfflineFallback: true,
    warningNotice: `🟡 Gemini is currently unavailable.\n\nYou can still use:\n• Reaction explanations\n• Molecular viewer\n• Equation balancer\n• Discovery simulator`,
    text: offlineText
  };
}

/**
 * Intelligent Offline NCERT Class 10 Tutor Engine
 * Provides authentic, scientifically verified answers from the local NCERT database
 */
function generateOfflineTutorReply(
  query: string,
  context: LabContext,
  hintLevel?: 1 | 2 | 3
): string {
  const lowerQuery = query.toLowerCase();
  const rx: Reaction | null = context.reactionId ? labTools.getReactionById(context.reactionId) : null;

  if (hintLevel) {
    return getProgressiveHint(rx, hintLevel);
  }

  // Hindi question
  if (lowerQuery.includes("हिंदी") || lowerQuery.includes("hindi") || lowerQuery.includes("समझाइए")) {
    if (!rx) {
      return `नमस्ते! वर्तमान में परखनलिका में कोई सत्यापित अभिक्रिया नहीं हुई है।\n\nकृपया ऊपर दिए गए केमिकल शेल्फ से दो पदार्थ चुनें (उदाहरण के लिए: Iron + Copper Sulphate या Zinc + Dilute HCl) और 'Run Experiment' पर क्लिक करें।`;
    }
    return `**${rx.title} — हिंदी व्याख्या (NCERT कक्षा 10)**\n\n• **समीकरण:** ${rx.balancedEquation}\n• **अभिक्रिया का प्रकार:** ${rx.reactionType.join(", ")}\n• **मुख्य प्रेक्षण (Observations):**\n${rx.observations.map((o) => `  - ${o}`).join("\n")}\n\n• **वैज्ञानिक कारण:** ${rx.explanation}\n\n• **बोर्ड परीक्षा टिप:** इस अभिक्रिया में प्रेक्षण और संतुलित रासायनिक समीकरण सीधे पूछे जाते हैं।`;
  }

  // Molecular Change
  if (lowerQuery.includes("molecular") || lowerQuery.includes("particle") || lowerQuery.includes("mechanism")) {
    if (!rx) {
      return `No active reaction is currently loaded in the vessel. Add verified reagents to observe molecular particle rearrangement.`;
    }
    return `**Molecular Mechanism for ${rx.title}:**\n\n${rx.molecularExplanation}\n\n*Equation:* \`${rx.balancedEquation}\`\n\nClick the **[View in 3D]** button below the vessel to watch the atoms exchange bonds in real-time.`;
  }

  // Balance Help
  if (lowerQuery.includes("balance") || lowerQuery.includes("balancing")) {
    if (!rx) {
      return `To practice balancing, first discover a verified reaction or visit the Exam Zone Balancer tab.`;
    }
    const bal = labTools.getBalanceStatus(rx.balancedEquation);
    return `**Equation Balancing Guide:**\n\n• **Unbalanced Equation:** \`${rx.equation}\`\n• **Balanced Equation:** \`${rx.balancedEquation}\`\n\n• **Law of Conservation of Mass:** Total number of atoms of each element on the reactant side must equal the product side.\n• **Status:** ${bal.isBalanced ? "✅ Perfectly balanced in accordance with CBSE Class 10 guidelines." : "Needs balancing."}\n\nClick the **[Balance Equation]** button to inspect element-by-element coefficients!`;
  }

  // Quiz question
  if (lowerQuery.includes("quiz") || lowerQuery.includes("question") || lowerQuery.includes("test me")) {
    if (!rx || !rx.quiz || rx.quiz.length === 0) {
      return `Here is a CBSE Board question:\n\n**Q: What is observed when an iron nail is dipped in copper sulphate solution for 20 minutes?**\n\n*Answer:* The blue copper sulphate solution gradually turns pale green due to formation of FeSO₄, and a reddish-brown coating of copper metal deposits on the iron nail.`;
    }
    const q = rx.quiz[0];
    return `**🎯 CBSE Board Practice Question:**\n\n**${q.question}**\n\n${q.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join("\n")}\n\n*(Think about the answer, or ask me for the solution!)*`;
  }

  // Why did it occur
  if (lowerQuery.includes("why") || lowerQuery.includes("cause") || lowerQuery.includes("reason")) {
    if (!rx) {
      return `No chemical reaction occurred because these substances do not have a favorable driving force under the selected conditions. For example, Copper (Cu) cannot displace Iron (Fe) because Copper is lower in the reactivity series.`;
    }
    return `**Why This Reaction Occurs:**\n\n${rx.explanation}\n\n**NCERT Principle:** ${rx.ncertConcept}\n\n**Thermodynamics & Energy:** Energy change is ${rx.energyChange || "determined by bond enthalpy"}.`;
  }

  // What happened / General
  if (rx) {
    return `**Analysis for ${rx.title}:**\n\n• **Balanced Equation:** \`${rx.balancedEquation}\`\n• **Reaction Type:** ${rx.reactionType.join(", ")}\n• **Key Observations:**\n${rx.observations.map((o) => `  - ${o}`).join("\n")}\n\n• **NCERT Concept:** ${rx.ncertConcept}\n• **Safety Level:** ${rx.experimentMode.toUpperCase()} (Simulated safely in digital laboratory).\n\nFeel free to ask about the molecular mechanism, real-world uses, or how to balance this equation!`;
  }

  return `In Discovery Lab 2.0, you can combine metals, acids, bases, and salts to observe color shifts, effervescence, and precipitation.\n\nCurrently, the vessel contains: ${context.selectedSubstances.join(", ") || "No substances"}.\n\nTry selecting two substances that have an authentic NCERT reaction, such as **Iron (Fe) + Copper Sulphate (CuSO₄)** or **Zinc (Zn) + Dilute HCl**!`;
}
