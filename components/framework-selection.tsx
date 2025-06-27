"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check, Zap, Shield, Cpu, Network } from "lucide-react"
import { useState } from "react"
import { useToast } from "./toast-provider"

interface FrameworkSelectionProps {
  onNext: () => void
}

export function FrameworkSelection({ onNext }: FrameworkSelectionProps) {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)
  const { showToast } = useToast()

  const frameworks = [
    {
      id: "tensorflow",
      name: "TensorFlow",
      description: "End-to-end machine learning platform with comprehensive ecosystem",
      icon: Cpu,
      features: ["Neural Networks", "Deep Learning", "Production Ready"],
      popularity: 95,
      color: "from-orange-500 to-red-500",
      badge: "Most Popular",
    },
    {
      id: "pytorch",
      name: "PyTorch",
      description: "Dynamic neural networks with strong GPU acceleration",
      icon: Zap,
      features: ["Dynamic Graphs", "Research Friendly", "Fast Prototyping"],
      popularity: 88,
      color: "from-red-500 to-pink-500",
      badge: "Developer Favorite",
    },
    {
      id: "huggingface",
      name: "Hugging Face",
      description: "State-of-the-art NLP models and transformers",
      icon: Network,
      features: ["Pre-trained Models", "Transformers", "NLP Focus"],
      popularity: 82,
      color: "from-yellow-500 to-orange-500",
      badge: "NLP Leader",
    },
    {
      id: "openai",
      name: "OpenAI API",
      description: "Advanced language models and AI capabilities",
      icon: Shield,
      features: ["GPT Models", "API Access", "Enterprise Ready"],
      popularity: 90,
      color: "from-green-500 to-teal-500",
      badge: "Enterprise",
    },
  ]

  const handleFrameworkSelect = (frameworkId: string) => {
    setSelectedFramework(frameworkId)
    const framework = frameworks.find((f) => f.id === frameworkId)
    showToast(`${framework?.name} selected! 🚀`, "success")
  }

  const handleContinue = () => {
    if (selectedFramework) {
      showToast("Framework configured successfully! ✨", "success")
      onNext()
    } else {
      showToast("Please select a framework to continue", "info")
    }
  }

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Choose Your <span className="text-orange-500">AI Framework</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Select the AI framework that best fits your orchestration needs. Each framework offers unique capabilities
            for different use cases and requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {frameworks.map((framework, index) => {
            const Icon = framework.icon
            const isSelected = selectedFramework === framework.id

            return (
              <motion.div
                key={framework.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-300
                  ${
                    isSelected
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-xl"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-orange-300 dark:hover:border-orange-600 hover:shadow-lg"
                  }
                `}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFrameworkSelect(framework.id)}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`
                    px-3 py-1 text-xs font-semibold rounded-full
                    bg-gradient-to-r ${framework.color} text-white
                  `}
                  >
                    {framework.badge}
                  </span>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 left-4 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                  >
                    <Check size={16} className="text-white" />
                  </motion.div>
                )}

                {/* Icon */}
                <div
                  className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center mb-6
                  bg-gradient-to-br ${framework.color}
                `}
                >
                  <Icon size={32} className="text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{framework.name}</h3>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{framework.description}</p>

                  {/* Features */}
                  <div className="space-y-2">
                    {framework.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Popularity */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Popularity</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{framework.popularity}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${framework.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${framework.popularity}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.button
            onClick={handleContinue}
            disabled={!selectedFramework}
            className={`
              group px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300
              ${
                selectedFramework
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl hover:shadow-2xl"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              }
            `}
            whileHover={selectedFramework ? { scale: 1.05, y: -2 } : {}}
            whileTap={selectedFramework ? { scale: 0.95 } : {}}
          >
            <span className="flex items-center space-x-3">
              <span>Continue Configuration</span>
              <ArrowRight
                size={24}
                className={selectedFramework ? "group-hover:translate-x-1 transition-transform" : ""}
              />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
