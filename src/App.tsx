// Main App Component with Routing
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeAuth, useAuthStore } from "./store/authStore";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import SearchPage from "./pages/SearchPage";
import SavedKuralsPage from "./pages/SavedKuralsPage";
import AboutPage from "./pages/AboutPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const App: React.FC = () => {
  const { user, initialized } = useAuthStore();

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  // Show loading while auth initializes
  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main">
        <div className="text-center animate-premium-fade">
          <div className="w-20 h-20 mx-auto mb-6 bg-primary-500 flex items-center justify-center shadow-premium animate-pulse">
            <span className="text-4xl text-white">📖</span>
          </div>
          <h1 className="tamil-text text-3xl font-bold text-text-primary mb-2">
            தினசரி திருக்குறள்
          </h1>
          <p className="text-xs font-bold text-text-secondary uppercase tracking-[0.4em]">
            Loading Your Journey...
          </p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <SignupPage />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedKuralsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
