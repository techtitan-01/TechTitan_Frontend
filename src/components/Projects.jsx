import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Cpu, Layers, Shield } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'Aegis Sentinel',
      description: 'An AI-powered cybersecurity daemon that monitors network packets, detects anomalous traffic patterns in real-time, and isolates cloud servers autonomously.',
      tags: ['React', 'Python', 'PyTorch', 'FastAPI'],
      icon: Shield,
      bgGradient: 'from-orange-600/20 to-red-900/10',
      id: 'project-aegis'
    },
    {
      title: 'TitanPay Protocol',
      description: 'A decentralized layer-2 transaction engine designed to facilitate gasless micropayments for SaaS utilities with microsecond finality.',
      tags: ['Solidity', 'Go', 'Web3.js', 'PostgreSQL'],
      icon: Cpu,
      bgGradient: 'from-amber-600/20 to-yellow-900/10',
      id: 'project-titanpay'
    },
    {
      title: 'OmniFlow Dashboard',
      description: 'A developer-centric build coordinator that gathers metrics from multiple repository pipelines, running unit tests concurrently and outputting dynamic telemetry.',
      tags: ['Node.js', 'React', 'TailwindCSS', 'Docker'],
      icon: Layers,
      bgGradient: 'from-red-600/20 to-amber-900/10',
      id: 'project-omniflow'
    },
    {
      title: 'Nexus Indexer',
      description: 'A high-performance headless vector storage database optimized for LLM semantic search, featuring instant schema hot-reloading.',
      tags: ['Golang', 'Rust', 'GraphQL', 'gRPC'],
      icon: Code,
      bgGradient: 'from-orange-700/25 to-zinc-900/10',
      id: 'project-nexus'
    }
  ];

  return (
    <section id="projects" className="py-24 bg-black relative">
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold tracking-wider text-primary uppercase mb-3 font-mono">Innovation Gallery</h2>
            <h3 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-6">
              Titan Member Showcases
            </h3>
            <p className="text-gray-400 text-lg font-light">
              Explore some of the high-caliber production products built by developers within the Tech Titan community. Open source, modular, and performant.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <a 
              id="view-all-projects-btn"
              href="#join" 
              className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-primary border-b border-gray-800 hover:border-primary pb-1 transition-all duration-300"
            >
              Submit Your Project <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={index}
                id={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass rounded-2xl overflow-hidden border border-gray-900 hover:border-primary/40 hover:shadow-[0_0_35px_rgba(255,122,0,0.1)] transition-all duration-500 flex flex-col h-full group"
              >
                {/* Tech Graphic Showcase Header (Replaces boring placeholder images) */}
                <div className={`h-48 bg-gradient-to-br ${project.bgGradient} relative flex items-center justify-center overflow-hidden border-b border-gray-900`}>
                  {/* Grid overlay */}
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  {/* Glowing decorative rings */}
                  <div className="absolute w-64 h-64 rounded-full border border-primary/5 scale-75 group-hover:scale-100 transition-transform duration-700 pointer-events-none" />
                  <div className="absolute w-48 h-48 rounded-full border border-primary/10 scale-90 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

                  {/* Icon Representation */}
                  <div className="relative z-10 w-20 h-20 rounded-2xl bg-black/80 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,122,0,0.2)]">
                    <IconComponent className="h-10 w-10" />
                  </div>
                  
                  {/* Decorative binary code tags */}
                  <div className="absolute bottom-3 left-4 font-mono text-[9px] text-primary/40 uppercase tracking-widest">
                    SYSTEM_RUNNING: // OK
                  </div>
                  <div className="absolute top-3 right-4 font-mono text-[9px] text-gray-600 uppercase tracking-widest">
                    BUILD_ID: #00{index+4}F9
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-xs font-medium font-mono bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h4 className="text-2xl font-semibold text-white mb-3 font-display group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h4>

                    {/* Description */}
                    <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer Buttons */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-900/60">
                    <a
                      id={`${project.id}-view-btn`}
                      href="#join"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-primary rounded-lg hover:bg-primary-hover transition-colors duration-300"
                    >
                      View Code <Github className="h-3.5 w-3.5" />
                    </a>
                    <a
                      id={`${project.id}-demo-btn`}
                      href="#join"
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-transparent border border-gray-800 rounded-lg hover:border-primary/50 transition-colors duration-300"
                    >
                      Live Demo <ExternalLink className="h-3.5 w-3.5 text-primary" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
