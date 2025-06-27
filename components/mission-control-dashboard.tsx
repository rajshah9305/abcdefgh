"use client"

import { motion } from "framer-motion"
import { Activity, Cpu, Database, Network, Users, Zap } from "lucide-react"
import { useState, useEffect } from "react"

export function MissionControlDashboard() {
  const [metrics, setMetrics] = useState({
    activeAgents: 247,
    totalTasks: 15420,
    successRate: 99.2,
    avgResponseTime: 145,
    cpuUsage: 67,
    memoryUsage: 84,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        activeAgents: Math.max(200, prev.activeAgents + Math.floor((Math.random() - 0.5) * 10)),
        totalTasks: prev.totalTasks + Math.floor(Math.random() * 5),
        successRate: Math.max(95, Math.min(100, prev.successRate + (Math.random() - 0.5) * 0.5)),
        avgResponseTime: Math.max(100, Math.min(300, prev.avgResponseTime + (Math.random() - 0.5) * 20)),
        cpuUsage: Math.max(30, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(40, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 8)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const metricCards = [
    { icon: Users, title: "Active Agents", value: metrics.activeAgents.toString(), color: "blue" },
    { icon: Activity, title: "Total Tasks", value: metrics.totalTasks.toLocaleString(), color: "green" },
    { icon: Zap, title: "Success Rate", value: `${metrics.successRate.toFixed(1)}%`, color: "orange" },
    { icon: Network, title: "Avg Response", value: `${metrics.avgResponseTime}ms`, color: "purple" },
    { icon: Cpu, title: "CPU Usage", value: `${metrics.cpuUsage}%`, color: "red" },
    { icon: Database, title: "Memory", value: `${metrics.memoryUsage}%`, color: "indigo" },
  ]

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Mission Control Dashboard</h2>
          <p className="text-xl text-gray-600">Monitor and manage your AI agent orchestra in real-time</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {metricCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${card.color}-100`}>
                  <card.icon size={24} className={`text-${card.color}-600`} />
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>

              <h3 className="text-sm font-medium text-gray-600 mb-2">{card.title}</h3>
              <motion.p
                key={card.value}
                initial={{ scale: 1.1, color: "#ff6c00" }}
                animate={{ scale: 1, color: "#111827" }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold text-gray-900"
              >
                {card.value}
              </motion.p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">System Status</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Neural Network Processing</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-600 font-medium">Operational</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Agent Communication</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-600 font-medium">Stable</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600">Data Pipeline</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-yellow-600 font-medium">Optimizing</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
