"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

const REVIEWS = [
 {
 id: 1,
 name: "Sofia M.",
 role: "Cliente Vérifiée",
 text: "J'ai essayé beaucoup de lissages, mais le Blue Silk de Vitasilk est de loin le meilleur. Mes cheveux sont brillants, doux et parfaitement lisses sans aucun effort le matin. Je recommande à 100% !",
 product: "Blue-Silk 1L",
 rating: 5,
 image: "/img/lissage pro/BlueSilk-Modele-shooting-e1762520646963.png"
 },
 {
 id: 2,
 name: "Amina R.",
 role: "Coiffeuse Professionnelle",
 text: "La gamme 24K Gold est incroyable. Mes clientes adorent l'odeur et le résultat est digne des plus grands salons. Zéro fumée, zéro gêne, c'est un pur bonheur à travailler.",
 product: "Collection 24K Gold",
 rating: 5,
 image: "/img/lissage pro/24k1.png"
 },
 {
 id: 3,
 name: "Lina T.",
 role: "Cliente Vérifiée",
 text: "Le masque Organic Protein a sauvé mes cheveux décolorés. Dès la première application, j'ai senti une réelle différence. C'est devenu mon soin hebdomadaire indispensable.",
 product: "Masque Organic Protein",
 rating: 5,
 image: "/img/soins de cheveux/Organic-Protein-masque-capillaire-modele.png"
 }
];

export default function TestimonialSection() {
 const [current, setCurrent] = useState(0);

 const next = () => setCurrent((c) => (c === REVIEWS.length - 1 ? 0 : c + 1));
 const prev = () => setCurrent((c) => (c === 0 ? REVIEWS.length - 1 : c - 1));

 return (
 <section className="py-24 bg-[#FAF9F5] overflow-hidden">
 <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

 {/* Image Side */}
 <div className="w-full lg:w-5/12 relative">
 <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-full overflow-hidden">
 <AnimatePresence mode="wait">
 <motion.div
 key={current}
 initial={{ opacity: 0, scale: 1.1 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.9 }}
 transition={{ duration: 0.6 }}
 className="absolute inset-0"
 >
 <Image
 src={REVIEWS[current].image}
 alt={REVIEWS[current].product}
 fill
 className="object-cover"
 />
 <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
 </motion.div>
 </AnimatePresence>
 </div>

 {/* Badge */}
 <div className="absolute -bottom-8 -right-8 lg:right-0 bg-white p-6 rounded-full shadow-xl w-32 h-32 flex flex-col items-center justify-center border border-gray-100 z-10">
 <div className="flex gap-1 text-amber-400 mb-1">
 {[...Array(5)].map((_, i) => (
 <Star key={i} size={12} fill="currentColor" />
 ))}
 </div>
 <span className="text-2xl font-bold text-gray-900">4.9<span className="text-sm text-gray-400 font-normal">/5</span></span>
 <span className="text-[8px] uppercase font-bold text-primary">Avis Clients</span>
 </div>
 </div>

 {/* Text Side */}
 <div className="w-full lg:w-7/12">
 <div className="mb-12">
 <Quote className="text-primary/20 w-16 h-16 mb-6" />
 <h2 className="text-3xl lg:text-5xl font-sans font-light text-gray-900 leading-tight">
 L'expérience de <br /><span className="text-primary">celles qui l'ont testé</span>
 </h2>
 </div>

 <div className="relative h-64 md:h-48">
 <AnimatePresence mode="wait">
 <motion.div
 key={current}
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 transition={{ duration: 0.5 }}
 className="absolute inset-0"
 >
 <p className="text-lg md:text-xl md:leading-relaxed text-gray-600 font-light mb-8 max-w-2xl">
 "{REVIEWS[current].text}"
 </p>

 <div>
 <h4 className="font-medium text-gray-900 text-lg uppercase tracking-wider">{REVIEWS[current].name}</h4>
 <p className="text-xs text-primary uppercase font-bold mb-1">{REVIEWS[current].role}</p>
 <p className="text-[10px] text-primary uppercase font-bold">Produit utilisé : {REVIEWS[current].product}</p>
 </div>
 </motion.div>
 </AnimatePresence>
 </div>

 {/* Navigation */}
 <div className="flex items-center gap-4 mt-8">
 <button
 onClick={prev}
 className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all"
 >
 <ChevronLeft size={20} />
 </button>
 <button
 onClick={next}
 className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all"
 >
 <ChevronRight size={20} />
 </button>
 </div>
 </div>

 </div>
 </section>
 );
}
