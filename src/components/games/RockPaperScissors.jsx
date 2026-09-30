import React, { useState, useEffect } from "react";
import { RotateCcw, Trophy } from "lucide-react";
import { getBestScores, setBestScore } from "@/lib/storage";

const MOVES = ["rock", "paper", "scissors"];
const EMOJI = { rock: "✊", paper: "✋", scissors: "✌️" };

function judge(p, a) {
  if (p === a) return "draw";
  if ((p === "rock" && a === "scissors") || (p === "paper" && a === "rock") || (p === "scissors" && a === "paper")) return "win";
  return "lose";
}

export default function RockPaperScissors() {
  const [player, setPlayer] = useState(null);
  const [ai, setAi] = useState(null);
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(() => getBestScores().rps_streak || 0);

  const play = (move) => {
    const aiMove = MOVES[Math.floor(Math.random() * 3)];
    const r = judge(move, aiMove);
    setPlayer(move);
    setAi(aiMove);
    setResult(r);
    if (r === "win") {
      setStreak((s) => {
        const ns = s + 1;
        if (ns > best) {
          setBestScore("rps_streak", ns);
          setBest(ns);
        }
        return ns;
      });
    } else if (r === "lose") {
      setStreak(0);
    }
  };

  const reset = () => {
    setPlayer(null); setAi(null); setResult(null); setStreak(0);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-fill border border-surface-border">
          <Trophy className="w-4 h-4 text-neon-blue" /> Best streak: {best}
        </span>
        <span className="text-text-muted">Streak: {streak}</span>
      </div>

      <div className="flex items-center justify-center gap-8 py-4">
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl">{player ? EMOJI[player] : "❔"}</span>
          <span className="text-xs text-text-muted">You</span>
        </div>
        <span className="text-2xl text-text-muted">vs</span>
        <div className="flex flex-col items-center gap-2">
          <span className="text-6xl">{ai ? EMOJI[ai] : "❔"}</span>
          <span className="text-xs text-text-muted">AI</span>
        </div>
      </div>

      {result && (
        <p className={`text-lg font-display font-semibold ${result === "win" ? "text-neon-purple" : result === "lose" ? "text-neon-pink" : "text-text-muted"}`}>
          {result === "win" ? "You win this round!" : result === "lose" ? "AI takes it." : "Draw."}
        </p>
      )}

      <div className="flex gap-3">
        {MOVES.map((m) => (
          <button
            key={m}
            onClick={() => play(m)}
            className="w-16 h-16 rounded-2xl bg-card-fill border border-surface-border hover:border-neon-purple/60 hover:scale-105 transition-all text-3xl flex items-center justify-center"
            aria-label={m}
          >
            {EMOJI[m]}
          </button>
        ))}
      </div>

      <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-surface-border hover:border-neon-purple/60 text-sm transition-colors">
        <RotateCcw className="w-4 h-4" /> Restart
      </button>
    </div>
  );
}