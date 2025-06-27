"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial, Sphere, Line } from "@react-three/drei"
import type * as THREE from "three"

function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null!)
  const linesRef = useRef<THREE.Group>(null!)

  const nodes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / 12)
      const theta = Math.sqrt(12 * Math.PI) * phi
      const radius = 4
      return {
        position: [
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.cos(phi),
          radius * Math.sin(theta) * Math.sin(phi),
        ] as [number, number, number],
        scale: 0.08 + Math.random() * 0.04,
        connections: [] as number[],
      }
    })
  }, [])

  // Create connections between nearby nodes
  useMemo(() => {
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.position[0] - otherNode.position[0], 2) +
              Math.pow(node.position[1] - otherNode.position[1], 2) +
              Math.pow(node.position[2] - otherNode.position[2], 2),
          )
          if (distance < 3 && node.connections.length < 3) {
            node.connections.push(j)
          }
        }
      })
    })
  }, [nodes])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Neural nodes */}
      {nodes.map((node, index) => (
        <Sphere key={index} position={node.position} scale={node.scale}>
          <meshBasicMaterial color="#ff6600" transparent opacity={0.8} />
        </Sphere>
      ))}

      {/* Neural connections */}
      <group ref={linesRef}>
        {nodes.map((node, i) =>
          node.connections.map((connectionIndex, j) => {
            const targetNode = nodes[connectionIndex]
            if (!targetNode) return null

            return (
              <Line
                key={`${i}-${j}`}
                points={[node.position, targetNode.position]}
                color="#ff6600"
                transparent
                opacity={0.3}
                lineWidth={1}
              />
            )
          }),
        )}
      </group>
    </group>
  )
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null!)
  const { mouse } = useThree()

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1500 * 3)
    for (let i = 0; i < 1500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02
      ref.current.rotation.y = state.clock.elapsedTime * 0.03

      // Mouse parallax effect
      ref.current.rotation.x += mouse.y * 0.05
      ref.current.rotation.y += mouse.x * 0.05
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ff6600" size={0.03} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
    </Points>
  )
}

function AICore() {
  const coreRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.5
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.3

      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      coreRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={coreRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshBasicMaterial color="#ff6600" transparent opacity={0.6} wireframe />
    </mesh>
  )
}

export function EnhancedThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }} style={{ background: "transparent" }} dpr={[1, 2]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <ParticleField />
        <NeuralNetwork />
        <AICore />
      </Canvas>
    </div>
  )
}
