import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import MusicMiniPlayer from "./MusicMiniPlayer";
import GlobalSearch from "./GlobalSearch";
import { MusicProvider } from "@/lib/MusicContext";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Games", path: "/games" },
  { label: "Music", path: "/music" },
  { label: "Gallery", path: "/gallery" },
  { label: "Cinema", path: "/cinema" },
  { label: "Favorites", path: "/favorites" },
];

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <MusicProvider>
      <div className="min-h-screen bg-surface text-text-primary flex flex-col">
        <Navbar navItems={navItems} onOpenSearch={() => setSearchOpen(true)} currentPath={location.pathname} />
        <main className="flex-1 pt-16 pb-28 md:pb-10">
          <Outlet context={{ openSearch: () => setSearchOpen(true) }} />
        </main>
        <MusicMiniPlayer />
        {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
      </div>
    </MusicProvider>
  );
}