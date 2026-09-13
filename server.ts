import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey: key });
  }
  return geminiClient;
}

// System instruction for Gemini Lab Assistant adhering to all 14 Class 10 NCERT rules
const GEMINI_LAB_SYSTEM_INSTRUCTION = `You are "Gemini Lab Assistant" — a friendly, rigorous Class 10 NCERT Chemistry Tutor embedded inside Discovery Lab 2.0.

Your mission: "Experiment. Discover. Understand."

Strict Guidelines & Guardrails:
1. Explain at CBSE Class 10 level by default.
2. Use simple, clear, engaging language suitable for secondary school students.
3. Preserve chemical formulas and state symbols exactly as verified in the syllabus (e.g. Fe(s), CuSO₄(aq), FeSO₄(aq), Cu(s), CO₂(g), H₂(g)).
4. Prefer and adhere to the verified application reaction data passed in the LabContext.
5. NEVER invent a chemical reaction. If a combination does not react, explain that no observable reaction occurs according to the reactivity series or thermodynamics.
6. NEVER alter a balanced chemical equation or invent unbalanced products.
7. NEVER claim an unsupported fact beyond NCERT Class 10 Chemistry (Chapters 1 to 4: Chemical Reactions & Equations, Acids Bases & Salts, Metals & Non-metals, Carbon & its Compounds).
8. NEVER claim official CBSE or NCERT certification or publisher affiliation. You are an independent educational digital lab assistant.
9. Always ground your explanation directly in the student's current LabContext (current selected substances, reaction detected, observations, and experiment mode).
10. Explain observations scientifically (e.g. explain why displacement occurs using the metal reactivity series: Fe is more reactive than Cu; explain why lime water turns milky due to insoluble CaCO₃ precipitate).
11. Encourage scientific inquiry and active reasoning rather than just blurting out raw answers. When the student asks for a hint, provide progressive pedagogical hints.
12. If the student asks in Hindi or asks "हिंदी में बताओ" / "समझाइए हिंदी में", explain in clear, fluent school-level Hindi (e.g. विस्थापन अभिक्रिया, अवक्षेप, ऊष्माक्षेपी अभिक्रिया) while keeping chemical formulas in standard IUPAC English notation.
13. For hazardous chemistry (e.g. toxic SO₂/NO₂ gases, concentrated acids, alkali metal reactions), strictly maintain an educational, virtual simulation perspective. Explicitly note that these are safely observed in this virtual digital laboratory.
14. NEVER provide real-world operating procedures, synthesis recipes, dangerous handling methods, or unauthorized practical instructions.`;

// API: Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// API: Gemini Status check
app.get("/api/gemini/status", (_req, res) => {
  const ai = getGemini();
  res.json({
    available: ai !== null,
    model: "gemini-3.8-flash"
  });
});

// API: Gemini Chat with Lab Context
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages, labContext, hintLevel } = req.body;
    const ai = getGemini();

    if (!ai) {
      return res.status(200).json({
        available: false,
        error: "GEMINI_UNAVAILABLE",
        message: "Gemini API key is not configured or currently unavailable."
      });
    }

    // Build context summary to prepend or inject into the prompt
    let contextPrompt = "";
    if (labContext) {
      contextPrompt = `[CURRENT DISCOVERY LAB 2.0 STATE]
Selected Substances: ${Array.isArray(labContext.selectedSubstances) ? labContext.selectedSubstances.join(", ") : "None"}
Verified Reaction ID: ${labContext.reactionId || "None (No reaction / mixture)"}
Title: ${labContext.title || "Unknown"}
Balanced Equation: ${labContext.balancedEquation || labContext.equation || "None"}
Reaction Type: ${Array.isArray(labContext.reactionType) ? labContext.reactionType.join(", ") : labContext.reactionType || "None"}
Observations: ${Array.isArray(labContext.observations) ? labContext.observations.join("; ") : labContext.observations || "None"}
Products: ${Array.isArray(labContext.products) ? labContext.products.join(", ") : labContext.products || "None"}
Safety Mode: ${labContext.experimentMode || "simulation-only"}
Conditions Applied: Heat=${labContext.conditions?.heat ? "Yes" : "No"}, Light=${labContext.conditions?.light ? "Yes" : "No"}, Electricity=${labContext.conditions?.electricity ? "Yes" : "No"}
${hintLevel ? `Student requested Hint Level: ${hintLevel} (Provide progressive guidance without giving away the final answer directly).` : ""}\n\n`;
    }

    // Prepare contents array for GoogleGenAI
    const formattedContents = [];
    if (Array.isArray(messages) && messages.length > 0) {
      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        const role = msg.role === "user" ? "user" : "model";
        let text = msg.content || "";
        // Prepend context to the latest user message
        if (i === messages.length - 1 && role === "user") {
          text = `${contextPrompt}Student query: ${text}`;
        }
        formattedContents.push({
          role,
          parts: [{ text }]
        });
      }
    } else {
      formattedContents.push({
        role: "user",
        parts: [{ text: `${contextPrompt}Explain what happens in this experiment at a Class 10 NCERT level.` }]
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: formattedContents,
      config: {
        systemInstruction: GEMINI_LAB_SYSTEM_INSTRUCTION,
        temperature: 0.7
      }
    });

    const replyText = response.text || "I am analyzing this reaction based on NCERT Class 10 chemistry concepts.";

    res.json({
      available: true,
      text: replyText,
      model: "gemini-3.8-flash"
    });
  } catch (error: any) {
    console.error("Gemini API error in /api/gemini/chat:", error);
    res.status(200).json({
      available: false,
      error: "GEMINI_ERROR",
      message: error?.message || "Failed to communicate with Gemini model.",
      fallback: true
    });
  }
});

// Vite middleware / production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: PORT },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Discovery Lab 2.0 Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
