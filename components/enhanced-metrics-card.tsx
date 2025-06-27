"use client"

import { motion } from "framer-motion"
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { useState } from "react"

interface EnhancedMetricsCardProps {
  icon: LucideIcon
  title: string
  value: string
  change: string
  trend: "up" | "down"
  description: string
  realTime?: boolean
}

export function EnhancedMetricsCard({
  icon: Icon,
  title,
  value,
  change,
  trend,
  description,
  realTime = false,
}: EnhancedMetricsCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.02,
        y: -8,
        rotateX: 5,
        rotateY: 5,
        transformPerspective: 1000,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Enhanced background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-400/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
      />

      {/* Floating particles on hover */}
      {isHovered && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-500/60 rounded-full pointer-events-none"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + Math.sin(i) * 20}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [-20, -40],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      )}

      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 hover:border-orange-500/30 transition-all duration-500 group-hover:shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className="p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/20 dark:from-orange-400/20 dark:to-orange-500/20 rounded-2xl backdrop-blur-sm"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Icon size={32} className="text-orange-500 dark:text-orange-400" />
          </motion.div>

          <div className="flex items-center space-x-2">
            {realTime && (
              <motion.div
                className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-500 font-medium">LIVE</span>
              </motion.div>
            )}

            <div
              className={`flex items-center space-x-1 text-sm font-medium ${
                trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend === "up" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{change}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h3>

          <motion.div
            className="text-4xl font-bold text-gray-900 dark:text-white"
            key={value}
            initial={{ scale: 1.1, color: "#ff6c00" }}
            animate={{ scale: 1, color: "currentColor" }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.div>

          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>

        {/* Animated progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/50 via-orange-400/50 to-orange-500/50 opacity-0 group-hover:opacity-100 rounded-b-3xl"
          animate={{
            x: isHovered ? ["-100%", "100%"] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: "linear",
          }}
        />

        {/* Corner accent */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-orange-500/30 rounded-full group-hover:bg-orange-500 transition-colors duration-300" />
      </div>
    </motion.div>
  )
}
