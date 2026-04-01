"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useDiscount } from '@/context/DiscountContext';
import { ordersApi, promotionsApi } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    User,
    Phone,
    Mail,
    MapPin,
    X,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Truck,
    CreditCard,
    Banknote,
    ShieldCheck,
    Lock,
    Package,
    ArrowLeft,
    Loader2,
    Copy,
    Check,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Step = 1 | 2 | 3;
type PaymentMethod = 'cash' | 'transfer';

interface CustomerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface DeliveryAddress {
    street: string;
    city: string;
    region: string;
    zip: string;
    notes: string;
}

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

const MOROCCAN_CITIES = [
    "Agadir", "Al Hoceïma", "Béni Mellal", "Berkane", "Berrechid", 
    "Casablanca", "Chefchaouen", "Dakhla", "El Jadida", "Errachidia", 
    "Essaouira", "Fès", "Guelmim", "Ifrane", "Kénitra", "Khemisset", 
    "Khenifra", "Khouribga", "Laâyoune", "Larache", "Marrakech", 
    "Meknès", "Midelt", "Mohammedia", "Nador", "Ouarzazate", "Oujda", 
    "Rabat", "Safi", "Salé", "Sefrou", "Settat", "Sidi Kacem", 
    "Tanger", "Tan-Tan", "Taounate", "Taroudant", "Taza", "Tétouan", 
    "Tiznit", "Zagora"
];

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, cartTotal, cartCount, clearCart } = useCart();
    const { user, userData } = useAuth();
    const { discount: eventDiscountData } = useDiscount();

    const [step, setStep] = useState<Step>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [copied, setCopied] = useState(false);

    const [showCityDropdown, setShowCityDropdown] = useState(false);

    // Promo Code
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');
    const [isApplyingPromo, setIsApplyingPromo] = useState(false);
    const [appliedPromo, setAppliedPromo] = useState<any>(null);

    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
        street: '',
        city: '',
        region: '',
        zip: '',
        notes: '',
    });

    // Prefill user data
    useEffect(() => {
        if (userData) {
            setCustomerInfo(prev => ({
                ...prev,
                firstName: userData.firstName || userData.name?.split(' ')[0] || '',
                lastName: userData.lastName || userData.name?.split(' ').slice(1).join(' ') || '',
                email: userData.email || user?.email || '',
                phone: userData.phone || '',
            }));

            // Prefill address if available in user document
            if (userData.address) {
                const addr = (() => {
                    if (typeof userData.address === 'object') return userData.address;
                    try { return JSON.parse(userData.address); } catch { return { city: userData.address }; }
                })();
                setDeliveryAddress(prev => ({
                    ...prev,
                    street: addr.street || '',
                    city: addr.city || '',
                    region: addr.region || '',
                    zip: addr.zip || addr.zipCode || '',
                }));
            }
        }
    }, [userData, user]);

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateStep1 = () => {
        const errs: Record<string, string> = {};
        if (!customerInfo.firstName.trim()) errs.firstName = 'Requis';
        if (!customerInfo.phone.trim() || customerInfo.phone.length < 9) errs.phone = 'Numéro invalide';
        if (!deliveryAddress.city.trim()) errs.city = 'Requis';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const applyPromo = async () => {
        if (!promoCode.trim()) return;
        setIsApplyingPromo(true);
        setPromoError('');
        try {
            const res = await promotionsApi.validate(promoCode.trim().toUpperCase());
            if (!res.success || !res.data) {
                setPromoError('Code invalide ou expiré');
                return;
            }
            const dAmount = (cartTotal * res.data.discount_percentage) / 100;
            setDiscount(dAmount);
            setAppliedPromo({ code: promoCode.trim().toUpperCase(), discount_percentage: res.data.discount_percentage });
        } catch (e) {
            setPromoError('Code invalide ou expiré');
        } finally {
            setIsApplyingPromo(false);
        }
    };

    const eventDiscountAmount = eventDiscountData ? (cartTotal * eventDiscountData.percentage) / 100 : 0;
    const finalTotal = Math.max(0, cartTotal - discount - eventDiscountAmount);

    const handlePlaceOrder = async () => {
        setIsSubmitting(true);
        try {
            const totalDiscountPct = cartTotal > 0
                ? ((discount + eventDiscountAmount) / cartTotal) * 100
                : 0;

            const res = await ordersApi.create({
                items: cart.map(item => ({ product_id: Number(item.product.id), quantity: item.quantity })),
                address: deliveryAddress.city,
                phone: customerInfo.phone,
                city: deliveryAddress.city,
                payment_method: paymentMethod === 'transfer' ? 'bank_transfer' : 'cash',
                notes: deliveryAddress.notes || undefined,
                discount_percentage: totalDiscountPct,
            });

            setOrderId(`VT-${res.data.id}`);
            clearCart();
            setStep(3);
        } catch (error) {
            console.error('Order failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCopyId = () => {
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const MOROCCAN_CITIES = [
        "Casablanca", "Rabat", "Fès", "Marrakech", "Tanger", "Agadir", "Meknès", "Oujda", "Kénitra", "Tétouan",
        "Safi", "Mohammédia", "Béni Mellal", "Khénifra", "Errachidia", "Nador", "Settat", "Taza", "El Jadida", "Laâyoune",
        "Khouribga", "Guelmim", "Berkane", "Sidi Slimane", "Fquih Ben Salah", "Larache", "Ksar El Kébir", "Dakhla", "Guerguerat",
        "Taroudant", "Essaouira", "Chefchaouen", "Al Hoceïma", "Ouarzazate", "Sidi Ifni", "Youssoufia", "Tiznit", "Midelt",
        "Azrou", "Ifrane", "Sefrou", "Guercif", "Jerada", "Bouarfa", "Figuig", "Zagora", "Tata", "Smara", "Tan-Tan",
        "Assa", "Fnideq", "M'diq", "Martil", "Ouazzane", "Sidi Kacem", "Rommani", "Ben Guerir", "Skhirat", "Temara",
        "Ain Harrouda", "Bouskoura", "Dar Bouazza", "Deroua", "Mediouna", "Tit Mellil", "Nouaceur", "Berrechid", "Souk Sebt Oulad Nemma",
        "Demnate", "Azilal", "Kelaat Sraghna", "Chichaoua", "Imintanoute", "Biougra", "Ait Melloul", "Dcheira El Jihadia",
        "Inzegane", "Drarga", "Oulad Teima", "Sidi Bibi", "Temsia", "Lqliaa", "Bouizakarne", "Goulmima", "Rich", "Tinghir",
        "Khemisset", "Sidi Yahya Zaer", "Had Soualem", "Lissasfa", "Saidia", "Ahfir", "Zaio", "Debdou", "Tafraout", "Akka",
        "Foum Zguid", "Boujdour", "Es-Semara", "Aousserd", "Lagouira"
    ];

    const STEPS = [
        { num: 1, label: 'Informations' },
        { num: 3, label: 'Confirmation' },
    ];

    const filteredCities = MOROCCAN_CITIES.filter(c => 
        c.toLowerCase().startsWith(deliveryAddress.city.toLowerCase())
    );

    if (cart.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] pt-32 flex items-center justify-center px-6">
                <div className="text-center">
                    <Package size={48} className="text-gray-200 mx-auto mb-6" />
                    <p className="text-gray-500 font-light mb-8">Votre panier est vide.</p>
                    <Link href="/boutique" className="px-10 py-4 bg-primary text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all duration-500 shadow-xl shadow-primary/20">
                        Découvrir la Boutique
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                {step !== 3 && (
                    <div className="mb-12">
                        <Link
                            href="/cart"
                            className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors mb-6 group"
                        >
                            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Retour au Panier
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-sans font-light text-gray-900 tracking-tight">
                            Finaliser la Commande
                        </h1>
                    </div>
                )}

                {/* Step Indicator Removed as per single step requirement */}

                <AnimatePresence mode="wait">
                    {step !== 3 ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
                        >
                            {/* Form Section */}
                            <div className="lg:col-span-7">
                                <AnimatePresence mode="wait">
                                    {/* ======= FORM STEP ======= */}
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="bg-white border border-gray-100 p-8 md:p-12 rounded-sm shadow-sm"
                                        >
                                            <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-gray-900 mb-10 pb-4 border-b border-gray-100 flex items-center gap-3">
                                                <User size={16} className="text-primary" />
                                                Finaliser la Commande
                                            </h2>

                                            <div className="space-y-6">
                                                <FormField
                                                    label="Nom Complet"
                                                    icon={<User size={14} />}
                                                    error={errors.firstName}
                                                >
                                                    <input
                                                        type="text"
                                                        value={customerInfo.firstName}
                                                        onChange={e => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                                                        placeholder="Votre nom complet"
                                                        className={inputClass(!!errors.firstName)}
                                                    />
                                                </FormField>

                                                <FormField label="Ville" icon={<MapPin size={14} />} error={errors.city}>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            value={deliveryAddress.city}
                                                            onChange={e => {
                                                                setDeliveryAddress({ ...deliveryAddress, city: e.target.value });
                                                                setShowCityDropdown(true);
                                                            }}
                                                            onFocus={() => setShowCityDropdown(true)}
                                                            onBlur={() => setTimeout(() => setShowCityDropdown(false), 200)}
                                                            placeholder="Casablanca"
                                                            className={inputClass(!!errors.city)}
                                                        />
                                                        {showCityDropdown && filteredCities.length > 0 && (
                                                            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 shadow-xl max-h-48 overflow-y-auto rounded-sm">
                                                                {filteredCities.map(city => (
                                                                    <div
                                                                        key={city}
                                                                        className="px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                                                                        onMouseDown={e => {
                                                                            e.preventDefault();
                                                                            setDeliveryAddress({ ...deliveryAddress, city });
                                                                            setShowCityDropdown(false);
                                                                        }}
                                                                    >
                                                                        {city}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </FormField>

                                                <FormField
                                                    label="Numéro de Téléphone"
                                                    icon={<Phone size={14} />}
                                                    error={errors.phone}
                                                >
                                                    <input
                                                        type="tel"
                                                        value={customerInfo.phone}
                                                        onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                                        placeholder="+212 6XX XXX XXX"
                                                        className={inputClass(!!errors.phone)}
                                                    />
                                                </FormField>
                                            </div>

                                            <button
                                                onClick={() => { if (validateStep1()) handlePlaceOrder(); }}
                                                disabled={isSubmitting}
                                                className="mt-10 w-full py-5 bg-primary hover:bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-700 shadow-xl shadow-primary/10 flex items-center justify-center gap-3 disabled:opacity-50"
                                            >
                                                {isSubmitting ? (
                                                    <><Loader2 size={16} className="animate-spin" /> Traitement...</>
                                                ) : (
                                                    <><CheckCircle2 size={16} /> Passer la Commande</>
                                                )}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Order Summary Sidebar */}
                            <div className="lg:col-span-5">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm sticky top-32"
                                >
                                    <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100">
                                        Résumé — {cartCount} Article{cartCount > 1 ? 's' : ''}
                                    </h3>

                                    <div className="space-y-5 mb-8">
                                        {cart.map(item => (
                                            <div key={item.id} className="flex items-center gap-4 group">
                                                <div className="relative w-16 h-16 bg-[#FDFBF7] rounded-sm overflow-hidden flex-shrink-0 border border-gray-50">
                                                    <Image
                                                        src={item.product.images?.[0] || '/img/logo.png'}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-contain p-1"
                                                    />
                                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                                        {item.quantity}
                                                    </span>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="text-xs font-medium text-gray-900 line-clamp-2">{item.product.name}</p>
                                                    <p className="text-[9px] text-gray-400 mt-0.5">{item.product.category}</p>
                                                </div>
                                                <p className="text-sm font-bold text-gray-900 whitespace-nowrap">
                                                    {(item.product.price * item.quantity).toLocaleString()} DH
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3 pt-6 border-t border-gray-100">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Sous-total</span>
                                            <span>{cartTotal.toLocaleString()} DH</span>
                                        </div>

                                        {/* Promo Section */}
                                        <div className="py-4 border-y border-gray-50 my-2">
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Code de réduction"
                                                    className="flex-1 text-[10px] uppercase font-bold tracking-widest px-4 py-2 bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary/20 rounded-sm"
                                                    value={promoCode}
                                                    onChange={(e) => setPromoCode(e.target.value)}
                                                    disabled={!!appliedPromo}
                                                />
                                                <button
                                                    onClick={applyPromo}
                                                    disabled={isApplyingPromo || !!appliedPromo || !promoCode}
                                                    className="px-4 py-2 bg-gray-900 text-white text-[9px] uppercase font-bold tracking-widest hover:bg-black transition-all rounded-sm disabled:opacity-30"
                                                >
                                                    {isApplyingPromo ? <Loader2 size={12} className="animate-spin" /> : appliedPromo ? <Check size={12} /> : 'Appliquer'}
                                                </button>
                                            </div>
                                            {promoError && <p className="text-[9px] text-red-500 font-bold mt-2 uppercase tracking-tighter">{promoError}</p>}
                                            {appliedPromo && (
                                                <div className="flex justify-between items-center mt-3 p-2 bg-emerald-50 border border-emerald-100 rounded-sm">
                                                    <span className="text-[9px] text-emerald-700 font-bold uppercase tracking-widest">Code {appliedPromo.code} appliqué</span>
                                                    <button onClick={() => { setAppliedPromo(null); setDiscount(0); setPromoCode(''); }} className="text-emerald-700 hover:text-rose-500"><X size={12} /></button>
                                                </div>
                                            )}
                                        </div>

                                        {discount > 0 && (
                                            <div className="flex justify-between text-sm text-emerald-600 font-medium">
                                                <span>Code Promo ({appliedPromo?.code})</span>
                                                <span>-{discount.toLocaleString()} DH</span>
                                            </div>
                                        )}

                                        {eventDiscountAmount > 0 && (
                                            <div className="flex justify-between text-sm text-primary font-medium">
                                                <span>Remise Privilège (-{eventDiscountData?.percentage}%)</span>
                                                <span>-{eventDiscountAmount.toLocaleString()} DH</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Livraison</span>
                                            <span className="text-gray-400 text-xs">Offerte</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-4">
                                            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-sans text-primary">{finalTotal.toLocaleString()} DH</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-gray-50 space-y-3">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <ShieldCheck size={14} className="text-primary/70" />
                                            <span className="text-[9px] uppercase tracking-[0.1em]">Paiement Sécurisé</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Lock size={14} className="text-primary/70" />
                                            <span className="text-[9px] uppercase tracking-[0.1em]">Données Protégées</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Truck size={14} className="text-primary/70" />
                                            <span className="text-[9px] uppercase tracking-[0.1em]">Livraison Offerte au Maroc</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ) : (
                        /* ======= STEP 3: Success ======= */
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="max-w-2xl mx-auto text-center py-12"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                                className="w-24 h-24 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-8"
                            >
                                <CheckCircle2 size={48} className="text-green-500" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mb-4">Commande Confirmée</p>
                                <h1 className="text-4xl md:text-5xl font-sans font-light text-gray-900 tracking-tight mb-6">
                                    Merci pour votre confiance
                                </h1>
                                <p className="text-gray-500 font-light max-w-md mx-auto leading-relaxed mb-10">
                                    Votre commande a été reçue et sera préparée avec le plus grand soin. Vous recevrez une confirmation par email.
                                </p>

                                {/* Order ID Card */}
                                <div className="bg-white border border-primary/20 rounded-sm p-8 mb-10 relative overflow-hidden shadow-md">
                                    <div className="absolute top-0 right-0 p-4 opacity-[0.04] luxury-text text-7xl pointer-events-none select-none">Vitasilk</div>
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-3">Numéro de Commande</p>
                                    <div className="flex items-center justify-center gap-4">
                                        <p className="text-2xl md:text-3xl font-mono font-bold text-primary tracking-widest">{orderId}</p>
                                        <button
                                            onClick={handleCopyId}
                                            className="p-2 rounded-full bg-gray-50 hover:bg-primary/10 transition-colors text-gray-400 hover:text-primary"
                                            title="Copier le numéro"
                                        >
                                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                    <p className="text-[9px] text-gray-400 mt-3 ">Conservez ce numéro pour suivre votre commande</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={`/track-order?id=${orderId}&phone=${customerInfo.phone}`}
                                        className="px-10 py-4 bg-primary hover:bg-black text-white text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                                    >
                                        <Package size={14} />
                                        Suivre ma Commande
                                    </Link>
                                    <Link
                                        href="/"
                                        className="px-10 py-4 border border-gray-200 text-gray-700 text-[10px] uppercase tracking-[0.3em] font-bold hover:border-black hover:text-black transition-all"
                                    >
                                        Retour à l'Accueil
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ─── Helper sub-components ─── */

function inputClass(hasError: boolean) {
    return cn(
        "w-full py-4 px-5 border bg-[#FDFBF7]/50 text-sm focus:outline-none transition-all rounded-sm",
        hasError
            ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-50"
            : "border-gray-100 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 hover:border-gray-200"
    );
}

function FormField({
    label,
    icon,
    error,
    children,
}: {
    label: string;
    icon?: React.ReactNode;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-gray-500 flex items-center gap-2">
                {icon && <span className="text-primary">{icon}</span>}
                {label}
            </label>
            {children}
            {error && <p className="text-[9px] text-red-400 font-medium">{error}</p>}
        </div>
    );
}

function PaymentOption({
    id,
    selected,
    onSelect,
    icon,
    title,
    description,
}: {
    id: string;
    selected: boolean;
    onSelect: () => void;
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <button
            id={id}
            onClick={onSelect}
            className={cn(
                "w-full flex items-center gap-5 p-5 border rounded-sm transition-all text-left",
                selected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-gray-100 bg-white hover:border-gray-200"
            )}
        >
            <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                selected ? "bg-white shadow-sm" : "bg-gray-50"
            )}>
                {icon}
            </div>
            <div>
                <p className={cn("text-xs font-bold transition-colors", selected ? "text-gray-900" : "text-gray-600")}>{title}</p>
                <p className="text-[10px] text-gray-400 font-light mt-0.5">{description}</p>
            </div>
            <div className={cn(
                "ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                selected ? "border-primary bg-primary" : "border-gray-200"
            )}>
                {selected && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
        </button>
    );
}
