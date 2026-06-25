import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Youtube, Instagram, ArrowUp, Heart } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub',    icon: Github,    href: 'https://github.com' },
  { name: 'Twitter',   icon: Twitter,   href: 'https://twitter.com' },
  { name: 'YouTube',   icon: Youtube,   href: 'https://youtube.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
];

const quickLinks = [
  { name: 'Home',      to: '/' },
  { name: 'Community', to: '/community' },
  { name: 'Projects',  to: '/projects' },
  { name: 'Events',    to: '/events' },
  { name: 'Resources', to: '/resources' },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">

          {/* Brand col */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/techtitan-logo.svg"
                alt="Tech Titan"
                className="h-8 w-auto object-contain filter brightness-110"
              />
            </Link>
            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
              Building the future of developer community, open collaborations, and high-fidelity codebases. Accelerate your engineering capabilities with the Titans.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-10 h-10 rounded-xl bg-gray-950 border border-gray-900 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/40 transition-all duration-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Navigation</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Status panel */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">System Status</h4>
            <div className="glass p-5 rounded-2xl border border-gray-900 font-mono text-xs space-y-2 text-gray-400">
              {[
                ['SYSTEM_STATUS', <span className="text-green-500 font-semibold">ONLINE</span>],
                ['PIPELINE_ACTIVE', <span className="text-primary">TRUE</span>],
                ['NETWORK_PING', <span className="text-white">12 MS</span>],
                ['MEMBERS', <span className="text-white">1,200+</span>],
                ['VERSION', <span className="text-gray-500">v2.4.0</span>],
              ].map(([key, val]) => (
                <div key={key} className="flex justify-between">
                  <span>{key}:</span>
                  {val}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-900/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-1.5 order-2 sm:order-1">
            <span>Made by Team Tech Titan</span>
            <Heart className="h-3.5 w-3.5 text-primary fill-primary animate-pulse" />
          </div>
          <div className="order-1 sm:order-2">
            &copy; {new Date().getFullYear()} Tech Titan. All rights reserved.
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="order-3 p-2 bg-gray-950 border border-gray-900 hover:border-primary/40 hover:text-primary rounded-xl text-gray-400 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
