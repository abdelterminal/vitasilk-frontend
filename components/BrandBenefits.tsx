"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, FlaskConical, Award, MoveRight } from 'lucide-react';
import Image from 'next/image';

const FEATURES = [
 {
 title: "Formules Exclusives",
 description: "Des formules développées par des experts, utilisées par les meilleurs salons.",
 icon: FlaskConical,
 color: "text-blue-500",
 bgIcon: "bg-blue-50"
 },
 {
 title: "Ingrédients Nobles",
 description: "Or 24K, huile de coco et kératine — pour des cheveux nourris, lisses et brillants.",
 icon: Leaf,
 color: "text-emerald-500",
 bgIcon: "bg-emerald-50"
 },
 {
 title: "Zéro Formaldéhyde",
 description: "Sans formol — sûr pour vous, sûr pour votre coiffeuse, efficace pour vos cheveux.",
 icon: ShieldCheck,
 color: "text-indigo-500",
 bgIcon: "bg-indigo-50"
 },
 {
 title: "Résultat Salon",
 description: "Le même résultat qu'en salon. Sans vous déplacer.",
 icon: Award,
 color: "text-amber-500",
 bgIcon: "bg-amber-50"
 }
];

export default function BrandBenefits() {
 return (
 <section className="py-24 bg-white relative overflow-hidden">
 {/* Background decorative elements */}
 <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FDFBF7] -skew-x-12 translate-x-1/2 -z-10" />

 <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
 {/* Image side - split composition */}
 <div className="w-full lg:w-1/2 relative h-[600px] rounded-2xl overflow-hidden group">
 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 whileInView={{ opacity: 1, scale: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.8 }}
 className="absolute inset-0"
 >
 <Image
 src="/img/pub1.png"
 alt="Résultat Vitasilk"
 fill
 className="object-contain object-center group-hover:scale-105 transition-transform duration-[1.5s]"
 />
 {/* Overlay elements */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
 <div className="absolute bottom-8 left-8 right-8 text-white">
 <h3 className="text-2xl font-light mb-2">Résultat visible</h3>
 <p className="text-white/80 text-sm font-light">Dès la première utilisation.</p>
 </div>
 </motion.div>

 {/* Floating badge */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: 0.4, duration: 0.6 }}
 className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl flex items-center gap-3"
 >
 <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
 <span className="font-bold text-lg">1<sup className="text-xs">er</sup></span>
 </div>
 <div className="pr-4">
                                <p className="text-[11px] uppercase font-bold text-primary">Choix des</p>
                                <p className="text-xs text-black ">Professionnels</p>
 </div>
 </motion.div>
 </div>

 {/* Content side */}
 <div className="w-full lg:w-1/2">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="mb-12"
 >
  <p className="text-[11px] uppercase font-bold text-primary mb-3 text-center lg:text-left">Pourquoi Vitasilk ?</p>
  <h2 className="text-3xl lg:text-5xl font-sans font-light text-gray-900 leading-tight text-center lg:text-left">
  La Science du <br /><span className="text-primary">Lissage Parfait</span>
  </h2>
 </motion.div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
 {FEATURES.map((feature, i) => {
 const Icon = feature.icon;
 return (
 <motion.div
 key={i}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: i * 0.1 }}
 className="group"
 >
 <div className={`w-14 h-14 ${feature.bgIcon} rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300`}>
 <Icon className={`${feature.color}`} size={24} strokeWidth={1.5} />
 </div>
 <h3 className="text-lg font-medium text-gray-900 mb-3">{feature.title}</h3>
 <p className="text-sm text-gray-500 leading-relaxed font-light">{feature.description}</p>

 <div className="mt-4 flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
  <span className="text-[11px] uppercase font-bold text-primary">En savoir plus</span>
 <MoveRight size={14} className="text-primary" />
 </div>
 </motion.div>
 );
 })}
 </div>
 </div>
 </div>
 </section>
 );
}
