"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, MapPin, Briefcase, Sparkles, FolderGit2, Clock, Calendar } from "lucide-react"
import type { HeroData } from "@/lib/data"

interface AboutProps {
  data?: HeroData | null
}

export function About({ data }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })

  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-black overflow-hidden transition-colors duration-700 select-none"
    >
      {/* ============================================================ */}
      {/* 1. BACKGROUND: Subtle Dot Grid & Atmosphere                   */}
      {/* ============================================================ */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-60 dark:opacity-30" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* ============================================================ */}
        {/* 2. TWO-COLUMN LAYOUT: About Me (Left) vs Experience (Right)  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ---------------------------------------------------------- */}
          {/* LEFT COLUMN: About Me Heading & Narrative Paragraphs       */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeCurve }}
            className="lg:col-span-7 flex flex-col justify-between h-full"
          >
            <div>
              {/* Section Heading: About Me */}
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white select-text">
                About{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  Me
                </span>
              </h2>

              {/* Exact AI/ML Engineer Positioned Narrative */}
              <div className="mt-6 space-y-4 text-sm sm:text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 select-text">
                <p>
                  I&apos;m an <strong className="font-semibold text-zinc-900 dark:text-zinc-100">AI/ML Engineer</strong> passionate about building intelligent applications using <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Machine Learning, Generative AI, Computer Vision, Large Language Models (LLMs), and AI Agents</strong>. I enjoy transforming complex problems into AI-powered solutions that automate workflows, improve decision-making, and deliver real-world value.
                </p>

                <p>
                  Through projects including <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Scorelia, Deepfake Video Detection, Vision Document Parsing, and Face Recognition Attendance Management</strong>, I&apos;ve gained hands-on experience developing <strong className="font-semibold text-zinc-900 dark:text-zinc-100">end-to-end AI applications</strong> — from data preprocessing and model development to AI pipelines, backend APIs, and modern web interfaces.
                </p>

                <p>
                  I&apos;m continuously exploring <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Agentic AI, Retrieval-Augmented Generation (RAG), multimodal AI, and modern LLM frameworks</strong> to build more capable and reliable intelligent systems. My goal is to engineer production-oriented AI products that solve meaningful problems and create measurable impact.
                </p>
              </div>
            </div>

            {/* Education Card (Anchored Bottom of Left Column - Blue / Cyan Accent) */}
            <div className="mt-8 p-4 sm:p-5 rounded-2xl border border-blue-200/90 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20 backdrop-blur-xs select-text shadow-xs hover:border-blue-400/80 dark:hover:border-blue-400/60 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-md hover:shadow-blue-500/5 group">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/25 text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    Bachelor of Technology (B.Tech)
                  </h3>
                  <div className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                    Artificial Intelligence & Data Science
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    MIT College of Engineering, Chhatrapati Sambhajinagar
                  </div>
                  
                  {/* Badges / Chips */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-blue-100/60 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-blue-900 dark:text-blue-200">
                      B.Tech AI & DS
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-blue-100/60 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 text-blue-900 dark:text-blue-200">
                      Nov 2022 – July 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ---------------------------------------------------------- */}
          {/* RIGHT COLUMN: Experience Section & Supporting Quick Info   */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: easeCurve }}
            className="lg:col-span-5 flex flex-col justify-between h-full"
          >
            <div>
              {/* Section Heading: Experience */}
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white select-text">
                Experience
              </h2>

              {/* Experience Entry: RaiTalk */}
              <div className="mt-6 border-l-2 border-indigo-500/40 dark:border-indigo-400/40 pl-4 sm:pl-5 space-y-3 select-text">
                <div>
                  <div className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                    AI Intern{" "}
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      · RaiTalk
                    </span>
                  </div>
                  {/* Subtle Secondary Date Line */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500/80" />
                    <span>Jan 2026 — May 2026</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 list-disc list-outside ml-4">
                  <li>
                    Evaluated 50+ AI prompt variations for response quality, consistency, and model performance.
                  </li>
                  <li>
                    Performed AI output evaluation, workflow validation, and functional/API testing across real-world use cases.
                  </li>
                  <li>
                    Identified response issues, documented defects, and collaborated with developers to improve AI application reliability.
                  </li>
                  <li>
                    Validated AI-generated outputs and supported continuous improvement of AI models and workflows.
                  </li>
                </ul>
              </div>
            </div>

            {/* Supporting Metadata Quick Info Grid (Distinct Premium V2 Accents) */}
            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3 select-text">
              
              {/* 1. Location (Indigo / Violet) */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-indigo-200/90 dark:border-indigo-500/30 bg-indigo-50/70 dark:bg-indigo-950/30 backdrop-blur-xs hover:bg-indigo-100/80 dark:hover:bg-indigo-900/50 hover:border-indigo-400/80 dark:hover:border-indigo-400/60 hover:-translate-y-0.5 transition-all duration-200 shadow-2xs hover:shadow-md hover:shadow-indigo-500/5 group">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  Pune, Maharashtra
                </span>
              </div>

              {/* 2. Education (Blue / Cyan) */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-blue-200/90 dark:border-blue-500/30 bg-blue-50/70 dark:bg-blue-950/30 backdrop-blur-xs hover:bg-blue-100/80 dark:hover:bg-blue-900/50 hover:border-blue-400/80 dark:hover:border-blue-400/60 hover:-translate-y-0.5 transition-all duration-200 shadow-2xs hover:shadow-md hover:shadow-blue-500/5 group">
                <div className="p-1.5 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/25 text-blue-600 dark:text-blue-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  B.Tech AI & Data Science
                </span>
              </div>

              {/* 3. Role (Purple) */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-purple-200/90 dark:border-purple-500/30 bg-purple-50/70 dark:bg-purple-950/30 backdrop-blur-xs hover:bg-purple-100/80 dark:hover:bg-purple-900/50 hover:border-purple-400/80 dark:hover:border-purple-400/60 hover:-translate-y-0.5 transition-all duration-200 shadow-2xs hover:shadow-md hover:shadow-purple-500/5 group">
                <div className="p-1.5 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/25 text-purple-600 dark:text-purple-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  AI/ML Engineer
                </span>
              </div>

              {/* 4. Internship (Teal) */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-teal-200/90 dark:border-teal-500/30 bg-teal-50/70 dark:bg-teal-950/30 backdrop-blur-xs hover:bg-teal-100/80 dark:hover:bg-teal-900/50 hover:border-teal-400/80 dark:hover:border-teal-400/60 hover:-translate-y-0.5 transition-all duration-200 shadow-2xs hover:shadow-md hover:shadow-teal-500/5 group">
                <div className="p-1.5 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 border border-teal-500/25 text-teal-600 dark:text-teal-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  1 Internship (RaiTalk)
                </span>
              </div>

              {/* 5. Projects (Sky / Cyan) */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-sky-200/90 dark:border-sky-500/30 bg-sky-50/70 dark:bg-sky-950/30 backdrop-blur-xs hover:bg-sky-100/80 dark:hover:bg-sky-900/50 hover:border-sky-400/80 dark:hover:border-sky-400/60 hover:-translate-y-0.5 transition-all duration-200 shadow-2xs hover:shadow-md hover:shadow-sky-500/5 group">
                <div className="p-1.5 rounded-lg bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/25 text-sky-600 dark:text-sky-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <FolderGit2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  04+ AI Projects
                </span>
              </div>

              {/* 6. Availability (Emerald / Green) */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-emerald-200/90 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/30 backdrop-blur-xs hover:bg-emerald-100/80 dark:hover:bg-emerald-900/50 hover:border-emerald-400/80 dark:hover:border-emerald-400/60 hover:-translate-y-0.5 transition-all duration-200 shadow-2xs hover:shadow-md hover:shadow-emerald-500/5 group">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  Available for Full-Time
                </span>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
