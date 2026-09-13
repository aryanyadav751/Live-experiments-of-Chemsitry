import React, { useState, useRef, useEffect } from "react";
import { LabContext } from "../../types";
import {
  ChatMessage,
  QUICK_QUESTIONS,
  askGeminiLabAssistant
} from "../../services/geminiLabService";
import {
  Sparkles,
  Send,
  Trash2,
  Lightbulb,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  BookOpen
} from "lucide-react";

interface GeminiLabAssistantProps {
  labContext: LabContext;
  externalPrompt?: string;
  onClearExternalPrompt?: () => void;
}

export const GeminiLabAssistant: React.FC<GeminiLabAssistantProps> = ({
  labContext,
  externalPrompt,
  onClearExternalPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content:
        "Hello! I am your **Gemini Lab Assistant** for Class 10 NCERT Chemistry. You can ask me what happened in your vessel, why displacement or decomposition occurs, or how to balance equations!",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hintLevel, setHintLevel] = useState<1 | 2 | 3>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [warningNotice, setWarningNotice] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle external prompt passed from parent (e.g. clicking Ask Gemini button in results)
  useEffect(() => {
    if (externalPrompt) {
      handleSendMessage(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: query,
      timestamp: Date.now()
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await askGeminiLabAssistant({
        messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        labContext
      });

      if (response.warningNotice) {
        setWarningNotice(response.warningNotice);
      } else {
        setWarningNotice(null);
      }

      const botMsg: ChatMessage = {
        id: `gemini_${Date.now()}`,
        role: "model",
        content: response.text,
        timestamp: Date.now(),
        isOfflineFallback: response.isOfflineFallback
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        role: "model",
        content:
          "I encountered an error retrieving live response. However, according to NCERT Class 10: check if the reaction involves a displacement, combination, decomposition, or double-displacement precipitation.",
        timestamp: Date.now(),
        isOfflineFallback: true
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleProgressiveHint = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const currentLevel = hintLevel;
      const response = await askGeminiLabAssistant({
        messages: [{ role: "user", content: `Give me Hint Level ${currentLevel} for the current reaction.` }],
        labContext,
        hintLevel: currentLevel
      });

      const hintMsg: ChatMessage = {
        id: `hint_${Date.now()}`,
        role: "model",
        content: response.text,
        timestamp: Date.now(),
        isHint: true
      };

      setMessages((prev) => [...prev, hintMsg]);
      // Advance to next hint level
      setHintLevel((prev) => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome_reset",
        role: "model",
        content: "Chat cleared! Ask me anything about your current experiment or Class 10 NCERT chemistry concepts.",
        timestamp: Date.now()
      }
    ]);
    setHintLevel(1);
    setWarningNotice(null);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-purple-50/70 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                🧠 Gemini Lab Assistant
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              Class 10 NCERT Chemistry Tutor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleProgressiveHint}
            disabled={loading}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 hover:bg-amber-200 transition-colors"
          >
            <Lightbulb className="w-3 h-3 text-amber-600" />
            <span>Hint {hintLevel}/3</span>
          </button>

          <button
            type="button"
            onClick={handleClearChat}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Lab Context Chip */}
      <div className="px-4 py-1.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 truncate">
          <span className="font-bold text-slate-400">Context:</span>
          <span className="truncate font-semibold text-slate-800 dark:text-slate-200">
            {labContext.title || "No reaction active"}
          </span>
        </div>
        <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 shrink-0">
          {labContext.chapter}
        </span>
      </div>

      {/* Warning Notice if Gemini offline */}
      {warningNotice && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/60 border-b border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200 whitespace-pre-line leading-relaxed">
          {warningNotice}
        </div>
      )}

      {/* Quick Questions Chips Carousel */}
      <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q.id}
            type="button"
            onClick={() => handleSendMessage(q.prompt)}
            disabled={loading}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-300 border border-slate-200 dark:border-slate-700 transition-all shrink-0 active:scale-95"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed transition-all ${
                  isUser
                    ? "bg-blue-600 text-white rounded-br-xs shadow-xs"
                    : msg.isHint
                    ? "bg-amber-50 dark:bg-amber-950/40 text-slate-800 dark:text-slate-200 border border-amber-200 dark:border-amber-800 rounded-bl-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-xs"
                }`}
              >
                {/* Formatted Markdown-like simple renderer */}
                <div className="whitespace-pre-line break-words">
                  {msg.content}
                </div>

                {msg.isOfflineFallback && (
                  <div className="mt-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-blue-500" />
                    <span>Verified NCERT Class 10 offline knowledge engine</span>
                  </div>
                )}
              </div>

              {/* Message Footer: Timestamp & Copy */}
              <div className="mt-1 flex items-center gap-2 px-1 text-[10px] text-slate-400">
                <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                {!isUser && (
                  <button
                    type="button"
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="hover:text-slate-600 dark:hover:text-slate-300"
                    title="Copy text"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-xs max-w-[70%] text-xs text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
            <span>Consulting NCERT Class 10 concepts...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask about this reaction, balancing, or NCERT concepts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          className="flex-1 py-2 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-xs transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send question to Gemini"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
