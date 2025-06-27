"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface CustomLogoProps {
  size?: number
  animated?: boolean
}

export function CustomLogo({ size = 64, animated = false }: CustomLogoProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={animated ? { scale: 1.1 } : {}}
    >
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0 border-2 border-orange-500/30 rounded-full"
        animate={animated ? { rotate: 360 } : {}}
        transition={{
          duration: 20,
          repeat: animated ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute inset-2 border border-orange-400/40 rounded-full"
        animate={animated ? { rotate: -360 } : {}}
        transition={{
          duration: 15,
          repeat: animated ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
      />

      {/* Inner core */}
      <motion.div
        className="absolute inset-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg"
        animate={
          animated
            ? {
                boxShadow: [
                  "0 0 20px rgba(255, 102, 0, 0.5)",
                  "0 0 40px rgba(255, 102, 0, 0.8)",
                  "0 0 20px rgba(255, 102, 0, 0.5)",
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: animated ? Number.POSITIVE_INFINITY : 0,
        }}
      >
        {/* AI Brain Symbol */}
        <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24" fill="none" className="text-white">
          <motion.path
            d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M7.5 8C8.3 8 9 8.7 9 9.5S8.3 11 7.5 11 6 10.3 6 9.5 6.7 8 7.5 8ZM16.5 8C17.3 8 18 8.7 18 9.5S17.3 11 16.5 11 15 10.3 15 9.5 15.7 8 16.5 8ZM11 15.5C11 16.3 10.3 17 9.5 17S8 16.3 8 15.5 8.7 14 9.5 14 11 14.7 11 15.5ZM16 15.5C16 16.3 15.3 17 14.5 17S13 16.3 13 15.5 13.7 14 14.5 14 16 14.7 16 15.5ZM12 20C10.9 20 10 19.1 10 18C10 16.9 10.9 16 12 16C13.1 16 14 16.9 14 18C14 19.1 13.1 20 12 20Z"
            fill="currentColor"
            animate={
              animated
                ? {
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: animated ? Number.POSITIVE_INFINITY : 0,
            }}
          />

          {/* Neural connections */}
          <motion.g
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.7"
            animate={
              animated
                ? {
                    opacity: [0.3, 0.8, 0.3],
                  }
                : {}
            }
            transition={{
              duration: 2.5,
              repeat: animated ? Number.POSITIVE_INFINITY : 0,
            }}
          >
            <line x1="12" y1="6" x2="7.5" y2="8" />
            <line x1="12" y1="6" x2="16.5" y2="8" />
            <line x1="7.5" y1="11" x2="9.5" y2="14" />
            <line x1="16.5" y1="11" x2="14.5" y2="14" />
            <line x1="9.5" y1="17" x2="12" y2="16" />
            <line x1="14.5" y1="17" x2="12" y2="16" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Orbiting particles */}
      {animated && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                marginLeft: -3,
                marginTop: -3,
              }}
              animate={{
                x: Math.cos((i * Math.PI * 2) / 6) * (size * 0.6),
                y: Math.sin((i * Math.PI * 2) / 6) * (size * 0.6),
                rotate: 360,
              }}
              transition={{
                duration: 8 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
}
