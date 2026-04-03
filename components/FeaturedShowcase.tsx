"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedShowcase() {
    const [isPlaying, setIsPlaying] = useState(false);

    // Using an image as a poster since we might not have a real video
    const handlePlayClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Text Content */}
                    <div className="order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-8 h-px bg-primary"></span>
                                <span className="text-[11px] uppercase font-bold text-primary">Prendre soin de vos cheveux</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-sans font-light text-gray-900 leading-[1.1] mb-8">
                                Des cheveux transformés, <span className="text-primary">dès la première utilisation.</span>
                            </h2>

                            <p className="text-gray-500 font-light leading-relaxed mb-10 text-lg">
                                Nos soins réparent, lissent et font briller. Faciles à utiliser — le résultat se voit immédiatement.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <Link
                                    href="/boutique"
                                    className="inline-flex items-center justify-center bg-black text-white px-8 py-4 text-[11px] uppercase font-bold hover:bg-primary transition-colors"
                                >
                                    Découvrir la Boutique
                                </Link>
                                <Link
                                    href="/about"
                                    className="inline-flex items-center gap-3 font-medium text-gray-900 hover:text-primary transition-colors group"
                                >
                                    <span className="border-b border-black pb-1 group-hover:border-primary">Notre histoire</span>
                                    <ExternalLink size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Media Content - Autoplaying Video */}
                    <div className="order-1 lg:order-2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[4/3] rounded-[7px] overflow-hidden group shadow-2xl"
                        >
                            <video
                                src="/img/art.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-black/10 transition-colors duration-500 pointer-events-none" />

                            {/* Corner Accents */}
                            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/70" />
                            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/70" />
                        </motion.div>

                        {/* Decorative background element behind image */}
                        <div className="absolute -top-6 -right-6 w-full h-full border border-gray-100 -z-10 bg-[#FDFBF7]" />
                    </div>

                </div>
            </div>
        </section>
    );
}
