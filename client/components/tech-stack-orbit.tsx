"use client"

import React, { useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"

// =========================================================================
// 1. AUTHENTIC TECHNOLOGY VECTOR LOGOS (Strictly from locked 36 skills)
// =========================================================================

function PythonLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M63.5 8C33.8 8 35.5 20.9 35.5 20.9l.03 13.3h28.4v4H20.4S8 36.8 8 66.5c0 29.6 10.8 28.5 10.8 28.5h9.7v-13.6s-.5-16.2 15.9-16.2h27.4s15.3.3 15.3-15V23S89 8 63.5 8zM49.2 18.2a4.4 4.4 0 110 8.8 4.4 4.4 0 010-8.8z"
        fill="#3776AB"
      />
      <path
        d="M64.5 120c29.7 0 28-12.9 28-12.9l-.03-13.3H64.07v-4H107.6s12.4 1.4 12.4-28.3c0-29.6-10.8-28.5-10.8-28.5h-9.7v13.6s.5 16.2-15.9 16.2H56.2s-15.3-.3-15.3 15v26.9S39 120 64.5 120zM78.8 109.8a4.4 4.4 0 110-8.8 4.4 4.4 0 010 8.8z"
        fill="#FFD43B"
      />
    </svg>
  )
}

function DockerLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M123.6 57.5c-2.4-1.7-7.4-2.8-12.1-1.6-1-5.3-5-9.6-10.2-11.7l-2.4-.9-.8 2.4c-1.3 4.2-1.3 8.7 0 12.9-2.3 1.3-6.5 4.5-8.2 9.5H7.7c-1.4 5.3-2 10.7-1.8 16.2.6 15 8.7 26.5 21.6 30.7 28.7 9.4 67.5 7.6 86.8-17.6 9-11.8 10.2-28.4 9.3-39.9zm-97.1-4.2h10.8v10.8H26.5V53.3zm0-13.2h10.8v10.8H26.5V40.1zm13.2 13.2h10.8v10.8H39.7V53.3zm0-13.2h10.8v10.8H39.7V40.1zm13.2 13.2h10.8v10.8H52.9V53.3zm0-13.2h10.8v10.8H52.9V40.1zm13.2 13.2h10.8v10.8H66.1V53.3zm0-13.2h10.8v10.8H66.1V40.1zm0-13.2h10.8v10.8H66.1V26.9zm13.2 26.4h10.8v10.8H79.3V53.3z"
        fill="#2496ED"
      />
    </svg>
  )
}

function TensorFlowLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path d="M64 8l52 30v60L64 68V8z" fill="#FF6F00" />
      <path d="M64 8L12 38v60l52-30V8z" fill="#FF9800" />
      <path d="M64 68l52 30-52 30-52-30 52-30z" fill="#E65100" opacity="0.85" />
    </svg>
  )
}

function FastAPILogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <circle cx="64" cy="64" r="56" fill="#059669" />
      <path d="M68 28L36 68h24l-8 32 36-44H64l8-28z" fill="#FFFFFF" />
    </svg>
  )
}

function PostgreSQLLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M64 12C35.3 12 12 35.3 12 64c0 14.2 5.7 27 15 36.4l6.6-9.8c-5.7-7.4-9.1-16.7-9.1-26.6 0-23.4 19.1-42.5 42.5-42.5 17.5 0 32.6 10.6 39.1 25.7l11.4-4.8C108.6 24.3 88 12 64 12z"
        fill="#336791"
      />
      <path
        d="M64 34c-16.6 0-30 13.4-30 30 0 7.8 3 14.9 7.9 20.3l7.9-10.4c-2.3-2.9-3.7-6.6-3.7-10.7 0-9.8 8-17.8 17.8-17.8 5.7 0 10.7 2.7 13.9 6.9l9.5-6.6C79.7 39 72.3 34 64 34z"
        fill="#4183C4"
      />
      <circle cx="64" cy="64" r="16" fill="#336791" />
    </svg>
  )
}

function GitLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M122.7 54.8L73.2 5.3c-4.4-4.4-11.5-4.4-15.9 0L42.6 20l20.1 20.1c4.7-1.6 10.2-.5 13.9 3.2 3.7 3.7 4.8 9.2 3.2 13.9l19.4 19.4c4.7-1.6 10.2-.5 13.9 3.2 5.2 5.2 5.2 13.7 0 18.9-5.2 5.2-13.7 5.2-18.9 0-3.9-3.9-4.9-9.7-3-14.5L72.8 65.8v29.5c1.9 1 3.5 2.6 4.6 4.7 3.4 6.5.9 14.5-5.6 17.9-6.5 3.4-14.5.9-17.9-5.6-3.4-6.5-.9-14.5 5.6-17.9 2.1-1.1 4.5-1.5 6.8-1.3V63.2c-2.3.2-4.7-.2-6.8-1.3-4.7-2.5-7.5-7.3-7.4-12.5L25.8 29.1 5.3 49.6c-4.4 4.4-4.4 11.5 0 15.9l49.5 49.5c4.4 4.4 11.5 4.4 15.9 0l52-52c4.4-4.4 4.4-11.6 0-16z"
        fill="#F05032"
      />
    </svg>
  )
}

function GitHubLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 5.3C29.8 5.3 2 33 2 67.3c0 27.4 17.8 50.7 42.4 58.9 3.1.6 4.2-1.3 4.2-3 0-1.5-.1-6.4-.1-11.8-17.2 3.7-20.9-7.3-20.9-7.3-2.8-7.2-6.9-9.1-6.9-9.1-5.6-3.8.4-3.8.4-3.8 6.2.4 9.5 6.4 9.5 6.4 5.5 9.5 14.5 6.7 18 5.2.6-4 2.2-6.7 4-8.3-13.8-1.6-28.2-6.9-28.2-30.6 0-6.8 2.4-12.3 6.4-16.6-.6-1.6-2.8-7.9.6-16.4 0 0 5.2-1.7 17 6.3 5-1.4 10.3-2.1 15.6-2.1 5.3 0 10.6.7 15.6 2.1 11.8-8 17-6.3 17-6.3 3.4 8.5 1.2 14.8.6 16.4 4 4.3 6.4 9.8 6.4 16.6 0 23.8-14.5 29-28.3 30.5 2.2 1.9 4.3 5.7 4.3 11.6 0 8.4-.1 15.1-.1 17.2 0 1.7 1.1 3.7 4.3 3 24.6-8.2 42.4-31.4 42.4-58.9C126 33 98.2 5.3 64 5.3z"
      />
    </svg>
  )
}

function OpenCVLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <circle cx="64" cy="36" r="22" fill="#EE2C2C" />
      <circle cx="64" cy="36" r="10" fill="#FFFFFF" />
      <circle cx="38" cy="84" r="22" fill="#00EE00" />
      <circle cx="38" cy="84" r="10" fill="#FFFFFF" />
      <circle cx="90" cy="84" r="22" fill="#1E90FF" />
      <circle cx="90" cy="84" r="10" fill="#FFFFFF" />
    </svg>
  )
}

function PandasLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect x="24" y="24" width="18" height="80" rx="9" fill="#150458" />
      <rect x="55" y="40" width="18" height="64" rx="9" fill="#FFD43B" />
      <rect x="86" y="24" width="18" height="52" rx="9" fill="#E70488" />
      <rect x="55" y="16" width="18" height="18" rx="9" fill="#00A3E0" />
    </svg>
  )
}

function SQLLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <ellipse cx="64" cy="30" rx="44" ry="16" fill="#0284C7" />
      <path d="M20 30v34c0 8.8 19.7 16 44 16s44-7.2 44-16V30" stroke="#0369A1" strokeWidth="8" fill="#0EA5E9" />
      <path d="M20 64v34c0 8.8 19.7 16 44 16s44-7.2 44-16V64" stroke="#075985" strokeWidth="8" fill="#0284C7" />
    </svg>
  )
}

function MySQLLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="28" fill="#00758F" />
      <path
        d="M28 88c12-32 38-48 64-40-6 10-18 16-28 16-8 0-14-3-20-4-8-1-12 12-16 28z"
        fill="#F29111"
      />
      <circle cx="86" cy="46" r="4" fill="#FFFFFF" />
    </svg>
  )
}

function LangChainLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <circle cx="64" cy="64" r="54" fill="#0F172A" />
      <path
        d="M40 76c-4-4-6-10-6-16s2-12 6-16l14-14c8-8 22-8 30 0s8 22 0 30l-6 6"
        stroke="#10B981"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M88 52c4 4 6 10 6 16s-2 12-6 16l-14 14c-8 8-22 8-30 0s-8-22 0-30l6-6"
        stroke="#38BDF8"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  )
}

function YOLOLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="28" fill="#0284C7" />
      <circle cx="64" cy="64" r="32" stroke="#38BDF8" strokeWidth="8" strokeDasharray="12 6" />
      <circle cx="64" cy="64" r="14" fill="#FFFFFF" />
      <path d="M64 16v20M64 92v20M16 64h20M92 64h20" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}

function KerasLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="28" fill="#D00000" />
      <path
        d="M38 28v72h18V70l24 30h22L72 64l28-36H78L56 56V28H38z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

function NumPyLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="28" fill="#013243" />
      <path
        d="M32 36h18l28 42V36h18v56H78L50 50v42H32V36z"
        fill="#4DABCF"
      />
    </svg>
  )
}

function ScikitLearnLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <circle cx="48" cy="48" r="30" fill="#F89939" opacity="0.9" />
      <circle cx="80" cy="80" r="30" fill="#3499CD" opacity="0.9" />
      <path d="M48 48l32 32" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
      <circle cx="48" cy="48" r="8" fill="#FFFFFF" />
      <circle cx="80" cy="80" r="8" fill="#FFFFFF" />
    </svg>
  )
}

function VSCodeLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M93.3 121.7c3.9 1.9 8.6.9 11.4-2.5l19.5-18.7c2.5-2.4 3.8-5.8 3.8-9.3V36.8c0-3.5-1.3-6.9-3.8-9.3L104.7 8.8c-2.8-3.4-7.5-4.4-11.4-2.5L39.8 32.7l-22-16.7c-2.4-1.8-5.6-1.9-8-.3-2.5 1.7-3.8 4.7-3.4 7.7l8.4 40.6-8.4 40.6c-.4 3 .9 6 3.4 7.7 2.4 1.6 5.6 1.5 8-.3l22-16.7 53.5 26.6zM88 43.1L51.8 70.7 33.6 56.9l54.4-28.5v14.7z"
        fill="#007ACC"
      />
    </svg>
  )
}

function JupyterLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <circle cx="64" cy="24" r="10" fill="#E46E2E" />
      <circle cx="64" cy="104" r="10" fill="#767677" />
      <path
        d="M28 64c0-19.9 16.1-36 36-36s36 16.1 36 36-16.1 36-36 36-36-16.1-36-36z"
        stroke="#F37626"
        strokeWidth="10"
        strokeDasharray="90 30"
      />
    </svg>
  )
}

function PowerBILogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect x="22" y="54" width="22" height="52" rx="6" fill="#E8B000" />
      <rect x="52" y="34" width="22" height="72" rx="6" fill="#F2C811" />
      <rect x="82" y="14" width="22" height="92" rx="6" fill="#F8E067" />
    </svg>
  )
}

function ChromaDBLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <circle cx="44" cy="44" r="24" fill="#FF5E5B" />
      <circle cx="84" cy="44" r="24" fill="#00CECB" />
      <circle cx="44" cy="84" r="24" fill="#FFED66" />
      <circle cx="84" cy="84" r="24" fill="#FFAAA6" />
    </svg>
  )
}

// --- 5 Additional Unique Skills from Locked 36 Skills Dataset ---

function OllamaLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M64 12c-16 0-28 12-28 28 0 8 3 15 8 20l-12 36h20l6-18h12l6 18h20L84 60c5-5 8-12 8-20 0-16-12-28-28-28z"
        fill="#111827"
        className="dark:fill-white"
      />
      <circle cx="52" cy="36" r="4" fill="#6366F1" />
      <circle cx="76" cy="36" r="4" fill="#6366F1" />
    </svg>
  )
}

function ColabLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <path
        d="M38 42c-12 0-22 10-22 22s10 22 22 22c8 0 15-4 18-11l-8-5c-2 5-6 8-10 8-8 0-14-6-14-14s6-14 14-14c4 0 8 3 10 8l8-5c-3-7-10-11-18-11z"
        fill="#F9AB00"
      />
      <path
        d="M90 42c-8 0-15 4-18 11l8 5c2-5 6-8 10-8 8 0 14 6 14 14s-6 14-14 14c-4 0-8-3-10-8l-8 5c3 7 10 11 18 11 12 0 22-10 22-22s-10-22-22-22z"
        fill="#E37400"
      />
    </svg>
  )
}

function ElasticsearchLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="28" fill="#005571" />
      <circle cx="64" cy="64" r="32" stroke="#FED10A" strokeWidth="8" />
      <path d="M40 64h48" stroke="#3EB1C8" strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}

function MatplotlibLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="28" fill="#11557C" />
      <circle cx="64" cy="64" r="42" stroke="#E66A2C" strokeWidth="6" />
      <path d="M32 78c16-28 32-28 48 0s16 0 16 0" stroke="#719FB0" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

function SeabornLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" className={className} fill="none">
      <rect width="128" height="128" rx="28" fill="#385D7E" />
      <path d="M28 88c20-40 40-40 72 0" stroke="#87C4EA" strokeWidth="8" strokeLinecap="round" />
      <path d="M28 68c20-30 40-30 72 0" stroke="#D3E8F5" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}

// =========================================================================
// 2. 3D FLOATING ECOSYSTEM DATA (25 UNIQUE Technologies from Locked 36 Skills)
// =========================================================================

interface FloatingTechItem {
  id: string
  name: string
  logo: React.ComponentType<{ className?: string }>
  xPct: number // Center offset percentage (-50 to +50)
  yPct: number // Center offset percentage (-50 to +50)
  initialRotate: number
  scale: number
  depthZ: number
  // Active, continuous 3D floating vectors
  travelX: [number, number, number, number]
  travelY: [number, number, number, number]
  travelRotate: [number, number, number, number]
  travelScale: [number, number, number, number]
  duration: number
  delay: number
  hideOnMobile?: boolean
}

