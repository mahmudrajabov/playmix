import React, { useState, useEffect, useMemo } from "react";
import { RotateCcw, Trophy, Check, X } from "lucide-react";
import { quizQuestions } from "@/lib/data";
import { getBestScores, setBestScore } from "@/lib/storage";

function shuffleQ(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizGame() {
  const questions = useMemo(() => shuffleQ(quizQuestions).slice(0, 8), []);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(false);
  const [best, setBest] = useState(() => getBestScores().quiz_score || 0);
  const q = questions[idx];

  useEffect(() => {
    if (done) {
      if (score > best) {
        setBestScore("quiz_score", score);
        setBest(score);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const pick = (i) => {
    if (picked != null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx + 1 < questions.length) {
        setIdx(idx + 1);
        setPicked(null);
      } else {
        setDone(true);
      }
    }, 900);
  };

  const reset = () => {
    setIdx(0); setScore(0); setPicked(null); setDone(false);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center gap-5 text-center">
        <Trophy className="w-12 h-12 text-neon-purple" />
        <p className="text-2xl font-display font-bold">You scored {score}/{questions.length}</p>
        <p className="text-text-muted text-sm">Best: {best}/{questions.length}</p>
        <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue text-white text-sm hover:scale-105 transition-transform">
          <RotateCcw className="w-4 h-4" /> Play again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
      <div className="flex items-center gap-4 text-sm w-full justify-between">
        <span className="text-text-muted">Question {idx + 1}/{questions.length}</span>
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-fill border border-surface-border">
          <Trophy className="w-4 h-4 text-neon-blue" /> {score} pts
        </span>
      </div>

      <div className="w-full h-1.5 bg-surface-border rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-neon-purple to-neon-blue transition-all" style={{ width: `${((idx) / questions.length) * 100}%` }} />
      </div>

      <p className="text-lg font-display font-semibold text-center">{q.q}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer;
          const isPicked = picked === i;
          let cls = "bg-card-fill border-surface-border hover:border-neon-purple/60";
          if (picked != null) {
            if (isCorrect) cls = "bg-neon-purple/20 border-neon-purple text-text-primary";
            else if (isPicked) cls = "bg-neon-pink/15 border-neon-pink/60 text-text-primary";
            else cls = "bg-card-fill border-surface-border opacity-50";
          }
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              disabled={picked != null}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-colors ${cls}`}
            >
              <span>{opt}</span>
              {picked != null && isCorrect && <Check className="w-4 h-4 text-neon-purple" />}
              {picked != null && isPicked && !isCorrect && <X className="w-4 h-4 text-neon-pink" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}