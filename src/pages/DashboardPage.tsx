// Dashboard Page Component
import React from "react";
import { useAuthStore } from "../store/authStore";
import { useAnalytics } from "../hooks/useAnalytics";
import { useDailyKural } from "../hooks/useDailyKural";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import DailyKuralModal from "../components/kural/DailyKuralModal";
import MetricsCards from "../components/analytics/MetricsCards";
import CalendarHeatmapComponent from "../components/analytics/CalendarHeatmap";
import PaalPieChart from "../components/analytics/PaalPieChart";
import NotesTimeline from "../components/analytics/NotesTimeline";
import KuralCard from "../components/kural/KuralCard";

const DashboardPage: React.FC = () => {
  const { userData } = useAuthStore();
  const {
    analytics,
    loading: analyticsLoading,
    refresh: refreshAnalytics,
  } = useAnalytics();
  const {
    kural,
    loading: kuralLoading,
    hasCompletedDaily,
    kuralNumber,
    completeDailyKural,
  } = useDailyKural();

  // Refresh data when daily kural is completed
  const handleComplete = async (note: string) => {
    await completeDailyKural(note);
    await refreshAnalytics();
  };

  if (kuralLoading || analyticsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-primary-500 border-t-transparent animate-spin" />
          <p className="tamil-text text-text-secondary font-bold uppercase tracking-widest text-xs">
            ஞானத்தைத் தேடுகிறது...
          </p>
        </div>
      </div>
    );
  }

  // Show modal if daily kural not completed
  if (!hasCompletedDaily && kural) {
    return (
      <DailyKuralModal
        kural={kural}
        kuralNumber={kuralNumber}
        onComplete={handleComplete}
        loading={kuralLoading}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-main">
      <Navbar hasCompletedDaily={hasCompletedDaily} />

      <main className="flex-1">
        {/* Artistic Hero Section */}
        <section className="bg-bg-surface border-b border-border-soft overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-500/5 -skew-x-12 translate-x-1/2" />

          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-premium-fade">
                <p className="text-secondary-500 font-bold uppercase tracking-[0.3em] text-xs mb-4">
                  WELCOME BACK • நல்வரவு
                </p>
                <h1 className="tamil-text text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
                  முகப்பு பக்கம் - உலகப் பொதுமறைக்கு நல்வரவு
                </h1>
                <p className="tamil-text text-text-secondary text-lg leading-relaxed mb-8">
                  திருக்குறள் என்பது வெறும் நூல் மட்டுமல்ல; அது மானுடத்தின்
                  வழிகாட்டி. ஈராயிரம் ஆண்டுகளுக்கு முன்பே வள்ளுவப் பெருந்தகை
                  வடித்த குறட்பாக்கள், இன்றும் நம் வாழ்வின் ஒவ்வொரு நொடிக்கும்
                  பொருத்தமான வாழ்வியல் நெறிகளை வழங்குகின்றன.
                </p>
                <div className="flex gap-4">
                  <div className="bg-primary-500 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest">
                    Discipline Unlocked
                  </div>
                  <div className="border border-primary-500 text-primary-500 px-6 py-3 text-xs font-bold uppercase tracking-widest">
                    Day {analytics?.totalCompleted || 0}
                  </div>
                </div>
              </div>

              {/* Today's Kural Card Showcase */}
              <div
                className="animate-premium-fade"
                style={{ animationDelay: "0.2s" }}
              >
                <h3 className="text-secondary-500 font-bold uppercase tracking-widest text-[10px] mb-4 text-center">
                  TODAY'S SACRED VERSE • இன்றைய குறள்
                </h3>
                {kural && <KuralCard kural={kural} />}
              </div>
            </div>
          </div>
        </section>

        {/* Features & Insights Section */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-bg-surface p-8 border-l-4 border-primary-500 shadow-sm animate-premium-fade">
              <h4 className="tamil-text text-xl font-bold text-text-primary mb-4">
                வாழ்வியல் ஒழுக்கம்
              </h4>
              <p className="tamil-text text-text-secondary text-sm leading-relaxed">
                ஒவ்வொரு நாளும் ஒரு குறளைப் படிப்பதன் மூலம் நாம் நம் சிந்தனையைச்
                சீரமைக்க முடியும். "கற்க கசடறக் கற்பவை" என்று வள்ளுவர்
                கூறியதற்கேற்ப, ஒரு நாளைக்கு ஒரு கருத்தை ஆழமாகச் சிந்திப்பது, நம்
                மனதிற்குத் தெளிவையும் செயலுக்குத் துணிவையும் தருகிறது.
              </p>
            </div>
            <div
              className="bg-bg-surface p-8 border-l-4 border-secondary-500 shadow-sm animate-premium-fade"
              style={{ animationDelay: "0.1s" }}
            >
              <h4 className="tamil-text text-xl font-bold text-text-primary mb-4">
                குறள் அறிவிப்பு
              </h4>
              <p className="tamil-text text-text-secondary text-sm leading-relaxed">
                ஒவ்வொரு நாளும் ஒரு புதிய குறளைத் தவறாமல் படிக்க நினைவுறுத்தல்.
                அறத்துப்பால், பொருட்பால், அல்லது இன்பத்துப்பால் என
                முப்பாலிலிருந்தும் தேர்ந்தெடுக்கப்பட்ட ஒரு குறள், அன்றைய
                தினத்தின் உந்துசக்தியாக அமையும்.
              </p>
            </div>
            <div
              className="bg-bg-surface p-8 border-l-4 border-accent-500 shadow-sm animate-premium-fade"
              style={{ animationDelay: "0.2s" }}
            >
              <h4 className="tamil-text text-xl font-bold text-text-primary mb-4">
                தேடல் மற்றும் சேமிப்பு
              </h4>
              <p className="tamil-text text-text-secondary text-sm leading-relaxed">
                133 அதிகாரங்களில் உங்களுக்குத் தேவையானதைத் தேடி அறிதல்.
                உங்களுக்குப் பிடித்த அல்லது உங்களுக்கு வழிகாட்டிய குறள்களைத்
                தனியாகச் சேமித்தல்.
              </p>
            </div>
          </div>

          <div className="mb-12 border-b border-border-soft pb-4">
            <h2 className="display text-text-primary text-center">
              Your Progress Dashboard
            </h2>
            <p className="text-text-secondary text-center uppercase tracking-widest text-xs font-bold mt-2">
              Analytical insights into your spiritual journey
            </p>
          </div>

          {/* Metrics & Analytics */}
          {analytics && (
            <div className="space-y-12">
              <MetricsCards analytics={analytics} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-bg-surface p-8 border border-border-soft shadow-premium">
                  <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-500" />
                    Activity Heatmap
                  </h3>
                  {userData && (
                    <CalendarHeatmapComponent
                      progressList={analytics.dailyProgressList}
                      signupDate={userData.signupDate}
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 gap-8">
                  <div className="bg-bg-surface p-8 border border-border-soft shadow-premium">
                    <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary-500" />
                      Category Distribution
                    </h3>
                    <PaalPieChart paalProgress={analytics.paalProgress} />
                  </div>

                  <div className="bg-bg-surface p-8 border border-border-soft shadow-premium overflow-hidden">
                    <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent-500" />
                      Recent Reflections
                    </h3>
                    <NotesTimeline
                      progressList={analytics.dailyProgressList.slice(0, 5)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Motivational Quote */}
        <section className="bg-primary-500 text-white py-16 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <p className="tamil-text text-2xl md:text-3xl font-bold mb-6 italic leading-tight">
              "வையத்துள் வாழ்வாங்கு வாழ்பவன் வானுறையும்
              <br />
              தெய்வத்துள் வைக்கப் படும்."
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-80">
              Kural 50 • உலகப் பொதுமறை
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
