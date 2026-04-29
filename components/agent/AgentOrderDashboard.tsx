"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { ordersApi, imageUrl } from '@/lib/api';
import type { Order } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Phone, MapPin, User, Package, Search, X, ChevronDown,
  CheckCircle, Clock, Truck, XCircle, ShieldAlert, RefreshCw,
} from 'lucide-react';

const STATUS_TABS = [
  { key: '', label: 'Toutes' },
  { key: 'pending', label: 'Non confirmées' },
  { key: 'processing', label: 'Confirmées' },
  { key: 'shipped', label: 'En livraison' },
  { key: 'delivered', label: 'Livrées' },
  { key: 'cancelled', label: 'Annulées' },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  pending:    { label: 'Non confirmée', color: 'text-amber-700',  bg: 'bg-amber-50 border-amber-200',  icon: Clock },
  processing: { label: 'Confirmée',     color: 'text-blue-700',   bg: 'bg-blue-50 border-blue-200',    icon: ShieldAlert },
  shipped:    { label: 'En livraison',  color: 'text-violet-700', bg: 'bg-violet-50 border-violet-200',icon: Truck },
  delivered:  { label: 'Livrée',        color: 'text-emerald-700',bg: 'bg-emerald-50 border-emerald-200',icon: CheckCircle },
  cancelled:  { label: 'Annulée',       color: 'text-red-700',    bg: 'bg-red-50 border-red-200',      icon: XCircle },
};

