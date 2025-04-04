'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ComingSoonDialog } from '@/components/ui/coming-soon-dialog'
import { ShieldAlert, AlertTriangle, Lock } from 'lucide-react'

interface ProblemCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

function ProblemCard({ title, description, icon }: ProblemCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

export function ProblemSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <section id="problem" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-on-scroll animate-slide-up" data-once="true">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI의 숨겨진 위험성
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            생성형 AI의 윤리적, 보안적, 해석적 문제점들을
            명확히 파악하고 해결합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ProblemCard
            title="윤리적 문제"
            description="AI 모델의 편향성과 차별성 문제가 사회적 갈등을 야기할 수 있습니다."
            icon={<ShieldAlert className="w-6 h-6 text-red-500" />}
          />
          <ProblemCard
            title="보안 위험"
            description="데이터 유출과 모델 해킹의 위험성이 존재합니다."
            icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
          />
          <ProblemCard
            title="해석 불가능성"
            description="AI의 의사결정 과정이 불투명하여 신뢰성을 확보하기 어렵습니다."
            icon={<Lock className="w-6 h-6 text-red-500" />}
          />
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl px-8 py-4 shadow-lg shadow-red-500/20 font-semibold transform transition-all hover:scale-105"
            onClick={() => setIsDialogOpen(true)}
          >
            AI 인증 시작하기
          </Button>
        </div>
      </div>

      <ComingSoonDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  )
} 