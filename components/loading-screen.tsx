"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Brain, Network, Zap, Activity, Sparkles, Cpu, Shield } from "lucide-react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing AI Orchestra...")
  const [currentStep, setCurrentStep] = useState(0)

  const loadingSteps = [
    { text: "Initializing AI Orchestra...", icon: Brain, duration: 2000 },
    { text: "Loading Neural Networks...", icon: Network, duration: 2500 },
    { text: "Connecting Agent Nodes...", icon: Zap, duration: 2000 },
    { text: "Optimizing Performance...", icon: Activity, duration: 1800 },
    { text: "Calibrating Security...", icon: Shield, duration: 1500 },
    { text: "Finalizing Systems...", icon: Cpu, duration: 1200 },
    { text: "Ready to Orchestrate!", icon: Sparkles, duration: 1000 },
  ]

  useEffect(() => {
    const totalDuration = 0
    const stepDurations = loadingSteps.map((step) => step.duration)
    const totalTime = stepDurations.reduce((sum, duration) => sum + duration, 0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = (100 / totalTime) * 50 // Smooth increment
        const newProgress = Math.min(prev + increment, 100)

        // Calculate which step we should be on based on progress
        let accumulatedTime = 0
        let stepIndex = 0

        for (let i = 0; i < stepDurations.length; i++) {
          accumulatedTime += stepDurations[i]
          if ((newProgress / 100) * totalTime <= accumulatedTime) {
            stepIndex = i
            break
          }
        }

        if (stepIndex !== currentStep && stepIndex < loadingSteps.length) {
          setCurrentStep(stepIndex)
          setLoadingText(loadingSteps[stepIndex].text)
        }

        return newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [currentStep])

  const IconComponent = loadingSteps[currentStep]?.icon || Brain

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-lg mx-auto px-8 relative z-10">
        {/* Enhanced Animated Logo */}
        <motion.div
          className="relative w-40 h-40 mx-auto mb-12"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        >
          {/* Outer rotating rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute inset-${i * 3} border-2 rounded-full opacity-${60 - i * 15}`}
              style={{
                borderColor: `rgba(255, 102, 0, ${0.6 - i * 0.2})`,
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: 6 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}

          {/* Central icon container */}
          <motion.div
            className="absolute inset-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 30px rgba(255, 102, 0, 0.4)",
                "0 0 60px rgba(255, 102, 0, 0.8)",
                "0 0 30px rgba(255, 102, 0, 0.4)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.div
              key={currentStep}
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 180, opacity: 0 }}
              transition={{ duration: 0.8, ease: "backOut" }}
            >
              <IconComponent size={48} className="text-white drop-shadow-lg" />
            </motion.div>
          </motion.div>

          {/* Orbital particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-orange-400 rounded-full"
              style={{
                left: `${50 + 50 * Math.cos((i * Math.PI * 2) / 8)}%`,
                top: `${50 + 50 * Math.sin((i * Math.PI * 2) / 8)}%`,
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 1, 0.3],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Enhanced Loading Text */}
        <motion.div className="space-y-6 mb-12">
          <motion.h2
            key={loadingText}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-bold text-white mb-4"
          >
            {loadingText}
          </motion.h2>

          <motion.p
            className="text-white/70 text-xl"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Preparing your AI orchestration experience
          </motion.p>
        </motion.div>

        {/* Enhanced Progress Bar */}
        <div className="w-full h-6 bg-white/10 rounded-full overflow-hidden mb-8 backdrop-blur-sm border border-white/20">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Enhanced shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-white/30 rounded-full blur-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </div>

        {/* Progress Details */}
        <motion.div
          className="flex justify-between items-center text-lg text-white/80 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>Loading systems...</span>
          <motion.span
            className="font-mono font-bold text-white text-2xl"
            animate={{
              color: ["#ffffff", "#ff6600", "#ffffff"],
              textShadow: [
                "0 0 0px rgba(255, 102, 0, 0)",
                "0 0 20px rgba(255, 102, 0, 0.8)",
                "0 0 0px rgba(255, 102, 0, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>

        {/* Step indicators */}
        <div className="flex justify-center space-x-4">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              className={`w-4 h-4 rounded-full border-2 ${
                index <= currentStep ? "bg-orange-500 border-orange-500" : "bg-transparent border-white/30"
              }`}
              animate={{
                scale: index === currentStep ? [1, 1.5, 1] : 1,
                borderColor: index === currentStep ? ["#ff6600", "#ffffff", "#ff6600"] : undefined,
              }}
              transition={{
                duration: 0.8,
                repeat: index === currentStep ? Number.POSITIVE_INFINITY : 0,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
