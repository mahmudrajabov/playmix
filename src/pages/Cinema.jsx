import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, X, Star, Play, Heart } from "lucide-react";
import { movies, movieGenres } from "@/lib/data";
import { STORAGE_KEYS, toggleFavorite, isFavorite } from "@/lib/storage";
import { Image } from "@/components/ui/image";

export default function Cinema() {
  const [genre, setGenre] = useState("All");
  const [year, setYear] = useState("All");
  const [query, setQuery] = useState("");
  const [favTick, setFavTick] = useState(0);

  const years = useMemo(() => ["All", ...Array.from(new Set(movies.map((m) => m.year))).sort((a, b) => b - a)], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return movies.filter((m) => {
      const matchGenre = genre === "All" || m.genre === genre;
      const matchYear = year === "All" || String(m.year) === String(year);
      const matchQ = !q || m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q);
      return matchGenre && matchYear && matchQ;
    });
  }, [genre, year, query]);

  const toggleFav = (id) => { toggleFavorite(STORAGE_KEYS.favMovies, id); setFavTick((t) => t + 1); };
  const isFav = (id) => isFavorite(STORAGE_KEYS.favMovies, id);
  void favTick;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <header className="mb-6 mt-6">
        <h1 className="font-display text-3xl font-bold mb-1">Cinema</h1>
        <p className="text-text-muted text-sm">Movie cards with legal YouTube trailer embeds. No full films hosted here.</p>
      </header>

      {/* Controls */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-card-fill border border-surface-border focus-within:border-neon-purple/60">
          <Search className="w-4 h-4 text-text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies…" className="flex-1 bg-transparent outline-none text-sm placeholder:text-text-muted" />
          {query && <button onClick={() => setQuery("")} className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>}
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterGroup label="Genre" options={["All", ...movieGenres]} value={genre} onChange={setGenre} />
          <FilterGroup label="Year" options={years} value={year} onChange={setYear} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-card-fill border border-surface-border flex items-center justify-center text-text-muted mb-4">
            <Play className="w-7 h-7" />
          </div>
          <p className="font-display text-lg font-semibold mb-1">No movies found</p>
          <p className="text-text-muted text-sm">Try different filters or search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((m) => {
            const fav = isFav(m.id);
            return (
              <div key={m.id} className="neon-card overflow-hidden group relative">
                <Link to={`/cinema/${m.id}`} className="block relative aspect-[2/3]">
                  <Image src={m.poster} alt={m.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-surface/20 to-transparent" />
                  <span className="absolute top-2 left-2 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-neon-purple/80 text-white">
                    <Star className="w-3 h-3 fill-current" /> {m.rating}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-12 h-12 rounded-full bg-white/90 text-surface flex items-center justify-center"><Play className="w-5 h-5 ml-0.5" /></span>
                  </span>
                </Link>
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{m.title}</p>
                      <p className="text-xs text-text-muted">{m.genre} · {m.year}</p>
                    </div>
                    <button onClick={() => toggleFav(m.id)} className={`p-1.5 rounded-full shrink-0 transition-colors ${fav ? "text-neon-pink" : "text-text-muted hover:text-neon-pink"}`}>
                      <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
      <span className="text-xs text-text-muted shrink-0 pr-1">{label}:</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            value === o ? "bg-neon-purple/20 border-neon-purple/50 text-text-primary" : "bg-card-fill border-surface-border text-text-muted hover:border-neon-purple/40"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}