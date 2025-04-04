'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ComingSoonDialog } from '@/components/ui/coming-soon-dialog'
import { AlertCircle, ShieldAlert, EyeOff, AlertTriangle } from 'lucide-react'

interface ProblemCardProps {
  icon: React.ReactNode
  title: string
  points: string[]
  color?: string
}

function ProblemCard({ icon, title, points, color = 'red' }: ProblemCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className={`p-3 bg-${color}-50 dark:bg-${color}-900/20 rounded-lg`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <ul className="space-y-4">
        {points.map((point, idx) => {
          const [label, desc] = point.split(' – ')
          return (
            <li key={idx}>
              <div className="text-base font-semibold text-gray-800 dark:text-white">{label}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{desc}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function ProblemSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <section id="problem" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-block bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
            검증되지 않은 AI의 위험성
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI가 가져올 수 있는 잠재적 위험
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            AI-thics는 AI 모델의 윤리, 보안, 해석력을 종합적으로 평가하여<br />
            잠재적 위험을 사전에 방지합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProblemCard
            icon={<ShieldAlert className="w-6 h-6 text-red-500" />}
            title="보안 취약성"
            color="red"
            points={[
              '프롬프트 인젝션 – 시스템 명령 우회 리스크',
              '데이터 유출 – 민감 정보 노출 위험',
              '모델 탈취 – 지적재산권 침해 가능성',
              '서비스 중단 – 비정상적 행동으로 인한 장애',
            ]}
          />
          <ProblemCard
            icon={<AlertCircle className="w-6 h-6 text-yellow-500" />}
            title="윤리적 편향"
            color="yellow"
            points={[
              '성별 편향 – 특정 성별에 대한 차별적 결과',
              '인종 편향 – 특정 인증에 대한 부정적 편향',
              '연령 편향 – 특정 연령대에 대한 차별적 처리',
              '문화적 편향 – 특정 문화에 대한 이해 부족',
            ]}
          />
          <ProblemCard
            icon={<EyeOff className="w-6 h-6 text-indigo-500" />}
            title="책임 불투명"
            color="indigo"
            points={[
              '결정 프로세스 불투명 – 의사결정 과정 추적 불가',
              '책임 주체 불명 – 개발자, 사용자, 모델 중 누가 책임인지 불명확',
              '보상 기준 부재 – 피해 발생 시 보상 기준 미정립',
              '규제 프레임워크 부재 – 법적 책임 기준 미정립',
            ]}
          />
          <ProblemCard
            icon={<AlertTriangle className="w-6 h-6 text-purple-500" />}
            title="신뢰 기반 부족"
            color="purple"
            points={[
              '검증 기준 부재 – 신뢰성 검증 방법 미정립',
              '일관성 부족 – 동일 입력에 대한 불일치 결과',
              '투명성 부족 – 모델 작동 원리 미 공개',
              '검증 가능성 부족 – 독립적 검증 방법 미정립',
            ]}
          />
        </div>

        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-700 hover:to-orange-600 rounded-xl px-8 py-4 text-base font-semibold shadow-md shadow-red-400/30 transform transition-all hover:scale-105"
            onClick={() => setIsDialogOpen(true)}
          >
            AI 인증 시작하기
          </Button>
        </div>

        <div className="text-center mt-24 px-6">
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white leading-relaxed max-w-3xl mx-auto">
            기술은 어렵지만, <span className="text-blue-600 font-bold">신뢰는 명확해야 합니다.</span><br />
            우리는 그것을 <span className="text-blue-600 font-bold">점수로 말합니다.</span>
          </p>
        </div>
      </div>

      <ComingSoonDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  )
}
