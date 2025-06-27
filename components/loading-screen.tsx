"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Brain, Network, Zap, Activity } from "lucide-react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing AI Orchestra...")
  const [currentStep, setCurrentStep] = useState(0)

  const loadingSteps = [
    { text: "Initializing AI Orchestra...", icon: Brain },
    { text: "Loading Neural Networks...", icon: Network },
    { text: "Connecting Agent Nodes...", icon: Zap },
    { text: "Optimizing Performance...", icon: Activity },
    { text: "Ready to Orchestrate!", icon: Brain },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 12 + 3, 100)
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length)
        const safeStepIndex = Math.min(stepIndex, loadingSteps.length - 1)

        if (safeStepIndex !== currentStep) {
          setCurrentStep(safeStepIndex)
          setLoadingText(loadingSteps[safeStepIndex].text)
        }

        return newProgress
      })
    }, 150)

    return () => clearInterval(interval)
  }, [currentStep])

  const IconComponent = loadingSteps[currentStep]?.icon || Brain

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center z-50"
    >
      <div className="text-center max-w-md mx-auto px-6">
        {/* Animated Logo */}
        <motion.div
          className="relative w-24 h-24 mx-auto mb-8"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 border-4 border-orange-200 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Inner circle */}
          <div className="absolute inset-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
            <motion.div
              key={currentStep}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <IconComponent size={32} className="text-white" />
            </motion.div>
          </div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-400 rounded-full"
              style={{
                left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`,
                top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`,
              }}
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          key={loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-gray-800 mb-2"
        >
          {loadingText}
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Preparing your AI orchestration experience
        </motion.p>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>
        </div>

        {/* Progress Percentage */}
        <motion.div
          className="flex justify-between items-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>Loading...</span>
          <span className="font-mono font-semibold text-orange-600">{Math.round(progress)}%</span>
        </motion.div>

        {/* Step indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {loadingSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${index <= currentStep ? "bg-orange-500" : "bg-gray-300"}`}
              animate={{
                scale: index === currentStep ? [1, 1.3, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: index === currentStep ? Number.POSITIVE_INFINITY : 0,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
