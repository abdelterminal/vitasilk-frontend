"use client";

import React, { useState, useEffect } from 'react';
import {
    Package,
    Search,
    Filter,
    Eye,
    Trash2,
    ChevronRight,
    Clock,
    CheckCircle,
    Truck,
    X,
    FileText,
    ArrowRight,
    MapPin,
    Phone,
    User,
    Mail,
    ShoppingBag,
    Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ordersApi, imageUrl, type Order as ApiOrder } from '@/lib/api';
import InvoiceView from './InvoiceView';
import Toast, { ToastType } from './ui/Toast';
import ConfirmModal from './ui/ConfirmModal';


type Order = ApiOrder;

export default function OrderManager() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showInvoice, setShowInvoice] = useState(false);
    const [invoiceData, setInvoiceData] = useState<any>(null);

    // UX System State
    const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
        message: '',
        type: 'info',
        isVisible: false
    });
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
        variant: 'danger' | 'warning' | 'info';
    }>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        variant: 'danger'
    });

    const showToast = (message: string, type: ToastType = 'success') => {
        setToast({ message, type, isVisible: true });
        setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 5000);
    };

    const askConfirmation = (title: string, message: string, onConfirm: () => void, variant: 'danger' | 'warning' | 'info' = 'danger') => {
        setConfirmModal({ isOpen: true, title, message, onConfirm, variant });
    };


    useEffect(() => {
        ordersApi.getAll({ limit: 200 })
            .then(res => setOrders(res.data || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const updateStatus = async (id: number | string, newStatus: Order['status'], _orderData?: Order) => {
        try {
            await ordersApi.updateStatus(id, newStatus);
            setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
            setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
            showToast(`Statut mis à jour: ${getStatusConfig(newStatus).label}`);
        } catch (error) {
            console.error("Error updating status:", error);
            showToast("Erreur lors de la mise à jour du statut", "error");
        }
    };


    const deleteOrder = async (orderId: number | string) => {
        askConfirmation(
            "Supprimer la commande",
            "Cette action est irréversible. La commande sera définitivement supprimée.",
            async () => {
                try {
                    await ordersApi.delete(orderId);
                    setOrders(prev => prev.filter(o => o.id !== orderId));
                    if (selectedOrder?.id === orderId) setSelectedOrder(null);
                    showToast("Commande supprimée avec succès", "info");
                } catch (error) {
                    console.error("Error deleting order:", error);
                    showToast("Erreur lors de la suppression", "error");
                }
            }
        );
    };

    const cancelOrder = async (orderId: number | string) => {
        askConfirmation(
            "Annuler la commande",
            "Êtes-vous sûr de vouloir annuler cette commande ? Le client en sera informé.",
            async () => {
                try {
                    if (selectedOrder?.status === 'delivered') {
                        showToast("Impossible d'annuler une commande déjà livrée", "error");
                        return;
                    }
                    await ordersApi.updateStatus(orderId, 'cancelled');
                    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
                    if (selectedOrder?.id === orderId) setSelectedOrder(prev => prev ? { ...prev, status: 'cancelled' } : null);
                    showToast("Commande annulée", "info");
                } catch (error) {
                    console.error("Error cancelling order:", error);
                    showToast("Erreur lors de l'annulation", "error");
                }
            },
            'warning'
        );
    };


    const filteredOrders = orders.filter(order => {
        const cName = (order.user_name || '').toLowerCase();
        const cEmail = (order.user_email || '').toLowerCase();
        const sTerm = searchTerm.toLowerCase();

        const matchesSearch =
            String(order.id).includes(sTerm) ||
            cName.includes(sTerm) ||
            cEmail.includes(sTerm);

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusConfig = (status: Order['status']) => {
        switch (status) {
            case 'pending': return { icon: Clock, label: 'En attente', color: 'text-[#B89E67] bg-[#B89E67]/10 border-[#B89E67]/20 shadow-[0_0_20px_rgba(184,158,103,0.15)]' };
            case 'processing': return { icon: ShieldAlert, label: 'Préparation', color: 'text-blue-600 bg-blue-50 border-blue-200 shadow-[0_0_20px_rgba(37,99,235,0.15)]' };
            case 'shipped': return { icon: Truck, label: 'Expédiée', color: 'text-indigo-600 bg-indigo-50 border-indigo-200 shadow-[0_0_20px_rgba(79,70,229,0.15)]' };
            case 'delivered': return { icon: CheckCircle, label: 'Livrée', color: 'text-emerald-600 bg-emerald-50 border-emerald-200 shadow-[0_0_20px_rgba(5,150,105,0.15)]' };
            case 'cancelled': return { icon: X, label: 'Annulée', color: 'text-red-600 bg-red-50 border-red-200 shadow-[0_0_20px_rgba(220,38,38,0.15)]' };
            default: return { icon: Clock, label: status, color: 'text-gray-600 bg-gray-50 border-gray-200' };
        }
    };

    const ShieldAlert = ({ size, className }: any) => (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-32 space-y-6">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold animate-pulse">Consultation du grand registre...</p>
        </div>
    );

    return (
        <div className="space-y-12">
            {/* Header / Stats */}
            <div className="bg-white p-6 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] luxury-text text-[10rem] pointer-events-none select-none">Ordres</div>
                <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-4xl font-sans font-light tracking-tight text-gray-900 mb-2">Gestion des Commandes</h2>
                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Excellence opérationnelle & Logistique</p>
                </div>
                <div className="relative z-10 grid grid-cols-2 gap-12 text-right">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Actives</p>
                        <p className="text-3xl font-sans font-light text-gray-900">{orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length}</p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Total</p>
                        <p className="text-3xl font-sans font-light text-gray-900">{orders.length}</p>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 bg-white p-6 md:p-8 border border-gray-100 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher par ID, Nom ou Email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm outline-none rounded-sm"
                    />
                </div>
                <div className="flex items-center gap-4 bg-gray-50/50 border border-gray-100 px-6 py-4">
                    <Filter size={14} className="text-gray-400" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-transparent text-[10px] uppercase tracking-widest font-black focus:outline-none cursor-pointer"
                    >
                        <option value="all">Tous les Statuts</option>
                        <option value="pending">En attente</option>
                        <option value="processing">Préparation</option>
                        <option value="shipped">Expédiée</option>
                        <option value="delivered">Livrée</option>
                        <option value="cancelled">Annulée</option>
                    </select>
                </div>
            </div>

            {/* List */}
            <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto min-h-[400px]">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="border-b border-gray-50 bg-[#FAF9F6]">
                            <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Identifiant</th>
                            <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Client</th>
                            <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Montant</th>
                            <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Statut</th>
                            <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredOrders.map((order) => {
                            const config = getStatusConfig(order.status);
                            const customerName = order.customer?.name || order.customerName || 'Hôte';
                            const customerEmail = order.customer?.email || order.email || '—';
                            return (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    key={order.id}
                                    className="hover:bg-gray-50/50 transition-all duration-500 group"
                                >
                                    <td className="px-6 md:px-10 py-6 md:py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-10 bg-primary/20 group-hover:bg-primary transition-colors rounded-full" />
                                            <div>
                                                <p className="text-[11px] font-black uppercase tracking-widest text-gray-950 mb-1">
                                                    #{order.id}
                                                </p>
                                                <p className="text-[9px] text-gray-400 font-medium">
                                                    {order.created_at ? new Date(order.created_at).toLocaleDateString('fr-FR') : '—'}
                                                    {order.created_at && (
                                                        <span className="block text-[9px] text-gray-300 font-normal">
                                                            {new Date(order.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-10 py-6 md:py-8">
                                        <div>
                                            <p className="text-[13px] font-bold text-gray-900 group-hover:text-primary transition-colors">{order.user_name || 'Hôte'}</p>
                                            <p className="text-[10px] text-gray-400 lowercase ">{order.user_email || '—'}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-10 py-6 md:py-8">
                                        <p className="text-[14px] font-black text-gray-900">{order.total_price} DH</p>
                                        <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">{(order.items?.length ?? 0)} Articles</p>
                                    </td>
                                    <td className="px-6 md:px-10 py-6 md:py-8">
                                        <div className={cn(
                                            "inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-[9px] uppercase font-black tracking-widest",
                                            config.color
                                        )}>
                                            <config.icon size={12} strokeWidth={2.5} />
                                            {config.label}
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-10 py-6 md:py-8 text-right">
                                        <div className={cn(
                                            "flex items-center justify-end gap-2 md:gap-3 transition-opacity duration-300",
                                            "md:opacity-0 md:group-hover:opacity-100"
                                        )}>
                                            <button
                                                onClick={() => {
                                                    setInvoiceData({
                                                        orderId: order.id,
                                                        date: order.created_at,
                                                        customerName: order.user_name,
                                                        customerEmail: order.user_email,
                                                        customerPhone: order.phone || '—',
                                                        customerAddress: order.city || order.address || 'Adresse non renseignée',
                                                        items: order.items,
                                                        subtotal: order.total_price,
                                                        shipping: 0,
                                                        total: order.total_price
                                                    });
                                                    setShowInvoice(true);
                                                }}
                                                className="p-3.5 bg-white border border-gray-100 text-gray-400 hover:text-primary hover:border-primary/20 hover:shadow-xl transition-all"
                                                title="Imprimer la facture"
                                            >
                                                <FileText size={18} strokeWidth={1.2} />
                                            </button>
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="p-3.5 bg-white border border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-200 hover:shadow-xl transition-all"
                                                title="Afficher les détails"
                                            >
                                                <Eye size={18} strokeWidth={1.2} />
                                            </button>
                                            {order.status !== 'delivered' && (
                                                <button
                                                    onClick={() => cancelOrder(order.id)}
                                                    className="p-3.5 bg-white border border-gray-100 text-gray-400 hover:text-amber-600 hover:border-amber-100 hover:shadow-xl transition-all"
                                                    title="Annuler la commande"
                                                    disabled={order.status === 'cancelled'}
                                                >
                                                    <X size={18} strokeWidth={1.2} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteOrder(order.id)}
                                                className="p-3.5 bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100 hover:shadow-xl transition-all"
                                                title="Supprimer définitivement"
                                            >
                                                <Trash2 size={18} strokeWidth={1.2} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
                {filteredOrders.length === 0 && (
                    <div className="py-40 text-center relative border-t border-gray-50">
                        <ShoppingBag className="mx-auto text-gray-100 mb-10" size={100} strokeWidth={0.5} />
                        <h3 className="text-2xl font-sans font-light text-gray-300 ">Aucune transaction trouvée</h3>
                        <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-4 font-bold">Le registre est immaculé</p>
                        <button onClick={() => { setSearchTerm(''); setStatusFilter('all'); }} className="mt-12 text-primary text-[10px] uppercase font-black tracking-widest border-b border-primary/20 pb-1">Réinitialiser les filtres</button>
                    </div>
                )}
            </div>

            {/* Sidebar Details Panel */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-0 md:p-8 bg-black/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full h-full md:h-auto md:max-w-5xl md:max-h-[95vh] overflow-hidden shadow-2xl relative flex flex-col md:rounded-3xl"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                                <div className="flex items-center gap-6">
                                    <div className={cn("p-4 rounded-2xl", getStatusConfig(selectedOrder.status).color)}>
                                        {React.createElement(getStatusConfig(selectedOrder.status).icon, { size: 24 })}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-sans font-light text-gray-900">Commande #{selectedOrder.id}</h2>
                                        <p className="text-[10px] uppercase tracking-widest font-black text-gray-400 mt-1">Détails de la transaction artisanale</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-3 hover:bg-white hover:shadow-md rounded-full transition-all text-gray-400 hover:text-gray-900 group"
                                >
                                    <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12 scrollbar-hide">
                                {/* Customer & Logistics Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <div className="space-y-6">
                                        <p className="text-[10px] uppercase tracking-widest font-black text-primary border-b border-primary/10 pb-2">Client & Contact</p>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 shrink-0 bg-primary/5 rounded-full flex items-center justify-center text-primary font-bold border border-primary/10">
                                                    {(selectedOrder.user_name || '?')[0].toUpperCase()}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-bold text-gray-900 truncate">{selectedOrder.user_name || 'Client Inconnu'}</p>
                                                    <p className="text-xs text-gray-500 truncate">{selectedOrder.user_email || '—'}</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100"><Phone size={14} className="text-primary shrink-0" /> <span className="truncate">{selectedOrder.phone || '—'}</span></p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="text-[10px] uppercase tracking-widest font-black text-primary border-b border-primary/10 pb-2">Adresse de Livraison</p>
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 min-h-[100px] flex items-start gap-4">
                                            <MapPin size={20} className="text-primary mt-1 shrink-0" />
                                            <p className="text-sm text-gray-700 leading-relaxed italic">
                                                {selectedOrder.city || selectedOrder.address || 'Adresse non renseignée'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="text-[10px] uppercase tracking-widest font-black text-primary border-b border-primary/10 pb-2">Détails Logistiques</p>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">Date</span>
                                                <span className="text-gray-900 font-medium">
                                                    {selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Maintenant'}
                                                    {selectedOrder.created_at && (
                                                        <span className="text-gray-400 font-normal text-xs ml-2">
                                                            {new Date(selectedOrder.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-gray-400">Paiement</span>
                                                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[9px] uppercase font-black rounded-full border border-amber-100">À la livraison</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-50">
                                                <span className="text-gray-400">Total Commande</span>
                                                <span className="text-2xl font-sans font-light text-primary">{selectedOrder.total_price.toLocaleString()} DH</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Stepper */}
                                <div className="space-y-6">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-primary border-b border-primary/10 pb-2">Progression de la Commande</p>
                                    {(() => {
                                        const isCancelled = selectedOrder.status === 'cancelled';
                                        const steps = [
                                            { status: 'pending' as const, label: 'Reçue', icon: Clock },
                                            { status: 'processing' as const, label: 'Préparation', icon: ShieldAlert },
                                            { status: 'shipped' as const, label: 'Livraison', icon: Truck },
                                            { status: 'delivered' as const, label: 'Livrée', icon: CheckCircle },
                                        ];
                                        const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
                                        const currentIdx = statusOrder.indexOf(selectedOrder.status);
                                        const progressFactor = isCancelled ? 0 : (currentIdx + 1) / 4;

                                        return (
                                            <div>
                                                {isCancelled && (
                                                    <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-xs font-medium">
                                                        <X size={14} /> Commande annulée
                                                    </div>
                                                )}
                                                <div className="relative">
                                                    <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-100 hidden sm:block" />
                                                    <div
                                                        className="absolute top-6 left-6 h-0.5 bg-primary hidden sm:block transition-all duration-700"
                                                        style={{ width: isCancelled ? 0 : `calc(${progressFactor * 100}% - 3rem)` }}
                                                    />
                                                    <div className="grid grid-cols-4 gap-2 relative">
                                                        {steps.map((step, idx) => {
                                                            const isCompleted = !isCancelled && idx < currentIdx;
                                                            const isActive = !isCancelled && idx === currentIdx;
                                                            const Icon = step.icon;
                                                            return (
                                                                <button
                                                                    key={step.status}
                                                                    onClick={() => updateStatus(selectedOrder.id, step.status)}
                                                                    disabled={
                                                                        isCancelled ||
                                                                        selectedOrder.status === 'delivered' ||
                                                                        idx < currentIdx
                                                                    }
                                                                    className="flex flex-col items-center gap-2 group disabled:cursor-not-allowed"
                                                                >
                                                                    <div className={cn(
                                                                        "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm",
                                                                        isActive && "bg-gray-950 border-primary text-primary scale-110 shadow-primary/20 shadow-lg",
                                                                        isCompleted && "bg-gray-950 border-primary text-primary",
                                                                        !isActive && !isCompleted && "bg-gray-50 border-gray-100 text-gray-300 group-hover:border-gray-300 group-hover:text-gray-400"
                                                                    )}>
                                                                        <Icon size={16} />
                                                                    </div>
                                                                    <span className={cn(
                                                                        "text-[9px] uppercase tracking-wider font-bold text-center",
                                                                        (isActive || isCompleted) ? "text-gray-900" : "text-gray-300"
                                                                    )}>{step.label}</span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                                {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                                                    <button
                                                        onClick={() => cancelOrder(selectedOrder.id)}
                                                        className="mt-4 w-full py-2.5 border border-red-100 text-red-400 text-[9px] uppercase tracking-widest font-bold rounded-xl hover:bg-red-50 transition-all"
                                                    >
                                                        Annuler la commande
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })()}
                                </div>

                                {/* Items List */}
                                <div className="space-y-6">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-primary border-b border-primary/10 pb-2">Composition du Colis</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(selectedOrder.items ?? []).map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all group rounded-2xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 bg-white overflow-hidden rounded-xl border border-gray-100 shrink-0 flex items-center justify-center text-gray-200">
                                                        <Package size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{item.product_name}</p>
                                                        <p className="text-[10px] text-gray-400 font-medium">{item.price} DH × {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-black text-gray-900">{(item.price * item.quantity).toLocaleString()} DH</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-8 md:p-10 border-t border-gray-100 bg-gray-50/30 flex flex-wrap justify-between items-center gap-4">
                                <button
                                    onClick={() => deleteOrder(selectedOrder.id)}
                                    className="px-8 py-4 bg-white border border-red-100 text-red-500 text-[10px] uppercase font-black tracking-widest hover:bg-red-50 hover:shadow-md transition-all flex items-center gap-3 rounded-xl"
                                >
                                    <Trash2 size={18} /> Supprimer l'Archive
                                </button>
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={() => {
                                            setInvoiceData({
                                                orderId: selectedOrder.id,
                                                date: selectedOrder.created_at,
                                                customerName: selectedOrder.user_name,
                                                customerEmail: selectedOrder.user_email,
                                                customerPhone: selectedOrder.phone || '—',
                                                customerAddress: selectedOrder.city || selectedOrder.address || 'Adresse non renseignée',
                                                items: selectedOrder.items,
                                                subtotal: selectedOrder.total_price,
                                                shipping: 0,
                                                total: selectedOrder.total_price
                                            });
                                            setShowInvoice(true);
                                        }}
                                        className="px-8 py-4 bg-white border border-gray-200 text-gray-900 text-[10px] uppercase font-black tracking-widest hover:border-primary hover:text-primary transition-all flex items-center gap-3 rounded-xl shadow-sm"
                                    >
                                        <Printer size={18} /> Édition Facture
                                    </button>
                                    <button
                                        onClick={() => updateStatus(selectedOrder.id, 'delivered')}
                                        disabled={selectedOrder.status === 'delivered'}
                                        className={cn(
                                            "px-10 py-4 text-[10px] uppercase font-black tracking-widest transition-all flex items-center gap-3 shadow-xl rounded-xl",
                                            selectedOrder.status === 'delivered' ? "bg-emerald-500 text-white cursor-not-allowed" : "bg-gray-900 text-white hover:bg-black hover:scale-105"
                                        )}
                                    >
                                        <CheckCircle size={18} /> {selectedOrder.status === 'delivered' ? "Livraison Confirmée" : "Valider l'Expédition"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {showInvoice && invoiceData && (
                <InvoiceView data={invoiceData} onClose={() => setShowInvoice(false)} />
            )}

            {/* Premium UX Components */}
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
            />

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.title}
                message={confirmModal.message}
                variant={confirmModal.variant}
                onConfirm={confirmModal.onConfirm}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
}


const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

