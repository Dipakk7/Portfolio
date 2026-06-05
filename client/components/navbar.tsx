"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  Home, User, Briefcase, Zap, GitFork,
  Award, BookOpen, Mail, Sun, Moon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

// Sections definitions matching the portfolio layout
const SECTIONS = [
  { id: "hero", label: "Home", icon: <Home /> },
  { id: "about", label: "About", icon: <User /> },
  { id: "skills", label: "Skills", icon: <Zap /> },
  { id: "projects", label: "Projects", icon: <GitFork /> },
  { id: "experience", label: "Experience", icon: <Briefcase /> },
  { id: "blogs", label: "Research", icon: <BookOpen /> },
  { id: "certificates", label: "Certificates", icon: <Award /> },
  { id: "contact", label: "Contact", icon: <Mail /> },
]

/**
 * Scrollspy hook to detect and highlight active section on scroll dynamically
 */
function useActiveSection() {
  const [active, setActive] = useState("hero")
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // If at the very bottom, highlight the last section (Contact)
          if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            setActive("contact")
            ticking = false
            return
          }

          // Use 1/3 viewport offset for active section trigger line
          const scrollPosition = window.scrollY + window.innerHeight / 3

          for (const section of SECTIONS) {
            const el = document.getElementById(section.id)
            if (el) {
              const top = el.offsetTop
              const height = el.offsetHeight
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActive(section.id)
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)
    
    // Run initial checks
    handleScroll()
    const timeout = setTimeout(handleScroll, 600) // account for Suspense/late hydration

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      clearTimeout(timeout)
    }
  }, [pathname])

  return active
}

/**
 * Main Navbar - Renders a premium floating dock inspired by macOS.
 */
export function Navbar() {
  const activeId = useActiveSection()
  const pathname = usePathname()
  const isHome = pathname === "/"
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (isHome) {
      const hash = window.location.hash
      if (hash) {
        const id = hash.replace("#", "")
        const interval = setInterval(() => {
          const el = document.getElementById(id)
          if (el) {
            el.scrollIntoView({ behavior: "smooth" })
            clearInterval(interval)
          }
        }, 100)
        setTimeout(() => clearInterval(interval), 3000)
      }
    }
  }, [isHome])

  const mouseX = useMotionValue(Infinity)

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const items = SECTIONS.map(s => ({
    id: s.id,
    title: s.label,
    icon: s.icon,
    href: isHome ? `#${s.id}` : `/#${s.id}`,
    onClick: (e: React.MouseEvent) => handleNavClick(s.id, e),
    isActive: activeId === s.id
  }))

  return (
    <motion.div
      initial={{ y: 80, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.1 }}
      className="fixed bottom-6 left-1/2 z-50 pointer-events-none"
    >
      {/* Desktop Floating Dock */}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="hidden md:flex h-16 items-end gap-2 lg:gap-3 px-4 pb-3 rounded-2xl bg-white/60 dark:bg-black/60 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/5 shrink-0"
      >
        {items.map((item) => (
          <DockIcon
            key={item.id}
            mouseX={mouseX}
            {...item}
          />
        ))}

        {/* Vertical Divider */}
        <div className="w-[1px] h-8 bg-zinc-200 dark:bg-zinc-800 mb-1 shrink-0" />

        {/* Theme Toggle in Dock */}
        <DockIcon
          mouseX={mouseX}
          id="theme-toggle"
          title="Theme"
          icon={mounted && resolvedTheme === "dark" ? <Sun /> : <Moon />}
          href="#"
          onClick={(e) => {
            e.preventDefault()
            toggleTheme()
          }}
          isActive={false}
        />
      </motion.div>

      {/* Mobile Floating Dock */}
      <div
        className="flex md:hidden h-12 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl pointer-events-auto max-w-[95vw] overflow-x-auto no-scrollbar shrink-0"
      >
        {items.map((item) => (
          <MobileDockIcon
            key={item.id}
            {...item}
          />
        ))}

        {/* Small vertical divider */}
        <div className="w-[1px] h-5 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

        {/* Mobile Theme Toggle */}
        <MobileDockIcon
          id="theme-toggle"
          title="Theme"
          icon={mounted && resolvedTheme === "dark" ? <Sun /> : <Moon />}
          href="#"
          onClick={(e) => {
            e.preventDefault()
            toggleTheme()
          }}
          isActive={false}
        />
      </div>
    </motion.div>
  )
}

