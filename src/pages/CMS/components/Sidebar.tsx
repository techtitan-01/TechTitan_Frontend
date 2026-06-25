import { 
  LayoutDashboard, 
  BookOpen, 
  Megaphone, 
  Calendar, 
  MessageSquare, 
  Users,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  pendingDoubtsCount: number;
}

export default function Sidebar({ activeTab, onTabChange, pendingDoubtsCount }: SidebarProps) {
  const menuItems = [
    { id: TabType.BLOGS, label: 'Blog Department', icon: Megaphone },
  ];

  return (
    <aside className="w-80 h-screen bg-[#0a0a0a] border-r border-[#333333] flex flex-col shrink-0 fixed left-0 top-0 text-gray-100 font-sans z-10 w-80">
      <div className="p-6 border-b border-[#333333]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#1a1a1a] rounded-xl text-primary border border-[#444444]">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">Tech Titan</h1>
            <p className="text-xs text-gray-400">Community Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navigation</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 group
                ${activeTab === TabType.BLOGS
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(255,122,0,0.1)]' 
                  : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                }`}
            >
              <div className="flex items-center gap-3">
                <Megaphone className={`h-4 w-4 ${activeTab === TabType.BLOGS ? 'text-primary' : 'text-gray-500 group-hover:text-primary/70'}`} />
                <span>Blog Department</span>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#333333] bg-black/20">
        <div className="flex items-center gap-3 p-2 rounded-lg">
          <img 
            src="https://api.dicebear.com/7.x/identicon/svg?seed=Ansh" 
            alt="User profile" 
            className="w-9 h-9 rounded-full bg-[#111111] border border-[#444444] pointer-events-none"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-gray-200">Ansh Xploit</p>
            <p className="text-xs text-gray-500 truncate">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
