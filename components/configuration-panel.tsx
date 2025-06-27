"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Code, Eye, Shield, Zap } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface ConfigurationPanelProps {
  onNext: () => void
}

export function ConfigurationPanel({ onNext }: ConfigurationPanelProps) {
  const [config, setConfig] = useState({
    temperature: [0.7],
    maxTokens: [2048],
    enableMemory: true,
    enableTools: true,
    systemPrompt: "You are a helpful AI assistant specialized in task orchestration and automation.",
    apiKey: "",
  })

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
            <span className="text-orange-500">Configure</span> Your Agent
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Fine-tune your AI agent's behavior, capabilities, and security settings for optimal performance in your
            orchestration environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Configuration Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Model Parameters */}
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-xl">
                  <Zap size={24} className="text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold">Model Parameters</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">
                    Temperature: {config.temperature[0]}
                  </label>
                  <Slider
                    value={config.temperature}
                    onValueChange={(value) => setConfig((prev) => ({ ...prev, temperature: value }))}
                    max={2}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-white/50 mt-2">Controls randomness in responses</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">
                    Max Tokens: {config.maxTokens[0]}
                  </label>
                  <Slider
                    value={config.maxTokens}
                    onValueChange={(value) => setConfig((prev) => ({ ...prev, maxTokens: value }))}
                    max={4096}
                    min={256}
                    step={256}
                    className="w-full"
                  />
                  <p className="text-xs text-white/50 mt-2">Maximum response length</p>
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                  <Code size={24} className="text-pink-500" />
                </div>
                <h3 className="text-2xl font-bold">Capabilities</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Memory Management</p>
                    <p className="text-sm text-white/60">Enable persistent memory across sessions</p>
                  </div>
                  <Switch
                    checked={config.enableMemory}
                    onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, enableMemory: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tool Integration</p>
                    <p className="text-sm text-white/60">Allow agent to use external tools</p>
                  </div>
                  <Switch
                    checked={config.enableTools}
                    onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, enableTools: checked }))}
                  />
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
                  <Shield size={24} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold">Security</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-3">API Key</label>
                <Input
                  type="password"
                  placeholder="Enter your API key"
                  value={config.apiKey}
                  onChange={(e) => setConfig((prev) => ({ ...prev, apiKey: e.target.value }))}
                  className="bg-black/50 border-white/20 focus:border-orange-500"
                />
                <p className="text-xs text-white/50 mt-2">Your API key is encrypted and stored securely</p>
              </div>
            </div>
          </motion.div>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* System Prompt */}
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
                  <Eye size={24} className="text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold">System Prompt</h3>
              </div>

              <Textarea
                placeholder="Define your agent's personality and capabilities..."
                value={config.systemPrompt}
                onChange={(e) => setConfig((prev) => ({ ...prev, systemPrompt: e.target.value }))}
                className="min-h-[200px] bg-black/50 border-white/20 focus:border-orange-500 resize-none"
              />
            </div>

            {/* Live Preview */}
            <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Configuration Preview</h3>

              <div className="bg-black/50 rounded-xl p-6 font-mono text-sm">
                <div className="text-green-400 mb-2">// Agent Configuration</div>
                <div className="text-white/80">
                  <div>
                    temperature: <span className="text-orange-500">{config.temperature[0]}</span>
                  </div>
                  <div>
                    maxTokens: <span className="text-orange-500">{config.maxTokens[0]}</span>
                  </div>
                  <div>
                    memory: <span className="text-orange-500">{config.enableMemory.toString()}</span>
                  </div>
                  <div>
                    tools: <span className="text-orange-500">{config.enableTools.toString()}</span>
                  </div>
                  <div>
                    apiKey: <span className="text-orange-500">{"*".repeat(config.apiKey.length)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deploy Button */}
            <motion.button
              onClick={onNext}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Deploy Agent</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
