"use client";

import { cn } from "@/lib/utils";
import {
    Github,
    ExternalLink,
} from "lucide-react";
import React from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export interface BentoItem {
    title: string;
    description: string;
    icon?: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
    image?: string;
    githubUrl?: string;
    link?: string;
}

interface BentoGridProps {
    items: BentoItem[];
}


export function ProjectBentoGrid({ items }: BentoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
            {items.map((item, index) => (
                <BentoGridItem key={index} item={item} />
            ))}
        </div>
    );
}

function BentoGridItem({ item }: { item: BentoItem }) {
    const divRef = React.useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = React.useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "group relative p-4 rounded-xl overflow-hidden transition-all duration-300 min-h-[300px] flex flex-col justify-end",
                "border border-zinc-200 dark:border-zinc-900/60 bg-zinc-50 dark:bg-zinc-950/40 backdrop-blur-md",
                "hover:shadow-[0_2px_12px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.01)]",
                "hover:-translate-y-0.5 will-change-transform",
                item.colSpan || "col-span-1",
                item.colSpan === 2 ? "md:col-span-2" : "",
                {
                    "shadow-[0_2px_12px_rgba(0,0,0,0.02)] -translate-y-0.5":
                        item.hasPersistentHover,
                    "dark:shadow-[0_2px_12px_rgba(255,255,255,0.01)]":
                        item.hasPersistentHover,
                }
            )}
        >
            {/* Glowing Effect */}
            <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={1.2}
            />
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99,102,241,.15), transparent 40%)`,
                }}
            />
            {/* Background Image */}
            {item.image && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/20 group-hover:from-black/90 group-hover:via-black/55 group-hover:to-black/30 transition-all duration-300" />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                    <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-sm transition-all duration-300",
                        item.image
                            ? "bg-white/10 group-hover:bg-white/20"
                            : "bg-zinc-900/10 dark:bg-white/10 group-hover:bg-zinc-900/20 dark:group-hover:bg-white/20"
                    )}>
                        {React.isValidElement(item.icon) ? React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                            className: cn((item.icon.props as { className?: string })?.className, item.image ? "text-white" : "text-zinc-900 dark:text-white")
                        }) : item.icon}
                    </div>
                    {item.status && (
                        <span
                            className={cn(
                                "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm border transition-colors duration-300",
                                item.image
                                    ? "border-white/10 bg-white/10 text-gray-200 group-hover:bg-white/20"
                                    : "border-zinc-200 dark:border-white/10 bg-zinc-100/50 dark:bg-white/10 text-zinc-600 dark:text-gray-200 group-hover:bg-zinc-200/50 dark:group-hover:bg-white/20"
                            )}
                        >
                            {item.status}
                        </span>
                    )}
                </div>

                <div className="space-y-2">
                    <h3 className={cn("font-semibold tracking-tight text-xl", item.image ? "text-white" : "text-zinc-900 dark:text-white")}>
                        {item.title}
                        {item.meta && (
                            <span className={cn("ml-2 text-xs font-normal", item.image ? "text-gray-400" : "text-zinc-500 dark:text-gray-400")}>
                                {item.meta}
                            </span>
                        )}
                    </h3>
                    <p className={cn("text-sm leading-snug font-[425] line-clamp-2", item.image ? "text-zinc-200" : "text-zinc-600 dark:text-gray-300")}>
                        {item.description}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2 text-xs">
                        {item.tags?.slice(0, 3).map((tag, i) => (
                            <span
                                key={i}
                                className={cn(
                                    "px-2 py-1 rounded-md border backdrop-blur-sm transition-all duration-200",
                                    item.image
                                        ? "border-white/10 bg-white/10 text-gray-300 hover:bg-white/20"
                                        : "border-zinc-200 dark:border-white/10 bg-zinc-100/50 dark:bg-white/10 text-zinc-600 dark:text-gray-300 hover:bg-zinc-200/50 dark:hover:bg-white/20"
                                )}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2 transition-all duration-300">
                        {item.githubUrl && (
                            <a
                                href={item.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View Source Code"
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-300 shadow-sm",
                                    item.image
                                        ? "bg-white/10 hover:bg-white/20 border-white/10 text-white hover:border-white/20 hover:scale-105"
                                        : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:scale-105"
                                )}
                            >
                                <Github className="w-3.5 h-3.5" />
                                <span>Source Code</span>
                            </a>
                        )}
                        {item.link && (
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    item.image
                                        ? "text-white hover:text-indigo-300"
                                        : "text-zinc-600 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                                )}
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
