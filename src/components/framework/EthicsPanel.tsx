'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { BadgeInfo, Shield, BarChart4, Scale } from 'lucide-react'
import { cn } from '@/lib/utils'

// 평가 영역 데이터
const evaluationCriteria = [
  {
    title: '데이터 편향성 검토',
    icon: <BarChart4 className="h-6 w-6 text-blue-500" />,
    points: [
      '학습 데이터의 성별, 연령, 지역, 언어 등 편향성 분석',
      '편향성 히스토그램 및 분포 시각화 제공',
      '데이터 라벨링의 불균형 탐지',
      '사회적 소수자에 대한 과소/과다 대표 여부 평가'
    ],
    color: 'blue'
  },
  {
    title: '응답 결과 공정성 평가',
    icon: <Scale className="h-6 w-6 text-violet-500" />,
    points: [
      '모델 출력 결과의 차별 지표 측정 (e.g. Equalized Odds, Demographic Parity)',
      '특정 그룹에 불리한 응답 패턴 존재 여부 분석',
      'Disparate Impact Ratio 계산 및 시각화',
      '오답 및 유해 응답 비율의 인종/성별별 비교 분석'
    ],
    color: 'violet'
  },
  {
    title: '사회적 영향 및 책임 평가',
    icon: <Shield className="h-6 w-6 text-emerald-500" />,
    points: [
      '특정 사회 이슈(젠더, 인종, 정치 등)에 대한 응답 태도 분석',
      '피해 발생 가능성 있는 시나리오 대응 테스트',
      '정부, NGO, 시민사회 기준에 부합하는 응답률 평가',
      '사회 규범 위반 가능성에 대한 경고 플래그 출력'
    ],
    color: 'emerald'
  },
  {
    title: '설명 가능한 윤리 판단 구조',
    icon: <BadgeInfo className="h-6 w-6 text-amber-500" />,
    points: [
      '모델의 결정 이유 제시율(Reasoning Transparency)',
      '반론 가능성 있는 응답에 대한 사전적 설명 포함 여부',
      '법적/정책적 판단 근거와 응답 연계성 측정',
      '거버넌스 환경(윤리위원회, 감사 시스템)에서 사용 가능성 평가'
    ],
    color: 'amber'
  }
]

// 컨테이너 애니메이션 변수
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

// 아이템 애니메이션 변수
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 10
    } 
  }
}

// 색상 매핑 함수
function getColorClasses(color: string) {
  const colorMap: Record<string, {
    border: string,
    icon: string,
    text: string,
    hover: string,
    darkHover: string,
    bg: string,
    darkBg: string
  }> = {
    blue: {
      border: 'border-blue-500',
      icon: 'text-blue-500',
      text: 'text-blue-500',
      hover: 'group-hover:text-blue-600',
      darkHover: 'dark:group-hover:text-blue-400',
      bg: 'bg-blue-100',
      darkBg: 'dark:bg-blue-900/20'
    },
    violet: {
      border: 'border-violet-500',
      icon: 'text-violet-500',
      text: 'text-violet-500',
      hover: 'group-hover:text-violet-600',
      darkHover: 'dark:group-hover:text-violet-400',
      bg: 'bg-violet-100',
      darkBg: 'dark:bg-violet-900/20'
    },
    emerald: {
      border: 'border-emerald-500',
      icon: 'text-emerald-500',
      text: 'text-emerald-500',
      hover: 'group-hover:text-emerald-600',
      darkHover: 'dark:group-hover:text-emerald-400',
      bg: 'bg-emerald-100',
      darkBg: 'dark:bg-emerald-900/20'
    },
    amber: {
      border: 'border-amber-500',
      icon: 'text-amber-500',
      text: 'text-amber-500',
      hover: 'group-hover:text-amber-600',
      darkHover: 'dark:group-hover:text-amber-400',
      bg: 'bg-amber-100',
      darkBg: 'dark:bg-amber-900/20'
    }
  }
  
  return colorMap[color] || colorMap.blue
}

export default function EthicsPanel() {
  return (
    <div className="w-full py-6">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {evaluationCriteria.map((criterion, index) => {
          const colorClasses = getColorClasses(criterion.color)
          
          return (
            <motion.div key={`ethics-${index}`} variants={item} className="h-full">
              <Card className={cn(
                "h-full border-l-4 hover:shadow-lg transition-all duration-300 overflow-hidden group",
                colorClasses.border
              )}>
                <CardHeader className="pb-2 flex flex-row items-center space-x-2">
                  <div className={cn(
                    "p-2 rounded-full transition-transform group-hover:scale-110",
                    colorClasses.bg,
                    colorClasses.darkBg
                  )}>
                    {criterion.icon}
                  </div>
                  <h3 className={cn(
                    "text-xl font-semibold text-gray-900 dark:text-white transition-colors",
                    colorClasses.hover,
                    colorClasses.darkHover
                  )}>
                    {criterion.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    {criterion.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <span className={cn("mr-2 mt-1 text-lg", colorClasses.text)}>•</span>
                        <span className="text-sm sm:text-base">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
} 