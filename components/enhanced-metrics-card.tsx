"use client"

import { motion } from "framer-motion"
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

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
  return (
    <motion.div
      className="relative p-6 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{
        scale: 1.02,
        y: -5,
        boxShadow: "0 25px 50px rgba(255, 108, 0, 0.1)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {realTime && (
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
      )}

      <div className="flex items-center justify-between mb-4">
        <motion.div
          className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <Icon size={24} className="text-orange-500" />
        </motion.div>

        <div className="flex items-center space-x-1 text-sm">
          {trend === "up" ? (
            <TrendingUp size={16} className="text-green-500" />
          ) : (
            <TrendingDown size={16} className="text-red-500" />
          )}
          <span className={trend === "up" ? "text-green-500" : "text-red-500"}>{change}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <motion.p
          className="text-3xl font-bold text-gray-900"
          key={value}
          initial={{ scale: 1.1, color: "#ff6c00" }}
          animate={{ scale: 1, color: "#111827" }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-orange-500 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
