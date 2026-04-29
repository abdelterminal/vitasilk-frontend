"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
 const { userData, loading } = useAuth();
 const router = useRouter();

 useEffect(() => {
 if (loading) return;
 if (!userData) { router.push('/login'); return; }
 if (userData.role === 'provider') { router.push('/agent'); return; }
 if (!['admin', 'super-admin'].includes(userData.role)) router.push('/login');
 }, [userData, loading, router]);

 if (loading) {
 return (
 <div className="min-h-screen bg-white flex items-center justify-center">
 <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
 </div>
 );
 }

 const allowedRoles = ['admin', 'super-admin'];
 if (userData && allowedRoles.includes(userData.role)) {
 return <>{children}</>;
 }

 return null;
};

export default AdminGuard;
