import { DiscoveryHistoryItem, UserProgress } from "../types";
import { getSavedProgress, saveProgress } from "../utils/progress";
import { auth, saveExperimentToCloud } from "../lib/firebase";

export interface DiscoveryChallengeObjective {
  id: string;
  title: string;
  category: string;
  description: string;
  targetReactionId?: string;
  targetReactionType?: string;
  hint: string;
  xpReward: number;
}

export const DISCOVERY_CHALLENGES: DiscoveryChallengeObjective[] = [
  {
    id: "challenge-displacement",
    title: "The Metal Displacement Mystery",
    category: "Displacement",
    description: "Discover a single displacement reaction where a more reactive metal kicks out a less reactive one from its salt solution.",
    targetReactionType: "Displacement",
    hint: "Try placing grey iron or zinc granules into blue copper sulphate solution.",
    xpReward: 100
  },
  {
    id: "challenge-gas-evolution",
    title: "Hydrogen Gas Liberator",
    category: "Acids & Metals",
    description: "Produce hydrogen gas bubbles that burn with a distinctive 'pop' sound.",
    targetReactionId: "ch2-zinc-acid-hydrogen",
    hint: "Combine zinc metal granules with dilute hydrochloric or sulphuric acid.",
    xpReward: 100
  },
  {
    id: "challenge-slaking",
    title: "The Exothermic Hiss",
    category: "Combination",
    description: "Recreate the intense heat and hissing sound of slaking quicklime used in whitewashing.",
    targetReactionId: "ch1-slaked-lime",
    hint: "Combine quicklime (CaO) with distilled water (H₂O).",
    xpReward: 100
  },
  {
    id: "challenge-yellow-precipitate",
    title: "The Canary Yellow Precipitate",
    category: "Precipitation",
    description: "Mix two clear, colorless aqueous solutions to precipitate a brilliant canary-yellow solid.",
    targetReactionId: "ch1-lead-iodide-precipitation",
    hint: "Combine Lead(II) Nitrate and Potassium Iodide solutions.",
    xpReward: 100
  },
  {
    id: "challenge-thermal-decomp",
    title: "The Green Crystal Breakdown",
    category: "Decomposition",
    description: "Heat pale green vitriol crystals until they decompose into a reddish-brown solid with pungent gases.",
    targetReactionId: "ch1-ferrous-sulphate-decomposition",
    hint: "Place Ferrous Sulphate crystals in the vessel and activate [🔥 Virtual Heat].",
    xpReward: 100
  },
  {
    id: "challenge-ester-perfume",
    title: "The Sweet-Smelling Ester",
    category: "Organic",
    description: "Synthesize a fruity-smelling ester compound used in perfumes and flavoring essences.",
    targetReactionId: "ch4-esterification-reaction",
    hint: "Combine Ethanoic Acid and Ethanol in the presence of [🔥 Virtual Heat].",
    xpReward: 100
  },
  {
    id: "challenge-water-electrolysis",
    title: "The 2:1 Water Splitter",
    category: "Electrolysis",
    description: "Pass electric current through water to separate it into hydrogen and oxygen in a 2:1 volume ratio.",
    targetReactionId: "ch1-electrolysis-of-water",
    hint: "Add Distilled Water and activate [⚡ Virtual Electricity].",
    xpReward: 100
  }
];

const DISCOVERIES_STORAGE_KEY = "chemistry_lab_discoveries_v2";

export function getLocalDiscoveries(): DiscoveryHistoryItem[] {
  try {
    const raw = localStorage.getItem(DISCOVERIES_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function recordDiscovery(item: Omit<DiscoveryHistoryItem, "id" | "timestamp">): {
  isNew: boolean;
  history: DiscoveryHistoryItem[];
} {
  const current = getLocalDiscoveries();
  const existingIdx = current.findIndex((d) => d.reactionId === item.reactionId);

  const newItem: DiscoveryHistoryItem = {
    ...item,
    id: `disc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: Date.now()
  };

  let isNew = false;
  let updated: DiscoveryHistoryItem[];

  if (existingIdx === -1) {
    isNew = true;
    updated = [newItem, ...current];
  } else {
    // update timestamp
    updated = current.map((d, i) => (i === existingIdx ? { ...d, timestamp: Date.now() } : d));
  }

  try {
    localStorage.setItem(DISCOVERIES_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("Could not write discoveries to localStorage:", err);
  }

  // Also sync with Firebase if user is logged in
  if (auth.currentUser) {
    saveExperimentToCloud(auth.currentUser.uid, {
      mode: "discovery",
      title: item.title,
      substances: item.substances,
      reactionResult: item.balancedEquation,
      isHazardous: false,
      observations: item.balancedEquation,
      notes: `Discovered in Discovery Lab 2.0 (${item.chapter})`
    }).catch((e) => console.warn("Cloud experiment sync error:", e));
  }

  return { isNew, history: updated };
}

/**
 * Checks if current reaction satisfies any active Discovery Challenge
 */
export function checkChallengeCompletion(
  reactionId: string,
  reactionType: string[]
): DiscoveryChallengeObjective | null {
  for (const chal of DISCOVERY_CHALLENGES) {
    if (chal.targetReactionId && chal.targetReactionId === reactionId) {
      return chal;
    }
    if (
      chal.targetReactionType &&
      reactionType.some((t) => t.toLowerCase().includes(chal.targetReactionType!.toLowerCase()))
    ) {
      return chal;
    }
  }
  return null;
}

/**
 * Awards XP and records challenge completion into global UserProgress
 */
export function completeChallengeAndAwardXP(challenge: DiscoveryChallengeObjective): UserProgress {
  const current = getSavedProgress();
  const existingChallenge = current.challengeCompletions?.[challenge.id];

  // Avoid duplicate XP farming for the same challenge
  if (existingChallenge) {
    return current;
  }

  const updated: UserProgress = {
    ...current,
    challengeCompletions: {
      ...(current.challengeCompletions || {}),
      [challenge.id]: {
        score: challenge.xpReward,
        date: new Date().toISOString().split("T")[0]
      }
    }
  };

  saveProgress(updated);
  return updated;
}
