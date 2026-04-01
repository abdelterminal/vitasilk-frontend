export type Category = 'lissage pro' | 'materiel' | 'nos packs' | 'soins de cheveux' | string;

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    images: string[];
    stock: number;
    featured?: boolean;
    createdAt: number;
}

export interface User {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    role: 'admin' | 'customer';
    wishlist?: string[]; // array of product IDs
    address?: string | { street: string; city: string; region: string; zip: string };
    phone?: string;
}

export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    rating: number; // 1-5
    comment: string;
    createdAt: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    createdAt: number;
    address: string;
    phone: string;
}
