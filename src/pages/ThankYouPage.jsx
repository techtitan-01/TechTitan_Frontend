import React, { useEffect, useRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Code2 } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

/* ─────────────────────────────────────────────
   Inline logos
───────────────────────────────────────────── */
function GitHubLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57
        0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695
        -.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99
        .105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225
        -.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405
        c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225
        0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3
        0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function DiscordLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037
        c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25
        .077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027
        C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.055a19.9 19.9 0 0 0 5.993 3.03
        .078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106
        13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292
        .074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01
        c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892
        .077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028
        19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054
        c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z
        M8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419
        1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418z
        m7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419
        1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function GoogleLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Provider display config
───────────────────────────────────────────── */
const PROVIDER_INFO = {
  github: {
    Logo:         GitHubLogo,
    logoColor:   'text-white',
    logoBg:      'bg-white/8 border-gray-700',
    connectedMsg:'Your GitHub account is connected successfully.',
    accentColor: 'text-gray-300',
    chipColor:   'bg-white/5 border-gray-800 text-gray-400',
  },
  discord: {
    Logo:         DiscordLogo,
    logoColor:   'text-indigo-400',
    logoBg:      'bg-indigo-500/10 border-indigo-800',
    connectedMsg:'Your Discord account is connected successfully.',
    accentColor: 'text-indigo-300',
    chipColor:   'bg-indigo-500/8 border-indigo-900 text-indigo-400',
  },
  google: {
    Logo:         GoogleLogo,
    logoColor:   '',
    logoBg:      'bg-white/5 border-gray-800',
    connectedMsg:'Your Google account is connected successfully.',
    accentColor: 'text-blue-300',
    chipColor:   'bg-blue-500/5 border-blue-900 text-blue-400',
  },
};

/* ─────────────────────────────────────────────
   Canvas confetti (no deps)
───────────────────────────────────────────── */
function ConfettiCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);

    const COLORS = ['#ff7a00','#ffb000','#ff9933','#ffcc55','#ff5500','#ffffff','#ffd700','#ff4400'];
    const particles = Array.from({ length: 140 }, () => ({
      x: Math.random() * W, y: Math.random() * H - H,
      w: 5 + Math.random() * 10, h: 3 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: 1.4 + Math.random() * 3.2,
      angle: Math.random() * Math.PI * 2,
      spin:  (Math.random() - 0.5) * 0.14,
      drift: (Math.random() - 0.5) * 1.4,
      opacity: 0.65 + Math.random() * 0.35,
    }));

    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
        p.y += p.speed; p.x += p.drift; p.angle += p.spin;
        if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />;
}

