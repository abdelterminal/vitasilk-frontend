import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { DiscountProvider } from "@/context/DiscountContext";
import AppLayout from "@/components/AppLayout";

export const metadata: Metadata = {
  title: "Vitasilk | Luxury Beauty & Hair Care",
  description: "Experience the pinnacle of beauty with Vitasilk. Premium hair care, professional tools, and exclusive sets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-900 bg-white" suppressHydrationWarning>
        <AuthProvider>
          <DiscountProvider>
            <CartProvider>
              <WishlistProvider>
                <AppLayout>{children}</AppLayout>
              </WishlistProvider>
            </CartProvider>
          </DiscountProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
