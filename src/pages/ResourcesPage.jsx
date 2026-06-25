import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code2, Database, GitBranch, BookOpen, Brain,
  Cpu, Layers, Cloud, Shield, Globe,
  Terminal, ArrowRight, ChevronRight, Zap, BarChart2
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeCard = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/* ─── Resource categories ─── */
const programming = [
  { icon: Globe,    title: 'Web Development',    desc: 'HTML, CSS, JS, React, Vue, and full-stack patterns.' },
  { icon: Database, title: 'Data Structures',     desc: 'Arrays, trees, graphs, heaps — with interactive visualizations.' },
  { icon: Code2,    title: 'Algorithms',           desc: 'Sorting, searching, dynamic programming, greedy approaches.' },
  { icon: BookOpen, title: 'Programming Guides',  desc: 'Curated reads for Python, Rust, Go, TypeScript and more.' },
];

const aiResources = [
  { icon: Brain,  title: 'Machine Learning',  desc: 'Supervised, unsupervised, reinforcement — all covered.' },
  { icon: Cpu,    title: 'AI Tools',           desc: 'LLMs, vector DBs, prompt engineering, RAG pipelines.' },
  { icon: Layers, title: 'AI Projects',        desc: 'Open-source repos you can study, fork, and extend.' },
  { icon: BarChart2, title: 'Research Papers', desc: 'Latest arXiv papers curated by the community weekly.' },
];

const devTools = [
  { icon: GitBranch, title: 'GitHub',       desc: 'Version control, CI/CD, Actions, and collaborative repos.' },
  { icon: Terminal,  title: 'VS Code',      desc: 'Extensions, shortcuts, settings sync, and debug tips.' },
  { icon: Cloud,     title: 'Cloud Tools',  desc: 'AWS, GCP, Azure, Docker, Kubernetes primers.' },
  { icon: Shield,    title: 'APIs',         desc: 'REST, GraphQL, WebSocket, and gRPC integration guides.' },
];

/* ─── Roadmaps ─── */
const roadmaps = [
  {
    level: 'Beginner',
    badge: 'text-green-400 bg-green-400/10 border-green-400/20',
    icon: Zap,
    steps: [
      'Learn HTML & CSS fundamentals',
      'JavaScript basics & DOM',
      'Version control with Git',
      'Build your first project',
      'Deploy to the web',
    ],
    cta: 'Start Learning',
    gradient: 'from-green-600/15 to-emerald-900/5',
  },
  {
    level: 'Intermediate',
    badge: 'text-primary bg-primary/10 border-primary/20',
    icon: Code2,
    steps: [
      'React or Vue framework',
      'Node.js + REST APIs',
      'Database design (SQL & NoSQL)',
      'Authentication & security',
      'Testing & CI/CD pipelines',
    ],
    cta: 'Level Up',
    gradient: 'from-orange-600/20 to-amber-900/5',
  },
  {
    level: 'Advanced',
    badge: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    icon: Cpu,
    steps: [
      'System design & scalability',
      'Microservices & Kubernetes',
      'ML / AI integration',
      'Performance profiling',
      'Open source contributions',
    ],
    cta: 'Go Advanced',
    gradient: 'from-purple-600/15 to-pink-900/5',
  },
];

