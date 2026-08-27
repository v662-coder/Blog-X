import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Firebase persists sessions in IndexedDB/localStorage by default, but
    // we set it explicitly so "stay signed in across refreshes/tabs" is
    // guaranteed rather than incidental.
    setPersistence(auth, browserLocalPersistence).catch(() => {
      // Non-fatal — falls back to Firebase's default persistence.
    });

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setAuthLoading(false);
      },
      (err) => {
        setAuthError(err.message);
        setAuthLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      return true;
    } catch (err) {
      setAuthError(readableAuthError(err));
      return false;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setAuthError(readableAuthError(err));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, authLoading, authError, setAuthError, signInWithGoogle, signOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function readableAuthError(err) {
  const code = err?.code || "";
  if (code.includes("popup-closed-by-user")) return "Sign-in was cancelled before it finished.";
  if (code.includes("network-request-failed")) return "Network error — check your connection and try again.";
  if (code.includes("popup-blocked")) return "Your browser blocked the sign-in popup. Allow popups for this site.";
  return "Couldn't sign you in. Please try again.";
}

export const useAuth = () => useContext(AuthContext);
