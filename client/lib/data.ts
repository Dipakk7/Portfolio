/**
 * Server-Side Data Fetching Layer
 * 
 * This module provides functions to fetch portfolio data at build time
 * with Incremental Static Regeneration (ISR) enabled.
 * 
 * - Data is fetched during static generation
 * - Pages revalidate every hour (3600 seconds)
 * - Backend cold starts don't affect visitors
 * - All users see the same cached content
 */

// Use the server-side API URL (not the client proxy)
const API_URL = process.env.API_URL || 'http://localhost:5000';

// Revalidate every hour (3600 seconds)
// Set to 0 for development to always fetch fresh data
const REVALIDATE_SECONDS = process.env.NODE_ENV === 'production' ? 3600 : 0;

// ==========================================
// Type Definitions
// ==========================================

export interface HeroData {
    heroTitle?: string;
    heroSubtitle?: string;
    aboutTitle?: string;
    aboutSubtitle?: string;
    aboutDescription?: string;
    email?: string;
    socialLinks?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        website?: string;
    };
    footerText?: string;
    skills?: Array<{ name: string; icon: string }>;
    resumeUrl?: string;
}

export interface Project {
    _id: string;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    githubUrl?: string;
    category: "project" | "internship" | "job";
    featured: boolean;
    image?: string;
}

export interface Blog {
    _id: string;
    title: string;
    summary?: string;
    content?: string;
    author?: string;
    image?: string;
    date?: string;
    createdAt?: string;
    tags: string[];
    slug?: string;
}

export interface Certificate {
    _id: string;
    title: string;
    serialId: string;
    image: string;
    pdf?: string;
}

export interface Experience {
    _id: string;
    company: string;
    role: string;
    period: string;
    description: string;
    tags: string[];
    order: number;
}

// ==========================================
// Fallback Data (used when API is unavailable)
// ==========================================

const fallbackHeroData: HeroData = {
    heroTitle: "Dipak Khandagale",
    heroSubtitle: "AI/ML Engineer",
    aboutTitle: "// About Me",
    aboutSubtitle: "Building intelligent AI products that create real-world impact.",
    aboutDescription: "I'm an **AI Engineer** passionate about building intelligent applications using **Machine Learning, Generative AI, Computer Vision, Large Language Models (LLMs), and Data Analytics**. I enjoy transforming complex problems into AI-powered solutions that automate workflows, generate insights, and deliver real-world value.\n\nThrough projects including **Scorelia, Deepfake Video Detection, Vision Document Parsing, Face Recognition Attendance Management, and Data Analytics Dashboards**, I've gained hands-on experience developing **end-to-end AI applications**—from data preprocessing and model development to backend APIs and modern web interfaces. I focus on building scalable, user-centric solutions that combine technical excellence with practical impact.\n\nI'm continuously exploring **AI Agents, Retrieval-Augmented Generation (RAG), multimodal AI, and modern LLM frameworks** to stay at the forefront of AI innovation. My goal is to build intelligent products that solve meaningful problems and create lasting value through technology.",
    email: "khandagaledipak47@gmail.com",
    socialLinks: {
        github: "https://github.com/Dipakk7",
        linkedin: "https://linkedin.com/in/dipakkhandagale",
        twitter: "",
        website: "",
    },
    footerText: "© 2026 Dipak Khandagale. All rights reserved.",
    resumeUrl: "https://raw.githubusercontent.com/Dipakk7/Portfolio/main/client/public/resume.pdf",
};

const fallbackExperiences: Experience[] = [
    {
        _id: "1",
        company: "RaiTalk",
        role: "AI Intern",
        period: "January 2026 – May 2026",
        description: "Evaluated more than 50 prompt variations to improve AI response quality and consistency. Performed AI system testing across multiple use cases and scenarios. Supported LLM evaluation workflows and response quality assessment. Participated in API integration testing and validation. Documented experimentation results used in product improvement decisions. Assisted in identifying failure patterns and optimization opportunities. Contributed to AI evaluation and model performance analysis.",
        tags: ["Prompt Engineering", "LLM Evaluation", "AI Testing", "FastAPI", "API Integration", "Model Performance"],
        order: 0,
    },
];

