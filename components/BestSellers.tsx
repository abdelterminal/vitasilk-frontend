"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, ArrowRight, ShoppingBag } from 'lucide-react';

const BEST_SELLERS = [
  {
    id: 1,
    name: "Filler Glow 1L",
    subtitle: "Protéine Kératine",
    price: "À partir de 299 MAD",
    badge: "#1 Best-seller",
    badgeBg: "bg-primary text-white",
    image: "/img/lissage pro/VitaSilk-Filter-Glow-1L.jpg",
    href: "/boutique",
    purchases: "+250 achats",
  },
  {
    id: 2,
    name: "Botox Capillaire 1000ml",
    subtitle: "Traitement Professionnel Intense",
    price: "À partir de 349 MAD",
    badge: "Coup de Cœur",
    badgeBg: "bg-gray-900 text-white",
    image: "/img/lissage pro/VitaSilk-Botox-Capillaire-1000ml-shoot.png",
    href: "/boutique",
    purchases: "+180 achats",
  },
];

export default function BestSellers() {
  return (
    <section className="py-20 bg-[#FDFBF7]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp size={14} className="text-primary" />
              <p className="text-[10px] uppercase font-bold text-primary">Les Plus Commandés</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-light text-gray-900">
              Produits <span className="text-primary">phares</span>
            </h2>
          </div>
          <Link
            href="/boutique"
            className="hidden md:flex items-center gap-2 text-[10px] uppercase font-bold text-primary hover:text-black transition-colors group"
          >
            <span>Voir tout</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Two cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BEST_SELLERS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link
                href={product.href}
                className="group flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white border border-gray-100 rounded-[7px] overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-700 p-4 sm:p-6"
              >
                {/* Image */}
                <div className="relative w-36 h-44 flex-shrink-0 bg-gray-50 rounded-[7px] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-3 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col justify-between py-1 flex-1">
                  {/* Badge */}
                  <span className={`self-start ${product.badgeBg} text-[9px] uppercase font-bold px-3 py-1 rounded-full mb-3`}>
                    {product.badge}
                  </span>

                  <div>
                    <p className="text-[9px] uppercase text-primary font-bold mb-1">{product.subtitle}</p>
                    <h3 className="text-gray-900 font-sans font-light text-xl mb-3">{product.name}</h3>

                    {/* Purchases instead of stars */}
                    <div className="flex items-center gap-2 mb-4">
                      <ShoppingBag size={11} className="text-primary" />
                      <span className="text-[9px] text-gray-400">{product.purchases}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-primary font-medium text-sm">{product.price}</span>
                      <span className="text-[9px] uppercase font-bold text-primary group-hover:text-black transition-colors flex items-center gap-1 ml-auto">
                        Commander <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}