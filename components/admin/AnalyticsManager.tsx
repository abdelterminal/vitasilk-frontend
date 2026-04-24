"use client";

import React, { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api';
import { PieChart, TrendingUp, Users, ShoppingBag, DollarSign, Activity, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AnalyticsManager() {
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        customers: 0,
        avgOrderValue: 0,
        ordersPerUser: 0,
        geoDistribution: [] as { city: string; count: number; val: number; color: string }[]
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        adminApi.getStats().then(res => {
            const s = res.data;
            const recentOrders = s.recentOrders || [];

            const geoMap: Record<string, number> = {};
            recentOrders.forEach((o: any) => {
                const city = o.city?.trim() || 'Inconnu';
                geoMap[city] = (geoMap[city] || 0) + 1;
            });
            const total = recentOrders.length || 1;
            const sortedGeo = Object.entries(geoMap)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .slice(0, 5)
                .map(([city, count], i) => ({
                    city,
                    count: count as number,
                    val: Math.round(((count as number) / total) * 100),
                    color: i === 0 ? 'bg-primary' : i === 1 ? 'bg-primary/70' : i === 2 ? 'bg-primary/50' : 'bg-primary/30'
                }));

            const avgOrderValue = s.totalOrders > 0 ? Math.round(s.totalRevenue / s.totalOrders) : 0;
            const ordersPerUser = s.totalUsers > 0
                ? Number((s.totalOrders / s.totalUsers).toFixed(2))
                : 0;

            setStats({
                revenue: s.totalRevenue,
                orders: s.totalOrders,
                customers: s.totalUsers,
                avgOrderValue,
                ordersPerUser,
                geoDistribution: sortedGeo
            });
        }).catch(e => {
            console.error(e);
            setError(true);
        }).finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-32 space-y-4">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold animate-pulse">Chargement des données...</p>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center p-32 space-y-4 text-center">
            <Activity size={40} className="text-gray-200" />
            <p className="text-gray-400 text-sm">Impossible de charger les données analytiques.</p>
        </div>
    );

    const cards = [
        { label: "Chiffre d'affaires", value: `${stats.revenue.toLocaleString()} DH`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
        { label: 'Commandes totales', value: stats.orders.toLocaleString(), icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
        { label: 'Clients inscrits', value: stats.customers.toLocaleString(), icon: Users, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
        { label: 'Panier moyen', value: `${stats.avgOrderValue.toLocaleString()} DH`, icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
    ];

    return (
        <div className="space-y-8 pb-20">
            <div>
                <h2 className="text-3xl font-sans font-light text-gray-900 mb-1">Performances</h2>
                <p className="text-[10px] uppercase tracking-[0.3em] font-black text-primary">Vue d'ensemble des données réelles</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {cards.map((card, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        key={i}
                        className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className={`w-9 h-9 rounded-lg ${card.bg} border ${card.border} flex items-center justify-center mb-4`}>
                            <card.icon className={card.color} size={16} />
                        </div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">{card.label}</p>
                        <p className="text-3xl font-sans font-light text-gray-900">{card.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Geo Distribution */}
                <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 mb-0.5">Répartition géographique</h4>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Basé sur les commandes récentes</p>
                        </div>
                        <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                            <MapPin size={14} className="text-gray-400" />
                        </div>
                    </div>

                    {stats.geoDistribution.length > 0 ? (
                        <div className="space-y-5">
                            {stats.geoDistribution.map((city, i) => (
                                <div key={i} className="space-y-1.5">
                                    <div className="flex justify-between text-[11px] font-bold">
                                        <span className="text-gray-600">{city.city}</span>
                                        <span className="text-gray-900">{city.count} commande{city.count > 1 ? 's' : ''} · {city.val}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${city.val}%` }}
                                            transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                                            className={`${city.color} h-full rounded-full`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <MapPin size={32} className="text-gray-100 mb-3" />
                            <p className="text-sm text-gray-400 font-light">Aucune donnée géographique disponible.</p>
                            <p className="text-[10px] text-gray-300 mt-1 uppercase tracking-widest font-bold">Les villes apparaîtront après les premières commandes</p>
                        </div>
                    )}
                </div>

                {/* Orders / Users Ratio */}
                <div className="bg-gray-950 rounded-xl p-8 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                        <div>
                            <h4 className="text-sm font-bold text-white mb-1">Ratio commandes / clients</h4>
                            <p className="text-[10px] text-primary uppercase tracking-widest font-bold">Commandes moyennes par client inscrit</p>
                        </div>

                        <div>
                            <span className="text-6xl font-sans font-light text-white">{stats.ordersPerUser}</span>
                            <p className="text-gray-500 text-[11px] font-light mt-2">
                                commande{stats.ordersPerUser !== 1 ? 's' : ''} en moyenne par client
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                            <div>
                                <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-1">Total commandes</p>
                                <p className="text-lg font-sans font-light text-white">{stats.orders.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-1">Total clients</p>
                                <p className="text-lg font-sans font-light text-white">{stats.customers.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
