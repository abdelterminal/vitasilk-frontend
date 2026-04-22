"use client";

import React, { useState, useEffect } from 'react';
import { reviewsApi, imageUrl, type Review } from '@/lib/api';
import { MessageSquare, Trash2, Search, Star, User, Package, Calendar, ExternalLink, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type Comment = Review & { product_name?: string; product_images?: string };

export default function CommentManager() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        reviewsApi.getAll()
            .then(res => setComments(res.data.data || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const deleteComment = async (id: number, author: string) => {
        if (!confirm("Voulez-vous vraiment supprimer définitivement ce commentaire ?")) return;
        try {
            await reviewsApi.delete(id);
            setComments(prev => prev.filter(c => c.id !== id));
        } catch (e) {
            console.error(e);
        }
    };

    const filtered = comments.filter(c =>
        (c.user_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.product_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.comment || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-32 space-y-4">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold animate-pulse">Chargement de la modération...</p>
        </div>
    );

    return (
        <div className="space-y-10">
            {/* Control Bar */}
            <div className="bg-white p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <div className="relative w-full max-w-xl">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                    <input
                        type="text"
                        placeholder="Filtrer les archives des avis..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-gray-100 focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 text-sm transition-all rounded-sm"
                    />
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold leading-none mb-1">Total Archivé</p>
                        <p className="text-2xl font-sans font-light text-gray-900 leading-none">{comments.length}</p>
                    </div>
                    <div className="w-px h-10 bg-gray-100" />
                    <MessageSquare size={24} className="text-primary/20" />
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-6">
                {filtered.length > 0 ? filtered.map((c) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={c.id}
                        className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden group"
                    >
                        <div className="flex flex-col lg:flex-row items-stretch">
                            {/* Metadata Sidebar (on desktop) */}
                            <div className="lg:w-72 bg-gray-50/50 p-8 border-r border-gray-100 space-y-6 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary font-bold border border-primary/20 shadow-sm text-lg">
                                            {c.user_name?.charAt(0)?.toUpperCase() || 'A'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 leading-tight">{c.user_name}</p>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <div className="flex items-center gap-1 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={10} className={i < c.rating ? "fill-primary text-primary" : "text-gray-200"} />
                                            ))}
                                        </div>
                                        <p className="text-[9px] uppercase tracking-widest font-black text-primary">{c.rating} / 5 Étoiles</p>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                        <Calendar size={14} className="text-gray-300" />
                                        <span>{c.created_at ? new Date(c.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Date inconnue'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                        <Package size={14} className="text-gray-300" />
                                        <span className="truncate max-w-[160px]">{c.product_name}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content & Actions */}
                            <div className="flex-1 p-8 flex flex-col justify-between bg-white relative">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="flex-1">
                                        <div className="relative mb-6">
                                            <MessageSquare size={48} className="absolute -top-4 -left-4 text-gray-50/50 -z-0" />
                                            <p className="text-lg text-gray-800 leading-relaxed font-light relative z-10 italic">
                                                "{c.comment}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* Product Context Card */}
                                    <div className="w-full md:w-64 bg-gray-50 rounded-2xl p-4 border border-gray-100 shrink-0">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm shrink-0">
                                                {c.product_images ? (
                                                    <img src={imageUrl(c.product_images.split(',')[0])} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package className="w-full h-full p-2 text-gray-200" />
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-0.5">Produit</p>
                                                <p className="text-xs font-bold text-gray-900 truncate">{c.product_name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/50">
                                            <span className="text-xs font-black text-primary">—</span>
                                            <Link
                                                href={`/product/${c.product_id}`}
                                                target="_blank"
                                                className="p-1.5 text-gray-400 hover:text-primary transition-colors bg-white rounded-md border border-gray-100 shadow-sm"
                                            >
                                                <ExternalLink size={12} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[8px] uppercase tracking-widest font-black rounded-full border border-green-100 flex items-center gap-1.5">
                                            <UserCheck size={10} />
                                            Achat Vérifié
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => deleteComment(c.id, c.user_name)}
                                            className="flex items-center gap-2 px-6 py-2.5 text-red-500 hover:text-white hover:bg-red-500 transition-all rounded-xl text-[10px] uppercase tracking-widest font-black border border-red-100 hover:border-red-600 shadow-sm"
                                        >
                                            <Trash2 size={14} />
                                            <span>Supprimer</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )) : (
                    <div className="bg-white border border-gray-100 rounded-sm p-40 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center text-[10rem] font-black -rotate-12 pointer-events-none ">VIDE</div>
                        <MessageSquare className="mx-auto text-gray-100 mb-6" size={64} strokeWidth={1} />
                        <p className="text-xl font-light text-gray-400 ">Aucune interaction client trouvée</p>
                    </div>
                )}
            </div>
        </div>
    );
}
