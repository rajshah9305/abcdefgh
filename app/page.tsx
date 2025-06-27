"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { FrameworkSelection } from "@/components/framework-selection"
import { ConfigurationPanel } from "@/components/configuration-panel"
import { MissionControlDashboard } from "@/components/mission-control-dashboard"
import { Navigation } from "@/components/navigation"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { LoadingScreen } from "@/components/loading-screen"
import { PerformanceMonitor } from "@/components/performance-monitor"

export default function Home() {
  const [currentSection, setCurrentSection] = useState<"hero" | "frameworks" | "config" | "dashboard">("hero")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleSectionChange = async (section: "hero" | "frameworks" | "config" | "dashboard") => {
    setIsTransitioning(true)

    // Analytics tracking
    if (typeof window !== "undefined") {
      window.gtag?.("event", "section_change", {
        from_section: currentSection,
        to_section: section,
        timestamp: Date.now(),
      })
    }

    await new Promise((resolve) => setTimeout(resolve, 300))
    setCurrentSection(section)
    setIsTransitioning(false)
  }

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 1.05,
      filter: "blur(10px)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  if (!isLoaded) {
    return <LoadingScreen />
  }

  return (
    <ErrorBoundary>
      <AnalyticsProvider>
        <PerformanceMonitor />
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
          <Navigation
            currentSection={currentSection}
            onSectionChange={handleSectionChange}
            isTransitioning={isTransitioning}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="min-h-screen"
            >
              {currentSection === "hero" && <HeroSection onNext={() => handleSectionChange("frameworks")} />}
              {currentSection === "frameworks" && <FrameworkSelection onNext={() => handleSectionChange("config")} />}
              {currentSection === "config" && <ConfigurationPanel onNext={() => handleSectionChange("dashboard")} />}
              {currentSection === "dashboard" && <MissionControlDashboard />}
            </motion.div>
          </AnimatePresence>

          {/* Transition overlay */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnalyticsProvider>
    </ErrorBoundary>
  )
}
