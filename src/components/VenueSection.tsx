'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

export default function VenueSection() {
  const { primaryVenue } = weddingConfig;

  return (
    <section className="relative px-5 py-20 bg-[var(--parchment)] paper-grain text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-lg"
      >
        {/* Section title */}
        <p className="text-[0.65rem] tracking-[0.4em] text-[var(--gold)] uppercase font-sans font-medium">
          Celebration Location
        </p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl tracking-[0.14em] text-[var(--pine)] uppercase">
          {primaryVenue.title}
        </h2>
        <div className="mx-auto mt-4 w-24 gold-rule" />

        {/* Illustrated Map Card */}
        <a
          href={primaryVenue.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="group mt-9 block overflow-hidden rounded-t-[3.5rem] border border-[var(--gold)]/50 bg-[var(--parchment-deep)] shadow-[0_24px_50px_-40px_rgba(48,54,47,0.35)] transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="relative">
            <img
              src={primaryVenue.mapPreviewImage}
              alt={`Illustrated map of ${primaryVenue.name}`}
              loading="lazy"
              className="h-56 sm:h-64 w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <span className="absolute inset-0 bg-[var(--pine)]/0 transition-colors group-hover:bg-[var(--pine)]/10" />

            {/* Floating badge */}
            <span className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-[var(--gold)]/50 bg-[var(--parchment)]/95 px-5 py-2 text-[0.62rem] tracking-[0.24em] text-[var(--pine)] uppercase shadow-md backdrop-blur-sm">
              <Navigation className="h-3.5 w-3.5 text-[var(--gold)]" aria-hidden="true" />
              <span>Open in maps</span>
            </span>
          </div>
        </a>

        {/* Venue Information */}
        <h3 className="mt-8 font-display text-2xl sm:text-3xl text-[var(--pine)]">
          {primaryVenue.name}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[var(--ink-muted)] max-w-sm mx-auto leading-relaxed font-sans">
          {primaryVenue.address}
        </p>

        {/* Action Button */}
        <div className="mt-7 flex items-center justify-center gap-3">
          <a
            href={primaryVenue.directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/80 bg-[var(--parchment)] px-7 py-3 text-[0.68rem] tracking-[0.25em] text-[var(--pine)] uppercase transition-all duration-200 hover:bg-[var(--gold)]/15 active:scale-95 shadow-sm cursor-pointer"
          >
            <MapPin className="h-3.5 w-3.5 text-[var(--gold)] transition-transform group-hover:scale-110" />
            <span>View Location</span>
            <ExternalLink className="h-3 w-3 text-[var(--gold)] opacity-70" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
