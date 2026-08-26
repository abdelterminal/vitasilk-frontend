"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useDiscount } from '@/context/DiscountContext';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trash2,
    Minus,
    Plus,
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
    Lock,
    ShoppingBag,
    Truck,
    CreditCard,
    Zap
} from 'lucide-react';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
    const { discount: eventDiscount } = useDiscount();

    const discountAmount = eventDiscount ? (cartTotal * eventDiscount.percentage) / 100 : 0;
    const finalTotal = cartTotal - discountAmount;

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <Link href="/boutique" className="inline-flex items-center text-[10px] uppercase tracking-[0.4em] font-black text-gray-400 hover:text-primary transition-all group">
                            <ArrowLeft size={14} className="mr-3 group-hover:-translate-x-1 transition-transform" />
                            Continuer le shopping
                        </Link>
                        <div className="relative">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-5xl md:text-7xl font-sans font-light text-gray-950 tracking-tighter"
                            >
                                Votre Panier
                            </motion.h1>
                            <div className="absolute -top-10 -left-6 opacity-[0.03] luxury-text text-9xl pointer-events-none select-none text-primary">Prestige</div>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.5em] font-black text-primary flex items-center gap-3">
                            <ShoppingBag size={12} />
                            {cartCount} Article{cartCount > 1 ? 's' : ''} Sélectionné{cartCount > 1 ? 's' : ''}
                        </p>
                    </div>

                    <div className="hidden lg:flex items-center gap-8 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-2xl border border-amber-100/30">
                        <div className="flex items-center gap-3">
                            <Truck size={18} className="text-primary/60" />
                            <div>
                                <p className="text-[9px] uppercase font-black tracking-widest text-gray-400">Livraison</p>
                                <p className="text-[11px] font-bold text-gray-900">Offerte dès 1500 DH</p>
                            </div>
                        </div>
                        <div className="w-[1px] h-8 bg-amber-100/50" />
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={18} className="text-primary/60" />
                            <div>
                                <p className="text-[9px] uppercase font-black tracking-widest text-gray-400">Sécurité</p>
                                <p className="text-[11px] font-bold text-gray-900">Paiement SSL</p>
                            </div>
                        </div>
                    </div>
                </div>

                {cart.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-32 bg-white rounded-[3rem] border border-amber-100/30 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.02)] relative overflow-hidden"
                    >
                        <div className="absolute inset-0 opacity-[0.01] pointer-events-none select-none flex items-center justify-center luxury-text text-[20rem] text-primary">V</div>
                        <div className="relative z-10 max-w-md mx-auto space-y-8">
                            <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10 group hover:scale-110 transition-all duration-700">
                                <ShoppingBag size={48} className="text-primary/20 group-hover:text-primary transition-colors" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-3xl font-sans font-light text-gray-950">Votre panier est vide</h2>
                                <p className="text-sm text-gray-500 font-light leading-relaxed">
                                    Plongez dans l'univers Vitasilk et découvrez nos soins d'exception pour une beauté sublimée.
                                </p>
                            </div>
                            <Link
                                href="/boutique"
                                className="inline-flex items-center gap-4 px-12 py-5 bg-gray-950 text-white text-[10px] uppercase tracking-[0.5em] font-black hover:bg-primary transition-all duration-700 shadow-2xl shadow-gray-200 rounded-2xl group"
                            >
                                Découvrir la Collection
                                <Zap size={14} className="group-hover:rotate-12 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-8 space-y-8">
                            <AnimatePresence mode="popLayout">
                                {cart.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, x: -50 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-amber-100/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 flex flex-col sm:flex-row gap-10 items-center relative group"
                                    >
                                        <Link
                                            href={`/product/${item.id}`}
                                            className="relative w-40 h-48 bg-[#FDFBF7] flex-shrink-0 rounded-3xl overflow-hidden block shadow-inner border border-amber-100/10"
                                        >
                                            <Image
                                                src={item.product?.images?.[0] || item.product?.image || '/img/logo.png'}
                                                alt={item.product?.name}
                                                fill
                                                className="object-contain p-6 group-hover:scale-105 transition-transform duration-1000"
                                            />
                                        </Link>

                                        <div className="flex-grow flex flex-col h-full w-full py-2">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                                                <div className="space-y-2">
                                                    <p className="text-[9px] uppercase tracking-[0.4em] font-black text-primary/60">{item.product?.category || 'Collection Exclusive'}</p>
                                                    <Link href={`/product/${item.id}`}>
                                                        <h3 className="font-sans font-light text-2xl text-gray-950 hover:text-primary transition-colors leading-tight line-clamp-2">{item.product?.name}</h3>
                                                    </Link>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-gray-950">{item.product?.price?.toLocaleString()} DH</p>
                                                    <p className="text-[9px] text-gray-400 font-medium">Prix Unitaire</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between w-full mt-auto pt-8 border-t border-gray-50">
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center bg-[#FDFBF7] rounded-xl border border-amber-100/50 p-1 shadow-inner">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-10 text-center text-xs font-black text-gray-950">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            disabled={item.quantity >= (item.product?.stock || 999)}
                                                            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all disabled:opacity-20"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="h-6 w-[1px] bg-gray-100" />
                                                    <p className="text-sm font-bold text-primary">{(item.product?.price * item.quantity).toLocaleString()} DH <span className="text-[9px] text-gray-400 font-medium grayscale">Subtotal</span></p>
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-10 h-10 rounded-full bg-rose-50 text-rose-400 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center group/trash"
                                                >
                                                    <Trash2 size={16} className="group-hover/trash:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-gray-950 text-white p-10 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-10 opacity-[0.05] luxury-text text-8xl pointer-events-none select-none">V</div>

                                <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-primary mb-10 flex items-center gap-3">
                                    <Zap size={12} /> Récapitulatif
                                </h3>

                                <div className="space-y-6 mb-12">
                                    <div className="flex justify-between items-center text-sm font-light text-gray-400">
                                        <span>Total Articles</span>
                                        <span className="font-medium text-white">{cartTotal.toLocaleString()} DH</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-light text-gray-400">
                                        <span>Frais d'Expédition Luxe</span>
                                        <span className="text-primary italic">Offert</span>
                                    </div>
                                    {eventDiscount && (
                                        <div className="flex justify-between items-center text-sm font-medium text-primary">
                                            <span>Privilège {eventDiscount.eventName} (-{eventDiscount.percentage}%)</span>
                                            <span>-{discountAmount.toLocaleString()} DH</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-sm font-light text-gray-400">
                                        <span>Taxe Estivale</span>
                                        <span className="font-medium text-white">0.00 DH</span>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/10 mb-10 flex justify-between items-end">
                                    <div>
                                        <p className="text-[9px] uppercase font-black tracking-[0.3em] text-primary/60 mb-1">Montant Total</p>
                                        <p className="text-4xl font-sans font-light tracking-tighter">{finalTotal.toLocaleString()} <span className="text-xl">DH</span></p>
                                    </div>
                                    <div className="text-[10px] text-gray-500 italic">TVA incluse</div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="w-full py-6 bg-primary text-white text-[10px] uppercase font-black tracking-[0.4em] hover:bg-white hover:text-gray-950 transition-all duration-700 shadow-2xl shadow-primary/10 flex items-center justify-center gap-4 group rounded-2xl"
                                >
                                    Paiement Sécurisé
                                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                                </Link>
                            </motion.div>

                            {/* Trust Badges */}
                            <div className="bg-white p-10 rounded-[3rem] border border-amber-100/20 shadow-sm space-y-8">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-950 mb-1">Authenticité Garantie</h4>
                                        <p className="text-[11px] text-gray-400 font-light leading-relaxed">Chaque coffret Vitasilk est accompagné de son certificat d'origine.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <Lock size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-950 mb-1">Confidentialité SSL</h4>
                                        <p className="text-[11px] text-gray-400 font-light leading-relaxed">Vos données bancaires sont cryptées selon les protocoles les plus stricts.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <CreditCard size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] uppercase font-black tracking-widest text-gray-950 mb-1">Facilités de Paiement</h4>
                                        <p className="text-[11px] text-gray-400 font-light leading-relaxed">Réglez en toute sérénité par carte bancaire ou à la livraison.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
