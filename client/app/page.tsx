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

const Experience = dynamic(() => import("@/components/experience").then(mod => ({ default: mod.Experience })), {
  loading: () => <SectionSkeleton />,
  ssr: true
})

const GithubProjects = dynamic(() => import("@/components/github-projects").then(mod => ({ default: mod.GithubProjects })), {
  loading: () => <SectionSkeleton />,
  ssr: true
})

const ExploringAI = dynamic(() => import("@/components/exploring-ai").then(mod => ({ default: mod.ExploringAI })), {
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

const StatsGrid = dynamic(() => import("@/components/stats-grid").then(mod => ({ default: mod.StatsGrid })), {
  loading: () => <SectionSkeleton />,
  ssr: true
})

const Features = dynamic(() => import("@/components/features").then(mod => ({ default: mod.Features })), {
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
 * All portfolio data is fetched at build time and revalidated hourly.
 * This ensures instant page loads without any backend dependency at runtime.
 */
export default async function Home() {
  // Fetch all data at build time (ISR enabled - revalidates hourly)
  const { heroData, experiences, projects, blogs, certificates } = await getAllPortfolioData();

  return (
    <main className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-[#6366F1]/30 dark:selection:bg-[#818CF8]/30 selection:text-zinc-900 dark:selection:text-white overflow-x-hidden transition-colors duration-700">
      <ScrollProgress />

      {/* Critical above-fold content - loaded immediately */}
      <section id="hero">
        <ShaderAnimation heroData={heroData} />
      </section>

      <section id="about">
        <About data={heroData} />
      </section>

      <Suspense fallback={<SectionSkeleton />}>
        <section id="stats">
          <StatsGrid />
        </section>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <section id="skills">
          <BentoGrid heroData={heroData} />
        </section>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <section id="projects">
          <GithubProjects projects={projects} />
        </section>
      </Suspense>

      {/* Below-fold content - lazy loaded with pre-fetched data */}
      <Suspense fallback={<SectionSkeleton />}>
        <section id="experience">
          <Experience experiences={experiences} />
        </section>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <section id="expertise">
          <Features />
        </section>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <section id="blogs">
          <ExploringAI />
        </section>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <section id="certificates">
          <Certificates certificates={certificates} />
        </section>
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <section id="contact">
          <Footer footerData={heroData} />
        </section>
      </Suspense>

      <Navbar />
    </main>
  )
}
