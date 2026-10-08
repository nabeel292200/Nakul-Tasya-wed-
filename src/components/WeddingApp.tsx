'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { CalendarPlus, Clock, Instagram, MapPin, Navigation, Phone, Shirt, X } from 'lucide-react';
import { weddingData, EventItem } from '@/config/wedding';

// Gate Context
const GateContext = createContext<boolean>(false);
const useGate = () => useContext(GateContext);

const GATE_EASE = [0.83, 0, 0.17, 1] as const;

// Scroll Animation Reveal Wrapper (V_ in reference)
function ScrollReveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y, filter: 'blur(6px)' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// 1. Gate Overlay Component (j_ in reference)
function GateOverlay({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  const { couple, invite, event } = weddingData;

  return (
    <motion.div
      className="fixed inset-0 z-50"
      style={{ pointerEvents: opened ? 'none' : 'auto' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {(['left', 'right'] as const).map((side) => (
        <motion.div
          key={side}
          initial={{ x: 0 }}
          animate={{ x: opened ? (side === 'left' ? '-101%' : '101%') : 0 }}
          transition={{ duration: 1.6, ease: GATE_EASE }}
          className={`absolute top-0 h-full w-1/2 overflow-hidden bg-[var(--pine,#354234)] ${side === 'left' ? 'left-0' : 'right-0'
            }`}
        >
          {/* Gate panel image */}
          <div
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: 'url(/assets/gate-panel.jpg)',
              backgroundSize: '200% 100%',
              backgroundPosition: side === 'left' ? 'left center' : 'right center',
            }}
          />
          {/* Overlay lattice */}
          <div
            className="absolute inset-0 opacity-15 mix-blend-soft-light"
            style={{
              backgroundImage: 'url(/assets/jaali.jpg)',
              backgroundSize: '300px',
            }}
          />
          {/* Middle hairline seam */}
          <div
            className={`absolute inset-y-0 w-px bg-[var(--gold,#C5A869)]/60 ${side === 'left' ? 'right-0' : 'left-0'
              }`}
          />
          {/* Inner border */}
          <div className="absolute inset-4 rounded-[2rem] border border-[var(--gold,#C5A869)]/25" />
          {/* Dark shade gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
        </motion.div>
      ))}

      {/* Center Seal and Trigger */}
      <motion.div
        animate={{ opacity: opened ? 0 : 1, scale: opened ? 1.14 : 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[0.62rem] tracking-[0.45em] text-[var(--gold,#C5A869)] uppercase"
        >
          {invite.kicker}
        </motion.p>

        <div className="relative mt-8 flex h-40 w-40 items-center justify-center">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-[var(--gold,#C5A869)]/45"
          />
          <motion.span
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease: GATE_EASE }}
            className="absolute inset-4 rounded-full border border-[var(--gold,#C5A869)]/70 bg-[var(--parchment,#F4F0E6)]/8 backdrop-blur-[2px]"
          />
          <motion.span
            animate={{ scale: [1, 1.16, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-4 rounded-full border border-[var(--gold,#C5A869)]"
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.5 }}
            className="relative font-display text-4xl tracking-[0.08em] text-[var(--parchment,#F4F0E6)]"
          >
            {couple.groomShort[0]}
            <span className="mx-1 text-[var(--gold,#C5A869)]">&</span>
            {couple.brideShort[0]}
          </motion.span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 16, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
          transition={{ duration: 1.5, delay: 0.6, ease: GATE_EASE }}
          className="mt-9 text-lg font-light text-[var(--parchment,#F4F0E6)] uppercase sm:text-xl"
        >
          {couple.groomShort} &amp; {couple.brideShort}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-3 font-display text-base tracking-[0.3em] text-[var(--gold,#C5A869)]"
        >
          {event.dateLabel}
        </motion.p>

        <motion.button
          type="button"
          onClick={onOpen}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          whileTap={{ scale: 0.96 }}
          className="group relative mt-12 overflow-hidden rounded-full border border-[var(--gold,#C5A869)]/70 px-9 py-3.5 text-[0.62rem] tracking-[0.35em] text-[var(--parchment,#F4F0E6)] uppercase transition-colors hover:bg-[var(--gold,#C5A869)]/15 cursor-pointer"
        >
          <motion.span
            animate={{ x: ['-120%', '120%'] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--parchment,#F4F0E6)]/25 to-transparent"
          />
          <span className="relative">Open the invitation</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// 2. Floating lotus petals (vv in reference)
const PETAL_ITEMS = Array.from({ length: 8 }, (_, t) => ({
  left: (t * 13 + (t % 3) * 4) % 94,
  size: 10 + ((t * 5) % 12),
  dur: 22 + ((t * 5) % 16),
  delay: -(t * 3.6),
  drift: (t % 2 === 0 ? 1 : -1) * (30 + ((t * 11) % 70)),
  opacity: 0.14 + (t % 3) * 0.05,
}));

function FloatingPetals() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {PETAL_ITEMS.map((item, i) => (
        <img
          key={i}
          src="/assets/lotus.png"
          alt=""
          className="petal absolute top-0"
          style={
            {
              left: `${item.left}%`,
              width: `${item.size}px`,
              height: `${item.size}px`,
              opacity: item.opacity,
              '--dur': `${item.dur}s`,
              '--delay': `${item.delay}s`,
              '--drift': `${item.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

// 3. Top reading progress bar (yv in reference)
function TopProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[var(--gold,#C5A869)] pointer-events-none"
    />
  );
}

// 4. Hero Section (N_ in reference)
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const { couple, invite, event, venue } = weddingData;
  const isUnlocked = useGate();

  return (
    <section ref={containerRef} className="relative flex min-h-[100svh] flex-col items-center justify-between overflow-hidden bg-[var(--parchment,#F4F0E6)]">
      {/* Background Arch Illustration */}
      <motion.div style={{ y: bgY }} className="absolute -top-10 inset-x-0 bottom-0 pointer-events-none">
        <img
          src="/assets/hero-arch.jpg"
          alt="Illustrated Mughal arch with an Indian bride and groom surrounded by lotus flowers"
          width={1024}
          height={1536}
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--pine,#354234)]/25 via-transparent via-40% to-[var(--parchment,#F4F0E6)]" />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-72 bg-gradient-to-t from-[var(--parchment,#F4F0E6)] via-[var(--parchment,#F4F0E6)]/95 via-60% to-transparent" />

      {/* Hero Typography */}
      <motion.div style={{ y: textY }} className="relative z-20 mt-auto w-full px-6 pt-24 pb-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isUnlocked ? { opacity: 1, y: 0 } : false}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[0.7rem] tracking-[0.42em] text-[var(--ink,#30362F)]/70 uppercase"
        >
          {invite.kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, letterSpacing: '0.4em' }}
          animate={isUnlocked ? { opacity: 1, y: 0, letterSpacing: '0.16em' } : false}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-4 max-w-md text-4xl leading-tight font-light text-[var(--pine,#354234)] uppercase sm:text-5xl"
        >
          {couple.groomShort}
          <span className="mx-3 inline-block font-display text-2xl lowercase italic text-[var(--pine,#354234)]/70">
            and
          </span>
          {couple.brideShort}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={isUnlocked ? { opacity: 1, scaleX: 1 } : false}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mx-auto mt-6 w-52 gold-rule"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={isUnlocked ? { opacity: 1 } : false}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 text-sm text-[var(--ink,#30362F)]/80"
        >
          {invite.line}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isUnlocked ? { opacity: 1 } : false}
          transition={{ duration: 1, delay: 1.15 }}
          className="mt-3 font-display text-3xl tracking-[0.18em] text-[var(--gold,#C5A869)]"
        >
          {event.dateLabel}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isUnlocked ? { opacity: 1 } : false}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-2 text-[0.72rem] tracking-[0.28em] text-[var(--ink,#30362F)]/70 uppercase"
        >
          {venue.name}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div style={{ opacity: scrollOpacity }} className="relative z-20 pb-6 text-center">
        <span className="text-[0.6rem] tracking-[0.3em] text-[var(--ink,#30362F)]/60 uppercase">
          scroll
        </span>
        <motion.div
          animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mt-2 h-8 w-px bg-[var(--gold,#C5A869)]"
        />
      </motion.div>
    </section>
  );
}

// 5. Countdown Section (U_ in reference)
const COUNTDOWN_UNITS = [
  { key: 'days', label: 'days' },
  { key: 'hours', label: 'hours' },
  { key: 'minutes', label: 'min' },
  { key: 'seconds', label: 'sec' },
] as const;

function calculateDiff(targetIso: string) {
  const diff = new Date(targetIso).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / 864e5),
    hours: Math.floor(diff / 36e5) % 24,
    minutes: Math.floor(diff / 6e4) % 60,
    seconds: Math.floor(diff / 1e3) % 60,
    done: false,
  };
}

function CountdownSection() {
  const { event } = weddingData;
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof calculateDiff> | null>(null);

  useEffect(() => {
    setTimeLeft(calculateDiff(event.startsAt));
    const timer = setInterval(() => setTimeLeft(calculateDiff(event.startsAt)), 1000);
    return () => clearInterval(timer);
  }, [event.startsAt]);

  return (
    <section className="relative px-5 py-20 bg-[var(--parchment,#F4F0E6)]">
      <ScrollReveal className="mx-auto max-w-lg text-center">
        <p className="text-[0.65rem] tracking-[0.4em] text-[var(--ink,#30362F)]/60 uppercase">
          {timeLeft?.done ? 'Today is the day' : 'Counting down to the celebration'}
        </p>
        <div className="mx-auto mt-5 w-32 gold-rule" />

        <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-3">
          {COUNTDOWN_UNITS.map(({ key, label }) => (
            <div
              key={key}
              className="relative overflow-hidden rounded-t-[2.2rem] border border-[var(--gold,#C5A869)]/45 bg-[var(--parchment-deep,#EDE6D6)]/70 px-1 py-5 shadow-[0_10px_30px_-22px_var(--color-ink)]"
            >
              <div className="pointer-events-none absolute inset-x-2 top-2 h-8 rounded-t-[1.8rem] border border-[var(--gold,#C5A869)]/25" />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={`${key}-${timeLeft ? timeLeft[key] : '-'}`}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-display text-3xl tabular-nums text-[var(--pine,#354234)] sm:text-4xl"
                >
                  {timeLeft ? String(timeLeft[key]).padStart(2, '0') : '--'}
                </motion.span>
              </AnimatePresence>
              <span className="mt-2 block text-[0.55rem] tracking-[0.25em] text-[var(--ink,#30362F)]/55 uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 font-display text-lg italic text-[var(--ink,#30362F)]/70">
          {event.dayLabel}, {event.timeLabel}
        </p>
      </ScrollReveal>
    </section>
  );
}

// 6. Our Story Section (K_ in reference)
const STORY_IMAGES: Record<string, string> = {
  'story-1': '/assets/story-1.jpg',
  'story-2': '/assets/story-2.jpg',
  'story-3': '/assets/story-3.jpg',
};

function OurStorySection() {
  const { story } = weddingData;

  return (
    <section className="relative px-5 py-16 bg-[var(--parchment,#F4F0E6)]">
      <ScrollReveal className="text-center">
        <h2 className="font-display text-3xl tracking-[0.14em] text-[var(--pine,#354234)] uppercase">
          Our Story
        </h2>
        <div className="mx-auto mt-4 w-24 gold-rule" />
      </ScrollReveal>

      <div className="relative mx-auto mt-12 max-w-lg">
        {/* Timeline Line */}
        <div className="absolute inset-y-0 left-6 w-px bg-gradient-to-b from-transparent via-[var(--gold,#C5A869)]/50 to-transparent sm:left-1/2" />

        <div className="space-y-14">
          {story.map((item, index) => (
            <ScrollReveal key={item.year} delay={index * 0.08}>
              <article className="relative pl-16 sm:pl-0">
                <span className="absolute top-6 left-6 z-10 block h-2 w-2 -translate-x-1/2 rotate-45 bg-[var(--gold,#C5A869)] sm:left-1/2" />
                <div className={`sm:flex sm:items-center sm:gap-6 ${index % 2 ? 'sm:flex-row-reverse' : ''}`}>
                  <div className="sm:w-1/2">
                    <div className="overflow-hidden rounded-t-[3rem] border border-[var(--gold,#C5A869)]/40">
                      <img
                        src={STORY_IMAGES[item.image] || item.image || '/assets/story-1.jpg'}
                        alt={item.title}
                        loading="lazy"
                        width={1024}
                        height={1024}
                        className="h-48 w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105 sm:h-56"
                      />
                    </div>
                  </div>
                  <div className={`mt-4 sm:mt-0 sm:w-1/2 ${index % 2 ? 'sm:text-right' : ''}`}>
                    <p className="text-[0.6rem] tracking-[0.35em] text-[var(--gold,#C5A869)] uppercase">
                      {item.year}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-[var(--pine,#354234)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink,#30362F)]/75">
                      {item.text}
                    </p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper calendar link generator
function generateCalendarLink(ev: EventItem | typeof weddingData.event) {
  const { venue, invite } = weddingData;
  const start = new Date(ev.startsAt).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const end = new Date(ev.endsAt).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const venueName = 'venueName' in ev ? ev.venueName : venue.name;
  const venueAddress = 'venueAddress' in ev ? ev.venueAddress : venue.address;
  const details = `${invite.kicker} — ${invite.line}\n\nEvent: ${ev.title}\nVenue: ${venueName}, ${venueAddress}\nDress code: ${ev.dressCode || ''}\nNote: ${ev.note || ''}`;
  return `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${start}/${end}`,
    details,
    location: `${venueName}, ${venueAddress}`,
  }).toString()}`;
}

// 7. Event Section (cv in reference)
function EventSection() {
  const { event, events } = weddingData;
  const [activeIndex, setActiveIndex] = useState(events && events.length > 0 ? events.length - 1 : 0);
  const currentEvent = events && events.length > 0 ? events[activeIndex] : event;
  const currentVenueName = 'venueName' in currentEvent ? currentEvent.venueName : weddingData.venue.name;
  const currentVenueAddress = 'venueAddress' in currentEvent ? currentEvent.venueAddress : weddingData.venue.address;
  const currentMapsQuery = 'mapsQuery' in currentEvent ? currentEvent.mapsQuery : weddingData.venue.mapsQuery;

  return (
    <section className="relative overflow-hidden px-5 py-20 bg-[var(--parchment,#F4F0E6)]">
      {/* Background Lattice Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/jaali.jpg)',
          backgroundSize: '260px',
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[var(--parchment,#F4F0E6)]/70 pointer-events-none" />

      <ScrollReveal className="relative mx-auto max-w-lg">
        {/* Event Selector Tabs */}
        {events && events.length > 1 && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            {events.map((ev, idx) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full px-3.5 py-1.5 text-[0.6rem] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${activeIndex === idx
                    ? 'bg-[var(--pine,#354234)] text-[var(--gold,#C5A869)] shadow-sm border border-[var(--gold,#C5A869)]/70 font-semibold scale-105'
                    : 'bg-[var(--parchment,#F4F0E6)]/80 text-[var(--ink,#30362F)]/70 border border-[var(--gold,#C5A869)]/30 hover:border-[var(--gold,#C5A869)]/60'
                  }`}
              >
                {ev.shortTitle}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="relative rounded-t-[9rem] border border-[var(--gold,#C5A869)]/50 bg-[var(--parchment,#F4F0E6)] px-7 pt-16 pb-10 text-center shadow-[0_30px_60px_-45px_var(--color-ink)] paper-grain"
          >
            <div className="pointer-events-none absolute inset-x-3 top-3 bottom-3 rounded-t-[8.4rem] border border-[var(--gold,#C5A869)]/30" />
            <p className="text-[0.62rem] tracking-[0.4em] text-[var(--ink,#30362F)]/60 uppercase">
              {currentEvent.title}
            </p>
            <p className="mt-4 font-display text-4xl tracking-[0.12em] text-[var(--gold,#C5A869)]">
              {currentEvent.dateLabel}
            </p>
            <div className="mx-auto mt-5 w-28 gold-rule" />

            <ul className="mt-7 space-y-4 text-sm text-[var(--ink,#30362F)]/80">
              <li className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-[var(--gold,#C5A869)] shrink-0" aria-hidden="true" />
                <span>{currentEvent.dayLabel}, {currentEvent.timeLabel}</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--gold,#C5A869)] shrink-0" aria-hidden="true" />
                <span>
                  {currentVenueName}
                  <br />
                  <span className="text-[var(--ink,#30362F)]/60">{currentVenueAddress}</span>
                </span>
              </li>
              {currentEvent.dressCode && (
                <li className="flex items-center justify-center gap-2">
                  <Shirt className="h-4 w-4 text-[var(--gold,#C5A869)] shrink-0" aria-hidden="true" />
                  <span>{currentEvent.dressCode}</span>
                </li>
              )}
            </ul>

            {currentEvent.note && (
              <p className="mt-6 font-display text-lg italic text-[var(--ink,#30362F)]/65">
                {currentEvent.note}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3">
              <a
                href={generateCalendarLink(currentEvent)}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--pine,#354234)] px-6 py-3.5 text-[0.7rem] tracking-[0.24em] text-[var(--parchment,#F4F0E6)] uppercase transition-transform duration-200 active:scale-95"
              >
                <CalendarPlus className="h-4 w-4 transition-transform group-hover:rotate-6 text-[var(--gold,#C5A869)]" />
                <span>Add to calendar</span>
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(currentMapsQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--gold,#C5A869)]/60 py-3 text-[0.65rem] tracking-[0.2em] text-[var(--ink,#30362F)]/75 uppercase transition-colors hover:bg-[var(--gold,#C5A869)]/10"
              >
                Directions
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </ScrollReveal>
    </section>
  );
}

// 8. Venue Section (uv in reference)
function VenueSection() {
  const { venue } = weddingData;

  return (
    <section className="px-5 py-16 bg-[var(--parchment,#F4F0E6)]">
      <ScrollReveal className="mx-auto max-w-lg text-center">
        <h2 className="font-display text-3xl tracking-[0.14em] text-[var(--pine,#354234)] uppercase">
          The Venue
        </h2>
        <div className="mx-auto mt-4 w-24 gold-rule" />

        <a
          href={venue.url}
          target="_blank"
          rel="noreferrer"
          className="group mt-8 block overflow-hidden rounded-t-[3rem] border border-[var(--gold,#C5A869)]/50 shadow-[0_24px_50px_-40px_var(--color-ink)]"
        >
          <div className="relative">
            <img
              src="/assets/map-preview.jpg"
              alt={`Illustrated map showing the location of ${venue.name}`}
              loading="lazy"
              width={1200}
              height={800}
              className="h-56 w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105 sm:h-64"
            />
            <span className="absolute inset-0 bg-[var(--pine,#354234)]/0 transition-colors group-hover:bg-[var(--pine,#354234)]/10" />
            <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-[var(--parchment,#F4F0E6)]/90 px-4 py-2 text-[0.6rem] tracking-[0.24em] text-[var(--ink,#30362F)]/80 uppercase">
              <Navigation className="h-3.5 w-3.5 text-[var(--gold,#C5A869)]" aria-hidden="true" />
              Open in maps
            </span>
          </div>
        </a>

        <h3 className="mt-7 font-display text-2xl text-[var(--pine,#354234)]">
          {venue.name}
        </h3>
        <p className="mt-2 text-sm text-[var(--ink,#30362F)]/70">
          {venue.address}
        </p>

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--gold,#C5A869)]/60 px-6 py-3 text-[0.65rem] tracking-[0.24em] text-[var(--ink,#30362F)]/80 uppercase transition-colors hover:bg-[var(--gold,#C5A869)]/10 active:scale-95"
        >
          Get directions
        </a>
      </ScrollReveal>
    </section>

  );
}

// 9. Moments Gallery Section (fv in reference)
const MOMENTS_LIST = [
  { src: '/assets/tasya-nakul-portrait.png', alt: 'Tasya & Nakul' },
  { src: '/assets/tasya-nakul-moments.png', alt: 'Cherished Moments with Tasya & Nakul' },
  { src: '/assets/tasya-nakul-night.png', alt: 'Together in Love' },
];

function MomentsSection() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  return (
    <section className="py-16 bg-[var(--parchment,#F4F0E6)]">
      <ScrollReveal className="px-5 text-center">
        <h2 className="font-display text-3xl tracking-[0.14em] text-[var(--pine,#354234)] uppercase">
          Moments
        </h2>
        <div className="mx-auto mt-4 w-24 gold-rule" />
      </ScrollReveal>

      {/* Snap Horizontal Scroll Track */}
      <div className="mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 no-scrollbar sm:justify-center">
        {MOMENTS_LIST.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActivePhoto(index)}
            className="relative w-[72vw] max-w-xs shrink-0 snap-center overflow-hidden rounded-t-[3rem] border border-[var(--gold,#C5A869)]/45 transition-transform duration-300 active:scale-[0.97] cursor-pointer"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              width={1024}
              height={1024}
              className="h-72 w-full object-cover"
            />
            <span className="pointer-events-none absolute inset-2 rounded-t-[2.7rem] border border-[var(--parchment,#F4F0E6)]/40" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--pine,#354234)]/90 p-5 backdrop-blur-sm"
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute top-5 right-5 text-[var(--parchment,#F4F0E6)] cursor-pointer"
              onClick={() => setActivePhoto(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              key={activePhoto}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              src={MOMENTS_LIST[activePhoto].src}
              alt={MOMENTS_LIST[activePhoto].alt}
              className="max-h-[80svh] w-auto rounded-t-[3rem] border border-[var(--gold,#C5A869)]/50 object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// 10. Blessing Section (pv in reference)
function BlessingSection() {
  const { blessing } = weddingData;

  return (
    <section className="px-5 py-20 bg-[var(--parchment,#F4F0E6)]">
      <ScrollReveal className="mx-auto max-w-md text-center">
        <div className="mx-auto w-20 gold-rule" />
        <p className="mt-8 font-display text-2xl leading-relaxed text-[var(--pine,#354234)]">
          {blessing.line}
        </p>
        <p className="mt-5 font-display text-lg leading-relaxed italic text-[var(--ink,#30362F)]/75">
          “{blessing.translation}”
        </p>
        <p className="mt-4 text-[0.6rem] tracking-[0.3em] text-[var(--gold,#C5A869)] uppercase">
          {blessing.source}
        </p>
        <div className="mx-auto mt-8 w-20 gold-rule" />
      </ScrollReveal>
    </section>
  );
}

// 11. Footer Section (hv in reference)
function FooterSection() {
  const { couple, footer } = weddingData;

  return (
    <footer className="relative isolate overflow-hidden pt-24 pb-12 text-center bg-[var(--parchment,#F4F0E6)]">
      <img
        src="/assets/footer-floral.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1920}
        height={912}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-bottom"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[var(--parchment,#F4F0E6)]/55" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-[var(--parchment,#F4F0E6)] to-transparent" />

      <ScrollReveal className="px-6">
        <p className="font-display text-3xl tracking-[0.16em] text-[var(--pine,#354234)] uppercase">
          {couple.groomShort} <span className="text-[var(--gold,#C5A869)]">&amp;</span> {couple.brideShort}
        </p>
        <div className="mx-auto mt-5 w-24 gold-rule" />
        <p className="mt-6 text-sm text-[var(--ink,#30362F)]/80">
          {footer.families}
        </p>

        {footer.contacts && footer.contacts.length > 0 && (
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {footer.contacts.map((contact, i) => (
              <a
                key={i}
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--gold,#C5A869)]/60 bg-[var(--parchment,#F4F0E6)]/70 px-5 py-2.5 text-[0.65rem] tracking-[0.2em] text-[var(--ink,#30362F)]/80 uppercase transition-colors hover:bg-[var(--gold,#C5A869)]/15 active:scale-95"
              >
                <Phone className="h-3.5 w-3.5 text-[var(--gold,#C5A869)]" aria-hidden="true" />
                <span>{contact.name}</span>
              </a>
            ))}
          </div>
        )}

        <p className="mt-10 text-[0.6rem] tracking-[0.32em] text-[var(--ink,#30362F)]/60 uppercase">
          {couple.hashtag}
        </p>
      </ScrollReveal>

      <a
        href="https://www.instagram.com/zetron.tech/"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-1.5 font-display text-xs tracking-[0.22em] text-[var(--ink,#30362F)] opacity-75 transition-opacity hover:opacity-100 uppercase"
      >
        <Instagram className="h-4 w-4 shrink-0 text-[var(--ink,#30362F)]" />
        <span>Crafted by zetron.tech</span>
      </a>
    </footer>
  );
}

// Main Page Assembly (Av in reference)
export default function WeddingApp() {
  const [opened, setOpened] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  useEffect(() => {
    if (!opened) return;
    const timer = setTimeout(() => setRemoved(true), 2200);
    return () => clearTimeout(timer);
  }, [opened]);

  return (
    <GateContext.Provider value={opened}>
      {/* Royal Entrance Gate */}
      <AnimatePresence>
        {!removed && <GateOverlay opened={opened} onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      <main className="relative bg-[var(--parchment,#F4F0E6)]">
        {/* Top reading progress */}
        <TopProgressBar />

        {/* Floating lotus petals */}
        <FloatingPetals />

        {/* Hero Section */}
        <HeroSection />

        {/* Countdown */}
        <CountdownSection />

        {/* Our Story */}
        <OurStorySection />

        {/* The Event */}
        <EventSection />

        {/* The Venue */}
        <VenueSection />

        {/* Moments Gallery */}
        <MomentsSection />

        {/* Blessing */}
        <BlessingSection />

        {/* Footer */}
        <FooterSection />
      </main>
    </GateContext.Provider>
  );
}
