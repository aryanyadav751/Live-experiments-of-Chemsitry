import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  serverTimestamp,
  getDocFromServer
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Firestore using the configured database ID
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Google Auth Provider with Google Drive Scopes
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope("https://www.googleapis.com/auth/drive.file");
googleAuthProvider.addScope("https://www.googleapis.com/auth/drive.metadata.readonly");
googleAuthProvider.addScope("https://www.googleapis.com/auth/drive.readonly");

// In-memory token cache (strictly avoiding localStorage for security)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Initialize Auth Listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthSignedOut?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      // Sync user profile to Firestore
      try {
        await syncUserProfile(user);
      } catch (err) {
        console.warn("User profile sync warning:", err);
      }
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      if (onAuthSignedOut) onAuthSignedOut();
    }
  });
};

// Sign in with Google Popup
export const signInWithGoogle = async (): Promise<{ user: User; accessToken: string | null }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleAuthProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential?.accessToken) {
      cachedAccessToken = credential.accessToken;
    }
    await syncUserProfile(result.user);
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const setAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

export const logoutUser = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Sync User Profile in Firestore
export const syncUserProfile = async (user: User) => {
  if (!user.uid) return;
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName || "Chemistry Student",
      email: user.email || "",
      photoURL: user.photoURL || "",
      streakDays: 1,
      completedChallenges: 0,
      totalScore: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } else {
    await setDoc(
      userRef,
      {
        displayName: user.displayName || snap.data()?.displayName,
        photoURL: user.photoURL || snap.data()?.photoURL,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  }
};

// Save a virtual experiment / discovery run
export interface SavedExperimentData {
  mode: "guided" | "discovery" | "challenge";
  title: string;
  substances: string[];
  reactionResult: string;
  isHazardous: boolean;
  observations: string;
  notes: string;
}

export const saveExperimentToCloud = async (
  userId: string,
  data: SavedExperimentData
): Promise<string> => {
  const colRef = collection(db, "users", userId, "experiments");
  const docRef = await addDoc(colRef, {
    ...data,
    userId,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

// Save a challenge completion record
export const saveChallengeProgressToCloud = async (
  userId: string,
  challengeId: string,
  score: number,
  hintsUsed: number
) => {
  const colRef = collection(db, "users", userId, "challenges");
  await addDoc(colRef, {
    userId,
    challengeId,
    completed: true,
    score,
    hintsUsed,
    solvedAt: serverTimestamp()
  });
};

// Save lab report record to Firestore
export interface SavedReportData {
  title: string;
  chapter: string;
  aim: string;
  apparatus: string;
  reactions: string[];
  observations: string;
  inference: string;
  safetyPrecautions: string;
  googleDriveFileId?: string;
  googleDriveWebViewLink?: string;
}

export const saveReportToCloud = async (
  userId: string,
  report: SavedReportData
): Promise<string> => {
  const colRef = collection(db, "users", userId, "reports");
  const docRef = await addDoc(colRef, {
    ...report,
    userId,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

// Fetch user's saved experiments
export const getUserSavedExperiments = async (userId: string) => {
  try {
    const colRef = collection(db, "users", userId, "experiments");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn("Could not fetch saved experiments:", err);
    return [];
  }
};

// Connection diagnostic check
export const testFirestoreConnection = async (): Promise<boolean> => {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
    return true;
  } catch (err: any) {
    if (err?.message?.includes("client is offline")) {
      console.warn("Firestore client is offline, check connection.");
      return false;
    }
    return true;
  }
};
