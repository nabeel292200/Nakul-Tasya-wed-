'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart, Send } from 'lucide-react';
import { weddingConfig } from '@/config/wedding';

interface RsvpFormData {
  fullName: string;
  attendance: 'attending' | 'declining';
  guestCount: number;
  message: string;
}

export default function RSVP() {
  const { rsvp, couple } = weddingConfig;
  const [formData, setFormData] = useState<RsvpFormData>({
    fullName: '',
    attendance: 'attending',
    guestCount: 1,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    setIsSubmitting(true);

    setTimeout(async () => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory gold and sage confetti burst
      if (formData.attendance === 'attending') {
        try {
          const confettiModule = await import('canvas-confetti');
          const confettiFn = confettiModule.default || confettiModule;
          confettiFn({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#C5A869', '#A8B39A', '#596653', '#FAF8F2'],
          });
        } catch {
          // ignore in restricted environments
        }
      }
    }, 800);
  };

  return (
    <section id="rsvp" className="relative px-5 py-24 bg-[var(--parchment)] paper-grain text-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-lg"
      >
        {/* Arched RSVP Card Container */}
        <div className="relative rounded-t-[8.5rem] border border-[var(--gold)]/50 bg-[var(--parchment-deep)]/75 px-7 sm:px-10 pt-16 pb-12 shadow-[0_30px_60px_-40px_rgba(48,54,47,0.35)] paper-grain">
          {/* Inner Arch Hairline Border */}
          <div className="pointer-events-none absolute inset-x-3.5 top-3.5 bottom-3.5 rounded-t-[7.8rem] border border-[var(--gold)]/30" />

          {/* Header */}
          <p className="text-[0.65rem] tracking-[0.4em] text-[var(--gold)] uppercase font-sans font-medium">
            R.S.V.P
          </p>
          <h2 className="mt-4 font-display text-2xl sm:text-3xl tracking-[0.14em] text-[var(--pine)] uppercase leading-snug">
            {rsvp.heading}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[var(--ink-muted)] font-sans">
            {rsvp.subheading}
          </p>

          <div className="mx-auto mt-6 w-24 gold-rule" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="mt-8 space-y-6 text-left"
              >
                {/* Full Name Input */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-[0.65rem] tracking-[0.25em] text-[var(--pine)] uppercase font-sans font-medium mb-1.5"
                  >
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-md border border-[var(--gold)]/50 bg-[var(--parchment)]/90 px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-muted)]/50 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-all font-sans"
                  />
                </div>

                {/* Attendance Selector */}
                <div>
                  <label className="block text-[0.65rem] tracking-[0.25em] text-[var(--pine)] uppercase font-sans font-medium mb-2">
                    Will you be joining us? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, attendance: 'attending' })
                      }
                      className={`flex items-center justify-center gap-2 rounded-full border py-3 px-3 text-[0.68rem] tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer ${
                        formData.attendance === 'attending'
                          ? 'border-[var(--pine)] bg-[var(--pine)] text-[var(--parchment)] shadow-sm'
                          : 'border-[var(--gold)]/50 bg-[var(--parchment)] text-[var(--ink)] hover:border-[var(--gold)]'
                      }`}
                    >
                      {formData.attendance === 'attending' && (
                        <Check className="h-3.5 w-3.5 text-[var(--gold)]" />
                      )}
                      <span>Joyfully Accepts</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, attendance: 'declining' })
                      }
                      className={`flex items-center justify-center gap-2 rounded-full border py-3 px-3 text-[0.68rem] tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer ${
                        formData.attendance === 'declining'
                          ? 'border-[var(--pine)] bg-[var(--pine)] text-[var(--parchment)] shadow-sm'
                          : 'border-[var(--gold)]/50 bg-[var(--parchment)] text-[var(--ink)] hover:border-[var(--gold)]'
                      }`}
                    >
                      {formData.attendance === 'declining' && (
                        <Check className="h-3.5 w-3.5 text-[var(--gold)]" />
                      )}
                      <span>Regretfully Declines</span>
                    </button>
                  </div>
                </div>

                {/* Number of Guests (only if attending) */}
                {formData.attendance === 'attending' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label
                      htmlFor="guestCount"
                      className="block text-[0.65rem] tracking-[0.25em] text-[var(--pine)] uppercase font-sans font-medium mb-1.5"
                    >
                      Number of Guests Attending
                    </label>
                    <select
                      id="guestCount"
                      value={formData.guestCount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          guestCount: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-md border border-[var(--gold)]/50 bg-[var(--parchment)]/90 px-4 py-3 text-sm text-[var(--ink)] focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-all font-sans"
                    >
                      <option value={1}>1 Guest (Myself)</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5+ Guests (Family)</option>
                    </select>
                  </motion.div>
                )}

                {/* Optional Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[0.65rem] tracking-[0.25em] text-[var(--pine)] uppercase font-sans font-medium mb-1.5"
                  >
                    Warm Wishes or Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Leave a message for Arjun & Meera..."
                    className="w-full rounded-md border border-[var(--gold)]/50 bg-[var(--parchment)]/90 px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-muted)]/50 focus:border-[var(--gold)] focus:outline-none focus:ring-1 focus:ring-[var(--gold)] transition-all font-sans resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--pine)] px-8 py-3.5 text-[0.72rem] tracking-[0.25em] text-[var(--parchment)] uppercase transition-all duration-300 hover:bg-[var(--pine-dark)] active:scale-95 shadow-md disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-[var(--gold)] border-t-transparent" />
                        <span>Sending confirmation...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5 text-[var(--gold)] transition-transform group-hover:translate-x-0.5" />
                        <span>Confirm RSVP</span>
                      </>
                    )}
                  </button>
                  {rsvp.deadlineText && (
                    <p className="mt-3 text-[11px] text-[var(--ink-muted)] tracking-wider font-sans">
                      {rsvp.deadlineText}
                    </p>
                  )}
                </div>
              </motion.form>
            ) : (
              /* Thank you confirmation state */
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 text-center py-6"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--parchment)] text-[var(--gold)] shadow-sm">
                  <Heart className="h-6 w-6 fill-[var(--gold)]" />
                </div>

                <h3 className="mt-5 font-display text-2xl text-[var(--pine)]">
                  Thank You, {formData.fullName}!
                </h3>

                <p className="mt-2 text-sm text-[var(--ink)]/80 leading-relaxed max-w-xs mx-auto font-sans">
                  {formData.attendance === 'attending'
                    ? `We are thrilled to celebrate with you! We have noted your confirmation for ${formData.guestCount} ${
                        formData.guestCount > 1 ? 'guests' : 'guest'
                      }.`
                    : 'We will truly miss your presence, but thank you warmly for sending your blessings and love.'}
                </p>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-[0.65rem] tracking-[0.2em] text-[var(--gold)] uppercase underline underline-offset-4 hover:text-[var(--pine)] font-sans cursor-pointer"
                  >
                    Update response
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
