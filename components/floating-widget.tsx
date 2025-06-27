"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface FloatingWidgetProps {
  label: string
  metric: string
  color: "green" | "orange" | "blue" | "purple"
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  delay?: number
}

export function FloatingWidget({ label, metric, color, position, delay = 0 }: FloatingWidgetProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [delay])

  const colorClasses = {
    green: "from-green-500/20 to-green-600/20 border-green-500/30 text-green-400",
    orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400",
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400",
  }

  const glowColors = {
    green: "0 0 30px rgba(16, 185, 129, 0.3)",
    orange: "0 0 30px rgba(255, 102, 0, 0.3)",
    blue: "0 0 30px rgba(59, 130, 246, 0.3)",
    purple: "0 0 30px rgba(147, 51, 234, 0.3)",
  }

  if (!isVisible) return null

  return (
    <motion.div
      className={`fixed z-20 hidden lg:block`}
      style={position}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className={`
          bg-gradient-to-br ${colorClasses[color]} backdrop-blur-xl 
          border rounded-2xl px-6 py-4 shadow-xl
        `}
        animate={{
          y: [0, -10, 0],
          boxShadow: [glowColors[color], `${glowColors[color]}, ${glowColors[color]}`, glowColors[color]],
        }}
        transition={{
          y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          boxShadow: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.05, y: -5 }}
      >
        <div className="text-center">
          <div className="text-sm font-medium text-gray-300 mb-1">{label}</div>
          <motion.div
            className={`text-2xl font-bold ${colorClasses[color].split(" ").pop()}`}
            key={metric}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {metric}
          </motion.div>
        </div>

        {/* Pulse indicator */}
        <motion.div
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
            color === "green"
              ? "bg-green-500"
              : color === "orange"
                ? "bg-orange-500"
                : color === "blue"
                  ? "bg-blue-500"
                  : "bg-purple-500"
          }`}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </motion.div>
  )
}
