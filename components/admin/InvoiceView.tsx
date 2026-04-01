"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Phone, User, Calendar, FileText, ShoppingBag, Globe, Shield, MapPin } from 'lucide-react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface InvoiceData {
    orderId: string;
    date: any;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerAddress: string;
    items: any[];
    subtotal: number;
    shipping: number;
    total: number;
}

export default function InvoiceView({ data, onClose }: { data: InvoiceData, onClose: () => void }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Prevent scrolling on body when overlay is open
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const XIcon = ({ size, className }: { size: number, className?: string }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
    );

    if (!mounted) return null;

    const invoiceContent = (
        <div id="invoice-overlay-root" className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-start justify-center p-0 md:p-8 overflow-y-auto print:bg-white print:static print:overflow-visible font-sans">
            <style jsx global>{`
                @media print {
                    @page { 
                        size: A4; 
                        margin: 0;
                    }
                    
                    html, body {
                        height: auto !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                        overflow: visible !important;
                        font-family: 'Inter', sans-serif !important;
                    }

                    body > *:not(#invoice-overlay-root) {
                        display: none !important;
                    }

                    #invoice-overlay-root {
                        display: block !important;
                        position: static !important;
                        width: 210mm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                    }

                    #printable-invoice {
                        width: 210mm !important;
                        margin: 0 !important;
                        padding: 10mm 15mm !important;
                        box-shadow: none !important;
                        border: none !important;
                        background: white !important;
                        display: flex !important;
                        flex-direction: column !important;
                        page-break-after: avoid !important;
                        page-break-before: avoid !important;
                    }

                    .print-compact {
                        padding: 0 !important;
                        margin-bottom: 2rem !important;
                    }

                    .print-text-small {
                        font-size: 0.75rem !important;
                    }
                    
                    .no-print {
                        display: none !important;
                    }
                    
                    /* Hide huge decorative text in print to save space and avoid page breaks */
                    .print-hide-deco {
                        display: none !important;
                    }

                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                }
            `}</style>

            <div
                id="printable-invoice"
                className="bg-white w-full max-w-[210mm] relative my-0 md:my-8 shadow-[0_0_100px_rgba(0,0,0,0.5)] print:shadow-none print:my-0 flex flex-col font-sans"
            >
                {/* Close Button - UI Only */}
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 md:top-8 md:-right-16 w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xl no-print z-10"
                >
                    <XIcon size={24} />
                </button>

                {/* Header Section */}
                <div className="p-12 md:p-20 flex flex-col gap-12 border-b border-gray-100 print:p-0 print:border-none print:mb-8">
                    {/* Centered Logo */}
                    <div className="flex justify-center mb-0 md:mb-4">
                        <img 
                            src="/img/logo.svg" 
                            alt="Vitasilk" 
                            className="h-20 md:h-28 w-auto object-contain"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                        <div className="space-y-4">
                            <div className="space-y-1 text-[10px] uppercase tracking-widest text-gray-400 font-bold leading-loose">
                                <p>Vitasilk</p>
                                <p>Meknès, Maroc</p>
                                <p>T: +212 662 633 170</p>
                                <p>sales@vitasilk.ma</p>
                            </div>
                        </div>

                        <div className="text-right flex flex-col items-end print:text-right">
                            <div className="px-6 py-2 border border-gray-100 rounded-full text-[9px] uppercase tracking-widest text-gray-400 font-black mb-6">
                                Certifié Authentique
                            </div>
                            <h2 className="text-5xl md:text-7xl font-sans text-gray-100 uppercase tracking-tighter font-black leading-none select-none print:text-4xl print:text-gray-900 print:mt-0">Facture</h2>
                            <div className="mt-[-1.5rem] print:mt-2 space-y-2 relative z-10 mr-4">
                                <p className="text-[11px] uppercase tracking-widest text-amber-600 font-black">N° {String(data.orderId).slice(0, 8).toUpperCase()}</p>
                                <p className="text-sm font-light text-gray-500">
                                    Émise le {data.date?.toDate ? data.date.toDate().toLocaleDateString('fr-FR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    }) : new Date().toLocaleDateString('fr-FR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 print:gap-4 print:grid-cols-2">
                        <div className="space-y-6 print:space-y-2">
                            <h3 className="text-[10px] uppercase tracking-widest text-gray-300 font-black print:text-[8px]">Destinataire</h3>
                            <div className="space-y-2">
                                <p className="text-2xl font-sans font-bold text-gray-950 print:text-xl">{data.customerName}</p>
                                <div className="space-y-1 text-xs text-gray-500 font-light leading-relaxed max-w-xs">
                                    <p>{data.customerEmail}</p>
                                    <p>{data.customerPhone}</p>
                                    <p>
                                        {typeof data.customerAddress === 'string' 
                                            ? data.customerAddress 
                                            : `${(data.customerAddress as any)?.street || ''}, ${(data.customerAddress as any)?.city || ''}, ${(data.customerAddress as any)?.region || ''}`.replace(/^[,\s]+|[,\s]+$/g, '') || 'Adresse non renseignée'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 md:text-right md:items-end flex flex-col print:space-y-2 print:text-right">
                            <h3 className="text-[10px] uppercase tracking-widest text-gray-300 font-black print:text-[8px]">Mode de Règlement</h3>
                            <div className="space-y-2">
                                <p className="text-sm font-bold text-gray-900 uppercase tracking-widest print:text-xs">Paiement à la Livraison</p>
                                <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] uppercase font-black tracking-widest print:bg-transparent print:p-0 print:text-[9px]">
                                    <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full print:hidden" />
                                    Transaction Sécurisée
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="flex-1 p-12 md:p-20 print:p-0 print:flex-none">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-gray-900 print:border-b">
                                <th className="pb-8 text-left text-[10px] uppercase tracking-widest text-gray-400 font-black print:pb-4 print:text-[8px] print:tracking-widest">Description de la Sélection</th>
                                <th className="pb-8 text-center text-[10px] uppercase tracking-widest text-gray-400 font-black print:pb-4 print:text-[8px] print:tracking-widest">P.U</th>
                                <th className="pb-8 text-center text-[10px] uppercase tracking-widest text-gray-400 font-black print:pb-4 print:text-[8px] print:tracking-widest">Qté</th>
                                <th className="pb-8 text-right text-[10px] uppercase tracking-widest text-gray-400 font-black print:pb-4 print:text-[8px] print:tracking-widest">Montant</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {data.items.map((item: any, i: number) => (
                                <tr key={i} className="group print:break-inside-avoid">
                                    <td className="py-10 print:py-4">
                                        <p className="text-lg font-sans font-bold text-gray-950 mb-1 print:text-sm">{item.name}</p>
                                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold print:text-[7px]">L'Art de la Coiffure • Vitasilk Privilege</p>
                                    </td>
                                    <td className="py-10 text-center text-sm text-gray-600 print:py-4 print:text-xs">{(item.price ?? 0).toLocaleString()} DH</td>
                                    <td className="py-10 text-center text-sm font-bold text-gray-900 whitespace-nowrap print:py-4 print:text-xs">× {item.quantity}</td>
                                    <td className="py-10 text-right text-lg font-sans font-bold text-gray-950 print:py-4 print:text-sm">{((item.price ?? 0) * (item.quantity ?? 0)).toLocaleString()} DH</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Section (Totals) */}
                <div className="p-12 md:p-20 bg-gray-50/50 mt-auto print:p-0 print:bg-transparent print:mt-4 print:border-t print:border-gray-100 print:pt-4">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 print:flex-row print:items-start print:gap-4 print:break-inside-avoid">
                        <div className="order-2 md:order-1 flex-1 max-w-sm print:order-1">
                            <h4 className="text-[9px] uppercase tracking-widest text-gray-400 font-black mb-4 print:mb-2 print:text-[7px]">Note d'Artisan</h4>
                            <p className="text-[10px] text-gray-400 font-light leading-relaxed print:text-[9px]">
                                Merci d'avoir choisi Vitasilk. Chaque produit est scellé avec le plus grand soin pour garantir une expérience de luxe.
                            </p>
                        </div>

                        <div className="order-1 md:order-2 w-full md:w-80 space-y-4 print:order-2 print:w-64 print:space-y-2">
                            <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold print:text-[8px]">
                                <span>Sous-total</span>
                                <span className="text-gray-900">{(data.subtotal ?? 0).toLocaleString()} DH</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold print:text-[8px]">
                                <span>Livraison Premium</span>
                                <span className="text-gray-900">Offerte</span>
                            </div>
                            <div className="pt-8 border-t border-gray-200 flex justify-between items-end print:pt-4 print:border-none">
                                <span className="text-[11px] uppercase tracking-widest text-amber-600 font-black pb-2 print:text-[9px] print:pb-1">Total NET</span>
                                <span className="text-5xl font-sans font-bold text-gray-950 tracking-tighter print:text-3xl">{(data.total ?? 0).toLocaleString()} <small className="text-xs uppercase tracking-normal font-light">DH</small></span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 pt-12 border-t border-gray-100 text-center no-print">
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-4 px-12 py-5 bg-gray-950 text-white text-[10px] uppercase font-black tracking-widest hover:bg-amber-600 transition-all duration-700 shadow-2xl"
                        >
                            <FileText size={16} className="text-amber-200" />
                            Lancer l'Impression de Luxe
                        </button>
                    </div>
                </div>

                {/* Fine Print - Printed Only */}
                <div className="hidden print:block p-12 text-center text-[8px] text-gray-300 uppercase tracking-widest print:p-4">
                    Vitasilk • Meknès, Maroc • +212 662 633 170 • vitasilk.ma
                </div>
            </div>
        </div>
    );

    return createPortal(invoiceContent, document.body);
}

