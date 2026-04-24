"use client";

import React, { useState, useEffect } from 'react';
import AdminGuard from '@/components/AdminGuard';
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, Settings, LogOut, ChevronRight, CreditCard, MessageSquare, Mail, Home, AlertTriangle, TrendingUp, Ticket, PieChart, Gem, Smartphone, Gift, Zap, CalendarDays, Menu, X } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ProductManager from '@/components/admin/ProductManager';
import UserManager from '@/components/admin/UserManager';
import CategoryManager from '@/components/admin/CategoryManager';
import OrderManager from '@/components/admin/OrderManager';
import MessageManager from '@/components/admin/MessageManager';
import SubscriberManager from '@/components/admin/SubscriberManager';
import CommentManager from '@/components/admin/CommentManager';
import PromotionManager from '@/components/admin/PromotionManager';
import AnalyticsManager from '@/components/admin/AnalyticsManager';
import Conciergerie from '@/components/admin/Conciergerie';
import GiftSystemManager from '@/components/admin/GiftSystemManager';
import EventManager from '@/components/admin/EventManager';
import { adminApi, productsApi, ordersApi, messagesApi, imageUrl } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const AdminDashboard = () => {
    const { userData, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        if (typeof window !== 'undefined') return localStorage.getItem('adminSidebarCollapsed') === 'true';
        return false;
    });
    const [stats, setStats] = useState({ sales: '0 DH', orders: 0, customers: 0 });
    const [recentLogs, setRecentLogs] = useState<any[]>([]);
    const [lowStock, setLowStock] = useState<any[]>([]);
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (userData?.role === 'provider' && activeTab === 'dashboard') {
            setActiveTab('products');
        }
    }, [userData, activeTab]);

    const menuGroups = [
        {
            title: "Commerce",
            items: [
                { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { id: 'orders', label: 'Commandes', icon: ShoppingBag, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                { id: 'products', label: 'Produits', icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
                { id: 'categories', label: 'Catégories', icon: Tag, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            ]
        },
        {
            title: "Maison & Relation",
            items: [
                { id: 'users', label: 'Utilisateurs', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                { id: 'messages', label: 'Messages', icon: Mail, color: 'text-rose-500', bg: 'bg-rose-500/10' },
                { id: 'subscribers', label: 'Newsletter', icon: Smartphone, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
                { id: 'comments', label: 'Moderation', icon: MessageSquare, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
{ id: 'concierge', label: 'VIP Conciergerie', icon: Gem, color: 'text-primary', bg: 'bg-primary/5' },
            ]
        },
        {
            title: "Croissance",
            items: [
                { id: 'promotions', label: 'Offres & Codes', icon: Ticket, color: 'text-pink-500', bg: 'bg-pink-500/10' },
                { id: 'analytics', label: 'Performances', icon: PieChart, color: 'text-violet-500', bg: 'bg-violet-500/10' },
                { id: 'gifts', label: 'Gestion des Cadeaux', icon: Gift, color: 'text-amber-600', bg: 'bg-amber-50' },
                { id: 'events', label: 'Événements & Roue', icon: CalendarDays, color: 'text-primary', bg: 'bg-primary/10' },
            ]
        }

    ];

    const currentItem = [...menuGroups[0].items, ...menuGroups[1].items, ...menuGroups[2].items].find(item => item.id === activeTab);


    useEffect(() => {
        adminApi.getLogs(1).then(res => setRecentLogs(res.data)).catch(console.error);
    }, []);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const [statsRes, prodsRes, pendingRes, msgsRes] = await Promise.all([
                    adminApi.getStats(),
                    productsApi.getAll({ limit: 50 }),
                    ordersApi.getAll({ status: 'pending', limit: 1 }),
                    messagesApi.getAll(1),
                ]);
                const s = statsRes.data;
                setStats({
                    sales: `${s.totalRevenue.toLocaleString()} DH`,
                    orders: s.totalOrders,
                    customers: s.totalUsers
                });
                const allProds = prodsRes.data || [];
                setLowStock(allProds.filter(p => p.stock < 10).slice(0, 5));
                setTopProducts(allProds.slice(0, 3));
                setPendingOrders(pendingRes.pagination?.total ?? 0);
                const msgs = msgsRes.data || [];
                setUnreadMessages(msgs.filter((m: any) => !m.is_read).length);
            } catch (e) { console.error(e); }
        };
        loadStats();
    }, []);

    const toggleSidebarCollapsed = () => {
        setSidebarCollapsed(prev => {
            const next = !prev;
            localStorage.setItem('adminSidebarCollapsed', String(next));
            return next;
        });
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <AdminGuard>
            <div className="min-h-screen bg-[#FAF9F6] flex">

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] lg:hidden"
                        />
                    )}
                </AnimatePresence>

                {/* Sidebar */}
                <aside className={cn(
                    "bg-white border-r border-gray-100 flex flex-col fixed h-full left-0 top-0 shadow-xl z-[100]",
                    "transition-all duration-300 ease-in-out",
                    sidebarCollapsed ? "lg:w-16" : "lg:w-80",
                    isSidebarOpen ? "translate-x-0 w-80" : "-translate-x-full lg:translate-x-0"
                )}>
                    {/* Header */}
                    <div className={cn(
                        "border-b border-gray-50 flex items-center transition-all duration-300",
                        sidebarCollapsed ? "p-4 justify-center" : "p-8 lg:p-10 justify-between"
                    )}>
                        {sidebarCollapsed ? (
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold ring-4 ring-primary/10 text-white">V</div>
                        ) : (
                            <div>
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold ring-4 ring-primary/10 text-white">V</div>
                                    <h2 className="text-xl font-sans font-light tracking-tight text-gray-900">VITASILK</h2>
                                </div>
                                <p className="text-[8px] uppercase tracking-[0.5em] text-gray-400 font-bold">Administration</p>
                            </div>
                        )}
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-primary transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className={cn("flex-1 overflow-y-auto scrollbar-hide transition-all duration-300", sidebarCollapsed ? "py-4 px-2" : "py-8 px-6")}>
                        <div className={cn(sidebarCollapsed ? "space-y-1" : "space-y-10")}>
                            {menuGroups.map((group, idx) => {
                                const visibleItems = group.items.filter(item => {
                                    if (userData?.role === 'provider' && !['products', 'categories'].includes(item.id)) return false;
                                    return true;
                                });
                                if (visibleItems.length === 0) return null;
                                return (
                                    <div key={idx} className={cn(sidebarCollapsed ? "" : "space-y-4")}>
                                        {!sidebarCollapsed && (
                                            <h3 className="px-4 text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-3">{group.title}</h3>
                                        )}
                                        <div className="space-y-1">
                                            {visibleItems.map((item) => (
                                                <button
                                                    key={item.id}
                                                    title={sidebarCollapsed ? item.label : undefined}
                                                    onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                                                    className={cn(
                                                        "w-full flex items-center transition-all duration-300 group relative rounded-lg",
                                                        sidebarCollapsed ? "justify-center px-2 py-3" : "justify-between px-4 py-3",
                                                        activeTab === item.id
                                                            ? `bg-white shadow-sm border border-gray-100 ${item.color}`
                                                            : "text-gray-500 hover:text-gray-900 hover:bg-white/60"
                                                    )}
                                                >
                                                    <div className={cn("flex items-center", sidebarCollapsed ? "" : "space-x-4")}>
                                                        <div className={cn("p-1.5 rounded-md transition-colors", activeTab === item.id ? item.bg : "group-hover:bg-gray-100/50")}>
                                                            <item.icon size={16} strokeWidth={activeTab === item.id ? 2 : 1.5} className={activeTab === item.id ? item.color : "text-gray-400 group-hover:text-gray-600"} />
                                                        </div>
                                                        {!sidebarCollapsed && <span className="text-xs font-semibold tracking-wide">{item.label}</span>}
                                                    </div>
                                                    {!sidebarCollapsed && (
                                                        <ChevronRight size={14} className={cn("transition-all duration-300 opacity-0 group-hover:opacity-100", activeTab === item.id ? "opacity-100" : "-translate-x-2")} />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </nav>

                    {/* Footer */}
                    <div className={cn("border-t border-gray-100 bg-gray-50/50 space-y-2 transition-all duration-300", sidebarCollapsed ? "p-2" : "p-6")}>
                        <button
                            onClick={() => router.push('/')}
                            title={sidebarCollapsed ? "Visiter le Site" : undefined}
                            className={cn("w-full flex items-center bg-white rounded-lg shadow-sm border border-gray-100 text-gray-700 hover:text-primary transition-all group", sidebarCollapsed ? "justify-center p-3" : "space-x-4 px-4 py-3")}
                        >
                            <Home size={16} strokeWidth={1.5} className="text-primary group-hover:scale-110 transition-transform flex-shrink-0" />
                            {!sidebarCollapsed && <span className="text-xs font-bold">Visiter le Site</span>}
                        </button>
                        <button
                            onClick={handleLogout}
                            title={sidebarCollapsed ? "Déconnexion" : undefined}
                            className={cn("w-full flex items-center text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all group", sidebarCollapsed ? "justify-center p-3" : "space-x-4 px-4 py-3")}
                        >
                            <LogOut size={16} strokeWidth={1.5} className="flex-shrink-0" />
                            {!sidebarCollapsed && <span className="text-xs font-bold">Déconnexion</span>}
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className={cn("flex-1 min-h-screen w-full overflow-x-hidden transition-all duration-300", sidebarCollapsed ? "lg:ml-16" : "lg:ml-80")}>
                    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-12 py-4 lg:py-6 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden p-2 -ml-2 text-gray-900 hover:text-primary transition-colors"
                            >
                                <Menu size={20} />
                            </button>
                            <button
                                onClick={toggleSidebarCollapsed}
                                className="hidden lg:flex p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-gray-50"
                                title={sidebarCollapsed ? "Agrandir le menu" : "Réduire le menu"}
                            >
                                <Menu size={18} />
                            </button>
                            <div className="flex items-center space-x-2 lg:space-x-4 text-[9px] lg:text-[10px] uppercase tracking-widest text-gray-400 font-medium">
                                <span className="hidden sm:inline">Admin</span>
                                <span className="text-gray-200 hidden sm:inline">/</span>
                                <span className="text-gray-900 font-bold">{currentItem?.label}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 lg:space-x-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-900 leading-none mb-1">Directeur</p>
                                <p className="text-[9px] text-gray-400 font-medium">{userData?.role === 'super-admin' ? 'Super Administrateur' : userData?.role === 'provider' ? 'Organisateur' : 'Administrateur'}</p>
                            </div>
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-primary font-bold shadow-inner text-xs lg:text-base">
                                {userData?.name?.slice(0, 2).toUpperCase() || 'AD'}
                            </div>
                        </div>
                    </header>

                    <div className="p-4 lg:p-12 max-w-7xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'dashboard' && (
                                    <div className="space-y-8">

                                        {/* Greeting */}
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">
                                                    {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                                </p>
                                                <h2 className="text-2xl font-sans font-light text-gray-900">
                                                    Bonjour, <span className="font-medium">{userData?.name?.split(' ')[0]}</span>
                                                </h2>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold hidden sm:block">Système actif</span>
                                            </div>
                                        </div>

                                        {/* Action Required Strip */}
                                        {(pendingOrders > 0 || unreadMessages > 0 || lowStock.length > 0) && (
                                            <div className="bg-amber-50 border border-amber-200/60 rounded-xl px-5 py-4 flex flex-wrap gap-3 items-center">
                                                <div className="flex items-center gap-2 mr-1">
                                                    <AlertTriangle size={13} className="text-amber-500" />
                                                    <span className="text-[10px] uppercase tracking-widest font-bold text-amber-700">À traiter</span>
                                                </div>
                                                {pendingOrders > 0 && (
                                                    <button
                                                        onClick={() => setActiveTab('orders')}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors"
                                                    >
                                                        <Package size={11} />
                                                        {pendingOrders} commande{pendingOrders > 1 ? 's' : ''} en attente
                                                    </button>
                                                )}
                                                {unreadMessages > 0 && (
                                                    <button
                                                        onClick={() => setActiveTab('messages')}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors"
                                                    >
                                                        <Mail size={11} />
                                                        {unreadMessages} message{unreadMessages > 1 ? 's' : ''} non lu{unreadMessages > 1 ? 's' : ''}
                                                    </button>
                                                )}
                                                {lowStock.length > 0 && (
                                                    <button
                                                        onClick={() => setActiveTab('products')}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 rounded-lg text-xs font-bold text-red-700 hover:bg-red-50 transition-colors"
                                                    >
                                                        <AlertTriangle size={11} />
                                                        {lowStock.length} produit{lowStock.length > 1 ? 's' : ''} stock faible
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        {/* KPI Cards */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            {[
                                                { label: "Chiffre d'affaires", value: stats.sales, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
                                                { label: "Commandes totales", value: stats.orders.toString(), icon: Package, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
                                                { label: "Membres inscrits", value: stats.customers.toString(), icon: Users, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
                                            ].map((stat, i) => (
                                                <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                                    <div className={`w-9 h-9 rounded-lg ${stat.bg} border ${stat.border} flex items-center justify-center mb-4`}>
                                                        <stat.icon size={16} className={stat.color} />
                                                    </div>
                                                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">{stat.label}</p>
                                                    <p className="text-3xl font-sans font-medium text-gray-900 tracking-tight">{stat.value}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Main Grid */}
                                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                                            {/* Activity Feed */}
                                            <div className="xl:col-span-2 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                                                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                                                            <TrendingUp size={14} className="text-blue-500" />
                                                        </div>
                                                        <h3 className="text-sm font-bold text-gray-900">Activité récente</h3>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">En direct</span>
                                                    </div>
                                                </div>
                                                <div className="divide-y divide-gray-50">
                                                    {recentLogs.map((log) => (
                                                        <div key={log.id} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors">
                                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                                                                <Settings size={13} strokeWidth={1.5} className="text-gray-500" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-baseline gap-2 mb-0.5">
                                                                    <span className="text-xs font-bold text-gray-900">{log.admin_name}</span>
                                                                    <span className="text-[10px] text-gray-400">{log.created_at ? new Date(log.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                                                                </div>
                                                                <p className="text-[12px] text-gray-500 leading-relaxed truncate">{log.details}</p>
                                                            </div>
                                                            <span className="text-[8px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md shrink-0">
                                                                {log.action.split('_')[0]}
                                                            </span>
                                                        </div>
                                                    ))}
                                                    {recentLogs.length === 0 && (
                                                        <div className="py-12 text-center text-gray-400 text-sm">Aucune activité enregistrée</div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Right Column */}
                                            <div className="space-y-6">

                                                {/* Low Stock */}
                                                <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                                                    <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                                                        <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                                                            <AlertTriangle size={14} className="text-red-500" />
                                                        </div>
                                                        <h3 className="text-sm font-bold text-gray-900">Stock faible</h3>
                                                        {lowStock.length > 0 && (
                                                            <span className="ml-auto text-[9px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{lowStock.length}</span>
                                                        )}
                                                    </div>
                                                    <div className="divide-y divide-gray-50">
                                                        {lowStock.map((prod) => (
                                                            <div key={prod.id} className="flex items-center gap-3 px-5 py-3">
                                                                <div className="w-8 h-8 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                                                                    {prod.images?.[0] ? <img src={imageUrl(prod.images[0])} alt="" className="w-full h-full object-cover" /> : <Package size={12} className="m-2 text-gray-400" />}
                                                                </div>
                                                                <p className="text-xs font-medium text-gray-800 flex-1 truncate">{prod.name}</p>
                                                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md shrink-0 ${prod.stock === 0 ? 'bg-red-100 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                                                                    {prod.stock === 0 ? 'Épuisé' : `${prod.stock} restant`}
                                                                </span>
                                                            </div>
                                                        ))}
                                                        {lowStock.length === 0 && (
                                                            <p className="text-xs text-gray-400 text-center py-6">Tous les stocks sont sains</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Top Products */}
                                                <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
                                                    <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                                                        <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                                                            <TrendingUp size={14} className="text-amber-500" />
                                                        </div>
                                                        <h3 className="text-sm font-bold text-gray-900">Produits récents</h3>
                                                    </div>
                                                    <div className="divide-y divide-gray-50">
                                                        {topProducts.map((prod, idx) => (
                                                            <div key={prod.id} className="flex items-center gap-3 px-5 py-3">
                                                                <span className="text-sm font-black text-gray-200 w-4 shrink-0">{idx + 1}</span>
                                                                <div className="w-9 h-9 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                                                                    {prod.images?.[0] ? <img src={imageUrl(prod.images[0])} alt="" className="w-full h-full object-cover" /> : <Package size={14} className="m-2.5 text-gray-400" />}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-xs font-bold text-gray-900 truncate">{prod.name}</p>
                                                                    <p className="text-[10px] text-gray-400">{prod.price} DH</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {topProducts.length === 0 && (
                                                            <p className="text-xs text-gray-400 text-center py-6">Aucun produit</p>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'orders' && <OrderManager />}
                                {activeTab === 'products' && <ProductManager />}
                                {activeTab === 'users' && <UserManager />}
                                {activeTab === 'categories' && <CategoryManager />}
                                {activeTab === 'messages' && <MessageManager />}
                                {activeTab === 'subscribers' && <SubscriberManager />}
                                {activeTab === 'comments' && <CommentManager />}
                                {activeTab === 'promotions' && <PromotionManager />}
                                {activeTab === 'analytics' && <AnalyticsManager />}
{activeTab === 'concierge' && <Conciergerie />}
                                {activeTab === 'gifts' && <GiftSystemManager />}
                                {activeTab === 'events' && <EventManager />}
                            </motion.div>

                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </AdminGuard>
    );
};

export default AdminDashboard;
