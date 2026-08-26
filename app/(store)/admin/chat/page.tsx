"use client";

import AdminLayout from '@/components/admin/AdminLayout';
import ChatManager from '@/components/admin/ChatManager';
import AdminGuard from '@/components/AdminGuard';

export default function AdminChatPage() {
    return (
        <AdminGuard>
            <AdminLayout 
                title="Salon de Conversation VIP" 
                subtitle="Gestion des échanges en temps réel avec les membres Elite."
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                    <ChatManager />
                </div>
            </AdminLayout>
        </AdminGuard>
    );
}