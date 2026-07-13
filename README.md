<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=260&section=header&text=Dipak%20Khandagale&fontSize=60&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Portfolio&descAlignY=58&descSize=30" width="100%"/>

<br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=3&width=1000" width="100%"/>

<br/>

<a href="#-overview"><img src="https://img.shields.io/badge/Overview-black?style=flat-square&logo=googledocs&logoColor=white" /></a>
<a href="#-key-features"><img src="https://img.shields.io/badge/Features-black?style=flat-square&logo=sparkfun&logoColor=white" /></a>
<a href="#%EF%B8%8F-technology-stack"><img src="https://img.shields.io/badge/Tech%20Stack-black?style=flat-square&logo=techcrunch&logoColor=white" /></a>
<a href="#-system-architecture"><img src="https://img.shields.io/badge/Architecture-black?style=flat-square&logo=diagramsdotnet&logoColor=white" /></a>
<a href="#%EF%B8%8F-installation--setup"><img src="https://img.shields.io/badge/Setup-black?style=flat-square&logo=gitbook&logoColor=white" /></a>
<a href="#-deployment"><img src="https://img.shields.io/badge/Deployment-black?style=flat-square&logo=vercel&logoColor=white" /></a>

<br/><br/>

<img src="https://img.shields.io/github/last-commit/Dipakk7/Portfolio?style=flat-square&color=6366f1&label=last%20commit" />
<img src="https://img.shields.io/github/languages/top/Dipakk7/Portfolio?style=flat-square&color=38bdf8" />
<img src="https://komarev.com/ghpvc/?username=Dipakk7&repo=Portfolio&style=flat-square&color=blue&label=repo+views" />
<img src="https://img.shields.io/badge/status-actively%20developed-brightgreen?style=flat-square" />

</div>

<br/>

## 📌 Overview

> **Portfolio** is a modern AI/ML Engineer portfolio built to showcase my technical expertise, featured projects, and professional journey. It combines a premium user experience with responsive design, smooth animations, and performance-focused architecture to create a polished digital presence.
>
> The portfolio highlights my work across **Machine Learning, Generative AI, Large Language Models (LLMs), AI Agents, Computer Vision, FastAPI, and Data Science**, while providing recruiters and developers with an intuitive way to explore my projects, skills, and experience.

<div align="center">

| | |
|:---:|:---|
| 🚀 | **Premium Design** — Modern UI with responsive layouts, smooth animations, and clean typography |
| 🤖 | **AI Engineering** — Showcasing intelligent applications, AI-powered solutions, and production-focused projects |
| 📂 | **Project Showcase** — Highlighting featured work with live demos, GitHub repositories, and technical details |
| ⚡ | **Performance & SEO** — Optimized for speed, accessibility, responsiveness, and search engine visibility |

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 🚀 Key Features

<table>
<tr>
<td width="50%" valign="top">

### 🎨 Creative UI/UX
WebGL mosaic shader hero animations, buttery Framer Motion transitions, an interactive limelight nav bar, and a custom cursor — with full dark/light mode theming.

### 🏎️ ISR-Powered Performance
Every public page is statically generated at build time and revalidated hourly, so visitors never wait on a backend cold start.

</td>
<td width="50%" valign="top">

### 📊 Admin Dashboard
A dedicated CMS for hero copy, about section, skills, experience timeline, projects (with image uploads), blogs, and certificates — all reflected on the live site via ISR.

### 🛡️ Security-First Backend
API fully proxied and hidden behind Next.js, with XSS-sanitized inputs, rate limiting, Zod schema validation, and Helmet security headers.

</td>
</tr>
</table>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 🛠️ Technology Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,nodejs,express,mongodb,vercel" />

</div>

| Layer | Technology | Details |
|:--|:--|:--|
| **Frontend** | Next.js 15, React 18, TypeScript | App Router, ISR-driven static rendering |
| **Styling & Motion** | Tailwind CSS, Framer Motion | Utility-first styling, smooth page/element transitions |
| **Backend** | Node.js, Express | REST API, proxied through Next.js and never exposed directly |
| **Database** | MongoDB | Document store for projects, blogs, certificates, experience, messages |
| **Media** | Cloudinary | Image uploads and optimized delivery for admin-managed content |
| **Validation & Security** | Zod, Helmet, rate limiting | Type-safe schemas and hardened API surface |
| **Auth** | JWT | Token-based admin authentication |
| **Deployment** | Vercel (frontend), Render (backend) | Static CDN hosting + always-on API service |

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 📐 System Architecture

