import React from "react";
import { Link } from "react-router-dom";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react";
import { useMusic } from "@/lib/MusicContext";
import { Image as ImageIcon } from "@/components/ui/image";

function fmt(t) {
  if (!t || isNaN(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function MusicMiniPlayer() {
  const { track, isPlaying, progress, duration, volume, toggle, next, prev, seek, setVolume } = useMusic();
  const [muted, setMuted] = React.useState(false);
  const [lastVol, setLastVol] = React.useState(0.8);

  const toggleMute = () => {
    if (muted) {
      setVolume(lastVol || 0.8);
      setMuted(false);
    } else {
      setLastVol(volume);
      setVolume(0);
      setMuted(true);
    }
  };

  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:w-[min(680px,calc(100%-2rem))] md:rounded-2xl md:border md:border-surface-border md:bg-card-fill/90 md:backdrop-blur-lg md:shadow-2xl">
      <div className="px-3 py-2.5 flex items-center gap-3">
        {/* Track info */}
        <Link to="/music" className="flex items-center gap-3 min-w-0 flex-1">
          <ImageIcon src={track.cover} alt={track.title} className="w-11 h-11 rounded-lg object-cover shrink-0" />
          <div className="min-w-0 hidden sm:block">
            <p className="text-sm font-medium text-text-primary truncate">{track.title}</p>
            <p className="text-xs text-text-muted truncate">{track.artist}</p>
          </div>
        </Link>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={prev} className="p-2 rounded-full hover:bg-surface text-text-muted hover:text-text-primary transition-colors" aria-label="Previous">
            <SkipBack className="w-4 h-4" />
          </button>
          <button onClick={toggle} className="p-2.5 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue text-white shadow-lg shadow-neon-purple/30 hover:scale-105 transition-transform" aria-label="Play/Pause">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <button onClick={next} className="p-2 rounded-full hover:bg-surface text-text-muted hover:text-text-primary transition-colors" aria-label="Next">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Progress (desktop) */}
        <div className="hidden md:flex items-center gap-2 shrink-0 w-44">
          <span className="text-xs text-text-muted tabular-nums w-8 text-right">{fmt(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className="flex-1 accent-neon-purple h-1"
            style={{ background: `linear-gradient(to right, #9D4EDD ${pct}%, #22223B ${pct}%)` }}
          />
          <span className="text-xs text-text-muted tabular-nums w-8">{fmt(duration)}</span>
        </div>

        {/* Volume (desktop) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button onClick={toggleMute} className="p-1.5 rounded-full hover:bg-surface text-text-muted hover:text-text-primary">
            {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
            className="w-20 accent-neon-blue h-1"
          />
        </div>
      </div>

      {/* Mobile progress line */}
      <div className="md:hidden h-1 w-full bg-surface-border">
        <div className="h-full bg-gradient-to-r from-neon-purple to-neon-blue" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}