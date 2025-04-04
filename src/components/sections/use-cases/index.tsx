'use client'

import { Banknote, HeartPulse, Building, Factory, TerminalSquare, Megaphone } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface Problem {
  label: string;
  desc: string;
}

interface Sector {
  title: string;
  icon: LucideIcon;
  problems: Problem[];
  services: string[];
  color: string;
}

function SectorCard({ title, icon: Icon, problems, services, color }: Sector) {
  return (
    <div className="rounded-xl border p-6 bg-white shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
      </div>
      
      <div className="space-y-4 mb-4">
        {problems.map((problem, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className={`inline-flex w-6 h-6 justify-center items-center rounded-full bg-${color}-100 text-${color}-600 font-semibold text-sm`}>
                {index + 1}
              </div>
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-sm">
                <span className={`text-${color}-600`}>{problem.label}</span>
              </p>
              <p className="text-slate-600 text-xs mt-1">{problem.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {services.map((service, index) => (
          <span key={index} className="px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-700">
            {service}
          </span>
        ))}
      </div>
    </div>
  )
}

export function UseCasesSection() {
  const sectors: Sector[] = [
    {
      title: "금융 서비스",
      icon: Banknote,
      problems: [
        {
          label: "투자 판단 신뢰도 저하",
          desc: "편향적 AI로 인한 신뢰 저하 및 법적 리스크 발생"
        },
        {
          label: "AML/KYC 리스크",
          desc: "금융 규제 위반 및 사용자 차별 가능성"
        },
        {
          label: "개인정보 보안",
          desc: "고객 데이터 노출 및 민감 정보 유출 위험"
        }
      ],
      services: ["투자 추천 AI", "신용평가 모델", "금융 챗봇"],
      color: "blue"
    },
    {
      title: "헬스케어",
      icon: HeartPulse,
      problems: [
        {
          label: "치료 의사결정 신뢰 저하",
          desc: "불확실한 진단으로 인한 치료 지연 및 오류 발생"
        },
        {
          label: "프라이버시 침해",
          desc: "의료 데이터 유출 및 HIPAA 위반"
        },
        {
          label: "진단 편향",
          desc: "인종·성별에 따른 데이터 편향성 위험"
        }
      ],
      services: ["진단 보조 AI", "의료 영상 분석", "치료 추천 시스템"],
      color: "red"
    },
    {
      title: "공공 서비스",
      icon: Building,
      problems: [
        {
          label: "행정적 신뢰 훼손",
          desc: "의사결정 과정 불투명성으로 인한 신뢰 하락"
        },
        {
          label: "정책 편향",
          desc: "소수자 차별 정책 유도 및 사회적 분열"
        },
        {
          label: "법적 분쟁",
          desc: "공공 AI 오류로 인한 법적 책임 발생 가능"
        }
      ],
      services: ["민원 처리 봇", "정책 분석 AI", "복지 서비스 매칭"],
      color: "green"
    },
    {
      title: "제조업",
      icon: Factory,
      problems: [
        {
          label: "제품 리스크 발생",
          desc: "품질 검사 오류로 인한 결함 제품 유통"
        },
        {
          label: "공급망 예측 실패",
          desc: "AI의 예측 정확도 저하로 인한 생산 지연"
        },
        {
          label: "안전 판단 실패",
          desc: "설비 이상 판단 실패로 인한 산업 사고 리스크"
        }
      ],
      services: ["품질 검사 AI", "예측 유지보수", "공급망 최적화"],
      color: "orange"
    },
    {
      title: "SaaS / 개발 도구",
      icon: TerminalSquare,
      problems: [
        {
          label: "취약 코드 생성",
          desc: "자동 생성된 코드의 보안 취약점 및 악성 코드 포함"
        },
        {
          label: "Prompt Injection",
          desc: "시스템 명령 탈취 및 민감 정보 노출"
        },
        {
          label: "저작권 침해",
          desc: "모델이 생성한 코드가 기존 코드와 유사해 소송 리스크 발생"
        }
      ],
      services: ["코드 생성 도구", "자동화 프레임워크", "보안 테스트 AI"],
      color: "purple"
    },
    {
      title: "마케팅 / 미디어",
      icon: Megaphone,
      problems: [
        {
          label: "브랜드 이미지 훼손",
          desc: "오해 소지가 있는 콘텐츠 생성으로 인한 타격"
        },
        {
          label: "차별 콘텐츠 생성",
          desc: "특정 그룹 대상 편견/차별 표현 생성"
        },
        {
          label: "딥페이크 생성",
          desc: "모델이 조작된 미디어를 생성할 수 있는 위험"
        }
      ],
      services: ["콘텐츠 생성 AI", "마케팅 분석 도구", "소셜 미디어 분석"],
      color: "pink"
    }
  ]

  return (
    <section id="use-cases" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12 animate-on-scroll animate-slide-up" data-once="true">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            대상 산업 및 사용사례
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-thics는 다양한 산업에서 발생할 수 있는 AI 관련 리스크를 식별하고
            해결하는 데 도움을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => (
            <SectorCard key={sector.title} {...sector} />
          ))}
        </div>
      </div>
    </section>
  )
} 