"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { subscribersApi } from '@/lib/api';

export default function NewsletterBanner() {
 const [email, setEmail] = React.useState('');
 const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

 const handleSubscribe = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!email) return;
 setStatus('loading');
 try {
 await subscribersApi.subscribe(email.toLowerCase());
 setStatus('success');
 setEmail('');
 setTimeout(() => setStatus('idle'), 5000);
 } catch (err: any) {
 if (err.status === 409 || err.message?.includes('already')) {
   alert("Vous êtes déjà inscrit !");
   setStatus('idle');
 } else {
   console.error(err);
   setStatus('error');
   alert("Une erreur est survenue.");
 }
 }
 };

 return (
 <section className="py-24 bg-[#FAF9F5] border-t border-gray-100">
 <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

 <div className="bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-2xl relative">
 {/* Background decorations */}
 <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
 <Image
 src="/img/soins de cheveux/VitaSilk-24k-rose-gold-hair-serum-Shooting.png"
 alt="Sérum 24K"
 fill
 className="object-cover object-center opacity-40 mix-blend-luminosity"
 />
 <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-transparent to-transparent" />
 </div>

 <div className="relative z-10 p-12 lg:p-24 lg:w-[60%] flex flex-col items-start text-left">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6 }}
 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase font-bold text-primary mb-6 border border-white/10"
 >
 <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
 Club Vitasilk
 </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-[10px] uppercase font-bold text-primary mb-4"
                    >
                        Vitasilk Privé
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-7xl font-sans font-light !text-white leading-[1.1] mb-8"
                    >
                        Le <span className="text-primary">secret</span> d'un cheveu parfait commence <span className="text-primary">ici.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="!text-white/90 text-sm md:text-base font-light max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Rejoignez notre newsletter pour recevoir des conseils <span className="text-primary font-medium">d'experts</span>, nos nouveautés en avant-première et des offres exclusives réservées à nos membres.
                    </motion.p>

 <motion.form
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.3 }}
 className="w-full max-w-md flex flex-col sm:flex-row gap-4"
 onSubmit={handleSubscribe}
 >
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder={status === 'success' ? "Merci pour votre inscription !" : "Votre adresse email"}
 className={`flex-1 bg-white/5 border rounded-sm px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-primary focus:bg-white/10 transition-colors text-sm font-light ${status === 'success' ? 'border-green-500 bg-green-500/10' : 'border-white/10'}`}
 required
 disabled={status === 'loading' || status === 'success'}
 />
 <button
 type="submit"
 disabled={status === 'loading' || status === 'success'}
 className="bg-primary hover:bg-white hover:text-black text-white px-8 py-4 sm:py-0 text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 group whitespace-nowrap disabled:opacity-50"
 >
 {status === 'loading' ? (
 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
 ) : status === 'success' ? (
 <ArrowRight size={14} className="text-green-500" />
 ) : (
 <>
 <span>S'inscrire</span>
 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
 </>
 )}
 </button>
 </motion.form>
 </div>
 </div>
 </div>
 </section>
 );
}
