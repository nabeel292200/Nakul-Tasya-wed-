'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';
import { generateGoogleCalendarUrl } from '@/utils/calendar';

export default function DateSection() {
  const { mainDate, events, couple } = weddingConfig;
  const weddingEvent = events.find((e) => e.id === 'wedding') || events[0];
  const calendarUrl = generateGoogleCalendarUrl(
    weddingEvent,
    `${couple.groom} & ${couple.bride}`
  );

  return (
    <section className="relative px-5 py-20 bg-[var(--parchment)] paper-grain text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-md"
      >
        {/* Arched Date Card */}
        <div className="relative rounded-t-[9rem] border border-[var(--gold)]/50 bg-[var(--parchment-deep)]/70 px-8 pt-16 pb-12 shadow-[0_24px_50px_-35px_rgba(48,54,47,0.3)] paper-grain">
          {/* Inner hairline border */}
          <div className="pointer-events-none absolute inset-x-3.5 top-3.5 bottom-3.5 rounded-t-[8.2rem] border border-[var(--gold)]/30" />

          {/* Subtitle */}
          <p className="text-[0.65rem] tracking-[0.4em] text-[var(--gold)] uppercase font-sans font-medium">
            Save The Date
          </p>

          {/* Day of Week */}
          <p className="mt-6 text-sm tracking-[0.35em] text-[var(--ink-muted)] uppercase font-sans">
            {mainDate.dayOfWeek}
          </p>

          {/* Day Number */}
          <div className="my-2">
            <span className="font-display text-7xl sm:text-8xl font-light text-[var(--pine)] tracking-tight leading-none">
              {mainDate.dayNumber}
            </span>
          </div>

          {/* Month & Year */}
          <p className="font-display text-2xl sm:text-3xl tracking-[0.2em] text-[var(--gold)] uppercase">
            {mainDate.month}
          </p>
          <p className="mt-1 text-xs tracking-[0.3em] text-[var(--ink-muted)] uppercase font-sans font-light">
            {mainDate.year}
          </p>

          {/* Center gold rule */}
          <div className="mx-auto mt-6 w-28 gold-rule" />

          {/* Warm closing remark */}
          <p className="mt-6 font-display text-lg italic text-[var(--ink)]/80 px-2 leading-relaxed">
            “{mainDate.subtext}”
          </p>

          {/* Add to Calendar button */}
          <div className="mt-8">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--gold)]/70 bg-[var(--parchment)] px-6 py-3 text-[0.68rem] tracking-[0.25em] text-[var(--pine)] uppercase transition-all duration-300 hover:bg-[var(--gold)]/15 hover:border-[var(--gold)] active:scale-95 shadow-sm"
            >
              <CalendarPlus className="h-4 w-4 text-[var(--gold)] transition-transform group-hover:rotate-12" />
              <span>Add to Calendar</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
