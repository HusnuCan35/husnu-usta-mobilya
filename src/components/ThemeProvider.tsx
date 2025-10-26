'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Theme } from '@/types'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isDark: boolean
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const systemTheme = prefersDark ? 'dark' : 'light'
      setTheme(systemTheme)
      localStorage.setItem('theme', systemTheme)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement
      
      // Remove previous theme classes
      root.classList.remove('light', 'dark')
      
      // Add current theme class
      root.classList.add(theme)
      
      // Set data attribute for compatibility
      root.setAttribute('data-theme', theme)
      
      // Save to localStorage
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ 
        theme: 'light', 
        toggleTheme: () => {}, 
        isDark: false,
        setTheme: () => {}
      }}>
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      isDark: theme === 'dark',
      setTheme: handleSetTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}