import { Vazirmatn } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MouseSpotlight } from "@/components/ui/MouseSpotlight";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata = {
  title: "مرکز آموزشی عترت علم | Etrat Elm Educational Center",
  description:
    "وبسایت رسمی مرکز آموزشی عترت علم - ارائه دهنده خدمات آموزشی با کیفیت در افغانستان",
  other: {
    "google-site-verification": "j8s7x479k6Q_oYO_HeDEpBRG6WGU2hmI00ucVeFRJ78",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-AF" dir="rtl">
      <body
        suppressHydrationWarning={true}
        className={`${vazirmatn.variable} antialiased min-h-screen bg-background text-foreground flex flex-col`}
      >
        <MouseSpotlight />
        <Header />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
