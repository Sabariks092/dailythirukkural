// Non-closable Daily Kural Modal Component
import React, { useState, useEffect } from "react";
import type { Kural } from "../../types";

interface DailyKuralModalProps {
  kural: Kural;
  kuralNumber: number;
  onComplete: (note: string) => Promise<void>;
  loading: boolean;
}

const DailyKuralModal: React.FC<DailyKuralModalProps> = ({
  kural,
  kuralNumber,
  onComplete,
  loading,
}) => {
  const [hasRead, setHasRead] = useState(false);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent page navigation and closing
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "You must complete your daily Kural reading before leaving.";
      return e.returnValue;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("keydown", handleKeyDown);

    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleSubmit = async () => {
    if (!hasRead) {
      setError("Please confirm you have read and understood the Kural");
      return;
    }
    if (note.trim().length < 10) {
      setError("Please write at least 10 characters of reflection");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await onComplete(note.trim());
    } catch (err: any) {
      setError(err.message || "Failed to save progress");
      setSubmitting(false);
    }
  };

  const isValid = hasRead && note.trim().length >= 10;

  return (
    <div
      className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center p-4 bg-slate-900/90"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-bg-surface border-t-8 border-primary-500 shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto animate-premium-fade"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="p-8 border-b border-border-soft bg-bg-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-secondary-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                DAILY DISCIPLINE • தினசரி ஒழுக்கம்
              </p>
              <h2 className="display text-text-primary leading-none">
                Kural {kuralNumber}
              </h2>
            </div>
            <div className="md:text-right">
              <p className="tamil-text text-primary-600 font-bold text-lg mb-1">
                {kural.paal}
              </p>
              <p className="text-text-secondary text-sm font-medium uppercase tracking-wider">
                {kural.athigaram}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-10">
          {/* Tamil Verse with Artisan Feel */}
          <div className="relative group">
            <div className="absolute -left-4 top-0 w-1 h-full bg-primary-500/20 group-hover:bg-primary-500 transition-colors" />
            <div className="pl-6 py-2">
              <p className="tamil-text text-2xl md:text-3xl text-text-primary font-medium italic leading-relaxed">
                "{kural.line1}"
              </p>
              <p className="tamil-text text-2xl md:text-3xl text-text-primary font-medium italic leading-relaxed mt-3">
                "{kural.line2}"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* English Translation */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest border-b border-border-soft pb-2">
                The Sacred Verse (English)
              </h3>
              <p className="text-text-primary text-base leading-relaxed font-medium italic">
                {kural.en}
              </p>
            </div>

            {/* Explanation */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest border-b border-border-soft pb-2">
                Deep Explanation
              </h3>
              <p className="tamil-text text-text-secondary text-sm leading-relaxed">
                {kural.urai2}
              </p>
              <p className="text-[10px] text-primary-600 font-bold uppercase tracking-tighter">
                — {kural.urai2Author}
              </p>
            </div>
          </div>

          {/* Action Section */}
          <div className="bg-bg-main p-8 border border-border-soft space-y-6">
            <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest text-center">
              Reflection & Commitment
            </h3>

            <div className="space-y-4">
              <label className="flex items-start gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={hasRead}
                  onChange={(e) => setHasRead(e.target.checked)}
                  className="mt-1 w-6 h-6 border-2 border-primary-500 text-primary-500 focus:ring-primary-500 cursor-pointer"
                />
                <span className="tamil-text text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                  நான் இந்தத் திருக்குறளை ஆழ்ந்து கவனித்துப் படித்தேன். இதன்
                  பொருளை எனது இன்றைய வாழ்வில் கடைப்பிடிப்பேன் என்று உறுதி
                  கூறுகிறேன்.
                </span>
              </label>

              <div className="space-y-2">
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="இன்றைய சிந்தனை... (What does this Kural mean to you?)"
                  className="tamil-text w-full px-4 py-4 border-2 border-border-soft bg-white focus:border-primary-500 outline-none transition-all resize-none min-h-[120px]"
                />
                <div className="flex justify-between items-center px-1">
                  <p className="text-[10px] text-text-secondary font-bold uppercase">
                    Min. 10 characters required
                  </p>
                  <p
                    className={`text-[10px] font-bold uppercase ${note.length >= 10 ? "text-accent-500" : "text-secondary-500"}`}
                  >
                    {note.length} / 10
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-secondary-500/10 border-l-4 border-secondary-500 p-4 text-secondary-500 text-xs font-bold uppercase tracking-wider">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isValid || submitting || loading}
              className={`w-full py-5 text-sm font-bold uppercase tracking-[0.2em] transition-all ${
                isValid
                  ? "bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]"
                  : "bg-border-soft text-text-secondary cursor-not-allowed"
              }`}
            >
              {submitting ? "RECORDING PROGRESS..." : "COMPLETE DAILY READING"}
            </button>
          </div>

          <p className="text-center text-text-secondary text-[10px] uppercase font-bold tracking-widest">
            This module is mandatory to unlock exploration
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyKuralModal;
