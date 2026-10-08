'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';

export default function InvitationIntro() {
  const { invitation, couple } = weddingConfig;

  return (
    <section className="relative px-6 py-20 sm:py-28 overflow-hidden bg-[var(--parchment)] paper-grain text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-xl"
      >
        {/* Subtle decorative motif */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--gold)]/60" />
          <span className="text-[var(--gold)] text-xs">❦</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--gold)]/60" />
        </div>

        <p className="text-[0.68rem] tracking-[0.38em] text-[var(--gold)] uppercase font-sans font-medium">
          A Celebration of Love
        </p>

        {/* Main invitation quote */}
        <blockquote className="mt-6 font-display text-2xl sm:text-3xl md:text-4xl font-light leading-relaxed text-[var(--pine)] italic px-4">
          “{invitation.messageText}”
        </blockquote>

        <div className="mx-auto mt-8 w-28 gold-rule" />

        <p className="mt-7 text-xs sm:text-sm tracking-[0.25em] text-[var(--ink-muted)] uppercase font-sans">
          {couple.groomFull} &amp; {couple.brideFull}
        </p>
      </motion.div>
    </section>
  );
}
