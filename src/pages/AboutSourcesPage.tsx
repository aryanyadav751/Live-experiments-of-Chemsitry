import React from "react";
import { BookOpen, Cpu, Sparkles, ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";

export const AboutSourcesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>CURRICULAR TRANSPARENCY & METHODOLOGY</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          About & Curriculum Sources
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Learn how our chemistry data, virtual simulations, and AI pedagogical explanations are structured and verified.
        </p>
      </div>

      {/* 3 Pillars of Credibility: NCERT vs Simulations vs AI Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Pillar 1: NCERT Content */}
        <div className="p-6 rounded-3xl border border-blue-500/20 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            1. NCERT Content
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Content is grounded directly in the official <strong>NCERT Class 10 Science</strong> textbook (Chapters 1 to 4):
          </p>
          <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
              <span>Chapter 1: Chemical Reactions & Equations</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
              <span>Chapter 2: Acids, Bases & Salts</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
              <span>Chapter 3: Metals & Non-Metals</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
              <span>Chapter 4: Carbon & its Compounds</span>
            </li>
          </ul>
        </div>

        {/* Pillar 2: Deterministic Virtual Simulations */}
        <div className="p-6 rounded-3xl border border-emerald-500/20 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            2. Virtual Simulations
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Our virtual laboratory simulations run entirely deterministically in your browser:
          </p>
          <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>3D WebGL Molecular Engine with CPK atomic radii</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Verified colorimetric and physical state changes</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Thermal indicators and exothermic/endothermic displays</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Virtual safety guardrails for hazardous demonstrations</span>
            </li>
          </ul>
        </div>

        {/* Pillar 3: AI-Generated Explanations */}
        <div className="p-6 rounded-3xl border border-purple-500/20 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            3. AI Explanations
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Pedagogical tutoring powered by Google Gemini with strict educational guardrails:
          </p>
          <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
              <span>Always uses verified reaction data as context first</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
              <span>Answers tailored to CBSE Class 10 mark schemes</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
              <span>Hindi medium explanations for bilingual learners</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
              <span>Safety filters intercept dangerous chemical queries</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Safety Philosophy Card */}
      <div className="p-6 rounded-3xl border border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-100 space-y-3">
        <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
          <ShieldCheck className="w-5 h-5" />
          <h3 className="text-base">Safety-First Virtual Laboratory Commitment</h3>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-amber-900 dark:text-amber-200">
          For experiments involving toxic fumes (such as NO₂ and SO₂), violent exothermic releases (such as quicklime slaking or thermite), or concentrated reagents, this application provides <strong>virtual demonstrations</strong> to illustrate the underlying chemistry and thermodynamics without functioning as instructions for unsupervised physical experimentation.
        </p>
      </div>

      {/* Editorial & Curriculum Disclaimer */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
          Curricular Alignment & Attribution
        </h4>
        <p className="leading-relaxed">
          • Aligned with the CBSE Class 10 NCERT Science Chemistry curriculum.<br />
          • Educational resource created for conceptual study and virtual laboratory simulation.<br />
          • Based on publicly available NCERT textbook chapters 1–4.<br />
          • An independent learning tool without official government or publisher affiliation.
        </p>
      </div>
    </div>
  );
};
