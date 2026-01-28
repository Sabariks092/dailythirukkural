export interface UserData {
  uid: string;
  email: string;
  signupDate: Date;
  currentKuralIndex: number;
  completedDays: number;
  streak: number;
}

export interface DailyProgress {
  uid: string;
  date: string;
  kuralNumber: number;
  paal: string;
  adhigaram: string;
  note: string;
  completedAt: Date;
}

export interface Kural {
  number: number;
  paal: string;
  iyal: string;
  athigaram: string;
  line1: string;
  line2: string;
  en: string;
  translation: string;
  urai1: string;
  urai1Author: string;
  urai2: string;
  urai2Author: string;
  urai3: string;
  urai3Author: string;
}

export interface AnalyticsData {
  totalCompleted: number;
  currentStreak: number;
  missedDays: number;
  completionPercentage: number;
  paalProgress: {
    aram: number;
    porul: number;
    inbam: number;
  };
  dailyProgressList: DailyProgress[];
}
