"use client"

import { motion } from "framer-motion"
import { Brain, Sparkles, Eye, Terminal, BarChart3, Cloud, Cpu, Database, LucideIcon } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { cn } from "@/lib/utils"
import type { HeroData } from "@/lib/data"
import React from "react"

interface BentoGridProps {
  heroData?: HeroData | null
}

interface SkillCategory {
  title: string
  icon: LucideIcon
  skills: string[]
  gradient: string
  iconBg: string
  iconBorder: string
  iconColor: string
  cardBorderHover: string
  chipBg: string
  chipBorder: string
  chipText: string
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: ["Machine Learning", "Deep Learning", "Generative AI", "AI Agents"],
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    iconBg: "bg-blue-50 dark:bg-blue-950/20",
    iconBorder: "border-blue-200/50 dark:border-blue-900/30 group-hover:border-blue-500/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    cardBorderHover: "hover:border-blue-500/20 dark:hover:border-blue-500/30",
    chipBg: "bg-blue-50/50 dark:bg-blue-950/10",
    chipBorder: "border-blue-200/30 dark:border-blue-900/20 hover:border-blue-500/40 dark:hover:border-blue-500/40",
    chipText: "text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100",
  },
  {
    title: "LLM Engineering",
    icon: Sparkles,
    skills: ["Large Language Models (LLMs)", "Prompt Engineering", "Retrieval-Augmented Generation (RAG)", "LangChain"],
    gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    iconBg: "bg-purple-50 dark:bg-purple-950/20",
    iconBorder: "border-purple-200/50 dark:border-purple-900/30 group-hover:border-purple-500/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    cardBorderHover: "hover:border-purple-500/20 dark:hover:border-purple-500/30",
    chipBg: "bg-purple-50/50 dark:bg-purple-950/10",
    chipBorder: "border-purple-200/30 dark:border-purple-900/20 hover:border-purple-500/40 dark:hover:border-purple-500/40",
    chipText: "text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100",
  },
  {
    title: "Computer Vision",
    icon: Eye,
    skills: ["Computer Vision", "OpenCV", "Image Processing"],
    gradient: "from-cyan-500/10 via-cyan-500/5 to-transparent",
    iconBg: "bg-cyan-50 dark:bg-cyan-950/20",
    iconBorder: "border-cyan-200/50 dark:border-cyan-900/30 group-hover:border-cyan-500/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    cardBorderHover: "hover:border-cyan-500/20 dark:hover:border-cyan-500/30",
    chipBg: "bg-cyan-50/50 dark:bg-cyan-950/10",
    chipBorder: "border-cyan-200/30 dark:border-cyan-900/20 hover:border-cyan-500/40 dark:hover:border-cyan-500/40",
    chipText: "text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-100",
  },
  {
    title: "Programming",
    icon: Terminal,
    skills: ["Python", "SQL"],
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/20",
    iconBorder: "border-emerald-200/50 dark:border-emerald-900/30 group-hover:border-emerald-500/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    cardBorderHover: "hover:border-emerald-500/20 dark:hover:border-emerald-500/30",
    chipBg: "bg-emerald-50/50 dark:bg-emerald-950/10",
    chipBorder: "border-emerald-200/30 dark:border-emerald-900/20 hover:border-emerald-500/40 dark:hover:border-emerald-500/40",
    chipText: "text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-emerald-100",
  },
  {
    title: "Backend & APIs",
    icon: Cpu,
    skills: ["FastAPI", "REST APIs", "OpenAI API", "Ollama"],
    gradient: "from-indigo-500/10 via-indigo-500/5 to-transparent",
    iconBg: "bg-indigo-50 dark:bg-indigo-950/20",
    iconBorder: "border-indigo-200/50 dark:border-indigo-900/30 group-hover:border-indigo-500/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    cardBorderHover: "hover:border-indigo-500/20 dark:hover:border-indigo-500/30",
    chipBg: "bg-indigo-50/50 dark:bg-indigo-950/10",
    chipBorder: "border-indigo-200/30 dark:border-indigo-900/20 hover:border-indigo-500/40 dark:hover:border-indigo-500/40",
    chipText: "text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100",
  },
  {
    title: "Data Science",
    icon: BarChart3,
    skills: ["Pandas", "NumPy", "Exploratory Data Analysis (EDA)", "Data Visualization"],
    gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
    iconBg: "bg-orange-50 dark:bg-orange-950/20",
    iconBorder: "border-orange-200/50 dark:border-orange-900/30 group-hover:border-orange-500/30",
    iconColor: "text-orange-600 dark:text-orange-400",
    cardBorderHover: "hover:border-orange-500/20 dark:hover:border-orange-500/30",
    chipBg: "bg-orange-50/50 dark:bg-orange-950/10",
    chipBorder: "border-orange-200/30 dark:border-orange-900/20 hover:border-orange-500/40 dark:hover:border-orange-500/40",
    chipText: "text-orange-700 dark:text-orange-300 hover:text-orange-900 dark:hover:text-orange-100",
  },
  {
    title: "Developer Tools",
    icon: Cloud,
    skills: ["Git", "GitHub", "Docker", "PostgreSQL", "Google Colab"],
    gradient: "from-pink-500/10 via-pink-500/5 to-transparent",
    iconBg: "bg-pink-50 dark:bg-pink-950/20",
    iconBorder: "border-pink-200/50 dark:border-pink-900/30 group-hover:border-pink-500/30",
    iconColor: "text-pink-600 dark:text-pink-400",
    cardBorderHover: "hover:border-pink-500/20 dark:hover:border-pink-500/30",
    chipBg: "bg-pink-50/50 dark:bg-pink-950/10",
    chipBorder: "border-pink-200/30 dark:border-pink-900/20 hover:border-pink-500/40 dark:hover:border-pink-500/40",
    chipText: "text-pink-700 dark:text-pink-300 hover:text-pink-900 dark:hover:text-pink-100",
  },
]

