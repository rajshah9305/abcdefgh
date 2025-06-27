"use client"

import { motion } from "framer-motion"
import { ArrowRight, Settings, Sliders, Zap, Shield, Cpu, Database } from "lucide-react"
import { useState } from "react"
import { useToast } from "./toast-provider"

interface ConfigurationPanelProps {
  onNext: () => void
}

export function ConfigurationPanel({ onNext }: ConfigurationPanelProps) {
  const { showToast } = useToast()
  const [config, setConfig] = useState({
    maxAgents: 50,
    memoryLimit: 8,
    cpuCores: 4,
    autoScaling: true,
    loadBalancing: true,
    monitoring: true,
    securityLevel: "high",
    deploymentMode: "cloud",
  })

  const handleConfigChange = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const handleDeploy = () => {
    showToast("Configuration saved! Deploying agents... 🚀", "success")
    setTimeout(() => {
      onNext()
    }, 1000)
  }

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="text-orange-500">Configure</span> Your Orchestra
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Fine-tune your AI agent orchestration settings for optimal performance and scalability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Performance Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <Cpu size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Performance</h3>
            </div>

            <div className="space-y-8">
              {/* Max Agents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Maximum Agents: {config.maxAgents}
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={config.maxAgents}
                  onChange={(e) => handleConfigChange("maxAgents", Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>10</span>
                  <span>100</span>
                </div>
              </div>

              {/* Memory Limit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Memory Limit: {config.memoryLimit}GB
                </label>
                <input
                  type="range"
                  min="2"
                  max="32"
                  value={config.memoryLimit}
                  onChange={(e) => handleConfigChange("memoryLimit", Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>2GB</span>
                  <span>32GB</span>
                </div>
              </div>

              {/* CPU Cores */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  CPU Cores: {config.cpuCores}
                </label>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={config.cpuCores}
                  onChange={(e) => handleConfigChange("cpuCores", Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1</span>
                  <span>16</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Settings size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Features</h3>
            </div>

            <div className="space-y-6">
              {/* Toggle Switches */}
              {[
                { key: "autoScaling", label: "Auto Scaling", icon: Zap },
                { key: "loadBalancing", label: "Load Balancing", icon: Database },
                { key: "monitoring", label: "Real-time Monitoring", icon: Sliders },
              ].map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon size={20} className="text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-900 dark:text-white font-medium">{feature.label}</span>
                    </div>
                    <motion.button
                      onClick={() => handleConfigChange(feature.key, !config[feature.key as keyof typeof config])}
                      className={`
                        relative w-12 h-6 rounded-full transition-colors duration-300
                        ${config[feature.key as keyof typeof config] ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-600"}
                      `}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                        animate={{
                          x: config[feature.key as keyof typeof config] ? 24 : 4,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  </div>
                )
              })}

              {/* Security Level */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Security Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {["low", "medium", "high"].map((level) => (
                    <motion.button
                      key={level}
                      onClick={() => handleConfigChange("securityLevel", level)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          config.securityLevel === level
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Deployment Mode */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Deployment Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  {["cloud", "on-premise"].map((mode) => (
                    <motion.button
                      key={mode}
                      onClick={() => handleConfigChange("deploymentMode", mode)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          config.deploymentMode === mode
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {mode === "on-premise" ? "On-Premise" : "Cloud"}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Configuration Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-3xl p-8 mb-8 border border-orange-200 dark:border-orange-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Configuration Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Max Agents:</span>
              <span className="ml-2 font-semibold text-orange-600 dark:text-orange-400">{config.maxAgents}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Memory:</span>
              <span className="ml-2 font-semibold text-orange-600 dark:text-orange-400">{config.memoryLimit}GB</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">CPU Cores:</span>
              <span className="ml-2 font-semibold text-orange-600 dark:text-orange-400">{config.cpuCores}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Security:</span>
              <span className="ml-2 font-semibold text-orange-600 dark:text-orange-400">{config.securityLevel}</span>
            </div>
          </div>
        </motion.div>

        {/* Deploy Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.button
            onClick={handleDeploy}
            className="group px-12 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-3">
              <Shield size={24} />
              <span>Deploy Orchestra</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
