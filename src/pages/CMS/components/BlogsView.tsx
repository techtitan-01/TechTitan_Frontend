import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Edit2, Trash2, Megaphone, User, Calendar, 
  FileText, Bookmark, CheckCircle2, Smartphone, Sparkles, Copy, Send, 
  Bold, Heading, Code, AlertTriangle, Video, History, Image as ImageIcon
} from 'lucide-react';
import { Announcement, BlogCategory, PublishStatus } from '../types';

interface BlogsViewProps {
  announcements: Announcement[];
  onAdd: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  onEdit: (announcement: Announcement) => void;
  onDelete: (id: string) => void;
  userRole: 'admin' | 'viewer';
}

export default function BlogsView({ announcements, onAdd, onEdit, onDelete, userRole }: BlogsViewProps) {
  const [viewMode, setViewMode] = useState<'feed' | 'studio'>('feed');
  const [studioTab, setStudioTab] = useState<'editor' | 'history'>('editor');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [viewingAnnouncement, setViewingAnnouncement] = useState<Announcement | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<BlogCategory>('Opportunities');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState<PublishStatus>('Published');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'video' | 'image' | 'none'>('none');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories: BlogCategory[] = ['Opportunities', 'Newsletter', 'Technical', 'Community Story', 'Alert'];
  const statuses: PublishStatus[] = ['Published', 'Draft', 'Archived'];

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openAddModal = () => {
    setEditingAnnouncement(null);
    setTitle('');
    setCategory('Opportunities');
    setContent('');
    setAuthor('');
    setStatus('Published');
    setMediaUrl('');
    setMediaType('none');
    setStudioTab('editor');
    setIsModalOpen(true);
  };

  const openEditModal = (ann: Announcement) => {
    setEditingAnnouncement(ann);
    setTitle(ann.title);
    setCategory(ann.category);
    setContent(ann.content);
    setAuthor(ann.author);
    setStatus(ann.status);
    setMediaUrl(ann.mediaUrl || ann.imageUrl || '');
    setMediaType(ann.mediaType || (ann.imageUrl ? 'image' : 'none'));
    setStudioTab('editor');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !author.trim()) {
      alert('Please fill out all mandatory fields (Title, Author, Content)');
      return;
    }

    const payload = {
      title,
      category,
      content,
      author,
      status,
      mediaUrl: mediaUrl.trim() || undefined,
      imageUrl: mediaType === 'image' ? mediaUrl.trim() : undefined,
      mediaType
    };

    if (editingAnnouncement) {
      onEdit({ ...editingAnnouncement, ...payload });
      triggerToast('Blog Updated & History Saved');
    } else {
      onAdd(payload);
      triggerToast('New Blog Published');
    }
    setIsModalOpen(false);
  };

  const confirmDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the Blog: "${name}"?`)) {
      onDelete(id);
    }
  };

  const filteredAnnouncements = announcements.filter(ann => {
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = (ann.title || '').toLowerCase().includes(searchLower);
    const contentMatch = (ann.content || '').toLowerCase().includes(searchLower);
    const authorMatch = (ann.author || '').toLowerCase().includes(searchLower);
    const matchesSearch = titleMatch || contentMatch || authorMatch;
    const matchesCategory = selectedCategory === 'All' || ann.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || ann.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryColor = (cat: BlogCategory) => {
    switch (cat) {
      case 'Opportunities': return 'text-primary bg-primary/10 border-primary/25';
      case 'Technical': return 'text-primary bg-primary/10 border-indigo-500/25';
      case 'Newsletter': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25';
      case 'Community Story': return 'text-purple-400 bg-purple-500/10 border-purple-500/25';
      case 'Alert': return 'text-rose-400 bg-rose-500/10 border-rose-500/25';
      default: return 'text-gray-400 bg-slate-500/12 border-slate-500/25';
    }
  };

  // Helper to extract Youtube Embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  // Restore history function
  const handleRestoreHistory = async (historyId: string) => {
    if (!editingAnnouncement) return;
    try {
      const res = await fetch(`/api/blogs/${editingAnnouncement.id}/restore/${historyId}`, { method: 'POST' });
      const restoredData = await res.json();
      onEdit(restoredData);
      setEditingAnnouncement(restoredData);
      setTitle(restoredData.title);
      setContent(restoredData.content);
      setMediaUrl(restoredData.mediaUrl || '');
      triggerToast('Restored previous version successfully!');
      setStudioTab('editor');
    } catch(err) {
      alert("Failed to restore history.");
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-primary text-slate-950 font-semibold px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 animate-slide-up text-xs border border-teal-400/30">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#333333]/80">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Blog Department</h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage articles, video blogs, and announcements with full revision history tracking.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-[#0a0a0a] border border-[#333333] rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search blogs, videos, authors..."
              className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary placeholder-slate-600 transition"
            />
          </div>

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

            {userRole === 'admin' && (
              <button
                onClick={openAddModal}
                className="px-3.5 py-1.5 bg-primary hover:bg-[#ff8c00] text-slate-950 font-semibold rounded-lg transition text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Create New Blog</span>
              </button>
            )}
          </div>
        </div>

        {filteredAnnouncements.length === 0 ? (
          <div className="bg-[#0a0a0a] border border-[#333333] rounded-xl p-12 text-center text-gray-500 max-w-lg mx-auto">
            <FileText className="h-10 w-10 text-slate-600 mx-auto mb-3 animate-pulse" />
            <p className="font-semibold text-gray-300">No Blogs Available</p>
            <p className="text-xs text-gray-500 mt-1">Click 'Create New Blog' to start publishing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnnouncements.map((ann) => (
              <div 
                key={ann.id} 
                className="bg-[#0a0a0a] border border-[#333333] rounded-xl overflow-hidden hover:border-[#444444] transition flex flex-col"
              >
                {ann.mediaType === 'video' && ann.mediaUrl ? (
                  <div className="w-full h-40 bg-black relative">
                    <iframe 
                      className="w-full h-full"
                      src={getYouTubeEmbedUrl(ann.mediaUrl) || ''} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : ann.mediaUrl || ann.imageUrl ? (
                  <div className="w-full h-40 bg-black relative border-b border-[#333333]">
                    <img 
                      src={ann.mediaUrl || ann.imageUrl} 
                      alt={ann.title}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                    />
                  </div>
                ) : (
                  <div className="w-full h-10 bg-[#111] border-b border-[#333333]"></div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${getCategoryColor(ann.category || 'Uncategorized' as any)}`}>
                        {ann.category || 'Uncategorized'}
                      </span>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-500 font-mono tracking-wide">
                          (Published: {new Date(ann.createdAt || ann.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })})
                        </span>
                        {ann.history && ann.history.length > 0 && (
                          <span className="text-[10px] text-primary/80 font-mono mt-0.5 tracking-wide">
                            (Edited: {new Date(ann.updatedAt || new Date()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })})
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-gray-100 tracking-tight leading-snug">{ann.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                      {ann.content.length > 120 ? `${ann.content.substring(0, 120)}...` : ann.content}
                    </p>
                    {ann.content.length > 120 && (
                      <button 
                        onClick={() => setViewingAnnouncement(ann)}
                        className="text-primary hover:text-[#ff8c00] text-xs font-bold self-start mt-1 transition-colors"
                      >
                        Read Full Article →
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#333333]/60 text-xs text-gray-500">
                    <span>By: <span className="text-gray-300">{ann.author}</span></span>
                    <div className="flex items-center gap-2">
                      {userRole === 'admin' && (
                        <>
                          <button onClick={() => openEditModal(ann)} className="text-primary hover:text-primary/80 font-semibold transition-colors">Edit</button>
                          <button onClick={() => confirmDelete(ann.id, ann.title)} className="text-rose-500 hover:text-rose-400 font-semibold transition-colors">Delete</button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative bg-[#0a0a0a] border border-[#333333] rounded-2xl w-full max-w-4xl text-gray-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333] bg-[#111]">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {editingAnnouncement ? 'Studio: Edit Blog' : 'Studio: Create Blog'}
              </h3>
              
              {editingAnnouncement && (
                <div className="flex items-center gap-1 bg-black p-1 rounded-lg border border-[#333333]">
                  <button 
                    onClick={() => setStudioTab('editor')}
                    className={`px-3 py-1 rounded text-xs font-semibold ${studioTab === 'editor' ? 'bg-[#222] text-primary' : 'text-gray-500'}`}
                  >
                    Editor
                  </button>
                  <button 
                    onClick={() => setStudioTab('history')}
                    className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1 ${studioTab === 'history' ? 'bg-[#222] text-primary' : 'text-gray-500'}`}
                  >
                    <History className="h-3 w-3" /> History
                  </button>
                </div>
              )}

              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-black">
              {studioTab === 'editor' ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Blog Title *</label>
                      <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full text-gray-100 bg-[#111] border border-[#333333] rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Author Name *</label>
                      <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full text-gray-100 bg-[#111] border border-[#333333] rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value as BlogCategory)} className="w-full text-gray-100 bg-[#111] border border-[#333333] rounded-lg px-3 py-2 text-sm focus:border-primary outline-none">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Status</label>
                      <select value={status} onChange={(e) => setStatus(e.target.value as PublishStatus)} className="w-full text-gray-100 bg-[#111] border border-[#333333] rounded-lg px-3 py-2 text-sm focus:border-primary outline-none">
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Media Format</label>
                      <select value={mediaType} onChange={(e) => setMediaType(e.target.value as any)} className="w-full text-gray-100 bg-[#111] border border-[#333333] rounded-lg px-3 py-2 text-sm focus:border-primary outline-none">
                        <option value="none">Text Only</option>
                        <option value="image">Image Banner</option>
                        <option value="video">YouTube Video</option>
                      </select>
                    </div>
                  </div>

                  {mediaType !== 'none' && (
                    <div className="bg-[#111] p-4 rounded-xl border border-[#333333]">
                      <label className="block text-xs font-medium text-gray-400 mb-2 flex items-center gap-2">
                        {mediaType === 'video' ? <Video className="h-4 w-4 text-rose-500" /> : <ImageIcon className="h-4 w-4 text-emerald-500" />}
                        {mediaType === 'video' ? 'YouTube Video URL' : 'Image URL'}
                      </label>
                      <input 
                        type="text" 
                        value={mediaUrl} 
                        onChange={(e) => setMediaUrl(e.target.value)} 
                        placeholder={mediaType === 'video' ? 'https://youtube.com/watch?v=...' : 'https://images.unsplash.com/...'}
                        className="w-full text-gray-100 bg-black border border-[#333333] rounded-lg px-3 py-2 text-sm focus:border-primary outline-none" 
                      />
                      {mediaType === 'video' && mediaUrl && getYouTubeEmbedUrl(mediaUrl) && (
                        <div className="mt-4 rounded-lg overflow-hidden w-full max-w-md bg-black mx-auto aspect-video">
                          <iframe className="w-full h-full" src={getYouTubeEmbedUrl(mediaUrl)!} frameBorder="0" allowFullScreen></iframe>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2">Content Body (Markdown Supported) *</label>
                    <textarea 
                      required rows={12} value={content} onChange={(e) => setContent(e.target.value)} 
                      className="w-full text-gray-100 bg-[#111] border border-[#333333] rounded-lg p-3 text-sm focus:border-primary outline-none font-mono" 
                    />
                  </div>

                  <div className="pt-4 border-t border-[#333333] flex justify-end gap-3">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-sm text-gray-400 hover:text-white">Cancel</button>
                    <button type="submit" className="px-5 py-2 text-sm bg-primary hover:bg-[#ff8c00] text-slate-950 font-bold rounded-lg shadow-lg">
                      {editingAnnouncement ? 'Update & Save History' : 'Publish Blog'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  {!editingAnnouncement?.history || editingAnnouncement.history.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">No revision history found for this blog.</p>
                  ) : (
                    <div className="space-y-4 relative border-l-2 border-[#333333] ml-4 pl-6">
                      {editingAnnouncement.history.map((hist, idx) => (
                        <div key={idx} className="relative bg-[#111] border border-[#333333] rounded-xl p-4">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[31px] top-5 border-4 border-black"></div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-xs text-primary font-mono">{new Date(hist.updatedAt).toLocaleString()}</p>
                              <p className="text-sm font-semibold text-white mt-1">Edited by: {hist.updatedBy}</p>
                            </div>
                            <button 
                              onClick={() => handleRestoreHistory(hist._id!)}
                              className="px-3 py-1 bg-[#222] hover:bg-primary hover:text-black transition text-gray-300 text-xs font-bold rounded flex items-center gap-1"
                            >
                              Restore this version
                            </button>
                          </div>
                          <div className="mt-3 text-xs text-gray-400 space-y-1 bg-black p-3 rounded border border-[#222]">
                            <p><strong>Title:</strong> {hist.title}</p>
                            <p className="line-clamp-2"><strong>Content:</strong> {hist.content}</p>
                            {hist.mediaUrl && <p className="truncate"><strong>Media:</strong> {hist.mediaUrl}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reading Modal */}
      {viewingAnnouncement && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative bg-[#0a0a0a] border border-[#333333] rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333] bg-[#111] sticky top-0 z-10 rounded-t-2xl">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Reading Mode
              </h3>
              <button onClick={() => setViewingAnnouncement(null)} className="text-gray-400 hover:text-white p-1 bg-black rounded-lg border border-[#333333] transition">
                ✕
              </button>
            </div>

            <div className="p-6 md:p-10 overflow-y-auto flex-1">
              <div className="max-w-2xl mx-auto space-y-6">
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold border ${getCategoryColor(viewingAnnouncement.category || 'Uncategorized' as any)}`}>
                      {viewingAnnouncement.category || 'Uncategorized'}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      Published: {new Date(viewingAnnouncement.createdAt || viewingAnnouncement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {viewingAnnouncement.title}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-6 h-6 rounded-full bg-[#222] flex items-center justify-center border border-[#444]">
                      <User className="h-3 w-3 text-primary" />
                    </div>
                    <span>Written by <strong className="text-gray-200">{viewingAnnouncement.author}</strong></span>
                  </div>
                </div>

                {viewingAnnouncement.mediaType === 'video' && viewingAnnouncement.mediaUrl ? (
                  <div className="w-full bg-black rounded-xl overflow-hidden border border-[#333333] aspect-video my-8">
                    <iframe 
                      className="w-full h-full"
                      src={getYouTubeEmbedUrl(viewingAnnouncement.mediaUrl) || ''} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (viewingAnnouncement.mediaUrl || viewingAnnouncement.imageUrl) ? (
                  <div className="w-full rounded-xl overflow-hidden border border-[#333333] my-8 max-h-[400px] flex items-center justify-center bg-black">
                    <img 
                      src={viewingAnnouncement.mediaUrl || viewingAnnouncement.imageUrl} 
                      alt={viewingAnnouncement.title}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                    />
                  </div>
                ) : null}

                <div className="prose prose-invert prose-orange max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap font-sans text-base">
                    {viewingAnnouncement.content}
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
