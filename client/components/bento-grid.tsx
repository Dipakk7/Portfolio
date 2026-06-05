"use client"

import { motion } from "framer-motion"
import { Brain, Sparkles, Eye, Terminal, BarChart3, Cloud, LucideIcon } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
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
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: ["Machine Learning", "Neural Networks", "Model Development"],
    gradient: "from-blue-500/10 via-[#6366F1]/5 to-transparent",
  },
  {
    title: "Deep Learning & Generative AI",
    icon: Sparkles,
    skills: ["TensorFlow", "PyTorch", "Generative AI", "LLMs"],
    gradient: "from-purple-500/10 via-[#6366F1]/5 to-transparent",
  },
  {
    title: "Computer Vision",
    icon: Eye,
    skills: ["OpenCV", "Image Processing", "Face Recognition"],
    gradient: "from-pink-500/10 via-[#6366F1]/5 to-transparent",
  },
  {
    title: "Programming",
    icon: Terminal,
    skills: ["Python", "SQL", "Java"],
    gradient: "from-emerald-500/10 via-[#6366F1]/5 to-transparent",
  },
  {
    title: "Data Analytics",
    icon: BarChart3,
    skills: ["Power BI", "Excel", "Pandas", "NumPy"],
    gradient: "from-orange-500/10 via-[#6366F1]/5 to-transparent",
  },
  {
    title: "Tools & Deployment",
    icon: Cloud,
    skills: ["Git", "GitHub", "FastAPI", "AWS", "Vercel"],
    gradient: "from-cyan-500/10 via-[#6366F1]/5 to-transparent",
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

        {/* 3x2 Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative p-6 rounded-2xl border border-zinc-200 dark:border-zinc-900/60 bg-zinc-50/50 dark:bg-zinc-950/40 backdrop-blur-md transition-all duration-300 min-h-[200px] flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 will-change-transform overflow-hidden"
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

                {/* Subtle colorful background gradient glow */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${category.gradient} opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none -z-10`} />

                <div className="space-y-4 relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-colors duration-300 group-hover:border-[#6366F1]/50 dark:group-hover:border-[#818CF8]/50">
                      <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white tracking-tight group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors">
                      {category.title}
                    </h3>
                  </div>
                </div>

                {/* Skills Chips / Badges */}
                <div className="flex flex-wrap gap-2 mt-6 relative z-10">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300 transition-all duration-300 hover:border-[#6366F1]/40 dark:hover:border-[#818CF8]/40 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
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
