import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Gamepad2, Music, Images, Film } from "lucide-react";
import { games } from "@/lib/data";
import { musicTracks, galleryImages, movies } from "@/lib/data";

export default function GlobalSearch({ onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const q = query.trim().toLowerCase();

  const gameResults = q ? games.filter((g) => g.title.toLowerCase().includes(q)) : [];
  const songResults = q ? musicTracks.filter((t) => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)) : [];
  const imageResults = q ? galleryImages.filter((i) => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)) : [];
  const movieResults = q ? movies.filter((m) => m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q)) : [];

  const total = gameResults.length + songResults.length + imageResults.length + movieResults.length;

  return (
    <div className="fixed inset-0 z-50 flex justify-center px-4 pt-20 animate-fade-up">
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-card-fill border border-surface-border rounded-2xl shadow-2xl overflow-hidden max-h-[70vh] flex flex-col">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-border">
          <Search className="w-5 h-5 text-neon-purple" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search games, songs, images, movies…"
            className="flex-1 bg-transparent outline-none text-text-primary placeholder:text-text-muted text-sm"
          />
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-surface text-text-muted hover:text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto scrollbar-thin p-4">
          {!q && (
            <p className="text-text-muted text-sm text-center py-10">Start typing to search across all of PlayMix.</p>
          )}
          {q && total === 0 && (
            <p className="text-text-muted text-sm text-center py-10">No results for "{query}".</p>
          )}

          {gameResults.length > 0 && (
            <Section title="Games" icon={Gamepad2}>
              {gameResults.map((g) => (
                <ResultRow key={g.id} icon={Gamepad2} title={g.title} subtitle={g.desc} onClick={() => { navigate("/games"); onClose(); }} />
              ))}
            </Section>
          )}
          {songResults.length > 0 && (
            <Section title="Music" icon={Music}>
              {songResults.slice(0, 6).map((t) => (
                <ResultRow key={t.id} icon={Music} title={t.title} subtitle={t.artist} onClick={() => { navigate("/music"); onClose(); }} />
              ))}
            </Section>
          )}
          {imageResults.length > 0 && (
            <Section title="Gallery" icon={Images}>
              {imageResults.slice(0, 6).map((i) => (
                <ResultRow key={i.id} icon={Images} title={i.title} subtitle={i.category} onClick={() => { navigate("/gallery"); onClose(); }} />
              ))}
            </Section>
          )}
          {movieResults.length > 0 && (
            <Section title="Cinema" icon={Film}>
              {movieResults.map((m) => (
                <ResultRow key={m.id} icon={Film} title={m.title} subtitle={`${m.genre} · ${m.year}`} onClick={() => { navigate(`/cinema/${m.id}`); onClose(); }} />
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-text-muted mb-2 px-1">
        <Icon className="w-3.5 h-3.5" /> {title}
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function ResultRow({ icon: Icon, title, subtitle, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface text-left transition-colors">
      <span className="w-9 h-9 rounded-lg bg-surface border border-surface-border flex items-center justify-center text-neon-purple shrink-0">
        <Icon className="w-4 h-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm text-text-primary truncate">{title}</span>
        <span className="block text-xs text-text-muted truncate">{subtitle}</span>
      </span>
    </button>
  );
}