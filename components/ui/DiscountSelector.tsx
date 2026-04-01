"use client";

import React from 'react';
import { useDiscount } from '@/context/DiscountContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Gift, ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

export default function DiscountSelector() {
    const { discounts, discount, selectDiscount, isLoading } = useDiscount();
    const [isOpen, setIsOpen] = React.useState(false);

    if (isLoading || discounts.length <= 1) return null;

    return (
        <div className="fixed bottom-24 left-8 z-40">
            <div className="relative">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="absolute bottom-full left-0 mb-4 w-72 bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden p-3"
                        >
                            <div className="px-4 py-3 border-b border-gray-50 mb-3">
                                <h3 className="text-[10px] uppercase tracking-widest font-black text-gray-900 flex items-center gap-2">
                                    <Gift size={12} className="text-primary" />
                                    <span>Tes Privilèges Vitasilk</span>
                                </h3>
                                <p className="text-[9px] text-gray-400 mt-1 uppercase font-bold tracking-tight">Sélectionnez le privilège à appliquer</p>
                            </div>
                            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                                {discounts.map((d) => (
                                    <button
                                        key={d.eventId}
                                        onClick={() => {
                                            selectDiscount(d.eventId);
                                            setIsOpen(false);
                                        }}
                                        className={clsx(
                                            "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group",
                                            discount?.eventId === d.eventId 
                                                ? "bg-primary/5 border border-primary/20 shadow-sm" 
                                                : "hover:bg-gray-50 border border-transparent"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={clsx(
                                                "w-12 h-12 rounded-full flex items-center justify-center font-black text-sm transition-all duration-500",
                                                discount?.eventId === d.eventId 
                                                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" 
                                                    : "bg-gray-100 text-gray-500 grayscale group-hover:grayscale-0"
                                            )}>
                                                {d.percentage}%
                                            </div>
                                            <div className="text-left font-sans">
                                                <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{d.eventName || 'Événement'}</p>
                                                <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">Réduction validée</p>
                                            </div>
                                        </div>
                                        {discount?.eventId === d.eventId && (
                                            <motion.div 
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="bg-primary/10 p-1 rounded-full"
                                            >
                                                <Check size={14} className="text-primary" />
                                            </motion.div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-3 p-3 bg-gray-50 rounded-2xl">
                                <p className="text-[8px] text-gray-400 uppercase font-black text-center tracking-widest">
                                    Un seul privilège par commande
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={clsx(
                        "flex items-center bg-gray-950 text-white shadow-6xl hover:bg-primary transition-all duration-500 group relative overflow-hidden",
                        isOpen ? "px-8 py-5 rounded-[2.5rem]" : "w-16 h-16 rounded-full flex items-center justify-center p-0"
                    )}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    
                    <div className="relative flex items-center justify-center">
                        <Gift size={22} className="text-white group-hover:rotate-12 transition-transform duration-500" />
                        <span className="absolute -top-3 -right-3 w-5 h-5 bg-white text-black text-[9px] font-black rounded-full flex items-center justify-center shadow-lg animate-bounce border-2 border-gray-950">
                            {discounts.length}
                        </span>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div 
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="flex items-center overflow-hidden"
                            >
                                <div className="text-left ml-4 whitespace-nowrap">
                                    <p className="text-[9px] uppercase tracking-[0.3em] font-black text-white/60 mb-0.5">Privilège Actif</p>
                                    <p className="text-xs text-white font-black uppercase italic tracking-tighter">
                                        -{discount?.percentage}% <span className="text-primary group-hover:text-white font-normal ml-1 opacity-80">{discount?.eventName}</span>
                                    </p>
                                </div>
                                <div className="ml-4">
                                    <ChevronDown size={18} className="text-white/40" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    );
}
