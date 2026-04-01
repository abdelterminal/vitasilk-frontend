"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
    wishlist: any[]; // Product references
    addToWishlist: (product: any) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
    wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load from local storage on mount
        const savedWishlist = localStorage.getItem('vitasilk_wishlist');
        if (savedWishlist) {
            try {
                setWishlist(JSON.parse(savedWishlist));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        // Save to local storage when wishlist changes
        if (isLoaded) {
            localStorage.setItem('vitasilk_wishlist', JSON.stringify(wishlist));
        }
    }, [wishlist, isLoaded]);

    const addToWishlist = (product: any) => {
        setWishlist((prev) => {
            if (prev.find(item => item.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId: string) => {
        setWishlist(prev => prev.filter(item => item.id !== productId));
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some(item => item.id === productId);
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            clearWishlist,
            wishlistCount: wishlist.length
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
