'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import { SearchProvider } from "./components/context/SearchContext";
import { CarProvider } from "./components/context/CarContext";
import AuthProvider from "./providers/SessionProvider";
import ProtectedRoute from "./components/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

// Note: metadata needs to be moved to a separate file when using 'use client'
// as it can't be exported from a client component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProtectedRoute>
            <CarProvider>
              <SearchProvider>
                <Header />
                {children}
                <Footer />
              </SearchProvider>
            </CarProvider>
          </ProtectedRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
