"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Mail, Download, ArrowUp } from "lucide-react"
import type { HeroData } from "@/lib/data"

import { OFFICE_RESUME_VIEWER_URL, handleResumeClick } from "@/lib/utils"

interface FooterProps {
  footerData: HeroData | null
}

const defaultFooterData = {
  email: "khandagaledipak47@gmail.com",
  socialLinks: {
    github: "https://github.com/Dipakk7",
    linkedin: "https://linkedin.com/in/dipakkhandagale",
  },
  footerText: "© 2026 Dipak Khandagale. All rights reserved.",
}

export function Footer({ footerData }: FooterProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })

  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1]

  const resumeUrl = OFFICE_RESUME_VIEWER_URL

  const githubUrl = footerData?.socialLinks?.github || defaultFooterData.socialLinks.github
  const linkedinUrl = footerData?.socialLinks?.linkedin || defaultFooterData.socialLinks.linkedin
  const emailUrl = `mailto:${footerData?.email || defaultFooterData.email}`

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const contactButtons = [
    {
      label: "GitHub",
      href: githubUrl,
      icon: Github,
      isResume: false,
      styles: {
        container: "bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-200/90 dark:border-indigo-800/60 text-indigo-950 dark:text-indigo-200 hover:bg-indigo-100/80 dark:hover:bg-indigo-900/50 hover:border-indigo-400/80 dark:hover:border-indigo-500/70 hover:text-indigo-900 dark:hover:text-indigo-100 shadow-indigo-500/5",
        icon: "text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300",
      },
    },
    {
      label: "LinkedIn",
      href: linkedinUrl,
      icon: Linkedin,
      isResume: false,
      styles: {
        container: "bg-blue-50/70 dark:bg-blue-950/30 border-blue-200/90 dark:border-blue-800/60 text-blue-950 dark:text-blue-200 hover:bg-blue-100/80 dark:hover:bg-blue-900/50 hover:border-blue-400/80 dark:hover:border-blue-500/70 hover:text-blue-900 dark:hover:text-blue-100 shadow-blue-500/5",
        icon: "text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300",
      },
    },
    {
      label: "Email",
      href: emailUrl,
      icon: Mail,
      isResume: false,
      styles: {
        container: "bg-teal-50/70 dark:bg-teal-950/30 border-teal-200/90 dark:border-teal-800/60 text-teal-950 dark:text-teal-200 hover:bg-teal-100/80 dark:hover:bg-teal-900/50 hover:border-teal-400/80 dark:hover:border-teal-500/70 hover:text-teal-900 dark:hover:text-teal-100 shadow-teal-500/5",
        icon: "text-teal-600 dark:text-teal-400 group-hover:text-teal-700 dark:group-hover:text-teal-300",
      },
    },
    {
      label: "Resume",
      href: resumeUrl,
      icon: Download,
      isResume: true,
      styles: {
        container: "bg-purple-50/70 dark:bg-purple-950/30 border-purple-200/90 dark:border-purple-800/60 text-purple-950 dark:text-purple-200 hover:bg-purple-100/80 dark:hover:bg-purple-900/50 hover:border-purple-400/80 dark:hover:border-purple-500/70 hover:text-purple-900 dark:hover:text-purple-100 shadow-purple-500/5",
        icon: "text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300",
      },
    },
  ]

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black overflow-hidden transition-colors duration-700 select-none border-t border-zinc-200/80 dark:border-zinc-900"
    >
      {/* Precision Background Atmosphere */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40 dark:opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* ============================================================ */}
        {/* 1. EYEBROW: Mono Uppercase Header                            */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: easeCurve }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-xs font-mono tracking-widest uppercase mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 dark:bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500 dark:bg-indigo-400" />
          </span>
          <span>LET&apos;S CONNECT</span>
        </motion.div>

        {/* ============================================================ */}
        {/* 2. MAIN HEADING: Confident AI/ML Statement                   */}
        {/* ============================================================ */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: easeCurve }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white max-w-2xl leading-[1.15] select-text"
        >
          Let&apos;s build something{" "}
          <span className="bg-gradient-to-r from-zinc-900 via-indigo-900 to-zinc-800 dark:from-white dark:via-indigo-200 dark:to-zinc-300 bg-clip-text text-transparent">
            intelligent.
          </span>
        </motion.h2>

        {/* ============================================================ */}
        {/* 3. SUPPORTING COPY                                           */}
        {/* ============================================================ */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.18, ease: easeCurve }}
          className="mt-4 text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed select-text"
        >
          I&apos;m open to AI/ML opportunities, technical collaborations, and conversations around intelligent products.
        </motion.p>

        {/* ============================================================ */}
        {/* 4. REFINED ACCENT CONTACT BUTTONS (4 Items)                  */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.26, ease: easeCurve }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {contactButtons.map((btn) => {
            const Icon = btn.icon

            return (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={btn.isResume ? (e) => handleResumeClick(e) : undefined}
                className={`group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide border backdrop-blur-xs transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] shadow-2xs hover:shadow-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${btn.styles.container}`}
              >
                <Icon className={`w-4 h-4 transition-colors duration-200 ${btn.styles.icon}`} />
                <span>{btn.label}</span>
              </a>
            )
          })}
        </motion.div>

        {/* ============================================================ */}
        {/* 5. MINIMAL FOOTER BAR                                        */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="w-full mt-16 sm:mt-20 pt-8 border-t border-zinc-200/70 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400"
        >
          <p className="select-text">
            © 2026 Dipak Khandagale. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md p-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </motion.div>

      </div>
    </footer>
  )
}
