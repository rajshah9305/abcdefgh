"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info" | "warning"
  duration?: number
}

interface ToastContextType {
  showToast: (message: string, type: Toast["type"], duration?: number) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: Toast["type"], duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast: Toast = { id, message, type, duration }

    setToasts((prev) => [...prev, toast])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const getToastIcon = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} />
      case "error":
        return <AlertCircle size={20} />
      case "warning":
        return <AlertTriangle size={20} />
      case "info":
        return <Info size={20} />
    }
  }

  const getToastColors = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white"
      case "error":
        return "bg-red-500 text-white"
      case "warning":
        return "bg-yellow-500 text-white"
      case "info":
        return "bg-blue-500 text-white"
    }
  }

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl shadow-lg backdrop-blur-xl border border-white/20 max-w-md ${getToastColors(toast.type)}`}
            >
              {getToastIcon(toast.type)}
              <span className="flex-1 font-medium">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
