"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const INSTA_POSTS = [
    { id: 1, src: '/img/lissage pro/BlueSilk-Modele-shooting-e1762520646963.png', alt: 'Blue Silk Résultat' },
    { id: 2, src: '/img/soins de cheveux/Organic-Protein-masque-capillaire-modele.png', alt: 'Masque Organic' },
    { id: 3, src: '/img/lissage pro/coffee-exctract-proteine-modele.png', alt: 'Coffee Extract Protéine' },
    { id: 4, src: '/img/soins de cheveux/VitaSilk-organic-protein-Shampoing-modele.png', alt: 'Shampooing Organic' },
    { id: 5, src: '/img/soins de cheveux/VitaSilk-24K-Rose-Gold-Hight-Gloss-tanino-protein-vegano-shooting.png', alt: '24K Rose Gold' },
];

export default function InstagramSection() {
    return (
        <section className="py-20 bg-white border-t border-gray-100">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                <div className="text-center mb-12">
                    <p className="text-[11px] uppercase font-bold text-primary mb-2">Rejoignez la communauté</p>
                    <h2 className="text-3xl md:text-4xl font-sans font-light text-gray-900 mb-6">
                        @vitasilk<span className="text-primary">.bs</span>
                    </h2>
                    <a
                        href="https://www.instagram.com/vitasilk.bs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[11px] uppercase font-bold text-primary hover:text-black transition-colors"
                    >
                        <Instagram size={14} />
                        Suivez-nous sur Instagram
                    </a>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    {INSTA_POSTS.map((post, i) => (
                        <motion.a
                            key={post.id}
                            href="https://www.instagram.com/vitasilk.bs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="relative aspect-square overflow-hidden group rounded-[7px] cursor-pointer block"
                        >
                            <Image
                                src={post.src}
                                alt={post.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Instagram className="text-white" size={24} />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
