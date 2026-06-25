import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  X,
  Users,
  ExternalLink,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { CommunityEvent, EventType } from '../types';

interface EventsViewProps {
  events: CommunityEvent[];
  onAdd: (event: Omit<CommunityEvent, 'id' | 'registrationCount'>) => void;
  onEdit: (event: CommunityEvent) => void;
  onDelete: (id: string) => void;
}

export default function EventsView({ events, onAdd, onEdit, onDelete }: EventsViewProps) {
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Modal Control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CommunityEvent | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [type, setType] = useState<EventType>('Workshop');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [maxSeats, setMaxSeats] = useState(100);
  const [status, setStatus] = useState<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');

  const eventTypes: EventType[] = ['Workshop', 'Hackathon', 'Webinar', 'Study Jam', 'Social Meet'];
  const statuses = ['Upcoming', 'Completed', 'Cancelled'] as const;

  const openAddModal = () => {
    setEditingEvent(null);
    setTitle('');
    setType('Workshop');
    setDate('');
    setTime('');
    setVenue('');
    setDescription('');
    setSpeaker('');
    setMaxSeats(100);
    setStatus('Upcoming');
    setIsModalOpen(true);
  };

  const openEditModal = (evt: CommunityEvent) => {
    setEditingEvent(evt);
    setTitle(evt.title);
    setType(evt.type);
    setDate(evt.date);
    setTime(evt.time);
    setVenue(evt.venue);
    setDescription(evt.description);
    setSpeaker(evt.speaker);
    setMaxSeats(evt.maxSeats);
    setStatus(evt.status);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !time.trim() || !venue.trim() || !speaker.trim() || !description.trim()) {
      alert('Please fill out all mandatory fields (Title, Date, Time, Venue, Speaker, Description)');
      return;
    }

    if (editingEvent) {
      onEdit({
        ...editingEvent,
        title,
        type,
        date,
        time,
        venue,
        description,
        speaker,
        maxSeats: Number(maxSeats),
        status,
      });
    } else {
      onAdd({
        title,
        type,
        date,
        time,
        venue,
        description,
        speaker,
        maxSeats: Number(maxSeats),
        status,
      });
    }
    setIsModalOpen(false);
  };

  const confirmDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the Event: "${name}"?`)) {
      onDelete(id);
    }
  };

  const markStatus = (evt: CommunityEvent, nextStatus: 'Upcoming' | 'Completed' | 'Cancelled') => {
    onEdit({
      ...evt,
      status: nextStatus
    });
  };

  // Filtering
  const filteredEvents = events.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          evt.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          evt.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || evt.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || evt.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Community Events & Workshops</h2>
          <p className="text-sm text-gray-400 font-sans">Manage schedules, online meeting links, offline tech labs hubs, and seat allocations.</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-primary hover:bg-[#ff8c00] text-white font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2 text-sm shadow shadow-teal-500/20 active:scale-98"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Schedule Event</span>
        </button>
      </div>

      {/* Selector Toolbar */}
      <div className="bg-[#0a0a0a] border border-[#333333]/80 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-md">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search workshops, speakers, links..."
            className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary placeholder-slate-600 transition"
          />
        </div>

        <div className="flex gap-3 items-center w-full md:w-auto">
          <div className="flex items-center gap-2 text-gray-400 text-xs grow md:grow-0">
            <Filter className="h-3.5 w-3.5 text-gray-500 shrink-0" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-black border border-[#333333] text-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-primary text-xs grow md:grow-0"
            >
              <option value="All">All Types</option>
              {eventTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
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

      {/* Event list display */}
      {filteredEvents.length === 0 ? (
        <div className="bg-[#0a0a0a] border border-[#333333] rounded-xl p-12 text-center text-gray-500 max-w-lg mx-auto mt-6">
          <Calendar className="h-10 w-10 text-slate-600 mx-auto mb-3" />
          <p className="font-semibold text-gray-300">No Events scheduled</p>
          <p className="text-xs text-gray-500 mt-1">Try expanding search query, or hit "Schedule Event" to create a webinar, study jam, or hackathon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => (
            <div 
              key={evt.id} 
              className="bg-[#0a0a0a] border border-[#333333]/80 hover:border-[#444444]/90 rounded-xl flex flex-col justify-between overflow-hidden shadow-md transition-all group"
            >
              <div className="p-6 space-y-4">
                {/* Meta row badges */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary/80 border border-primary/20">
                    {evt.type}
                  </span>
                  
                  {/* Status Indicator */}
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono border ${
                    evt.status === 'Upcoming' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 animate-pulse' 
                      : evt.status === 'Completed' 
                        ? 'bg-[#1a1a1a] text-gray-400 border-[#444444]' 
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {evt.status}
                  </span>
                </div>

                {/* Event Heading Title */}
                <div>
                  <h3 className="text-lg font-bold text-gray-100 group-hover:text-primary duration-200">{evt.title}</h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2 min-h-[2.25rem]">{evt.description}</p>
                </div>

                {/* Event Schedule Attributes */}
                <div className="space-y-2 pt-3 border-t border-slate-850 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500 shrink-0" />
                    <span className="font-mono">Date: <span className="font-sans text-gray-300">{evt.date}</span></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500 shrink-0" />
                    <span className="font-mono">Time: <span className="font-sans text-gray-300">{evt.time}</span></span>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <span className="font-mono font-medium block">Venue: </span>
                      {evt.venue.includes('http://') || evt.venue.includes('https://') || evt.venue.includes('meet.google') ? (
                        <a 
                          href={evt.venue.match(/https?:\/\/[^\s]+/)?.[0] || '#'} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-primary hover:underline flex items-center gap-1 mt-0.5 text-[11px]"
                        >
                          <span className="truncate">{evt.venue}</span>
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-gray-300 text-xs block truncate">{evt.venue}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <User className="h-4 w-4 text-gray-500 shrink-0" />
                    <span>Host / Lead Speaker: <strong className="text-gray-300 font-sans">{evt.speaker}</strong></span>
                  </div>
                </div>
              </div>

              {/* Attendance metrics and administrative shortcuts */}
              <div className="p-4 bg-black border-t border-slate-850 flex items-center justify-between">
                {/* Stats */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                  <Users className="h-4 w-4 text-gray-500 shrink-0" />
                  <span>
                    RSVPs: <strong className="text-primary font-sans text-sm">{evt.registrationCount || 0}</strong> / {evt.maxSeats}
                  </span>
                </div>

                {/* Options panel */}
                <div className="flex items-center gap-1 text-xs">
                  {evt.status === 'Upcoming' && (
                    <>
                      <button
                        onClick={() => markStatus(evt, 'Completed')}
                        className="p-1 px-1.5 bg-[#1a1a1a] text-emerald-400 hover:text-emerald-300 rounded border border-[#444444] transition"
                        title="Mark Completed"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => markStatus(evt, 'Cancelled')}
                        className="p-1 px-1.5 bg-[#1a1a1a] text-rose-400 hover:text-rose-300 rounded border border-[#444444] transition"
                        title="Cancel Event"
                      >
                        <AlertTriangle className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                  {evt.status !== 'Upcoming' && (
                    <button
                      onClick={() => markStatus(evt, 'Upcoming')}
                      className="text-[10px] px-2 py-0.5 bg-[#1a1a1a] text-gray-400 hover:text-gray-200 border border-[#444444] rounded"
                    >
                      Re-schedule
                    </button>
                  )}
                  <button
                    onClick={() => openEditModal(evt)}
                    className="p-1.5 text-primary hover:text-primary/80 hover:bg-[#1a1a1a] rounded transition"
                    title="Edit event detail"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => confirmDelete(evt.id, evt.title)}
                    className="p-1.5 text-rose-500 hover:text-rose-400 hover:bg-[#1a1a1a] rounded transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EVENT FORM CREATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative bg-[#0a0a0a] border border-slate-850 rounded-2xl w-full max-w-xl text-gray-100 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-fade-in my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {editingEvent ? 'Modify Event Schedule' : 'Schedule New Community Session'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event title */}
              <div>
                <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Session / Event Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Masterclass in DSA recursion variables"
                  className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Event Type selector */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Session Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as EventType)}
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  >
                    {eventTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Speaker */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Guest Speaker / Mentor *</label>
                  <input
                    type="text"
                    required
                    value={speaker}
                    onChange={(e) => setSpeaker(e.target.value)}
                    placeholder="e.g. Anjali Sharma"
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Scheduled Date *</label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. 2026-06-18"
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Scheduled Timings *</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 18:00 - 19:30 IST"
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Venue text/link */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Venue Location OR Meeting Link *</label>
                  <input
                    type="text"
                    required
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. meet.google.com/tech-titan-live or Lab 202"
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Max capacity limits */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Max Seat Capacity Limit</label>
                  <input
                    type="number"
                    value={maxSeats}
                    onChange={(e) => setMaxSeats(Number(e.target.value))}
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Status Indicator */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Event Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'Upcoming' | 'Completed' | 'Cancelled')}
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Short details */}
              <div>
                <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Brief details / Objective overview *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline syllabus milestones or key takeaways that students will gain from scheduling..."
                  className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition font-sans resize-none"
                />
              </div>

              {/* Bot buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-850">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-[#1a1a1a] hover:bg-slate-750 text-gray-300 font-medium rounded-lg text-xs transition active:scale-98"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-teal-600 hover:to-indigo-650 text-white font-semibold rounded-lg text-xs transition shadow-lg"
                >
                  {editingEvent ? 'Update Event schedule' : 'Schedule Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
