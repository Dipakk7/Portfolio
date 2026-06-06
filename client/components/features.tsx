"use client"

import { motion } from "framer-motion"
import { BarChart3, Brain, Network, Sparkles, ScanFace, Server } from "lucide-react"

const expertiseCards = [
  {
    title: "Data Analytics",
    desc: "Transforming datasets into business insights using Python, SQL, Power BI, and statistical analysis.",
    gradient: "from-blue-500 to-cyan-600",
    icon: BarChart3,
    metric: "15,000+",
    metricLabel: "Records Analyzed",
  },
  {
    title: "Artificial Intelligence",
    desc: "Building intelligent systems using machine learning, deep learning, computer vision, and AI evaluation methodologies.",
    gradient: "from-indigo-500 to-purple-600",
    icon: Brain,
    metric: "10+",
    metricLabel: "Projects Built",
  },
  {
    title: "Machine Learning",
    desc: "Developing predictive models and classification systems using Scikit-learn and TensorFlow.",
    gradient: "from-emerald-500 to-teal-600",
    icon: Network,
    metric: "85%",
    metricLabel: "Model Accuracy",
  },
  {
    title: "Generative AI",
    desc: "Exploring prompt engineering, LLM evaluation, AI testing, and modern generative AI applications.",
    gradient: "from-pink-500 to-rose-600",
    icon: Sparkles,
    metric: "50+",
    metricLabel: "Prompts Evaluated",
  },
  {
    title: "Computer Vision",
    desc: "Developing image and video-based intelligent systems including deepfake detection and face recognition.",
    gradient: "from-orange-500 to-red-600",
    icon: ScanFace,
    metric: "85%",
    metricLabel: "Detection Precision",
  },
  {
    title: "API Development",
    desc: "Building scalable AI-powered services using FastAPI and REST APIs.",
    gradient: "from-cyan-400 to-blue-500",
    icon: Server,
    metric: "100%",
    metricLabel: "REST Integration",
  },
]

export function Features() {
  return (
    <section
      id="performance"
      className="relative py-32 px-4 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-700"
    >
      {/* Background glow decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#6366F1]/5 blur-[150px] rounded-full" />
      </div>

      {/* Intro section */}
      <div className="max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500">
            Areas of Expertise
          </h2>
          <p className="text-xl md:text-3xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl mx-auto">
            Specializing in Machine Learning, Generative AI, Data Analytics, and Computer Vision. Passionate about building intelligent systems and data-driven solutions.
          </p>
        </motion.div>
      </div>

      {/* Performance Records */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-sm font-mono text-purple-600 dark:text-purple-400 tracking-wider uppercase mb-4">
            // Core Competencies
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white">Expertise Catalog</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -8 }}
              className="group relative h-full bg-white dark:bg-black rounded-3xl p-8 border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Animated gradient border on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl bg-gradient-to-br ${card.gradient} blur-xl -z-10`}
              />

              {/* Top gradient line */}
              <div
                className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="flex items-start justify-between mb-8">
                <motion.div
                  className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <card.icon className="w-6 h-6 text-zinc-900 dark:text-white" />
                </motion.div>
                <div className="text-right">
                  <div
                    className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${card.gradient}`}
                  >
                    {card.metric}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mt-1">{card.metricLabel}</div>
                </div>
              </div>

              <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">{card.title}</h4>

              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
