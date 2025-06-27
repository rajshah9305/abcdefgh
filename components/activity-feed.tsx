"use client"

import { motion } from "framer-motion"
import { Activity, CheckCircle, AlertTriangle, Info, Clock } from "lucide-react"
import { useState, useEffect } from "react"

interface ActivityItem {
  id: string
  type: "success" | "warning" | "info" | "error"
  message: string
  timestamp: string
  agent?: string
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "success",
      message: "Agent Alpha-7 completed task batch successfully",
      timestamp: "2 minutes ago",
      agent: "Alpha-7",
    },
    {
      id: "2",
      type: "info",
      message: "Neural network optimization cycle initiated",
      timestamp: "5 minutes ago",
    },
    {
      id: "3",
      type: "warning",
      message: "High memory usage detected on Agent Beta-3",
      timestamp: "8 minutes ago",
      agent: "Beta-3",
    },
    {
      id: "4",
      type: "success",
      message: "Auto-scaling triggered: 5 new agents deployed",
      timestamp: "12 minutes ago",
    },
    {
      id: "5",
      type: "info",
      message: "System checkpoint created successfully",
      timestamp: "15 minutes ago",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: Math.random() > 0.7 ? "success" : Math.random() > 0.5 ? "info" : "warning",
        message: getRandomMessage(),
        timestamp: "Just now",
        agent: Math.random() > 0.5 ? getRandomAgent() : undefined,
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, 9)])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getRandomMessage = () => {
    const messages = [
      "Task delegation completed successfully",
      "Memory optimization cycle finished",
      "New agent connection established",
      "Load balancing adjustment applied",
      "Performance metrics updated",
      "Security scan completed",
      "Data pipeline synchronized",
      "Agent health check passed",
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  const getRandomAgent = () => {
    const agents = ["Alpha-7", "Beta-3", "Gamma-1", "Delta-9", "Epsilon-5"]
    return agents[Math.floor(Math.random() * agents.length)]
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle size={16} className="text-green-500" />
      case "warning":
        return <AlertTriangle size={16} className="text-yellow-500" />
      case "error":
        return <AlertTriangle size={16} className="text-red-500" />
      case "info":
        return <Info size={16} className="text-blue-500" />
      default:
        return <Info size={16} className="text-gray-500" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50 dark:bg-green-900/20"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
      case "error":
        return "border-l-red-500 bg-red-50 dark:bg-red-900/20"
      case "info":
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-900/20"
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-3">
        <Activity size={24} className="text-orange-500" />
        <span>Live Activity Feed</span>
      </h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
              p-4 rounded-xl border-l-4 transition-all duration-300 hover:shadow-md
              ${getActivityColor(activity.type)}
            `}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">{getActivityIcon(activity.type)}</div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">{activity.message}</p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock size={12} />
                    <span>{activity.timestamp}</span>
                  </div>

                  {activity.agent && (
                    <span className="text-xs font-medium px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full">
                      {activity.agent}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Real-time system events</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
