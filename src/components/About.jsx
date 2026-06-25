import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Award, Compass, MessageSquare, Terminal } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: 'Peer-to-Peer Growth',
      description: 'Exchange knowledge directly with industry builders. Break out of solo learning loops and collaborate on production-ready systems.',
      icon: MessageSquare
    },
    {
      title: 'Practical Innovation',
      description: 'We prioritize shipping clean code over theory. Every event and project is geared towards compiling, deploying, and scaling real ideas.',
      icon: Award
    },
    {
      title: 'Absolute Inclusion',
      description: 'Whether you write kernel extensions in Rust, optimize vector indexes, or craft glassmorphic vector visuals, you have a place at Tech Titan.',
      icon: Compass
    }
  ];

  return (
    <section id="resources" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left storytelling column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-sm font-semibold tracking-wider text-primary uppercase font-mono">Our Narrative</h2>
            <h3 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white leading-tight">
              Where developers, designers, and innovators grow together.
            </h3>
            <div className="w-20 h-[3px] bg-gradient-to-r from-primary to-primary-hover shadow-[0_0_8px_#ff7a00]" />
            
            <p className="text-gray-400 text-base font-light leading-relaxed">
              Founded in 2024, Tech Titan was established as an antidote to generic tutorial hell. We realized that the most explosive developer growth happens in active networks where ideas collide.
            </p>
            <p className="text-gray-400 text-base font-light leading-relaxed">
              We provide the framework, hosting credits, open repos, and network pipelines. You bring the curiosity, grit, and code. Together, we build products that scale.
            </p>
            
            <div className="pt-4">
              <a
                id="about-explore-btn"
                href="#community"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-800 text-sm font-semibold text-white hover:border-primary/50 hover:bg-white/5 transition-all duration-300"
              >
                Explore Core Values
              </a>
            </div>
          </div>

          {/* Right values column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {values.map((val, index) => {
              const IconComp = val.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="glass p-6 rounded-2xl border border-gray-900 hover:border-primary/20 hover:bg-black/50 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start"
                >
                  {/* Icon wrap */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <IconComp className="h-6 w-6" />
                  </div>
                  
                  {/* Text details */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-white font-display">
                      {val.title}
                    </h4>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
