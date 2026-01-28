import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  increment,
} from "firebase/firestore";
import { db } from "./firebase";
import type { UserData, DailyProgress } from "../types";
import { getTodayIST, parseFirestoreTimestamp } from "../utils/dateUtils";

/**
 * Create or update user document (idempotent)
 */
export const createUserDocument = async (
  uid: string,
  email: string,
): Promise<UserData> => {
  const userRef = doc(db, "users", uid);

  const userData: UserData = {
    uid,
    email,
    signupDate: new Date(),
    currentKuralIndex: 1,
    completedDays: 0,
    streak: 0,
  };

  await setDoc(
    userRef,
    {
      ...userData,
      signupDate: Timestamp.now(),
    },
    { merge: true },
  );

  return userData;
};

/**
 * Get user data
 */
export const getUserData = async (uid: string): Promise<UserData | null> => {
  const userRef = doc(db, "users", uid);
  console.log(`[FirestoreService] Fetching user data for: ${uid}`);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    console.log(`[FirestoreService] User data not found for: ${uid}`);
    return null;
  }

  const data = snap.data();

  return {
    uid: data.uid,
    email: data.email,
    signupDate: parseFirestoreTimestamp(data.signupDate),
    currentKuralIndex: data.currentKuralIndex,
    completedDays: data.completedDays,
    streak: data.streak,
  };
};

/**
 * Check if user completed today
 */
export const hasCompletedToday = async (uid: string): Promise<boolean> => {
  const today = getTodayIST();
  const ref = doc(db, "dailyProgress", `${uid}_${today}`);
  console.log(
    `[FirestoreService] Checking today's completion for: ${uid} (ID: ${uid}_${today})`,
  );
  const snap = await getDoc(ref);
  return snap.exists();
};

/**
 * Get next kural to read
 */
export const getNextKuralToRead = async (uid: string): Promise<number> => {
  const user = await getUserData(uid);
  if (!user) throw new Error("User not found");
  return user.completedDays + 1;
};

/**
 * Save daily progress
 */
export const saveDailyProgress = async (
  uid: string,
  kuralNumber: number,
  paal: string,
  adhigaram: string,
  note: string,
): Promise<void> => {
  const today = getTodayIST();
  const progressId = `${uid}_${today}`;

  const progressRef = doc(db, "dailyProgress", progressId);

  await setDoc(progressRef, {
    uid,
    date: today,
    kuralNumber,
    paal,
    adhigaram,
    note,
    completedAt: Timestamp.now(),
  });

  const userRef = doc(db, "users", uid);
  const userData = await getUserData(uid);

  if (!userData) throw new Error("User not found");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayIST = yesterday.toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });

  const yesterdayRef = doc(db, "dailyProgress", `${uid}_${yesterdayIST}`);
  const yesterdaySnap = await getDoc(yesterdayRef);

  const newStreak = yesterdaySnap.exists() ? userData.streak + 1 : 1;

  await updateDoc(userRef, {
    currentKuralIndex: kuralNumber + 1,
    completedDays: increment(1),
    streak: newStreak,
  });
};

/**
 * Get all daily progress
 */
export const getAllDailyProgress = async (
  uid: string,
): Promise<DailyProgress[]> => {
  console.log(`[FirestoreService] Querying all progress for: ${uid}`);
  const q = query(collection(db, "dailyProgress"), where("uid", "==", uid));

  const snap = await getDocs(q);

  return snap.docs
    .map((d) => {
      const data = d.data();
      return {
        uid: data.uid,
        date: data.date,
        kuralNumber: data.kuralNumber,
        paal: data.paal,
        adhigaram: data.adhigaram,
        note: data.note,
        completedAt: parseFirestoreTimestamp(data.completedAt),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
};

/**
 * Get completed dates (heatmap)
 */
export const getCompletedDates = async (uid: string): Promise<string[]> => {
  const progress = await getAllDailyProgress(uid);
  return progress.map((p) => p.date);
};
