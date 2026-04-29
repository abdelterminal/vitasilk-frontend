"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const AgentGuard = ({ children }: { children: React.ReactNode }) => {
  const { userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!userData) { router.push('/login'); return; }
    if (userData.role !== 'provider') router.push('/login');
  }, [userData, loading, router]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (userData?.role === 'provider') return <>{children}</>;
  return null;
};

export default AgentGuard;
