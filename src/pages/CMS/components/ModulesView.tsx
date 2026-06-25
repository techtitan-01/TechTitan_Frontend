import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  BookOpen, 
  Tags, 
  User, 
  Clock, 
  Check, 
  X,
  FileText,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { LearningModule, CourseCategory, CourseLevel, PublishStatus } from '../types';

interface ModulesViewProps {
  modules: LearningModule[];
  onAdd: (module: Omit<LearningModule, 'id' | 'enrolledStudentsCount' | 'lastUpdated'>) => void;
  onEdit: (module: LearningModule) => void;
  onDelete: (id: string) => void;
}

export default function ModulesView({ modules, onAdd, onEdit, onDelete }: ModulesViewProps) {
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<LearningModule | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CourseCategory>('Web Development');
  const [level, setLevel] = useState<CourseLevel>('Beginner');
  const [status, setStatus] = useState<PublishStatus>('Draft');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [duration, setDuration] = useState('');
  const [resources, setResources] = useState('');

  // Reader Modal State (to inspect complete syllabus)
  const [readingModule, setReadingModule] = useState<LearningModule | null>(null);

  // Categories list
  const categories: CourseCategory[] = [
    'Web Development',
    'Data Structures & Algorithms',
    'AI & Machine Learning',
    'UI/UX Design',
    'Mobile Dev'
  ];

  const levels: CourseLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
  const statuses: PublishStatus[] = ['Published', 'Draft', 'Archived'];

  // Handle Form open
  const openAddModal = () => {
    setEditingModule(null);
    setTitle('');
    setCategory('Web Development');
    setLevel('Beginner');
    setStatus('Draft');
    setDescription('');
    setContent('');
    setAuthor('');
    setDuration('');
    setResources('');
    setIsModalOpen(true);
  };

  const openEditModal = (mod: LearningModule) => {
    setEditingModule(mod);
    setTitle(mod.title);
    setCategory(mod.category);
    setLevel(mod.level);
    setStatus(mod.status);
    setDescription(mod.description);
    setContent(mod.content);
    setAuthor(mod.author);
    setDuration(mod.duration);
    setResources(mod.resources);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !author.trim() || !duration.trim()) {
      alert('Please fill out all mandatory fields (Title, Author, Duration, Description)');
      return;
    }

    if (editingModule) {
      onEdit({
        ...editingModule,
        title,
        category,
        level,
        status,
        description,
        content,
        author,
        duration,
        resources,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    } else {
      onAdd({
        title,
        category,
        level,
        status,
        description,
        content,
        author,
        duration,
        resources
      });
    }
    setIsModalOpen(false);
  };

  const confirmDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the "${name}" learning module? This action cannot be undone.`)) {
      onDelete(id);
    }
  };

  // Filtration logic
  const filteredModules = modules.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || m.level === selectedLevel;
    const matchesStatus = selectedStatus === 'All' || m.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Manage Learning Modules</h2>
          <p className="text-sm text-gray-400">Curate structured tutorials, tracks, and academic resources for student members.</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-primary hover:bg-[#ff8c00] text-white font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2 text-sm shadow shadow-teal-500/20 active:scale-98"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>New Module</span>
        </button>
      </div>

      {/* Filtering Toolbar */}
      <div className="bg-[#0a0a0a] border border-[#333333]/85 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-md">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search module title, author..."
            className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary placeholder-slate-600 transition"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
          <div className="flex items-center gap-2 text-gray-400 text-xs grow md:grow-0">
            <Filter className="h-3.5 w-3.5 text-gray-500 shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-black border border-[#333333] text-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-primary text-xs grow md:grow-0"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-black border border-[#333333] text-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-primary text-xs grow md:grow-0"
          >
            <option value="All">All Grades (Levels)</option>
            {levels.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

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

      {/* Grid of Learning Modules */}
      {filteredModules.length === 0 ? (
        <div className="bg-[#0a0a0a] border border-[#333333] rounded-xl p-12 text-center text-gray-500 max-w-lg mx-auto mt-6">
          <BookOpen className="h-10 w-10 text-slate-600 mx-auto mb-3" />
          <p className="font-semibold text-gray-300">No Learning Modules found</p>
          <p className="text-xs text-gray-500 mt-1">Try adjusting your search keywords, category filters, or add a fresh course module.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredModules.map((mod) => (
            <div 
              key={mod.id} 
              className="bg-[#0a0a0a] border border-[#333333] hover:border-[#444444] rounded-xl flex flex-col justify-between overflow-hidden shadow-lg transition-all group"
            >
              <div className="p-6 space-y-4">
                {/* Badges & Status line */}
                <div className="flex items-center justify-between">
                  {/* Category */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-indigo-300 border border-indigo-500/25">
                    <Tags className="h-3 w-3 shrink-0" />
                    {mod.category}
                  </span>

                  {/* Status Badge */}
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold font-mono border ${
                    mod.status === 'Published' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : mod.status === 'Draft' 
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                        : 'bg-[#1a1a1a] text-gray-400 border-[#444444]'
                  }`}>
                    {mod.status}
                  </span>
                </div>

                {/* Course Headings */}
                <div>
                  <h3 className="text-lg font-bold text-gray-100 group-hover:text-primary transition-colors line-clamp-1">{mod.title}</h3>
                  <p className="text-gray-400 text-xs mt-2 line-clamp-2 min-h-[2.25rem]">{mod.description}</p>
                </div>

                {/* Academic Metadata info tags */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-gray-500 font-mono border-t border-slate-850">
                  <div className="flex items-center gap-1.5 truncate">
                    <Clock className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                    <span>Duration: <strong className="text-gray-300 font-sans">{mod.duration}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <BookOpen className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                    <span>Level: <span className={`font-semibold font-sans px-1.5 rounded-sm ${
                      mod.level === 'Beginner' ? 'text-emerald-300 bg-emerald-500/5' :
                      mod.level === 'Intermediate' ? 'text-primary/80 bg-primary/5' : 'text-purple-300 bg-purple-500/5'
                    }`}>{mod.level}</span></span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2 truncate">
                    <User className="h-3.5 w-3.5 text-gray-500 shrink-0" />
                    <span>Author: <strong className="text-gray-300 font-sans">{mod.author}</strong></span>
                  </div>
                </div>
              </div>

              {/* Bottom Controls panel */}
              <div className="p-4 bg-black/60 border-t border-slate-850 flex items-center justify-between text-xs">
                {/* Count Enrolled mock */}
                <div className="text-gray-500 font-mono">
                  Enrolled Titans: <span className="text-primary font-semibold">{mod.enrolledStudentsCount || 0}</span>
                </div>

                {/* Actions group */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setReadingModule(mod)}
                    className="p-1.5 text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1a] rounded transition"
                    title="Preview curriculum content"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openEditModal(mod)}
                    className="p-1.5 text-primary hover:text-primary/80 hover:bg-[#1a1a1a] rounded transition"
                    title="Edit Module details"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => confirmDelete(mod.id, mod.title)}
                    className="p-1.5 text-rose-500 hover:text-rose-400 hover:bg-[#1a1a1a] rounded transition"
                    title="Delete Module"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CRUD/EDITOR MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-30 z-max flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative bg-[#0a0a0a] border border-slate-850 rounded-2xl w-full max-w-2xl text-gray-100 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-fade-in my-8">
            {/* Modal Heading */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {editingModule ? 'Edit Course Learning Module' : 'Create New Learning Module'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Mastering Redux Toolkit Query"
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CourseCategory)}
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Level */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Target Difficulty</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as CourseLevel)}
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  >
                    {levels.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                {/* Author Name */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Curator/Author Name *</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Rayan Sen (Systems Expert)"
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Estimated Duration *</label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 4 Weeks or 15 Hours"
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as PublishStatus)}
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Resources Comma-separated */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Helper Links / Reference Docs</label>
                  <input
                    type="text"
                    value={resources}
                    onChange={(e) => setResources(e.target.value)}
                    placeholder="e.g., https://react.dev, https://ts.org"
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  />
                </div>

                {/* Short Brief description */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Short Brief Summary (Grid Text) *</label>
                  <textarea
                    rows={2}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Keep it descriptive but short, within 2 sentences."
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition resize-none"
                  />
                </div>

                {/* Expanded Detailed curriculum syllabus in markdown */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide">Detailed Syllabus curriculum (Supports Plaintext)</label>
                    <span className="text-[10px] text-gray-500 font-mono">Simple markdown notes</span>
                  </div>
                  <textarea
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="### Chapter 1: Introduction&#10;In this first segment we will analyze..."
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition font-mono"
                  />
                </div>
              </div>

              {/* Form Buttons */}
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
                  className="px-5 py-2.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-teal-600 hover:to-indigo-705 text-white font-semibold rounded-lg text-xs transition shadow-lg active:scale-98"
                >
                  {editingModule ? 'Update Module' : 'Create Module'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODULE DETAIL READER VIEW MODAL */}
      {readingModule && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative bg-[#0a0a0a] border border-slate-850 rounded-2xl w-full max-w-2xl text-gray-100 shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto my-8 animate-fade-in">
            {/* Close Button */}
            <button 
              onClick={() => setReadingModule(null)}
              className="absolute right-5 top-5 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Layout Detail */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 bg-primary/10 text-indigo-300 rounded text-xs font-mono border border-indigo-500/20">{readingModule.category}</span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 rounded text-xs font-mono border border-emerald-500/20">{readingModule.level}</span>
                  <span className="px-2 py-0.5 bg-[#111111] text-gray-400 rounded text-xs font-mono border border-[#444444]">{readingModule.status}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white pr-6">{readingModule.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed italic border-l-2 border-primary pl-3">
                  "{readingModule.description}"
                </p>
              </div>

              {/* Course details box */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-black rounded-xl border border-slate-850 text-xs text-gray-400">
                <div>
                  <span className="text-gray-500 block mb-0.5 font-mono uppercase tracking-wider">Curated By</span>
                  <strong className="text-gray-200 text-sm font-sans">{readingModule.author}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5 font-mono uppercase tracking-wider">Duration</span>
                  <strong className="text-gray-200 text-sm font-sans">{readingModule.duration}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5 font-mono uppercase tracking-wider">Last Modified</span>
                  <strong className="text-gray-200 text-sm font-sans">{readingModule.lastUpdated}</strong>
                </div>
              </div>

              {/* Content body description */}
              <div className="space-y-3 bg-black/40 p-5 rounded-xl border border-shadow border-slate-850">
                <h4 className="text-xs font-bold text-primary font-mono uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-850 pb-2">
                  <FileText className="h-4 w-4" />
                  Syllabus Study Material
                </h4>
                <div className="text-sm text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">
                  {readingModule.content || 'No syllabus text has been added yet. Edit the module to add syllabus details here.'}
                </div>
              </div>

              {/* Resources references */}
              {readingModule.resources && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Study Links & Reference PDFs:</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {readingModule.resources.split(',').map((link, idx) => {
                      const trimmed = link.trim();
                      const isUrl = trimmed.startsWith('http://') || trimmed.startsWith('https://');
                      return (
                        <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111111]/75 border border-[#333333] rounded-lg text-xs leading-none">
                          {isUrl ? (
                            <a 
                              href={trimmed} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-primary hover:text-primary/80 hover:underline inline-flex items-center gap-1"
                            >
                              <span>{trimmed.substring(0, 30)}{trimmed.length > 30 ? '...' : ''}</span>
                              <ExternalLink className="h-3 w-3 shrink-0" />
                            </a>
                          ) : (
                            <span className="text-gray-300">{trimmed}</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Read/Edit controls */}
            <div className="mt-8 pt-4 border-t border-slate-850 flex justify-end">
              <button
                onClick={() => setReadingModule(null)}
                className="px-5 py-2 bg-gradient-to-r from-primary to-primary hover:from-teal-600 hover:to-indigo-600 text-white rounded-lg text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
