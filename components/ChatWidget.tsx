"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ChatWidget() {
    const { user } = useAuth();
    const [isEligible, setIsEligible] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (user) {
            setIsEligible(true);
        } else {
            setIsEligible(false);
        }
    }, [user]);

    if (!isEligible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed bottom-36 md:bottom-28 right-6 md:right-10 z-40"
        >
            <Link href="/account/chat">
                <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 bg-gray-950 text-white rounded-2xl flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] group relative overflow-hidden transition-all duration-500"
                >
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 scale-150 group-hover:scale-100 transition-all duration-700 rounded-full" />
                    <MessageSquare size={20} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
                </motion.button>
            </Link>
        </motion.div>
    );
}
