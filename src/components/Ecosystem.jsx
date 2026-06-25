import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Globe, 
  Smartphone, 
  GitBranch, 
  Trophy, 
  Cloud, 
  ShieldCheck, 
  Palette,
  ArrowRight
} from 'lucide-react';

export default function Ecosystem() {
  const categories = [
    {
      title: 'AI & Machine Learning',
      description: 'Train models, explore deep learning neural networks, and deploy intelligence into live products.',
      icon: Brain,
      id: 'eco-ai'
    },
    {
      title: 'Web Development',
      description: 'Master frontend frameworks, optimize backends, and engineer full stack SaaS architectures.',
      icon: Globe,
      id: 'eco-web'
    },
    {
      title: 'App Development',
      description: 'Build native and cross-platform mobile experiences with high performance and fluid layouts.',
      icon: Smartphone,
      id: 'eco-app'
    },
    {
      title: 'Open Source',
      description: 'Contribute to global community projects, manage repositories, and write clean, collaborative code.',
      icon: GitBranch,
      id: 'eco-os'
    },
    {
      title: 'Hackathons',
      description: 'Form elite teams, build prototypes in 48 hours, and win prizes at top international events.',
      icon: Trophy,
      id: 'eco-hack'
    },
    {
      title: 'Cloud & DevOps',
      description: 'Configure automated CI/CD pipelines, optimize Docker/K8s, and orchestrate serverless platforms.',
      icon: Cloud,
      id: 'eco-cloud'
    },
    {
      title: 'Cyber Security',
      description: 'Learn ethical hacking, secure APIs, audit smart contracts, and protect user databases.',
      icon: ShieldCheck,
      id: 'eco-sec'
    },
    {
      title: 'UI/UX Design',
      description: 'Prototype modern visual identities, wireframe interfaces, and design premium animations.',
      icon: Palette,
      id: 'eco-design'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section id="community" className="py-24 relative bg-black">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-primary uppercase mb-3 font-mono">Titan Ecosystem</h2>
          <h3 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-6">
            Explore the Tech Titan Community
          </h3>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Our ecosystem spans across all core dimensions of modern technology. Dive into specialized domains, join forces with expert mentors, and level up your skills.
          </p>
        </div>

        {/* Card Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={index}
                id={cat.id}
                variants={cardVariants}
                className="glass glass-hover p-6 rounded-2xl flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Glowing Corner Background Decorator */}
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-primary/5 blur-lg group-hover:bg-primary/10 transition-colors duration-500" />
                
                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,122,0,0.1)] group-hover:shadow-[0_0_20px_rgba(255,122,0,0.25)]">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-semibold text-white mb-3 font-display group-hover:text-primary transition-colors duration-300">
                    {cat.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                {/* Learn More Button */}
                <a
                  href="#join"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-white transition-colors duration-300 group-hover:translate-x-1"
                >
                  Learn More <ArrowRight className="h-3 w-3" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
