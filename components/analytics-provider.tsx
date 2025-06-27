"use client"

import type React from "react"
import { createContext, useContext, useCallback, useMemo } from "react"

interface AnalyticsContextType {
  trackEvent: (eventName: string, properties?: Record<string, any>) => void
  trackPerformance: (metric: string, value: number) => void
  trackError: (error: Error, context?: string) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      console.log("Analytics Event:", eventName, properties)
      // In production, integrate with your analytics service
      // gtag('event', eventName, properties)
      // mixpanel.track(eventName, properties)
    }
  }, [])

  const trackPerformance = useCallback((metric: string, value: number) => {
    if (typeof window !== "undefined") {
      console.log("Performance Metric:", metric, value)
      // In production, send to performance monitoring service
      // performance.mark(metric)
      // sendToAnalytics({ metric, value, timestamp: Date.now() })
    }
  }, [])

  const trackError = useCallback((error: Error, context?: string) => {
    if (typeof window !== "undefined") {
      console.error("Analytics Error:", error, context)
      // In production, send to error tracking service
      // Sentry.captureException(error, { extra: { context } })
    }
  }, [])

  const value = useMemo(
    () => ({
      trackEvent,
      trackPerformance,
      trackError,
    }),
    [trackEvent, trackPerformance, trackError],
  )

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
