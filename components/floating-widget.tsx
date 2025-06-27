"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface FloatingWidgetProps {
  label: string
  color: "green" | "orange" | "blue" | "purple" | "pink"
  position: { top?: string; bottom?: string; left?: string; right?: string }
  delay?: number
  metric?: string
}

const colorMap = {
  green: {
    bg: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30",
    text: "text-green-600 dark:text-green-400",
    glow: "shadow-green-500/20",
  },
  orange: {
    bg: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/30",
    text: "text-orange-600 dark:text-orange-400",
    glow: "shadow-orange-500/20",
  },
  blue: {
    bg: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    text: "text-blue-600 dark:text-blue-400",
    glow: "shadow-blue-500/20",
  },
  purple: {
    bg: "from-purple-500/20 to-violet-500/20",
    border: "border-purple-500/30",
    text: "text-purple-600 dark:text-purple-400",
    glow: "shadow-purple-500/20",
  },
  pink: {
    bg: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
    text: "text-pink-600 dark:text-pink-400",
    glow: "shadow-pink-500/20",
  },
}

export function FloatingWidget({ label, color, position, delay = 0, metric }: FloatingWidgetProps) {
  const [isHovered, setIsHovered] = useState(false)
  const colors = colorMap[color]

  return (
    <motion.div
      className="absolute z-20 hidden lg:block"
      style={position}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 100,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`
          bg-gradient-to-br ${colors.bg} backdrop-blur-xl 
          border ${colors.border} rounded-2xl px-6 py-4 
          shadow-xl ${colors.glow} cursor-pointer
          hover:shadow-2xl transition-all duration-300
        `}
        whileHover={{
          scale: 1.1,
          y: -5,
          rotateY: 10,
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          hover: {
            duration: 0.3,
          },
        }}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            className={`w-3 h-3 rounded-full ${colors.text.replace("text-", "bg-")}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />

          <div>
            <div className={`text-sm font-semibold ${colors.text}`}>{label}</div>
            {metric && (
              <motion.div
                className={`text-xs ${colors.text} opacity-80`}
                key={metric}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {metric}
              </motion.div>
            )}
          </div>
        </div>

        {/* Hover effect particles */}
        {isHovered && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${colors.text.replace("text-", "bg-")}`}
                style={{
                  left: `${25 + i * 15}%`,
                  top: `${20 + Math.sin(i) * 30}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [-10, -20],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
