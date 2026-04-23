"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Hero from "@/components/Hero";
import ProductCardCompact from "@/components/ProductCardCompact";
import { productsApi, type Product as ApiProduct, imageUrl } from "@/lib/api";
import Link from 'next/link';
import { ArrowRight, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDiscount } from '@/context/DiscountContext';

// Dynamically import all heavy/below-fold components to keep initial bundle lean
const EventSlider = dynamic(() => import('@/components/events/EventSlider'), { ssr: false });
const SpinWheelPopup = dynamic(() => import('@/components/events/SpinWheelPopup'), { ssr: false });
const BestSellers = dynamic(() => import('@/components/BestSellers'));
const BrandBenefits = dynamic(() => import('@/components/BrandBenefits'));
const FeaturedShowcase = dynamic(() => import('@/components/FeaturedShowcase'));
const TestimonialSection = dynamic(() => import('@/components/TestimonialSection'));
const NewsletterBanner = dynamic(() => import('@/components/NewsletterBanner'));

type Product = ApiProduct;

const QUOTES = [
    "LISSAGE SANS FORMALDÉHYDE",
    "LIVRAISON PARTOUT AU MAROC",
    "RÉSULTAT DÈS LA 1ÈRE UTILISATION",
    "L'OR 24K AU CŒUR DE NOS FORMULES",
    "PAIEMENT SÉCURISÉ ET RAPIDE",
];

// Pure CSS quote rotation — zero framer-motion
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
                <p className="text-[10px] md:text-xs uppercase font-normal text-white/80 flex items-center justify-center h-full transition-opacity duration-500">
                    {QUOTES[current]}
                </p>
            </div>
            <div className="h-px w-16 bg-primary/40 flex-shrink-0 hidden md:block" />
        </div>
    );
};

// Featured product card — no framer-motion
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

// Product carousel — no framer-motion
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
                            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black disabled:opacity-30 transition-all">
                                <ChevronLeft size={14} />
                            </button>
                            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black disabled:opacity-30 transition-all">
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    )}
                    <Link href={href} className="text-[9px] uppercase font-bold text-primary hover:text-black transition-colors flex items-center gap-2 group">
                        <span>Voir tout</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {visible.map(product => (
                    <ProductCardCompact key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button key={i} onClick={() => setPage(i)} className={`w-2 h-2 rounded-full transition-colors ${i === page ? 'bg-primary' : 'bg-gray-200'}`} />
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
        productsApi.getAll({ limit: 24 })
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
            <Hero />

            <EventSlider onEventClick={(event) => setSelectedEvent(event)} />

            {selectedEvent && (
                <SpinWheelPopup event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            )}

            <AnimatedQuoteBand />

            <BestSellers />

            {/* CSS marquee — no framer-motion */}
            <div className="w-full overflow-hidden bg-[#FDFBF7] border-y border-gray-100 py-3">
                <div className="flex gap-0 whitespace-nowrap" style={{animation: 'marquee-reverse 25s linear infinite'}}>
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
                </div>
            </div>

            {/* Featured Products */}
            {!loading && products.length > 0 && (
                <section className="py-16 px-6 lg:px-12 bg-white">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-gray-100">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-primary mb-2">Les Plus Demandés</p>
                                <h2 className="text-3xl md:text-4xl font-sans font-light text-gray-900">
                                    Nos Produits <span className="text-primary">Phares</span>
                                </h2>
                            </div>
                            <Link href="/boutique" className="inline-flex items-center gap-2 mt-4 md:mt-0 text-[10px] uppercase font-bold text-gray-500 hover:text-primary transition-colors group">
                                <span>Voir la Boutique</span>
                                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                            <div className="lg:col-span-2">
                                <FeaturedProductCard product={products[0]} />
                            </div>
                            <div className="lg:col-span-3 grid grid-cols-2 gap-4">
                                {products.slice(1, 5).map(product => (
                                    <ProductCardCompact key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Products by category */}
            <section className="py-16 px-6 lg:px-12 bg-[#FDFBF7]">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-gray-200">
                        <div>
                            <p className="text-[10px] uppercase font-bold text-primary mb-2">Tous Nos Produits</p>
                            <h2 className="text-3xl md:text-5xl font-sans font-light text-gray-900">
                                Notre <span className="text-primary">Catalogue</span>
                            </h2>
                        </div>
                        <Link href="/boutique" className="inline-flex items-center gap-2 mt-4 md:mt-0 px-8 py-3 bg-primary text-white text-[10px] uppercase font-bold hover:bg-black transition-all rounded-sm group">
                            <span>Voir la Boutique</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-24 text-gray-400">Notre collection arrive bientôt.</div>
                    ) : (
                        <div className="space-y-16">
                            {categories.map((category) => {
                                const categoryProducts = products.filter(p => p.category_name === category);
                                if (categoryProducts.length === 0) return null;
                                const slug = (products.find(p => p.category_name === category)?.category_slug) || category.toLowerCase().replace(/ /g, '-');
                                return (
                                    <div key={category} className="pb-12 border-b border-gray-100 last:border-0 last:pb-0">
                                        <ProductCarousel products={categoryProducts} title={category} href={`/category/${slug}`} />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <BrandBenefits />
            <FeaturedShowcase />
            <TestimonialSection />
            <NewsletterBanner />

            {/* Bottom CTA */}
            <section className="py-20 px-6 bg-[#111] text-white text-center">
                <div className="max-w-2xl mx-auto">
                    <p className="text-[10px] uppercase font-bold text-primary mb-4">Offre Spéciale</p>
                    <h2 className="text-3xl md:text-5xl font-sans font-light !text-white mb-4">
                        -10% sur votre <span className="text-primary">1ère commande</span>
                    </h2>
                    <p className="text-white/50 text-sm mb-10">Entrez le code <strong className="text-white">VITASILK10</strong> au moment du paiement</p>
                    <Link href="/boutique" className="inline-flex items-center gap-3 px-12 py-5 bg-primary text-white text-[10px] uppercase font-bold hover:bg-white hover:text-black transition-all duration-300 group">
                        <span>Profiter de l'Offre</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
