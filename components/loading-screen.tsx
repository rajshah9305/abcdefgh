"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing AI Orchestra...")

  const loadingSteps = [
    "Initializing AI Orchestra...",
    "Loading Neural Networks...",
    "Connecting Agent Nodes...",
    "Optimizing Performance...",
    "Ready to Orchestrate!",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 15, 100)
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length)
        setLoadingText(loadingSteps[Math.min(stepIndex, loadingSteps.length - 1)])
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <div className="text-center">
        {/* Logo Animation */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
          className="w-20 h-20 mx-auto mb-8 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full opacity-20 blur-xl" />
          <div className="relative w-full h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">AO</span>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-8"
        >
          {loadingText}
        </motion.h2>

        {/* Progress Bar */}
        <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.p
          className="text-orange-500 font-mono text-lg"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        >
          {Math.round(progress)}%
        </motion.p>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-500/30 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${40 + Math.sin(i) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
