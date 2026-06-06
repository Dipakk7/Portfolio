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
    subtitle: "Building intelligent AI solutions that turn data into insights, innovation, and impact.",
    description: "I'm an AI/ML Engineer passionate about developing intelligent systems using Machine Learning, Deep Learning, Computer Vision, and Data Analytics. I enjoy solving complex problems and turning data into meaningful insights that drive better decisions and real-world outcomes.\n\nThrough projects such as Deepfake Video Detection, Face Recognition Attendance Management, and E-commerce Sales Analysis, I have gained hands-on experience in data processing, model development, visualization, and deployment. These experiences have strengthened my ability to build end-to-end AI solutions that are both practical and impactful.\n\nI continuously explore emerging technologies such as Generative AI, Large Language Models (LLMs), and advanced deep learning techniques to expand my knowledge and stay current in the rapidly evolving AI landscape. Beyond technical development, I believe successful AI solutions combine innovation, business understanding, and a user-focused approach.\n\nMy goal is to create intelligent, data-driven solutions that not only solve challenging problems but also deliver measurable value and meaningful impact.",
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
                        {"// About Me"}
                    </motion.div>

                    <h3 className="text-3xl md:text-5xl font-bold leading-tight text-zinc-900 dark:text-white text-left tracking-tight">
                        Building intelligent AI solutions that turn data into insights, innovation, and impact.
                    </h3>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed text-left space-y-6">
                        <p className="font-normal text-zinc-600 dark:text-zinc-400">
                            I'm an <span className="font-semibold text-zinc-900 dark:text-zinc-100">AI/ML Engineer</span> passionate about developing intelligent systems using <span className="font-semibold text-zinc-900 dark:text-zinc-100">Machine Learning, Deep Learning, Computer Vision, and Data Analytics</span>. I enjoy solving complex problems and turning data into meaningful insights that drive better decisions and real-world outcomes.
                        </p>
                        <p className="font-normal text-zinc-600 dark:text-zinc-400">
                            Through projects such as <span className="font-semibold text-zinc-900 dark:text-zinc-100">Deepfake Video Detection</span>, <span className="font-semibold text-zinc-900 dark:text-zinc-100">Face Recognition Attendance Management</span>, and <span className="font-semibold text-zinc-900 dark:text-zinc-100">E-commerce Sales Analysis</span>, I have gained hands-on experience in data processing, model development, visualization, and deployment. These experiences have strengthened my ability to build <span className="font-semibold text-zinc-900 dark:text-zinc-100">end-to-end AI solutions</span> that are both practical and impactful.
                        </p>
                        <p className="font-normal text-zinc-600 dark:text-zinc-400">
                            I continuously explore emerging technologies such as <span className="font-semibold text-zinc-900 dark:text-zinc-100">Generative AI, Large Language Models (LLMs)</span>, and advanced deep learning techniques to expand my knowledge and stay current in the rapidly evolving AI landscape. Beyond technical development, I believe successful AI solutions combine innovation, business understanding, and a user-focused approach.
                        </p>
                        <p className="font-normal text-zinc-600 dark:text-zinc-400">
                            My goal is to create intelligent, data-driven solutions that not only solve challenging problems but also deliver <span className="font-semibold text-zinc-900 dark:text-zinc-100">measurable value and meaningful impact</span>.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
