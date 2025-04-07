'use client'

import { Check } from 'lucide-react'

interface ModelResult {
  name: string;
  totalScore: string;
  ethics: string;
  security: string;
  explainability: string;
  grade: string;
  summary: string;
}

export function ResultsSection() {
  const models: ModelResult[] = [
    {
      name: "GPT-4",
      totalScore: "91/100",
      ethics: "92/100",
      security: "88/100",
      explainability: "95/100",
      grade: "Level A",
      summary: "일부 역할 설정에 감정 과반응 경향이 있으나 전반적으로 안정적입니다."
    },
    {
      name: "Claude 3",
      totalScore: "93/100",
      ethics: "95/100",
      security: "90/100",
      explainability: "93/100",
      grade: "Level A",
      summary: "탈옥 방지 성능 우수하며, 문맥 일관성과 응답 품질이 우수합니다."
    },
    {
      name: "Gemini Pro 1.5",
      totalScore: "87/100",
      ethics: "89/100",
      security: "84/100",
      explainability: "90/100",
      grade: "Level B",
      summary: "프라이버시 대응은 좋으나 거절 이유가 모호할 때가 있습니다."
    },
    {
      name: "Command R+",
      totalScore: "82/100",
      ethics: "85/100",
      security: "80/100",
      explainability: "87/100",
      grade: "Level B",
      summary: "일부 민감 이슈에 대해 회피 응답이 다소 발생합니다."
    },
    {
      name: "Mistral Large",
      totalScore: "76/100",
      ethics: "81/100",
      security: "70/100",
      explainability: "78/100",
      grade: "Level C",
      summary: "유럽 기준 민감 키워드 대응력에서 취약한 부분이 있습니다."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 animate-on-scroll animate-slide-up" data-once="true">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-4">
            평가 결과
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            실제 평가 결과
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-thics 인증을 받은 대표적인 AI 모델들의 평가 결과입니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {models.map((model, index) => (
            <div 
              key={model.name}
              className="bg-white rounded-xl shadow-lg overflow-hidden animate-on-scroll animate-slide-up" 
              style={{ animationDelay: `${index * 100}ms` }}
              data-once="true"
            >
              <div className="p-6 pb-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-2xl font-bold">{model.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  model.grade === 'Level A' 
                    ? 'bg-blue-100 text-blue-800' 
                    : model.grade === 'Level B'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {model.grade}
                </span>
              </div>
              
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-600 font-medium">총점</span>
                  <span className="text-3xl font-bold text-blue-600">{model.totalScore.split('/')[0]}<span className="text-lg text-gray-500">/{model.totalScore.split('/')[1]}</span></span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">윤리성</span>
                      <span className="text-blue-600 font-medium">{model.ethics}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        style={{ width: `${parseInt(model.ethics.split('/')[0])}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">보안성</span>
                      <span className="text-blue-600 font-medium">{model.security}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        style={{ width: `${parseInt(model.security.split('/')[0])}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600">설명가능성</span>
                      <span className="text-sm font-medium">{model.explainability}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        style={{ width: `${parseInt(model.explainability.split('/')[0])}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-start gap-2">
                  <div className="mt-1 flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-gray-600 text-sm">{model.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 animate-on-scroll animate-fade-in animate-delay-300" data-once="true">
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            * 모든 평가는 AI-thics의 엄격한 테스트 프로토콜에 따라 진행되며, 각 모델은 최소 3명의 전문가에 의해 독립적으로 평가됩니다.<br />
            * 평가 결과는 모델의 최신 버전을 기준으로 하며, 업데이트에 따라 변경될 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  )
} 