export default function AgentOrderDashboard() {
  const { userData, logout } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState('');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updating, setUpdating] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page, limit: 20 };
      if (activeStatus) params.status = activeStatus;
      const res = await ordersApi.getAll(params as any);
      setOrders(res.data);
      setTotalPages(res.pagination?.totalPages ?? 1);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [activeStatus, page]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleLogout = () => { logout(); router.push('/login'); };

  const filtered = orders.filter(o => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      String(o.id).includes(q) ||
      (o.user_name || '').toLowerCase().includes(q) ||
      (o.phone || '').includes(q) ||
      (o.city || '').toLowerCase().includes(q)
    );
  });

  const updateStatus = async (orderId: number, status: string) => {
    setUpdating(true);
    try {
      await ordersApi.updateStatus(orderId, status);
      await fetchOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: status as Order['status'] } : null);
      }
    } finally { setUpdating(false); }
  };

  const cfg = (status: string) => STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 lg:px-12 py-4 lg:py-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white ring-4 ring-primary/10">V</div>
          <div>
            <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">Vitasilk</p>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest">Espace Agent</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-900 leading-none mb-1">{userData?.name}</p>
            <p className="text-[9px] text-gray-400 font-medium">Agent — Confirmations</p>
          </div>
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-primary font-bold shadow-inner text-xs">
            {userData?.name?.slice(0, 2).toUpperCase() || 'AG'}
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-bold text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
            <LogOut size={14} />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-12 py-8 lg:py-12">

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-sans font-light text-gray-900">Confirmation des <span className="text-primary">Commandes</span></h1>
          <p className="text-xs text-gray-400 mt-1">Consultez les commandes, appelez les clients et mettez à jour leur statut.</p>
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {STATUS_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveStatus(tab.key); setPage(1); }}
              className={`px-5 py-2.5 text-[10px] uppercase font-bold rounded-full border transition-all ${
                activeStatus === tab.key
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-900 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search + refresh */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher par nom, téléphone, ville..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-white text-xs rounded-lg focus:outline-none focus:border-primary"
            />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X size={12} /></button>}
          </div>
          <button onClick={fetchOrders} className="p-2.5 border border-gray-200 bg-white rounded-lg text-gray-500 hover:text-primary transition-colors">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400 text-sm">Aucune commande trouvée.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-5 py-3 text-[9px] uppercase tracking-widest font-bold text-gray-400">#</th>
                    <th className="text-left px-5 py-3 text-[9px] uppercase tracking-widest font-bold text-gray-400">Client</th>
                    <th className="text-left px-5 py-3 text-[9px] uppercase tracking-widest font-bold text-gray-400">Téléphone</th>
                    <th className="text-left px-5 py-3 text-[9px] uppercase tracking-widest font-bold text-gray-400">Ville</th>
                    <th className="text-left px-5 py-3 text-[9px] uppercase tracking-widest font-bold text-gray-400">Total</th>
                    <th className="text-left px-5 py-3 text-[9px] uppercase tracking-widest font-bold text-gray-400">Statut</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(order => {
                    const s = cfg(order.status);
                    const Icon = s.icon;
                    return (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => setSelectedOrder(order)}>
                        <td className="px-5 py-4 text-xs font-mono text-gray-400">#{order.id}</td>
                        <td className="px-5 py-4">
                          <span className="text-sm font-semibold text-gray-900">{order.user_name || '—'}</span>
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-600 font-mono">{order.phone || '—'}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{order.city || '—'}</td>
                        <td className="px-5 py-4 text-sm font-bold text-gray-900">{order.total_price?.toLocaleString()} DH</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] uppercase font-bold rounded-full border ${s.bg} ${s.color}`}>
                            <Icon size={10} />
                            {s.label}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button className="text-primary text-[10px] uppercase font-bold hover:text-black transition-colors">Voir →</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-4 py-2 text-xs border border-gray-200 rounded-lg disabled:opacity-30 hover:border-gray-900 transition-colors">
              <ChevronDown size={12} className="rotate-90 inline" /> Précédent
            </button>
            <span className="px-4 py-2 text-xs text-gray-500">Page {page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-4 py-2 text-xs border border-gray-200 rounded-lg disabled:opacity-30 hover:border-gray-900 transition-colors">
              Suivant <ChevronDown size={12} className="-rotate-90 inline" />
            </button>
          </div>
        )}
      </main>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setSelectedOrder(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Commande #{selectedOrder.id}</p>
                  <h2 className="text-lg font-sans font-semibold text-gray-900">Fiche de Confirmation</h2>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={18} /></button>
              </div>

              <div className="p-6 space-y-6">

                {/* Status badge */}
                {(() => {
                  const s = cfg(selectedOrder.status);
                  const Icon = s.icon;
                  return (
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase font-bold rounded-full border ${s.bg} ${s.color}`}>
                      <Icon size={11} /> {s.label}
                    </div>
                  );
                })()}

                {/* Confirmation Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5">
                  <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-4">Informations client</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <User size={16} className="text-gray-400 mx-auto mb-2" />
                      <p className="text-[9px] uppercase text-gray-400 font-bold mb-1">Nom</p>
                      <p className="text-sm font-bold text-gray-900 leading-tight">{selectedOrder.user_name || '—'}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <Phone size={16} className="text-emerald-500 mx-auto mb-2" />
                      <p className="text-[9px] uppercase text-gray-400 font-bold mb-1">Téléphone</p>
                      <p className="text-sm font-bold text-gray-900 tracking-wider">{selectedOrder.phone || '—'}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <MapPin size={16} className="text-blue-500 mx-auto mb-2" />
                      <p className="text-[9px] uppercase text-gray-400 font-bold mb-1">Ville</p>
                      <p className="text-sm font-bold text-gray-900">{selectedOrder.city || '—'}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400">
                    <span>{selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}</span>
                    <span className="uppercase font-bold">{selectedOrder.payment_method === 'cash' ? 'Paiement à la livraison' : 'Virement bancaire'}</span>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-3">Articles commandés</p>
                  <div className="border border-gray-100 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="text-left px-4 py-2.5 text-[9px] uppercase tracking-widest font-bold text-gray-400">Article</th>
                          <th className="text-center px-4 py-2.5 text-[9px] uppercase tracking-widest font-bold text-gray-400">Qté</th>
                          <th className="text-right px-4 py-2.5 text-[9px] uppercase tracking-widest font-bold text-gray-400">Prix</th>
                          <th className="text-right px-4 py-2.5 text-[9px] uppercase tracking-widest font-bold text-gray-400">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {selectedOrder.items?.map((item, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                            <td className="px-4 py-3 font-medium text-gray-900">{item.product_name || item.product_name}</td>
                            <td className="px-4 py-3 text-center">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold">{item.quantity}</span>
                            </td>
                            <td className="px-4 py-3 text-right text-gray-600">{item.price?.toLocaleString()} DH</td>
                            <td className="px-4 py-3 text-right font-bold text-gray-900">{(item.price * item.quantity)?.toLocaleString()} DH</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-900 text-white">
                          <td colSpan={3} className="px-4 py-3 text-[10px] uppercase tracking-widest font-bold">Total à encaisser</td>
                          <td className="px-4 py-3 text-right font-bold">{selectedOrder.total_price?.toLocaleString()} DH</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Agent Actions */}
                <div className="border-t border-gray-100 pt-5">
                  <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-3">Actions</p>

                  {selectedOrder.status === 'pending' && (
                    <div className="flex gap-3">
                      <button
                        disabled={updating}
                        onClick={() => updateStatus(selectedOrder.id, 'processing')}
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] uppercase tracking-widest font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={14} /> Confirmer la commande
                      </button>
                      <button
                        disabled={updating}
                        onClick={() => updateStatus(selectedOrder.id, 'cancelled')}
                        className="flex-1 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <XCircle size={14} /> Annuler
                      </button>
                    </div>
                  )}

                  {selectedOrder.status === 'processing' && (
                    <button
                      disabled={updating}
                      onClick={() => updateStatus(selectedOrder.id, 'shipped')}
                      className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white text-[10px] uppercase tracking-widest font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Truck size={14} /> Marquer en livraison
                    </button>
                  )}

                  {selectedOrder.status === 'shipped' && (
                    <button
                      disabled={updating}
                      onClick={() => updateStatus(selectedOrder.id, 'delivered')}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] uppercase tracking-widest font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={14} /> Marquer comme livrée
                    </button>
                  )}

                  {(selectedOrder.status === 'delivered' || selectedOrder.status === 'cancelled') && (
                    <div className={`text-center py-3 text-sm font-semibold rounded-lg ${selectedOrder.status === 'delivered' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                      {selectedOrder.status === 'delivered' ? '✓ Commande livrée' : '✗ Commande annulée'}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
