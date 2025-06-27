"use client"

import { motion } from "framer-motion"
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface MetricsCardProps {
  icon: LucideIcon
  title: string
  value: string
  change: string
  trend: "up" | "down"
}

export function MetricsCard({ icon: Icon, title, value, change, trend }: MetricsCardProps) {
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-xl">
            <Icon size={24} className="text-orange-500" />
          </div>
          <div className={`flex items-center space-x-1 text-sm ${trend === "up" ? "text-green-400" : "text-red-400"}`}>
            {trend === "up" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{change}</span>
          </div>
        </div>

        <div>
          <h3 className="text-white/70 text-sm font-medium mb-1">{title}</h3>
          <p className="text-3xl font-bold text-orange-500">{value}</p>
        </div>
      </div>
    </motion.div>
  )
}