```mermaid
graph TD
    User[Visitor] --> CDN[Vercel CDN - Static HTML]
    CDN --> Frontend[Next.js 15 Frontend]

    Admin[Admin User] --> AdminUI[Admin Dashboard]
    AdminUI --> API[Express API]
    API --> Auth[JWT Auth Guard]
    API --> DB[(MongoDB)]
    API --> Cloudinary[Cloudinary Media Storage]

    API -->|content update| Revalidate[Revalidation Trigger]
    Revalidate -->|automatic, hourly| Build[Rebuild Static Pages]
    Revalidate -->|manual, /api/revalidate| Build
    Build --> CDN
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 📂 Folder Structure

```
Portfolio/
├── client/                  # Next.js Frontend
│   ├── app/                 # App Router pages
│   │   ├── admin/           # Admin dashboard
│   │   ├── blog/            # Blog pages
│   │   └── api/             # API routes (revalidation)
│   ├── components/          # React components
│   ├── lib/
│   │   └── data.ts          # ISR data fetching layer
│   └── public/               # Static assets
│
├── server/                   # Express Backend
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── models/           # Mongoose schemas
│   │   ├── router/           # API routes
│   │   └── middleware/       # Auth, validation, etc.
│   └── scripts/
│       └── create_admin.js   # Admin user creation
│
├── certificates/              # Certificate assets
├── Dipak_Khandagale_Resume.pdf
├── netlify.toml
├── LICENSE
└── README.md
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 📸 Screenshots

| Feature | Preview |
|:--|:--:|
| Hero (WebGL Shader) | *coming soon* |
| Projects Grid | *coming soon* |
| Admin Dashboard | *coming soon* |
| Blog | *coming soon* |

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## ⚙️ Installation & Setup

<details open>
<summary><b>Prerequisites</b></summary>
<br/>

- Node.js 18+
- MongoDB Atlas account
- Cloudinary account (for media)

</details>

<details open>
<summary><b>1. Clone the repository</b></summary>
<br/>

```bash
git clone https://github.com/Dipakk7/Portfolio.git
cd Portfolio
```

</details>

<details>
<summary><b>2. Install dependencies</b></summary>
<br/>

```bash
npm install          # Root package.json
cd client && npm install
cd ../server && npm install
```

</details>

<details>
<summary><b>3. Client environment</b></summary>
<br/>

Create `client/.env.local`:

```env
# Server-side only (for ISR data fetching)
API_URL=http://localhost:5000

# Optional: On-demand revalidation
REVALIDATE_SECRET=your-super-secret-key
```

</details>

<details>
<summary><b>4. Server environment</b></summary>
<br/>

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://...

# Authentication
JWT_SECRET=your-jwt-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
```

</details>

<details open>
<summary><b>5. Run locally</b></summary>
<br/>

**Backend:**

```bash
cd server
npm run dev
# → http://localhost:5000
```

**Frontend:**

```bash
cd client
npm run dev
# → http://localhost:3000
```

</details>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 🌐 Deployment

<table>
<tr>
<td width="50%" valign="top">

### Frontend (Vercel)
1. Import the `client` folder to Vercel
2. Set `API_URL` and `REVALIDATE_SECRET`
3. Deploy 🚀

</td>
<td width="50%" valign="top">

### Backend (Render)
1. Create a new Web Service from the `server` folder
2. Set all backend environment variables
3. Deploy 🚀

</td>
</tr>
</table>

**On-demand revalidation** — after updating content in admin, trigger an instant cache refresh:

```bash
curl "https://your-site.vercel.app/api/revalidate?secret=YOUR_SECRET"
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2&width=1000" width="100%"/>

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

<br/>

<div align="center">

## 👨‍💻 Connect With Me

[![GitHub](https://img.shields.io/badge/GitHub-Dipakk7-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Dipakk7)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Dipak%20Khandagale-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dipakkhandagale/)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit%20Site-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://dipakkhandagale.vercel.app/)

<br/>

### ⭐ If you find this useful, consider starring the repo!

[![Star on GitHub](https://img.shields.io/github/stars/Dipakk7/Portfolio?style=for-the-badge&color=gold&logo=github)](https://github.com/Dipakk7/Portfolio/stargazers)

<br/><br/>

<a href="#portfolio">
  <img src="https://img.shields.io/badge/⬆-Back%20to%20Top-black?style=for-the-badge" />
</a>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

</div>
