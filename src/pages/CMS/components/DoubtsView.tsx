import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  User, 
  Mail, 
  ChevronDown, 
  X,
  Send,
  AlertCircle,
  TrendingDown,
  Check
} from 'lucide-react';
import { StudentQuery, DoubtCategory, DoubtStatus } from '../types';

interface DoubtsViewProps {
  doubts: StudentQuery[];
  mentors: string[]; // List of available mentors to assign to
  onUpdateStatus: (id: string, status: DoubtStatus, resolvedNotes?: string, assignedMentor?: string) => void;
}

export default function DoubtsView({ doubts, mentors, onUpdateStatus }: DoubtsViewProps) {
  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Interactive Ticket Response Modal
  const [answeringTicket, setAnsweringTicket] = useState<StudentQuery | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('');
  const [ticketStatus, setTicketStatus] = useState<DoubtStatus>('In Progress');

  const categories: DoubtCategory[] = ['Coding Doubt', 'Career Guidance', 'Project Support', 'Inquiry'];
  const statuses: DoubtStatus[] = ['Pending', 'In Progress', 'Resolved'];

  const handleOpenAnswer = (query: StudentQuery) => {
    setAnsweringTicket(query);
    setResolutionNotes(query.resolutionNotes || '');
    setSelectedMentor(query.assignedMentor || mentors[0] || 'Unassigned');
    setTicketStatus(query.status);
  };

  const handleSaveResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answeringTicket) return;

    onUpdateStatus(
      answeringTicket.id, 
      ticketStatus, 
      ticketStatus === 'Resolved' ? (resolutionNotes.trim() === '' ? 'Doubt resolved satisfactorily by mentor.' : resolutionNotes) : resolutionNotes,
      selectedMentor
    );
    setAnsweringTicket(null);
  };

  const filteredDoubts = doubts.filter(d => {
    const matchesSearch = d.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.queryTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.queryDetails.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.assignedMentor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || d.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Headlines */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Student Doubts Desk</h2>
        <p className="text-sm text-gray-400 font-sans">Manage, triage, and solve academic questions raised by Tech Titan community students.</p>
      </div>

      {/* Filter toolbar */}
      <div className="bg-[#0a0a0a] border border-[#333333]/80 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-md">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doubt topics, students or mentors..."
            className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary placeholder-slate-600 transition"
          />
        </div>

        <div className="flex gap-3 items-center w-full md:w-auto">
          <div className="flex items-center gap-2 text-gray-400 text-xs grow md:grow-0">
            <Filter className="h-3.5 w-3.5 text-gray-500 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-black border border-[#333333] text-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-primary text-xs grow md:grow-0"
            >
              <option value="All">All Topics</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-black border border-[#333333] text-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-primary text-xs grow md:grow-0"
          >
            <option value="All">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main doubts feed listing */}
      {filteredDoubts.length === 0 ? (
        <div className="bg-[#0a0a0a] border border-[#333333] rounded-xl p-12 text-center text-gray-500 max-w-lg mx-auto mt-6">
          <MessageSquare className="h-10 w-10 text-slate-600 mx-auto mb-3" />
          <p className="font-semibold text-gray-300">All queries matching criteria sorted!</p>
          <p className="text-xs text-gray-500 mt-1">Try resetting filters to view historically archived student resolutions.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDoubts.map((item) => (
            <div 
              key={item.id} 
              className={`bg-[#0a0a0a] border rounded-xl p-5 shadow-lg flex flex-col justify-between transition-all ${
                item.status === 'Resolved' 
                  ? 'border-[#333333]/60 opacity-80' 
                  : item.status === 'In Progress' 
                    ? 'border-indigo-505/30 bg-[#0a0a0a]/90' 
                    : 'border-rose-500/20 shadow-rose-505/5'
              }`}
            >
              <div className="space-y-3">
                {/* Meta row query header */}
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#1a1a1a]/80 border border-[#444444] text-gray-300 text-xs font-mono rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{item.createdDate}</span>
                  </div>

                  {/* Status label */}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wide border flex items-center gap-1 ${
                    item.status === 'Resolved' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : item.status === 'In Progress' 
                        ? 'bg-primary/10 text-primary border-indigo-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/15 animate-pulse'
                  }`}>
                    {item.status === 'Pending' && <Clock className="h-3 w-3" />}
                    {item.status === 'In Progress' && <AlertCircle className="h-3 w-3" />}
                    {item.status === 'Resolved' && <CheckCircle2 className="h-3 w-3" />}
                    {item.status}
                  </span>
                </div>

                {/* Question title & details */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-gray-100 tracking-tight">{item.queryTitle}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans bg-black/20 p-3 rounded-lg border border-slate-850">
                    {item.queryDetails}
                  </p>
                </div>

                {/* Resolution block if resolved */}
                {item.status === 'Resolved' && item.resolutionNotes && (
                  <div className="bg-emerald-500/5 text-emerald-300/90 border border-emerald-500/10 rounded-lg p-3.5 text-xs font-sans mt-3">
                    <strong className="text-emerald-400 block mb-1 font-mono uppercase tracking-wide text-[10px]">
                      Mentor Resolution Notes:
                    </strong>
                    {item.resolutionNotes}
                  </div>
                )}
              </div>

              {/* Bottom footer metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-850 text-xs text-gray-500">
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                  <div className="flex items-center gap-1 text-[11px]">
                    <User className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                    <span>Submitted by: <strong className="text-primary font-sans font-medium">{item.studentName}</strong> ({item.studentEmail})</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="text-gray-400 font-medium">Assigned Mentor:</span>
                    <span className="text-indigo-300 text-xs p-0.5 px-2 bg-primary/5 border border-indigo-500/10 rounded">
                      {item.assignedMentor}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAnswer(item)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    item.status === 'Resolved'
                      ? 'bg-[#111111] hover:bg-[#1a1a1a] text-gray-300 border-[#444444]'
                      : 'bg-primary hover:bg-[#ff8c00] text-white border-primary/20 shadow'
                  }`}
                >
                  <span>{item.status === 'Resolved' ? 'View/Update Ticket' : 'Solve Doubt'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RESOLUTION RESPONSE MODAL */}
      {answeringTicket && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative bg-[#0a0a0a] border border-slate-850 rounded-2xl w-full max-w-lg text-gray-100 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-fade-in my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary animate-pulse" />
                Manage Query Response
              </h3>
              <button 
                onClick={() => setAnsweringTicket(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#111111]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Ticket Info Section */}
            <div className="space-y-2.5 p-4 bg-black rounded-xl border border-slate-850 text-xs mb-5">
              <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                <span className="text-gray-400">Raised By: <strong className="text-primary font-sans">{answeringTicket.studentName}</strong></span>
                <span className="font-mono text-gray-500">{answeringTicket.studentEmail}</span>
              </div>
              <p className="font-bold text-gray-200 font-sans">{answeringTicket.queryTitle}</p>
              <p className="text-gray-400 leading-normal line-clamp-4 bg-[#0a0a0a]/50 p-2 border border-slate-850 rounded whitespace-pre-wrap font-mono">
                {answeringTicket.queryDetails}
              </p>
            </div>

            <form onSubmit={handleSaveResolution} className="space-y-4">
              {/* Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Status selector */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Ticket Status</label>
                  <select
                    value={ticketStatus}
                    onChange={(e) => setTicketStatus(e.target.value as DoubtStatus)}
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary transition"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Mentor Assignment */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Assign Core Mentor</label>
                  <select
                    value={selectedMentor}
                    onChange={(e) => setSelectedMentor(e.target.value)}
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary transition"
                  >
                    {mentors.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Resolution Notes Input */}
              {ticketStatus === 'Resolved' && (
                <div className="animate-fade-in">
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">
                    Official Resolution Notes *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    placeholder="Provide a detailed roadmap, explanation, or actions taken to resolve the student doubt..."
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition font-sans leading-relaxed text-gray-300"
                  />
                  <p className="text-[10px] text-gray-500 mt-1 font-mono">This text is displayed on the student doubt card as an official reference key.</p>
                </div>
              )}

              {/* Bot controls */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-850">
                <button
                  type="button"
                  onClick={() => setAnsweringTicket(null)}
                  className="px-4 py-2.5 bg-[#1a1a1a] hover:bg-slate-750 text-gray-300 font-medium rounded-lg text-xs transition active:scale-98"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-teal-600 hover:to-indigo-650 text-white font-semibold rounded-lg text-xs transition shadow-lg flex items-center justify-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Update & Triage Ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
