import { Suspense } from 'react'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import { Header } from '@/components/Header'
import { About } from '@/components/About'
import { Footer } from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import './globals.css'

const jetbrains = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vitor Britto',
  description: 'Um blog sobre tecnologia e carreira. 🚀',
  keywords: ['Vitor Britto', 'blog', 'tecnologia', 'carreira'],
  metadataBase: new URL('https://vitorbritto.dev'),
  icons: {
    icon: '/favicon.png'
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://vitorbritto.dev',
    title: 'Vitor Britto',
    description: 'Um blog sobre tecnologia e carreira. 🚀',
    siteName: 'Vitor Britto',
    images: [
      {
        url: '/preview.png',
        width: 800,
        height: 600,
        alt: 'Vitor Britto Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vitor Britto',
    description: 'Um blog sobre tecnologia e carreira. 🚀',
    images: ['/preview.png']
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <Suspense>
          <GoogleAnalytics />
        </Suspense>
      </head>
      <body className={`${jetbrains.className} bg-zinc-950 text-zinc-100 pt-12`}>
        <Header />
        {children}
        <About />
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
