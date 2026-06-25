import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import BlogsView from './components/BlogsView';
import { TabType, Announcement } from './types';
import { User as UserIcon } from 'lucide-react';
import './index.css';

export default function App() {
  // Navigation Track Tab
  const [activeTab, setActiveTab] = useState<TabType>(TabType.BLOGS);

  // Consolidated state preloaded from API
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Since authentication is temporarily removed, we default to full 'admin' access.
  const userRole = 'admin';
  const username = 'admin';

  // Fetch all data from Backend on Mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogRes = await fetch('/api/blogs');
      setAnnouncements(await blogRes.json());
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  // ================= BLOGS/ANNOUNCEMENTS CRUDS =================
  const handleAddAnnouncement = async (newAnn: Omit<Announcement, 'id' | 'date'>) => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnn)
      });
      const data = await res.json();
      setAnnouncements([data, ...announcements]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditAnnouncement = async (edited: Announcement) => {
    try {
      const res = await fetch(`/api/blogs/${edited.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(edited)
      });
      const data = await res.json();
      setAnnouncements(announcements.map(a => a.id === data.id ? data : a));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      setAnnouncements(announcements.filter(a => a.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans text-gray-100 flex selection:bg-primary selection:text-slate-900">
      
      {/* Sidebar navigation */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        pendingDoubtsCount={0}
      />

      {/* Main viewport block */}
      <main className="flex-1 pl-80 min-h-screen flex flex-col">
        <header className="h-16 border-b border-[#333333] bg-[#0a0a0a]/60 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="text-base font-semibold text-gray-100 flex items-center gap-2">
              Blog Department
              <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-[10px] uppercase font-bold tracking-wider ml-2 border border-primary/30">Administrator</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#444444] flex items-center justify-center text-primary">
                <UserIcon className="h-4 w-4" />
              </div>
              <span className="font-semibold text-gray-300 hidden sm:inline">@{username}</span>
            </div>
          </div>
        </header>

        {/* View content container */}
        <div className="flex-1 p-8 overflow-y-auto">
          <BlogsView 
            announcements={announcements}
            onAdd={handleAddAnnouncement}
            onEdit={handleEditAnnouncement}
            onDelete={handleDeleteAnnouncement}
            userRole={userRole}
          />
        </div>
      </main>
    </div>
  );
}
