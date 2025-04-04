'use client'

import { useEffect, useState } from 'react'

interface SparklesCoreProps {
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  className?: string
  particleColor?: string
}

export function SparklesCore({
  background = 'transparent',
  minSize = 0.4,
  maxSize = 1.2,
  particleDensity = 80,
  className = '',
  particleColor = '#3b82f6',
}: SparklesCoreProps) {
  const [sparkles, setSparkles] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    opacity: number
    speed: number
  }>>([])

  useEffect(() => {
    const newSparkles = Array.from({ length: particleDensity }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      opacity: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.5 + 0.5,
    }))
    setSparkles(newSparkles)
  }, [particleDensity, minSize, maxSize])

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{ background }}
    >
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: particleColor,
            opacity: sparkle.opacity,
            animation: `float ${sparkle.speed}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(-20px) scale(0.8);
          }
        }
      `}</style>
    </div>
  )
} 