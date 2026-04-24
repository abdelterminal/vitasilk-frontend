"use client";

import React, { useState, useEffect } from 'react';
import { subscribersApi, type Subscriber } from '@/lib/api';
import { Mail, Trash2, Search, Download, CheckCircle, Globe, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

const SubscriberManager = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

    useEffect(() => {
        subscribersApi.getAll()
            .then(res => setSubscribers(res.data || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const deleteSubscriber = async (id: number) => {
        try {
            await subscribersApi.delete(id);
            setSubscribers(prev => prev.filter(s => s.id !== id));
            setDeleteConfirmId(null);
        } catch (e) { console.error(e); }
    };

    const escapeCSV = (val: string) => `"${val.replace(/"/g, '""')}"`;

    const downloadCSV = () => {
        const headers = [escapeCSV('Email'), escapeCSV("Date d'inscription")];
        const rows = subscribers.map(sub => [
            escapeCSV(sub.email || ''),
            escapeCSV(sub.created_at ? new Date(sub.created_at).toLocaleString('fr-FR') : 'N/A'),
        ]);

        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'vitasilk_subscribers.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const filteredSubscribers = subscribers.filter(sub =>
        (sub.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-32 space-y-6">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold animate-pulse">Consultation du Carnet d'Adresses Princier...</p>
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="bg-white p-12 border border-gray-100 shadow-sm relative overflow-hidden flex justify-between items-end">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] luxury-text text-[10rem] pointer-events-none select-none">Inscrits</div>
                <div>
                    <h2 className="text-4xl font-sans font-light tracking-tight text-gray-900 mb-2">Ambassadeurs Newsletter</h2>
                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Votre liste d'exception pour les annonces Royales</p>
                </div>
                <button
                    onClick={downloadCSV}
                    className="relative z-10 px-8 py-4 bg-gray-950 text-white text-[10px] uppercase font-black tracking-widest hover:bg-primary transition-all flex items-center gap-3 shadow-xl group"
                >
                    <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
                    Exporter la Liste (CSV)
                </button>
            </div>

            <div className="bg-white p-8 border border-gray-100 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Filtrer les ambassadeurs par email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-transparent focus:bg-white focus:border-primary/20 transition-all text-sm outline-none rounded-sm"
                    />
                </div>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-50">
                    {filteredSubscribers.map((sub) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            key={sub.id}
                            className="bg-white p-8 group hover:bg-[#FAF9F6] transition-all relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-all" />
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-10 h-10 bg-gray-50 text-primary border border-gray-100 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                    <Mail size={16} />
                                </div>
                                {deleteConfirmId === sub.id ? (
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => setDeleteConfirmId(null)} className="text-[8px] uppercase font-black text-gray-400 hover:text-gray-600">Annuler</button>
                                        <button onClick={() => deleteSubscriber(sub.id as number)} className="text-[8px] uppercase font-black text-red-500 hover:text-red-700">Retirer</button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setDeleteConfirmId(sub.id as number)}
                                        className="p-3 text-gray-300 hover:text-red-500 transition-colors"
                                        title="Retirer de la liste"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                            <h4 className="text-sm font-bold text-gray-900 mb-2 truncate group-hover:text-primary transition-colors">{sub.email}</h4>
                            <div className="flex items-center gap-2 text-[9px] text-gray-400 font-black uppercase tracking-widest">
                                <CheckCircle size={10} className="text-green-500" /> Confirmed Subscriber
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                <span className="text-[8px] text-gray-300 font-medium uppercase tracking-widest flex items-center gap-1.5 align-middle">
                                    Inscrit le {sub.created_at ? new Date(sub.created_at).toLocaleDateString() : 'N/A'}
                                </span>
                                <Globe size={12} className="text-gray-100 group-hover:text-primary/10 transition-colors" />
                            </div>
                        </motion.div>
                    ))}

                    {filteredSubscribers.length === 0 && (
                        <div className="col-span-full py-40 text-center bg-white">
                            <Mail className="mx-auto text-gray-50 mb-8" size={80} strokeWidth={0.5} />
                            <h3 className="text-xl font-sans font-light text-gray-300 ">Aucun abonné trouvé dans ce registre</h3>
                            <button onClick={() => setSearchTerm('')} className="mt-8 text-primary text-[10px] uppercase font-black tracking-widest border-b border-primary/20 pb-1">Retirer le filtre</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubscriberManager;
