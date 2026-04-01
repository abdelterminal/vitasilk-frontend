"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ordersApi, chatApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import {
    MessageSquare,
    Send,
    ChevronLeft,
    Gem,
    AlertCircle,
    Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { type ChatMessage } from '@/lib/api';

export default function CustomerChatPage() {
    const { user, userData } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEligible, setIsEligible] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Eligibility check: user must have at least one order
    useEffect(() => {
        const check = async () => {
            if (!user) { setLoading(false); return; }
            try {
                const res = await ordersApi.getMyOrders(1, 1);
                if ((res.data?.length ?? 0) > 0 || userData?.role === 'admin') {
                    setIsEligible(true);
                }
            } catch {
                // no orders or error — not eligible
            } finally {
                setLoading(false);
            }
        };
        check();
    }, [user, userData]);

    // Poll messages every 3s
    useEffect(() => {
        if (!user || !isEligible) return;

        const fetchMessages = async () => {
            try {
                const res = await chatApi.getMyMessages();
                setMessages(res.data || []);
            } catch {
                // silently fail
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [user, isEligible]);

    // Scroll to bottom on new messages
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;

        const text = newMessage.trim();
        setNewMessage('');

        try {
            await chatApi.send(text, user.name);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
    );

    if (!isEligible) return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <div className="max-w-2xl mx-auto pt-40 px-6 text-center">
                <div className="bg-white p-12 border border-amber-100 shadow-2xl rounded-[3rem] space-y-8">
                    <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500 border border-amber-100">
                        <AlertCircle size={40} />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-3xl font-sans font-bold text-gray-900 leading-tight">Accès Salon VIP Restreint</h1>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium">
                            Le Salon de Conversation est une expérience exclusive réservée aux membres ayant effectué au moins une commande sur la Maison Vitasilk.
                        </p>
                    </div>
                    <div className="pt-4">
                        <Link
                            href="/boutique"
                            className="inline-block px-10 py-5 bg-gray-900 text-white text-[10px] uppercase font-black tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl"
                        >
                            Découvrir nos produits
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
            <div className="flex-1 max-w-5xl mx-auto w-full pt-32 pb-10 px-6 flex flex-col">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/account" className="p-3 bg-white border border-gray-100 rounded-2xl hover:text-primary transition-all shadow-sm">
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-sans font-bold text-gray-900 tracking-tight">Conciergerie VIP</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[9px] uppercase font-bold text-primary">Disponible</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                        <Gem size={14} className="text-primary" />
                        <span className="text-[10px] uppercase font-black text-primary tracking-wider">Elite</span>
                    </div>
                </div>

                {/* Chat Container */}
                <div className="flex-1 bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-[3rem] overflow-hidden flex flex-col min-h-[600px] mb-10 relative">
                    {/* Logo Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                        <img src="/img/logo.png" alt="" className="w-1/2 grayscale" />
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-8 max-md:p-4 space-y-6 max-md:space-y-3 bg-gray-50/20 relative z-10">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-10 max-md:p-6 space-y-6 max-md:space-y-4">
                                <div className="w-20 h-20 max-md:w-16 max-md:h-16 bg-primary/5 rounded-[2rem] max-md:rounded-xl flex items-center justify-center text-primary/20">
                                    <MessageSquare size={40} />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg max-md:text-base font-bold text-gray-900 leading-tight">Bienvenue, {userData?.name}</h3>
                                    <p className="text-xs max-md:text-[11px] text-gray-400 font-medium max-w-xs mx-auto leading-relaxed">
                                        Notre service conciergerie est à votre entière disposition. Posez votre question et un ambassadeur vous répondra sous peu.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg) => {
                                const isSelf = msg.sender === 'client';
                                return (
                                    <div key={msg.id} className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] max-md:max-w-[85%] ${isSelf ? 'items-end' : 'items-start'} flex flex-col group`}>
                                            <div className={`p-5 max-md:p-3 rounded-[2rem] max-md:rounded-xl shadow-sm text-sm max-md:text-xs leading-relaxed ${
                                                isSelf
                                                    ? 'bg-gradient-to-br from-gray-800 to-gray-950 text-white rounded-tr-none shadow-xl shadow-gray-200/50'
                                                    : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none shadow-sm'
                                                }`}>
                                                {msg.message}
                                            </div>
                                            <span className="text-[9px] max-md:text-[8px] font-black text-gray-300 uppercase tracking-widest mt-2 max-md:mt-1 px-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Maintenant'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={scrollRef} />
                    </div>

                    {/* Input */}
                    <div className="p-8 max-md:p-4 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
                        <form onSubmit={handleSendMessage} className="flex gap-4 max-md:gap-2">
                            <input
                                type="text"
                                placeholder="Posez votre question ici..."
                                className="flex-1 px-8 max-md:px-4 py-6 max-md:py-3 bg-white border border-gray-100 rounded-3xl max-md:rounded-xl text-sm max-md:text-xs focus:outline-none focus:border-primary/40 shadow-sm transition-all placeholder:text-gray-300"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="w-16 max-md:w-12 h-16 max-md:h-12 bg-gray-950 text-white rounded-3xl max-md:rounded-xl hover:bg-black transition-all flex items-center justify-center shadow-xl max-md:shadow-md active:scale-90 disabled:opacity-50 disabled:grayscale"
                            >
                                <Send size={22} className="max-md:size-6 rotate-[-10deg]" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
