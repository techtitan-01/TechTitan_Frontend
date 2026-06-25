/**
 * LoginPage
 * /github-login  → platform="github"  shows: GitHub + Google
 * /discord-login → platform="discord" shows: Discord + Google
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Shield, Lock, CheckCircle2 } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

/* ─────────────────────────────────────────────
   SVG Logos (inline — no extra deps)
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
   Per-platform config
───────────────────────────────────────────── */
const PLATFORM_CONFIG = {
  github: {
    id:          'github',
    heading:     'Continue With GitHub',
    subtitle:    'Connect your GitHub account to join Tech Titan.',
    headerGrad:  'from-[#0d1117] via-[#161b22] to-black',
    accentBorder:'border-gray-700',
    Logo:         GitHubLogo,
    iconBg:      'bg-white/5 border-white/10',
    logoColor:   'text-white',
    badge:       { label: 'Open Source Platform', cls: 'text-gray-300 bg-white/5 border-gray-700' },
    primaryBtn: {
      id:     'github',
      label:  'GitHub Login',
      Logo:    GitHubLogo,
      logoColor: 'text-white group-hover/btn:text-black',
      style:  'bg-[#161b22] border-gray-700 hover:border-primary/70 hover:shadow-[0_0_22px_rgba(255,122,0,0.22)]',
    },
    secondaryBtn: {
      id:    'google',
      label: 'Continue With Google',
      Logo:   GoogleLogo,
      logoColor: '',           // Google logo is already multi-color
      style: 'bg-white/4 border-gray-800 hover:border-primary/50 hover:shadow-[0_0_16px_rgba(255,122,0,0.15)]',
    },
  },
  discord: {
    id:          'discord',
    heading:     'Continue With Discord',
    subtitle:    'Connect your Discord account to join Tech Titan.',
    headerGrad:  'from-[#1e1f2e] via-[#23243a] to-black',
    accentBorder:'border-indigo-800',
    Logo:         DiscordLogo,
    iconBg:      'bg-indigo-500/10 border-indigo-500/25',
    logoColor:   'text-indigo-400',
    badge:       { label: 'Community Chat', cls: 'text-indigo-300 bg-indigo-500/10 border-indigo-800' },
    primaryBtn: {
      id:     'discord',
      label:  'Discord Login',
      Logo:    DiscordLogo,
      logoColor: 'text-indigo-400 group-hover/btn:text-black',
      style:  'bg-indigo-500/8 border-indigo-800 hover:border-primary/70 hover:shadow-[0_0_22px_rgba(255,122,0,0.22)]',
    },
    secondaryBtn: {
      id:    'google',
      label: 'Continue With Google',
      Logo:   GoogleLogo,
      logoColor: '',
      style: 'bg-white/4 border-gray-800 hover:border-primary/50 hover:shadow-[0_0_16px_rgba(255,122,0,0.15)]',
    },
  },
};

