"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Play, ArrowRight, Zap, TrendingUp, Activity, Network, Sparkles, ChevronDown } from "lucide-react"
import { EnhancedThreeBackground } from "./enhanced-three-background"
import { EnhancedMetricsCard } from "./enhanced-metrics-card"
import { FloatingWidget } from "./floating-widget"
import { useAnalytics } from "./analytics-provider"
import { useToast } from "./toast-provider"
import { useState, useEffect, useRef } from "react"

interface HeroSectionProps {
  onNext: () => void
}

export function HeroSection({ onNext }: HeroSectionProps) {
  const { trackEvent } = useAnalytics()
  const { showToast } = useToast()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    activeAgents: 247,
    orchestrations: 1429,
    successRate: 99.2,
    cpuUsage: 67,
    memoryUsage: 84,
    networkLatency: 12,
    throughput: 15420,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics((prev) => ({
        activeAgents: Math.max(200, prev.activeAgents + Math.floor((Math.random() - 0.5) * 10)),
        orchestrations: prev.orchestrations + Math.floor(Math.random() * 5),
        successRate: Math.max(95, Math.min(100, prev.successRate + (Math.random() - 0.5) * 0.5)),
        cpuUsage: Math.max(30, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(40, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        networkLatency: Math.max(5, Math.min(50, prev.networkLatency + (Math.random() - 0.5) * 5)),
        throughput: prev.throughput + Math.floor(Math.random() * 20),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleCTAClick = (action: string) => {
    trackEvent("hero_cta_click", { action, timestamp: Date.now() })
    showToast("Welcome to AI Orchestra! 🎼", "success")
    onNext()
  }

  const handleDemoClick = () => {
    trackEvent("demo_click", { timestamp: Date.now() })
    showToast("Demo launching soon! 🚀", "info")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <EnhancedThreeBackground />

      {/* Enhanced Floating Widgets */}
      <FloatingWidget
        label="Live Agents"
        color="green"
        position={{ top: "15%", left: "8%" }}
        delay={1}
        metric={realTimeMetrics.activeAgents.toString()}
      />
      <FloatingWidget
        label="Success Rate"
        color="orange"
        position={{ top: "25%", right: "12%" }}
        delay={1.2}
        metric={`${realTimeMetrics.successRate.toFixed(1)}%`}
      />
      <FloatingWidget
        label="Throughput"
        color="blue"
        position={{ bottom: "25%", left: "6%" }}
        delay={1.4}
        metric={`${realTimeMetrics.throughput.toLocaleString()}/h`}
      />
      <FloatingWidget
        label="Latency"
        color="purple"
        position={{ bottom: "15%", right: "8%" }}
        delay={1.6}
        metric={`${realTimeMetrics.networkLatency}ms`}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        {/* Enhanced Hero Text */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.div
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-100/80 to-orange-50/80 dark:from-orange-900/30 dark:to-orange-800/30 backdrop-blur-xl border border-orange-200/50 dark:border-orange-700/50 rounded-full px-8 py-4 mb-8 shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 108, 0, 0.2)",
              y: -5,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles size={24} className="text-orange-500" />
            </motion.div>
            <span className="text-orange-600 dark:text-orange-400 font-semibold text-lg">
              Next-Generation AI Orchestration
            </span>
          </motion.div>

          <motion.h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight" variants={itemVariants}>
            <motion.span
              className="text-orange-500 dark:text-orange-400"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255, 108, 0, 0.3)",
                  "0 0 40px rgba(255, 108, 0, 0.6)",
                  "0 0 20px rgba(255, 108, 0, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              AI Agent
            </motion.span>
            <br />
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-gray-100 dark:via-gray-200 dark:to-white"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Orchestration
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Revolutionary AI orchestration platform featuring autonomous agent coordination, real-time neural network
            optimization, and intelligent workflow automation powered by cutting-edge machine learning algorithms.
          </motion.p>
        </motion.div>

        {/* Enhanced CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <motion.button
            onClick={() => handleCTAClick("start_building")}
            className="group relative px-12 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-xl overflow-hidden shadow-xl"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(255, 108, 0, 0.4)",
              y: -5,
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Start orchestrating AI agents"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center justify-center space-x-3">
              <Activity size={28} />
              <span>Start Orchestrating</span>
              <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </motion.button>

          <motion.button
            onClick={handleDemoClick}
            className="group px-12 py-6 border-2 border-orange-500 text-orange-500 dark:text-orange-400 rounded-2xl font-bold text-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all backdrop-blur-xl shadow-xl"
            whileHover={{
              scale: 1.05,
              borderColor: "#FF8A00",
              backgroundColor: "rgba(255, 108, 0, 0.05)",
              y: -5,
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Experience demo of the platform"
          >
            <span className="flex items-center justify-center space-x-3">
              <Play size={28} />
              <span>Experience Demo</span>
            </span>
          </motion.button>
        </motion.div>

        {/* Enhanced Metrics Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <EnhancedMetricsCard
            icon={Network}
            title="Active Agents"
            value={realTimeMetrics.activeAgents.toString()}
            change="+12%"
            trend="up"
            description="Neural agents processing tasks"
            realTime={true}
          />
          <EnhancedMetricsCard
            icon={Zap}
            title="Orchestrations"
            value={realTimeMetrics.orchestrations.toString()}
            change="+8%"
            trend="up"
            description="Completed workflow automations"
            realTime={true}
          />
          <EnhancedMetricsCard
            icon={TrendingUp}
            title="Success Rate"
            value={`${realTimeMetrics.successRate.toFixed(1)}%`}
            change="+0.3%"
            trend="up"
            description="Task completion accuracy"
            realTime={true}
          />
        </motion.div>

        {/* Performance Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-12"
        >
          <motion.div
            className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>CPU: {realTimeMetrics.cpuUsage}%</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Memory: {realTimeMetrics.memoryUsage}%</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span>Latency: {realTimeMetrics.networkLatency}ms</span>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown size={32} className="text-gray-400 dark:text-gray-500" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
