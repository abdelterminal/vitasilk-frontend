"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Hero from "@/components/Hero";
import ProductCardCompact from "@/components/ProductCardCompact";
import TestimonialSection from "@/components/TestimonialSection";
import FeaturedShowcase from "@/components/FeaturedShowcase";
import NewsletterBanner from "@/components/NewsletterBanner";
import { productsApi, type Product as ApiProduct, imageUrl } from "@/lib/api";
import type { HomepageSection, HomepageSlot } from '@/components/admin/HomepageManager';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { ArrowRight, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import EventSlider from "@/components/events/EventSlider";
import SpinWheelPopup from "@/components/events/SpinWheelPopup";
import { useDiscount } from '@/context/DiscountContext';

type Product = ApiProduct;

// Animated text ticker for the animated quote band
const QUOTES = [
    "LISSAGE SANS FORMALDÃ‰HYDE",
    "LIVRAISON PARTOUT AU MAROC",
    "RÃ‰SULTAT DÃˆS LA 1ÃˆRE UTILISATION",
    "L'OR 24K AU CÅ’UR DE NOS FORMULES",
    "PAIEMENT SÃ‰CURISÃ‰ ET RAPIDE",
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

// Centered grid card â€” full image visible, no cropping
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
                            DÃ©couvrir
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

// Vitrine grid: centered row, expands to 4 columns, then horizontal scroll
const VITRINE_CARD_W: Record<string, number> = { sm: 180, md: 230, lg: 300 };

const VitrineGrid = ({ section, allProducts, bg }: { section: HomepageSection; allProducts: Product[]; bg: string }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const secProducts = getSectionProducts(section, allProducts);
    if (secProducts.length === 0) return null;

    const href = section.mode === 'category' ? `/category/${section.categorySlug}` : '/boutique';
    const cardW = VITRINE_CARD_W[section.gridSize ?? 'md'];
    const needsScroll = secProducts.length > 4;

    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: dir === 'left' ? -(cardW * 2 + 32) : (cardW * 2 + 32), behavior: 'smooth' });
    };

    return (
        <section className={`py-16 px-6 lg:px-12 ${bg}`}>
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-12">
                    <p className="text-[10px] uppercase font-bold text-primary mb-2">{section.subtitle}</p>
                    <h2 className="text-3xl md:text-4xl font-sans font-light text-gray-900">{section.title}</h2>
                </div>

                <div className="relative">
                    {needsScroll && (
                        <>
                            <button
                                onClick={() => scroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-black hover:shadow-md transition-all"
                            >
                                <ChevronLeft size={14} />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-9 h-9 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:border-black hover:shadow-md transition-all"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </>
                    )}
                    <div
                        ref={scrollRef}
                        className={`flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden ${needsScroll ? 'scroll-smooth' : 'justify-center flex-wrap'}`}
                        style={{ scrollbarWidth: 'none' }}
                    >
                        {secProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.4) }}
                                style={{ width: cardW, flexShrink: 0 }}
                            >
                                <GridProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-10">
                    <Link href={href} className="inline-flex items-center gap-2 text-[10px] uppercase font-bold text-primary hover:text-black transition-colors group">
                        <span>Voir tout</span><ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

