"use client"

import { useEffect, useRef } from "react"
import { useAnalytics } from "./analytics-provider"

export function PerformanceMonitor() {
  const { trackPerformance } = useAnalytics()
  const metricsRef = useRef({
    startTime: Date.now(),
    lastFrameTime: Date.now(),
    frameCount: 0,
  })

  useEffect(() => {
    let animationFrameId: number
    let performanceInterval: NodeJS.Timeout

    const measureFPS = () => {
      const now = Date.now()
      const delta = now - metricsRef.current.lastFrameTime
      metricsRef.current.lastFrameTime = now
      metricsRef.current.frameCount++

      if (delta > 0) {
        const fps = 1000 / delta
        if (metricsRef.current.frameCount % 60 === 0) {
          trackPerformance("fps", Math.round(fps))
        }
      }

      animationFrameId = requestAnimationFrame(measureFPS)
    }

    const measurePerformance = () => {
      if (typeof window !== "undefined" && "performance" in window) {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        if (navigation) {
          trackPerformance("page_load_time", navigation.loadEventEnd - navigation.fetchStart)
          trackPerformance("dom_content_loaded", navigation.domContentLoadedEventEnd - navigation.fetchStart)
        }

        // Memory usage (if available)
        if ("memory" in performance) {
          const memory = (performance as any).memory
          trackPerformance("memory_used", memory.usedJSHeapSize)
          trackPerformance("memory_total", memory.totalJSHeapSize)
        }
      }
    }

    // Start FPS monitoring
    animationFrameId = requestAnimationFrame(measureFPS)

    // Measure performance metrics periodically
    performanceInterval = setInterval(measurePerformance, 10000) // Every 10 seconds

    // Initial performance measurement
    setTimeout(measurePerformance, 1000)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (performanceInterval) {
        clearInterval(performanceInterval)
      }
    }
  }, [trackPerformance])

  return null
}
