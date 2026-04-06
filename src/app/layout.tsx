import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "FCAMP | Adventist Youth Ministry",
  description: "Event registration and management for FCAMP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} bg-background text-on-surface font-body selection:bg-primary-container selection:text-white antialiased`}
      >
        <nav className="fixed top-0 w-full z-50 bg-[#f4f2ee] border-b border-outline-variant/20 shadow-sm">
          <div className="flex justify-between items-center px-4 sm:px-6 py-2 max-w-7xl mx-auto">
            <a href="/" className="relative flex items-center h-12 w-24 sm:h-16 sm:w-40 z-50">
              <img 
                src="/logo.png" 
                alt="FCAMP Logo" 
                className="absolute top-1/2 left-0 -translate-y-1/2 h-32 sm:h-48 w-auto object-contain mix-blend-multiply pointer-events-none" 
              />
            </a>
            <div className="hidden lg:flex items-center space-x-8">
              <a
                className="text-orange-600 dark:text-orange-400 font-bold border-b-2 border-orange-600 transition-colors"
                href="/"
              >
                About
              </a>
              <a
                className="text-slate-600 dark:text-slate-400 font-medium hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
                href="#"
              >
                Camps
              </a>
              <a
                className="text-slate-600 dark:text-slate-400 font-medium hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
                href="#"
              >
                Schedule
              </a>
              <a
                className="text-slate-600 dark:text-slate-400 font-medium hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
                href="#"
              >
                Community
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/register"
                className="bg-primary-container text-on-primary font-bold px-6 py-2.5 rounded-lg active:scale-95 duration-150 transition-all shadow-lg shadow-primary/20 inline-block"
              >
                Register
              </a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-slate-50 dark:bg-slate-950 w-full border-t border-slate-200/15">
          <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 w-full max-w-7xl mx-auto">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100 font-headline mb-2 block">
                FCAMP
              </span>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-xs font-body">
                Inspiring the next generation through nature-driven faith
                adventures.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-8 md:mb-0">
              <a
                className="text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors text-sm font-medium"
                href="#"
              >
                Privacy Policy
              </a>
              <a
                className="text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors text-sm font-medium"
                href="#"
              >
                Terms of Service
              </a>
              <a
                className="text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors text-sm font-medium"
                href="#"
              >
                Contact Us
              </a>
              <a
                className="text-slate-500 dark:text-slate-400 hover:text-orange-500 transition-colors text-sm font-medium"
                href="#"
              >
                Ministry Map
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 font-body">
                © 2024 FCAMP Adventist Youth Ministry. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