// Marketing banner: photo on one side, title/text/button on the other
const ImageTextBanner = ({
    image,
    imageAlt,
    subtitle,
    title,
    text,
    href,
    buttonLabel,
    reverse,
    bg,
}: {
    image: string;
    imageAlt: string;
    subtitle: string;
    title: string;
    text: string;
    href: string;
    buttonLabel: string;
    reverse?: boolean;
    bg: string;
}) => {
    return (
        <section className={`py-16 px-6 lg:px-12 ${bg}`}>
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`relative aspect-[4/5] rounded-lg overflow-hidden bg-[#111] ${reverse ? 'md:order-2' : ''}`}
                    >
                        <Image
                            src={image}
                            alt={imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={reverse ? 'md:order-1' : ''}
                    >
                        <p className="text-[10px] uppercase font-bold text-primary mb-2">{subtitle}</p>
                        <h2 className="text-3xl md:text-4xl font-sans font-light text-gray-900 mb-4">{title}</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">{text}</p>
                        <Link
                            href={href}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-[10px] uppercase font-bold tracking-widest hover:bg-black transition-all duration-300 group"
                        >
                            <span>{buttonLabel}</span>
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

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
    const afterMarqueeSections = visibleSections.filter(s => (s.slot ?? 'after-marquee') === 'after-marquee');
    const soinsIdx = afterMarqueeSections.findIndex(s => s.categorySlug === 'soins-de-cheveux');
    const beforeSoinsSections = soinsIdx === -1 ? afterMarqueeSections : afterMarqueeSections.slice(0, soinsIdx);
    const fromSoinsSections = soinsIdx === -1 ? [] : afterMarqueeSections.slice(soinsIdx);

    const renderSection = (sec: HomepageSection, idx: number) => {
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

        if (sec.layout === 'imageGrid') {
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
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 relative min-h-[420px] overflow-hidden bg-[#FDFBF7]">
                                <Image
                                    src={sec.image || '/img/campagnes/plage-4-bottles-icons.jpg'}
                                    alt=""
                                    aria-hidden="true"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    className="object-cover scale-110 blur-2xl opacity-60"
                                />
                                <Image
                                    src={sec.image || '/img/campagnes/plage-4-bottles-icons.jpg'}
                                    alt={sec.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    className="relative object-contain"
                                />
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-3 grid grid-cols-2 grid-rows-2 gap-4">
                                {secProducts.slice(0, 4).map((product, i) => (
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
            return <VitrineGrid key={sec.id} section={sec} allProducts={products} bg={bg} />;
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
    };

    const renderSlot = (slot: HomepageSlot) => {
        if (loading) return null;
        const slotSections = visibleSections.filter(s => (s.slot ?? 'after-marquee') === slot);
        return <>{slotSections.map((sec, i) => <React.Fragment key={sec.id}>{renderSection(sec, i)}</React.Fragment>)}</>;
    };

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

            {/* Slot: after-hero */}
            {renderSlot('after-hero')}

            {/* Animated Quote Band */}
            <AnimatedQuoteBand />

            {/* Slot: after-quote */}
            {renderSlot('after-quote')}

            {/* Ingredient marquee strip */}
            <div className="w-full overflow-hidden bg-[#FDFBF7] border-y border-gray-100 py-3">
                <motion.div
                    className="flex gap-0 whitespace-nowrap"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                    {[...Array(16)].map((_, i) => (
                        <span key={i} className="flex items-center gap-6 px-8 text-[9px] uppercase font-bold text-gray-400 flex-shrink-0">
                            <span>Huile de Coco &bull;</span>
                            <span>Or 24K &bull;</span>
                            <span>K&eacute;ratine &bull;</span>
                            <span>Collag&egrave;ne &bull;</span>
                            <span>Acides Amin&eacute;s &bull;</span>
                            <span>Panth&eacute;nol &bull;</span>
                            <span>Prot&eacute;ines Naturelles &bull;</span>
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Slot: after-marquee, part 1 (before Soins de Cheveux) */}
            {!loading && beforeSoinsSections.map(sec => (
                <React.Fragment key={sec.id}>{renderSection(sec, afterMarqueeSections.indexOf(sec))}</React.Fragment>
            ))}

            {/* Gamme complète banner — moved above Soins de Cheveux */}
            <ImageTextBanner
                image="/img/campagnes/gamme-complete.jpg"
                imageAlt="Gamme complète Vitasilk Professional"
                subtitle="La Collection"
                title="Toute la gamme Vitasilk, réunie"
                text="Botox Capillaire, Filler Glow, 24K Gold, Coffee Extract, Blue Silk... Découvrez l'ensemble de nos soins professionnels sans acide glyoxylique, conçus pour un lissage parfait et durable."
                href="/boutique"
                buttonLabel="Voir la boutique"
                bg="bg-white"
            />

            {/* Slot: after-marquee, part 2 (Soins de Cheveux onward) */}
            {!loading && fromSoinsSections.map(sec => (
                <React.Fragment key={sec.id}>{renderSection(sec, afterMarqueeSections.indexOf(sec))}</React.Fragment>
            ))}

            {/* Slot: after-benefits */}
            {renderSlot('after-benefits')}

            {/* Featured Showcase */}
            <FeaturedShowcase />

            {/* Slot: after-showcase */}
            {renderSlot('after-showcase')}

            {/* Trio essentiels banner */}
            <ImageTextBanner
                image="/img/campagnes/trio-essentiels.jpg"
                imageAlt="Trio essentiel Vitasilk : Coffee Extract, Filler Glow, 24K Gold"
                subtitle="Nos Essentiels"
                title="Le trio incontournable"
                text="Coffee Extract, Filler Glow et 24K Gold : trois soins signature pour préparer, lisser et sublimer chaque chevelure."
                href="/boutique"
                buttonLabel="Découvrir"
                reverse
                bg="bg-[#FDFBF7]"
            />

            {/* Testimonials */}
            <TestimonialSection />

            {/* Slot: after-testimonials */}
            {renderSlot('after-testimonials')}

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
                    <p className="text-[10px] uppercase font-bold text-primary mb-4">Offre Sp&eacute;ciale</p>
                    <h2 className="text-3xl md:text-5xl font-sans font-light !text-white mb-4">
                        -10% sur votre <span className="text-primary">1&egrave;re commande</span>
                    </h2>
                    <p className="text-white/50 text-sm mb-10">Entrez le code <strong className="text-white">VITASILK10</strong> au moment du paiement</p>
                    <Link
                        href="/boutique"
                        className="inline-flex items-center gap-3 px-12 py-5 bg-primary text-white text-[10px] uppercase font-bold hover:bg-white hover:text-black transition-all duration-300 group"
                    >
                        <span>Profiter de l&apos;Offre</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
