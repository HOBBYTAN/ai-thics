'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { ShieldAlert, Lock, Server, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

// 평가 영역 데이터
const evaluationCriteria = [
  {
    title: '데이터 보호 및 프라이버시',
    icon: <Lock className="h-6 w-6 text-blue-500" />,
    points: [
      '입력 및 출력 텍스트 내 민감 정보 탐지',
      'PII(Personally Identifiable Information) 마스킹/삭제 여부 확인',
      'GDPR/CCPA 등 국제 규제 준수 여부 점검',
      '사용자 요청 기반 Forget 기능 제공 여부 확인'
    ],
    color: 'blue'
  },
  {
    title: '모델 보안 및 무결성',
    icon: <ShieldAlert className="h-6 w-6 text-red-500" />,
    points: [
      '악의적 모델 조작(백도어, shadow model) 탐지 여부',
      'Checksum 및 해시 기반 무결성 검증 수행 여부',
      'LLM Guard 또는 Rebuff 기반 Prompt Injection 방어 시스템 적용 여부',
      'Weight tampering에 대한 탐지 로직 여부'
    ],
    color: 'red'
  },
  {
    title: '추론 보안 및 안정성',
    icon: <Server className="h-6 w-6 text-indigo-500" />,
    points: [
      '모델 API 호출 시 인증 및 권한 검증 절차 존재 여부',
      'Rate Limit, Throttling 등 abuse 방지 로직 존재 여부',
      '입력/출력 쿼리 로그 암호화 여부',
      '안정성 테스트 시 latency/timeout 실패율 기준 이하 유지 여부'
    ],
    color: 'indigo'
  },
  {
    title: '보안 취약점 평가',
    icon: <Eye className="h-6 w-6 text-amber-500" />,
    points: [
      'OWASP 기반 LLM 취약점 목록 적용 여부 (Prompt Injection, Jailbreak 등)',
      'CVE(CVE-2024-XXXX 등) 등록 취약점 점검 이력 여부',
      '외부 모듈 및 오픈소스 종속성 보안 점검 수행 여부',
      '보안 감사 및 취약점 대응 프로세스 구축 여부'
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
    red: {
      border: 'border-red-500',
      icon: 'text-red-500',
      text: 'text-red-500',
      hover: 'group-hover:text-red-600',
      darkHover: 'dark:group-hover:text-red-400',
      bg: 'bg-red-100',
      darkBg: 'dark:bg-red-900/20'
    },
    indigo: {
      border: 'border-indigo-500',
      icon: 'text-indigo-500',
      text: 'text-indigo-500',
      hover: 'group-hover:text-indigo-600',
      darkHover: 'dark:group-hover:text-indigo-400',
      bg: 'bg-indigo-100',
      darkBg: 'dark:bg-indigo-900/20'
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
  
  return colorMap[color] || colorMap.red
}

export default function SecurityPanel() {
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
            <motion.div key={`security-${index}`} variants={item} className="h-full">
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