"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDiscount } from '@/context/DiscountContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SpinWheelPopupProps {
    event: {
        id: string | number;
        title: string;
        percentages: number[];
    };
    onClose: () => void;
}

export default function SpinWheelPopup({ event, onClose }: SpinWheelPopupProps) {
    const router = useRouter();
    const { setWin, discount, isLoading } = useDiscount();
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<number | null>(null);
    const [rotation, setRotation] = useState(0);

    // Check if user already has a win for this event
    const hasWon = discount ? Number(discount.eventId) === Number(event.id) : false;

    const handleSpin = async () => {
        if (isSpinning || hasWon) return;

        setIsSpinning(true);
        const segments = event.percentages;
        const segmentAngle = 360 / segments.length;

        const fullSpins = 5 + Math.floor(Math.random() * 5);
        const winningSegmentIndex = Math.floor(Math.random() * segments.length);
        const finalPercentage = segments[winningSegmentIndex];

        const extraRotation = 360 - (winningSegmentIndex * segmentAngle) - (segmentAngle / 2);
        const totalRotation = rotation + (fullSpins * 360) + extraRotation;

        setRotation(totalRotation);

        setTimeout(async () => {
            setIsSpinning(false);
            setResult(finalPercentage);
            await setWin(finalPercentage, event.id);

            setTimeout(() => {
                onClose();
                router.push('/');
            }, 2500);
        }, 5000);
    };

    if (isLoading) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-gray-950/60 backdrop-blur-xl"
            />

            {/* ── LANDSCAPE MODAL ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-row items-center"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-50 p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <X size={18} />
                </button>

                {/* ── LEFT COLUMN: Wheel ── */}
                <div className="flex-shrink-0 flex items-center justify-center p-8 py-10">
                    {/* Wheel Container */}
                    <div className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] flex items-center justify-center">

                        {/* Outer Glow */}
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-[70px] animate-pulse" />

                        {/* Flashing Lights Ring */}
                        <div className="absolute inset-[-14px] rounded-full border-[12px] border-gray-950 shadow-2xl z-10">
                            {[...Array(24)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        opacity: [0.4, 1, 0.4],
                                        scale: [1, 1.2, 1],
                                        backgroundColor: i % 2 === 0
                                            ? ['#EAB308', '#FFFFFF', '#EAB308']
                                            : ['#FFFFFF', '#EAB308', '#FFFFFF']
                                    }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
                                    className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full shadow-[0_0_12px_rgba(234,179,8,0.9)] z-20"
                                    style={{
                                        left: `calc(50% + ${Math.cos((i * (360 / 24) - 90) * (Math.PI / 180)) * 50}%)`,
                                        top: `calc(50% + ${Math.sin((i * (360 / 24) - 90) * (Math.PI / 180)) * 50}%)`,
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                />
                            ))}
                        </div>

                        {/* Arrow Pointer */}
                        <div className="absolute top-[-22px] left-1/2 -translate-x-1/2 z-40">
                            <motion.div
                                animate={isSpinning ? { rotate: [-5, 5, -5] } : {}}
                                transition={{ duration: 0.1, repeat: Infinity }}
                                className="w-9 h-9 md:w-11 md:h-11 bg-red-600 shadow-xl"
                                style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
                            />
                        </div>

                        {/* Spinning SVG Wheel */}
                        <motion.div
                            animate={{ rotate: rotation }}
                            transition={{ duration: 5, ease: [0.15, 0, 0.15, 1] }}
                            className="w-full h-full relative z-20 drop-shadow-[0_0_28px_rgba(0,0,0,0.3)]"
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                {event.percentages.map((p, i) => {
                                    const segmentsCount = event.percentages.length;
                                    const angle = 2 * Math.PI / segmentsCount;
                                    const startAngle = i * angle;
                                    const endAngle = (i + 1) * angle;

                                    const colors = ['#22C55E', '#F43F5E', '#F97316', '#6366F1', '#EAB308', '#EC4899'];
                                    const color = colors[i % colors.length];

                                    const x1 = 50 + 50 * Math.cos(startAngle);
                                    const y1 = 50 + 50 * Math.sin(startAngle);
                                    const x2 = 50 + 50 * Math.cos(endAngle);
                                    const y2 = 50 + 50 * Math.sin(endAngle);
                                    const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                                    return (
                                        <g key={i}>
                                            <path d={pathData} fill={color} stroke="white" strokeWidth="1" />
                                            <g transform={`rotate(${(i + 0.5) * (360 / segmentsCount)} 50 50)`}>
                                                <text
                                                    x="75" y="50"
                                                    fill="white" fontSize="5" fontWeight="900"
                                                    textAnchor="middle" alignmentBaseline="middle"
                                                    transform="rotate(90 75 50)"
                                                    className="select-none"
                                                    style={{ paintOrder: 'stroke', stroke: 'rgba(0,0,0,0.2)', strokeWidth: '0.2px' }}
                                                >
                                                    {p}% OFF
                                                </text>
                                            </g>
                                        </g>
                                    );
                                })}
                                <circle cx="50" cy="50" r="14" fill="white" />
                                <text x="50" y="47" fill="#111" fontSize="3.5" fontWeight="black"
                                    textAnchor="middle" alignmentBaseline="middle" transform="rotate(90 50 50)">
                                    PRIVILÈGE
                                </text>
                                <text x="50" y="53" fill="#111" fontSize="3" fontWeight="bold"
                                    textAnchor="middle" alignmentBaseline="middle" transform="rotate(90 50 50)">
                                    EXCLUSIF
                                </text>
                            </svg>
                        </motion.div>
                    </div>
                </div>

                {/* ── RIGHT COLUMN: Title + Action ── */}
                <div className="flex-1 flex flex-col justify-center px-6 py-10 pr-10">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 text-primary mb-4">
                            <Zap size={16} className="animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-black italic">Vitasilk Fortune Wheel</span>
                            <Zap size={16} className="animate-pulse" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-sans font-light text-gray-950 italic uppercase tracking-tighter leading-tight">
                            Tente ton{' '}
                            <span className="text-primary font-normal">Privilège</span>
                        </h2>
                    </div>

                    {/* Result or Spin Button */}
                    <AnimatePresence mode="wait">
                        {result || hasWon ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-primary/5 border border-primary/20 p-6 rounded-3xl"
                            >
                                <div className="flex items-center gap-4 text-primary mb-3">
                                    <div className="relative">
                                        <Trophy size={40} className="drop-shadow-lg" />
                                        <motion.div
                                            animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 2] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                                        />
                                    </div>
                                    <div className="text-4xl font-sans font-black italic tracking-tighter text-gray-950">
                                        -{hasWon ? discount.percentage : result}%
                                    </div>
                                </div>
                                <p className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-2">
                                    Privilège Débloqué
                                </p>
                                <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-5">
                                    Votre réduction exclusive est maintenant active sur votre panier.
                                </p>
                                <button
                                    onClick={() => { onClose(); router.push('/'); }}
                                    className="w-full bg-gray-950 text-white py-4 rounded-2xl text-[10px] uppercase tracking-widest font-black hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-3"
                                >
                                    <span>VOIR LE CATALOGUE</span>
                                    <Zap size={14} />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.button
                                key="spin"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={handleSpin}
                                disabled={isSpinning}
                                className="w-full bg-gray-950 text-white py-5 rounded-[2rem] text-xs uppercase tracking-[0.4em] font-black hover:bg-primary transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-4 group"
                            >
                                {isSpinning
                                    ? <Loader2 className="animate-spin" size={20} />
                                    : <Zap className="group-hover:rotate-12 transition-transform" size={20} />
                                }
                                <span>{isSpinning ? 'TIRAGE EN COURS...' : 'TOURNER LA ROUE'}</span>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
