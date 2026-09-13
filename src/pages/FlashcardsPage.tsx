import React, { useState } from "react";
import { REACTIONS, getReactionsByChapter } from "../data/reactions";
import { Flashcard } from "../components/Flashcard";
import { toggleFlashcardMastered } from "../utils/progress";
import {
  CreditCard,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface FlashcardsPageProps {
  userProgress: any;
  onToggleMastered: (id: string) => void;
}

export const FlashcardsPage: React.FC<FlashcardsPageProps> = ({
  userProgress,
  onToggleMastered
}) => {
  const [selectedChapter, setSelectedChapter] = useState<number | "all">("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [shuffledList, setShuffledList] = useState(REACTIONS);

  const currentCards = selectedChapter === "all"
    ? shuffledList
    : shuffledList.filter((r) => r.chapterNumber === selectedChapter);

  const currentCard = currentCards[currentIndex] || currentCards[0];

  const handleNext = () => {
    if (currentIndex < currentCards.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else {
      setCurrentIndex(currentCards.length - 1);
    }
  };

  const handleShuffle = () => {
    const copy = [...REACTIONS];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setShuffledList(copy);
    setCurrentIndex(0);
  };

  const isCurrentMastered = Boolean(
    currentCard && userProgress.flashcardMastered.includes(currentCard.id)
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>QUICK REVISION FLASHCARDS</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Reaction Flashcards
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Flip cards to recall reactants, products, states of matter, and key sensory observations.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle Cards</span>
          </button>
        </div>
      </div>

      {/* Chapter Selection Bar */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-mono font-semibold text-slate-400 mr-2">
          Filter by Chapter:
        </span>
        {[
          { num: "all" as const, label: "All Chapters" },
          { num: 1, label: "Ch 1: Reactions" },
          { num: 2, label: "Ch 2: Acids & Salts" },
          { num: 3, label: "Ch 3: Metals" },
          { num: 4, label: "Ch 4: Carbon" }
        ].map((c) => (
          <button
            key={String(c.num)}
            onClick={() => {
              setSelectedChapter(c.num);
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedChapter === c.num
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Active Flashcard Canvas */}
      {currentCard ? (
        <div className="flex flex-col items-center gap-6">
          <div className="w-full">
            <Flashcard
              reaction={currentCard}
              key={currentCard.id}
              isMastered={isCurrentMastered}
              onToggleMastered={onToggleMastered}
            />
          </div>

          {/* Carousel Navigation Controller */}
          <div className="flex items-center gap-4 text-sm font-mono">
            <button
              onClick={handlePrev}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-105"
              title="Previous Card"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="font-bold text-slate-700 dark:text-slate-300">
              Card {currentIndex + 1} of {currentCards.length}
            </span>

            <button
              onClick={handleNext}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-105"
              title="Next Card"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Mastered Progress Status */}
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>
              You have mastered{" "}
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono">
                {userProgress.flashcardMastered.length}
              </strong>{" "}
              out of {REACTIONS.length} reaction flashcards
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
