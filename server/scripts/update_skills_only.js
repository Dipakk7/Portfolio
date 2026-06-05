const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const HomeData = require('../src/models/HomeData');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const skills = [
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
];

async function run() {
    try {
        console.log('Connecting to database:', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');
        
        const homeDoc = await HomeData.findOne({});
        if (homeDoc) {
            console.log('Found HomeData, updating skills array...');
            homeDoc.skills = skills;
            await homeDoc.save();
            console.log('Skills array updated successfully!');
        } else {
            console.log('No HomeData document found. Creating new one with fallback values...');
            await HomeData.create({
                heroTitle: "Dipak Khandagale",
                heroSubtitle: "AI Engineer | ML Engineer | Data Analyst",
                skills: skills
            });
            console.log('HomeData document created.');
        }
    } catch (err) {
        console.error('Error during update:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

run();
