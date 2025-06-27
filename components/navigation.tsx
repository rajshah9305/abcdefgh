"use client"

import { motion } from "framer-motion"
import { User, Settings, Activity, Layers, Sliders, BarChart3, Bell, Search } from "lucide-react"
import { useState } from "react"
import { useAnalytics } from "./analytics-provider"

interface NavigationProps {
  currentSection: "hero" | "frameworks" | "config" | "dashboard"
  onSectionChange: (section: "hero" | "frameworks" | "config" | "dashboard") => void
  isTransitioning?: boolean
}

export function Navigation({ currentSection, onSectionChange, isTransitioning }: NavigationProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { data } = useAnalytics()

  const navItems = [
    { id: "hero", label: "Orchestra", icon: Activity },
    { id: "frameworks", label: "Frameworks", icon: Layers },
    { id: "config", label: "Configure", icon: Sliders },
    { id: "dashboard", label: "Mission Control", icon: BarChart3 },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            onClick={() => onSectionChange("hero")}
            role="button"
            tabIndex={0}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <span className="text-white font-bold text-lg">AO</span>
            </motion.div>
            <div>
              <span className="text-2xl font-bold">
                <span className="text-orange-500">Agent</span>
                <span className="text-white">Orchestra</span>
              </span>
              <div className="text-xs text-white/50">Next-Gen AI Platform</div>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentSection === item.id

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onSectionChange(item.id as any)}
                  disabled={isTransitioning}
                  className={`relative flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive ? "text-orange-500 bg-orange-500/10" : "text-white/70 hover:text-white hover:bg-white/5"
                  } ${isTransitioning ? "opacity-50 cursor-not-allowed" : ""}`}
                  whileHover={{ scale: isTransitioning ? 1 : 1.05 }}
                  whileTap={{ scale: isTransitioning ? 1 : 0.95 }}
                >
                  <Icon size={18} />
                  <span className="font-medium hidden md:block">{item.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-xl border border-orange-500/30"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <motion.button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-3 rounded-xl hover:bg-white/10 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search size={20} />
            </motion.button>

            {/* Notifications */}
            <motion.button
              className="p-3 rounded-xl hover:bg-white/10 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell size={20} />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.button>

            {/* Analytics Badge */}
            <motion.div
              className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl border border-green-500/30 rounded-xl px-4 py-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-medium">{data.userInteractions} interactions</span>
            </motion.div>

            {/* Settings */}
            <motion.button
              className="p-3 rounded-xl hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings size={20} />
            </motion.button>

            {/* Profile */}
            <motion.button
              className="p-3 rounded-xl hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <User size={20} />
            </motion.button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6"
          >
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search agents, configurations, or documentation..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-orange-500 transition-colors"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
