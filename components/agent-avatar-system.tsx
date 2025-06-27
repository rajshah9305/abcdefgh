"use client"

import { motion } from "framer-motion"
import { Users, Brain, Zap, Shield, Cpu, Database } from "lucide-react"
import { useState, useEffect } from "react"

interface Agent {
  id: string
  name: string
  type: "neural" | "processing" | "security" | "data" | "optimization"
  status: "active" | "idle" | "busy" | "offline"
  load: number
  tasks: number
  avatar: string
}

export function AgentAvatarSystem() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "Alpha-7",
      type: "neural",
      status: "active",
      load: 78,
      tasks: 24,
      avatar: "🤖",
    },
    {
      id: "2",
      name: "Beta-3",
      type: "processing",
      status: "busy",
      load: 92,
      tasks: 31,
      avatar: "⚡",
    },
    {
      id: "3",
      name: "Gamma-1",
      type: "security",
      status: "active",
      load: 45,
      tasks: 12,
      avatar: "🛡️",
    },
    {
      id: "4",
      name: "Delta-9",
      type: "data",
      status: "idle",
      load: 15,
      tasks: 3,
      avatar: "📊",
    },
    {
      id: "5",
      name: "Epsilon-5",
      type: "optimization",
      status: "active",
      load: 67,
      tasks: 18,
      avatar: "🔧",
    },
  ])

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          load: Math.max(10, Math.min(100, agent.load + (Math.random() - 0.5) * 20)),
          tasks: Math.max(0, agent.tasks + Math.floor((Math.random() - 0.3) * 3)),
          status:
            Math.random() > 0.9 ? (["active", "busy", "idle"] as const)[Math.floor(Math.random() * 3)] : agent.status,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "busy":
        return "bg-orange-500"
      case "idle":
        return "bg-yellow-500"
      case "offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "neural":
        return Brain
      case "processing":
        return Cpu
      case "security":
        return Shield
      case "data":
        return Database
      case "optimization":
        return Zap
      default:
        return Users
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-3">
        <Users size={24} className="text-orange-500" />
        <span>Agent Network</span>
      </h3>

      <div className="space-y-4">
        {agents.map((agent, index) => {
          const TypeIcon = getTypeIcon(agent.type)

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-4 rounded-xl border transition-all duration-300 cursor-pointer
                ${
                  selectedAgent?.id === agent.id
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }
              `}
              onClick={() => setSelectedAgent(selectedAgent?.id === agent.id ? null : agent)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center text-2xl">
                    {agent.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(agent.status)} rounded-full border-2 border-white dark:border-gray-800`}
                  />
                </div>

                {/* Agent Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h4>
                    <TypeIcon size={16} className="text-gray-500 dark:text-gray-400" />
                  </div>

                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{agent.type}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{agent.tasks} tasks</span>
                  </div>

                  {/* Load Bar */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Load</span>
                      <span>{agent.load}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${
                          agent.load > 80 ? "bg-red-500" : agent.load > 60 ? "bg-orange-500" : "bg-green-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${agent.load}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedAgent?.id === agent.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Status:</span>
                      <span className="ml-2 font-medium capitalize text-gray-900 dark:text-white">{agent.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Type:</span>
                      <span className="ml-2 font-medium capitalize text-gray-900 dark:text-white">{agent.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Load:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{agent.load}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Tasks:</span>
                      <span className="ml-2 font-medium text-gray-900 dark:text-white">{agent.tasks}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{agents.length} agents online</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Active</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span>Busy</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span>Idle</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
