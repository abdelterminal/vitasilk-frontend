"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Heart, Eye, Star, ChevronDown } from 'lucide-react';
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
	price: number;
	category: string;
	stock: number;
	images: string[];
	description?: string;
	avgRating?: number;
	reviewCount?: number;
}

interface ProductCardCompactProps {
	product: Product;
	variant?: 'default' | 'shop';
}

const ProductCardCompact = ({ product, variant = 'default' }: ProductCardCompactProps) => {
	const { addToCart } = useCart();
	const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
	const { discount } = useDiscount();
	const [imgError, setImgError] = useState(false);
	const [added, setAdded] = useState(false);

	const isWished = isInWishlist(product.id);
	
	const hasDiscount = !!discount?.percentage;
	const discountedPrice = hasDiscount 
		? product.price * (1 - discount.percentage / 100) 
		: product.price;

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		addToCart(product, 1);
		setAdded(true);
		setTimeout(() => setAdded(false), 2000);
	};

	const handleWishlist = (e: React.MouseEvent) => {
		e.preventDefault();
		isWished ? removeFromWishlist(product.id) : addToWishlist(product);
	};

	const imgSrc = !imgError && product.images?.[0] ? product.images[0] : '/img/logo.png';

	return (
		<Link href={`/product/${product.id}`}>
			<div className="group relative bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300">
				{/* Image */}
				<div className="relative aspect-square bg-[#FDFBF7] overflow-hidden">
					<Image
						src={imgSrc}
						alt={product.name}
						fill
						className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
						onError={() => setImgError(true)}
					/>

					<AnimatePresence>
						{hasDiscount && (
							<div className="absolute top-2 right-2 z-20 scale-[0.65] origin-top-right">
								<DiscountBadge percentage={discount.percentage} />
							</div>
						)}
					</AnimatePresence>

					{/* Stock badges */}
					{product.stock === 0 && (
						<div className="absolute inset-0 bg-white/70 flex items-center justify-center">
							<span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 bg-white px-3 py-1 border border-gray-200">Épuisé</span>
						</div>
					)}
					{product.stock > 0 && product.stock <= 5 && (
						<div className="absolute top-2 left-2">
							<span className="text-[8px] uppercase tracking-wider font-bold text-white bg-red-500 px-2 py-1 rounded-sm">{product.stock} restants</span>
						</div>
					)}

					{/* Quick Actions */}
					<div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
						<button
							onClick={handleWishlist}
							className={cn(
								"w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all",
								isWished ? "bg-primary border-primary text-white" : "bg-white border-gray-100 text-gray-500 hover:text-primary"
							)}
						>
							<Heart size={14} className={cn(isWished && "fill-white")} />
						</button>

						<button
							onClick={handleAddToCart}
							disabled={product.stock === 0}
							className={cn(
								"w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all",
								added ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-100 text-gray-500 hover:text-primary disabled:opacity-40"
							)}
						>
							<ShoppingBag size={14} />
						</button>

						<div className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-lg text-gray-500 hover:text-primary transition-colors">
							<Eye size={14} />
						</div>
					</div>
				</div>

				{/* Details */}
				<div className="p-3">
					<p className="text-[8px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-1 truncate">{product.category}</p>
					<h3 className="text-sm font-medium text-gray-900 leading-tight truncate mb-1" title={product.name}>{product.name}</h3>
					
					<div className="flex items-center justify-between">
						<div className="flex flex-col">
							{hasDiscount && (
								<span className="text-[8px] text-gray-400 line-through leading-none mb-0.5">{product.price.toLocaleString()} DH</span>
							)}
							<span className="text-sm font-bold text-primary leading-none">{discountedPrice.toLocaleString()} DH</span>
						</div>
						
						{/* Star Rating Display */}
						{product.avgRating !== undefined && product.avgRating > 0 && (
							variant === 'shop' ? (
								<div className="flex items-center gap-0.5 sm:gap-1 scale-[0.9] origin-right">
									<span className="text-[10px] sm:text-[11px] font-bold text-gray-900">{product.avgRating.toFixed(1)}</span>
									<div className="flex items-center">
										{[1, 2, 3, 4, 5].map((star) => (
											<Star 
												key={star} 
												size={8} 
												className={star <= Math.round(product.avgRating || 0) ? "text-amber-500 fill-amber-500" : "text-gray-200 fill-gray-200"} 
											/>
										))}
									</div>
									<ChevronDown size={8} className="text-gray-400" />
									<span className="text-[9px] text-gray-400 font-medium truncate">({product.reviewCount})</span>
								</div>
							) : (
								<div className="flex items-center gap-1">
									<span className="text-[10px] font-bold text-gray-900">{product.avgRating.toFixed(1)}</span>
									<Star size={8} className="text-amber-400 fill-amber-400" />
									<span className="text-[9px] text-gray-400 font-medium">({product.reviewCount})</span>
								</div>
							)
						)}
						{added && (
							<motion.span
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0 }}
								className="text-[8px] text-green-500 font-bold uppercase tracking-wider"
							>
								Ajouté ✓
							</motion.span>
						)}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProductCardCompact;
