"use client";

import React, { useState, useEffect } from 'react';
import { eventsApi, uploadsApi, imageUrl, type Event as ApiEvent } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Power, X, Save, Loader2, Zap, Percent, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Event = ApiEvent;

export default function EventManager() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    const loadEvents = () => {
        eventsApi.getAll()
            .then(res => setEvents(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { loadEvents(); }, []);

    const handleDelete = async (event: Event) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return;
        try {
            await eventsApi.delete(event.id);
            setEvents(prev => prev.filter(e => e.id !== event.id));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const toggleStatus = async (event: Event) => {
        try {
            await eventsApi.update(event.id, { is_active: !event.is_active });
            setEvents(prev => prev.map(e => e.id === event.id ? { ...e, is_active: !e.is_active } : e));
        } catch (error) {
            console.error("Error toggling status:", error);
        }
    };

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-sans font-light text-gray-900 tracking-tight italic">
                        Gestion des <span className="text-primary font-normal">Événements</span>
                    </h2>
                    <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-widest font-bold">Système Vitasilk Events & Lucky Wheel</p>
                </div>
                <button
                    onClick={() => {
                        setEditingEvent(null);
                        setIsModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-3 bg-gray-950 text-white px-8 py-4 rounded-xl hover:bg-primary transition-all shadow-xl group"
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                    <span className="text-[10px] uppercase tracking-widest font-black italic">Nouvel Événement</span>
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : events.length === 0 ? (
                <div className="bg-white rounded-[2rem] p-20 text-center border border-dashed border-gray-200 shadow-sm">
                    <Zap size={40} className="mx-auto text-gray-200 mb-6" />
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Aucun événement actif</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence>
                        {events.map((event) => (
                            <motion.div
                                key={event.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group"
                            >
                                <div className="relative h-60 overflow-hidden">
                                    <img
                                        src={imageUrl(event.banner_url)}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                                    <div className="absolute top-6 left-6">
                                        <div className={cn(
                                            "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 backdrop-blur-md",
                                            event.is_active ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                                        )}>
                                            <div className={cn("w-2 h-2 rounded-full", event.is_active ? "bg-green-400 animate-pulse" : "bg-gray-400")} />
                                            {event.is_active ? 'Actif' : 'Inactif'}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <h3 className="text-xl font-sans font-light text-gray-900 mb-4 italic uppercase tracking-tight">{event.title}</h3>
                                    
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {event.percentages.map((p, idx) => (
                                            <span key={idx} className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-[10px] font-bold text-gray-600">
                                                {p}% Off
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => toggleStatus(event)}
                                                className={cn(
                                                    "p-3 rounded-xl transition-all",
                                                    event.is_active ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : "bg-green-50 text-green-600 hover:bg-green-100"
                                                )}
                                                title={event.is_active ? "Désactiver" : "Activer"}
                                            >
                                                <Power size={18} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingEvent(event);
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-all"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(event)}
                                            className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Modal Form */}
            <AnimatePresence>
                {isModalOpen && (
                    <EventFormModal
                        event={editingEvent}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function EventFormModal({ event, onClose }: { event: Event | null, onClose: () => void }) {
    const [title, setTitle] = useState(event?.title || '');
    const [percentages, setPercentages] = useState<string>(event?.percentages?.join(', ') || '');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(event?.banner_url ? imageUrl(event.banner_url) : '');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const percArray = percentages.split(',').map(p => parseInt(p.trim())).filter(p => !isNaN(p));

        try {
            let finalBannerUrl = event?.banner_url || '';

            if (image) {
                finalBannerUrl = await uploadsApi.uploadSingle(image);
            }

            const eventData = {
                title,
                banner_url: finalBannerUrl,
                percentages: percArray,
                is_active: event ? event.is_active : true,
            };

            if (event) {
                await eventsApi.update(event.id, eventData);
            } else {
                await eventsApi.create(eventData);
            }
            onClose();
        } catch (error) {
            console.error("Error saving event:", error);
            alert("Erreur lors de la sauvegarde de l'événement.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-gray-950/40 backdrop-blur-md"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-4xl"
            >
                <div className="p-10 border-b border-gray-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-sans font-light italic uppercase tracking-tight">
                            {event ? 'Modifier' : 'Créer'} <span className="text-primary font-normal">l'événement</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-gray-50 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                    <div className="space-y-3">
                        <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 italic">Nom de l'Opération</label>
                        <input
                            required
                            value={title || ''}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="ex: Collection Été 2026"
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 italic">Valeurs de Privilège (%) - Séparées par virgules</label>
                        <div className="relative">
                            <Percent size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                required
                                value={percentages || ''}
                                onChange={(e) => setPercentages(e.target.value)}
                                placeholder="ex: 10, 20, 30"
                                className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] uppercase font-black tracking-widest text-gray-400 italic">Visuel de l'Offre</label>
                        <div
                            onClick={() => document.getElementById('image-upload')?.click()}
                            className="relative h-48 bg-gray-50 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-all overflow-hidden group"
                        >
                            {preview ? (
                                <>
                                    <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <ImageIcon className="text-white" size={32} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <ImageIcon className="text-gray-300 mb-3" size={32} />
                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-widest text-center px-6">Sélectionner un visuel haute résolution</span>
                                </>
                            )}
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        if (file.size > 1024 * 800) { 
                                            alert("Le visuel est trop volumineux. Veuillez choisir une image plus légère (Max 800KB).");
                                            return;
                                        }
                                        setImage(file);
                                        setPreview(URL.createObjectURL(file));
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gray-950 text-white py-6 rounded-[2rem] text-xs uppercase tracking-[0.3em] font-black hover:bg-primary transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 group"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} className="group-hover:scale-110 transition-transform" />}
                        <span>{event ? 'Mettre à jour l\'offre' : 'Lancer l\'opération'}</span>
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
