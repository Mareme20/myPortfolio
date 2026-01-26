'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // 1. Montage du composant
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') as Theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (stored) {
      setTheme(stored)
    } else if (prefersDark) {
      setTheme('dark')
    }
  }, [])

  // 2. Application du thème sur le document
  useEffect(() => {
    if (!mounted) return
    
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // 3. Rendu : On retourne TOUJOURS le Provider pour éviter les erreurs de contexte.
  // On utilise une petite astuce pour éviter le flash blanc (suppressHydrationWarning)
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ opacity: mounted ? 1 : 0 }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme doit être utilisé à l'intérieur d'un ThemeProvider")  }
  return context
}
