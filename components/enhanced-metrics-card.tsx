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

  useEffect(() => {
    if (realTime) {
      const timeout = setTimeout(() => {
        setAnimatedValue(value)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [value, realTime])

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
              }}
            />
          ))}
        </>
      )}

      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:border-orange-500/30 transition-all duration-700 group-hover:shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            className="p-5 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl backdrop-blur-sm border border-orange-500/20"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          >
            <Icon size={36} className="text-orange-500" />
          </motion.div>

          <div className="flex items-center space-x-3">
            {realTime && (
              <motion.div
                className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-400 font-medium">LIVE</span>
              </motion.div>
            )}

            <div
              className={`flex items-center space-x-2 text-lg font-medium ${
                trend === "up" ? "text-green-400" : "text-red-400"
              }`}
            >
              {trend === "up" ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              <span>{change}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-300">{title}</h3>

          <motion.div
            className="text-5xl font-bold text-white counter-animate"
            key={animatedValue}
            initial={{ scale: 1.1, color: "#ff6600" }}
            animate={{ scale: 1, color: "#ffffff" }}
            transition={{ duration: 0.5 }}
          >
            {animatedValue}
          </motion.div>

          <p className="text-lg text-gray-400 leading-relaxed">{description}</p>
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
        <div className="absolute top-6 right-6 w-3 h-3 bg-orange-500/30 rounded-full group-hover:bg-orange-500 transition-colors duration-500" />
      </div>
    </motion.div>
  )
}
