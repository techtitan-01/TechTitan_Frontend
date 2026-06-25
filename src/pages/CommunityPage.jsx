import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, BookOpen, GitMerge, TrendingUp,
  Code2, Palette, Brain, GitBranch,
  ArrowRight, Star, MapPin, MessageSquare
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import CommunityConnect from '../components/CommunityConnect';

/* ─── animation helpers ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeCard = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ─── data ─── */
const benefits = [
  {
    icon: Users,
    title: 'Developer Network',
    desc: 'Connect with developers worldwide, exchange ideas, and collaborate on real-world projects.',
  },
  {
    icon: BookOpen,
    title: 'Learning Hub',
    desc: 'Access curated resources, in-depth discussions, tutorials, and mentorship sessions.',
  },
  {
    icon: GitMerge,
    title: 'Collaboration',
    desc: 'Work together on innovative open-source and production projects that matter.',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    desc: 'Improve your skills, build your portfolio, and discover exciting opportunities.',
  },
];

const members = [
  {
    name: 'Aryan Mehta',
    role: 'Full-Stack Developer',
    icon: Code2,
    tags: ['React', 'Node.js', 'AWS'],
    location: 'Bengaluru, IN',
    projects: 8,
    color: 'from-orange-600/20 to-amber-900/10',
  },
  {
    name: 'Sana Qureshi',
    role: 'UI/UX Designer',
    icon: Palette,
    tags: ['Figma', 'Tailwind', 'Motion'],
    location: 'Mumbai, IN',
    projects: 6,
    color: 'from-rose-600/20 to-orange-900/10',
  },
  {
    name: 'Devraj Iyer',
    role: 'AI / ML Enthusiast',
    icon: Brain,
    tags: ['Python', 'PyTorch', 'LLMs'],
    location: 'Chennai, IN',
    projects: 11,
    color: 'from-amber-500/20 to-yellow-900/10',
  },
  {
    name: 'Priya Sharma',
    role: 'Open Source Contributor',
    icon: GitBranch,
    tags: ['Rust', 'Go', 'Linux'],
    location: 'Hyderabad, IN',
    projects: 14,
    color: 'from-orange-700/20 to-red-900/10',
  },
];

/* ─── component ─── */
export default function CommunityPage() {
  return (
    <PageWrapper>
      <main className="bg-black min-h-screen pt-24">

        {/* ══ HERO ══ */}
        <section className="relative py-24 overflow-hidden grid-bg">
          <div className="absolute inset-0 radial-glow pointer-events-none" />
          <motion.div
            className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/8 blur-[120px] pointer-events-none"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[rgba(255,122,0,0.25)] text-primary text-xs font-semibold uppercase tracking-wider mb-8">
              <Users className="h-3.5 w-3.5" /> Community
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} className="text-5xl sm:text-7xl font-black font-display tracking-tight text-white mb-6">
              Join The <span className="orange-gradient-text text-glow-orange">Tech Titan</span><br />Community
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="max-w-2xl mx-auto text-lg text-gray-400 font-light leading-relaxed mb-10">
              A place where innovators meet, share knowledge, and create amazing technology together.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-black bg-gradient-to-r from-primary to-primary-hover rounded-full hover:shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-all duration-300 hover:scale-105 glow-orange"
              >
                Explore Projects <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#benefits"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white border border-gray-800 rounded-full hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                Learn More
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div {...fadeUp(0.4)} className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
              {[['1,200+','Members'],['45+','Projects'],['12+','Events'],['8+','Countries']].map(([n,l]) => (
                <div key={l} className="glass rounded-2xl p-5 border border-gray-900 hover:border-primary/30 transition-all duration-300 text-center">
                  <div className="text-3xl font-black text-white text-glow-orange">{n}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-mono">{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══ BENEFITS ══ */}
        <section id="benefits" className="py-24 bg-black relative">
          <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.h2 {...fadeUp()} className="text-sm font-semibold tracking-wider text-primary uppercase mb-3 font-mono">Why Join Us</motion.h2>
              <motion.h3 {...fadeUp(0.1)} className="text-3xl sm:text-5xl font-bold font-display text-white">
                Community Benefits
              </motion.h3>
            </div>

            <motion.div
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <motion.div key={b.title} variants={fadeCard}
                    className="glass glass-hover p-7 rounded-2xl flex flex-col gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-semibold text-white font-display group-hover:text-primary transition-colors duration-300">{b.title}</h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">{b.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ══ MEMBERS ══ */}
        <section className="py-24 bg-black relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.h2 {...fadeUp()} className="text-sm font-semibold tracking-wider text-primary uppercase mb-3 font-mono">Meet the Titans</motion.h2>
              <motion.h3 {...fadeUp(0.1)} className="text-3xl sm:text-5xl font-bold font-display text-white">Community Members</motion.h3>
              <motion.p {...fadeUp(0.2)} className="max-w-xl mx-auto mt-4 text-gray-400 font-light">
                Talented builders from across the globe — all part of one community.
              </motion.p>
            </div>

            <motion.div
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {members.map((m) => {
                const Icon = m.icon;
                return (
                  <motion.div key={m.name} variants={fadeCard}
                    className="glass rounded-2xl overflow-hidden border border-gray-900 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(255,122,0,0.08)] transition-all duration-300 group"
                  >
                    {/* card top */}
                    <div className={`bg-gradient-to-br ${m.color} h-28 flex items-center justify-center relative`}>
                      <div className="absolute inset-0 grid-bg opacity-20" />
                      <div className="w-16 h-16 rounded-2xl bg-black/70 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 relative z-10">
                        <Icon className="h-8 w-8" />
                      </div>
                    </div>
                    {/* card body */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h4 className="text-base font-semibold text-white group-hover:text-primary transition-colors duration-300">{m.name}</h4>
                        <p className="text-xs text-gray-500 font-mono mt-0.5">{m.role}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <MapPin className="h-3 w-3 text-primary" /> {m.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Star className="h-3 w-3 text-primary" /> {m.projects} Projects
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {m.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-primary/10 text-primary border border-primary/20">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ══ COMMUNITY CONNECT (GitHub + Discord) ══ */}
        <CommunityConnect />

        {/* ══ CTA BANNER ══ */}
        <section className="py-24 bg-black grid-bg relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
          </div>
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <motion.div {...fadeUp()}
              className="glass rounded-3xl p-10 sm:p-16 border border-[rgba(255,122,0,0.25)] glow-orange-lg bg-black/60"
            >
              <MessageSquare className="h-10 w-10 text-primary mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl sm:text-5xl font-black font-display text-white mb-5">
                Become a <span className="orange-gradient-text text-glow-orange">Titan</span> Today
              </h2>
              <p className="text-gray-400 text-lg font-light mb-8 max-w-xl mx-auto">
                Join 1,200+ developers, designers, and innovators. Collaborate, learn, and build the future.
              </p>
              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-10 py-4 text-base font-bold text-black bg-gradient-to-r from-primary to-primary-hover rounded-full hover:shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-all duration-300 hover:scale-105 glow-orange"
              >
                View Upcoming Events <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
    </PageWrapper>
  );
}
