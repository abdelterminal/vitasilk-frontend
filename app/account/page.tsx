"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { ordersApi, adminApi, productsApi, usersApi, uploadsApi, imageUrl } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';
import { MOROCCAN_CITIES, searchCities, City } from '@/constants/cities';
import { 
    User, 
    Package, 
    Bell, 
    Settings, 
    LogOut, 
    ChevronRight, 
    Truck, 
    Calendar, 
    MapPin, 
    Mail, 
    ShoppingBag,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Clock,
    Gift,
    Gem,
    Trash2,
    Star,
    Crown,
    Check,
    Camera,
    Phone,
    Heart,
    Lock,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type TabType = 'profile' | 'orders' | 'notifications' | 'favorites';

const REGIONS = [
    'Casablanca-Settat',
    'Rabat-Salé-Kénitra',
    'Marrakech-Safi',
    'Fès-Meknès',
    'Tanger-Tétouan-Al Hoceïma',
    'Oriental',
    'Souss-Massa',
    'Béni Mellal-Khénifra',
    'Laâyoune-Sakia El Hamra',
    'Dakhla-Oued Ed-Dahab',
    'Guelmim-Oued Noun',
    'Drâa-Tafilalet',
];

function AccountPageContent() {
    const { userData: user, loading: authLoading, logout } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialTab = (searchParams.get('tab') as TabType) || 'profile';
    
    const [activeTab, setActiveTab] = useState<TabType>(initialTab);
    const [orders, setOrders] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [giftConfig, setGiftConfig] = useState<any>(null);
    const [giftPool, setGiftPool] = useState<any[]>([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [loadingData, setLoadingData] = useState(false);
    const [showGiftModal, setShowGiftModal] = useState(false);
    const [claiming, setClaiming] = useState(false);
    const { wishlist } = useWishlist();
const [claimedGift, setClaimedGift] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        phone: '',
        address: {
            street: '',
            city: '',
            region: '',
            zip: ''
        }
    });
    const [isSaving, setIsSaving] = useState(false);

    const parseAddress = (raw: any) => {
        if (!raw) return { street: '', city: '', region: '', zip: '' };
        if (typeof raw === 'object') return raw;
        try { return JSON.parse(raw); } catch { return { street: raw, city: '', region: '', zip: '' }; }
    };

    const getJoinDate = (dateVal: any) => {
        if (!dateVal) return 'Mars 2024';
        const d = new Date(dateVal);
        if (!isNaN(d.getTime())) return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        return 'Mars 2024';
    };

    const [citySearch, setCitySearch] = useState('');
    const [citySuggestions, setCitySuggestions] = useState<City[]>([]);
    const [showCitySuggestions, setShowCitySuggestions] = useState(false);

    useEffect(() => {
        if (user) {
            const parsedAddress = (() => {
                if (!user.address) return { street: '', city: '', region: '', zip: '' };
                if (typeof user.address === 'object') return user.address;
                try { return JSON.parse(user.address); } catch { return { street: user.address, city: '', region: '', zip: '' }; }
            })();
            setEditForm({
                name: user.name || '',
                phone: user.phone || '',
                address: parsedAddress,
            });
            setCitySearch(parsedAddress.city || '');
        }
    }, [user]);

    const handleCitySearch = (val: string) => {
        setCitySearch(val);
        setEditForm({ ...editForm, address: { ...editForm.address, city: val } });
        if (val.length >= 1) {
            const results = searchCities(val);
            setCitySuggestions(results);
            setShowCitySuggestions(true);
        } else {
            setCitySuggestions([]);
            setShowCitySuggestions(false);
        }
    };

    const selectCity = (city: City) => {
        setCitySearch(city.name);
        setEditForm({ ...editForm, address: { ...editForm.address, city: city.name } });
        setShowCitySuggestions(false);
    };

    const handleSaveProfile = async () => {
        if (!user) return;
        setIsSaving(true);
        try {
            await usersApi.updateMe({
                name: editForm.name,
                phone: editForm.phone,
                address: editForm.address,
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Erreur lors de la sauvegarde du profil.");
        } finally {
            setIsSaving(false);
        }
    };

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Redirect if not logged in
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    // Handle initial tab from query param
    useEffect(() => {
        const tab = searchParams.get('tab') as TabType;
        if (tab && ['profile', 'orders', 'notifications'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    // Fetch orders and gift config
    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            setLoadingData(true);
            try {
                // 1. Fetch Orders
                try {
                    const res = await ordersApi.getMyOrders(1, 20);
                    const allOrders = res.data || [];
                    const validOrders = allOrders.filter((o: any) =>
                        o.status === 'delivered' || o.status === 'shipped' || o.status === 'processing'
                    );
                    setTotalSpent(validOrders.reduce((acc: number, o: any) => acc + Number(o.total_price || 0), 0));
                    setOrders(allOrders);
                } catch (err) {
                    console.error("Orders fetch error:", err);
                }

                // 2. Notifications — no backend equivalent, leave empty
                setNotifications([]);

                // 3. Gift Configuration
                try {
                    const config = await adminApi.getSetting('loyalty_gift');
                    setGiftConfig(config || { threshold: 2500, giftProductIds: [], active: false });
                    if (config?.giftProductIds?.length > 0) {
                        const prodsRes = await productsApi.getAll();
                        const allProds = prodsRes.data || [];
                        setGiftPool(allProds.filter((p: any) => config.giftProductIds.includes(p.id)));
                    }
                } catch (err) {
                    console.error("Gift config error:", err);
                    setGiftConfig({ threshold: 2500, giftProductIds: [], active: false });
                }
            } catch (error) {
                console.error("General error in fetchData:", error);
            } finally {
                setLoadingData(false);
            }
        };
        fetchData();
    }, [user]);

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        setUploadingAvatar(true);
        try {
            const url = await uploadsApi.uploadSingle(file);
            await usersApi.updateMe({ photo_url: url });
            window.location.reload();
        } catch (error) {
            console.error("Error updating avatar:", error);
            alert("Erreur lors de la mise à jour de la photo.");
        } finally {
            setUploadingAvatar(false);
        }
    };

    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const tabs = [
        { id: 'profile', label: 'Mon Profil', icon: User },
        { id: 'orders', label: 'Mes Commandes', icon: Package },
        { id: 'favorites', label: 'Favoris', icon: Heart },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                
                {/* Premium Header Section */}
                <div className="mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl min-h-[400px] flex items-center bg-gray-900"
                    >
                        {/* Background Image / Overlay */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        </div>


                        <div className="absolute top-0 left-0 p-12 opacity-[0.05] luxury-text text-[12rem] pointer-events-none select-none z-0">VIIP</div>
                        
                        <div className="relative z-10 w-full pt-10 px-10 pb-24 md:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                            {/* Large Circular Avatar */}
                            <div className="relative shrink-0 group">
                                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-8 border-white/10 overflow-hidden shadow-2xl transition-all duration-700 relative">
                                    {uploadingAvatar ? (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
                                            <Loader2 size={32} className="animate-spin text-white" />
                                        </div>
                                    ) : null}
                                    {user.photo_url ? (
                                        <Image src={imageUrl(user.photo_url)} alt={user.name} fill className="object-cover rounded-full" />
                                    ) : (
                                        <div className="absolute inset-0 bg-primary flex items-center justify-center text-5xl font-sans font-light text-white">
                                            {user.name?.[0] || user.email?.[0]}
                                        </div>
                                    )}
                                    
                                    {/* Upload Button Overlay */}
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 z-10 cursor-pointer backdrop-blur-[2px]"
                                    >
                                        <Camera size={32} className="text-white" />
                                        <span className="text-[10px] uppercase font-black text-white tracking-widest">Changer</span>
                                    </button>
                                </div>
                                <div className="absolute -bottom-2 right-4 w-12 h-12 bg-white border border-gray-100 shadow-xl rounded-full flex items-center justify-center text-primary z-30">
                                    <Crown size={24} />
                                </div>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    accept="image/*" 
                                    onChange={handleAvatarChange} 
                                />
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-4 mb-6">
                                    <h1 className="text-4xl md:text-6xl font-sans font-light tracking-tight">
                                        <span className="text-white">Bonjour,</span> <span className="text-[#C5A059]">{user.name?.split(' ')[0]}</span>
                                    </h1>
                                    <span className="inline-flex items-center justify-center px-4 py-1.5 bg-[#C5A059]/20 backdrop-blur-md border border-[#C5A059]/30 text-[10px] uppercase tracking-[0.3em] font-black text-[#C5A059] rounded-full">
                                        Membre Ambassadeur
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shadow-lg border border-white/10 text-[#C5A059]">
                                            <ShoppingBag size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-[#C5A059] font-black drop-shadow-sm">Investissement</p>
                                            <p className="text-lg font-sans font-light text-white font-bold">{totalSpent?.toLocaleString()} <span className="text-[8px] text-[#C5A059] uppercase font-black">DH</span></p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shadow-lg border border-white/10 text-[#C5A059]">
                                            <Package size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-[#C5A059] font-black drop-shadow-sm">Expériences</p>
                                            <p className="text-lg font-sans font-light text-white font-bold">{orders.length} Commandes</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shadow-lg border border-white/10 text-[#C5A059]">
                                            <Calendar size={14} />
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase tracking-widest text-[#C5A059] font-black drop-shadow-sm">Maison rejoint en</p>
                                            <p className="text-lg font-sans font-light text-white font-bold">
                                                {getJoinDate(user?.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div className="absolute bottom-6 md:bottom-2 left-6 right-6 md:left-auto md:right-16 flex items-center justify-between md:justify-end gap-4 z-40">
                                    {user.role === 'admin' ? (
                                        <Link 
                                            href="/admin"
                                            className="flex-1 md:flex-none px-6 py-3 md:px-8 md:py-4 bg-primary text-white text-[9px] md:text-[10px] uppercase tracking-widest font-black transition-all rounded-xl md:rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-105"
                                        >
                                            <Settings size={14} />
                                            <span>Administration</span>
                                        </Link>
                                    ) : (
                                        <div className="flex-1 md:hidden" /> // Spacer if not admin on mobile
                                    )}

                                    {/* Mobile Red Logout Icon */}
                                    <button 
                                        onClick={() => logout()}
                                        className="md:hidden w-11 h-11 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                        title="Se Déconnecter"
                                    >
                                        <LogOut size={18} />
                                    </button>

                                    {/* Desktop Logout Button */}
                                    <button 
                                        onClick={() => logout()}
                                        className="hidden md:flex w-full md:w-auto px-6 py-3 md:px-8 md:py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-[9px] md:text-[10px] uppercase tracking-widest font-black transition-all rounded-xl md:rounded-2xl items-center justify-center gap-2 backdrop-blur-md group"
                                    >
                                        <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
                                        <span>Se Déconnecter</span>
                                    </button>
                                </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    
                    {/* Sidebar Navigation */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white border border-gray-100 rounded-[2rem] p-4 sticky top-40 shadow-sm space-y-2">
                            <p className="px-6 text-[9px] uppercase tracking-[0.4em] font-black text-gray-400 mb-4 pt-2">Navigation Maison</p>
                            <div className="flex flex-col gap-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id as TabType);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={cn(
                                            "flex items-center justify-between px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-black transition-all rounded-2xl group",
                                            activeTab === tab.id 
                                            ? "bg-gray-900 text-white shadow-2xl scale-[1.02] z-10" 
                                            : "text-gray-400 hover:bg-[#FAF9F6] hover:text-primary"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
                                            <span>{tab.label}</span>
                                        </div>
                                        <ChevronRight size={14} className={cn("transition-transform group-hover:translate-x-1", activeTab === tab.id ? "opacity-100" : "opacity-0")} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white border border-gray-100 rounded-sm p-8 md:p-12 shadow-sm min-h-[600px]"
                            >
                                {activeTab === 'profile' && (
                                    <div className="space-y-16">
                                        {/* Gift System Section */}
                                        <section className="relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] luxury-text text-8xl pointer-events-none select-none">REWARD</div>
                                            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-gray-50">
                                                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 border border-amber-100 shadow-sm">
                                                    <Gift size={20} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-sans font-light text-gray-900 uppercase tracking-[0.2em]">Coffret Privilège Maison</h3>
                                                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">Programme de Fidélité Exclusive</p>
                                                </div>
                                            </div>

                                            {giftConfig && (giftConfig.active !== false || giftConfig.giftProductIds?.length > 0) ? (() => {
                                                const giftCount = user.freeGiftsEarned || 0;
                                                const threshold = giftConfig.threshold || 2500;
                                                // Fixed: Use explicit spentOnGifts to avoid the bug where Stamped Gifts (buy 6 items) 
                                                // artificially wipe out the DH progress balance.
                                                const spentOnGifts = user.spentOnGifts || 0;
                                                const netSpent = Math.max(0, totalSpent - spentOnGifts);
                                                // If they passed the threshold, progress is 100% until they claim it.
                                                const progressPercent = Math.min((netSpent / threshold) * 100, 100);
                                                const remaining = Math.max(0, threshold - netSpent);

                                                return (
                                                    <div className="bg-[#FAF9F6] p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm relative z-10">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                                            <div className="space-y-8">
                                                                <div className="flex justify-between items-start">
                                                                    <div>
                                                                        <h4 className="text-2xl font-sans font-light text-gray-900 mb-4">Objectif Cadeau Royal</h4>
                                                                        <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                                                                            Une fois le seuil de <span className="text-primary font-bold">{threshold} DH</span> atteint, la Maison Vitasilk vous offre une pièce d'exception.
                                                                        </p>
                                                                    </div>
                                                                    {giftCount > 0 && (
                                                                        <div className="text-right">
                                                                            <p className="text-[10px] uppercase font-black text-primary tracking-widest">Héritage Privilège</p>
                                                                            <p className="text-xl font-sans font-light text-gray-900">{giftCount} Cadeaux Reçus</p>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="space-y-4">
                                                                    <div className="flex justify-between items-end">
                                                                        <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Progression de l'Objectif</span>
                                                                        <span className="text-xs font-bold text-gray-900">{netSpent.toLocaleString()} / {threshold.toLocaleString()} DH</span>
                                                                    </div>
                                                                    <div className="h-4 w-full bg-white rounded-full overflow-hidden border border-gray-100 shadow-inner p-1">
                                                                        <motion.div 
                                                                            initial={{ width: 0 }}
                                                                            animate={{ width: `${progressPercent}%` }}
                                                                            className="h-full bg-gradient-to-r from-primary to-amber-400 rounded-full shadow-lg"
                                                                        />
                                                                    </div>
                                                                    <p className="text-[9px] text-gray-400 font-medium italic">
                                                                        {netSpent >= threshold 
                                                                            ? "Félicitations ! Votre nouveau cadeau est prêt." 
                                                                            : `Plus que ${remaining.toLocaleString()} DH d'achats validés pour débloquer votre prochain cadeau.`}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-3xl border border-gray-100 shadow-xl gap-6">
                                                                <div className={cn(
                                                                    "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700",
                                                                    netSpent >= threshold ? "bg-amber-100 text-amber-600 scale-110 shadow-2xl shadow-amber-500/20" : "bg-gray-50 text-gray-300"
                                                                )}>
                                                                    <Star size={40} className={netSpent >= threshold ? "fill-amber-600 animate-pulse" : ""} />
                                                                </div>
                                                                <div>
                                                                    {netSpent >= threshold ? (
                                                                        claiming ? (
                                                                            <button disabled className="px-10 py-5 bg-gray-100 text-gray-400 text-[11px] uppercase font-black tracking-widest rounded-2xl cursor-not-allowed flex items-center gap-2">
                                                                                <Loader2 size={14} className="animate-spin" />
                                                                                <span>Traitement...</span>
                                                                            </button>
                                                                        ) : (
                                                                            <button 
                                                                                onClick={() => setShowGiftModal(true)}
                                                                                className="px-10 py-5 bg-gray-900 text-white text-[11px] uppercase font-black tracking-widest rounded-2xl hover:bg-black transition-all shadow-2xl relative group"
                                                                            >
                                                                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-ping opacity-75" />
                                                                                <span>Réclamer mon Cadeau</span>
                                                                            </button>
                                                                        )
                                                                    ) : (
                                                                        <div className="px-10 py-5 bg-gray-50 text-gray-400 text-[11px] uppercase font-black tracking-widest rounded-2xl border border-gray-100 cursor-not-allowed">
                                                                            Cadeau Verrouillé
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })() : !giftConfig ? (
                                                <div className="bg-[#FAF9F6] p-20 rounded-[2.5rem] border border-gray-100 flex items-center justify-center">
                                                    <Loader2 className="w-8 h-8 animate-spin text-primary/30" />
                                                </div>
                                            ) : (
                                                <div className="bg-[#FAF9F6] p-20 rounded-[2.5rem] border border-gray-100 flex flex-col items-center justify-center gap-4 text-center">
                                                    <Star className="text-gray-200" size={40} />
                                                    <p className="text-xs text-gray-400 italic">Le programme de récompenses est en cours de préparation.</p>
                                                </div>
                                            )}
                                        </section>

                                        {/* Detailed Information Section */}
                                        <section>
                                            <div className="flex items-center justify-between gap-4 mb-10 pb-4 border-b border-gray-50">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary border border-primary/10 shadow-sm">
                                                        <User size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-sans font-light text-gray-900 uppercase tracking-[0.2em]">Informations Personnelles</h3>
                                                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">Détails de votre compte Maison</p>
                                                    </div>
                                                </div>
                                                {!isEditing ? (
                                                    <button 
                                                        onClick={() => setIsEditing(true)}
                                                        className="px-6 py-3 bg-gray-900 text-white text-[10px] uppercase tracking-widest font-black rounded-xl hover:bg-primary transition-all shadow-lg shadow-gray-200"
                                                    >
                                                        Modifier le profil
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center gap-3">
                                                        <button 
                                                            onClick={() => setIsEditing(false)}
                                                            className="px-6 py-3 bg-gray-50 text-gray-400 text-[10px] uppercase tracking-widest font-black rounded-xl hover:bg-gray-100 transition-all"
                                                        >
                                                            Annuler
                                                        </button>
                                                        <button 
                                                            onClick={handleSaveProfile}
                                                            disabled={isSaving}
                                                            className="px-6 py-3 bg-primary text-white text-[10px] uppercase tracking-widest font-black rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                                                        >
                                                            {isSaving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                                                            Sauvegarder
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 pl-4">Identité</p>
                                                    <div className="flex items-center gap-4 p-6 bg-[#FAF9F6] rounded-3xl hover:bg-white border border-transparent hover:border-primary/20 transition-all shadow-sm">
                                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm"><User size={18} /></div>
                                                        <div className="flex flex-col flex-1">
                                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Nom Complet</span>
                                                            {isEditing ? (
                                                                <input 
                                                                    type="text"
                                                                    value={editForm.name}
                                                                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                                                    className="text-sm text-gray-900 font-bold bg-white border border-gray-100 rounded-lg px-3 py-1 mt-1 focus:outline-none focus:border-primary"
                                                                />
                                                            ) : (
                                                                <span className="text-sm text-gray-900 font-bold">{user.name}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 pl-4">Contact Privé</p>
                                                    <div className="flex items-center gap-4 p-6 bg-[#FAF9F6] rounded-3xl border border-transparent opacity-70 cursor-not-allowed">
                                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm"><Mail size={18} /></div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Adresse Email (Non modifiable)</span>
                                                            <span className="text-sm text-gray-400 font-medium italic">{user.email}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 pl-4">Ligne Directe</p>
                                                    <div className="flex items-center gap-4 p-6 bg-[#FAF9F6] rounded-3xl hover:bg-white border border-transparent hover:border-primary/20 transition-all shadow-sm">
                                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm"><Phone size={18} /></div>
                                                        <div className="flex flex-col flex-1">
                                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Téléphone</span>
                                                            {isEditing ? (
                                                                <input 
                                                                    type="text"
                                                                    value={editForm.phone}
                                                                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                                                    className="text-sm text-gray-900 font-bold bg-white border border-gray-100 rounded-lg px-3 py-1 mt-1 focus:outline-none focus:border-primary"
                                                                    placeholder="06XXXXXXXX"
                                                                />
                                                            ) : (
                                                                <span className="text-sm text-gray-900 font-bold">{user.phone || 'Non renseigné'}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 pl-4">Signature Temporelle</p>
                                                    <div className="flex items-center gap-4 p-6 bg-[#FAF9F6] rounded-3xl border border-transparent">
                                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm"><Clock size={18} /></div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Membre Depuis</span>
                                                            <span className="text-sm text-gray-900 font-bold">
                                                                {getJoinDate(user?.created_at)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Address Section */}
                                        <section>
                                            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-gray-50">
                                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                                                    <MapPin size={18} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-sans font-light text-gray-900 uppercase tracking-[0.2em]">Adresse de Résidence</h3>
                                                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">Lieu de livraison habituel</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {/* Street */}
                                                <div className="flex items-center gap-4 p-6 bg-[#FAF9F6] rounded-3xl hover:bg-white border border-transparent hover:border-primary/20 transition-all shadow-sm">
                                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                                                        <MapPin size={16} />
                                                    </div>
                                                    <div className="flex flex-col flex-1">
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Adresse / Rue</span>
                                                        {isEditing ? (
                                                            <input
                                                                type="text"
                                                                value={editForm.address.street}
                                                                onChange={(e) => setEditForm({ ...editForm, address: { ...editForm.address, street: e.target.value } })}
                                                                placeholder="N° et nom de rue, appartement..."
                                                                className="text-sm text-gray-900 font-bold bg-white border border-gray-100 rounded-lg px-3 py-1 mt-1 focus:outline-none focus:border-primary"
                                                            />
                                                        ) : (
                                                            <span className="text-sm text-gray-900 font-bold">
                                                                {parseAddress(user.address).street || '—'}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* City + ZIP */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="flex items-center gap-4 p-6 bg-[#FAF9F6] rounded-3xl hover:bg-white border border-transparent hover:border-primary/20 transition-all shadow-sm relative">
                                                        <div className="flex flex-col flex-1">
                                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ville</span>
                                                            {isEditing ? (
                                                                <>
                                                                    <input
                                                                        type="text"
                                                                        value={citySearch}
                                                                        onChange={(e) => handleCitySearch(e.target.value)}
                                                                        onFocus={() => citySearch.length >= 1 && setShowCitySuggestions(true)}
                                                                        onBlur={() => setTimeout(() => setShowCitySuggestions(false), 150)}
                                                                        placeholder="Casablanca"
                                                                        className="text-sm text-gray-900 font-bold bg-white border border-gray-100 rounded-lg px-3 py-1 mt-1 focus:outline-none focus:border-primary"
                                                                    />
                                                                    {showCitySuggestions && citySuggestions.length > 0 && (
                                                                        <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-48 overflow-y-auto">
                                                                            {citySuggestions.map((city) => (
                                                                                <button
                                                                                    key={city.name}
                                                                                    onMouseDown={() => selectCity(city)}
                                                                                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-primary/5 hover:text-primary transition-colors"
                                                                                >
                                                                                    {city.name}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <span className="text-sm text-gray-900 font-bold">
                                                                    {parseAddress(user.address).city || '—'}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 p-6 bg-[#FAF9F6] rounded-3xl hover:bg-white border border-transparent hover:border-primary/20 transition-all shadow-sm">
                                                        <div className="flex flex-col flex-1">
                                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Code Postal</span>
                                                            {isEditing ? (
                                                                <input
                                                                    type="text"
                                                                    value={editForm.address.zip}
                                                                    onChange={(e) => setEditForm({ ...editForm, address: { ...editForm.address, zip: e.target.value } })}
                                                                    placeholder="20000"
                                                                    className="text-sm text-gray-900 font-bold bg-white border border-gray-100 rounded-lg px-3 py-1 mt-1 focus:outline-none focus:border-primary"
                                                                />
                                                            ) : (
                                                                <span className="text-sm text-gray-900 font-bold">
                                                                    {parseAddress(user.address).zip || '—'}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Region */}
                                                <div className="flex items-center gap-4 p-6 bg-[#FAF9F6] rounded-3xl hover:bg-white border border-transparent hover:border-primary/20 transition-all shadow-sm">
                                                    <div className="flex flex-col flex-1">
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Région</span>
                                                        {isEditing ? (
                                                            <select
                                                                value={editForm.address.region}
                                                                onChange={(e) => setEditForm({ ...editForm, address: { ...editForm.address, region: e.target.value } })}
                                                                className="text-sm text-gray-900 font-bold bg-white border border-gray-100 rounded-lg px-3 py-1 mt-1 focus:outline-none focus:border-primary"
                                                            >
                                                                <option value="">Sélectionnez votre région</option>
                                                                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                                                            </select>
                                                        ) : (
                                                            <span className="text-sm text-gray-900 font-bold">
                                                                {parseAddress(user.address).region || '—'}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )}

                                {activeTab === 'orders' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                                            <h3 className="text-xl font-sans font-light text-gray-900 uppercase tracking-widest">Historique des Commandes</h3>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{orders.length} commandes</span>
                                        </div>

                                        {loadingData ? (
                                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                                <Loader2 className="w-8 h-8 animate-spin text-primary/30" />
                                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Chargement de vos commandes...</p>
                                            </div>
                                        ) : orders.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
                                                <div className="w-20 h-20 bg-[#FDFBF7] rounded-full flex items-center justify-center">
                                                    <ShoppingBag size={32} className="text-gray-300" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-2">Vous n'avez pas encore passé de commande chez Vitasilk.</p>
                                                    <Link href="/boutique" className="text-[10px] uppercase tracking-widest font-black text-primary hover:text-black transition-colors">Découvrir la Boutique</Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {orders.map((order) => (
                                                    <div key={order.id} className="group border border-gray-100 rounded-sm p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all">
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-50">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 bg-[#FDFBF7] rounded-sm flex items-center justify-center">
                                                                    <Truck size={20} className="text-primary/70" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">N° de Commande</p>
                                                                    <div className="flex items-center gap-2">
                                                                        <p className="text-sm font-sans font-bold text-gray-900">#VT-{order.id}</p>
                                                                        {order.isGift && (
                                                                            <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-[8px] font-black uppercase tracking-tighter rounded-sm flex items-center gap-1">
                                                                                <Gift size={10} />
                                                                                Cadeau
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-8">
                                                                <div>
                                                                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Date</p>
                                                                    <p className="text-sm text-gray-600 font-medium">
                                                                        {order.created_at ? new Date(order.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Total</p>
                                                                    <p className="text-sm text-primary font-bold">
                                                                        {`${Number(order.total_price || 0).toLocaleString()} DH`}
                                                                    </p>
                                                                </div>
                                                                <div className="hidden sm:block">
                                                                    <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Statut</p>
                                                                    <span className={cn(
                                                                        "inline-flex items-center px-3 py-1 text-[8px] uppercase tracking-wider font-black rounded-full",
                                                                        order.status === 'delivered' ? "bg-green-50 text-green-600" :
                                                                        order.status === 'shipped' ? "bg-blue-50 text-blue-600" :
                                                                        order.status === 'pending' ? "bg-amber-50 text-amber-600" :
                                                                        "bg-gray-50 text-gray-600"
                                                                    )}>
                                                                        {order.status === 'delivered' ? 'Livrée' :
                                                                         order.status === 'shipped' ? 'En cours' :
                                                                         order.status === 'pending' ? 'En attente' :
                                                                         order.status || 'Traitement'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                            <div className="flex -space-x-3">
                                                                {(order.items || []).slice(0, 4).map((item: any, idx: number) => (
                                                                    <div key={idx} className="relative w-14 h-14 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm flex items-center justify-center">
                                                                        <Package size={20} className="text-gray-300" />
                                                                    </div>
                                                                ))}
                                                                {order.items?.length > 4 && (
                                                                    <div className="relative w-14 h-14 rounded-full border-2 border-white bg-gray-900 flex items-center justify-center text-[10px] text-white font-bold shadow-sm z-10">
                                                                        +{order.items.length - 4}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <Link 
                                                                    href={`/track-order?id=VT-${order.id}&phone=${order.phone || ''}`}
                                                                    className="flex-1 px-4 py-3 bg-[#FDFBF7] text-[9px] uppercase tracking-[0.2em] font-bold text-gray-700 hover:bg-primary hover:text-white transition-all text-center rounded-sm"
                                                                >
                                                                    Suivre l'envoi
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'notifications' && (
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                                            <h3 className="text-xl font-sans font-light text-gray-900 uppercase tracking-widest">Vos Notifications</h3>
                                            <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:text-black transition-colors">Tout marquer comme lu</button>
                                        </div>

                                        {loadingData ? (
                                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                                <Loader2 className="w-8 h-8 animate-spin text-primary/30" />
                                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Récupération des alertes...</p>
                                            </div>
                                        ) : notifications.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
                                                <div className="w-20 h-20 bg-[#FDFBF7] rounded-full flex items-center justify-center">
                                                    <Bell size={32} className="text-gray-300" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-2">Aucune nouvelle notification pour le moment.</p>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Nous vous tiendrons informé des nouveautés.</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {notifications.map((notif) => (
                                                    <div key={notif.id} className={cn(
                                                        "flex gap-6 p-6 border rounded-sm transition-all",
                                                        notif.read ? "bg-white border-gray-50" : "bg-primary/5 border-primary/10 shadow-sm"
                                                    )}>
                                                        <div className={cn(
                                                            "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                                                            notif.type === 'order' ? "bg-amber-100 text-amber-600" :
                                                            notif.type === 'offer' ? "bg-rose-100 text-rose-600" :
                                                            "bg-blue-100 text-blue-600"
                                                        )}>
                                                            {notif.type === 'order' ? <Package size={20} /> :
                                                             notif.type === 'offer' ? <CheckCircle2 size={20} /> :
                                                             <Bell size={20} />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-2">
                                                                 <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">{notif.title}</h4>
                                                                 <span className="text-[9px] text-gray-400 flex items-center gap-1 font-medium">
                                                                     <Clock size={10} />
                                                                     {notif.created_at ? new Date(notif.created_at).toLocaleDateString('fr-FR') : ''}
                                                                 </span>
                                                            </div>
                                                            <p className="text-sm text-gray-600 leading-relaxed mb-4">{notif.message}</p>
                                                            {notif.actionUrl && (
                                                                <Link 
                                                                    href={notif.actionUrl}
                                                                    className="text-[10px] uppercase tracking-widest font-black text-primary hover:text-black transition-colors"
                                                                >
                                                                    Voir les détails
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'favorites' && (
                                    <div className="space-y-12">
                                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-50 pb-8">
                                            <div>
                                                <h3 className="text-2xl font-sans font-light text-gray-900 uppercase tracking-[0.2em]">Ma Sélection Privée</h3>
                                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Vos pièces d'exception favorites</p>
                                            </div>
                                            <div className="text-[10px] uppercase font-black text-primary tracking-widest bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                                                {wishlist.length} Articles
                                            </div>
                                        </div>

                                        {wishlist.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                                                {wishlist.map((product) => (
                                                    <motion.div
                                                        key={product.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                    >
                                                        <ProductCard product={product} />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="py-32 text-center">
                                                <Heart className="mx-auto text-gray-100 mb-8" size={80} strokeWidth={1} />
                                                <p className="text-xl font-sans font-light text-gray-300 uppercase tracking-widest mb-4">Votre galerie est vide</p>
                                                <Link href="/shop" className="text-[10px] uppercase font-black text-primary border-b border-primary/20 pb-1 hover:border-primary transition-all">
                                                    Découvrir la collection
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}

                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>

            {/* Claim Gift Modal */}
            <AnimatePresence>
                {showGiftModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowGiftModal(false)}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                        >
                            <div className="p-10 border-b border-gray-50 flex justify-between items-center bg-[#FAF9F6]">
                                <div>
                                    <h3 className="text-2xl font-sans font-light text-gray-900 uppercase tracking-widest">Choisissez Votre Cadeau</h3>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Séléction de la Maison Vitasilk</p>
                                </div>
                                <button onClick={() => setShowGiftModal(false)} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-black transition-all shadow-sm">
                                    <ChevronRight size={24} className="rotate-90 md:rotate-0" />
                                </button>
                            </div>

                            <div className="p-10 overflow-y-auto flex-1 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {giftPool.map((product) => (
                                        <motion.div 
                                            key={product.id}
                                            whileHover={{ y: -5 }}
                                            className="group flex flex-col bg-[#FAF9F6] rounded-[2rem] border border-gray-100 overflow-hidden transition-all hover:bg-white hover:border-primary/20 hover:shadow-2xl"
                                        >
                                            <div className="aspect-square relative overflow-hidden bg-gray-100 mb-6">
                                                <Image src={product.images?.[0] ? imageUrl(product.images[0]) : '/img/placeholder.jpg'} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                            </div>
                                            <div className="px-8 pb-8 flex-1 flex flex-col gap-4">
                                                <div className="flex-1">
                                                    <p className="text-[9px] uppercase font-black tracking-widest text-primary mb-1">Cadeau Disponible</p>
                                                    <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{product.name}</h4>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setClaimedGift(true);
                                                        setShowGiftModal(false);
                                                    }}
                                                    className="w-full py-4 bg-gray-900 group-hover:bg-primary text-white text-[10px] uppercase font-black tracking-widest rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2"
                                                >
                                                    {claiming ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                                                    <span>Sélectionner</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {giftPool.length === 0 && (
                                        <div className="col-span-full py-20 text-center">
                                            <p className="text-xs text-gray-400 italic">Chargement de la sélection exclusive...</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-10 border-t border-gray-50 bg-[#FAF9F6] text-center">
                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em]">Votre fidélité est le cœur de notre Maison.</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function AccountPage() {
    return (
        <React.Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        }>
            <AccountPageContent />
        </React.Suspense>
    );
}
