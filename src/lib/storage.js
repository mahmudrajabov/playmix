// localStorage helpers for PlayMix (scores + favorites)

export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

export const STORAGE_KEYS = {
  bestScores: "playmix_best_scores",
  favGames: "playmix_fav_games",
  favSongs: "playmix_fav_songs",
  favImages: "playmix_fav_images",
  favMovies: "playmix_fav_movies",
};

export function getBestScores() {
  return loadJSON(STORAGE_KEYS.bestScores, {});
}

export function setBestScore(gameId, score) {
  const scores = getBestScores();
  // higher score is better for most games; for guessing, fewer attempts is better
  if (gameId === "number_guess") {
    const prev = scores[gameId];
    if (prev == null || score < prev) scores[gameId] = score;
  } else {
    if (score > (scores[gameId] ?? 0)) scores[gameId] = score;
  }
  saveJSON(STORAGE_KEYS.bestScores, scores);
  return scores[gameId];
}

export function toggleFavorite(key, id) {
  const favs = loadJSON(key, []);
  const exists = favs.includes(id);
  const next = exists ? favs.filter((x) => x !== id) : [...favs, id];
  saveJSON(key, next);
  return { isFav: !exists, favs: next };
}

export function isFavorite(key, id) {
  return loadJSON(key, []).includes(id);
}

export function getFavorites(key) {
  return loadJSON(key, []);
}