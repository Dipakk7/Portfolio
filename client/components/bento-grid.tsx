"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import type { HeroData } from "@/lib/data"
import SphereImageGrid from "@/components/ui/sphere-image-grid"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Skill {
  name: string
  icon: string
  category?: string
}

interface BentoGridProps {
  heroData?: HeroData | null
}

const FALLBACK_SKILLS: Skill[] = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
  { name: "Machine Learning", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "Deep Learning", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/keras.svg?v=1" },
  { name: "Computer Vision", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googlelens.svg?v=1" },
  { name: "Generative AI", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/huggingface.svg?v=1" },
  { name: "LLMs", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg?v=1" },
  { name: "Prompt Engineering", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/anthropic.svg?v=1" },
  { name: "LangChain", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/langchain.svg?v=1" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonwebservices.svg?v=1" },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoftazure.svg?v=1" },
  { name: "Power BI", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/powerbi.svg?v=1" },
  { name: "Jupyter Notebook", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
  { name: "Google Colab", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googlecolab.svg?v=1" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }
]

// ─── Main Section ─────────────────────────────────────────────────────────────

export function BentoGrid({ heroData }: BentoGridProps) {
  const skills: Skill[] = (heroData?.skills && heroData.skills.length > 0)
    ? heroData.skills
    : FALLBACK_SKILLS

  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hoveredId && listRef.current) {
      // Find the card element corresponding to the hovered skill
      const activeElement = listRef.current.querySelector(`[data-skill="${CSS.escape(hoveredId)}"]`)
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        })
      }
    }
  }, [hoveredId])

  // Map to SphereImageGrid images format
  const sphereImages = skills.map((skill) => ({
    id: skill.name,
    src: skill.icon,
    alt: skill.name,
    title: skill.name
  }))

  return (
    <section id="skills" className="py-24 md:py-32 px-4 bg-white dark:bg-black bg-grid-mesh transition-colors duration-700">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] dark:text-[#818CF8] text-sm font-mono mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {"•// Skills & Technologies"}
          </motion.span>
          <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Skills &amp; Technologies
          </h3>
        </motion.div>

        {/* ── Showcase: Sphere Left + Scrollable List Right ── */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
          
          {/* Left Column: Interactive 3D Sphere */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[500px] aspect-square flex items-center justify-center bg-gradient-to-tr from-purple-500/10 via-[#6366F1]/5 to-transparent border border-zinc-200/60 dark:border-zinc-900/60 rounded-3xl p-6 relative overflow-hidden"
          >
            <SphereImageGrid
              images={sphereImages}
              containerSize={420}
              sphereRadius={165}
              autoRotate={true}
              autoRotateSpeed={0.3}
              baseImageScale={0.18}
              hoverScale={1.3}
              hoveredId={hoveredId}
              onHoverChange={setHoveredId}
            />
          </motion.div>

          {/* Right Column: Scrollable list of technologies */}
          <motion.div 
            ref={listRef}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full max-w-[500px] lg:max-w-none h-[450px] overflow-y-auto pr-2 space-y-3 custom-scrollbar"
          >
            {skills.map((skill) => {
              const isActive = hoveredId === skill.name
              const isDimmed = hoveredId !== null && !isActive

              return (
                <div
                  key={skill.name}
                  data-skill={skill.name}
                  className={`flex items-center gap-4 p-4 bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-900/60 rounded-2xl cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "border-[#6366F1] dark:border-[#818CF8] bg-zinc-100 dark:bg-zinc-900 shadow-lg shadow-[#6366F1]/5 translate-x-1"
                      : ""
                  } ${isDimmed ? "opacity-40" : "opacity-100"}`}
                  onMouseEnter={() => setHoveredId(skill.name)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className={`w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-2 flex items-center justify-center transition-all duration-300 ${
                    isActive ? "scale-105 border-[#6366F1]/40" : ""
                  }`}>
                    <img src={skill.icon} alt={skill.name} className={`w-6 h-6 object-contain ${skill.name.toLowerCase() === 'github' ? 'dark:invert' : ''}`} />
                  </div>
                  <span className={`font-mono text-sm font-semibold transition-colors duration-300 ${
                    isActive ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"
                  }`}>
                    {skill.name}
                  </span>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
