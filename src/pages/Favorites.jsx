import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Gamepad2, Music, Images, Film, Heart, Trash2 } from "lucide-react";
import { games, musicTracks, galleryImages, movies } from "@/lib/data";
import { STORAGE_KEYS, getFavorites } from "@/lib/storage";
import { useMusic } from "@/lib/MusicContext";
import { Image } from "@/components/ui/image";

export default function Favorites() {
  const [tick, setTick] = useState(0);
  const { selectTrack } = useMusic();

  // refresh on mount and when window regains focus
  useEffect(() => {
    const onFocus = () => setTick((t) => t + 1);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);
  void tick;

  const favGames = getFavorites(STORAGE_KEYS.favGames).map((id) => games.find((g) => g.id === id)).filter(Boolean);
  const favSongs = getFavorites(STORAGE_KEYS.favSongs).map((id) => musicTracks.find((t) => t.id === id)).filter(Boolean);
  const favImages = getFavorites(STORAGE_KEYS.favImages).map((id) => galleryImages.find((i) => i.id === id)).filter(Boolean);
  const favMovies = getFavorites(STORAGE_KEYS.favMovies).map((id) => movies.find((m) => m.id === id)).filter(Boolean);

  const total = favGames.length + favSongs.length + favImages.length + favMovies.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <header className="mb-6 mt-6">
        <h1 className="font-display text-3xl font-bold mb-1">Favorites</h1>
        <p className="text-text-muted text-sm">Everything you've saved, all in one place — stored on this device.</p>
      </header>

      {total === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-3xl bg-card-fill border border-surface-border flex items-center justify-center text-neon-pink mb-5">
            <Heart className="w-9 h-9" />
          </div>
          <p className="font-display text-xl font-semibold mb-2">No favorites yet</p>
          <p className="text-text-muted text-sm max-w-sm mb-6">Tap the heart on any game, song, image, or movie and it'll show up here.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/games" className="px-4 py-2 rounded-full bg-card-fill border border-surface-border hover:border-neon-purple/60 text-sm transition-colors">Browse Games</Link>
            <Link to="/music" className="px-4 py-2 rounded-full bg-card-fill border border-surface-border hover:border-neon-purple/60 text-sm transition-colors">Browse Music</Link>
            <Link to="/gallery" className="px-4 py-2 rounded-full bg-card-fill border border-surface-border hover:border-neon-purple/60 text-sm transition-colors">Browse Gallery</Link>
            <Link to="/cinema" className="px-4 py-2 rounded-full bg-card-fill border border-surface-border hover:border-neon-purple/60 text-sm transition-colors">Browse Cinema</Link>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {favGames.length > 0 && (
            <FavSection title="Games" icon={Gamepad2} accent="purple" count={favGames.length}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {favGames.map((g) => (
                  <Link key={g.id} to="/games" className="neon-card p-4">
                    <div className="w-10 h-10 rounded-xl bg-surface border border-surface-border flex items-center justify-center text-neon-purple mb-3"><Gamepad2 className="w-5 h-5" /></div>
                    <p className="font-medium text-sm">{g.title}</p>
                    <p className="text-xs text-text-muted line-clamp-1">{g.desc}</p>
                  </Link>
                ))}
              </div>
            </FavSection>
          )}

          {favSongs.length > 0 && (
            <FavSection title="Songs" icon={Music} accent="blue" count={favSongs.length}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {favSongs.map((t) => (
                  <button key={t.id} onClick={() => selectTrack(t.id)} className="flex items-center gap-3 p-2.5 rounded-xl bg-card-fill border border-surface-border hover:border-neon-purple/60 text-left transition-colors">
                    <Image src={t.cover} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm truncate">{t.title}</p>
                      <p className="text-xs text-text-muted truncate">{t.artist}</p>
                    </div>
                    <Play2 />
                  </button>
                ))}
              </div>
            </FavSection>
          )}

          {favImages.length > 0 && (
            <FavSection title="Images" icon={Images} accent="pink" count={favImages.length}>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {favImages.map((i) => (
                  <Link key={i.id} to="/gallery" className="rounded-xl overflow-hidden border border-surface-border hover:border-neon-purple/60 transition-colors">
                    <Image src={i.url} alt={i.title} className="w-full aspect-square object-cover" />
                  </Link>
                ))}
              </div>
            </FavSection>
          )}

          {favMovies.length > 0 && (
            <FavSection title="Movies" icon={Film} accent="purple" count={favMovies.length}>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {favMovies.map((m) => (
                  <Link key={m.id} to={`/cinema/${m.id}`} className="neon-card overflow-hidden">
                    <Image src={m.poster} alt={m.title} className="w-full aspect-[2/3] object-cover" />
                    <div className="p-2">
                      <p className="text-xs font-medium truncate">{m.title}</p>
                      <p className="text-[11px] text-text-muted">{m.year}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </FavSection>
          )}
        </div>
      )}
    </div>
  );
}

function FavSection({ title, icon: Icon, accent, count, children }) {
  const glow = accent === "purple" ? "neon-glow" : accent === "blue" ? "neon-glow-blue" : "neon-glow-pink";
  return (
    <section className="relative">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-neon-purple" />
        <h2 className="font-display text-xl font-semibold">{title}</h2>
        <span className="text-xs text-text-muted ml-1">{count}</span>
      </div>
      {children}
    </section>
  );
}

function Play2() {
  return <span className="ml-auto w-9 h-9 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-white shrink-0"><Music className="w-4 h-4" /></span>;
}