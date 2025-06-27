"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { CustomLogo } from "./custom-logo"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const loadingSteps = [
    { text: "Initializing AI Orchestra...", duration: 600 },
    { text: "Launching neural agents...", duration: 550 },
    { text: "Establishing quantum links...", duration: 500 },
    { text: "Calibrating orchestration matrix...", duration: 450 },
    { text: "Synchronizing agent networks...", duration: 400 },
    { text: "Optimizing performance protocols...", duration: 350 },
    { text: "Finalizing system integration...", duration: 300 },
    { text: "Ready to orchestrate!", duration: 250 },
  ]

  useEffect(() => {
    const totalDuration = 4000 // 4 seconds minimum
    const stepDuration = totalDuration / loadingSteps.length
    let currentTime = 0

    const interval = setInterval(() => {
      currentTime += 40

      // Smooth progress with easing
      const rawProgress = currentTime / totalDuration
      const easedProgress =
        rawProgress < 0.5 ? 2 * rawProgress * rawProgress : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2

      const newProgress = Math.min(easedProgress * 100, 100)
      setProgress(newProgress)

      // Update step
      const stepIndex = Math.min(Math.floor(currentTime / stepDuration), loadingSteps.length - 1)
      setCurrentStepIndex(stepIndex)

      // Complete loading
      if (currentTime >= totalDuration) {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, 40)

    return () => clearInterval(interval)
  }, [])

  if (isComplete) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center z-50 overflow-hidden"
    >
      {/* Enhanced particle field */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Neural grid background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="text-orange-500">
          <defs>
            <pattern id="neural-grid" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.4" />
              <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.2" />
              <circle cx="120" cy="0" r="1.5" fill="currentColor" opacity="0.2" />
              <circle cx="0" cy="120" r="1.5" fill="currentColor" opacity="0.2" />
              <circle cx="120" cy="120" r="1.5" fill="currentColor" opacity="0.2" />
              <line x1="60" y1="60" x2="0" y2="0" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
              <line x1="60" y1="60" x2="120" y2="0" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
              <line x1="60" y1="60" x2="0" y2="120" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
              <line x1="60" y1="60" x2="120" y2="120" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-grid)" />
        </svg>
      </div>

      <div className="text-center max-w-2xl mx-auto px-8 relative z-10">
        {/* Enhanced Logo */}
        <motion.div
          className="mb-20"
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
            type: "spring",
            stiffness: 80,
          }}
        >
          <CustomLogo size={200} animated={true} />
        </motion.div>

        {/* Brand and loading text */}
        <motion.div className="space-y-10 mb-20">
          <motion.h1
            className="text-7xl font-bold bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ letterSpacing: "-0.02em" }}
          >
            AI Orchestra
          </motion.h1>

          <div className="relative h-24 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentStepIndex}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-3xl font-medium text-white absolute"
              >
                {loadingSteps[currentStepIndex]?.text}
              </motion.h2>
            </AnimatePresence>
          </div>

          <motion.p
            className="text-xl text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Preparing your orchestration experience
          </motion.p>
        </motion.div>

        {/* Enhanced progress bar */}
        <div className="w-full max-w-2xl mx-auto mb-16">
          <div className="h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Multi-layer shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-orange-300/40 rounded-full blur-sm"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </div>

          {/* Progress info */}
          <motion.div
            className="flex justify-between items-center mt-8 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-gray-400 font-medium">Initializing systems...</span>
            <motion.span
              className="font-mono font-bold text-white text-3xl"
              animate={{
                color: ["#ffffff", "#ff6600", "#ffffff"],
                textShadow: [
                  "0 0 0px rgba(255, 102, 0, 0)",
                  "0 0 30px rgba(255, 102, 0, 0.8)",
                  "0 0 0px rgba(255, 102, 0, 0)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
            >
              {Math.round(progress)}%
            </motion.span>
          </motion.div>
        </div>

        {/* Enhanced step indicators */}
        <div className="flex justify-center space-x-6">
          {loadingSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-5 h-5 rounded-full border-2 transition-all duration-700 ${
                index <= currentStepIndex
                  ? "bg-orange-500 border-orange-500 shadow-lg shadow-orange-500/60"
                  : "bg-transparent border-white/30"
              }`}
              animate={{
                scale: index === currentStepIndex ? [1, 1.6, 1] : 1,
                boxShadow:
                  index === currentStepIndex
                    ? ["0 0 0px rgba(255, 102, 0, 0)", "0 0 35px rgba(255, 102, 0, 1)", "0 0 0px rgba(255, 102, 0, 0)"]
                    : "0 0 0px rgba(255, 102, 0, 0)",
              }}
              transition={{
                duration: 1,
                repeat: index === currentStepIndex ? Number.POSITIVE_INFINITY : 0,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