export function TechStackOrbit() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })
  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1]

  // Curated 25 UNIQUE authentic technologies from locked 36 skills with independent continuous floating trajectories
  const floatingItems: FloatingTechItem[] = useMemo(
    () => [
      // 1. Python (Top-Left Outer)
      {
        id: "python",
        name: "Python",
        logo: PythonLogo,
        xPct: -36,
        yPct: -36,
        initialRotate: -10,
        scale: 1.15,
        depthZ: 32,
        travelX: [0, -28, 16, 0],
        travelY: [0, -36, 20, 0],
        travelRotate: [-10, -2, -18, -10],
        travelScale: [1.15, 1.25, 1.08, 1.15],
        duration: 2.7,
        delay: 0,
      },
      // 2. TensorFlow (Top-Right Inner)
      {
        id: "tensorflow",
        name: "TensorFlow",
        logo: TensorFlowLogo,
        xPct: 14,
        yPct: -38,
        initialRotate: 8,
        scale: 1.10,
        depthZ: 28,
        travelX: [0, 30, -18, 0],
        travelY: [0, -28, 22, 0],
        travelRotate: [8, 16, 1, 8],
        travelScale: [1.10, 1.20, 1.04, 1.10],
        duration: 3.0,
        delay: 0.25,
      },
      // 3. LangChain (Top-Right High)
      {
        id: "langchain",
        name: "LangChain",
        logo: LangChainLogo,
        xPct: 37,
        yPct: -32,
        initialRotate: -12,
        scale: 1.02,
        depthZ: 24,
        travelX: [0, -24, 28, 0],
        travelY: [0, 26, -32, 0],
        travelRotate: [-12, -3, -20, -12],
        travelScale: [1.02, 1.12, 0.96, 1.02],
        duration: 3.3,
        delay: 0.7,
      },
      // 4. FastAPI (Right Flank Mid)
      {
        id: "fastapi",
        name: "FastAPI",
        logo: FastAPILogo,
        xPct: 41,
        yPct: -8,
        initialRotate: 9,
        scale: 1.16,
        depthZ: 34,
        travelX: [0, 32, -18, 0],
        travelY: [0, -26, 30, 0],
        travelRotate: [9, 18, 2, 9],
        travelScale: [1.16, 1.26, 1.08, 1.16],
        duration: 2.6,
        delay: 0.12,
      },
      // 5. PostgreSQL (Right Flank Lower)
      {
        id: "postgresql",
        name: "PostgreSQL",
        logo: PostgreSQLLogo,
        xPct: 37,
        yPct: 18,
        initialRotate: -7,
        scale: 1.06,
        depthZ: 26,
        travelX: [0, -28, 22, 0],
        travelY: [0, 32, -22, 0],
        travelRotate: [-7, 4, -16, -7],
        travelScale: [1.06, 1.16, 1.0, 1.06],
        duration: 3.2,
        delay: 0.5,
      },
      // 6. Docker (Bottom-Right Outer)
      {
        id: "docker",
        name: "Docker",
        logo: DockerLogo,
        xPct: 26,
        yPct: 38,
        initialRotate: 11,
        scale: 1.14,
        depthZ: 30,
        travelX: [0, 26, -30, 0],
        travelY: [0, 34, -20, 0],
        travelRotate: [11, 20, 3, 11],
        travelScale: [1.14, 1.24, 1.06, 1.14],
        duration: 2.9,
        delay: 0.2,
      },
      // 7. SQL (Bottom Center-Right)
      {
        id: "sql",
        name: "SQL",
        logo: SQLLogo,
        xPct: -4,
        yPct: 39,
        initialRotate: -6,
        scale: 1.02,
        depthZ: 22,
        travelX: [0, -30, 20, 0],
        travelY: [0, 26, -30, 0],
        travelRotate: [-6, 5, -14, -6],
        travelScale: [1.02, 1.12, 0.96, 1.02],
        duration: 3.4,
        delay: 0.85,
      },
      // 8. Git (Bottom-Left Deep)
      {
        id: "git",
        name: "Git",
        logo: GitLogo,
        xPct: -29,
        yPct: 35,
        initialRotate: 14,
        scale: 1.10,
        depthZ: 29,
        travelX: [0, -22, 32, 0],
        travelY: [0, 30, -26, 0],
        travelRotate: [14, 22, 6, 14],
        travelScale: [1.10, 1.20, 1.02, 1.10],
        duration: 3.1,
        delay: 0.4,
      },
      // 9. GitHub (Left Flank Mid)
      {
        id: "github",
        name: "GitHub",
        logo: GitHubLogo,
        xPct: -41,
        yPct: 14,
        initialRotate: -6,
        scale: 1.08,
        depthZ: 28,
        travelX: [0, -34, 24, 0],
        travelY: [0, -20, 32, 0],
        travelRotate: [-6, 5, -14, -6],
        travelScale: [1.08, 1.18, 1.0, 1.08],
        duration: 2.8,
        delay: 0.3,
      },
      // 10. OpenCV (Left Flank High)
      {
        id: "opencv",
        name: "OpenCV",
        logo: OpenCVLogo,
        xPct: -42,
        yPct: -14,
        initialRotate: 12,
        scale: 1.04,
        depthZ: 25,
        travelX: [0, 26, -30, 0],
        travelY: [0, -32, 24, 0],
        travelRotate: [12, 20, 4, 12],
        travelScale: [1.04, 1.14, 0.98, 1.04],
        duration: 3.3,
        delay: 0.75,
      },
      // 11. Pandas (Top Center-Left)
      {
        id: "pandas",
        name: "Pandas",
        logo: PandasLogo,
        xPct: -14,
        yPct: -40,
        initialRotate: 8,
        scale: 1.0,
        depthZ: 21,
        travelX: [0, 22, -26, 0],
        travelY: [0, -24, 28, 0],
        travelRotate: [8, 16, 0, 8],
        travelScale: [1.0, 1.10, 0.94, 1.0],
        duration: 3.5,
        delay: 1.0,
      },
      // 12. YOLO (Right Center-Inner)
      {
        id: "yolo",
        name: "YOLO",
        logo: YOLOLogo,
        xPct: 26,
        yPct: -14,
        initialRotate: -10,
        scale: 0.98,
        depthZ: 20,
        travelX: [0, -24, 22, 0],
        travelY: [0, 28, -20, 0],
        travelRotate: [-10, -1, -18, -10],
        travelScale: [0.98, 1.08, 0.92, 0.98],
        duration: 3.0,
        delay: 0.6,
      },
      // 13. Keras (Left Mid-Inner)
      {
        id: "keras",
        name: "Keras",
        logo: KerasLogo,
        xPct: -23,
        yPct: -12,
        initialRotate: 7,
        scale: 0.96,
        depthZ: 19,
        travelX: [0, 24, -18, 0],
        travelY: [0, -26, 30, 0],
        travelRotate: [7, 15, 0, 7],
        travelScale: [0.96, 1.06, 0.90, 0.96],
        duration: 3.5,
        delay: 0.8,
        hideOnMobile: true,
      },
      // 14. NumPy (Top-Right Mid-Inner)
      {
        id: "numpy",
        name: "NumPy",
        logo: NumPyLogo,
        xPct: 24,
        yPct: -38,
        initialRotate: -8,
        scale: 0.98,
        depthZ: 18,
        travelX: [0, -18, 28, 0],
        travelY: [0, 24, -26, 0],
        travelRotate: [-8, 0, -15, -8],
        travelScale: [0.98, 1.08, 0.92, 0.98],
        duration: 3.1,
        delay: 0.35,
        hideOnMobile: true,
      },
      // 15. Scikit-Learn (Bottom-Left Mid-Inner)
      {
        id: "scikit-learn",
        name: "Scikit-Learn",
        logo: ScikitLearnLogo,
        xPct: -16,
        yPct: 22,
        initialRotate: 9,
        scale: 0.94,
        depthZ: 17,
        travelX: [0, 22, -26, 0],
        travelY: [0, 28, -20, 0],
        travelRotate: [9, 17, 2, 9],
        travelScale: [0.94, 1.04, 0.88, 0.94],
        duration: 3.4,
        delay: 0.9,
        hideOnMobile: true,
      },
      // 16. VS Code (Bottom-Right Mid-Inner)
      {
        id: "vscode",
        name: "VS Code",
        logo: VSCodeLogo,
        xPct: 16,
        yPct: 22,
        initialRotate: -8,
        scale: 0.94,
        depthZ: 17,
        travelX: [0, -24, 20, 0],
        travelY: [0, -28, 24, 0],
        travelRotate: [-8, 1, -15, -8],
        travelScale: [0.94, 1.04, 0.88, 0.94],
        duration: 3.0,
        delay: 0.6,
        hideOnMobile: true,
      },
      // 17. MySQL (Far Bottom-Left)
      {
        id: "mysql",
        name: "MySQL",
        logo: MySQLLogo,
        xPct: -38,
        yPct: 32,
        initialRotate: -11,
        scale: 0.96,
        depthZ: 18,
        travelX: [0, 28, -22, 0],
        travelY: [0, -24, 28, 0],
        travelRotate: [-11, -3, -19, -11],
        travelScale: [0.96, 1.06, 0.90, 0.96],
        duration: 3.5,
        delay: 0.95,
        hideOnMobile: true,
      },
      // 18. Jupyter (Far Top-Left)
      {
        id: "jupyter",
        name: "Jupyter Notebook",
        logo: JupyterLogo,
        xPct: -26,
        yPct: -40,
        initialRotate: 12,
        scale: 0.94,
        depthZ: 16,
        travelX: [0, -20, 26, 0],
        travelY: [0, -28, 22, 0],
        travelRotate: [12, 20, 4, 12],
        travelScale: [0.94, 1.04, 0.88, 0.94],
        duration: 3.3,
        delay: 0.35,
        hideOnMobile: true,
      },
      // 19. Power BI (Far Bottom-Right)
      {
        id: "powerbi",
        name: "Power BI",
        logo: PowerBILogo,
        xPct: 38,
        yPct: 34,
        initialRotate: 8,
        scale: 0.95,
        depthZ: 17,
        travelX: [0, -26, 22, 0],
        travelY: [0, 26, -28, 0],
        travelRotate: [8, 16, 0, 8],
        travelScale: [0.95, 1.05, 0.90, 0.95],
        duration: 3.1,
        delay: 0.7,
        hideOnMobile: true,
      },
      // 20. ChromaDB (Far Top-Right)
      {
        id: "chromadb",
        name: "ChromaDB",
        logo: ChromaDBLogo,
        xPct: 42,
        yPct: -22,
        initialRotate: -9,
        scale: 0.93,
        depthZ: 16,
        travelX: [0, 22, -28, 0],
        travelY: [0, -24, 26, 0],
        travelRotate: [-9, -1, -17, -9],
        travelScale: [0.93, 1.03, 0.88, 0.93],
        duration: 3.6,
        delay: 0.9,
        hideOnMobile: true,
      },

      // --- 5 Additional Unique Skills from Locked 36 Skills ---

      // 21. Ollama (Top Center Gap)
      {
        id: "ollama",
        name: "Ollama",
        logo: OllamaLogo,
        xPct: -2,
        yPct: -39,
        initialRotate: -6,
        scale: 0.96,
        depthZ: 20,
        travelX: [0, -18, 22, 0],
        travelY: [0, -24, 26, 0],
        travelRotate: [-6, 4, -14, -6],
        travelScale: [0.96, 1.06, 0.90, 0.96],
        duration: 3.0,
        delay: 0.15,
      },
      // 22. Google Colab (Left Edge Mid Gap)
      {
        id: "colab",
        name: "Google Colab",
        logo: ColabLogo,
        xPct: -41,
        yPct: 0,
        initialRotate: 10,
        scale: 0.96,
        depthZ: 21,
        travelX: [0, 24, -20, 0],
        travelY: [0, 26, -22, 0],
        travelRotate: [10, 18, 3, 10],
        travelScale: [0.96, 1.06, 0.90, 0.96],
        duration: 3.2,
        delay: 0.55,
        hideOnMobile: true,
      },
      // 23. Elasticsearch (Right Edge Mid Gap)
      {
        id: "elasticsearch",
        name: "Elasticsearch",
        logo: ElasticsearchLogo,
        xPct: 41,
        yPct: 6,
        initialRotate: -8,
        scale: 0.95,
        depthZ: 22,
        travelX: [0, -22, 26, 0],
        travelY: [0, -24, 28, 0],
        travelRotate: [-8, 2, -16, -8],
        travelScale: [0.95, 1.05, 0.89, 0.95],
        duration: 3.1,
        delay: 0.35,
        hideOnMobile: true,
      },
      // 24. Matplotlib (Bottom-Left Outer Gap)
      {
        id: "matplotlib",
        name: "Matplotlib",
        logo: MatplotlibLogo,
        xPct: -16,
        yPct: 38,
        initialRotate: 8,
        scale: 0.95,
        depthZ: 19,
        travelX: [0, 26, -22, 0],
        travelY: [0, -26, 22, 0],
        travelRotate: [8, 16, 1, 8],
        travelScale: [0.95, 1.05, 0.89, 0.95],
        duration: 3.5,
        delay: 0.9,
        hideOnMobile: true,
      },
      // 25. Seaborn (Bottom-Right Outer Gap)
      {
        id: "seaborn",
        name: "Seaborn",
        logo: SeabornLogo,
        xPct: 12,
        yPct: 38,
        initialRotate: -9,
        scale: 0.94,
        depthZ: 19,
        travelX: [0, -22, 24, 0],
        travelY: [0, 24, -28, 0],
        travelRotate: [-9, 0, -17, -9],
        travelScale: [0.94, 1.04, 0.88, 0.94],
        duration: 3.1,
        delay: 0.65,
        hideOnMobile: true,
      },
    ],
    []
  )

  return (
    <section
      id="tech-orbit"
      ref={sectionRef}
      className="relative w-full py-6 sm:py-10 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black overflow-hidden transition-colors duration-700 select-none"
    >
      {/* Background dot grid and multi-layer atmospheric lighting */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-50 dark:opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-gradient-to-tr from-indigo-500/[0.05] via-purple-500/[0.04] to-cyan-500/[0.04] dark:from-indigo-500/[0.08] dark:via-purple-500/[0.06] dark:to-cyan-500/[0.06] rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        {/* ============================================================ */}
        {/* LARGE OUTER PREMIUM ROUNDED GLASS CONTAINER (FITTED)         */}
        {/* ============================================================ */}
        <div className="relative w-full max-w-[780px] rounded-3xl sm:rounded-[2.25rem] border border-zinc-200/90 dark:border-white/10 bg-zinc-50/40 dark:bg-zinc-950/40 backdrop-blur-xl shadow-2xl shadow-zinc-950/5 dark:shadow-indigo-500/5 p-2 sm:p-4 md:p-5 flex items-center justify-center">
          
          {/* Subtle top edge specular highlight line */}
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-400/30 dark:via-white/20 to-transparent pointer-events-none" />

          {/* ============================================================ */}
          {/* 3D FLOATING TECH ECOSYSTEM (UNTOUCHED ICONS & ANIMATION)     */}
          {/* ============================================================ */}
          <div className="relative w-full max-w-[740px] h-[430px] sm:h-[490px] md:h-[540px] flex items-center justify-center">
          
          {/* ============================================================ */}
          {/* CENTERPIECE: COMPLETE RAJPAL YADAV VIDEO FRAME               */}
          {/* Natural aspect ratio container with NO CROPPING and NO MASKS */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: easeCurve }}
            className="relative z-20 group"
          >
            {/* Ambient specular highlight glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/25 via-purple-500/20 to-cyan-500/25 rounded-[2.2rem] blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Video Container Box - Clean aspect-ratio container with NO cutting of video content */}
            <div className="relative w-48 sm:w-56 md:w-64 rounded-3xl overflow-hidden border-2 border-indigo-200/90 dark:border-indigo-500/30 bg-zinc-950 shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/25 transition-all duration-300 group-hover:scale-102">
              <video
                src="/rajpal-yadav.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-auto block object-contain select-none pointer-events-none"
              />
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* 3D FLOATING TECHNOLOGY LOGO BOXES (ICON ONLY, NO TEXT)       */}
          {/* Prominent, continuous, independent 3D floating trajectories  */}
          {/* ============================================================ */}
          <div className="absolute inset-0 pointer-events-none">
            {floatingItems.map((item, index) => {
              const LogoComponent = item.logo

              return (
                <div
                  key={item.id}
                  className={`absolute pointer-events-auto ${
                    item.hideOnMobile ? "hidden sm:block" : "block"
                  }`}
                  style={{
                    left: `calc(50% + ${item.xPct}%)`,
                    top: `calc(50% + ${item.yPct}%)`,
                    transform: "translate(-50%, -50%)",
                    zIndex: item.depthZ,
                  }}
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.4,
                      rotate: item.initialRotate,
                    }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            scale: item.travelScale,
                            x: item.travelX,
                            y: item.travelY,
                            rotate: item.travelRotate,
                          }
                        : {}
                    }
                    transition={{
                      opacity: { duration: 0.5, delay: 0.1 + index * 0.02 },
                      scale: {
                        duration: item.duration * 1.1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay,
                      },
                      x: {
                        duration: item.duration * 1.05,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay,
                      },
                      y: {
                        duration: item.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay,
                      },
                      rotate: {
                        duration: item.duration * 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay,
                      },
                    }}
                    whileHover={{
                      scale: 1.3,
                      rotate: 0,
                      zIndex: 60,
                      transition: { duration: 0.2 },
                    }}
                    className="group/card relative flex items-center justify-center cursor-default filter drop-shadow-md hover:drop-shadow-xl transition-all duration-200"
                  >
                    {/* Logo Icon Only (No Individual Box / Border) */}
                    <div className="flex items-center justify-center group-hover/card:scale-115 transition-transform duration-200 text-zinc-900 dark:text-white">
                      <LogoComponent className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>

                    {/* Accessible tooltip on hover only */}
                    <div className="absolute -bottom-7 opacity-0 group-hover/card:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium tracking-tight bg-zinc-900/95 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 shadow-md whitespace-nowrap">
                        {item.name}
                      </span>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>

        </div>

      </div>

    </div>
  </section>
  )
}
