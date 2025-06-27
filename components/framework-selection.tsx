"use client"

import { motion } from "framer-motion"
import { Star, TrendingUp, ArrowRight, Bot, Cpu, Network } from "lucide-react"

interface FrameworkSelectionProps {
  onNext: () => void
}

const frameworks = [
  {
    id: "autogpt",
    name: "AutoGPT",
    description: "Autonomous AI agent framework with self-improving capabilities",
    icon: Bot,
    rating: 4.8,
    growth: "+42%",
    difficulty: "beginner",
    features: ["Auto-planning", "Self-correction", "Memory management"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "taskweaver",
    name: "TaskWeaver",
    description: "Code-first agent framework for complex task orchestration",
    icon: Cpu,
    rating: 4.6,
    growth: "+38%",
    difficulty: "intermediate",
    features: ["Code generation", "Plugin system", "Rich data types"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "langgraph",
    name: "LangGraph",
    description: "Build stateful, multi-actor applications with LLMs",
    icon: Network,
    rating: 4.9,
    growth: "+56%",
    difficulty: "advanced",
    features: ["State management", "Multi-agent", "Graph-based"],
    gradient: "from-green-500 to-emerald-500",
  },
]

export function FrameworkSelection({ onNext }: FrameworkSelectionProps) {
  const difficultyColors = {
    beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    intermediate: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    advanced: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Choose Your <span className="text-orange-500">Framework</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Select the perfect AI agent framework for your orchestration needs. Each framework offers unique
            capabilities and complexity levels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {frameworks.map((framework, index) => {
            const Icon = framework.icon

            return (
              <motion.div
                key={framework.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative"
                whileHover={{ scale: 1.02, y: -10 }}
              >
                {/* Glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${framework.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-opacity duration-500`}
                />

                <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-orange-500/30 transition-all duration-500">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 bg-gradient-to-br ${framework.gradient} bg-opacity-20 rounded-2xl`}>
                      <Icon size={32} className="text-white" />
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full border text-xs font-medium ${difficultyColors[framework.difficulty]}`}
                    >
                      {framework.difficulty}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3">{framework.name}</h3>
                    <p className="text-white/70 leading-relaxed">{framework.description}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {framework.features.map((feature) => (
                        <span key={feature} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="text-orange-500 font-bold">{framework.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-400">
                      <TrendingUp size={16} />
                      <span className="font-medium">{framework.growth}</span>
                    </div>
                  </div>

                  {/* Select Button */}
                  <motion.button
                    onClick={onNext}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Select Framework</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
