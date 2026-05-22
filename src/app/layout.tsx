import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/animations/ui/Navbar'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import Footer from '@/components/layout/Footer'
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: 'Marième Ndiaye | Portfolio Ingénieure Logiciel',
  description: 'Portfolio professionnel de Marième Ndiaye, développeuse full-stack orientée produit, performance et qualité logicielle.',
  keywords: ['développeuse full-stack', 'Next.js', 'React', 'TypeScript', 'portfolio'],
  authors: [{ name: 'Marième Ndiaye' }],
  openGraph: {
    title: 'Marième Ndiaye | Portfolio Ingénieure Logiciel',
    description: 'Portfolio professionnel de Marième Ndiaye, développeuse full-stack.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={styles.html}>
      <body className={`${styles.body} text-slate-900 dark:text-slate-100 antialiased`}>
        <ThemeProvider>
          <div className={styles.layout}>
            {/* Effets d'arrière-plan */}
            <div className={styles.background}>
              <div className={styles.gradientBg} />
              <div className={styles.gradientOrb1} />
              <div className={styles.gradientOrb2} />
              <div className={styles.gridPattern} />
              <div className={styles.grain} />
            </div>

            {/* Contenu principal */}
            <div className={styles.content}>
              <Navbar />
              <main className={styles.main}>{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}