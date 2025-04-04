'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as random from 'maath/random/dist/maath-random.esm'
import * as THREE from 'three'

function NeuralNetworkBackground() {
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

export default function HeroSection() {
  return (
    <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <NeuralNetworkBackground />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/40" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-8">
              <span className="text-blue-400 font-semibold text-lg">LEVEL A</span>
              <span className="text-slate-400">·</span>
              <motion.span 
                className="text-blue-400 font-semibold text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                91/100
              </motion.span>
            </div>
            
            <h1 className="text-[56px] font-bold tracking-tight text-slate-100 mb-8 leading-tight">
              AI에게 책임을 묻는<br />
              <span className="text-blue-400">첫 번째 기준</span>
            </h1>
            
            <p className="text-lg text-slate-300 mb-10 max-w-xl">
              AI-thics는 생성형 AI의 윤리, 보안, 해석력을<br />
              점수화하고 인증합니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#subscribe" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 rounded-xl px-8 py-4 text-base font-semibold w-full shadow-lg shadow-blue-500/20"
                >
                  우리 모델 평가받기
                </Button>
              </Link>
              <Link href="#framework" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/5 border-2 border-blue-400/30 text-blue-300 hover:bg-white/10 hover:border-blue-400/50 hover:text-blue-200 rounded-xl px-8 py-4 text-base font-semibold w-full backdrop-blur-sm"
                >
                  프레임워크 보기
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              <Canvas camera={{ position: [0, 0, 2] }}>
                <NeuralNetworkBackground />
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 