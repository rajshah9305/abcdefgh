"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { FrameworkSelection } from "@/components/framework-selection"
import { ConfigurationPanel } from "@/components/configuration-panel"
import { MissionControlDashboard } from "@/components/mission-control-dashboard"
import { Navigation } from "@/components/navigation"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { ToastProvider } from "@/components/toast-provider"
import { LoadingScreen } from "@/components/loading-screen"

export default function Home() {
  const [currentSection, setCurrentSection] = useState<"hero" | "frameworks" | "config" | "dashboard">("hero")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 4000) // 4 second minimum
    return () => clearTimeout(timer)
  }, [])

  const handleSectionChange = async (section: "hero" | "frameworks" | "config" | "dashboard") => {
    if (section === currentSection) return

    setIsTransitioning(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    setCurrentSection(section)
    setIsTransitioning(false)
  }

  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -60,
      scale: 1.05,
      filter: "blur(10px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  if (!isLoaded) {
    return <LoadingScreen />
  }

  return (
    <ToastProvider>
      <AnalyticsProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-black overflow-hidden relative">
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

          {/* Enhanced transition overlay */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-white/60 backdrop-blur-md z-40 flex items-center justify-center"
              >
                <motion.div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="text-gray-600 font-medium"
                  >
                    Transitioning...
                  </motion.p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnalyticsProvider>
    </ToastProvider>
  )
}
