"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

interface ConfigurationPanelProps {
  onNext: () => void
}

export function ConfigurationPanel({ onNext }: ConfigurationPanelProps) {
  const [config, setConfig] = useState({
    maxAgents: 50,
    autoScale: true,
    monitoring: true,
    batchSize: 32,
  })

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Configure Your Orchestra</h2>
          <p className="text-xl text-gray-600">Fine-tune your AI agent orchestration settings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
        >
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Maximum Agents: {config.maxAgents}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={config.maxAgents}
                onChange={(e) => setConfig({ ...config, maxAgents: Number.parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">Batch Size: {config.batchSize}</label>
              <input
                type="range"
                min="8"
                max="128"
                step="8"
                value={config.batchSize}
                onChange={(e) => setConfig({ ...config, batchSize: Number.parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Auto Scaling</h3>
                <p className="text-gray-600">Automatically scale agents based on demand</p>
              </div>
              <button
                onClick={() => setConfig({ ...config, autoScale: !config.autoScale })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  config.autoScale ? "bg-orange-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.autoScale ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Real-time Monitoring</h3>
                <p className="text-gray-600">Enable performance monitoring and alerts</p>
              </div>
              <button
                onClick={() => setConfig({ ...config, monitoring: !config.monitoring })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  config.monitoring ? "bg-orange-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    config.monitoring ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={onNext}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 hover:scale-105 transition-all"
          >
            <span>Launch Mission Control</span>
            <ArrowRight size={24} />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
