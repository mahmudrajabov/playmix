import React, { useState, useMemo } from "react";
import { Search, Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages, galleryCategories } from "@/lib/data";
import { STORAGE_KEYS, toggleFavorite, isFavorite } from "@/lib/storage";
import { Image } from "@/components/ui/image";

export default function Gallery() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState(null);
  const [favTick, setFavTick] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return galleryImages.filter((img) => {
      const matchCat = category === "All" || img.category === category;
      const matchQ = !q || img.title.toLowerCase().includes(q) || img.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [category, query]);

  const toggleFav = (id) => { toggleFavorite(STORAGE_KEYS.favImages, id); setFavTick((t) => t + 1); };
  const isFav = (id) => isFavorite(STORAGE_KEYS.favImages, id);
  void favTick;

  const closePreview = () => setPreview(null);
  const step = (dir) => {
    const i = filtered.findIndex((x) => x.id === preview.id);
    const ni = (i + dir + filtered.length) % filtered.length;
    setPreview(filtered[ni]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <header className="mb-6 mt-6">
        <h1 className="font-display text-3xl font-bold mb-1">Gallery</h1>
        <p className="text-text-muted text-sm">Browse curated visuals across five categories. Favorite the ones you love.</p>
      </header>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-card-fill border border-surface-border focus-within:border-neon-purple/60 flex-1">
          <Search className="w-4 h-4 text-text-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search images…" className="flex-1 bg-transparent outline-none text-sm placeholder:text-text-muted" />
          {query && <button onClick={() => setQuery("")} className="text-text-muted hover:text-text-primary"><X className="w-4 h-4" /></button>}
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
          {["All", ...galleryCategories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 px-3.5 py-2 rounded-full text-sm font-medium border transition-all ${
                category === c ? "bg-gradient-to-r from-neon-purple/25 to-neon-blue/15 border-neon-purple/50 text-text-primary" : "bg-card-fill border-surface-border text-text-muted hover:border-neon-purple/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {filtered.map((img) => {
            const fav = isFav(img.id);
            return (
              <div key={img.id} className="mb-4 break-inside-avoid group relative rounded-2xl overflow-hidden border border-surface-border hover:border-neon-purple/60 transition-colors">
                <button onClick={() => setPreview(img)} className="block w-full">
                  <Image src={img.url} alt={img.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 inset-x-0 p-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{img.title}</p>
                    <p className="text-xs text-text-muted">{img.category}</p>
                  </div>
                  <button
                    onClick={() => toggleFav(img.id)}
                    className={`p-2 rounded-full backdrop-blur ${fav ? "bg-neon-pink/30 text-neon-pink" : "bg-surface/70 text-text-primary hover:text-neon-pink"}`}
                    aria-label="Favorite"
                  >
                    <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
                  </button>
                </div>
                {fav && (
                  <span className="absolute top-2 right-2 p-1.5 rounded-full bg-neon-pink/30 backdrop-blur text-neon-pink">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-up" onClick={closePreview}>
          <div className="absolute inset-0 bg-surface/90 backdrop-blur-md" />
          <button onClick={closePreview} className="absolute top-4 right-4 p-2 rounded-full bg-card-fill border border-surface-border text-text-muted hover:text-text-primary z-10"><X className="w-5 h-5" /></button>
          <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-2 sm:left-4 p-2.5 rounded-full bg-card-fill border border-surface-border text-text-muted hover:text-text-primary z-10"><ChevronLeft className="w-5 h-5" /></button>
          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <Image src={preview.url} alt={preview.title} className="max-h-[75vh] w-auto rounded-2xl object-contain" />
            <div className="mt-4 flex items-center gap-4">
              <div className="text-center">
                <p className="font-display font-semibold">{preview.title}</p>
                <p className="text-sm text-text-muted">{preview.category}</p>
              </div>
              <button onClick={() => toggleFav(preview.id)} className={`p-2.5 rounded-full border transition-colors ${isFav(preview.id) ? "bg-neon-pink/15 border-neon-pink/50 text-neon-pink" : "bg-card-fill border-surface-border text-text-muted hover:text-neon-pink"}`}>
                <Heart className={`w-5 h-5 ${isFav(preview.id) ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-2 sm:right-4 p-2.5 rounded-full bg-card-fill border border-surface-border text-text-muted hover:text-text-primary z-10"><ChevronRight className="w-5 h-5" /></button>
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-card-fill border border-surface-border flex items-center justify-center text-text-muted mb-4">
        <Search className="w-7 h-7" />
      </div>
      <p className="font-display text-lg font-semibold mb-1">No images found</p>
      <p className="text-text-muted text-sm">Try a different category or search term.</p>
    </div>
  );
}