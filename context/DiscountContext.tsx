"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { eventsApi, type UserDiscount as ApiUserDiscount } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export interface UserDiscount {
  percentage: number;
  eventId: string | number;
  wonAt: number;
  eventName?: string;
}

interface DiscountContextType {
  discounts: UserDiscount[];
  discount: UserDiscount | null;
  selectedEventId: string | number | null;
  selectDiscount: (eventId: string | number) => void;
  setWin: (percentage: number, eventId: string | number, eventName?: string) => Promise<void>;
  isLoading: boolean;
  refreshDiscounts: () => Promise<void>;
}

const DiscountContext = createContext<DiscountContextType | undefined>(undefined);

export const DiscountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [discounts, setDiscounts] = useState<UserDiscount[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | number | null>(null);
  const [activeEventId, setActiveEventId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDiscounts = async () => {
    if (!user) {
      setDiscounts([]);
      return;
    }
    setIsLoading(true);
    try {
      const res = await eventsApi.getMyDiscounts();
      const mapped: UserDiscount[] = res.data.map((d: ApiUserDiscount) => ({
        percentage: d.percentage,
        eventId: d.event_id ?? 0,
        wonAt: d.won_at ? new Date(d.won_at).getTime() : Date.now(),
        eventName: d.event_name,
      }));
      setDiscounts(mapped);
    } catch {
      setDiscounts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActiveEvent = async () => {
    try {
      const res = await eventsApi.getActive();
      setActiveEventId(res.data?.id ?? null);
    } catch {
      setActiveEventId(null);
    }
  };

  useEffect(() => {
    fetchActiveEvent();
  }, []);

  useEffect(() => {
    fetchDiscounts();
  }, [user]);

  const discount = useMemo<UserDiscount | null>(() => {
    if (activeEventId === null) return null;
    const active = discounts.filter(d => Number(d.eventId) === activeEventId);
    if (active.length === 0) return null;
    if (selectedEventId) {
      const found = active.find(d => d.eventId === selectedEventId);
      if (found) return found;
    }
    return active.sort((a, b) => b.wonAt - a.wonAt)[0];
  }, [discounts, selectedEventId, activeEventId]);

  const selectDiscount = (eventId: string | number) => {
    setSelectedEventId(eventId);
  };

  const setWin = async (percentage: number, eventId: string | number, eventName?: string) => {
    if (!user) return;
    await eventsApi.recordDiscount(Number(eventId), percentage);
    await fetchDiscounts();
    setSelectedEventId(eventId);
  };

  return (
    <DiscountContext.Provider value={{
      discounts,
      discount,
      selectedEventId,
      selectDiscount,
      setWin,
      isLoading,
      refreshDiscounts: fetchDiscounts,
    }}>
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscount = () => {
  const context = useContext(DiscountContext);
  if (context === undefined) {
    throw new Error('useDiscount must be used within a DiscountProvider');
  }
  return context;
};
