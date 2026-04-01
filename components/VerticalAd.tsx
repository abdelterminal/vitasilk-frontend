"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Zap } from 'lucide-react';

const VERTICAL_ADS = [
    '/img/ads/adsV1.jpg',
    '/img/ads/adsV2.jpg',
];

export default function VerticalAd() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % VERTICAL_ADS.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden group shadow-2xl border border-white/10">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={VERTICAL_ADS[current]}
                        alt="Vertical Ad"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <div className="flex items-center gap-2 mb-3">
                    <Zap size={14} className="text-primary animate-pulse" />
                    <span className="text-[10px] uppercase font-bold text-primary">Nouveauté Exclusive</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-sans font-light !text-white leading-tight mb-2">
                    Découvrez le <span className="text-primary">Secret</span> <br />
                    <span className="text-primary/90">de la Brillance</span>
                </h3>
            </div>

            {/* Indicator */}
            <div className="absolute top-8 right-8 flex flex-col gap-2 z-20">
                {VERTICAL_ADS.map((_, i) => (
                    <div
                        key={i}
                        className={`w-1 h-4 rounded-full transition-all duration-500 ${i === current ? 'bg-primary h-8' : 'bg-white/20'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
