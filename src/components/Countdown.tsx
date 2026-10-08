'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

function calculateTimeLeft(targetIso: string): TimeLeft {
  const target = new Date(targetIso).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isCompleted: false,
  };
}

const UNITS = [
  { key: 'days', label: 'days' },
  { key: 'hours', label: 'hours' },
  { key: 'minutes', label: 'min' },
  { key: 'seconds', label: 'sec' },
] as const;

export default function Countdown() {
  const { mainDate } = weddingConfig;
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(mainDate.targetTimestamp));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(mainDate.targetTimestamp));
    }, 1000);

    return () => clearInterval(timer);
  }, [mainDate.targetTimestamp]);

  return (
    <section className="relative px-5 py-20 bg-[var(--parchment)] paper-grain text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-lg"
      >
        <p className="text-[0.65rem] tracking-[0.4em] text-[var(--gold)] uppercase font-sans font-medium">
          {timeLeft?.isCompleted ? 'The celebration has begun' : 'Counting down to the celebration'}
        </p>
        <div className="mx-auto mt-4 w-28 gold-rule" />

        {/* 4 Arched Parchment Countdown Cards */}
        <div className="mt-9 grid grid-cols-4 gap-2.5 sm:gap-3.5">
          {UNITS.map(({ key, label }) => {
            const value = timeLeft ? String(timeLeft[key]).padStart(2, '0') : '--';

            return (
              <div
                key={key}
                className="relative overflow-hidden rounded-t-[2.2rem] border border-[var(--gold)]/45 bg-[var(--parchment-deep)]/75 px-1 py-5 sm:py-6 shadow-[0_12px_28px_-20px_rgba(48,54,47,0.3)] paper-grain"
              >
                {/* Decorative inner arch hairline */}
                <div className="pointer-events-none absolute inset-x-2 top-2 h-8 rounded-t-[1.8rem] border border-[var(--gold)]/25" />

                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={`${key}-${value}`}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="block font-display text-3xl sm:text-4xl tabular-nums text-[var(--pine)] font-light leading-none"
                  >
                    {value}
                  </motion.span>
                </AnimatePresence>

                <span className="mt-2.5 block text-[0.55rem] sm:text-[0.62rem] tracking-[0.25em] text-[var(--ink-muted)] uppercase font-sans font-medium">
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Date Subtext */}
        <p className="mt-6 font-display text-lg italic text-[var(--ink-muted)]">
          {mainDate.dayOfWeek}, {mainDate.dayNumber} {mainDate.month} {mainDate.year} · 7:00 PM
        </p>
      </motion.div>
    </section>
  );
}
