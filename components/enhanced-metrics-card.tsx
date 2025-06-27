"use client"

import { motion } from "framer-motion"
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { useState, useEffect } from "react"

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
  const [animatedValue, setAnimatedValue] = useState(value)
  const [displayValue, setDisplayValue] = useState("0")

  // Animate counter changes with smooth transitions
  useEffect(() => {
    if (realTime && value !== animatedValue) {
      const numericValue = Number.parseInt(value.replace(/[^\d]/g, "")) || 0
      const currentValue = Number.parseInt(displayValue.replace(/[^\d]/g, "")) || 0

      if (numericValue !== currentValue) {
        const duration = 1500
        const steps = 40
        const increment = (numericValue - currentValue) / steps
        let step = 0

        const timer = setInterval(() => {
          step++
          const newValue = Math.round(currentValue + increment * step)

          if (value.includes("%")) {
            setDisplayValue(`${newValue}%`)
          } else if (value.includes(",")) {
            setDisplayValue(newValue.toLocaleString())
          } else {
            setDisplayValue(newValue.toString())
          }

          if (step >= steps) {
            setDisplayValue(value)
            setAnimatedValue(value)
            clearInterval(timer)
          }
        }, duration / steps)

        return () => clearInterval(timer)
      }
    } else {
      setDisplayValue(value)
      setAnimatedValue(value)
    }
  }, [value, realTime, animatedValue, displayValue])

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.03,
        y: -12,
        rotateX: 5,
        rotateY: 5,
        transformPerspective: 1000,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Enhanced background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-400/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        animate={{
          scale: isHovered ? 1.2 : 1,
        }}
      />

      {/* Floating particles on hover */}
      {isHovered && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-orange-500/60 rounded-full pointer-events-none"
              style={{
                left: `${15 + i * 10}%`,
                top: `${25 + Math.sin(i) * 25}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [-30, -60],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}

      <div className="relative bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 hover:border-orange-500/30 transition-all duration-700 group-hover:shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className="p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl backdrop-blur-sm border border-orange-500/20"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Icon size={32} className="text-orange-500" />
          </motion.div>

          <div className="flex items-center space-x-3">
            {realTime && (
              <motion.div
                className="flex items-center space-x-2 bg-green-500/20 px-3 py-1.5 rounded-full border border-green-500/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-green-600 font-medium">LIVE</span>
              </motion.div>
            )}

            <div
              className={`flex items-center space-x-1 text-sm font-medium ${
                trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend === "up" ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
              <span>{change}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>

          <motion.div
            className="text-4xl font-bold text-gray-900"
            key={displayValue}
            animate={{
              scale: [1, 1.05, 1],
              color: ["#111827", "#ff6600", "#111827"],
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {displayValue}
          </motion.div>

          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Animated progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/50 via-orange-400/50 to-orange-500/50 opacity-0 group-hover:opacity-100 rounded-b-3xl"
          animate={{
            x: isHovered ? ["-100%", "100%"] : 0,
          }}
          transition={{
            duration: 2.5,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: "linear",
          }}
        />

        {/* Corner accent */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-orange-500/30 rounded-full group-hover:bg-orange-500 transition-colors duration-500" />
      </div>
    </motion.div>
  )
}
