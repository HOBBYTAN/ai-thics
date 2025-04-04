'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ComingSoonDialog } from '@/components/ui/coming-soon-dialog'
import { motion } from 'framer-motion'

export function HeroSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse" />
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
          
          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
            AI-thics는 생성형 AI의 윤리, 보안, 해석력을<br />
            점수화하고 인증합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 rounded-xl px-8 py-4 text-base font-semibold w-full shadow-lg shadow-blue-500/20"
              onClick={() => setIsDialogOpen(true)}
            >
              우리 모델 평가받기
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/5 border-2 border-blue-400/30 text-blue-300 hover:bg-white/10 hover:border-blue-400/50 hover:text-blue-200 rounded-xl px-8 py-4 text-base font-semibold w-full backdrop-blur-sm"
              onClick={() => setIsDialogOpen(true)}
            >
              프레임워크 보기
            </Button>
          </div>
        </motion.div>
      </div>

      <ComingSoonDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  )
} 