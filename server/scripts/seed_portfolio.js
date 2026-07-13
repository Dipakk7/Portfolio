const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const HomeData = require('../src/models/HomeData');
const Experience = require('../src/models/Experience');
const Project = require('../src/models/Project');
const Certificate = require('../src/models/certificate.model');
const Blog = require('../src/models/Blog');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seedPortfolio = async () => {
    try {
        console.log('Connecting to MongoDB at:', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB successfully!');

        // 1. Seed Home Data
        console.log('Clearing HomeData...');
        await HomeData.deleteMany({});
        console.log('Seeding HomeData...');
        const homeData = {
            heroTitle: "Dipak Khandagale",
            heroSubtitle: "AI/ML Engineer",
            footerText: "© 2026 Dipak Khandagale. All rights reserved.",
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
            skills: [
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
            ],
            resumeUrl: "/resume.pdf"
        };
        await HomeData.create(homeData);
        console.log('HomeData seeded.');

        // 2. Seed Experience Data
        console.log('Clearing Experiences...');
        await Experience.deleteMany({});
        console.log('Seeding Experiences...');
        const experiences = [
            {
                company: "RaiTalk",
                role: "AI Intern",
                period: "January 2026 – May 2026",
                description: "Evaluated more than 50 prompt variations to improve AI response quality and consistency. Performed AI system testing across multiple use cases and scenarios. Supported LLM evaluation workflows and response quality assessment. Participated in API integration testing and validation. Documented experimentation results used in product improvement decisions. Assisted in identifying failure patterns and optimization opportunities. Contributed to AI evaluation and model performance analysis.",
                tags: ["Prompt Engineering", "LLM Evaluation", "AI Testing", "FastAPI", "API Integration", "Model Performance"],
                order: 0,
                isActive: true
            }
        ];
        await Experience.create(experiences);
        console.log('Experiences seeded.');

        // 3. Seed Project Data
        console.log('Clearing Projects...');
        await Project.deleteMany({});
        console.log('Seeding Projects...');
        const projects = [
            {
                title: "Scorelia",
                description: "An AI-powered career platform that helps users optimize resumes, analyze ATS compatibility, and gain actionable career insights through intelligent AI-driven analysis. Built with a modern full-stack architecture, Scorelia combines a premium user experience with powerful AI features to streamline the job application process.",
                technologies: ["React", "TypeScript", "TailwindCSS", "FastAPI", "Python", "PostgreSQL", "AI", "LLMs"],
                category: "project",
                image: "/projects/scorelia.png",
                link: "https://github.com/Dipakk7/Scorelia",
                date: new Date('2026-06-01')
            },
            {
                title: "Deepfake Video Detection",
                description: "Developed an intelligent deepfake detection system capable of identifying manipulated videos using deep learning techniques. Combined spatial and temporal feature extraction for accurate classification and real-time deployment.\n\nKey Achievements:\n• Trained on 10,000 video samples.\n• Achieved 85% precision.\n• Reduced manual verification workload by 60%.\n• Built deployment-ready inference pipeline.",
                technologies: ["Python", "TensorFlow", "FastAPI", "Deep Learning"],
                category: "project",
                image: "/projects/deepfake_detection.png",
                link: "https://github.com/Dipakk7/DeepfakeDetect",
                date: new Date('2025-11-01')
            },
            {
                title: "E-Commerce Sales Analysis",
                description: "Performed comprehensive business analysis on sales data to identify revenue drivers, customer behavior patterns, and product performance trends.\n\nKey Achievements:\n• Analyzed 15,000+ sales records.\n• Built interactive dashboards.\n• Identified top 20% products contributing 70% of revenue.\n• Generated actionable recommendations.",
                technologies: ["Python", "SQL", "Power BI"],
                category: "project",
                image: "/projects/ecommerce_analysis.png",
                link: "https://github.com/Dipakk7/Ecommerce-Sales-Analysis",
                date: new Date('2025-08-01')
            },
            {
                title: "Real-Time Face Recognition Attendance System",
                description: "Designed and developed an attendance automation system capable of recognizing users in real time using computer vision and object detection technologies.\n\nKey Achievements:\n• Supports 50+ users.\n• Recognition latency below one second.\n• Automated attendance logging.\n• Improved attendance accuracy.",
                technologies: ["Python", "OpenCV", "YOLO", "FastAPI"],
                category: "project",
                image: "/projects/face_recognition.png",
                link: "https://github.com/Dipakk7/Face_reco_attendance_management",
                date: new Date('2025-05-01')
            }
        ];
        await Project.create(projects);
        console.log('Projects seeded.');

        // 4. Seed Certificate Data
        console.log('Clearing Certificates...');
        await Certificate.deleteMany({});
        console.log('Seeding Certificates...');
        const certificates = [
            {
                title: "Oracle AI Foundations Associate",
                serialId: "OCI-AI-2025",
                image: "/certificates/OCI_AI_Foundations.png",
                pdf: "/certificates/Oracle%20Cloud%20Infrastructure%202025%20Certified%20AI%20Foundations%20Associate.pdf"
            },
            {
                title: "Oracle Generative AI Professional",
                serialId: "OCI-GENAI-2025",
                image: "/certificates/OCI_Generative_AI_Professional.png",
                pdf: "/certificates/Oracle%20Cloud%20Infrastructure%202025%20Certified%20Generative%20AI%20Professional.pdf"
            },
            {
                title: "Oracle Multicloud Architect Professional",
                serialId: "OCI-MCARCH-2025",
                image: "/certificates/OCI_Multicloud_Architect.png",
                pdf: "/certificates/OCI%20Multicloud%20Architect%20Professional%20.pdf"
            },
            {
                title: "Crash Course on Python – Coursera",
                serialId: "COURSERA-PY-2024",
                image: "/certificates/Coursera_Dipak.png",
                pdf: "/certificates/Coursera%20Dipak.pdf"
            }
        ];
        await Certificate.create(certificates);
        console.log('Certificates seeded.');

        // 5. Seed Blogs Data
        console.log('Clearing Blogs...');
        await Blog.deleteMany({});
        console.log('Seeding Blogs...');
        const blogs = [
            {
                title: "Optimizing Transformer Inference",
                summary: "A deep dive into KV-cache optimization and quantization techniques for serving LLMs at scale.",
                content: "In this article, we analyze the engineering techniques required to speed up Large Language Model inference, focusing on KV-cache architectures and FP8/INT4 weight quantization strategies.",
                author: "Dipak Khandagale",
                date: "2024-03-15",
                tags: ["Paper", "LLM", "Systems"],
                slug: "optimizing-transformer-inference"
            },
            {
                title: "The Future of Agentic AI",
                summary: "Exploring how autonomous agents will reshape software engineering workflows.",
                content: "An analysis of Agentic AI workflows, including reflection patterns, planning systems, tool use, and multi-agent consensus frameworks in modern software environments.",
                author: "Dipak Khandagale",
                date: "2024-02-10",
                tags: ["Article", "Agents", "Future"],
                slug: "future-of-agentic-ai"
            }
        ];
        await Blog.create(blogs);
        console.log('Blogs seeded.');

        console.log('All portfolio data seeded successfully!');
    } catch (error) {
        console.error('Error seeding portfolio data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
        process.exit(0);
    }
};

seedPortfolio();
