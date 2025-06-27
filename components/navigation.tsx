"use client"

import { motion } from "framer-motion"
import { Search, Bell, Settings, User } from "lucide-react"

interface NavigationProps {
  currentSection: string
  onSectionChange: (section: "hero" | "frameworks" | "config" | "dashboard") => void
  isTransitioning: boolean
}

export function Navigation({ currentSection, onSectionChange, isTransitioning }: NavigationProps) {
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "frameworks", label: "Frameworks" },
    { id: "config", label: "Configuration" },
    { id: "dashboard", label: "Dashboard" },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AO</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AI Orchestra</span>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onSectionChange(item.id as any)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  currentSection === item.id ? "text-orange-600" : "text-gray-600 hover:text-gray-900"
                }`}
                disabled={isTransitioning}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {currentSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Action Items */}
          <div className="flex items-center space-x-4">
            <motion.button
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search size={20} />
            </motion.button>
            <motion.button
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell size={20} />
              <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </motion.button>
            <motion.button
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings size={20} />
            </motion.button>
            <motion.button
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <User size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
