"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { useState } from "react"

interface FrameworkSelectionProps {
  onNext: () => void
}

const frameworks = [
  {
    id: "tensorflow",
    name: "TensorFlow",
    description: "End-to-end machine learning platform",
    logo: "🔥",
    features: ["Neural Networks", "Deep Learning", "Production Ready"],
  },
  {
    id: "pytorch",
    name: "PyTorch",
    description: "Dynamic neural networks and research",
    logo: "⚡",
    features: ["Dynamic Graphs", "Research Focused", "GPU Acceleration"],
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    description: "Transformers and NLP models",
    logo: "🤗",
    features: ["Pre-trained Models", "NLP Focus", "Community Driven"],
  },
]

export function FrameworkSelection({ onNext }: FrameworkSelectionProps) {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null)

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Choose Your AI Framework</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the machine learning framework that best fits your project needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {frameworks.map((framework, index) => (
            <motion.div
              key={framework.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 bg-white rounded-2xl border-2 cursor-pointer transition-all ${
                selectedFramework === framework.id
                  ? "border-orange-500 shadow-xl"
                  : "border-gray-200 hover:border-orange-300 hover:shadow-lg"
              }`}
              onClick={() => setSelectedFramework(framework.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {selectedFramework === framework.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                >
                  <Check size={16} className="text-white" />
                </motion.div>
              )}

              <div className="text-4xl mb-4">{framework.logo}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{framework.name}</h3>
              <p className="text-gray-600 mb-6">{framework.description}</p>

              <div className="space-y-2">
                {framework.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={onNext}
            disabled={!selectedFramework}
            className={`inline-flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
              selectedFramework
                ? "bg-orange-500 text-white hover:bg-orange-600 hover:scale-105"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>Continue to Configuration</span>
            <ArrowRight size={24} />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
