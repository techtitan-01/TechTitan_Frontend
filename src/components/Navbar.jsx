import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ExternalLink } from 'lucide-react';

/* ── inline SVG logos ── */
function GitHubIcon({ className }) {
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

function DiscordIcon({ className }) {
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
        19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66
        a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419
        0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42
        0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419
        0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42
        0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const NAV_LINKS = [
  { name: 'Home',       to: '/' },
  { name: 'Community',  to: '/community' },
  { name: 'Projects',   to: '/projects' },
  { name: 'Events',     to: '/events' },
  { name: 'Resources',  to: '/resources' },
  { name: 'Blog', to: '/blog' },
];

/* ── mobile menu item variants ── */
const menuItem = {
  hidden:  { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.06, ease: 'easeOut' },
  }),
  exit: { opacity: 0, x: -12, transition: { duration: 0.18 } },
};

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /* scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close mobile menu on route change */
  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/92 backdrop-blur-xl border-b border-[rgba(255,122,0,0.18)] shadow-[0_4px_40px_rgba(0,0,0,0.95)] py-2.5'
          : 'bg-black/60 backdrop-blur-md border-b border-[rgba(255,122,0,0.06)] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between gap-4">

        {/* ══ 1. LOGO ══ */}
        <Link
          to="/"
          className="flex items-center shrink-0 group select-none"
          aria-label="Tech Titan home"
        >
          <motion.img
            src="/techtitan-logo.svg"
            alt="Tech Titan"
            className="h-8 w-auto object-contain"
            whileHover={{ filter: 'brightness(1.3) drop-shadow(0 0 10px rgba(255,122,0,0.7))' }}
            transition={{ duration: 0.25 }}
          />
        </Link>

        {/* ══ 2. DESKTOP NAV LINKS ══ */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              end={link.to === '/'}
              className="relative px-3.5 py-2 rounded-lg group"
            >
              {({ isActive }) => (
                <>
                  {/* hover bg pill */}
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/4 transition-colors duration-200"
                    layoutId={isActive ? 'active-nav-pill' : undefined}
                  />

                  {/* label */}
                  <span
                    className={`relative z-10 text-sm font-medium tracking-wide transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-gray-300 group-hover:text-white'
                    }`}
                  >
                    {link.name}
                  </span>

                  {/* active underline */}
                  <span
                    className={`absolute bottom-0.5 left-3.5 right-3.5 h-[1.5px] rounded-full bg-primary transition-all duration-300 shadow-[0_0_6px_#ff7a00] ${
                      isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`}
                    style={{ transformOrigin: 'left' }}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* ══ 3. DESKTOP RIGHT CLUSTER ══ */}
        <div className="hidden lg:flex items-center gap-2.5">

          {/* GitHub pill button */}
          <NavbarPlatformBtn
            to="/github-login"
            label="GitHub"
            Icon={GitHubIcon}
            iconStyle="text-white"
            baseStyle="bg-white/4 border-gray-800 hover:border-[rgba(255,122,0,0.55)] hover:bg-[rgba(255,122,0,0.06)] hover:shadow-[0_0_16px_rgba(255,122,0,0.18)]"
          />

          {/* Discord pill button */}
          <NavbarPlatformBtn
            to="/discord-login"
            label="Discord"
            Icon={DiscordIcon}
            iconStyle="text-indigo-400 group-hover:text-primary"
            baseStyle="bg-indigo-500/5 border-indigo-900/60 hover:border-[rgba(255,122,0,0.55)] hover:bg-[rgba(255,122,0,0.06)] hover:shadow-[0_0_16px_rgba(255,122,0,0.18)]"
          />

          {/* divider */}
          <div className="w-px h-5 bg-gray-800 mx-0.5" />

          {/* Join Community CTA */}
          <JoinCTA />
        </div>

        {/* ══ HAMBURGER (mobile / tablet) ══ */}
        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-xl border border-gray-800 bg-black/50 text-gray-400 hover:text-primary hover:border-primary/40 transition-colors duration-200 focus:outline-none"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span key="x"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span key="burger"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

      </div>

      {/* ══ MOBILE PANEL ══ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden"
          >
            <div
              className="mx-4 mb-4 mt-1 rounded-2xl border border-[rgba(255,122,0,0.12)] bg-black/90 backdrop-blur-xl overflow-hidden"
              style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,122,0,0.06)' }}
            >
              {/* nav links */}
              <div className="px-3 pt-4 pb-2 space-y-0.5">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    custom={i}
                    variants={menuItem}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                          isActive
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'text-gray-300 hover:bg-white/4 hover:text-white border border-transparent'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span>{link.name}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_#ff7a00]" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* divider */}
              <div className="mx-4 my-2 border-t border-gray-900/80" />

              {/* platform buttons */}
              <div className="px-3 pb-3 space-y-2">
                <motion.div custom={NAV_LINKS.length} variants={menuItem} initial="hidden" animate="visible" exit="exit">
                  <MobilePlatformBtn
                    to="/github-login"
                    label="GitHub"
                    sublabel="Open source community"
                    Icon={GitHubIcon}
                    iconBg="bg-white/5 border-gray-800"
                    iconColor="text-white"
                  />
                </motion.div>

                <motion.div custom={NAV_LINKS.length + 1} variants={menuItem} initial="hidden" animate="visible" exit="exit">
                  <MobilePlatformBtn
                    to="/discord-login"
                    label="Discord"
                    sublabel="Chat with developers"
                    Icon={DiscordIcon}
                    iconBg="bg-indigo-500/10 border-indigo-900/60"
                    iconColor="text-indigo-400"
                  />
                </motion.div>
              </div>

              {/* divider */}
              <div className="mx-4 mb-3 border-t border-gray-900/80" />

              {/* Join CTA */}
              <motion.div
                custom={NAV_LINKS.length + 2}
                variants={menuItem}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="px-3 pb-4"
              >
                <Link
                  to="/community"
                  className="group relative flex items-center justify-center gap-2.5 w-full px-5 py-3.5 text-sm font-bold text-black bg-gradient-to-r from-primary to-primary-hover rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,122,0,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    Join Community
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ── desktop platform button (GitHub / Discord) ── */
function NavbarPlatformBtn({ to, label, Icon, iconStyle, baseStyle }) {
  return (
    <Link
      to={to}
      className={`group relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-gray-300 border transition-all duration-250 hover:text-white ${baseStyle}`}
    >
      <Icon className={`h-4 w-4 shrink-0 transition-colors duration-200 ${iconStyle}`} />
      <span>{label}</span>
      {/* subtle external indicator */}
      <ExternalLink className="h-2.5 w-2.5 text-gray-700 group-hover:text-primary/60 transition-colors duration-200" />
    </Link>
  );
}

/* ── desktop Join Community CTA ── */
function JoinCTA() {
  return (
    <Link
      to="/community"
      className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden border border-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_22px_rgba(255,122,0,0.45)]"
    >
      {/* fill sweep */}
      <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* static subtle tint */}
      <span className="absolute inset-0 bg-primary/8" />
      <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
        Join Community
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
      </span>
    </Link>
  );
}

/* ── mobile platform button row ── */
function MobilePlatformBtn({ to, label, sublabel, Icon, iconBg, iconColor }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3.5 px-4 py-3.5 rounded-xl border border-gray-900 bg-black/40 hover:border-[rgba(255,122,0,0.35)] hover:bg-[rgba(255,122,0,0.04)] transition-all duration-250"
    >
      <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors duration-200">
          {label}
        </p>
        <p className="text-[11px] text-gray-600 font-mono mt-0.5 truncate">{sublabel}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-700 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
    </Link>
  );
}
