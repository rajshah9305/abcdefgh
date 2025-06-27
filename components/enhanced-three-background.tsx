"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"

function ParticleField() {
  const ref = useRef<THREE.Points>(null!)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.03
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ff6c00" size={0.03} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
    </Points>
  )
}

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const nodes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2
      const radius = 6 + Math.sin(i) * 2
      return {
        position: [Math.cos(angle) * radius, Math.sin(angle * 0.7) * 3, Math.sin(angle) * radius] as [
          number,
          number,
          number,
        ],
        scale: 0.08 + Math.random() * 0.05,
      }
    })
  }, [])

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position} scale={node.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#ff6c00" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

export function EnhancedThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-20">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <ParticleField />
        <NetworkNodes />
      </Canvas>
    </div>
  )
}