/* ─────────────────────────────────────────────
   Floating orange dots
───────────────────────────────────────────── */
function FloatingDots() {
  const dots = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      size: 3 + Math.random() * 6,
      left: `${Math.random() * 100}%`,
      top:  `${Math.random() * 100}%`,
      opacity: 0.25 + Math.random() * 0.4,
      dur: 4 + Math.random() * 5,
      delay: Math.random() * 3,
    })),
  []);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-primary"
          style={{ width: d.size, height: d.size, left: d.left, top: d.top, opacity: d.opacity }}
          animate={{ y: [-18, 18, -18], x: [-10, 10, -10], opacity: [0.15, 0.65, 0.15] }}
          transition={{ duration: d.dur, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Pulsing halo rings
───────────────────────────────────────────── */
function PulseRing({ delay, size }) {
  return (
    <motion.div
      className={`absolute ${size} rounded-full border border-primary/18 pointer-events-none`}
      animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  );
}

/* ─────────────────────────────────────────────
   Item stagger variant
───────────────────────────────────────────── */
const itemV = {
  hidden:  { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.52, delay: 0.35 + i * 0.11, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─────────────────────────────────────────────
   ThankYouPage
───────────────────────────────────────────── */
export default function ThankYouPage() {
  const { state } = useLocation();

  // Derive the provider that was actually clicked.
  // state = { platform: 'github'|'discord', provider: 'github'|'discord'|'google' }
  const provider  = state?.provider  ?? state?.platform ?? 'github';
  const pInfo     = PROVIDER_INFO[provider] ?? PROVIDER_INFO.github;
  const ProvLogo  = pInfo.Logo;

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <PageWrapper>
      <ConfettiCanvas />
      <FloatingDots />

      <div className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 py-16 overflow-hidden grid-bg z-10">

        {/* large ambient glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-primary/10 blur-[160px] pointer-events-none"
          animate={{ scale: [1, 1.18, 1], opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute top-16 right-16 w-48 h-48 rounded-full bg-primary/5 blur-[70px] pointer-events-none" />
        <div className="absolute bottom-16 left-16 w-40 h-40 rounded-full bg-primary/5 blur-[60px] pointer-events-none" />

        {/* ── card ── */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[480px] z-10"
        >
          {/* pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
            <PulseRing delay={0}   size="w-44 h-44" />
            <PulseRing delay={1}   size="w-64 h-64" />
            <PulseRing delay={2}   size="w-96 h-96" />
          </div>

          <div className="bg-[#050505] rounded-3xl border border-[rgba(255,122,0,0.28)] shadow-[0_0_90px_rgba(255,122,0,0.14)] overflow-hidden">

            {/* top gradient bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-primary-hover to-primary" />

            <div className="px-8 sm:px-12 py-11 flex flex-col items-center text-center">

              {/* TechTitan logo */}
              <motion.div custom={0} variants={itemV} initial="hidden" animate="visible">
                <Link to="/" className="inline-block mb-8">
                  <img
                    src="/techtitan-logo.svg"
                    alt="Tech Titan"
                    className="h-8 w-auto object-contain brightness-115 drop-shadow-[0_0_12px_rgba(255,122,0,0.5)]"
                  />
                </Link>
              </motion.div>

              {/* animated success icon */}
              <motion.div custom={1} variants={itemV} initial="hidden" animate="visible" className="relative mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-3 rounded-full border border-dashed border-primary/20 pointer-events-none"
                />
                {/* outer glow ring */}
                <motion.div
                  animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-primary/25 blur-xl pointer-events-none"
                />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-[0_0_50px_rgba(255,122,0,0.5)]">
                  <motion.span
                    initial={{ scale: 0, rotate: -200 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.5 }}
                    className="text-black text-4xl font-black select-none"
                  >
                    ✓
                  </motion.span>
                </div>
              </motion.div>

              {/* heading */}
              <motion.h1 custom={2} variants={itemV} initial="hidden" animate="visible"
                className="text-3xl sm:text-4xl font-black font-display text-white mb-3 leading-tight"
              >
                Thank You For Joining<br />
                <span className="orange-gradient-text text-glow-orange">Tech Titan ❤️</span>
              </motion.h1>

              {/* general subtext */}
              <motion.p custom={3} variants={itemV} initial="hidden" animate="visible"
                className="text-gray-400 font-light text-sm sm:text-base leading-relaxed mb-5 max-w-xs"
              >
                You are now part of a community of creators, developers, and innovators building the future of technology.
              </motion.p>

              {/* platform-specific connection confirmation */}
              <motion.div custom={4} variants={itemV} initial="hidden" animate="visible" className="mb-8 w-full">
                <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border ${pInfo.chipColor} bg-opacity-80`}>
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${pInfo.logoBg}`}>
                    <ProvLogo className={`h-5 w-5 ${pInfo.logoColor}`} />
                  </div>
                  <p className={`text-sm font-medium text-left leading-snug ${pInfo.accentColor}`}>
                    {pInfo.connectedMsg}
                  </p>
                </div>
              </motion.div>

              {/* member badge */}
              <motion.div custom={5} variants={itemV} initial="hidden" animate="visible" className="mb-8">
                <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-primary/10 border border-primary/30 shadow-[0_0_22px_rgba(255,122,0,0.14)]">
                  <motion.div
                    animate={{ rotate: [0, 12, -12, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
                  >
                    <Shield className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="text-sm font-semibold text-white font-mono tracking-wide">
                    Official Tech Titan Member
                  </span>
                  <Star className="h-4 w-4 text-primary fill-primary" />
                </div>
              </motion.div>

              {/* perks mini grid */}
              <motion.div custom={6} variants={itemV} initial="hidden" animate="visible"
                className="grid grid-cols-3 gap-3 mb-9 w-full"
              >
                {[
                  { icon: Code2,  label: '45+ Projects',   sub: 'Open source repos' },
                  { icon: Star,   label: '12+ Events',      sub: 'Hackathons & more' },
                  { icon: Shield, label: 'Private Chat',    sub: 'Exclusive access'  },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="glass rounded-xl p-3 border border-gray-900 text-center hover:border-primary/25 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-primary mx-auto mb-1.5" />
                    <p className="text-[11px] font-semibold text-white">{label}</p>
                    <p className="text-[9px] text-gray-600 font-mono mt-0.5">{sub}</p>
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div custom={7} variants={itemV} initial="hidden" animate="visible"
                className="flex flex-col sm:flex-row gap-3 w-full"
              >
                <Link to="/projects"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-black bg-gradient-to-r from-primary to-primary-hover rounded-xl hover:shadow-[0_0_26px_rgba(255,122,0,0.42)] transition-all duration-300 hover:scale-[1.03] glow-orange"
                >
                  Explore Projects <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/community"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white border border-gray-800 rounded-xl hover:border-primary/50 hover:bg-white/4 transition-all duration-300"
                >
                  Back to Community
                </Link>
              </motion.div>

            </div>
          </div>

          {/* footer caption */}
          <motion.p custom={8} variants={itemV} initial="hidden" animate="visible"
            className="text-center text-[10.5px] text-gray-700 font-mono mt-5"
          >
            Made with ❤️ by Team Tech Titan • {new Date().getFullYear()}
          </motion.p>
        </motion.div>

      </div>
    </PageWrapper>
  );
}
