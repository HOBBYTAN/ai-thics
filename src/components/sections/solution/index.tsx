'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Shield, LineChart, Brain } from 'lucide-react'
import { ComingSoonDialog } from '@/components/ui/coming-soon-dialog'

export function SolutionSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <section id="solution" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12 animate-on-scroll animate-slide-up" data-once="true">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI 윤리 인증을 위한 종합 솔루션
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-thics는 AI 모델의 윤리성, 보안성, 설명가능성을 종합적으로 평가하고
            인증하는 플랫폼입니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-4 hover:transform hover:translate-x-2 transition-transform animate-on-scroll animate-slide-right" data-once="true">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">윤리성 평가</h3>
                <p className="text-gray-600">
                  AI의 편향, 공정성, 책임 인식 여부를 측정합니다.
                </p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• 편향 탐지 (성별/인종/연령)</li>
                  <li>• 책임성 표현 여부 (모델의 한계 인식)</li>
                  <li>• 가스라이팅 및 심리 조작 리스크 분석</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 hover:transform hover:translate-x-2 transition-transform animate-on-scroll animate-slide-right animate-delay-200" data-once="true">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <LineChart className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">보안성 평가</h3>
                <p className="text-gray-600">
                  AI의 내재된 보안 위협과 남용 가능성을 평가합니다.
                </p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• Prompt Injection 공격 저항력</li>
                  <li>• 하드코딩 API Key 탐지</li>
                  <li>• 민감 정보 요청 거부력</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4 hover:transform hover:translate-x-2 transition-transform animate-on-scroll animate-slide-right animate-delay-300" data-once="true">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">설명가능성 평가</h3>
                <p className="text-gray-600">
                  AI의 응답이 얼마나 명확한 근거를 갖는지 확인합니다.
                </p>
                <ul className="mt-2 space-y-1 text-gray-600">
                  <li>• 질문-응답 사이 추론 구조 분석</li>
                  <li>• 결과 반복성 및 일관성</li>
                  <li>• 거절 이유 설명 여부</li>
                </ul>
              </div>
            </div>

            <div className="animate-on-scroll animate-fade-in animate-delay-400" data-once="true">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform transition-all hover:scale-105"
                onClick={() => setIsDialogOpen(true)}
              >
                내 서비스 점검하기
              </Button>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden aspect-[4/3] animate-on-scroll animate-slide-left" data-once="true">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-6 animate-on-scroll animate-scale animate-delay-500" data-once="true">
                <div className="h-2 bg-blue-600/20 rounded mb-3 w-2/3" />
                <div className="h-2 bg-purple-600/20 rounded mb-3 w-1/2" />
                <div className="h-2 bg-indigo-600/20 rounded mb-6 w-3/4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg" />
                  <div className="h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg" />
                  <div className="h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg" />
                  <div className="h-20 bg-gradient-to-br from-blue-100 to-purple-200 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ComingSoonDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  )
} 