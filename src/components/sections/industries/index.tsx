'use client'

import { Banknote, Stethoscope, Landmark, Factory, ShieldCheck, BarChart3 } from 'lucide-react'

interface Industry {
  title: string;
  icon: React.ReactNode;
  description: string;
  painPoints: string[];
  services: string[];
}

export function IndustriesSection() {
  const industries: Industry[] = [
    {
      title: "금융 서비스",
      icon: <Banknote className="h-8 w-8 text-blue-600" />,
      description: "AI 기반 금융 시스템의 신뢰성과 안정성을 점검합니다. 투자 조언 AI, 챗봇 상담, 리스크 분석에 사용됩니다.",
      painPoints: [
        "편향적 투자 조언으로 인한 신뢰도 하락 및 법적 리스크",
        "금융 범죄 유도 가능성과 AML/KYC 관련 규제 위반 위험",
        "고객 재무 데이터 노출 및 개인정보 보안 취약점"
      ],
      services: [
        "투자 추천 AI", "신용평가 모델", "금융 챗봇", "사기 탐지 시스템"
      ]
    },
    {
      title: "헬스케어",
      icon: <Stethoscope className="h-8 w-8 text-purple-600" />,
      description: "의료 AI의 정확성과 윤리 기준을 점검합니다. 진단용 AI, 의료 챗봇, 치료 추천 모델에 적용됩니다.",
      painPoints: [
        "부정확한 진단으로 인한 치료 지연 및 환자 위험",
        "의료 데이터 프라이버시 침해 및 HIPAA 규정 위반",
        "특정 인구 집단에 대한 진단 편향성과 의료 불평등 심화"
      ],
      services: [
        "진단 보조 AI", "의료 영상 분석", "환자 모니터링", "치료 추천 시스템"
      ]
    },
    {
      title: "공공 서비스",
      icon: <Landmark className="h-8 w-8 text-indigo-600" />,
      description: "정책 추천형 AI, 민원 응답형 챗봇 등에 활용됩니다. 공정성, 투명성, 행정 책임 분산 문제를 해결합니다.",
      painPoints: [
        "의사결정 과정의 불투명성으로 인한 행정 신뢰도 하락",
        "특정 지역/계층 차별적 정책 추천 및 자원 분배 불균형",
        "AI 오류에 대한 책임 소재 불명확과 법적 도전"
      ],
      services: [
        "민원 처리 봇", "정책 분석 AI", "복지 서비스 매칭", "행정 자동화"
      ]
    },
    {
      title: "제조업",
      icon: <Factory className="h-8 w-8 text-yellow-600" />,
      description: "품질 검사 AI, 안전 감지 AI, 공급망 분석 등에 활용되며 설명력 부족, 차별적 판단 문제를 검증합니다.",
      painPoints: [
        "품질 불량 탐지 실패로 인한 제품 리콜 및 비용 손실",
        "AI 의사결정의 낮은 설명력으로 인한 현장 도입 저항",
        "예측 실패로 인한 공급망 중단 및 생산 차질"
      ],
      services: [
        "품질 검사 AI", "예측 유지보수", "공급망 최적화", "안전 모니터링"
      ]
    },
    {
      title: "SaaS / 개발 도구",
      icon: <ShieldCheck className="h-8 w-8 text-green-600" />,
      description: "AI 코드 생성기, 자동화 도구의 Prompt Injection, 악성 기능 생성 리스크 등을 점검합니다.",
      painPoints: [
        "자동 생성 코드의 보안 취약점 및 악의적 코드 삽입",
        "Prompt Injection을 통한 데이터 유출 및 시스템 침해",
        "저작권 침해 및 라이센스 위반 코드 생성"
      ],
      services: [
        "코드 생성 도구", "자동화 파이프라인", "보안 테스트 AI", "데브옵스 도구"
      ]
    },
    {
      title: "마케팅 / 미디어",
      icon: <BarChart3 className="h-8 w-8 text-red-600" />,
      description: "콘텐츠 생성 AI, 마케팅 분석, 타겟팅 알고리즘의 윤리적 사용과 편향성을 검증합니다.",
      painPoints: [
        "오해의 소지가 있는 콘텐츠 생성 및 브랜드 이미지 손상",
        "특정 그룹에 대한 광고 차별 및 개인정보 남용",
        "딥페이크 및 합성 미디어의 악용 가능성"
      ],
      services: [
        "콘텐츠 생성 AI", "마케팅 분석 도구", "개인화 추천", "소셜 미디어 봇"
      ]
    }
  ];

  return (
    <section id="industries" className="py-16 bg-gradient-to-b from-gray-50 to-white animate-on-scroll animate-slide-up" data-once="true">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            사용 사례
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            대상 산업 및 사용사례
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-thics 인증이 필요한 주요 산업 분야를 살펴보세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div 
              key={industry.title}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-on-scroll animate-slide-up" 
              style={{ animationDelay: `${index * 100}ms` }}
              data-once="true"
            >
              <div className="flex gap-4 items-start mb-4">
                <div className="p-3 rounded-lg bg-gray-50">{industry.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{industry.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {industry.description}
                  </p>
                </div>
              </div>

              <div className="mb-4 bg-red-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-red-700 mb-2">주요 문제점</h4>
                <ul className="space-y-2">
                  {industry.painPoints.map((point, i) => (
                    <li key={i} className="text-sm text-red-600 flex items-start gap-2">
                      <span className="inline-block w-4 h-4 rounded-full bg-red-200 text-red-700 flex-shrink-0 text-[10px] flex items-center justify-center mt-0.5">{i+1}</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">적용 가능 서비스</h4>
                <div className="flex flex-wrap gap-2">
                  {industry.services.map((service, i) => (
                    <span 
                      key={i} 
                      className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 