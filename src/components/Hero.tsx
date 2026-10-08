'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';

interface HeroProps {
  isUnlocked: boolean;
}

export default function Hero({ isUnlocked }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  const { couple, invitation, mainDate, primaryVenue } = weddingConfig;

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-between overflow-hidden bg-[var(--parchment)] paper-grain pt-4"
    >
      {/* Background Arch Illustration with gentle parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-10 inset-x-0 bottom-0 pointer-events-none"
      >
        <img
          src="/assets/hero-arch.jpg"
          alt="Illustrated Mughal arch with lotus blooms"
          className="h-full w-full object-cover object-top filter brightness-[0.98] contrast-[1.02]"
        />
        {/* Soft tone overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--pine)]/20 via-transparent via-40% to-[var(--parchment)]" />
      </motion.div>

      {/* Seamless blend gradient from illustration to parchment */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-80 bg-gradient-to-t from-[var(--parchment)] via-[var(--parchment)]/95 via-60% to-transparent" />

      {/* Hero Typography & Invitation Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 mt-auto w-full max-w-xl px-6 pt-28 pb-6 text-center"
      >
        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isUnlocked ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[0.68rem] sm:text-xs tracking-[0.42em] text-[var(--ink-muted)] uppercase font-sans font-medium"
        >
          {invitation.kicker}
        </motion.p>

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, y: 22, letterSpacing: '0.35em' }}
          animate={isUnlocked ? { opacity: 1, y: 0, letterSpacing: '0.18em' } : false}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-4 max-w-md text-4xl sm:text-5xl md:text-6xl leading-tight font-light text-[var(--pine)] uppercase font-sans tracking-[0.18em]"
        >
          <span>{couple.groom}</span>
          <span className="mx-3 inline-block font-display text-2xl sm:text-3xl lowercase italic text-[var(--pine)]/70">
            &
          </span>
          <span>{couple.bride}</span>
        </motion.h1>

        {/* Center Golden Divider Rule with Diamond */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.3 }}
          animate={isUnlocked ? { opacity: 1, scaleX: 1 } : false}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="mx-auto mt-6 w-52 gold-rule"
        />

        {/* Invitation Line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isUnlocked ? { opacity: 1 } : false}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-6 text-xs sm:text-sm text-[var(--ink)]/85 tracking-wider font-light"
        >
          {invitation.openingLine}
        </motion.p>

        {/* Date Display */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isUnlocked ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-3.5 font-display text-3xl sm:text-4xl tracking-[0.2em] text-[var(--gold)] font-normal"
        >
          {mainDate.formattedDate}
        </motion.p>

        {/* Venue Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isUnlocked ? { opacity: 1 } : false}
          transition={{ duration: 1, delay: 1.25 }}
          className="mt-2 text-[0.72rem] sm:text-xs tracking-[0.28em] text-[var(--ink-muted)] uppercase font-sans"
        >
          {primaryVenue.name} · {primaryVenue.cityState}
        </motion.p>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="relative z-20 pb-8 pt-2 text-center"
      >
        <span className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.32em] text-[var(--ink-muted)] uppercase font-sans">
          scroll to explore
        </span>
        <motion.div
          animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mt-2 h-8 w-px bg-[var(--gold)]"
        />
      </motion.div>
    </section>
  );
}
