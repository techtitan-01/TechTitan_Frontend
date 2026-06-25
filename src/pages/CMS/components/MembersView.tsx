import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Users, 
  MapPin, 
  User, 
  X,
  Mail,
  Check,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Member, MemberRole } from '../types';

interface MembersViewProps {
  members: Member[];
  onAdd: (member: Omit<Member, 'id' | 'joinedDate'>) => void;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
}

export default function MembersView({ members, onAdd, onEdit, onDelete }: MembersViewProps) {
  // Filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Modal Control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<MemberRole>('Active Student');
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [avatarSeed, setAvatarSeed] = useState('');

  const roles: MemberRole[] = ['Lead', 'Mentor', 'Core Contributor', 'Active Student'];
  const statuses = ['Active', 'Inactive'] as const;

  const openAddModal = () => {
    setEditingMember(null);
    setName('');
    setEmail('');
    setRole('Active Student');
    setDomain('');
    setStatus('Active');
    setAvatarSeed(Math.random().toString(36).substring(7));
    setIsModalOpen(true);
  };

  const openEditModal = (mem: Member) => {
    setEditingMember(mem);
    setName(mem.name);
    setEmail(mem.email);
    setRole(mem.role);
    setDomain(mem.domain);
    setStatus(mem.status);
    setAvatarSeed(mem.avatarSeed);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !domain.trim()) {
      alert('Please fill out all mandatory fields (Name, Email, Domain/Expertise)');
      return;
    }

    if (editingMember) {
      onEdit({
        ...editingMember,
        name,
        email,
        role,
        domain,
        status,
        avatarSeed: avatarSeed || name
      });
    } else {
      onAdd({
        name,
        email,
        role,
        domain,
        status,
        avatarSeed: avatarSeed || name
      });
    }
    setIsModalOpen(false);
  };

  const confirmDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from our CMS database?`)) {
      onDelete(id);
    }
  };

  // Filter
  const filteredMembers = members.filter(mem => {
    const matchesSearch = mem.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mem.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          mem.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || mem.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || mem.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeStyle = (userRole: MemberRole) => {
    switch (userRole) {
      case 'Lead':
        return 'text-amber-300 bg-amber-500/10 border-amber-500/25';
      case 'Mentor':
        return 'text-primary/80 bg-primary/10 border-primary/25';
      case 'Core Contributor':
        return 'text-indigo-300 bg-primary/10 border-indigo-500/25';
      case 'Active Student':
        return 'text-gray-300 bg-[#1a1a1a] border-[#444444]';
      default:
        return 'text-gray-400 bg-[#111111] border-[#333333]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Head */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Active Student & Mentor Directory</h2>
          <p className="text-sm text-gray-400 font-sans">Index of team roles, contact links, expert specialties, and administrative permissions statuses.</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-primary hover:bg-[#ff8c00] text-white font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2 text-sm shadow shadow-teal-500/20 active:scale-98"
        >
          <UserPlus className="h-4.5 w-4.5" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Selector Filters */}
      <div className="bg-[#0a0a0a] border border-[#333333]/80 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-md">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student names, emails, roles..."
            className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary placeholder-slate-600 transition"
          />
        </div>

        <div className="flex gap-3 items-center w-full md:w-auto">
          <div className="flex items-center gap-2 text-gray-400 text-xs grow md:grow-0">
            <Filter className="h-3.5 w-3.5 text-gray-500 shrink-0" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-black border border-[#333333] text-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-primary text-xs grow md:grow-0"
            >
              <option value="All">All Roles</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
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

      {/* Grit layout list directory */}
      {filteredMembers.length === 0 ? (
        <div className="bg-[#0a0a0a] border border-[#333333] rounded-xl p-12 text-center text-gray-500 max-w-lg mx-auto mt-6">
          <Users className="h-10 w-10 text-slate-600 mx-auto mb-3" />
          <p className="font-semibold text-gray-300">No Members found</p>
          <p className="text-xs text-gray-500 mt-1 font-sans">You can register a new lead student or expert mentor by clicking "Add Member".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((mem) => (
            <div 
              key={mem.id} 
              className="bg-[#0a0a0a] border border-[#333333] hover:border-[#444444]/80 rounded-xl p-5 shadow-lg flex flex-col justify-between transition-all"
            >
              <div className="space-y-4">
                {/* Visual block */}
                <div className="flex items-center gap-4">
                  <img 
                    src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${mem.avatarSeed || mem.name}`} 
                    alt={mem.name} 
                    className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#444444] p-0.5 object-cover shrink-0 pointer-events-none"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-100 text-base flex items-center gap-1.5 truncate">
                      <span>{mem.name}</span>
                      {mem.role === 'Lead' && <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />}
                      {mem.role === 'Mentor' && <Award className="h-4 w-4 text-primary shrink-0" />}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getRoleBadgeStyle(mem.role)}`}>
                        {mem.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info specifications */}
                <div className="space-y-2 pt-3 border-t border-slate-850 text-xs text-gray-400">
                  <div>
                    <span className="text-gray-500 font-mono block">Domain Specialty:</span>
                    <strong className="text-gray-200 font-sans block mt-0.5 text-sm">{mem.domain}</strong>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1 text-[11px]">
                    <Mail className="h-3.5 w-3.5 text-gray-500" />
                    <span className="truncate">{mem.email}</span>
                  </div>

                  <div className="text-[10px] text-gray-500 font-mono flex items-center justify-between">
                    <span>Joined: {mem.joinedDate}</span>
                    <span className={`inline-flex items-center gap-1 ${mem.status === 'Active' ? 'text-primary' : 'text-gray-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${mem.status === 'Active' ? 'bg-teal-400' : 'bg-slate-550'}`}></span>
                      {mem.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Back controls */}
              <div className="flex items-center justify-end gap-1.5 border-t border-slate-850 pt-3.5 mt-4">
                <button
                  onClick={() => openEditModal(mem)}
                  className="p-1.5 px-3 bg-[#1a1a1a] hover:bg-slate-750 text-primary hover:text-primary/80 rounded text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Edit2 className="h-3 w-3" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => confirmDelete(mem.id, mem.name)}
                  className="p-1.5 text-rose-500 hover:text-rose-400 hover:bg-[#1a1a1a] rounded transition"
                  title="Remove Member form database"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CRUD POPUP FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative bg-[#0a0a0a] border border-slate-850 rounded-2xl w-full max-w-lg text-gray-100 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-fade-in my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {editingMember ? 'Edit Community Member Profile' : 'Register Community Titan Member'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#111111]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Full Student/Mentor Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priyanshu Jha"
                  className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. priyanshu@techtitan.io"
                  className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              {/* Grid selections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Position Role Selection */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Community Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as MemberRole)}
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Active Status */}
                <div>
                  <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Registration Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                    className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Domain Specialty */}
              <div>
                <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1.5">Domain Specialty / Core Expertise *</label>
                <input
                  type="text"
                  required
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. Systems Engineer or Android Flutter Core"
                  className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-primary transition"
                />
              </div>

              {/* Avatar customization helper */}
              <div>
                <label className="block text-xs font-semibold font-mono text-gray-400 uppercase tracking-wide mb-1">Robot Avatar seed name</label>
                <input
                  type="text"
                  value={avatarSeed}
                  onChange={(e) => setAvatarSeed(e.target.value)}
                  placeholder="Type anything to custom-generate a robot avatar visage"
                  className="w-full text-gray-200 bg-black border border-[#333333] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-primary transition"
                />
              </div>

              {/* Bot buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-850">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-[#1a1a1a] hover:bg-slate-755 text-gray-300 font-medium rounded-lg text-xs transition active:scale-98"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-teal-600 hover:to-indigo-680 text-white font-semibold rounded-lg text-xs transition shadow-lg active:scale-98"
                >
                  {editingMember ? 'Update Member profile' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
