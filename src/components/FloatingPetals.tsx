'use client';

import React, { useEffect, useState } from 'react';

interface PetalConfig {
  id: number;
  left: number;
  size: number;
  dur: number;
  delay: number;
  drift: number;
  opacity: number;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<PetalConfig[]>([]);

  useEffect(() => {
    // Generate deterministic yet natural spread of petals
    const items: PetalConfig[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: (i * 13 + (i % 3) * 5) % 94,
      size: 14 + ((i * 5) % 12),
      dur: 20 + ((i * 6) % 14),
      delay: -(i * 3.2),
      drift: (i % 2 === 0 ? 1 : -1) * (35 + ((i * 12) % 65)),
      opacity: 0.16 + (i % 3) * 0.06,
    }));
    setPetals(items);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
    >
      {petals.map((petal) => (
        <img
          key={petal.id}
          src="/assets/lotus.png"
          alt=""
          className="petal absolute top-0"
          style={
            {
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              opacity: petal.opacity,
              '--dur': `${petal.dur}s`,
              '--delay': `${petal.delay}s`,
              '--drift': `${petal.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
