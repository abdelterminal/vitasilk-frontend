"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productsApi, reviewsApi, promotionsApi, ordersApi, imageUrl } from '@/lib/api';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { useDiscount } from '@/context/DiscountContext';
import DiscountBadge from '@/components/ui/DiscountBadge';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, ShoppingBag, Truck, ShieldCheck, ChevronRight,
    Minus, Plus, Loader2, Star, Send, User, Check, X,
    ChevronLeft, ChevronRight as ChevronRightIcon, CheckCircle2, Copy
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

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
    directCheckout?: boolean;
    enableCart?: boolean;
    avgRating?: number;
    reviewCount?: number;
}

interface Review {
    id: string;
    user_name: string;
    user_id?: number;
    rating: number;
    comment: string;
    created_at?: string;
}

const StarRating = ({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) => {
    const [hovered, setHovered] = useState(0);
    const display = interactive ? (hovered || rating) : rating;

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(star => (
                <button
                    key={star}
                    type="button"
                    disabled={!interactive}
                    onClick={() => onRate && onRate(star)}
                    onMouseEnter={() => interactive && setHovered(star)}
                    onMouseLeave={() => interactive && setHovered(0)}
                    className={cn("transition-colors", interactive ? "cursor-pointer" : "cursor-default")}
                >
                    <Star
                        size={interactive ? 24 : 16}
                        className={cn(star <= display ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200")}
                    />
                </button>
            ))}
        </div>
    );
};

const ProductDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { userData: user } = useAuth();
    const { discount } = useDiscount();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    // Reviews
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    // Related Products
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    const scrollCarousel = (direction: 'left' | 'right') => {
        const carousel = document.getElementById('related-products-carousel');
        if (carousel) {
            const scrollAmount = direction === 'left' ? -carousel.offsetWidth : carousel.offsetWidth;
            
            if (direction === 'right') {
                const maxScroll = carousel.scrollWidth - carousel.clientWidth;
                if (carousel.scrollLeft >= maxScroll - 10) {
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                    return;
                }
            }
            
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (relatedProducts.length === 0) return;
        const interval = setInterval(() => {
            scrollCarousel('right');
        }, 8000);
        return () => clearInterval(interval);
    }, [relatedProducts]);

    useEffect(() => {
        if (product?.category && id) {
            productsApi.getAll({ limit: 8 })
                .then(res => {
                    const prods: Product[] = res.data
                        .filter(p => p.category_name === product.category && String(p.id) !== id)
                        .slice(0, 7)
                        .map(p => ({
                            id: String(p.id),
                            name: p.name,
                            description: p.description || '',
                            price: p.price,
                            category: p.category_name || '',
                            stock: p.stock,
                            images: p.images.map(img => imageUrl(img)),
                        }));
                    setRelatedProducts(prods);
                })
                .catch(err => console.error("Error fetching related products:", err));
        }
    }, [product?.category, id]);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const res = await productsApi.getById(id);
                const p = res.data;
                setProduct({
                    id: String(p.id),
                    name: p.name,
                    description: p.description || '',
                    price: p.price,
                    category: p.category_name || '',
                    stock: p.stock,
                    images: p.images.map(img => imageUrl(img)),
                    directCheckout: p.direct_checkout,
                    enableCart: p.enable_cart,
                });
            } catch (error) {
                console.error("Error fetching product:", error);
                router.push('/boutique');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, router]);

    const fetchReviews = async () => {
        if (!id) return;
        setReviewsLoading(true);
        try {
            const res = await reviewsApi.getByProduct(id);
            const fetched: Review[] = res.data.map(r => ({
                id: String(r.id),
                user_name: r.user_name,
                user_id: r.user_id,
                rating: r.rating,
                comment: r.comment || '',
                created_at: r.created_at,
            }));
            setReviews(fetched);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setReviewsLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchReviews();
    }, [id]);

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !newComment.trim()) return;

        const hasReviewed = reviews.some(r => r.user_id === user.id);
        if (hasReviewed) {
            alert("Vous avez déjà laissé un avis pour ce produit.");
            return;
        }

        setSubmitting(true);
        try {
            await reviewsApi.create(id, {
                rating: newRating,
                comment: newComment.trim(),
                user_name: user.name || 'Client Vitasilk',
            });

            setNewComment('');
            setNewRating(5);
            setSubmitSuccess(true);
            setTimeout(() => setSubmitSuccess(false), 3000);
            await fetchReviews();
        } catch (error) {
            console.error("Error submitting review:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!product) return null;

    const isWished = isInWishlist(product.id);
    const avgRating = reviews.length > 0 ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) : 0;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2500);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <div className="flex items-center text-[9px] uppercase tracking-[0.2em] font-medium text-gray-400 mb-12 flex-wrap gap-1">
                    <span onClick={() => router.push('/')} className="hover:text-primary cursor-pointer transition-colors">Accueil</span>
                    <ChevronRight size={10} />
                    <span onClick={() => router.push('/boutique')} className="hover:text-primary cursor-pointer transition-colors">Boutique</span>
                    <ChevronRight size={10} />
                    <span onClick={() => router.push(`/category/${product.category.toLowerCase().replace(/ /g, '-')}`)} className="hover:text-primary cursor-pointer transition-colors">{product.category}</span>
                    <ChevronRight size={10} />
                    <span className="text-gray-700 line-clamp-1 max-w-[200px]">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
                    {/* === GALLERY === */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <div className="relative aspect-[4/5] bg-white border border-gray-100 rounded-sm overflow-hidden group shadow-sm">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={product.images?.[activeImage] || '/img/logo.png'}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Discount Badge */}
                            {discount && (
                                <div className="absolute top-6 right-6 z-20 scale-125 origin-top-right">
                                    <DiscountBadge percentage={discount.percentage} />
                                </div>
                            )}

                            {product.stock <= 5 && product.stock > 0 && (
                                <div className="absolute top-6 left-6 bg-red-50 text-red-500 text-[10px] uppercase tracking-widest px-4 py-1.5 font-bold border border-red-100 z-10">
                                    Édition Limitée — {product.stock} restants
                                </div>
                            )}
                            {product.stock === 0 && (
                                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
                                    <span className="bg-black text-white text-xs uppercase tracking-widest px-8 py-3">Victime de son succès</span>
                                </div>
                            )}
                        </div>

                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-5 gap-3">
                                {product.images.map((img, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={cn(
                                            "relative aspect-square border cursor-pointer overflow-hidden rounded-sm transition-all",
                                            activeImage === i ? "border-primary ring-2 ring-primary/10" : "border-gray-200 opacity-50 hover:opacity-100"
                                        )}
                                    >
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="pt-4 flex justify-center md:justify-start">
                            <button 
                                onClick={() => setIsDescriptionOpen(true)}
                                className="text-[10px] uppercase tracking-widest font-bold text-primary hover:text-black transition-colors border-b border-primary/20 pb-1 w-fit"
                            >
                                Description Détaillée
                            </button>
                        </div>
                    </motion.div>

                    {/* === DETAILS === */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
                        <div className="mb-6">
                            <Link href={`/category/${product.category.toLowerCase().replace(/ /g, '-')}`}>
                                <p className="text-[11px] uppercase tracking-widest text-primary font-bold mb-4 hover:text-black transition-colors cursor-pointer">{product.category}</p>
                            </Link>
                            <h1 className="text-4xl lg:text-5xl font-sans font-light text-gray-900 tracking-tight leading-tight mb-4">{product.name}</h1>

                            {/* Star summary */}
                            {reviews.length > 0 && (
                                <div className="flex items-center gap-3 mb-6">
                                    <StarRating rating={avgRating} />
                                    <span className="text-xs text-gray-400">({reviews.length} avis)</span>
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-2">
                                {discount ? (
                                    <>
                                        <p className="text-4xl font-sans text-primary">
                                            {(product.price * (1 - discount.percentage / 100)).toLocaleString()} <span className="text-2xl">DH</span>
                                        </p>
                                        <p className="text-2xl font-sans text-gray-300 line-through">
                                            {product.price.toLocaleString()} DH
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-4xl font-sans text-gray-900">
                                        {product.price.toLocaleString()} <span className="text-2xl">DH</span>
                                    </p>
                                )}
                            </div>
                        </div>

                        {product.directCheckout && (
                            <div className="mb-6">
                                <DirectCheckoutForm product={product} quantity={quantity} discount={discount} />
                            </div>
                        )}

                        {/* Add to Cart Panel */}
                        {product.enableCart !== false && (
                            <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm space-y-6">
                                {/* Quantity */}
                                <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Quantité</span>
                                    <div className="flex items-center border border-gray-200 rounded-sm">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={product.stock === 0} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors disabled:opacity-30"><Minus size={14} /></button>
                                        <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                                        <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={product.stock === 0} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors disabled:opacity-30"><Plus size={14} /></button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                        className={cn(
                                            "flex-1 py-5 text-[10px] uppercase tracking-widest font-bold transition-all duration-700 shadow-xl flex items-center justify-center gap-3 rounded-sm",
                                            addedToCart ? "bg-green-500 text-white shadow-green-400/30" : "bg-primary text-white hover:bg-black shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                        )}
                                    >
                                        {addedToCart ? <><Check size={16} /><span>Ajouté !</span></> : <><ShoppingBag size={16} /><span>Ajouter au Panier</span></>}
                                    </button>
                                    <button
                                        onClick={() => isWished ? removeFromWishlist(product.id) : addToWishlist(product)}
                                        className={cn("w-16 flex-shrink-0 flex items-center justify-center border transition-all rounded-sm", isWished ? "border-primary bg-primary/5 text-primary" : "border-gray-200 text-gray-400 hover:border-black hover:text-black")}
                                    >
                                        <Heart size={18} className={cn(isWished && "fill-primary")} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Promises */}
                        <div className="grid grid-cols-2 gap-6 mt-10 pt-8 border-t border-gray-100">
                            <div className="flex items-start gap-4">
                                <Truck className="text-primary mt-1" size={20} />
                                <div>
                                    <h4 className="text-[9px] uppercase tracking-wider font-bold text-gray-900 mb-1">Livraison Partout au Maroc</h4>
                                    <p className="text-xs text-gray-400 font-light">2-4 jours ouvrés</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <ShieldCheck className="text-primary mt-1" size={20} />
                                <div>
                                    <h4 className="text-[9px] uppercase tracking-wider font-bold text-gray-900 mb-1">Qualité Garantie</h4>
                                    <p className="text-xs text-gray-400 font-light">Formules professionnelles</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-50">
                            <p className="text-sm font-light text-gray-500 leading-relaxed">
                                {product.description || "L'excellence Vitasilk incarnée dans une formule unique, révélant la beauté absolue de vos cheveux."}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* === RELATED PRODUCTS (CONTROLLED CAROUSEL) === */}
                {relatedProducts.length > 0 && (
                    <div className="bg-transparent py-24 border-t border-gray-100 overflow-hidden">
                        <div className="w-full px-4 md:px-10 mb-12">
                            <div className="flex items-end justify-between">
                                <div className="space-y-2 text-left">
                                    <p className="text-primary text-[10px] uppercase font-black tracking-[0.5em]">L'Art de l'Accord Parfait</p>
                                    <h2 className="text-4xl md:text-5xl font-sans font-light text-gray-900 tracking-tight">Produits Similaires</h2>
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => scrollCarousel('left')}
                                        className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all bg-white shadow-sm"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button 
                                        onClick={() => scrollCarousel('right')}
                                        className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all bg-white shadow-sm"
                                    >
                                        <ChevronRightIcon size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="relative w-full px-4 md:px-10">
                            <div 
                                id="related-products-carousel"
                                className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-8"
                            >
                                {relatedProducts.map((relProd) => (
                                    <div key={relProd.id} className="w-[280px] md:w-[320px] shrink-0 snap-start">
                                        <RelatedProductCard product={relProd} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* === REVIEWS SECTION === */}
                <div className="border-t border-gray-100 pt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Rating Summary */}
                        <div className="lg:col-span-4">
                            <h2 className="text-2xl font-sans font-light text-gray-900 mb-8">Avis Clients</h2>
                            {reviews.length > 0 ? (
                                <div className="bg-white border border-gray-100 rounded-sm p-8 text-center mb-8 shadow-sm">
                                    <p className="text-7xl font-sans font-light text-primary mb-2">{avgRating}</p>
                                    <StarRating rating={avgRating} />
                                    <p className="text-xs text-gray-400 mt-4">{reviews.length} avis vérifiés</p>

                                    {/* Rating breakdown */}
                                    <div className="mt-6 space-y-2">
                                        {[5, 4, 3, 2, 1].map(star => {
                                            const count = reviews.filter(r => r.rating === star).length;
                                            const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                                            return (
                                                <div key={star} className="flex items-center gap-3 text-xs">
                                                    <span className="text-gray-500 w-2">{star}</span>
                                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                                                    </div>
                                                    <span className="text-gray-400 w-4">{count}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white border border-gray-100 rounded-sm p-8 text-center mb-8">
                                    <p className="text-gray-400 text-sm">Soyez le premier à donner votre avis.</p>
                                </div>
                            )}

                            {/* Write a Review */}
                            {user ? (
                                <div className="bg-white border border-gray-100 rounded-sm p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-900">Votre Avis</h3>
                                        {reviews.some(r => r.user_id === user.id) && (
                                            <span className="text-[9px] uppercase tracking-widest font-bold text-green-500 bg-green-50 px-2 py-1 rounded-sm">Déjà complété</span>
                                        )}
                                    </div>
                                    <form onSubmit={handleSubmitReview} className="space-y-6">
                                        {reviews.some(r => r.user_id === user.id) ? (
                                            <div className="bg-[#FDFBF7] border border-dashed border-gray-200 p-6 text-center rounded-sm">
                                                <Check className="mx-auto text-green-500 mb-3" size={20} />
                                                <p className="text-xs text-gray-500">Merci ! Vous avez déjà partagé votre expérience avec ce produit.</p>
                                            </div>
                                        ) : (
                                            <>
                                                <div>
                                                    <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mb-3 block">Note</label>
                                                    <StarRating rating={newRating} onRate={setNewRating} interactive />
                                                </div>
                                                <div>
                                                    <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mb-3 block">Commentaire</label>
                                                    <textarea
                                                        required
                                                        value={newComment}
                                                        onChange={e => setNewComment(e.target.value)}
                                                        rows={4}
                                                        placeholder="Partagez votre expérience avec ce produit..."
                                                        className="w-full bg-[#FDFBF7] border border-gray-100 p-4 text-sm rounded-sm resize-none focus:outline-none focus:border-primary/40 transition-colors "
                                                    />
                                                </div>
                                                <AnimatePresence>
                                                    {submitSuccess && (
                                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-green-600 text-xs font-medium flex items-center gap-2">
                                                            <Check size={14} /> Votre avis a été publié avec succès !
                                                        </motion.p>
                                                    )}
                                                </AnimatePresence>
                                                <button
                                                    type="submit"
                                                    disabled={submitting}
                                                    className="w-full py-4 bg-primary text-white text-[10px] uppercase font-bold tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-60 rounded-sm"
                                                >
                                                    {submitting ? <Loader2 size={16} className="animate-spin" /> : <><Send size={14} /><span>Publier mon Avis</span></>}
                                                </button>
                                            </>
                                        )}
                                    </form>
                                </div>
                            ) : (
                                <div className="bg-white border border-dashed border-gray-200 rounded-sm p-8 text-center">
                                    <User size={24} className="mx-auto text-gray-300 mb-4" />
                                    <p className="text-sm text-gray-500 mb-4">Connectez-vous pour laisser un avis</p>
                                    <Link href="/login" className="text-[10px] uppercase tracking-widest font-bold text-primary hover:text-black transition-colors border-b border-primary pb-1">
                                        Se Connecter
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Reviews List */}
                        <div className="lg:col-span-8">
                            {reviewsLoading ? (
                                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={24} /></div>
                            ) : reviews.length === 0 ? (
                                <div className="text-center text-gray-400 py-20 bg-white border border-gray-50 rounded-sm">Aucun avis pour le moment.</div>
                            ) : (
                                <div className="space-y-6">
                                    {reviews.map((review, i) => (
                                        <motion.div
                                            key={review.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="bg-white border border-gray-100 rounded-sm p-8 shadow-sm"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <ReviewHeader name={review.user_name} created_at={review.created_at} />
                                                <StarRating rating={review.rating} />
                                            </div>
                                            <p className="text-sm text-gray-600 font-light leading-relaxed ">"{review.comment}"</p>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* === DESCRIPTION DRAWER === */}
            <AnimatePresence>
                {isDescriptionOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDescriptionOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                        />
                        {/* Drawer */}
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
                        >
                            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-900">Description Détaillée</h3>
                                <button 
                                    onClick={() => setIsDescriptionOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-8 prose prose-sm max-w-none text-left">
                                <div className="text-sm text-gray-600 font-light leading-relaxed whitespace-pre-wrap mb-12">
                                    {product.description || "Aucune description détaillée disponible pour le moment."}
                                </div>

                                {/* More details section */}
                                <div className="space-y-8">
                                    <div className="border-t border-gray-50 pt-8">
                                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-4">Conseils d'utilisation</h4>
                                        <p className="text-xs text-gray-500 font-light leading-relaxed">
                                            Appliquer sur cheveux humides, masser délicatement puis rincer abondamment. Répéter si nécessaire pour un résultat optimal.
                                        </p>
                                    </div>
                                    <div className="border-t border-gray-50 pt-8">
                                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-4">Engagement Vitasilk</h4>
                                        <p className="text-xs text-gray-500 font-light leading-relaxed">
                                            Tous nos produits sont formulés avec les meilleurs ingrédients pour garantir une expérience luxueuse et des résultats professionnels durables.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

const RelatedProductCard = ({ product }: { product: any }) => {
    return (
        <Link href={`/product/${product.id}`} className="block group">
            <div className="relative aspect-[4/5] bg-white rounded-2xl overflow-hidden border border-gray-100/50 mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-700">
                <Image 
                    src={product.images?.[0] || '/img/logo.png'} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
            </div>
            <div className="text-left px-2">
                <p className="text-[9px] uppercase tracking-widest text-primary font-black mb-2">{product.category}</p>
                <h3 className="text-gray-900 font-sans font-bold text-lg group-hover:text-primary transition-colors line-clamp-1 mb-2">{product.name}</h3>
                
                <div className="flex items-center justify-between">
                    <p className="text-sm font-black text-gray-950 tracking-wide">{product.price.toLocaleString()} DH</p>

                    {/* Star Rating Display */}
                    {product.avgRating !== undefined && product.avgRating > 0 && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-gray-900">{product.avgRating.toFixed(1)}</span>
                            <Star size={10} className="text-amber-400 fill-amber-400" />
                            <span className="text-[10px] text-gray-400 font-medium">({product.reviewCount})</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

const ReviewHeader = ({ name, created_at }: { name: string; created_at?: string }) => {
    return (
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm overflow-hidden border border-primary/5">
                {name.charAt(0).toUpperCase()}
            </div>
            <div>
                <p className="text-sm font-bold text-gray-900">{name}</p>
                <p className="text-[9px] uppercase tracking-wider text-gray-400 mt-0.5">
                    {created_at ? new Date(created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Récent'}
                </p>
            </div>
        </div>
    );
};

const MOROCCAN_CITIES = [
    "Agadir", "Al Hoceïma", "Béni Mellal", "Berkane", "Berrechid", 
    "Casablanca", "Chefchaouen", "Dakhla", "El Jadida", "Errachidia", 
    "Essaouira", "Fès", "Guelmim", "Ifrane", "Kénitra", "Khemisset", 
    "Khenifra", "Khouribga", "Laâyoune", "Larache", "Marrakech", 
    "Meknès", "Midelt", "Mohammedia", "Nador", "Ouarzazate", "Oujda", 
    "Rabat", "Safi", "Salé", "Sefrou", "Settat", "Sidi Kacem", 
    "Tanger", "Tan-Tan", "Taounate", "Taroudant", "Taza", "Tétouan", 
    "Tiznit", "Zagora"
];

const DirectCheckoutForm = ({ product, quantity, discount }: { product: Product, quantity: number, discount: any }) => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [appliedPromo, setAppliedPromo] = useState<any>(null);
    const [promoError, setPromoError] = useState('');
    const [isApplyingPromo, setIsApplyingPromo] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [copied, setCopied] = useState(false);
    const { userData: user } = useAuth();
    
    // Autofill if logged in
    useEffect(() => {
        if (user) {
            if (!name) setName(user.name || '');
            if (!phone) setPhone(user.phone || '');
            if (!city && user.address?.city) setCity(user.address.city);
        }
    }, [user]);

    const applyPromo = async () => {
        if (!promoCode.trim()) return;
        setIsApplyingPromo(true);
        setPromoError('');
        try {
            const res = await promotionsApi.validate(promoCode.trim().toUpperCase());
            const pct = res.data.discount_percentage;
            const productTotal = product.price * quantity;
            const dAmount = (productTotal * pct) / 100;
            setPromoDiscount(dAmount);
            setAppliedPromo({ code: promoCode.trim().toUpperCase(), discount_percentage: pct });
        } catch (e: any) {
            setPromoError(e?.message || 'Code invalide ou expiré');
        } finally {
            setIsApplyingPromo(false);
        }
    };

    const handleQuickOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !city.trim() || !phone.trim() || phone.length < 9) {
            alert("Veuillez remplir tous les champs correctement.");
            return;
        }

        setIsSubmitting(true);
        try {
            const productTotal = product.price * quantity;
            const eventDiscountAmount = discount ? (productTotal * discount.percentage) / 100 : 0;
            const totalDiscount = eventDiscountAmount + promoDiscount;
            const discountPct = productTotal > 0 ? Math.round((totalDiscount / productTotal) * 100) : 0;

            const res = await ordersApi.create({
                items: [{ product_id: parseInt(product.id), quantity }],
                address: `${city} — Achat Rapide depuis la page produit`,
                phone,
                city,
                notes: `Client: ${name}${appliedPromo ? ` | Promo: ${appliedPromo.code}` : ''}`,
                discount_percentage: discountPct,
            });

            setOrderId(`#${res.data.id}`);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
            setName('');
            setCity('');
            setPhone('');
            setPromoCode('');
            setPromoDiscount(0);
            setAppliedPromo(null);
        } catch (error) {
            console.error("Error creating quick order:", error);
            alert("Une erreur s'est produite lors de la commande.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCopyId = () => {
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (success) {
        return (
            <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-sm text-center mt-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] luxury-text text-5xl pointer-events-none select-none">Vitasilk</div>
                <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-sans font-light text-emerald-900 mb-2">Commande confirmée !</h3>
                <p className="text-sm text-emerald-700 mb-8">Votre commande a été enregistrée avec succès. Notre équipe vous contactera très prochainement.</p>
                
                <div className="bg-white/60 backdrop-blur-sm border border-emerald-200/50 rounded-sm p-6 mb-6 relative group">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-emerald-600/70 font-bold mb-3">
                        N° de Suivi | رقم التتبع
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <p className="text-xl font-mono font-bold text-emerald-900 tracking-widest">{orderId}</p>
                        <button
                            onClick={handleCopyId}
                            className="p-2 rounded-full bg-emerald-100/50 hover:bg-emerald-500 hover:text-white transition-all text-emerald-600"
                            title="Copier le numéro"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        href={`/track-order?id=${orderId}&phone=${phone}`}
                        className="w-full py-4 bg-emerald-600 text-white text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-emerald-700 transition-all rounded-sm shadow-lg shadow-emerald-200"
                    >
                        Suivre ma Commande
                    </Link>
                    <p className="text-[10px] text-emerald-600/50 font-medium uppercase tracking-widest">Conservez ce numéro pour suivre votre commande</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-sm shadow-sm relative overflow-hidden">
            <h3 className="text-xl font-sans font-black text-gray-900 mb-1 uppercase tracking-tighter">Achat Rapide</h3>
            <p className="text-[10px] uppercase font-bold tracking-widest text-primary mb-6">Commandez directement sans passer par le panier</p>
                
            <form onSubmit={handleQuickOrder} className="space-y-4 relative z-10">
                <div>
                    <input
                        type="text"
                        placeholder="Nom et prénom | الاسم الكامل"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-5 py-4 bg-[#FAF9F6] border border-gray-100 outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 text-sm rounded-sm transition-all text-left"
                        dir="auto"
                    />
                </div>
                        
                <div>
                    <input
                        type="text"
                        list="moroccan-cities"
                        placeholder="Ville | المدينة"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full px-5 py-4 bg-[#FAF9F6] border border-gray-100 outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 text-sm rounded-sm transition-all text-left"
                        dir="auto"
                    />
                    <datalist id="moroccan-cities">
                        {MOROCCAN_CITIES.map((c, i) => (
                            <option key={i} value={c} />
                        ))}
                    </datalist>
                </div>

                <div>
                    <input
                        type="tel"
                        placeholder="Téléphone | رقم الهاتف"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-5 py-4 bg-[#FAF9F6] border border-gray-100 outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 text-sm rounded-sm transition-all text-left"
                        dir="ltr"
                    />
                </div>

                <div className="pt-2">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Code Promo | كود الخصم"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={!!appliedPromo}
                            className="flex-1 px-5 py-3 bg-[#FAF9F6] border border-gray-100 outline-none focus:border-primary/40 text-[10px] uppercase font-bold tracking-widest rounded-sm disabled:opacity-50 text-left"
                        />
                        <button
                            type="button"
                            onClick={applyPromo}
                            disabled={!promoCode || isApplyingPromo || !!appliedPromo}
                            className="px-6 py-3 bg-gray-900 text-white text-[9px] uppercase font-bold tracking-widest hover:bg-black transition-all rounded-sm disabled:opacity-30"
                        >
                            {isApplyingPromo ? <Loader2 size={12} className="animate-spin" /> : appliedPromo ? <Check size={12} /> : 'Appliquer'}
                        </button>
                    </div>
                    {promoError && <p className="text-[9px] text-red-500 font-bold mt-2 uppercase tracking-tighter text-right">{promoError}</p>}
                    {appliedPromo && (
                        <div className="flex justify-between items-center mt-3 p-2 bg-emerald-50 border border-emerald-100 rounded-sm">
                            <span className="text-[9px] text-emerald-700 font-bold uppercase tracking-widest">Code {appliedPromo.code} appliqué (-{promoDiscount} DH)</span>
                            <button type="button" onClick={() => { setAppliedPromo(null); setPromoDiscount(0); setPromoCode(''); }} className="text-emerald-700 hover:text-rose-500"><X size={12} /></button>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || product.stock === 0}
                    className="w-full mt-2 py-5 bg-gray-950 text-white hover:bg-primary transition-all duration-500 text-[10px] uppercase tracking-[0.2em] font-black shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                    {isSubmitting ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <>
                            <Check size={16} />
                            <span>Commander Maintenant</span>
                        </>
                    )}
                </button>
                    
                <p className="text-center text-[9px] uppercase tracking-widest text-gray-400 font-bold mt-4">
                    Paiement à la livraison
                </p>
            </form>
        </div>
    );
};

export default ProductDetailsPage;
