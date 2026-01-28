import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";
import {
  createUserDocument,
  getUserData,
} from "../services/firestoreService";
import type { UserData } from "../types";

interface AuthState {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;

  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshUserData: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userData: null,
  loading: true,
  error: null,
  initialized: false,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const userData = await getUserData(res.user.uid);

      set({
        user: res.user,
        userData,
        loading: false,
      });
    } catch (e: any) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  signup: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const userData = await createUserDocument(
        res.user.uid,
        res.user.email || email,
      );

      set({
        user: res.user,
        userData,
        loading: false,
      });
    } catch (e: any) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  googleSignIn: async () => {
    set({ loading: true, error: null });
    try {
      const res = await signInWithPopup(auth, googleProvider);

      let userData = await getUserData(res.user.uid);

      if (!userData) {
        userData = await createUserDocument(
          res.user.uid,
          res.user.email || "",
        );
      }

      set({
        user: res.user,
        userData,
        loading: false,
      });
    } catch (e: any) {
      set({ error: e.message, loading: false });
      throw e;
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    await signOut(auth);
    set({
      user: null,
      userData: null,
      loading: false,
    });
  },

  clearError: () => set({ error: null }),

  refreshUserData: async () => {
    const { user } = get();
    if (!user) return;

    const userData = await getUserData(user.uid);
    set({ userData });
  },
}));

/**
 * Auth initialization (CRITICAL FIX)
 */
export const initializeAuth = () => {
  console.log("Initializing auth...");

  onAuthStateChanged(auth, async (user) => {
    console.log(
      "Auth state changed:",
      user ? "logged in" : "logged out",
    );

    if (!user) {
      useAuthStore.setState({
        user: null,
        userData: null,
        loading: false,
        initialized: true,
      });
      return;
    }

    try {
      let userData = await getUserData(user.uid);

      if (!userData) {
        userData = await createUserDocument(
          user.uid,
          user.email || "",
        );
      }

      useAuthStore.setState({
        user,
        userData,
        loading: false,
        initialized: true,
      });
    } catch (error) {
      console.error("Firestore error:", error);

      // IMPORTANT: user stays logged in
      useAuthStore.setState({
        user,
        userData: null,
        loading: false,
        initialized: true,
        error: "Failed to load user profile",
      });
    }
  });
};
