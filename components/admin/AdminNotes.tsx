"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, Plus, Trash2, Calendar, User, Pin, PinOff, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const NOTES_KEY = 'vitasilk_admin_notes';
import Toast, { ToastType } from './ui/Toast';
import ConfirmModal from './ui/ConfirmModal';

export default function AdminNotes() {
    const { userData } = useAuth();
    const [notes, setNotes] = useState<any[]>([]);
    const [newNote, setNewNote] = useState('');
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // UX System State
    const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
        message: '', type: 'info', isVisible: false
    });
    const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; title: string; message: string; onConfirm: () => void; id: string }>({
        isOpen: false, title: '', message: '', onConfirm: () => { }, id: ''
    });

    const loadNotes = () => {
        try {
            const stored = localStorage.getItem(NOTES_KEY);
            const parsed = stored ? JSON.parse(stored) : [];
            return parsed.sort((a: any, b: any) => a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1);
        } catch { return []; }
    };

    const saveNotes = (updated: any[]) => {
        localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
        setNotes(updated.sort((a: any, b: any) => a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1));
    };

    useEffect(() => {
        setNotes(loadNotes());
        setLoading(false);
    }, []);

    const addNote = () => {
        if (!newNote.trim()) return;
        const note = {
            id: Date.now().toString(),
            content: newNote,
            createdAt: new Date().toISOString(),
            pinned: false,
            completed: false,
            author: userData?.name || 'Administrateur'
        };
        saveNotes([note, ...loadNotes()]);
        setNewNote('');
        setIsAdding(false);
        showToast("Note ajoutée au registre");
    };

    const togglePin = (id: string, current: boolean) => {
        saveNotes(loadNotes().map((n: any) => n.id === id ? { ...n, pinned: !current } : n));
    };

    const toggleComplete = (id: string, current: boolean) => {
        saveNotes(loadNotes().map((n: any) => n.id === id ? { ...n, completed: !current } : n));
    };

    const deleteNote = (id: string) => {
        setConfirmModal({
            isOpen: true,
            title: "Supprimer la note",
            message: "Cette note sera définitivement effacée du tableau de bord.",
            id,
            onConfirm: () => {
                saveNotes(loadNotes().filter((n: any) => n.id !== id));
                showToast("Note supprimée", "info");
            }
        });
    };

    const showToast = (message: string, type: ToastType = 'success') => {
        setToast({ message, type, isVisible: true });
        setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 5000);
    };

    if (loading) return <div className="p-20 text-center animate-pulse text-gray-400 uppercase tracking-widest text-[10px]">Chargement des mémos...</div>;

    return (
        <div className="space-y-12">
            <div className="bg-white p-12 border border-gray-100 shadow-sm relative overflow-hidden flex justify-between items-end">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] luxury-text text-[10rem] pointer-events-none select-none">Notes</div>
                <div>
                    <h2 className="text-4xl font-sans font-light tracking-tight text-gray-900 mb-2">Mémos Administratifs</h2>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Coordination & Rappels internes</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="relative z-10 px-8 py-4 bg-gray-900 text-white text-[10px] uppercase tracking-widest font-black hover:bg-black transition-all flex items-center gap-3 shadow-xl"
                >
                    <Plus size={16} /> Nouvelle Note
                </button>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-[#FAF9F6] p-8 border border-gray-100 shadow-inner rounded-sm"
                    >
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Rédigez votre instruction ou rappel ici..."
                            className="w-full h-32 bg-white border border-gray-200 p-6 text-sm focus:outline-none focus:border-primary/30 transition-all resize-none rounded-xl shadow-sm"
                        />
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setIsAdding(false)} className="px-6 py-3 text-[10px] uppercase font-bold text-gray-400 hover:text-gray-900 transition-all">Annuler</button>
                            <button onClick={addNote} className="px-10 py-3 bg-primary text-white text-[10px] uppercase font-black tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all rounded-xl">Consigner la Note</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {notes.map((note) => (
                    <motion.div
                        layout
                        key={note.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={cn(
                            "group p-8 border relative transition-all duration-500 rounded-3xl",
                            note.pinned ? "bg-white border-primary/20 shadow-xl scale-[1.02] z-10" : "bg-white border-gray-100 hover:shadow-lg",
                            note.completed && "opacity-60 grayscale-[0.5]"
                        )}
                    >
                        {note.pinned && <div className="absolute top-6 right-6 text-primary"><Pin size={16} /></div>}

                        <div className="flex items-start gap-4 mb-6">
                            <div className={cn(
                                "p-3 rounded-2xl transition-colors",
                                note.completed ? "bg-emerald-50 text-emerald-500" : "bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary"
                            )}>
                                <StickyNote size={20} strokeWidth={1.5} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={cn(
                                    "text-sm font-medium leading-relaxed transition-all",
                                    note.completed ? "line-through text-gray-400" : "text-gray-900"
                                )}>
                                    {note.content}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                            <div className="flex items-center gap-3">
                                <User size={12} className="text-gray-300" />
                                <span className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">{note.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleComplete(note.id, note.completed)}
                                    className={cn(
                                        "p-2 rounded-lg transition-all",
                                        note.completed ? "text-emerald-500 bg-emerald-50" : "text-gray-300 hover:text-emerald-500 hover:bg-emerald-50"
                                    )}
                                    title={note.completed ? "Marquer comme actif" : "Marquer comme terminé"}
                                >
                                    <CheckCircle2 size={16} />
                                </button>
                                <button
                                    onClick={() => togglePin(note.id, note.pinned)}
                                    className={cn(
                                        "p-2 rounded-lg transition-all",
                                        note.pinned ? "text-primary bg-primary/5" : "text-gray-300 hover:text-primary hover:bg-primary/5"
                                    )}
                                    title={note.pinned ? "Dépingler" : "Épingler en haut"}
                                >
                                    {note.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                                </button>
                                <button
                                    onClick={() => deleteNote(note.id)}
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    title="Supprimer"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {notes.length === 0 && (
                <div className="py-24 text-center border border-dashed border-gray-200 rounded-3xl">
                    <StickyNote className="mx-auto text-gray-100 mb-6" size={64} strokeWidth={0.5} />
                    <p className="text-sm text-gray-400 font-light">Aucun mémo en attente.</p>
                </div>
            )}

            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
            />

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.title}
                message={confirmModal.message}
                variant="danger"
                onConfirm={confirmModal.onConfirm}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
