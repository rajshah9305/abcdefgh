"use client"

import { motion } from "framer-motion"
import { Activity, Cpu, Database, Network, Users, Zap, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import { ActivityFeed } from "./activity-feed"
import { AgentAvatarSystem } from "./agent-avatar-system"
import { SystemTerminal } from "./system-terminal"

export function MissionControlDashboard() {
  const [metrics, setMetrics] = useState({
    activeAgents: 247,
    totalTasks: 15420,
    successRate: 99.2,
    avgResponseTime: 145,
    cpuUsage: 67,
    memoryUsage: 84,
    networkLatency: 12,
    throughput: 2340,
  })

  const [systemStatus, setSystemStatus] = useState([
    { name: "Neural Network", status: "operational", uptime: "99.9%" },
    { name: "Agent Communication", status: "operational", uptime: "99.8%" },
    { name: "Data Pipeline", status: "warning", uptime: "98.5%" },
    { name: "Load Balancer", status: "operational", uptime: "100%" },
  ])

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
        networkLatency: Math.max(5, Math.min(50, prev.networkLatency + (Math.random() - 0.5) * 5)),
        throughput: Math.max(1000, prev.throughput + Math.floor((Math.random() - 0.5) * 100)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const metricCards = [
    {
      icon: Users,
      title: "Active Agents",
      value: metrics.activeAgents.toString(),
      color: "blue",
      trend: "+5.2%",
      description: "Currently processing tasks",
    },
    {
      icon: Activity,
      title: "Total Tasks",
      value: metrics.totalTasks.toLocaleString(),
      color: "green",
      trend: "+12.8%",
      description: "Completed this session",
    },
    {
      icon: Zap,
      title: "Success Rate",
      value: `${metrics.successRate.toFixed(1)}%`,
      color: "orange",
      trend: "+0.3%",
      description: "Task completion accuracy",
    },
    {
      icon: Clock,
      title: "Avg Response",
      value: `${metrics.avgResponseTime}ms`,
      color: "purple",
      trend: "-8.1%",
      description: "Average processing time",
    },
    {
      icon: Cpu,
      title: "CPU Usage",
      value: `${metrics.cpuUsage}%`,
      color: "red",
      trend: "+2.4%",
      description: "System resource utilization",
    },
    {
      icon: Database,
      title: "Throughput",
      value: `${metrics.throughput.toLocaleString()}/h`,
      color: "indigo",
      trend: "+15.6%",
      description: "Operations per hour",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle size={16} className="text-green-500" />
      case "warning":
        return <AlertTriangle size={16} className="text-yellow-500" />
      case "error":
        return <AlertTriangle size={16} className="text-red-500" />
      default:
        return <CheckCircle size={16} className="text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600 dark:text-green-400"
      case "warning":
        return "text-yellow-600 dark:text-yellow-400"
      case "error":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="text-orange-500">Mission Control</span> Dashboard
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Monitor and manage your AI agent orchestra in real-time with comprehensive analytics and system insights.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {metricCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${card.color}-100 dark:bg-${card.color}-900/30`}>
                  <card.icon size={24} className={`text-${card.color}-600 dark:text-${card.color}-400`} />
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-500 font-medium">LIVE</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{card.title}</h3>
                <motion.p
                  key={card.value}
                  initial={{ scale: 1.1, color: "#ff6c00" }}
                  animate={{ scale: 1, color: "currentColor" }}
                  transition={{ duration: 0.3 }}
                  className="text-3xl font-bold text-gray-900 dark:text-white"
                >
                  {card.value}
                </motion.p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{card.description}</span>
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">{card.trend}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-3">
              <Network size={24} className="text-orange-500" />
              <span>System Status</span>
            </h3>

            <div className="space-y-4">
              {systemStatus.map((system, index) => (
                <motion.div
                  key={system.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(system.status)}
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{system.name}</span>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Uptime: {system.uptime}</div>
                    </div>
                  </div>
                  <span className={`text-sm font-medium capitalize ${getStatusColor(system.status)}`}>
                    {system.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Activity Feed */}
          <ActivityFeed />

          {/* Agent Avatar System */}
          <AgentAvatarSystem />
        </div>

        {/* System Terminal */}
        <SystemTerminal />
      </div>
    </div>
  )
}
