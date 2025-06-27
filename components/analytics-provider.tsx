"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AnalyticsData {
  pageViews: number
  userInteractions: number
  featureUsage: Record<string, number>
  performanceMetrics: {
    loadTime: number
    renderTime: number
    interactionDelay: number
  }
  userBehavior: {
    timeOnPage: number
    scrollDepth: number
    clickHeatmap: Array<{ x: number; y: number; timestamp: number }>
  }
}

interface AnalyticsContextType {
  data: AnalyticsData
  trackEvent: (event: string, properties?: Record<string, any>) => void
  trackFeatureUsage: (feature: string) => void
  trackPerformance: (metric: string, value: number) => void
  getInsights: () => {
    mostUsedFeatures: Array<{ feature: string; usage: number }>
    averageSessionTime: number
    engagementScore: number
  }
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AnalyticsData>({
    pageViews: 0,
    userInteractions: 0,
    featureUsage: {},
    performanceMetrics: {
      loadTime: 0,
      renderTime: 0,
      interactionDelay: 0,
    },
    userBehavior: {
      timeOnPage: 0,
      scrollDepth: 0,
      clickHeatmap: [],
    },
  })

  const [sessionStart] = useState(Date.now())

  useEffect(() => {
    // Track page view
    setData((prev) => ({ ...prev, pageViews: prev.pageViews + 1 }))

    // Track performance metrics
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "navigation") {
          const navEntry = entry as PerformanceNavigationTiming
          setData((prev) => ({
            ...prev,
            performanceMetrics: {
              ...prev.performanceMetrics,
              loadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
            },
          }))
        }
      }
    })

    observer.observe({ entryTypes: ["navigation"] })

    // Track scroll depth
    const handleScroll = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
      )
      setData((prev) => ({
        ...prev,
        userBehavior: {
          ...prev.userBehavior,
          scrollDepth: Math.max(prev.userBehavior.scrollDepth, scrollDepth),
        },
      }))
    }

    // Track clicks for heatmap
    const handleClick = (e: MouseEvent) => {
      setData((prev) => ({
        ...prev,
        userInteractions: prev.userInteractions + 1,
        userBehavior: {
          ...prev.userBehavior,
          clickHeatmap: [...prev.userBehavior.clickHeatmap, { x: e.clientX, y: e.clientY, timestamp: Date.now() }],
        },
      }))
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("click", handleClick)

    // Update time on page
    const timeInterval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        userBehavior: {
          ...prev.userBehavior,
          timeOnPage: Date.now() - sessionStart,
        },
      }))
    }, 1000)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("click", handleClick)
      clearInterval(timeInterval)
    }
  }, [sessionStart])

  const trackEvent = (event: string, properties?: Record<string, any>) => {
    console.log("Analytics Event:", event, properties)
    setData((prev) => ({ ...prev, userInteractions: prev.userInteractions + 1 }))
  }

  const trackFeatureUsage = (feature: string) => {
    setData((prev) => ({
      ...prev,
      featureUsage: {
        ...prev.featureUsage,
        [feature]: (prev.featureUsage[feature] || 0) + 1,
      },
    }))
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

  const getInsights = () => {
    const mostUsedFeatures = Object.entries(data.featureUsage)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([feature, usage]) => ({ feature, usage }))

    const averageSessionTime = data.userBehavior.timeOnPage / 1000 // in seconds

    const engagementScore = Math.min(
      100,
      (data.userInteractions * 10 + data.userBehavior.scrollDepth + averageSessionTime / 10) / 3,
    )

    return {
      mostUsedFeatures,
      averageSessionTime,
      engagementScore,
    }
  }

  return (
    <AnalyticsContext.Provider
      value={{
        data,
        trackEvent,
        trackFeatureUsage,
        trackPerformance,
        getInsights,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
