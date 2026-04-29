"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import DiscountSelector from "@/components/ui/DiscountSelector";
import NoSsr from "@/components/NoSsr";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/register";
    const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/agent");

    return (
        <>
            {!isAuthPage && !isAdminPage && <div className="no-print"><Navbar /></div>}
            {children}
            {/* Temporarily disabled widgets to debug white screen */}
            {!isAuthPage && !isAdminPage && (
                <NoSsr>
                    <div className="no-print"><DiscountSelector /></div>
                    <div className="no-print"><WhatsAppWidget /></div>
                </NoSsr>
            )}
            {!isAuthPage && !isAdminPage && <div className="no-print"><Footer /></div>}
        </>
    );
}
