import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X, Gamepad2, Music, Images, Film, Heart, Home } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const iconMap = {
  Home,
  Games: Gamepad2,
  Music,
  Gallery: Images,
  Cinema: Film,
  Favorites: Heart,
};

export default function Navbar({ navItems, onOpenSearch, currentPath }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const go = (path) => {
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className="glass-header fixed top-0 inset-x-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          {/* Logo */}
          <BrandLogo />

          {/* Desktop nav rail */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navItems.map((item) => {
              const Icon = iconMap[item.label] || Home;
              const active = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`accent-pill px-3.5 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 text-text-muted border border-transparent ${active ? "active" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex-1" />

          {/* Search (desktop) */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-card-fill border border-surface-border text-text-muted hover:border-neon-purple/60 hover:text-text-primary transition-colors text-sm w-56 lg:w-72"
          >
            <Search className="w-4 h-4" />
            <span>Search games, music, movies…</span>
          </button>

          {/* Search icon (mobile) */}
          <button onClick={onOpenSearch} className="sm:hidden p-2 rounded-full hover:bg-card-fill text-text-muted hover:text-text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Mobile menu trigger */}
          <button onClick={() => setMobileOpen((v) => !v)} className="md:hidden p-2 rounded-full hover:bg-card-fill text-text-muted hover:text-text-primary transition-colors">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile slide-out sheet */}
        {mobileOpen && (
          <div className="md:hidden border-t border-surface-border bg-surface/95 backdrop-blur-lg animate-fade-up">
            <nav className="px-4 py-3 flex flex-col">
              {navItems.map((item) => {
                const Icon = iconMap[item.label] || Home;
                const active = currentPath === item.path || (item.path !== "/" && currentPath.startsWith(item.path));
                return (
                  <button
                    key={item.path}
                    onClick={() => go(item.path)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left ${active ? "bg-neon-purple/15 text-text-primary border border-neon-purple/40" : "text-text-muted hover:bg-card-fill"}`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}