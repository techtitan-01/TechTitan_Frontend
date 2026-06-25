import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Megaphone, 
  MessageSquare, 
  Users, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  ChevronRight,
  Send,
  Zap,
  Check
} from 'lucide-react';
import { 
  LearningModule, 
  Announcement, 
  CommunityEvent, 
  StudentQuery, 
  Member,
  TabType 
} from '../types';

interface DashboardViewProps {
  modules: LearningModule[];
  announcements: Announcement[];
  events: CommunityEvent[];
  doubts: StudentQuery[];
  members: Member[];
  onNavigate: (tab: TabType) => void;
  onQuickAnnouncement: (title: string, content: string) => void;
}

export default function DashboardView({
  modules,
  announcements,
  events,
  doubts,
  members,
  onNavigate,
  onQuickAnnouncement,
}: DashboardViewProps) {
  const [quickTitle, setQuickTitle] = useState('');
  const [quickContent, setQuickContent] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const totalModules = modules.length;
  const pendingDoubts = doubts.filter(d => d.status === 'Pending').length;
  const upcomingEvents = events.filter(e => e.status === 'Upcoming').length;
  const totalStudents = members.length;

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim() || !quickContent.trim()) return;
    onQuickAnnouncement(quickTitle, quickContent);
    setQuickTitle('');
    setQuickContent('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  // Metrics array
  const stats = [
    {
      title: 'Learning Modules',
      value: totalModules,
      desc: `${modules.filter(m => m.status === 'Published').length} Published, ${modules.filter(m => m.status === 'Draft').length} Drafts`,
      icon: BookOpen,
      iconColor: 'text-primary bg-primary/10 border-primary/20',
      actionLabel: 'Manage Courses',
      actionTab: TabType.MODULES
    },
    {
      title: 'Events & Workshops',
      value: upcomingEvents,
      desc: `${events.filter(e => e.status === 'Upcoming').length} upcoming study sessions`,
      icon: Calendar,
      iconColor: 'text-primary bg-primary/10 border-indigo-500/20',
      actionLabel: 'View Schedule',
      actionTab: TabType.EVENTS
    },
    {
      title: 'Pending Doubts',
      value: pendingDoubts,
      desc: `${doubts.filter(d => d.status === 'In Progress').length} being resolved by mentors`,
      icon: MessageSquare,
      iconColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
      actionLabel: 'Open Doubts Desk',
      actionTab: TabType.DOUBTS
    },
    {
      title: 'Student Directory',
      value: totalStudents,
      desc: `${members.filter(m => m.status === 'Active').length} active records`,
      icon: Users,
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      actionLabel: 'View Directory',
      actionTab: TabType.MEMBERS
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <div className="relative overflow-hidden bg-[#0a0a0a] border border-[#333333] rounded-xl p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Welcome back, Aarav Mehta</h2>
            <p className="text-gray-400 mt-2 max-w-xl text-sm leading-relaxed">
              Manage student learning modules, publish announcements, coordinate community registrations, and review pending doubts.
            </p>
          </div>
          <div className="flex gap-3 text-sm">
            <button 
              onClick={() => onNavigate(TabType.MODULES)}
              className="px-4 py-2 bg-primary hover:bg-[#ff8c00] text-slate-950 font-semibold rounded-lg transition-all flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Module</span>
            </button>
            <button 
              onClick={() => onNavigate(TabType.EVENTS)}
              className="px-4 py-2 bg-[#1a1a1a] hover:bg-slate-755 border border-[#444444] text-slate-205 font-medium rounded-lg transition-all flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className="bg-[#0a0a0a] border border-[#333333]/80 rounded-xl p-6 transition-all hover:border-[#444444] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-400">{stat.title}</span>
                  <div className={`p-2 rounded-lg border ${stat.iconColor} shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white tracking-tight">{stat.value}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 min-h-[1.5rem]">{stat.desc}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-850">
                <button 
                  onClick={() => onNavigate(stat.actionTab)}
                  className="w-full text-left text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center justify-between group-hover:translate-x-1 duration-200"
                >
                  <span>{stat.actionLabel}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Student Doubts Queue and Quick Announcement */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Urgent Doubts Section */}
          <div className="bg-[#0a0a0a] border border-[#333333]/80 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#333333] flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Unresolved Student Doubts ({pendingDoubts})</h3>
                <p className="text-xs text-gray-400 mt-1">Pending queries that require prompt attention from assigned mentors.</p>
              </div>
              <button 
                onClick={() => onNavigate(TabType.DOUBTS)}
                className="text-xs font-semibold text-primary hover:text-teal-305 flex items-center gap-1"
              >
                <span>Go to Doubts Desk</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
            
            <div className="divide-y divide-slate-800/80">
              {doubts.filter(d => d.status === 'Pending').slice(0, 3).length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-sm py-12">
                  <div className="inline-flex p-3 bg-emerald-500/10 text-emerald-400 rounded-full mb-3 border border-emerald-500/20">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="font-semibold text-gray-300">All queries resolved!</p>
                  <p className="text-xs text-gray-500 mt-1">Excellent job from the community mentors.</p>
                </div>
              ) : (
                doubts.filter(d => d.status === 'Pending').slice(0, 3).map((query) => (
                  <div key={query.id} className="p-6 hover:bg-[#111111]/40 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-rose-500/10 text-rose-300 rounded text-[11px] font-mono border border-rose-500/20">
                            {query.category}
                          </span>
                          <span className="text-xs text-gray-500 font-mono">{query.createdDate}</span>
                        </div>
                        <h4 className="font-bold text-gray-100 text-sm sm:text-base">{query.queryTitle}</h4>
                        <p className="text-gray-400 text-xs line-clamp-2">{query.queryDetails}</p>
                        
                        <div className="flex items-center gap-3 pt-2 text-[11px] text-gray-400">
                          <span className="font-medium text-gray-300">Asked by: <span className="font-bold font-sans text-primary/80">{query.studentName}</span></span>
                          <span>•</span>
                          <span>Mentor assigned: <span className="text-indigo-300">{query.assignedMentor}</span></span>
                        </div>
                      </div>
                      <button 
                        onClick={() => onNavigate(TabType.DOUBTS)}
                        className="px-3 py-1.5 bg-[#1a1a1a] hover:bg-slate-750 border border-[#444444] text-gray-200 hover:text-white text-xs font-semibold rounded-lg shrink-0 flex items-center gap-1.5"
                      >
                        Answer
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Stats Distribution Visualization */}
          <div className="bg-[#0a0a0a] border border-[#333333]/80 rounded-xl p-6 shadow-lg space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Community Content Distribution
              </h3>
              <p className="text-xs text-gray-400">Relative distribution across categories.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-black rounded-xl border border-slate-850">
                <div className="text-[11px] font-mono text-gray-400">Published Modules</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">
                  {modules.filter(m => m.status === 'Published').length}
                </div>
                <div className="w-full bg-[#1a1a1a] h-1.5 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-emerald-400 h-full rounded-full"
                    style={{ width: `${totalModules ? (modules.filter(m => m.status === 'Published').length / totalModules) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 bg-black rounded-xl border border-slate-850">
                <div className="text-[11px] font-mono text-gray-400">Draft Modules</div>
                <div className="text-2xl font-bold text-amber-400 mt-1">
                  {modules.filter(m => m.status === 'Draft').length}
                </div>
                <div className="w-full bg-[#1a1a1a] h-1.5 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-amber-400 h-full rounded-full"
                    style={{ width: `${totalModules ? (modules.filter(m => m.status === 'Draft').length / totalModules) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 bg-black rounded-xl border border-slate-850">
                <div className="text-[11px] font-mono text-gray-400">Total Workshop Attendees</div>
                <div className="text-2xl font-bold text-primary mt-1">
                  {events.reduce((acc, ev) => acc + ev.registrationCount, 0)}
                </div>
                <div className="w-full bg-[#1a1a1a] h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-indigo-400 h-full rounded-full w-4/5"></div>
                </div>
              </div>

              <div className="p-4 bg-black rounded-xl border border-slate-850">
                <div className="text-[11px] font-mono text-gray-400">Doubt Resolution Rate</div>
                <div className="text-2xl font-bold text-primary mt-1">
                  {doubts.length ? Math.round((doubts.filter(d => d.status === 'Resolved').length / doubts.length) * 100) : 100}%
                </div>
                <div className="w-full bg-[#1a1a1a] h-1.5 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="bg-teal-400 h-full rounded-full"
                    style={{ width: `${doubts.length ? (doubts.filter(d => d.status === 'Resolved').length / doubts.length) * 100 : 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar panels */}
        <div className="space-y-8">
          
          {/* Quick Notice Publisher */}
          <div className="bg-[#0a0a0a] border border-[#333333] rounded-xl p-6 relative overflow-hidden">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Publish Announcement
            </h3>
            <p className="text-xs text-gray-400 mt-1 mb-4">Post a new notice directly onto the announcement feed.</p>
            
            <form onSubmit={handleQuickSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-medium text-slate-450 mb-1">Headline</label>
                <input 
                  type="text" 
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  placeholder="e.g. AWS Credits available for Hackfest" 
                  className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-primary placeholder-slate-600 transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-450 mb-1">Content</label>
                <textarea 
                  rows={3}
                  value={quickContent}
                  onChange={(e) => setQuickContent(e.target.value)}
                  placeholder="Draft details or links..." 
                  className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-primary placeholder-slate-600 transition-all resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-2 bg-primary hover:bg-[#ff8c00] text-slate-950 font-semibold rounded-lg text-xs transition duration-200 flex items-center justify-center gap-1.5 shadow"
              >
                <Send className="h-3 w-3" />
                <span>Publish Announcement</span>
              </button>
            </form>

            {showSuccessToast && (
              <div className="absolute inset-x-0 bottom-0 py-2.5 bg-primary text-slate-950 text-center text-xs font-semibold animate-slide-up flex items-center justify-center gap-1.5">
                <Check className="h-3.5 w-3.5" />
                Notice published successfully!
              </div>
            )}
          </div>

          {/* Clean Activity Feed */}
          <div className="bg-[#0a0a0a] border border-[#333333] rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Activity Feed
            </h3>
            <div className="space-y-3.5">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-450 shrink-0 mt-1.5"></div>
                <div>
                  <p className="text-xs text-gray-300 font-medium">New Student query posted</p>
                  <p className="text-[10px] text-gray-500">Tanisha Roy raised query #dbt-1 "Vite throwing Error..."</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5"></div>
                <div>
                  <p className="text-xs text-gray-300 font-medium">Course Created: React 19 Essentials</p>
                  <p className="text-[10px] text-gray-500">Published update and marked 8 chapters by Samarth.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5"></div>
                <div>
                  <p className="text-xs text-gray-300 font-medium">Event Live registrations: 185 students</p>
                  <p className="text-[10px] text-gray-500">"Getting Started with Google GenAI" now has 185 seats filled.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-1.5"></div>
                <div>
                  <p className="text-xs text-gray-300 font-medium">Anjali Sharma updated Doubt #dbt-2</p>
                  <p className="text-[10px] text-gray-500">Marked ticket as "In Progress" with DP notes.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
