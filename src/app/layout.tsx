// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/animations/ui/Navbar'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Marième Ndiaye - Étudiante en Génie Logiciel',
  description: 'Portfolio de Marième Ndiaye , étudiante en 3ème année de génie logiciel. Développeuse full-stack passionnée.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 transition-colors`}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <footer className="border-t py-8 text-center text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} Marième Ndiaye . Tous droits réservés.</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}