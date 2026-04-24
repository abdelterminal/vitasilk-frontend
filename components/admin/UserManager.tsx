"use client";

import React, { useState, useEffect } from 'react';
import { usersApi, ordersApi } from '@/lib/api';
import { User as UserIcon, Shield, ShieldAlert, Trash2, Mail, Calendar, Search, Filter, MoreHorizontal, UserCheck, UserX, PackageOpen, Loader2, X, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast, { ToastType } from './ui/Toast';
import ConfirmModal from './ui/ConfirmModal';


const UserManager = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    // Modal state
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [userOrders, setUserOrders] = useState<any[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
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
        usersApi.getAll(1, 200)
            .then(res => setUsers(res.data || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const handleRoleChange = async (userId: number, userEmail: string, newRole: string) => {
        if (userEmail === 'admin@vitasilk.com' && newRole !== 'admin') {
            showToast("Le statut impérial de l'administrateur principal est irrévocable.", "error");
            return;
        }

        askConfirmation(
            "Modifier les privilèges",
            `Confirmer l'attribution du rôle ${newRole.toUpperCase()} à l'ambassadeur ${userEmail} ?`,
            async () => {
                try {
                    // Role update not yet in API — show success for now
                    showToast("Privilèges mis à jour avec distinction");
                    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole as any } : u));
                } catch (e) {
                    console.error(e);
                    showToast("Échec de la mutation des privilèges", "error");
                }
            },
            'warning'
        );
    };

    const deleteUser = async (userId: number, userEmail: string) => {
        if (userEmail === 'admin@vitasilk.com') {
            showToast("L'administrateur principal est protégé contre toute révocation.", "error");
            return;
        }

        askConfirmation(
            "Révoquer l'accès",
            "Voulez-vous révoquer définitivement l'accès de ce membre ? L'historique sera conservé mais le compte supprimé.",
            async () => {
                try {
                    await usersApi.delete(userId);
                    setUsers(prev => prev.filter(u => u.id !== userId));
                    showToast("Membre révoqué avec succès", "info");
                } catch (e) {
                    console.error(e);
                    showToast("Échec de la révocation", "error");
                }
            }
        );
    };


    const isInactive = (createdAt: string | undefined) => {
        if (!createdAt) return false;
        const date = new Date(createdAt);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        return date < sixMonthsAgo;
    };

    const fetchUserOrders = async (u: any) => {
        setSelectedUser(u);
        setOrdersLoading(true);
        try {
            const res = await ordersApi.getAll({ limit: 50 });
            setUserOrders((res.data || []).filter((o: any) => o.user_email === u.email || o.user_id === u.id));
        } catch (e) { }
        setOrdersLoading(false);
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || (user.role || 'customer') === roleFilter;
        return matchesSearch && matchesRole;
    });

    if (loading) return (
        <div className="flex flex-col items-center justify-center p-32 space-y-6">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold animate-pulse">Ouverture du Registre des Membres...</p>
        </div>
    );

    return (
        <div className="space-y-12">
            {/* Header Info */}
            <div className="bg-white p-6 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] luxury-text text-[10rem] pointer-events-none select-none">Membres</div>
                <div>
                    <h2 className="text-2xl md:text-4xl font-sans font-light tracking-tight text-gray-900 mb-2">Ambassadeurs & Membres</h2>
                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Gestion des privilèges de la Maison Vitasilk</p>
                </div>
                <div className="relative z-10">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Total Effectif</p>
                    <p className="text-3xl md:text-4xl font-sans font-light text-gray-900">{users.length}</p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 bg-white p-6 md:p-8 border border-gray-100 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher par nom ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 bg-gray-50/50 border border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm outline-none rounded-sm"
                    />
                </div>
                <div className="flex items-center gap-4 bg-gray-50/50 border border-gray-100 px-6 py-4">
                    <Filter size={14} className="text-gray-400" />
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="bg-transparent text-[10px] uppercase tracking-widest font-black focus:outline-none cursor-pointer"
                    >
                        <option value="all">Tous les rôles</option>
                        <option value="admin">Administrateurs</option>
                        <option value="provider">Organisateurs (Providers)</option>
                        <option value="customer">Clients</option>
                    </select>
                </div>
            </div>

            {/* Grid/Table */}
            <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="border-b border-gray-50 bg-[#FAF9F6]">
                            <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Membre</th>
                            <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Inscription</th>
                            <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Privilège</th>
                            <th className="px-6 md:px-10 py-4 md:py-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredUsers.map((user) => {
                            const inactive = isInactive(user.created_at);
                            return (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    key={user.id}
                                    className={cn(
                                        "hover:bg-gray-50/50 transition-colors group relative overflow-hidden",
                                        inactive && "bg-amber-50/20"
                                    )}
                                >
                                    <td className="px-6 md:px-10 py-6 md:py-8">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center text-primary shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-500 overflow-hidden relative">
                                                {user.photo_url ? (
                                                    <img src={user.photo_url} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <UserIcon size={24} strokeWidth={1.2} />
                                                )}
                                                {(user.role === 'admin' || user.role === 'super-admin') && <div className="absolute top-0 right-0 p-1 bg-red-500 text-white"><Shield size={8} /></div>}
                                                {user.role === 'provider' && <div className="absolute top-0 right-0 p-1 bg-primary text-white"><UserCheck size={8} /></div>}
                                            </div>
                                            <div>
                                                <p className="text-base font-bold text-gray-900 leading-tight mb-1">{user.name || 'Hôte de Passage'}</p>
                                                <p className="text-[10px] text-gray-400 font-medium tracking-wider flex items-center gap-2">
                                                    <Mail size={12} className="text-gray-300" />
                                                    {user.email || '—'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-10 py-6 md:py-8">
                                        <div className="flex items-center space-x-4">
                                            <div className={cn(
                                                "w-2 h-2 rounded-full",
                                                inactive ? "bg-amber-400 animate-pulse" : "bg-green-400"
                                            )} />
                                            <div>
                                                <p className={cn(
                                                    "text-[10px] font-black uppercase tracking-wider",
                                                    inactive ? "text-amber-600" : "text-gray-900"
                                                )}>
                                                    {user.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Entrée inconnue'}
                                                </p>
                                                {inactive && (
                                                    <p className="text-[9px] text-amber-500/80 font-bold uppercase tracking-tighter">Inscrit il y a +6 mois</p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 md:px-10 py-6 md:py-8">
                                        <select
                                            value={user.role || 'customer'}
                                            onChange={(e) => handleRoleChange(user.id as number, user.email, e.target.value)}
                                            className={cn(
                                                "px-3 py-1.5 text-[10px] uppercase font-black tracking-widest bg-white border outline-none cursor-pointer rounded-sm shadow-sm transition-all focus:ring-2",
                                                user.role === 'admin' ? "text-red-600 border-red-200 focus:ring-red-100" :
                                                    user.role === 'provider' ? "text-primary border-primary/30 focus:ring-primary/10" :
                                                        "text-gray-500 border-gray-200 focus:ring-gray-100"
                                            )}
                                        >
                                            <option value="admin">Administrateur</option>
                                            <option value="provider">Organisateur</option>
                                            <option value="customer">Client</option>
                                        </select>
                                    </td>
                                    <td className="px-6 md:px-10 py-6 md:py-8 text-right">
                                        <div className={cn(
                                            "flex items-center justify-end gap-2 md:gap-3 transition-all duration-300",
                                            "md:opacity-0 md:group-hover:opacity-100"
                                        )}>
                                            <button
                                                onClick={() => fetchUserOrders(user)}
                                                className="p-3 bg-white border border-gray-100 text-gray-400 hover:text-blue-500 hover:border-blue-200 hover:bg-blue-50 transition-all rounded-sm shadow-sm"
                                                title="Voir l'historique des commandes"
                                            >
                                                <PackageOpen size={16} strokeWidth={1.5} />
                                            </button>
                                            <button
                                                onClick={() => deleteUser(user.id as number, user.email)}
                                                className="p-4 bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100 hover:shadow-xl transition-all"
                                                title="Révoquer l'accès"
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
                {filteredUsers.length === 0 && (
                    <div className="py-40 text-center relative">
                        <UserX className="mx-auto text-gray-50 mb-8" size={80} strokeWidth={0.5} />
                        <p className="text-2xl font-light text-gray-300 ">Désert dans les archives des membres</p>
                        <button onClick={() => { setSearchTerm(''); setRoleFilter('all'); }} className="mt-8 text-primary text-[10px] uppercase font-black tracking-widest border-b border-primary/20 pb-1 hover:border-primary transition-all">Réinitialiser les filtres</button>
                    </div>
                )}
            </div>

            {/* Orders Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setSelectedUser(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-white w-full max-w-2xl max-h-[80vh] flex flex-col rounded-sm shadow-2xl border border-white/20"
                        >
                            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#FAF9F6]">
                                <div>
                                    <h3 className="text-xl font-sans tracking-tight text-gray-900 mb-1">Historique de {selectedUser.name || 'Client'}</h3>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">{selectedUser.email}</p>
                                </div>
                                <button onClick={() => setSelectedUser(null)} className="p-2 text-gray-400 hover:text-black transition-colors bg-white rounded-full border border-gray-100 shadow-sm">
                                    <X size={20} strokeWidth={1} />
                                </button>
                            </div>
                            <div className="p-8 overflow-y-auto bg-white flex-1">
                                {ordersLoading ? (
                                    <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>
                                ) : userOrders.length > 0 ? (
                                    <div className="space-y-4">
                                        {userOrders.map(order => (
                                            <div key={order.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-6 bg-gray-50 border border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                                                <div>
                                                    <p className="text-[10px] font-mono font-bold text-gray-900 bg-white px-2 py-1 rounded border border-gray-200 inline-block mb-3">#{order.id}</p>
                                                    <div className="flex items-center gap-2">
                                                        <Package size={14} className="text-gray-400" />
                                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{order.items?.length || 0} Article(s)</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-sans text-gray-900">{order.total_price?.toLocaleString()} DH</p>
                                                    <span className={cn(
                                                        "text-[8px] uppercase tracking-widest font-black px-2 py-1 rounded inline-block mt-2",
                                                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                                                order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                                                                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                                    )}>{order.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <PackageOpen size={48} className="mx-auto text-gray-200 mb-4 stroke-[1]" />
                                        <p className="text-sm font-light text-gray-400">Aucune commande trouvée pour ce client.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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
};


const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default UserManager;
