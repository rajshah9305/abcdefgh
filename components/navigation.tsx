"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Command, Search } from "lucide-react"
import { CustomLogo } from "./custom-logo"

interface NavigationProps {
  currentSection: string
  onSectionChange: (s: "hero" | "frameworks" | "config" | "dashboard") => void
  isTransitioning: boolean
}

export function Navigation({ currentSection, onSectionChange, isTransitioning }: NavigationProps) {
  const [notificationCount] = useState(3)

  const items = [
    { id: "hero", label: "Overview" },
    { id: "frameworks", label: "Frameworks" },
    { id: "config", label: "Configuration" },
    { id: "dashboard", label: "Mission Control" },
  ] as const

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl"
      initial={{ y: -96 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.button
          onClick={() => onSectionChange("hero")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-4 focus:outline-none"
          transition={{ duration: 0.2 }}
        >
          <CustomLogo size={48} animated={false} />
          <div className="text-left">
            <span className="block text-2xl font-bold text-gray-900">AI Orchestra</span>
            <span className="block text-sm text-gray-600">Next-Gen Platform</span>
          </div>
        </motion.button>

        {/* Primary Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {items.map((item) => (
            <motion.button
              key={item.id}
              disabled={isTransitioning}
              onClick={() => onSectionChange(item.id)}
              className={`relative rounded-xl px-6 py-3 text-lg font-medium transition-all duration-300
                ${
                  currentSection === item.id
                    ? "bg-orange-500/15 text-orange-600 shadow-lg shadow-orange-500/20"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
              {currentSection === item.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-orange-500"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Command Palette */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-lg text-gray-600 hover:bg-gray-100 md:flex transition-all duration-300"
          >
            <Command size={20} />
            Search…
            <kbd className="rounded bg-gray-200 px-2 py-1 text-sm">⌘K</kbd>
          </motion.button>

          {/* Search (mobile) */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-xl p-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
            aria-label="Open search"
          >
            <Search size={22} />
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative rounded-xl p-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
            aria-label={`${notificationCount} notifications`}
          >
            <Bell size={22} />
            {notificationCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.6 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white shadow-lg"
              >
                {notificationCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Loading indicator */}
      {isTransitioning && (
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      )}
    </motion.nav>
  )
}
