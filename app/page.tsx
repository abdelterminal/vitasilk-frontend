"use client";

import React, { useEffect, useState } from 'react';
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import PromoBanners from "@/components/PromoBanners";
import ProductCardCompact from "@/components/ProductCardCompact";
import InstagramSection from "@/components/InstagramSection";
import BrandBenefits from "@/components/BrandBenefits";
import TestimonialSection from "@/components/TestimonialSection";
import FeaturedShowcase from "@/components/FeaturedShowcase";
import NewsletterBanner from "@/components/NewsletterBanner";
import VerticalAd from "@/components/VerticalAd";
import BestSellers from "@/components/BestSellers";
import { productsApi, type Product as ApiProduct, imageUrl } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { ArrowRight, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import EventSlider from "@/components/events/EventSlider";
import SpinWheelPopup from "@/components/events/SpinWheelPopup";
import { useDiscount } from '@/context/DiscountContext';

type Product = ApiProduct;

// Animated text ticker for the animated quote band
const QUOTES = [
    "L'ART DE LA SOIE PARISIENNE",
    "QUALITÉ PROFESSIONNELLE CERTIFIÉE",
    "VOS CHEVEUX MÉRITENT LE MEILLEUR",
    "L'OR 24K AU CŒUR DE NOS FORMULES",
    "LISSAGE BRÉSILIEN D'EXCEPTION",
];

const AnimatedQuoteBand = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % QUOTES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#111] py-5 overflow-hidden flex items-center justify-center gap-8">
            <div className="h-px w-16 bg-primary/40 flex-shrink-0 hidden md:block" />
            <div className="relative h-6 overflow-hidden flex-1 max-w-xl text-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={current}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-[10px] md:text-xs uppercase font-normal !text-white/80 absolute inset-0 flex items-center justify-center"
                    >
                        {QUOTES[current]}
                    </motion.p>
                </AnimatePresence>
            </div>
            <div className="h-px w-16 bg-primary/40 flex-shrink-0 hidden md:block" />
        </div>
    );
};

