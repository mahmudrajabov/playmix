import React from "react";
import { Link } from "react-router-dom";
import { Play, Sparkles, Gamepad2, Music, Images, Film, Heart, ArrowRight } from "lucide-react";
import { games, musicTracks, movies, galleryImages } from "@/lib/data";
import { useMusic } from "@/lib/MusicContext";
import { Image } from "@/components/ui/image";

const accentMap = {
  purple: "from-neon-purple/20",
  blue: "from-neon-blue/20",
  pink: "from-neon-pink/20",
};

export default function Home() {
  const { track, selectTrack, toggle } = useMusic();
  const featuredMovie = movies[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-surface-border mt-6 mb-8">
        <div className="absolute inset-0">
          <Image src={featuredMovie.backdrop} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-surface/40" />
          <div className="absolute inset-0 neon-glow opacity-60" />
        </div>
        <div className="relative px-6 sm:px-10 py-16 sm:py-24 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-purple/15 border border-neon-purple/40 text-xs text-text-primary mb-5">
            <Sparkles className="w-3.5 h-3.5 text-neon-purple" /> Welcome to PlayMix
          </span>
          <h1 className="font-display font-bold leading-[1.05] mb-5" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            Your Personal <span className="text-gradient">Playground</span>
          </h1>
          <p className="text-text-muted text-base sm:text-lg max-w-md mb-8">
            Mini games, music, a living gallery, and cinema trailers — all in one neon-lit hub.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/cinema" className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white font-medium hover:scale-105 transition-transform shadow-lg shadow-neon-purple/30">
              <Play className="w-4 h-4" /> Explore Trending
            </Link>
            <Link to="/games" className="flex items-center gap-2 px-6 py-3 rounded-full bg-card-fill border border-surface-border hover:border-neon-purple/60 text-text-primary font-medium transition-colors">
              <Gamepad2 className="w-4 h-4" /> Play Games
            </Link>
          </div>
        </div>
      </section>

      {/* Bento stage */}
      <section className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-5 mb-10">
        {/* Featured carousel */}
        <div className="neon-card p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-40 neon-glow pointer-events-none" />
          <div className="flex items-center justify-between mb-5 relative">
            <h2 className="font-display text-xl font-semibold">Featured Launchpad</h2>
            <Link to="/games" className="text-xs text-neon-blue flex items-center gap-1 hover:underline">All games <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative">
            {games.map((g) => (
              <Link key={g.id} to="/games" className="group relative rounded-2xl bg-card-fill border border-surface-border p-4 hover:border-neon-purple/60 transition-all overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-b ${accentMap[g.accent]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-surface-border flex items-center justify-center text-neon-purple mb-3">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <p className="font-medium text-sm">{g.title}</p>
                  <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{g.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          {/* Cinema previewer */}
          <Link to={`/cinema/${featuredMovie.id}`} className="group relative mt-4 flex items-center gap-4 rounded-2xl overflow-hidden border border-surface-border hover:border-neon-blue/50 transition-colors">
            <div className="relative w-28 sm:w-40 shrink-0 aspect-video">
              <Image src={featuredMovie.backdrop} alt={featuredMovie.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="w-10 h-10 rounded-full bg-white/90 text-surface flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 ml-0.5" />
                </span>
              </div>
            </div>
            <div className="min-w-0 pr-4">
              <p className="text-xs text-neon-blue uppercase tracking-wider">Trailer preview</p>
              <p className="font-display font-semibold truncate">{featuredMovie.title}</p>
              <p className="text-xs text-text-muted">{featuredMovie.genre} · {featuredMovie.year}</p>
            </div>
          </Link>
        </div>

        {/* Sticky music widget */}
        <div className="neon-card p-5 sm:p-6 relative overflow-hidden lg:sticky lg:top-20 h-fit">
          <div className="absolute inset-x-0 top-0 h-32 neon-glow-blue pointer-events-none" />
          <div className="flex items-center justify-between mb-4 relative">
            <h2 className="font-display text-xl font-semibold flex items-center gap-2"><Music className="w-5 h-5 text-neon-blue" /> Now Playing</h2>
            <Link to="/music" className="text-xs text-neon-blue hover:underline">Open player</Link>
          </div>
          <div className="relative flex flex-col items-center text-center">
            <Image src={track.cover} alt={track.title} className="w-40 h-40 rounded-2xl object-cover shadow-xl mb-4 animate-float-slow" />
            <p className="font-display font-semibold">{track.title}</p>
            <p className="text-sm text-text-muted">{track.artist}</p>
            <button onClick={() => toggle()} className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white text-sm font-medium hover:scale-105 transition-transform">
              Play now
            </button>
          </div>
          <div className="mt-4 space-y-1.5 max-h-40 overflow-y-auto scrollbar-thin">
            {musicTracks.slice(0, 4).map((t) => (
              <button key={t.id} onClick={() => selectTrack(t.id)} className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-surface text-left transition-colors">
                <Image src={t.cover} alt="" className="w-9 h-9 rounded-md object-cover" />
                <div className="min-w-0">
                  <p className="text-sm truncate">{t.title}</p>
                  <p className="text-xs text-text-muted truncate">{t.artist}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick access grid */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-semibold mb-5">Jump back in</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickCard to="/games" icon={Gamepad2} title="Mini Games" sub="5 games to play" accent="purple" />
          <QuickCard to="/music" icon={Music} title="Music" sub={`${musicTracks.length} tracks`} accent="blue" />
          <QuickCard to="/gallery" icon={Images} title="Gallery" sub={`${galleryImages.length} images`} accent="pink" />
          <QuickCard to="/cinema" icon={Film} title="Cinema" sub={`${movies.length} trailers`} accent="purple" />
        </div>
      </section>

      {/* Trending movies strip */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl font-semibold">Trending trailers</h2>
          <Link to="/cinema" className="text-sm text-neon-blue flex items-center gap-1 hover:underline">See all <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-thin pb-2 -mx-4 px-4">
          {movies.slice(0, 6).map((m) => (
            <Link key={m.id} to={`/cinema/${m.id}`} className="group shrink-0 w-40 sm:w-48 neon-card overflow-hidden">
              <div className="relative aspect-[2/3]">
                <Image src={m.poster} alt={m.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 to-transparent" />
                <span className="absolute bottom-2 left-2 text-xs px-2 py-0.5 rounded-full bg-neon-purple/80 text-white">★ {m.rating}</span>
              </div>
              <div className="p-3">
                <p className="font-medium text-sm truncate">{m.title}</p>
                <p className="text-xs text-text-muted">{m.genre} · {m.year}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Link to="/favorites" className="flex items-center gap-2 text-sm text-text-muted hover:text-neon-pink transition-colors mb-6">
        <Heart className="w-4 h-4" /> View your favorites
      </Link>
    </div>
  );
}

function QuickCard({ to, icon: Icon, title, sub, accent }) {
  const glow = accent === "purple" ? "neon-glow" : accent === "blue" ? "neon-glow-blue" : "neon-glow-pink";
  return (
    <Link to={to} className="neon-card p-5 relative overflow-hidden group">
      <div className={`absolute inset-x-0 top-0 h-24 ${glow} opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className="relative">
        <div className="w-11 h-11 rounded-xl bg-surface border border-surface-border flex items-center justify-center text-neon-purple mb-3">
          <Icon className="w-5 h-5" />
        </div>
        <p className="font-display font-semibold">{title}</p>
        <p className="text-xs text-text-muted mt-0.5">{sub}</p>
      </div>
    </Link>
  );
}