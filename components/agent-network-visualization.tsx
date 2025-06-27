"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface NetworkNode {
  id: string
  x: number
  y: number
  type: "orchestrator" | "worker" | "data"
  status: "active" | "idle" | "processing"
  connections: string[]
  load: number
}

export function AgentNetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [nodes, setNodes] = useState<NetworkNode[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  useEffect(() => {
    // Initialize network nodes
    const initialNodes: NetworkNode[] = [
      {
        id: "orchestrator",
        x: 400,
        y: 200,
        type: "orchestrator",
        status: "active",
        connections: ["worker-1", "worker-2", "worker-3", "data-1"],
        load: 75,
      },
      {
        id: "worker-1",
        x: 200,
        y: 100,
        type: "worker",
        status: "processing",
        connections: ["orchestrator", "worker-2"],
        load: 89,
      },
      {
        id: "worker-2",
        x: 600,
        y: 100,
        type: "worker",
        status: "active",
        connections: ["orchestrator", "worker-1", "worker-3"],
        load: 45,
      },
      {
        id: "worker-3",
        x: 600,
        y: 300,
        type: "worker",
        status: "idle",
        connections: ["orchestrator", "worker-2"],
        load: 12,
      },
      {
        id: "data-1",
        x: 200,
        y: 300,
        type: "data",
        status: "active",
        connections: ["orchestrator"],
        load: 34,
      },
    ]

    setNodes(initialNodes)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || nodes.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let time = 0

    const animate = () => {
      time += 0.016

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach((connectionId) => {
          const targetNode = nodes.find((n) => n.id === connectionId)
          if (!targetNode) return

          // Data flow animation
          const flowProgress = (time * 0.5 + node.id.length) % 1
          const flowX = node.x + (targetNode.x - node.x) * flowProgress
          const flowY = node.y + (targetNode.y - node.y) * flowProgress

          // Connection line
          const gradient = ctx.createLinearGradient(node.x, node.y, targetNode.x, targetNode.y)
          gradient.addColorStop(0, "rgba(255, 108, 0, 0.6)")
          gradient.addColorStop(0.5, "rgba(255, 108, 0, 0.3)")
          gradient.addColorStop(1, "rgba(255, 108, 0, 0.6)")

          ctx.strokeStyle = gradient
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(targetNode.x, targetNode.y)
          ctx.stroke()

          // Data flow particle
          if (node.status === "processing" || targetNode.status === "processing") {
            const particleGradient = ctx.createRadialGradient(flowX, flowY, 0, flowX, flowY, 8)
            particleGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)")
            particleGradient.addColorStop(1, "rgba(255, 108, 0, 0)")

            ctx.fillStyle = particleGradient
            ctx.beginPath()
            ctx.arc(flowX, flowY, 4, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      })

      // Draw nodes
      nodes.forEach((node) => {
        const pulse = Math.sin(time * 2 + node.id.length) * 0.2 + 0.8
        const isSelected = selectedNode === node.id

        // Node colors based on type and status
        let nodeColor = "#FF6C00"
        if (node.type === "worker") nodeColor = "#00BFFF"
        if (node.type === "data") nodeColor = "#32CD32"

        // Outer glow
        const glowSize = isSelected ? 30 : 20
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize)
        glowGradient.addColorStop(0, `${nodeColor}40`)
        glowGradient.addColorStop(1, `${nodeColor}00`)

        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Main node
        const nodeSize = isSelected ? 16 : 12
        const mainGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, nodeSize)
        mainGradient.addColorStop(0, "#FFFFFF")
        mainGradient.addColorStop(0.3, nodeColor)
        mainGradient.addColorStop(1, `${nodeColor}80`)

        ctx.fillStyle = mainGradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeSize * pulse, 0, Math.PI * 2)
        ctx.fill()

        // Status indicator
        if (node.status === "processing") {
          ctx.strokeStyle = nodeColor
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(node.x, node.y, nodeSize + 8, 0, Math.PI * 2)
          ctx.stroke()
        }

        // Load indicator
        const loadAngle = (node.load / 100) * Math.PI * 2
        ctx.strokeStyle = `${nodeColor}80`
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeSize + 4, -Math.PI / 2, -Math.PI / 2 + loadAngle)
        ctx.stroke()

        // Label
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "12px Inter, sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(node.id, node.x, node.y + nodeSize + 20)
        ctx.fillText(`${node.load}%`, node.x, node.y + nodeSize + 35)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Mouse interaction
    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const clickedNode = nodes.find((node) => {
        const distance = Math.hypot(x - node.x, y - node.y)
        return distance < 20
      })

      setSelectedNode(clickedNode ? clickedNode.id : null)
    }

    canvas.addEventListener("click", handleCanvasClick)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("click", handleCanvasClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [nodes, selectedNode])

  // Simulate node updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => ({
          ...node,
          load: Math.max(0, Math.min(100, node.load + (Math.random() - 0.5) * 20)),
          status:
            Math.random() > 0.8
              ? (["active", "idle", "processing"] as const)[Math.floor(Math.random() * 3)]
              : node.status,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-96 w-full">
      <motion.canvas
        ref={canvasRef}
        className="w-full h-full bg-black/30 rounded-xl cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Node details panel */}
      {selectedNode && (
        <motion.div
          className="absolute top-4 right-4 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-4 min-w-48"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          {(() => {
            const node = nodes.find((n) => n.id === selectedNode)
            if (!node) return null

            return (
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">{node.id}</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/60">Type:</span>
                    <span className="text-orange-500 capitalize">{node.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Status:</span>
                    <span
                      className={`capitalize ${
                        node.status === "active"
                          ? "text-green-400"
                          : node.status === "processing"
                            ? "text-blue-400"
                            : "text-yellow-400"
                      }`}
                    >
                      {node.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Load:</span>
                    <span className="text-orange-500">{node.load}%</span>
                  </div>
                  <div className="text-white/60">Connections: {node.connections.length}</div>
                </div>
              </div>
            )
          })()}
        </motion.div>
      )}

      {/* Legend */}
      <motion.div
        className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-white/80">Orchestrator</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-white/80">Worker Agent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-white/80">Data Node</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
