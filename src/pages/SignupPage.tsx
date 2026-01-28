// Signup Page Component
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, googleSignIn, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (password !== confirmPassword) {
      useAuthStore.setState({ error: "Passwords do not match" });
      return;
    }

    if (password.length < 6) {
      useAuthStore.setState({
        error: "Password must be at least 6 characters",
      });
      return;
    }

    try {
      await signup(email, password);
      navigate("/");
    } catch (err) {
      // Error handled in store
    }
  };

  const handleGoogleSignIn = async () => {
    clearError();
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      // Error handled in store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-bg-main py-12">
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-10 animate-premium-fade">
          <div className="w-20 h-20 mx-auto mb-6 bg-primary-500 flex items-center justify-center shadow-premium hover-premium-scale">
            <span className="text-4xl text-white">📖</span>
          </div>
          <h1 className="tamil-text text-3xl font-bold text-text-primary mb-2">
            புதிய பயணம்
          </h1>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-[0.3em]">
            Begin Your Journey • 1330 Days of Wisdom
          </p>
        </div>

        {/* Signup Form Container */}
        <div
          className="bg-bg-surface border-t-8 border-secondary-500 shadow-premium p-10 animate-premium-fade"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="mb-8 border-l-4 border-primary-500 pl-4">
            <h2 className="text-xl font-bold text-text-primary uppercase tracking-widest">
              Create Account
            </h2>
            <p className="tamil-text text-text-secondary text-sm">
              வள்ளுவத்தின் வழி நின்று அறம் சார்ந்த வாழ்வைத் தொடங்குங்கள்.
            </p>
          </div>

          {error && (
            <div className="bg-secondary-500 text-white px-4 py-3 text-xs font-bold uppercase tracking-widest mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 border-2 border-border-soft focus:border-primary-500 outline-none transition-all font-medium"
                placeholder="you@heritage.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">
                Security Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border-2 border-border-soft focus:border-primary-500 outline-none transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-4 border-2 border-border-soft focus:border-primary-500 outline-none transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary-500 text-white py-4 font-bold uppercase tracking-[0.2em] transition-all hover:bg-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "CREATING LEDGER..." : "START JOURNEY"}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-soft"></div>
            </div>
            <div className="relative flex justify-center text-[10px]">
              <span className="px-4 bg-bg-surface text-text-secondary font-bold uppercase tracking-widest">
                Universal Path
              </span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-4 bg-white border-2 border-border-soft py-4 font-bold uppercase tracking-widest text-xs hover:bg-bg-main transition-all disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>

          <p className="text-center text-text-primary text-xs font-bold uppercase tracking-widest mt-10">
            Already in the treasury?{" "}
            <Link
              to="/login"
              className="text-secondary-500 hover:underline decoration-2 underline-offset-4"
            >
              Sign In
            </Link>
          </p>
        </div>

        <div className="text-center text-text-secondary text-[10px] uppercase font-bold tracking-[0.5em] mt-10 space-y-2">
          <p>Your journey begins with Day 1, Kural 1</p>
          <p className="opacity-60">
            No skipping. No rushing. Just discipline.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
