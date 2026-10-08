'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';

export default function CoupleSection() {
  const { couple } = weddingConfig;

  return (
    <section className="relative px-5 py-20 bg-[var(--parchment)] paper-grain text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-lg"
      >
        {/* Section kicker */}
        <p className="text-[0.65rem] tracking-[0.4em] text-[var(--gold)] uppercase font-sans font-medium">
          The Happy Couple
        </p>

        {/* Names */}
        <h2 className="mt-4 text-2xl sm:text-3xl tracking-[0.2em] font-light text-[var(--pine)] uppercase font-sans flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>{couple.groomFull}</span>
          <span className="font-display text-2xl lowercase italic text-[var(--pine)]/70">
            and
          </span>
          <span>{couple.brideFull}</span>
        </h2>

        <div className="mx-auto mt-6 w-24 gold-rule" />

        {/* Large Arch Framed Photograph */}
        <div className="relative mx-auto mt-10 max-w-sm">
          {/* Outer Arch Frame */}
          <div className="relative overflow-hidden rounded-t-[9rem] border border-[var(--gold)]/50 bg-[var(--parchment-deep)] p-2.5 shadow-[0_30px_60px_-40px_rgba(48,54,47,0.35)]">
            {/* Inner Arch Frame with image */}
            <div className="relative overflow-hidden rounded-t-[8.2rem] border border-[var(--gold)]/35">
              <motion.img
                src={couple.portraitImage}
                alt={`${couple.groomFull} and ${couple.brideFull}`}
                loading="lazy"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-[420px] sm:h-[480px] w-full object-cover object-top"
              />
              {/* Subtle warm lighting vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--pine)]/20 via-transparent to-transparent" />
            </div>

            {/* Inset ornamental corner borders */}
            <div className="pointer-events-none absolute inset-4 rounded-t-[7.8rem] border border-[var(--parchment)]/30" />
          </div>

          {/* Monogram tag below picture */}
          <div className="mt-5 text-center">
            <p className="text-[0.62rem] tracking-[0.3em] text-[var(--ink-muted)] uppercase font-sans">
              Joined in Love · Blessed by Grace
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
