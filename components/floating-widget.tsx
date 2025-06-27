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
    const timer = setTimeout(() => setIsVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  const colorClasses = {
    green: "bg-green-500/20 border-green-500/30 text-green-600",
    orange: "bg-orange-500/20 border-orange-500/30 text-orange-600",
    blue: "bg-blue-500/20 border-blue-500/30 text-blue-600",
    purple: "bg-purple-500/20 border-purple-500/30 text-purple-600",
  }

  const glowColors = {
    green: "shadow-green-500/20",
    orange: "shadow-orange-500/20",
    blue: "shadow-blue-500/20",
    purple: "shadow-purple-500/20",
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed z-20 hidden lg:block"
      style={position}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 100,
      }}
    >
      <motion.div
        className={`px-6 py-4 rounded-2xl backdrop-blur-xl border ${colorClasses[color]} ${glowColors[color]} shadow-xl`}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.1,
          rotate: 0,
          transition: { duration: 0.3 },
        }}
      >
        <div className="text-center">
          <div className="text-sm font-medium opacity-80 mb-1">{label}</div>
          <motion.div
            className="text-2xl font-bold font-mono"
            key={metric}
            animate={{
              scale: [1, 1.1, 1],
            }}
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
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
