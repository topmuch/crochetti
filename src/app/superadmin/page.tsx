'use client';

import { useState } from 'react';
import Link from 'next/link';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'creator' | 'subscriber';
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
  projects?: number;
  revenue?: number;
}

interface Project {
  id: string;
  title: string;
  creator: string;
  status: 'published' | 'pending' | 'rejected';
  category: string;
  likes: number;
  created: string;
}

interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  totalRevenue: number;
  monthlyGrowth: number;
  newSignups: number;
}

type TabType = 'dashboard' | 'users' | 'projects' | 'landing' | 'settings';

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mock Data
  const analytics: Analytics = {
    totalUsers: 15847,
    activeUsers: 8234,
    totalProjects: 52341,
    totalRevenue: 284650,
    monthlyGrowth: 23.5,
    newSignups: 1247
  };

  const users: User[] = [
    { id: '1', name: 'Marie Laurent', email: 'marie@crotchetti.com', role: 'admin', status: 'active', joinDate: '2024-01-15', projects: 45, revenue: 12500 },
    { id: '2', name: 'Sophie Dubois', email: 'sophie@crotchetti.com', role: 'creator', status: 'active', joinDate: '2024-02-20', projects: 32, revenue: 8900 },
    { id: '3', name: 'Emma Martin', email: 'emma@crotchetti.com', role: 'creator', status: 'pending', joinDate: '2024-03-10', projects: 18, revenue: 4200 },
    { id: '4', name: 'Claire Bernard', email: 'claire@crotchetti.com', role: 'subscriber', status: 'active', joinDate: '2024-03-25', projects: 0, revenue: 0 },
    { id: '5', name: 'Julie Moreau', email: 'julie@crotchetti.com', role: 'admin', status: 'suspended', joinDate: '2024-01-05', projects: 67, revenue: 18900 },
    { id: '6', name: 'Camille Petit', email: 'camille@crotchetti.com', role: 'creator', status: 'active', joinDate: '2024-04-01', projects: 23, revenue: 6700 },
    { id: '7', name: 'Amélie Roux', email: 'amelie@crotchetti.com', role: 'subscriber', status: 'pending', joinDate: '2024-04-10', projects: 0, revenue: 0 },
    { id: '8', name: 'Léa Fournier', email: 'lea@crotchetti.com', role: 'creator', status: 'active', joinDate: '2024-04-15', projects: 41, revenue: 11200 },
  ];

  const projects: Project[] = [
    { id: '1', title: 'Panier en osier moderne', creator: 'Marie Laurent', status: 'published', category: 'Home Decor', likes: 234, created: '2024-04-18' },
    { id: '2', title: 'Couverture bébé pastel', creator: 'Sophie Dubois', status: 'pending', category: 'Baby', likes: 156, created: '2024-04-19' },
    { id: '3', title: 'Sac à main bohème', creator: 'Emma Martin', status: 'published', category: 'Fashion', likes: 412, created: '2024-04-17' },
    { id: '4', title: 'Dessous de plat floral', creator: 'Camille Petit', status: 'rejected', category: 'Home Decor', likes: 89, created: '2024-04-16' },
    { id: '5', title: 'Amigurumi lapin', creator: 'Léa Fournier', status: 'pending', category: 'Toys', likes: 567, created: '2024-04-20' },
    { id: '6', title: 'Écharpe en mailles torsadées', creator: 'Sophie Dubois', status: 'published', category: 'Fashion', likes: 321, created: '2024-04-15' },
  ];

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      admin: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black',
      creator: 'bg-gradient-to-r from-[#E07A5F] to-[#C96850] text-white',
      subscriber: 'bg-gradient-to-r from-[#81B29A] to-[#6B9B7A] text-white'
    };
    return styles[role] || 'bg-gray-500 text-white';
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      suspended: 'bg-red-500/20 text-red-400 border border-red-500/30',
      pending: 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
    };
    return styles[status] || 'bg-gray-500/20 text-gray-400';
  };

  const getProjectStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      published: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      pending: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      rejected: 'bg-red-500/20 text-red-400 border border-red-500/30'
    };
    return styles[status] || 'bg-gray-500/20 text-gray-400';
  };

  // Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8960A] flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +12.5%
            </span>
          </div>
          <h3 className="text-[#B8A88A] text-sm font-medium mb-1">Total Utilisateurs</h3>
          <p className="text-3xl font-bold text-[#D4AF37]">{analytics.totalUsers.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E07A5F] to-[#C96850] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +{analytics.monthlyGrowth}%
            </span>
          </div>
          <h3 className="text-[#B8A88A] text-sm font-medium mb-1">Projets Totaux</h3>
          <p className="text-3xl font-bold text-[#D4AF37]">{analytics.totalProjects.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#81B29A] to-[#6B9B7A] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +18.2%
            </span>
          </div>
          <h3 className="text-[#B8A88A] text-sm font-medium mb-1">Revenus Totaux</h3>
          <p className="text-3xl font-bold text-[#D4AF37]">${analytics.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <span className="text-emerald-400 text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +8.7%
            </span>
          </div>
          <h3 className="text-[#B8A88A] text-sm font-medium mb-1">Nouvelles Inscriptions</h3>
          <p className="text-3xl font-bold text-[#D4AF37]">{analytics.newSignups.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
          <h3 className="text-[#F5F0E8] text-lg font-semibold mb-6">Activité Hebdomadaire</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 80, 45, 90, 60, 85, 75].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-gradient-to-t from-[#D4AF37] to-[#E07A5F] rounded-t-lg transition-all duration-300 hover:opacity-80"
                  style={{ height: `${height}%` }}
                />
                <span className="text-[#B8A88A] text-xs">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* User Distribution */}
        <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
          <h3 className="text-[#F5F0E8] text-lg font-semibold mb-6">Distribution des Utilisateurs</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500" />
                <span className="text-[#F5F0E8]">Administrateurs</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-[#1A1410] rounded-full overflow-hidden">
                  <div className="h-full w-[5%] bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" />
                </div>
                <span className="text-[#D4AF37] font-medium w-12 text-right">5%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#E07A5F] to-[#C96850]" />
                <span className="text-[#F5F0E8]">Créateurs</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-[#1A1410] rounded-full overflow-hidden">
                  <div className="h-full w-[35%] bg-gradient-to-r from-[#E07A5F] to-[#C96850] rounded-full" />
                </div>
                <span className="text-[#D4AF37] font-medium w-12 text-right">35%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#81B29A] to-[#6B9B7A]" />
                <span className="text-[#F5F0E8]">Abonnés</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-[#1A1410] rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-gradient-to-r from-[#81B29A] to-[#6B9B7A] rounded-full" />
                </div>
                <span className="text-[#D4AF37] font-medium w-12 text-right">60%</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[#D4AF37]/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#B8A88A]">Utilisateurs actifs</span>
              <span className="text-[#D4AF37] font-medium">{analytics.activeUsers.toLocaleString()} / {analytics.totalUsers.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#F5F0E8] text-lg font-semibold">Activité Récente</h3>
          <button className="text-[#D4AF37] hover:text-[#F5F0E8] text-sm transition-colors">
            Voir tout →
          </button>
        </div>
        <div className="space-y-4">
          {[
            { action: 'Nouveau projet publié', user: 'Marie Laurent', time: 'Il y a 5 min', icon: '🎨' },
            { action: 'Nouvel utilisateur inscrit', user: 'Jean Dupont', time: 'Il y a 15 min', icon: '👤' },
            { action: 'Paiement reçu', user: 'Sophie Dubois', time: 'Il y a 32 min', icon: '💳' },
            { action: 'Projet approuvé', user: 'Emma Martin', time: 'Il y a 1 heure', icon: '✅' },
            { action: 'Commentaire signalé', user: 'Admin System', time: 'Il y a 2 heures', icon: '⚠️' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[#1A1410]/50 hover:bg-[#1A1410] transition-colors">
              <span className="text-2xl">{activity.icon}</span>
              <div className="flex-1">
                <p className="text-[#F5F0E8]">{activity.action}</p>
                <p className="text-[#B8A88A] text-sm">{activity.user}</p>
              </div>
              <span className="text-[#B8A88A] text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Users Content
  const UsersContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B8A88A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher des utilisateurs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#2D2416] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] placeholder-[#B8A88A] focus:border-[#D4AF37] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-3 bg-[#2D2416] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] focus:border-[#D4AF37] focus:outline-none">
            <option value="">Tous les rôles</option>
            <option value="admin">Admin</option>
            <option value="creator">Créateur</option>
            <option value="subscriber">Abonné</option>
          </select>
          <button className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960A] text-black font-semibold rounded-xl hover:opacity-90 transition-opacity">
            + Ajouter Admin
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl border border-[#D4AF37]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D4AF37]/20">
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">
                  <input type="checkbox" className="rounded border-[#D4AF37]/30 bg-[#1A1410]" />
                </th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Utilisateur</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Rôle</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Statut</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Projets</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Revenus</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Date d'inscription</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[#D4AF37]/10 hover:bg-[#1A1410]/50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-[#D4AF37]/30 bg-[#1A1410]" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E07A5F] to-[#D4AF37] flex items-center justify-center text-white font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[#F5F0E8] font-medium">{user.name}</p>
                        <p className="text-[#B8A88A] text-sm">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(user.status)}`}>
                      {user.status === 'active' ? 'Actif' : user.status === 'suspended' ? 'Suspendu' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#F5F0E8]">{user.projects || '-'}</td>
                  <td className="px-6 py-4 text-[#D4AF37]">{user.revenue ? `$${user.revenue.toLocaleString()}` : '-'}</td>
                  <td className="px-6 py-4 text-[#B8A88A]">{user.joinDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-[#D4AF37]/20 rounded-lg transition-colors">
                        <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-[#E07A5F]/20 rounded-lg transition-colors">
                        <svg className="w-4 h-4 text-[#E07A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors">
                        <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Projects Content
  const ProjectsContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B8A88A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher des projets..."
            className="w-full pl-12 pr-4 py-3 bg-[#2D2416] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] placeholder-[#B8A88A] focus:border-[#D4AF37] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-3 bg-[#2D2416] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] focus:border-[#D4AF37] focus:outline-none">
            <option value="">Tous les statuts</option>
            <option value="published">Publié</option>
            <option value="pending">En attente</option>
            <option value="rejected">Rejeté</option>
          </select>
          <select className="px-4 py-3 bg-[#2D2416] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] focus:border-[#D4AF37] focus:outline-none">
            <option value="">Toutes catégories</option>
            <option value="home">Home Decor</option>
            <option value="fashion">Fashion</option>
            <option value="baby">Baby</option>
            <option value="toys">Toys</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl border border-[#D4AF37]/20 overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300">
            <div className="aspect-video bg-gradient-to-br from-[#E07A5F]/20 to-[#D4AF37]/20 flex items-center justify-center">
              <svg className="w-16 h-16 text-[#D4AF37]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-[#F5F0E8] font-medium">{project.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProjectStatusBadge(project.status)}`}>
                  {project.status === 'published' ? 'Publié' : project.status === 'pending' ? 'En attente' : 'Rejeté'}
                </span>
              </div>
              <p className="text-[#B8A88A] text-sm mb-3">par {project.creator}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#B8A88A]">{project.category}</span>
                <span className="text-[#D4AF37] flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {project.likes}
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-[#D4AF37]/10 flex gap-2">
                <button className="flex-1 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors text-sm">
                  Approuver
                </button>
                <button className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm">
                  Rejeter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Landing Page Content
  const LandingContent = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/" target="_blank" className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8960A] flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-[#F5F0E8] text-lg font-semibold mb-2">Voir le Landing Page</h3>
          <p className="text-[#B8A88A] text-sm">Ouvrir la page d'accueil dans un nouvel onglet</p>
          <div className="mt-4 text-[#D4AF37] text-sm group-hover:translate-x-1 transition-transform">
            Ouvrir →
          </div>
        </Link>

        <Link href="/" className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E07A5F] to-[#C96850] flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-[#F5F0E8] text-lg font-semibold mb-2">Modifier le Contenu</h3>
          <p className="text-[#B8A88A] text-sm">Éditer les textes et images du landing</p>
          <div className="mt-4 text-[#E07A5F] text-sm group-hover:translate-x-1 transition-transform">
            Modifier →
          </div>
        </Link>

        <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#81B29A] to-[#6B9B7A] flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-[#F5F0E8] text-lg font-semibold mb-2">Statistiques</h3>
          <p className="text-[#B8A88A] text-sm">Voir les analytics du landing page</p>
          <div className="mt-4 text-[#81B29A] text-sm">
            Analyser →
          </div>
        </div>
      </div>

      {/* Hero Section Editor */}
      <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
        <h3 className="text-[#F5F0E8] text-lg font-semibold mb-6">Section Hero</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[#B8A88A] text-sm mb-2">Titre Principal</label>
            <input
              type="text"
              defaultValue="Créez. Partagez. Inspirez."
              className="w-full px-4 py-3 bg-[#1A1410] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] focus:border-[#D4AF37] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#B8A88A] text-sm mb-2">Sous-titre</label>
            <input
              type="text"
              defaultValue="La communauté premium pour les passionnés de crochet"
              className="w-full px-4 py-3 bg-[#1A1410] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] focus:border-[#D4AF37] focus:outline-none transition-colors"
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-[#B8A88A] text-sm mb-2">Description</label>
          <textarea
            rows={3}
            defaultValue="Rejoignez une communauté exclusive de créateurs de crochet. Partagez vos projets, découvrez des patrons uniques et connectez-vous avec des artisans du monde entier."
            className="w-full px-4 py-3 bg-[#1A1410] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
          />
        </div>
        <div className="mt-6 flex gap-3">
          <button className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960A] text-black font-semibold rounded-xl hover:opacity-90 transition-opacity">
            Sauvegarder
          </button>
          <button className="px-6 py-3 bg-[#1A1410] border border-[#D4AF37]/20 text-[#F5F0E8] rounded-xl hover:border-[#D4AF37] transition-colors">
            Aperçu
          </button>
        </div>
      </div>

      {/* Featured Content */}
      <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#F5F0E8] text-lg font-semibold">Projets en Vedette</h3>
          <button className="px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/30 transition-colors text-sm">
            + Ajouter
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-[#1A1410] rounded-xl border border-[#D4AF37]/10 flex items-center justify-center">
              <span className="text-[#B8A88A]">Projet {i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Settings Content
  const SettingsContent = () => (
    <div className="space-y-6">
      {/* General Settings */}
      <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
        <h3 className="text-[#F5F0E8] text-lg font-semibold mb-6">Paramètres Généraux</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#1A1410]/50 rounded-xl">
            <div>
              <p className="text-[#F5F0E8] font-medium">Mode Maintenance</p>
              <p className="text-[#B8A88A] text-sm">Désactiver temporairement l'accès au site</p>
            </div>
            <button className="w-12 h-6 bg-[#2D2416] rounded-full relative">
              <span className="absolute left-1 top-1 w-4 h-4 bg-[#B8A88A] rounded-full transition-all" />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-[#1A1410]/50 rounded-xl">
            <div>
              <p className="text-[#F5F0E8] font-medium">Inscriptions Ouvertes</p>
              <p className="text-[#B8A88A] text-sm">Autoriser les nouveaux utilisateurs à s'inscrire</p>
            </div>
            <button className="w-12 h-6 bg-[#D4AF37] rounded-full relative">
              <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-[#1A1410]/50 rounded-xl">
            <div>
              <p className="text-[#F5F0E8] font-medium">Modération Automatique</p>
              <p className="text-[#B8A88A] text-sm">Approuver automatiquement les projets</p>
            </div>
            <button className="w-12 h-6 bg-[#2D2416] rounded-full relative">
              <span className="absolute left-1 top-1 w-4 h-4 bg-[#B8A88A] rounded-full transition-all" />
            </button>
          </div>
        </div>
      </div>

      {/* API & Integrations */}
      <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
        <h3 className="text-[#F5F0E8] text-lg font-semibold mb-6">API & Intégrations</h3>
        <div className="space-y-4">
          <div className="p-4 bg-[#1A1410]/50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#F5F0E8] font-medium">Clé API</p>
              <button className="text-[#D4AF37] text-sm hover:underline">Régénérer</button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="password"
                value="sk-crotchetti-xxxxxxxxxxxxxxxxxxxx"
                readOnly
                className="flex-1 px-3 py-2 bg-[#1A1410] border border-[#D4AF37]/10 rounded-lg text-[#B8A88A] text-sm"
              />
              <button className="p-2 bg-[#D4AF37]/20 rounded-lg hover:bg-[#D4AF37]/30 transition-colors">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#1A1410]/50 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#81B29A]/20 flex items-center justify-center">
                <span className="text-[#81B29A] font-bold">S</span>
              </div>
              <div className="flex-1">
                <p className="text-[#F5F0E8] font-medium">Stripe</p>
                <p className="text-[#B8A88A] text-sm">Paiements connectés</p>
              </div>
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
            </div>
            <div className="p-4 bg-[#1A1410]/50 rounded-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#E07A5F]/20 flex items-center justify-center">
                <span className="text-[#E07A5F] font-bold">M</span>
              </div>
              <div className="flex-1">
                <p className="text-[#F5F0E8] font-medium">Mailchimp</p>
                <p className="text-[#B8A88A] text-sm">Newsletter sync</p>
              </div>
              <span className="w-2 h-2 bg-emerald-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-gradient-to-br from-red-500/10 to-[#1A1410] rounded-2xl p-6 border border-red-500/20">
        <h3 className="text-red-400 text-lg font-semibold mb-6">Zone de Danger</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-xl border border-red-500/10">
            <div>
              <p className="text-[#F5F0E8] font-medium">Vider le Cache</p>
              <p className="text-[#B8A88A] text-sm">Effacer toutes les données en cache</p>
            </div>
            <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
              Vider
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-red-500/5 rounded-xl border border-red-500/10">
            <div>
              <p className="text-[#F5F0E8] font-medium">Réinitialiser la Base de Données</p>
              <p className="text-[#B8A88A] text-sm">Supprimer toutes les données (irréversible)</p>
            </div>
            <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const menuItems: { id: TabType; label: string; icon: JSX.Element }[] = [
    {
      id: 'dashboard',
      label: 'Tableau de Bord',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: 'users',
      label: 'Utilisateurs',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      id: 'projects',
      label: 'Projets',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: 'landing',
      label: 'Landing Page',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A1410]">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#2D2416] to-[#1A1410] border-r border-[#D4AF37]/20 transition-all duration-300 z-50 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-[#D4AF37]/20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#E07A5F] flex items-center justify-center">
              <span className="text-xl font-bold text-white">C</span>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-[#F5F0E8] font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Crochetti
                </h1>
                <p className="text-[#D4AF37] text-xs">Super Admin</p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#E07A5F]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                  : 'text-[#B8A88A] hover:bg-[#D4AF37]/10 hover:text-[#F5F0E8]'
              }`}
            >
              {item.icon}
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Back to Main */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#D4AF37]/20">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#B8A88A] hover:bg-[#D4AF37]/10 hover:text-[#F5F0E8] transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {!sidebarCollapsed && <span className="font-medium">Retour au Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Header */}
        <header className="sticky top-0 bg-[#1A1410]/80 backdrop-blur-xl border-b border-[#D4AF37]/20 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg text-[#B8A88A] hover:bg-[#D4AF37]/10 hover:text-[#F5F0E8] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h2 className="text-[#F5F0E8] text-xl font-semibold">
                  {menuItems.find(m => m.id === activeTab)?.label || 'Tableau de Bord'}
                </h2>
                <p className="text-[#B8A88A] text-sm">Bienvenue, Super Administrateur</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-[#B8A88A] hover:bg-[#D4AF37]/10 hover:text-[#F5F0E8] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#E07A5F] rounded-full" />
              </button>
              {/* Profile */}
              <div className="flex items-center gap-3 px-4 py-2 bg-[#2D2416] rounded-xl border border-[#D4AF37]/20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E07A5F] flex items-center justify-center">
                  <span className="text-sm font-medium text-white">SA</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-[#F5F0E8] text-sm font-medium">Super Admin</p>
                  <p className="text-[#B8A88A] text-xs">admin@crotchetti.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {activeTab === 'dashboard' && <DashboardContent />}
          {activeTab === 'users' && <UsersContent />}
          {activeTab === 'projects' && <ProjectsContent />}
          {activeTab === 'landing' && <LandingContent />}
          {activeTab === 'settings' && <SettingsContent />}
        </div>
      </main>
    </div>
  );
}
