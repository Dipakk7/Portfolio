"use client"

import { motion } from "framer-motion"
import { CodeXml, Award, Briefcase, Database, Binary, MessageSquareCode } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

const statsItems = [
  {
    label: "Projects Completed",
    value: "10+",
    desc: "Personal & academic engineering applications",
    icon: CodeXml,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Professional Certifications",
    value: "4+",
    desc: "Oracle Cloud Infrastructure & Python credentials",
    icon: Award,
    color: "from-purple-500 to-indigo-500",
  },
  {
    label: "Internship Experience",
    value: "1",
    desc: "AI Evaluation & Prompt engineering role",
    icon: Briefcase,
    color: "from-emerald-500 to-teal-500",
  },
  {
    label: "Records Analyzed",
    value: "15,000+",
    desc: "Sales transactional & structured datasets",
    icon: Database,
    color: "from-orange-500 to-amber-500",
  },
  {
    label: "AI Model Precision",
    value: "85%",
    desc: "Deep learning deepfake classification rate",
    icon: Binary,
    color: "from-pink-500 to-rose-500",
  },
  {
    label: "Prompt Variations Evaluated",
    value: "50+",
    desc: "Optimized LLM responses and output quality",
    icon: MessageSquareCode,
    color: "from-violet-500 to-fuchsia-500",
  },
]

export function StatsGrid() {
  return (
    <section className="py-24 px-4 bg-zinc-50 dark:bg-black transition-colors duration-700 relative overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6366F1]/5 blur-[200px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] dark:text-[#818CF8] text-sm font-mono mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {"•// Performance Metrics"}
          </motion.span>
          <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Key Statistics &amp; Quantified Impact
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="group relative overflow-hidden rounded-2xl p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300"
            >
              {/* Glowing card border on hover */}
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={8}
              />

              {/* Gradient hover background overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

              <div className="relative z-10 flex items-start justify-between mb-6">
                <div className={`p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 group-hover:scale-110 transition-all duration-300 border border-zinc-200/50 dark:border-zinc-700/50`}>
                  <item.icon className="w-6 h-6 text-zinc-700 dark:text-zinc-300 group-hover:text-[#818CF8] transition-colors" />
                </div>
                <div className={`text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${item.color} tracking-tight`}>
                  {item.value}
                </div>
              </div>

              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-1.5 transition-colors group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8]">
                {item.label}
              </h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-normal">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