export function BentoGrid({ heroData }: BentoGridProps) {
  return (
    <section id="skills" className="py-24 md:py-32 px-4 bg-white dark:bg-black bg-grid-mesh transition-colors duration-700 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 flex flex-col gap-4"
        >
          <motion.span
            className="inline-block px-4 py-2 w-fit rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] dark:text-[#818CF8] text-sm font-mono"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {"•// Technical Expertise"}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Technical Expertise
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg max-w-xl">
            Technologies and tools I use to build intelligent solutions.
          </p>
        </motion.div>

        {/* Responsive Flex Centered Layout */}
        <div className="flex flex-wrap justify-center items-start gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={cn(
                  "w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group relative p-6 rounded-2xl border border-zinc-200 dark:border-zinc-900/60 bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-md transition-all duration-300 flex flex-col hover:shadow-lg hover:-translate-y-1 will-change-transform overflow-hidden",
                  category.cardBorderHover
                )}
              >
                {/* Glowing Effect border trail */}
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={1.2}
                />

                {/* Gentle glow effect behind card */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${category.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none -z-10`} />

                {/* Soft gradient hover effect using portfolio's existing blue-violet palette */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/0 via-[#818CF8]/0 to-[#6366F1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

                <div className="space-y-4 relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300",
                      category.iconBg,
                      category.iconBorder
                    )}>
                      <Icon className={cn("w-5 h-5 transition-colors duration-300", category.iconColor)} />
                    </div>
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white tracking-tight group-hover:text-zinc-950 dark:group-hover:text-zinc-100 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                </div>

                {/* Skills Chips / Badges */}
                <div className="flex flex-wrap gap-2 mt-6 relative z-10">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all duration-300 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/40",
                        category.chipBg,
                        category.chipBorder,
                        category.chipText
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
