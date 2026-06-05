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
            heroSubtitle: "AI Engineer | ML Engineer | Data Analyst",
            footerText: "© 2026 Dipak Khandagale. All rights reserved.",
            aboutTitle: "// About Me",
            aboutSubtitle: "Building AI-powered solutions for real-world challenges.",
            aboutDescription: "I am a final-year B.Tech student in Artificial Intelligence and Data Science at MIT College of Engineering, Chhatrapati Sambhajinagar.\n\nMy journey focuses on combining Artificial Intelligence, Data Analytics, and Machine Learning to create practical solutions for real-world challenges.\n\nI enjoy working with:\n• Machine Learning\n• Deep Learning\n• Generative AI\n• Computer Vision\n• Data Analytics\n• Business Intelligence\n• AI Evaluation\n• LLM Testing\n• FastAPI Development\n\nI continuously explore modern AI technologies and enjoy transforming raw data into actionable insights.",
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
