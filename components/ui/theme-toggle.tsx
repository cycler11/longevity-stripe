"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme") as "light" | "dark" | null
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initialTheme = stored || systemPreference
    setTheme(initialTheme)
    // Apply to document element
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/10 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/20 ${className}`}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-foreground transition-transform duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-foreground transition-transform duration-300" />
      )}
    </button>
  )
}
