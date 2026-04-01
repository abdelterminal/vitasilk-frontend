"use client";

import React, { useState, useEffect } from 'react';
import { messagesApi } from '@/lib/api';
import { MessageSquare, Mail, Phone, Calendar, Trash2, Search, Filter, Globe, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MessageManager = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState<any>(null);

    useEffect(() => {
        messagesApi.getAll()
            .then(res => setMessages(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const deleteMessage = async (id: string) => {
        if (confirm("Voulez-vous supprimer ce message de vos archives ?")) {
            try {
                await messagesApi.delete(id);
                setMessages(prev => prev.filter(m => m.id !== id));
                if (selectedMessage?.id === id) setSelectedMessage(null);
            } catch (e) { console.error(e); }
        }
    };

    const filteredMessages = messages.filter(msg =>
        (msg.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (msg.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (msg.subject?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (msg.message?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-32 space-y-6">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold animate-pulse">Ouverture de la Correspondance...</p>
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="bg-white p-12 border border-gray-100 shadow-sm relative overflow-hidden flex justify-between items-end">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] luxury-text text-[10rem] pointer-events-none select-none">Messages</div>
                <div>
                    <h2 className="text-4xl font-sans font-light tracking-tight text-gray-900 mb-2">Correspondance Privée</h2>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Lien direct avec vos Ambassadeurs</p>
                </div>
            </div>

            <div className="bg-white p-8 border border-gray-100 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher dans les messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-transparent focus:bg-white focus:border-primary/20 transition-all text-sm outline-none rounded-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-12 xl:col-span-5 space-y-4">
                    <div className="bg-white border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                        {filteredMessages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => setSelectedMessage(msg)}
                                className={cn(
                                    "p-8 cursor-pointer transition-all duration-500 group relative",
                                    selectedMessage?.id === msg.id ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-gray-50/50"
                                )}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-sm font-black text-gray-950 uppercase tracking-widest truncate max-w-[150px]">{msg.name}</h4>
                                    <span className="text-[9px] text-gray-400 font-bold">{msg.created_at ? new Date(msg.created_at).toLocaleDateString('fr-FR') : 'Date inconnue'}</span>
                                </div>
                                <p className="text-[10px] text-primary font-bold truncate mb-1">{msg.email}</p>
                                <p className="text-[9px] text-gray-400 font-medium mb-3 uppercase tracking-tighter">Sujet: {msg.subject || 'Général'}</p>
                                <p className="text-xs text-gray-500 font-light line-clamp-1 leading-relaxed ">"{msg.message}"</p>
                                <ChevronRight size={14} className={cn(
                                    "absolute right-4 top-1/2 -translate-y-1/2 transition-all opacity-0 group-hover:opacity-100",
                                    selectedMessage?.id === msg.id ? "opacity-100 text-primary" : "text-gray-300"
                                )} />
                            </div>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {selectedMessage ? (
                        <motion.div
                            key={selectedMessage.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="lg:col-span-12 xl:col-span-7 bg-white border border-gray-100 shadow-xl p-12 md:p-20 relative overflow-hidden min-h-[500px]"
                        >
                            <div className="absolute top-0 right-0 p-12 text-primary/5 pointer-events-none"><MessageSquare size={120} /></div>

                            <div className="mb-12 pb-12 border-b border-gray-100">
                                <p className="text-[10px] uppercase tracking-[0.5em] text-primary font-black mb-4">Expéditeur Privilégié</p>
                                <h3 className="text-4xl font-sans font-light text-gray-950 mb-8 ">{selectedMessage.name}</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
                                        <Mail size={14} className="text-primary" /> {selectedMessage.email}
                                    </div>
                                    {selectedMessage.phone && (
                                        <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
                                            <Phone size={14} className="text-primary" /> {selectedMessage.phone}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-600">
                                        <Calendar size={14} className="text-primary" /> Sujet: {selectedMessage.subject || 'Général'}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-black">Message retranscrit</p>
                                <div className="p-10 bg-[#FAF9F6] border-l-2 border-primary/20 relative shadow-inner">
                                    <p className="text-sm text-gray-700 leading-loose font-light whitespace-pre-wrap ">
                                        {selectedMessage.message}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-20 pt-12 border-t border-gray-100 flex justify-between items-center">
                                <button
                                    onClick={() => deleteMessage(selectedMessage.id)}
                                    className="px-8 py-3 bg-red-50 text-red-500 text-[10px] uppercase font-black tracking-widest hover:bg-red-500 hover:text-white transition-all rounded-sm flex items-center gap-3 shadow-sm"
                                >
                                    <Trash2 size={16} /> Révoquer le message
                                </button>
                                <a
                                    href={`mailto:${selectedMessage.email}`}
                                    className="px-10 py-3 bg-primary text-white text-[10px] uppercase font-black tracking-widest hover:bg-black transition-all rounded-sm shadow-xl flex items-center gap-3"
                                >
                                    Répondre via Email
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="lg:col-span-12 xl:col-span-7 bg-white border border-dashed border-gray-200 flex flex-col items-center justify-center p-20 text-center">
                            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 border border-gray-100 shadow-inner">
                                <Mail className="text-gray-200" size={32} />
                            </div>
                            <h3 className="text-xl font-sans font-light text-gray-400 ">Sélectionnez une missive pour lecture</h3>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-300 mt-4 font-bold">Vos Ambassadeurs attendent une réponse</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default MessageManager;
