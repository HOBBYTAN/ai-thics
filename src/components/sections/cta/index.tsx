'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PaperPlaneIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'

export function CTASection() {
  return (
    <section id="cta" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-700">
          검증되지 않은 AI의 위험성
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          AI 윤리 인증 소식 받아보기
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto mb-8">
          AI-thics의 최신 소식과 인증 프로그램 업데이트를 이메일로 받아보세요.
        </p>

        <div className="bg-white rounded-xl shadow-md px-6 py-8 md:px-10">
          <div className="flex flex-col items-center gap-3">
            <EnvelopeClosedIcon className="w-8 h-8 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">뉴스레터 구독하기</h3>
            <p className="text-sm text-slate-500 text-center">
              AI 윤리와 관련된 최신 소식과 인사이트를 받아보세요.
            </p>
            <form className="mt-4 w-full max-w-md mx-auto flex items-center gap-2">
              <Input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-grow px-4 py-3 text-sm rounded-lg border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 hover:opacity-90"
              >
                <PaperPlaneIcon className="w-4 h-4 mr-1" /> 구독하기
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}