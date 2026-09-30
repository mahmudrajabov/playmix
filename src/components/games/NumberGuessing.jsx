import React, { useState, useEffect, useRef } from "react";
import { RotateCcw, Trophy, Send } from "lucide-react";
import { getBestScores, setBestScore } from "@/lib/storage";

export default function NumberGuessing() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState([]);
  const [hint, setHint] = useState("Guess a number between 1 and 100");
  const [won, setWon] = useState(false);
  const [best, setBest] = useState(() => getBestScores().number_guess);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = (e) => {
    e?.preventDefault();
    const n = parseInt(guess, 10);
    if (isNaN(n) || n < 1 || n > 100) return;
    const a = attempts + 1;
    setAttempts(a);
    setHistory((h) => [{ n, h: n === target ? "correct" : n < target ? "higher" : "lower" }, ...h]);
    if (n === target) {
      setWon(true);
      setHint(`Got it in ${a} tries! 🎉`);
      const newBest = setBestScore("number_guess", a);
      setBest(newBest);
    } else {
      setHint(n < target ? "Try higher ↑" : "Try lower ↓");
    }
    setGuess("");
  };

  const reset = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess(""); setAttempts(0); setHistory([]); setHint("Guess a number between 1 and 100"); setWon(false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm mx-auto">
      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-fill border border-surface-border">
          <Trophy className="w-4 h-4 text-neon-purple" /> Best: {best != null ? `${best} tries` : "—"}
        </span>
        <span className="text-text-muted">Tries: {attempts}</span>
      </div>

      <p className={`text-base font-medium ${won ? "text-neon-purple" : "text-text-primary"}`}>{hint}</p>

      <form onSubmit={submit} className="flex gap-2 w-full">
        <input
          ref={inputRef}
          type="number"
          min={1}
          max={100}
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          disabled={won}
          className="flex-1 px-4 py-2.5 rounded-xl bg-card-fill border border-surface-border focus:border-neon-purple outline-none text-text-primary text-center text-lg"
          placeholder="1–100"
        />
        <button type="submit" disabled={won || !guess} className="px-4 rounded-xl bg-gradient-to-br from-neon-purple to-neon-blue text-white disabled:opacity-40 hover:scale-105 transition-transform">
          <Send className="w-4 h-4" />
        </button>
      </form>

      {history.length > 0 && (
        <div className="w-full flex flex-wrap gap-2 justify-center">
          {history.map((h, i) => (
            <span key={i} className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
              h.h === "correct" ? "bg-neon-purple/20 border-neon-purple text-text-primary" :
              h.h === "higher" ? "bg-neon-blue/10 border-neon-blue/40 text-neon-blue" :
              "bg-neon-pink/10 border-neon-pink/40 text-neon-pink"
            }`}>
              {h.n} {h.h === "higher" ? "↑" : h.h === "lower" ? "↓" : "✓"}
            </span>
          ))}
        </div>
      )}

      <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-surface-border hover:border-neon-purple/60 text-sm transition-colors">
        <RotateCcw className="w-4 h-4" /> {won ? "Play again" : "Restart"}
      </button>
    </div>
  );
}