"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
 Mail,
 Phone,
 MapPin,
 Send,
 Loader2,
 CheckCircle2,
 Clock,
 MessageCircle,
 Instagram,
 ArrowUpRight,
 ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { messagesApi } from '@/lib/api';

const SUBJECTS = [
 'Conseil produit',
 'Suivi de commande',
 'Partenariat professionnel',
 'Réclamation ou retour',
 'Autre demande',
];

const ContactPage = () => {
 const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
 const [isLoading, setIsLoading] = useState(false);
 const [success, setSuccess] = useState(false);
 const [subjectOpen, setSubjectOpen] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setIsLoading(true);
 try {
 await messagesApi.send({ name: form.name, email: form.email, subject: form.subject, message: form.message });
 setSuccess(true);
 } catch (error) {
 console.error("Error sending message:", error);
 alert("Une erreur est survenue. Veuillez réessayer.");
 } finally {
 setIsLoading(false);
 }
 };

 const contactCards = [
 {
 icon: Phone,
 label: 'Téléphone',
 value: '+212 662 633 170',
 sub: 'Lun – Sam · 9h à 18h',
 href: 'tel:+212662633170',
 color: 'from-amber-50 to-white',
 iconBg: 'bg-amber-100 text-amber-600',
 },
 {
 icon: Mail,
 label: 'Email',
 value: 'sales@vitasilk.ma',
 sub: 'Réponse sous 24h',
 href: 'mailto:sales@vitasilk.ma',
 color: 'from-rose-50 to-white',
 iconBg: 'bg-rose-100 text-rose-500',
 },
 {
 icon: MessageCircle,
 label: 'WhatsApp',
 value: 'Écrire sur WhatsApp',
 sub: 'Réponse rapide',
 href: 'https://wa.me/212662633170',
 color: 'from-green-50 to-white',
 iconBg: 'bg-green-100 text-green-600',
 },
 {
 icon: MapPin,
 label: 'Notre Adresse',
 value: 'Meknès, Maroc',
 sub: 'Livraison partout au Maroc',
 href: '#',
 color: 'from-blue-50 to-white',
 iconBg: 'bg-blue-100 text-blue-500',
 },
 ];

 return (
 <div className="min-h-screen bg-[#FDFBF7]">

 {/* ─── HERO HEADER ─── */}
 <div className="relative bg-[#0D0D0D] overflow-hidden pt-32 pb-24 px-6 lg:px-12 min-h-[500px] flex items-center">
 {/* Background Image */}
 <div className="absolute inset-0 z-0">
 <Image
 src="/img/contact.jpg"
 alt="Contact Vitasilk"
 fill
 className="object-cover opacity-60"
 priority
 />
 <div className="absolute inset-0 bg-black/40" />
 <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#FDFBF7]" />
 </div>

 {/* Decorative gold lines */}
 <div className="absolute inset-0 pointer-events-none select-none z-10">
 <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
 <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
 </div>

 <div className="max-w-7xl mx-auto relative z-20 w-full text-left">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.9 }}
 className="max-w-2xl text-left"
 >
                                <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-primary font-bold mb-6">
                                    Vitasilk · Service Client
                                </p>
                                <h1 className="text-5xl md:text-8xl font-sans font-light !text-white tracking-tight leading-none mb-8">
                                    Contactez-<br />
                                    <span className="text-primary font-medium">nous</span>
                                </h1>
                                <p className="text-sm text-white/90 font-light leading-relaxed max-w-md drop-shadow-md">
                                    Une question sur un produit ou votre commande ? Écrivez-nous, on vous répond rapidement.
                                </p>
 </motion.div>
 </div>
 </div>

 {/* ─── CONTACT CARDS ─── */}
 <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-10 relative z-20">
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {contactCards.map((card, i) => {
 const Icon = card.icon;
 return (
 <motion.a
 key={card.label}
 href={card.href}
 target={card.href.startsWith('http') ? '_blank' : undefined}
 rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: i * 0.08 }}
 className={`group bg-gradient-to-b ${card.color} border border-gray-100 p-6 rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden`}
 >
 <div className={`w-11 h-11 rounded-full ${card.iconBg} flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300`}>
 <Icon size={20} />
 </div>
 <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mb-1">{card.label}</p>
 <p className="text-[13px] font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">{card.value}</p>
 <p className="text-[10px] text-gray-400 flex items-center gap-1">
 <Clock size={9} className="opacity-60" />
 {card.sub}
 </p>
 <ArrowUpRight
 size={14}
 className="absolute top-4 right-4 text-gray-200 group-hover:text-primary group-hover:scale-110 transition-all duration-300"
 />
 </motion.a>
 );
 })}
 </div>
 </div>

 {/* ─── MAIN SECTION ─── */}
 <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

 {/* LEFT – Info & Social */}
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.8, delay: 0.3 }}
 className="lg:col-span-4 space-y-12"
 >
 {/* Hours */}
 <div className="bg-white border border-gray-100 rounded-sm p-8 shadow-sm">
 <h3 className="text-[10px] uppercase tracking-widest font-bold text-[#C9A14A] mb-6 pb-4 border-b border-gray-50 flex items-center gap-2">
 <Clock size={14} className="text-primary" />
 Horaires du Service
 </h3>
 <div className="space-y-3 text-sm text-gray-600">
 {[
 { day: 'Lundi – Vendredi', hours: '9h00 – 19h00' },
 { day: 'Samedi', hours: '10h00 – 17h00' },
 { day: 'Dimanche', hours: 'Fermé' },
 ].map(row => (
 <div key={row.day} className="flex justify-between items-center text-[12px]">
 <span className="text-gray-500 font-light">{row.day}</span>
 <span className={`font-semibold ${row.hours === 'Fermé' ? 'text-gray-300' : 'text-gray-900'}`}>{row.hours}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Address Visual */}
 <div className="bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm">
 <div className="h-36 bg-gradient-to-br from-gray-100 to-gray-200 relative flex items-center justify-center">
 <div className="text-center">
 <MapPin size={32} className="text-primary mx-auto mb-2" />
 <p className="text-[10px] uppercase tracking-widest font-bold text-gray-600">Meknès</p>
 <p className="text-[9px] text-gray-400">Maroc</p>
 </div>
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,165,114,0.08),transparent_70%)]" />
 </div>
 <div className="p-6">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-primary mb-1">Notre Adresse</p>
 <p className="text-xs text-gray-500 font-light leading-relaxed">
 Meknès, Maroc<br />
 Livraison partout au Maroc
 </p>
 </div>
 </div>

 {/* Social */}
 <div>
                            <p className="text-[9px] uppercase tracking-widest font-bold text-primary mb-4">Suivez‑nous</p>
 <div className="flex gap-3">
 <a
 href="https://instagram.com/vitasilk.bs"
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-sm text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:border-primary hover:text-primary transition-all shadow-sm group"
 >
 <Instagram size={14} className="group-hover:scale-110 transition-transform" />
 Instagram
 </a>
 <a
 href="https://wa.me/212662633170"
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-sm text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:border-green-400 hover:text-green-600 transition-all shadow-sm group"
 >
 <MessageCircle size={14} className="group-hover:scale-110 transition-transform" />
 WhatsApp
 </a>
 </div>
 </div>
 </motion.div>

 {/* RIGHT – Form */}
 <motion.div
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: 0.8, delay: 0.4 }}
 className="lg:col-span-8"
 >
 <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-10 md:p-14 relative overflow-hidden">
 {/* faint watermark */}
 <div className="absolute -bottom-6 -right-4 opacity-[0.025] luxury-text text-[120px] leading-none pointer-events-none select-none">V</div>

 <AnimatePresence mode="wait">
 {success ? (
 <motion.div
 key="success"
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0 }}
 className="text-center py-16"
 >
 <motion.div
 initial={{ scale: 0 }}
 animate={{ scale: 1 }}
 transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
 className="w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-8"
 >
 <CheckCircle2 size={36} className="text-green-500" />
 </motion.div>
 <h3 className="text-3xl font-sans font-light text-[#C9A14A] mb-4">Message envoyé !</h3>
 <p className="text-sm text-gray-500 font-light mb-10 max-w-sm mx-auto leading-relaxed">
 On a bien reçu votre message et on vous répondra dans les 24h.
 </p>
 <button
 onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
 className="text-[10px] uppercase tracking-widest font-bold text-primary hover:text-black transition-colors border-b border-primary/30 pb-1"
 >
 Envoyer un Autre Message
 </button>
 </motion.div>
 ) : (
 <motion.form
 key="form"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onSubmit={handleSubmit}
 className="space-y-7 relative z-10"
 >
 <div>
                            <h2 className="text-2xl md:text-3xl font-sans font-light text-gray-900 mb-1">
                                Envoyez-nous un <span className="text-primary">message</span>
                            </h2>
 <p className="text-xs text-gray-400 font-light">
 Tous les champs marqués <span className="text-primary">*</span> sont requis.
 </p>
 </div>

 {/* Name + Email */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <Field label="Nom Complet *">
 <input
 required
 type="text"
 value={form.name}
 onChange={e => setForm({ ...form, name: e.target.value })}
 placeholder="Votre prénom et nom"
 className={fieldClass}
 />
 </Field>
 <Field label="Adresse Email *">
 <input
 required
 type="email"
 value={form.email}
 onChange={e => setForm({ ...form, email: e.target.value })}
 placeholder="vous@email.com"
 className={fieldClass}
 />
 </Field>
 </div>

 {/* Phone + Subject */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <Field label="Téléphone (optionnel)">
 <input
 type="tel"
 value={form.phone}
 onChange={e => setForm({ ...form, phone: e.target.value })}
 placeholder="+212 6XX XXX XXX"
 className={fieldClass}
 />
 </Field>

 {/* Custom Subject Dropdown */}
 <Field label="Sujet *">
 <div className="relative">
 <button
 type="button"
 onClick={() => setSubjectOpen(!subjectOpen)}
 className={`${fieldClass} w-full text-left flex items-center justify-between ${!form.subject ? 'text-gray-400' : 'text-gray-900'}`}
 >
 <span className="truncate">{form.subject || 'Sélectionnez un sujet'}</span>
 <ChevronDown size={14} className={`ml-2 flex-shrink-0 text-gray-400 transition-transform ${subjectOpen ? 'rotate-180' : ''}`} />
 </button>
 <AnimatePresence>
 {subjectOpen && (
 <motion.div
 initial={{ opacity: 0, y: -8 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -8 }}
 transition={{ duration: 0.2 }}
 className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 shadow-xl rounded-sm z-50 overflow-hidden"
 >
 {SUBJECTS.map(s => (
 <button
 key={s}
 type="button"
 onClick={() => { setForm({ ...form, subject: s }); setSubjectOpen(false); }}
 className="w-full text-left px-5 py-3.5 text-xs text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors border-b border-gray-50 last:border-0"
 >
 {s}
 </button>
 ))}
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </Field>
 </div>

 {/* Message */}
 <Field label="Votre Message *">
 <textarea
 required
 rows={6}
 value={form.message}
 onChange={e => setForm({ ...form, message: e.target.value })}
 placeholder="Décrivez votre demande. On vous répond dans les plus brefs délais."
 className={`${fieldClass} resize-none`}
 />
 </Field>

 {/* Submit */}
 <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-gray-50">
 <p className="text-[9px] text-gray-400 flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
 Service disponible · Lun–Sam, 9h–19h
 </p>
 <button
 type="submit"
 disabled={isLoading || !form.subject}
 className="w-full sm:w-auto px-14 py-5 bg-primary hover:bg-black text-white text-[10px] uppercase font-bold tracking-widest transition-all duration-700 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {isLoading ? (
 <><Loader2 size={16} className="animate-spin" /> Envoi...</>
 ) : (
 <><Send size={14} /> Envoyer</>
 )}
 </button>
 </div>
 </motion.form>
 )}
 </AnimatePresence>
 </div>
 </motion.div>
 </div>
 </div>

 {/* ─── BOTTOM STRIP ─── */}
 <div className="bg-[#0D0D0D] py-12 px-6 lg:px-12 mt-8">
 <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
 <p className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">
 © 2026 Vitasilk · Tous droits réservés
 </p>
 <div className="flex items-center gap-8">
 <Link href="/boutique" className="text-[9px] uppercase tracking-wider text-gray-500 hover:text-primary transition-colors">
 Boutique
 </Link>
 <Link href="/about" className="text-[9px] uppercase tracking-wider text-gray-500 hover:text-primary transition-colors">
 À propos
 </Link>
 <Link href="/track-order" className="text-[9px] uppercase tracking-wider text-gray-500 hover:text-primary transition-colors">
 Suivre ma Commande
 </Link>
 </div>
 </div>
 </div>

 </div>
 );
};

/* ─── Helpers ─── */
const fieldClass =
 "w-full py-3.5 px-5 border border-gray-100 bg-[#FDFBF7]/60 text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 hover:border-gray-200 transition-all rounded-sm";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
 return (
 <div className="space-y-2">
 <label className="text-[9px] uppercase tracking-widest font-bold text-gray-500">{label}</label>
 {children}
 </div>
 );
}

export default ContactPage;
