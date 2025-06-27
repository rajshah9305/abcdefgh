"use client"

import { motion } from "framer-motion"
import { Search, Bell, Settings, User, Moon, Sun, Command } from "lucide-react"
import { useState } from "react"
import { useTheme } from "./theme-provider"

interface NavigationProps {
  currentSection: string
  onSectionChange: (section: "hero" | "frameworks" | "config" | "dashboard") => void
  isTransitioning: boolean
}

export function Navigation({ currentSection, onSectionChange, isTransitioning }: NavigationProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [notificationCount] = useState(3)
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { id: "hero", label: "Overview" },
    { id: "frameworks", label: "Frameworks" },
    { id: "config", label: "Configuration" },
    { id: "dashboard", label: "Mission Control" },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => onSectionChange("hero")}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <span className="text-white font-bold text-lg">AO</span>
            </motion.div>
            <div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">AI Orchestra</span>
              <div className="text-xs text-gray-500 dark:text-gray-400">Next-Gen Platform</div>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onSectionChange(item.id as any)}
                className={`
                  relative px-6 py-3 text-sm font-medium transition-all duration-300 rounded-xl
                  ${
                    currentSection === item.id
                      ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }
                `}
                disabled={isTransitioning}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {currentSection === item.id && (
                  <motion.div
                    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Action Items */}
          <div className="flex items-center space-x-3">
            {/* Command Palette Trigger */}
            <motion.button
              className="hidden md:flex items-center space-x-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Command size={16} />
              <span>Search...</span>
              <kbd className="text-xs bg-gray-200 dark:bg-gray-700 px-1 rounded">⌘K</kbd>
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Search */}
            <motion.button
              onClick={() => setIsSearchOpen(true)}
              className="p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Open search"
            >
              <Search size={20} />
            </motion.button>

            {/* Notifications */}
            <motion.button
              className="relative p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`${notificationCount} notifications`}
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.6 }}
                >
                  {notificationCount}
                </motion.div>
              )}
            </motion.button>

            {/* Settings */}
            <motion.button
              className="p-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Settings"
            >
              <Settings size={20} />
            </motion.button>

            {/* Profile */}
            <motion.button
              className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="User profile"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {isTransitioning && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.nav>
  )
}
