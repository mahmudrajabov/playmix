import React, { useState } from "react";
import { Heart, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ListMusic } from "lucide-react";
import { musicTracks } from "@/lib/data";
import { useMusic } from "@/lib/MusicContext";
import { Image } from "@/components/ui/image";

function fmt(t) {
  if (!t || isNaN(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Music() {
  const { track, currentIndex, isPlaying, progress, duration, volume, toggle, next, prev, seek, setVolume, favorites, toggleFavorite, selectTrack } = useMusic();
  const [muted, setMuted] = useState(false);
  const [lastVol, setLastVol] = useState(0.8);

  const toggleMute = () => {
    if (muted) { setVolume(lastVol || 0.8); setMuted(false); }
    else { setLastVol(volume); setVolume(0); setMuted(true); }
  };

  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <header className="mb-6 mt-6">
        <h1 className="font-display text-3xl font-bold mb-1">Music</h1>
        <p className="text-text-muted text-sm">Royalty-free demo tracks. Your favorites are saved on this device.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* Now playing */}
        <div className="neon-card p-6 relative overflow-hidden lg:sticky lg:top-20 h-fit">
          <div className="absolute inset-x-0 top-0 h-40 neon-glow-blue pointer-events-none" />
          <div className="relative flex flex-col items-center text-center">
            <Image src={track.cover} alt={track.title} className="w-56 h-56 rounded-2xl object-cover shadow-2xl mb-5 animate-float-slow" />
            <h2 className="font-display text-xl font-semibold">{track.title}</h2>
            <p className="text-text-muted text-sm mb-1">{track.artist}</p>
            <button
              onClick={() => toggleFavorite(track.id)}
              className={`mb-5 mt-2 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${
                favorites.includes(track.id) ? "bg-neon-pink/15 border-neon-pink/50 text-neon-pink" : "bg-card-fill border-surface-border text-text-muted hover:text-neon-pink"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favorites.includes(track.id) ? "fill-current" : ""}`} /> {favorites.includes(track.id) ? "Favorited" : "Add to favorites"}
            </button>

            {/* progress */}
            <div className="w-full flex items-center gap-2 mb-4">
              <span className="text-xs text-text-muted tabular-nums w-9">{fmt(progress)}</span>
              <input
                type="range" min={0} max={duration || 0} value={progress}
                onChange={(e) => seek(Number(e.target.value))}
                className="flex-1 h-1.5 accent-neon-purple"
                style={{ background: `linear-gradient(to right, #9D4EDD ${pct}%, #22223B ${pct}%)` }}
              />
              <span className="text-xs text-text-muted tabular-nums w-9">{fmt(duration)}</span>
            </div>

            {/* controls */}
            <div className="flex items-center gap-3">
              <button onClick={prev} className="p-2.5 rounded-full hover:bg-surface text-text-muted hover:text-text-primary transition-colors"><SkipBack className="w-5 h-5" /></button>
              <button onClick={toggle} className="p-4 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue text-white shadow-lg shadow-neon-purple/30 hover:scale-105 transition-transform">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>
              <button onClick={next} className="p-2.5 rounded-full hover:bg-surface text-text-muted hover:text-text-primary transition-colors"><SkipForward className="w-5 h-5" /></button>
            </div>

            {/* volume */}
            <div className="w-full flex items-center gap-2 mt-5">
              <button onClick={toggleMute} className="p-1.5 text-text-muted hover:text-text-primary">{muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}</button>
              <input
                type="range" min={0} max={1} step={0.01} value={muted ? 0 : volume}
                onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
                className="flex-1 h-1 accent-neon-blue"
              />
            </div>
          </div>
        </div>

        {/* Playlist */}
        <div className="neon-card p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-24 neon-glow pointer-events-none" />
          <div className="relative flex items-center gap-2 mb-4">
            <ListMusic className="w-5 h-5 text-neon-purple" />
            <h2 className="font-display text-lg font-semibold">Playlist</h2>
            <span className="text-xs text-text-muted ml-auto">{musicTracks.length} tracks</span>
          </div>
          <div className="relative space-y-1.5 max-h-[600px] overflow-y-auto scrollbar-thin">
            {musicTracks.map((t, i) => {
              const active = i === currentIndex;
              const fav = favorites.includes(t.id);
              return (
                <div
                  key={t.id}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${active ? "bg-neon-purple/15 border border-neon-purple/40" : "hover:bg-surface border border-transparent"}`}
                  onClick={() => selectTrack(t.id)}
                >
                  <Image src={t.cover} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm truncate ${active ? "text-text-primary font-medium" : ""}`}>{t.title}</p>
                    <p className="text-xs text-text-muted truncate">{t.artist}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
                    className={`p-2 rounded-full transition-colors ${fav ? "text-neon-pink" : "text-text-muted hover:text-neon-pink"}`}
                    aria-label="Favorite"
                  >
                    <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
                  </button>
                  {active && isPlaying ? (
                    <span className="flex items-end gap-0.5 h-4">
                      <span className="w-1 bg-neon-purple animate-pulse-glow" style={{ height: "60%" }} />
                      <span className="w-1 bg-neon-blue animate-pulse-glow" style={{ height: "100%", animationDelay: "0.2s" }} />
                      <span className="w-1 bg-neon-pink animate-pulse-glow" style={{ height: "40%", animationDelay: "0.4s" }} />
                    </span>
                  ) : (
                    <Play className="w-4 h-4 text-text-muted shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}