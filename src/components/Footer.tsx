'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Heart } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

export default function Footer() {
  const { couple, mainDate, closing } = weddingConfig;

  return (
    <footer className="relative isolate overflow-hidden pt-28 pb-16 text-center bg-[var(--parchment)]">
      {/* Floral Backdrop Illustration from Reference */}
      <img
        src="/assets/footer-floral.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-bottom opacity-75"
      />

      {/* Parchment tint & top soft blend gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[var(--parchment)]/60"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-[var(--parchment)] to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative px-6 max-w-lg mx-auto"
      >
        {/* Monogram */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--parchment)]/80 text-[var(--gold)] mb-6 shadow-sm">
          <Heart className="h-5 w-5 fill-[var(--gold)]/30 text-[var(--gold)]" />
        </div>

        {/* Couple Title */}
        <p className="font-display text-3xl sm:text-4xl tracking-[0.18em] text-[var(--pine)] uppercase font-light">
          {closing.monogram}
        </p>

        {/* Date */}
        <p className="mt-2 font-display text-xl sm:text-2xl tracking-[0.25em] text-[var(--gold)]">
          {closing.dateText}
        </p>

        <div className="mx-auto mt-5 w-24 gold-rule" />

        {/* Heartfelt closing message */}
        <blockquote className="mt-6 font-display text-xl sm:text-2xl italic text-[var(--ink)]/85 px-4 leading-relaxed">
          “{closing.message}”
        </blockquote>

        <p className="mt-4 text-xs tracking-[0.2em] text-[var(--ink-muted)] uppercase font-sans">
          {closing.familiesNote}
        </p>

        {/* Family contact buttons */}
        {closing.contacts && closing.contacts.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {closing.contacts.map((contact, idx) => (
              <a
                key={idx}
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/60 bg-[var(--parchment)]/80 px-5 py-2.5 text-[0.65rem] tracking-[0.2em] text-[var(--pine)] uppercase transition-all duration-200 hover:bg-[var(--gold)]/20 active:scale-95 shadow-sm"
              >
                <Phone className="h-3.5 w-3.5 text-[var(--gold)]" aria-hidden="true" />
                <span>{contact.name}</span>
              </a>
            ))}
          </div>
        )}

        {/* Couple Hashtag */}
        <p className="mt-12 text-[0.65rem] tracking-[0.35em] text-[var(--gold)] uppercase font-sans font-medium">
          {couple.hashtag}
        </p>
      </motion.div>
    </footer>
  );
}
