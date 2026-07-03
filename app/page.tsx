"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Hero from "@/components/Hero";
import ProductCardCompact from "@/components/ProductCardCompact";
import BrandBenefits from "@/components/BrandBenefits";
import TestimonialSection from "@/components/TestimonialSection";
import FeaturedShowcase from "@/components/FeaturedShowcase";
import NewsletterBanner from "@/components/NewsletterBanner";
import { productsApi, type Product as ApiProduct, imageUrl } from "@/lib/api";
import type { HomepageSection } from '@/components/admin/HomepageManager';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { ArrowRight, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import EventSlider from "@/components/events/EventSlider";
import SpinWheelPopup from "@/components/events/SpinWheelPopup";
import { useDiscount } from '@/context/DiscountContext';

type Product = ApiProduct;

// Animated text ticker for the animated quote band
const QUOTES = [
    "LISSAGE SANS FORMALDÉHYDE",
    "LIVRAISON PARTOUT AU MAROC",
    "RÉSULTAT DÈS LA 1ÈRE UTILISATION",
    "L'OR 24K AU CŒUR DE NOS FORMULES",
    "PAIEMENT SÉCURISÉ ET RAPIDE",
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

// Centered grid card — full image visible, no cropping
const GridProductCard = ({ product }: { product: Product }) => {
    const { discount } = useDiscount();
    const hasDiscount = !!discount?.percentage;
    const discountedPrice = hasDiscount
        ? product.price * (1 - discount.percentage / 100)
        : product.price;
    const imgSrc = product.images?.[0] || '/img/logo.png';

    return (
        <Link href={`/product/${product.id}`} className="group flex flex-col items-center text-center">
            <div className="relative w-full aspect-square bg-[#FDFBF7] rounded-lg overflow-hidden mb-4 flex items-center justify-center">
                <Image
                    src={imgSrc}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain p-5 group-hover:scale-105 transition-transform duration-500"
                />
                {hasDiscount && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-[9px] uppercase font-bold px-2 py-1">
                        -{discount.percentage}%
                    </div>
                )}
            </div>
            <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-primary mb-1">{product.category_name}</p>
            <h3 className="text-sm font-light text-gray-900 leading-snug mb-2 px-2">{product.name}</h3>
            <div className="flex items-center gap-2 justify-center">
                {hasDiscount && (
                    <span className="text-xs text-gray-400 line-through">{product.price.toLocaleString()} DH</span>
                )}
                <span className="text-sm font-bold text-primary">{discountedPrice.toLocaleString()} DH</span>
            </div>
        </Link>
    );
};

// Large featured product card with image overlay
const FeaturedProductCard = ({ product }: { product: Product }) => {
    const { discount } = useDiscount();
    const hasDiscount = !!discount?.percentage;
    const discountedPrice = hasDiscount
        ? product.price * (1 - discount.percentage / 100)
        : product.price;
    const imgSrc = product.images?.[0] || '/img/logo.png';

    return (
        <Link href={`/product/${product.id}`} className="block h-full">
            <div className="group relative overflow-hidden h-full min-h-[420px] bg-[#FDFBF7]">
                <Image
                    src={imgSrc}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {hasDiscount && (
                    <div className="absolute top-4 left-4 z-10 bg-primary text-white text-[9px] uppercase font-bold px-3 py-1.5 tracking-widest">
                        -{discount.percentage}%
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-white p-6 z-10">
                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-primary mb-2">{product.category_name}</p>
                    <h3 className="text-xl md:text-2xl font-light leading-tight mb-4 text-gray-900">{product.name}</h3>
                    <div className="flex items-end justify-between">
                        <div>
                            {hasDiscount && (
                                <span className="text-xs text-gray-400 line-through block mb-0.5">{product.price.toLocaleString()} DH</span>
                            )}
                            <span className="text-2xl font-bold text-primary leading-none">{discountedPrice.toLocaleString()} DH</span>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest border border-gray-300 text-gray-700 px-4 py-2 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                            Découvrir
                        </span>
                    </div>
                </div>
            </div>
        </Link>
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

function getSectionProducts(section: HomepageSection, allProducts: Product[]): Product[] {
    if (section.mode === 'manual') {
        const ids = new Set(section.productIds);
        return allProducts.filter(p => ids.has(Number(p.id)));
    }
    return allProducts.filter(p => p.category_slug === section.categorySlug).slice(0, section.count);
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [homepageConfig, setHomepageConfig] = useState<{ sections: HomepageSection[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    useEffect(() => {
        Promise.all([
            productsApi.getAll({ limit: 500 }),
            fetch('/api/admin/homepage').then(r => r.json()),
        ]).then(([allRes, config]) => {
            setProducts(allRes.data);
            setHomepageConfig(config);
        }).catch(console.error)
        .finally(() => setLoading(false));
    }, []);

    const visibleSections = (homepageConfig?.sections ?? []).filter(s => s.visible);

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

            {/* Animated Quote Band */}
            <AnimatedQuoteBand />

            {/* Dynamic homepage sections — Section 1 (featured layout typically) */}
            {!loading && visibleSections[0] && (() => {
                const sec = visibleSections[0];
                const secProducts = getSectionProducts(sec, products);
                if (secProducts.length === 0) return null;
                const href = sec.mode === 'category' ? `/category/${sec.categorySlug}` : '/boutique';
                if (sec.layout === 'featured') {
                    return (
                        <section className="py-20 bg-[#FDFBF7]">
                            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-primary mb-2">{sec.subtitle}</p>
                                        <h2 className="text-3xl md:text-4xl font-sans font-light text-gray-900">{sec.title}</h2>
                                    </div>
                                    <Link href={href} className="hidden md:flex items-center gap-2 text-[10px] uppercase font-bold text-primary hover:text-black transition-colors group">
                                        <span>Voir tout</span><ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2">
                                        <FeaturedProductCard product={secProducts[0]} />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-3 grid grid-cols-2 gap-4">
                                        {secProducts.slice(1, 5).map((product, i) => (
                                            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}>
                                                <ProductCardCompact product={product} />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </section>
                    );
                }
                if (sec.layout === 'grid') {
                    return (
                        <section className="py-16 px-6 lg:px-12 bg-[#FDFBF7]">
                            <div className="max-w-[1400px] mx-auto">
                                <div className="text-center mb-12">
                                    <p className="text-[10px] uppercase font-bold text-primary mb-2">{sec.subtitle}</p>
                                    <h2 className="text-3xl md:text-4xl font-sans font-light text-gray-900">{sec.title}</h2>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                                    {secProducts.map((product, i) => (
                                        <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="w-full">
                                            <GridProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="text-center mt-10">
                                    <Link href={href} className="inline-flex items-center gap-2 text-[10px] uppercase font-bold text-primary hover:text-black transition-colors group">
                                        <span>Voir tout</span><ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    );
                }
                return (
                    <section className="py-16 px-6 lg:px-12 bg-[#FDFBF7]">
                        <div className="max-w-[1600px] mx-auto">
                            <ProductCarousel products={secProducts} title={sec.title} href={href} />
                        </div>
                    </section>
                );
            })()}

            {/* Ingredient marquee strip */}
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

            {/* Dynamic homepage sections 2–5 */}
            {!loading && visibleSections.slice(1).map((sec, idx) => {
                const secProducts = getSectionProducts(sec, products);
                if (secProducts.length === 0) return null;
                const href = sec.mode === 'category' ? `/category/${sec.categorySlug}` : '/boutique';
                const bg = idx % 2 === 0 ? 'bg-white' : 'bg-[#FDFBF7]';

                if (sec.layout === 'featured') {
                    return (
                        <section key={sec.id} className={`py-16 px-6 lg:px-12 ${bg}`}>
                            <div className="max-w-[1600px] mx-auto">
                                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-gray-100">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-primary mb-2">{sec.subtitle}</p>
                                        <h2 className="text-3xl md:text-4xl font-sans font-light text-gray-900">{sec.title}</h2>
                                    </div>
                                    <Link href={href} className="inline-flex items-center gap-2 mt-4 md:mt-0 text-[10px] uppercase font-bold text-gray-500 hover:text-primary transition-colors group">
                                        <span>Voir tout</span><ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2">
                                        <FeaturedProductCard product={secProducts[0]} />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-3 grid grid-cols-2 gap-4">
                                        {secProducts.slice(1, 5).map((product, i) => (
                                            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}>
                                                <ProductCardCompact product={product} />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </section>
                    );
                }

                if (sec.layout === 'grid') {
                    return (
                        <section key={sec.id} className={`py-16 px-6 lg:px-12 ${bg}`}>
                            <div className="max-w-[1400px] mx-auto">
                                <div className="text-center mb-12">
                                    <p className="text-[10px] uppercase font-bold text-primary mb-2">{sec.subtitle}</p>
                                    <h2 className="text-3xl md:text-4xl font-sans font-light text-gray-900">{sec.title}</h2>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                                    {secProducts.map((product, i) => (
                                        <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="w-full">
                                            <GridProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="text-center mt-10">
                                    <Link href={href} className="inline-flex items-center gap-2 text-[10px] uppercase font-bold text-primary hover:text-black transition-colors group">
                                        <span>Voir tout</span><ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    );
                }

                return (
                    <section key={sec.id} className={`py-12 px-6 lg:px-12 ${bg}`}>
                        <div className="max-w-[1600px] mx-auto">
                            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                                <ProductCarousel products={secProducts} title={sec.title} href={href} />
                            </motion.div>
                        </div>
                    </section>
                );
            })}

            {/* Brand Benefits Section */}
            <BrandBenefits />

            {/* Featured Showcase Video */}
            <FeaturedShowcase />

            {/* Testimonials */}
            <TestimonialSection />

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
                    <p className="text-[10px] uppercase font-bold text-primary mb-4">Offre Spéciale</p>
                    <h2 className="text-3xl md:text-5xl font-sans font-light !text-white mb-4">
                        -10% sur votre <span className=" text-primary">1ère commande</span>
                    </h2>
                    <p className="text-white/50 text-sm mb-10">Entrez le code <strong className="text-white">VITASILK10</strong> au moment du paiement</p>
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
