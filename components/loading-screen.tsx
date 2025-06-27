"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Brain, Network, Zap, Activity, Sparkles, Cpu } from "lucide-react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing AI Orchestra...")
  const [currentStep, setCurrentStep] = useState(0)

  const loadingSteps = [
    { text: "Initializing AI Orchestra...", icon: Brain, color: "from-blue-500 to-purple-500" },
    { text: "Loading Neural Networks...", icon: Network, color: "from-purple-500 to-pink-500" },
    { text: "Connecting Agent Nodes...", icon: Zap, color: "from-pink-500 to-orange-500" },
    { text: "Optimizing Performance...", icon: Activity, color: "from-orange-500 to-yellow-500" },
    { text: "Calibrating Systems...", icon: Cpu, color: "from-yellow-500 to-green-500" },
    { text: "Ready to Orchestrate!", icon: Sparkles, color: "from-green-500 to-blue-500" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 8 + 2, 100)
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length)
        const safeStepIndex = Math.min(stepIndex, loadingSteps.length - 1)

        if (safeStepIndex !== currentStep) {
          setCurrentStep(safeStepIndex)
          setLoadingText(loadingSteps[safeStepIndex].text)
        }

        return newProgress
      })
    }, 120)

    return () => clearInterval(interval)
  }, [currentStep]) // Removed loadingSteps from the dependency array

  const IconComponent = loadingSteps[currentStep]?.icon || Brain
  const currentColor = loadingSteps[currentStep]?.color || "from-blue-500 to-purple-500"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50 overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-md mx-auto px-6 relative z-10">
        {/* Enhanced Animated Logo */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        >
          {/* Outer rotating rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute inset-${i * 2} border-2 border-gradient-to-r ${currentColor} rounded-full opacity-${
                70 - i * 20
              }`}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: 3 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                borderImage: `linear-gradient(45deg, rgba(255,255,255,0.${7 - i * 2}), rgba(255,255,255,0.${3 - i})) 1`,
              }}
            />
          ))}

          {/* Central icon container */}
          <motion.div
            className={`absolute inset-6 bg-gradient-to-br ${currentColor} rounded-full flex items-center justify-center shadow-2xl`}
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(255,255,255,0.3)",
                "0 0 40px rgba(255,255,255,0.6)",
                "0 0 20px rgba(255,255,255,0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.div
              key={currentStep}
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 180, opacity: 0 }}
              transition={{ duration: 0.6, ease: "backOut" }}
            >
              <IconComponent size={40} className="text-white drop-shadow-lg" />
            </motion.div>
          </motion.div>

          {/* Orbital particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
                top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`,
              }}
              animate={{
                scale: [0.5, 1.2, 0.5],
                opacity: [0.3, 1, 0.3],
                rotate: [0, 360],
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

        {/* Enhanced Loading Text */}
        <motion.div className="space-y-4 mb-8">
          <motion.h2
            key={loadingText}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl font-bold text-white mb-2"
          >
            {loadingText}
          </motion.h2>

          <motion.p
            className="text-white/70 text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Preparing your AI orchestration experience
          </motion.p>
        </motion.div>

        {/* Enhanced Progress Bar */}
        <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-6 backdrop-blur-sm border border-white/20">
          <motion.div
            className={`h-full bg-gradient-to-r ${currentColor} rounded-full relative`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Enhanced shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full blur-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </div>

        {/* Progress Details */}
        <motion.div
          className="flex justify-between items-center text-sm text-white/60 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>Initializing systems...</span>
          <motion.span
            className="font-mono font-semibold text-white"
            animate={{ color: ["#ffffff", "#ff6b35", "#ffffff"] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>

        {/* Step indicators */}
        <div className="flex justify-center space-x-3">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full border-2 ${
                index <= currentStep ? "bg-white border-white" : "bg-transparent border-white/30"
              }`}
              animate={{
                scale: index === currentStep ? [1, 1.4, 1] : 1,
                borderColor: index === currentStep ? ["#ffffff", "#ff6b35", "#ffffff"] : undefined,
              }}
              transition={{
                duration: 0.6,
                repeat: index === currentStep ? Number.POSITIVE_INFINITY : 0,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