/* ─── ResourceGrid sub-component ─── */
function ResourceGrid({ title, label, items }) {
  return (
    <div>
      <div className="mb-8">
        <motion.p {...fadeUp()} className="text-xs font-semibold tracking-wider text-primary uppercase font-mono mb-2">
          {label}
        </motion.p>
        <motion.h3 {...fadeUp(0.1)} className="text-2xl sm:text-3xl font-bold font-display text-white">
          {title}
        </motion.h3>
      </div>
      <motion.div
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.title} variants={fadeCard}
              className="glass glass-hover p-6 rounded-2xl flex flex-col gap-4 group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-white group-hover:text-primary transition-colors duration-300 mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-primary font-semibold mt-auto group-hover:translate-x-1 transition-transform duration-300">
                Explore <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <PageWrapper>
      <main className="bg-black min-h-screen pt-24">

        {/* ══ HERO ══ */}
        <section className="relative py-24 overflow-hidden grid-bg">
          <div className="absolute inset-0 radial-glow pointer-events-none" />
          <motion.div
            className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[130px] pointer-events-none"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <motion.div {...fadeUp()} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[rgba(255,122,0,0.25)] text-primary text-xs font-semibold uppercase tracking-wider mb-8">
              <BookOpen className="h-3.5 w-3.5" /> Resources
            </motion.div>
            <motion.h1 {...fadeUp(0.1)} className="text-5xl sm:text-7xl font-black font-display tracking-tight text-white mb-6">
              Resources For <span className="orange-gradient-text text-glow-orange">Growth</span>
            </motion.h1>
            <motion.p {...fadeUp(0.2)} className="max-w-2xl mx-auto text-lg text-gray-400 font-light leading-relaxed mb-10">
              Everything you need to upgrade your technology skills — from beginner fundamentals to advanced system design.
            </motion.p>
            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/community"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-black bg-gradient-to-r from-primary to-primary-hover rounded-full hover:shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-all duration-300 hover:scale-105 glow-orange"
              >
                Join Community <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#roadmaps"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border border-gray-800 rounded-full hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                View Roadmaps
              </a>
            </motion.div>
          </div>
        </section>

        {/* ══ RESOURCE SECTIONS ══ */}
        <section className="py-20 bg-black relative">
          <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-24">
            <ResourceGrid
              label="Coding Skills"
              title="Programming Resources"
              items={programming}
            />
            <ResourceGrid
              label="Artificial Intelligence"
              title="AI Resources"
              items={aiResources}
            />
            <ResourceGrid
              label="Tools & Platforms"
              title="Developer Tools"
              items={devTools}
            />
          </div>
        </section>

        {/* ══ ROADMAPS ══ */}
        <section id="roadmaps" className="py-20 bg-black relative">
          <div className="absolute bottom-0 right-1/3 w-96 h-64 rounded-full bg-primary/6 blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-14">
              <motion.h2 {...fadeUp()} className="text-sm font-semibold tracking-wider text-primary uppercase mb-3 font-mono">Your Path</motion.h2>
              <motion.h3 {...fadeUp(0.1)} className="text-3xl sm:text-5xl font-bold font-display text-white">Learning Roadmaps</motion.h3>
              <motion.p {...fadeUp(0.2)} className="max-w-xl mx-auto mt-4 text-gray-400 font-light">
                Structured pathways to take you from zero to production — no matter where you start.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
              {roadmaps.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={r.level}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="glass rounded-2xl overflow-hidden border border-gray-900 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(255,122,0,0.08)] transition-all duration-300 group flex flex-col"
                  >
                    {/* header */}
                    <div className={`bg-gradient-to-br ${r.gradient} p-6 border-b border-gray-900`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${r.badge}`}>
                          {r.level}
                        </span>
                      </div>
                    </div>

                    {/* steps */}
                    <div className="p-6 flex flex-col flex-grow">
                      <ul className="space-y-3 mb-8 flex-grow">
                        {r.steps.map((step, idx) => (
                          <li key={step} className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-sm text-gray-300 leading-snug">{step}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/community"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-black border border-gray-800 rounded-xl hover:border-primary hover:text-black hover:bg-primary transition-all duration-300"
                      >
                        {r.cta} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ BOTTOM CTA ══ */}
        <section className="py-20 bg-black grid-bg relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[300px] rounded-full bg-primary/8 blur-[120px]" />
          </div>
          <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
            <motion.div {...fadeUp()} className="glass rounded-3xl p-10 sm:p-14 border border-[rgba(255,122,0,0.25)] glow-orange bg-black/60">
              <Brain className="h-10 w-10 text-primary mx-auto mb-5 opacity-80" />
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-4">
                Ready to <span className="orange-gradient-text">Level Up?</span>
              </h2>
              <p className="text-gray-400 mb-8 font-light">
                Get access to all resources, community discussions, and mentorship by joining Tech Titan today.
              </p>
              <Link
                to="/community"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-black bg-gradient-to-r from-primary to-primary-hover rounded-full hover:shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-all duration-300 hover:scale-105 glow-orange"
              >
                Join Free <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
    </PageWrapper>
  );
}
