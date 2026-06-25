import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-black grid-bg"
    >
      {/* Radial Orange Glows */}
      <motion.div 
        variants={glowVariants}
        animate="animate"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-gradient-to-r from-primary/20 to-primary-hover/5 blur-[80px] sm:blur-[120px] pointer-events-none z-0"
      />
      <motion.div 
        animate={{
          x: [-20, 20, -20],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-10 right-10 w-[200px] h-[200px] rounded-full bg-primary/10 blur-[60px] pointer-events-none z-0"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        {/* Banner badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[rgba(255,122,0,0.25)] text-primary text-xs font-semibold uppercase tracking-wider mb-8 shadow-[0_0_15px_rgba(255,122,0,0.1)]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>The Future is Here</span>
        </motion.div>

        {/* Animated 3D Tech Titan Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1,   y: 0    }}
          transition={{ duration: 0.9, type: 'spring', stiffness: 90, damping: 14 }}
          className="mb-8"
        >
          <AnimatedLogo size={112} />
        </motion.div>

        {/* Title */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight leading-none mb-6 text-white"
          >
            Build. Create.<br className="sm:hidden" /> <span className="orange-gradient-text text-glow-orange">Innovate.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl text-lg sm:text-xl text-gray-400 font-light leading-relaxed mb-10 px-4"
          >
            Welcome to <span className="text-white font-semibold">Tech Titan</span>—the premier ecosystem for elite developers, innovative designers, and tech disruptors to build the future of software, AI, and security.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-6"
          >
            {/* Join Button */}
            <a
              id="hero-join-btn"
              href="/community"
              className="relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black bg-gradient-to-r from-primary to-primary-hover rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,122,0,0.5)] glow-orange group"
            >
              <span className="flex items-center gap-2">
                Join Community <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            {/* Explore Button */}
            <a
              id="hero-explore-btn"
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-black/40 border border-gray-800 rounded-full hover:border-primary/50 hover:bg-black/80 transition-all duration-300 transform hover:scale-105 group"
            >
              <span className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                Explore Projects
              </span>
            </a>
          </motion.div>
        </motion.div>

        {/* Dashboard Frame or Futuristic Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 w-full max-w-4xl glass rounded-2xl border border-[rgba(255,122,0,0.15)] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] p-1 bg-black/60 relative group"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.05)] bg-black/80">
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-green-500/80 inline-block" />
            </div>
            <div className="text-xs text-gray-500 font-mono tracking-widest uppercase">Techtitan_terminal.sh</div>
            <div className="w-12" />
          </div>
          {/* Terminal Screen Body */}
          <div className="bg-black/90 p-6 sm:p-8 font-mono text-left text-sm text-gray-400 space-y-3 min-h-[200px] relative overflow-hidden">
            <div className="text-primary font-bold">~ guest@techtitan: $ <span className="text-white">fetch-metrics --community</span></div>
            <div className="text-green-500">✔ Initializing connection to Tech Titan network...</div>
            <div className="text-gray-500">// Fetching active user statistics and ongoing codebases...</div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 text-center">
              <div className="border border-gray-900 bg-black/40 p-4 rounded-lg hover:border-primary/20 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-black text-white text-glow-orange">1,200+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Global Titans</div>
              </div>
              <div className="border border-gray-900 bg-black/40 p-4 rounded-lg hover:border-primary/20 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-black text-white text-glow-orange">45+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Projects Live</div>
              </div>
              <div className="border border-gray-900 bg-black/40 p-4 rounded-lg hover:border-primary/20 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-black text-white text-glow-orange">12+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Hackathons</div>
              </div>
              <div className="border border-gray-900 bg-black/40 p-4 rounded-lg hover:border-primary/20 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-black text-white text-glow-orange">98%</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Growth Rate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
