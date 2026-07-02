"use client";

import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { createPortal } from 'react-dom';

interface InvoiceData {
    orderId: string | number;
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

export default function InvoiceView({ data, onClose }: { data: InvoiceData; onClose: () => void }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const orig = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = orig; };
    }, []);

    if (!mounted) return null;

    const formattedDate = data.date
        ? new Date(data.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
        : new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

    const invoiceContent = (
        <div
            id="invoice-overlay-root"
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-start justify-center p-0 md:p-8 overflow-y-auto print:bg-white print:static print:overflow-visible font-sans"
        >
            <style jsx global>{`
                @media print {
                    @page { size: A4; margin: 12mm 15mm; }
                    html, body {
                        height: auto !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                        overflow: visible !important;
                    }
                    body > *:not(#invoice-overlay-root) { display: none !important; }
                    #invoice-overlay-root {
                        display: block !important;
                        position: static !important;
                        background: white !important;
                        padding: 0 !important;
                    }
                    #printable-invoice {
                        box-shadow: none !important;
                        border: none !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    .no-print { display: none !important; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                }
            `}</style>

            {/* Close button */}
            <button
                onClick={onClose}
                className="no-print fixed top-6 right-6 z-[1001] w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-xl"
            >
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
            </button>

            <div
                id="printable-invoice"
                className="bg-white w-full max-w-[210mm] my-0 md:my-8 shadow-[0_0_100px_rgba(0,0,0,0.5)] print:shadow-none print:my-0"
            >
                {/* ── TOP HEADER ── */}
                <div className="px-12 pt-12 pb-8 md:px-16 md:pt-14 border-b-2 border-gray-900">
                    <div className="flex items-start justify-between gap-8">
                        {/* Logo */}
                        <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/img/logo.png"
                                alt="Vitasilk"
                                className="h-12 md:h-16 w-auto object-contain"
                            />
                            <div className="mt-4 space-y-0.5 text-[10px] text-gray-400 leading-relaxed">
                                <p>Meknès, Maroc</p>
                                <p>+212 661 086 837</p>
                                <p>contact@vitasilkbs.ma</p>
                            </div>
                        </div>

                        {/* Invoice title + number */}
                        <div className="text-right">
                            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-gray-100 select-none leading-none">
                                Facture
                            </h1>
                            <p className="text-sm font-black uppercase tracking-widest text-amber-500 mt-1">
                                N° {String(data.orderId).toUpperCase()}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Émise le {formattedDate}</p>
                        </div>
                    </div>
                </div>

                {/* ── CLIENT + PAYMENT ── */}
                <div className="px-12 py-8 md:px-16 grid grid-cols-2 gap-8 border-b border-gray-100">
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-gray-300 font-black mb-3">Destinataire</p>
                        <p className="text-xl font-bold text-gray-900">{data.customerName || '—'}</p>
                        <div className="mt-2 space-y-0.5 text-xs text-gray-500">
                            {data.customerPhone && <p>{data.customerPhone}</p>}
                            {data.customerEmail && <p>{data.customerEmail}</p>}
                            {data.customerAddress && <p>{data.customerAddress}</p>}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] uppercase tracking-widest text-gray-300 font-black mb-3">Règlement</p>
                        <p className="text-sm font-bold text-gray-900">Paiement à la Livraison</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] uppercase font-black tracking-widest rounded-full border border-emerald-100">
                            Transaction Sécurisée
                        </span>
                    </div>
                </div>

                {/* ── ITEMS TABLE ── */}
                <div className="px-12 pt-8 pb-4 md:px-16">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="pb-3 text-left text-[9px] uppercase tracking-widest text-gray-400 font-black w-[50%]">Article</th>
                                <th className="pb-3 text-center text-[9px] uppercase tracking-widest text-gray-400 font-black w-[15%]">Qté</th>
                                <th className="pb-3 text-right text-[9px] uppercase tracking-widest text-gray-400 font-black w-[17%]">Prix Unit.</th>
                                <th className="pb-3 text-right text-[9px] uppercase tracking-widest text-gray-400 font-black w-[18%]">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((item: any, i: number) => (
                                <tr
                                    key={i}
                                    className="border-b border-gray-50"
                                    style={{ backgroundColor: i % 2 !== 0 ? '#FAFAF9' : 'white' }}
                                >
                                    <td className="py-4 pr-4">
                                        <p className="text-sm font-bold text-gray-900 leading-snug">
                                            {item.product_name || item.name || '—'}
                                        </p>
                                    </td>
                                    <td className="py-4 text-center">
                                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-black">
                                            {item.quantity ?? 1}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right text-sm text-gray-600 font-medium">
                                        {(item.price ?? 0).toLocaleString()} DH
                                    </td>
                                    <td className="py-4 text-right text-sm font-black text-gray-900">
                                        {((item.price ?? 0) * (item.quantity ?? 1)).toLocaleString()} DH
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ── TOTALS ── */}
                <div className="px-12 pt-4 pb-10 md:px-16 flex justify-end">
                    <div className="w-64 space-y-2">
                        <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest font-bold">
                            <span>Sous-total</span>
                            <span className="text-gray-700">{(data.subtotal ?? 0).toLocaleString()} DH</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest font-bold">
                            <span>Livraison</span>
                            <span className="text-gray-700">Offerte</span>
                        </div>
                        <div className="flex justify-between items-end pt-4 border-t-2 border-gray-900 mt-2">
                            <span className="text-[10px] uppercase tracking-widest font-black text-amber-500">Total NET</span>
                            <span className="text-3xl font-black text-gray-900 tracking-tight">
                                {(data.total ?? 0).toLocaleString()}&nbsp;<small className="text-xs font-light">DH</small>
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── FOOTER NOTE ── */}
                <div className="px-12 pb-12 md:px-16 border-t border-gray-100 pt-6 flex items-end justify-between gap-8">
                    <p className="text-[9px] text-gray-300 leading-relaxed max-w-xs">
                        Merci d'avoir choisi Vitasilk. Chaque produit est préparé avec le plus grand soin pour une expérience d'exception.
                    </p>
                    {/* Print button — hidden when printing */}
                    <button
                        onClick={() => window.print()}
                        className="no-print inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white text-[10px] uppercase font-black tracking-widest hover:bg-amber-500 transition-all duration-500 shadow-xl whitespace-nowrap"
                    >
                        <FileText size={14} />
                        Imprimer
                    </button>
                </div>

                {/* Print-only fine print */}
                <div className="hidden print:block px-12 pb-6 text-center text-[8px] text-gray-300 uppercase tracking-widest border-t border-gray-50 pt-4">
                    Vitasilk • Meknès, Maroc • +212 661 086 837 • vitasilk.ma
                </div>
            </div>
        </div>
    );

    return createPortal(invoiceContent, document.body);
}
