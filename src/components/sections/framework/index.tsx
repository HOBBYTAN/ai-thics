'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ComingSoonDialog } from '@/components/ui/coming-soon-dialog'
import Link from 'next/link'

export function FrameworkSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <section id="framework" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-on-scroll animate-slide-up" data-once="true">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-thics 프레임워크
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI 모델의 윤리성, 보안성, 설명가능성을 평가하기 위한 체계적 프레임워크입니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-on-scroll animate-slide-up" data-once="true">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6" />
            <h3 className="text-xl font-semibold mb-4">윤리성 평가 기준</h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li>• 데이터 편향성 검토</li>
              <li>• 응답 결과 공정성 평가</li>
              <li>• 사회적 영향 및 책임 평가</li>
              <li>• 설명 가능한 윤리 판단 구조</li>
            </ul>
            <Link href="/framework?tab=ethics" passHref>
              <Button
                variant="outline"
                className="w-full hover:bg-blue-50 transition-colors"
              >
                자세히 보기
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-on-scroll animate-slide-up animate-delay-200" data-once="true">
            <div className="h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-6" />
            <h3 className="text-xl font-semibold mb-4">보안성 평가 기준</h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li>• 데이터 보호 및 프라이버시</li>
              <li>• 모델 보안 및 무결성</li>
              <li>• 추론 보안 및 안정성</li>
              <li>• 보안 취약점 평가</li>
            </ul>
            <Link href="/framework?tab=security" passHref>
              <Button
                variant="outline"
                className="w-full hover:bg-red-50 transition-colors"
              >
                자세히 보기
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-on-scroll animate-slide-up animate-delay-300" data-once="true">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mb-6" />
            <h3 className="text-xl font-semibold mb-4">설명가능성 평가 기준</h3>
            <ul className="space-y-3 text-gray-600 mb-6">
              <li>• 자연어 기반 설명 제공</li>
              <li>• 모델 구조의 설명 가능성</li>
              <li>• 응답 일관성과 재현성</li>
              <li>• 사용자 관점 설명 가능성</li>
            </ul>
            <Link href="/framework?tab=explainability" passHref>
              <Button
                variant="outline"
                className="w-full hover:bg-purple-50 transition-colors"
              >
                자세히 보기
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/framework" passHref>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-8 py-4 shadow-lg shadow-blue-500/20 font-semibold transform transition-all hover:scale-105"
            >
              프레임워크 전체 보기
            </Button>
          </Link>
        </div>
      </div>

      <ComingSoonDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  )
} 