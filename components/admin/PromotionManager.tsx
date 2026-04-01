"use client";

import React, { useState, useEffect } from 'react';
import { promotionsApi, type Promotion } from '@/lib/api';
import { Ticket, Plus, Trash2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromotionManager() {
    const [codes, setCodes] = useState<Promotion[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAdd, setShowAdd] = useState(false);
    const [newCode, setNewCode] = useState({
        code: '',
        discount_percentage: 0,
        expiryDate: '',
        max_uses: 100,
    });

    useEffect(() => {
        promotionsApi.getAll()
            .then(res => setCodes(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await promotionsApi.create({
                code: newCode.code.toUpperCase(),
                discount_percentage: newCode.discount_percentage,
                max_uses: newCode.max_uses,
                expires_at: newCode.expiryDate || undefined,
            });
            setCodes(prev => [...prev, res.data]);
            setShowAdd(false);
            setNewCode({ code: '', discount_percentage: 0, expiryDate: '', max_uses: 100 });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Supprimer ce code promo ?")) {
            await promotionsApi.delete(id);
            setCodes(prev => prev.filter(c => c.id !== id));
        }
    };

    if (loading) return <div className="p-20 text-center animate-pulse">Chargement des offres...</div>;

    return (
        <div className="space-y-8 pb-20">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-sans font-light text-gray-900 mb-2">Offres & Codes</h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black text-primary">Gestion de la stratégie commerciale</p>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className="px-8 py-4 bg-gray-900 text-white text-[10px] uppercase font-black tracking-widest hover:bg-black transition-all shadow-xl flex items-center gap-3 rounded-sm"
                >
                    <Plus size={16} /> Nouveau Code
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {codes.map((code) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={code.id}
                            className="bg-white border border-gray-100 p-8 relative group overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 rounded-xl"
                        >
                            <div className={`absolute top-0 right-0 w-2 h-full ${code.is_active ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-primary/5 transition-colors">
                                    <Ticket size={24} className="text-primary/40" />
                                </div>
                                <button
                                    onClick={() => handleDelete(code.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            <h3 className="text-2xl font-sans font-bold text-gray-900 mb-1 tracking-wider">{code.code}</h3>
                            <p className="text-[10px] uppercase tracking-widest text-primary font-black mb-6">
                                {code.discount_percentage}% de réduction
                            </p>

                            <div className="space-y-3 pt-6 border-t border-gray-50">
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                                    <span className="text-gray-400">Utilisations</span>
                                    <span className="text-gray-900">{code.usage_count} / {code.max_uses || '∞'}</span>
                                </div>
                                <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                                    <div
                                        className="bg-primary h-full transition-all duration-1000"
                                        style={{ width: `${Math.min((code.usage_count / (code.max_uses || 100)) * 100, 100)}%` }}
                                    />
                                </div>
                                {code.expires_at && (
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 pt-2">
                                        <Clock size={12} />
                                        <span>Expire: {new Date(code.expires_at).toLocaleDateString('fr-FR')}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal Ajout Code */}
            {showAdd && (
                <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white w-full max-w-lg p-12 shadow-2xl rounded-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-0" />
                        <h2 className="text-3xl font-sans font-light text-gray-900 mb-8 relative z-10">Créer une Offre</h2>

                        <form onSubmit={handleAdd} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Code Coupon</label>
                                <input
                                    required
                                    className="w-full p-4 bg-gray-50 border border-gray-100 focus:border-primary transition-all outline-none rounded-lg font-bold tracking-widest"
                                    placeholder="EX: VITA2026"
                                    value={newCode.code}
                                    onChange={e => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Réduction (%)</label>
                                    <input
                                        type="number" required min={1} max={100}
                                        className="w-full p-4 bg-gray-50 border border-gray-100 outline-none rounded-lg font-bold"
                                        value={newCode.discount_percentage}
                                        onChange={e => setNewCode({ ...newCode, discount_percentage: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Limite d'usage</label>
                                    <input
                                        type="number" required
                                        className="w-full p-4 bg-gray-50 border border-gray-100 outline-none rounded-lg font-bold"
                                        value={newCode.max_uses}
                                        onChange={e => setNewCode({ ...newCode, max_uses: Number(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-gray-400">Date d'Expiration (optionnel)</label>
                                <input
                                    type="date"
                                    className="w-full p-4 bg-gray-50 border border-gray-100 outline-none rounded-lg"
                                    value={newCode.expiryDate}
                                    onChange={e => setNewCode({ ...newCode, expiryDate: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-4 pt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowAdd(false)}
                                    className="flex-1 px-8 py-4 border border-gray-100 text-[10px] uppercase font-black tracking-widest hover:bg-gray-50 transition-all rounded-lg"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-8 py-4 bg-gray-900 text-white text-[10px] uppercase font-black tracking-widest hover:bg-black transition-all shadow-xl rounded-lg"
                                >
                                    Générer
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
