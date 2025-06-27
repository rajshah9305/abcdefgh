"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface FloatingWidgetProps {
  label: string
  color: "green" | "magenta" | "orange"
  position: { top?: string; bottom?: string; left?: string; right?: string }
  delay?: number
  metric?: string
}

export function FloatingWidget({ label, color, position, delay = 0, metric }: FloatingWidgetProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colorClasses = {
    green: {
      bg: "bg-green-500/20",
      text: "text-green-400",
      border: "border-green-500/40",
      glow: "shadow-green-500/20",
    },
    magenta: {
      bg: "bg-pink-500/20",
      text: "text-pink-400",
      border: "border-pink-500/40",
      glow: "shadow-pink-500/20",
    },
    orange: {
      bg: "bg-orange-500/20",
      text: "text-orange-400",
      border: "border-orange-500/40",
      glow: "shadow-orange-500/20",
    },
  }

  const colors = colorClasses[color]

  return (
    <motion.div
      className={`absolute z-20 ${colors.bg} ${colors.border} backdrop-blur-2xl border rounded-2xl overflow-hidden cursor-pointer`}
      style={position}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.8 },
        scale: { delay, duration: 0.8 },
        y: {
          delay: delay + 1,
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      }}
      whileHover={{
        scale: 1.15,
        boxShadow: `0 20px 40px ${colors.glow}`,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <div className={`font-bold text-sm ${colors.text} uppercase tracking-wider`}>{label}</div>
            {metric && (
              <motion.div
                className="text-white font-mono text-lg"
                key={metric}
                initial={{ scale: 1.2, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {metric}
              </motion.div>
            )}
          </div>

          <motion.div
            className={`w-3 h-3 ${colors.bg.replace("/20", "")} rounded-full`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : ["0% 0%", "50% 50%"],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          style={{
            backgroundImage: `linear-gradient(45deg, ${color === "green" ? "#10B981" : color === "magenta" ? "#EC4899" : "#F97316"} 25%, transparent 25%), 
                             linear-gradient(-45deg, ${color === "green" ? "#10B981" : color === "magenta" ? "#EC4899" : "#F97316"} 25%, transparent 25%)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>
    </motion.div>
  )
}
