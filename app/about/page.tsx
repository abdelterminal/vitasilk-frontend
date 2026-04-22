"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, ShieldCheck, FlaskConical, Award, Sparkles, Heart, Star, ChevronDown } from 'lucide-react';

// Animated counter component
function CountUp({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start: number | null = null;
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / (duration * 1000), 1);
            // Ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, target, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

const VALUES = [
    {
        number: '01',
        title: 'Ingrédients Naturels',
        desc: 'Des ingrédients naturels de qualité — or 24K, huile de coco, kératine — pour prendre soin de vos cheveux en profondeur.',
        icon: Leaf,
    },
    {
        number: '02',
        title: 'Formules Pro',
        desc: 'Des formules professionnelles brésiliens, testées en salon et maintenant disponibles pour vous à domicile.',
        icon: FlaskConical,
    },
    {
        number: '03',
        title: 'Sans Formaldéhyde',
        desc: 'Nos produits sont sans formol — efficaces, sûrs, et adaptés à une utilisation régulière.',
        icon: ShieldCheck,
    },
    {
        number: '04',
        title: 'Résultats Réels',
        desc: 'Les mêmes résultats qu\'en salon, chez vous, sans vous déplacer, à des prix accessibles.',
        icon: Award,
    },
];

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* HERO — full-bleed background image */}
            <section className="relative h-[100dvh] w-full overflow-hidden">
                <Image
                    src="/img/propos.jpg"
                    alt="Vitasilk — Notre Histoire"
                    fill
                    priority
                    quality={95}
                    className="object-cover object-center scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="w-full"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 40 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="h-px bg-primary mx-auto mb-6 md:mb-8"
                        />
                        <p className="text-[8px] md:text-[10px] uppercase text-primary font-bold mb-3 md:mb-4">
                            Vitasilk • Depuis 2010
                        </p>
                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-sans font-light !text-white tracking-tight mb-4 md:mb-6 leading-tight">
                            Nos Produits, <span className="text-primary/90">Votre Beauté</span>
                        </h1>
                        <p className="text-white/70 text-sm md:text-lg font-light max-w-xl mx-auto px-4">
                            Des produits professionnels de lissage et soins capillaires, livrés partout au Maroc.
                        </p>
                    </motion.div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2">
                        <div className="w-[1px] h-10 md:h-16 bg-white/20 mx-auto overflow-hidden">
                            <motion.div
                                animate={{ y: [0, 40, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="w-full h-8 bg-primary"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* STORY SECTION */}
            <section className="py-16 md:py-32 px-4 md:px-6 max-w-[1400px] mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1"
                    >
                        <span className="text-[8px] md:text-[10px] uppercase text-primary font-bold mb-3 md:mb-6 block">
                            Qui sommes-nous ?
                        </span>
                        <h2 className="text-3xl md:text-5xl font-sans font-light text-gray-900 leading-tight mb-6 md:mb-8">
                            Des produits qui<br className="hidden md:block" /><span className="text-primary">font la différence</span>
                        </h2>
                        <div className="space-y-4 md:space-y-5 text-gray-500 text-sm md:text-base leading-relaxed font-light">
                            <p>
                                Vitasilk est une marque spécialisée dans le lissage et les soins capillaires. Depuis 2010, on propose des produits professionnels adaptés à toutes les femmes qui veulent avoir des cheveux lisses, brillants et en bonne santé.
                            </p>
                            <p>
                                Nos formules sont enrichies à l'or 24K, aux protéines végétales et aux extraits naturels. Elles sont conçues pour donner des résultats visibles dès la première utilisation, sans formaldéhyde.
                            </p>
                            <p>
                                Aujourd'hui, nos produits sont utilisés par des milliers de femmes au Maroc et dans plus de 25 pays. On livre rapidement partout au Maroc, avec paiement à la livraison.
                            </p>
                        </div>
                        <Link
                            href="/boutique"
                            className="inline-flex items-center gap-3 mt-8 md:mt-10 text-[8px] md:text-[10px] uppercase font-bold text-primary border-b border-primary/30 pb-2 hover:text-white hover:border-white transition-colors group"
                        >
                            Voir nos produits
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Right: two stacked images - mobile optimized */}
                    <div className="relative h-[400px] md:h-[600px] order-1 lg:order-2 mb-8 lg:mb-0">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="absolute top-0 right-0 w-3/4 h-[280px] md:h-[420px] overflow-hidden shadow-xl md:shadow-2xl"
                        >
                            <Image
                                src="/img/lissage pro/BlueSilk-Modele-shooting-e1762520646963.png"
                                alt="Résultats Vitasilk"
                                fill
                                quality={90}
                                className="object-cover object-top"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute bottom-0 left-0 w-1/2 h-[180px] md:h-[280px] overflow-hidden shadow-xl md:shadow-2xl border-2 md:border-4 border-[#FDFBF7]"
                        >
                            <Image
                                src="/img/lissage pro/24k1.png"
                                alt="Produit 24K Gold"
                                fill
                                quality={90}
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="py-16 md:py-20 bg-[#1A1A1A] text-white">
                <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
                    {[
                        { target: 15, suffix: '+', label: "Ans d'expérience" },
                        { target: 50, suffix: 'K+', label: "Clientes satisfaites" },
                        { target: 25, suffix: '+', label: "Pays" },
                        { target: 100, suffix: '%', label: "Sans formaldéhyde" }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className="bg-white/5 p-6 rounded-lg backdrop-blur-sm border border-white/5"
                        >
                            <div className="text-3xl md:text-6xl font-sans font-light text-primary mb-2 md:mb-3">
                                <CountUp target={stat.target} suffix={stat.suffix} duration={2} />
                            </div>
                            <p className="text-[10px] md:text-xs uppercase text-white font-bold">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* VALUES */}
            <section className="py-16 md:py-32 px-4 max-w-[1400px] mx-auto">
                <div className="text-center mb-12 md:mb-20">
                    <span className="text-[10px] uppercase text-primary font-bold mb-4 block">
                        Nos Engagements
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-light text-gray-900 px-4 leading-tight">
                        Pourquoi nous <span className="text-primary italic">choisir</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {VALUES.map((value, i) => {
                        const Icon = value.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-white p-6 md:p-8 border border-gray-100 hover:border-primary/30 hover:shadow-lg md:hover:shadow-xl transition-all duration-500"
                            >
                                <div className="flex items-center justify-between mb-4 md:mb-8">
                                    <span className="text-2xl md:text-4xl font-light text-gray-300">{value.number}</span>
                                    <Icon size={20} className="text-primary" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xs md:text-sm uppercase font-bold text-gray-900 mb-3 md:mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light">
                                    {value.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* PRODUCT SHOWCASE */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-[1400px] mx-auto px-4">
                    <div className="text-center mb-10 md:mb-16">
                        <span className="text-[10px] uppercase text-primary font-bold mb-4 block">
                            Aperçu de nos produits
                        </span>
                        <h2 className="text-3xl md:text-5xl font-sans font-light text-gray-900 leading-tight">
                            Ce qu'on <span className="text-primary">propose</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                        {[
                            { src: "/img/lissage pro/vitasilk-shot-3.png", label: "Collection 24K Gold" },
                            { src: "/img/soins de cheveux/VitaSilk-24k-rose-gold-hair-serum-Shooting.png", label: "Nos Coffrets" },
                            { src: "/img/lissage pro/coffee-exctract-proteine-modele.png", label: "Blue-Silk 1L" },
                            { src: "/img/soins de cheveux/Organic-Protein-masque-capillaire-modele.png", label: "Soins Capillaires" },
                        ].map(({ src, label }, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative aspect-[3/4] overflow-hidden group"
                            >
                                <Image
                                    src={src}
                                    alt={label}
                                    fill
                                    quality={90}
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-[8px] md:text-[10px] uppercase font-bold text-white">
                                        {label}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-24 md:py-40 overflow-hidden">
                <Image
                    src="/img/lissage pro/coconut3.png"
                    alt="Collection Vitasilk"
                    fill
                    quality={90}
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/70" />
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative z-10 max-w-2xl mx-auto text-center px-4"
                >
                    <div className="w-8 md:w-12 h-px bg-primary mx-auto mb-6 md:mb-8" />
                    <h2 className="text-3xl md:text-6xl font-sans font-light text-white mb-6 md:mb-8 leading-tight">
                        Commandez <span className="text-primary">Maintenant</span>
                    </h2>
                    <p className="text-white/70 text-sm md:text-base mb-8 md:mb-12 font-light px-4">
                        Des produits qui font vraiment la différence — livrés partout au Maroc avec paiement à la livraison.
                    </p>
                    <Link
                        href="/boutique"
                        className="inline-flex items-center gap-3 px-6 md:px-8 py-2 md:py-3 bg-primary text-white text-[8px] md:text-[9px] uppercase font-bold hover:bg-white hover:text-black transition-colors rounded-sm"
                    >
                        Voir tous les produits
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </section>
        </div>
    );
};

export default AboutPage;