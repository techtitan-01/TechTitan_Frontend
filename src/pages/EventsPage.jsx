import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, Users, Trophy, Laptop, Code,
  ArrowRight, Clock, Zap, Star
} from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

/* ─── countdown hook ─── */
function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days:  Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins:  Math.floor((diff % 3600000) / 60000),
      secs:  Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  });
  return time;
}

/* ─── data ─── */
const upcomingEvents = [
  {
    id: 'titanhack',
    type: 'Hackathon',
    icon: Trophy,
    title: 'TitanHack 2026',
    desc: 'Build innovative solutions and compete with developers from around the world. 48-hour sprint, real prizes, real impact.',
    date: 'July 15–18, 2026',
    targetDate: '2026-07-15T09:00:00',
    location: 'Virtual / Discord',
    attendees: '850+ Registered',
    badge: 'text-primary bg-primary/10 border-primary/20',
    prize: '$5,000 Prize Pool',
    status: 'Registration Open',
  },
  {
    id: 'rust-wasm',
    type: 'Workshop',
    icon: Laptop,
    title: 'Rust & WebAssembly Masterclass',
    desc: 'Hands-on deep dive into Rust + WASM with industry engineers. Build a browser-native game engine from scratch.',
    date: 'June 28, 2026 • 18:00 IST',
    targetDate: '2026-06-28T18:00:00',
    location: 'Online Live Stream',
    attendees: '230+ Enrolled',
    badge: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    prize: 'Certificate + Repo Access',
    status: '15 Seats Left',
  },
  {
    id: 'blr-meetup',
    type: 'Meetup',
    icon: Code,
    title: 'Bengaluru Tech Meetup v2',
    desc: 'Meet creators, exchange knowledge, and find your next collaborator. Talks, demos, and networking dinner.',
    date: 'July 5, 2026 • 16:00 IST',
    targetDate: '2026-07-05T16:00:00',
    location: 'Indiranagar, Bengaluru',
    attendees: '150 RSVPs Max',
    badge: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    prize: 'Free Merch + Networking',
    status: 'RSVP Required',
  },
];

const pastEvents = [
  { title: 'TitanHack 2025',       type: 'Hackathon', date: 'Dec 2025', participants: 620 },
  { title: 'AI Builder Bootcamp',  type: 'Workshop',  date: 'Oct 2025', participants: 180 },
  { title: 'Open Source Sprint',   type: 'Sprint',    date: 'Sep 2025', participants: 94  },
  { title: 'Mumbai Dev Meetup',    type: 'Meetup',    date: 'Aug 2025', participants: 130 },
];

