import type { Metadata } from "next";
import { Fredoka, Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Crochetti - Partagez vos créations crochet",
  description: "Rejoignez la communauté des passionnés du crochet. Découvrez et partagez des créations, patrons, et connectez-vous avec des créateurs du monde entier.",
  keywords: ["crochet", "fait main", "amigurumi", "patrons", "créations", "artisanat", "handmade", "crafts"],
  authors: [{ name: "Crochetti Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Crochetti - Partagez vos créations crochet",
    description: "Rejoignez la communauté des passionnés du crochet",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crochetti - Partagez vos créations crochet",
    description: "Rejoignez la communauté des passionnés du crochet",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${fredoka.variable} ${openSans.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
