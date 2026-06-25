import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Globe, Smartphone, Cloud, Shield,
  Code2, ExternalLink, Github, Filter, ArrowRight, Layers
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const allProjects = [
  {
    id: 'ai-assistant',
    category: 'AI',
    title: 'AI Assistant',
    desc: 'An intelligent conversational assistant powered by large language models with context memory and multi-tool use.',
    tech: ['React', 'Python', 'FastAPI', 'LLMs'],
    icon: Brain,
    gradient: 'from-orange-600/25 to-amber-900/10',
    featured: true,
  },
  {
    id: 'dev-portfolio',
    category: 'Web',
    title: 'Developer Portfolio',
    desc: 'Modern glassmorphic developer portfolio with animated transitions, dark theme, and CMS integration.',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    icon: Globe,
    gradient: 'from-amber-500/20 to-orange-900/10',
    featured: false,
  },
  {
    id: 'smart-dashboard',
    category: 'Web',
    title: 'Smart Dashboard',
    desc: 'Analytics dashboard with real-time data visualization, live WebSocket feeds, and role-based access.',
    tech: ['Next.js', 'APIs', 'Chart.js', 'WebSocket'],
    icon: Layers,
    gradient: 'from-red-600/20 to-orange-900/10',
    featured: true,
  },
  {
    id: 'task-mobile',
    category: 'Mobile',
    title: 'TaskFlow Mobile',
    desc: 'Cross-platform productivity app with offline sync, collaborative boards, and push notifications.',
    tech: ['React Native', 'Expo', 'Supabase'],
    icon: Smartphone,
    gradient: 'from-orange-700/25 to-red-900/10',
    featured: false,
  },
  {
    id: 'cloud-infra',
    category: 'Cloud',
    title: 'CloudPilot IaC',
    desc: 'Infrastructure-as-Code toolkit for provisioning Kubernetes clusters with automated scaling policies.',
    tech: ['Terraform', 'K8s', 'Go', 'AWS'],
    icon: Cloud,
    gradient: 'from-amber-600/20 to-yellow-900/10',
    featured: false,
  },
  {
    id: 'ai-cv',
    category: 'AI',
    title: 'Vision Guard',
    desc: 'Computer vision pipeline for real-time object detection and anomaly flagging in surveillance feeds.',
    tech: ['Python', 'OpenCV', 'YOLOv8', 'FastAPI'],
    icon: Shield,
    gradient: 'from-orange-500/20 to-amber-900/10',
    featured: true,
  },
  {
    id: 'open-cms',
    category: 'Web',
    title: 'Open CMS',
    desc: 'Headless content management system with GraphQL API, plugin architecture, and live preview.',
    tech: ['Node.js', 'GraphQL', 'React', 'MongoDB'],
    icon: Code2,
    gradient: 'from-red-500/20 to-orange-900/10',
    featured: false,
  },
  {
    id: 'ml-mobile',
    category: 'Mobile',
    title: 'Health AI App',
    desc: 'On-device machine learning app for health metric analysis with wearable BLE device integration.',
    tech: ['Flutter', 'TensorFlow Lite', 'Dart'],
    icon: Brain,
    gradient: 'from-amber-700/20 to-red-900/10',
    featured: false,
  },
];

const FILTERS = ['All', 'AI', 'Web', 'Mobile', 'Cloud'];

export default function ProjectsPage() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === active);

  return (
    <PageWrapper>
      <main className="bg-black min-h-screen pt-24">

        {/* ══ HERO ══ */}
        <section className="relative py-24 overflow-hidden grid-bg">
          <div className="absolute inset-0 radial-glow pointer-events-none" />
          <motion.div
            className="absolute bottom-0 left-1/4 w-96 h-64 rounded-full bg-primary/8 blur-[100px] pointer-events-none"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <motion.div {...fadeUp()} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[rgba(255,122,0,0.25)] text-primary text-xs font-semibold uppercase tracking-wider mb-8">
              <Code2 className="h-3.5 w-3.5" /> Projects
            </motion.div>
            <motion.h1 {...fadeUp(0.1)} className="text-5xl sm:text-7xl font-black font-display tracking-tight text-white mb-6">
              Projects Built <span className="orange-gradient-text text-glow-orange">By Titans</span>
            </motion.h1>
            <motion.p {...fadeUp(0.2)} className="max-w-2xl mx-auto text-lg text-gray-400 font-light leading-relaxed mb-10">
              Explore innovative projects created by our community — open source, production-ready, and built with passion.
            </motion.p>
            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/community"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-black bg-gradient-to-r from-primary to-primary-hover rounded-full hover:shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-all duration-300 hover:scale-105 glow-orange"
              >
                Join & Submit Project <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ══ FILTER + GRID ══ */}
        <section className="py-20 bg-black relative">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

            {/* Filter pills */}
            <motion.div {...fadeUp()} className="flex flex-wrap gap-3 justify-center mb-14">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    active === f
                      ? 'bg-primary text-black border-primary shadow-[0_0_18px_rgba(255,122,0,0.35)]'
                      : 'bg-transparent text-gray-400 border-gray-800 hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  <Filter className="h-3.5 w-3.5" /> {f}
                </button>
              ))}
            </motion.div>

            {/* Cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
              >
                {filtered.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="glass rounded-2xl overflow-hidden border border-gray-900 hover:border-primary/40 hover:shadow-[0_0_35px_rgba(255,122,0,0.1)] transition-all duration-400 flex flex-col group"
                    >
                      {/* Visual header */}
                      <div className={`bg-gradient-to-br ${p.gradient} h-44 flex items-center justify-center relative overflow-hidden border-b border-gray-900`}>
                        <div className="absolute inset-0 grid-bg opacity-25" />
                        {p.featured && (
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-primary/20 border border-primary/30 text-primary uppercase tracking-wider z-10">
                            Featured
                          </span>
                        )}
                        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-black/60 border border-gray-800 text-gray-400 uppercase z-10">
                          {p.category}
                        </span>
                        <div className="w-16 h-16 rounded-2xl bg-black/80 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-[0_0_20px_rgba(255,122,0,0.2)]">
                          <Icon className="h-8 w-8" />
                        </div>
                        <div className="absolute bottom-2 left-3 font-mono text-[9px] text-primary/35 uppercase tracking-widest z-10">
                          BUILD: PASSING ✓
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {p.tech.map((t) => (
                            <span key={t} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-primary/10 text-primary border border-primary/20">
                              {t}
                            </span>
                          ))}
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-2 font-display group-hover:text-primary transition-colors duration-300">
                          {p.title}
                        </h4>
                        <p className="text-gray-400 text-sm font-light leading-relaxed flex-grow mb-6">
                          {p.desc}
                        </p>
                        <div className="flex gap-3 pt-4 border-t border-gray-900/60">
                          <a href="#" className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-primary rounded-lg hover:bg-primary-hover transition-colors duration-300">
                            <Github className="h-3.5 w-3.5" /> GitHub
                          </a>
                          <a href="#" className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white border border-gray-800 rounded-lg hover:border-primary/50 transition-colors duration-300">
                            <ExternalLink className="h-3.5 w-3.5 text-primary" /> Live Demo
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

          </div>
        </section>

      </main>
    </PageWrapper>
  );
}
