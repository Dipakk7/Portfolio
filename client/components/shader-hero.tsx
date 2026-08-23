"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowDown, ArrowRight, Download, Mail } from "lucide-react"
import type { HeroData } from "@/lib/data"
import { RESUME_URL } from "@/lib/utils"

// Custom SVG Icons for GitHub and LinkedIn for crisp rendering
function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

interface ShaderAnimationProps {
  heroData?: HeroData | null
}

export function ShaderAnimation({ heroData }: ShaderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Get social & resume URLs from data or authentic default fallbacks
  const resumeLink = heroData?.resumeUrl || RESUME_URL

  const githubUrl = heroData?.socialLinks?.github || "https://github.com/Dipakk7"
  const linkedinUrl = heroData?.socialLinks?.linkedin || "https://linkedin.com/in/dipakkhandagale"
  const emailUrl = `mailto:${heroData?.email || "khandagaledipak47@gmail.com"}`

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleScrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Interactive mouse coordinates tracking with spring physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMouseOver = useMotionValue(0)

  const springConfig = { damping: 45, stiffness: 160, mass: 0.6 }
  const xSpring = useSpring(mouseX, springConfig)
  const ySpring = useSpring(mouseY, springConfig)
  const opacitySpring = useSpring(isMouseOver, { damping: 35, stiffness: 120 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
      isMouseOver.set(1)
    }

    const handleMouseLeave = () => {
      isMouseOver.set(0)
    }

    const container = containerRef.current
    if (container) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true })
      document.body.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mouseX, mouseY, isMouseOver])

  // Radial illumination mapped to mouse position with subtle indigo ambient tint
  const mouseGlowBg = useTransform(
    [xSpring, ySpring],
    ([x, y]) => `radial-gradient(circle 440px at ${x}px ${y}px, var(--hero-glow-color), transparent 80%)`
  )

  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1]

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[90vh] lg:min-h-[94vh] bg-white dark:bg-black overflow-hidden flex flex-col justify-between transition-colors duration-700 pt-24 pb-8 sm:pt-28 sm:pb-10"
    >
      {/* ============================================================ */}
      {/* 1. BACKGROUND: Precision Grid & Technical System Atmosphere   */}
      {/* ============================================================ */}
      <div className="absolute inset-0 bg-grid-mesh pointer-events-none z-0 opacity-70 dark:opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#ffffff_85%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_20%,#000000_85%)] pointer-events-none z-0" />

      {/* Interactive mouse lighting */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: mouseGlowBg, opacity: opacitySpring }}
      />

      {/* Slow ambient atmospheric breathing glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[var(--hero-glow-static)] rounded-full blur-[160px] pointer-events-none z-0"
      />

      {/* ============================================================ */}
      {/* 2. REFINED TWO-COLUMN HERO COMPOSITION (DESKTOP)             */}
      {/* ============================================================ */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* -------------------------------------------------------- */}
          {/* LEFT COLUMN: Professional Identity, Role, CTAs & Socials */}
          {/* -------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left select-none">
            
            {/* Step 1: Availability Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: easeCurve }}
              className="pointer-events-auto"
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/25 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-400 backdrop-blur-md shadow-xs select-text">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-emerald-400" />
                </span>
                <span className="font-sans">Actively Exploring Opportunities</span>
              </div>
            </motion.div>

            {/* Step 2: Primary Name Identity (Title Case / Natural & Confident) */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: easeCurve }}
              className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[42px] font-extrabold tracking-[-0.02em] leading-tight select-text"
            >
              <span className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-700 dark:from-white dark:via-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
                Dipak Khandagale
              </span>
            </motion.h1>

            {/* Step 3: Professional Role (Noticeably Smaller / Restrained) */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.23, ease: easeCurve }}
              className="mt-1.5 sm:mt-2 text-xl sm:text-2xl md:text-[26px] font-bold tracking-tight text-indigo-600 dark:text-indigo-400 select-none"
            >
              AI/ML Engineer
            </motion.div>

            {/* Step 4: Positioning Statement */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: easeCurve }}
              className="mt-3.5 sm:mt-4 max-w-lg text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed select-text"
            >
              Building intelligent, production-oriented AI systems and applications that solve real-world problems.
            </motion.p>

            {/* Step 5: Compact, Refined CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.41, ease: easeCurve }}
              className="mt-6 sm:mt-7 flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pointer-events-auto"
            >
              {/* Primary Action: Projects → */}
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-11 rounded-xl text-sm font-semibold tracking-wide bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 transition-all duration-150 ease-out hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 shadow-xs hover:shadow-md hover:shadow-indigo-500/20 cursor-pointer border border-zinc-800 dark:border-zinc-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black motion-reduce:transform-none"
              >
                <span>Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 ease-out group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
              </a>

              {/* Secondary Action: Resume ↓ */}
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 h-11 rounded-xl text-sm font-semibold tracking-wide border border-zinc-200/90 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 hover:bg-zinc-100/90 dark:hover:bg-zinc-800/80 hover:border-indigo-300/60 dark:hover:border-indigo-500/40 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-all duration-150 ease-out hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 cursor-pointer backdrop-blur-md shadow-xs hover:shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black motion-reduce:transform-none"
              >
                <span>Resume</span>
                <Download className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-150 ease-out group-hover:translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
              </a>
            </motion.div>

            {/* Step 6: Refined Circular Social / Contact Icon Row (GitHub, LinkedIn, Email) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48, ease: easeCurve }}
              className="mt-6 flex items-center justify-center lg:justify-start gap-3 pointer-events-auto"
            >
              {/* GitHub */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                title="GitHub"
                className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200/90 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:bg-zinc-100/90 dark:hover:bg-zinc-800/80 transition-all duration-150 ease-out hover:scale-105 hover:-translate-y-0.5 shadow-xs hover:shadow-sm hover:shadow-indigo-500/10 backdrop-blur-xs outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer motion-reduce:transform-none"
              >
                <GithubIcon className="w-4 h-4 transition-colors duration-150 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
                className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200/90 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:bg-zinc-100/90 dark:hover:bg-zinc-800/80 transition-all duration-150 ease-out hover:scale-105 hover:-translate-y-0.5 shadow-xs hover:shadow-sm hover:shadow-indigo-500/10 backdrop-blur-xs outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer motion-reduce:transform-none"
              >
                <LinkedinIcon className="w-4 h-4 transition-colors duration-150 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
              </a>

              {/* Email */}
              <a
                href={emailUrl}
                aria-label="Send Email"
                title="Email"
                className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200/90 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:bg-zinc-100/90 dark:hover:bg-zinc-800/80 transition-all duration-150 ease-out hover:scale-105 hover:-translate-y-0.5 shadow-xs hover:shadow-sm hover:shadow-indigo-500/10 backdrop-blur-xs outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer motion-reduce:transform-none"
              >
                <Mail className="w-4 h-4 transition-colors duration-150 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
              </a>
            </motion.div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* RIGHT COLUMN: Supporting Portrait                         */}
          {/* -------------------------------------------------------- */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative">
            
            {/* Subtle atmospheric ambient glow centered behind portrait */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-indigo-500/[0.07] dark:bg-indigo-500/[0.10] rounded-full blur-[80px] pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.28, ease: easeCurve }}
              className="relative w-full max-w-[270px] sm:max-w-[300px] lg:max-w-[325px] aspect-[4/4.8] rounded-3xl overflow-hidden border border-zinc-200/75 dark:border-zinc-800/70 bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-xl dark:shadow-2xl dark:shadow-indigo-950/20 group"
            >
              {/* Subtle top edge specular highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 dark:via-zinc-400/30 to-transparent z-20" />

              {/* Exact Authentic Professional Portrait Image */}
              <Image
                src="/dipak-portrait.jpg"
                alt="Dipak Khandagale - AI/ML Engineer"
                fill
                priority
                sizes="(max-width: 768px) 270px, 325px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              {/* Bottom Subtle Gradient Mask for Natural Canvas Integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-black/80 dark:via-transparent dark:to-transparent pointer-events-none z-10" />

              {/* Engineering Corner Brackets */}
              <div className="hidden sm:block absolute top-2 left-2 w-2 h-2 border-t border-l border-indigo-500/40 dark:border-indigo-400/40 z-20 pointer-events-none" />
              <div className="hidden sm:block absolute top-2 right-2 w-2 h-2 border-t border-r border-indigo-500/40 dark:border-indigo-400/40 z-20 pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. CLICKABLE SCROLL DOWN INDICATOR                           */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.6 }}
        className="relative sm:absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-10 mt-6 sm:mt-0"
      >
        <a
          href="#about"
          onClick={handleScrollToAbout}
          aria-label="Scroll to About section"
          title="Scroll down"
          className="group flex flex-col items-center gap-1 p-2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </motion.div>
        </a>
      </motion.div>
    </div>
  )
}
