"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink } from "lucide-react"
import type { Certificate } from "@/lib/data"

interface CertificatesProps {
  certificates: Certificate[]
}

const fallbackCertificatesList: Certificate[] = [
  {
    _id: "1",
    title: "Oracle AI Foundations Associate",
    issuer: "Oracle Cloud Infrastructure",
    issueDate: "2025",
    expiration: "Does not expire",
    serialId: "OCI-AI-2025",
    image: "/certificates/OCI_AI_Foundations.png",
    pdf: "/certificates/Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate.pdf",
  },
  {
    _id: "2",
    title: "Oracle Generative AI Professional",
    issuer: "Oracle Cloud Infrastructure",
    issueDate: "2025",
    expiration: "Does not expire",
    serialId: "OCI-GENAI-2025",
    image: "/certificates/OCI_Generative_AI_Professional.png",
    pdf: "/certificates/Oracle Cloud Infrastructure 2025 Certified Generative AI Professional.pdf",
  },
  {
    _id: "3",
    title: "Oracle Multicloud Architect Professional",
    issuer: "Oracle Cloud Infrastructure",
    issueDate: "2025",
    expiration: "Does not expire",
    serialId: "OCI-MCARCH-2025",
    image: "/certificates/OCI_Multicloud_Architect.png",
    pdf: "/certificates/OCI Multicloud Architect Professional .pdf",
  },
  {
    _id: "4",
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    issueDate: "Jul 2026",
    expiration: "Does not expire",
    serialId: "e627ba96-d7ba-41da-9560-f879147771b5",
    image: "/certificates/IBM_AI_Fundamentals.png",
    credentialUrl: "https://www.credly.com/earner/earned/badge/e627ba96-d7ba-41da-9560-f879147771b5",
    description: "This credential demonstrates knowledge of core artificial intelligence concepts.",
  },
  {
    _id: "5",
    title: "Artificial Intelligence & Machine Learning",
    issuer: "KODACY · SPACE",
    issueDate: "Completed Apr 2026",
    expiration: "30-Day Virtual Internship",
    serialId: "274f93f1d6433613",
    image: "/certificates/Kodacy_AI_ML.png",
    pdf: "/certificates/Kodacy_Certificate.pdf",
  },
  {
    _id: "6",
    title: "Crash Course on Python – Coursera",
    issuer: "Coursera · Google",
    issueDate: "2024",
    expiration: "Does not expire",
    serialId: "COURSERA-PY-2024",
    image: "/certificates/Coursera_Dipak.png",
    pdf: "/certificates/Coursera Dipak.pdf",
  },
]

export function Certificates({ certificates }: CertificatesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })

  const easeCurve: [number, number, number, number] = [0.16, 1, 0.3, 1]

  // Ensure all 6 credentials are displayable even if upstream returns partial
  const displayCertificates = certificates && certificates.length >= 6
    ? certificates
    : fallbackCertificatesList

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-zinc-50/60 dark:bg-black overflow-hidden transition-colors duration-700 select-none border-t border-zinc-200/80 dark:border-zinc-900"
    >
      {/* Precision Background Grid Atmosphere */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40 dark:opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* ============================================================ */}
        {/* 1. SECTION HEADER: Direct, Clean "Certifications" Heading    */}
        {/* ============================================================ */}
        <div className="mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: easeCurve }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white select-text"
          >
            Certifications
          </motion.h2>
        </div>

        {/* ============================================================ */}
        {/* 2. BALANCED 3 + 2 RESPONSIVE CREDENTIAL GRID                 */}
        {/* ============================================================ */}
        <div className="flex flex-wrap justify-center gap-6 select-text">
          {displayCertificates.map((cert, i) => {
            const credentialTarget = cert.credentialUrl || cert.pdf || "#"

            return (
              <motion.div
                key={cert._id || cert.serialId || i}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: easeCurve }}
                className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] flex flex-col group"
              >
                <div className="relative flex flex-col rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/70 overflow-hidden h-full transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:border-indigo-500/40 dark:group-hover:border-indigo-400/40 group-hover:shadow-lg group-hover:shadow-indigo-500/[0.04]">
                  
                  {/* Top Specular Edge Glow on hover */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Certificate / Badge Media Frame */}
                  <div className="aspect-[16/10] w-full relative overflow-hidden bg-zinc-100/80 dark:bg-zinc-900/60 p-4 sm:p-5 flex items-center justify-center border-b border-zinc-200/70 dark:border-zinc-800/60">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="max-h-full max-w-full object-contain rounded-md transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>

                  {/* Card Information Body */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    
                    {/* Issuer Organization */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
                        {cert.issuer || "Verified Credential"}
                      </span>
                    </div>

                    {/* Certificate Title */}
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-zinc-950 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-200 mb-2">
                      {cert.title}
                    </h3>

                    {/* Metadata: Issued date & Expiration */}
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                      <span>
                        {cert.issueDate?.startsWith("Completed")
                          ? cert.issueDate
                          : `Issued ${cert.issueDate || "2025"}`}
                      </span>
                      <span>•</span>
                      <span>{cert.expiration || "Does not expire"}</span>
                    </div>

                    {/* Footer Area: Credential ID + Action */}
                    <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between gap-3">
                      <div className="flex flex-col min-w-0 pr-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Credential ID
                        </span>
                        <span
                          className="text-xs font-mono text-zinc-600 dark:text-zinc-300 truncate"
                          title={cert.serialId}
                        >
                          {cert.serialId}
                        </span>
                      </div>

                      <a
                        href={credentialTarget}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition-all duration-150 ease-out group/link cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    </div>

                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
