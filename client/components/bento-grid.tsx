"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Sparkles, Eye, Database, Server, Wrench } from "lucide-react"
import type { HeroData } from "@/lib/data"

interface BentoGridProps {
  heroData?: HeroData | null
}

export function BentoGrid({ heroData }: BentoGridProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })

  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black overflow-hidden transition-colors duration-700 select-none"
    >
      {/* ============================================================ */}
      {/* 1. BACKGROUND: Precision Grid & Subtle Atmospheric Glow       */}
      {/* ============================================================ */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-50 dark:opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* ============================================================ */}
        {/* 2. SECTION HEADER: Simple, Direct "SKILLS" Heading           */}
        {/* ============================================================ */}
        <div className="mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeCurve }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white select-text"
          >
            Skills
          </motion.h2>
        </div>

        {/* ============================================================ */}
        {/* 3. FEATURED AI / ML CAPABILITY (Indigo / Violet Accent)      */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: easeCurve }}
          className="mb-6 p-5 sm:p-6 rounded-2xl border border-indigo-200/90 dark:border-indigo-500/25 bg-indigo-50/70 dark:bg-indigo-950/20 backdrop-blur-xs shadow-xs relative overflow-hidden group hover:border-indigo-500/50 dark:hover:border-indigo-400/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/[0.05] transition-all duration-200 ease-out"
        >
          {/* Subtle top edge specular highlight */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-indigo-500/40 via-indigo-400/20 to-transparent pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform duration-200">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold tracking-[0.16em] uppercase text-indigo-950 dark:text-indigo-200">
                  AI / Machine Learning
                </span>
                <span className="block text-[11px] text-zinc-500 dark:text-zinc-400">
                  Core Foundations & Architectures
                </span>
              </div>
            </div>

            {/* Featured Category-Integrated Skill Chips */}
            <div className="flex flex-wrap items-center gap-2 select-text">
              {[
                "Machine Learning",
                "Deep Learning",
                "Generative AI",
                "Computer Vision",
                "Large Language Models",
                "AI Agents",
              ].map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight bg-indigo-100/60 dark:bg-indigo-950/40 border border-indigo-200/90 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-200 hover:bg-indigo-200/70 dark:hover:bg-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-500/70 hover:text-indigo-950 dark:hover:text-indigo-100 hover:-translate-y-0.5 transition-all duration-200 ease-out shadow-xs cursor-default motion-reduce:transform-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* 4. TWO-COLUMN SKILL GROUPS (4 Specialized Domains)           */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* ---------------------------------------------------------- */}
          {/* Card 1: LLM & AI SYSTEMS (Purple / Magenta Accent)        */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: easeCurve }}
            className="p-5 sm:p-6 rounded-2xl border border-purple-200/85 dark:border-purple-500/25 bg-purple-50/60 dark:bg-purple-950/20 backdrop-blur-xs hover:border-purple-500/50 dark:hover:border-purple-400/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/[0.05] transition-all duration-200 ease-out shadow-xs group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold tracking-[0.16em] uppercase text-purple-950 dark:text-purple-200">
                LLM & AI Systems
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2 select-text">
              {[
                "LLMs",
                "Prompt Engineering",
                "AI Evaluation",
                "RAG",
                "LangChain",
                "ChromaDB",
                "Ollama",
                "Qwen",
              ].map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium bg-purple-100/60 dark:bg-purple-950/40 border border-purple-200/85 dark:border-purple-800/60 text-purple-900 dark:text-purple-200 hover:bg-purple-200/70 dark:hover:bg-purple-900/50 hover:border-purple-300 dark:hover:border-purple-500/70 hover:text-purple-950 dark:hover:text-purple-100 hover:-translate-y-0.5 transition-all duration-200 ease-out shadow-xs cursor-default motion-reduce:transform-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ---------------------------------------------------------- */}
          {/* Card 2: ML & COMPUTER VISION (Cyan / Blue Accent)          */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: easeCurve }}
            className="p-5 sm:p-6 rounded-2xl border border-cyan-200/85 dark:border-cyan-500/25 bg-cyan-50/60 dark:bg-cyan-950/20 backdrop-blur-xs hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/[0.05] transition-all duration-200 ease-out shadow-xs group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform duration-200">
                <Eye className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold tracking-[0.16em] uppercase text-cyan-950 dark:text-cyan-200">
                ML & Computer Vision
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2 select-text">
              {[
                "Python",
                "Scikit-Learn",
                "TensorFlow",
                "Keras",
                "OpenCV",
                "YOLO",
                "Matplotlib",
                "Seaborn",
              ].map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium bg-cyan-100/60 dark:bg-cyan-950/40 border border-cyan-200/85 dark:border-cyan-800/60 text-cyan-900 dark:text-cyan-200 hover:bg-cyan-200/70 dark:hover:bg-cyan-900/50 hover:border-cyan-300 dark:hover:border-cyan-500/70 hover:text-cyan-950 dark:hover:text-cyan-100 hover:-translate-y-0.5 transition-all duration-200 ease-out shadow-xs cursor-default motion-reduce:transform-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ---------------------------------------------------------- */}
          {/* Card 3: BACKEND & SYSTEMS (Blue / Indigo Accent)           */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35, ease: easeCurve }}
            className="p-5 sm:p-6 rounded-2xl border border-blue-200/85 dark:border-blue-500/25 bg-blue-50/60 dark:bg-blue-950/20 backdrop-blur-xs hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/[0.05] transition-all duration-200 ease-out shadow-xs group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform duration-200">
                <Server className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold tracking-[0.16em] uppercase text-blue-950 dark:text-blue-200">
                Backend & Systems
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2 select-text">
              {[
                "FastAPI",
                "REST APIs",
                "PostgreSQL",
                "Elasticsearch",
              ].map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium bg-blue-100/60 dark:bg-blue-950/40 border border-blue-200/85 dark:border-blue-800/60 text-blue-900 dark:text-blue-200 hover:bg-blue-200/70 dark:hover:bg-blue-900/50 hover:border-blue-300 dark:hover:border-blue-500/70 hover:text-blue-950 dark:hover:text-blue-100 hover:-translate-y-0.5 transition-all duration-200 ease-out shadow-xs cursor-default motion-reduce:transform-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ---------------------------------------------------------- */}
          {/* Card 4: DATA & ANALYTICS (Teal / Emerald Accent)           */}
          {/* ---------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: easeCurve }}
            className="p-5 sm:p-6 rounded-2xl border border-teal-200/85 dark:border-teal-500/25 bg-teal-50/60 dark:bg-teal-950/20 backdrop-blur-xs hover:border-teal-500/50 dark:hover:border-teal-400/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-500/[0.05] transition-all duration-200 ease-out shadow-xs group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 group-hover:scale-105 transition-transform duration-200">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold tracking-[0.16em] uppercase text-teal-950 dark:text-teal-200">
                Data & Analytics
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2 select-text">
              {[
                "Pandas",
                "NumPy",
                "SQL",
                "MySQL",
                "Power BI",
                "MS Excel",
              ].map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium bg-teal-100/60 dark:bg-teal-950/40 border border-teal-200/85 dark:border-teal-800/60 text-teal-900 dark:text-teal-200 hover:bg-teal-200/70 dark:hover:bg-teal-900/50 hover:border-teal-300 dark:hover:border-teal-500/70 hover:text-teal-950 dark:hover:text-teal-100 hover:-translate-y-0.5 transition-all duration-200 ease-out shadow-xs cursor-default motion-reduce:transform-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ============================================================ */}
        {/* 5. TOOLS & ENVIRONMENT (Rose / Pink Accent Bottom Strip)     */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: easeCurve }}
          className="mt-6 p-4 sm:p-5 rounded-2xl border border-rose-200/70 dark:border-rose-500/20 bg-rose-50/40 dark:bg-rose-950/15 backdrop-blur-xs select-text shadow-xs hover:border-rose-500/40 dark:hover:border-rose-400/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-rose-500/[0.04] transition-all duration-200 ease-out flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 group"
        >
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform duration-200">
              <Wrench className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider text-rose-950 dark:text-rose-200 uppercase">
              Tools & Environment
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              "Git",
              "GitHub",
              "Docker",
              "Jupyter Notebook",
              "Google Colab",
              "VS Code",
            ].map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-normal bg-rose-100/60 dark:bg-rose-950/40 border border-rose-200/75 dark:border-rose-800/50 text-rose-900 dark:text-rose-200 hover:text-rose-950 dark:hover:text-rose-100 hover:border-rose-300 dark:hover:border-rose-500/60 hover:bg-rose-200/70 dark:hover:bg-rose-900/45 hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-default motion-reduce:transform-none"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
