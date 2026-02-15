import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Manage your personal notes",
};

export default function RootLayout({
  children,
  modal, // Додаємо цей проп для паралельного маршруту модалки
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode; // Типізуємо слот модалки
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanStackProvider>
          <Header />
          {/* Основний контент сторінки */}
          {children}
          
          {/* Слот для модального вікна (Intercepted Route) */}
          {modal}
          
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}