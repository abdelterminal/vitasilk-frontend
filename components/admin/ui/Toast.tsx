"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type: ToastType;
    isVisible: boolean;
    onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const config = {
        success: { icon: CheckCircle2, color: 'bg-emerald-500', glow: 'shadow-emerald-500/40', text: 'Succès', border: 'border-emerald-400/20' },
        error: { icon: AlertCircle, color: 'bg-rose-500', glow: 'shadow-rose-500/40', text: 'Erreur', border: 'border-rose-400/20' },
        info: { icon: Info, color: 'bg-amber-500', glow: 'shadow-amber-500/40', text: 'Information', border: 'border-amber-400/20' }
    };

    const { icon: Icon, color, text, glow, border } = config[type];

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 100, scale: 0.9, y: -20 }}
                    animate={{ opacity: 1, x: 0, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 50, transition: { duration: 0.2 } }}
                    className="fixed top-10 right-10 z-[9999] flex items-center gap-5 bg-gray-950/90 backdrop-blur-2xl text-white p-2 pl-8 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-white/10 min-w-[360px] overflow-hidden group"
                >
                    {/* Decorative Gradient Background */}
                    <div className={cn("absolute inset-0 opacity-10 animate-pulse bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000")} />
                    
                    <div className="flex flex-col py-3 relative z-10">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black opacity-30 mb-0.5">{text}</span>
                        <p className="text-[13px] font-semibold tracking-wide text-gray-100">{message}</p>
                    </div>

                    <div className={cn("p-4 rounded-2xl ml-auto shadow-2xl transition-transform duration-500 group-hover:scale-110", color, glow, border)}>
                        <Icon size={20} strokeWidth={2.5} />
                    </div>

                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-white/10 rounded-full transition-all mr-2 text-gray-500 hover:text-white"
                    >
                        <X size={16} />
                    </button>

                    {/* Progress indicator */}
                    <motion.div 
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className={cn("absolute bottom-0 left-0 h-1", color)}
                    />
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
