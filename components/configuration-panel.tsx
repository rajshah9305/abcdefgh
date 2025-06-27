"use client"

import { motion, useInView } from "framer-motion"
import { useState, useRef } from "react"
import { Settings, Sliders, ToggleLeft, Save, RefreshCw } from "lucide-react"

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (value: number) => void
  delay?: number
}

function AnimatedSlider({ label, value, min, max, step = 1, unit = "", onChange, delay = 0 }: SliderProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <label className="text-xl font-semibold text-gray-800">{label}</label>
        <motion.span
          className="text-2xl font-bold text-orange-600 font-mono"
          key={value}
          animate={{ scale: [1, 1.1, 1], color: ["#ea580c", "#ff6600", "#ea580c"] }}
          transition={{ duration: 0.3 }}
        >
          {value}
          {unit}
        </motion.span>
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #ff6600 0%, #ff6600 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
          }}
        />

        {/* Custom slider thumb styling */}
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(45deg, #ff6600, #ff8800);
            cursor: pointer;
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(255, 102, 0, 0.4);
            transition: all 0.2s ease;
          }
          
          .slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            box-shadow: 0 6px 20px rgba(255, 102, 0, 0.6);
          }
          
          .slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: linear-gradient(45deg, #ff6600, #ff8800);
            cursor: pointer;
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(255, 102, 0, 0.4);
          }
        `}</style>
      </div>
    </motion.div>
  )
}

interface ToggleProps {
  label: string
  description: string
  enabled: boolean
  onChange: (enabled: boolean) => void
  delay?: number
}

function AnimatedToggle({ label, description, enabled, onChange, delay = 0 }: ToggleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-between p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:bg-white/80 transition-all duration-300"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">{label}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <motion.button
        onClick={() => onChange(!enabled)}
        className={`relative w-16 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/30 ${
          enabled ? "bg-orange-500" : "bg-gray-300"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Toggle ${label}`}
        aria-pressed={enabled}
      >
        <motion.div
          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
          animate={{
            x: enabled ? 32 : 4,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />

        {/* Glow effect when enabled */}
        {enabled && (
          <motion.div
            className="absolute inset-0 rounded-full bg-orange-400/30 blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.button>
    </motion.div>
  )
}

interface ConfigurationPanelProps {
  onNext: () => void
}

export function ConfigurationPanel({ onNext }: ConfigurationPanelProps) {
  const [config, setConfig] = useState({
    maxAgents: 50,
    batchSize: 32,
    autoScaling: true,
    realTimeMonitoring: true,
    loadBalancing: false,
    errorRecovery: true,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSaving(false)
    onNext()
  }

  return (
    <div className="min-h-screen pt-32 px-6 pb-16">
      <div className="max-w-4xl mx-auto">
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
            <Settings size={32} className="text-orange-600" />
            <span className="text-orange-600 font-semibold text-xl">Configuration Panel</span>
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8" style={{ letterSpacing: "-0.02em" }}>
            Configure Your Orchestra
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Fine-tune your AI agent orchestration settings for optimal performance and scalability
          </p>
        </motion.div>

        {/* Configuration Form */}
        <div className="space-y-12">
          {/* Sliders Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-200/50 shadow-xl"
          >
            <div className="flex items-center space-x-4 mb-10">
              <Sliders size={28} className="text-orange-600" />
              <h3 className="text-3xl font-bold text-gray-900">Performance Settings</h3>
            </div>

            <div className="space-y-12">
              <AnimatedSlider
                label="Maximum Agents"
                value={config.maxAgents}
                min={10}
                max={100}
                step={5}
                onChange={(value) => setConfig((prev) => ({ ...prev, maxAgents: value }))}
                delay={0}
              />

              <AnimatedSlider
                label="Batch Size"
                value={config.batchSize}
                min={8}
                max={64}
                step={4}
                onChange={(value) => setConfig((prev) => ({ ...prev, batchSize: value }))}
                delay={1}
              />
            </div>
          </motion.div>

          {/* Toggles Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-200/50 shadow-xl"
          >
            <div className="flex items-center space-x-4 mb-10">
              <ToggleLeft size={28} className="text-orange-600" />
              <h3 className="text-3xl font-bold text-gray-900">Feature Controls</h3>
            </div>

            <div className="space-y-6">
              <AnimatedToggle
                label="Auto Scaling"
                description="Automatically scale agents based on demand"
                enabled={config.autoScaling}
                onChange={(enabled) => setConfig((prev) => ({ ...prev, autoScaling: enabled }))}
                delay={0}
              />

              <AnimatedToggle
                label="Real-time Monitoring"
                description="Enable performance monitoring and alerts"
                enabled={config.realTimeMonitoring}
                onChange={(enabled) => setConfig((prev) => ({ ...prev, realTimeMonitoring: enabled }))}
                delay={1}
              />

              <AnimatedToggle
                label="Load Balancing"
                description="Distribute workload across available agents"
                enabled={config.loadBalancing}
                onChange={(enabled) => setConfig((prev) => ({ ...prev, loadBalancing: enabled }))}
                delay={2}
              />

              <AnimatedToggle
                label="Error Recovery"
                description="Automatic recovery from agent failures"
                enabled={config.errorRecovery}
                onChange={(enabled) => setConfig((prev) => ({ ...prev, errorRecovery: enabled }))}
                delay={3}
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button
              onClick={handleSave}
              disabled={isSaving}
              className="group relative px-12 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-xl overflow-hidden shadow-2xl disabled:opacity-50"
              whileHover={
                !isSaving
                  ? {
                      scale: 1.05,
                      boxShadow: "0 25px 50px rgba(255, 102, 0, 0.4)",
                      y: -5,
                    }
                  : {}
              }
              whileTap={!isSaving ? { scale: 0.95 } : {}}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10 flex items-center justify-center space-x-4">
                {isSaving ? (
                  <>
                    <RefreshCw size={24} className="animate-spin" />
                    <span>Saving Configuration...</span>
                  </>
                ) : (
                  <>
                    <Save size={24} />
                    <span>Save & Continue</span>
                  </>
                )}
              </span>
            </motion.button>

            <motion.button
              onClick={() =>
                setConfig({
                  maxAgents: 50,
                  batchSize: 32,
                  autoScaling: true,
                  realTimeMonitoring: true,
                  loadBalancing: false,
                  errorRecovery: true,
                })
              }
              className="px-12 py-6 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all backdrop-blur-xl shadow-lg"
              whileHover={{
                scale: 1.05,
                borderColor: "#9CA3AF",
                y: -5,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <span className="flex items-center justify-center space-x-4">
                <RefreshCw size={24} />
                <span>Reset to Defaults</span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
