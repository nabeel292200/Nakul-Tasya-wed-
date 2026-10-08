'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';

export default function FamilySection() {
  const { blessings } = weddingConfig;

  return (
    <section className="relative px-5 py-24 bg-[var(--parchment)] paper-grain text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-lg"
      >
        {/* Top Gold Rule */}
        <div className="mx-auto w-24 gold-rule" />

        {/* Nuptial Verse / Blessing */}
        {blessings.sanskritLine && (
          <p className="mt-8 font-display text-xl sm:text-2xl leading-relaxed text-[var(--pine)] tracking-wide">
            {blessings.sanskritLine}
          </p>
        )}

        {blessings.translation && (
          <blockquote className="mt-5 font-display text-lg sm:text-xl leading-relaxed italic text-[var(--ink)]/80 px-4">
            “{blessings.translation}”
          </blockquote>
        )}

        {blessings.source && (
          <p className="mt-4 text-[0.62rem] tracking-[0.3em] text-[var(--gold)] uppercase font-sans font-medium">
            {blessings.source}
          </p>
        )}

        <div className="mx-auto my-10 w-16 gold-rule" />

        {/* Minimal Family Blessings Heading */}
        <p className="text-[0.65rem] tracking-[0.38em] text-[var(--ink-muted)] uppercase font-sans">
          With the blessings of our families
        </p>

        {/* Family Names Grid */}
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-md mx-auto">
          {blessings.families.map((fam, idx) => (
            <div
              key={idx}
              className="rounded-t-[2.5rem] border border-[var(--gold)]/40 bg-[var(--parchment-deep)]/60 px-6 py-6 shadow-sm paper-grain"
            >
              <p className="text-[0.6rem] tracking-[0.3em] text-[var(--gold)] uppercase font-sans font-medium">
                {fam.title}
              </p>
              <p className="mt-2 font-display text-2xl text-[var(--pine)]">
                {fam.names}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Gold Rule */}
        <div className="mx-auto mt-12 w-24 gold-rule" />
      </motion.div>
    </section>
  );
}
