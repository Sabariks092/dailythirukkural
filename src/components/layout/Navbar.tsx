// Navbar Component with conditional navigation
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

interface NavbarProps {
  hasCompletedDaily: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ hasCompletedDaily }) => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "முகப்பு", path: "/", icon: "🏠" },
    { name: "தேடல்", path: "/search", icon: "🔍", requiresCompletion: true },
    { name: "சேமித்தவை", path: "/saved", icon: "🔖", requiresCompletion: true },
    {
      name: "எம்மைப் பற்றி",
      path: "/about",
      icon: "ℹ️",
      requiresCompletion: false,
    },
  ];

  return (
    <nav className="bg-bg-surface border-b-2 border-primary-500 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Mobile Branding */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary-500 flex items-center justify-center text-white text-xl hover-premium-scale">
                📖
              </div>
              <div className="hidden sm:block">
                <span className="tamil-text font-bold text-lg text-primary-500 block leading-none">
                  தினசரி திருக்குறள்
                </span>
                <span className="text-xs text-text-secondary tracking-widest uppercase font-bold">
                  Daily Thirukkural
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => {
              const isVisible = !link.requiresCompletion || hasCompletedDaily;
              if (!isVisible) return null;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold border-b-2 transition-all ${
                    isActive(link.path)
                      ? "border-primary-500 text-primary-500"
                      : "border-transparent text-text-secondary hover:text-primary-500 hover:border-primary-500/30"
                  }`}
                >
                  <span className="tamil-text">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-[10px] text-text-secondary font-bold uppercase tracking-tighter">
                    Authenticated
                  </span>
                  <span className="text-sm font-bold text-text-primary">
                    {user.email?.split("@")[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border-2 border-secondary-500 text-secondary-500 text-xs font-bold hover:bg-secondary-500 hover:text-white transition-all"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-primary-500 text-white text-xs font-bold hover:bg-primary-600 transition-all"
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav Link Indicator (Bar) */}
      <div className="md:hidden flex h-10 bg-bg-main border-t border-border-soft overflow-x-auto no-scrollbar">
        {navLinks.map((link) => {
          const isVisible = !link.requiresCompletion || hasCompletedDaily;
          if (!isVisible) return null;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex-1 min-w-[80px] flex items-center justify-center text-[10px] uppercase font-bold tracking-tighter transition-all ${
                isActive(link.path)
                  ? "text-primary-500 bg-white border-b-2 border-primary-500"
                  : "text-text-secondary"
              }`}
            >
              <span className="tamil-text">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
