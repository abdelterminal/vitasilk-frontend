"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Trash2, X } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirmer",
    cancelText = "Annuler",
    variant = 'danger'
}: ConfirmModalProps) {
    const colors = {
        danger: 'bg-red-500',
        warning: 'bg-amber-500',
        info: 'bg-blue-500'
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white w-full max-w-md overflow-hidden shadow-2xl relative rounded-3xl"
                    >
                        <div className={`h-2 w-full ${colors[variant]}`} />
                        <div className="p-8 md:p-12 text-center">
                            <div className={`${colors[variant]} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl text-white`}>
                                <AlertCircle size={40} strokeWidth={1.5} />
                            </div>

                            <h2 className="text-2xl font-sans font-bold text-gray-900 mb-4">{title}</h2>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium mb-10">{message}</p>

                            <div className="flex gap-4">
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-8 py-4 bg-gray-50 hover:bg-gray-100 text-gray-900 text-[10px] uppercase font-black tracking-widest transition-all rounded-xl"
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className={`flex-1 px-8 py-4 ${colors[variant]} text-white text-[10px] uppercase font-black tracking-widest hover:brightness-110 transition-all shadow-xl rounded-xl`}
                                >
                                    {confirmText}
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
