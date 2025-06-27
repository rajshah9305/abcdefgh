"use client"

import { useEffect } from "react"
import { useAnalytics } from "./analytics-provider"

export function PerformanceMonitor() {
  const { trackPerformance } = useAnalytics()

  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "navigation") {
          const navEntry = entry as PerformanceNavigationTiming
          trackPerformance("loadTime", navEntry.loadEventEnd - navEntry.loadEventStart)
        }

        if (entry.entryType === "paint") {
          trackPerformance("renderTime", entry.startTime)
        }
      }
    })

    observer.observe({ entryTypes: ["navigation", "paint"] })

    // Monitor frame rate
    let frameCount = 0
    let lastTime = performance.now()

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        trackPerformance("fps", frameCount)
        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(measureFPS)
    }

    measureFPS()

    return () => {
      observer.disconnect()
    }
  }, [trackPerformance])

  return null
}
