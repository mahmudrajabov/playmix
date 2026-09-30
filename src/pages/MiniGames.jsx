import React, { useState } from "react";
import { Heart } from "lucide-react";
import { games } from "@/lib/data";
import { STORAGE_KEYS, toggleFavorite, isFavorite } from "@/lib/storage";
import TicTacToe from "@/components/games/TicTacToe";
import RockPaperScissors from "@/components/games/RockPaperScissors";
import MemoryGame from "@/components/games/MemoryGame";
import NumberGuessing from "@/components/games/NumberGuessing";
import QuizGame from "@/components/games/QuizGame";

const components = {
  tictactoe: TicTacToe,
  rps: RockPaperScissors,
  memory: MemoryGame,
  number_guess: NumberGuessing,
  quiz: QuizGame,
};

export default function MiniGames() {
  const [active, setActive] = useState("tictactoe");
  const [favTick, setFavTick] = useState(0);
  const ActiveGame = components[active];
  const activeGame = games.find((g) => g.id === active);

  const toggleFav = (id) => {
    toggleFavorite(STORAGE_KEYS.favGames, id);
    setFavTick((t) => t + 1);
  };
  const isFav = (id) => isFavorite(STORAGE_KEYS.favGames, id);
  // reference favTick so re-render happens
  void favTick;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <header className="mb-6 mt-6">
        <h1 className="font-display text-3xl font-bold mb-1">Mini Games</h1>
        <p className="text-text-muted text-sm">Pick a game, beat your best score. Scores save automatically.</p>
      </header>

      {/* Game tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-2 mb-6 -mx-4 px-4">
        {games.map((g) => (
          <button
            key={g.id}
            onClick={() => setActive(g.id)}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
              active === g.id
                ? "bg-gradient-to-r from-neon-purple/25 to-neon-blue/15 border-neon-purple/50 text-text-primary"
                : "bg-card-fill border-surface-border text-text-muted hover:border-neon-purple/40"
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      {/* Active game card */}
      <div className="neon-card p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-32 neon-glow pointer-events-none" />
        <div className="relative flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-semibold">{activeGame.title}</h2>
            <p className="text-text-muted text-sm">{activeGame.desc}</p>
          </div>
          <button
            onClick={() => toggleFav(activeGame.id)}
            className={`p-2.5 rounded-full border transition-colors ${isFav(activeGame.id) ? "bg-neon-pink/15 border-neon-pink/50 text-neon-pink" : "bg-card-fill border-surface-border text-text-muted hover:text-neon-pink"}`}
            aria-label="Favorite game"
          >
            <Heart className={`w-5 h-5 ${isFav(activeGame.id) ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="relative">
          <ActiveGame />
        </div>
      </div>
    </div>
  );
}