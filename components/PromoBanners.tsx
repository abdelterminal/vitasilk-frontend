"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Gift, Star } from 'lucide-react';

const PROMOS = [
    {
        id: 1,
        badge: "Nouveau",
        title: "Collection 24K Gold",
        subtitle: "L'or au cœur de votre ritual",
        description: "Des soins enrichis à l'or 24K pour des cheveux sublimés au quotidien.",
        cta: "Découvrir",
        href: "/category/lissage-pro",
        image: "/img/lissage pro/vitasilk-shot-3.png",
        bg: "from-amber-950 to-amber-900",
        accent: "#D4AF37",
        badgeColor: "bg-amber-400 text-black",
        icon: Star,
    },
    {
        id: 2,
        badge: "Promo -20%",
        title: "Nos Packs Exclusifs",
        subtitle: "Le luxe à prix privilégié",
        description: "Des coffrets complets pensés pour vous offrir le meilleur des soins brésiliens.",
        cta: "Voir les Packs",
        href: "/category/nos-packs",
        image: "/img/soins de cheveux/VitaSilk-24K-Rose-Gold-Hight-Gloss-tanino-protein-vegano-shooting.png",
        bg: "from-zinc-900 to-neutral-800",
        accent: "#C9A96E",
        badgeColor: "bg-red-500 text-white",
        icon: Gift,
    },
    {
        id: 3,
        badge: "Best-seller",
        title: "Blue-Silk 1L",
        subtitle: "Transformez vos cheveux en soie",
        description: "Le traitement brésilien professionnel plébiscité par les coiffeurs du monde entier.",
        cta: "Commander",
        href: "/category/lissage-pro",
        image: "/img/lissage pro/COCO-NUT-SMOOTH-250ML-show.png",
        bg: "from-blue-950 to-slate-900",
        accent: "#6B9FD4",
        badgeColor: "bg-blue-400 text-white",
        icon: Zap,
    },
];

const PromoBanners = () => {
    return (
        <section className="py-16 px-6 lg:px-12 bg-[#FDFBF7]">
            <div className="max-w-[1600px] mx-auto">
                {/* Section title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-[11px] uppercase font-bold text-primary mb-2">Offres Spéciales</p>
                    <h2 className="text-3xl md:text-4xl font-sans font-light text-gray-900">
                        Nos <span className="text-primary">Exclusivités</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {PROMOS.map((promo, i) => {
                        const Icon = promo.icon;
                        return (
                            <motion.div
                                key={promo.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                whileHover={{ y: -8 }}
                                className="relative overflow-hidden rounded-[7px] group cursor-pointer"
                            >
                                <Link href={promo.href}>
                                    <div className="relative h-80 overflow-hidden group/image z-0 rounded-[7px]">
                                        {/* Full background image */}
                                        <Image
                                            src={promo.image}
                                            alt={promo.title}
                                            fill
                                            className="object-cover object-center group-hover/image:scale-110 transition-transform duration-700"
                                        />

                                        {/* Dark gradient overlay for text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                                        {/* Content - Positioned at bottom */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                                            <div className="flex justify-end">
                                                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-bold shadow-lg ${promo.badgeColor}`}>
                                                    <Icon size={10} />
                                                    {promo.badge}
                                                </span>
                                            </div>
                                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <p className="text-primary text-[10px] uppercase font-bold mb-3">{promo.subtitle}</p>
                                                <h3 className="!text-white text-3xl md:text-4xl font-sans font-light leading-tight mb-4">{promo.title}</h3>
                                                <p className="!text-white/80 text-xs leading-relaxed mb-6 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                                                    {promo.description}
                                                </p>
                                                <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all">
                                                    <span className="text-[11px] uppercase font-bold" style={{ color: promo.accent }}>
                                                        {promo.cta}
                                                    </span>
                                                    <ArrowRight size={14} style={{ color: promo.accent }} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PromoBanners;
