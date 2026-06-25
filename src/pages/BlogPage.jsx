import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, User, Calendar, ExternalLink } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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
              <BookOpen className="h-3.5 w-3.5" /> Blog
            </motion.div>
            <motion.h1 {...fadeUp(0.1)} className="text-5xl sm:text-7xl font-black font-display tracking-tight text-white mb-6">
              Our <span className="orange-gradient-text text-glow-orange">Thoughts</span>
            </motion.h1>
            <motion.p {...fadeUp(0.2)} className="max-w-2xl mx-auto text-lg text-gray-400 font-light leading-relaxed mb-10">
              Read the latest articles, tutorials, and insights from our community of developers and innovators.
            </motion.p>
          </div>
        </section>

        {/* ══ BLOG GRID ══ */}
        <section className="py-20 bg-black relative">
          <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            {loading ? (
              <div className="text-center text-primary">Loading blogs...</div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
                >
                  {blogs.map((blog, i) => (
                    <motion.div
                      key={blog.id || blog._id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07 }}
                      className="glass rounded-2xl overflow-hidden border border-gray-900 hover:border-primary/40 hover:shadow-[0_0_35px_rgba(255,122,0,0.1)] transition-all duration-400 flex flex-col group"
                    >
                      {/* Visual header */}
                      {blog.imageUrl || blog.mediaUrl ? (
                         <div className="h-48 overflow-hidden relative border-b border-gray-900">
                           <img 
                             src={blog.imageUrl || blog.mediaUrl} 
                             alt={blog.title} 
                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                           />
                         </div>
                      ) : (
                        <div className={`bg-gradient-to-br from-amber-600/20 to-yellow-900/10 h-44 flex items-center justify-center relative overflow-hidden border-b border-gray-900`}>
                          <div className="absolute inset-0 grid-bg opacity-25" />
                          <div className="w-16 h-16 rounded-2xl bg-black/80 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-[0_0_20px_rgba(255,122,0,0.2)]">
                            <BookOpen className="h-8 w-8" />
                          </div>
                        </div>
                      )}

                      {/* Body */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 uppercase mb-4">
                           <div className="flex items-center gap-1.5">
                             <Calendar className="w-3.5 h-3.5" />
                             {new Date(blog.date || blog.createdAt).toLocaleDateString()}
                           </div>
                           <div className="flex items-center gap-1.5 text-primary">
                             <User className="w-3.5 h-3.5" />
                             {blog.author || 'Anonymous'}
                           </div>
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-3 font-display group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {blog.title}
                        </h4>
                        <p className="text-gray-400 text-sm font-light leading-relaxed flex-grow mb-6 line-clamp-3">
                          {blog.content}
                        </p>
                        <div className="pt-4 border-t border-gray-900/60 mt-auto flex justify-end">
                          <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white border border-gray-800 rounded-lg hover:border-primary/50 hover:text-primary transition-colors duration-300">
                            Read More <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {blogs.length === 0 && (
                    <div className="col-span-full text-center py-20 text-gray-500">
                      No blogs found.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}