interface DockIconProps {
  mouseX: MotionValue
  id: string
  title: string
  icon: React.ReactNode
  href: string
  onClick: (e: React.MouseEvent) => void
  isActive: boolean
}

function DockIcon({ mouseX, id, title, icon, href, onClick, isActive }: DockIconProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Width and height mapping for macOS dock effect (44px resting, 64px max)
  const widthTransform = useTransform(distance, [-120, 0, 120], [44, 64, 44])
  const heightTransform = useTransform(distance, [-120, 0, 120], [44, 64, 44])

  const widthTransformIcon = useTransform(distance, [-120, 0, 120], [18, 28, 18])
  const heightTransformIcon = useTransform(distance, [-120, 0, 120], [18, 28, 18])

  const springConfig = { mass: 0.1, stiffness: 180, damping: 15 }
  const width = useSpring(widthTransform, springConfig)
  const height = useSpring(heightTransform, springConfig)
  const widthIcon = useSpring(widthTransformIcon, springConfig)
  const heightIcon = useSpring(heightTransformIcon, springConfig)

  const [hovered, setHovered] = useState(false)

  const clonedIcon = React.cloneElement(icon as React.ReactElement<any>, {
    className: "w-full h-full stroke-[1.5]",
  })

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`aspect-square rounded-full flex items-center justify-center relative transition-all duration-300 shrink-0 select-none outline-none
        ${isActive 
          ? "bg-[#6366F1]/10 dark:bg-[#818CF8]/10 border border-[#6366F1]/40 dark:border-[#818CF8]/40 text-[#6366F1] dark:text-[#818CF8] shadow-[0_0_15px_rgba(99,102,241,0.3)] dark:shadow-[0_0_20px_rgba(129,140,248,0.25)]" 
          : "bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/30 dark:border-zinc-800/30 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        }`}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2.5 py-1 whitespace-nowrap rounded-md bg-zinc-950 dark:bg-white text-white dark:text-zinc-900 border border-zinc-800/50 dark:border-zinc-200/50 absolute left-1/2 -translate-x-1/2 -top-10 w-fit text-[11px] font-medium tracking-wide shadow-md pointer-events-none"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center shrink-0"
      >
        {clonedIcon}
      </motion.div>

      {/* Active Indicator Dot */}
      {isActive && (
        <motion.span
          layoutId="active-nav-dot"
          className="absolute bottom-1.5 w-1 h-1 rounded-full bg-[#6366F1] dark:bg-[#818CF8]"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.a>
  )
}

interface MobileDockIconProps {
  id: string
  title: string
  icon: React.ReactNode
  href: string
  onClick: (e: React.MouseEvent) => void
  isActive: boolean
}

function MobileDockIcon({ id, title, icon, href, onClick, isActive }: MobileDockIconProps) {
  const clonedIcon = React.cloneElement(icon as React.ReactElement<any>, {
    className: "w-5 h-5 stroke-[1.5]",
  })

  return (
    <a href={href} onClick={onClick} className="relative select-none outline-none shrink-0">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center relative transition-all duration-300 shrink-0
          ${isActive 
            ? "bg-[#6366F1]/15 dark:bg-[#818CF8]/15 border border-[#6366F1]/50 dark:border-[#818CF8]/50 text-[#6366F1] dark:text-[#818CF8] shadow-[0_0_12px_rgba(99,102,241,0.25)]" 
            : "bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/20 dark:border-zinc-800/20 text-zinc-500 dark:text-zinc-400"
          }`}
      >
        {clonedIcon}
      </div>
    </a>
  )
}
