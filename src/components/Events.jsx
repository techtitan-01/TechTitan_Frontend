import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowUpRight, Trophy, Code, Laptop } from 'lucide-react';

export default function Events() {
  const events = [
    {
      title: 'TitanHack 2026',
      type: 'Hackathon',
      date: 'July 15 - 18, 2026',
      location: 'Virtual / Discord',
      attendees: '850+ Registered',
      badgeColor: 'text-primary bg-primary/10 border-primary/20',
      icon: Trophy,
      status: 'Registration Open',
      id: 'event-titanhack'
    },
    {
      title: 'Rust & WebAssembly Masterclass',
      type: 'Workshop',
      date: 'June 28, 2026 | 18:00 IST',
      location: 'Online Live Stream',
      attendees: '230+ Enrolled',
      badgeColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      icon: Laptop,
      status: '15 Seats Left',
      id: 'event-rust-wasm'
    },
    {
      title: 'Bengaluru Tech Meetup v2',
      type: 'Meetup',
      date: 'July 05, 2026 | 16:00 IST',
      location: 'Tech Titan Hub, Indiranagar',
      attendees: '150 RSVPs Max',
      badgeColor: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
      icon: Code,
      status: 'RSVP Required',
      id: 'event-blr-meetup'
    }
  ];

  return (
    <section id="events" className="py-24 bg-black relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-primary uppercase mb-3 font-mono">Guild Schedule</h2>
          <h3 className="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white mb-6">
            Upcoming Community Events
          </h3>
          <p className="text-gray-400 text-lg font-light leading-relaxed">
            Collaborate live, test your skills under crunch-time pressure, and network with tech leaders during our highly-curated community meetups and workshops.
          </p>
        </div>

        {/* Events Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {events.map((event, index) => {
            const IconComp = event.icon;
            return (
              <motion.div
                key={index}
                id={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl p-8 border border-gray-900 hover:border-primary/30 flex flex-col justify-between h-full group transition-all duration-300"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${event.badgeColor}`}>
                      {event.type}
                    </span>
                    <span className="text-xs font-mono text-gray-500 font-semibold uppercase">
                      {event.status}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex gap-4 items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white font-display leading-tight group-hover:text-primary transition-colors duration-300">
                      {event.title}
                    </h4>
                  </div>

                  {/* Meta Details */}
                  <div className="space-y-3.5 mb-8">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Calendar className="h-4 w-4 text-primary shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Users className="h-4 w-4 text-primary shrink-0" />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                </div>

                {/* RSVP Button */}
                <a
                  id={`${event.id}-rsvp-btn`}
                  href="#join"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-black border border-gray-800 rounded-xl hover:border-primary hover:text-black hover:bg-primary transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(255,122,0,0.15)]"
                >
                  Register Now <ArrowUpRight className="h-4 w-4" />
                </a>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
