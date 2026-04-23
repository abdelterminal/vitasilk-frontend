"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
 return (
 <section className="relative h-screen w-full overflow-hidden flex items-center justify-center min-h-[600px] pt-16 md:pt-36 pb-8 md:pb-16" style={{backgroundColor: '#0D0D0D'}}>
 {/* Mobile: static image (fast LCP) */}
 <div className="absolute inset-0 z-0 md:hidden">
 <Image
 src="/img/pub1.png"
 alt="Vitasilk"
 fill
 priority
 className="object-cover"
 style={{filter: 'brightness(0.4) contrast(1.1)'}}
 />
 <div className="absolute inset-0" style={{backgroundColor: 'rgba(110, 15, 20, 0.3)'}} />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
 </div>

 {/* Desktop: video background */}
 <div className="absolute inset-0 z-0 hidden md:block">
 <video
 autoPlay
 muted
 loop
 playsInline
 className="w-full h-full object-cover"
 style={{filter: 'brightness(0.4) contrast(1.1)'}}
 >
 <source src="/img/hero.mp4" type="video/mp4" />
 </video>
 <div className="absolute inset-0" style={{backgroundColor: 'rgba(110, 15, 20, 0.3)'}} />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
 </div>

 {/* Floating Decorative Elements */}
 <div className="absolute inset-0 pointer-events-none overflow-hidden">
 <motion.div
 animate={{ rotate: 360 }}
 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
 className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] border rounded-full blur-[1px]"
 style={{borderColor: 'rgba(201, 161, 74, 0.1)'}}
 />
 <motion.div
 animate={{ rotate: -360 }}
 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
 className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] border rounded-full blur-[1px]"
 style={{borderColor: 'rgba(201, 161, 74, 0.05)'}}
 />
 </div>

 {/* Content */}
 <div className="relative z-10 text-center px-6 max-w-[1200px] mx-auto flex flex-col items-center">
 <motion.div
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1.2, ease: "easeOut" }}
 className="flex items-center justify-center space-x-4 uppercase text-[10px] md:text-[11px] font-bold mb-2 md:mb-4"
 style={{color: '#C9A14A'}}
 >
   <span className="flex items-center space-x-2 text-primary font-bold uppercase text-[10px] md:text-sm">
  Lissage &amp; Soins Capillaires — Livraison Partout au Maroc
  </span>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
 className="mb-2 md:mb-4 lg:mb-6 text-center"
 >
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[0.9] tracking-tight text-center" style={{fontFamily: "'Playfair Display', serif"}}>
  <motion.span
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 0.8, duration: 1 }}
 className="inline-block py-2 !text-white"
 style={{fontWeight: 600}}
 >
 Cheveux Lisses.
 </motion.span>
 <br />
  <motion.span
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ delay: 1, duration: 1 }}
 className="font-light py-2 inline-block !text-white"
 style={{fontWeight: 300}}
 >
 Cheveux Brillants.
 </motion.span>
 </h1>
 </motion.div>

 <motion.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 1.2, delay: 1 }}
 className="text-white/80 text-sm md:text-base max-w-2xl mx-auto mb-6 md:mb-8 lg:mb-10 tracking-wide leading-relaxed"
 style={{fontFamily: "'Poppins', sans-serif", fontWeight: 400}}
 >
 Des produits professionnels pour lisser et prendre soin de vos cheveux. <br className="hidden md:block" />
 Livraison rapide partout au Maroc.
 </motion.p>

 <motion.div
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 transition={{ duration: 1, delay: 1.4 }}
 className="flex flex-col sm:flex-row items-center justify-center gap-8"
 >
 <Link href="/boutique" className="group relative px-12 py-5 text-white font-medium uppercase tracking-widest text-[11px] overflow-hidden transition-all duration-700 shadow-[0_10px_30px_rgba(201,161,74,0.3)] hover:shadow-[0_15px_40px_rgba(201,161,74,0.5)] hover:-translate-y-1" style={{backgroundColor: '#C9A14A', borderRadius: '4px'}}>
 <span className="absolute inset-0 w-full h-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" style={{backgroundColor: 'rgba(0,0,0,0.1)'}} />
 <span className="relative z-10">Voir nos produits</span>
 </Link>

 <Link href="/about" className="group flex items-center space-x-4 text-white uppercase tracking-wider text-[11px] font-medium transition-all hover:text-primary">
 <span className="w-14 h-14 rounded-full border flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-all duration-700" style={{borderColor: 'rgba(255,255,255,0.2)'}}>
 <Play size={18} className="fill-current ml-1" />
 </span>
  <span className="relative font-bold text-primary tracking-tight">
 Qui sommes-nous ?
 <span className="absolute -bottom-1 left-0 w-full h-[1px] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" style={{backgroundColor: 'rgba(255,255,255,0.2)'}} />
 </span>
 </Link>
 </motion.div>
 </div>

 {/* Decorative Text */}
 <div className="absolute top-1/2 left-10 -translate-y-1/2 -rotate-90 hidden 2xl:block opacity-20">
 <span className="text-8xl tracking-widest font-light text-white/5" style={{fontFamily: "'Playfair Display', serif"}}>EST. 2024</span>
 </div>

 </section>
 );
};

export default Hero;
