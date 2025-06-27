"use client"

import { motion } from "framer-motion"

interface FloatingWidgetProps {
  label: string
  color: "green" | "orange" | "blue" | "magenta"
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  delay?: number
  metric: string
}

export function FloatingWidget({ label, color, position, delay = 0, metric }: FloatingWidgetProps) {
  const colorClasses = {
    green: "bg-green-500/20 border-green-500/30 text-green-600",
    orange: "bg-orange-500/20 border-orange-500/30 text-orange-600",
    blue: "bg-blue-500/20 border-blue-500/30 text-blue-600",
    magenta: "bg-pink-500/20 border-pink-500/30 text-pink-600",
  }

  return (
    <motion.div
      className={`absolute z-20 px-4 py-2 rounded-full backdrop-blur-xl border ${colorClasses[color]} shadow-lg`}
      style={position}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: {
          delay: delay + 0.5,
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="flex items-center space-x-2 text-sm font-medium">
        <div
          className={`w-2 h-2 rounded-full ${color === "green" ? "bg-green-500" : color === "orange" ? "bg-orange-500" : color === "blue" ? "bg-blue-500" : "bg-pink-500"} animate-pulse`}
        />
        <span>{label}</span>
        <span className="font-mono font-bold">{metric}</span>
      </div>
    </motion.div>
  )
}