const fallbackCertificates: Certificate[] = [
    {
        _id: "1",
        title: "Oracle AI Foundations Associate",
        serialId: "OCI-AI-2025",
        image: "/certificates/OCI_AI_Foundations.png",
    },
    {
        _id: "2",
        title: "Oracle Generative AI Professional",
        serialId: "OCI-GENAI-2025",
        image: "/certificates/OCI_Generative_AI_Professional.png",
    },
    {
        _id: "3",
        title: "Oracle Multicloud Architect Professional",
        serialId: "OCI-MCARCH-2025",
        image: "/certificates/OCI_Multicloud_Architect.png",
    },
    {
        _id: "4",
        title: "Crash Course on Python – Coursera",
        serialId: "COURSERA-PY-2024",
        image: "/certificates/Coursera_Dipak.png",
    },
];

const fallbackProjects: Project[] = [
    {
        _id: "p0",
        title: "Scorelia",
        description: "An AI-powered career platform that helps users optimize resumes, analyze ATS compatibility, and gain actionable career insights through intelligent AI-driven analysis. Built with a modern full-stack architecture, Scorelia combines a premium user experience with powerful AI features to streamline the job application process.",
        technologies: ["React", "TypeScript", "TailwindCSS", "FastAPI", "Python", "PostgreSQL", "AI", "LLMs"],
        category: "project",
        featured: true,
        image: "/projects/scorelia.png",
        githubUrl: "https://github.com/Dipakk7/Scorelia",
    },
    {
        _id: "p1",
        title: "Deepfake Video Detection",
        description: "Developed an intelligent deepfake detection system capable of identifying manipulated videos using deep learning techniques. Combined spatial and temporal feature extraction for accurate classification and real-time deployment.\n\nKey Achievements:\n• Trained on 10,000 video samples.\n• Achieved 85% precision.\n• Reduced manual verification workload by 60%.\n• Built deployment-ready inference pipeline.",
        technologies: ["Python", "TensorFlow", "FastAPI", "Deep Learning"],
        category: "project",
        featured: true,
        image: "/projects/deepfake_detection.png",
        githubUrl: "https://github.com/Dipakk7/DeepfakeDetect",
    },
    {
        _id: "p2",
        title: "E-Commerce Sales Analysis",
        description: "Performed comprehensive business analysis on sales data to identify revenue drivers, customer behavior patterns, and product performance trends.\n\nKey Achievements:\n• Analyzed 15,000+ sales records.\n• Built interactive dashboards.\n• Identified top 20% products contributing 70% of revenue.\n• Generated actionable recommendations.",
        technologies: ["Python", "SQL", "Power BI"],
        category: "project",
        featured: true,
        image: "/projects/ecommerce_analysis.png",
        githubUrl: "https://github.com/Dipakk7/Ecommerce-Sales-Analysis",
    },
    {
        _id: "p3",
        title: "Real-Time Face Recognition Attendance System",
        description: "Designed and developed an attendance automation system capable of recognizing users in real time using computer vision and object detection technologies.\n\nKey Achievements:\n• Supports 50+ users.\n• Recognition latency below one second.\n• Automated attendance logging.\n• Improved attendance accuracy.",
        technologies: ["Python", "OpenCV", "YOLO", "FastAPI"],
        category: "project",
        featured: true,
        image: "/projects/face_recognition.png",
        githubUrl: "https://github.com/Dipakk7/Face_reco_attendance_management",
    }
];

const fallbackBlogs: Blog[] = [
    {
        _id: "1",
        title: "Optimizing Transformer Inference",
        summary: "A deep dive into KV-cache optimization and quantization techniques for serving LLMs at scale.",
        date: "2024-03-15",
        tags: ["Paper", "LLM", "Systems"],
        slug: "optimizing-transformer-inference"
    },
    {
        _id: "2",
        title: "The Future of Agentic AI",
        summary: "Exploring how autonomous agents will reshape software engineering workflows.",
        date: "2024-02-10",
        tags: ["Article", "Agents", "Future"],
        slug: "future-of-agentic-ai"
    }
];

