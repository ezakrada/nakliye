"use client";

import { motion } from "framer-motion";

export function CompassMark({ size = 80 }: { size?: number }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
      style={{ width: size, height: size }}
      className="relative"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r="48"
          stroke="var(--hairline-strong)"
          strokeWidth="0.6"
        />
        <circle cx="50" cy="50" r="38" stroke="var(--hairline)" strokeWidth="0.4" />
        {/* compass rose */}
        <path
          d="M50 8 L 53 50 L 50 92 L 47 50 Z"
          fill="var(--text-primary)"
          opacity="0.85"
        />
        <path
          d="M8 50 L 50 53 L 92 50 L 50 47 Z"
          fill="var(--text-primary)"
          opacity="0.55"
        />
        {/* tick marks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const long = i % 6 === 0;
          return (
            <line
              key={i}
              x1="50"
              y1="2"
              x2="50"
              y2={long ? 7 : 5}
              stroke="var(--text-tertiary)"
              strokeWidth="0.6"
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}
        <text
          x="50"
          y="20"
          textAnchor="middle"
          fontSize="6"
          fontFamily="var(--font-mono)"
          fill="var(--text-tertiary)"
          letterSpacing="1"
        >
          K
        </text>
        <circle cx="50" cy="50" r="2.4" fill="var(--accent-signal)" />
      </svg>
    </motion.div>
  );
}
