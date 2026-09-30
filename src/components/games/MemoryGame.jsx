import React, { useState, useEffect, useMemo } from "react";
import { RotateCcw, Trophy } from "lucide-react";
import { getBestScores, setBestScore } from "@/lib/storage";

const ICONS = ["🚀", "🎮", "🎧", "🎬", "🌌", "⚡", "🔥", "💎"];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryGame() {
  const deck = useMemo(() => shuffle([...ICONS, ...ICONS]).map((icon, i) => ({ id: i, icon })), []);
  const [cards, setCards] = useState(() => deck.map((c) => ({ ...c, flipped: false, matched: false })));
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState(() => getBestScores().memory_moves);
  const won = cards.every((c) => c.matched);

  useEffect(() => {
    if (won) {
      if (best == null || moves < best) {
        setBestScore("memory_moves", moves);
        setBest(moves);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  useEffect(() => {
    if (selected.length === 2) {
      const [a, b] = selected;
      setMoves((m) => m + 1);
      if (cards[a].icon === cards[b].icon) {
        setCards((cs) => cs.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c)));
        setSelected([]);
      } else {
        setTimeout(() => {
          setCards((cs) => cs.map((c, i) => (i === a || i === b ? { ...c, flipped: false } : c)));
          setSelected([]);
        }, 700);
      }
    }
  }, [selected, cards]);

  const flip = (i) => {
    if (cards[i].flipped || cards[i].matched || selected.length === 2) return;
    setCards((cs) => cs.map((c, idx) => (idx === i ? { ...c, flipped: true } : c)));
    setSelected((s) => [...s, i]);
  };

  const reset = () => {
    const nd = shuffle([...ICONS, ...ICONS]).map((icon, i) => ({ id: i, icon }));
    setCards(nd.map((c) => ({ ...c, flipped: false, matched: false })));
    setSelected([]);
    setMoves(0);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-fill border border-surface-border">
          <Trophy className="w-4 h-4 text-neon-pink" /> Best: {best != null ? `${best} moves` : "—"}
        </span>
        <span className="text-text-muted">Moves: {moves}</span>
      </div>

      {won && <p className="text-neon-purple font-display font-semibold text-lg">Solved in {moves} moves! 🎉</p>}

      <div className="grid grid-cols-4 gap-2.5 w-full max-w-sm">
        {cards.map((c, i) => (
          <button
            key={c.id}
            onClick={() => flip(i)}
            className={`aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300 ${
              c.flipped || c.matched
                ? "bg-gradient-to-br from-neon-purple/30 to-neon-blue/20 border border-neon-purple/50"
                : "bg-card-fill border border-surface-border hover:border-neon-purple/40"
            } ${c.matched ? "opacity-50" : ""}`}
          >
            {c.flipped || c.matched ? c.icon : ""}
          </button>
        ))}
      </div>

      <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-surface-border hover:border-neon-purple/60 text-sm transition-colors">
        <RotateCcw className="w-4 h-4" /> Restart
      </button>
    </div>
  );
}