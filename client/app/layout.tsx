import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { ErrorBoundary } from "@/components/error-boundary"

import { Inter as V0_Font_Inter, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _inter = V0_Font_Inter({ subsets: ['latin'], variable: '--font-inter' })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif-4' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dipakkhandagale.vercel.app'),
  title: {
    default: "Dipak Khandagale | AI Engineer & Data Analyst",
    template: "%s | Dipak Khandagale"
  },
  description: "Portfolio of Dipak Khandagale showcasing AI Engineering, Machine Learning, Data Analytics, Computer Vision, Deepfake Detection, Generative AI, and Business Intelligence projects.",
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  // SEO enhancements
  keywords: ["AI Engineer", "Data Analyst", "Machine Learning Engineer", "Generative AI", "LLM", "Computer Vision", "Deep Learning", "FastAPI", "Python Developer", "Power BI", "SQL", "Artificial Intelligence Portfolio"],
  authors: [{ name: "Dipak Khandagale" }],
  creator: "Dipak Khandagale",
  openGraph: {
    title: "Dipak Khandagale | AI Engineer & Data Analyst",
    description: "Portfolio of Dipak Khandagale showcasing AI Engineering, Machine Learning, Data Analytics, Computer Vision, Deepfake Detection, Generative AI, and Business Intelligence projects.",
    type: "website",
    locale: "en_US",
    siteName: "Dipak Khandagale Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dipak Khandagale | AI Engineer & Data Analyst",
    description: "Portfolio of Dipak Khandagale showcasing AI Engineering, Machine Learning, Data Analytics, Computer Vision, Deepfake Detection, Generative AI, and Business Intelligence projects.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'o46GORB28vA9_xhuOuPGtH8N2zZjd_xMQoaShp8NE54',
  },
}

/**
 * Root Layout
 * 
 * Note: ProjectProvider has been removed as all data is now fetched
 * at build time via ISR in individual page components.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_inter.variable} ${_geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
