import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useDailyKural } from "../hooks/useDailyKural";
import KuralCard from "../components/kural/KuralCard";

const SavedKuralsPage: React.FC = () => {
  const { hasCompletedDaily } = useDailyKural();

  // Note: Functionality follows existing codebase patterns
  // Placeholder for saved kurals logic (to be integrated with actual bookmarking)
  const savedKurals: any[] = [];

  return (
    <div className="min-h-screen flex flex-col bg-bg-main">
      <Navbar hasCompletedDaily={hasCompletedDaily} />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-16">
        {/* Header Section with 04_saved_kurals content */}
        <div className="mb-16 animate-premium-fade text-center">
          <p className="text-secondary-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
            PERSONAL TREASURY • சிந்தனைக் கருவூலம்
          </p>
          <h1 className="tamil-text text-4xl md:text-5xl font-bold text-text-primary mb-8 leading-tight">
            சேமித்த குறள்கள் - உங்கள் சிந்தனைக் கருவூலம்
          </h1>
          <p className="tamil-text text-text-secondary text-lg leading-relaxed max-w-3xl mx-auto">
            திருக்குறளைப் படிக்கும்போது, சில வரிகள் உங்கள் மனதிற்கு மிகவும்
            நெருக்கமானதாக இருக்கலாம். அத்தகைய அரிய வரிகளை மீண்டும் மீண்டும்
            படித்து இன்புறவும், அவற்றை உங்கள் வாழ்வின் அங்கமாக்கிக்கொள்ளவும்
            "சேமித்த குறள்கள்" பகுதி உதவுகிறது.
          </p>
        </div>

        {/* Benefits Grid Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 animate-premium-fade"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="bg-bg-surface p-10 border border-border-soft shadow-premium text-center">
            <div className="text-3xl mb-4">📖</div>
            <h4 className="tamil-text font-bold text-text-primary mb-3">
              மறுவாசிப்பு
            </h4>
            <p className="tamil-text text-text-secondary text-sm leading-relaxed">
              ஓய்வு நேரங்களில் உங்களுக்குப் பிடித்த குறள்களை மட்டும் தனியாகப்
              படித்து உங்கள் மனதைச் செம்மைப்படுத்தலாம்.
            </p>
          </div>
          <div className="bg-bg-surface p-10 border border-border-soft shadow-premium text-center">
            <div className="text-3xl mb-4">✍️</div>
            <h4 className="tamil-text font-bold text-text-primary mb-3">
              குறிப்புகள்
            </h4>
            <p className="tamil-text text-text-secondary text-sm leading-relaxed">
              உண்பது, உறங்குவது என உங்கள் உரைகளிலோ அல்லது கடிதங்களிலோ மேற்கோள்
              காட்டத் தேவையான குறள்களை எளிதாகக் கண்டறியலாம்.
            </p>
          </div>
          <div className="bg-bg-surface p-10 border border-border-soft shadow-premium text-center">
            <div className="text-3xl mb-4">🛡️</div>
            <h4 className="tamil-text font-bold text-text-primary mb-3">
              வழிகாட்டுதல்
            </h4>
            <p className="tamil-text text-text-secondary text-sm leading-relaxed">
              உங்கள் வாழ்வின் சவால்களின் போது, அது தொடர்பாக நீங்கள் சேமித்த
              குறள்கள் உங்களுக்குத் துணிவைத் தரும்.
            </p>
          </div>
        </div>

        {/* Saved Items List */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-12 border-b-2 border-primary-500 pb-4">
            <h2 className="display text-text-primary">Your Collection</h2>
            <div className="text-xs font-bold text-text-secondary uppercase tracking-widest">
              {savedKurals.length} Items Saved
            </div>
          </div>

          {savedKurals.length > 0 ? (
            <div className="space-y-12">
              {savedKurals.map((kural) => (
                <KuralCard key={kural.number} kural={kural} />
              ))}
            </div>
          ) : (
            <div className="bg-bg-surface border-2 border-dashed border-border-soft py-24 text-center animate-premium-fade">
              <div className="text-6xl mb-6 opacity-30">🔖</div>
              <h3 className="tamil-text text-2xl font-bold text-text-secondary mb-4">
                இன்னும் குறள்கள் எவையும் சேமிக்கப்படவில்லை
              </h3>
              <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-8">
                Go to Search to start building your treasury
              </p>
              <a
                href="/search"
                className="inline-block px-12 py-4 bg-primary-500 text-white font-bold uppercase tracking-widest text-xs hover:bg-primary-600 transition-all"
              >
                DISCOVER KURALS
              </a>
            </div>
          )}
        </div>

        {/* Social Sharing Concept */}
        <div
          className="bg-bg-main p-12 border border-border-soft animate-premium-fade"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="text-center mb-12">
            <h3 className="tamil-text text-2xl font-bold text-text-primary">
              பகிர்தல் - உலகெங்கும் வள்ளுவம்
            </h3>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mt-2">
              Spread the wisdom of the celestial poet
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="px-8 py-4 bg-white border border-border-soft flex items-center gap-3">
              <span className="text-green-500 font-bold">WhatsApp</span>
            </div>
            <div className="px-8 py-4 bg-white border border-border-soft flex items-center gap-3">
              <span className="text-blue-400 font-bold">Twitter</span>
            </div>
            <div className="px-8 py-4 bg-white border border-border-soft flex items-center gap-3">
              <span className="text-gray-600 font-bold">Mailing</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SavedKuralsPage;
