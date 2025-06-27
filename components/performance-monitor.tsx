"use client"

import { useEffect } from "react"
import { getSafeTopWindow } from "@/lib/safe-window"

/**
 * Lightweight RUM / performance monitor.
 * - Collects First Contentful Paint & Largest Contentful Paint.
 * - Logs the metric via console OR sends it to the global analytics context.
 *   (No cross-origin frame access.)
 */
export function PerformanceMonitor() {
  useEffect(() => {
    // Always use the safe window reference.
    const win = getSafeTopWindow()

    // Don't run in unsupported browsers.
    if (!("PerformanceObserver" in win)) return

    const handleEntry = (list: PerformanceObserverEntryList) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "paint") {
          console.log("[Perf]", entry.name, entry.startTime.toFixed(2))
        }
        if (entry.entryType === "largest-contentful-paint") {
          console.log("[Perf] LCP", entry.startTime.toFixed(2))
        }
      }
    }

    const observer = new PerformanceObserver(handleEntry)
    try {
      observer.observe({ type: "paint", buffered: true })
      observer.observe({ type: "largest-contentful-paint", buffered: true })
    } catch {
      /* silently ignore unsupported entry types */
    }

    // Clean-up
    return () => observer.disconnect()
  }, [])

  return null
}
