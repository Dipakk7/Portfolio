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
    subtitle: "Building AI-powered solutions for real-world challenges.",
    description: "As an AI Engineer and Data Scientist, I interpret complex datasets to solve real-world problems. My passion lies in creating machine learning models that are not just accurate, but also interpretable and actionable.\n\nWith a strong foundation in both software engineering and statistical modeling, I approach every project with a holistic view—ensuring that the backend logic is as robust as the frontend is intuitive.\n\nI'm constantly exploring the bleeding edge of AI, from Large Language Models to Computer Vision. I believe the best solutions come from a deep understanding of the problem space combined with the right technological tools.\n\nWhen I'm not coding, you can find me analyzing market trends, contributing to open-source projects, or exploring the latest developments in generative AI.",
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
                        I build <span className="bg-gradient-to-r from-[#6366F1] to-[#818CF8] bg-clip-text text-transparent">intelligent systems</span> that transform data into meaningful impact.
                    </h3>

                    <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed text-left space-y-6">
                        <p className="font-normal text-zinc-600 dark:text-zinc-400">
                            As an AI/ML Engineer, I am passionate about leveraging Artificial Intelligence, Machine Learning, and Data Analytics to solve real-world challenges. I enjoy transforming complex data into intelligent solutions that drive better decisions and create measurable value.
                        </p>
                        <p className="font-normal text-zinc-600 dark:text-zinc-400">
                            My expertise spans Machine Learning, Deep Learning, Computer Vision, Data Analysis, and Python development. Through projects such as Deepfake Video Detection, Face Recognition Attendance Management, and E-commerce Sales Analysis, I have gained hands-on experience in developing end-to-end solutions—from data processing and model development to visualization and deployment.
                        </p>
                        <p className="font-normal text-zinc-600 dark:text-zinc-400">
                            I continuously explore emerging technologies, including Generative AI, Large Language Models, and advanced Deep Learning techniques. I believe that impactful innovation comes from combining strong technical foundations with a deep understanding of business needs and user experiences.
                        </p>
                        <p className="font-normal text-zinc-600 dark:text-zinc-400">
                            When I'm not building AI solutions, I enjoy exploring new technologies, enhancing my technical skills, and staying up to date with the latest advancements in artificial intelligence and data science. My goal is to create intelligent systems that not only solve problems but also make a meaningful impact.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
