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

interface Product {
  id: string;
  title: string;
  creator: string;
  status: 'available' | 'pending' | 'sold';
  price: number;
  category: string;
  created: string;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  products: { title: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  shippingAddress: string;
  createdAt: string;
}

interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  totalRevenue: number;
  monthlyGrowth: number;
  newSignups: number;
  pendingRegistrations: number;
  pendingOrders: number;
}

type TabType = 'dashboard' | 'registrations' | 'users' | 'projects' | 'products' | 'orders' | 'landing' | 'settings';

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showToast, setShowToast] = useState<{message: string; type: 'success' | 'error' | 'info'} | null>(null);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'admin' as 'admin' | 'creator' | 'subscriber' });
  
  // Data states
  const [usersList, setUsersList] = useState<User[]>([
    { id: '1', name: 'Marie Laurent', email: 'marie@crotchetti.com', role: 'creator', status: 'active', joinDate: '2024-01-15', projects: 45, revenue: 12500 },
    { id: '2', name: 'Sophie Dubois', email: 'sophie@crotchetti.com', role: 'creator', status: 'active', joinDate: '2024-02-20', projects: 32, revenue: 8900 },
    { id: '3', name: 'Emma Martin', email: 'emma@crotchetti.com', role: 'creator', status: 'pending', joinDate: '2024-03-10', projects: 18, revenue: 4200 },
    { id: '4', name: 'Claire Bernard', email: 'claire@crotchetti.com', role: 'subscriber', status: 'active', joinDate: '2024-03-25', projects: 0, revenue: 0 },
    { id: '5', name: 'Julie Moreau', email: 'julie@crotchetti.com', role: 'admin', status: 'suspended', joinDate: '2024-01-05', projects: 67, revenue: 18900 },
    { id: '6', name: 'Camille Petit', email: 'camille@crotchetti.com', role: 'creator', status: 'active', joinDate: '2024-04-01', projects: 23, revenue: 6700 },
    { id: '7', name: 'Amélie Roux', email: 'amelie@crotchetti.com', role: 'subscriber', status: 'pending', joinDate: '2024-04-10', projects: 0, revenue: 0 },
    { id: '8', name: 'Léa Fournier', email: 'lea@crotchetti.com', role: 'creator', status: 'pending', joinDate: '2024-04-15', projects: 41, revenue: 11200 },
    { id: '9', name: 'Pierre Durand', email: 'pierre@email.com', role: 'subscriber', status: 'pending', joinDate: '2024-04-18', projects: 0, revenue: 0 },
    { id: '10', name: 'Isabelle Morel', email: 'isabelle@email.com', role: 'creator', status: 'pending', joinDate: '2024-04-19', projects: 5, revenue: 800 },
  ]);

  const [projectsList, setProjectsList] = useState<Project[]>([
    { id: '1', title: 'Panier en osier moderne', creator: 'Marie Laurent', status: 'published', category: 'Home Decor', likes: 234, created: '2024-04-18' },
    { id: '2', title: 'Couverture bébé pastel', creator: 'Sophie Dubois', status: 'pending', category: 'Baby', likes: 156, created: '2024-04-19' },
    { id: '3', title: 'Sac à main bohème', creator: 'Emma Martin', status: 'published', category: 'Fashion', likes: 412, created: '2024-04-17' },
    { id: '4', title: 'Dessous de plat floral', creator: 'Camille Petit', status: 'rejected', category: 'Home Decor', likes: 89, created: '2024-04-16' },
    { id: '5', title: 'Amigurumi lapin', creator: 'Léa Fournier', status: 'pending', category: 'Toys', likes: 567, created: '2024-04-20' },
    { id: '6', title: 'Écharpe en mailles torsadées', creator: 'Sophie Dubois', status: 'pending', category: 'Fashion', likes: 321, created: '2024-04-15' },
  ]);

  const [productsList, setProductsList] = useState<Product[]>([
    { id: '1', title: 'Patron Lapin Amigurumi', creator: 'Sophie Dubois', status: 'available', price: 8.99, category: 'Patrons', created: '2024-04-10' },
    { id: '2', title: 'Kit Bonnet Ourson', creator: 'Marie Laurent', status: 'pending', price: 24.99, category: 'Kits', created: '2024-04-18' },
    { id: '3', title: 'Sac Bohème Chic', creator: 'Camille Petit', status: 'pending', price: 18.99, category: 'Accessoires', created: '2024-04-19' },
    { id: '4', title: 'Couverture Granny Square', creator: 'Emma Martin', status: 'available', price: 45.99, category: 'Kits', created: '2024-04-05' },
  ]);

  const [ordersList, setOrdersList] = useState<Order[]>([
    { id: 'ORD-001', customer: 'Jean Dupont', email: 'jean@email.com', products: [{ title: 'Patron Lapin Amigurumi', quantity: 1, price: 8.99 }, { title: 'Kit Bonnet Ourson', quantity: 2, price: 24.99 }], total: 58.97, status: 'pending', paymentStatus: 'paid', shippingAddress: '15 Rue de la Paix, Paris 75002', createdAt: '2024-04-20 14:30' },
    { id: 'ORD-002', customer: 'Marie Martin', email: 'marie.m@email.com', products: [{ title: 'Couverture Granny Square', quantity: 1, price: 45.99 }], total: 45.99, status: 'confirmed', paymentStatus: 'paid', shippingAddress: '42 Avenue des Champs, Lyon 69001', createdAt: '2024-04-19 10:15' },
    { id: 'ORD-003', customer: 'Pierre Bernard', email: 'pierre.b@email.com', products: [{ title: 'Sac Bohème Chic', quantity: 1, price: 18.99 }], total: 18.99, status: 'shipped', paymentStatus: 'paid', shippingAddress: '8 Boulevard Victor Hugo, Bordeaux 33000', createdAt: '2024-04-18 09:45' },
    { id: 'ORD-004', customer: 'Sophie Petit', email: 'sophie.p@email.com', products: [{ title: 'Patron Lapin Amigurumi', quantity: 3, price: 8.99 }], total: 26.97, status: 'pending', paymentStatus: 'pending', shippingAddress: '23 Rue Saint-Jean, Nantes 44000', createdAt: '2024-04-20 16:00' },
    { id: 'ORD-005', customer: 'Claire Moreau', email: 'claire.m@email.com', products: [{ title: 'Kit Bonnet Ourson', quantity: 1, price: 24.99 }, { title: 'Sac Bohème Chic', quantity: 1, price: 18.99 }], total: 43.98, status: 'delivered', paymentStatus: 'paid', shippingAddress: '5 Place du Marché, Marseille 13001', createdAt: '2024-04-15 11:20' },
    { id: 'ORD-006', customer: 'Lucas Robert', email: 'lucas.r@email.com', products: [{ title: 'Couverture Granny Square', quantity: 1, price: 45.99 }], total: 45.99, status: 'pending', paymentStatus: 'paid', shippingAddress: '17 Rue de la République, Toulouse 31000', createdAt: '2024-04-20 18:30' },
  ]);

  // Computed values
  const pendingRegistrations = usersList.filter(u => u.status === 'pending');
  const pendingProjects = projectsList.filter(p => p.status === 'pending');
  const pendingProducts = productsList.filter(p => p.status === 'pending');
  const pendingOrders = ordersList.filter(o => o.status === 'pending' || o.status === 'confirmed');

  // Analytics
  const analytics: Analytics = {
    totalUsers: 15847,
    activeUsers: 8234,
    totalProjects: 52341,
    totalRevenue: 284650,
    monthlyGrowth: 23.5,
    newSignups: 1247,
    pendingRegistrations: pendingRegistrations.length,
    pendingOrders: pendingOrders.length
  };

  // Toast helper
  const toast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  // ============================================
  // USER ACTIONS
  // ============================================
  
  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) {
      toast('Veuillez remplir tous les champs', 'error');
      return;
    }
    const user: User = {
      id: Date.now().toString(),
      ...newAdmin,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      projects: 0,
      revenue: 0
    };
    setUsersList([user, ...usersList]);
    toast(`${newAdmin.name} a été ajouté comme ${newAdmin.role}`);
    setShowAddAdminModal(false);
    setNewAdmin({ name: '', email: '', role: 'admin' });
  };

  // Activate a pending registration
  const handleActivateUser = (userId: string) => {
    const user = usersList.find(u => u.id === userId);
    setUsersList(usersList.map(u => 
      u.id === userId ? { ...u, status: 'active' } : u
    ));
    toast(`${user?.name} a été activé avec succès`);
  };

  // Reject a pending registration
  const handleRejectUser = (userId: string) => {
    const user = usersList.find(u => u.id === userId);
    setUsersList(usersList.filter(u => u.id !== userId));
    toast(`L'inscription de ${user?.name} a été rejetée`, 'error');
  };

  const handleViewUser = (userId: string) => {
    const user = usersList.find(u => u.id === userId);
    toast(`Visualisation du profil: ${user?.name}`, 'info');
  };

  const handleEditUser = (userId: string) => {
    const user = usersList.find(u => u.id === userId);
    toast(`Modification du profil: ${user?.name}`, 'info');
  };

  const handleDeleteUser = (userId: string) => {
    const user = usersList.find(u => u.id === userId);
    setUsersList(usersList.filter(u => u.id !== userId));
    toast(`${user?.name} a été supprimé`, 'error');
  };

  const handleSuspendUser = (userId: string) => {
    setUsersList(usersList.map(u => 
      u.id === userId ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' } : u
    ));
    const user = usersList.find(u => u.id === userId);
    toast(`${user?.name} a été ${user?.status === 'suspended' ? 'activé' : 'suspendu'}`);
  };

  // ============================================
  // PROJECT ACTIONS
  // ============================================
  
  const handleApproveProject = (projectId: string) => {
    const project = projectsList.find(p => p.id === projectId);
    setProjectsList(projectsList.map(p => 
      p.id === projectId ? { ...p, status: 'published' } : p
    ));
    toast(`Projet "${project?.title}" approuvé et publié`);
  };

  const handleRejectProject = (projectId: string) => {
    const project = projectsList.find(p => p.id === projectId);
    setProjectsList(projectsList.map(p => 
      p.id === projectId ? { ...p, status: 'rejected' } : p
    ));
    toast(`Projet "${project?.title}" rejeté`, 'error');
  };

  const handleViewProject = (projectId: string) => {
    const project = projectsList.find(p => p.id === projectId);
    toast(`Visualisation du projet: ${project?.title}`, 'info');
  };

  // ============================================
  // PRODUCT ACTIONS
  // ============================================
  
  const handleApproveProduct = (productId: string) => {
    const product = productsList.find(p => p.id === productId);
    setProductsList(productsList.map(p => 
      p.id === productId ? { ...p, status: 'available' } : p
    ));
    toast(`Produit "${product?.title}" approuvé et mis en vente`);
  };

  const handleRejectProduct = (productId: string) => {
    const product = productsList.find(p => p.id === productId);
    setProductsList(productsList.filter(p => p.id !== productId));
    toast(`Produit "${product?.title}" rejeté`, 'error');
  };

  // ============================================
  // ORDER ACTIONS
  // ============================================
  
  const handleConfirmOrder = (orderId: string) => {
    setOrdersList(ordersList.map(o => 
      o.id === orderId ? { ...o, status: 'confirmed' } : o
    ));
    toast(`Commande ${orderId} confirmée`);
  };

  const handleShipOrder = (orderId: string) => {
    setOrdersList(ordersList.map(o => 
      o.id === orderId ? { ...o, status: 'shipped' } : o
    ));
    toast(`Commande ${orderId} expédiée`);
  };

  const handleDeliverOrder = (orderId: string) => {
    setOrdersList(ordersList.map(o => 
      o.id === orderId ? { ...o, status: 'delivered' } : o
    ));
    toast(`Commande ${orderId} livrée`);
  };

  const handleCancelOrder = (orderId: string) => {
    setOrdersList(ordersList.map(o => 
      o.id === orderId ? { ...o, status: 'cancelled', paymentStatus: 'refunded' } : o
    ));
    toast(`Commande ${orderId} annulée et remboursée`, 'error');
  };

  const getOrderStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      confirmed: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      shipped: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
      delivered: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border border-red-500/30'
    };
    return styles[status] || 'bg-gray-500/20 text-gray-400';
  };

  const getPaymentStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      paid: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      pending: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      refunded: 'bg-red-500/20 text-red-400 border border-red-500/30'
    };
    return styles[status] || 'bg-gray-500/20 text-gray-400';
  };

  // ============================================
  // SETTINGS ACTIONS
  // ============================================
  
  const [settings, setSettings] = useState({
    maintenance: false,
    registration: true,
    autoModeration: false
  });

  const toggleSetting = (key: 'maintenance' | 'registration' | 'autoModeration') => {
    setSettings({ ...settings, [key]: !settings[key] });
    toast(`${key === 'maintenance' ? 'Mode maintenance' : key === 'registration' ? 'Inscriptions' : 'Modération auto'} ${!settings[key] ? 'activé' : 'désactivé'}`);
  };

  const handleClearCache = () => {
    toast('Cache vidé avec succès');
  };

  const handleResetDatabase = () => {
    toast('Base de données réinitialisée', 'error');
  };

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  
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

  const getProductStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      available: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      pending: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      sold: 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
    };
    return styles[status] || 'bg-gray-500/20 text-gray-400';
  };

  // ============================================
  // SIDEBAR MENU
  // ============================================
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )},
    { id: 'registrations', label: 'Inscriptions', badge: pendingRegistrations.length, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    )},
    { id: 'users', label: 'Utilisateurs', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )},
    { id: 'projects', label: 'Créations', badge: pendingProjects.length, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )},
    { id: 'products', label: 'Boutique', badge: pendingProducts.length, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )},
    { id: 'orders', label: 'Commandes', badge: pendingOrders.length, icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )},
    { id: 'landing', label: 'Landing Page', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )},
    { id: 'settings', label: 'Paramètres', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
  ];

  // ============================================
  // RENDER COMPONENTS
  // ============================================

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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <span className="text-amber-400 text-sm font-medium">En attente</span>
          </div>
          <h3 className="text-[#B8A88A] text-sm font-medium mb-1">Inscriptions en attente</h3>
          <p className="text-3xl font-bold text-[#D4AF37]">{analytics.pendingRegistrations}</p>
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
      </div>

      {/* Pending Items Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Registrations */}
        <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#F5F0E8] text-lg font-semibold">Inscriptions en attente</h3>
            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">
              {pendingRegistrations.length}
            </span>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {pendingRegistrations.length === 0 ? (
              <p className="text-[#B8A88A] text-sm text-center py-4">Aucune inscription en attente</p>
            ) : (
              pendingRegistrations.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-[#1A1410]/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07A5F] to-[#D4AF37] flex items-center justify-center text-white text-xs font-medium">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-[#F5F0E8] text-sm font-medium">{user.name}</p>
                      <p className="text-[#B8A88A] text-xs">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleActivateUser(user.id)}
                      className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleRejectUser(user.id)}
                      className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {pendingRegistrations.length > 5 && (
            <button 
              onClick={() => setActiveTab('registrations')}
              className="w-full mt-4 py-2 text-[#D4AF37] text-sm hover:text-[#F5F0E8] transition-colors"
            >
              Voir tout ({pendingRegistrations.length}) →
            </button>
          )}
        </div>

        {/* Pending Projects */}
        <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#F5F0E8] text-lg font-semibold">Créations en attente</h3>
            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">
              {pendingProjects.length}
            </span>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {pendingProjects.length === 0 ? (
              <p className="text-[#B8A88A] text-sm text-center py-4">Aucune création en attente</p>
            ) : (
              pendingProjects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-[#1A1410]/50 rounded-xl">
                  <div>
                    <p className="text-[#F5F0E8] text-sm font-medium">{project.title}</p>
                    <p className="text-[#B8A88A] text-xs">par {project.creator}</p>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleApproveProject(project.id)}
                      className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleRejectProject(project.id)}
                      className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {pendingProjects.length > 5 && (
            <button 
              onClick={() => setActiveTab('projects')}
              className="w-full mt-4 py-2 text-[#D4AF37] text-sm hover:text-[#F5F0E8] transition-colors"
            >
              Voir tout ({pendingProjects.length}) →
            </button>
          )}
        </div>

        {/* Pending Products */}
        <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#F5F0E8] text-lg font-semibold">Produits en attente</h3>
            <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">
              {pendingProducts.length}
            </span>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {pendingProducts.length === 0 ? (
              <p className="text-[#B8A88A] text-sm text-center py-4">Aucun produit en attente</p>
            ) : (
              pendingProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-[#1A1410]/50 rounded-xl">
                  <div>
                    <p className="text-[#F5F0E8] text-sm font-medium">{product.title}</p>
                    <p className="text-[#B8A88A] text-xs">${product.price} - {product.creator}</p>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleApproveProduct(product.id)}
                      className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleRejectProduct(product.id)}
                      className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {pendingProducts.length > 5 && (
            <button 
              onClick={() => setActiveTab('products')}
              className="w-full mt-4 py-2 text-[#D4AF37] text-sm hover:text-[#F5F0E8] transition-colors"
            >
              Voir tout ({pendingProducts.length}) →
            </button>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#F5F0E8] text-lg font-semibold">Activité Récente</h3>
        </div>
        <div className="space-y-4">
          {[
            { action: 'Nouvelle inscription', user: 'Isabelle Morel', time: 'Il y a 5 min', icon: '👤' },
            { action: 'Nouveau projet soumis', user: 'Léa Fournier', time: 'Il y a 15 min', icon: '🎨' },
            { action: 'Produit approuvé', user: 'Marie Laurent', time: 'Il y a 32 min', icon: '✅' },
            { action: 'Inscription approuvée', user: 'Emma Martin', time: 'Il y a 1 heure', icon: '✓' },
            { action: 'Création publiée', user: 'Sophie Dubois', time: 'Il y a 2 heures', icon: '🧶' },
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

  // Registrations Content (New - for managing pending registrations)
  const RegistrationsContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#F5F0E8]">Inscriptions en attente</h2>
          <p className="text-[#B8A88A]">Approuvez ou rejetez les nouvelles inscriptions</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => {
              pendingRegistrations.forEach(u => handleActivateUser(u.id));
            }}
            className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/30 transition-colors"
          >
            Tout approuver
          </button>
          <button 
            onClick={() => {
              if (confirm('Êtes-vous sûr de vouloir rejeter toutes les inscriptions?')) {
                pendingRegistrations.forEach(u => handleRejectUser(u.id));
              }
            }}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
          >
            Tout rejeter
          </button>
        </div>
      </div>

      {/* Registrations Grid */}
      {pendingRegistrations.length === 0 ? (
        <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-12 border border-[#D4AF37]/20 text-center">
          <svg className="w-16 h-16 text-[#D4AF37]/30 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-[#F5F0E8] text-lg font-semibold mb-2">Aucune inscription en attente</h3>
          <p className="text-[#B8A88A]">Toutes les inscriptions ont été traitées</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingRegistrations.map((user) => (
            <div key={user.id} className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E07A5F] to-[#D4AF37] flex items-center justify-center text-white text-lg font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h4 className="text-[#F5F0E8] font-semibold">{user.name}</h4>
                  <p className="text-[#B8A88A] text-sm">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#B8A88A]">Rôle demandé:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                    {user.role === 'creator' ? 'Créateur' : user.role === 'admin' ? 'Admin' : 'Abonné'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#B8A88A]">Date d'inscription:</span>
                  <span className="text-[#F5F0E8]">{user.joinDate}</span>
                </div>
                {user.projects !== undefined && user.projects > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#B8A88A]">Projets:</span>
                    <span className="text-[#F5F0E8]">{user.projects}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleActivateUser(user.id)}
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
                >
                  ✓ Activer
                </button>
                <button 
                  onClick={() => handleRejectUser(user.id)}
                  className="flex-1 py-2.5 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors font-medium"
                >
                  ✗ Rejeter
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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
          <button 
            onClick={() => setShowAddAdminModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960A] text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
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
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Utilisateur</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Rôle</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Statut</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Projets</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Revenus</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Date</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.filter(u => 
                u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                u.email.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((user) => (
                <tr key={user.id} className="border-b border-[#D4AF37]/10 hover:bg-[#1A1410]/50 transition-colors">
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
                      {user.role === 'creator' ? 'Créateur' : user.role === 'admin' ? 'Admin' : 'Abonné'}
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
                      <button 
                        onClick={() => handleViewUser(user.id)}
                        className="p-2 hover:bg-[#D4AF37]/20 rounded-lg transition-colors"
                        title="Voir"
                      >
                        <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleEditUser(user.id)}
                        className="p-2 hover:bg-[#E07A5F]/20 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <svg className="w-4 h-4 text-[#E07A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      {user.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleActivateUser(user.id)}
                            className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors"
                            title="Activer"
                          >
                            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleRejectUser(user.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Rejeter"
                          >
                            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      )}
                      {user.status !== 'pending' && (
                        <button 
                          onClick={() => handleSuspendUser(user.id)}
                          className="p-2 hover:bg-amber-500/20 rounded-lg transition-colors"
                          title={user.status === 'suspended' ? 'Réactiver' : 'Suspendre'}
                        >
                          <svg className={`w-4 h-4 ${user.status === 'suspended' ? 'text-emerald-400' : 'text-amber-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        </button>
                      )}
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
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F5F0E8]">Gestion des Créations</h2>
        <div className="flex gap-3">
          <select className="px-4 py-3 bg-[#2D2416] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] focus:border-[#D4AF37] focus:outline-none">
            <option value="">Tous les statuts</option>
            <option value="published">Publié</option>
            <option value="pending">En attente</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsList.map((project) => (
          <div key={project.id} className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl border border-[#D4AF37]/20 overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300">
            <div 
              onClick={() => handleViewProject(project.id)}
              className="aspect-video bg-gradient-to-br from-[#E07A5F]/20 to-[#D4AF37]/20 flex items-center justify-center cursor-pointer"
            >
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
              {project.status === 'pending' && (
                <div className="mt-4 pt-4 border-t border-[#D4AF37]/10 flex gap-2">
                  <button 
                    onClick={() => handleApproveProject(project.id)}
                    className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                  >
                    Approuver
                  </button>
                  <button 
                    onClick={() => handleRejectProject(project.id)}
                    className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
                  >
                    Rejeter
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Products Content (Boutique)
  const ProductsContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-2xl font-bold text-[#F5F0E8]">Gestion de la Boutique</h2>
        <div className="flex gap-3">
          <select className="px-4 py-3 bg-[#2D2416] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] focus:border-[#D4AF37] focus:outline-none">
            <option value="">Tous les statuts</option>
            <option value="available">Disponible</option>
            <option value="pending">En attente</option>
            <option value="sold">Vendu</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsList.map((product) => (
          <div key={product.id} className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl border border-[#D4AF37]/20 overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300">
            <div className="aspect-video bg-gradient-to-br from-[#81B29A]/20 to-[#D4AF37]/20 flex items-center justify-center">
              <svg className="w-16 h-16 text-[#81B29A]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-[#F5F0E8] font-medium">{product.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProductStatusBadge(product.status)}`}>
                  {product.status === 'available' ? 'Disponible' : product.status === 'pending' ? 'En attente' : 'Vendu'}
                </span>
              </div>
              <p className="text-[#B8A88A] text-sm mb-3">par {product.creator}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#B8A88A]">{product.category}</span>
                <span className="text-[#D4AF37] font-bold">${product.price}</span>
              </div>
              {product.status === 'pending' && (
                <div className="mt-4 pt-4 border-t border-[#D4AF37]/10 flex gap-2">
                  <button 
                    onClick={() => handleApproveProduct(product.id)}
                    className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                  >
                    Approuver
                  </button>
                  <button 
                    onClick={() => handleRejectProduct(product.id)}
                    className="flex-1 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
                  >
                    Rejeter
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Orders Content (Commandes)
  const OrdersContent = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#F5F0E8]">Commandes en cours</h2>
          <p className="text-[#B8A88A]">Gérez les commandes clients et leur statut</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-3 bg-[#2D2416] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] focus:border-[#D4AF37] focus:outline-none">
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="confirmed">Confirmée</option>
            <option value="shipped">Expédiée</option>
            <option value="delivered">Livrée</option>
            <option value="cancelled">Annulée</option>
          </select>
          <select className="px-4 py-3 bg-[#2D2416] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] focus:border-[#D4AF37] focus:outline-none">
            <option value="">Paiement</option>
            <option value="paid">Payé</option>
            <option value="pending">En attente</option>
            <option value="refunded">Remboursé</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl border border-[#D4AF37]/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D4AF37]/20">
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Commande</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Client</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Produits</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Total</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Statut</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Paiement</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Date</th>
                <th className="px-6 py-4 text-left text-[#B8A88A] text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order) => (
                <tr key={order.id} className="border-b border-[#D4AF37]/10 hover:bg-[#1A1410]/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-[#D4AF37] font-mono font-medium">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-[#F5F0E8] font-medium">{order.customer}</p>
                      <p className="text-[#B8A88A] text-sm">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {order.products.map((p, i) => (
                        <div key={i} className="text-sm">
                          <span className="text-[#F5F0E8]">{p.title}</span>
                          <span className="text-[#B8A88A]"> x{p.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#D4AF37] font-bold">${order.total.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getOrderStatusBadge(order.status)}`}>
                      {order.status === 'pending' ? 'En attente' : 
                       order.status === 'confirmed' ? 'Confirmée' :
                       order.status === 'shipped' ? 'Expédiée' :
                       order.status === 'delivered' ? 'Livrée' : 'Annulée'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getPaymentStatusBadge(order.paymentStatus)}`}>
                      {order.paymentStatus === 'paid' ? 'Payé' : 
                       order.paymentStatus === 'pending' ? 'En attente' : 'Remboursé'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#B8A88A] text-sm">{order.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {order.status === 'pending' && (
                        <button 
                          onClick={() => handleConfirmOrder(order.id)}
                          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                          title="Confirmer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      )}
                      {order.status === 'confirmed' && (
                        <button 
                          onClick={() => handleShipOrder(order.id)}
                          className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                          title="Expédier"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button 
                          onClick={() => handleDeliverOrder(order.id)}
                          className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                          title="Marquer comme livrée"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      )}
                      {(order.status === 'pending' || order.status === 'confirmed') && (
                        <button 
                          onClick={() => handleCancelOrder(order.id)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          title="Annuler"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Card */}
      <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
        <h3 className="text-[#F5F0E8] text-lg font-semibold mb-4">Résumé des commandes</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-amber-500/10 rounded-xl p-4 text-center border border-amber-500/20">
            <p className="text-2xl font-bold text-amber-400">{ordersList.filter(o => o.status === 'pending').length}</p>
            <p className="text-[#B8A88A] text-sm">En attente</p>
          </div>
          <div className="bg-blue-500/10 rounded-xl p-4 text-center border border-blue-500/20">
            <p className="text-2xl font-bold text-blue-400">{ordersList.filter(o => o.status === 'confirmed').length}</p>
            <p className="text-[#B8A88A] text-sm">Confirmées</p>
          </div>
          <div className="bg-purple-500/10 rounded-xl p-4 text-center border border-purple-500/20">
            <p className="text-2xl font-bold text-purple-400">{ordersList.filter(o => o.status === 'shipped').length}</p>
            <p className="text-[#B8A88A] text-sm">Expédiées</p>
          </div>
          <div className="bg-emerald-500/10 rounded-xl p-4 text-center border border-emerald-500/20">
            <p className="text-2xl font-bold text-emerald-400">{ordersList.filter(o => o.status === 'delivered').length}</p>
            <p className="text-[#B8A88A] text-sm">Livrées</p>
          </div>
          <div className="bg-red-500/10 rounded-xl p-4 text-center border border-red-500/20">
            <p className="text-2xl font-bold text-red-400">{ordersList.filter(o => o.status === 'cancelled').length}</p>
            <p className="text-[#B8A88A] text-sm">Annulées</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Landing Page Content
  const LandingContent = () => (
    <div className="space-y-6">
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

        <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E07A5F] to-[#C96850] flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-[#F5F0E8] text-lg font-semibold mb-2">Modifier le Contenu</h3>
          <p className="text-[#B8A88A] text-sm">Éditer les textes et images du landing</p>
          <div className="mt-4 text-[#E07A5F] text-sm">
            Modifier →
          </div>
        </div>

        <div 
          onClick={() => toast('Analytics chargées', 'info')}
          className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 cursor-pointer"
        >
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
        <div className="mt-6 flex gap-3">
          <button 
            onClick={() => toast('Modifications sauvegardées')}
            className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960A] text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );

  // Settings Content
  const SettingsContent = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
        <h3 className="text-[#F5F0E8] text-lg font-semibold mb-6">Paramètres Généraux</h3>
        <div className="space-y-4">
          <div 
            onClick={() => toggleSetting('maintenance')}
            className="flex items-center justify-between p-4 bg-[#1A1410]/50 rounded-xl cursor-pointer hover:bg-[#1A1410] transition-colors"
          >
            <div>
              <p className="text-[#F5F0E8] font-medium">Mode Maintenance</p>
              <p className="text-[#B8A88A] text-sm">Désactiver temporairement l'accès au site</p>
            </div>
            <button className={`w-12 h-6 rounded-full relative transition-colors ${settings.maintenance ? 'bg-[#D4AF37]' : 'bg-[#2D2416]'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full transition-all ${settings.maintenance ? 'right-1 bg-white' : 'left-1 bg-[#B8A88A]'}`} />
            </button>
          </div>
          <div 
            onClick={() => toggleSetting('registration')}
            className="flex items-center justify-between p-4 bg-[#1A1410]/50 rounded-xl cursor-pointer hover:bg-[#1A1410] transition-colors"
          >
            <div>
              <p className="text-[#F5F0E8] font-medium">Inscriptions Ouvertes</p>
              <p className="text-[#B8A88A] text-sm">Autoriser les nouveaux utilisateurs à s'inscrire</p>
            </div>
            <button className={`w-12 h-6 rounded-full relative transition-colors ${settings.registration ? 'bg-[#D4AF37]' : 'bg-[#2D2416]'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full transition-all ${settings.registration ? 'right-1 bg-white' : 'left-1 bg-[#B8A88A]'}`} />
            </button>
          </div>
          <div 
            onClick={() => toggleSetting('autoModeration')}
            className="flex items-center justify-between p-4 bg-[#1A1410]/50 rounded-xl cursor-pointer hover:bg-[#1A1410] transition-colors"
          >
            <div>
              <p className="text-[#F5F0E8] font-medium">Modération Automatique</p>
              <p className="text-[#B8A88A] text-sm">Approuver automatiquement le contenu de confiance</p>
            </div>
            <button className={`w-12 h-6 rounded-full relative transition-colors ${settings.autoModeration ? 'bg-[#D4AF37]' : 'bg-[#2D2416]'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full transition-all ${settings.autoModeration ? 'right-1 bg-white' : 'left-1 bg-[#B8A88A]'}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#2D2416] to-[#1A1410] rounded-2xl p-6 border border-[#D4AF37]/20">
        <h3 className="text-[#F5F0E8] text-lg font-semibold mb-6">Actions Système</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={handleClearCache}
            className="px-6 py-3 bg-[#2D2416] border border-[#D4AF37]/20 text-[#F5F0E8] rounded-xl hover:border-[#D4AF37] transition-colors"
          >
            Vider le cache
          </button>
          <button 
            onClick={handleResetDatabase}
            className="px-6 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
          >
            Réinitialiser la base de données
          </button>
        </div>
      </div>
    </div>
  );

  // ============================================
  // MAIN RENDER
  // ============================================
  
  return (
    <div className="min-h-screen bg-[#1A1410]">
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl animate-slide-in ${
          showToast.type === 'success' ? 'bg-emerald-500' : 
          showToast.type === 'error' ? 'bg-red-500' : 'bg-[#D4AF37]'
        } text-white font-medium`}>
          {showToast.message}
        </div>
      )}

      {/* Add Admin Modal */}
      {showAddAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddAdminModal(false)} />
          <div className="relative w-full max-w-md bg-[#2D2416] border border-[#D4AF37]/20 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-[#F5F0E8] text-xl font-bold mb-6">Ajouter un Admin</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#B8A88A] text-sm mb-2">Nom complet</label>
                <input
                  type="text"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1A1410] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="Nom de l'administrateur"
                />
              </div>
              <div>
                <label className="block text-[#B8A88A] text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1A1410] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="email@exemple.com"
                />
              </div>
              <div>
                <label className="block text-[#B8A88A] text-sm mb-2">Rôle</label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as 'admin' | 'creator' | 'subscriber' })}
                  className="w-full px-4 py-3 bg-[#1A1410] border border-[#D4AF37]/20 rounded-xl text-[#F5F0E8] focus:border-[#D4AF37] focus:outline-none transition-colors"
                >
                  <option value="admin">Admin</option>
                  <option value="creator">Créateur</option>
                  <option value="subscriber">Abonné</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowAddAdminModal(false)}
                className="flex-1 py-3 bg-[#1A1410] border border-[#D4AF37]/20 text-[#F5F0E8] rounded-xl hover:border-[#D4AF37] transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={handleAddAdmin}
                className="flex-1 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8960A] text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} min-h-screen bg-[#1A1410] border-r border-[#D4AF37]/20 transition-all duration-300 flex flex-col`}>
          {/* Logo */}
          <div className="p-6 border-b border-[#D4AF37]/20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8960A] flex items-center justify-center text-black font-bold text-lg">
                C
              </div>
              {!sidebarCollapsed && (
                <span className="text-[#D4AF37] font-bold text-xl">Crochetti</span>
              )}
            </Link>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeTab === item.id 
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37]' 
                    : 'text-[#B8A88A] hover:bg-[#2D2416] hover:text-[#F5F0E8]'
                }`}
              >
                {item.icon}
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>

          {/* Back to Site */}
          <div className="p-4 border-t border-[#D4AF37]/20">
            <Link
              href="/"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#B8A88A] hover:bg-[#2D2416] hover:text-[#F5F0E8] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              {!sidebarCollapsed && <span>Retour au site</span>}
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <DashboardContent />}
            {activeTab === 'registrations' && <RegistrationsContent />}
            {activeTab === 'users' && <UsersContent />}
            {activeTab === 'projects' && <ProjectsContent />}
            {activeTab === 'products' && <ProductsContent />}
            {activeTab === 'orders' && <OrdersContent />}
            {activeTab === 'landing' && <LandingContent />}
            {activeTab === 'settings' && <SettingsContent />}
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
