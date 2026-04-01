"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const RegisterPage = () => {
    const router = useRouter();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const name = `${formData.firstName} ${formData.lastName}`.trim();
            await register(name, formData.email, formData.password);
            setSuccess(true);
            setTimeout(() => router.push('/'), 2000);
        } catch (err: any) {
            if (err.errors?.length) {
                setError(err.errors.map((e: any) => e.message).join(' • '));
            } else {
                setError(err.message || "Une erreur est survenue lors de l'inscription");
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
                        src="/img/join.jpg"
                        alt="Vitasilk Privilege"
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
                    <div className="luxury-text text-5xl mb-2 opacity-90">Privilège Vitasilk</div>
                    <h1 className="text-4xl font-sans tracking-tight mb-2 leading-tight">Pur Luxe. <br /> Soie Pure.</h1>
                    <p className="text-[10px] tracking-[0.3em] uppercase opacity-70 font-medium">Maison Vitasilk</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-[55%] flex items-center justify-center p-8 md:p-12 lg:p-16 relative z-0">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none select-none">
                    <div className="luxury-text text-[15rem] leading-none">V</div>
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
                    className="max-w-xl w-full"
                >
                    <div className="mb-8 text-center relative">
                        <div className="flex justify-center mb-6">
                            <Link href="/">
                                <div className="relative h-10 w-40 transition-transform hover:scale-105 duration-500">
                                    <Image src="/img/logo.png" alt="Vitasilk" fill className="object-contain" />
                                </div>
                            </Link>
                        </div>

                        <div className="relative inline-block mb-1">
                            <h2 className="text-4xl font-sans font-extralight text-gray-900 tracking-tight">Inscription</h2>
                        </div>
                        <p className="text-gray-400 text-[9px] tracking-[0.3em] uppercase font-semibold">Rejoindre l'Excellence Vitasilk</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-red-50/50 backdrop-blur-sm border border-red-100 p-4 mb-6 rounded-sm flex items-center space-x-3 text-red-600 text-xs font-medium"
                            >
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        {success && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-green-50 backdrop-blur-sm border border-green-100 p-4 mb-6 rounded-sm flex items-center space-x-3 text-green-600 text-xs font-medium"
                            >
                                <CheckCircle2 size={16} />
                                <span>Bienvenue dans l'univers Vitasilk !</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[9px] uppercase tracking-[0.2em] font-semibold text-gray-400 ml-1">Nom</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Jean"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full py-4 bg-white border border-gray-100 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all text-sm px-5 rounded-sm shadow-sm hover:border-gray-200 cursor-text"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[9px] uppercase tracking-[0.2em] font-semibold text-gray-400 ml-1">Prénom</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Dupont"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full py-4 bg-white border border-gray-100 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all text-sm px-5 rounded-sm shadow-sm hover:border-gray-200 cursor-text"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[0.2em] font-semibold text-gray-400 ml-1">Email Personnel</label>
                            <input
                                required
                                type="email"
                                placeholder="nom@exemple.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full py-4 bg-white border border-gray-100 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all text-sm px-5 rounded-sm shadow-sm hover:border-gray-200 cursor-text"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[0.2em] font-semibold text-gray-400 ml-1">Mot de Passe</label>
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full py-4 bg-white border border-gray-100 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 focus:outline-none transition-all text-sm px-5 rounded-sm shadow-sm hover:border-gray-200 cursor-text"
                            />
                            <p className="text-[8px] text-gray-400 ml-1">Minimum 6 caractères</p>
                        </div>

                        <div className="py-2">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <input required type="checkbox" className="w-4 h-4 accent-primary border-gray-200 rounded-sm" />
                                <span className="text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed font-medium">J'accepte l'art du luxe & les CGU</span>
                            </label>
                        </div>

                        <div className="pt-2">
                            <button
                                disabled={isLoading || success}
                                type="submit"
                                className="w-full py-5 bg-primary hover:bg-black text-white text-[10px] uppercase tracking-[0.3em] font-medium transition-all duration-700 shadow-xl hover:shadow-primary/20 flex items-center justify-center group rounded-sm relative overflow-hidden cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        <span>Créer mon univers</span>
                                        <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-50 flex flex-col items-center space-y-2">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Déjà membre ?</span>
                        <Link
                            href="/login"
                            className="luxury-text text-xl text-primary hover:text-black transition-all hover:scale-105 duration-300"
                        >
                            Se Connecter
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RegisterPage;
