// Custom hook for daily kural logic
import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "../store/authStore";
import { fetchKural } from "../services/kuralApi";
import {
  hasCompletedToday,
  getNextKuralToRead,
  saveDailyProgress,
} from "../services/firestoreService";
import type { Kural } from "../types";

interface UseDailyKuralReturn {
  kural: Kural | null;
  loading: boolean;
  error: string | null;
  hasCompletedDaily: boolean;
  kuralNumber: number;
  completeDailyKural: (note: string) => Promise<void>;
  refreshStatus: () => Promise<void>;
}

export const useDailyKural = (): UseDailyKuralReturn => {
  const { user, userData, refreshUserData } = useAuthStore();
  const [kural, setKural] = useState<Kural | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasCompletedDaily, setHasCompletedDaily] = useState(false);
  const [kuralNumber, setKuralNumber] = useState(1);

  const refreshStatus = useCallback(async () => {
    if (!user || !userData) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Check if user has completed today
      console.log("[useDailyKural] Calling hasCompletedToday...");
      const completed = await hasCompletedToday(user.uid);
      console.log("[useDailyKural] hasCompletedToday result:", completed);
      setHasCompletedDaily(completed);

      if (!completed) {
        // Get the next kural to read (handles missed days)
        console.log("[useDailyKural] Calling getNextKuralToRead...");
        const nextKural = await getNextKuralToRead(user.uid);
        console.log("[useDailyKural] nextKural result:", nextKural);
        setKuralNumber(nextKural);

        // Fetch the kural data
        console.log("[useDailyKural] Calling fetchKural...");
        const kuralData = await fetchKural(nextKural);
        console.log("[useDailyKural] fetchKural result success");
        setKural(kuralData);
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching daily kural:", err);
    } finally {
      setLoading(false);
    }
  }, [user, userData]);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  const completeDailyKural = async (note: string) => {
    if (!user || !kural) {
      throw new Error("Cannot complete: no user or kural data");
    }

    setLoading(true);
    try {
      await saveDailyProgress(
        user.uid,
        kural.number,
        kural.paal,
        kural.athigaram,
        note,
      );

      // Refresh user data and status
      await refreshUserData();
      setHasCompletedDaily(true);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    kural,
    loading,
    error,
    hasCompletedDaily,
    kuralNumber,
    completeDailyKural,
    refreshStatus,
  };
};
