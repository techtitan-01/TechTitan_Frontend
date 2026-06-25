import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, CheckCircle } from 'lucide-react';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section id="join" className="py-24 bg-black relative overflow-hidden grid-bg">
      {/* Background orange glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Glow Panel Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 sm:p-16 border border-[rgba(255,122,0,0.25)] text-center relative overflow-hidden glow-orange-lg bg-black/60"
        >
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <Terminal className="h-3.5 w-3.5" />
            <span>Connection Protocol</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight mb-6">
            Ready to become a <span className="orange-gradient-text text-glow-orange">Tech Titan?</span>
          </h2>
          
          {/* Subtext */}
          <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg font-light leading-relaxed mb-10">
            Join 1,200+ global builders today. Secure your spot in the next hackathon, receive weekly source code repositories, and access private mentorship channels.
          </p>

          {/* Action form/button */}
          {!submitted ? (
            <form 
              id="cta-join-form"
              onSubmit={handleSubmit}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 items-stretch justify-center"
            >
              <input
                id="cta-email-input"
                type="email"
                required
                placeholder="Enter your terminal email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-5 py-4 text-sm bg-black/80 text-white rounded-full border border-gray-800 focus:border-primary focus:outline-none transition-all duration-300 font-mono"
              />
              <button
                id="cta-submit-btn"
                type="submit"
                className="px-6 py-4 text-sm font-semibold text-black bg-gradient-to-r from-primary to-primary-hover rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,122,0,0.4)] flex items-center justify-center gap-2 select-none"
              >
                Join Protocol <Send className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-3 px-6 py-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 font-mono text-sm max-w-md mx-auto"
            >
              <CheckCircle className="h-5 w-5 shrink-0" />
              <span>Titans request logged. Check your inbox!</span>
            </motion.div>
          )}

          {/* Graphic Binary Decorators */}
          <div className="absolute top-5 left-5 text-[8px] font-mono text-primary/10 select-none text-left leading-normal hidden sm:block">
            01000010 01010101 01001001 01001100 01000100<br/>
            01000011 01010010 01000101 01000001 01010100<br/>
            01001001 01001110 01001110 01001111 01010110
          </div>
          <div className="absolute bottom-5 right-5 text-[8px] font-mono text-primary/10 select-none text-right leading-normal hidden sm:block">
            01010100 01000101 01000011 01001000 01010100<br/>
            01001001 01010100 01000001 01001110 01010011<br/>
            01010011 01000101 01000011 01010101 01010010
          </div>

        </motion.div>
      </div>
    </section>
  );
}
