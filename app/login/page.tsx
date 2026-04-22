"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await login(email.trim(), password);
            router.push('/');
        } catch (err: any) {
            if (err.status === 401) {
                setError("Email ou mot de passe incorrect.");
            } else if (err.message && err.message.length < 150) {
                setError(err.message);
            } else {
                setError("Une erreur est survenue lors de la connexion. Veuillez vérifier vos identifiants.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#FDFBF7] relative overflow-hidden">
            {/* Left Side: Image with Wavy Transition */}
            <div className="hidden lg:block lg:w-[45%] relative">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/img/login.jpg"
                        alt="Vitasilk Luxury"
                        fill
                        className="object-cover brightness-[0.9]"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Wavy Divider SVG */}
                <div className="absolute top-0 -right-1 h-full w-24 z-10 fill-[#FDFBF7]">
                    <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0 0 C 50 25, 50 75, 0 100 V 100 H 100 V 0 Z" />
                    </svg>
                </div>

                {/* French Flourish in Image Area */}
                <div className="absolute bottom-12 left-12 z-20 text-white animate-fade-in">
                    <h1 className="text-4xl font-sans tracking-tight mb-2 leading-tight !text-white">Cheveux lisses. <br /> Cheveux brillants.</h1>
                    <p className="text-[10px] tracking-[0.3em] uppercase opacity-70 font-medium">Vitasilk — Soins Capillaires</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-[55%] flex items-center justify-center p-8 md:p-16 lg:p-24 relative z-0">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none select-none">
                    <div className="luxury-text text-[15rem] leading-none">V</div>
                </div>
                <div className="absolute bottom-0 left-0 p-12 opacity-[0.03] pointer-events-none select-none">
                    <div className="luxury-text text-[10rem] leading-none text-primary">Silk</div>
                </div>

                <div className="absolute top-8 left-8 lg:top-12 lg:left-12">
                    <Link href="/" className="group flex items-center space-x-3 text-gray-400 hover:text-primary transition-all duration-500">
                        <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm group-hover:shadow-golden-shadow group-hover:-translate-x-1 transition-all">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Vitasilk Accueil</span>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-md w-full"
                >
                    <div className="mb-12 text-center relative">
                        <div className="flex justify-center mb-8">
                            <Link href="/">
                                <div className="relative h-12 w-44 transition-transform hover:scale-105 duration-500">
                                    <Image src="/img/logo.png" alt="Vitasilk" fill className="object-contain" />
                                </div>
                            </Link>
                        </div>

                        <div className="relative inline-block mb-2">
                            <h2 className="text-4xl font-sans font-extralight text-gray-900 tracking-tight">Bienvenue</h2>
                        </div>
                        <p className="text-gray-400 text-[9px] tracking-[0.3em] uppercase font-semibold">Vitasilk — Soins Capillaires</p>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-50/50 backdrop-blur-sm border border-red-100 p-4 mb-8 rounded-sm flex items-center space-x-3 text-red-600 text-xs font-medium"
                            >
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-[0.2em] font-semibold text-gray-400 ml-1">Email Personnel</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={14} />
                                <input
                                    required
                                    type="email"
                                    placeholder="nom@exemple.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-14 pr-5 py-5 bg-white border border-gray-100 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all text-sm rounded-sm shadow-sm hover:border-gray-200 cursor-text"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[9px] uppercase tracking-[0.2em] font-semibold text-gray-400">Mot de Passe</label>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={14} />
                                <input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-14 pr-5 py-5 bg-white border border-gray-100 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all text-sm rounded-sm shadow-sm hover:border-gray-200 cursor-text"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                disabled={isLoading}
                                type="submit"
                                className="w-full py-5 bg-primary hover:bg-black text-white text-[10px] uppercase tracking-[0.3em] font-medium transition-all duration-700 shadow-xl hover:shadow-primary/20 flex items-center justify-center group rounded-sm relative overflow-hidden cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        <span>Se connecter</span>
                                        <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col items-center space-y-4">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Nouveau chez Vitasilk ?</span>
                        <Link
                            href="/register"
                            className="luxury-text text-2xl text-primary hover:text-black transition-all hover:scale-105 duration-300"
                        >
                            Créer un Compte
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;
