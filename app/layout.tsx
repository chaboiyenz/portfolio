import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import FirstLoadMarker from '@/components/motion/FirstLoadMarker'
import { a11y } from '@/data/site'
import { rootMetadata } from '@/lib/metadata'
import './globals.css'

// Variable Inter with the optical-size axis: display sizes render with the
// tighter Display cut, text sizes with the open Text cut, as SF does.
const inter = Inter({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-inter',
})

// Site-wide defaults (metadataBase, title template, Open Graph, Twitter).
// Each route overrides title, description, canonical, and OG URL.
export const metadata: Metadata = rootMetadata

export const viewport: Viewport = {
  // Paint edge to edge under the notch / home indicator; the header, gutters,
  // footer, and menu panel pad their content back out with env(safe-area-*).
  viewportFit: 'cover',
  // Android Chrome: the on-screen keyboard resizes the layout viewport, as on iOS.
  interactiveWidget: 'resizes-content',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f5f7' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a
          href="#main"
          className="sr-only z-100 rounded-full bg-surface px-4 py-2 text-callout font-medium shadow-float focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {a11y.skipToContent}
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <FirstLoadMarker />
      </body>
    </html>
  )
}
