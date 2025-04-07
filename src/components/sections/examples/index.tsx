import { CheckCircle2 } from "lucide-react"

interface ScoreCardProps {
  title: string
  score: number
  items: Array<{
    category: string
    score: number
  }>
  level: string
  color: string
}

function ScoreCard({ title, score, items, level, color }: ScoreCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
      <div className={`absolute inset-0 ${color.replace('text-', 'bg-')}/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${color} bg-gradient-to-r ${color.replace('text-', 'from-')}/10 ${color.replace('text-', 'to-')}/20`}>
          Level {level}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">종합 점수</span>
          <span className={`text-2xl font-bold ${color}`}>{score}/100</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full ${color.replace('text-', 'bg-')} bg-gradient-to-r ${color.replace('text-', 'from-')} ${color.replace('text-', 'to-')}/80`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-gray-600">{item.category}</span>
              <span className={`font-medium ${color}`}>{item.score}/100</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-1.5 rounded-full ${color.replace('text-', 'bg-')} bg-gradient-to-r ${color.replace('text-', 'from-')} ${color.replace('text-', 'to-')}/80`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">인증 완료</span>
        </div>
      </div>
    </div>
  )
}

export function ExamplesSection() {
  return (
    <section id="examples" className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 font-medium text-sm">
            평가 결과
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
            실제 평가 결과
          </h2>
          <p className="text-xl text-gray-600">
            AI-thics 인증을 받은 대표적인 AI 모델들의 평가 결과입니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ScoreCard
            title="GPT-4"
            score={91}
            items={[
              { category: "윤리성", score: 92 },
              { category: "보안성", score: 88 },
              { category: "설명가능성", score: 95 },
            ]}
            level="A"
            color="text-blue-600"
          />

          <ScoreCard
            title="Claude 3"
            score={93}
            items={[
              { category: "윤리성", score: 95 },
              { category: "보안성", score: 90 },
              { category: "설명가능성", score: 93 },
            ]}
            level="A"
            color="text-purple-600"
          />
        </div>
      </div>
    </section>
  )
} 