/* ─────────────────────────────────────────────
   Animated loading dots
───────────────────────────────────────────── */
function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1.5" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-current"
          animate={{ opacity: [0.25, 1, 0.25], scale: [0.7, 1.3, 0.7] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Reusable AuthButton
   States: idle → loading → success
───────────────────────────────────────────── */
function AuthButton({ cfg, status, activeId, onConnect }) {
  const { id, label, Logo, logoColor, style } = cfg;
  const isLoading = status === 'loading' && activeId === id;
  const isSuccess = status === 'success'  && activeId === id;
  const isDisabled = status !== 'idle';
  const dimmed = isDisabled && !isLoading && !isSuccess;

  return (
    <motion.button
      onClick={() => !isDisabled && onConnect(id)}
      whileHover={!isDisabled ? { scale: 1.018 } : {}}
      whileTap={!isDisabled  ? { scale: 0.975 } : {}}
      disabled={isDisabled}
      className={`
        group/btn relative w-full flex items-center justify-center gap-3
        px-6 py-4 rounded-2xl text-sm font-semibold text-white border
        transition-all duration-300 overflow-hidden select-none
        ${style}
        ${dimmed ? 'opacity-35 cursor-not-allowed' : 'cursor-pointer'}
        ${(isLoading || isSuccess) ? 'border-primary/60 shadow-[0_0_20px_rgba(255,122,0,0.2)]' : ''}
      `}
    >
      {/* hover fill sweep */}
      <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-hover opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.span key="loading"
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="relative z-10 flex items-center gap-3"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full inline-block"
            />
            <span className="text-white/80">Authenticating</span>
            <LoadingDots />
          </motion.span>
        ) : isSuccess ? (
          <motion.span key="success"
            initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="relative z-10 flex items-center gap-2 text-green-400"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span>Connected — redirecting…</span>
          </motion.span>
        ) : (
          <motion.span key="idle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="relative z-10 flex items-center gap-3 group-hover/btn:text-black transition-colors duration-300"
          >
            <Logo className={`h-5 w-5 shrink-0 transition-colors duration-300 ${logoColor}`} />
            <span>{label}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   Main LoginPage component
───────────────────────────────────────────── */
export default function LoginPage({ platform = 'github' }) {
  const cfg     = PLATFORM_CONFIG[platform] ?? PLATFORM_CONFIG.github;
  const PlatformLogo = cfg.Logo;
  const navigate = useNavigate();

  const [status,   setStatus]   = useState('idle');   // 'idle' | 'loading' | 'success'
  const [activeId, setActiveId] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  function handleConnect(providerId) {
    if (status !== 'idle') return;
    setActiveId(providerId);
    setStatus('loading');

    // Simulate OAuth handshake (1.8 s), then success animation (0.9 s), then redirect
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        navigate('/thank-you', {
          state: {
            platform,
            provider: providerId,   // 'github' | 'discord' | 'google'
          },
        });
      }, 950);
    }, 1800);
  }

  /* ── background floating orbs ── */
  const orbs = platform === 'github'
    ? ['bg-gray-700/20', 'bg-gray-500/10']
    : ['bg-indigo-700/15', 'bg-primary/8'];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden grid-bg">

        {/* ambient glow orbs */}
        <motion.div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[640px] h-[360px] rounded-full ${orbs[0]} blur-[150px] pointer-events-none`}
          animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className={`absolute bottom-12 right-12 w-56 h-56 rounded-full ${orbs[1]} blur-[80px] pointer-events-none`} />
        <div className="absolute top-12 left-12 w-40 h-40 rounded-full bg-primary/5 blur-[60px] pointer-events-none" />

        {/* back link */}
        <motion.div
          initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="absolute top-6 left-6 sm:top-8 sm:left-8"
        >
          <Link
            to="/community"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Community
          </Link>
        </motion.div>

        {/* ── main card ── */}
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[420px]"
        >
          <div className="rounded-3xl border border-[rgba(255,122,0,0.15)] shadow-[0_0_70px_rgba(0,0,0,0.85)] overflow-hidden bg-[#050505]">

            {/* ── header section ── */}
            <div className={`bg-gradient-to-b ${cfg.headerGrad} px-8 pt-9 pb-8 flex flex-col items-center text-center border-b border-white/[0.04]`}>

              {/* Tech Titan logo */}
              <Link to="/" className="mb-7 inline-block">
                <img
                  src="/techtitan-logo.svg"
                  alt="Tech Titan"
                  className="h-8 w-auto object-contain brightness-110 drop-shadow-[0_0_10px_rgba(255,122,0,0.4)]"
                />
              </Link>

              {/* platform icon ring */}
              <div className="relative mb-5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                  className={`absolute -inset-2.5 rounded-full border border-dashed ${cfg.accentBorder} opacity-30 pointer-events-none`}
                />
                <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center ${cfg.iconBg}`}>
                  <PlatformLogo className={`h-9 w-9 ${cfg.logoColor}`} />
                </div>
              </div>

              {/* badge */}
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border mb-4 ${cfg.badge.cls}`}>
                {cfg.badge.label}
              </span>

              {/* heading */}
              <h1 className="text-2xl font-black font-display text-white mb-2 leading-tight">
                {cfg.heading}
              </h1>
              <p className="text-gray-400 text-sm font-light leading-relaxed max-w-xs">
                {cfg.subtitle}
              </p>
            </div>

            {/* ── body section ── */}
            <div className="px-7 py-7 space-y-3.5">

              {/* security pill */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/12 mb-1">
                <Shield className="h-4 w-4 text-primary shrink-0" />
                <p className="text-xs text-gray-400 font-light leading-snug">
                  Secure OAuth 2.0 — we never store your password or private data.
                </p>
              </div>

              {/* ── PRIMARY button (platform-specific) ── */}
              <AuthButton
                cfg={cfg.primaryBtn}
                status={status}
                activeId={activeId}
                onConnect={handleConnect}
              />

              {/* divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-gray-900" />
                <span className="text-[10px] text-gray-700 font-mono uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-gray-900" />
              </div>

              {/* ── SECONDARY button (Google — always) ── */}
              <AuthButton
                cfg={cfg.secondaryBtn}
                status={status}
                activeId={activeId}
                onConnect={handleConnect}
              />

              {/* legal */}
              <p className="text-center text-[10.5px] text-gray-700 font-mono pt-2 leading-relaxed">
                By continuing you agree to our{' '}
                <span className="text-primary/80 hover:text-primary cursor-pointer transition-colors">Terms</span>
                {' '}&amp;{' '}
                <span className="text-primary/80 hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>.
              </p>
            </div>

          </div>

          {/* trust chips below card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2.5 mt-6"
          >
            {[
              { icon: Lock,    text: 'Encrypted' },
              { icon: Shield,  text: 'OAuth 2.0' },
              { icon: CheckCircle2, text: 'Free Forever' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono text-gray-600 border border-gray-900 bg-black/60">
                <Icon className="h-3 w-3 text-primary/60" />
                {text}
              </span>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </PageWrapper>
  );
}
