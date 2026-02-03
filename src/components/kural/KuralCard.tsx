import React, { useState, useEffect } from "react";
import type { Kural } from "../../types";
import { useAuthStore } from "../../store/authStore";
import {
  saveKural,
  removeSavedKural,
  getSavedKurals,
} from "../../services/firestoreService";
import { Bookmark, BookmarkCheck, Volume2 } from "lucide-react";

interface KuralCardProps {
  kural: Kural;
  showDetails?: boolean;
}

const KuralCard: React.FC<KuralCardProps> = ({ kural, showDetails = true }) => {
  const { user } = useAuthStore();
  const [isSaved, setIsSaved] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const checkSaved = async () => {
      if (user) {
        const saved = await getSavedKurals(user.uid);
        setIsSaved(saved.some((s: any) => s.number === kural.number));
      }
    };
    checkSaved();
  }, [user, kural.number]);

  const handleSave = async () => {
    if (!user) {
      alert("Please login to save Kurals");
      return;
    }

    try {
      if (isSaved) {
        await removeSavedKural(user.uid, kural.number);
        setIsSaved(false);
      } else {
        await saveKural(user.uid, kural);
        setIsSaved(true);
      }
    } catch (error) {
      console.error("Error saving kural:", error);
    }
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${kural.line1}. ${kural.line2}. Explanation: ${kural.en}. Tamil Meaning: ${kural.urai1}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);

    // Try to find a female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (v) =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("woman") ||
        v.name.toLowerCase().includes("google uk english female"),
    );
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-bg-surface border-2 border-primary-500 md:p-8 p-4 shadow-premium hover-premium-scale transition-all animate-premium-fade">
   <div className=" mb-2">
        <div className="text-right md:hidden block">
            <p className="tamil-text text-primary-600 font-bold text-sm">
              {kural.paal}
            </p>
            <p className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">
              {kural.athigaram}
            </p>
          </div>
      </div>     
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary-500 text-white px-2 md:px-3 py-2 text-[9px] md:text-xs font-bold tracking-widest uppercase">
            குறள் {kural.number}
          </div>
          <button
            onClick={handleSpeak}
            className={`w-8 h-8 flex items-center justify-center border-2 border-primary-500 transition-all focus:outline-none ${isSpeaking ? "bg-primary-500 text-white" : "text-primary-500 hover:bg-primary-500 hover:text-white"}`}
            title="Listen to Kural"
          >
            <Volume2 size={16} />
          </button>
        </div>
        <div className="flex items-center gap-4">
         
          <div className="text-right hidden md:block">
            <p className="tamil-text text-primary-600 font-bold text-sm">
              {kural.paal}
            </p>
            <p className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">
              {kural.athigaram}
            </p>
          </div>
           <button
            onClick={handleSave}
            className={`text-primary-500 hover:scale-110 transition-transform ${isSaved ? "text-secondary-500" : ""}`}
            title={isSaved ? "Remove from saved" : "Save Kural"}
          >
            {isSaved ? (
              <BookmarkCheck size={24} fill="currentColor" />
            ) : (
              <Bookmark size={24} />
            )}
          </button>
        </div>
      </div>
   

      <div className="relative mb-8 text-center">
        <div className="absolute top-1/2 left-0 w-full h-px bg-primary-100 -z-10" />
        <div className="bg-bg-surface px-4 inline-block">
          <p className="tamil-text text-lg md:text-lg text-text-primary text-left font-bold leading-relaxed">
            {kural.line1}
          </p>
          <p className="tamil-text text-lg md:text-lg text-text-primary text-left font-bold leading-relaxed mt-2">
            {kural.line2}
          </p>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-6 pt-6 border-t border-border-soft">
          <div>
            <h4 className="text-[10px] font-bold text-secondary-500 uppercase tracking-[0.2em] mb-3">
              Sacred Translation
            </h4>
            <p className="text-text-primary text-base leading-relaxed font-medium italic">
              {kural.en}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-bg-main p-4 border-l-2 border-accent-500">
              <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">
                Traditional Meaning
              </h4>
              <p className="tamil-text text-text-secondary text-sm leading-relaxed">
                {kural.urai1}
              </p>
              <p className="text-[10px] text-primary-600 font-bold uppercase mt-2">
                — {kural.urai1Author}
              </p>
            </div>
            <div className="bg-bg-main p-4 border-l-2 border-primary-500">
              <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2">
                Modern Context
              </h4>
              <p className="tamil-text text-text-secondary text-sm leading-relaxed">
                {kural.urai2}
              </p>
              <p className="text-[10px] text-primary-600 font-bold uppercase mt-2">
                — {kural.urai2Author}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KuralCard;
