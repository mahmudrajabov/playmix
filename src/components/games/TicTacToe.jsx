import React, { useState, useEffect } from "react";
import { RotateCcw, Trophy } from "lucide-react";
import { getBestScores, setBestScore } from "@/lib/storage";

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function calcWinner(b) {
  for (const [a, c, d] of LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return null;
}

// Simple AI: win if possible, block opponent, else pick center/corner/random
function aiMove(board) {
  const cells = ["X", "O"];
  const me = "O", opp = "X";
  const tryWin = (p) => {
    for (const [a, c, d] of LINES) {
      const line = [board[a], board[c], board[d]];
      const empty = [a, c, d].filter((i) => !board[i]);
      if (line.filter((v) => v === p).length === 2 && empty.length === 1) return empty[0];
    }
    return null;
  };
  let m = tryWin(me);
  if (m != null) return m;
  m = tryWin(opp);
  if (m != null) return m;
  if (!board[4]) return 4;
  const corners = [0, 2, 6, 8].filter((i) => !board[i]);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];
  const empty = board.map((v, i) => (v ? null : i)).filter((v) => v != null);
  return empty[Math.floor(Math.random() * empty.length)];
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [scores, setScores] = useState(() => getBestScores());
  const winner = calcWinner(board);
  const full = board.every(Boolean);
  const done = winner || full;

  useEffect(() => {
    if (!xTurn && !done) {
      const t = setTimeout(() => {
        const move = aiMove(board);
        if (move != null) {
          setBoard((b) => {
            if (b[move]) return b;
            const nb = b.slice();
            nb[move] = "O";
            return nb;
          });
          setXTurn(true);
        }
      }, 450);
      return () => clearTimeout(t);
    }
  }, [xTurn, board, done]);

  useEffect(() => {
    if (winner === "X") {
      const newBest = setBestScore("tictactoe_wins", (scores.tictactoe_wins || 0) + 1);
      setScores((s) => ({ ...s, tictactoe_wins: newBest }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner]);

  const click = (i) => {
    if (board[i] || done || !xTurn) return;
    const nb = board.slice();
    nb[i] = "X";
    setBoard(nb);
    setXTurn(false);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  };

  const status = winner === "X" ? "You win! 🎉" : winner === "O" ? "AI wins." : full ? "It's a draw." : xTurn ? "Your turn (X)" : "AI thinking…";

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-4 text-sm">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card-fill border border-surface-border">
          <Trophy className="w-4 h-4 text-neon-purple" /> Wins: {scores.tictactoe_wins || 0}
        </span>
        <span className="text-text-muted">{status}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => click(i)}
            disabled={!!cell || done || !xTurn}
            className="aspect-square rounded-xl bg-card-fill border border-surface-border text-3xl font-display font-bold flex items-center justify-center hover:border-neon-purple/60 transition-colors disabled:cursor-default"
          >
            <span className={cell === "X" ? "text-neon-purple" : "text-neon-blue"}>{cell}</span>
          </button>
        ))}
      </div>
      <button onClick={reset} className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-surface-border hover:border-neon-purple/60 text-sm transition-colors">
        <RotateCcw className="w-4 h-4" /> Restart
      </button>
    </div>
  );
}