// Product carousel with navigation
const ProductCarousel = ({ products, title, href }: { products: Product[]; title: string; href: string }) => {
    const [page, setPage] = useState(0);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const visible = products.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg font-sans font-medium text-gray-900 capitalize">{title}</h3>
                    <span className="text-xs text-gray-400">({products.length})</span>
                </div>
                <div className="flex items-center gap-4">
                    {totalPages > 1 && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(0, p - 1))}
                                disabled={page === 0}
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black disabled:opacity-30 transition-all"
                            >
                                <ChevronLeft size={14} />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                                disabled={page === totalPages - 1}
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black disabled:opacity-30 transition-all"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    )}
                    <Link
                        href={href}
                        className="text-[9px] uppercase font-bold text-primary hover:text-black transition-colors flex items-center gap-2 group"
                    >
                        <span>Voir tout</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            <motion.div
                key={page}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
                {visible.map(product => (
                    <ProductCardCompact key={product.id} product={product} />
                ))}
            </motion.div>

            {/* Page dots */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`w-2 h-2 rounded-full transition-colors ${i === page ? 'bg-primary' : 'bg-gray-200'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    useEffect(() => {
        productsApi.getAll({ limit: 50 })
            .then(res => setProducts(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const categoriesOrder = ['Lissage Pro', 'Soins de Cheveux', 'Matériel', 'Nos Packs'];
    const categories = categoriesOrder.filter(cat =>
        products.some(p => p.category_name === cat)
    );

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Hero Section */}
            <Hero />

            {/* Dynamic Event Slider */}
            <EventSlider onEventClick={(event) => setSelectedEvent(event)} />
            
            <AnimatePresence>
                {selectedEvent && (
                    <SpinWheelPopup 
                        event={selectedEvent} 
                        onClose={() => setSelectedEvent(null)} 
                    />
                )}
            </AnimatePresence>

            {/* Animated Marquee */}
            <MarqueeBanner />

            {/* Animated Quote Band */}
            <AnimatedQuoteBand />

            {/* Promo Banners Section */}
            <PromoBanners />

            {/* Best Sellers Scrolling Strip */}
            <BestSellers />

            {/* Second marquee - reversed direction */}
            <div className="w-full overflow-hidden bg-[#FDFBF7] border-y border-gray-100 py-3">
                <motion.div
                    className="flex gap-0 whitespace-nowrap"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                    {[...Array(16)].map((_, i) => (
                        <span key={i} className="flex items-center gap-6 px-8 text-[9px] uppercase font-bold text-gray-400 flex-shrink-0">
                            <span>Huile de Coco •</span>
                            <span>Or 24K •</span>
                            <span>Kératine •</span>
                            <span>Collagène •</span>
                            <span>Acides Aminés •</span>
                            <span>Panthénol •</span>
                            <span>Protéines Naturelles •</span>
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Products Section */}
            <section className="py-16 px-6 lg:px-12 bg-[#FDFBF7]">
                <div className="max-w-[1600px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Left Column: Products (3/4 width) */}
                        <div className="lg:col-span-3">
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-gray-200"
                            >
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-primary mb-2">Catalogue Complet</p>
                                    <h2 className="text-3xl md:text-5xl font-sans font-light text-gray-900">
                                        Nos Collections <span className="text-primary">Exclusives</span>
                                    </h2>
                                </div>
                                <Link
                                    href="/boutique"
                                    className="inline-flex items-center gap-2 mt-4 md:mt-0 px-8 py-3 bg-primary text-white text-[10px] uppercase font-bold hover:bg-black transition-all rounded-sm group"
                                >
                                    <span>Voir la Boutique</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>

                            {loading ? (
                                <div className="flex items-center justify-center py-24">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                </div>
                            ) : products.length === 0 ? (
                                <div className="text-center py-24 text-gray-400 ">
                                    Notre collection arrive bientôt.
                                </div>
                            ) : (
                                <div className="space-y-16">
                                    {categories.map((category) => {
                                        const categoryProducts = products.filter(p => p.category_name === category);
                                        if (categoryProducts.length === 0) return null;
                                        const slug = (products.find(p => p.category_name === category)?.category_slug) || category.toLowerCase().replace(/ /g, '-');
                                        return (
                                            <motion.div
                                                key={category}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6 }}
                                                className="pb-12 border-b border-gray-100 last:border-0 last:pb-0"
                                            >
                                                <ProductCarousel
                                                    products={categoryProducts}
                                                    title={category}
                                                    href={`/category/${slug}`}
                                                />
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Right Column: Vertical Ad (1/4 width) */}
                        <aside className="lg:col-span-1 hidden lg:block sticky top-32 h-fit">
                            <div className="space-y-8">
                                <div className="bg-[#111] p-8 rounded-[2rem] border border-white/10 text-white mb-8">
                                                                       <p className="text-[10px] uppercase text-primary font-bold mb-4">Vitasilk Privé</p>
                                    <p className="text-xl font-sans font-light mb-6 leading-relaxed italic text-white/90">"L'élégance commence par la santé de vos cheveux."</p>
                                    <div className="h-px bg-white/10 w-full" />
                                </div>
                                <VerticalAd />
                                <div className="p-8 border border-gray-100 bg-white rounded-[2rem] shadow-sm italic text-[11px] text-gray-400 leading-relaxed">
                                    Profitez d'une expérience personnalisée en visitant nos salons partenaires.
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Brand Benefits Section */}
            <BrandBenefits />

            {/* Featured Showcase Video */}
            <FeaturedShowcase />

            {/* Testimonials */}
            <TestimonialSection />

            {/* Instagram Section */}
            <InstagramSection />

            {/* Newsletter Banner */}
            <NewsletterBanner />

            {/* Bottom CTA Banner */}
            <section className="py-20 px-6 bg-[#111] text-white text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto"
                >
                    <p className="text-[10px] uppercase font-bold text-primary mb-4">Code Exclusif</p>
                    <h2 className="text-3xl md:text-5xl font-sans font-light !text-white mb-4">
                        -10% sur votre <span className=" text-primary">1ère commande</span>
                    </h2>
                    <p className="text-white/50 text-sm mb-10">Utilisez le code <strong className="text-white">VITASILK10</strong> à la caisse</p>
                    <Link
                        href="/boutique"
                        className="inline-flex items-center gap-3 px-12 py-5 bg-primary text-white text-[10px] uppercase font-bold hover:bg-white hover:text-black transition-all duration-300 group"
                    >
                        <span>Profiter de l'Offre</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
