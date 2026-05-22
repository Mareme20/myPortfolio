'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon, Compass } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/providers/ThemeProvider'
import styles from './Navbar.module.css'

const navItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Projets', path: '/projects' },
  { name: 'À propos', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={styles.header}
    >
      <div className={styles.container}>
        <div className={styles.glass}>
          <Link href="/" className={styles.brand}>
            <span className={styles.logo}>
              <Compass className="h-4 w-4" />
              <div className={styles.logoGlow} />
            </span>
            <div className={styles.brandText}>
              <p className={styles.label}>Portfolio</p>
              <p className={styles.name}>Marieme Ndiaye</p>
            </div>
          </Link>

          <nav className={styles.desktopNav}>
            <div className={styles.navList}>
              {navItems.map((item) => {
                const active = pathname === item.path
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
                  >
                    <span className={styles.navLinkText}>{item.name}</span>
                    {active && <span className={styles.activeIndicator} />}
                  </Link>
                )
              })}
            </div>

            <div className={styles.actions}>
              <button
                onClick={toggleTheme}
                className={styles.iconButton}
                aria-label="Changer le thème"
              >
                <span className={styles.iconWrapper}>
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </span>
              </button>

              <a href="/resume.pdf" download className={styles.primaryButton}>
                <span className={styles.buttonContent}>
                  <span>Télécharger CV</span>
                  <svg className={styles.buttonArrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className={styles.buttonGlow} />
              </a>
            </div>
          </nav>

          <div className={styles.mobileActions}>
            <button
              onClick={toggleTheme}
              className={styles.iconButton}
              aria-label="Changer le thème"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen((v) => !v)}
              className={styles.iconButton}
              aria-label="Ouvrir le menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={styles.mobileMenu}
            >
              <div className={styles.mobileMenuInner}>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`${styles.mobileLink} ${
                        pathname === item.path ? styles.mobileLinkActive : ''
                      }`}
                    >
                      <span className={styles.mobileLinkNumber}>0{index + 1}</span>
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <a href="/resume.pdf" download className={styles.primaryButton}>
                    <span className={styles.buttonContent}>
                      <span>Télécharger CV</span>
                      <svg className={styles.buttonArrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}