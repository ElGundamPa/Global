import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
  ],
};

export const metadata: Metadata = {
  title: "Fortune Global - Invierte con visión, crece con propósito",
  description: "Invierte desde $500 en acciones, criptomonedas y divisas. Plataforma segura con IA, datos en tiempo real y educación financiera premium. Únete a más de 50,000 inversores.",
  keywords: "inversiones desde 500 dólares, trading online, criptomonedas, acciones, forex, inteligencia artificial inversiones, plataforma de inversión, Fortune Global",
  authors: [{ name: "Fortune Global" }],
  openGraph: {
    title: "Fortune Global - Invierte con visión, crece con propósito",
    description: "Invierte desde $500 en mercados globales con la plataforma más innovadora del mercado.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortune Global - Inversiones inteligentes desde $500",
    description: "Plataforma de inversión con IA, datos en tiempo real y seguridad bancaria.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


