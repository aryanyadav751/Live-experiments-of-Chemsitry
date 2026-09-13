import { UserProgress, DailyStreakInfo } from "../types";
import { REACTIONS, getReactionsByChapter } from "../data/reactions";

const STORAGE_KEY = "ncert_chem_lab_progress_v1";
const STREAK_KEY = "ncert_chem_lab_streak_v1";

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getYesterdayDateString(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDailyStreak(): DailyStreakInfo {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (!raw) {
      // Default initial streak for active student
      const initial: DailyStreakInfo = {
        currentStreak: 3,
        longestStreak: 5,
        lastActiveDate: today,
        todayCompleted: true,
        totalActiveDays: 8
      };
      localStorage.setItem(STREAK_KEY, JSON.stringify(initial));
      return initial;
    }

    const data: DailyStreakInfo = JSON.parse(raw);
    const lastDate = data.lastActiveDate;

    if (lastDate === today) {
      return { ...data, todayCompleted: true };
    } else if (lastDate === yesterday) {
      return { ...data, todayCompleted: false };
    } else {
      // Gap of more than 1 day: streak reset but preserve longest
      const resetStreak: DailyStreakInfo = {
        currentStreak: 0,
        longestStreak: Math.max(data.longestStreak || 0, data.currentStreak || 0),
        lastActiveDate: lastDate,
        todayCompleted: false,
        totalActiveDays: data.totalActiveDays || 1
      };
      return resetStreak;
    }
  } catch {
    return {
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: today,
      todayCompleted: true,
      totalActiveDays: 1
    };
  }
}

export function recordDailyActivity(): DailyStreakInfo {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();
  const current = getDailyStreak();

  if (current.lastActiveDate === today && current.todayCompleted) {
    return current;
  }

  let newStreak = current.currentStreak;
  if (current.lastActiveDate === yesterday) {
    newStreak = current.currentStreak + 1;
  } else if (current.lastActiveDate !== today) {
    newStreak = 1;
  } else {
    newStreak = Math.max(1, current.currentStreak);
  }

  const updated: DailyStreakInfo = {
    currentStreak: newStreak,
    longestStreak: Math.max(current.longestStreak, newStreak),
    lastActiveDate: today,
    todayCompleted: true,
    totalActiveDays: (current.totalActiveDays || 0) + (current.lastActiveDate === today ? 0 : 1)
  };

  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save streak", e);
  }

  return updated;
}

const DEFAULT_PROGRESS: UserProgress = {
  completedChapters: [],
  studiedReactions: ["ch1-magnesium-ribbon", "ch1-iron-copper-sulphate-displacement"],
  simulatedExperiments: ["ch1-iron-copper-sulphate-displacement"],
  quizScores: {
    "ch1-magnesium-ribbon": { score: 2, total: 2, timestamp: Date.now() - 3600000 }
  },
  flashcardMastered: ["ch1-magnesium-ribbon"],
  bookmarkedReactions: ["ch1-iron-copper-sulphate-displacement", "ch4-esterification-reaction"],
  streakInfo: {
    currentStreak: 3,
    longestStreak: 5,
    lastActiveDate: getTodayDateString(),
    todayCompleted: true,
    totalActiveDays: 8
  },
  balancedEquations: ["ch1-magnesium-ribbon"]
};

export function getSavedProgress(): UserProgress {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const streak = getDailyStreak();
    if (!data) {
      return { ...DEFAULT_PROGRESS, streakInfo: streak };
    }
    const parsed = JSON.parse(data);
    return {
      ...parsed,
      streakInfo: streak,
      balancedEquations: parsed.balancedEquations || []
    };
  } catch {
    return { ...DEFAULT_PROGRESS, streakInfo: getDailyStreak() };
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress to localStorage", e);
  }
}

export function markReactionStudied(reactionId: string): UserProgress {
  recordDailyActivity();
  const current = getSavedProgress();
  if (!current.studiedReactions.includes(reactionId)) {
    const updated: UserProgress = {
      ...current,
      studiedReactions: [...current.studiedReactions, reactionId],
      streakInfo: getDailyStreak()
    };
    saveProgress(updated);
    return updated;
  }
  return current;
}

export function markExperimentSimulated(reactionId: string): UserProgress {
  recordDailyActivity();
  const current = getSavedProgress();
  if (!current.simulatedExperiments.includes(reactionId)) {
    const updated: UserProgress = {
      ...current,
      simulatedExperiments: [...current.simulatedExperiments, reactionId],
      streakInfo: getDailyStreak()
    };
    saveProgress(updated);
    return updated;
  }
  return current;
}

export function markEquationBalanced(reactionId: string): UserProgress {
  recordDailyActivity();
  const current = getSavedProgress();
  const existing = current.balancedEquations || [];
  if (!existing.includes(reactionId)) {
    const updated: UserProgress = {
      ...current,
      balancedEquations: [...existing, reactionId],
      streakInfo: getDailyStreak()
    };
    saveProgress(updated);
    return updated;
  }
  return current;
}

export function recordQuizScore(id: string, score: number, total: number): UserProgress {
  recordDailyActivity();
  const current = getSavedProgress();
  const updated: UserProgress = {
    ...current,
    quizScores: {
      ...current.quizScores,
      [id]: { score, total, timestamp: Date.now() }
    },
    streakInfo: getDailyStreak()
  };
  saveProgress(updated);
  return updated;
}

export function toggleFlashcardMastered(reactionId: string): UserProgress {
  const current = getSavedProgress();
  const exists = current.flashcardMastered.includes(reactionId);
  const updated: UserProgress = {
    ...current,
    flashcardMastered: exists
      ? current.flashcardMastered.filter((id) => id !== reactionId)
      : [...current.flashcardMastered, reactionId]
  };
  saveProgress(updated);
  return updated;
}

export function toggleBookmark(reactionId: string): UserProgress {
  const current = getSavedProgress();
  const exists = current.bookmarkedReactions.includes(reactionId);
  const updated: UserProgress = {
    ...current,
    bookmarkedReactions: exists
      ? current.bookmarkedReactions.filter((id) => id !== reactionId)
      : [...current.bookmarkedReactions, reactionId]
  };
  saveProgress(updated);
  return updated;
}

export function calculateChapterProgress(chapterNum: number, progress: UserProgress): {
  studiedCount: number;
  totalCount: number;
  percentage: number;
  simulatedCount: number;
} {
  const chapterReactions = getReactionsByChapter(chapterNum);
  const totalCount = chapterReactions.length;
  if (totalCount === 0) return { studiedCount: 0, totalCount: 0, percentage: 0, simulatedCount: 0 };

  const studiedCount = chapterReactions.filter((r) => progress.studiedReactions.includes(r.id)).length;
  const simulatedCount = chapterReactions.filter((r) => progress.simulatedExperiments.includes(r.id)).length;
  const percentage = Math.round((studiedCount / totalCount) * 100);

  return { studiedCount, totalCount, percentage, simulatedCount };
}

export function calculateTotalProgress(progress: UserProgress): {
  totalReactions: number;
  studiedReactions: number;
  simulatedCount: number;
  overallPercentage: number;
  quizTotalTaken: number;
} {
  const totalReactions = REACTIONS.length;
  const studiedReactions = progress.studiedReactions.length;
  const simulatedCount = progress.simulatedExperiments.length;
  const overallPercentage = Math.min(100, Math.round((studiedReactions / Math.max(1, totalReactions)) * 100));
  const quizTotalTaken = Object.keys(progress.quizScores).length;

  return {
    totalReactions,
    studiedReactions,
    simulatedCount,
    overallPercentage,
    quizTotalTaken
  };
}
