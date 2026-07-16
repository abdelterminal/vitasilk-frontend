"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, ShoppingBag, User, Menu, X, Phone, Mail, MapPin, Instagram, Facebook, ChevronDown, Shield, Package, Bell, Home, Store, FileText, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { categoriesApi } from '@/lib/api';
import SearchOverlay from './SearchOverlay';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const Navbar = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const { userData: user, logout } = useAuth();
    const [dynamicCategories, setDynamicCategories] = useState<{name: string, href: string, sub?: {name: string, href: string}[]}[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const isHome = pathname === '/';
    const forceSolid = !isHome || isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        categoriesApi.getAll().then(res => {
            const all = res.data.map(cat => ({
                name: cat.name.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                href: `/category/${cat.slug}`,
                slug: cat.slug,
            }));
            const lissageSubs = all.filter(c => c.slug === 'lissage-personnel-250ml' || c.slug === 'lissage-professionnel-1l');
            const others = all.filter(c => c.slug !== 'lissage-personnel-250ml' && c.slug !== 'lissage-professionnel-1l' && c.slug !== 'lissage-pro');
            setDynamicCategories([
                { name: 'Lissage Pro', href: '/category/lissage-pro', sub: lissageSubs },
                ...others,
            ]);
        }).catch(console.error);
    }, []);

    const navLinks = [
        { name: 'Accueil', href: '/' },
        { name: 'Boutique', href: '/boutique' },
        {
            name: 'Categories', href: '#', categories: dynamicCategories.length > 0 ? dynamicCategories : [
                { name: 'Lissage Pro', href: '/category/lissage-pro' },
                { name: 'Soins de Cheveux', href: '/category/soins-de-cheveux' },
                { name: 'Matériel', href: '/category/materiel' },
                { name: 'Nos Packs', href: '/category/nos-packs' },
            ]
        },
        { name: 'À Propos', href: '/about' },
        { name: 'Contact', href: '/contact' },
        // { name: 'Suivre Commande', href: '/track-order' }, // hidden from nav
    ];

    // روابط النافبار السفلية للهاتف
    const bottomNavLinks = [
        { name: 'Accueil', href: '/', icon: Home },
        { name: 'Boutique', href: '/boutique', icon: Store },
        // { name: 'Commandes', href: '/account?tab=orders', icon: FileText }, // hidden — no client accounts
        // { name: 'Profil', href: '/account', icon: User }, // hidden — no client accounts
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            {/* Top Info Bar - مخفي على الهاتف */}
            <div className={cn(
                "hidden md:block transition-all duration-500 overflow-hidden border-b",
                isScrolled
                    ? "bg-white/80 backdrop-blur-md h-9 border-white/10"
                    : "bg-[#FDFBF7] h-10 md:h-11 border-primary/10"
            )}>
                <div className="max-w-[1600px] mx-auto h-full px-8 md:px-12 flex items-center justify-between text-[11px] font-medium transition-colors">
                    <div className={cn(
                        "flex items-center space-x-6",
                        forceSolid ? "text-gray-600" : "text-gray-500"
                    )}>
                        <div className="flex items-center space-x-2 group cursor-pointer hover:text-primary transition-colors">
                            <Phone size={11} className="text-primary/70" />
                            <span>+212 661 086 837</span>
                        </div>
                        <div className="hidden sm:flex items-center space-x-2 group cursor-pointer hover:text-primary transition-colors">
                            <Mail size={11} className="text-primary/70" />
                            <span>contact@vitasilkbs.ma</span>
                        </div>
                    </div>

                    <div className={cn(
                        "hidden lg:flex items-center space-x-6 uppercase text-[11px]",
                        forceSolid ? "text-gray-400" : "text-primary font-medium"
                    )}>
                        <span>Pur Luxe • Soie Pure</span>
                    </div>

                    <div className={cn(
                        "flex items-center space-x-6",
                        forceSolid ? "text-gray-600" : "text-gray-500"
                    )}>
                        <div className="hidden md:flex items-center space-x-4 border-r pr-6" style={{borderColor: 'rgba(201, 161, 74, 0.1)'}}>
                            <a href="https://www.instagram.com/vitasilk.bs/" target="_blank" rel="noopener noreferrer">
                                <Instagram size={12} className="hover:text-primary cursor-pointer transition-colors" style={{color: '#C9A14A'}} />
                            </a>
                            {/* Facebook hidden
                            <Facebook size={12} className="hover:text-primary cursor-pointer transition-colors" style={{color: '#C9A14A'}} />
                            */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav
                className={cn(
                    'transition-all duration-700 ease-[cubic-bezier(0.16, 1, 0.3, 1)] px-4 md:px-8 lg:px-12 py-3 md:py-4',
                    forceSolid
                        ? 'bg-white/70 backdrop-blur-2xl py-2 md:py-2 border-b border-white/30 shadow-sm'
                        : 'bg-transparent py-4 md:py-7'
                )}
                style={{
                    backgroundColor: forceSolid ? 'rgba(245, 242, 237, 0.9)' : 'transparent',
                    borderBottom: forceSolid ? '1px solid rgba(201, 161, 74, 0.2)' : 'none'
                }}
            >
                <div className="max-w-[1600px] mx-auto flex items-center justify-between">

                    {/* Left: Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="group relative block">
                            <div className="relative h-7 w-24 md:h-10 md:w-36 transition-transform duration-700 group-hover:scale-[1.03]">
                                <Image
                                    src="/img/logo.png"
                                    alt="Vitasilk"
                                    fill
                                    className={cn(
                                        "object-contain transition-all duration-700",
                                        !forceSolid ? "brightness-0 invert" : "drop-shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
                                    )}
                                    priority
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Center: Links - مخفي على الهاتف */}
                    <div className="hidden xl:flex items-center justify-center space-x-10">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group/nav">
                                {link.categories ? (
                                    <div className="flex items-center space-x-1 cursor-pointer">
                                        <span className={cn(
                                            "text-[11px] uppercase transition-all font-medium px-1 py-2",
                                            forceSolid ? "text-gray-950" : "text-white"
                                        )}
                                        style={{fontFamily: "'Poppins', sans-serif"}}
                                    >
                                        {link.name}
                                    </span>
                                    <ChevronDown size={12} className={cn(
                                        "transition-transform duration-300 group-hover/nav:rotate-180",
                                        forceSolid ? "text-gray-950" : "text-white"
                                    )} />

                                        {/* Dropdown Menu */}
                                        <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform translate-y-2 group-hover/nav:translate-y-0">
                                            <div className="w-60 bg-white/90 backdrop-blur-xl border shadow-xl p-4 flex flex-col space-y-2 rounded-sm" style={{borderColor: 'rgba(201, 161, 74, 0.1)'}}>
                                                {link.categories.map((cat: any) => (
                                                    <div key={cat.name}>
                                                        <Link
                                                            href={cat.href}
                                                            className="text-[10px] uppercase font-bold text-gray-800 hover:text-primary transition-colors py-1 block"
                                                            style={{fontFamily: "'Poppins', sans-serif"}}
                                                        >
                                                            {cat.name}
                                                        </Link>
                                                        {cat.sub && (
                                                            <div className="pl-3 mt-1 mb-1 space-y-1 border-l-2 border-primary/20">
                                                                {cat.sub.map((sub: any) => (
                                                                    <Link
                                                                        key={sub.name}
                                                                        href={sub.href}
                                                                        className="text-[9px] uppercase font-medium text-gray-500 hover:text-primary transition-colors py-0.5 block"
                                                                        style={{fontFamily: "'Poppins', sans-serif"}}
                                                                    >
                                                                        {sub.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-[11px] uppercase transition-all relative group font-medium px-1 py-2",
                                            forceSolid
                                                ? "text-gray-950 hover:text-primary"
                                                : "text-white hover:text-primary"
                                        )}
                                        style={{fontFamily: "'Poppins', sans-serif"}}
                                    >
                                        {link.name}
                                        <span className={cn(
                                            "absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] transition-all duration-500 group-hover/nav:w-full opacity-0 group-hover/nav:opacity-100",
                                            isScrolled ? "bg-primary" : "bg-white"
                                        )} />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right: Actions - مخصص للهاتف والديسكتوب */}
                    <div className="flex items-center space-x-2 md:space-x-5 lg:space-x-7">
                        {/* Desktop Actions - مخفي على الهاتف */}
                        <div className={cn(
                            "hidden md:flex items-center space-x-4 md:space-x-6 transition-colors",
                            forceSolid ? "text-gray-950" : "text-white"
                        )}>
                            <button 
                                onClick={() => setIsSearchOpen(true)}
                                className="hover:text-primary transition-all duration-300 transform hover:scale-110 p-1" 
                                style={{color: forceSolid ? '#1A1A1A' : '#FFFFFF'}}
                            >
                                <Search size={18} strokeWidth={1.8} />
                            </button>
                            <Link href="/wishlist" className="relative group hover:text-primary transition-all duration-300 transform hover:scale-110 p-1" style={{color: forceSolid ? '#1A1A1A' : '#FFFFFF'}}>
                                <Heart size={18} strokeWidth={1.8} />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold" style={{backgroundColor: '#C9A14A'}}>
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>
                            <Link href="/cart" className="relative group hover:text-primary transition-all duration-300 transform hover:scale-110 p-1" style={{color: forceSolid ? '#1A1A1A' : '#FFFFFF'}}>
                                <ShoppingBag size={18} strokeWidth={1.8} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold" style={{backgroundColor: '#C9A14A'}}>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            {/* notifications hidden — no client accounts
                            <Link href="/account?tab=notifications" className="relative group hover:text-primary transition-all duration-300 transform hover:scale-110 p-1" style={{color: forceSolid ? '#1A1A1A' : '#FFFFFF'}}>
                                <Bell size={18} strokeWidth={1.8} />
                            </Link>
                            */}
                        </div>

                        {/* Mobile Search Button */}
                        <button 
                            onClick={() => setIsSearchOpen(true)}
                            className="md:hidden p-2 transition-all duration-300 transform active:scale-90"
                            style={{color: forceSolid ? '#1A1A1A' : '#FFFFFF'}}
                        >
                            <Search size={22} strokeWidth={2} />
                        </button>

                        {/* Mobile: Burger Menu + Profile Picture */}
                        <div className="flex items-center space-x-2 xl:hidden">
                            {/* account avatar hidden — no client accounts
                            <Link href="/account" className="relative">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs overflow-hidden border-2 border-primary/30" style={{backgroundColor: '#C9A14A'}}>
                                    {user?.photoURL ? (
                                        <img src={user.photo_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={16} />
                                    )}
                                </div>
                            </Link>
                            */}

                            {/* Burger Menu - 3 Lines */}
                            <button
                                className="p-2 flex flex-col space-y-1.5"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <span className={cn("w-6 h-0.5 transition-all duration-300", forceSolid ? "bg-gray-950" : "bg-white")} />
                                <span className={cn("w-6 h-0.5 transition-all duration-300", forceSolid ? "bg-gray-950" : "bg-white")} />
                                <span className={cn("w-6 h-0.5 transition-all duration-300", forceSolid ? "bg-gray-950" : "bg-white")} />
                            </button>
                        </div>

                        <div className="h-7 w-[1px] hidden lg:block" style={{backgroundColor: 'rgba(201, 161, 74, 0.2)'}} />

                        {/* Desktop User Menu */}
                        {user ? (
                            <div className="relative group/auth hidden md:block">
                                <button className={cn(
                                    "flex items-center space-x-3 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium group px-4 py-1.5 rounded-full transition-all border",
                                    forceSolid ? "text-primary-dark" : "text-white"
                                )}
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderColor: 'rgba(201, 161, 74, 0.2)',
                                    fontFamily: "'Poppins', sans-serif"
                                }}>
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] overflow-hidden" style={{backgroundColor: '#C9A14A'}}>
                                        {user.photo_url ? (
                                            <img src={user.photo_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{user.name?.slice(0, 2).toUpperCase() || 'U'}</span>
                                        )}
                                    </div>
                                    <span>{user.name}</span>
                                    <ChevronDown size={12} className="ml-1 group-hover/auth:rotate-180 transition-transform duration-300" />
                                </button>

                                {/* User Dropdown */}
                                <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover/auth:opacity-100 group-hover/auth:visible transition-all duration-300 transform translate-y-2 group-hover/auth:translate-y-0">
                                    <div className="w-48 bg-white/95 backdrop-blur-xl border border-primary/10 shadow-2xl p-2 flex flex-col rounded-sm overflow-hidden">
                                        <Link href="/account" className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all p-3 border-b border-gray-50 flex items-center space-x-2">
                                            <User size={14} className="text-primary/70" />
                                            <span>Mon Compte</span>
                                        </Link>
                                        <Link href="/account?tab=orders" className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all p-3 border-b border-gray-50 flex items-center space-x-2">
                                            <Package size={14} className="text-primary/70" />
                                            <span>Mes Commandes</span>
                                        </Link>
                                        {user.role === 'admin' && (
                                            <Link href="/admin" className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all p-3 border-b border-gray-50 flex items-center space-x-2">
                                                <Shield size={14} className="text-red-500/70" />
                                                <span>Admin Dashboard</span>
                                            </Link>
                                        )}
                                        {user.role === 'provider' && (
                                            <Link href="/admin" className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all p-3 border-b border-gray-50 flex items-center space-x-2">
                                                <Store size={14} className="text-amber-500/70" />
                                                <span>Gestion des Produits</span>
                                            </Link>
                                        )}
                                        <button
                                            onClick={() => logout()}
                                            className="text-[10px] uppercase tracking-[0.2em] font-medium text-red-500 hover:bg-red-50 transition-all p-3 flex items-center space-x-2 text-left w-full"
                                        >
                                            <X size={14} />
                                            <span>Déconnexion</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null /* login/register hidden — no client accounts */}
                    </div>
                </div>
            </nav>

            {/* Bottom Navigation Bar - للهاتف فقط */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-primary/10 shadow-lg z-50">
                <div className="flex items-center justify-around py-2">
                    {bottomNavLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || 
                            (link.href.includes('orders') && pathname?.includes('account') && pathname?.includes('orders'));
                        
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex flex-col items-center space-y-1 px-3 py-1"
                            >
                                <div className={cn(
                                    "p-1 rounded-full transition-all",
                                    isActive ? "text-primary" : "text-gray-400"
                                )}>
                                    <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                                </div>
                                <span className={cn(
                                    "text-[8px] uppercase font-medium tracking-wider",
                                    isActive ? "text-primary" : "text-gray-400"
                                )}>
                                    {link.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Menu Overlay - القائمة الكاملة */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm xl:hidden pointer-events-auto z-[9999]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 h-full w-[85%] max-w-md bg-white z-[10000] xl:hidden p-6 flex flex-col shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <Image src="/img/logo.png" alt="Vitasilk" width={100} height={30} className="object-contain" />
                                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-primary transition-colors">
                                    <X size={28} strokeWidth={1} />
                                </button>
                            </div>

                            {/* User Info - إذا كان مسجل الدخول */}
                            {user && (
                                <div className="mb-6 space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-xl flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm overflow-hidden border-2 border-primary" style={{backgroundColor: '#C9A14A'}}>
                                            {user.photo_url ? (
                                                <img src={user.photo_url} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <span>{user.name?.slice(0, 2).toUpperCase() || 'U'}</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    
                                    {(user.role === 'admin' || user.role === 'provider' || user.role === 'super-admin') && (
                                        <Link 
                                            href="/admin" 
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl text-xs uppercase font-black tracking-widest hover:bg-black transition-all shadow-md mt-2"
                                        >
                                            {user.role === 'provider' ? <Store size={16} className="text-amber-400" /> : <Shield size={16} className="text-red-400" />}
                                            <span>{user.role === 'provider' ? 'Gestion des Produits' : 'Admin Dashboard'}</span>
                                        </Link>
                                    )}
                                </div>
                            )}

                            {/* Quick Actions */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                                    <Heart size={20} className="text-primary mb-1" />
                                    <span className="text-[9px] uppercase font-medium">Wishlist</span>
                                    {wishlistCount > 0 && (
                                        <span className="text-[8px] text-primary">{wishlistCount}</span>
                                    )}
                                </Link>
                                <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                                    <ShoppingBag size={20} className="text-primary mb-1" />
                                    <span className="text-[9px] uppercase font-medium">Panier</span>
                                    {cartCount > 0 && (
                                        <span className="text-[8px] text-primary">{cartCount}</span>
                                    )}
                                </Link>
                                {/* track-order hidden from mobile nav
                                <Link href="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                                    <Package size={20} className="text-primary mb-1" />
                                    <span className="text-[9px] uppercase font-medium">Suivi</span>
                                </Link>
                                */}
                            </div>

                            {/* Navigation Links */}
                            <div className="flex flex-col space-y-4 mb-auto overflow-y-auto">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={link.name}
                                    >
                                        {link.categories ? (
                                            <div className="space-y-2">
                                                <div className="text-gray-800 font-medium uppercase text-sm flex items-center justify-between">
                                                    <span>{link.name}</span>
                                                    <ChevronDown size={14} className="text-primary" />
                                                </div>
                                                <div className="pl-4 space-y-2 border-l-2 border-primary/20">
                                                    {link.categories.map((cat: any) => (
                                                        <div key={cat.name}>
                                                            <Link
                                                                href={cat.href}
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                className="block text-gray-700 hover:text-primary transition-colors text-xs uppercase py-1 font-semibold"
                                                            >
                                                                {cat.name}
                                                            </Link>
                                                            {cat.sub && (
                                                                <div className="pl-3 space-y-1 border-l border-primary/20 mt-1">
                                                                    {cat.sub.map((sub: any) => (
                                                                        <Link
                                                                            key={sub.name}
                                                                            href={sub.href}
                                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                                            className="block text-gray-500 hover:text-primary transition-colors text-[10px] uppercase py-0.5"
                                                                        >
                                                                            {sub.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block text-gray-800 hover:text-primary transition-all font-medium uppercase text-sm py-2"
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* auth buttons hidden — no client accounts
                            {!user && (
                                <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col space-y-3">
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center text-gray-800 font-medium tracking-wider uppercase border border-gray-800 hover:bg-gray-50 transition-colors text-xs rounded-lg flex items-center justify-center space-x-2">
                                        <LogIn size={14} />
                                        <span>Connexion</span>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 text-center bg-primary text-white font-medium tracking-wider uppercase hover:bg-black transition-all text-xs rounded-lg shadow-md">
                                        S'inscrire
                                    </Link>
                                </div>
                            )}
                            */}

                            {/* Social Links */}
                            <div className="pt-6 mt-6 border-t border-gray-100 flex justify-center space-x-6">
                                <a href="https://www.instagram.com/vitasilk.bs/" target="_blank" rel="noopener noreferrer">
                                    <Instagram size={18} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
                                </a>
                                {/* Facebook hidden
                                <Facebook size={18} className="text-gray-400 hover:text-primary cursor-pointer transition-colors" />
                                */}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            
            <SearchOverlay 
                isOpen={isSearchOpen} 
                onClose={() => setIsSearchOpen(false)} 
            />

            {/* Padding bottom للمحتوى الرئيسي لتعويض النافبار السفلية على الهاتف */}
            <style jsx global>{`
                @media (max-width: 768px) {
                    body {
                        padding-bottom: 70px;
                    }
                }
            `}</style>
        </header>
    );
};

export default Navbar;