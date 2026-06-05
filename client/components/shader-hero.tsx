"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowDown, Download } from "lucide-react"
import { HyperText } from "@/components/ui/hyper-text"
import type { HeroData } from "@/lib/data"

interface ShaderAnimationProps {
    heroData?: HeroData | null;
}

// Default values for hero section
const defaultHeroData = {
    heroTitle: "Dipak Khandagale",
    heroSubtitle: "AI Engineer | Machine Learning Engineer | Data Analyst",
};

export function ShaderAnimation({ heroData }: ShaderAnimationProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    
    // Parse hero title into first and last name
    const fullName = heroData?.heroTitle || defaultHeroData.heroTitle;
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || "Dipak";
    const lastName = nameParts.slice(1).join(' ') || "Khandagale";

    // Parse subtitle into parts
    const subtitle = heroData?.heroSubtitle || defaultHeroData.heroSubtitle;
    const subtitleParts = subtitle.split(/[•|]/).map(s => s.trim()).filter(Boolean);
    const subtitle1 = subtitleParts[0] || "AI Engineer";

    const rotatingTitles = [
        "Data Analyst",
        "Machine Learning",
        "Applied AI Engineer",
        "Generative AI Engineer",
        "Data Scientist (Fresher)",
        "AI Research Intern",
        "Computer Vision Developer",
        "Python Developer",
        "AI Engineer"
    ];
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

    useEffect(() => {
        const titleInterval = setInterval(() => {
            setCurrentTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
        }, 3000);
        return () => clearInterval(titleInterval);
    }, []);

    // Get resume URL
    const resumeUrl = heroData?.resumeUrl;

    // Interactive mouse coordinates tracking using Framer Motion springs
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const isMouseOver = useMotionValue(0)

    const springConfig = { damping: 60, stiffness: 200, mass: 0.6 }
    const xSpring = useSpring(mouseX, springConfig)
    const ySpring = useSpring(mouseY, springConfig)
    const opacitySpring = useSpring(isMouseOver, { damping: 40, stiffness: 150 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            mouseX.set(e.clientX - rect.left)
            mouseY.set(e.clientY - rect.top)
            isMouseOver.set(1)
        }

        const handleMouseLeave = () => {
            isMouseOver.set(0)
        }

        const container = containerRef.current
        if (container) {
            window.addEventListener("mousemove", handleMouseMove)
            document.body.addEventListener("mouseleave", handleMouseLeave)
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            document.body.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [mouseX, mouseY, isMouseOver])

    // Background radial gradient mapped to mouse movement
    const mouseGlowBg = useTransform(
        [xSpring, ySpring],
        ([x, y]) => `radial-gradient(circle 350px at ${x}px ${y}px, var(--hero-glow-color), transparent 80%)`
    )

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-white dark:bg-black overflow-hidden flex items-center justify-center transition-colors duration-700">
            
            {/* Grid Mesh Background */}
            <div className="absolute inset-0 bg-grid-mesh pointer-events-none z-0" />

            {/* Radial mask to fade the grid near the edges */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,#ffffff_85%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_25%,#000000_85%)] pointer-events-none z-0" />

            {/* Interactive mouse follow glow */}
            <motion.div 
                className="absolute inset-0 pointer-events-none z-0"
                style={{ background: mouseGlowBg, opacity: opacitySpring }}
            />

            {/* Static breathing glow in the center for depth (works well on mobile) */}
            <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[var(--hero-glow-static)] rounded-full blur-[100px] pointer-events-none z-0 animate-breathe" />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center pointer-events-none select-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >

                    {/* Name Header */}
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter select-none leading-[0.9] flex flex-col items-center">
                        <motion.span
                            className="block bg-gradient-to-r from-zinc-950 via-[#6366F1] to-zinc-800 dark:from-white dark:via-[#818CF8] dark:to-zinc-300 bg-clip-text text-transparent pb-1"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {firstName}
                        </motion.span>
                        <motion.span
                            className="block bg-gradient-to-r from-zinc-800 via-[#6366F1] to-zinc-950 dark:from-zinc-300 dark:via-[#818CF8] dark:to-white bg-clip-text text-transparent pb-2"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {lastName}
                        </motion.span>
                    </h1>

                    {/* Subtitle with dynamic loop */}
                    <motion.div
                        className="mt-6 flex flex-wrap items-center justify-center gap-2.5 pointer-events-auto min-h-[40px]"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <HyperText
                            text={subtitle1}
                            className="text-lg md:text-xl font-light tracking-wide text-zinc-700 dark:text-zinc-300 font-mono"
                            duration={400}
                        />
                        <span className="text-zinc-300 dark:text-zinc-600 text-lg md:text-xl">•</span>
                        <div className="inline-flex items-center">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentTitleIndex}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.25 }}
                                    className="text-lg md:text-xl font-light tracking-wide text-zinc-500 dark:text-zinc-400 font-mono"
                                >
                                    {rotatingTitles[currentTitleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ArrowDown className="w-6 h-6 text-zinc-500" />
                </motion.div>
            </motion.div>
        </div>
    )
}
