"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp, ArrowRight, ShoppingBag } from 'lucide-react';
import { productsApi, imageUrl } from '@/lib/api';

interface FeaturedProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  href: string;
}

const BADGES = [
  { label: '#1 Best-seller', bg: 'bg-primary text-white' },
  { label: 'Coup de Cœur',  bg: 'bg-gray-900 text-white' },
];

export default function BestSellers() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);

  useEffect(() => {
    productsApi.getAll({ limit: 500 }).then(res => {
      const soinsCapillaires = res.data.filter(p => p.category_slug === 'soins-capillaires');
      const source = soinsCapillaires.length > 0 ? soinsCapillaires : res.data.filter(p => p.featured);
      const mapped = source.slice(0, 4).map(p => ({
        id: p.id,
        name: p.name,
        category: p.category_name || '',
        price: p.price,
        image: p.images?.[0] ? imageUrl(p.images[0]) : '/img/placeholder.png',
        href: `/product/${p.id}`,
      }));
      setProducts(mapped);
    }).catch(console.error);
  }, []);

  if (products.length === 0) return null;

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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, i) => {
            const badge = BADGES[i] ?? BADGES[BADGES.length - 1];
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link
                  href={product.href}
                  className="group flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white border border-gray-100 rounded-[7px] overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-700 sm:p-6"
                >
                  {/* Image — full-width centered on mobile, fixed sidebar on desktop */}
                  <div className="relative w-full h-56 sm:w-36 sm:h-44 sm:flex-shrink-0 bg-gray-50 sm:rounded-[7px] sm:overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, 144px"
                      className="object-contain p-6 sm:p-3 transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className={`absolute top-4 left-4 sm:hidden ${badge.bg} text-[9px] uppercase font-bold px-3 py-1 rounded-full`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-between py-1 flex-1 px-4 pb-4 sm:px-0 sm:pb-0">
                    <span className={`hidden sm:inline-flex self-start ${badge.bg} text-[9px] uppercase font-bold px-3 py-1 rounded-full mb-3`}>
                      {badge.label}
                    </span>

                    <div>
                      {product.category && (
                        <p className="text-[9px] uppercase text-primary font-bold mb-1">{product.category}</p>
                      )}
                      <h3 className="text-gray-900 font-sans font-light text-xl mb-3">{product.name}</h3>

                      <div className="flex items-center gap-2 mb-4">
                        <ShoppingBag size={11} className="text-primary" />
                        <span className="text-[9px] text-gray-400">Produit vedette</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-primary font-medium text-sm">{product.price.toLocaleString()} DH</span>
                        <span className="text-[9px] uppercase font-bold text-primary group-hover:text-black transition-colors flex items-center gap-1 ml-auto">
                          Commander <ArrowRight size={10} />
                        </span>
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
}
