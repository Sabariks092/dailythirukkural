import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useDailyKural } from "../hooks/useDailyKural";

const AboutPage: React.FC = () => {
  const { hasCompletedDaily } = useDailyKural();

  return (
    <div className="min-h-screen flex flex-col bg-bg-main">
      <Navbar hasCompletedDaily={hasCompletedDaily} />

      <main className="flex-1">
        {/* Artistic Hero Section */}
        <section className="bg-bg-surface border-b border-border-soft overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/4 h-full bg-primary-500/5 -skew-x-12 translate-x-1/4" />

          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative text-center">
            <div className="animate-premium-fade">
              <p className="text-secondary-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                OUR MISSION • எமது நோக்கம்
              </p>
              <h1 className="tamil-text text-4xl md:text-5xl font-bold text-text-primary mb-8 leading-tight">
                நம்மைப் பற்றி - தமிழால் இணைந்த இளைய உள்ளங்கள்
              </h1>
              <p className="tamil-text text-text-secondary text-xl font-medium leading-relaxed max-w-2xl mx-auto italic border-l-4 border-primary-500 pl-6 text-left">
                "திருக்குறள் என்பது தமிழரின் அடையாளம் மட்டுமல்ல, அது உலகப்
                பொதுவான வாழ்வியல் நீதி."
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div className="animate-premium-fade">
              <h2 className="display text-text-primary mb-8">எமது நோக்கம்</h2>
              <p className="tamil-text text-text-secondary text-lg leading-relaxed mb-6">
                எம்முடைய தலையாய நோக்கம், திருக்குறளை ஒரு புத்தகமாக மட்டும்
                வைக்காமல், அதை எல்லோருடைய கைப்பேசியிலும் அன்றாட வாழ்வின்
                வழிகாட்டியாகவும் மாற்றுவதாகும்.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-1 h-12 bg-primary-500 mt-1" />
                  <div>
                    <h4 className="tamil-text font-bold text-text-primary">
                      டிஜிட்டல் மயமாக்கம்
                    </h4>
                    <p className="tamil-text text-text-secondary text-sm">
                      திருக்குறளின் 1330 குறள்களையும் தெளிவான விளக்கங்களுடன்
                      இணையம் வழியாக எளிமையாக கிடைக்கச் செய்தல்.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-1 h-12 bg-secondary-500 mt-1" />
                  <div>
                    <h4 className="tamil-text font-bold text-text-primary">
                      அன்றாட ஒழுக்கம்
                    </h4>
                    <p className="tamil-text text-text-secondary text-sm">
                      ஒவ்வொரு நாளும் ஒரு குறளைப் படிக்கும் பழக்கத்தை
                      இளைஞர்களிடையே உருவாக்குதல்.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div
              className="animate-premium-fade"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-bg-surface p-10 border-2 border-primary-500 shadow-premium relative">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-500 flex items-center justify-center text-white text-2xl font-bold">
                  த
                </div>
                <h3 className="tamil-text text-2xl font-bold text-text-primary mb-6">
                  குழு அறிமுகம்
                </h3>
                <p className="tamil-text text-text-secondary text-sm leading-relaxed">
                  நாங்கள் தமிழை நேசிக்கும் இளைய தொழில்நுட்பக் கலைஞர்கள்.
                  மென்பொருள் உருவாக்கம் (Software Development) மற்றும் தமிழ்
                  இலக்கியம் ஆகிய இரண்டின் மீதும் கொண்ட காதலால் இந்தப் பணியைத்
                  தொடங்கியுள்ளோம்.
                </p>
                <p className="tamil-text text-text-secondary text-sm leading-relaxed mt-4">
                  தமிழ்க் கலாச்சாரத்தின் விழுமியங்களை மாறாமல் காப்பதும், அதே
                  சமயம் உலகத்தரம் வாய்ந்த தொழில்நுட்பத்தைப் பயன்படுத்தி ஒரு
                  சிறந்த பயனர் அனுபவத்தைத் தருவதும் எங்களது இலக்காகும்.
                </p>
              </div>
            </div>
          </div>

          <div
            className="animate-premium-fade border-t-2 border-primary-500 pt-16"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="display text-text-primary mb-8 text-center">
              உண்மையான கலாச்சாரப் பாதுகாப்பு
            </h2>
            <div className="bg-bg-main p-10 border border-border-soft">
              <p className="tamil-text text-text-secondary text-lg leading-relaxed text-center mb-8">
                காலங்கள் மாறினாலும் தமிழ் மொழியின் செழுமை மாறாமல் இருக்க
                வேண்டும் என்பதில் நாங்கள் உறுதியாக இருக்கிறோம். ஆங்கிலக்
                கலப்பின்றி, தூய தமிழ் நடையில் உள்ளடக்கங்களை வழங்க நாங்கள்
                கடமைப்பட்டுள்ளோம்.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-text-primary uppercase tracking-[0.4em]">
                    Language
                  </p>
                  <p className="tamil-text font-bold text-primary-500 text-xl">
                    தூய தமிழ்
                  </p>
                </div>
                <div className="w-px h-12 bg-border-soft hidden md:block" />
                <div className="text-center">
                  <p className="text-[10px] font-bold text-text-primary uppercase tracking-[0.4em]">
                    Culture
                  </p>
                  <p className="tamil-text font-bold text-primary-500 text-xl">
                    வள்ளுவம்
                  </p>
                </div>
                <div className="w-px h-12 bg-border-soft hidden md:block" />
                <div className="text-center">
                  <p className="text-[10px] font-bold text-text-primary uppercase tracking-[0.4em]">
                    Tech
                  </p>
                  <p className="tamil-text font-bold text-primary-500 text-xl">
                    நவீனReact
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cultural Context Section from 02_daily_kural.md */}
        <section className="max-w-7xl mx-auto px-4 py-24 border-t border-border-soft">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="animate-premium-fade">
              <h2 className="display text-text-primary mb-8 underline decoration-primary-500 underline-offset-8">
                தெய்வப்புலவர் திருவள்ளுவர்
              </h2>
              <p className="tamil-text text-text-secondary text-sm leading-relaxed mb-6">
                திருக்குறளைத் தந்த வள்ளுவப் பெருந்தகை, உலகத்தால் போற்றப்படும்
                ஒரு மேதை. அவர் வாழ்ந்த காலம் ஏறத்தாழ இரண்டாயிரம் ஆண்டுகளுக்கு
                முற்பட்டது என்று ஆய்வாளர்கள் கருதுகின்றனர். மதம், இனம், மொழி என
                அனைத்து எல்லைகளையும் கடந்து, "மனிதம்" ஒன்றை மட்டுமே உயர்த்திப்
                பிடித்தவர் அவர்.
              </p>
              <div className="bg-bg-surface p-6 border-2 border-border-soft italic shadow-sm">
                <p className="tamil-text text-text-primary text-xs font-bold leading-relaxed">
                  "அவர் வழங்கிய 1330 குறள்களும் வாழ்வின் அத்தனைப்
                  பரிமாணங்களையும் தொட்டுச் செல்கின்றன. அறம், பொருள், இன்பம் என
                  அனைத்திலும் வள்ளுவர் காட்டிய வழி உங்களுக்கு வெற்றியைத் தரும்."
                </p>
              </div>
            </div>

            <div
              className="animate-premium-fade"
              style={{ animationDelay: "0.1s" }}
            >
              <h2 className="display text-text-primary mb-8 underline decoration-secondary-500 underline-offset-8">
                நவீன உலகிற்குப் பொருத்தம்
              </h2>
              <p className="tamil-text text-text-secondary text-sm leading-relaxed mb-6">
                இன்றைய வேகமான இயந்திர உலகில் தேவையற்ற மன அழுத்தமும்
                குழப்பங்களும் பெருகியுள்ளன. இதற்கு மருந்தாக வள்ளுவம் அமைகிறது.
                காலம் மாறினாலும், மனித உணர்வுகள் மாறுவதில்லை. அன்பு, பொறுமை,
                கல்வி, உழைப்பு போன்ற வள்ளுவரின் கருத்துக்கள் இன்றும் நமக்கு
                மிகவும் தேவைப்படுபவை.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 font-bold">
                    1
                  </div>
                  <p className="tamil-text text-text-primary text-xs font-bold">
                    அலுவலகப் பணி மற்றும் மேலாண்மை
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 font-bold">
                    2
                  </div>
                  <p className="tamil-text text-text-primary text-xs font-bold">
                    குடும்ப உறவுகள் மற்றும் சமூகம்
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 font-bold">
                    3
                  </div>
                  <p className="tamil-text text-text-primary text-xs font-bold">
                    தனிநபர் ஒழுக்கம் மற்றும் மன உறுதி
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Theme */}
        <section className="bg-bg-surface py-24 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h3 className="tamil-text text-3xl font-bold text-primary-500 mb-6">
              வாழ்க தமிழ்! வளர்க வள்ளுவம்!
            </h3>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-[0.5em]">
              Heritage Restored • Future Secured
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
