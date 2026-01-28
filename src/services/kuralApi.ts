// API service for fetching Thirukkural data
import type { Kural } from "../types";

const API_BASE_URL = "https://getthirukural.appspot.com/api/3.0/kural";
const APP_ID = "jylv59qw8ivct";

/**
 * Fetch a single Kural by number (1-1330)
 */
export const fetchKural = async (kuralNumber: number): Promise<Kural> => {
  if (kuralNumber < 1 || kuralNumber > 1330) {
    throw new Error("Kural number must be between 1 and 1330");
  }

  const response = await fetch(
    `${API_BASE_URL}/${kuralNumber}?appid=${APP_ID}&format=json`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Kural ${kuralNumber}`);
  }

  const data = await response.json();

  return {
    number: data.number,
    paal: data.paal,
    iyal: data.iyal,
    athigaram: data.athigaram,
    line1: data.line1,
    line2: data.line2,
    en: data.en,
    translation: data.translation,
    urai1: data.urai1,
    urai1Author: data.urai1Author,
    urai2: data.urai2,
    urai2Author: data.urai2Author,
    urai3: data.urai3,
    urai3Author: data.urai3Author,
  };
};

/**
 * Fetch multiple Kurals (for Read More page)
 */
export const fetchKuralRange = async (
  start: number,
  end: number,
): Promise<Kural[]> => {
  const kurals: Kural[] = [];

  for (let i = start; i <= end; i++) {
    try {
      const kural = await fetchKural(i);
      kurals.push(kural);
    } catch (error) {
      console.error(`Failed to fetch Kural ${i}:`, error);
    }
  }

  return kurals;
};

/**
 * Get Paal name in English
 */
export const getPaalName = (paal: string): string => {
  const paalMap: Record<string, string> = {
    அறத்துப்பால்: "Aram (Virtue)",
    பொருட்பால்: "Porul (Wealth)",
    இன்பத்துப்பால்: "Inbam (Love)",
    காமத்துப்பால்: "Inbam (Love)",
  };
  return paalMap[paal] || paal;
};

/**
 * Get Paal category for analytics
 * Aram: 1-380, Porul: 381-1080, Inbam: 1081-1330
 */
export const getKuralPaalCategory = (
  kuralNumber: number,
): "aram" | "porul" | "inbam" => {
  if (kuralNumber <= 380) return "aram";
  if (kuralNumber <= 1080) return "porul";
  return "inbam";
};

/**
 * Get Adhigaram number from Kural number
 */
export const getAdhigaramNumber = (kuralNumber: number): number => {
  return Math.ceil(kuralNumber / 10);
};
