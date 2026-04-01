"use client";

import React, { useState, useEffect } from 'react';
import AdminGuard from '@/components/AdminGuard';
import { LayoutDashboard, Package, Users, Tag, Settings, LogOut, ChevronRight, CreditCard, MessageSquare, Mail, Home, AlertTriangle, TrendingUp, Ticket, PieChart, Gem, StickyNote, Smartphone, Gift, Zap, Menu, X } from 'lucide-react';

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
import AdminNotes from '@/components/admin/AdminNotes';
import Conciergerie from '@/components/admin/Conciergerie';
import GiftSystemManager from '@/components/admin/GiftSystemManager';
import EventManager from '@/components/admin/EventManager';
import { adminApi, productsApi, imageUrl } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const AdminDashboard = () => {
    const { userData, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [stats, setStats] = useState({ sales: '0 DH', orders: 0, customers: 0 });
    const [recentLogs, setRecentLogs] = useState<any[]>([]);
    const [lowStock, setLowStock] = useState<any[]>([]);
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [currentTime, setCurrentTime] = useState(new Date());
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
                { id: 'orders', label: 'Commandes', icon: Package, color: 'text-amber-500', bg: 'bg-amber-500/10' },
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
                { id: 'notes', label: 'Admin Notes', icon: StickyNote, color: 'text-gray-950', bg: 'bg-gray-100' },
            ]
        },
        {
            title: "Croissance",
            items: [
                { id: 'promotions', label: 'Offres & Codes', icon: Ticket, color: 'text-pink-500', bg: 'bg-pink-500/10' },
                { id: 'analytics', label: 'Performances', icon: PieChart, color: 'text-violet-500', bg: 'bg-violet-500/10' },
                { id: 'gifts', label: 'Gestion des Cadeaux', icon: Gift, color: 'text-amber-600', bg: 'bg-amber-50' },
                { id: 'events', label: 'Événements & Roue', icon: Zap, color: 'text-primary', bg: 'bg-primary/10' },
            ]
        }

    ];

    const currentItem = [...menuGroups[0].items, ...menuGroups[1].items, ...menuGroups[2].items].find(item => item.id === activeTab);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        adminApi.getLogs(1).then(res => setRecentLogs(res.data)).catch(console.error);
    }, []);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const [statsRes, prodsRes] = await Promise.all([
                    adminApi.getStats(),
                    productsApi.getAll({ limit: 50 })
                ]);
                const s = statsRes.data;
                setStats({
                    sales: `${s.totalRevenue.toLocaleString()} DH`,
                    orders: s.totalOrders,
                    customers: s.totalUsers
                });
                const allProds = prodsRes.data;
                setLowStock(allProds.filter(p => p.stock < 10).slice(0, 5));
                setTopProducts(allProds.slice(0, 3));
            } catch (e) { console.error(e); }
        };
        loadStats();
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <AdminGuard>
            <div className="min-h-screen bg-[#FAF9F6] flex">
                {/* Custom Clock Component */}
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-white/40 backdrop-blur-xl border border-white/20 px-4 lg:px-6 py-2 lg:py-3 shadow-2xl rounded-full hidden md:flex items-center gap-3 lg:gap-4 whitespace-nowrap">
                    <span className="text-sm lg:text-xl font-sans font-light text-gray-900 tracking-widest">
                        {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                </div>

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
                    "w-80 bg-white border-r border-gray-100 flex flex-col fixed h-full left-0 top-0 shadow-xl transition-transform duration-500 ease-in-out z-[100]",
                    "lg:translate-x-0",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}>
                    <div className="p-8 lg:p-10 border-b border-gray-50 flex items-center justify-between">
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold ring-4 ring-primary/10 text-white">V</div>
                                <h2 className="text-xl font-sans font-light tracking-tight text-gray-900">VITASILK</h2>
                            </div>
                            <p className="text-[8px] uppercase tracking-[0.5em] text-gray-400 font-bold">Administration de Luxe</p>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-primary transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-8 px-6 scrollbar-hide">
                        <div className="space-y-10">
                            {menuGroups.map((group, idx) => {
                                const visibleItems = group.items.filter(item => {
                                    if (userData?.role === 'provider' && !['products', 'categories'].includes(item.id)) return false;
                                    return true;
                                });

                                if (visibleItems.length === 0) return null;

                                return (
                                <div key={idx} className="space-y-4">
                                    <h3 className="px-4 text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-3">{group.title}</h3>
                                    <div className="space-y-1.5">
                                        {visibleItems.map((item) => (
                                                <button
                                                    key={item.id}
                                                    onClick={() => {
                                                        setActiveTab(item.id);
                                                        setIsSidebarOpen(false);
                                                    }}
                                                    className={cn(
                                                        "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 group relative",
                                                        activeTab === item.id
                                                            ? `bg-white shadow-sm border border-gray-100 ${item.color}`
                                                            : "text-gray-500 hover:text-gray-900 hover:bg-white/60"
                                                    )}
                                                >
                                                    <div className="flex items-center space-x-4">
                                                        <div className={cn("p-1.5 rounded-md transition-colors", activeTab === item.id ? item.bg : "group-hover:bg-gray-100/50")}>
                                                            <item.icon size={16} strokeWidth={activeTab === item.id ? 2 : 1.5} className={activeTab === item.id ? item.color : "text-gray-400 group-hover:text-gray-600"} />
                                                        </div>
                                                        <span className="text-xs font-semibold tracking-wide">{item.label}</span>
                                                    </div>
                                                    <ChevronRight
                                                        size={14}
                                                        className={cn(
                                                            "transition-all duration-300 opacity-0 group-hover:opacity-100",
                                                            activeTab === item.id ? "opacity-100 translate-x-0" : "-translate-x-2"
                                                        )}
                                                    />
                                                </button>
                                            ))}
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                    </nav>

                    <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-2">
                        <button
                            onClick={() => router.push('/')}
                            className="w-full flex items-center space-x-4 px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-100 text-gray-700 hover:text-primary transition-all group"
                        >
                            <Home size={16} strokeWidth={1.5} className="text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold">Visiter le Site</span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-4 px-4 py-3 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all group"
                        >
                            <LogOut size={16} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-xs font-bold">Déconnexion</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 lg:ml-80 min-h-screen w-full overflow-x-hidden">
                    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-12 py-4 lg:py-6 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden p-2 -ml-2 text-gray-900 hover:text-primary transition-colors"
                            >
                                <Menu size={20} />
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
                                    <div className="space-y-12">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                            {[
                                                { label: "Ventes Maison", value: stats.sales, trend: "À jour", icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" },
                                                { label: "Commandes", value: stats.orders.toString(), trend: "Total", icon: Package, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" },
                                                { label: "Membres", value: stats.customers.toString(), trend: "Inscrits", icon: Users, color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-100" }
                                            ].map((stat, i) => (
                                                <div key={i} className="bg-white p-6 lg:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                                                    <div className="flex justify-between items-start mb-4 lg:mb-6">
                                                        <div className={`p-3 lg:p-4 rounded-xl ${stat.bg} ${stat.color} border ${stat.border}`}>
                                                            <stat.icon size={24} strokeWidth={1.5} className="w-5 h-5 lg:w-6 lg:h-6" />
                                                        </div>
                                                        <span className="text-[8px] lg:text-[9px] uppercase tracking-widest font-bold text-gray-400 bg-gray-50 px-2 lg:px-3 py-1 border border-gray-100 rounded-full">{stat.trend}</span>
                                                    </div>
                                                    <p className="text-[10px] lg:text-xs font-semibold text-gray-400 mb-1">{stat.label}</p>
                                                    <h3 className="text-2xl lg:text-3xl font-sans font-medium text-gray-900 tracking-tight">{stat.value}</h3>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                            {/* Left Column: Activity & Low Stock */}
                                            <div className="xl:col-span-2 space-y-8">
                                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                                                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                                                <TrendingUp size={16} className="text-blue-500" />
                                                            </div>
                                                            <h3 className="text-sm font-bold text-gray-900">Activité en direct</h3>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Synchronisé</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        {recentLogs.map((log) => (
                                                            <div key={log.id} className="p-4 rounded-xl bg-gray-50/50 border border-gray-100 flex items-start gap-4 hover:shadow-sm transition-all">
                                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shrink-0 border border-gray-100 shadow-sm">
                                                                    <Settings size={16} strokeWidth={1.5} />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="text-xs text-gray-900 font-bold truncate">{log.admin_name}</span>
                                                                        <span className="text-[10px] text-gray-400 font-medium">• {log.created_at ? new Date(log.created_at).toLocaleTimeString('fr-FR') : ''}</span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-600 leading-relaxed">{log.details}</p>
                                                                </div>
                                                                <span className="text-[8px] uppercase font-bold tracking-[0.1em] px-2 py-1 bg-white text-gray-500 rounded-md border border-gray-200 shadow-sm">
                                                                    {log.action.split('_')[0]}
                                                                </span>
                                                            </div>
                                                        ))}
                                                        {recentLogs.length === 0 && (
                                                            <div className="py-12 text-center text-gray-400 text-sm font-medium">Aucune activité enregistrée</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Column: Top Products & Warnings */}
                                            <div className="space-y-8">
                                                {/* Low Stock Warning */}
                                                <div className="bg-red-50 rounded-2xl border border-red-100 shadow-sm p-6 relative overflow-hidden">
                                                    <div className="absolute -right-4 -top-4 text-red-100 rotate-12">
                                                        <AlertTriangle size={100} strokeWidth={1} />
                                                    </div>
                                                    <div className="relative z-10">
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                                                                <AlertTriangle size={16} className="text-red-600" />
                                                            </div>
                                                            <h3 className="text-sm font-bold text-red-900">Stock Faible</h3>
                                                        </div>
                                                        <div className="space-y-3">
                                                            {lowStock.map((prod) => (
                                                                <div key={prod.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-red-100/50">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-8 h-8 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                                                                            {prod.images?.[0] ? <img src={imageUrl(prod.images[0])} alt="" className="w-full h-full object-cover" /> : <Package size={14} className="m-2 text-gray-400" />}
                                                                        </div>
                                                                        <span className="text-xs font-bold text-gray-800 line-clamp-1">{prod.name}</span>
                                                                    </div>
                                                                    <span className="text-[10px] font-black text-red-600 bg-red-50 px-2 py-1 rounded-md">{prod.stock} restant</span>
                                                                </div>
                                                            ))}
                                                            {lowStock.length === 0 && <p className="text-xs text-red-700/60 font-medium pb-2">Tous les stocks sont à des niveaux sains.</p>}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Top Products */}
                                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                                    <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                                                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                                                            <TrendingUp size={16} className="text-amber-500" />
                                                        </div>
                                                        <h3 className="text-sm font-bold text-gray-900">Meilleures Ventes</h3>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {topProducts.map((prod, idx) => (
                                                            <div key={prod.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                                                                <span className="text-lg font-black text-gray-200 w-4">{idx + 1}</span>
                                                                <div className="w-10 h-10 bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm shrink-0">
                                                                    {prod.images?.[0] ? <img src={imageUrl(prod.images[0])} alt="" className="w-full h-full object-cover" /> : <Package size={16} className="m-3 text-gray-400" />}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-xs font-bold text-gray-900 line-clamp-1">{prod.name}</p>
                                                                    <p className="text-[10px] text-gray-500 font-medium">{prod.price} DH</p>
                                                                </div>
                                                            </div>
                                                        ))}
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
                                {activeTab === 'notes' && <AdminNotes />}
                            </motion.div>

                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </AdminGuard>
    );
};

export default AdminDashboard;
