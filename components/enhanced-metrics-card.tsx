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
  description?: string
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
      const timer = setTimeout(() => setAnimatedValue(value), 100)
      return () => clearTimeout(timer)
    }
  }, [value, realTime])

  return (
    <motion.div
      className="relative group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
        y: -10,
        rotateY: 5,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 200,
      }}
    >
      {/* Enhanced Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-pink-500/30 rounded-3xl blur-2xl"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.1 : 0.9,
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-orange-500/40 transition-all duration-500 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 108, 0, 0.3) 0%, transparent 50%), 
                                  radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.3) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <motion.div
            className="p-4 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon size={28} className="text-orange-500" />
          </motion.div>

          <div
            className={`flex items-center space-x-2 text-sm font-medium ${
              trend === "up" ? "text-green-400" : "text-red-400"
            }`}
          >
            <motion.div
              animate={{ y: trend === "up" ? [-2, 2, -2] : [2, -2, 2] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {trend === "up" ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            </motion.div>
            <span>{change}</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-white/80 text-sm font-medium mb-2 uppercase tracking-wider">{title}</h3>

          <motion.p
            className="text-4xl font-bold text-orange-500 mb-2"
            key={animatedValue}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {animatedValue}
          </motion.p>

          {description && (
            <motion.p
              className="text-white/60 text-xs leading-relaxed"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0.7,
                height: "auto",
              }}
              transition={{ duration: 0.3 }}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Real-time Indicator */}
        {realTime && (
          <motion.div
            className="absolute top-4 right-4 flex items-center space-x-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-green-400 font-medium">LIVE</span>
          </motion.div>
        )}

        {/* Interactive Particles */}
        {isHovered && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-500 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + Math.sin(i) * 20}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [-20, -40, -60],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2,
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  )
}
