"use client"

import React, { useEffect, useState, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react"

// Navigation items matching portfolio structure
const NAV_ITEMS = [
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "certificates", label: "Certifications", href: "#certificates" },
]

const SOCIAL_LINKS = {
  github: "https://github.com/Dipakk7",
  linkedin: "https://linkedin.com/in/dipakkhandagale",
}

/**
 * Scrollspy hook to detect active section using scroll position + offset
 */
function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("")
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("")
      return
    }

    const sectionIds = ["hero", "about", "projects", "skills", "certificates", "contact"]
    
    // Map section IDs to primary nav item IDs
    const sectionToNavMap: Record<string, string> = {
      about: "about",
      projects: "projects",
      skills: "skills",
      certificates: "certificates",
    }

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const windowHeight = window.innerHeight

          // Check if at the very top (Hero)
          if (scrollY < 120) {
            setActiveSection("")
            ticking = false
            return
          }

          // Active detection line at ~35% down viewport
          const triggerLine = scrollY + windowHeight * 0.35

          let currentActive = ""
          for (const id of sectionIds) {
            const el = document.getElementById(id)
            if (el) {
              const top = el.offsetTop
              const height = el.offsetHeight
              if (triggerLine >= top && triggerLine < top + height) {
                currentActive = sectionToNavMap[id] || ""
              }
            }
          }

          setActiveSection(currentActive)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })
    handleScroll()

    const timer = setTimeout(handleScroll, 500)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      clearTimeout(timer)
    }
  }, [pathname])

  return activeSection
}

export function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const activeSection = useActiveSection()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (isHome && href.startsWith("#")) {
        e.preventDefault()
        const targetId = href.replace("#", "")
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" })
          // Update URL hash without jumping
          window.history.pushState(null, "", href)
        }
        setMobileMenuOpen(false)
      } else {
        setMobileMenuOpen(false)
      }
    },
    [isHome]
  )

  const scrollToTop = useCallback(
    (e: React.MouseEvent) => {
      if (isHome) {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "smooth" })
        window.history.pushState(null, "", "/")
      }
      setMobileMenuOpen(false)
    },
    [isHome]
  )

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-xs dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* ============================================================ */}
          {/* LEFT: Official Logo + Dipak Branding                        */}
          {/* ============================================================ */}
          <Link
            href="/"
            onClick={scrollToTop}
            className="group flex items-center select-none outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1 -ml-1 transition-transform active:scale-95 shrink-0"
            aria-label="Dipak Khandagale - AI/ML Engineer"
          >
            {/* Official Logo Artwork (DK | DIPAK) */}
            <div className="relative h-7 sm:h-8 w-[128px] sm:w-[146px] shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/brand/dk-brand-dark.png"
                alt="Dipak"
                fill
                priority
                sizes="(max-width: 768px) 130px, 150px"
                className="hidden dark:block object-contain object-left"
              />
              <Image
                src="/brand/dk-brand-light.png"
                alt="Dipak"
                fill
                priority
                sizes="(max-width: 768px) 130px, 150px"
                className="block dark:hidden object-contain object-left"
              />
            </div>
          </Link>

          {/* ============================================================ */}
          {/* CENTER: Clean Navigation (Desktop & Tablet)                  */}
          {/* ============================================================ */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 p-1 rounded-full bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-md shadow-inner"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              const itemHref = isHome ? item.href : `/${item.href}`

              return (
                <a
                  key={item.id}
                  href={itemHref}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 rounded-full select-none outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive
                      ? "text-zinc-950 dark:text-white font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  {/* Subtle active pill highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-xs border border-zinc-200/80 dark:border-zinc-700/80"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              )
            })}
          </nav>

          {/* ============================================================ */}
          {/* RIGHT: GitHub + LinkedIn + Theme Toggle                     */}
          {/* ============================================================ */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Desktop Social Icons */}
            <div className="hidden sm:flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dipak Khandagale GitHub Profile"
                title="GitHub Profile"
                className="p-2 rounded-full hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95"
              >
                <Github className="w-4 h-4 stroke-[2]" />
              </a>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dipak Khandagale LinkedIn Profile"
                title="LinkedIn Profile"
                className="p-2 rounded-full hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95"
              >
                <Linkedin className="w-4 h-4 stroke-[2]" />
              </a>
            </div>

            {/* Subtle Divider (Desktop) */}
            <div className="hidden sm:block w-[1px] h-5 bg-zinc-200 dark:bg-zinc-800 my-auto" />

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={mounted ? (resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode") : "Toggle Theme"}
              title={mounted ? (resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode") : "Toggle Theme"}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95 relative"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mounted && resolvedTheme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Sun className="w-4 h-4 stroke-[2] text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0.5, opacity: 0, rotate: 45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Moon className="w-4 h-4 stroke-[2] text-zinc-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5 stroke-[2]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5 stroke-[2]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE MENU DRAWER / DROPDOWN                                */}
      {/* ============================================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl"
          >
            <div className="px-5 py-6 space-y-4 max-w-7xl mx-auto">
              {/* Nav Links */}
              <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id
                  const itemHref = isHome ? item.href : `/${item.href}`

                  return (
                    <a
                      key={item.id}
                      href={itemHref}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-[15px] font-medium transition-all ${
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                      )}
                    </a>
                  )
                })}
              </nav>

              {/* Mobile Divider */}
              <div className="h-[1px] bg-zinc-200/70 dark:bg-zinc-800/70 my-2" />

              {/* Social Quick Links */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 ml-auto" />
                </a>

                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 ml-auto" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
