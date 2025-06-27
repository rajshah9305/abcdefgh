"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { Activity, Cpu, Database, Network, Users, Zap, TrendingUp } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface MetricCardProps {
  icon: React.ElementType
  title: string
  value: string | number
  unit?: string
  change?: string
  trend?: "up" | "down" | "stable"
  color: "blue" | "green" | "orange" | "purple" | "red" | "indigo"
  delay?: number
}

function MetricCard({
  icon: Icon,
  title,
  value,
  unit = "",
  change,
  trend = "stable",
  color,
  delay = 0,
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-600",
    green: "from-green-500/20 to-green-600/20 border-green-500/30 text-green-600",
    orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-600",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-600",
    red: "from-red-500/20 to-red-600/20 border-red-500/30 text-red-600",
    indigo: "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30 text-indigo-600",
  }

  // Animate counter
  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true)
      const numericValue = typeof value === "string" ? Number.parseFloat(value.replace(/[^\d.-]/g, "")) : value

      if (!isNaN(numericValue)) {
        const duration = 2000
        const steps = 60
        const increment = numericValue / steps
        let step = 0

        const timer = setInterval(() => {
          step++
          setDisplayValue(Math.round(increment * step))

          if (step >= steps) {
            setDisplayValue(numericValue)
            clearInterval(timer)
          }
        }, duration / steps)

        return () => clearInterval(timer)
      }
    }
  }, [isInView, value, isAnimating])

  // Format display value
  const formatValue = (val: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return `${val.toFixed(1)}%`
    }
    if (val >= 1000) {
      return val.toLocaleString()
    }
    return val.toString()
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: delay * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.02,
        y: -8,
        transition: { duration: 0.3 },
      }}
      className="group relative"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 hover:border-orange-500/30 transition-all duration-500 group-hover:shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className={`p-4 bg-gradient-to-br ${colorClasses[color]} rounded-2xl backdrop-blur-sm border`}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon size={28} />
          </motion.div>

          <div className="flex items-center space-x-3">
            {/* Live indicator */}
            <motion.div
              className="flex items-center space-x-2 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-500/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-600 font-medium">LIVE</span>
            </motion.div>

            {/* Trend indicator */}
            {change && (
              <div
                className={`flex items-center space-x-1 text-sm font-medium ${
                  trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"
                }`}
              >
                {trend === "up" ? (
                  <TrendingUp size={16} />
                ) : trend === "down" ? (
                  <TrendingUp size={16} className="rotate-180" />
                ) : null}
                <span>{change}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>

          <motion.div
            className="text-4xl font-bold text-gray-900 font-mono"
            animate={
              isAnimating
                ? {
                    scale: [1, 1.05, 1],
                    color: ["#111827", "#ff6600", "#111827"],
                  }
                : {}
            }
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {formatValue(displayValue)}
            {unit}
          </motion.div>
        </div>

        {/* Animated progress indicator */}
        <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/50 via-orange-400/50 to-orange-500/50 opacity-0 group-hover:opacity-100 rounded-b-3xl overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function MissionControlDashboard() {
  const [metrics, setMetrics] = useState({
    activeAgents: 247,
    totalTasks: 15420,
    successRate: 98.8,
    avgResponseTime: 147,
    cpuUsage: 66.6,
    memoryUsage: 82.7,
  })

  const [systemStatus] = useState([
    { name: "Neural Network Processing", status: "operational", color: "green" },
    { name: "Agent Communication", status: "stable", color: "green" },
    { name: "Data Pipeline", status: "optimizing", color: "yellow" },
    { name: "Load Balancer", status: "operational", color: "green" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        activeAgents: Math.max(200, prev.activeAgents + Math.floor((Math.random() - 0.5) * 10)),
        totalTasks: prev.totalTasks + Math.floor(Math.random() * 8),
        successRate: Math.max(95, Math.min(100, prev.successRate + (Math.random() - 0.5) * 0.3)),
        avgResponseTime: Math.max(100, Math.min(300, prev.avgResponseTime + (Math.random() - 0.5) * 15)),
        cpuUsage: Math.max(30, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 5)),
        memoryUsage: Math.max(40, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 3)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const metricCards = [
    {
      icon: Users,
      title: "Active Agents",
      value: metrics.activeAgents,
      change: "+12%",
      trend: "up" as const,
      color: "blue" as const,
    },
    {
      icon: Activity,
      title: "Total Tasks",
      value: metrics.totalTasks,
      change: "+8%",
      trend: "up" as const,
      color: "green" as const,
    },
    {
      icon: Zap,
      title: "Success Rate",
      value: metrics.successRate,
      unit: "%",
      change: "+0.3%",
      trend: "up" as const,
      color: "orange" as const,
    },
    {
      icon: Network,
      title: "Avg Response",
      value: metrics.avgResponseTime,
      unit: "ms",
      change: "-5ms",
      trend: "up" as const,
      color: "purple" as const,
    },
    {
      icon: Cpu,
      title: "CPU Usage",
      value: metrics.cpuUsage,
      unit: "%",
      change: "+2%",
      trend: "up" as const,
      color: "red" as const,
    },
    {
      icon: Database,
      title: "Memory",
      value: metrics.memoryUsage,
      unit: "%",
      change: "+1%",
      trend: "up" as const,
      color: "indigo" as const,
    },
  ]

  return (
    <div className="min-h-screen pt-32 px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8" style={{ letterSpacing: "-0.02em" }}>
            Mission Control Dashboard
          </motion.h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Monitor and manage your AI agent orchestra in real-time with advanced analytics and performance insights
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {metricCards.map((card, index) => (
            <MetricCard key={card.title} {...card} delay={index} />
          ))}
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-10 border border-gray-200/50"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">System Status</h3>
            <motion.div
              className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-600 font-medium">All Systems Operational</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemStatus.map((system, index) => (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-200/50 hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      system.color === "green"
                        ? "bg-green-500"
                        : system.color === "yellow"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    } animate-pulse`}
                  />
                  <span className="text-lg font-medium text-gray-700">{system.name}</span>
                </div>

                <motion.span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    system.status === "operational"
                      ? "bg-green-100 text-green-700"
                      : system.status === "stable"
                        ? "bg-green-100 text-green-700"
                        : system.status === "optimizing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
