"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Crown, MessageSquare, Phone, Mail, Clock, ShieldCheck, Gem, UserCheck, Search, TrendingUp } from 'lucide-react';
import { usersApi, ordersApi, type User, type Order } from '@/lib/api';
import Link from 'next/link';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

type EnrichedUser = User & {
    status: string;
    points: number;
    totalSpent: number;
    lastActive: string;
    loyaltyStamps: number;
    orderCount: number;
};

export default function Conciergerie() {
    const [vipCustomers, setVipCustomers] = useState<EnrichedUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [stats, setStats] = useState({ eliteCount: 0, totalPoints: 0 });

    useEffect(() => {
        const fetchVIPs = async () => {
            try {
                const [usersRes, ordersRes] = await Promise.all([
                    usersApi.getAll(1, 200),
                    ordersApi.getAll({ limit: 500 }),
                ]);

                const users = usersRes.data;
                const allOrders: Order[] = ordersRes.data;

                let totalGlobalPoints = 0;
                let eliteMembersCount = 0;

                const enriched: EnrichedUser[] = users.map((u) => {
                    const userOrders = allOrders.filter(o =>
                        o.user_email?.toLowerCase() === u.email?.toLowerCase()
                    );

                    const validOrders = userOrders.filter(o =>
                        o.status === 'delivered' || o.status === 'shipped' || o.status === 'processing'
                    );
                    const totalSpent = validOrders.reduce((acc, o) => acc + Number(o.total_price || 0), 0);
                    const points = userOrders.length * 150;
                    totalGlobalPoints += points;

                    let status = 'Silver';
                    if (totalSpent > 10000) { status = 'Elite'; eliteMembersCount++; }
                    else if (totalSpent > 5000) status = 'Diamond';
                    else if (totalSpent > 2500) status = 'Platinum';
                    else if (totalSpent > 1000) status = 'Gold';

                    const loyaltyStamps = Math.min(userOrders.length, 6);

                    let lastActive = 'Inconnu';
                    if (u.created_at) {
                        const d = new Date(u.created_at);
                        const now = new Date();
                        const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
                        if (diffDays === 0) lastActive = "Aujourd'hui";
                        else if (diffDays === 1) lastActive = 'Hier';
                        else lastActive = `Il y a ${diffDays} j.`;
                    }

                    return { ...u, status, points, totalSpent, lastActive, loyaltyStamps, orderCount: userOrders.length };
                });

                const sorted = enriched.sort((a, b) => b.totalSpent - a.totalSpent);
                setVipCustomers(sorted);
                setStats({ eliteCount: eliteMembersCount, totalPoints: totalGlobalPoints });
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchVIPs();
    }, []);

    const filtered = vipCustomers.filter(u =>
        (u.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (u.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="p-32 flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <div className="text-center animate-pulse text-gray-400 uppercase tracking-widest text-[10px] font-black">
                Ouverture du Salon VIP...
            </div>
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
            {/* Legend Header */}
            <div className="bg-gray-950 p-16 border border-white/10 shadow-2xl relative overflow-hidden rounded-[2rem]">
                <div className="absolute top-0 right-0 p-8 opacity-[0.05] luxury-text text-[12rem] pointer-events-none select-none text-white">VIP</div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-white">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary border border-primary/20">
                                <Crown size={24} />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-sans font-light !text-white tracking-tight">Espace Conciergerie</h2>
                        </div>
                        <p className="text-[11px] uppercase tracking-widest text-primary font-black">Gestion des Ambassadeurs Haute Fidélité</p>
                    </div>
                    <div className="flex gap-12 text-center border-t md:border-t-0 md:border-l border-white/10 pt-12 md:pt-0 md:pl-12">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Membres Elite</p>
                            <p className="text-3xl md:text-4xl font-sans font-light">{stats.eliteCount}</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Points Fidélité</p>
                            <p className="text-3xl md:text-4xl font-sans font-light">
                                {stats.totalPoints >= 1000 ? `${(stats.totalPoints / 1000).toFixed(1)}k` : stats.totalPoints}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* VIP Search */}
            <div className="relative max-w-2xl mx-auto -mt-10 z-20 px-4">
                <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Rechercher un membre distingué..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-8 py-6 bg-white border border-gray-100 shadow-2xl rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-gray-900"
                />
            </div>

            {/* VIP Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filtered.map((user) => (
                    <motion.div
                        layout
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group bg-white border border-gray-100 p-10 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 rounded-[2.5rem] relative overflow-hidden"
                    >
                        {/* Status Overlay */}
                        <div className="absolute top-0 right-0 p-8 flex flex-col items-end gap-2">
                            <div className={cn(
                                "px-4 py-1.5 rounded-full text-[10px] uppercase font-black tracking-widest flex items-center gap-2",
                                user.status === 'Diamond' ? 'bg-blue-50 text-blue-500 border border-blue-100' :
                                    user.status === 'Platinum' ? 'bg-indigo-50 text-indigo-500 border border-indigo-100' :
                                        user.status === 'Elite' ? 'bg-gray-900 text-white shadow-xl' :
                                            user.status === 'Gold' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                'bg-gray-50 text-gray-400 border border-gray-100'
                            )}>
                                {user.status === 'Elite' ? <Crown size={12} /> : <Star size={12} />}
                                {user.status} Member
                            </div>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Actif: {user.lastActive}</span>
                        </div>

                        <div className="flex items-start gap-8 mb-10">
                            <div className="relative shrink-0">
                                <div className="w-24 h-24 rounded-full bg-gray-50 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                                    {user.photo_url ? <img src={user.photo_url} alt="" className="w-full h-full object-cover" /> : <div className="text-3xl font-sans text-primary/20">{user.name?.charAt(0) || 'D'}</div>}
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-gray-100 shadow-lg rounded-full flex items-center justify-center text-primary">
                                    <ShieldCheck size={18} />
                                </div>
                            </div>
                            <div className="pt-2 min-w-0">
                                <h3 className="text-2xl font-sans font-bold text-gray-900 mb-2 truncate pr-32">{user.name || 'Hôte Distingué'}</h3>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-gray-400 font-medium lowercase flex items-center gap-2 truncate"><Mail size={12} className="shrink-0" /> {user.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-6 flex items-center gap-2">
                                <TrendingUp size={14} className="text-emerald-500" />
                                Analyse des Acquisitions
                            </p>
                            <div className="flex flex-col gap-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[9px] uppercase tracking-widest font-bold text-gray-500">Volume de Commandes</span>
                                        <span className="text-xs font-bold text-gray-900">{user.orderCount} Commandes</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((user.orderCount / 10) * 100, 100)}%` }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                </div>
                                <div className="bg-emerald-50/30 p-4 border border-emerald-100/50 rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                            <Gem size={14} />
                                        </div>
                                        <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-widest">Valeur Vie Client</span>
                                    </div>
                                    <span className="text-sm font-bold text-emerald-600">{user.totalSpent?.toLocaleString()} DH</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-black mb-1">Total Dépensé</p>
                                <p className="text-2xl font-sans font-light text-gray-900">{user.totalSpent?.toLocaleString() || 0} <span className="text-[10px] text-primary uppercase font-black tracking-widest ml-1">DH</span></p>
                            </div>
                            <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-black mb-1">Points Fidélité</p>
                                <p className="text-2xl font-sans font-light text-gray-900">{user.points?.toLocaleString() || 0} <span className="text-[10px] text-primary uppercase font-black tracking-widest ml-1">pts</span></p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                href={`/admin/chat?userId=${user.id}`}
                                className="flex-1 py-4 bg-gray-900 text-white text-[10px] uppercase font-black tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95"
                            >
                                <MessageSquare size={16} /> Envoyer Invitation
                            </Link>
                            <button className="px-6 py-4 bg-white border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20 transition-all rounded-2xl group shadow-sm">
                                <Star size={18} className="group-hover:fill-primary" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="py-40 text-center">
                    <Star className="mx-auto text-gray-100 mb-10" size={100} strokeWidth={0.5} />
                    <h3 className="text-2xl font-sans font-light text-gray-300 ">Aucun membre n'a encore atteint ce rang</h3>
                </div>
            )}
        </div>
    );
}
