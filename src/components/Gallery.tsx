'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

export default function Gallery() {
  const { gallery } = weddingConfig;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev! === 0 ? gallery.images.length - 1 : prev! - 1
    );
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev! === gallery.images.length - 1 ? 0 : prev! + 1
    );
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 bg-[var(--parchment)] paper-grain">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="px-5 text-center"
      >
        <p className="text-[0.65rem] tracking-[0.4em] text-[var(--gold)] uppercase font-sans font-medium">
          Captured Memories
        </p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl tracking-[0.14em] text-[var(--pine)] uppercase">
          {gallery.heading}
        </h2>
        <div className="mx-auto mt-4 w-24 gold-rule" />
        <p className="mt-4 text-xs sm:text-sm text-[var(--ink-muted)] font-sans italic">
          {gallery.subtitle}
        </p>
      </motion.div>

      {/* Navigation arrows for desktop/tablet */}
      <div className="hidden sm:flex justify-end gap-2 max-w-5xl mx-auto px-6 mt-4">
        <button
          type="button"
          onClick={scrollLeft}
          aria-label="Scroll left"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--gold)]/60 bg-[var(--parchment)] text-[var(--pine)] transition-colors hover:bg-[var(--gold)]/20 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={scrollRight}
          aria-label="Scroll right"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--gold)]/60 bg-[var(--parchment)] text-[var(--pine)] transition-colors hover:bg-[var(--gold)]/20 cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Horizontal Editorial Snap Carousel matching reference */}
      <div
        ref={scrollContainerRef}
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 no-scrollbar"
      >
        {gallery.images.map((item, index) => (
          <motion.button
            key={index}
            type="button"
            onClick={() => openLightbox(index)}
            whileHover={{ y: -4 }}
            className="group relative w-[72vw] max-w-[280px] sm:max-w-[320px] shrink-0 snap-center overflow-hidden rounded-t-[3.5rem] border border-[var(--gold)]/50 bg-[var(--parchment-deep)] shadow-[0_16px_36px_-25px_rgba(48,54,47,0.3)] transition-all duration-300 active:scale-[0.98] text-left cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-72 sm:h-80 w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
              />
              {/* Inner Arch Hairline Border */}
              <span className="pointer-events-none absolute inset-2.5 rounded-t-[3rem] border border-[var(--parchment)]/50" />

              {/* View Overlay Icon */}
              <span className="absolute inset-0 flex items-center justify-center bg-[var(--pine)]/20 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--parchment)]/90 text-[var(--gold)] shadow-md">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </span>
            </div>

            {/* Subtle caption */}
            {item.caption && (
              <div className="px-4 py-3 bg-[var(--parchment-deep)]/80 text-center">
                <p className="font-display text-sm tracking-[0.1em] text-[var(--pine)]">
                  {item.caption}
                </p>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Fullscreen Editorial Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--pine)]/95 p-4 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              type="button"
              aria-label="Close photo lightbox"
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--pine)] text-[var(--parchment)] transition-colors hover:bg-[var(--gold)]/20 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              aria-label="Previous photo"
              onClick={showPrev}
              className="absolute left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--pine)]/80 text-[var(--parchment)] transition-colors hover:bg-[var(--gold)]/20 cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              aria-label="Next photo"
              onClick={showNext}
              className="absolute right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold)]/50 bg-[var(--pine)]/80 text-[var(--parchment)] transition-colors hover:bg-[var(--gold)]/20 cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Lightbox Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-2xl flex flex-col items-center"
            >
              <motion.img
                key={selectedIndex}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                src={gallery.images[selectedIndex].src}
                alt={gallery.images[selectedIndex].alt}
                className="max-h-[75vh] w-auto rounded-t-[3.5rem] border border-[var(--gold)]/60 object-contain shadow-2xl"
              />

              {gallery.images[selectedIndex].caption && (
                <p className="mt-4 font-display text-lg tracking-[0.15em] text-[var(--parchment)] text-center">
                  {gallery.images[selectedIndex].caption}
                </p>
              )}

              <p className="mt-1 text-[10px] tracking-[0.3em] text-[var(--gold)] uppercase font-sans">
                {selectedIndex + 1} of {gallery.images.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
