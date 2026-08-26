"use client";

import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, ArrowLeft } from 'lucide-react';

const WishlistPage = () => {
 const { wishlist, wishlistCount } = useWishlist();

 return (
 <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-6 lg:px-12">
 <div className="max-w-[1600px] mx-auto">
 {/* Header */}
 <div className="mb-16 text-center">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8 }}
 >
 <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
 <Heart size={24} className="text-primary" />
 </div>
 <h1 className="text-4xl md:text-6xl font-sans font-light text-gray-900 tracking-tight capitalize mb-4">
 Vos <span className="">Favoris</span>
 </h1>
 <p className="text-[10px] uppercase tracking-[0.4em] font-medium text-gray-400 mb-6">
 {wishlistCount} Article{wishlistCount !== 1 ? 's' : ''} Sauvegardé{wishlistCount !== 1 ? 's' : ''}
 </p>
 <div className="w-12 h-px bg-primary/30 mx-auto" />
 </motion.div>
 </div>

 {wishlist.length === 0 ? (
 <div className="text-center py-32 bg-white border border-gray-100 rounded-sm">
 <p className="text-lg text-gray-500 font-light mb-8">
 Votre liste de souhaits est pour le moment vide.
 </p>
 <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-primary hover:text-black transition-colors group cursor-pointer border-b border-primary/20 pb-1">
 <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
 Découvrir Nos Collections
 </Link>
 </div>
 ) : (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.8, delay: 0.2 }}
 className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12"
 >
 {wishlist.map((product) => (
 <ProductCard key={product.id} product={product} />
 ))}
 </motion.div>
 )}
 </div>
 </div>
 );
};

export default WishlistPage;
