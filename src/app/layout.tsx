import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Hüsnü Usta Mobilya - Kaliteli ve Özel Tasarım Mobilyalar',
  description: '30 yıllık deneyimimizle kaliteli ve özel tasarım mobilyalar üretiyoruz. Yatak odası, oturma grubu, yemek odası ve daha fazlası.',
  keywords: 'mobilya, yatak odası, oturma grubu, yemek odası, özel tasarım, kaliteli mobilya, İstanbul mobilya, ahşap mobilya, modern mobilya',
  authors: [{ name: 'Hüsnü Usta Mobilya' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Hüsnü Usta Mobilya - Kaliteli ve Özel Tasarım Mobilyalar',
    description: '30 yıllık deneyimimizle kaliteli ve özel tasarım mobilyalar üretiyoruz.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Hüsnü Usta Mobilya',
    url: 'https://husnuustamobilya.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hüsnü Usta Mobilya - Kaliteli ve Özel Tasarım Mobilyalar',
    description: '30 yıllık deneyimimizle kaliteli ve özel tasarım mobilyalar üretiyoruz.',
  },
  alternates: {
    canonical: 'https://husnuustamobilya.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background-primary dark:bg-gray-900 text-text-primary dark:text-gray-100">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}