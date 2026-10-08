'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';

export default function LoveStory() {
  const { loveStory } = weddingConfig;

  return (
    <section className="relative px-5 py-24 bg-[var(--parchment)] paper-grain">
      <div className="relative mx-auto max-w-2xl text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[0.65rem] tracking-[0.4em] text-[var(--gold)] uppercase font-sans font-medium">
            Our Journey
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl tracking-[0.14em] text-[var(--pine)] uppercase">
            {loveStory.heading}
          </h2>
          <div className="mx-auto mt-4 w-24 gold-rule" />

          {/* Emotional Tagline */}
          <blockquote className="mt-6 font-display text-xl sm:text-2xl italic text-[var(--ink)]/80 max-w-md mx-auto leading-relaxed">
            “{loveStory.tagline}”
          </blockquote>
        </motion.div>

        {/* Timeline Content */}
        <div className="relative mx-auto mt-14 max-w-lg">
          {/* Vertical Golden Timeline Guide */}
          <div className="absolute inset-y-0 left-6 w-px bg-gradient-to-b from-transparent via-[var(--gold)]/60 to-transparent sm:left-1/2" />

          <div className="space-y-14 sm:space-y-16">
            {loveStory.milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.article
                  key={milestone.year + milestone.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative pl-14 sm:pl-0"
                >
                  {/* Golden Diamond Node */}
                  <span className="absolute top-6 left-6 z-10 block h-2 w-2 -translate-x-1/2 rotate-45 bg-[var(--gold)] shadow-sm sm:left-1/2" />

                  <div
                    className={`sm:flex sm:items-center sm:gap-6 ${
                      !isEven ? 'sm:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Arch Framed Milestone Image */}
                    <div className="sm:w-1/2">
                      <div className="overflow-hidden rounded-t-[3rem] border border-[var(--gold)]/45 bg-[var(--parchment-deep)] shadow-sm">
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          loading="lazy"
                          className="h-44 sm:h-52 w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105"
                        />
                      </div>
                    </div>

                    {/* Milestone Story Text */}
                    <div
                      className={`mt-4 sm:mt-0 sm:w-1/2 text-left ${
                        !isEven ? 'sm:text-right' : ''
                      }`}
                    >
                      <p className="text-[0.62rem] tracking-[0.35em] text-[var(--gold)] uppercase font-sans font-medium">
                        {milestone.year}
                      </p>
                      <h3 className="mt-1 font-display text-2xl text-[var(--pine)]">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--ink)]/80 font-sans">
                        {milestone.text}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
