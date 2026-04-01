"use client";

import React from 'react';
import { Home, LayoutDashboard, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
            {/* Minimal Header */}
            <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-6">
                    <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-all">
                        <LayoutDashboard size={20} />
                        <span className="text-xs font-bold uppercase tracking-widest">Tableau de Bord</span>
                    </Link>
                    <ChevronRight size={16} className="text-gray-200" />
                    <div>
                        <h1 className="text-sm font-bold text-gray-900 uppercase tracking-widest">{title}</h1>
                        {subtitle && <p className="text-[10px] text-gray-400 font-medium">{subtitle}</p>}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <Home size={20} />
                    </Link>
                    <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
