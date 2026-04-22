"use client";

import React, { useState, useEffect, useRef } from 'react';
import { chatApi, type ChatMessage, type ChatSession } from '@/lib/api';
import { useSearchParams } from 'next/navigation';
import {
    MessageSquare,
    Send,
    User,
    Circle,
    Search,
    CheckCheck,
    ChevronLeft,
    Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ChatManager() {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();
    const targetUserId = searchParams.get('userId');

    useEffect(() => {
        chatApi.getSessions()
            .then(res => {
                setSessions(res.data.data || []);
                if (targetUserId) {
                    const session = (res.data.data || []).find(s => String(s.user_id) === targetUserId);
                    if (session) setSelectedSession(session);
                }
            })
            .catch(console.error);
    }, [targetUserId]);

    useEffect(() => {
        if (!selectedSession) {
            setMessages([]);
            return;
        }
        chatApi.getMessages(selectedSession.user_id)
            .then(res => setMessages(res.data.data))
            .catch(console.error);
    }, [selectedSession]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedSession) return;
        const text = newMessage.trim();
        setNewMessage('');
        try {
            const res = await chatApi.reply(text, selectedSession.user_id);
            setMessages(prev => [...prev, res.data.data]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const filteredSessions = sessions.filter(s =>
        s.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-[800px] bg-white border border-gray-100 shadow-2xl overflow-hidden rounded-[2.5rem]">
            {/* Sidebar: Chat List */}
            <div className={`w-full md:w-96 border-r border-gray-100 flex flex-col bg-gray-50/30 ${selectedSession ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-8 border-b border-gray-100 bg-white">
                    <h2 className="text-2xl font-sans font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <MessageSquare className="text-primary" />
                        Live Chat
                    </h2>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher une conversation..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:outline-none focus:border-primary/30 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredSessions.length > 0 && (
                        <div className="px-8 py-4 bg-gray-50/50 border-b border-gray-100">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Conversations Actives</p>
                        </div>
                    )}
                    {filteredSessions.map((session) => (
                        <button
                            key={session.user_id}
                            onClick={() => setSelectedSession(session)}
                            className={`w-full p-6 flex items-start gap-4 transition-all border-b border-gray-50/50 hover:bg-white group relative ${selectedSession?.user_id === session.user_id ? 'bg-white shadow-sm z-10' : ''}`}
                        >
                            {selectedSession?.user_id === session.user_id && (
                                <motion.div layoutId="activeChat" className="absolute left-0 top-0 w-1.5 h-full bg-primary" />
                            )}
                            <div className="relative shrink-0">
                                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                                    <User className="text-gray-300" />
                                </div>
                                <Circle className="absolute -bottom-1 -right-1 text-emerald-500 fill-emerald-500 border-2 border-white" size={12} />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="text-sm font-bold text-gray-900 truncate">{session.user_name}</h3>
                                    <span className="text-[9px] text-gray-400 font-bold uppercase">
                                        {session.last_timestamp ? new Date(session.last_timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                    </span>
                                </div>
                                <p className={`text-xs truncate ${session.unread_count > 0 ? 'font-bold text-gray-900' : 'text-gray-400 font-medium'}`}>
                                    {session.last_message || 'Nouvelle conversation'}
                                </p>
                            </div>
                            {session.unread_count > 0 && (
                                <div className="ml-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[9px] font-black text-white shadow-lg shadow-primary/20 scale-110">
                                    {session.unread_count}
                                </div>
                            )}
                        </button>
                    ))}

                    {filteredSessions.length === 0 && (
                        <div className="p-20 text-center">
                            <MessageSquare className="mx-auto text-gray-100 mb-4" size={48} />
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-loose">Aucune conversation</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content: Chat Window */}
            <div className={`flex-1 flex flex-col bg-white ${!selectedSession ? 'hidden md:flex' : 'flex'}`}>
                {selectedSession ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSelectedSession(null)}
                                    className="md:hidden p-2 hover:bg-gray-50 rounded-full transition-colors"
                                >
                                    <ChevronLeft />
                                </button>
                                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
                                    <User className="text-gray-300" />
                                </div>
                                <div>
                                    <h2 className="text-base font-black text-gray-900 tracking-tight uppercase">{selectedSession.user_name}</h2>
                                    <div className="flex items-center gap-2">
                                        <Circle className="text-emerald-500 fill-emerald-500" size={6} />
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Actif</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-gray-50/20 relative">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                                <img src="/img/logo.png" alt="" className="w-1/2 grayscale" />
                            </div>

                            <div className="relative z-10">
                                {messages.map((msg, idx) => {
                                    const isSelf = msg.sender === 'admin';
                                    const prevMsg = messages[idx - 1];
                                    const showTime = idx === 0 || (msg.timestamp && prevMsg?.timestamp &&
                                        new Date(msg.timestamp).getTime() - new Date(prevMsg.timestamp).getTime() > 300000);

                                    return (
                                        <div key={msg.id} className="space-y-2">
                                            {showTime && (
                                                <div className="flex justify-center my-6">
                                                    <span className="px-4 py-1.5 bg-gray-100/50 rounded-full text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                                        {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Maintenant'}
                                                    </span>
                                                </div>
                                            )}
                                            <div className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[70%] group relative ${isSelf ? 'items-end' : 'items-start'}`}>
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        className={`p-5 rounded-[1.8rem] shadow-sm text-sm leading-relaxed ${isSelf
                                                            ? 'bg-gradient-to-br from-gray-800 to-gray-950 text-white rounded-tr-none shadow-xl shadow-gray-200'
                                                            : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
                                                            }`}
                                                    >
                                                        {msg.message}
                                                    </motion.div>
                                                    <div className={`flex items-center gap-2 mt-2 px-2 ${isSelf ? 'justify-end' : 'justify-start'}`}>
                                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                                            {isSelf ? 'Maison Vitasilk' : selectedSession.user_name}
                                                        </span>
                                                        {isSelf && <CheckCheck size={12} className="text-emerald-500" />}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={scrollRef} />
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-8 border-t border-gray-100 bg-white">
                            <form onSubmit={handleSendMessage} className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Écrivez votre message..."
                                    className="flex-1 px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="px-8 py-5 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-3 active:scale-95"
                                >
                                    <span className="text-[10px] uppercase font-black tracking-widest">Envoyer</span>
                                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-6">
                        <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200 border border-gray-100 shadow-inner">
                            <MessageSquare size={48} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-sans font-bold text-gray-900">Salon de Conversation Maison</h3>
                            <p className="text-xs text-gray-400 font-medium max-w-xs leading-relaxed">
                                Sélectionnez une session pour entrer en communication avec un membre distingué de la Maison Vitasilk.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
