"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Truck, Star, Shield, Gift, Zap } from 'lucide-react';

const OFFERS = [
 { icon: CheckCircle2, text: "LIVRAISON GRATUITE dès 500 DH" },
 { icon: Star, text: "PRODUITS 100% PROFESSIONNELS" },
 { icon: Truck, text: "EXPÉDITION 24-48H AU MAROC" },
 { icon: Gift, text: "CODE: VITASILK10 — -10% sur votre 1ère commande" },
 { icon: Shield, text: "QUALITÉ GARANTIE — FORMULES CERTIFIÉES" },
 { icon: Zap, text: "RÉSULTATS VISIBLES DÈS LA 1ÈRE APPLICATION" },
 { icon: CheckCircle2, text: "OR 24K — L'INGRÉDIENT DE LUXE POUR VOS CHEVEUX" },
 { icon: Star, text: "SOINS BRÉSILIENS PROFESSIONNELS" },
];

// Duplicate for seamless loop
const DOUBLE = [...OFFERS, ...OFFERS];

const MarqueeBanner = () => {
 return (
 <div className="w-full overflow-hidden bg-primary py-4 select-none">
 <motion.div
 className="flex gap-0 whitespace-nowrap"
 animate={{ x: ["0%", "-50%"] }}
 transition={{
 duration: 30,
 repeat: Infinity,
 ease: "linear",
 }}
 >
 {DOUBLE.map((item, i) => {
 const Icon = item.icon;
 return (
 <div key={i} className="flex items-center gap-4 px-10 flex-shrink-0">
 <Icon size={14} className="text-white/60 flex-shrink-0" />
  <span className="text-white text-[10px] uppercase font-bold">
 {item.text}
 </span>
 <span className="text-white/30 text-lg">•</span>
 </div>
 );
 })}
 </motion.div>
 </div>
 );
};

export default MarqueeBanner;
