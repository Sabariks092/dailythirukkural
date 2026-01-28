// Custom hook for analytics data
import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "../store/authStore";
import { getAllDailyProgress } from "../services/firestoreService";
import { getDayNumber } from "../utils/dateUtils";
import { getKuralPaalCategory } from "../services/kuralApi";
import type { AnalyticsData } from "../types";

interface UseAnalyticsReturn {
  analytics: AnalyticsData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const { user, userData, initialized } = useAuthStore();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateAnalytics = useCallback(async () => {
    if (!initialized || !user || !userData) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const progressList = await getAllDailyProgress(user.uid);

      const totalCompleted = progressList.length;
      const completionPercentage = (totalCompleted / 1330) * 100;

      const dayNumber = getDayNumber(userData.signupDate);
      const missedDays = Math.max(0, dayNumber - totalCompleted);

      const paalProgress = {
        aram: 0,
        porul: 0,
        inbam: 0,
      };

      progressList.forEach((progress) => {
        const category = getKuralPaalCategory(progress.kuralNumber);
        paalProgress[category]++;
      });

      setAnalytics({
        totalCompleted,
        currentStreak: userData.streak,
        missedDays,
        completionPercentage,
        paalProgress,
        dailyProgressList: progressList,
      });
    } catch (err: any) {
      console.error("Error calculating analytics:", err);
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, [initialized, user, userData]);

  useEffect(() => {
    calculateAnalytics();
  }, [calculateAnalytics]);

  return {
    analytics,
    loading,
    error,
    refresh: calculateAnalytics,
  };
};
