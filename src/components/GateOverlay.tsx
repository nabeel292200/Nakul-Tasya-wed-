'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';

interface GateOverlayProps {
  isOpen: boolean;
  onOpen: () => void;
}

const GATE_EASE = [0.83, 0, 0.17, 1] as const;

export default function GateOverlay({ isOpen, onOpen }: GateOverlayProps) {
  const [removed, setRemoved] = useState(false);
  const { couple, invitation, mainDate } = weddingConfig;

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setRemoved(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (removed) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden"
        style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Left and Right gate panels */}
        {(['left', 'right'] as const).map((side) => (
          <motion.div
            key={side}
            initial={{ x: 0 }}
            animate={{ x: isOpen ? (side === 'left' ? '-101%' : '101%') : 0 }}
            transition={{ duration: 1.6, ease: GATE_EASE }}
            className={`absolute top-0 h-full w-1/2 overflow-hidden bg-[var(--pine)] ${
              side === 'left' ? 'left-0' : 'right-0'
            }`}
          >
            {/* Texture background */}
            <div
              className="absolute inset-0 bg-cover opacity-60"
              style={{
                backgroundImage: 'url(/assets/gate-panel.jpg)',
                backgroundSize: '200% 100%',
                backgroundPosition: side === 'left' ? 'left center' : 'right center',
              }}
            />
            {/* Subtle jaali lattice overlay */}
            <div
              className="absolute inset-0 opacity-15 mix-blend-soft-light"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(197, 168, 105, 0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            {/* Center golden vertical seam */}
            <div
              className={`absolute inset-y-0 w-px bg-[var(--gold)]/60 ${
                side === 'left' ? 'right-0' : 'left-0'
              }`}
            />
            {/* Inset ornamental border */}
            <div className="absolute inset-4 sm:inset-6 rounded-[2rem] border border-[var(--gold)]/30" />
            {/* Shading gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />
          </motion.div>
        ))}

        {/* Center Royal Monogram Seal & Trigger */}
        <motion.div
          animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 1.15 : 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-10"
        >
          {/* Top kicker */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[0.62rem] sm:text-xs tracking-[0.45em] text-[var(--gold)] uppercase font-sans"
          >
            {invitation.kicker}
          </motion.p>

          {/* Medallion Seal */}
          <div className="relative mt-8 flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center">
            {/* Rotating dashed gold ring */}
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 46, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-[var(--gold)]/50"
            />
            {/* Inner solid border with backdrop blur */}
            <motion.span
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.15, ease: GATE_EASE }}
              className="absolute inset-3 sm:inset-4 rounded-full border border-[var(--gold)]/80 bg-[var(--parchment)]/10 backdrop-blur-[4px]"
            />
            {/* Pulsing subtle glow ring */}
            <motion.span
              animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-3 sm:inset-4 rounded-full border border-[var(--gold)]"
            />
            {/* Monogram letters */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.4 }}
              className="relative font-display text-3xl sm:text-4xl tracking-[0.08em] text-[var(--parchment)] flex items-center gap-1.5"
            >
              <span>{couple.groom[0]}</span>
              <span className="font-display italic text-2xl text-[var(--gold)]">&</span>
              <span>{couple.bride[0]}</span>
            </motion.span>
          </div>

          {/* Couple Names */}
          <motion.h2
            initial={{ opacity: 0, y: 16, letterSpacing: '0.45em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
            transition={{ duration: 1.4, delay: 0.5, ease: GATE_EASE }}
            className="mt-8 text-lg sm:text-2xl font-light text-[var(--parchment)] uppercase font-sans tracking-[0.22em]"
          >
            {couple.groom} & {couple.bride}
          </motion.h2>

          {/* Date */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-3 font-display text-base sm:text-lg tracking-[0.3em] text-[var(--gold)]"
          >
            {mainDate.formattedDate}
          </motion.p>

          {/* Open Invitation Button */}
          <motion.button
            type="button"
            onClick={onOpen}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="group relative mt-10 overflow-hidden rounded-full border border-[var(--gold)]/80 px-9 py-3.5 text-[0.65rem] sm:text-xs tracking-[0.35em] text-[var(--parchment)] uppercase transition-all duration-300 hover:bg-[var(--gold)]/20 hover:border-[var(--gold)] shadow-lg cursor-pointer"
          >
            {/* Shimmer light across button */}
            <motion.span
              animate={{ x: ['-120%', '120%'] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--parchment)]/25 to-transparent pointer-events-none"
            />
            <span className="relative flex items-center gap-2">
              <span>Open the invitation</span>
              <span className="text-[var(--gold)] text-sm">✦</span>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
