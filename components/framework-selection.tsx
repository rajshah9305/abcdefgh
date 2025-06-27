"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
import { Brain, Zap, Network, Database, Cloud, Cpu, ArrowRight, Check, Star } from "lucide-react"

interface FrameworkCardProps {
  title: string
  description: string
  icon: React.ElementType
  features: string[]
  isPopular?: boolean
  isSelected?: boolean
  onClick: () => void
  delay?: number
}

function FrameworkCard({
  title,
  description,
  icon: Icon,
  features,
  isPopular = false,
  isSelected = false,
  onClick,
  delay = 0,
}: FrameworkCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: delay * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.02,
        y: -10,
        transition: { duration: 0.3 },
      }}
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      {/* Popular badge */}
      {isPopular && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay * 0.15 + 0.5, duration: 0.5 }}
          className="absolute -top-4 -right-4 z-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
        >
          <div className="flex items-center space-x-1">
            <Star size={16} fill="currentColor" />
            <span>Popular</span>
          </div>
        </motion.div>
      )}

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-6 right-6 z-10 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Check size={20} className="text-white" />
        </motion.div>
      )}

      {/* Background glow */}
      <div
        className={`absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isSelected ? "bg-orange-500/20" : "bg-gray-500/10"
        }`}
      />

      <div
        className={`relative bg-white/90 backdrop-blur-xl border rounded-3xl p-8 transition-all duration-500 ${
          isSelected
            ? "border-orange-500/50 shadow-2xl shadow-orange-500/20"
            : "border-gray-200/50 hover:border-orange-500/30 shadow-xl hover:shadow-2xl"
        }`}
      >
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <motion.div
            className={`p-4 rounded-2xl ${
              isSelected
                ? "bg-orange-500/20 border border-orange-500/30"
                : "bg-gray-100 group-hover:bg-orange-500/20 group-hover:border-orange-500/30 border border-transparent"
            } transition-all duration-300`}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <Icon size={32} className={isSelected ? "text-orange-600" : "text-gray-600 group-hover:text-orange-600"} />
          </motion.div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: delay * 0.15 + 0.3 + index * 0.1,
                duration: 0.5,
              }}
              className="flex items-center space-x-3"
            >
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-gray-700">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Action indicator */}
        <motion.div className="flex items-center justify-between" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
          <span
            className={`font-medium ${isSelected ? "text-orange-600" : "text-gray-500 group-hover:text-orange-600"}`}
          >
            {isSelected ? "Selected" : "Select Framework"}
          </span>
          <ArrowRight
            size={20}
            className={`${
              isSelected ? "text-orange-600" : "text-gray-400 group-hover:text-orange-600"
            } transition-colors duration-300`}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

interface FrameworkSelectionProps {
  onNext: () => void
}

export function FrameworkSelection({ onNext }: FrameworkSelectionProps) {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)

  const frameworks = [
    {
      id: "neural",
      title: "Neural Framework",
      description: "Advanced neural network orchestration",
      icon: Brain,
      features: ["Deep learning integration", "Adaptive neural pathways", "Real-time learning", "Pattern recognition"],
      isPopular: true,
    },
    {
      id: "lightning",
      title: "Lightning Framework",
      description: "High-performance processing",
      icon: Zap,
      features: ["Ultra-fast processing", "Parallel execution", "Low latency operations", "Optimized algorithms"],
    },
    {
      id: "network",
      title: "Network Framework",
      description: "Distributed agent coordination",
      icon: Network,
      features: ["Multi-node orchestration", "Load balancing", "Fault tolerance", "Scalable architecture"],
    },
    {
      id: "data",
      title: "Data Framework",
      description: "Advanced data processing",
      icon: Database,
      features: ["Big data handling", "Stream processing", "Data analytics", "Real-time insights"],
    },
    {
      id: "cloud",
      title: "Cloud Framework",
      description: "Cloud-native orchestration",
      icon: Cloud,
      features: ["Auto-scaling", "Global deployment", "Serverless functions", "Edge computing"],
    },
    {
      id: "compute",
      title: "Compute Framework",
      description: "High-performance computing",
      icon: Cpu,
      features: ["GPU acceleration", "Parallel computing", "Resource optimization", "Performance monitoring"],
    },
  ]

  const handleFrameworkSelect = (frameworkId: string) => {
    setSelectedFramework(frameworkId)
  }

  const handleContinue = () => {
    if (selectedFramework) {
      onNext()
    }
  }

  return (
    <div className="min-h-screen pt-32 px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center space-x-4 bg-orange-100/80 backdrop-blur-xl border border-orange-200/50 rounded-full px-8 py-4 mb-12"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Network size={32} className="text-orange-600" />
            <span className="text-orange-600 font-semibold text-xl">Framework Selection</span>
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8" style={{ letterSpacing: "-0.02em" }}>
            Choose Your Framework
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Select the orchestration framework that best fits your AI agent requirements and performance needs
          </p>
        </motion.div>

        {/* Framework Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {frameworks.map((framework, index) => (
            <FrameworkCard
              key={framework.id}
              {...framework}
              isSelected={selectedFramework === framework.id}
              onClick={() => handleFrameworkSelect(framework.id)}
              delay={index}
            />
          ))}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={handleContinue}
            disabled={!selectedFramework}
            className={`group relative px-16 py-8 rounded-2xl font-bold text-2xl overflow-hidden shadow-2xl transition-all duration-500 ${
              selectedFramework
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-orange-500/40"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            whileHover={
              selectedFramework
                ? {
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(255, 102, 0, 0.4)",
                    y: -5,
                  }
                : {}
            }
            whileTap={selectedFramework ? { scale: 0.95 } : {}}
            transition={{ duration: 0.3 }}
          >
            {selectedFramework && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center space-x-4">
              <span>Continue to Configuration</span>
              <ArrowRight
                size={32}
                className={selectedFramework ? "group-hover:translate-x-2 transition-transform duration-500" : ""}
              />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
