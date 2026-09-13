import React, { useState, useEffect } from "react";
import { Navbar, NavTab } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { ChaptersPage } from "./pages/ChaptersPage";
import { ExplorerPage } from "./pages/ExplorerPage";
import { VirtualLabPage } from "./pages/VirtualLabPage";
import { ExamZonePage } from "./pages/ExamZonePage";
import { FlashcardsPage } from "./pages/FlashcardsPage";
import { ComparePage } from "./pages/ComparePage";
import { ProgressPage } from "./pages/ProgressPage";
import { RealWorldApplicationsPage } from "./pages/RealWorldApplicationsPage";
import { EncyclopediaPage } from "./pages/EncyclopediaPage";
import { AboutSourcesPage } from "./pages/AboutSourcesPage";
import { ReactionDetailModal } from "./components/ReactionDetailModal";
import { Reaction, UserProgress } from "./types";
import { REACTIONS } from "./data/reactions";
import {
  getSavedProgress,
  saveProgress,
  markReactionStudied,
  toggleBookmark,
  toggleFlashcardMastered,
  recordQuizScore
} from "./utils/progress";
import { FlaskConical, ShieldAlert, Heart, BookOpen, Star, Sparkles } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>("home");
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number | null>(null);
  const [activeModalReaction, setActiveModalReaction] = useState<Reaction | null>(null);
  const [activeLabReaction, setActiveLabReaction] = useState<Reaction | null>(null);
  const [ncertMode, setNcertMode] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [userProgress, setUserProgress] = useState<UserProgress>(getSavedProgress());

  // Keep HTML document dark class in sync
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Handle switching to a specific chapter
  const handleSelectChapter = (chapterNum: number) => {
    setSelectedChapterNumber(chapterNum);
    setCurrentTab("chapters");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle opening reaction details modal
  const handleSelectReaction = (reaction: Reaction) => {
    const updated = markReactionStudied(reaction.id);
    setUserProgress(updated);
    setActiveModalReaction(reaction);
  };

  // Handle launching experiment directly into Virtual Lab
  const handleRunExperiment = (reaction: Reaction) => {
    setActiveLabReaction(reaction);
    setActiveModalReaction(null);
    setCurrentTab("lab");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleBookmark = (id: string) => {
    const updated = toggleBookmark(id);
    setUserProgress(updated);
  };

  const handleToggleMastered = (id: string) => {
    const updated = toggleFlashcardMastered(id);
    setUserProgress(updated);
  };

  const handleScoreUpdate = (id: string, score: number, total: number) => {
    const updated = recordQuizScore(id, score, total);
    setUserProgress(updated);
  };

  const handleResetProgress = () => {
    const resetData: UserProgress = {
      completedChapters: [],
      studiedReactions: [],
      simulatedExperiments: [],
      quizScores: {},
      flashcardMastered: [],
      bookmarkedReactions: []
    };
    saveProgress(resetData);
    setUserProgress(resetData);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        ncertMode={ncertMode}
        onToggleNcertMode={() => setNcertMode(!ncertMode)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        completedCount={userProgress.studiedReactions.length}
        totalCount={REACTIONS.length}
        streakInfo={userProgress.streakInfo}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {currentTab === "home" && (
          <HomePage
            onSelectChapter={handleSelectChapter}
            onSelectReaction={handleSelectReaction}
            onRunExperiment={handleRunExperiment}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            userProgress={userProgress}
            ncertMode={ncertMode}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === "chapters" && (
          <ChaptersPage
            initialChapter={selectedChapterNumber}
            onSelectReaction={handleSelectReaction}
            onRunExperiment={handleRunExperiment}
            userProgress={userProgress}
            ncertMode={ncertMode}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === "explorer" && (
          <ExplorerPage
            onSelectReaction={handleSelectReaction}
            onRunExperiment={handleRunExperiment}
            userProgress={userProgress}
            ncertMode={ncertMode}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentTab === "lab" && (
          <VirtualLabPage
            selectedReaction={activeLabReaction}
            onSelectReaction={handleSelectReaction}
          />
        )}

        {currentTab === "exam" && (
          <ExamZonePage
            onSelectReaction={handleSelectReaction}
            onRunExperiment={handleRunExperiment}
            onScoreUpdate={handleScoreUpdate}
          />
        )}

        {currentTab === "applications" && (
          <RealWorldApplicationsPage
            onSelectReaction={handleSelectReaction}
            onRunExperiment={handleRunExperiment}
          />
        )}

        {currentTab === "encyclopedia" && (
          <EncyclopediaPage
            onRunExperiment={handleRunExperiment}
            onSelectReaction={handleSelectReaction}
          />
        )}

        {currentTab === "flashcards" && (
          <FlashcardsPage
            userProgress={userProgress}
            onToggleMastered={handleToggleMastered}
          />
        )}

        {currentTab === "compare" && (
          <ComparePage
            onSelectReaction={handleSelectReaction}
            onRunExperiment={handleRunExperiment}
          />
        )}

        {currentTab === "progress" && (
          <ProgressPage
            userProgress={userProgress}
            onResetProgress={handleResetProgress}
            onNavigateTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {currentTab === "about" && (
          <AboutSourcesPage />
        )}
      </main>

      {/* Global Reaction Detail Modal */}
      {activeModalReaction && (
        <ReactionDetailModal
          reaction={activeModalReaction}
          onClose={() => setActiveModalReaction(null)}
          onRunExperiment={handleRunExperiment}
          isBookmarked={userProgress.bookmarkedReactions.includes(activeModalReaction.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* Modern Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Chemistry Lab — Class 10 NCERT
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Curated strictly for CBSE Class 10 Science Students & Teachers
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <button onClick={() => setCurrentTab("chapters")} className="hover:text-blue-600">
                Chapters
              </button>
              <button onClick={() => setCurrentTab("explorer")} className="hover:text-blue-600">
                All Reactions
              </button>
              <button onClick={() => setCurrentTab("lab")} className="hover:text-blue-600">
                Virtual Lab
              </button>
              <button onClick={() => setCurrentTab("exam")} className="hover:text-blue-600">
                Board Exam Zone
              </button>
              <button onClick={() => setCurrentTab("applications")} className="hover:text-blue-600">
                Real-World Applications
              </button>
              <button onClick={() => setCurrentTab("flashcards")} className="hover:text-blue-600">
                Flashcards
              </button>
              <button onClick={() => setCurrentTab("compare")} className="hover:text-blue-600">
                Compare
              </button>
              <button onClick={() => setCurrentTab("progress")} className="hover:text-blue-600">
                My Progress
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <p>
              © {new Date().getFullYear()} Chemistry Lab — Class 10 NCERT. Designed for CBSE Board Science Curriculum.
            </p>
            <p className="flex items-center gap-1 font-mono text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              Safe Virtual Educational Simulation Only
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
