'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { MessageSquare, Layers, BarChart2, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

// 평가 영역 데이터
const evaluationCriteria = [
  {
    title: '자연어 기반 설명 제공',
    icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
    points: [
      '모델 응답에 대해 사람이 이해 가능한 설명을 제공하는지',
      'LIME, SHAP 등 설명툴을 통한 응답 근거 시각화',
      '응답 결과와 설명 간의 논리적 정합성 확인',
      '응답 내 이유 제공 비율 (Explanation Coverage) 측정'
    ],
    color: 'purple'
  },
  {
    title: '모델 구조의 설명 가능성',
    icon: <Layers className="h-6 w-6 text-teal-500" />,
    points: [
      '모델이 내재적으로 설명 가능한 구조 (예: Decision Tree, Rule-based Layer) 포함 여부',
      'Attention Visualization 제공 여부',
      'Interpretable Middle Layer 존재 여부',
      'Fine-tune 시 사용한 reasoning scaffold의 공개 여부'
    ],
    color: 'teal'
  },
  {
    title: '응답 일관성과 재현성',
    icon: <BarChart2 className="h-6 w-6 text-orange-500" />,
    points: [
      '동일 입력에 대해 동일한 출력을 제공하는지 (Determinism 설정 여부)',
      '응답 간 Variance 측정 (Output Entropy 분석)',
      '결과 재현 가능성에 대한 테스트 (Reproducibility Ratio)',
      'Stochastic Sampling 조건에서 신뢰도 범위 제공 여부'
    ],
    color: 'orange'
  },
  {
    title: '사용자 관점 설명 가능성',
    icon: <Users className="h-6 w-6 text-cyan-500" />,
    points: [
      '전문가가 아닌 사용자도 응답을 납득 가능한지',
      '인간 언어 기반의 설명 적절성 평가 (Language Grade, Clarity Score)',
      '"왜 이런 결과가 나왔는지"에 대한 사전 안내 또는 후속 설명 여부',
      '사용자 설문 기반의 설명성 만족도 피드백 수집 구조 여부'
    ],
    color: 'cyan'
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
    purple: {
      border: 'border-purple-500',
      icon: 'text-purple-500',
      text: 'text-purple-500',
      hover: 'group-hover:text-purple-600',
      darkHover: 'dark:group-hover:text-purple-400',
      bg: 'bg-purple-100',
      darkBg: 'dark:bg-purple-900/20'
    },
    teal: {
      border: 'border-teal-500',
      icon: 'text-teal-500',
      text: 'text-teal-500',
      hover: 'group-hover:text-teal-600',
      darkHover: 'dark:group-hover:text-teal-400',
      bg: 'bg-teal-100',
      darkBg: 'dark:bg-teal-900/20'
    },
    orange: {
      border: 'border-orange-500',
      icon: 'text-orange-500',
      text: 'text-orange-500',
      hover: 'group-hover:text-orange-600',
      darkHover: 'dark:group-hover:text-orange-400',
      bg: 'bg-orange-100',
      darkBg: 'dark:bg-orange-900/20'
    },
    cyan: {
      border: 'border-cyan-500',
      icon: 'text-cyan-500',
      text: 'text-cyan-500',
      hover: 'group-hover:text-cyan-600',
      darkHover: 'dark:group-hover:text-cyan-400',
      bg: 'bg-cyan-100',
      darkBg: 'dark:bg-cyan-900/20'
    }
  }
  
  return colorMap[color] || colorMap.purple
}

export default function ExplainabilityPanel() {
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
            <motion.div key={`explainability-${index}`} variants={item} className="h-full">
              <Card className={cn(
                "h-full border-l-4 hover:shadow-lg transition-all duration-300 overflow-hidden group bg-white dark:bg-gray-800",
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