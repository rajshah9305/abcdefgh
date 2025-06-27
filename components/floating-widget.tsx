"use client"

import { motion } from "framer-motion"

interface FloatingWidgetProps {
  label: string
  color: "green" | "magenta" | "orange"
  position: { top?: string; bottom?: string; left?: string; right?: string }
  delay?: number
}

export function FloatingWidget({ label, color, position, delay = 0 }: FloatingWidgetProps) {
  const colorClasses = {
    green: "bg-green-500/20 text-green-400 border-green-500/30",
    magenta: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    orange: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  }

  return (
    <motion.div
      className={`absolute z-20 px-4 py-2 rounded-full border backdrop-blur-xl font-medium text-sm ${colorClasses[color]}`}
      style={position}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.6 },
        scale: { delay, duration: 0.6 },
        y: {
          delay: delay + 1,
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      }}
      whileHover={{ scale: 1.1 }}
    >
      {label}
    </motion.div>
  )
}
