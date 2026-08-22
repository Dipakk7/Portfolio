"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import type { Project } from "@/lib/data"

interface GithubProjectsProps {
  projects: Project[]
}

function getRepoUrl(project: Project): string {
  const titleLower = project.title.toLowerCase()
  if (titleLower.includes("scorelia")) {
    return "https://github.com/Dipakk7/Scorelia"
  }
  if (titleLower.includes("deepfake")) {
    return "https://github.com/Dipakk7/DeepfakeDetect"
  }
  if (titleLower.includes("face recognition") || titleLower.includes("attendance")) {
    return "https://github.com/Dipakk7/Face_reco_attendance_management"
  }
  if (titleLower.includes("e-commerce") || titleLower.includes("ecommerce")) {
    return "https://github.com/Dipakk7/Ecommerce-Sales-Analysis"
  }
  return project.githubUrl || project.link || "https://github.com/Dipakk7"
}

// ----------------------------------------------------------------------
// Reusable Supporting Project Card (Identical Structure for #2, #3, #4)
// ----------------------------------------------------------------------
function SupportingProjectCard({
  project,
  index,
  isInView,
  easeCurve,
}: {
  project: Project
  index: number
  isInView: boolean
  easeCurve: [number, number, number, number]
}) {
  const repoUrl = getRepoUrl(project)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.2 + index * 0.07, ease: easeCurve }}
      className="group flex flex-col justify-between h-full rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/40 backdrop-blur-xs hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-all duration-300 shadow-2xs hover:shadow-lg dark:hover:shadow-indigo-950/20 hover:-translate-y-1 overflow-hidden"
    >
      <div>
        {/* Consistent Dedicated Preview Image Container */}
        <div className="relative w-full aspect-[16/10] bg-zinc-100 dark:bg-zinc-950 overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/70">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} Preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400 dark:text-zinc-600">
              <span className="text-xs font-mono">No preview available</span>
            </div>
          )}
          {/* Subtle bottom gradient mask for canvas integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 select-text">
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150">
            {project.title}
          </h3>

          <p className="mt-2 text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed whitespace-pre-line">
            {project.description}
          </p>

          {/* Technology Stack Chips */}
          <div className="mt-3.5 flex flex-wrap items-center gap-1.5 select-none">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-4 sm:p-5 pt-0 border-t border-zinc-200/60 dark:border-zinc-800/50 mt-3 select-none">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 pt-3.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-150 cursor-pointer"
        >
          <Github className="w-3.5 h-3.5" />
          <span>Source Code</span>
          <ArrowUpRight className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  )
}

export function GithubProjects({ projects }: GithubProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })

  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1]

  // Enforce precise 1-4 project hierarchy:
  // 1. Scorelia
  // 2. Deepfake Video Detection
  // 3. Real-Time Face Recognition Attendance System
  // 4. E-Commerce Sales Analysis
  const sortedProjects = [...projects].sort((a, b) => {
    const getOrder = (p: Project) => {
      const t = p.title.toLowerCase()
      if (t.includes("scorelia")) return 1
      if (t.includes("deepfake")) return 2
      if (t.includes("face recognition") || t.includes("attendance")) return 3
      if (t.includes("e-commerce") || t.includes("ecommerce")) return 4
      return 5
    }
    return getOrder(a) - getOrder(b)
  })

  const flagshipProject = sortedProjects.find((p) => p.title.toLowerCase().includes("scorelia")) || sortedProjects[0]
  const supportingProjects = sortedProjects.filter((p) => p._id !== flagshipProject?._id)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black overflow-hidden transition-colors duration-700 select-none"
    >
      {/* Background Precision Atmosphere */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40 dark:opacity-20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.04] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* ============================================================ */}
        {/* 1. SECTION HEADER: Minimal & Confident Typography            */}
        {/* ============================================================ */}
        <div className="mb-8 sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeCurve }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white select-text"
          >
            Projects & Open Source
          </motion.h2>
        </div>

        {/* ============================================================ */}
        {/* 2. FLAGSHIP PROJECT: Scorelia Compact Refined Case Study     */}
        {/* ============================================================ */}
        {flagshipProject && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15, ease: easeCurve }}
            className="group mb-7 sm:mb-8 rounded-2xl sm:rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/40 backdrop-blur-xs hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-all duration-300 shadow-2xs hover:shadow-lg dark:hover:shadow-indigo-950/20 hover:-translate-y-1 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
              
              {/* Dedicated Visual Showcase (Clean, complete dashboard preview) */}
              <div className="lg:col-span-6 relative min-h-[220px] sm:min-h-[260px] lg:min-h-[300px] bg-zinc-100 dark:bg-zinc-950 overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-200/80 dark:border-zinc-800/70 flex items-center justify-center">
                {flagshipProject.image && (
                  <Image
                    src={flagshipProject.image}
                    alt={`${flagshipProject.title} Dashboard Preview`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                )}
                {/* Subtle depth gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Project Details Column (Compact, Tight & Proportional) */}
              <div className="lg:col-span-6 p-4 sm:p-5 lg:p-6 flex flex-col justify-between select-text">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-indigo-600 dark:text-indigo-400">
                      Flagship Platform
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                    {flagshipProject.title}
                  </h3>

                  <p className="mt-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    AI-powered career intelligence platform
                  </p>

                  <p className="mt-2.5 text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3 sm:line-clamp-4">
                    {flagshipProject.description}
                  </p>

                  {/* Technology Chips */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-1.5 select-none">
                    {flagshipProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono font-medium bg-white dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 pt-3.5 border-t border-zinc-200/80 dark:border-zinc-800/70 flex flex-wrap items-center gap-2 select-none">
                  {flagshipProject.link && (
                    <a
                      href={flagshipProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide bg-zinc-950 hover:bg-zinc-900 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 transition-all duration-150 ease-out hover:scale-[1.02] shadow-xs cursor-pointer"
                    >
                      <span>View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href={getRepoUrl(flagshipProject)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide border border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-indigo-500/40 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-all duration-150 ease-out hover:scale-[1.02] shadow-2xs cursor-pointer"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* ============================================================ */}
        {/* 3. SUPPORTING PROJECTS: 3-Card Grid with Reusable Component  */}
        {/*    Order: #2 Deepfake -> #3 Attendance -> #4 E-Commerce       */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {supportingProjects.map((project, index) => (
            <SupportingProjectCard
              key={project._id || project.title}
              project={project}
              index={index}
              isInView={isInView}
              easeCurve={easeCurve}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
