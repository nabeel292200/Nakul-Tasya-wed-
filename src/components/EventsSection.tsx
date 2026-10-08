'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Sparkles, CalendarPlus, Navigation } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';
import { generateGoogleCalendarUrl } from '@/utils/calendar';

export default function EventsSection() {
  const { events, couple } = weddingConfig;

  return (
    <section className="relative px-5 py-24 bg-[var(--parchment)] paper-grain">
      {/* Background Jaali Lattice Subtle Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(197, 168, 105, 0.5) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[0.65rem] tracking-[0.4em] text-[var(--gold)] uppercase font-sans font-medium">
            Order of Celebrations
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl tracking-[0.15em] text-[var(--pine)] uppercase">
            Wedding Itinerary
          </h2>
          <div className="mx-auto mt-5 w-24 gold-rule" />
        </motion.div>

        {/* Event Cards Stack */}
        <div className="mt-14 space-y-16">
          {events.map((event, index) => {
            const calendarUrl = generateGoogleCalendarUrl(
              event,
              `${couple.groom} & ${couple.bride}`
            );
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              event.mapsQuery || `${event.venueName}, ${event.venueAddress}`
            )}`;

            return (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 36, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative mx-auto max-w-md rounded-t-[8.5rem] border border-[var(--gold)]/50 bg-[var(--parchment-deep)]/60 px-7 pt-14 pb-10 text-center shadow-[0_24px_50px_-35px_rgba(48,54,47,0.25)] paper-grain"
              >
                {/* Inner Arch Border */}
                <div className="pointer-events-none absolute inset-x-3 top-3 bottom-3 rounded-t-[7.8rem] border border-[var(--gold)]/30" />

                {/* Event Name */}
                <p className="text-[0.68rem] tracking-[0.38em] text-[var(--gold)] uppercase font-sans font-semibold">
                  {event.name}
                </p>

                {/* Date */}
                <p className="mt-3 font-display text-3xl sm:text-4xl tracking-[0.1em] text-[var(--pine)]">
                  {event.date}
                </p>

                <div className="mx-auto mt-4 w-20 gold-rule" />

                {/* Event Details */}
                <ul className="mt-6 space-y-4 text-xs sm:text-sm text-[var(--ink)]/85 font-sans">
                  {/* Time */}
                  <li className="flex items-center justify-center gap-2.5">
                    <Clock className="h-4 w-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
                    <span>{event.timeLabel}</span>
                  </li>

                  {/* Venue */}
                  <li className="flex items-center justify-center gap-2.5">
                    <MapPin className="h-4 w-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-[var(--pine)]">{event.venueName}</p>
                      <p className="text-[var(--ink-muted)] text-[11px] sm:text-xs">
                        {event.venueAddress}
                      </p>
                    </div>
                  </li>

                  {/* Dress Code */}
                  {event.dressCode && (
                    <li className="flex items-center justify-center gap-2.5">
                      <Sparkles className="h-4 w-4 text-[var(--gold)] shrink-0" aria-hidden="true" />
                      <span className="text-[var(--ink)]/80 italic">{event.dressCode}</span>
                    </li>
                  )}
                </ul>

                {/* Note */}
                {event.note && (
                  <p className="mt-6 font-display text-base sm:text-lg italic text-[var(--ink-muted)]">
                    {event.note}
                  </p>
                )}

                {/* Action CTA Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={calendarUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[var(--pine)] px-6 py-3 text-[0.68rem] tracking-[0.22em] text-[var(--parchment)] uppercase transition-all duration-200 hover:bg-[var(--pine-dark)] active:scale-95 shadow-sm"
                  >
                    <CalendarPlus className="h-4 w-4 text-[var(--gold)] transition-transform group-hover:rotate-12" />
                    <span>Add to calendar</span>
                  </a>

                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[var(--gold)]/70 bg-[var(--parchment)]/80 px-6 py-3 text-[0.68rem] tracking-[0.2em] text-[var(--pine)] uppercase transition-all hover:bg-[var(--gold)]/15 active:scale-95"
                  >
                    <Navigation className="h-3.5 w-3.5 text-[var(--gold)] transition-transform group-hover:translate-x-0.5" />
                    <span>Directions</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
