"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Activity, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { AgentNetworkVisualization } from "./agent-network-visualization"

const logMessages = [
  { type: "INFO", message: "Agent orchestration initialized", timestamp: "14:32:01" },
  { type: "SUCCESS", message: "Task delegation completed successfully", timestamp: "14:32:15" },
  { type: "INFO", message: "Memory checkpoint created", timestamp: "14:32:28" },
  { type: "WARNING", message: "High CPU usage detected on Agent-7", timestamp: "14:32:45" },
  { type: "SUCCESS", message: "Auto-scaling triggered for workload balance", timestamp: "14:33:02" },
  { type: "INFO", message: "Network topology optimized", timestamp: "14:33:18" },
]

export function MissionControlDashboard() {
  const [logs, setLogs] = useState(logMessages.slice(0, 3))
  const [metrics, setMetrics] = useState({
    cpu: 67,
    memory: 84,
    network: 45,
    activeAgents: 247,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new log entries
      if (logs.length < logMessages.length) {
        setLogs((prev) => [...prev, logMessages[prev.length]])
      }

      // Simulate metric updates
      setMetrics((prev) => ({
        cpu: Math.max(30, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(40, Math.min(95, prev.memory + (Math.random() - 0.5) * 8)),
        network: Math.max(20, Math.min(80, prev.network + (Math.random() - 0.5) * 15)),
        activeAgents: prev.activeAgents + Math.floor((Math.random() - 0.5) * 5),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [logs.length])

  const getLogIcon = (type: string) => {
    switch (type) {
      case "SUCCESS":
        return <CheckCircle size={16} className="text-green-400" />
      case "WARNING":
        return <AlertTriangle size={16} className="text-yellow-400" />
      case "INFO":
        return <Info size={16} className="text-blue-400" />
      default:
        return <Info size={16} className="text-white/60" />
    }
  }

  const getLogColor = (type: string) => {
    switch (type) {
      case "SUCCESS":
        return "text-green-400"
      case "WARNING":
        return "text-yellow-400"
      case "INFO":
        return "text-blue-400"
      default:
        return "text-white/60"
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-orange-500">Mission</span> Control
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Real-time monitoring and orchestration dashboard for your AI agent network. Monitor performance, track
            executions, and manage your intelligent workforce.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-xl">
                <Activity size={24} className="text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold">Performance</h3>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Cpu size={16} className="text-white/60" />
                    <span className="text-sm text-white/70">CPU</span>
                  </div>
                  <span className="text-orange-500 font-bold">{metrics.cpu}%</span>
                </div>
                <Progress value={metrics.cpu} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <HardDrive size={16} className="text-white/60" />
                    <span className="text-sm text-white/70">Memory</span>
                  </div>
                  <span className="text-orange-500 font-bold">{metrics.memory}%</span>
                </div>
                <Progress value={metrics.memory} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Wifi size={16} className="text-white/60" />
                    <span className="text-sm text-white/70">Network</span>
                  </div>
                  <span className="text-orange-500 font-bold">{metrics.network}%</span>
                </div>
                <Progress value={metrics.network} className="h-2" />
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-1">{metrics.activeAgents}</div>
                  <div className="text-sm text-white/60">Active Agents</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Execution Logs */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Execution Logs</h3>

            <div className="bg-black/50 rounded-xl p-4 font-mono text-sm max-h-80 overflow-y-auto">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3 mb-3 last:mb-0"
                >
                  {getLogIcon(log.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-xs font-bold ${getLogColor(log.type)}`}>{log.type}</span>
                      <span className="text-xs text-white/40">{log.timestamp}</span>
                    </div>
                    <div className="text-white/80 text-xs leading-relaxed">{log.message}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Agent Status */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Agent Status</h3>

            <div className="space-y-4">
              {[
                { name: "Agent-Alpha", status: "active", load: 78 },
                { name: "Agent-Beta", status: "active", load: 45 },
                { name: "Agent-Gamma", status: "idle", load: 12 },
                { name: "Agent-Delta", status: "active", load: 89 },
                { name: "Agent-Epsilon", status: "maintenance", load: 0 },
              ].map((agent, index) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-black/30 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        agent.status === "active"
                          ? "bg-green-400"
                          : agent.status === "idle"
                            ? "bg-yellow-400"
                            : "bg-red-400"
                      }`}
                    />
                    <span className="font-medium">{agent.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-orange-500 font-bold text-sm">{agent.load}%</div>
                    <div className="text-xs text-white/60 capitalize">{agent.status}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Agent Network Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6">Agent Network Topology</h3>
          <AgentNetworkVisualization />
        </motion.div>
      </div>
    </div>
  )
}
