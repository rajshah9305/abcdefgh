"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface AnalyticsData {
  userInteractions: number
  sectionViews: Record<string, number>
  averageSessionTime: number
  errorRate: number
  performanceMetrics: {
    loadTime: number
    renderTime: number
    interactionDelay: number
  }
}

interface AnalyticsContextType {
  data: AnalyticsData
  trackEvent: (event: string, properties?: Record<string, any>) => void
  trackError: (error: Error, context?: string) => void
  trackPerformance: (metric: string, value: number) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AnalyticsData>({
    userInteractions: 0,
    sectionViews: {},
    averageSessionTime: 0,
    errorRate: 0,
    performanceMetrics: {
      loadTime: 0,
      renderTime: 0,
      interactionDelay: 0,
    },
  })

  const [sessionStart] = useState(Date.now())

  const trackEvent = (event: string, properties?: Record<string, any>) => {
    setData((prev) => ({
      ...prev,
      userInteractions: prev.userInteractions + 1,
      sectionViews: {
        ...prev.sectionViews,
        [event]: (prev.sectionViews[event] || 0) + 1,
      },
    }))

    // Send to analytics service
    if (typeof window !== "undefined") {
      console.log("Analytics Event:", event, properties)
    }
  }

  const trackError = (error: Error, context?: string) => {
    setData((prev) => ({
      ...prev,
      errorRate: prev.errorRate + 1,
    }))

    console.error("Analytics Error:", error, context)
  }

  const trackPerformance = (metric: string, value: number) => {
    setData((prev) => ({
      ...prev,
      performanceMetrics: {
        ...prev.performanceMetrics,
        [metric]: value,
      },
    }))
  }

  useEffect(() => {
    const updateSessionTime = () => {
      setData((prev) => ({
        ...prev,
        averageSessionTime: Date.now() - sessionStart,
      }))
    }

    const interval = setInterval(updateSessionTime, 5000)
    return () => clearInterval(interval)
  }, [sessionStart])

  return (
    <AnalyticsContext.Provider value={{ data, trackEvent, trackError, trackPerformance }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error("useAnalytics must be used within AnalyticsProvider")
  }
  return context
}
