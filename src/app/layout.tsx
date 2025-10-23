import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import ThemeToggle from '@/app/components/ThemeToggle';
import GoogleAnalytics from '@/app/components/GoogleAnalytics';
import { Analytics } from '@vercel/analytics/next';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Albi Nur Portfolio',
  description: 'My personal portfolio showcasing projects and skills.',
  verification: { google: 'FMrUmPZzKPul48fYnMY8yGvJbZC5hJpp7v1vQ-mjfow' },
  openGraph: {
    title: 'Albi Nur Portfolio',
    description: 'Portfolio of Albi Nur Rosif, a web developer specializing in React...',
    url: 'https://albinur.vercel.app',
    siteName: 'Albinur Portfolio',
    images: [
      {
        url: '/public/project/Dashboard-Admin-Web-Inventaris-SMKN-1-Sumenep-09-25-2025_06_42_PM.png',
        width: 1200,
        height: 630,
        alt: 'Albinur Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider>
          {process.env.NODE_ENV === 'production' && <GoogleAnalytics />}
          {children}
          <ThemeToggle />
        </ThemeProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
