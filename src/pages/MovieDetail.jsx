import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Heart, Play, Calendar, Film } from "lucide-react";
import { movies } from "@/lib/data";
import { STORAGE_KEYS, toggleFavorite, isFavorite } from "@/lib/storage";
import { Image } from "@/components/ui/image";

export default function MovieDetail() {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === id);
  const [favTick, setFavTick] = useState(0);
  const [playing, setPlaying] = useState(false);

  if (!movie) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="font-display text-xl mb-3">Movie not found</p>
        <Link to="/cinema" className="text-neon-blue hover:underline">Back to Cinema</Link>
      </div>
    );
  }

  const fav = isFavorite(STORAGE_KEYS.favMovies, movie.id);
  const toggleFav = () => { toggleFavorite(STORAGE_KEYS.favMovies, movie.id); setFavTick((t) => t + 1); };
  void favTick;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <Link to="/cinema" className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary mt-6 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Cinema
      </Link>

      {/* Hero backdrop */}
      <div className="relative rounded-3xl overflow-hidden border border-surface-border mb-6">
        <div className="aspect-video">
          {playing ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${movie.youtubeId}?autoplay=1`}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button onClick={() => setPlaying(true)} className="relative w-full h-full block group">
              <Image src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 rounded-full bg-white/90 text-surface flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                  <Play className="w-7 h-7 ml-1" />
                </span>
              </span>
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8">
                <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">{movie.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
                  <span className="flex items-center gap-1 text-neon-purple"><Star className="w-4 h-4 fill-current" /> {movie.rating}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {movie.year}</span>
                  <span className="flex items-center gap-1"><Film className="w-4 h-4" /> {movie.genre}</span>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6">
        <div className="neon-card overflow-hidden">
          <Image src={movie.poster} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-display text-2xl font-bold">{movie.title}</h2>
            <button onClick={toggleFav} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors ${fav ? "bg-neon-pink/15 border-neon-pink/50 text-neon-pink" : "bg-card-fill border-surface-border text-text-muted hover:text-neon-pink"}`}>
              <Heart className={`w-3.5 h-3.5 ${fav ? "fill-current" : ""}`} /> {fav ? "Favorited" : "Favorite"}
            </button>
          </div>
          <p className="text-text-muted text-sm leading-relaxed mb-5">{movie.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-full bg-card-fill border border-surface-border text-xs">{movie.genre}</span>
            <span className="px-3 py-1.5 rounded-full bg-card-fill border border-surface-border text-xs">{movie.year}</span>
            <span className="px-3 py-1.5 rounded-full bg-card-fill border border-surface-border text-xs">★ {movie.rating}/10</span>
          </div>
          <p className="text-xs text-text-muted mt-5">Trailer embedded from YouTube. PlayMix does not host or distribute full films.</p>
        </div>
      </div>
    </div>
  );
}