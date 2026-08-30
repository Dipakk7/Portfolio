import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { ShaderAnimation } from "@/components/shader-hero"
import { About } from "@/components/about"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { Navbar } from "@/components/navbar"
import { getAllPortfolioData } from "@/lib/data"

// Lazy load below-fold components for faster initial load
const BentoGrid = dynamic(() => import("@/components/bento-grid").then(mod => ({ default: mod.BentoGrid })), {
  loading: () => <SectionSkeleton />,
  ssr: true
})

const TechStackOrbit = dynamic(() => import("@/components/tech-stack-orbit").then(mod => ({ default: mod.TechStackOrbit })), {
  loading: () => <SectionSkeleton />,
  ssr: true
})

const GithubProjects = dynamic(() => import("@/components/github-projects").then(mod => ({ default: mod.GithubProjects })), {
  loading: () => <SectionSkeleton />,
  ssr: true
})

const Certificates = dynamic(() => import("@/components/certificates").then(mod => ({ default: mod.Certificates })), {
  loading: () => <SectionSkeleton />,
  ssr: true
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <SectionSkeleton />,
  ssr: true
})

// Skeleton component for loading states
function SectionSkeleton() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
        <div className="h-4 w-64 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="h-32 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
          <div className="h-32 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
        </div>
      </div>
    </div>
  )
}

/**
 * Homepage - Server Component with ISR
 *
 * Final structure: About -> Projects -> Skills -> Certifications
 * All portfolio data is fetched at build time and revalidated hourly.
 */
export default async function Home() {
  // Fetch all data at build time (ISR enabled - revalidates hourly)
  const { heroData, projects, certificates } = await getAllPortfolioData();

  return (
    <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-[#6366F1]/30 dark:selection:bg-[#818CF8]/30 selection:text-zinc-900 dark:selection:text-white overflow-x-hidden transition-colors duration-700">
      <Navbar />
      <ScrollProgress />

      {/* Critical above-fold content - loaded immediately */}
      <section id="hero">
        <ShaderAnimation heroData={heroData} />
      </section>

      {/* 1. About */}
      <section id="about" className="scroll-mt-20">
        <About data={heroData} />
      </section>

      {/* 2. Projects */}
      <Suspense fallback={<SectionSkeleton />}>
        <section id="projects" className="scroll-mt-20">
          <GithubProjects projects={projects} />
        </section>
      </Suspense>

      {/* 3. Skills */}
      <Suspense fallback={<SectionSkeleton />}>
        <section id="skills" className="scroll-mt-20">
          <BentoGrid heroData={heroData} />
        </section>
      </Suspense>

      {/* 3.5. Interactive Tech Stack Orbit */}
      <Suspense fallback={<SectionSkeleton />}>
        <section id="tech-orbit" className="scroll-mt-20">
          <TechStackOrbit />
        </section>
      </Suspense>

      {/* 4. Certifications */}
      <Suspense fallback={<SectionSkeleton />}>
        <section id="certificates" className="scroll-mt-20">
          <Certificates certificates={certificates} />
        </section>
      </Suspense>

      {/* Contact / Footer */}
      <Suspense fallback={<SectionSkeleton />}>
        <section id="contact" className="scroll-mt-20">
          <Footer footerData={heroData} />
        </section>
      </Suspense>
    </main>
  )
}
