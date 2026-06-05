"use client"

import { motion } from "framer-motion"
import { MessageSquareCode, Terminal, LineChart, Sparkles, Bot, BrainCircuit, Eye, ShieldCheck } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

const topics = [
  {
    title: "Large Language Models",
    desc: "Understanding architectures like Transformers, fine-tuning methodologies, and serving LLMs efficiently.",
    icon: MessageSquareCode,
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Prompt Engineering",
    desc: "Crafting structured inputs, few-shot prompting, and using context optimization to improve output reliability.",
    icon: Terminal,
    color: "from-emerald-500 to-cyan-500",
  },
  {
    title: "AI Evaluation",
    desc: "Measuring response quality, hallucination rates, safety metrics, and system performance at scale.",
    icon: LineChart,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Generative AI",
    desc: "Exploring content generation pipelines, text-to-image systems, and generative neural net architectures.",
    icon: Sparkles,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Agentic AI Systems",
    desc: "Designing autonomous agents capable of tool use, multi-step planning, memory execution, and reasoning.",
    icon: Bot,
    color: "from-red-500 to-rose-500",
  },
  {
    title: "Deep Learning",
    desc: "Tuning neural networks, optimizers, loss functions, and backpropagation for classification and inference.",
    icon: BrainCircuit,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Computer Vision",
    desc: "Developing image processing and spatial recognition pipelines, face detection, and deepfake recognition.",
    icon: Eye,
    color: "from-sky-500 to-blue-500",
  },
  {
    title: "Responsible AI",
    desc: "Ensuring models are unbiased, auditable, privacy-compliant, secure, and aligned with human values.",
    icon: ShieldCheck,
    color: "from-teal-500 to-emerald-500",
  },
]

export function ExploringAI() {
  return (
    <section className="py-32 px-4 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-700 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#6366F1]/3 blur-[180px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col gap-4 text-center md:text-left"
        >
          <motion.span
            className="inline-block px-4 py-2 w-fit mx-auto md:mx-0 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] dark:text-[#818CF8] text-sm font-mono"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {"•// Research"}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            AI Research Interests
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Exploring cutting-edge AI technologies, machine learning techniques, and real-world applications that shape the future of intelligent systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative flex flex-col p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-300 overflow-hidden"
            >
              {/* Hover glow effect */}
              <GlowingEffect
                spread={45}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={8}
              />

              <div className={`p-3 w-fit rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700/60 group-hover:scale-110 transition-transform duration-300 mb-6`}>
                <topic.icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:text-[#818CF8] transition-colors" />
              </div>

              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors">
                {topic.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {topic.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
