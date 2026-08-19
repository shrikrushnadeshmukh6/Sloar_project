import { motion } from "framer-motion";

/**
 * Signature element: the sun's daily arc across a panel-grid horizon.
 * A ball of light travels the arc on load, and the arc itself draws in.
 * This ties the hero directly to the subject: solar generation over a day.
 */
export default function SunArc({ className = "" }) {
  return (
    <svg
      viewBox="0 0 900 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="arcGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="55%" stopColor="#FFB238" />
          <stop offset="100%" stopColor="#FFD180" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD180" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFD180" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB238" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFB238" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Panel grid horizon */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={80 + i * 90}
          y1={340}
          x2={80 + i * 90}
          y2={400}
          stroke="#22304F"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1={80}
          y1={340 + i * 20}
          x2={800}
          y2={340 + i * 20}
          stroke="#22304F"
          strokeWidth="1"
        />
      ))}

      {/* The arc path (sun's daily path) */}
      <motion.path
        d="M 80 340 A 370 300 0 0 1 820 340"
        stroke="url(#arcGradient)"
        strokeWidth="2"
        strokeDasharray="6 8"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
      />

      {/* Fill under the arc, subtle */}
      <motion.path
        d="M 80 340 A 370 300 0 0 1 820 340 L 820 340 L 80 340 Z"
        fill="url(#fade)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.6 }}
      />

      {/* Traveling sun */}
      <motion.g
        initial={{ offsetDistance: "0%", opacity: 0 }}
        whileInView={{ offsetDistance: "100%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: "easeInOut", delay: 0.2 }}
        style={{
          offsetPath: "path('M 80 340 A 370 300 0 0 1 820 340')",
        }}
      >
        <circle r="40" fill="url(#sunGlow)" />
        <circle r="9" fill="#FFB238" />
      </motion.g>
    </svg>
  );
}
