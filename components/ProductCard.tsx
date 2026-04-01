"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Check, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useDiscount } from '@/context/DiscountContext';
import { motion, AnimatePresence } from 'framer-motion';
import DiscountBadge from './ui/DiscountBadge';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

interface Product {
 id: string;
 name: string;
 description: string;
 price: number;
 category: string;
 stock: number;
 images: string[];
 avgRating?: number;
 reviewCount?: number;
}

interface ProductCardProps {
 product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
 const { addToCart } = useCart();
 const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
 const { discount } = useDiscount();
 const [isHovered, setIsHovered] = useState(false);
 const [addedToCart, setAddedToCart] = useState(false);

 const isWished = isInWishlist(product.id);
 
 const hasDiscount = !!discount?.percentage;
 const discountedPrice = hasDiscount 
        ? product.price * (1 - discount.percentage / 100) 
        : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      quantity: 1,
      image: product.images[0] || '/img/products/placeholder.jpg'
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWished) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link href={`/produit/${product.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="card-luxury group cursor-pointer overflow-hidden bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className="aspect-square relative"
          >
            <Image
              src={product.images[0] || '/img/products/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              style={{
                filter: 'brightness(1.05) contrast(1.02)',
                backgroundColor: '#F5F2ED'
              }}
            />
          </motion.div>

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-4 left-4 z-10">
              <DiscountBadge percentage={discount.percentage} />
            </div>
          )}

          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg z-10"
          >
            <AnimatePresence mode="wait">
              {isWished ? (
                <motion.div
                  key="wished"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="unwished"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Heart className="w-5 h-5 text-gray-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Quick Add to Cart */}
          <div
            className={cn(
                "absolute bottom-4 left-4 right-4 z-20",
                "opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-y-2 md:group-hover:translate-y-0"
            )}
          >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className="w-full btn-primary flex items-center justify-center gap-2 shadow-lg"
                >
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.div
                        key="added"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="cart"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="text-sm font-medium">
                    {addedToCart ? 'Ajouté' : 'Ajouter'}
                  </span>
                </motion.button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="mb-3">
            <h3 
              className="text-lg font-semibold text-primary mb-2 leading-tight"
              style={{fontFamily: "'Playfair Display', serif"}}
            >
              {product.name}
            </h3>
            <p className="text-secondary text-sm line-clamp-2" style={{fontFamily: "'Poppins', sans-serif"}}>
              {product.description}
            </p>
          </div>

          {/* Rating */}
          {product.avgRating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.avgRating!)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-secondary">
                {product.avgRating.toFixed(1)}
                {product.reviewCount && ` (${product.reviewCount})`}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span 
                className="text-xl font-bold text-gold"
                style={{fontFamily: "'Playfair Display', serif"}}
              >
                {discountedPrice.toFixed(2)} DH
              </span>
              {hasDiscount && (
                <span className="text-sm text-secondary line-through">
                  {product.price.toFixed(2)} DH
                </span>
              )}
            </div>
            
            {product.stock <= 10 && (
              <span className="text-xs text-bordeaux font-medium">
                Plus que {product.stock}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
