"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    Truck,
    CheckCircle2,
    Clock,
    ArrowLeft,
    Phone,
    Hash,
    MapPin,
    AlertCircle,
    MessageSquare,
    Headphones,
    Loader2,
    ShieldCheck,
    History,
    TrendingUp,
    Award,
    Compass,
    XCircle,
    Ban
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ordersApi } from '@/lib/api';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface TrackingStep {
    status: OrderStatus;
    label: string;
    description: string;
    date?: string;
    icon: any;
}

const STEPS_ORDER: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered'];

const TrackOrderPageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [orderIdInput, setOrderIdInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState('');
    const [orderData, setOrderData] = useState<any>(null);

    useEffect(() => {
        const id = searchParams.get('id');
        const phone = searchParams.get('phone');
        if (id) setOrderIdInput(id);
        if (phone) setPhoneInput(phone);
        if (id && phone) handleSearch(null, id, phone);
    }, [searchParams]);

    const getTrackingSteps = (status: OrderStatus, createdAt: any): TrackingStep[] => {
        const baseDate = createdAt ? new Date(createdAt) : null;
        const formatDate = (date: Date) => date.toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });

        const steps: TrackingStep[] = [
            {
                status: 'pending',
                label: 'Commande Reçue',
                description: 'Traitement par la Maison Vitasilk.',
                date: baseDate ? formatDate(baseDate) : undefined,
                icon: Clock
            },
            {
                status: 'processing',
                label: 'En Préparation',
                description: 'Emballage sous contrôle qualité.',
                icon: Package
            },
            {
                status: 'shipped',
                label: 'En Livraison',
                description: 'Colis en transit vers vous.',
                icon: Truck
            },
            {
                status: 'delivered',
                label: 'Livrée',
                description: 'Remise effectuée avec succès.',
                icon: CheckCircle2
            },
        ];

        return steps;
    };

    const getStatusIndex = (status: string) => {
        const index = STEPS_ORDER.indexOf(status as OrderStatus);
        return index === -1 ? 0 : index;
    };

    const handleSearch = async (e?: React.FormEvent | null, id?: string, phone?: string) => {
        if (e) e.preventDefault();
        const searchId = id || orderIdInput;
        const searchPhone = (phone || phoneInput).trim();

        if (!searchId || !searchPhone) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        setIsSearching(true);
        setError('');

        try {
            const res = await ordersApi.track(searchId, searchPhone);
            const data = res.data;
            setOrderData({ ...data, id: `VT-${data.id}` });
            setShowResults(true);
        } catch (err: any) {
            if (err.status === 403) {
                setError('Cet ID ne correspond pas au numéro de téléphone fourni.');
            } else if (err.status === 404) {
                setError('Commande introuvable.');
            } else {
                setError('Erreur lors de la recherche.');
            }
        } finally {
            setIsSearching(false);
        }
    };

    const currentStatusIndex = orderData ? getStatusIndex(orderData.status) : 0;
    const trackingSteps = orderData ? getTrackingSteps(orderData.status, orderData.created_at) : [];
    const isCancelled = orderData?.status === 'cancelled';
    const progressFactor = isCancelled ? 0 : (currentStatusIndex + 1) / 4;

    return (
        <div className="min-h-screen bg-[#FBFAF8] pt-32 pb-24 px-4 md:px-12 font-sans">
            <div className="max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                    {!showResults ? (
                        <motion.div
                            key="lookup"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -40 }}
                            className="text-center"
                        >
                            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-10">
                                <motion.button
                                    whileHover={{ x: -5 }}
                                    onClick={() => router.push('/')}
                                    className="inline-flex items-center text-[10px] uppercase tracking-wider text-gray-400 hover:text-gray-950 transition-all font-medium group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-gray-100/50"
                                >
                                    <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                    Maison Vitasilk
                                </motion.button>
                            </div>

                            <div className="mb-12 pt-16">
                                <h1 className="text-3xl md:text-5xl font-light text-gray-950 tracking-tight mb-4 leading-[1.2]">
                                    Suivi de <span className="font-light italic text-primary/60">Commande</span>
                                </h1>
                                <p className="text-sm text-gray-400 font-light max-w-xl mx-auto leading-relaxed tracking-wide">
                                    Suivez le voyage de vos soins de luxe.
                                </p>
                            </div>

                            <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-lg rounded-3xl max-w-2xl mx-auto relative overflow-hidden">
                                <form onSubmit={handleSearch} className="space-y-8 relative z-10">
                                    <div className="grid md:grid-cols-2 gap-6 text-left">
                                        <div className="space-y-3">
                                            <label className="text-[10px] uppercase font-medium tracking-wider text-gray-400 px-1 block">ID Commande</label>
                                            <div className="relative">
                                                <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/60" size={18} />
                                                <input
                                                    type="text"
                                                    value={orderIdInput}
                                                    onChange={(e) => setOrderIdInput(e.target.value)}
                                                    placeholder="VT-12345678"
                                                    className="w-full py-4 bg-[#FAF9F6] border border-transparent focus:border-primary/20 focus:bg-white focus:outline-none transition-all text-base pl-14 pr-4 rounded-xl shadow-sm font-medium tracking-wider placeholder:opacity-30 uppercase"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] uppercase font-medium tracking-wider text-gray-400 px-1 block">Téléphone</label>
                                            <div className="relative">
                                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/60" size={18} />
                                                <input
                                                    type="tel"
                                                    value={phoneInput}
                                                    onChange={(e) => setPhoneInput(e.target.value)}
                                                    placeholder="0612345678"
                                                    className="w-full py-4 bg-[#FAF9F6] border border-transparent focus:border-primary/20 focus:bg-white focus:outline-none transition-all text-base pl-14 pr-4 rounded-xl shadow-sm placeholder:opacity-30"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="p-4 bg-black text-white rounded-xl flex items-center gap-4 shadow-lg"
                                        >
                                            <AlertCircle size={18} className="text-red-500 shrink-0" />
                                            <p className="text-xs font-medium tracking-wide">{error}</p>
                                        </motion.div>
                                    )}

                                    <button
                                        disabled={isSearching}
                                        className="w-full py-4 bg-gray-950 hover:bg-gray-900 text-white text-xs uppercase tracking-wider font-medium transition-all duration-500 shadow-md rounded-xl flex items-center justify-center space-x-3 cursor-pointer disabled:opacity-50"
                                    >
                                        {isSearching ? (
                                            <><Loader2 size={16} className="animate-spin text-primary" /><span>Recherche...</span></>
                                        ) : (
                                            <><Compass size={16} className="text-primary" /><span>Suivre ma commande</span></>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => setShowResults(false)}
                                    className="flex items-center text-[10px] uppercase font-medium tracking-widest text-gray-400 hover:text-gray-950 transition-all group"
                                >
                                    <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-2 transition-transform duration-500" />
                                    Retour
                                </button>
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "px-4 py-2 rounded-full flex items-center gap-2 border shadow-md text-[10px] uppercase tracking-wider font-medium",
                                        isCancelled ? "bg-red-500 text-white border-red-400" : "bg-gray-950 text-white border-white/10"
                                    )}>
                                        <div className={cn("w-2 h-2 rounded-full animate-pulse", isCancelled ? "bg-white" : "bg-primary")} />
                                        {isCancelled ? 'Annulée' : 'En cours'}
                                    </div>
                                    <div className="px-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-medium tracking-wider text-gray-400 uppercase">
                                        {orderData?.id}
                                    </div>
                                </div>
                            </div>

                            {/* Cancelled Alert */}
                            {isCancelled && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 border border-red-100 p-5 rounded-2xl flex items-center gap-4"
                                >
                                    <AlertCircle size={20} className="text-red-600 shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-red-950">Commande Annulée</p>
                                        <p className="text-xs text-red-600/70 mt-0.5">Veuillez contacter le support pour plus d'informations.</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Horizontal Stepper */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-8 md:p-10">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-[10px] uppercase font-medium tracking-widest text-primary">Progression</h3>
                                    <div className="bg-gray-950 text-white px-4 py-1.5 rounded-full flex items-center gap-2">
                                        <TrendingUp size={12} className="text-primary" />
                                        <span className="text-[10px] font-medium tracking-wider">
                                            {isCancelled ? '0' : Math.round(progressFactor * 100)}%
                                        </span>
                                    </div>
                                </div>

                                {/* Steps */}
                                <div className="relative">
                                    {/* Progress line background */}
                                    <div className="absolute top-7 left-7 right-7 h-0.5 bg-gray-100 hidden md:block" />
                                    {/* Progress line filled */}
                                    <motion.div
                                        className="absolute top-7 left-7 h-0.5 bg-primary hidden md:block"
                                        initial={{ width: 0 }}
                                        animate={{ width: isCancelled ? 0 : `calc(${progressFactor * 100}% - 3.5rem)` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                    />

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
                                        {trackingSteps.map((step, idx) => {
                                            const isCompleted = !isCancelled && idx < currentStatusIndex;
                                            const isActive = !isCancelled && idx === currentStatusIndex;
                                            const isPending = isCancelled || idx > currentStatusIndex;
                                            const Icon = step.icon;

                                            return (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="flex flex-col items-center text-center gap-3"
                                                >
                                                    {/* Icon circle */}
                                                    <div className="relative">
                                                        {isActive && (
                                                            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping scale-150" />
                                                        )}
                                                        <div className={cn(
                                                            "relative w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-md",
                                                            isCompleted && "bg-gray-950 border-primary text-primary",
                                                            isActive && "bg-gray-950 border-primary text-primary shadow-primary/20",
                                                            isPending && "bg-gray-50 border-gray-100 text-gray-300"
                                                        )}>
                                                            <Icon size={22} />
                                                        </div>
                                                    </div>

                                                    {/* Label */}
                                                    <div>
                                                        <p className={cn(
                                                            "text-[10px] uppercase tracking-wider font-bold leading-tight",
                                                            (isCompleted || isActive) ? "text-gray-950" : "text-gray-300"
                                                        )}>
                                                            {step.label}
                                                        </p>
                                                        <p className={cn(
                                                            "text-[9px] mt-1 leading-relaxed",
                                                            (isCompleted || isActive) ? "text-gray-500" : "text-gray-200"
                                                        )}>
                                                            {step.description}
                                                        </p>
                                                        {step.date && (isCompleted || isActive) && (
                                                            <p className="text-[8px] text-primary font-medium mt-1 uppercase tracking-widest">
                                                                {step.date.split(' à ')[0]}
                                                            </p>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Delivered celebration */}
                            {orderData?.status === 'delivered' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white border border-primary/10 p-8 rounded-2xl text-center space-y-4 shadow-md"
                                >
                                    <div className="w-14 h-14 bg-gray-950 rounded-xl flex items-center justify-center mx-auto text-primary shadow-md">
                                        <Award size={28} />
                                    </div>
                                    <h3 className="text-2xl font-light text-gray-950 tracking-tighter uppercase">
                                        Mission <span className="font-medium text-primary">Accomplie</span>
                                    </h3>
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                                        Votre commande a été délivrée avec succès.
                                    </p>
                                </motion.div>
                            )}

                            {/* Bottom row */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Order details */}
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-4">
                                    <h4 className="text-[10px] uppercase font-medium tracking-widest text-primary flex items-center gap-2">
                                        <History size={14} /> Détails
                                    </h4>
                                    <div className="space-y-3">
                                        <div className={cn(
                                            "p-4 rounded-xl border flex items-center gap-4",
                                            isCancelled ? "bg-red-50 border-red-100" : "bg-gray-50 border-gray-100"
                                        )}>
                                            <div className={cn(
                                                "w-10 h-10 rounded-lg shadow-md flex items-center justify-center",
                                                isCancelled ? "bg-red-600 text-white" : "bg-gray-950 text-primary"
                                            )}>
                                                <MapPin size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[8px] uppercase font-medium tracking-widest text-gray-400 mb-1">Destination</p>
                                                <p className="text-base font-medium text-gray-950 uppercase">{orderData?.city || '—'}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-950 text-primary rounded-lg flex items-center justify-center">
                                                <Package size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[8px] uppercase font-medium tracking-widest text-gray-400 mb-1">Statut</p>
                                                <p className={cn(
                                                    "text-base font-semibold uppercase tracking-tight",
                                                    isCancelled ? "text-red-600" : "text-gray-950"
                                                )}>
                                                    {isCancelled ? 'Annulée' :
                                                     orderData?.status === 'delivered' ? 'Livrée' :
                                                     orderData?.status === 'shipped' ? 'En livraison' :
                                                     orderData?.status === 'processing' ? 'En préparation' : 'Reçue'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Support */}
                                <div className="p-6 rounded-2xl bg-gray-950 text-white space-y-6 shadow-md">
                                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-primary">
                                        <Headphones size={18} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-xl font-light tracking-widest uppercase">
                                            Votre <span className="font-medium text-primary">Ambassadeur</span>
                                        </h4>
                                        <p className="text-[10px] font-normal text-white/40 leading-relaxed uppercase tracking-wider">
                                            Notre conciergerie assure l'intégrité de vos produits.
                                        </p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Link href="/account?tab=chat" className="flex-1 py-3 text-[10px] uppercase tracking-widest font-medium rounded-xl flex items-center justify-center gap-2 bg-white text-gray-950 hover:bg-primary hover:text-white transition-all shadow-md">
                                            <MessageSquare size={14} />
                                            <span>Contact</span>
                                        </Link>
                                        <div className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 border border-white/10 text-[10px] uppercase tracking-widest font-medium text-white/40">
                                            <ShieldCheck size={14} className="text-primary" />
                                            <span>Sécurisé</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const TrackOrderPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#FBFAF8] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
        }>
            <TrackOrderPageContent />
        </Suspense>
    );
};

export default TrackOrderPage;
