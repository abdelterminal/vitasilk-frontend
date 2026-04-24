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
  ChevronDown,
} from 'lucide-react';
import Image from 'next/image';
import { messagesApi } from '@/lib/api';

const SUBJECTS = [
  'Conseil produit',
  'Suivi de commande',
  'Partenariat professionnel',
  'Réclamation ou retour',
  'Autre demande',
];

const CONTACT_ITEMS = [
  { icon: Phone,         label: 'Téléphone',      value: '+212 662 633 170',    href: 'tel:+212662633170' },
  { icon: Mail,          label: 'Email',           value: 'sales@vitasilk.ma',   href: 'mailto:sales@vitasilk.ma' },
  { icon: MessageCircle, label: 'WhatsApp',        value: 'Écrire sur WhatsApp', href: 'https://wa.me/212662633170' },
  { icon: MapPin,        label: 'Adresse',         value: 'Meknès, Maroc',       href: '#' },
];

const HOURS = [
  { day: 'Lundi – Vendredi', hours: '9h00 – 19h00' },
  { day: 'Samedi',           hours: '10h00 – 17h00' },
  { day: 'Dimanche',         hours: 'Fermé' },
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
      console.error('Error sending message:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">

      {/* ─── LEFT PANEL ─── */}
      <div className="relative lg:sticky lg:top-0 lg:h-screen lg:w-[42%] flex-shrink-0 overflow-hidden">
        {/* Background image */}
        <Image
          src="/img/contact.jpg"
          alt="Contact Vitasilk"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0D0D0D]/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70" />

        {/* Gold lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[32%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A14A]/20 to-transparent" />
          <div className="absolute bottom-[22%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A14A]/12 to-transparent" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 flex flex-col justify-between h-full px-10 pt-28 pb-32 lg:pt-36 lg:pb-40"
        >
          {/* Top – heading */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.45em] text-primary font-bold mb-7">
              Vitasilk · Service Client
            </p>
            <h1 className="text-5xl lg:text-[3.5rem] xl:text-[4rem] font-sans font-light tracking-tight leading-[1.05] mb-5">
              <span className="text-white drop-shadow-lg">Contactez</span><br />
              <span className="text-primary font-medium drop-shadow-lg">nous</span>
            </h1>
            <p className="text-[13px] text-white/60 font-light leading-relaxed max-w-[260px]">
              Une question sur un produit ou votre commande&nbsp;? On vous répond rapidement.
            </p>
          </div>

          {/* Middle – contact items */}
          <div className="space-y-4 mt-8 mb-14">
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 group"
              >
                <div className="w-9 h-9 rounded-full border border-white/15 bg-white/8 flex items-center justify-center flex-shrink-0 group-hover:border-primary/70 group-hover:bg-primary/15 transition-all duration-300">
                  <Icon size={15} className="text-white/50 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.18em] text-white/35 font-bold mb-0.5">{label}</p>
                  <p className="text-[13px] text-white/90 group-hover:text-white transition-colors font-light">{value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Bottom – hours + social */}
          <div className="space-y-7">
            <div className="border-t border-white/10 pt-7">
              <p className="text-[8px] uppercase tracking-[0.18em] text-primary font-bold mb-4 flex items-center gap-2">
                <Clock size={10} /> Horaires
              </p>
              <div className="space-y-2.5">
                {HOURS.map(row => (
                  <div key={row.day} className="flex justify-between text-[11px]">
                    <span className="text-white/40 font-light">{row.day}</span>
                    <span className={row.hours === 'Fermé' ? 'text-white/20' : 'text-white/75 font-medium'}>{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://instagram.com/vitasilk.bs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 border border-white/15 text-[9px] uppercase tracking-[0.15em] font-bold text-white/55 hover:border-primary/70 hover:text-primary transition-all"
              >
                <Instagram size={12} /> Instagram
              </a>
              <a
                href="https://wa.me/212662633170"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 border border-white/15 text-[9px] uppercase tracking-[0.15em] font-bold text-white/55 hover:border-green-400/70 hover:text-green-400 transition-all"
              >
                <MessageCircle size={12} /> WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── RIGHT PANEL – Form ─── */}
      <div className="flex-1 bg-[#FDFBF7] flex items-center justify-center px-8 md:px-16 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="w-full max-w-xl"
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
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
                className="space-y-8"
              >
                <div className="mb-10">
                  <h2 className="text-3xl md:text-4xl font-sans font-light text-gray-900 mb-2">
                    Envoyez‑nous un <span className="text-primary">message</span>
                  </h2>
                  <p className="text-xs text-gray-400 font-light">
                    Tous les champs marqués <span className="text-primary">*</span> sont requis.
                  </p>
                </div>

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
                            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 shadow-xl z-50 overflow-hidden"
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

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100">
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
        </motion.div>
      </div>

    </div>
  );
};

const fieldClass =
  'w-full py-3.5 px-5 border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/5 hover:border-gray-300 transition-all';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] uppercase tracking-widest font-bold text-gray-500">{label}</label>
      {children}
    </div>
  );
}

export default ContactPage;
