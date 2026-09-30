import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { musicTracks } from "./data";
import { STORAGE_KEYS, loadJSON, saveJSON } from "./storage";

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [favorites, setFavorites] = useState(() => loadJSON(STORAGE_KEYS.favSongs, []));

  const track = musicTracks[currentIndex];

  // ensure audio element exists
  if (!audioRef.current && typeof Audio !== "undefined") {
    audioRef.current = new Audio();
    audioRef.current.preload = "metadata";
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onDur = () => setDuration(audio.duration || 0);
    const onEnd = () => next();
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onDur);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onDur);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = track.src;
    audio.volume = volume;
    setProgress(0);
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => setIsPlaying(false));
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % musicTracks.length);
    setIsPlaying(true);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + musicTracks.length) % musicTracks.length);
    setIsPlaying(true);
  }, []);

  const selectTrack = useCallback((id) => {
    const idx = musicTracks.findIndex((t) => t.id === id);
    if (idx >= 0) {
      setCurrentIndex(idx);
      setIsPlaying(true);
    }
  }, []);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      setProgress(time);
    }
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
      saveJSON(STORAGE_KEYS.favSongs, next);
      return next;
    });
  }, []);

  const value = {
    track,
    currentIndex,
    isPlaying,
    progress,
    duration,
    volume,
    favorites,
    play,
    pause,
    toggle,
    next,
    prev,
    selectTrack,
    seek,
    setVolume,
    toggleFavorite,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}