'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ autoPlayTrigger }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(weddingConfig.music.audioSrc);
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const synthNodesRef = useRef<Array<{ stop: () => void }> | null>(null);

  const startAmbientSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Soothing raga-inspired pentatonic harmonic drone (D, A, D5, F#5)
      const freqs = [146.83, 220.0, 293.66, 369.99];
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);

      const oscs = freqs.map((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        gain.gain.setValueAtTime(0.05 / (i + 1), ctx.currentTime);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();
        return osc;
      });

      synthNodesRef.current = [
        {
          stop: () => {
            try {
              masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
              setTimeout(() => {
                oscs.forEach((o) => {
                  try { o.stop(); } catch {}
                });
                ctx.close();
              }, 900);
            } catch {}
          },
        },
      ];
    } catch (e) {
      console.warn('WebAudio fallback error:', e);
    }
  };

  const stopAmbientSynth = () => {
    if (synthNodesRef.current) {
      synthNodesRef.current.forEach((n) => n.stop());
      synthNodesRef.current = null;
    }
  };

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If mp3 fails, fallback to gentle ambient synth
          startAmbientSynth();
          setIsPlaying(true);
        });
    } else {
      startAmbientSynth();
      setIsPlaying(true);
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopAmbientSynth();
    setIsPlaying(false);
  };

  // When autoPlayTrigger turns true (e.g., user clicked "Open Invitation")
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying && !hasInteracted) {
      setHasInteracted(true);
      playMusic();
    }
  }, [autoPlayTrigger, hasInteracted, isPlaying]);

  const togglePlay = () => {
    setHasInteracted(true);
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <motion.button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[var(--gold)]/60 bg-[var(--parchment)]/90 shadow-[0_8px_24px_rgba(48,54,47,0.15)] backdrop-blur-md transition-colors hover:border-[var(--gold)] hover:bg-[var(--parchment)] cursor-pointer"
      >
        {/* Animated aura ring when music is playing */}
        {isPlaying && (
          <motion.span
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full border border-[var(--gold)]"
          />
        )}

        {/* Music Bars / Soundwaves animation */}
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-center gap-[3px] h-4">
              {[0.4, 0.9, 0.6, 1, 0.5].map((scale, i) => (
                <motion.span
                  key={i}
                  animate={{
                    height: ['4px', `${12 * scale + 4}px`, '4px'],
                  }}
                  transition={{
                    duration: 0.8 + i * 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: 'reverse',
                    delay: i * 0.1,
                  }}
                  className="w-[2.5px] rounded-full bg-[var(--gold)]"
                />
              ))}
            </div>
          ) : (
            <VolumeX className="h-4 w-4 text-[var(--ink-muted)] transition-colors group-hover:text-[var(--gold)]" />
          )}
        </div>

        {/* Small floating badge */}
        <AnimatePresence>
          {!hasInteracted && !isPlaying && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-[var(--gold)]/40 bg-[var(--parchment)] px-3 py-1 text-[10px] tracking-[0.2em] text-[var(--pine)] uppercase shadow-md font-sans"
            >
              Play Music ♫
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
