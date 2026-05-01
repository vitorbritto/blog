import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import { Header } from '@/components/Header'
import { LanguageProvider } from '@/components/LanguageProvider'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Vitor Britto',
  description: 'Thoughts on technology, development, and software engineering.',
  keywords: ['Vitor Britto', 'blog', 'technology', 'software engineering'],
  metadataBase: new URL('https://vitorbritto.dev'),
  icons: {
    icon: '/favicon.png'
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://vitorbritto.dev',
    title: 'Vitor Britto',
    description: 'Thoughts on technology, development, and software engineering.',
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
    description: 'Thoughts on technology, development, and software engineering.',
    images: ['/preview.png']
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Suspense>
          <GoogleAnalytics />
        </Suspense>
      </head>
      <body className={`${inter.className} ${jetbrainsMono.variable} bg-[#161718] text-zinc-100 antialiased`}>
        <LanguageProvider>
          <Header />
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  )
}
