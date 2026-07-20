"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { productsApi, categoriesApi, imageUrl } from '@/lib/api';
import ProductCardCompact from '@/components/ProductCardCompact';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, SlidersHorizontal, X, ChevronDown, RotateCcw } from 'lucide-react';
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
 categorySlug: string;
 stock: number;
 images: string[];
}

interface CategoryOption {
 name: string;
 slug: string;
}
const SORT_OPTIONS = [
 { label: 'Nouveautés', value: 'newest' },
 { label: 'Prix Croissant', value: 'price_asc' },
 { label: 'Prix Décroissant', value: 'price_desc' },
 { label: 'Nom A-Z', value: 'name_asc' },
];

export default function BoutiquePage() {
 const [allProducts, setAllProducts] = useState<Product[]>([]);
 const [categories, setCategories] = useState<CategoryOption[]>([{ name: 'Tous', slug: '' }]);
 const [loading, setLoading] = useState(true);
 const [activeSlug, setActiveSlug] = useState('');
 const [searchQuery, setSearchQuery] = useState('');
 const [sortBy, setSortBy] = useState('newest');
 const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
 const [maxPrice, setMaxPrice] = useState(5000);
 const [showFilters, setShowFilters] = useState(false);
 const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
 const [allSizes, setAllSizes] = useState<string[]>([]);
 const [currentPage, setCurrentPage] = useState(1);

 // Reference to the products grid for scrolling
 const productsGridRef = useRef<HTMLDivElement>(null);

 const ITEMS_PER_PAGE = 15;

 // Smooth scroll to products function
 const scrollToProducts = () => {
   if (productsGridRef.current) {
     const yOffset = -100; // Adjust this value to control scroll position (negative = scroll higher)
     const y = productsGridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
     window.scrollTo({ top: y, behavior: 'smooth' });
   }
 };

 useEffect(() => {
 const fetchData = async () => {
   setLoading(true);
   try {
     const [productsRes, categoriesRes] = await Promise.all([
       productsApi.getAll({ limit: 500 }),
       categoriesApi.getAll(),
     ]);

     const productsData: Product[] = productsRes.data.map(p => ({
       id: String(p.id),
       name: p.name,
       description: p.description || '',
       price: p.price,
       category: p.category_name || '',
       categorySlug: p.category_slug || '',
       stock: p.stock,
       images: p.images.map(img => imageUrl(img)),
     }));
     setAllProducts(productsData);

     const cats: CategoryOption[] = [
       { name: 'Tous', slug: '' },
       ...categoriesRes.data
         .filter(c => c.slug !== 'lissage-pro')
         .map(c => ({ name: c.name, slug: c.slug })),
     ];
     setCategories(cats);

     const prices = productsData.map(p => p.price);
     setMaxPrice(Math.max(...prices, 1000));
     setPriceRange([0, Math.max(...prices, 1000)]);

     const sizes = new Set<string>();
     productsData.forEach(p => {
       const match = p.name.match(/\b(\d+(?:\.\d+)?\s?(?:ml|l|g|kg))\b/i);
       if (match) sizes.add(match[1].toUpperCase());
     });
     setAllSizes(Array.from(sizes));
   } catch (err) {
     console.error('Error fetching boutique data:', err);
   } finally {
     setLoading(false);
   }
 };

 fetchData();
 }, []);

 const filteredProducts = useCallback(() => {
 let products = [...allProducts];

 // Category filter
 if (activeSlug !== '') {
   products = products.filter(p => p.categorySlug === activeSlug);
 }

 // Search filter
 if (searchQuery) {
 const q = searchQuery.toLowerCase();
 products = products.filter(p => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
 }

    // Size filter
    if (selectedSizes.length > 0) {
      products = products.filter(p => {
        const match = p.name.match(/\b(\d+(?:\.\d+)?\s?(?:ml|l|g|kg))\b/i);
        const size = match ? match[1].toUpperCase() : null;
        return size && selectedSizes.includes(size);
      });
    }

    // Price Range filter
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

 // Sort
 switch (sortBy) {
 case 'price_asc': products.sort((a, b) => a.price - b.price); break;
 case 'price_desc': products.sort((a, b) => b.price - a.price); break;
 case 'name_asc': products.sort((a, b) => a.name.localeCompare(b.name)); break;
 default: break; // newest = firebase order
 }

 return products;
  }, [allProducts, activeSlug, searchQuery, sortBy, priceRange, selectedSizes]);

 const results = filteredProducts();
 const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
 const paginatedResults = results.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

 // Reset to page 1 when filters change
 const resetPage = () => setCurrentPage(1);

 // Handle page change with scroll
 const handlePageChange = (newPage: number) => {
   setCurrentPage(newPage);
   // Small delay to ensure state is updated before scrolling
   setTimeout(scrollToProducts, 100);
 };

 const resetAllFilters = () => {
   setActiveSlug('');
   setSearchQuery('');
   setSortBy('newest');
   setPriceRange([0, maxPrice]);
   setSelectedSizes([]);
   resetPage();
   scrollToProducts();
 };

 return (
 <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-20">
 {/* Premium Page Header with Background Image */}
 <div className="relative bg-black w-full h-[65vh] min-h-[500px] flex items-center justify-center -mt-32 pt-32 mb-12 overflow-hidden px-6">
 {/* Background Image */}
 <Image
 src="/img/stoore.jpg"
 alt="Boutique Vitasilk"
 fill
 className="object-cover object-center opacity-75 scale-105"
 />

 {/* Gradient Overlays */}
 <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-transparent to-transparent opacity-90" />
 <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />

 <div className="relative z-10 w-full max-w-[1000px] mx-auto flex flex-col items-center text-center">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 >
  <p className="text-[10px] uppercase font-bold text-primary mb-4">La Collection Complète</p>
 <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-light !text-white tracking-tight mb-8">
 Maison <span className=" text-primary">Vitasilk</span>
 </h1>
 </motion.div>

 {/* Search Bar - Centered */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ delay: 0.1 }}
 className="relative w-full max-w-xl mx-auto shadow-2xl"
 >
 <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
 <input
 type="text"
 value={searchQuery}
 onChange={e => setSearchQuery(e.target.value)}
 placeholder="Rechercher un soin, un rituel..."
 className="w-full pl-14 pr-4 py-4 border-none bg-white/95 backdrop-blur-sm rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-inner transition-all placeholder:text-gray-400"
 />
 {searchQuery && (
 <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors bg-gray-100 p-1 rounded-full">
 <X size={12} />
 </button>
 )}
 </motion.div>
 </div>
 </div>
 
 {/* Main Content Area */}
 <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

 {/* Category Tabs - Centered Below Header */}
 <div className="flex flex-wrap justify-center gap-3 mb-10 -mt-16 relative z-20">
 {categories.map(cat => (
 <button
 key={cat.slug}
 onClick={() => {
   setActiveSlug(cat.slug);
   resetPage();
   scrollToProducts();
 }}
 className={cn(
  "px-6 py-3 text-[10px] uppercase font-bold transition-all border rounded-full backdrop-blur-md shadow-lg",
 activeSlug === cat.slug
 ? "bg-black text-white border-black scale-105"
 : "bg-white/80 text-gray-600 border-gray-100 hover:border-black hover:text-black hover:bg-white"
 )}
 >
 {cat.name}
 </button>
 ))}
 </div>

 <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10">
 {/* Toolbar */}
 <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-10 pb-6 border-b border-gray-100">
 <p className="text-sm text-gray-400">
 <span className="font-semibold text-gray-900">{results.length}</span> Produit{results.length !== 1 ? 's' : ''} trouvé{results.length !== 1 ? 's' : ''}
 </p>
 <div className="flex gap-4 items-center">
 {/* Filter Toggle */}
 <button
 onClick={() => setShowFilters(!showFilters)}
 className={cn(
  "flex items-center gap-2 px-5 py-2.5 border rounded-sm text-[10px] uppercase font-bold transition-all",
 showFilters ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
 )}
 >
 <SlidersHorizontal size={14} />
 <span>Filtres</span>
 </button>

 {/* Sort */}
 <div className="relative">
 <select
 value={sortBy}
 onChange={e => {
   setSortBy(e.target.value);
   scrollToProducts(); // Scroll to products when changing sort
 }}
 className="pl-4 pr-9 py-2.5 border border-gray-200 bg-white text-xs appearance-none focus:outline-none focus:border-primary transition-colors rounded-sm cursor-pointer"
 >
 {SORT_OPTIONS.map(opt => (
 <option key={opt.value} value={opt.value}>{opt.label}</option>
 ))}
 </select>
 <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
 </div>
 </div>
 </div>

 {/* Filter Panel */}
  <AnimatePresence>
    {showFilters && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden mb-10"
      >
        <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm">
          {/* Filters in one row */}
          <div className="flex flex-wrap items-end gap-8">
            {/* Price Range */}
            <div className="flex-1 min-w-[200px]">
              <h4 className="text-[10px] uppercase font-bold text-gray-700 mb-4">Gamme de Prix</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{priceRange[0].toLocaleString()} DH</span>
                  <span>{priceRange[1].toLocaleString()} DH</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={e => {
                    setPriceRange([priceRange[0], parseInt(e.target.value)]);
                    resetPage();
                  }}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            {/* Size Filter */}
            {allSizes.length > 0 && (
              <div className="flex-1 min-w-[200px]">
                <h4 className="text-[10px] uppercase font-bold text-gray-700 mb-4">Contenance / Volume</h4>
                <div className="flex flex-wrap gap-2">
                  {allSizes.sort().map(size => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSizes(prev => 
                          prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
                        );
                        resetPage();
                      }}
                      className={cn(
                        "px-4 py-2 text-[10px] uppercase font-bold border transition-all rounded-sm",
                        selectedSizes.includes(size)
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Reset Button */}
            <div className="flex-shrink-0 pb-1">
              <button
                onClick={resetAllFilters}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 rounded-sm text-[10px] uppercase font-bold text-red-600 hover:from-red-100 hover:to-red-200 hover:border-red-300 hover:text-red-700 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow"
              >
                <RotateCcw size={14} className="animate-none hover:animate-spin" />
                <span>Réinitialiser</span>
              </button>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(activeSlug !== '' || selectedSizes.length > 0 || priceRange[1] < maxPrice) && (
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
              <span className="text-[9px] uppercase text-gray-400 font-bold mr-2">Filtres actifs:</span>
              {activeSlug !== '' && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-[9px] uppercase font-bold rounded-full">
                  {categories.find(c => c.slug === activeSlug)?.name}
                </span>
              )}
              {selectedSizes.map(size => (
                <span key={size} className="px-3 py-1 bg-gray-100 text-gray-700 text-[9px] uppercase font-bold rounded-full">
                  {size}
                </span>
              ))}
              {priceRange[1] < maxPrice && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-[9px] uppercase font-bold rounded-full">
                  ≤ {priceRange[1]} DH
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Products Grid with ref */}
  <div ref={productsGridRef}>
    {loading ? (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    ) : results.length === 0 ? (
      <div className="text-center py-40 bg-white border border-gray-100 rounded-sm">
        <p className="text-lg text-gray-500 font-light mb-4">Aucun produit trouvé.</p>
        <p className="text-sm text-gray-400">Essayez d'ajuster vos filtres ou votre recherche.</p>
      </div>
    ) : (
      <>
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
        >
          <AnimatePresence>
            {paginatedResults.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
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
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-6 py-3 text-[10px] uppercase font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronDown size={14} className="rotate-90" />
              Précédent
            </button>

            {/* Page dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={cn(
                    "w-9 h-9 text-xs font-bold transition-all border",
                    currentPage === page
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black"
                  )}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-6 py-3 text-[10px] uppercase font-bold border border-gray-200 text-gray-600 hover:border-black hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Suivant
              <ChevronDown size={14} className="-rotate-90" />
            </button>
          </div>
        )}

        {/* Optional: Show current page indicator */}
        {totalPages > 1 && (
          <p className="text-center text-xs text-gray-400 mt-4">
            Page {currentPage} sur {totalPages}
          </p>
        )}
      </>
    )}
  </div>
 </div>
 </div>
 </div>
 );
}