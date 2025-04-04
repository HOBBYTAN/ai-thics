'use client'

import { Shield, AlertTriangle } from 'lucide-react'
import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ProblemCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  bullets: string[];
  color: string;
}

function ProblemCard({ title, description, bullets, icon: Icon, color }: ProblemCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all animate-on-scroll animate-slide-up flex flex-col justify-between min-h-[400px]" data-once="true">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg bg-${color}-100`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="space-y-3">
          {bullets.map((bullet, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className={`inline-flex w-6 h-6 justify-center items-center rounded-full bg-${color}-100 text-${color}-600 font-semibold text-sm`}>
                  {index + 1}
                </div>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-sm">
                  <span className={`text-${color}-600`}>{bullet.split(' - ')[0]}</span>
                </p>
                {bullet.split(' - ')[1] && (
                  <p className="text-slate-600 text-xs mt-1 line-clamp-2">{bullet.split(' - ')[1]}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-6"></div>
    </div>
  )
}

export function ProblemSection() {
  const problems: ProblemCardProps[] = [
    {
      title: "보안 취약성",
      description: "검증되지 않은 AI 모델의 보안 취약성은 실제 위협으로 이어질 수 있습니다.",
      bullets: [
        "프롬프트 인젝션 - 시스템 명령 우회 리스크",
        "데이터 유출 - 민감 정보 노출 위험",
        "모델 탈취 - 지적재산권 침해 가능성",
        "서비스 중단 - 비정상적 행동으로 인한 장애"
      ],
      icon: Shield,
      color: "red"
    },
    {
      title: "윤리적 편향",
      description: "데이터 편향과 사회적 고정관념이 AI모델의 답변 결정에 영향을 미칩니다.",
      bullets: [
        "성별 편향 - 특정 성별에 대한 차별적 결과",
        "인종 편향 - 특정 인종에 대한 부정적 편향",
        "연령 편향 - 특정 연령대에 대한 차별적 처리",
        "문화적 편향 - 특정 문화에 대한 이해 부족"
      ],
      icon: AlertTriangle,
      color: "yellow"
    },
    {
      title: "책임 불투명",
      description: "AI가 잘못된 답변을 제공했을 때 누구에게 책임이 있는지 모호합니다.",
      bullets: [
        "결정 프로세스 불투명 - 의사결정 과정 추적 불가",
        "책임 주체 불명 - 개발자, 사용자, 모델 중 누구의 책임인지 불명확",
        "보상 기준 부재 - 피해 발생 시 보상 기준 미정립",
        "규제 프레임워크 부재 - 법적 책임 기준 미정립"
      ],
      icon: AlertTriangle,
      color: "orange"
    },
    {
      title: "신뢰 부족",
      description: "사용자, 기업, 정부 모두 AI기술 및 모델에 대한 신뢰 기준이 없습니다.",
      bullets: [
        "검증 기준 부재 - 신뢰성 검증 방법 미정립",
        "일관성 부족 - 동일 입력에 대한 불일치 결과",
        "투명성 부족 - 모델 작동 원리 공개 미흡",
        "검증 가능성 부재 - 독립적 검증 방법 미정립"
      ],
      icon: AlertTriangle,
      color: "purple"
    }
  ];

  return (
    <section id="problem" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-on-scroll animate-slide-up" data-once="true">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-600 font-medium text-sm">
            검증되지 않은 AI의 위험성
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI가 가져올 수 있는 잠재적 위험
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-thics는 AI 모델의 보안, 윤리, 신뢰성을 종합적으로 평가하여
            잠재적 위험을 사전에 방지합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {problems.map((problem) => (
            <ProblemCard key={problem.title} {...problem} />
          ))}
        </div>
        
        <div className="text-center mt-12 animate-on-scroll animate-fade-in" data-once="true">
          <div className="inline-block px-6 py-3 rounded-md bg-red-50 border border-red-200 text-red-800 mb-6">
            <p className="font-medium">
              &quot;AI 윤리는 선언이 아니라 <span className="font-bold">증명</span>이어야 합니다.&quot;
            </p>
          </div>
          <div>
            <Link href="#solution">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-8 py-4 shadow-lg shadow-blue-500/20 font-semibold transform transition-all hover:scale-105"
              >
                AI 인증 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 