const mongoose = require('mongoose');
const HomeData = require('../src/models/HomeData');
require('dotenv').config({ path: '../.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seed = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        console.log('Clearing existing home data...');
        await HomeData.deleteMany({});

        console.log('Seeding home data...');

        const initialData = {
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
                { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
                { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
                { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
                { name: "Power BI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powerbi/powerbi-original.svg" },
                { name: "Scikit-Learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
                { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
                { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
                { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
                { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" }
            ],
            resumeUrl: "/resume.pdf"
        };

        await HomeData.create(initialData);
        console.log('Seeding successful');

    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

seed();
