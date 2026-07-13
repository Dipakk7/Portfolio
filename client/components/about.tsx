"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { HeroData } from "@/lib/data";

interface AboutProps {
    data: HeroData | null;
}

// Default values used when no data is provided
const defaultAboutData = {
    title: "// About Me",
    subtitle: "Building intelligent AI products that create real-world impact.",
    description: "I'm an **AI Engineer** passionate about building intelligent applications using **Machine Learning, Generative AI, Computer Vision, Large Language Models (LLMs), and Data Analytics**. I enjoy transforming complex problems into AI-powered solutions that automate workflows, generate insights, and deliver real-world value.\n\nThrough projects including **Scorelia, Deepfake Video Detection, Vision Document Parsing, Face Recognition Attendance Management, and Data Analytics Dashboards**, I've gained hands-on experience developing **end-to-end AI applications**—from data preprocessing and model development to backend APIs and modern web interfaces. I focus on building scalable, user-centric solutions that combine technical excellence with practical impact.\n\nI'm continuously exploring **AI Agents, Retrieval-Augmented Generation (RAG), multimodal AI, and modern LLM frameworks** to stay at the forefront of AI innovation. My goal is to build intelligent products that solve meaningful problems and create lasting value through technology.",
};

/**
 * About Section Component
 * 
 * This component receives data as props from the parent server component.
 * No client-side fetching - data is pre-rendered at build time via ISR.
 */
export function About({ data }: AboutProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
    const y = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

    // Helper to render text with markdown bold (**) support
    const renderFormattedText = (text: string) => {
        if (!text) return null;
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return (
                    <span key={index} className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {part.slice(2, -2)}
                    </span>
                );
            }
            return part;
        });
    };

    const subtitle = data?.aboutSubtitle || defaultAboutData.subtitle;
    const description = data?.aboutDescription || defaultAboutData.description;
    const paragraphs = description.split(/\n\n+/);

    return (
        <section ref={containerRef} className="py-32 px-4 bg-zinc-50 dark:bg-black bg-dot-grid relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#6366F1]/5 blur-[150px] rounded-full -translate-y-1/2" />
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                <motion.div style={{ opacity, y }} className="space-y-8">
                    <motion.div
                        className="flex items-center gap-2 px-4 py-2 w-fit rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] dark:text-[#818CF8] text-xs font-mono tracking-wider"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <motion.span
                            className="w-2 h-2 rounded-full bg-[#6366F1]"
                            animate={{
                                opacity: [1, 0.5, 1],
                                boxShadow: [
                                    "0 0 0 0 rgba(99, 102, 241, 0.4)",
                                    "0 0 0 8px rgba(99, 102, 241, 0)",
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        {data?.aboutTitle || defaultAboutData.title}
                    </motion.div>

                    <h3 className="text-3xl md:text-5xl font-bold leading-tight text-zinc-900 dark:text-white text-left tracking-tight">
                        {subtitle}
                    </h3>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed text-left space-y-6">
                        {paragraphs.map((para, idx) => (
                            <p key={idx} className="font-normal text-zinc-600 dark:text-zinc-400">
                                {renderFormattedText(para)}
                            </p>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