/* ─── countdown display sub-component ─── */
function Countdown({ targetDate }) {
  const { days, hours, mins, secs } = useCountdown(targetDate);
  const units = [['Days', days], ['Hrs', hours], ['Min', mins], ['Sec', secs]];
  return (
    <div className="flex items-center gap-2 mt-4 flex-wrap">
      <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
      <span className="text-xs text-gray-500 font-mono uppercase tracking-wider mr-1">Starts in</span>
      {units.map(([label, val]) => (
        <div key={label} className="flex flex-col items-center min-w-[42px] bg-black/60 border border-gray-900 rounded-lg px-2 py-1.5">
          <span className="text-base font-black text-white font-mono leading-none">
            {String(val).padStart(2, '0')}
          </span>
          <span className="text-[9px] text-gray-600 uppercase tracking-widest">{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── component ─── */
export default function EventsPage() {
  return (
    <PageWrapper>
      <main className="bg-black min-h-screen pt-24">

        {/* ══ HERO ══ */}
        <section className="relative py-24 overflow-hidden grid-bg">
          <div className="absolute inset-0 radial-glow pointer-events-none" />
          <motion.div
            className="absolute top-1/3 left-1/3 w-[480px] h-[480px] rounded-full bg-primary/8 blur-[130px] pointer-events-none"
            animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
            <motion.div {...fadeUp()} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[rgba(255,122,0,0.25)] text-primary text-xs font-semibold uppercase tracking-wider mb-8">
              <Calendar className="h-3.5 w-3.5" /> Events
            </motion.div>
            <motion.h1 {...fadeUp(0.1)} className="text-5xl sm:text-7xl font-black font-display tracking-tight text-white mb-6">
              Events &amp; <span className="orange-gradient-text text-glow-orange">Workshops</span>
            </motion.h1>
            <motion.p {...fadeUp(0.2)} className="max-w-2xl mx-auto text-lg text-gray-400 font-light leading-relaxed">
              Learn, compete, and connect through Tech Titan events. From hackathons to meetups, there is always something to join.
            </motion.p>
          </div>
        </section>

        {/* ══ UPCOMING EVENTS ══ */}
        <section className="py-20 bg-black relative">
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="mb-14">
              <motion.h2 {...fadeUp()} className="text-sm font-semibold tracking-wider text-primary uppercase mb-3 font-mono">What's Coming</motion.h2>
              <motion.h3 {...fadeUp(0.1)} className="text-3xl sm:text-5xl font-bold font-display text-white">Upcoming Events</motion.h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((e, i) => {
                const Icon = e.icon;
                return (
                  <motion.div
                    key={e.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="glass rounded-2xl border border-gray-900 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(255,122,0,0.08)] transition-all duration-300 flex flex-col p-7 group"
                  >
                    {/* badge + status */}
                    <div className="flex items-center justify-between mb-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${e.badge}`}>
                        {e.type}
                      </span>
                      <span className="text-xs font-mono text-gray-500">{e.status}</span>
                    </div>

                    {/* icon + title */}
                    <div className="flex gap-4 items-start mb-5">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h4 className="text-xl font-bold text-white font-display leading-snug group-hover:text-primary transition-colors duration-300">
                        {e.title}
                      </h4>
                    </div>

                    <p className="text-gray-400 text-sm font-light leading-relaxed mb-5">{e.desc}</p>

                    {/* meta */}
                    <div className="space-y-2.5 mb-5">
                      {[
                        [Calendar, e.date],
                        [MapPin,   e.location],
                        [Users,    e.attendees],
                        [Star,     e.prize],
                      ].map(([I, v]) => (
                        <div key={v} className="flex items-center gap-2.5 text-sm text-gray-400">
                          <I className="h-4 w-4 text-primary shrink-0" />
                          <span>{v}</span>
                        </div>
                      ))}
                    </div>

                    {/* live countdown */}
                    <Countdown targetDate={e.targetDate} />

                    {/* register */}
                    <a
                      href="#"
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-black border border-gray-800 rounded-xl hover:border-primary hover:text-black hover:bg-primary transition-all duration-300"
                    >
                      Register Now <ArrowRight className="h-4 w-4" />
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ PAST EVENTS ══ */}
        <section className="py-20 bg-black relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="mb-12">
              <motion.h2 {...fadeUp()} className="text-sm font-semibold tracking-wider text-primary uppercase mb-3 font-mono">History</motion.h2>
              <motion.h3 {...fadeUp(0.1)} className="text-3xl sm:text-4xl font-bold font-display text-white">Past Events</motion.h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {pastEvents.map((e, i) => (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass rounded-2xl p-6 border border-gray-900 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-xs text-gray-500 font-mono uppercase">{e.type}</span>
                  </div>
                  <h4 className="text-base font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">{e.title}</h4>
                  <p className="text-xs text-gray-500 font-mono">{e.date}</p>
                  <div className="mt-3 pt-3 border-t border-gray-900 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs text-gray-400">{e.participants} participants</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="py-20 bg-black grid-bg relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
          </div>
          <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
            <motion.div {...fadeUp()} className="glass rounded-3xl p-10 sm:p-14 border border-[rgba(255,122,0,0.25)] glow-orange bg-black/60">
              <Trophy className="h-10 w-10 text-primary mx-auto mb-5 opacity-80" />
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-4">
                Don't miss <span className="orange-gradient-text">TitanHack 2026</span>
              </h2>
              <p className="text-gray-400 mb-8 font-light">
                Our biggest hackathon yet. Form your team, pick a challenge, and ship something incredible.
              </p>
              <Link
                to="/community"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-black bg-gradient-to-r from-primary to-primary-hover rounded-full hover:shadow-[0_0_30px_rgba(255,122,0,0.4)] transition-all duration-300 hover:scale-105 glow-orange"
              >
                Join Community <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
    </PageWrapper>
  );
}
