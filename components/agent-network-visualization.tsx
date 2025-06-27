"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function AgentNetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Agent nodes
    const agents = [
      { id: "central", x: canvas.width / 2, y: canvas.height / 2, size: 20, type: "orchestrator", connections: [] },
      {
        id: "alpha",
        x: canvas.width * 0.2,
        y: canvas.height * 0.3,
        size: 15,
        type: "worker",
        connections: ["central"],
      },
      { id: "beta", x: canvas.width * 0.8, y: canvas.height * 0.3, size: 15, type: "worker", connections: ["central"] },
      {
        id: "gamma",
        x: canvas.width * 0.2,
        y: canvas.height * 0.7,
        size: 15,
        type: "worker",
        connections: ["central", "alpha"],
      },
      {
        id: "delta",
        x: canvas.width * 0.8,
        y: canvas.height * 0.7,
        size: 15,
        type: "worker",
        connections: ["central", "beta"],
      },
      {
        id: "epsilon",
        x: canvas.width * 0.5,
        y: canvas.height * 0.15,
        size: 12,
        type: "monitor",
        connections: ["central"],
      },
      {
        id: "zeta",
        x: canvas.width * 0.5,
        y: canvas.height * 0.85,
        size: 12,
        type: "monitor",
        connections: ["central"],
      },
    ]

    let animationFrame = 0

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrame += 0.02

      // Draw connections
      agents.forEach((agent) => {
        agent.connections.forEach((connectionId) => {
          const target = agents.find((a) => a.id === connectionId)
          if (target) {
            const pulse = Math.sin(animationFrame * 2 + agent.id.length) * 0.5 + 0.5
            ctx.strokeStyle = `rgba(255, 108, 0, ${0.3 + pulse * 0.4})`
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(agent.x, agent.y)
            ctx.lineTo(target.x, target.y)
            ctx.stroke()

            // Data flow particles
            const progress = (animationFrame * 0.5 + agent.id.length) % 1
            const particleX = agent.x + (target.x - agent.x) * progress
            const particleY = agent.y + (target.y - agent.y) * progress

            ctx.fillStyle = `rgba(255, 0, 255, ${1 - progress})`
            ctx.beginPath()
            ctx.arc(particleX, particleY, 3, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      })

      // Draw agents
      agents.forEach((agent) => {
        const pulse = Math.sin(animationFrame * 3 + agent.id.length) * 0.3 + 0.7

        // Glow effect
        const gradient = ctx.createRadialGradient(agent.x, agent.y, 0, agent.x, agent.y, agent.size * 2)

        if (agent.type === "orchestrator") {
          gradient.addColorStop(0, `rgba(255, 108, 0, ${pulse})`)
          gradient.addColorStop(0.5, `rgba(255, 108, 0, ${pulse * 0.5})`)
          gradient.addColorStop(1, "rgba(255, 108, 0, 0)")
        } else if (agent.type === "worker") {
          gradient.addColorStop(0, `rgba(255, 0, 255, ${pulse})`)
          gradient.addColorStop(0.5, `rgba(255, 0, 255, ${pulse * 0.5})`)
          gradient.addColorStop(1, "rgba(255, 0, 255, 0)")
        } else {
          gradient.addColorStop(0, `rgba(0, 255, 255, ${pulse})`)
          gradient.addColorStop(0.5, `rgba(0, 255, 255, ${pulse * 0.5})`)
          gradient.addColorStop(1, "rgba(0, 255, 255, 0)")
        }

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(agent.x, agent.y, agent.size * 2, 0, Math.PI * 2)
        ctx.fill()

        // Core node
        ctx.fillStyle = agent.type === "orchestrator" ? "#FF6C00" : agent.type === "worker" ? "#FF00FF" : "#00FFFF"
        ctx.beginPath()
        ctx.arc(agent.x, agent.y, agent.size * pulse, 0, Math.PI * 2)
        ctx.fill()

        // Label
        ctx.fillStyle = "white"
        ctx.font = "12px monospace"
        ctx.textAlign = "center"
        ctx.fillText(agent.id.toUpperCase(), agent.x, agent.y + agent.size + 20)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-96 bg-black/30 rounded-2xl overflow-hidden"
    >
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl p-4 text-sm">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Orchestrator</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
            <span>Worker Agent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            <span>Monitor</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
