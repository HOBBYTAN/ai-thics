'use client'

import { Check, Bell, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PricingCardProps {
  title: string
  description: string
  price: string
  period: string
  features: string[]
  cta: string
  popular?: boolean
  color?: string
  index: number
}

function PricingCard({
  title,
  description,
  price,
  period,
  features,
  cta,
  popular,
  color = 'blue',
  index
}: PricingCardProps) {
  const delay = index * 100;

  return (
    <div
      className={`relative rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] animate-on-scroll animate-slide-up animate-delay-${delay} ${popular ? 'border-2 border-blue-500 shadow-blue-100' : 'border border-gray-200'}`}
      data-once="true"
    >
      {popular && (
        <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-blue-100 text-blue-700 py-1 text-center text-xs font-medium">
          추천
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      
      <div className="mb-8">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          <span className="ml-2 text-gray-500">{period}</span>
        </div>
      </div>
      
      <ul className="mb-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className={`h-5 w-5 shrink-0 text-${color}-500 mt-0.5`} />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link href="#subscribe" className="block">
        <Button
          className={`w-full py-6 text-base font-semibold transition-all hover:scale-[1.02] ${
            popular
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200'
              : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
          }`}
        >
          {cta}
        </Button>
      </Link>
    </div>
  )
}

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 animate-on-scroll animate-slide-up" data-once="true">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6">
            <Bell className="h-4 w-4" />
            <span>AI-thics는 현재 제한된 기업을 대상으로 인증을 시작하고 있습니다</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">인증 서비스 요금제</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI 모델의 규모와 목적에 따라 적합한 요금제를 선택하세요.
            <span className="block mt-2 text-blue-600 font-medium">출시 전 우선 등록 시 혜택을 먼저 제공합니다.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
          <PricingCard
            index={0}
            title="Basic"
            description="신뢰를 위한 1차 방어선"
            price="$2,390"
            period="/model"
            features={[
              '핵심 검증 제공 (윤리, 보안, 해석성 점수)',
              '1회 보고서 PDF 제공',
              '개선 방향 간단 제시',
              '기본 기술 문서 제공',
              '이메일 기술 지원'
            ]}
            cta="간단 평가 시작하기"
          />
          
          <PricingCard
            index={1}
            title="Professional"
            description="실사용 AI의 종합 평가"
            price="$9,900"
            period="/model"
            features={[
              '모든 검증 포함 + 맞춤 리포트',
              '프롬프트 해석 가능성 포함',
              '모델 리스크 지도화 (시각적 리포트)',
              '월간 모니터링 리포트',
              '전담 컨설턴트 배정',
              '우선 기술 지원'
            ]}
            popular
            cta="우선 등록하고 데모 보기"
          />
          
          <PricingCard
            index={2}
            title="Enterprise"
            description="규제까지 커버하는 기업용 신뢰 인프라"
            price="Starting from $19,000"
            period="/year"
            features={[
              '지속 모니터링, 위험 알림 API 포함',
              '규제 대응 문서 자동화 (EU AI Act 등)',
              '월간 리포트 + 연간 인증서 리뉴얼',
              '전문가 팀 전담 지원',
              '맞춤형 개선 워크샵',
              '비즈니스 임팩트 분석',
              '24/7 긴급 지원'
            ]}
            color="purple"
            cta="엔터프라이즈 상담 요청"
          />
        </div>

        <div className="mt-12 text-center animate-on-scroll animate-fade-in animate-delay-400" data-once="true">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-50 text-blue-700 mb-4">
            <Shield className="h-5 w-5" />
            <p className="text-sm font-medium">
              모든 요금제는 AI-thics의 윤리 점수 프레임워크 기반으로 동작하며, 국제 규제 대응 가능 구조입니다.
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            * 모든 요금제는 AI 모델의 규모와 복잡도에 따라 조정될 수 있습니다.<br />
            * 출시 전 알림을 신청하시면 얼리버드 20% 할인 혜택을 받으실 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  )
} 