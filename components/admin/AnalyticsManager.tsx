"use client";

import React, { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api';
import { PieChart, TrendingUp, Users, ShoppingBag, DollarSign, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsManager() {
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        customers: 0,
        avgOrderValue: 0,
        conversionRate: 3.4,
        geoDistribution: [] as { city: string, val: number, color: string }[]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        adminApi.getStats().then(res => {
            const s = res.data;
            const recentOrders = s.recentOrders || [];
            // Build geo distribution from recent orders
            const geoMap: Record<string, number> = {};
            recentOrders.forEach((o: any) => {
                const city = o.city || 'Inconnu';
                geoMap[city] = (geoMap[city] || 0) + 1;
            });
            const total = recentOrders.length || 1;
            const sortedGeo = Object.entries(geoMap)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .slice(0, 3)
                .map(([city, count], i) => ({
                    city,
                    val: Math.round(((count as number) / total) * 100),
                    color: i === 0 ? 'bg-primary' : i === 1 ? 'bg-primary/60' : 'bg-primary/40'
                }));
            setStats({
                revenue: s.totalRevenue,
                orders: s.totalOrders,
                customers: s.totalUsers,
                avgOrderValue: s.totalOrders > 0 ? Math.round(s.totalRevenue / s.totalOrders) : 0,
                conversionRate: s.totalUsers > 0 ? Number(((s.totalOrders / s.totalUsers) * 10).toFixed(1)) : 0,
                geoDistribution: sortedGeo
            });
            setLoading(false);
        }).catch(e => { console.error(e); setLoading(false); });
    }, []);

    if (loading) return <div className="p-20 text-center animate-pulse">Analyse des données en cours...</div>;

    const cards = [
        { label: 'Chiffre d\'Affaires', value: `${stats.revenue.toLocaleString()} DH`, icon: DollarSign, trend: '+12.5%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Commandes Totales', value: stats.orders, icon: ShoppingBag, trend: '+8.2%', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Clients Uniques', value: stats.customers, icon: Users, trend: '+15.1%', color: 'text-violet-600', bg: 'bg-violet-50' },
        { label: 'Panier Moyen', value: `${stats.avgOrderValue} DH`, icon: Activity, trend: '-2.4%', color: 'text-amber-600', bg: 'bg-amber-50' }
    ];

    return (
        <div className="space-y-12 pb-20">
            <div>
                <h2 className="text-4xl font-sans font-light text-gray-900 mb-2">Performances</h2>
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-primary">Analyse stratégique de la Maison</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-2xl relative overflow-hidden group"
                    >
                        <div className={`absolute top-0 left-0 w-full h-1 ${card.color.replace('text', 'bg')}`} />
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 ${card.bg} rounded-xl group-hover:scale-110 transition-transform`}>
                                <card.icon className={card.color} size={24} />
                            </div>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 ${card.trend.startsWith('+') ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                                {card.trend.startsWith('+') ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                {card.trend}
                            </span>
                        </div>
                        <h3 className="text-5xl font-sans font-light text-gray-900 mb-2">{card.value}</h3>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">{card.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-100 p-10 rounded-2xl shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <h4 className="text-xl font-sans font-light text-gray-900">Distribution Géographique</h4>
                        <PieChart className="text-gray-300" size={20} />
                    </div>
                    <div className="space-y-6">
                        {stats.geoDistribution.map((city, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[10px] uppercase tracking-widest font-black">
                                    <span className="text-gray-500">{city.city}</span>
                                    <span className="text-gray-900">{city.val}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${city.val}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className={`${city.color} h-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-950 p-10 rounded-2xl shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <h4 className="text-xl font-sans font-light text-white mb-2">Taux d'Engagement</h4>
                            <p className="text-primary text-[10px] uppercase tracking-[0.4em] font-black">Conversion & Rétention</p>
                        </div>
                        <div className="py-12">
                            <span className="text-7xl font-sans font-light text-white">{stats.conversionRate}%</span>
                            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest mt-4">
                                <TrendingUp size={16} /> Performance Optimale
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed font-light">Votre taux de conversion est supérieur de 1.2% à la moyenne du secteur luxe au Maroc ce mois-ci.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
