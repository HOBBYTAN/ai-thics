'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ComingSoonDialog } from '@/components/ui/coming-soon-dialog'

export function FrameworkSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <section id="framework" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-on-scroll animate-slide-up" data-once="true">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-thics 프레임워크
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI 모델의 윤리성을 평가하기 위한 체계적이고 종합적인 프레임워크를
            제공합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-on-scroll animate-slide-up" data-once="true">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6" />
            <h3 className="text-xl font-semibold mb-4">윤리성 평가 기준</h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li>• 편향성 및 차별성 검증</li>
              <li>• 공정성 및 투명성 평가</li>
              <li>• 사회적 영향력 분석</li>
              <li>• 윤리적 의사결정 검증</li>
            </ul>
            <Button
              variant="outline"
              className="w-full hover:bg-blue-50 transition-colors"
              onClick={() => setIsDialogOpen(true)}
            >
              자세히 보기
            </Button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-on-scroll animate-slide-up animate-delay-200" data-once="true">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mb-6" />
            <h3 className="text-xl font-semibold mb-4">보안성 평가 기준</h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li>• 데이터 보안 및 프라이버시</li>
              <li>• 모델 보안 및 무결성</li>
              <li>• 추론 보안 및 안정성</li>
              <li>• 보안 취약점 분석</li>
            </ul>
            <Button
              variant="outline"
              className="w-full hover:bg-purple-50 transition-colors"
              onClick={() => setIsDialogOpen(true)}
            >
              자세히 보기
            </Button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-on-scroll animate-slide-up animate-delay-300" data-once="true">
            <div className="h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mb-6" />
            <h3 className="text-xl font-semibold mb-4">해석가능성 평가 기준</h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li>• 모델 의사결정 투명성</li>
              <li>• 결과 설명 가능성</li>
              <li>• 모델 신뢰성 평가</li>
              <li>• 성능 지표 분석</li>
            </ul>
            <Button
              variant="outline"
              className="w-full hover:bg-indigo-50 transition-colors"
              onClick={() => setIsDialogOpen(true)}
            >
              자세히 보기
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-8 py-4 shadow-lg shadow-blue-500/20 font-semibold transform transition-all hover:scale-105"
            onClick={() => setIsDialogOpen(true)}
          >
            프레임워크 문서 다운로드
          </Button>
        </div>
      </div>

      <ComingSoonDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  )
} 