"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, Command, ArrowRight, Zap, Settings, BarChart3, Layers } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

interface CommandPaletteProps {
  onSectionChange: (section: "hero" | "frameworks" | "config" | "dashboard") => void
}

export function CommandPalette({ onSectionChange }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const commands = [
    { id: "hero", label: "Go to Overview", icon: BarChart3, action: () => onSectionChange("hero") },
    { id: "frameworks", label: "Browse Frameworks", icon: Layers, action: () => onSectionChange("frameworks") },
    { id: "config", label: "Open Configuration", icon: Settings, action: () => onSectionChange("config") },
    { id: "dashboard", label: "Mission Control", icon: Zap, action: () => onSectionChange("dashboard") },
    { id: "search", label: "Search Documentation", icon: Search, action: () => console.log("Search docs") },
  ]

  const filteredCommands = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()))

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }

      if (e.key === "Escape") {
        setIsOpen(false)
        setQuery("")
        setSelectedIndex(0)
      }

      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1))
        }

        if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
        }

        if (e.key === "Enter" && filteredCommands[selectedIndex]) {
          e.preventDefault()
          filteredCommands[selectedIndex].action()
          setIsOpen(false)
          setQuery("")
          setSelectedIndex(0)
        }
      }
    },
    [isOpen, filteredCommands, selectedIndex],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center space-x-4 p-6 border-b border-gray-200 dark:border-gray-700">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search commands..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                autoFocus
              />
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">ESC</kbd>
                <span>to close</span>
              </div>
            </div>

            {/* Commands */}
            <div className="max-h-96 overflow-y-auto">
              {filteredCommands.length > 0 ? (
                <div className="p-2">
                  {filteredCommands.map((command, index) => {
                    const Icon = command.icon
                    return (
                      <motion.button
                        key={command.id}
                        onClick={() => {
                          command.action()
                          setIsOpen(false)
                          setQuery("")
                          setSelectedIndex(0)
                        }}
                        className={`
                          w-full flex items-center space-x-4 p-4 rounded-xl text-left transition-all duration-200
                          ${
                            index === selectedIndex
                              ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                          }
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`
                          p-2 rounded-lg
                          ${
                            index === selectedIndex
                              ? "bg-orange-100 dark:bg-orange-800/30"
                              : "bg-gray-100 dark:bg-gray-800"
                          }
                        `}
                        >
                          <Icon size={18} />
                        </div>
                        <span className="flex-1 font-medium">{command.label}</span>
                        <ArrowRight size={16} className="opacity-50" />
                      </motion.button>
                    )
                  })}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <Search size={32} className="mx-auto mb-4 opacity-50" />
                  <p>No commands found for "{query}"</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">↑</kbd>
                  <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">↓</kbd>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">↵</kbd>
                  <span>to select</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Command size={12} />
                <span>Command Palette</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
