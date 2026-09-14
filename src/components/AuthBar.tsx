import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import {
  auth,
  signInWithGoogle,
  logoutUser,
  initAuth,
  getAccessToken,
  testFirestoreConnection
} from "../lib/firebase";
import { LogIn, LogOut, CheckCircle2, AlertCircle, Cloud, HardDrive, UserCheck } from "lucide-react";

interface AuthBarProps {
  onUserChange?: (user: User | null, token: string | null) => void;
  className?: string;
}

export const AuthBar: React.FC<AuthBarProps> = ({ onUserChange, className = "" }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dbConnected, setDbConnected] = useState<boolean>(true);

  useEffect(() => {
    // Test initial Firestore connection
    testFirestoreConnection().then(setDbConnected);

    const unsubscribe = initAuth((user, token) => {
      setCurrentUser(user);
      if (onUserChange) onUserChange(user, token);
    }, () => {
      setCurrentUser(null);
      if (onUserChange) onUserChange(null, null);
    });

    return () => unsubscribe();
  }, [onUserChange]);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await signInWithGoogle();
      setCurrentUser(res.user);
      if (onUserChange) onUserChange(res.user, res.accessToken);
    } catch (err: any) {
      if (
        err?.code === "auth/cancelled-popup-request" ||
        err?.code === "auth/popup-closed-by-user"
      ) {
        // User closed the popup, do not show error banner
        setError(null);
      } else {
        console.error("Auth sign-in failure:", err);
        setError(err?.message || "Failed to sign in with Google.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setCurrentUser(null);
      if (onUserChange) onUserChange(null, null);
    } catch (err: any) {
      console.error("Auth sign-out failure:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl border transition-all ${
        currentUser
          ? "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20"
          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
      } ${className}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {currentUser ? (
          <>
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || "Student"}
                className="w-8 h-8 rounded-full border border-emerald-500/40 object-cover shrink-0"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser.displayName?.charAt(0) || "S"}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {currentUser.displayName || "Chemistry Student"}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-full shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                  {dbConnected ? "Synced" : "Local"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Cloud className={`w-3 h-3 ${dbConnected ? "text-blue-500" : "text-amber-500"}`} />
                  {dbConnected ? "Firebase" : "Offline Mode"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-emerald-500" />
                  Google Drive Ready
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                Cloud Sync & Google Drive
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Sign in to save experiments, track challenges & export reports
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {currentUser ? (
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 text-xs font-semibold transition-all disabled:opacity-50"
            title="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        ) : (
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{loading ? "Signing in..." : "Sign in with Google"}</span>
          </button>
        )}
      </div>

      {error && (
        <div className="w-full mt-2 text-[11px] text-red-600 dark:text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
