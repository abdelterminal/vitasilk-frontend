"use client";

import React, { useState, useEffect } from 'react';
import { eventsApi, imageUrl, type Event } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface EventSliderProps {
    onEventClick: (event: Event) => void;
}

export default function EventSlider({ onEventClick }: EventSliderProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        eventsApi.getActive().then(res => {
            if (res.data) setEvents([res.data]);
        }).catch(() => {});
    }, []);

    useEffect(() => {
        if (events.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % events.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [events.length]);

    if (events.length === 0) return null;

    const currentEvent = events[currentIndex];

    return (
        <section className="relative w-full h-[500px] md:h-[600px] mt-8 mb-16 px-6 lg:px-12 overflow-hidden">
            <div className="max-w-[1600px] mx-auto h-full relative rounded-[3rem] overflow-hidden group shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentEvent.id}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => onEventClick(currentEvent)}
                    >
                        <Image
                            src={imageUrl(currentEvent.banner_url)}
                            alt={currentEvent.title}
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 1600px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent flex flex-col justify-center px-12 md:px-24">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="space-y-6 max-w-2xl"
                            >
                                <div className="flex items-center gap-3 bg-primary/20 backdrop-blur-md border border-primary/30 w-fit px-4 py-2 rounded-full">
                                    <Trophy size={14} className="text-primary animate-pulse" />
                                    <span className="text-[10px] uppercase font-black tracking-[0.3em] text-primary italic">Événement Exclusif</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-sans font-light !text-white italic uppercase tracking-tighter leading-[0.9]">
                                    {currentEvent.title}
                                </h2>
                                <button className="bg-white text-gray-950 px-10 py-4 rounded-xl text-xs uppercase tracking-[0.3em] font-black hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95">
                                    Tenter ma Chance
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                {events.length > 1 && (
                    <>
                        <div className="absolute bottom-10 right-10 flex gap-4 z-20">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(prev => (prev - 1 + events.length) % events.length);
                                }}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all border-none"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(prev => (prev + 1) % events.length);
                                }}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all border-none"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Pagination Indicators */}
                        <div className="absolute bottom-10 left-10 flex gap-3 z-20">
                            {events.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentIndex(idx);
                                    }}
                                    className={cn(
                                        "h-1.5 transition-all rounded-full",
                                        idx === currentIndex ? "w-12 bg-primary" : "w-4 bg-white/30 hover:bg-white/50"
                                    )}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
