import type { Metadata } from 'next'
import { Archivo, Inter_Tight } from 'next/font/google'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-archivo',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter-tight',
})

const SITE_NAME = 'Yenzo Gervacio'
const TITLE = 'Yenzo Gervacio — Jr. Software Engineer'
const DESCRIPTION =
  'Portfolio of Yenzo Gervacio, Jr. Software Engineer specializing in AI-powered systems, TypeScript, React & Django.'

// Production origin. NEXT_PUBLIC_SITE_URL overrides it (e.g. for a custom domain).
const PRODUCTION_URL = 'https://portfolio-g139.vercel.app'
const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL)

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_PH',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${interTight.variable}`}>
      <body>{children}</body>
    </html>
  )
}
