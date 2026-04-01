"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, ArrowRight, ShoppingBag } from 'lucide-react';
import { productsApi, imageUrl, type Product as ApiProduct } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Product = ApiProduct;

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            setSearchQuery('');
            setResults([]);
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (searchQuery.trim().length < 2) {
            setResults([]);
            return;
        }
        setLoading(true);
        const timer = setTimeout(() => {
            productsApi.getAll({ search: searchQuery, limit: 6 })
                .then(res => setResults(res.data))
                .catch(console.error)
                .finally(() => setLoading(false));
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleResultClick = (productId: number | string) => {
        onClose();
        router.push(`/product/${productId}`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[10001] bg-white flex flex-col"
                >
                    {/* Header */}
                    <div className="px-6 md:px-12 py-6 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex-1 max-w-2xl mx-auto flex items-center relative">
                            <Search size={20} className="text-primary absolute left-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="RECHERCHER UN PRODUIT, UNE GAMME..."
                                className="w-full pl-10 pr-10 py-4 bg-transparent text-lg md:text-2xl font-sans font-light tracking-tight focus:outline-none placeholder:text-gray-300 uppercase"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-0 p-2 hover:bg-gray-50 rounded-full transition-all"
                                >
                                    <X size={18} className="text-gray-400" />
                                </button>
                            )}
                        </div>
                        <button 
                            onClick={onClose}
                            className="ml-8 p-3 hover:bg-gray-50 rounded-full transition-all group"
                        >
                            <X size={24} className="text-gray-900 group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* Results Area */}
                    <div className="flex-1 overflow-y-auto bg-[#FDFBF7]/50 px-6 md:px-12 py-12">
                        <div className="max-w-4xl mx-auto">
                            {searchQuery.trim().length > 1 ? (
                                <div>
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-[10px] uppercase tracking-widest font-black text-primary">RÉSULTATS DE RECHERCHE ({results.length})</h3>
                                        <Link 
                                            href={`/boutique?search=${searchQuery}`}
                                            onClick={onClose}
                                            className="text-[10px] uppercase font-bold text-gray-400 hover:text-black transition-colors flex items-center gap-2 group"
                                        >
                                            Voir tout en boutique <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>

                                    {results.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {results.map((product) => (
                                                <motion.div
                                                    key={product.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-white p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-500 flex gap-6 cursor-pointer group"
                                                    onClick={() => handleResultClick(product.id)}
                                                >
                                                    <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                                                        <Image
                                                            src={imageUrl(product.images[0]) || '/img/placeholder.png'}
                                                            alt={product.name}
                                                            fill
                                                            className="object-contain p-2 group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center py-2">
                                                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">{product.category_name}</p>
                                                        <h4 className="text-gray-900 font-sans font-medium text-lg mb-2">{product.name}</h4>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-primary font-bold text-sm">{product.price.toLocaleString()} DH</span>
                                                            <span className="text-[10px] uppercase font-black text-gray-300 group-hover:text-primary transition-colors flex items-center gap-1">
                                                                Détails <ArrowRight size={10} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-20">
                                            <p className="text-gray-400 text-lg font-light mb-4 italic">Aucun produit ne correspond à votre recherche.</p>
                                            <div className="h-px w-20 bg-primary/20 mx-auto mb-8" />
                                            <Link 
                                                href="/boutique" 
                                                onClick={onClose}
                                                className="text-[10px] uppercase tracking-widest font-black text-primary hover:text-black transition-colors"
                                            >
                                                Explorer toute la boutique
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-10">
                                        <ShoppingBag size={32} className="text-primary/40" />
                                    </div>
                                    <h3 className="text-2xl font-sans font-light text-gray-900 mb-4 tracking-tight">Que recherchez-vous aujourd'hui ?</h3>
                                    <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">Entrez le nom d'un soin professionnel, une gamme ou un ingrédient pour découvrir l'excellence Vitasilk.</p>
                                    
                                    <div className="mt-12 flex flex-wrap justify-center gap-3">
                                        {['Lissage', 'Keratine', 'Or 24K', 'Pack', 'Soin'].map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => setSearchQuery(tag)}
                                                className="px-6 py-2.5 bg-white border border-gray-100 rounded-full text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:border-primary hover:text-primary transition-all shadow-sm"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 md:px-12 py-6 border-t border-gray-100 bg-white">
                        <div className="max-w-4xl mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <Link href="/boutique" onClick={onClose} className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-primary transition-colors">Boutique</Link>
                                <Link href="/category/nos-packs" onClick={onClose} className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-primary transition-colors">Packs</Link>
                                <Link href="/about" onClick={onClose} className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-primary transition-colors">Histoire</Link>
                            </div>
                            <div className="text-[9px] uppercase tracking-widest font-medium text-gray-300">
                                © 2026 MAISON VITASILK PARIS
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
