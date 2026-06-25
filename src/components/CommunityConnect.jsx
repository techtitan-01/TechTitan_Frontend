import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Star, GitFork } from 'lucide-react';

/* ── inline SVG logos so no extra deps needed ── */
function GitHubLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function DiscordLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.032.055a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function CommunityConnect() {
  return (
    <section className="py-28 bg-black relative overflow-hidden">
      {/* ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-primary/6 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* header */}
        <div className="text-center mb-16">
          <motion.p {...fadeUp()} className="text-xs font-semibold tracking-wider text-primary uppercase font-mono mb-3">
            Online Spaces
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="text-3xl sm:text-5xl font-bold font-display text-white mb-4">
            Connect With Tech Titans
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="max-w-xl mx-auto text-gray-400 font-light text-lg leading-relaxed">
            Join our online spaces, collaborate with developers, and stay updated wherever you work.
          </motion.p>
        </div>

        {/* two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── GitHub Card ── */}
          <motion.div {...fadeUp(0.15)}
            className="group relative glass rounded-3xl border border-gray-900 hover:border-[rgba(255,122,0,0.55)] hover:shadow-[0_0_50px_rgba(255,122,0,0.12)] transition-all duration-500 overflow-hidden"
          >
            {/* top gradient strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 group-hover:from-primary group-hover:via-primary-hover group-hover:to-primary transition-all duration-500" />

            <div className="p-9 sm:p-12">
              {/* icon + badge row */}
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-400 group-hover:shadow-[0_0_24px_rgba(255,122,0,0.2)]">
                  <GitHubLogo className="h-9 w-9 text-white group-hover:text-primary transition-colors duration-400" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-green-500/10 border border-green-500/20 text-green-400">
                  Open Source
                </span>
              </div>

              {/* text */}
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3 group-hover:text-primary transition-colors duration-300">
                GitHub Community
              </h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8 text-base">
                Explore our open-source projects, contribute code, review pull requests, and build together with hundreds of developers.
              </p>

              {/* mini stats */}
              <div className="flex flex-wrap gap-5 mb-9">
                {[
                  [GitFork, '45+ Repos'],
                  [Star,    '1.2k Stars'],
                  [Users,   '200+ Contributors'],
                ].map(([Icon, label]) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-gray-400">
                    <Icon className="h-4 w-4 text-primary" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* button */}
              <Link
                to="/github-login"
                className="group/btn relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 text-sm font-bold rounded-xl overflow-hidden border border-gray-800 text-white hover:border-primary transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,122,0,0.25)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-hover opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <GitHubLogo className="h-5 w-5 relative z-10 group-hover/btn:text-black transition-colors duration-300" />
                <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                  Join GitHub
                </span>
                <ArrowRight className="h-4 w-4 relative z-10 group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* ── Discord Card ── */}
          <motion.div {...fadeUp(0.25)}
            className="group relative glass rounded-3xl border border-gray-900 hover:border-[rgba(255,122,0,0.55)] hover:shadow-[0_0_50px_rgba(255,122,0,0.12)] transition-all duration-500 overflow-hidden"
          >
            {/* animated glow pulse on the card edge */}
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: '0 0 0 1px rgba(255,122,0,0.35)' }}
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* top gradient strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-900 group-hover:from-primary group-hover:via-primary-hover group-hover:to-primary transition-all duration-500" />

            <div className="p-9 sm:p-12">
              {/* icon + badge row */}
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-400 group-hover:shadow-[0_0_24px_rgba(255,122,0,0.2)]">
                  <DiscordLogo className="h-9 w-9 text-indigo-400 group-hover:text-primary transition-colors duration-400" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  Live Chat
                </span>
              </div>

              {/* text */}
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3 group-hover:text-primary transition-colors duration-300">
                Discord Community
              </h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8 text-base">
                Chat with developers in real-time, ask questions, share your projects, get code reviews, and collaborate on ideas 24/7.
              </p>

              {/* mini stats */}
              <div className="flex flex-wrap gap-5 mb-9">
                {[
                  [Users,  '800+ Members'],
                  [Star,   '12 Channels'],
                  [Users,  '24/7 Active'],
                ].map(([Icon, label]) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-gray-400">
                    <Icon className="h-4 w-4 text-primary" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              {/* button */}
              <Link
                to="/discord-login"
                className="group/btn relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 text-sm font-bold rounded-xl overflow-hidden border border-indigo-800 text-white hover:border-primary transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,122,0,0.25)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-hover opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <DiscordLogo className="h-5 w-5 relative z-10 group-hover/btn:text-black transition-colors duration-300" />
                <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">
                  Join Discord
                </span>
                <ArrowRight className="h-4 w-4 relative z-10 group-hover/btn:text-black group-hover/btn:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
