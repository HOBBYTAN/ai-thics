'use client'

import { useRef, useState } from 'react'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import * as THREE from 'three'

export function NeuralNetworkBackground() {
  const ref = useRef<THREE.Points>(null)
  const [sphere] = useState(() => {
    const points = new Float32Array(5000 * 3)
    random.inSphere(points, 1.5)
    return points
  })
  
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4f46e5"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
} 