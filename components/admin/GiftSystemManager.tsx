"use client";

import React, { useState, useEffect } from 'react';
import { productsApi, adminApi, imageUrl, type Product } from '@/lib/api';
import {
    Gift,
    Search,
    Plus,
    Trash2,
    Settings,
    Package,
    TrendingUp,
    Check,
    Loader2,
    Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GiftConfig {
    threshold: number;
    giftProductIds: number[];
}

export default function GiftSystemManager() {
    const [giftConfig, setGiftConfig] = useState<GiftConfig>({ threshold: 2500, giftProductIds: [] });
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [configRes, productsRes] = await Promise.all([
                    adminApi.getSetting<GiftConfig>('loyalty_gift'),
                    productsApi.getAll({ limit: 200 }),
                ]);
                if (configRes?.data) setGiftConfig(configRes.data);
                setAllProducts(productsRes.data);
            } catch (err) {
                console.error("Error fetching gift system data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSaveConfig = async () => {
        setSaving(true);
        try {
            await adminApi.setSetting('loyalty_gift', giftConfig);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error("Error saving gift config:", err);
        } finally {
            setSaving(false);
        }
    };

    const addProductToGiftBox = (productId: number) => {
        if (!giftConfig.giftProductIds.includes(productId)) {
            setGiftConfig(prev => ({ ...prev, giftProductIds: [...prev.giftProductIds, productId] }));
        }
    };

    const removeProductFromGiftBox = (productId: number) => {
        setGiftConfig(prev => ({ ...prev, giftProductIds: prev.giftProductIds.filter(id => id !== productId) }));
    };

    const filteredProducts = allProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !giftConfig.giftProductIds.includes(p.id)
    );

    const giftProducts = allProducts.filter(p => giftConfig.giftProductIds.includes(p.id));

    if (loading) return (
        <div className="p-32 flex flex-col items-center justify-center space-y-6">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-[10px] uppercase tracking-widest font-black text-gray-400">Initialisation du Système de Cadeaux...</p>
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
            {/* Header Info */}
            <div className="bg-white p-12 border border-gray-100 shadow-sm relative overflow-hidden flex justify-between items-end rounded-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] luxury-text text-[10rem] pointer-events-none select-none">Gift</div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20">
                            <Gift size={24} />
                        </div>
                        <h2 className="text-4xl font-sans font-light tracking-tight text-gray-900">Gestion des Cadeaux</h2>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Configurez le système de récompenses VIP</p>
                </div>
                <div className="relative z-10 flex gap-4">
                    <button
                        onClick={handleSaveConfig}
                        disabled={saving}
                        className="flex items-center gap-3 px-10 py-5 bg-gray-950 text-white text-[10px] uppercase font-black tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl disabled:opacity-50"
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        <span>Enregistrer les Paramètres</span>
                    </button>
                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-6 py-4 rounded-2xl border border-emerald-100 shadow-sm"
                            >
                                <Check size={18} />
                                <span className="text-[10px] uppercase font-black">Success</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Threshold Configuration */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-10 border border-gray-100 shadow-sm rounded-3xl space-y-8">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="text-primary" size={20} />
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Seuil de Récompense</h3>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Définissez la valeur totale des commandes (en DH) qu'un client doit atteindre pour débloquer sa sélection de cadeaux.
                            </p>
                            <div className="relative group">
                                <input
                                    type="number"
                                    value={giftConfig.threshold}
                                    onChange={(e) => setGiftConfig(prev => ({ ...prev, threshold: parseInt(e.target.value) }))}
                                    className="w-full px-8 py-6 bg-[#FAF9F6] border border-gray-100 focus:bg-white focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all text-xl font-sans rounded-2xl outline-none"
                                />
                                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-primary font-bold">DH</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-950 p-10 rounded-3xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Settings size={100} />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <p className="text-[10px] uppercase tracking-widest text-primary font-black">Aperçu du Système</p>
                            <h4 className="text-xl font-sans font-light leading-snug">
                                Vos clients Elite reçoivent un cadeau une fois le seuil de {giftConfig.threshold} DH franchi.
                            </h4>
                            <div className="h-px bg-white/10 my-4" />
                            <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
                                <span>Pool de Cadeaux</span>
                                <span className="text-white">{giftProducts.length} Produits</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gift Selection Area */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden flex flex-col min-h-[600px]">
                        <div className="p-10 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest">Le Coffret Cadeau</h3>
                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-1">Produits disponibles en tant que récompense</p>
                            </div>
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Rechercher un produit..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-[#FAF9F6] border border-gray-100 rounded-xl text-xs outline-none focus:border-primary/40 transition-all"
                                />
                            </div>
                        </div>

                        <div className="p-10 flex-1 flex flex-col gap-10">
                            {/* Selected Gift Products */}
                            <div className="space-y-6">
                                <h4 className="text-[10px] uppercase tracking-widest font-black text-primary">Actuellement dans le coffret ({giftProducts.length})</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {giftProducts.map((product) => (
                                        <div key={product.id} className="flex items-center gap-4 p-4 bg-white border border-primary/20 rounded-2xl shadow-sm relative group">
                                            <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden relative shrink-0">
                                                <Image src={product.images?.[0] ? imageUrl(product.images[0]) : '/img/placeholder.jpg'} alt="" fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-gray-900 truncate">{product.name}</p>
                                                <p className="text-[10px] text-gray-400 font-medium">{product.price} DH</p>
                                            </div>
                                            <button
                                                onClick={() => removeProductFromGiftBox(product.id)}
                                                className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-500 hover:text-white"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    {giftProducts.length === 0 && (
                                        <div className="md:col-span-2 border-2 border-dashed border-gray-100 p-20 flex flex-col items-center justify-center text-center gap-4 rounded-3xl">
                                            <Package className="text-gray-100" size={60} />
                                            <p className="text-xs text-gray-400 font-medium italic">Le coffret est vide. Ajoutez des produits ci-dessous.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="h-px bg-gray-100" />

                            {/* Search Suggestions */}
                            <div className="space-y-6">
                                <h4 className="text-[10px] uppercase tracking-widest font-black text-gray-400">Ajouter des produits au coffret</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {filteredProducts.slice(0, 6).map((product) => (
                                        <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-[#FAF9F6] border border-transparent hover:border-gray-100 rounded-2xl transition-all group">
                                            <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden relative shrink-0">
                                                <Image src={product.images?.[0] ? imageUrl(product.images[0]) : '/img/placeholder.jpg'} alt="" fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-gray-900 truncate">{product.name}</p>
                                                <p className="text-[10px] text-gray-400 font-medium">{product.price} DH</p>
                                            </div>
                                            <button
                                                onClick={() => addProductToGiftBox(product.id)}
                                                className="w-10 h-10 bg-white border border-gray-100 text-gray-400 rounded-xl flex items-center justify-center group-hover:text-primary group-hover:border-primary/20 transition-all shadow-sm"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    {searchTerm && filteredProducts.length === 0 && (
                                        <p className="text-xs text-gray-400 italic py-4">Aucun produit trouvé pour "{searchTerm}"</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