// ==========================================
// Data Fetching Functions
// ==========================================

/**
 * Fetch hero/about data with ISR caching
 */
export async function getHeroData(): Promise<HeroData> {
    try {
        const res = await fetch(`${API_URL}/api/hero`, {
            next: { revalidate: REVALIDATE_SECONDS },
        });

        if (!res.ok) {
            console.warn(`[ISR] Hero fetch failed with status ${res.status}, using fallback`);
            return fallbackHeroData;
        }

        const json = await res.json();
        return json.data || fallbackHeroData;
    } catch (error) {
        console.warn('[ISR] Hero fetch error, using fallback:', error);
        return fallbackHeroData;
    }
}

/**
 * Fetch projects with ISR caching
 */
export async function getProjects(): Promise<Project[]> {
    try {
        const res = await fetch(`${API_URL}/api/projects`, {
            next: { revalidate: REVALIDATE_SECONDS },
        });

        if (!res.ok) {
            console.warn(`[ISR] Projects fetch failed with status ${res.status}, using fallback`);
            return fallbackProjects;
        }

        const json = await res.json();
        return json.data && json.data.length > 0 ? json.data : fallbackProjects;
    } catch (error) {
        console.warn('[ISR] Projects fetch error, using fallback:', error);
        return fallbackProjects;
    }
}

/**
 * Fetch blogs with ISR caching
 */
export async function getBlogs(): Promise<Blog[]> {
    try {
        const res = await fetch(`${API_URL}/api/blogs`, {
            next: { revalidate: REVALIDATE_SECONDS },
        });

        if (!res.ok) {
            console.warn(`[ISR] Blogs fetch failed with status ${res.status}, using fallback`);
            return fallbackBlogs;
        }

        const json = await res.json();
        return json.data && json.data.length > 0 ? json.data : fallbackBlogs;
    } catch (error) {
        console.warn('[ISR] Blogs fetch error, using fallback:', error);
        return fallbackBlogs;
    }
}

/**
 * Fetch certificates with ISR caching
 */
export async function getCertificates(): Promise<Certificate[]> {
    try {
        const res = await fetch(`${API_URL}/api/certificates`, {
            next: { revalidate: REVALIDATE_SECONDS },
        });

        if (!res.ok) {
            console.warn(`[ISR] Certificates fetch failed with status ${res.status}, using fallback`);
            return fallbackCertificates;
        }

        const json = await res.json();
        return json.data && json.data.length > 0 ? json.data : fallbackCertificates;
    } catch (error) {
        console.warn('[ISR] Certificates fetch error, using fallback:', error);
        return fallbackCertificates;
    }
}

/**
 * Fetch experiences with ISR caching
 */
export async function getExperiences(): Promise<Experience[]> {
    try {
        const res = await fetch(`${API_URL}/api/experiences`, {
            next: { revalidate: REVALIDATE_SECONDS },
        });

        if (!res.ok) {
            console.warn(`[ISR] Experiences fetch failed with status ${res.status}, using fallback`);
            return fallbackExperiences;
        }

        const json = await res.json();
        return json.data && json.data.length > 0 ? json.data : fallbackExperiences;
    } catch (error) {
        console.warn('[ISR] Experiences fetch error, using fallback:', error);
        return fallbackExperiences;
    }
}

/**
 * Fetch all portfolio data in parallel (for homepage)
 */
export async function getAllPortfolioData() {
    const [heroData, experiences, projects, blogs, certificates] = await Promise.all([
        getHeroData(),
        getExperiences(),
        getProjects(),
        getBlogs(),
        getCertificates(),
    ]);

    return {
        heroData,
        experiences,
        projects,
        blogs,
        certificates,
    };
}
