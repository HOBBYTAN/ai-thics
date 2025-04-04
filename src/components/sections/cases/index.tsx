'use client'

import { Button } from '@/components/ui/button'

export function CasesSection() {
  return (
    <section id="cases" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-on-scroll animate-slide-up" data-once="true">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-thics 사용 사례
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            다양한 산업 분야에서 AI-thics를 통해 AI 모델의 윤리성을 검증하고
            있습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-transform animate-on-scroll animate-slide-up" data-once="true">
            <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-6 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center">
                <span className="text-4xl">🏥</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">의료 AI</h3>
            <p className="text-gray-600 mb-6">
              의료 진단 및 처방을 지원하는 AI 모델의 윤리성과 신뢰성을 검증하여
              안전한 의료 서비스를 제공합니다.
            </p>
            <Button
              variant="outline"
              className="w-full hover:bg-blue-50 transition-colors"
            >
              자세히 보기
            </Button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-transform animate-on-scroll animate-slide-up animate-delay-200" data-once="true">
            <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-6 flex items-center justify-center">
              <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center">
                <span className="text-4xl">💼</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">금융 AI</h3>
            <p className="text-gray-600 mb-6">
              금융 상품 추천과 신용 평가를 수행하는 AI 모델의 공정성과 투명성을
              검증하여 신뢰할 수 있는 금융 서비스를 제공합니다.
            </p>
            <Button
              variant="outline"
              className="w-full hover:bg-purple-50 transition-colors"
            >
              자세히 보기
            </Button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-transform animate-on-scroll animate-slide-up animate-delay-300" data-once="true">
            <div className="h-48 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg mb-6 flex items-center justify-center">
              <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center">
                <span className="text-4xl">🎓</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-4">교육 AI</h3>
            <p className="text-gray-600 mb-6">
              맞춤형 학습을 제공하는 AI 모델의 편향성과 안전성을 검증하여 모든
              학습자에게 공평한 교육 기회를 제공합니다.
            </p>
            <Button
              variant="outline"
              className="w-full hover:bg-indigo-50 transition-colors"
            >
              자세히 보기
            </Button>
          </div>
        </div>

        <div className="mt-12 text-center animate-on-scroll animate-fade-in animate-delay-400" data-once="true">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform transition-all hover:scale-105"
          >
            더 많은 사례 보기
          </Button>
        </div>
      </div>
    </section>
  )
} 