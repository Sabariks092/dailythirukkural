// Search Page - Browse and search all Kurals
import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useDailyKural } from "../hooks/useDailyKural";
import { fetchKural } from "../services/kuralApi";
import type { Kural } from "../types";
import KuralCard from "../components/kural/KuralCard";

const SearchPage: React.FC = () => {
  const { hasCompletedDaily } = useDailyKural();
  const [kurals, setKurals] = useState<Kural[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPaal, setSelectedPaal] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [kuralNumberInput, setKuralNumberInput] = useState<number>(1);

  const kuralPerPage = 10;

  // Fetch kurals for current page
  useEffect(() => {
    const loadKurals = async () => {
      setLoading(true);
      const start = (currentPage - 1) * kuralPerPage + 1;
      const end = Math.min(start + kuralPerPage - 1, 1330);

      const fetchedKurals: Kural[] = [];
      for (let i = start; i <= end; i++) {
        try {
          const kural = await fetchKural(i);
          fetchedKurals.push(kural);
        } catch (error) {
          console.error(`Failed to fetch kural ${i}`);
        }
      }

      setKurals(fetchedKurals);
      setLoading(false);
    };

    loadKurals();
  }, [currentPage]);

  // Fetch single kural by number
  const handleFetchKural = async () => {
    if (kuralNumberInput < 1 || kuralNumberInput > 1330) return;

    setLoading(true);
    try {
      const kural = await fetchKural(kuralNumberInput);
      setKurals([kural]);
    } catch (error) {
      console.error("Failed to fetch kural");
    }
    setLoading(false);
  };

  const totalPages = Math.ceil(1330 / kuralPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-bg-main">
      <Navbar hasCompletedDaily={hasCompletedDaily} />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-16">
        {/* Header Section with 03_kural_search content */}
        <div className="mb-16 animate-premium-fade">
          <p className="text-secondary-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
            WISDOM SEARCH • ஞானத் தேடல்
          </p>
          <h1 className="tamil-text text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
            குறள் தேடல் - ஞானத் தேடலுக்கான ஒரு கருவி
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <p className="tamil-text text-text-secondary text-lg leading-relaxed">
              திருக்குறள் என்பது 1330 முத்துக்களைக் கொண்ட ஒரு மாபெரும் கடல்.
              அந்தக் கடலில் உங்களுக்குத் தேவையான முத்துக்களை எளிதாகக் கண்டறிய
              "குறள் தேடல்" பகுதி வடிவமைக்கப்பட்டுள்ளது. உங்களுக்கு ஒரு
              குறிப்பிட்ட வாழ்க்கைப் பிரச்சினைக்குத் தீர்வு வேண்டுமா அல்லது ஒரு
              குறிப்பிட்ட பண்பைப் பற்றி அறிய வேண்டுமா? தேடல் கருவி உங்களுக்குத்
              துணையாக இருக்கும்.
            </p>
            <div className="bg-bg-surface p-6 border-l-4 border-primary-500 shadow-sm">
              <h4 className="tamil-text text-lg font-bold text-text-primary mb-3">
                தேடல் செயல்பாட்டு வழிகாட்டி
              </h4>
              <ul className="tamil-text text-text-secondary text-sm space-y-2">
                <li>
                  • <strong>சொல் தேடல்</strong>: ஒரு குறிப்பிட்ட சொல் மூலம்
                  தேடலாம்.
                </li>
                <li>
                  • <strong>எண் தேடல்</strong>: நேரடியாக குறள் எண் மூலம்
                  சென்றடையலாம்.
                </li>
                <li>
                  • <strong>அதிகாரப் பெயர்</strong>: அதிகாரத்தில் உள்ள குறள்களை
                  ஒருசேரக் காணலாம்.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Search & Filters Controls */}
        <div className="bg-bg-surface border-2 border-primary-500 p-8 shadow-premium mb-12 animate-premium-fade">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kural Number Search */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">
                Jump to Kural Number
              </label>
              <div className="flex gap-0">
                <input
                  type="number"
                  min={1}
                  max={1330}
                  value={kuralNumberInput}
                  onChange={(e) =>
                    setKuralNumberInput(parseInt(e.target.value) || 1)
                  }
                  className="flex-1 px-4 py-3 border-2 border-border-soft focus:border-primary-500 outline-none transition-all font-bold"
                  placeholder="1-1330"
                />
                <button
                  onClick={handleFetchKural}
                  className="px-6 py-3 bg-primary-500 text-white font-bold hover:bg-primary-600 transition-all uppercase text-xs tracking-widest"
                >
                  GO
                </button>
              </div>
            </div>

            {/* Text Search */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">
                Full Text Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="tamil-text w-full px-4 py-3 border-2 border-border-soft focus:border-primary-500 outline-none transition-all"
                placeholder="தேடல்... (Search Tamil/English)"
              />
            </div>

            {/* Paal Filter */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">
                Filter by Category
              </label>
              <select
                value={selectedPaal}
                onChange={(e) => setSelectedPaal(e.target.value)}
                className="tamil-text w-full px-4 py-3 border-2 border-border-soft focus:border-primary-500 outline-none transition-all font-bold appearance-none bg-white"
              >
                <option value="all">அனைத்தும் (All Categories)</option>
                <option value="aram">அறத்துப்பால் (Virtue)</option>
                <option value="porul">பொருட்பால் (Wealth)</option>
                <option value="inbam">இன்பத்துப்பால் (Love)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="space-y-12 mb-16">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-12 h-12 mx-auto mb-4 border-4 border-primary-500 border-t-transparent animate-spin" />
              <p className="tamil-text text-text-secondary font-bold uppercase tracking-widest text-xs">
                தரவுகளைத் திரட்டுகிறது...
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {kurals.map((kural) => (
                <KuralCard key={kural.number} kural={kural} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {kurals.length > 1 && !loading && (
          <div className="flex items-center justify-center gap-4 py-8 border-t border-border-soft">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-8 py-3 border-2 border-primary-500 text-primary-500 font-bold hover:bg-primary-500 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary-500 transition-all uppercase text-xs tracking-widest"
            >
              Previous
            </button>

            <div className="px-6 py-3 bg-bg-main border-2 border-border-soft text-text-primary font-bold text-xs uppercase tracking-widest">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-8 py-3 border-2 border-primary-500 text-primary-500 font-bold hover:bg-primary-500 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary-500 transition-all uppercase text-xs tracking-widest"
            >
              Next
            </button>
          </div>
        )}

        {/* Exploration mode disclaimer */}
        <div className="mt-16 bg-accent-500/10 border-l-4 border-accent-500 p-6">
          <p className="tamil-text text-accent-500 text-sm font-bold">
            📢 "இது ஞானத் தேடல் பகுதி. இங்குப் படிப்பது உங்களது தினசரி
            முன்னேற்றத்தில் கணக்கிடப்படாது."
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
