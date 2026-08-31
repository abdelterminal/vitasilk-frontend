import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { DiscountProvider } from "@/context/DiscountContext";
import AppLayout from "@/components/AppLayout";
import fs from "fs";
import path from "path";

function getPixelId(): string {
  try {
    const p = path.join(process.cwd(), "data", "tracking-config.json");
    if (!fs.existsSync(p)) return "";
    const cfg = JSON.parse(fs.readFileSync(p, "utf-8"));
    return (cfg.meta_pixel_id || "").trim();
  } catch {
    return "";
  }
}

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

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pixelId = getPixelId();
  return (
    <>
      {pixelId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');`}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
      <div className={`${playfair.variable} ${poppins.variable} antialiased text-gray-900 bg-white`}>
        <AuthProvider>
          <DiscountProvider>
            <CartProvider>
              <WishlistProvider>
                <AppLayout>{children}</AppLayout>
              </WishlistProvider>
            </CartProvider>
          </DiscountProvider>
        </AuthProvider>
      </div>
    </>
  );
}
