import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { Providers } from "~/trpc/react";
import { SessionProvider } from 'next-auth/react';
import Navbar from "./_components/navbar/navbar";
import Footer from "./_components/footer";
import { Toaster } from "~/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "IITB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative h-full font-sans ${inter.variable}`}>
        <main className="relative flex flex-col min-h-screen">
          <Providers>
            <Navbar />
            <div className="flex-grow px-[20%] py-10 flex-1  min-w-full overflow-hidden">{children}</div>
            <Footer />
            <Toaster />
          </Providers>
        </main>
      </body>
    </html>
  );
}
