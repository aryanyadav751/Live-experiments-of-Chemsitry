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
  initializeFirestore,
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

// Initialize Firestore with long polling to bypass reverse proxy streaming buffering
if (firebaseConfig.firestoreDatabaseId) {
  try {
    initializeFirestore(app, { experimentalForceLongPolling: true }, firebaseConfig.firestoreDatabaseId);
  } catch {
    // If already initialized, silently continue
  }
} else {
  try {
    initializeFirestore(app, { experimentalForceLongPolling: true });
  } catch {
    // If already initialized, silently continue
  }
}

// Export Firestore database instance (matching blueprint and skill requirements)
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Google Auth Provider with Google Drive Scopes
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope("https://www.googleapis.com/auth/drive.file");
googleAuthProvider.addScope("https://www.googleapis.com/auth/drive.metadata.readonly");
googleAuthProvider.addScope("https://www.googleapis.com/auth/drive.readonly");

// In-memory token cache (strictly avoiding localStorage for security)
let cachedAccessToken: string | null = null;
let activeSignInPromise: Promise<{ user: User; accessToken: string | null }> | null = null;

// Standard Firestore Error Handling conforming to Firebase Skill
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

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
  if (activeSignInPromise) {
    return activeSignInPromise;
  }

  activeSignInPromise = (async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        cachedAccessToken = credential.accessToken;
      }
      await syncUserProfile(result.user);
      return { user: result.user, accessToken: cachedAccessToken };
    } catch (error: any) {
      if (
        error?.code === "auth/cancelled-popup-request" ||
        error?.code === "auth/popup-closed-by-user"
      ) {
        // User voluntarily dismissed or replaced the popup dialog; handle quietly
        console.info("Firebase popup authentication was cancelled or closed by user.");
      } else {
        console.error("Sign-in error:", error);
      }
      throw error;
    } finally {
      activeSignInPromise = null;
    }
  })();

  return activeSignInPromise;
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
  const path = `users/${userId}/experiments`;
  try {
    const colRef = collection(db, "users", userId, "experiments");
    const docRef = await addDoc(colRef, {
      ...data,
      userId,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return "";
  }
};

// Save a challenge completion record
export const saveChallengeProgressToCloud = async (
  userId: string,
  challengeId: string,
  score: number,
  hintsUsed: number
) => {
  const path = `users/${userId}/challenges`;
  try {
    const colRef = collection(db, "users", userId, "challenges");
    await addDoc(colRef, {
      userId,
      challengeId,
      completed: true,
      score,
      hintsUsed,
      solvedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
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
  const path = `users/${userId}/reports`;
  try {
    const colRef = collection(db, "users", userId, "reports");
    const docRef = await addDoc(colRef, {
      ...report,
      userId,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
    return "";
  }
};

// Fetch user's saved experiments
export const getUserSavedExperiments = async (userId: string) => {
  const path = `users/${userId}/experiments`;
  try {
    const colRef = collection(db, "users", userId, "experiments");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn("Could not fetch saved experiments from cloud (offline mode active):", err);
    return [];
  }
};

// Connection diagnostic check with timeout race to prevent 10s blocking
export const testFirestoreConnection = async (): Promise<boolean> => {
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Connection timeout")), 3000)
    );
    await Promise.race([
      getDocFromServer(doc(db, "test", "connection")),
      timeoutPromise
    ]);
    return true;
  } catch (err: any) {
    if (
      err?.message?.includes("client is offline") ||
      err?.message?.includes("timeout") ||
      err?.code === "unavailable"
    ) {
      // Graceful degradation when offline or backend unreachable
      return false;
    }
    return true;
  }
};
