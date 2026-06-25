/**
 * AnimatedLogo — CSS + Framer Motion only.
 * No Three.js / Canvas / WebGL / new deps.
 *
 * Techniques used:
 *  • CSS perspective on the outer wrapper
 *  • transform-style: preserve-3d on the scene div
 *  • Framer Motion animates rotateY, rotateX, and y (float)
 *  • Multiple layered box/drop shadows for neon-orange glow
 *  • Pure inline SVG "T" so we control every pixel of the mark
 */

import React from 'react';
import { motion } from 'framer-motion';

/* ─── The Tech Titan "T" mark as inline SVG ───────────────────
   Built to match the existing brand: bold slab-T with a
   diagonal lightning tail, orange gradient fill.
─────────────────────────────────────────────────────────────── */
function TitanMark({ size = 120 }) {
  const id = 'ttGrad';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tech Titan emblem"
      style={{ display: 'block' }}
    >
      <defs>
        {/* orange gradient: top-left → bottom-right */}
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffb000" />
          <stop offset="50%"  stopColor="#ff7a00" />
          <stop offset="100%" stopColor="#cc4400" />
        </linearGradient>

        {/* soft inner highlight shimmer */}
        <linearGradient id="ttShine" x1="0%" y1="0%" x2="35%" y2="100%">
          <stop offset="0%"   stopColor="#ffe066" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff7a00" stopOpacity="0"    />
        </linearGradient>

        {/* drop-shadow filter for the SVG shape itself */}
        <filter id="ttShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#ff7a00" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* ── Top horizontal bar of the T ── */}
      <rect x="8"  y="8"  width="84" height="22" rx="4" fill={`url(#${id})`} filter="url(#ttShadow)" />

      {/* ── Vertical stem ── */}
      <rect x="38" y="30" width="24" height="36" rx="3" fill={`url(#${id})`} filter="url(#ttShadow)" />

      {/* ── Lightning-bolt tail (diagonal lower accent) ── */}
      <polygon
        points="34,66  58,66  50,94  26,94"
        fill={`url(#${id})`}
        filter="url(#ttShadow)"
      />

      {/* ── Highlight shimmer overlay ── */}
      <rect x="8"  y="8"  width="84" height="22" rx="4" fill="url(#ttShine)" opacity="0.7" />
      <rect x="38" y="30" width="24" height="36" rx="3" fill="url(#ttShine)" opacity="0.5" />

      {/* ── Left-edge crisp accent line ── */}
      <line x1="9" y1="9" x2="9" y2="30" stroke="#ffd060" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="9" y1="9" x2="92" y2="9" stroke="#ffd060" strokeWidth="1"   strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

/* ─── Animated wrapper ─────────────────────────────────────── */
export default function AnimatedLogo({ size = 120 }) {
  return (
    /*
     * 1. Outer div: sets CSS perspective so children perceive depth.
     *    We do NOT use Tailwind for perspective — inline style is cleaner.
     */
    <div
      style={{ perspective: '600px', perspectiveOrigin: '50% 50%' }}
      className="relative flex items-center justify-center"
    >
      {/*
       * 2. The "scene" — preserve-3d keeps child transforms in 3D space.
       *    Framer Motion drives the 3D rotation + float here.
       */}
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          /* pseudo-3D rotation */
          rotateY: [0, 18, 0, -18, 0],
          rotateX: [0, -6, 0, 6, 0],
          /* gentle float */
          y: [0, -12, 0, 12, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
        className="relative"
      >
        {/* ── Layered ambient glow orbs (CSS only) ── */}

        {/* outer soft bloom */}
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.22, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: '-40%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,122,0,0.30) 0%, transparent 70%)',
            filter: 'blur(18px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* inner tight glow ring */}
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          style={{
            position: 'absolute',
            inset: '-12%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,176,0,0.22) 0%, transparent 65%)',
            filter: 'blur(8px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/*
         * 3. The glass face — the card that holds the logo.
         *    box-shadow layers create the multi-depth neon glow.
         */}
        <motion.div
          animate={{
            /* glow intensity pulses in sync with float */
            boxShadow: [
              '0 0 0 1px rgba(255,122,0,0.25), 0 0 30px rgba(255,122,0,0.35), 0 0 60px rgba(255,122,0,0.15), 0 20px 40px rgba(0,0,0,0.6)',
              '0 0 0 1px rgba(255,176,0,0.45), 0 0 50px rgba(255,122,0,0.55), 0 0 90px rgba(255,122,0,0.25), 0 28px 56px rgba(0,0,0,0.7)',
              '0 0 0 1px rgba(255,122,0,0.25), 0 0 30px rgba(255,122,0,0.35), 0 0 60px rgba(255,122,0,0.15), 0 20px 40px rgba(0,0,0,0.6)',
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'relative',
            zIndex: 1,
            borderRadius: '28px',
            background: 'linear-gradient(145deg, rgba(255,122,0,0.08) 0%, rgba(10,8,6,0.92) 60%, rgba(0,0,0,0.96) 100%)',
            border: '1px solid rgba(255,122,0,0.22)',
            padding: '18px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <TitanMark size={size} />
        </motion.div>

        {/* ── Spinning dashed orbit ring ── */}
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: '-18px',
            borderRadius: '50%',
            border: '1px dashed rgba(255,122,0,0.18)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* ── Slower counter-rotating orbit ── */}
        <motion.div
          aria-hidden="true"
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: '-30px',
            borderRadius: '50%',
            border: '1px dashed rgba(255,122,0,0.10)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* ── Corner accent sparks ── */}
        {[
          { top: '-6px', left: '-6px' },
          { top: '-6px', right: '-6px' },
          { bottom: '-6px', left: '-6px' },
          { bottom: '-6px', right: '-6px' },
        ].map((pos, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              ...pos,
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#ff7a00',
              boxShadow: '0 0 8px 3px rgba(255,122,0,0.6)',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />
        ))}

      </motion.div>
    </div>
  );
}
