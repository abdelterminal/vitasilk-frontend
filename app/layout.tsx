import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { DiscountProvider } from "@/context/DiscountContext";
import AppLayout from "@/components/AppLayout";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Vitasilk | Lissage & Soins Capillaires Professionnels",
  description: "Des produits professionnels pour lisser et prendre soin de vos cheveux. Livraison rapide partout au Maroc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${poppins.variable}`}>
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
