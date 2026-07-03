"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { productsApi, imageUrl } from '@/lib/api';
import ProductCardCompact from '@/components/ProductCardCompact';
import { Loader2, ArrowLeft, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Product {
 id: string;
 name: string;
 description: string;
 price: number;
 category: string;
 categorySlug: string;
 stock: number;
 images: string[];
}

const SORT_OPTIONS = [
 { label: 'Nouveautés', value: 'newest' },
 { label: 'Prix Croissant', value: 'price_asc' },
 { label: 'Prix Décroissant', value: 'price_desc' },
 { label: 'Nom A-Z', value: 'name_asc' },
];

const LISSAGE_PRO_SUBS = [
  { slug: 'lissage-personnel-250ml', label: 'Personnel 250ml' },
  { slug: 'lissage-professionnel-1l', label: 'Professionnel 1L' },
];

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug ? decodeURIComponent(params.slug as string) : '';
  const isCollection = slug === 'lissage-pro';
  const categoryName = slug ? slug.replace(/-/g, ' ') : '';
  const displayName = isCollection ? 'Lissage Pro' : categoryName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

 const [products, setProducts] = useState<Product[]>([]);
 const [loading, setLoading] = useState(true);
 const [sortBy, setSortBy] = useState('newest');
 const [currentPage, setCurrentPage] = useState(1);
 const [activeTab, setActiveTab] = useState<string | null>(null);
 const ITEMS_PER_PAGE = 10;

 useEffect(() => {
 const fetchProducts = async () => {
   setLoading(true);
   try {
     const res = await productsApi.getAll({ limit: 500 });
     const mapped: Product[] = res.data.map(p => ({
       id: String(p.id),
       name: p.name,
       description: p.description || '',
       price: p.price,
       category: p.category_name || '',
       categorySlug: p.category_slug || '',
       stock: p.stock,
       images: p.images.map(img => imageUrl(img)),
     }));
     const subSlugs = LISSAGE_PRO_SUBS.map(s => s.slug);
     const filtered = isCollection
       ? mapped.filter(p => subSlugs.includes(p.categorySlug))
       : mapped.filter(p => p.categorySlug === slug);
     setProducts(filtered);
   } catch (error) {
     console.error("Error fetching products:", error);
   } finally {
     setLoading(false);
   }
 };
 if (categoryName) fetchProducts();
 }, [categoryName]);

 const tabFiltered = isCollection && activeTab
   ? products.filter(p => p.categorySlug === activeTab)
   : products;

 const sortedProducts = [...tabFiltered].sort((a, b) => {
 switch (sortBy) {
 case 'price_asc': return a.price - b.price;
 case 'price_desc': return b.price - a.price;
 case 'name_asc': return a.name.localeCompare(b.name);
 default: return 0;
 }
 });

 const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
 const paginatedProducts = sortedProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

 if (loading) {
 return (
 <div className="min-h-screen bg-[#FDFBF7] pt-32 flex items-center justify-center">
 <Loader2 className="w-10 h-10 animate-spin text-primary" />
 </div>
 );
 }

 return (
 <div className="min-h-screen bg-[#FDFBF7] pb-20">
 {/* Elegant Header */}
 <div className="bg-white border-b border-gray-100 pt-32 pb-10 px-6 lg:px-12">
 <div className="max-w-[1600px] mx-auto">
 {/* Breadcrumb */}
 <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-400 mb-8">
 <Link href="/" className="hover:text-black transition-colors">Accueil</Link>
 <span>/</span>
 <Link href="/boutique" className="hover:text-black transition-colors">Boutique</Link>
 <span>/</span>
 <span className="text-gray-900">{displayName}</span>
 </div>

 <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 >
 <p className="text-[10px] uppercase tracking-[0.4em] font-medium text-gray-400 mb-2">Collection Vitasilk</p>
        <h1 className="text-4xl md:text-5xl font-sans font-light text-gray-900 tracking-tight">
          {displayName}
        </h1>
 </motion.div>

 <div className="flex items-center gap-4">
 <span className="text-sm text-gray-400">
 <span className="font-semibold text-gray-900">{products.length}</span> Produit{products.length !== 1 ? 's' : ''}
 </span>
 {/* Sort */}
 <div className="relative">
 <select
 value={sortBy}
 onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}
 className="pl-4 pr-9 py-2.5 border border-gray-200 bg-white text-xs appearance-none focus:outline-none focus:border-black transition-colors rounded-sm cursor-pointer"
 >
 {SORT_OPTIONS.map(opt => (
 <option key={opt.value} value={opt.value}>{opt.label}</option>
 ))}
 </select>
 <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
 </div>
 </div>
 </div>

 {/* Subcategory tabs — only for Lissage Pro collection */}
 {isCollection && (
   <div className="flex gap-2 mt-6">
     <button
       onClick={() => { setActiveTab(null); setCurrentPage(1); }}
       className={`px-5 py-2 text-[10px] uppercase tracking-widest font-bold rounded-sm transition-all ${activeTab === null ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-primary hover:text-primary'}`}
     >
       Tous
     </button>
     {LISSAGE_PRO_SUBS.map(sub => (
       <button
         key={sub.slug}
         onClick={() => { setActiveTab(sub.slug); setCurrentPage(1); }}
         className={`px-5 py-2 text-[10px] uppercase tracking-widest font-bold rounded-sm transition-all ${activeTab === sub.slug ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-primary hover:text-primary'}`}
       >
         {sub.label}
       </button>
     ))}
   </div>
 )}
 </div>
 </div>

 {/* Products */}
 <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
 {products.length === 0 ? (
 <div className="text-center py-32 bg-white border border-gray-100 rounded-sm">
 <p className="text-lg text-gray-500 font-light mb-8">
 Cette collection est actuellement en cours de renouvellement.
 </p>
 <Link href="/boutique" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900 border-b border-gray-200 pb-1 hover:border-primary hover:text-primary transition-colors group">
 <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
 Retour à la Boutique
 </Link>
 </div>
 ) : (
 <>
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.5 }}
 className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
 >
 <AnimatePresence>
 {paginatedProducts.map((product, i) => (
 <motion.div
 key={product.id}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.4, delay: i * 0.04 }}
 >
 <ProductCardCompact product={product} variant="shop" />
 </motion.div>
 ))}
 </AnimatePresence>
 </motion.div>

 {/* Pagination */}
 {totalPages > 1 && (
 <div className="flex items-center justify-center gap-4 mt-14 pt-10 border-t border-gray-100">
 <button
 onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
 disabled={currentPage === 1}
 className="flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
 >
 <ChevronDown size={14} className="rotate-90" />
 Précédent
 </button>

 <div className="flex items-center gap-2">
 {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
 <button
 key={page}
 onClick={() => { setCurrentPage(page); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
 className={`w-9 h-9 text-xs font-bold transition-all border ${currentPage === page
 ? 'bg-black text-white border-black'
 : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
 }`}
 >
 {page}
 </button>
 ))}
 </div>

 <button
 onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
 disabled={currentPage === totalPages}
 className="flex items-center gap-2 px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
 >
 Suivant
 <ChevronDown size={14} className="-rotate-90" />
 </button>
 </div>
 )}
 </>
 )}
 </div>
 </div>
 );
};

export default CategoryPage;
