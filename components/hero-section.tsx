"use client"

import { motion } from "framer-motion"
import { Play, ArrowRight, Zap, Users, TrendingUp } from "lucide-react"
import { ThreeBackground } from "./three-background"
import { MetricsCard } from "./metrics-card"
import { FloatingWidget } from "./floating-widget"

interface HeroSectionProps {
  onNext: () => void
}

export function HeroSection({ onNext }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeBackground />

      {/* Floating Widgets */}
      <FloatingWidget label="Live" color="green" position={{ top: "20%", left: "10%" }} delay={1} />
      <FloatingWidget label="Frameworks" color="magenta" position={{ top: "30%", right: "15%" }} delay={1.2} />
      <FloatingWidget label="Config" color="orange" position={{ bottom: "25%", left: "8%" }} delay={1.4} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="text-orange-500">Orchestrate</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              AI Agents
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Next-generation AI orchestration platform for seamless agent coordination, real-time monitoring, and
            intelligent workflow automation.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <motion.button
            onClick={onNext}
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-semibold text-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Start Building</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="group px-8 py-4 border-2 border-orange-500 rounded-xl font-semibold text-lg hover:bg-orange-500/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center justify-center space-x-2">
              <Play size={20} />
              <span>View Demo</span>
            </span>
          </motion.button>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <MetricsCard icon={Zap} title="Active Agents" value="247" change="+12%" trend="up" />
          <MetricsCard icon={Users} title="Orchestrations" value="1,429" change="+8%" trend="up" />
          <MetricsCard icon={TrendingUp} title="Success Rate" value="99.2%" change="+0.3%" trend="up" />
        </motion.div>
      </motion.div>
    </div>
  )
}
