import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { Providers } from "~/trpc/react";
import { SessionProvider } from 'next-auth/react';
import Navbar from "./_components/navbar/navbar";
import Footer from "./_components/footer";
import { Toaster } from "~/components/ui/toaster";
import { ThemeProvider } from "~/components/theme-provider";

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
        <main className="relative flex flex-col min-h-screen " style={{ width: "100%" }}>
          <Providers>
            <Navbar />
            <div className=" px-[10%] py-10 h-full  w-full overflow-hidden">{children}</div>
            <Toaster />
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
