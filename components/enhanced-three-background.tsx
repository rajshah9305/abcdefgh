"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  opacity: number
  color: string
  connections: number[]
  energy: number
  pulse: number
}

export function EnhancedThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    setIsVisible(true)

    // Enhanced particle system
    const particles: Particle[] = []
    const numParticles = 80
    const maxConnections = 3
    const connectionDistance = 200

    // Create sophisticated particle network
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: (Math.random() - 0.5) * 2,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.7 ? "#FF00FF" : "#FF6C00",
        connections: [],
        energy: Math.random() * 100,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Neural network-like connections
    particles.forEach((particle, i) => {
      const nearbyParticles = particles
        .map((p, index) => ({ particle: p, index, distance: Math.hypot(p.x - particle.x, p.y - particle.y) }))
        .filter((p) => p.index !== i && p.distance < connectionDistance)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxConnections)

      particle.connections = nearbyParticles.map((p) => p.index)
    })

    let time = 0
    let mouseX = width / 2
    let mouseY = height / 2

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      time += 0.016

      // Clear with subtle trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)"
      ctx.fillRect(0, 0, width, height)

      // Update particles
      particles.forEach((particle, i) => {
        // 3D movement with depth
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // Mouse attraction
        const mouseDistance = Math.hypot(mouseX - particle.x, mouseY - particle.y)
        if (mouseDistance < 150) {
          const force = (150 - mouseDistance) / 150
          const angle = Math.atan2(mouseY - particle.y, mouseX - particle.x)
          particle.vx += Math.cos(angle) * force * 0.02
          particle.vy += Math.sin(angle) * force * 0.02
        }

        // Boundary wrapping with 3D effect
        if (particle.x < -50) particle.x = width + 50
        if (particle.x > width + 50) particle.x = -50
        if (particle.y < -50) particle.y = height + 50
        if (particle.y > height + 50) particle.y = -50
        if (particle.z < 0) particle.z = 1000
        if (particle.z > 1000) particle.z = 0

        // Energy and pulse updates
        particle.energy += Math.sin(time * 2 + i) * 0.5
        particle.pulse += 0.05

        // 3D perspective calculation
        const perspective = 800
        const scale = perspective / (perspective + particle.z)
        const projectedX = particle.x * scale + (width / 2) * (1 - scale)
        const projectedY = particle.y * scale + (height / 2) * (1 - scale)
        const projectedSize = particle.size * scale

        // Draw connections with enhanced effects
        particle.connections.forEach((connectionIndex) => {
          const target = particles[connectionIndex]
          if (!target) return

          const targetScale = perspective / (perspective + target.z)
          const targetX = target.x * targetScale + (width / 2) * (1 - targetScale)
          const targetY = target.y * targetScale + (height / 2) * (1 - targetScale)

          const distance = Math.hypot(targetX - projectedX, targetY - projectedY)
          const opacity = Math.max(0, (connectionDistance - distance) / connectionDistance) * 0.6

          if (opacity > 0.1) {
            // Data flow animation
            const flowProgress = (time * 0.5 + i * 0.1) % 1
            const flowX = projectedX + (targetX - projectedX) * flowProgress
            const flowY = projectedY + (targetY - projectedY) * flowProgress

            // Connection line with gradient
            const gradient = ctx.createLinearGradient(projectedX, projectedY, targetX, targetY)
            gradient.addColorStop(0, `rgba(255, 108, 0, ${opacity})`)
            gradient.addColorStop(0.5, `rgba(255, 0, 255, ${opacity * 0.8})`)
            gradient.addColorStop(1, `rgba(255, 108, 0, ${opacity})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = Math.max(0.5, scale * 2)
            ctx.beginPath()
            ctx.moveTo(projectedX, projectedY)
            ctx.lineTo(targetX, targetY)
            ctx.stroke()

            // Data flow particle
            const flowOpacity = Math.sin(flowProgress * Math.PI) * opacity
            if (flowOpacity > 0.1) {
              const flowGradient = ctx.createRadialGradient(flowX, flowY, 0, flowX, flowY, 8)
              flowGradient.addColorStop(0, `rgba(255, 255, 255, ${flowOpacity})`)
              flowGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

              ctx.fillStyle = flowGradient
              ctx.beginPath()
              ctx.arc(flowX, flowY, 4 * scale, 0, Math.PI * 2)
              ctx.fill()
            }
          }
        })

        // Enhanced particle rendering
        const pulseIntensity = Math.sin(particle.pulse) * 0.3 + 0.7
        const energyGlow = Math.sin(particle.energy * 0.02) * 0.4 + 0.6

        // Outer glow
        const outerGradient = ctx.createRadialGradient(
          projectedX,
          projectedY,
          0,
          projectedX,
          projectedY,
          projectedSize * 4,
        )
        outerGradient.addColorStop(
          0,
          `${particle.color}${Math.floor(particle.opacity * pulseIntensity * 255)
            .toString(16)
            .padStart(2, "0")}`,
        )
        outerGradient.addColorStop(
          0.3,
          `${particle.color}${Math.floor(particle.opacity * pulseIntensity * 0.5 * 255)
            .toString(16)
            .padStart(2, "0")}`,
        )
        outerGradient.addColorStop(1, `${particle.color}00`)

        ctx.fillStyle = outerGradient
        ctx.beginPath()
        ctx.arc(projectedX, projectedY, projectedSize * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core particle
        const coreGradient = ctx.createRadialGradient(projectedX, projectedY, 0, projectedX, projectedY, projectedSize)
        coreGradient.addColorStop(0, "#FFFFFF")
        coreGradient.addColorStop(0.4, particle.color)
        coreGradient.addColorStop(1, `${particle.color}00`)

        ctx.fillStyle = coreGradient
        ctx.beginPath()
        ctx.arc(projectedX, projectedY, projectedSize * pulseIntensity, 0, Math.PI * 2)
        ctx.fill()

        // Energy ring
        if (energyGlow > 0.8) {
          ctx.strokeStyle = `${particle.color}${Math.floor(energyGlow * 100).toString(16)}`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(projectedX, projectedY, projectedSize * 2.5, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      // Ambient lighting effects
      const ambientGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300)
      ambientGradient.addColorStop(0, "rgba(255, 108, 0, 0.02)")
      ambientGradient.addColorStop(0.5, "rgba(255, 0, 255, 0.01)")
      ambientGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = ambientGradient
      ctx.fillRect(0, 0, width, height)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: 1,
      }}
      transition={{
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        background: "radial-gradient(ellipse at center, rgba(255, 108, 0, 0.03) 0%, rgba(0, 0, 0, 1) 70%)",
      }}
    />
  )
}
