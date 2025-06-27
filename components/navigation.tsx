"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Command, Search } from "lucide-react"

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
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md"
      initial={{ y: -96 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* ─────────────────────── Logo ─────────────────────── */}
        <motion.button
          onClick={() => onSectionChange("hero")}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 focus:outline-none"
        >
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <span className="text-xl font-bold text-white">AO</span>
          </motion.div>
          <div className="text-left">
            <span className="block text-2xl font-bold text-white">AI Orchestra</span>
            <span className="block text-sm text-gray-400">Next-Gen&nbsp;Platform</span>
          </div>
        </motion.button>

        {/* ────────────────── Primary Navigation ─────────────── */}
        <div className="hidden items-center gap-2 md:flex">
          {items.map((item) => (
            <motion.button
              key={item.id}
              disabled={isTransitioning}
              onClick={() => onSectionChange(item.id)}
              className={`relative rounded-xl px-6 py-3 text-sm font-medium transition-colors
                ${
                  currentSection === item.id
                    ? "bg-orange-500/15 text-orange-400"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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

        {/* ───────────────────── Actions ─────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Cmd + K trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 md:flex"
          >
            <Command size={18} />
            Search…
            <kbd className="rounded bg-white/10 px-1 text-xs">⌘K</kbd>
          </motion.button>

          {/* Search (mobile) */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-xl p-3 text-gray-400 hover:bg-white/10 hover:text-white"
            aria-label="Open search"
          >
            <Search size={20} />
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative rounded-xl p-3 text-gray-400 hover:bg-white/10 hover:text-white"
            aria-label={`${notificationCount} notifications`}
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.6 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white"
              >
                {notificationCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>

      {/* ───────────── Bottom progress (page transition) ─────── */}
      {isTransitioning && (
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      )}
    </motion.nav>
  )
}
